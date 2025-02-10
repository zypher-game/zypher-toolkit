import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SLevelRewardData extends GStatic {
    public parse(obj: any): boolean {
        for (let i = 0; i < obj.data.length; i++) {
            let raw = GStatic.addonRaw<SLevelRewardDataRaw>(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    }
}