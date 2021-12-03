import { BaseComponent } from "../base-component";

export class IconComponent extends BaseComponent {
  constructor(svg: string, styles: string[] = []) {
    styles.push("icon");
    super("div", styles);
    this.element.innerHTML = svg;
  }
}
