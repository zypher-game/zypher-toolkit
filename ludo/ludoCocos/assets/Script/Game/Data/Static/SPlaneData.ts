import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SPlaneData extends GStatic {
	public parse(obj: any): boolean {
		for (let i = 0; i < obj.data.length; i++) {
			let raw = GStatic.addonRaw<SPlaneDataRaw>(obj.data[i]);
			this._data.set(raw.id, raw);
		}
		return true;
	}

}