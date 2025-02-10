import { CompareEnum } from "../Common/Define";

export interface RobotGradeFunc {
    (a: IGradeRankInfo, b: IGradeRankInfo, ext?: any): CompareEnum;
}

/**排列 */
export class IRobotGradeSort {
    /** 比较机器人段位等级 */
    public static sortLevel(a: IGradeRankInfo, b: IGradeRankInfo): CompareEnum {
        let tempalteA = a;
        let templateB = b;
        if (tempalteA.levelLv > templateB.levelLv) return CompareEnum.CGreater;
        else if (tempalteA.levelLv < templateB.levelLv) return CompareEnum.CLess;
        else return CompareEnum.CEQual;
    }

    /** 比较机器人星星数量 */
    public static sortStar(a: IGradeRankInfo, b: IGradeRankInfo): CompareEnum {
        let tempalteA = a;
        let templateB = b;
        if (tempalteA.starNum > templateB.starNum) return CompareEnum.CGreater;
        else if (tempalteA.starNum < templateB.starNum) return CompareEnum.CLess;
        else return CompareEnum.CEQual;
    }

    /**比较是否是玩家 */
    public static sortUser(a: IGradeRankInfo, b: IGradeRankInfo): CompareEnum {
        let tempalteA = a;
        let templateB = b;
        if (tempalteA.isSelf > templateB.isSelf) return CompareEnum.CGreater;
        else if (tempalteA.isSelf < templateB.isSelf) return CompareEnum.CLess;
        else return CompareEnum.CEQual;
    }

    /** 组合排序 */
    public static sorts(sortFuncs: RobotGradeFunc[], a: IGradeRankInfo, b: IGradeRankInfo): CompareEnum {
        for (let func of sortFuncs) {
            let ret = func(a, b);
            if (ret == CompareEnum.CEQual) continue;
            return ret;
        }
        return CompareEnum.CEQual;
    }
}