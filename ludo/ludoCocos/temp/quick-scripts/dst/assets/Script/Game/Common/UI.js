
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQW1EO0FBQ25ELG9EQU0rQjtBQUMvQixrREFBbUQ7QUFDbkQsa0RBS2tDO0FBQ2xDLDZDQUFvQztBQUVwQyw4QkFBOEI7QUFDOUIsY0FBYztBQUNELFFBQUEsT0FBTyxHQUFHLGdCQUFLLENBQUMsZUFBZSxDQUFDO0FBQzdDLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQztBQUV0QyxPQUFPO0FBQ1AsSUFBSSxNQUFNLEVBQUU7SUFDVixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxDQUFDO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsU0FBUztZQUNyQixJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLEVBQUUsQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFRLElBQUksQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7S0FDRjtDQUNGO0FBRUQsMkpBQTJKO0FBQzNKLGNBQWM7QUFDZCxJQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFRLENBQzdCLG9CQUFPLENBQUMsUUFBUSxFQUNoQiwwQkFBYSxDQUFDLFNBQVMsRUFDdkIs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QyxVQUFVLEVBQUUsSUFBSSxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNyRSxDQUFDLGVBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxlQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN0RSxDQUFDLHVCQUFlLENBQUMsSUFBSSxFQUFFLElBQUksZUFBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQzVELENBQUMsQ0FDSCxDQUFDO0FBRUYsZ0JBQWdCO0FBQ0gsUUFBQSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRW5CLFFBQUEsZ0JBQWdCLEdBRXpCLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpYRGVmIH0gZnJvbSBcIi4uLy4uL2NvbnZlbnRpb25zL0pYQ29tbW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgV2luQWRkTW9kZSxcclxuICBXaW5DbG9zZU1vZGUsXHJcbiAgV2luTGF5ZXIsXHJcbiAgV2luTWFza1N0YXR1cyxcclxuICBXaW5UeXBlLFxyXG59IGZyb20gXCIuLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IHsgTWFwV3JhcCB9IGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IHtcclxuICBCQVNFX1ZJRVdfSURfRVgsXHJcbiAgV2luSW5mbyxcclxuICBXaW5JbmZvcyxcclxuICBXaW5Nb2RlbCxcclxufSBmcm9tIFwiLi4vLi4vQ29yZS9NYW5hZ2VyL1VJTWdyXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuL1VJUmVzb3VyY2VzXCI7XHJcblxyXG4vLyB2YXIgVklFV19JRF9CQVNFID0gMTAwMDAwMDtcclxuLyoqIOaJgOacieeahOeql+WPo0lEICovXHJcbmV4cG9ydCBjb25zdCBWSUVXX0lEID0gSlhEZWYuU1lTX0lERU5USVRZX0lEO1xyXG4vKiog6ZmE5LiK5a6i5oi356uv55qE55WM6Z2iSUQgKi9cclxuLy8gY2MuanMubWl4aW4oVklFV19JRCwgVklFV19JRCk7XHJcbmNjLmpzLm1peGluKFZJRVdfSUQsIEJBU0VfVklFV19JRF9FWCk7XHJcblxyXG4vLyDmnaXkuKrorablkYpcclxuaWYgKENDX0RFVikge1xyXG4gIGxldCBrZXlzID0gT2JqZWN0LmtleXMoVklFV19JRCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgaWYgKGkgPT0gaikgY29udGludWU7XHJcbiAgICAgIGlmIChWSUVXX0lEW2tleXNbaV1dID09IFZJRVdfSURba2V5c1tqXV0pIHtcclxuICAgICAgICBjYy53YXJuKGAke2tleXNbaV19ICA9PSAke2tleXNbal19YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIOeql+WPo+exu+Wei+aooeadvyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8qKiDpgJrnlKjlhajlsY/lpKfnqpflj6MgKi9cclxuY29uc3QgQ29tRnVsbFdpbiA9IG5ldyBXaW5Nb2RlbChcclxuICBXaW5UeXBlLkZ1bGxWaWV3LFxyXG4gIFdpbk1hc2tTdGF0dXMua09ubHlTaG93LFxyXG4gIFdpbkFkZE1vZGUuUmVwbGFjZUxheWVyLFxyXG4gIFdpbkNsb3NlTW9kZS5Pbmx5RGVzdHJveSB8IFdpbkNsb3NlTW9kZS5Qb3BBbGwsXHJcbiAgV2luTGF5ZXIuRmlyc3RXaW5kb3dcclxuKTtcclxuLyoqIOmAmueUqOWFqOWxj+Wkp+eql+WPoywg5YWl5qCI5pys5bGC5LmL5LiL55qEVUkgKi9cclxuY29uc3QgQ29tRnVsbFN0YWNrV2luID0gbmV3IFdpbk1vZGVsKFxyXG4gIFdpblR5cGUuRnVsbFZpZXcsXHJcbiAgV2luTWFza1N0YXR1cy5rT25seVNob3csXHJcbiAgV2luQWRkTW9kZS5QdXNoTG93ZXIsXHJcbiAgV2luQ2xvc2VNb2RlLk9ubHlEZXN0cm95IHwgV2luQ2xvc2VNb2RlLlBvcEFsbCxcclxuICBXaW5MYXllci5GaXJzdFdpbmRvd1xyXG4pO1xyXG4vKiog6YCa55So5LqM57qn5Y2V5L6L55WM6Z2iICovXHJcbmNvbnN0IENvbVNlY1NpbmdsZVdpbiA9IG5ldyBXaW5Nb2RlbChcclxuICBXaW5UeXBlLldpbmRvdyxcclxuICBXaW5NYXNrU3RhdHVzLmtUb3VjaENsb3NlIHwgV2luTWFza1N0YXR1cy5rT3BhY2l0eTE1NixcclxuICBXaW5BZGRNb2RlLlJlcGxhY2VTZWxmLFxyXG4gIFdpbkNsb3NlTW9kZS5Pbmx5RGVzdHJveSxcclxuICBXaW5MYXllci5TZWNvbmRXaW5kb3dcclxuKTtcclxuLyoqIOmAmueUqOWFqOWxj+S6jOe6p+eVjOmdoiAqL1xyXG5jb25zdCBDb21TZWNGdWxsV2lub3cgPSBuZXcgV2luTW9kZWwoXHJcbiAgV2luVHlwZS5GdWxsVmlldyxcclxuICBXaW5NYXNrU3RhdHVzLmtPbmx5U2hvdyB8IFdpbk1hc2tTdGF0dXMua09wYWNpdHkxNTYsXHJcbiAgV2luQWRkTW9kZS5TdGFjayxcclxuICBXaW5DbG9zZU1vZGUuT25seURlc3Ryb3ksXHJcbiAgV2luTGF5ZXIuU2Vjb25kV2luZG93XHJcbik7XHJcbi8qKiDpgJrnlKjpobblsYIgKi9cclxuY29uc3QgQ29tVG9wRml4ID0gbmV3IFdpbk1vZGVsKFxyXG4gIFdpblR5cGUuRml4LFxyXG4gIFdpbk1hc2tTdGF0dXMua09ubHlTaG93LFxyXG4gIFdpbkFkZE1vZGUuUmVwbGFjZVNlbGYsXHJcbiAgV2luQ2xvc2VNb2RlLlJlY3ljbGUsXHJcbiAgV2luTGF5ZXIuVG9wV2luZG93XHJcbik7XHJcblxyXG4vKiog56qX5Y+j6aKE5Yi25Lu25omA5LulICovXHJcbmNvbnN0IHZ3ID0gUmVzLnByZWZhYi52dztcclxuXHJcbmNvbnN0IGxvYWQgPSBSZXMubG9hZEN0cmw7XHJcbmNvbnN0IGhvbWUgPSBSZXMuaG9tZUN0cmw7XHJcbmNvbnN0IGNvbW1vbiA9IFJlcy5jb21tb247XHJcbmNvbnN0IE1hdGNoQ3RybCA9IFJlcy5NYXRjaEN0cmw7XHJcbmNvbnN0IGZpZ2h0ID0gUmVzLmZpZ2h0O1xyXG5jb25zdCBiYXR0bGVSZXN1bHRDdHJsID0gUmVzLmdhbWVPdmVyQ3RybDtcclxuLyoqIOeql+WPo+WfuuacrOS/oeaBryAqL1xyXG5leHBvcnQgY29uc3QgSlhXaW5JbmZvID0gbmV3IFdpbkluZm9zKFxyXG4gIE9iamVjdC5rZXlzKFZJRVdfSUQpLm1hcCgodiwgaykgPT4gVklFV19JRFt2XSksXHJcbiAgbmV3IE1hcFdyYXAoW1xyXG4gICAgW1ZJRVdfSUQubWFwQ3RybCwgbmV3IFdpbkluZm8oUmVzLm1hcEN0cmwsIENvbUZ1bGxXaW4pXSxcclxuICAgIFtWSUVXX0lELmxvYWQsIG5ldyBXaW5JbmZvKGxvYWQsIENvbUZ1bGxXaW4pXSxcclxuICAgIFtWSUVXX0lELmhvbWUsIG5ldyBXaW5JbmZvKGhvbWUuaG9tZUN0cmwsIENvbUZ1bGxXaW4pXSxcclxuICAgIFtWSUVXX0lELmZpZ2h0LCBuZXcgV2luSW5mbyhmaWdodC5maWdodEN0cmwsIENvbUZ1bGxTdGFja1dpbildLFxyXG4gICAgW1xyXG4gICAgICBWSUVXX0lELmJhdHRsZVJlc3VsdEN0cmwsXHJcbiAgICAgIG5ldyBXaW5JbmZvKGJhdHRsZVJlc3VsdEN0cmwuYmF0dGxlUmVzdWx0Q3RybCwgQ29tRnVsbFN0YWNrV2luKSxcclxuICAgIF0sXHJcbiAgICBbVklFV19JRC5mcmFtZUl0ZW0sIG5ldyBXaW5JbmZvKGNvbW1vbi5mcmFtZUl0ZW0sIENvbVNlY0Z1bGxXaW5vdyldLFxyXG4gICAgW1ZJRVdfSUQucmV3YXJkQ3RybCwgbmV3IFdpbkluZm8oY29tbW9uLnJld2FyZEN0cmwsIENvbVNlY0Z1bGxXaW5vdyldLFxyXG4gICAgW1ZJRVdfSUQubWF0Y2hDdHJsLCBuZXcgV2luSW5mbyhNYXRjaEN0cmwuTWF0Y2hDdHJsLCBDb21TZWNGdWxsV2lub3cpXSxcclxuICAgIFtCQVNFX1ZJRVdfSURfRVguV0FJVCwgbmV3IFdpbkluZm8odncudGlwLndhaXQsIENvbVRvcEZpeCldLFxyXG4gIF0pXHJcbik7XHJcblxyXG4vKiog56qX5Y+j6Z2Z5oCB6aKE5Yqg6L296LWE5rqQICovXHJcbmV4cG9ydCBjb25zdCBKWFZpZXdQcmVMb2FkID0ge307XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19JREJ5UGFnZU51bToge1xyXG4gIFtpZDogbnVtYmVyXTogeyBwYWdlPzogbnVtYmVyW107IHZpZXc/OiBudW1iZXIgfTtcclxufSA9IHt9O1xyXG4iXX0=