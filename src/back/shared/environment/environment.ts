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

  start() {
    if (!this.started) {
      this.reset();
      this.interval = setInterval(this.ping.bind(this), this.timeout);
    }

    this.started = true;
  }

  stop() {
    if (this.started) {
      this.reset();
      clearInterval(this.interval);
    }

    this.started = false;
  }

  reset() {
    console.log("ENV RESET");

    this.temperature = 30;
    this.temperatureSources = [];
    this.temperatureMultiplier = 0.1;
    this.temperatureMin = -100;
    this.temperatureMax = 100;
    this.backgroundTemperatureChange = 3;

    this.humidity = 30;
    this.humiditySources = [];
    this.humidityMultiplier = 0.05;
    this.humidityMin = 0;
    this.humidityMax = 100;
    this.backgroundHumidityChange = 3;

    this.illumination = 100;
    this.illuminationSources = [];
    this.illuminationMultiplier = 0.05;
    this.illuminationMin = 0;
    this.illuminationMax = 100;
    this.backgroundIlluminationChange = 3;

    this.pH = 3;
    this.pHSources = [];
    this.pHMultiplier = 0.05;
    this.pHMin = 0;
    this.pHMax = 8;
    this.backgroundpHChange = 0.3;
  }

  // Temperature

  private temperature: number;
  private temperatureSources: (() => SourceParam)[];
  private temperatureMultiplier: number;
  private temperatureMin: number;
  private temperatureMax: number;
  private backgroundTemperatureChange: number;
  getTemperature() {
    return this.temperature;
  }
  setTemperature(temp: number) {
    this.temperature = Math.min(
      Math.max(temp, this.temperatureMin),
      this.temperatureMax
    );
  }
  registerTemperatureSource(source: () => SourceParam) {
    this.temperatureSources.push(source);
  }

  // Humidity

  private humidity: number;
  private humiditySources: (() => SourceParam)[];
  private humidityMultiplier: number;
  private humidityMin: number;
  private humidityMax: number;
  private backgroundHumidityChange: number;
  getHumidity() {
    return this.humidity;
  }
  setHumidity(hum: number) {
    this.humidity = Math.min(Math.max(hum, this.humidityMin), this.humidityMax);
  }
  registerHumiditySource(source: () => SourceParam) {
    this.humiditySources.push(source);
  }

  // Illumination

  private illumination: number;
  private illuminationSources: (() => SourceParam)[];
  private illuminationMultiplier: number;
  private illuminationMin: number;
  private illuminationMax: number;
  private backgroundIlluminationChange: number;
  getIllumination() {
    return this.illumination;
  }
  setIllumination(ill: number) {
    this.illumination = Math.min(
      Math.max(ill, this.illuminationMin),
      this.illuminationMax
    );
  }
  registerIlluminationSource(source: () => SourceParam) {
    this.illuminationSources.push(source);
  }

  // pH

  private pH: number;
  private pHSources: (() => SourceParam)[];
  private pHMultiplier: number;
  private pHMin: number;
  private pHMax: number;
  private backgroundpHChange: number;
  getpH() {
    return this.pH;
  }
  setpH(hum: number) {
    this.pH = Math.min(Math.max(hum, this.pHMin), this.pHMax);
  }
  registerpHSource(source: () => SourceParam) {
    this.pHSources.push(source);
  }

  ping() {
    console.log(this.temperatureSources);
    let tempChange = 0;
    this.temperatureSources.forEach((elem) => {
      let source = elem();

      tempChange += source.active
        ? source.value * this.temperatureMultiplier
        : 0;
    });
    this.setTemperature(
      this.temperature + tempChange - this.backgroundTemperatureChange
    );

    let humChange = 0;
    this.humiditySources.forEach((elem) => {
      let source = elem();

      humChange += source.active ? source.value * this.humidityMultiplier : 0;
    });
    this.setHumidity(this.humidity + humChange - this.backgroundHumidityChange);

    let illLevel = 0;
    let illCount = 0;
    this.illuminationSources.forEach((elem) => {
      let source = elem();

      if (source.active) {
        illCount++;
        illLevel += source.value;
      }
    });
    this.setIllumination(illCount ? illLevel / illCount : 0);

    let pHChange = 0;
    this.pHSources.forEach((elem) => {
      let source = elem();

      pHChange += source.active ? source.value * this.pHMultiplier : 0;
    });
    this.setpH(this.pH + pHChange - this.backgroundpHChange);
  }
}
