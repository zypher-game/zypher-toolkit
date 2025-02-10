import {
  ArgsBattleViewCtrl,
  IChessBtl,
  IGradeRankInfo,
  WinCb,
} from "../../../../../d.ts/game/JXCLBtl";
import GViewBase from "../../../Core/GView/GViewBase";
import { VIEW_ID } from "../../Common/UI";
import { Res } from "../../Common/UIResources";
import GameMgr from "../../Logic/GameMgr";
import { BattleAssets } from "../Fight/JXULAssets";
const { ccclass, property, menu, executeInEditMode } = cc._decorator;
@ccclass
@menu("View/Home/MatchCtrl")
export default class MatchCtrl extends GViewBase {
  @property({ type: sp.Skeleton, tooltip: "匹配" }) match: sp.Skeleton = null;
  @property({ type: cc.Sprite, tooltip: "匹配" }) iconArr: cc.Sprite[] = [];
  @property({ type: cc.Label, tooltip: "匹配名字" }) iconLab: cc.Label[] = [];
  private _blue: string = "ATTACHED_NODE:bone8";
  private _red: string = "ATTACHED_NODE:bone13";
  /**敌人玩家 */
  private _enemyArr: Array<IGradeRankInfo> = [];
  private assetManager: BattleAssets = null;
  onGLoad() {}
  onGStart(
    info: IGradeRankInfo[],
    count: number[],
    team: IChessBtl[],
    winCb: WinCb
  ) {
    this.assetManager = new BattleAssets("RBBattle");
    this._enemyArr = info;

    count.forEach((v) => {
      this.iconArr[v].node.parent.parent.active = true;
      this.iconLab[v].string = info[v].name;
      this.assetImpl.spriteAtlasFrame(
        this.iconArr[v],
        Res.common.npcHead,
        this._enemyArr[v].icon.toString()
      );
    });
    this.match.setCompleteListener(() => {
      console.log({ team });
      this.assetManager.loadAllRoundAssets(team, 1001, () => {
        let arg: ArgsBattleViewCtrl<IChessBtl[]> = {
          sceneId: 1001,
          assetManager: this.assetManager,
          args: team,
        };
        console.log(2222);
        GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.mapCtrl, arg, winCb);
        // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.fight, arg, winCb);
        console.log(3333);
      });

      this.match.setAnimation(0, "2", true);
    });
    this.match.setAnimation(0, "1", false);
  }
}
