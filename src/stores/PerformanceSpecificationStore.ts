import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface IPerformanceSpecification {
  id?: string;
  name: string;
  params: {
    skzType: string;
    type: string;
    productionNumber: string;
    yearOfManufacturing: number;
    installationsDate: string;
    hourMeterType: string;
    energyMeterType: string;
    conversionOutputPower: number;
    decommissioningDate: string;
    technicalCondition: string;
    note: string;
  };
}

interface IAllPerformanceSpecifications {
  itesm: IPerformanceSpecification[];
  totalCount: number;
}
class PerformanceSpecificationStore {
  rootStore: RootStore;

  performanceSpecifications: IAllPerformanceSpecifications | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllPerformanceSpecifications = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllPerformanceSpecifications | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PS");
      const response = await fetch(
        `${endpoint}/${addressID}/performance/specifications?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.performanceSpecifications = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addPerformanceSpecification = async (
    addressID: string,
    body: IPerformanceSpecification
  ): Promise<IPerformanceSpecification | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PS");
      const response = await fetch(
        `${endpoint}/${addressID}/performance/specifications`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.performanceSpecifications) {
        this.performanceSpecifications = {
          itesm: [...this.performanceSpecifications.itesm, data],
          totalCount: this.performanceSpecifications.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editPerformanceSpecification = async (
    addressID: string,
    id: string,
    body: IPerformanceSpecification
  ): Promise<IPerformanceSpecification | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PS");
      const response = await fetch(
        `${endpoint}/${addressID}/performance/specifications/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.performanceSpecifications) {
        this.performanceSpecifications = {
          itesm: this.performanceSpecifications.itesm.map(
            (performanceSpecification) => {
              if (performanceSpecification.id === id) {
                return body;
              } else {
                return performanceSpecification;
              }
            }
          ),
          totalCount: this.performanceSpecifications.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deletePerformanceSpecification = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_PS");
      const response = await fetch(
        `${endpoint}/${addressId}/performance/specifications/${id}`,
        requestOptions
      );
      if (response.ok && this.performanceSpecifications) {
        this.performanceSpecifications = {
          ...this.performanceSpecifications,
          itesm: this.performanceSpecifications.itesm.filter(
            (i) => i.id !== id
          ),
        };
      }
    } catch (error) {}
  };
}

export default PerformanceSpecificationStore;
