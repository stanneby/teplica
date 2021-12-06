import { BaseComponent } from "../base-component";
import { BaseButtonComponent } from "../button/button";
import { CustomizableButton } from "../button/customizable-button";

export class ButtonGroupComponent extends BaseComponent {
  constructor(inactiveDefault: number, private buttons: CustomizableButton[]) {
    super();
    buttons.forEach((button, index) => {
      button.render(this.element);
      button.addActiveCallback(() => {
        this.activateAll();
        button.deactivate();
      });
    });
    if (inactiveDefault < this.buttons.length) {
      buttons[inactiveDefault].deactivate();
    }
  }

  deactivateAll(): ButtonGroupComponent {
    this.buttons.forEach((button) => {
      button.deactivate();
    });
    return this;
  }

  activateAll(): ButtonGroupComponent {
    this.buttons.forEach((button) => {
      button.activate();
    });
    return this;
  }
}
