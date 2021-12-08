import { IView } from "../../front/view/view-interface";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../../front/shared/common-types";
import {
  mockPresentationData,
  DevicePresentationDataDirector,
  updateDevicePresentationData,
} from "./mock";

export class Mocker {
  protected plan: PlanTablePresentationData;
  protected devices: DevicePresentationData[];
  protected intervalId: ReturnType<typeof setInterval>;
  protected interval: number = 5000;

  constructor() {}

  getPlanTables(): PlanTablePresentationData[] {
    return mockPresentationData.mockPlanTablePresentationData;
  }

  setPlan(name: string) {
    this.plan = mockPresentationData.mockPlanTablePresentationData.find(
      (element) => element.name == name
    );
  }

  stopGrowth() {
    this.devices = [];
    clearInterval(this.intervalId);
  }
}

export class FrontMocker extends Mocker {
  startGrowth(onUpdateCallback: (data: DevicePresentationData[]) => IView) {
    this.devices = [];

    this.plan.devices.forEach((device) => {
      this.devices.push(new DevicePresentationDataDirector().create(device));
    });

    onUpdateCallback(this.devices);

    this.intervalId = setInterval(() => {
      updateDevicePresentationData(this.devices);

      onUpdateCallback(this.devices);
    }, this.interval);
  }
}

export class BackMocker extends Mocker {
  startGrowth(onUpdateCallback: (data: DevicePresentationData[]) => void) {
    this.devices = [];

    this.plan.devices.forEach((device) => {
      this.devices.push(new DevicePresentationDataDirector().create(device));
    });

    this.intervalId = setInterval(() => {
      updateDevicePresentationData(this.devices);

      onUpdateCallback(this.devices);
    }, this.interval);
  }
}
