
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/UI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    /**
     * 首页
     */
    [exports.VIEW_ID.home, new UIMgr_1.WinInfo(home.homeCtrl, ComFullStackWin)],
    [
        exports.VIEW_ID.aiPlayerSetting,
        new UIMgr_1.WinInfo(home.AIPlayerSetting, ComFullStackWin),
    ],
    [exports.VIEW_ID.DailyTasks, new UIMgr_1.WinInfo(home.DailyTasks, ComSecFullWinow)],
    [exports.VIEW_ID.Help, new UIMgr_1.WinInfo(home.Help, ComFullStackWin)],
    [exports.VIEW_ID.LeaderBoard, new UIMgr_1.WinInfo(home.LeaderBoard, ComFullStackWin)],
    [exports.VIEW_ID.setting, new UIMgr_1.WinInfo(home.Settings, ComFullStackWin)],
    /*----- 首页  end*/
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQW1EO0FBQ25ELG9EQU0rQjtBQUMvQixrREFBbUQ7QUFDbkQsa0RBS2tDO0FBQ2xDLDZDQUFvQztBQUVwQyw4QkFBOEI7QUFDOUIsY0FBYztBQUNELFFBQUEsT0FBTyxHQUFHLGdCQUFLLENBQUMsZUFBZSxDQUFDO0FBQzdDLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQztBQUV0QyxPQUFPO0FBQ1AsSUFBSSxNQUFNLEVBQUU7SUFDVixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxDQUFDO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsU0FBUztZQUNyQixJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLEVBQUUsQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFRLElBQUksQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7S0FDRjtDQUNGO0FBRUQsMkpBQTJKO0FBQzNKLGNBQWM7QUFDZCxJQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFRLENBQzdCLG9CQUFPLENBQUMsUUFBUSxFQUNoQiwwQkFBYSxDQUFDLFNBQVMsRUFDdkIs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TyxDQUFDLFdBQVcsRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlELGlCQUFpQjtJQUNqQixDQUFDLGVBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5RDtRQUNFLGVBQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsSUFBSSxlQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO0tBQ2hFO0lBQ0QsQ0FBQyxlQUFPLENBQUMsU0FBUyxFQUFFLElBQUksZUFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDbkUsQ0FBQyxlQUFPLENBQUMsVUFBVSxFQUFFLElBQUksZUFBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDckUsQ0FBQyxlQUFPLENBQUMsU0FBUyxFQUFFLElBQUksZUFBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdEUsQ0FBQyx1QkFBZSxDQUFDLElBQUksRUFBRSxJQUFJLGVBQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztDQUM1RCxDQUFDLENBQ0gsQ0FBQztBQUVGLGdCQUFnQjtBQUNILFFBQUEsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUVuQixRQUFBLGdCQUFnQixHQUV6QixFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKWERlZiB9IGZyb20gXCIuLi8uLi9jb252ZW50aW9ucy9KWENvbW1vblwiO1xyXG5pbXBvcnQge1xyXG4gIFdpbkFkZE1vZGUsXHJcbiAgV2luQ2xvc2VNb2RlLFxyXG4gIFdpbkxheWVyLFxyXG4gIFdpbk1hc2tTdGF0dXMsXHJcbiAgV2luVHlwZSxcclxufSBmcm9tIFwiLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAgfSBmcm9tIFwiLi4vLi4vQ29yZS9GcmFtZUV4L0VTNUV4XCI7XHJcbmltcG9ydCB7XHJcbiAgQkFTRV9WSUVXX0lEX0VYLFxyXG4gIFdpbkluZm8sXHJcbiAgV2luSW5mb3MsXHJcbiAgV2luTW9kZWwsXHJcbn0gZnJvbSBcIi4uLy4uL0NvcmUvTWFuYWdlci9VSU1nclwiO1xyXG5pbXBvcnQgeyBSZXMgfSBmcm9tIFwiLi9VSVJlc291cmNlc1wiO1xyXG5cclxuLy8gdmFyIFZJRVdfSURfQkFTRSA9IDEwMDAwMDA7XHJcbi8qKiDmiYDmnInnmoTnqpflj6NJRCAqL1xyXG5leHBvcnQgY29uc3QgVklFV19JRCA9IEpYRGVmLlNZU19JREVOVElUWV9JRDtcclxuLyoqIOmZhOS4iuWuouaIt+err+eahOeVjOmdoklEICovXHJcbi8vIGNjLmpzLm1peGluKFZJRVdfSUQsIFZJRVdfSUQpO1xyXG5jYy5qcy5taXhpbihWSUVXX0lELCBCQVNFX1ZJRVdfSURfRVgpO1xyXG5cclxuLy8g5p2l5Liq6K2m5ZGKXHJcbmlmIChDQ19ERVYpIHtcclxuICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKFZJRVdfSUQpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmIChpID09IGopIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoVklFV19JRFtrZXlzW2ldXSA9PSBWSUVXX0lEW2tleXNbal1dKSB7XHJcbiAgICAgICAgY2Mud2FybihgJHtrZXlzW2ldfSAgPT0gJHtrZXlzW2pdfWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDnqpflj6PnsbvlnovmqKHmnb8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vKiog6YCa55So5YWo5bGP5aSn56qX5Y+jICovXHJcbmNvbnN0IENvbUZ1bGxXaW4gPSBuZXcgV2luTW9kZWwoXHJcbiAgV2luVHlwZS5GdWxsVmlldyxcclxuICBXaW5NYXNrU3RhdHVzLmtPbmx5U2hvdyxcclxuICBXaW5BZGRNb2RlLlJlcGxhY2VMYXllcixcclxuICBXaW5DbG9zZU1vZGUuT25seURlc3Ryb3kgfCBXaW5DbG9zZU1vZGUuUG9wQWxsLFxyXG4gIFdpbkxheWVyLkZpcnN0V2luZG93XHJcbik7XHJcbi8qKiDpgJrnlKjlhajlsY/lpKfnqpflj6MsIOWFpeagiOacrOWxguS5i+S4i+eahFVJICovXHJcbmNvbnN0IENvbUZ1bGxTdGFja1dpbiA9IG5ldyBXaW5Nb2RlbChcclxuICBXaW5UeXBlLkZ1bGxWaWV3LFxyXG4gIFdpbk1hc2tTdGF0dXMua09ubHlTaG93LFxyXG4gIFdpbkFkZE1vZGUuUHVzaExvd2VyLFxyXG4gIFdpbkNsb3NlTW9kZS5Pbmx5RGVzdHJveSB8IFdpbkNsb3NlTW9kZS5Qb3BBbGwsXHJcbiAgV2luTGF5ZXIuRmlyc3RXaW5kb3dcclxuKTtcclxuLyoqIOmAmueUqOS6jOe6p+WNleS+i+eVjOmdoiAqL1xyXG5jb25zdCBDb21TZWNTaW5nbGVXaW4gPSBuZXcgV2luTW9kZWwoXHJcbiAgV2luVHlwZS5XaW5kb3csXHJcbiAgV2luTWFza1N0YXR1cy5rVG91Y2hDbG9zZSB8IFdpbk1hc2tTdGF0dXMua09wYWNpdHkxNTYsXHJcbiAgV2luQWRkTW9kZS5SZXBsYWNlU2VsZixcclxuICBXaW5DbG9zZU1vZGUuT25seURlc3Ryb3ksXHJcbiAgV2luTGF5ZXIuU2Vjb25kV2luZG93XHJcbik7XHJcbi8qKiDpgJrnlKjlhajlsY/kuoznuqfnlYzpnaIgKi9cclxuY29uc3QgQ29tU2VjRnVsbFdpbm93ID0gbmV3IFdpbk1vZGVsKFxyXG4gIFdpblR5cGUuRnVsbFZpZXcsXHJcbiAgV2luTWFza1N0YXR1cy5rT25seVNob3cgfCBXaW5NYXNrU3RhdHVzLmtPcGFjaXR5MTU2LFxyXG4gIFdpbkFkZE1vZGUuU3RhY2ssXHJcbiAgV2luQ2xvc2VNb2RlLk9ubHlEZXN0cm95LFxyXG4gIFdpbkxheWVyLlNlY29uZFdpbmRvd1xyXG4pO1xyXG4vKiog6YCa55So6aG25bGCICovXHJcbmNvbnN0IENvbVRvcEZpeCA9IG5ldyBXaW5Nb2RlbChcclxuICBXaW5UeXBlLkZpeCxcclxuICBXaW5NYXNrU3RhdHVzLmtPbmx5U2hvdyxcclxuICBXaW5BZGRNb2RlLlJlcGxhY2VTZWxmLFxyXG4gIFdpbkNsb3NlTW9kZS5SZWN5Y2xlLFxyXG4gIFdpbkxheWVyLlRvcFdpbmRvd1xyXG4pO1xyXG5cclxuLyoqIOeql+WPo+mihOWItuS7tuaJgOS7pSAqL1xyXG5jb25zdCB2dyA9IFJlcy5wcmVmYWIudnc7XHJcblxyXG5jb25zdCBsb2FkID0gUmVzLmxvYWRDdHJsO1xyXG5jb25zdCBob21lID0gUmVzLmhvbWVDdHJsO1xyXG5jb25zdCBjb21tb24gPSBSZXMuY29tbW9uO1xyXG5jb25zdCBNYXRjaEN0cmwgPSBSZXMuTWF0Y2hDdHJsO1xyXG5jb25zdCBmaWdodCA9IFJlcy5maWdodDtcclxuY29uc3QgYmF0dGxlUmVzdWx0Q3RybCA9IFJlcy5nYW1lT3ZlckN0cmw7XHJcbi8qKiDnqpflj6Pln7rmnKzkv6Hmga8gKi9cclxuZXhwb3J0IGNvbnN0IEpYV2luSW5mbyA9IG5ldyBXaW5JbmZvcyhcclxuICBPYmplY3Qua2V5cyhWSUVXX0lEKS5tYXAoKHYsIGspID0+IFZJRVdfSURbdl0pLFxyXG4gIG5ldyBNYXBXcmFwKFtcclxuICAgIFtWSUVXX0lELm1hcEN0cmwsIG5ldyBXaW5JbmZvKFJlcy5tYXBDdHJsLCBDb21GdWxsV2luKV0sXHJcbiAgICBbVklFV19JRC5sb2FkLCBuZXcgV2luSW5mbyhsb2FkLCBDb21GdWxsV2luKV0sXHJcbiAgICAvKipcclxuICAgICAqIOmmlumhtVxyXG4gICAgICovXHJcbiAgICBbVklFV19JRC5ob21lLCBuZXcgV2luSW5mbyhob21lLmhvbWVDdHJsLCBDb21GdWxsU3RhY2tXaW4pXSxcclxuICAgIFtcclxuICAgICAgVklFV19JRC5haVBsYXllclNldHRpbmcsXHJcbiAgICAgIG5ldyBXaW5JbmZvKGhvbWUuQUlQbGF5ZXJTZXR0aW5nLCBDb21GdWxsU3RhY2tXaW4pLFxyXG4gICAgXSxcclxuICAgIFtWSUVXX0lELkRhaWx5VGFza3MsIG5ldyBXaW5JbmZvKGhvbWUuRGFpbHlUYXNrcywgQ29tU2VjRnVsbFdpbm93KV0sXHJcbiAgICBbVklFV19JRC5IZWxwLCBuZXcgV2luSW5mbyhob21lLkhlbHAsIENvbUZ1bGxTdGFja1dpbildLFxyXG4gICAgW1ZJRVdfSUQuTGVhZGVyQm9hcmQsIG5ldyBXaW5JbmZvKGhvbWUuTGVhZGVyQm9hcmQsIENvbUZ1bGxTdGFja1dpbildLFxyXG4gICAgW1ZJRVdfSUQuc2V0dGluZywgbmV3IFdpbkluZm8oaG9tZS5TZXR0aW5ncywgQ29tRnVsbFN0YWNrV2luKV0sXHJcbiAgICAvKi0tLS0tIOmmlumhtSAgZW5kKi9cclxuICAgIFtWSUVXX0lELmZpZ2h0LCBuZXcgV2luSW5mbyhmaWdodC5maWdodEN0cmwsIENvbUZ1bGxTdGFja1dpbildLFxyXG4gICAgW1xyXG4gICAgICBWSUVXX0lELmJhdHRsZVJlc3VsdEN0cmwsXHJcbiAgICAgIG5ldyBXaW5JbmZvKGJhdHRsZVJlc3VsdEN0cmwuYmF0dGxlUmVzdWx0Q3RybCwgQ29tRnVsbFN0YWNrV2luKSxcclxuICAgIF0sXHJcbiAgICBbVklFV19JRC5mcmFtZUl0ZW0sIG5ldyBXaW5JbmZvKGNvbW1vbi5mcmFtZUl0ZW0sIENvbVNlY0Z1bGxXaW5vdyldLFxyXG4gICAgW1ZJRVdfSUQucmV3YXJkQ3RybCwgbmV3IFdpbkluZm8oY29tbW9uLnJld2FyZEN0cmwsIENvbVNlY0Z1bGxXaW5vdyldLFxyXG4gICAgW1ZJRVdfSUQubWF0Y2hDdHJsLCBuZXcgV2luSW5mbyhNYXRjaEN0cmwuTWF0Y2hDdHJsLCBDb21TZWNGdWxsV2lub3cpXSxcclxuICAgIFtCQVNFX1ZJRVdfSURfRVguV0FJVCwgbmV3IFdpbkluZm8odncudGlwLndhaXQsIENvbVRvcEZpeCldLFxyXG4gIF0pXHJcbik7XHJcblxyXG4vKiog56qX5Y+j6Z2Z5oCB6aKE5Yqg6L296LWE5rqQICovXHJcbmV4cG9ydCBjb25zdCBKWFZpZXdQcmVMb2FkID0ge307XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19JREJ5UGFnZU51bToge1xyXG4gIFtpZDogbnVtYmVyXTogeyBwYWdlPzogbnVtYmVyW107IHZpZXc/OiBudW1iZXIgfTtcclxufSA9IHt9O1xyXG4iXX0=