"use strict";
cc._RF.push(module, '63a50zdMd5G+pc2ZLGaCsbl', 'UI');
// Script/Game/Common/UI.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_IDByPageNum = exports.JXViewPreLoad = exports.JXWinInfo = exports.VIEW_ID = void 0;
var JXCommon_1 = require("../../conventions/JXCommon");
var CoreDefine_1 = require("../../Core/CoreDefine");
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var UIMgr_1 = require("../../Core/Manager/UIMgr");
var UIResources_1 = require("./UIResources");
// var VIEW_ID_BASE = 1000000;
/** 所有的窗口ID */
exports.VIEW_ID = JXCommon_1.JXDef.SYS_IDENTITY_ID;
/** 附上客户端的界面ID */
// cc.js.mixin(VIEW_ID, VIEW_ID);
cc.js.mixin(exports.VIEW_ID, UIMgr_1.BASE_VIEW_ID_EX);
// 来个警告
if (CC_DEV) {
    var keys = Object.keys(exports.VIEW_ID);
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < keys.length; j++) {
            if (i == j)
                continue;
            if (exports.VIEW_ID[keys[i]] == exports.VIEW_ID[keys[j]]) {
                cc.warn(keys[i] + "  == " + keys[j]);
            }
        }
    }
}
///////////////////////////////////////////////////////////////////////////// 窗口类型模板 //////////////////////////////////////////////////////////////////////
/** 通用全屏大窗口 */
var ComFullWin = new UIMgr_1.WinModel(CoreDefine_1.WinType.FullView, CoreDefine_1.WinMaskStatus.kOnlyShow, CoreDefine_1.WinAddMode.ReplaceLayer, CoreDefine_1.WinCloseMode.OnlyDestroy | CoreDefine_1.WinCloseMode.PopAll, CoreDefine_1.WinLayer.FirstWindow);
/** 通用全屏大窗口, 入栈本层之下的UI */
var ComFullStackWin = new UIMgr_1.WinModel(CoreDefine_1.WinType.FullView, CoreDefine_1.WinMaskStatus.kOnlyShow, CoreDefine_1.WinAddMode.PushLower, CoreDefine_1.WinCloseMode.OnlyDestroy | CoreDefine_1.WinCloseMode.PopAll, CoreDefine_1.WinLayer.FirstWindow);
/** 通用二级单例界面 */
var ComSecSingleWin = new UIMgr_1.WinModel(CoreDefine_1.WinType.Window, CoreDefine_1.WinMaskStatus.kTouchClose | CoreDefine_1.WinMaskStatus.kOpacity156, CoreDefine_1.WinAddMode.ReplaceSelf, CoreDefine_1.WinCloseMode.OnlyDestroy, CoreDefine_1.WinLayer.SecondWindow);
/** 通用全屏二级界面 */
var ComSecFullWinow = new UIMgr_1.WinModel(CoreDefine_1.WinType.FullView, CoreDefine_1.WinMaskStatus.kOnlyShow | CoreDefine_1.WinMaskStatus.kOpacity156, CoreDefine_1.WinAddMode.Stack, CoreDefine_1.WinCloseMode.OnlyDestroy, CoreDefine_1.WinLayer.SecondWindow);
/** 通用顶层 */
var ComTopFix = new UIMgr_1.WinModel(CoreDefine_1.WinType.Fix, CoreDefine_1.WinMaskStatus.kOnlyShow, CoreDefine_1.WinAddMode.ReplaceSelf, CoreDefine_1.WinCloseMode.Recycle, CoreDefine_1.WinLayer.TopWindow);
/** 窗口预制件所以 */
var vw = UIResources_1.Res.prefab.vw;
var load = UIResources_1.Res.loadCtrl;
var home = UIResources_1.Res.homeCtrl;
var common = UIResources_1.Res.common;
var MatchCtrl = UIResources_1.Res.MatchCtrl;
var fight = UIResources_1.Res.fight;
var battleResultCtrl = UIResources_1.Res.gameOverCtrl;
/** 窗口基本信息 */
exports.JXWinInfo = new UIMgr_1.WinInfos(Object.keys(exports.VIEW_ID).map(function (v, k) { return exports.VIEW_ID[v]; }), new ES5Ex_1.MapWrap([
    [exports.VIEW_ID.mapCtrl, new UIMgr_1.WinInfo(UIResources_1.Res.mapCtrl, ComFullWin)],
    [exports.VIEW_ID.load, new UIMgr_1.WinInfo(load, ComFullWin)],
    [exports.VIEW_ID.home, new UIMgr_1.WinInfo(home.homeCtrl, ComFullWin)],
    [exports.VIEW_ID.fight, new UIMgr_1.WinInfo(fight.fightCtrl, ComFullStackWin)],
    [
        exports.VIEW_ID.battleResultCtrl,
        new UIMgr_1.WinInfo(battleResultCtrl.battleResultCtrl, ComFullStackWin),
    ],
    [exports.VIEW_ID.frameItem, new UIMgr_1.WinInfo(common.frameItem, ComSecFullWinow)],
    [exports.VIEW_ID.rewardCtrl, new UIMgr_1.WinInfo(common.rewardCtrl, ComSecFullWinow)],
    [exports.VIEW_ID.matchCtrl, new UIMgr_1.WinInfo(MatchCtrl.MatchCtrl, ComSecFullWinow)],
    [UIMgr_1.BASE_VIEW_ID_EX.WAIT, new UIMgr_1.WinInfo(vw.tip.wait, ComTopFix)],
]));
/** 窗口静态预加载资源 */
exports.JXViewPreLoad = {};
exports.VIEW_IDByPageNum = {};

cc._RF.pop();