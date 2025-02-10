
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/BtlFighltLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf85bNP9PdCjqqAgNVqwzXm', 'BtlFighltLayer');
// Script/Game/Views/Fight/BtlFighltLayer.ts

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
var GChild_1 = require("../../../Core/GView/GChild");
var Define_1 = require("../../Common/Define");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var JXRBCmdMgr_1 = require("./JXRBCmdMgr");
var JXULDefine_1 = require("./JXULDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var BtlFightLayer = /** @class */ (function (_super) {
    __extends(BtlFightLayer, _super);
    function BtlFightLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shaizi = null;
        _this.levelView = null;
        _this.mask = null;
        _this.jump = null;
        _this._secenId = null;
        _this._cbFun = null;
        _this.winArgs = null;
        _this.logicAni = null;
        _this._player = null;
        _this.winCb = null;
        return _this;
    }
    Object.defineProperty(BtlFightLayer.prototype, "_winArgs", {
        get: function () {
            return this.winArgs;
        },
        set: function (v) {
            this.winArgs = v;
        },
        enumerable: false,
        configurable: true
    });
    /**初始战斗层 */
    BtlFightLayer.prototype.fightInit = function (winArgs, cb, winCb) {
        this._winArgs = winArgs;
        this.winCb = winCb;
        this._secenId = this._winArgs.sceneId;
        this._cbFun = cb;
        var team = this._winArgs.args;
        for (var i = 0; i < team.length; i++) {
            if (team[i].isPlayer) {
                this._player = team[i];
                break;
            }
        }
        this.loadEnv();
    };
    BtlFightLayer.prototype.update = function () {
        if (!this._cmdMgr)
            return;
        this._cmdMgr.update();
    };
    /**根据场景id加载对应数据 */
    BtlFightLayer.prototype.loadEnv = function () {
        var team = this._winArgs.args;
        var num = JXULDefine_1.RoleNumber;
        // let num = this.winCb.curLevel > 2 ? 4 : this.winCb.curLevel + 1;
        this._cmdMgr = new JXRBCmdMgr_1.default(this._secenId, this._winArgs.assetManager, num);
        this._cmdMgr.initRDBtlLayer(this.node, this.node.getChildByName("headContent"));
        this._cmdMgr.evtMgr.register(Define_1.CMsg.client.fight.endFight, this, this.onEndFight.bind(this));
        this._cmdMgr.initTeam(team);
        this._cmdMgr.loadAllResources(this.onResLoaded.bind(this));
        return this._cmdMgr;
    };
    BtlFightLayer.prototype.onResLoaded = function () {
        if (!this.isValid)
            return;
        this._cbFun(this._cmdMgr);
    };
    BtlFightLayer.prototype.onEndFight = function (_, dir) {
        console.log("战斗结束", dir.get());
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.battleResultCtrl, dir.get(), this.winCb);
    };
    __decorate([
        property(sp.Skeleton)
    ], BtlFightLayer.prototype, "shaizi", void 0);
    __decorate([
        property(cc.ScrollView)
    ], BtlFightLayer.prototype, "levelView", void 0);
    __decorate([
        property(cc.Node)
    ], BtlFightLayer.prototype, "mask", void 0);
    __decorate([
        property(cc.Node)
    ], BtlFightLayer.prototype, "jump", void 0);
    BtlFightLayer = __decorate([
        ccclass
    ], BtlFightLayer);
    return BtlFightLayer;
}(GChild_1.default));
exports.default = BtlFightLayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9CdGxGaWdobHRMYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxxREFBZ0Q7QUFDaEQsOENBQW1FO0FBQ25FLHNDQUEwQztBQUUxQywrQ0FBMEM7QUFDMUMsMkNBQXNDO0FBQ3RDLDJDQUEwQztBQUVwQyxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQWdGQztRQS9Fd0IsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFDekIsZUFBUyxHQUFrQixJQUFJLENBQUM7UUFDdEMsVUFBSSxHQUFZLElBQUksQ0FBQztRQUNyQixVQUFJLEdBQVksSUFBSSxDQUFDO1FBSWhDLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFFekIsWUFBTSxHQUFhLElBQUksQ0FBQztRQUN2QixhQUFPLEdBQW9DLElBQUksQ0FBQztRQU9qRCxjQUFRLEdBQWUsSUFBSSxDQUFDO1FBQzNCLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFDM0IsV0FBSyxHQUFVLElBQUksQ0FBQzs7SUE0RDdCLENBQUM7SUFwRUMsc0JBQVcsbUNBQVE7YUFHbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzthQUxELFVBQW9CLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFRRCxXQUFXO0lBQ0osaUNBQVMsR0FBaEIsVUFDRSxPQUFnQyxFQUNoQyxFQUE2QixFQUM3QixLQUFZO1FBRVosSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFyZ3NCYXR0bGVWaWV3Q3RybCxcclxuICBJQ2hlc3NCdGwsXHJcbiAgV2luQ2IsXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCBHUGFyYW0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0V2ZW50L0dQYXJhbVwiO1xyXG5pbXBvcnQgR0NoaWxkIGZyb20gXCIuLi8uLi8uLi9Db3JlL0dWaWV3L0dDaGlsZFwiO1xyXG5pbXBvcnQgeyBDTXNnLCBDb21wYXJlRW51bSwgR1JJRF9UWVBFIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHsgVklFV19JRCB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IHsgUmVzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgSlhSQkNtZE1nciBmcm9tIFwiLi9KWFJCQ21kTWdyXCI7XHJcbmltcG9ydCB7IFJvbGVOdW1iZXIgfSBmcm9tIFwiLi9KWFVMRGVmaW5lXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRsRmlnaHRMYXllciBleHRlbmRzIEdDaGlsZCB7XHJcbiAgQHByb3BlcnR5KHNwLlNrZWxldG9uKSBzaGFpemk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldykgbGV2ZWxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgbWFzazogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIGp1bXA6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAvKirlhazlhbHnmoTlkb3ku6TnrqHnkIbnsbsgKi9cclxuICBwcml2YXRlIF9jbWRNZ3I6IEpYUkJDbWRNZ3I7XHJcbiAgcHJpdmF0ZSBfc2VjZW5JZDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgcHVibGljIF9jYkZ1bjogRnVuY3Rpb24gPSBudWxsO1xyXG4gIHByaXZhdGUgd2luQXJnczogQXJnc0JhdHRsZVZpZXdDdHJsPElDaGVzc0J0bFtdPiA9IG51bGw7XHJcbiAgcHVibGljIHNldCBfd2luQXJncyh2KSB7XHJcbiAgICB0aGlzLndpbkFyZ3MgPSB2O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IF93aW5BcmdzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2luQXJncztcclxuICB9XHJcbiAgcHVibGljIGxvZ2ljQW5pOiBjYy5Ud2VlbltdID0gbnVsbDtcclxuICBwcml2YXRlIF9wbGF5ZXI6IElDaGVzc0J0bCA9IG51bGw7XHJcbiAgcHVibGljIHdpbkNiOiBXaW5DYiA9IG51bGw7XHJcblxyXG4gIC8qKuWIneWni+aImOaWl+WxgiAqL1xyXG4gIHB1YmxpYyBmaWdodEluaXQoXHJcbiAgICB3aW5BcmdzOiBBcmdzQmF0dGxlVmlld0N0cmw8YW55PixcclxuICAgIGNiOiAoY21kOiBKWFJCQ21kTWdyKSA9PiB2b2lkLFxyXG4gICAgd2luQ2I6IFdpbkNiXHJcbiAgKSB7XHJcbiAgICB0aGlzLl93aW5BcmdzID0gd2luQXJncztcclxuICAgIHRoaXMud2luQ2IgPSB3aW5DYjtcclxuICAgIHRoaXMuX3NlY2VuSWQgPSB0aGlzLl93aW5BcmdzLnNjZW5lSWQ7XHJcbiAgICB0aGlzLl9jYkZ1biA9IGNiO1xyXG4gICAgbGV0IHRlYW06IElDaGVzc0J0bFtdID0gdGhpcy5fd2luQXJncy5hcmdzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZWFtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0ZWFtW2ldLmlzUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyID0gdGVhbVtpXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkRW52KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NtZE1ncikgcmV0dXJuO1xyXG4gICAgdGhpcy5fY21kTWdyLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoq5qC55o2u5Zy65pmvaWTliqDovb3lr7nlupTmlbDmja4gKi9cclxuICBwcm90ZWN0ZWQgbG9hZEVudigpIHtcclxuICAgIGxldCB0ZWFtOiBJQ2hlc3NCdGxbXSA9IHRoaXMuX3dpbkFyZ3MuYXJncztcclxuICAgIGNvbnN0IG51bSA9IFJvbGVOdW1iZXI7XHJcbiAgICAvLyBsZXQgbnVtID0gdGhpcy53aW5DYi5jdXJMZXZlbCA+IDIgPyA0IDogdGhpcy53aW5DYi5jdXJMZXZlbCArIDE7XHJcbiAgICB0aGlzLl9jbWRNZ3IgPSBuZXcgSlhSQkNtZE1ncihcclxuICAgICAgdGhpcy5fc2VjZW5JZCxcclxuICAgICAgdGhpcy5fd2luQXJncy5hc3NldE1hbmFnZXIsXHJcbiAgICAgIG51bVxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NtZE1nci5pbml0UkRCdGxMYXllcihcclxuICAgICAgdGhpcy5ub2RlLFxyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkQ29udGVudFwiKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NtZE1nci5ldnRNZ3IucmVnaXN0ZXIoXHJcbiAgICAgIENNc2cuY2xpZW50LmZpZ2h0LmVuZEZpZ2h0LFxyXG4gICAgICB0aGlzLFxyXG4gICAgICB0aGlzLm9uRW5kRmlnaHQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NtZE1nci5pbml0VGVhbSh0ZWFtKTtcclxuICAgIHRoaXMuX2NtZE1nci5sb2FkQWxsUmVzb3VyY2VzKHRoaXMub25SZXNMb2FkZWQuYmluZCh0aGlzKSk7XHJcbiAgICByZXR1cm4gdGhpcy5fY21kTWdyO1xyXG4gIH1cclxuXHJcbiAgb25SZXNMb2FkZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fY2JGdW4odGhpcy5fY21kTWdyKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkVuZEZpZ2h0KF8sIGRpcjogR1BhcmFtKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIuaImOaWl+e7k+adn1wiLCBkaXIuZ2V0KCkpO1xyXG4gICAgR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5iYXR0bGVSZXN1bHRDdHJsLCBkaXIuZ2V0KCksIHRoaXMud2luQ2IpO1xyXG4gIH1cclxufVxyXG4iXX0=