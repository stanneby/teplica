import { PlanEntryDecorator } from "../../shared/plans/plan-wrappers";
import { Plan, PlanEntry } from "../../shared/plans/plans";
import { DeviceType } from "../../shared/devices/device-interface";

export class PlansComponent {
  private plans: Plan[] = [];
  private plan: Plan;
  private entry: PlanEntry;

  async loadPlansFromDefaultFile(): Promise<void> {
    // for now
    this.plans = new PlansMocker().getPlans();
  }

  getPlans(): Plan[] {
    return this.plans;
  }

  reset(planName: string) {
    this.plan = this.plans.find((plan) => {
      return plan.name == planName;
    });
  }

  getPlan() {
    return this.plan;
  }

  getEntry() {
    return this.entry;
  }

  setEntry(entry: PlanEntry) {
    this.entry = entry;
  }
}

class PlansMocker {
  getPlans(): Plan[] {
    let plans: Plan[] = [];

    plans.push(
      constructPlan("temperature", 10, [
        DeviceType.TemperatureSensor,
        DeviceType.TemperatureEnvDevice,
      ])
    );
    plans.push(constructPlan("potatos", 10, [1, 2, 3]));
    plans.push(constructPlan("roses", 7, [1, 2, 3, 6, 7]));
    plans.push(constructPlan("Joe Mama", 20, [1, 1, 1, 2, 3, 4, 5, 6, 7]));
    plans.push(constructPlan("all in one", 20, [1, 1, 1, 2, 3, 4, 5, 6, 7]));

    return plans;
  }
}

function constructPlan(
  name: string,
  entryNum: number,
  deviceTypeList: DeviceType[]
) {
  let plan = {} as Plan;

  plan.name = name;
  plan.deviceTypes = deviceTypeList;

  plan.entries = new PlanEntryFactory(entryNum).getEntries();

  return plan;
}

class PlanEntryFactory {
  private delta = 50000;
  private timestamp = 0;
  private entries: PlanEntry[] = [];

  constructor(entryNum: number) {
    for (let i = 0; i < entryNum; i++) {
      this.createEntry();
    }
  }

  createEntry() {
    let entry = {} as PlanEntry;
    entry = new PlanEntryDecorator(entry)
      .setTimestamp(this.timestamp)
      .setEndTimeStamp(this.timestamp + this.delta)
      .getEntry();
    this.timestamp += 50000;
    this.entries.push(entry);
  }
  getEntries() {
    return this.entries;
  }
}
