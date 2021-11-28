import { BaseButtonComponent } from "./button";

export class CustomizableButton extends BaseButtonComponent {
  constructor(name: string, callback: () => void) {
    super(name, callback);
  }

  addActiveCallback(callback: () => void) {
    this.element.addEventListener("click", callback);
  }

  removeActiveCallback(callback: () => void) {
    this.element.removeEventListener("click", callback);
  }
}
