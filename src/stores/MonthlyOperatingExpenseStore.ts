import { makeAutoObservable } from "mobx";
import extendDefaultHeaders from "../utils/extendDefaultHeaders";
import handleApiPath from "../utils/handleApiPath";
import { RootStore } from "./RootStore";

export interface IMonthlyOperatingExpense {
  id?: string;
  name: string;
  params: {
    dateOfReport: string;
    monthlyConsumption: number;
    toque: number;
    outputVoltage: number;
    monthlyReport: string;
  };
}

interface IAllMonthlyOperatingExpenses {
  itesm: IMonthlyOperatingExpense[];
  totalCount: number;
}
class MonthlyOperatingExpenseStore {
  rootStore: RootStore;

  monthlyOperatingExpenses: IAllMonthlyOperatingExpenses | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getAllMonthlyOperatingExpenses = async (
    addressID: string,
    pageNumber: number
  ): Promise<IAllMonthlyOperatingExpenses | null> => {
    const requestOptions = {
      method: "GET",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_MOE");
      const response = await fetch(
        `${endpoint}/${addressID}/monthlyexpense?pageNumber=${pageNumber}&pageSize=20`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        this.monthlyOperatingExpenses = data;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  addMonthlyOperatingExpense = async (
    addressID: string,
    body: IMonthlyOperatingExpense
  ): Promise<IMonthlyOperatingExpense | null> => {
    const requestOptions = {
      method: "POST",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_MOE");
      const response = await fetch(
        `${endpoint}/${addressID}/monthlyexpense`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.monthlyOperatingExpenses) {
        this.monthlyOperatingExpenses = {
          itesm: [...this.monthlyOperatingExpenses.itesm, data],
          totalCount: this.monthlyOperatingExpenses.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  editMonthlyOperatingExpense = async (
    addressID: string,
    id: string,
    body: IMonthlyOperatingExpense
  ): Promise<IMonthlyOperatingExpense | null> => {
    const requestOptions = {
      method: "PATCH",
      headers: extendDefaultHeaders({}),
      body: JSON.stringify(body),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_MOE");
      const response = await fetch(
        `${endpoint}/${addressID}/monthlyexpense/${id}/edit`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok && this.monthlyOperatingExpenses) {
        this.monthlyOperatingExpenses = {
          itesm: this.monthlyOperatingExpenses.itesm.map(
            (monthlyOperatingExpense) => {
              if (monthlyOperatingExpense.id === id) {
                return body;
              } else {
                return monthlyOperatingExpense;
              }
            }
          ),
          totalCount: this.monthlyOperatingExpenses.totalCount + 1,
        };
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  deleteMonthlyOperatingExpense = async (addressId: string, id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: extendDefaultHeaders({}),
    };

    try {
      const endpoint = handleApiPath("REACT_APP_API_MOE");
      const response = await fetch(
        `${endpoint}/${addressId}/monthlyexpense/${id}`,
        requestOptions
      );
      if (response.ok && this.monthlyOperatingExpenses) {
        this.monthlyOperatingExpenses = {
          ...this.monthlyOperatingExpenses,
          itesm: this.monthlyOperatingExpenses.itesm.filter((i) => i.id !== id),
        };
      }
    } catch (error) {}
  };
}

export default MonthlyOperatingExpenseStore;
