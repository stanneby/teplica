export enum DeviceType {
  EnvDevice,
  Sensor,
  ActiveSensor,
}

export type DevicePayload = {
  value?: number;
  active?: boolean;
};

export interface IDevice {
  readonly id: string;
  readonly type: string;
  readonly measureUnit: string;
  readonly x: number;
  readonly y: number;

  getPayload(): DevicePayload;

  start(): IDevice;
  stop(): IDevice;
}
