export enum DeviceType {
  EnvDevice,
  Sensor,
  ActiveSensor,
}

interface IDevice {
  readonly type: string;

  start(): IDevice;
  stop(): IDevice;
  getValue(): number | boolean;
}

export interface EnvDevice extends IDevice {}
