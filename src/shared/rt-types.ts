import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../front/shared/common-types";

export enum RequestType {
  StartGrowth,
  StopGrowth,
  GivePlans,
  UpdateDevices,
}

export class JSONWrapper {
  readonly type: RequestType;
  protected readonly data: string;
}

export class StartGrowthJSONWrapper extends JSONWrapper {
  readonly type = RequestType.StartGrowth;
  protected readonly data: string;

  constructor(name: string) {
    super();
    this.data = name;
  }

  retreiveData(): string {
    return this.data;
  }
}

export class StopGrowthJSONWrapper extends JSONWrapper {
  readonly type = RequestType.StopGrowth;
  protected readonly data: string = "";
}

export class GivePlansJSONWrapper extends JSONWrapper {
  readonly type = RequestType.GivePlans;
  protected readonly data: string;

  constructor(tables: PlanTablePresentationData[]) {
    super();
    this.data = JSON.stringify(tables);
  }

  retrieveData(): PlanTablePresentationData[] {
    return JSON.parse(this.data) as PlanTablePresentationData[];
  }
}

export class UpdateDevicesJSONWrapper extends JSONWrapper {
  readonly type = RequestType.UpdateDevices;
  protected readonly data: string;

  constructor(devices: DevicePresentationData[]) {
    super();
    this.data = JSON.stringify(devices);
  }

  retrieveData(): DevicePresentationData[] {
    return JSON.parse(this.data) as DevicePresentationData[];
  }
}
