
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Common/HangPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f74flick5MGqu0ovffvNwu', 'HangPage');
// Script/Game/Views/Common/HangPage.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var GCtrl_1 = require("../../../Core/GCtrl");
var Define_1 = require("../../Common/Define");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var HangPage = /** @class */ (function (_super) {
    __extends(HangPage, _super);
    function HangPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listenClosePage = [];
        _this.listenOpenPage = [];
        return _this;
    }
    HangPage.prototype.onLoad = function () {
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinOpenEventMsg, this, this.onWinOpen.bind(this));
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinDestroyEventMsg, this, this.onWinClose.bind(this));
        console.error("onLoad");
        this.setOrder(false);
    };
    HangPage.prototype.addListenPage = function (openLayer, closeLayer) {
        for (var i = 0; i < openLayer.length; i++) {
            if (this.listenOpenPage.indexOf(openLayer[i]) == -1) {
                this.listenOpenPage.push(openLayer[i]);
            }
        }
        for (var i = 0; i < closeLayer.length; i++) {
            if (this.listenClosePage.indexOf(closeLayer[i]) == -1) {
                this.listenClosePage.push(closeLayer[i]);
            }
        }
    };
    HangPage.prototype.getCurWin = function () {
        return this.curWin;
    };
    /**监听窗口打开*/
    HangPage.prototype.onWinOpen = function (_, winId) {
        ColorLog_1.default.esOn("GCtrl.GClientWinOpenEventMsg");
        // if (winId == VIEW_ID.fightLayer) {
        //     this.node.parent = null;
        //     return;
        // }
        //需要在哪些界面显示在最上层
        // let viewList = [VIEW_ID.heroArray, VIEW_ID.heroUp];
        this.curWin = winId;
        var viewList = this.listenOpenPage;
        for (var i = 0; i < viewList.length; i++) {
            if (winId == viewList[i]) {
                this.setOrder(true);
                return;
            }
        }
    };
    /**监听窗口关闭*/
    HangPage.prototype.onWinClose = function (_, win) {
        ColorLog_1.default.esOn("GCtrl.GClientWinDestroyEventMsg");
        // let viewList = [VIEW_ID.heroArray, VIEW_ID.fightLayer];
        var viewList = this.listenClosePage;
        for (var i = 0; i < viewList.length; i++) {
            if (win.winId == viewList[i]) {
                this.curWin = null;
                console.error("onWinClose");
                this.setOrder(false);
                return;
            }
        }
    };
    /**
     *
     * @param isNeedTop 是否在最顶层(否则在home之上)
     */
    HangPage.prototype.setOrder = function (isNeedTop) {
        this.node.active = true;
        if (isNeedTop) {
            var topWin = GameMgr_1.default.uiMgr.getActiveTopWin();
            this.node.zIndex = topWin.sortOrder + 1;
        }
        else {
            var homeWin = GameMgr_1.default.uiMgr.getActiveTopWin(UI_1.VIEW_ID.home);
            if (homeWin) {
                console.error("setOrder homeWin");
                this.node.zIndex = homeWin.sortOrder + 1;
                this.node.parent = homeWin.viewBinder.node.parent;
            }
            else {
                this.node.parent = null;
            }
        }
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.view.onViewChange);
    };
    HangPage.prototype.onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        GCtrl_1.GCtrl.ES.off(this.node);
    };
    return HangPage;
}(cc.Component));
exports.default = HangPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Db21tb24vSGFuZ1BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBQ3RELDZDQUE0QztBQUU1Qyw4Q0FBMkM7QUFDM0Msc0NBQTBDO0FBQzFDLCtDQUEwQztBQUUxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTBGQztRQXpGVyxxQkFBZSxHQUFrQixFQUFFLENBQUM7UUFDcEMsb0JBQWMsR0FBa0IsRUFBRSxDQUFDOztJQXdGL0MsQ0FBQztJQXRGQyx5QkFBTSxHQUFOO1FBQ0UsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBSyxDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNULGFBQUssQ0FBQyx5QkFBeUIsRUFDL0IsSUFBSSxFQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUMzQixDQUFDO1FBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTSxnQ0FBYSxHQUFwQixVQUFxQixTQUF3QixFQUFFLFVBQXlCO1FBQ3RFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENB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QUNGO1FBQ0QsYUFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNNLDRCQUFTLEdBQWhCO1FBQ0UsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0ExRkEsQUEwRkMsQ0ExRnFDLEVBQUUsQ0FBQyxTQUFTLEdBMEZqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvckxvZyBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0NvbG9yTG9nXCI7XHJcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgV2luIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9VSU1nclwiO1xyXG5pbXBvcnQgeyBDTXNnIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHsgVklFV19JRCB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmdQYWdlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuQ2xvc2VQYWdlOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgcHJvdGVjdGVkIGxpc3Rlbk9wZW5QYWdlOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgcHVibGljIGN1cldpbjogbnVtYmVyO1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIEdDdHJsLkVTLm9uKEdDdHJsLkdDbGllbnRXaW5PcGVuRXZlbnRNc2csIHRoaXMsIHRoaXMub25XaW5PcGVuLmJpbmQodGhpcykpO1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIEdDdHJsLkdDbGllbnRXaW5EZXN0cm95RXZlbnRNc2csXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25XaW5DbG9zZS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgY29uc29sZS5lcnJvcihcIm9uTG9hZFwiKTtcclxuICAgIHRoaXMuc2V0T3JkZXIoZmFsc2UpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkTGlzdGVuUGFnZShvcGVuTGF5ZXI6IEFycmF5PG51bWJlcj4sIGNsb3NlTGF5ZXI6IEFycmF5PG51bWJlcj4pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3BlbkxheWVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3Rlbk9wZW5QYWdlLmluZGV4T2Yob3BlbkxheWVyW2ldKSA9PSAtMSkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuT3BlblBhZ2UucHVzaChvcGVuTGF5ZXJbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbG9zZUxheWVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3RlbkNsb3NlUGFnZS5pbmRleE9mKGNsb3NlTGF5ZXJbaV0pID09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5DbG9zZVBhZ2UucHVzaChjbG9zZUxheWVyW2ldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEN1cldpbigpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cldpbjtcclxuICB9XHJcblxyXG4gIC8qKuebkeWQrOeql+WPo+aJk+W8gCovXHJcbiAgcHJpdmF0ZSBvbldpbk9wZW4oXywgd2luSWQ6IG51bWJlcikge1xyXG4gICAgQ29sb3JMb2cuZXNPbihcIkdDdHJsLkdDbGllbnRXaW5PcGVuRXZlbnRNc2dcIik7XHJcbiAgICAvLyBpZiAod2luSWQgPT0gVklFV19JRC5maWdodExheWVyKSB7XHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLnBhcmVudCA9IG51bGw7XHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gfVxyXG4gICAgLy/pnIDopoHlnKjlk6rkupvnlYzpnaLmmL7npLrlnKjmnIDkuIrlsYJcclxuICAgIC8vIGxldCB2aWV3TGlzdCA9IFtWSUVXX0lELmhlcm9BcnJheSwgVklFV19JRC5oZXJvVXBdO1xyXG4gICAgdGhpcy5jdXJXaW4gPSB3aW5JZDtcclxuICAgIGxldCB2aWV3TGlzdCA9IHRoaXMubGlzdGVuT3BlblBhZ2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh3aW5JZCA9PSB2aWV3TGlzdFtpXSkge1xyXG4gICAgICAgIHRoaXMuc2V0T3JkZXIodHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKuebkeWQrOeql+WPo+WFs+mXrSovXHJcbiAgcHJpdmF0ZSBvbldpbkNsb3NlKF8sIHdpbjogV2luKSB7XHJcbiAgICBDb2xvckxvZy5lc09uKFwiR0N0cmwuR0NsaWVudFdpbkRlc3Ryb3lFdmVudE1zZ1wiKTtcclxuICAgIC8vIGxldCB2aWV3TGlzdCA9IFtWSUVXX0lELmhlcm9BcnJheSwgVklFV19JRC5maWdodExheWVyXTtcclxuICAgIGxldCB2aWV3TGlzdCA9IHRoaXMubGlzdGVuQ2xvc2VQYWdlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAod2luLndpbklkID09IHZpZXdMaXN0W2ldKSB7XHJcbiAgICAgICAgdGhpcy5jdXJXaW4gPSBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvbldpbkNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0T3JkZXIoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaXNOZWVkVG9wIOaYr+WQpuWcqOacgOmhtuWxgijlkKbliJnlnKhob21l5LmL5LiKKVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRPcmRlcihpc05lZWRUb3A6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgaWYgKGlzTmVlZFRvcCkge1xyXG4gICAgICBsZXQgdG9wV2luID0gR2FtZU1nci51aU1nci5nZXRBY3RpdmVUb3BXaW4oKTtcclxuICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRvcFdpbi5zb3J0T3JkZXIgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGhvbWVXaW4gPSBHYW1lTWdyLnVpTWdyLmdldEFjdGl2ZVRvcFdpbihWSUVXX0lELmhvbWUpO1xyXG4gICAgICBpZiAoaG9tZVdpbikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZXRPcmRlciBob21lV2luXCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBob21lV2luLnNvcnRPcmRlciArIDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IGhvbWVXaW4udmlld0JpbmRlci5ub2RlLnBhcmVudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgR0N0cmwuRVMuZW1pdChDTXNnLmNsaWVudC52aWV3Lm9uVmlld0NoYW5nZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcyk7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuIl19