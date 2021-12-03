import { defaults } from "../../shared/defaults";
import { IView } from "../view/view-interface";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "./common-types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateRandomPlanTableData(): PlanTablePresentationData[] {
  const numTables = 3;
  let result: PlanTablePresentationData[];

  for (let i = 0; i < numTables; i++) {
    let elem: PlanTablePresentationData;
    elem.name = `Plant ${i}`;
    let numDevices = getRandomInt(10);
    for (let j = 0; j < numDevices; j++) {
      elem.devices.push(
        defaults.defaultDevices[getRandomInt(defaults.length - 1)]
      );
    }
  }
  return result;
}

export class mockPresentationData {
  static mockPlanTablePresentationData: PlanTablePresentationData[] = [
    { name: "potatos", devices: ["heater", "humidifier", "nutritioner"] },
    {
      name: "roses",
      devices: [
        "heater",
        "heater",
        "nutritioner",
        "humidity_sensor",
        "illumination_sensor",
      ],
    },
    {
      name: "joe mama",
      devices: [
        "heater",
        "humidifier",
        "illumination",
        "illumination",
        "temperature_sensor",
        "temperature_sensor_active",
        "nutritioner",
      ],
    },
  ];
}

export class BackMocker {
  private plan: PlanTablePresentationData;
  private devices: DevicePresentationData[];
  private intervalId: ReturnType<typeof setInterval>;

  constructor() {}

  getPlanTables(): PlanTablePresentationData[] {
    return mockPresentationData.mockPlanTablePresentationData;
  }

  setPlan(name: string) {
    this.plan = mockPresentationData.mockPlanTablePresentationData.find(
      (element) => element.name == name
    );
  }

  startGrowth(onUpdateCallback: (data: DevicePresentationData[]) => IView) {
    this.devices = [];

    this.plan.devices.forEach((device) => {
      this.devices.push(new DevicePresentationDataDirector().create(device));
    });

    // this.intervalId = setInterval(() => {
    //   for (let i = 0; i < this.devices.length; i++) {
    //     updateDevicePresentationData(this.devices[i]);
    //   }

    //   // onUpdateCallback(newDevices);
    // }, 2000);

    onUpdateCallback(this.devices);

    this.intervalId = setInterval(() => {
      updateDevicePresentationData(this.devices);

      onUpdateCallback(this.devices);
    }, 2000);
  }

  stopGrowth() {
    this.devices = [];
    clearInterval(this.intervalId);
  }
}

class DevicePresentationDataDirector {
  private builder: DevicePresentationDataBuilder =
    new DevicePresentationDataBuilder();

  constructor() {}

  create(name: string): DevicePresentationData {
    let result: DevicePresentationData;
    this.builder.reset();
    this.builder.addId().randomX().randomY();

    if (name == "heater") {
      this.builder
        .addType("heater")
        .addIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <rect x="1.448" y="1.152" width="496.78" height="495.696" style="paint-order: fill; fill-rule: nonzero; fill: rgb(255, 0, 0);"/>
      </svg>`
        )
        .addValueName("DegC")
        .randomValue()
        .randomActive();
    } else if (name == "humidifier") {
      this.builder.addId().addType("humidifier").randomActive();
    } else if (name == "nutritioner") {
      this.builder.addId().addType("nutritioner").randomActive();
    } else if (name == "illumination") {
      this.builder
        .addType("illumination")
        .addValueName("percents of daylight")
        .randomValue();
    } else if (name == "temperature_sensor") {
      this.builder
        .addIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
        </svg>`
        )
        .addType("temperature sensor")
        .addValueName("DegC")
        .randomValue();
    } else if (name == "temperature_sensor_active") {
      this.builder
        .addType("active temperature sensor")
        .addIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
        </svg>`
        )
        .randomActive();
    } else if (name == "illumination_sensor") {
      this.builder
        .addType("illumination sensor")
        .addValueName("percents_of_daylight")
        .randomValue();
    } /*else if {
      result = this.builder.addId().addType("humidity sensor").addIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(0, 153, 255);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>').addValueName('percent').randomValue()
    } */

    return this.builder.getResult();
  }
}

class DevicePresentationDataRandomizer {
  protected device: DevicePresentationData;

  reset(): DevicePresentationDataRandomizer {
    this.device = {} as DevicePresentationData;
    return this;
  }

  randomValue(
    min: number = 0,
    max: number = 100
  ): DevicePresentationDataRandomizer {
    this.device.value = `${getRandomInt(max - min) + min}`;
    return this;
  }

  randomActive(): DevicePresentationDataRandomizer {
    this.device.active = getRandomInt(2) == 0 ? true : false;
    return this;
  }

  randomX(): DevicePresentationDataRandomizer {
    this.device.x = getRandomInt(100);
    return this;
  }

  randomY(): DevicePresentationDataRandomizer {
    this.device.y = getRandomInt(100);
    return this;
  }

  getResult(): DevicePresentationData {
    return this.device;
  }
}

class DevicePresentationDataBuilder extends DevicePresentationDataRandomizer {
  private static idCount: number = 0;

  addId(): DevicePresentationDataBuilder {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.device.id = `${DevicePresentationDataBuilder.idCount++}`;
    return this;
  }

  addType(type: string): DevicePresentationDataBuilder {
    this.device.type = type;
    return this;
  }

  addValueName(name: string): DevicePresentationDataBuilder {
    this.device.valueName = name;
    return this;
  }

  addIcon(icon: string): DevicePresentationDataBuilder {
    this.device.icon = icon;
    return this;
  }
}

function updateDevicePresentationData(devices: DevicePresentationData[]) {
  devices.forEach((element) => {
    if (element.value) {
      element.value = `${getRandomInt(100)}`;
    }
    if (element.active) {
      element.active = getRandomInt(2) == 0 ? true : false;
    }
  });
}
