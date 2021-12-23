import { SourceParam } from "./sourceParam";

export class Environment {
  private static instance: Environment;

  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }

    return Environment.instance;
  }

  private timeout: number = 5000;
  private interval: NodeJS.Timer;
  private started: boolean = false;

  private constructor() {}

  private temperature: number = 0;
  private temperatureSources: (() => SourceParam)[] = [];
  private temperatureMultiplier: number = 0.05;
  private temperatureMin: number = -100;
  private temperatureMax: number = 100;

  start() {
    if (!this.started) {
      this.interval = setInterval(this.ping.bind(this), this.timeout);
    }

    this.started = true;
  }

  stop() {
    if (this.started) {
      clearInterval(this.interval);
    }

    this.started = false;
  }

  getTemperature() {
    return this.temperature;
  }

  registerTemperatureSource(source: () => SourceParam) {
    this.temperatureSources.push(source);
  }

  ping() {
    let tempChange = 0;
    this.temperatureSources.forEach((elem) => {
      let source = elem();

      tempChange += source.active
        ? source.value * this.temperatureMultiplier
        : 0;
    });

    console.log(this.temperatureSources);

    this.temperature += tempChange;
  }
}
