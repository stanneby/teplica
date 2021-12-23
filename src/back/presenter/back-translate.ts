import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../../front/shared/common-types";
import { DeviceType, IDevice } from "../shared/devices/device-interface";
import { Plan } from "../shared/plans/plans";

export class BackTranslator {
  static translationTable: { type: DeviceType; name: string; icon: string }[] =
    [
      {
        type: DeviceType.HumidityActiveSensor,
        name: "active humidity sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(0, 153, 255);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>',
      },
      {
        type: DeviceType.HumidityEnvDevice,
        name: "humidifier",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(0, 153, 255);"/></svg>',
      },
      {
        type: DeviceType.HumiditySensor,
        name: "humidity sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(0, 153, 255);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>',
      },
      {
        type: DeviceType.IlluminationActiveSensor,
        name: "active illumination sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="0 0 500 500"><path d="M 150.667 117.667 m -249.722 0 a 249.722 249.722 0 1 0 499.444 0 a 249.722 249.722 0 1 0 -499.444 0 Z M 150.667 117.667 m -149.833 0 a 149.833 149.833 0 0 1 299.666 0 a 149.833 149.833 0 0 1 -299.666 0 Z" style="fill: rgb(217, 255, 0);" transform="matrix(-0.79052, 0.612436, -0.612436, -0.79052, 441.006739, 253.540604)" bx:shape="ring 150.667 117.667 149.833 149.833 249.722 249.722 1@03e62478"/><ellipse style="" cx="249.839" cy="254.424" rx="152.939" ry="155.651"/></svg>',
      },
      {
        type: DeviceType.IlluminationEnvDevice,
        name: "illumination",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(217, 255, 0);"/><rect x="69.177" y="72.505" width="357.066" height="349.276" style=""/></svg>',
      },
      {
        type: DeviceType.IllumintionSensor,
        name: "illumination sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="0 0 500 500"><path d="M 150.667 117.667 m -249.722 0 a 249.722 249.722 0 1 0 499.444 0 a 249.722 249.722 0 1 0 -499.444 0 Z M 150.667 117.667 m -149.833 0 a 149.833 149.833 0 0 1 299.666 0 a 149.833 149.833 0 0 1 -299.666 0 Z" style="fill: rgb(217, 255, 0);" transform="matrix(-0.79052, 0.612436, -0.612436, -0.79052, 441.006739, 253.540604)" bx:shape="ring 150.667 117.667 149.833 149.833 249.722 249.722 1@03e62478"/><ellipse style="" cx="249.839" cy="254.424" rx="152.939" ry="155.651"/></svg>',
      },
      {
        type: DeviceType.PHActiveSensor,
        name: "active pH sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(87, 57, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>',
      },
      {
        type: DeviceType.PHEnvDevice,
        name: "nutritioner",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(87, 57, 0);"/></svg>',
      },
      {
        type: DeviceType.PHSensor,
        name: "pH sensor",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(87, 57, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>',
      },
      {
        type: DeviceType.TemperatureActiveSensor,
        name: "active temperature sensor",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
    </svg>`,
      },
      {
        type: DeviceType.TemperatureEnvDevice,
        name: "heater",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <rect x="1.448" y="1.152" width="496.78" height="495.696" style="paint-order: fill; fill-rule: nonzero; fill: rgb(255, 0, 0);"/>
  </svg>`,
      },
      {
        type: DeviceType.TemperatureSensor,
        name: "temperature sensor",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
  </svg>`,
      },
    ];

  translatePlans(plans: Plan[]): PlanTablePresentationData[] {
    let presentationData = [] as PlanTablePresentationData[];

    plans.forEach((plan) => {
      presentationData.push(this.translateTable(plan));
    });

    return presentationData;
  }

  translateDevices(devices: IDevice[]): DevicePresentationData[] {
    let presentationData: DevicePresentationData[] = [];

    devices.forEach((device) => {
      presentationData.push(this.translateDevice(device));
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

  private translateDevice(device: IDevice): DevicePresentationData {
    let presentation: DevicePresentationData = {} as DevicePresentationData;

    presentation.id = device.id;
    presentation.x = device.x;
    presentation.y = device.y;

    let payload = device.getPayload();
    if (payload.value !== undefined)
      presentation.value = `${Math.trunc(payload.value)}`;
    if (payload.active !== undefined) presentation.active = payload.active;

    if (device.measureUnit !== undefined)
      presentation.valueName = device.measureUnit;

    let trans = BackTranslator.translationTable.find((trans) => {
      return trans.type === device.type;
    });

    presentation.type = trans.name;
    presentation.icon = trans.icon;

    return presentation;
  }
}
