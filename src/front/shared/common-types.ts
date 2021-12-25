import { mockPresentationData } from "../../shared/mock/mock";

export type PresentationData = {};

interface IDevicePresentationData extends PresentationData {
  id: string;
  type: string | undefined | null;
  valueName: string | undefined | null;
  value: string | undefined | null;
  active: boolean | undefined | null;
  x: number;
  y: number;
  icon: string | undefined | null;
}

export type DevicePresentationData = IDevicePresentationData;

export type PlanTableRowPresentationData = {
  start: number;
  end: number;
  temperature: number;
  humidity: number;
  illumination: number;
  nutrients: number;
  ph: number;
};

interface IGrowthPresentationData extends mockPresentationData {
  entry: PlanTableRowPresentationData;
  timestamp: number;
  devices?: DevicePresentationData[];
}

export type GrowthPresentationData = IGrowthPresentationData;

interface IPlanTablePresentationData extends PresentationData {
  name: string;
  devices: string[];
}

export type PlanTablePresentationData = IPlanTablePresentationData;
