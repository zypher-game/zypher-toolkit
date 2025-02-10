import { SSystemConfigRaw } from "../../../../../d.ts/game/JXCLBtl";
import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SSystemConfig extends GStatic {
  public parse(obj: any): boolean {
    for (let i = 0; i < obj.data.length; i++) {
      let raw = GStatic.addonRaw<SSystemConfigRaw>(obj.data[i]);
      this._data.set(raw.key, raw);
    }
    return true;
  }

  public value<T>(key: string): T {
    let raw = this.getRaw<SSystemConfigRaw>(key);
    if (!raw) return null;
    return raw.value as any;
  }
}
