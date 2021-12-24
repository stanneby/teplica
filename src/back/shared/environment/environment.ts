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

  // Temperature

  private temperature: number = 30;
  private temperatureSources: (() => SourceParam)[] = [];
  private temperatureMultiplier: number = 0.1;
  private temperatureMin: number = -100;
  private temperatureMax: number = 100;
  private backgroundTemperatureChange: number = 3;
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

  private humidity: number = 30;
  private humiditySources: (() => SourceParam)[] = [];
  private humidityMultiplier: number = 0.05;
  private humidityMin: number = 0;
  private humidityMax: number = 100;
  private backgroundHumidityChange: number = 3;
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

  private illumination: number = 100;
  private illuminationSources: (() => SourceParam)[] = [];
  private illuminationMultiplier: number = 0.05;
  private illuminationMin: number = 0;
  private illuminationMax: number = 100;
  private backgroundIlluminationChange: number = 3;
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

  private pH: number = 3;
  private pHSources: (() => SourceParam)[] = [];
  private pHMultiplier: number = 0.05;
  private pHMin: number = 0;
  private pHMax: number = 8;
  private backgroundpHChange: number = 0.3;
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
    // console.log(this.humidity);
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
