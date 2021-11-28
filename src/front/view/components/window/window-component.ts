import { BaseComponent } from "../base-component";
import { ButtonGroupComponent } from "../button-group/button-group";
import { CustomizableButton } from "../button/customizable-button";
import { StandaloneButtonComponent } from "../button/standalone-button";

export class WindowComponent extends BaseComponent {
  constructor() {
    super();
    let stopStartButtons: CustomizableButton[] = [
      new CustomizableButton("start", () => {
        console.log("start");
      }),
      new CustomizableButton("stop", () => {
        console.log("stop");
      }),
    ];
    let stopStartButtonGroup = new ButtonGroupComponent(
      stopStartButtons
    ).render(this.element);
    new StandaloneButtonComponent("kek", () => {
      console.log("kek");
    }).render(this.element);
  }
}
