import { SLevelDataRaw } from "../../../../../d.ts/game/JXCLBtl";
import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SLevelData extends GStatic {
  public parse(obj: any): boolean {
    for (let i = 0; i < obj.data.length; i++) {
      let raw = GStatic.addonRaw<SLevelDataRaw>(obj.data[i]);
      this._data.set(raw.id, raw);
    }
    return true;
  }

  /**
   * 获取结算奖励
   * @param type 排位赛类型
   * @param level 关卡
   * @param isWin 是否胜利
   */
  public getVideoReward(type: number, level: number, isWin: boolean) {
    let arr = [];
    this._data.forEach((v: SLevelDataRaw) => {
      if (Number(v.type) == type && v.level == level) {
        arr = v.videoReward;
      }
    });
    return arr;
  }
}
