import { PlanTablePresentationData } from "../../front/shared/common-types";
import { DeviceType } from "../shared/devices/device-interface";
import { Plan } from "../shared/plans/plans";

export class BackTranslator {
  static translationTable: { type: DeviceType; name: string }[] = [
    { type: DeviceType.HumidityActiveSensor, name: "active humidity sensor" },
    { type: DeviceType.HumidityEnvDevice, name: "humidifier" },
    { type: DeviceType.HumiditySensor, name: "humidity sensor" },
    {
      type: DeviceType.IlluminationActiveSensor,
      name: "active illumination sensor",
    },
    { type: DeviceType.IlluminationEnvDevice, name: "illumination" },
    { type: DeviceType.IllumintionSensor, name: "illumination sensor" },
    { type: DeviceType.PHActiveSensor, name: "active pH sensor" },
    { type: DeviceType.PHEnvDevice, name: "nutritioner" },
    { type: DeviceType.PHSensor, name: "pH sensor" },
    {
      type: DeviceType.TemperatureActiveSensor,
      name: "active temperature sensor",
    },
    { type: DeviceType.TemperatureEnvDevice, name: "heater" },
    { type: DeviceType.TemperatureSensor, name: "temperature sensor" },
  ];

  translate(plans: Plan[]): PlanTablePresentationData[] {
    let presentationData = [] as PlanTablePresentationData[];

    plans.forEach((plan) => {
      presentationData.push(this.translateTable(plan));
    });

    return presentationData;
  }

  private translateTable(plan: Plan) {
    let presentation: PlanTablePresentationData =
      {} as PlanTablePresentationData;
    presentation.name = plan.name;
    presentation.devices = [];

    plan.deviceTypes.forEach((device) => {
      let name: string = "kek";

      name = BackTranslator.translationTable.find((trans) => {
        return trans.type == device;
      }).name;

      presentation.devices.push(name);
    });

    return presentation;
  }
}
