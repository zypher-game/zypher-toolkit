import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SGuideChainData extends GStatic {
    public parse(obj: any): boolean {
        for (let i = 0; i < obj.data.length; i++) {
            let raw = GStatic.addonRaw<SGuideChainDataRaw>(obj.data[i]);
            this._data.set(raw.guideId, raw);
        }
        return true;
    }
}