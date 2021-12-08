import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../front/shared/common-types";

export enum RequestType {
  StartGrowth = 1,
  StopGrowth,
  GivePlans,
  UpdateDevices,
}

export class Message {
  constructor(readonly type: RequestType, readonly data: string) {}
}
