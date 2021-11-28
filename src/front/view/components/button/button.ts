import { BaseComponent } from "../base-component";

export class BaseButtonComponent extends BaseComponent {
  private activated: boolean = false;

  constructor(private name: string, private callback: () => void) {
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
    // console.log(this.name + " activated");
    return this;
  }

  deactivate(): BaseButtonComponent {
    this.activated = false;
    // console.log(this.name + " deactivated");
    return this;
  }
}
