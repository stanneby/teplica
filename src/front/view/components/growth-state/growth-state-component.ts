import { GrowthPresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";
import { EntryComponent } from "../entry/entry-component";
import { TextComponent } from "../text/text-component";
import "./growth-state.css";

export class GrowthStateComponent extends BaseComponent {
  private timestamp: TextComponent = new TextComponent().render(
    this.element
  ) as TextComponent;
  private entry: EntryComponent = new EntryComponent().render(
    this.element
  ) as EntryComponent;

  constructor() {
    super("div", ["growth-state"]);
  }

  update(data: GrowthPresentationData[]) {
    this.timestamp.setText(`TFS: ${data[0].timestamp}`);
    this.entry.update(data[0].entry);
  }
}
