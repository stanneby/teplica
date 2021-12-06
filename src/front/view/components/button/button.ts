import { BaseComponent } from "../base-component";
import "./button.css";

export class BaseButtonComponent extends BaseComponent {
  private activated: boolean = true;

  constructor(private name: string, private callback: (arg?: string) => void) {
    super("button");
    this.element.innerHTML = name;
    this.element.addEventListener("click", () => {
      // console.log(this.activated);
      if (this.activated) {
        this.callback();
      }
    });
  }

  activate(): BaseButtonComponent {
    this.activated = true;
    this.element.classList.remove("button__inactive");
    // console.log(this.name + " activated");
    return this;
  }

  deactivate(): BaseButtonComponent {
    this.activated = false;
    this.element.classList.add("button__inactive");
    // console.log(this.name + " deactivated");
    return this;
  }
}
