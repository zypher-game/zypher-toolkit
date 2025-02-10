
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/MatchCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27352AImdFOGovfQ/I22x6b', 'MatchCtrl');
// Script/Game/Views/Home/MatchCtrl.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var UI_1 = require("../../Common/UI");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var JXULAssets_1 = require("../Fight/JXULAssets");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
var MatchCtrl = /** @class */ (function (_super) {
    __extends(MatchCtrl, _super);
    function MatchCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.match = null;
        _this.iconArr = [];
        _this.iconLab = [];
        _this._blue = "ATTACHED_NODE:bone8";
        _this._red = "ATTACHED_NODE:bone13";
        /**敌人玩家 */
        _this._enemyArr = [];
        _this.assetManager = null;
        return _this;
    }
    MatchCtrl.prototype.onGLoad = function () { };
    MatchCtrl.prototype.onGStart = function (info, count, team, winCb) {
        var _this = this;
        this.assetManager = new JXULAssets_1.BattleAssets("RBBattle");
        this._enemyArr = info;
        count.forEach(function (v) {
            _this.iconArr[v].node.parent.parent.active = true;
            _this.iconLab[v].string = info[v].name;
            _this.assetImpl.spriteAtlasFrame(_this.iconArr[v], UIResources_1.Res.common.npcHead, _this._enemyArr[v].icon.toString());
        });
        this.match.setCompleteListener(function () {
            console.log({ team: team });
            _this.assetManager.loadAllRoundAssets(team, 1001, function () {
                var arg = {
                    sceneId: 1001,
                    assetManager: _this.assetManager,
                    args: team,
                };
                console.log(2222);
                GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.mapCtrl, arg, winCb);
                // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.fight, arg, winCb);
                console.log(3333);
            });
            _this.match.setAnimation(0, "2", true);
        });
        this.match.setAnimation(0, "1", false);
    };
    __decorate([
        property({ type: sp.Skeleton, tooltip: "匹配" })
    ], MatchCtrl.prototype, "match", void 0);
    __decorate([
        property({ type: cc.Sprite, tooltip: "匹配" })
    ], MatchCtrl.prototype, "iconArr", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: "匹配名字" })
    ], MatchCtrl.prototype, "iconLab", void 0);
    MatchCtrl = __decorate([
        ccclass,
        menu("View/Home/MatchCtrl")
    ], MatchCtrl);
    return MatchCtrl;
}(GViewBase_1.default));
exports.default = MatchCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL01hdGNoQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSwyREFBc0Q7QUFDdEQsc0NBQTBDO0FBQzFDLHdEQUErQztBQUMvQywrQ0FBMEM7QUFDMUMsa0RBQW1EO0FBQzdDLElBQUEsS0FBaUQsRUFBRSxDQUFDLFVBQVUsRUFBNUQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBR3JFO0lBQXVDLDZCQUFTO0lBQWhEO1FBQUEscUVBOENDO1FBN0NpRCxXQUFLLEdBQWdCLElBQUksQ0FBQztRQUM1QixhQUFPLEdBQWdCLEVBQUUsQ0FBQztRQUN6QixhQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ2hFLFdBQUssR0FBVyxxQkFBcUIsQ0FBQztRQUN0QyxVQUFJLEdBQVcsc0JBQXNCLENBQUM7UUFDOUMsVUFBVTtRQUNGLGVBQVMsR0FBMEIsRUFBRSxDQUFDO1FBQ3RDLGtCQUFZLEdBQWlCLElBQUksQ0FBQzs7SUFzQzVDLENBQUM7SUFyQ0MsMkJBQU8sR0FBUCxjQUFXLENBQUM7SUFDWiw0QkFBUSxHQUFSLFVBQ0UsSUFBc0IsRUFDdEIsS0FBZSxFQUNmLElBQWlCLEVBQ2pCLEtBQVk7UUFKZCxpQkFtQ0M7UUE3QkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDakQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0QyxLQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUM3QixLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUNmLGlCQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDbEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQ2xDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQy9DLElBQUksR0FBRyxHQUFvQztvQkFDekMsT0FBTyxFQUFFLElBQUk7b0JBQ2IsWUFBWSxFQUFFLEtBQUksQ0FBQyxZQUFZO29CQUMvQixJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLGlCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEQseURBQXlEO2dCQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQTVDK0M7UUFBL0MsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzRDQUEyQjtJQUM1QjtRQUE3QyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBQTJCO0lBQ3pCO1FBQTlDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs4Q0FBMEI7SUFIckQsU0FBUztRQUY3QixPQUFPO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDO09BQ1AsU0FBUyxDQThDN0I7SUFBRCxnQkFBQztDQTlDRCxBQThDQyxDQTlDc0MsbUJBQVMsR0E4Qy9DO2tCQTlDb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQXJnc0JhdHRsZVZpZXdDdHJsLFxyXG4gIElDaGVzc0J0bCxcclxuICBJR3JhZGVSYW5rSW5mbyxcclxuICBXaW5DYixcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IEdWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HVmlldy9HVmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgVklFV19JRCB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IHsgUmVzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgeyBCYXR0bGVBc3NldHMgfSBmcm9tIFwiLi4vRmlnaHQvSlhVTEFzc2V0c1wiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuQG1lbnUoXCJWaWV3L0hvbWUvTWF0Y2hDdHJsXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGNoQ3RybCBleHRlbmRzIEdWaWV3QmFzZSB7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIHRvb2x0aXA6IFwi5Yy56YWNXCIgfSkgbWF0Y2g6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIHRvb2x0aXA6IFwi5Yy56YWNXCIgfSkgaWNvbkFycjogY2MuU3ByaXRlW10gPSBbXTtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgdG9vbHRpcDogXCLljLnphY3lkI3lrZdcIiB9KSBpY29uTGFiOiBjYy5MYWJlbFtdID0gW107XHJcbiAgcHJpdmF0ZSBfYmx1ZTogc3RyaW5nID0gXCJBVFRBQ0hFRF9OT0RFOmJvbmU4XCI7XHJcbiAgcHJpdmF0ZSBfcmVkOiBzdHJpbmcgPSBcIkFUVEFDSEVEX05PREU6Ym9uZTEzXCI7XHJcbiAgLyoq5pWM5Lq6546p5a62ICovXHJcbiAgcHJpdmF0ZSBfZW5lbXlBcnI6IEFycmF5PElHcmFkZVJhbmtJbmZvPiA9IFtdO1xyXG4gIHByaXZhdGUgYXNzZXRNYW5hZ2VyOiBCYXR0bGVBc3NldHMgPSBudWxsO1xyXG4gIG9uR0xvYWQoKSB7fVxyXG4gIG9uR1N0YXJ0KFxyXG4gICAgaW5mbzogSUdyYWRlUmFua0luZm9bXSxcclxuICAgIGNvdW50OiBudW1iZXJbXSxcclxuICAgIHRlYW06IElDaGVzc0J0bFtdLFxyXG4gICAgd2luQ2I6IFdpbkNiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFzc2V0TWFuYWdlciA9IG5ldyBCYXR0bGVBc3NldHMoXCJSQkJhdHRsZVwiKTtcclxuICAgIHRoaXMuX2VuZW15QXJyID0gaW5mbztcclxuXHJcbiAgICBjb3VudC5mb3JFYWNoKCh2KSA9PiB7XHJcbiAgICAgIHRoaXMuaWNvbkFyclt2XS5ub2RlLnBhcmVudC5wYXJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pY29uTGFiW3ZdLnN0cmluZyA9IGluZm9bdl0ubmFtZTtcclxuICAgICAgdGhpcy5hc3NldEltcGwuc3ByaXRlQXRsYXNGcmFtZShcclxuICAgICAgICB0aGlzLmljb25BcnJbdl0sXHJcbiAgICAgICAgUmVzLmNvbW1vbi5ucGNIZWFkLFxyXG4gICAgICAgIHRoaXMuX2VuZW15QXJyW3ZdLmljb24udG9TdHJpbmcoKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hdGNoLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyh7IHRlYW0gfSk7XHJcbiAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmxvYWRBbGxSb3VuZEFzc2V0cyh0ZWFtLCAxMDAxLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFyZzogQXJnc0JhdHRsZVZpZXdDdHJsPElDaGVzc0J0bFtdPiA9IHtcclxuICAgICAgICAgIHNjZW5lSWQ6IDEwMDEsXHJcbiAgICAgICAgICBhc3NldE1hbmFnZXI6IHRoaXMuYXNzZXRNYW5hZ2VyLFxyXG4gICAgICAgICAgYXJnczogdGVhbSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKDIyMjIpO1xyXG4gICAgICAgIEdhbWVNZ3IuanVtcFRvTWdyLmp1bXBHb1RvKFZJRVdfSUQubWFwQ3RybCwgYXJnLCB3aW5DYik7XHJcbiAgICAgICAgLy8gR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5maWdodCwgYXJnLCB3aW5DYik7XHJcbiAgICAgICAgY29uc29sZS5sb2coMzMzMyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5tYXRjaC5zZXRBbmltYXRpb24oMCwgXCIyXCIsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hdGNoLnNldEFuaW1hdGlvbigwLCBcIjFcIiwgZmFsc2UpO1xyXG4gIH1cclxufVxyXG4iXX0=