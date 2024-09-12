import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface IAnodeLine {
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

interface IAllAnodeLines {
  itesm: IAnodeLine[];
  totalCount: number;
}
class AnodeLineStore {
  rootStore: RootStore;

  anodeLines: IAllAnodeLines | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllAnodeLines = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllAnodeLines | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ANODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/anodeLine?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.anodeLines = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addAnodeLine = async (
    addressID: string,
    body: IAnodeLine
  ): Promise<IAnodeLine | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ANODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/anodeLine`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.anodeLines) {
        this.anodeLines = {
          itesm: [...this.anodeLines.itesm, data],
          totalCount: this.anodeLines.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editAnodeLine = async (
    addressID: string,
    id: string,
    body: IAnodeLine
  ): Promise<IAnodeLine | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ANODELINE");
      const response = await fetch(
        `${endpoint}/${addressID}/anodeLine/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.anodeLines) {
        this.anodeLines = {
          itesm: this.anodeLines.itesm.map((anodeLine) => {
            if (anodeLine.id === id) {
              return body;
            } else {
              return anodeLine;
            }
          }),
          totalCount: this.anodeLines.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteAnodeLine = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_ANODELINE");
      const response = await fetch(
        `${endpoint}/${addressId}/anodeLine/${id}`,
        requestOptions
      );
      if (response.ok && this.anodeLines) {
        this.anodeLines = {
          ...this.anodeLines,
          itesm: this.anodeLines.itesm.filter((i) => i.id !== id),
        };
      }
    } catch (error) {}
  };
}

export default AnodeLineStore;
