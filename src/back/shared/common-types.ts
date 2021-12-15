type PlanEntry = {
  startTimestamp: number;
  ifEnd: boolean;
  temperature: number;
  illumination: number;
  humidity: number;
  pH: number;
};

export type Plan = {
  name: string;
  entries: PlanEntry[];
};
