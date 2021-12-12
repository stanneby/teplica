export interface IModel {
  startGrowth(): IModel;
  stopGrowth(): IModel;

  addDeviceUpdateListener(callback: () => void): IModel;
  addGrowthStartListener(callback: () => void): IModel;
}
