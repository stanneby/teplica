import { defaults } from "../defaults";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../../front/shared/common-types";

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
        "humidity sensor",
        "illumination sensor",
      ],
    },
    {
      name: "Joe Mama",
      devices: [
        "heater",
        "humidifier",
        "illumination",
        "illumination",
        "temperature sensor",
        "active temperature sensor",
        "nutritioner",
      ],
    },
    {
      name: "all in one",
      devices: [
        "heater",
        "humidifier",
        "illumination",
        "nutritioner",
        "temperature sensor",
        "active humidity sensor",
        "illumination sensor",
        "active pH sensor",
      ],
    },
  ];
}

export class DevicePresentationDataDirector {
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
      this.builder
        .addType("humidifier")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(0, 153, 255);"/></svg>'
        )
        .randomActive();
    } else if (name == "nutritioner") {
      this.builder
        .addType("nutritioner")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(87, 57, 0);"/></svg>'
        )
        .randomActive();
    } else if (name == "illumination") {
      this.builder
        .addType("illumination")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect x="4.256" y="3.689" width="490.804" height="493.401" style="fill: rgb(217, 255, 0);"/><rect x="69.177" y="72.505" width="357.066" height="349.276" style=""/></svg>'
        )
        .addValueName("percents of daylight")
        .randomValue();
    } else if (name == "temperature sensor") {
      this.builder
        .addIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
        </svg>`
        )
        .addType("temperature sensor")
        .addValueName("DegC")
        .randomValue();
    } else if (name == "active temperature sensor") {
      this.builder
        .addType("active temperature sensor")
        .addIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgb(255, 0, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/>
        </svg>`
        )
        .randomActive();
    } else if (name == "humidity sensor") {
      this.builder
        .addType("humidity sensor")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(0, 153, 255);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>'
        )
        .addValueName("percent")
        .randomValue();
    } else if (name == "active humidity sensor") {
      this.builder
        .addType("active humidity sensor")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(0, 153, 255);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>'
        )
        .randomActive();
    } else if (name == "pH sensor") {
      this.builder
        .addIcon("pH sensor")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(87, 57, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>'
        )
        .addValueName("pH")
        .randomValue();
    } else if (name == "active pH sensor") {
      this.builder
        .addType("active pH sensor")
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><ellipse style="fill: rgb(87, 57, 0);" cx="250.381" cy="249.542" rx="243.509" ry="244.051"/></svg>'
        )
        .randomActive();
    } else if (name == "illumination sensor") {
      this.builder
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="0 0 500 500"><path d="M 150.667 117.667 m -249.722 0 a 249.722 249.722 0 1 0 499.444 0 a 249.722 249.722 0 1 0 -499.444 0 Z M 150.667 117.667 m -149.833 0 a 149.833 149.833 0 0 1 299.666 0 a 149.833 149.833 0 0 1 -299.666 0 Z" style="fill: rgb(217, 255, 0);" transform="matrix(-0.79052, 0.612436, -0.612436, -0.79052, 441.006739, 253.540604)" bx:shape="ring 150.667 117.667 149.833 149.833 249.722 249.722 1@03e62478"/><ellipse style="" cx="249.839" cy="254.424" rx="152.939" ry="155.651"/></svg>'
        )
        .addValueName("percent of daylight")
        .randomValue();
    } else if (name == "active illumination sensor") {
      this.builder
        .addIcon(
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="0 0 500 500"><path d="M 150.667 117.667 m -249.722 0 a 249.722 249.722 0 1 0 499.444 0 a 249.722 249.722 0 1 0 -499.444 0 Z M 150.667 117.667 m -149.833 0 a 149.833 149.833 0 0 1 299.666 0 a 149.833 149.833 0 0 1 -299.666 0 Z" style="fill: rgb(217, 255, 0);" transform="matrix(-0.79052, 0.612436, -0.612436, -0.79052, 441.006739, 253.540604)" bx:shape="ring 150.667 117.667 149.833 149.833 249.722 249.722 1@03e62478"/><ellipse style="" cx="249.839" cy="254.424" rx="152.939" ry="155.651"/></svg>'
        )
        .randomActive();
    }

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

export function updateDevicePresentationData(
  devices: DevicePresentationData[]
) {
  devices.forEach((element) => {
    if (element.value) {
      element.value = `${getRandomInt(100)}`;
    }
    if (element.active !== undefined) {
      element.active = getRandomInt(2) == 0 ? true : false;
    }
  });
}
