import {
  ArgsBattleViewCtrl,
  IChessBtl,
  IGradeRankInfo,
  IRankBoxItem,
  IRankLevel,
  ItemCostResult,
  SLevelDataRaw,
  SRankRewardDataRaw,
  WinCb,
} from "../../../../../d.ts/game/JXCLBtl";
import { WinPage } from "../../../Core/CoreDefine";
import GViewBase from "../../../Core/GView/GViewBase";
import { AudioMgr } from "../../../Core/Manager/AudioMgr";
import { UIMgr } from "../../../Core/Manager/UIMgr";
import { L } from "../../Common/Language";
import { VIEW_ID } from "../../Common/UI";
import GameMgr from "../../Logic/GameMgr";
import { BattleAssets } from "../Fight/JXULAssets";
import { JXEDir } from "../Fight/JXULDefine";
import { JXDef } from "./../../../conventions/JXCommon";
import { GCtrl } from "./../../../Core/GCtrl";
import { ITEMTYPE, LoadingType, npc, RANKLV } from "./../../Common/Define";
import { Res } from "./../../Common/UIResources";
import { JXLocales } from "./../../Common/Zh";

const { ccclass, property } = cc._decorator;

interface LoadConfigRaw {
  start?: number;
  loginRaw?: number;
  loginStatic?: number;
  loginAciton?: number;
  gameRaw?: number;
  gameStatic?: number;
  otherStatic?: number;
  userData?: number;
}

// 加载权重
const PROCESS_CONFIGS = {
  newAccountLogin: {
    start: 0.5,
    loginRaw: 0.1,
    loginStatic: 0.1,
    loginAciton: 0.1,
    gameRaw: 0.1,
    gameStatic: 0.05,
    userData: 0.05,
  } as LoadConfigRaw,
  oldLogin: {
    start: 0.5,
    loginRaw: 0.25,
    loginStatic: 0.25,
  } as LoadConfigRaw,
  oldGame: {
    gameRaw: 0.3,
    gameStatic: 0.4,
    userData: 0.3,
  } as LoadConfigRaw,
};

@ccclass
export default class LoadCtrl extends GViewBase {
  /**加载进度文本 */
  @property(cc.Label) progressLabel: cc.Label = null;
  /**加载进度条 */
  @property(cc.ProgressBar) progressBar: cc.ProgressBar = null;
  @property(cc.Node) lightNode: cc.Node = null;
  @property(cc.Node) plane: cc.Node = null;
  @property(cc.Texture2D) texture_login: cc.Texture2D = null;
  // 已使用进度
  public useProgress: number = 0;
  // 当前进度
  public curProgress: number = 0;
  protected _curLoadConfig: LoadConfigRaw = null;
  private loadNum: number = 0;

  onGLoad() {
    if (this.progressBar) this.progressBar.progress = 0;
    if (this.progressLabel) this.progressLabel.string = "";
  }

  onGStart(type: LoadingType, ...args: any[]) {
    switch (type) {
      case LoadingType.AppStart: {
        this._curLoadConfig = PROCESS_CONFIGS.oldLogin;
        this.useProgress = this._curLoadConfig.start;
        this.curProgress = this._curLoadConfig.loginRaw;
        /**分包加载 */
        this.loadPackage();
        break;
      }
    }
  }

  protected preLoadGameStart() {
    this.setLoadText(L(JXLocales.load.assetLoad));
    this.setLoadProgress(this.useProgress);
    // 预加载不希望用的时候异步的预制件
    GCtrl.preLoadRawAssets(
      (curIndex: number, total: number, asset) => {
        this.setLoadText(L(JXLocales.load.process, curIndex, total));
        this.setLoadProgress(
          this.useProgress + (curIndex / total) * this.curProgress
        );
      },
      () => {
        this.loadloginStatic();
      },
      ...Object.keys(Res.material).map((v, k) => {
        return { type: cc.Material, path: Res.material[v] };
      }),
      { type: cc.Prefab, path: Res.common.toast }
    );
  }

  protected preLoadGameScene() {
    this.setLoadText(L(JXLocales.load.assetLoad));
    this.useProgress += this.curProgress;
    this.curProgress = this._curLoadConfig.gameRaw;
    // 预加载不希望用的时候异步的预制件
    GCtrl.preLoadRawAssets(
      (curIndex: number, total: number, asset) => {
        this.setLoadText(L(JXLocales.load.process, curIndex, total));
        this.setLoadProgress(
          this.useProgress + (curIndex / total) * this.curProgress
        );
      },
      () => {
        this.loadGameStatic();
      },
      { type: cc.SpriteFrame, path: Res.single }
    );
  }

  protected loadloginStatic() {
    this.useProgress += this.curProgress; // 0.5 +0.2; 0.5 + 0.4
    this.curProgress = this._curLoadConfig.loginStatic; //0.5 +0.2 +0.2; 0.5 +0.4
    GameMgr.initLoginStatic(
      (cur, total) => {
        this.setLoadText(L(JXLocales.load.static, cur, total));
        this.setLoadProgress(
          this.useProgress + (this.curProgress * cur) / total
        );
      },
      () => {
        GameMgr.initSimulator();
        GameMgr.initLogicManager();
        //#region
        this._curLoadConfig = PROCESS_CONFIGS.oldGame;
        this.preLoadGameScene();
      }
    );
  }

  protected loadGameStatic() {
    this.useProgress += this.curProgress;
    this.curProgress = this._curLoadConfig.gameStatic;
    GameMgr.initFristGameStatics(
      (cur, total) => {
        this.setLoadText(L(JXLocales.load.static, cur, total));
        this.setLoadProgress(
          this.useProgress + (cur / total) * this.curProgress
        );
      },
      () => {
        this.onInitUserData();
      }
    );
  }

  /** 加载用户数据 */
  public onInitUserData() {
    this.setLoadText(L(JXLocales.load.initUserData));
    this.useProgress += this.curProgress;
    this.curProgress = this._curLoadConfig.userData;
    this.loadHomeCtrl();
    // let tasks = getInitTask((route, resp) => {
  }

  protected loadHomeCtrl() {
    this.setLoadText(L(JXLocales.load.enter_game));
    GameMgr.ins().initGame();
    AudioMgr.Ins().playMusic(Res.common.audio.bgm);
    // const vol = cc.sys.localStorage.getItem(SoundStorageKey.MusicVolume);
    // const v = Number(`${vol ?? 1}`)
    const v = 0;
    AudioMgr.Ins().setEffectVolume(v);
    AudioMgr.Ins().setMusicVolume(v);
    // 预加载主场景资源：
    GCtrl.preLoadRawAssets(
      null,
      () => {
        this.endLoadHomeCtrl();
      },
      // { type: cc.Prefab, path: Res.mapCtrl },
      // { type: cc.Prefab, path: Res.fight.fightCtrl }
      { type: cc.Prefab, path: Res.homeCtrl.homeCtrl }
      // { type: cc.Prefab, path: Res.common.guide_item }
    );
  }

  /**所有数据加载完成进入游戏 */
  protected endLoadHomeCtrl() {
    // UIMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
    // UIMgr.showWin(VIEW_ID.home, WinPage.Page2);
    this.jumpHome();
    // this.jumpGame();
    GCtrl.ES.emit(GCtrl.GClientWinOpenEventMsg);
  }
  /**跳转到首页 */
  protected jumpHome() {
    console.log(111);
    UIMgr.showWin(VIEW_ID.home, WinPage.Page2);
    console.log(222);
  }
  /**跳转到战斗 */
  protected jumpGame() {
    let result: ItemCostResult = {};
    result = GameMgr.lUserData.testCost(ITEMTYPE.PY, 1, 1);
    if (result.enough) {
    } else {
      GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.frameItem, ITEMTYPE.PY);
      GameMgr.uiMgr.showToast(result.tip);
      return;
    }
    const _SRankRewardDataRaw = GameMgr.rankRewardData.getRankLevelData(1);
    const enemyArr: IGradeRankInfo[] = [
      GameMgr.lRobotGradeData.randomRobotGrade(),
      GameMgr.lRobotGradeData.randomRobotGrade(),
      GameMgr.lRobotGradeData.randomRobotGrade(),
    ];
    const _rankIndex = RANKLV.RANKLV0;
    var curLevel = GameMgr.lUserData.getRankPassCount(_rankIndex - 1) + 1;
    var npcNum = GameMgr.levelData.getRaw<SLevelDataRaw>(curLevel).npcquantity;
    var team: IChessBtl[] = [];
    let blue: IChessBtl = {
      id: `Player.${JXEDir.Blue}`,
      name: enemyArr[0].name,
      isPlayer: true,
      dir: JXEDir.Blue,
      tableId: 1,
      icon: enemyArr[0].icon,
    };
    let red: IChessBtl = {
      id: `Player.${JXEDir.Red}`,
      name: GameMgr.lUserData.levelInfo.name,
      isPlayer: false,
      dir: JXEDir.Red,
      tableId: 1,
      icon: 123,
    };
    let yellow: IChessBtl = {
      id: `Player.${JXEDir.Yellow}`,
      name: enemyArr[1].name,
      isPlayer: false,
      dir: JXEDir.Yellow,
      tableId: 1,
      icon: enemyArr[1].icon,
    };
    let green: IChessBtl = {
      id: `Player.${JXEDir.Green}`,
      name: enemyArr[2].name,
      isPlayer: false,
      dir: JXEDir.Green,
      tableId: 1,
      icon: enemyArr[2].icon,
    };

    switch (npcNum) {
      case npc.npc1: {
        team = [red, blue];
        break;
      }
      case npc.npc2: {
        team = [red, yellow, blue];
        break;
      }
      case npc.npc3: {
        team = [red, yellow, blue, green];
        break;
      }
      default:
        break;
    }
    let rankBoxItem = this.rankBox({ _rankIndex, _SRankRewardDataRaw });
    console.log({ rankBoxItem });
    let winCb: WinCb = {
      rankIndex: _rankIndex,
      max: _SRankRewardDataRaw.length,
      rankBoxItem: rankBoxItem,
      curLevel: curLevel,
    };
    const assetManager = new BattleAssets("RBBattle");

    assetManager.loadAllRoundAssets(team, 1001, () => {
      let arg: ArgsBattleViewCtrl<IChessBtl[]> = {
        sceneId: 1001,
        assetManager: assetManager,
        args: team,
      };
      console.log(2222);
      GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.mapCtrl, arg, winCb);
      // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.fight, arg, winCb);
      console.log(3333);
    });
    // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.matchCtrl, enemyArr, count, team, winCb);
  }
  public rankBox({
    _rankIndex,
    _SRankRewardDataRaw,
  }: {
    _rankIndex: number;
    _SRankRewardDataRaw: SRankRewardDataRaw[];
  }): IRankBoxItem {
    let obj = GameMgr.lUserData.getRank(_SRankRewardDataRaw.length);
    let passCount = GameMgr.lUserData.getRankPassCount(_rankIndex - 1);
    let count: IRankLevel = {
      lv: 1,
      count: 0,
    };

    if (passCount > 5) {
      count = GameMgr.lUserData.getRank(passCount);
    }

    let bool = false;
    if (count.lv == obj.lv && passCount > obj.lv * 5) {
      bool = true;
    }
    let rankBoxItem: IRankBoxItem = {
      rankLv: _rankIndex,
      rankPageLv: count.lv,
      rankCount: count.count,
      rankEnd: bool,
    };

    return rankBoxItem;
  }

  protected setLoadText(text: string) {
    if (!this.progressLabel) return;
    this.progressLabel.string = text;
  }

  protected setLoadProgress(val: number) {
    if (!this.progressBar) return;
    this.progressBar.progress = Math.min(val, 1);
    if (this.lightNode) {
      this.lightNode.x =
        this.progressBar.totalLength * this.progressBar.progress;
      this.plane.x = this.lightNode.x;
    }
  }

  /**加载分包 */
  loadPackage() {
    this.setLoadText(L(JXLocales.load.loadPackage));
    let keys = Object.keys(JXDef.firstBundle);
    const str = JXDef.firstBundle[keys[this.loadNum]];
    cc.assetManager.loadBundle(
      str,
      (err: Error, boule: cc.AssetManager.Bundle) => {
        if (err) {
        }
        this.loadNum++;
        this.setLoadProgress(this.loadNum / keys.length);
        setTimeout(() => {
          if (this.loadNum < keys.length) {
            this.loadPackage();
          } else {
            this.preLoadGameStart();
          }
        }, 0);
      }
    );
  }
}
