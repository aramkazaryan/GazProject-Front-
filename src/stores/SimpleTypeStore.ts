import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface ISimpleType {
  id?: string;
  name: string;
  params: {
    dateOfRestoration: string;
    dateOfRefusal: string;
    downTime: number;
    uzk: number;
  };
}

interface IAllSimpleTypes {
  itesm: ISimpleType[];
  totalCount: number;
}
class SimpleTypeStore {
  rootStore: RootStore;

  simpleTypes: IAllSimpleTypes | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllSimpleTypes = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllSimpleTypes | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ST");
      const response = await fetch(
        `${endpoint}/${addressID}/simple?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.simpleTypes = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addSimpleType = async (
    addressID: string,
    body: ISimpleType
  ): Promise<ISimpleType | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ST");
      const response = await fetch(
        `${endpoint}/${addressID}/simple`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.simpleTypes) {
        this.simpleTypes = {
          itesm: [...this.simpleTypes.itesm, data],
          totalCount: this.simpleTypes.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editSimpleType = async (
    addressID: string,
    id: string,
    body: ISimpleType
  ): Promise<ISimpleType | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ST");
      const response = await fetch(
        `${endpoint}/${addressID}/simple/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.simpleTypes) {
        this.simpleTypes = {
          itesm: this.simpleTypes.itesm.map((simpleType) => {
            if (simpleType.id === id) {
              return body;
            } else {
              return simpleType;
            }
          }),
          totalCount: this.simpleTypes.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteSimpleType = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ST");
      const response = await fetch(
        `${endpoint}/${addressId}/simple/${id}`,
        requestOptions
      );
      if (response.ok && this.simpleTypes) {
        this.simpleTypes = {
          ...this.simpleTypes,
          itesm: this.simpleTypes.itesm.filter((i) => i.id !== id),
        };
      }
    } catch (error) {}
  };
}

export default SimpleTypeStore;
