export enum DeviceType {
  IlluminationEnvDevice = 1,
  TemperatureEnvDevice,
  HumidityEnvDevice,
  PHEnvDevice,
  IllumintionSensor,
  TemperatureSensor,
  HumiditySensor,
  PHSensor,
  IlluminationActiveSensor,
  TemperatureActiveSensor,
  HumidityActiveSensor,
  PHActiveSensor,
}

export type DevicePayload = {
  value?: number;
  active?: boolean;
};

export interface IDevice {
  readonly id: string;
  readonly type: DeviceType;
  readonly measureUnit: string;
  readonly x: number;
  readonly y: number;

  getPayload(): DevicePayload;
}
