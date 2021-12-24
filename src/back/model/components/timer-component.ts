import { Plan, PlanEntry } from "../../shared/plans/plans";

export class TimerComponent {
  private startTime: number;

  reset() {
    this.startTime = Date.now();
  }

  getCurrentTime() {
    return Date.now() - this.startTime;
  }

  check(entry: PlanEntry) {
    if (entry == undefined) {
      return false;
    }
    return this.getCurrentTime() < entry.endTimestamp;
  }

  chooseEntry(plan: Plan) {
    let currentTimeElapsed = Date.now() - this.startTime;

    return plan.entries.find((entry) => {
      return (
        entry.startTimestamp <= currentTimeElapsed &&
        entry.endTimestamp > currentTimeElapsed
      );
    });
  }
}
