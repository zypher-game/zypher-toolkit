import { GStatic } from "../../../Core/Manager/DataPool";
import { SGuideStepDataRaw } from "../../Guide/Guide.type";

const { ccclass } = cc._decorator;
@ccclass
export class SGuideStepData extends GStatic {
  public parse(obj: any): boolean {
    for (let i = 0; i < obj.data.length; i++) {
      let raw = GStatic.addonRaw<SGuideStepDataRaw>(obj.data[i]);
      this._data.set(raw.stepId, raw);
    }
    return true;
  }
}
