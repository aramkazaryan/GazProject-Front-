import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

interface IAddress {
  id: string;
  name: string;
}
class AddressStore {
  rootStore: RootStore;

  addresses: { state: string; stateAddresses: IAddress[] }[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAddresses = async (stateID: string): Promise<IAddress[] | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ADDRESS");
      const response = await fetch(
        `${endpoint}/${stateID}/addresses`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.addresses = [
          ...this.addresses,
          { state: stateID, stateAddresses: data },
        ];
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addAddress = async (
    stateID: string,
    name: string
  ): Promise<IAddress | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify({
        name,
      }),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ADDRESS");
      const response = await fetch(
        `${endpoint}/${stateID}/add`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        if (this.addresses.filter((item) => item.state === stateID).length) {
          this.addresses = this.addresses.map((i) => {
            if (i.state === stateID) {
              return { ...i, stateAddresses: [...i.stateAddresses, data] };
            } else {
              return i;
            }
          });
        } else {
          this.addresses = [
            ...this.addresses,
            { state: stateID, stateAddresses: [data] },
          ];
        }
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteAddress = async (stateID: string, addressID: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ADDRESS");
      const response = await fetch(
        `${endpoint}/${stateID}/${addressID}/delete`,
        requestOptions
      );
      if (response.ok) {
        this.addresses = this.addresses.map((i) => {
          if (i.state === stateID) {
            return {
              ...i,
              stateAddresses: i.stateAddresses.filter(
                (address) => address.id !== addressID
              ),
            };
          } else {
            return i;
          }
        });
      }
    } catch (error) {}
  };
}

export default AddressStore;
