import { DeviceType } from "../devices/device-interface";

export type PlanEntry = {
  startTimestamp: number;
  endTimestamp: number;
  ifEnd: boolean;
  temperature: number;
  illumination: number;
  humidity: number;
  pH: number;
};

export type Plan = {
  name: string;
  entries: PlanEntry[];
  deviceTypes: DeviceType[];
};
