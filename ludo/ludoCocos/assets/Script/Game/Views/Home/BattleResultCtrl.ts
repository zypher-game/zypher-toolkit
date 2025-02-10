import {
  IGradeRankInfo,
  RankInfo,
  WinCb,
  COINPAREM,
} from "../../../../../d.ts/game/JXCLBtl";
import { GCtrl } from "../../../Core/GCtrl";
import GViewBase from "../../../Core/GView/GViewBase";
import { AudioMgr } from "../../../Core/Manager/AudioMgr";
import {
  CMsg,
  GRID_TYPE,
  ITEMTYPE,
  RANKLV,
  rewardType,
} from "../../Common/Define";
import { L } from "../../Common/Language";
import { VIEW_ID } from "../../Common/UI";
import { Res } from "../../Common/UIResources";
import { JXLocales } from "../../Common/Zh";
import GameMgr from "../../Logic/GameMgr";
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/Home/BattleResultCtrl")
export default class BattleResultCtrl extends GViewBase {
  @property({ type: cc.Node, tooltip: "结算文案" }) ResultSpr: cc.Node = null;
  @property({ type: sp.Skeleton, tooltip: "胜利结算" })
  winSkeleton: sp.Skeleton = null;
  @property({ type: sp.Skeleton, tooltip: "失败结算" })
  failSkeleton: sp.Skeleton = null;
  @property({ type: cc.Label, tooltip: "星星数量" }) starNum: cc.Label = null;
  @property({ type: sp.Skeleton, tooltip: "段位图标spine" })
  levelSk: sp.Skeleton = null;
  @property({ type: sp.Skeleton, tooltip: "段位星星数量" })
  levelStarArr: sp.Skeleton[] = [];
  @property({ type: cc.Node, tooltip: "王者段位以下星星" }) starNode: cc.Node =
    null;
  @property({ type: cc.Node, tooltip: "王者段位星星" }) levelStarNode: cc.Node =
    null;

  @property({ type: cc.Node, tooltip: "按钮层" }) btnLayer: cc.Node = null;
  @property({ type: cc.Label, tooltip: "增加金币" }) coinNum: cc.Label = null;
  @property({ type: cc.Node, tooltip: "分享" }) shareBtn: cc.Node = null;
  private addStar: boolean = false;
  private isWin: boolean = false;
  protected winCb?: WinCb = null;
  protected addCoin: number = null;
  onGStart(dir: number, winCb?: WinCb) {
    this.winCb = winCb;
    if (dir == GRID_TYPE.RED) {
      AudioMgr.Ins().playEffect(Res.common.audio.success);
      if (winCb) {
        this.winSkeleton.node.active = true;
        console.log("执行胜利回调");
        this.winSkeleton.setCompleteListener(() => {
          this.winSkeleton.setAnimation(0, "standBy", true);
        });
        this.winSkeleton.setAnimation(0, "start", false);
        GameMgr.lRobotGradeData.brushSeasonLevelInfo();
        GameMgr.lUserData.setRankPassCount(winCb.rankIndex, 1, winCb.max);
        let rankInfo: RankInfo = {
          rankLv: winCb.rankIndex,
          rankNum: GameMgr.lUserData.getRankPassCount(winCb.rankIndex - 1),
        };
        GCtrl.ES.emit(CMsg.client.view.onBattleWin, rankInfo);
        GCtrl.ES.emit(CMsg.client.view.onRankPassLevel, winCb.rankBoxItem);
      }
      GameMgr.lUserData.setRankLv();
      this.isWin = true;
      this.shareBtn.active = false;
    } else {
      this.failSkeleton.node.active = true;
      this.failSkeleton.setCompleteListener(() => {
        this.winSkeleton.setAnimation(0, "standBy", true);
      });
      this.failSkeleton.setAnimation(0, "start", false);
      AudioMgr.Ins().playEffect(Res.common.audio.fail);
      this.assetImpl.spriteAtlasFrame(
        this.ResultSpr.getComponent(cc.Sprite),
        Res.gameOverCtrl.battleResultCtrlImg,
        "lose"
      );
      GameMgr.lUserData.setRankLv(-1);
    }

    this.setLevelInfo();
  }

  exit() {
    this.onClose();
    console.error("BattleResultCtrl homeWin");
    GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.home);
  }

  protected setLevelInfo() {
    var levelInfo: IGradeRankInfo = GameMgr.lUserData.levelInfo;
    let str = L(JXLocales.levelSkin["level" + levelInfo.levelLv]);
    let str2 = L(JXLocales.levelSkin["upgrade" + levelInfo.levelLv]);
    let str3 = L(JXLocales.levelSkin["demote" + levelInfo.levelLv]);
    cc.tween(this.ResultSpr)
      // .to(0.5, { scale: 1 })//初始位置
      .call(() => {
        this.levelSk.node.active = true;
        if (this.isWin) {
          if (levelInfo.levelLv > RANKLV.RANKLV1 && levelInfo.starNum == 0) {
            this.levelSk.setAnimation(0, str2, false);
          } else {
            this.levelSk.setAnimation(0, str, false);
            this.showStar();
          }
        } else {
          if (
            levelInfo.levelLv > RANKLV.RANKLV0 &&
            levelInfo.levelLv <= RANKLV.RANKLV6 &&
            levelInfo.starNum == 2
          ) {
            this.levelSk.setAnimation(0, str3, false);
          } else {
            this.levelSk.setAnimation(0, str, false);
            this.showStar();
          }
        }
      })
      .union()
      .start();
    this.levelSk.setCompleteListener(() => {
      this.levelSk.setAnimation(0, str, true);
      if (this.addStar) {
        return;
      }
      this.showStar();
    });
  }

  protected showStar() {
    this.starNode.active = true;
    this.addStar = true;
    var levelInfo: IGradeRankInfo = GameMgr.lUserData.levelInfo;
    if (levelInfo.levelLv > RANKLV.RANKLV6 && levelInfo.starNum > 3) {
      this.starNode.active = false;
      this.levelStarNode.active = true;
      this.starNum.string = "x" + levelInfo.starNum + "";
    } else {
      this.starNode.active = true;
      this.levelStarNode.active = false;
      this.levelStarArr.forEach((v, s) => {
        if (levelInfo.starNum > 0 && s < levelInfo.starNum) {
          v.setAnimation(0, JXLocales.levelSkin.star.jia, false);
          let time = v.getAnimationInfo(JXLocales.levelSkin.star.jia);
          AudioMgr.Ins().playEffect(Res.common.audio.star);
          this.scheduleOnce(() => {
            v.setAnimation(0, JXLocales.levelSkin.star.wu, false);
          }, time.duration);
        } else {
          v.setAnimation(0, JXLocales.levelSkin.star.kong, false);
        }
      });
    }

    let arr: Array<Array<number>> = GameMgr.levelData.getVideoReward(
      this.winCb.rankIndex,
      this.winCb.curLevel,
      this.isWin
    );
    arr.forEach((v) => {
      v.forEach((a, b) => {
        if (b == 0) {
          if (a == 0) {
            let str = (GameMgr.lUserData.getCoin() + v[1]).toString();
            let COINPAREM: COINPAREM = {
              coin: str,
              add: v[1].toString(),
            };
            this.onAddCoin(COINPAREM);
          }
        }
      });
      let id = v[rewardType.id];
      let num = v[rewardType.num];
      if (id == ITEMTYPE.COIN) {
        this.addCoin = num;
        GameMgr.lUserData.setCoin(Number(num));
      } else if (id >= 1001) {
      }
    });
    this.btnLayer.active = true;
  }

  /**数字滚动 */
  onAddCoin(param: COINPAREM) {
    // console.log("coin:" + JSON.stringify(param));
    var self = this;
    let constCoin = parseInt(param.coin) - parseInt(param.add);
    var obj = { a: 0 };
    this.coinNum.string = "+" + param.coin;
    cc.tween(obj)
      .to(
        0.3,
        { a: 100 },
        {
          progress: (start, end, current, ratio) => {
            if (self.node)
              self.coinNum.string = "+" + Math.floor(Number(param.add) * ratio);
          },
        }
      )
      .start();
  }
}
