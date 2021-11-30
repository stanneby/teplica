import { defaults } from "../../shared/defaults";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "./common-types";

function getRandomInt(max: number) {
  return Math.floor(Math.random());
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
      devices: ["heater", "heater", "nutritioner", "humidity_sensor"],
    },
    {
      name: "joe mama",
      devices: [
        "heater",
        "humidifier",
        "illumination",
        "illumination",
        "temperature_sensor",
        "nutritioner",
      ],
    },
  ];
}

// export class PresentationMocker {
//   private tables: PlanTablePresentationData[];
//   constructor() {
//     this.tables = mockPresentationData.mockPlanTablePresentationData;
//   }

//   getPresentationDeviceUpdate(): DevicePresentationData {
//     let data: DevicePresentationData;

//     this.tables.forEach((element) => {
//       let index = getRandomInt(element.devices.length);
//       let device = element
//     });

//     return data;
//   }
// }
