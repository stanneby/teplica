export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: string = "div", styles: string[] = []) {
    this.element = document.createElement(tag);
    styles.forEach((style) => {
      this.element.classList.add(style);
    });
  }

  public render(parent: HTMLElement): BaseComponent {
    parent.appendChild(this.element);
    return this;
  }

  public hide(): BaseComponent {
    this.element.classList.toggle("hidden", true);
    return this;
  }

  public show(): BaseComponent {
    this.element.classList.toggle("hidden", false);
    return this;
  }

  remove(): BaseComponent {
    this.element.remove();
    return this;
  }
}
