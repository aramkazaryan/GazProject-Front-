import { createContext } from "react";
import UKZStore from "./UKZStore";
import AddressStore from "./AddressStore";
import AnodeLineStore from "./AnodeLineStore";
import CathodeLineStore from "./CathodeLineStore";
import MonthlyOperatingExpenseStore from "./MonthlyOperatingExpenseStore";
import PerformanceSpecificationStore from "./PerformanceSpecificationStore";
import ProtectiveGroundingStore from "./ProtectiveGroundingStore";
import SimpleTypeStore from "./SimpleTypeStore";

export class RootStore {
  UKZStore = new UKZStore(this);

  AddressStore = new AddressStore(this);

  AnodeLineStore = new AnodeLineStore(this);

  CathodeLineStore = new CathodeLineStore(this);

  MonthlyOperatingExpenseStore = new MonthlyOperatingExpenseStore(this);

  PerformanceSpecificationStore = new PerformanceSpecificationStore(this);

  ProtectiveGroundingStore = new ProtectiveGroundingStore(this);

  SimpleTypeStore = new SimpleTypeStore(this);
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);
