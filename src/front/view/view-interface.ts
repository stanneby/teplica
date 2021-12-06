import { DevicePresentationData } from "../shared/common-types";
import { PlanTablePresentationData } from "../shared/common-types";

export interface IView {
  setMode(mode: number): IView;
  givePlanTables(data: PlanTablePresentationData[]): IView;
  setPlanTable(data: PlanTablePresentationData): IView;
  updateDevices(data: DevicePresentationData[]): IView;
  start(): IView;
}
