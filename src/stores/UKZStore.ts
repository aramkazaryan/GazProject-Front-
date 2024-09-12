import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

interface IUKZState {
  id: string;
  name: string;
}
class UKZStore {
  rootStore: RootStore;

  UKZStates: IUKZState[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getUKZStates = async (): Promise<IUKZState[] | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_UKZ");
      const response = await fetch(`${endpoint}/states`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        this.UKZStates = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addUKZState = async (name: string): Promise<IUKZState | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify({
        name,
      }),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_UKZ");
      const response = await fetch(`${endpoint}/add/state`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        this.UKZStates = [...this.UKZStates, data];
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteUKZState = async (id: string): Promise<IUKZState | null> => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_UKZ");
      const response = await fetch(
        `${endpoint}/${id}/delete/state`,
        requestOptions
      );
      if (response.ok) {
        this.UKZStates = this.UKZStates.filter((i) => i.id !== id);
      }
      return null;
    } catch (error) {
      return null;
    }
  };
}

export default UKZStore;
