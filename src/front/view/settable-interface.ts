import { PresentationData } from "../shared/common-types";

export interface ISettableInterface {
  setData(data: PresentationData): ISettableInterface;
}
