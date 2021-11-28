import { ViewDeviceData } from "../utils/common-types";
import { PlanTable } from "../../shared/common-types";

export interface IView {
  setMode(mode: number): IView;
  givePlanTables(data: PlanTable[]): IView;
  setPlanTable(data: PlanTable): IView;
  updateDevices(data: ViewDeviceData[]): IView;
}
