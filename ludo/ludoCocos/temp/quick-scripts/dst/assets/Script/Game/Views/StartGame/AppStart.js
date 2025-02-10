
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/StartGame/AppStart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ec996CbopHOK1RY+rXa8ix', 'AppStart');
// Script/Game/Views/StartGame/AppStart.ts

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
var GComponent_1 = require("../../../Core/FrameEx/GComponent");
var UI_1 = require("../../Common/UI");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var Define_1 = require("./../../Common/Define");
var UI_2 = require("./../../Common/UI");
var ToastMgr_1 = require("./../../Logic/ToastMgr");
var AppCtrl_1 = require("./AppCtrl");
var APP_CTRL = "AppCtrl";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var AppStart = /** @class */ (function (_super) {
    __extends(AppStart, _super);
    function AppStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppStart.prototype.__onLoad = function () {
        var _this = this;
        // @ts-ignore
        i18n.init("zh_CN", function () {
            cc.Button.comAudio = UIResources_1.Res.common.audio.button;
            // GameMgr.uiMgr.invalidAudio = Res.audio.invalidClick;
            GameMgr_1.default.uiMgr.initWinInfos(UI_1.JXWinInfo, UI_1.JXViewPreLoad, function (node) {
                return new ToastMgr_1.Toast(node);
            });
            _this.onGameStart();
        });
    };
    AppStart.prototype.start = function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    };
    AppStart.prototype.onGameStart = function () {
        var node = cc.director.getScene().getChildByName(APP_CTRL);
        if (!node) {
            //添加一个控制节点
            node = new cc.Node();
            if (node) {
                node.name = "AppCtrl";
                var appCtrl = node.addComponent(AppCtrl_1.default);
                appCtrl.initEvent();
                cc.game.addPersistRootNode(node);
            }
        }
        // GameMgr.uiMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
        GameMgr_1.default.uiMgr.showWin(UI_2.VIEW_ID.load, Define_1.LoadingType.AppStart);
    };
    AppStart = __decorate([
        ccclass,
        menu("AppStart")
    ], AppStart);
    return AppStart;
}(GComponent_1.default));
exports.default = AppStart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9TdGFydEdhbWUvQXBwU3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTBEO0FBQzFELHNDQUEyRDtBQUMzRCx3REFBK0M7QUFDL0MsK0NBQTBDO0FBQzFDLGdEQUFvRDtBQUNwRCx3Q0FBNEM7QUFDNUMsbURBQStDO0FBQy9DLHFDQUFnQztBQUVoQyxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDckIsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBc0MsNEJBQVU7SUFBaEQ7O0lBaUNBLENBQUM7SUFoQ1csMkJBQVEsR0FBbEI7UUFBQSxpQkFVQztRQVRDLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdDLHVEQUF1RDtZQUN2RCxpQkFBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBUyxFQUFFLGtCQUFhLEVBQUUsVUFBQyxJQUFJO2dCQUN4RCxPQUFPLElBQUksZ0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0UsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSw4QkFBVyxHQUFsQjtRQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxVQUFVO1lBQ1YsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUN0QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztnQkFDekMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFFRCwrREFBK0Q7UUFDL0QsaUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQU8sQ0FBQyxJQUFJLEVBQUUsb0JBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBaENrQixRQUFRO1FBRjVCLE9BQU87UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDO09BQ0ksUUFBUSxDQWlDNUI7SUFBRCxlQUFDO0NBakNELEFBaUNDLENBakNxQyxvQkFBVSxHQWlDL0M7a0JBakNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdDb21wb25lbnQgZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEpYVmlld1ByZUxvYWQsIEpYV2luSW5mbyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IHsgUmVzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nVHlwZSB9IGZyb20gXCIuLy4uLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHsgVklFV19JRCB9IGZyb20gXCIuLy4uLy4uL0NvbW1vbi9VSVwiO1xyXG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLy4uLy4uL0xvZ2ljL1RvYXN0TWdyXCI7XHJcbmltcG9ydCBBcHBDdHJsIGZyb20gXCIuL0FwcEN0cmxcIjtcclxuXHJcbmNvbnN0IEFQUF9DVFJMID0gXCJBcHBDdHJsXCI7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiQXBwU3RhcnRcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU3RhcnQgZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICBwcm90ZWN0ZWQgX19vbkxvYWQoKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBpMThuLmluaXQoXCJ6aF9DTlwiLCAoKSA9PiB7XHJcbiAgICAgIGNjLkJ1dHRvbi5jb21BdWRpbyA9IFJlcy5jb21tb24uYXVkaW8uYnV0dG9uO1xyXG4gICAgICAvLyBHYW1lTWdyLnVpTWdyLmludmFsaWRBdWRpbyA9IFJlcy5hdWRpby5pbnZhbGlkQ2xpY2s7XHJcbiAgICAgIEdhbWVNZ3IudWlNZ3IuaW5pdFdpbkluZm9zKEpYV2luSW5mbywgSlhWaWV3UHJlTG9hZCwgKG5vZGUpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFRvYXN0KG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vbkdhbWVTdGFydCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkdhbWVTdGFydCgpIHtcclxuICAgIGxldCBub2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShBUFBfQ1RSTCk7XHJcbiAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgLy/mt7vliqDkuIDkuKrmjqfliLboioLngrlcclxuICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgbm9kZS5uYW1lID0gXCJBcHBDdHJsXCI7XHJcbiAgICAgICAgbGV0IGFwcEN0cmwgPSBub2RlLmFkZENvbXBvbmVudChBcHBDdHJsKTtcclxuICAgICAgICBhcHBDdHJsLmluaXRFdmVudCgpO1xyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2FtZU1nci51aU1nci5zaG93V2luKFZJRVdfSUQuZmlnaHQsIExvYWRpbmdUeXBlLkdhbWVTY2VuZSk7XHJcbiAgICBHYW1lTWdyLnVpTWdyLnNob3dXaW4oVklFV19JRC5sb2FkLCBMb2FkaW5nVHlwZS5BcHBTdGFydCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==