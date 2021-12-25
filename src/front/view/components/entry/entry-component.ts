import { PlanTableRowPresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";
import { TextComponent } from "../text/text-component";

export class EntryComponent extends BaseComponent {
  private banner: TextComponent = new TextComponent().setText("Current plan:");

  private start: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private end: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private temperature: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private humidity: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private illumination: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private pH: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;

  constructor() {
    super("div");
  }

  update(row: PlanTableRowPresentationData) {
    this.start.setText(`entrey start:  ${row.start}`);
    this.end.setText(`entry end:    ${row.end}`);
    this.temperature.setText(`temperature:  ${row.temperature}`);
    this.humidity.setText(`humidity:     ${row.humidity}`);
    this.illumination.setText(`illumination: ${row.illumination}`);
    this.pH.setText(`pH:           ${row.ph}`);
  }
}
