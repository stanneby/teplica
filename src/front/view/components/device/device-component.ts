import { BaseComponent } from "../base-component";
import { DevicePresentationData } from "../../../shared/common-types";
import { TextComponent } from "../text/text-component";

export class DeviceComponent extends BaseComponent {
  public id: string | null;
  protected type: TextComponent | null;
  protected valueName: TextComponent | null;
  protected value: TextComponent | null;

  constructor(initialData: DevicePresentationData) {
    super("div");
    this.id = initialData.id;
    this.type = new TextComponent().render(this.element) as TextComponent;
    this.valueName = new TextComponent().render(this.element) as TextComponent;
    this.value = new TextComponent().render(this.element) as TextComponent;
    this.update(initialData);
  }

  update(data: DevicePresentationData) {
    if (data.valueName) {
      this.valueName.setText(data.valueName);
    } else {
      this.valueName.setText("");
    }

    if (data.value) {
      this.value.setText(data.value);
    } else {
      this.value.setText("");
    }

    if (data.active) {
      this.element.classList.toggle("device__active", data.active);
    } else {
      this.element.classList.toggle("device__active", false);
    }
  }
}
