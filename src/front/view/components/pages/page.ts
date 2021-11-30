import { PresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";

export class Page extends BaseComponent {
  constructor(styles: string[] = []) {
    super("div", styles);
  }
}
