import { PresentationData } from "../../../shared/common-types";
import { ISettableInterface } from "../../settable-interface";
import { BaseComponent } from "../base-component";
import { ButtonGroupComponent } from "../button-group/button-group";
import { CustomizableButton } from "../button/customizable-button";
import { StandaloneButtonComponent } from "../button/standalone-button";
import { Page } from "../pages/page";

export class WindowComponent
  extends BaseComponent
  implements ISettableInterface
{
  private page: Page & ISettableInterface;
  private stopStartButtonGroup: ButtonGroupComponent;
  constructor(startCallback: (name: string) => void, stopCallback: () => void) {
    super();
    let stopStartButtons: CustomizableButton[] = [
      new CustomizableButton("start", () => {
        startCallback(this.page.flushEnd());
      }),
      new CustomizableButton("stop", stopCallback),
    ];
    this.stopStartButtonGroup = new ButtonGroupComponent(
      1,
      stopStartButtons
    ).render(this.element) as ButtonGroupComponent;
  }
  setData(data: PresentationData[]): ISettableInterface {
    this.page.setData(data);
    return this;
  }

  setPage(page: Page, id: number) {
    if (this.page != undefined) {
      this.page.remove();
    }
    this.stopStartButtonGroup.deactivateByID(id);
    this.page = page.render(this.element) as Page & ISettableInterface;
  }
}
