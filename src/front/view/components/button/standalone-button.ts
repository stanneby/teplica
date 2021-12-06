import { BaseButtonComponent } from "./button";

export class StandaloneButtonComponent extends BaseButtonComponent {
  constructor(name: string, callback: () => void) {
    super(name, callback);
    this.activate();
  }
}
