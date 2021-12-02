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

    if (name == "heater") {
      result = this.builder
        .addId()
        .addType("heater")
        .addValueName("DegC")
        .randomValue()
        .randomActive()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "humidifier") {
      result = this.builder
        .addId()
        .addType("humidifier")
        .randomActive()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "nutritioner") {
      result = this.builder
        .addId()
        .addType("nutritioner")
        .randomActive()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "illumination") {
      result = this.builder
        .addId()
        .addType("illumination")
        .addType("percents_of_daylight")
        .randomValue()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "temperature_sensor") {
      result = this.builder
        .addId()
        .addType("temperature sensor")
        .addValueName("DegC")
        .randomValue()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "temperature_sensor_active") {
      result = this.builder
        .addId()
        .addType("active temperature sensor")
        .randomActive()
        .randomX()
        .randomY()
        .getResult();
    } else if (name == "illumination_sensor") {
      result = this.builder
        .addId()
        .addType("illumination sensor")
        .addValueName("percents_of_daylight")
        .randomValue()
        .randomX()
        .randomY()
        .getResult();
    } else {
      result = this.builder.addId().randomX().randomY().getResult();
    }

    this.builder.reset();
    return result;
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
