export type PresentationData = {};

interface IDevicePresentationData extends PresentationData {
  id: string;
  type: string | undefined | null;
  valueName: string | undefined | null;
  value: string | undefined | null;
  active: boolean | undefined | null;
  x: number | undefined | null;
  y: number | undefined | null;
  icon: string | undefined | null;
}

export type DevicePresentationData = IDevicePresentationData;

export type PlanTableRowData = {
  temperature: number;
  humidity: number;
  illumination: number;
  nutrients: number;
  ph: number;
};

interface IPlanTablePresentationData extends PresentationData {
  name: string;
  devices: string[];
}

export type PlanTablePresentationData = IPlanTablePresentationData;
