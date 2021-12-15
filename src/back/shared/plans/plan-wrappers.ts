import { PlanEntry } from "./plans";

export class PlanEntryDecorator {
  constructor(private entry: PlanEntry) {
    this.entry.humidity = 0;
    this.entry.illumination = 100;
    this.entry.temperature = 30;
    this.entry.pH = 4.5;
  }

  setTimestamp(timestamp: number): PlanEntryDecorator {
    this.entry.startTimestamp = timestamp;
    return this;
  }

  getEntry(): PlanEntry {
    return this.entry;
  }
}
