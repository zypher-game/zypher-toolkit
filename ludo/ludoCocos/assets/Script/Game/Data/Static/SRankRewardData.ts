import { GStatic } from "../../../Core/Manager/DataPool";

const { ccclass } = cc._decorator;
@ccclass
export class SRankRewardData extends GStatic {
    public parse(obj: any): boolean {
        for (let i = 0; i < obj.data.length; i++) {
            let raw = GStatic.addonRaw<SRankRewardDataRaw>(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    }

    /**获取总排位赛数量 */
    public getRankLevel(): number {
        let level = 0;
        this.data.forEach((v: SRankRewardDataRaw) => {
            if (level != Number(v.type)) {
                level++;
            }
        })
        return level;
    }

    /**获取某个排位赛数据 */
    public getRankLevelData(v): Array<SRankRewardDataRaw> {
        let level = v;
        let rankRewardData: SRankRewardDataRaw[] = [];
        this.data.forEach((v: SRankRewardDataRaw) => {
            if (level == Number(v.type)) {
                rankRewardData.push(v);
            }
        })
        return rankRewardData;
    }

    /**获取每个赛段的关卡数 */
    public getRankLevelNum(i: number) {
        let levelNum = 0;
        this.data.forEach((v: SRankRewardDataRaw) => {
            if (i == Number(v.type)) {
                levelNum = v.name;
            }
        })
        return levelNum
    }
}