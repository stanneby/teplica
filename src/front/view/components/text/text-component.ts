import { BaseComponent } from "../base-component";

export class TextComponent extends BaseComponent {
  constructor(styles: string[] = []) {
    super("div", styles);
  }

  setText(text: string): TextComponent {
    this.element.innerText = text;
    return this;
  }
}
