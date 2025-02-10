import { IGradeRankInfo, SNpcDataRaw } from "../../../../../d.ts/game/JXCLBtl";
import { OBJECT_COPY } from "../../../Core/CoreDefine";
import { GLocal } from "../../../Core/Manager/DataPool";
import MathEx from "../../../Core/Math/MathEx";
import { RANKLV } from "../../Common/Define";
import GameMgr from "../../Logic/GameMgr";
const { ccclass } = cc._decorator;
@ccclass
export class LRobotGradeData extends GLocal {
  public $localKey = "LRobotGradeData";
  public $userGradeInfo: IGradeRankInfo[] = [];
  onInit() {
    this.load();
    if (this.$userGradeInfo.length <= 0) {
      this.initNewSeason();
    }
    this.set();
  }

  /**初始化新赛季 */
  public initNewSeason(pastDay = 0) {
    this.$userGradeInfo = [];
    let robotDatas = GameMgr.npcData.data.values<SNpcDataRaw>();
    robotDatas.forEach((v, s) => {
      let info: IGradeRankInfo = {
        isSelf: 0,
        name: v.name,
        icon: v.icon,
        levelLv: MathEx.random(1, 3),
        starNum: MathEx.random(1, 3),
      };
      this.$userGradeInfo.push(info);
    });
  }

  /**刷新当前赛季段位信息 */
  public brushSeasonLevelInfo() {
    let arr: IGradeRankInfo[] = [];
    this.$userGradeInfo.forEach((v, s) => {
      let info = this.brushRobotGradeLevelInfo(v);
      arr.push(info);
    });
    this.$userGradeInfo = [];
    this.$userGradeInfo = arr;
    this.set();
  }

  /**当前赛季段位排序由高到低 */
  public curSeasonLevel() {}

  /**修改机器人段位信息 */
  protected brushRobotGradeLevelInfo(v: IGradeRankInfo) {
    if (v.levelLv >= 1 && v.starNum >= 0) {
      let star = MathEx.random(-1, 2);
      v.starNum += star;
      if (v.starNum > 3) {
        v.levelLv++;
        if (v.levelLv >= RANKLV.RANKLV7) {
          v.levelLv = RANKLV.RANKLV7;
        } else {
          v.starNum -= 3;
        }
      } else if (v.starNum < 0) {
        v.levelLv--;
        v.starNum += 3;
        if (v.levelLv < 1) {
          v.levelLv = 1;
          if (v.starNum < 0) {
            v.starNum = 0;
          }
        }
      }
    } else {
      v.levelLv = 1;
      v.starNum = 0;
    }
    return v;
  }

  /**获取所有机器人信息 */
  public getAll(): Array<IGradeRankInfo> {
    return OBJECT_COPY(this.$userGradeInfo);
  }

  /**随机机器人 */
  public randomRobotGrade(): IGradeRankInfo {
    let num = MathEx.random(0, this.$userGradeInfo.length - 1);
    return this.$userGradeInfo[num];
  }
}
