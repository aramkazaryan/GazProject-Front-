import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface IProtectiveGrounding {
  id?: string;
  name: string;
  params: {
    material: string;
    countOfGroundingElectrodes: string;
    note: string;
    dateOfMeasurement: string;
    soilResistivity: number;
    currentSpreadingResistance: number;
  };
}

interface IAllProtectiveGroundings {
  itesm: IProtectiveGrounding[];
  totalCount: number;
}
class ProtectiveGroundingStore {
  rootStore: RootStore;

  protectiveGroundings: IAllProtectiveGroundings | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllProtectiveGroundings = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllProtectiveGroundings | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PG");
      const response = await fetch(
        `${endpoint}/${addressID}/protective/grounding?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.protectiveGroundings = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addProtectiveGrounding = async (
    addressID: string,
    body: IProtectiveGrounding
  ): Promise<IProtectiveGrounding | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PG");
      const response = await fetch(
        `${endpoint}/${addressID}/protective/grounding`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.protectiveGroundings) {
        this.protectiveGroundings = {
          itesm: [...this.protectiveGroundings.itesm, data],
          totalCount: this.protectiveGroundings.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editProtectiveGrounding = async (
    addressID: string,
    id: string,
    body: IProtectiveGrounding
  ): Promise<IProtectiveGrounding | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PG");
      const response = await fetch(
        `${endpoint}/${addressID}/protective/grounding/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.protectiveGroundings) {
        this.protectiveGroundings = {
          itesm: this.protectiveGroundings.itesm.map((protectiveGrounding) => {
            if (protectiveGrounding.id === id) {
              return body;
            } else {
              return protectiveGrounding;
            }
          }),
          totalCount: this.protectiveGroundings.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteProtectiveGrounding = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PG");
      const response = await fetch(
        `${endpoint}/${addressId}/protective/grounding/${id}`,
        requestOptions
      );
      if (response.ok && this.protectiveGroundings) {
        this.protectiveGroundings = {
          ...this.protectiveGroundings,
          itesm: this.protectiveGroundings.itesm.filter((i) => i.id !== id),
        };
      }
    } catch (error) {}
  };
}

export default ProtectiveGroundingStore;
