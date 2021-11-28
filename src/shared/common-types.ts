export class TimeStamp {
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;

  constructor(day: number, hour: number, minute: number, second: number) {
    if (
      day < 0 ||
      hour > 23 ||
      hour < 0 ||
      minute < 0 ||
      minute > 59 ||
      second < 0 ||
      second > 59
    ) {
      throw Error("WRONG DATE FORMAT");
    } else {
      this.day = day;
      this.hour = hour;
      this.minute = minute;
      this.second = second;
    }
  }

  getString(): string {
    return `day ${this.day}, ${this.hour}:${this.minute}:${this.second}`;
  }

  increase(): TimeStamp {
    let second = this.second + 1;
    let minute;
    let hour;
    let day;
    if (second == 60) {
      second = 0;
      minute = this.minute + 1;
    }
    if (minute == 60) {
      minute = 0;
      hour = this.hour + 1;
    }
    if (hour == 24) {
      hour = 0;
      day = this.day + 1;
    }
    let newTimeStamp = new TimeStamp(day, hour, minute, second);
    return newTimeStamp;
  }
}

export class TimePeriod {
  constructor(readonly start: TimeStamp, readonly end: TimeStamp) {}

  getString(): string {
    return `from ${this.start.getString()} to ${this.end.getString()}`;
  }
}

export type PlanTableRow = {
  period: TimePeriod;
  temperature: number;
  humidity: number;
  illumination: number;
  nutrients: number;
  ph: number;
};

export type PlanTable = {
  name: string;
  data: PlanTableRow;
};
