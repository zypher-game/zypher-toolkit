import { JXDef } from "../../conventions/JXCommon";
import {
  WinAddMode,
  WinCloseMode,
  WinLayer,
  WinMaskStatus,
  WinType,
} from "../../Core/CoreDefine";
import { MapWrap } from "../../Core/FrameEx/ES5Ex";
import {
  BASE_VIEW_ID_EX,
  WinInfo,
  WinInfos,
  WinModel,
} from "../../Core/Manager/UIMgr";
import { Res } from "./UIResources";

// var VIEW_ID_BASE = 1000000;
/** 所有的窗口ID */
export const VIEW_ID = JXDef.SYS_IDENTITY_ID;
/** 附上客户端的界面ID */
// cc.js.mixin(VIEW_ID, VIEW_ID);
cc.js.mixin(VIEW_ID, BASE_VIEW_ID_EX);

// 来个警告
if (CC_DEV) {
  let keys = Object.keys(VIEW_ID);
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (i == j) continue;
      if (VIEW_ID[keys[i]] == VIEW_ID[keys[j]]) {
        cc.warn(`${keys[i]}  == ${keys[j]}`);
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////// 窗口类型模板 //////////////////////////////////////////////////////////////////////
/** 通用全屏大窗口 */
const ComFullWin = new WinModel(
  WinType.FullView,
  WinMaskStatus.kOnlyShow,
  WinAddMode.ReplaceLayer,
  WinCloseMode.OnlyDestroy | WinCloseMode.PopAll,
  WinLayer.FirstWindow
);
/** 通用全屏大窗口, 入栈本层之下的UI */
const ComFullStackWin = new WinModel(
  WinType.FullView,
  WinMaskStatus.kOnlyShow,
  WinAddMode.PushLower,
  WinCloseMode.OnlyDestroy | WinCloseMode.PopAll,
  WinLayer.FirstWindow
);
/** 通用二级单例界面 */
const ComSecSingleWin = new WinModel(
  WinType.Window,
  WinMaskStatus.kTouchClose | WinMaskStatus.kOpacity156,
  WinAddMode.ReplaceSelf,
  WinCloseMode.OnlyDestroy,
  WinLayer.SecondWindow
);
/** 通用全屏二级界面 */
const ComSecFullWinow = new WinModel(
  WinType.FullView,
  WinMaskStatus.kOnlyShow | WinMaskStatus.kOpacity156,
  WinAddMode.Stack,
  WinCloseMode.OnlyDestroy,
  WinLayer.SecondWindow
);
/** 通用顶层 */
const ComTopFix = new WinModel(
  WinType.Fix,
  WinMaskStatus.kOnlyShow,
  WinAddMode.ReplaceSelf,
  WinCloseMode.Recycle,
  WinLayer.TopWindow
);

/** 窗口预制件所以 */
const vw = Res.prefab.vw;

const load = Res.loadCtrl;
const home = Res.homeCtrl;
const common = Res.common;
const MatchCtrl = Res.MatchCtrl;
const fight = Res.fight;
const battleResultCtrl = Res.gameOverCtrl;
/** 窗口基本信息 */
export const JXWinInfo = new WinInfos(
  Object.keys(VIEW_ID).map((v, k) => VIEW_ID[v]),
  new MapWrap([
    [VIEW_ID.mapCtrl, new WinInfo(Res.mapCtrl, ComFullWin)],
    [VIEW_ID.load, new WinInfo(load, ComFullWin)],
    /**
     * 首页
     */
    [VIEW_ID.home, new WinInfo(home.homeCtrl, ComFullStackWin)],
    [
      VIEW_ID.aiPlayerSetting,
      new WinInfo(home.AIPlayerSetting, ComFullStackWin),
    ],
    [VIEW_ID.DailyTasks, new WinInfo(home.DailyTasks, ComSecFullWinow)],
    [VIEW_ID.Help, new WinInfo(home.Help, ComFullStackWin)],
    [VIEW_ID.LeaderBoard, new WinInfo(home.LeaderBoard, ComFullStackWin)],
    [VIEW_ID.setting, new WinInfo(home.Settings, ComFullStackWin)],
    /*----- 首页  end*/
    [VIEW_ID.fight, new WinInfo(fight.fightCtrl, ComFullStackWin)],
    [
      VIEW_ID.battleResultCtrl,
      new WinInfo(battleResultCtrl.battleResultCtrl, ComFullStackWin),
    ],
    [VIEW_ID.frameItem, new WinInfo(common.frameItem, ComSecFullWinow)],
    [VIEW_ID.rewardCtrl, new WinInfo(common.rewardCtrl, ComSecFullWinow)],
    [VIEW_ID.matchCtrl, new WinInfo(MatchCtrl.MatchCtrl, ComSecFullWinow)],
    [BASE_VIEW_ID_EX.WAIT, new WinInfo(vw.tip.wait, ComTopFix)],
  ])
);

/** 窗口静态预加载资源 */
export const JXViewPreLoad = {};

export const VIEW_IDByPageNum: {
  [id: number]: { page?: number[]; view?: number };
} = {};
