import {
  ArgsBattleViewCtrl,
  IChessBtl,
  WinCb,
} from "../../../../../d.ts/game/JXCLBtl";
import GParam from "../../../Core/GEvent/GParam";
import GChild from "../../../Core/GView/GChild";
import { CMsg, CompareEnum, GRID_TYPE } from "../../Common/Define";
import { VIEW_ID } from "../../Common/UI";
import { Res } from "../../Common/UIResources";
import GameMgr from "../../Logic/GameMgr";
import JXRBCmdMgr from "./JXRBCmdMgr";
import { RoleNumber } from "./JXULDefine";

const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class BtlFightLayer extends GChild {
  @property(sp.Skeleton) shaizi: sp.Skeleton = null;
  @property(cc.ScrollView) levelView: cc.ScrollView = null;
  @property(cc.Node) mask: cc.Node = null;
  @property(cc.Node) jump: cc.Node = null;

  /**公共的命令管理类 */
  private _cmdMgr: JXRBCmdMgr;
  private _secenId: number = null;

  public _cbFun: Function = null;
  private winArgs: ArgsBattleViewCtrl<IChessBtl[]> = null;
  public set _winArgs(v) {
    this.winArgs = v;
  }
  public get _winArgs() {
    return this.winArgs;
  }
  public logicAni: cc.Tween[] = null;
  private _player: IChessBtl = null;
  public winCb: WinCb = null;

  /**初始战斗层 */
  public fightInit(
    winArgs: ArgsBattleViewCtrl<any>,
    cb: (cmd: JXRBCmdMgr) => void,
    winCb: WinCb
  ) {
    this._winArgs = winArgs;
    this.winCb = winCb;
    this._secenId = this._winArgs.sceneId;
    this._cbFun = cb;
    let team: IChessBtl[] = this._winArgs.args;
    for (let i = 0; i < team.length; i++) {
      if (team[i].isPlayer) {
        this._player = team[i];
        break;
      }
    }
    this.loadEnv();
  }

  update() {
    if (!this._cmdMgr) return;
    this._cmdMgr.update();
  }

  /**根据场景id加载对应数据 */
  protected loadEnv() {
    let team: IChessBtl[] = this._winArgs.args;
    const num = RoleNumber;
    // let num = this.winCb.curLevel > 2 ? 4 : this.winCb.curLevel + 1;
    this._cmdMgr = new JXRBCmdMgr(
      this._secenId,
      this._winArgs.assetManager,
      num
    );
    this._cmdMgr.initRDBtlLayer(
      this.node,
      this.node.getChildByName("headContent")
    );
    this._cmdMgr.evtMgr.register(
      CMsg.client.fight.endFight,
      this,
      this.onEndFight.bind(this)
    );
    this._cmdMgr.initTeam(team);
    this._cmdMgr.loadAllResources(this.onResLoaded.bind(this));
    return this._cmdMgr;
  }

  onResLoaded() {
    if (!this.isValid) return;
    this._cbFun(this._cmdMgr);
  }

  protected onEndFight(_, dir: GParam) {
    console.log("战斗结束", dir.get());
    GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.battleResultCtrl, dir.get(), this.winCb);
  }
}
