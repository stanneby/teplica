import { PlanEntryDecorator } from "../../shared/plans/plan-wrappers";
import { Plan, PlanEntry } from "../../shared/plans/plans";
import { DeviceType } from "../../shared/devices/device-interface";

export class PlansComponent {
  private plans: Plan[] = [];

  async loadPlansFromDefaultFile(): Promise<void> {
    // for now
    this.plans = new PlansMocker().getPlans();
  }

  getPlans(): Plan[] {
    return this.plans;
  }

  findPlanByName(planName: string) {
    return this.plans.find((plan) => {
      return plan.name == planName;
    });
  }
}

class PlansMocker {
  getPlans(): Plan[] {
    let plans: Plan[] = [];

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
      .getEntry();
    this.timestamp += 5000;
    this.entries.push(entry);
  }
  getEntries() {
    return this.entries;
  }
}
