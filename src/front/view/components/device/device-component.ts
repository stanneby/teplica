import { BaseComponent } from "../base-component";
import { DevicePresentationData } from "../../../shared/common-types";
import { TextComponent } from "../text/text-component";
import "./device-component.css";
import { IconComponent } from "../icon/icon-component";

export class DeviceComponent extends BaseComponent {
  public id: string | null;
  protected type: TextComponent | null;
  protected valueName: TextComponent | null;
  protected value: TextComponent | null;
  protected additionalValue: TextComponent | null;
  protected activeState: TextComponent | null;
  protected icon: IconComponent | null;
  protected infoContainer: BaseComponent | null;

  constructor(initialData: DevicePresentationData) {
    super("div", ["device"]);
    this.id = initialData.id;
    this.icon = new IconComponent(initialData.icon, ["device_icon"]).render(
      this.element
    );

    this.infoContainer = new BaseComponent("div", [
      "device_info-container",
    ]).render(this.element);

    this.type = new TextComponent(["device_type"])
      .setText(`Type: ${initialData?.type}`)
      .render(this.infoContainer.element) as TextComponent;
    this.valueName = new TextComponent(["device_value-name"]).render(
      this.infoContainer.element
    ) as TextComponent;
    this.additionalValue = new TextComponent([
      "device_additional-value",
    ]).render(this.infoContainer.element) as TextComponent;
    this.activeState = new TextComponent(["device_active-state"]).render(
      this.infoContainer.element
    ) as TextComponent;
    this.value = new TextComponent(["device_value"]).render(
      this.icon.element
    ) as TextComponent;

    this.update(initialData);
  }

  update(data: DevicePresentationData) {
    if (data.valueName) {
      this.valueName.setText(`Value name: ${data.valueName}`);
    } else {
      this.valueName.setText("Value name: -");
    }

    if (data.value) {
      this.value.setText(data.value);
      this.additionalValue.setText(`Value: ${data.value}`);
    } else {
      this.value.setText("");
      this.additionalValue.setText("Value: -");
    }

    if (data.active !== undefined) {
      this.element.classList.toggle("device__active", data.active);
      this.activeState.setText(`Active: ${data.active ? "yes" : "no"}`);
    } else {
      this.element.classList.toggle("device__active", false);
      this.activeState.setText("Active: -");
    }

    if (data.icon) {
      this.icon;
    }

    if (data.x && data.y) {
      this.element.style.left = `${data.x * 5}px`;
      this.element.style.top = `${data.y * 5}px`;
    }
  }
}
