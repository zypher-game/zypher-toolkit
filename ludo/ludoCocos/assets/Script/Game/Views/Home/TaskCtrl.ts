import { SLevelRewardDataRaw } from "../../../../../d.ts/game/JXCLBtl";
import { PRIORITY_VIEW } from "../../../Core/CoreDefine";
import ColorLog from "../../../Core/FrameEx/ColorLog";
import { GCtrl } from "../../../Core/GCtrl";
import GChild from "../../../Core/GView/GChild";
import { CMsg, RANKLV, taskState, taskType } from "../../Common/Define";
import GameMgr from "../../Logic/GameMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("View/Home/TaskCtrl")
export default class TaskCtrl extends GChild {
  /**段位奖励数据 */
  private _levelRewardData: SLevelRewardDataRaw = null;
  /**是否是当前段位奖励索引，可以开始判断是否达到领取该段位奖励要求 */
  private _bool: boolean = false;
  /**胜利场次 */
  private _battleWin: number = 0;

  /**是否开启统计胜利场次累加 */
  private _isOpenWin: taskState = taskState.notOpen;
  /**是否开启判断段位要求 */
  private _isRankLv: taskState = taskState.notOpen;
  /**是否开启判断星级要求 */
  private _isRankStar: taskState = taskState.notOpen;

  /**需要达到任务段位要求 */
  private _taskRankLv: number = RANKLV.RANKLV2;
  /**需要达到任务段位星数要求 */
  private _taskRankStar: number = RANKLV.RANKLV0;
  /**需要达到任务胜利场次要求 */
  private _taskBaskWin: number = RANKLV.RANKLV0;

  /**任务类型 */
  private _taskType: Array<number> = [];

  onLoad() {
    GCtrl.ES.on(
      CMsg.client.view.onBattleWin,
      this,
      this.onBattleWin.bind(this),
      PRIORITY_VIEW
    );
    this.init();
  }

  init() {
    if (
      GameMgr.lUserData.levelRewardNum >=
      GameMgr.levelRewardData.data.values().length
    ) {
      return;
    }
    this._battleWin = GameMgr.lUserData.levelRewardWin;
    this._levelRewardData = GameMgr.levelRewardData.getRaw<SLevelRewardDataRaw>(
      GameMgr.lUserData.levelRewardNum + 1
    );
    this._bool = true;
    this.isOpenTask();
    if (this._isRankLv === taskState.open) {
      this.onBattleWin();
    }
  }

  /**胜利场次 */
  onBattleWin() {
    ColorLog.esOn("CMsg.client.view.onBattleWin");
    if (this._bool) {
      if (this._isOpenWin === taskState.open) {
        this._battleWin++;
        GameMgr.lUserData.levelRewardWin = this._battleWin;
        if (this._battleWin >= this._taskBaskWin) {
          if (this._isOpenWin === taskState.open) {
            this.cleanTask(taskType.battleWin);
          }
          this._isOpenWin = taskState.complete;
        }
      }
      if (this._isRankLv === taskState.open) {
        let lv = GameMgr.lUserData.RankLv;
        console.log("段位", lv, this._taskRankLv);

        if (lv >= this._taskRankLv) {
          if (this._isRankLv === taskState.open) {
            this.cleanTask(taskType.rankLv);
          }
          this._isRankLv = taskState.complete;
        }
      }
      if (this._isRankStar === taskState.open) {
        if (GameMgr.lUserData.StarCount >= this._taskRankStar) {
          if (this._isRankStar === taskState.open) {
            this.cleanTask(taskType.rankNum);
          }
          this._isRankStar = taskState.complete;
        }
      }

      console.log(
        "胜利场次：",
        this._battleWin,
        "当前段位:",
        GameMgr.lUserData.RankLv,
        "当前段位星数：",
        GameMgr.lUserData.StarCount,
        "剩余任务：",
        this._taskType
      );

      /**已完成所有任务 */
      if (this._taskType.length < 1) {
        console.log(this._levelRewardData.info);
        GameMgr.lUserData.levelRewardNum = 1;
        this.recovery();
      }
    }
  }

  /**清理已完成任务 */
  cleanTask(type: number) {
    console.log("清理已完成任务:", type);

    let count = null;
    this._taskType.forEach((v, s) => {
      if (v == type) {
        count = s;
      }
    });
    this._taskType.splice(count, 1);
  }

  /**恢复默认值 */
  public recovery() {
    /**段位奖励数据 */
    this._levelRewardData = null;
    /**是否是当前段位奖励索引，可以开始判断是否达到领取该段位奖励要求 */
    this._bool = false;
    /**胜利场次 */
    this._battleWin = 0;
    GameMgr.lUserData.levelRewardWin = this._battleWin;
    /**是否开启统计胜利场次累加 */
    this._isOpenWin = taskState.notOpen;
    /**是否开启判断段位要求 */
    this._isRankLv = taskState.notOpen;
    /**是否开启判断星级要求 */
    this._isRankStar = taskState.notOpen;
    /**需要达到任务段位要求 */
    this._taskRankLv = RANKLV.RANKLV1;
    /**需要达到任务段位星数要求 */
    this._taskRankStar = RANKLV.RANKLV0;
    /**需要达到任务胜利场次要求 */
    this._taskBaskWin = RANKLV.RANKLV0;
    /**任务类型 */
    this._taskType = [];
    this.init();
  }

  /**是否开启任务条件 */
  isOpenTask() {
    this._levelRewardData.task.forEach((v, s) => {
      /**
       * a [0] b[1]
       */
      v.forEach((a, b) => {
        if (b == taskType.default) {
          switch (a) {
            case taskType.rankLv: {
              if (this._isRankLv === taskState.notOpen) {
                this._taskType.push(taskType.rankLv);
              }
              this._isRankLv = taskState.open;
              console.log("开启段位奖励任务------段位要求", this._taskType);
              console.log(this._levelRewardData.info);
              break;
            }
            case taskType.battleWin: {
              if (this._isOpenWin === taskState.notOpen) {
                this._taskType.push(taskType.battleWin);
              }

              console.log("开启段位奖励任务------胜利场次", this._taskType);
              console.log(this._levelRewardData.info);
              this._isOpenWin = taskState.open;

              break;
            }
            case taskType.rankNum: {
              if (this._isRankStar === taskState.notOpen) {
                this._taskType.push(taskType.rankNum);
              }
              console.log("开启段位奖励任务------段位星数", this._taskType);
              console.log(this._levelRewardData.info);
              this._isRankStar = taskState.open;
              break;
            }
            default:
              break;
          }
        }

        if (b == taskType.rankLv) {
          if (this._isRankLv == taskState.open) {
            if (!this._taskRankLv) {
              this._taskRankLv = a;
            }
          }

          if (this._isRankStar == taskState.open) {
            if (!this._taskRankStar) {
              this._taskRankStar = a;
            }
          }

          if (this._isOpenWin == taskState.open) {
            if (!this._taskBaskWin) {
              this._taskBaskWin = a;
            }
          }
        }
      });
    });
  }
}
