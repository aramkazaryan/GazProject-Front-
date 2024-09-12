import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface ICathodeLine {
  id?: string;
  name: string;
  params: {
    mark: string;
    wireCrossSection: number;
    lineLength: number;
    technicalCondition: string;
    dateOfDecommissioning: string;
  };
}

interface IAllCathodeLines {
  itesm: ICathodeLine[];
  totalCount: number;
}
class CathodeLineStore {
  rootStore: RootStore;

  cathodeLines: IAllCathodeLines | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllCathodeLines = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllCathodeLines | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_CATHODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/cathodeLine?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.cathodeLines = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addCathodeLine = async (
    addressID: string,
    body: ICathodeLine
  ): Promise<ICathodeLine | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_CATHODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/cathodeLine`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.cathodeLines) {
        this.cathodeLines = {
          itesm: [...this.cathodeLines.itesm, data],
          totalCount: this.cathodeLines.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editCathodeLine = async (
    addressID: string,
    id: string,
    body: ICathodeLine
  ): Promise<ICathodeLine | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_CATHODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/cathodeLine/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.cathodeLines) {
        this.cathodeLines = {
          itesm: this.cathodeLines.itesm.map((cathodeLine) => {
            if (cathodeLine.id === id) {
              return body;
            } else {
              return cathodeLine;
            }
          }),
          totalCount: this.cathodeLines.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteCathodeLine = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_CATHODELINE");
      const response = await fetch(
        `${endpoint}/${addressId}/cathodeLine/${id}`,
        requestOptions
      );
      if (response.ok && this.cathodeLines) {
        this.cathodeLines = {
          ...this.cathodeLines,
          itesm: this.cathodeLines.itesm.filter((i) => i.id !== id),
        };
      }
    } catch (error) {}
  };
}

export default CathodeLineStore;
