
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Map/MapStart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '969f9Wvu31Nl7ohWBMsF9CX', 'MapStart');
// Script/Game/Views/Map/MapStart.ts

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
var MapStartCtrl_1 = require("./MapStartCtrl");
var Map_CTRL = "MapStartCtrl";
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var MapStart = /** @class */ (function (_super) {
    __extends(MapStart, _super);
    function MapStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapStart.prototype.__onLoad = function () {
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
    MapStart.prototype.start = function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    };
    MapStart.prototype.onGameStart = function () {
        var node = cc.director.getScene().getChildByName(Map_CTRL);
        if (!node) {
            //添加一个控制节点
            node = new cc.Node();
            if (node) {
                node.name = "MapStartCtrl";
                var _MapStartCtrl = node.addComponent(MapStartCtrl_1.default);
                _MapStartCtrl.initEvent();
                cc.game.addPersistRootNode(node);
            }
        }
        // GameMgr.uiMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
        // GameMgr.uiMgr.showWin(VIEW_ID.mapCtrl, LoadingType.GameScene);
        GameMgr_1.default.uiMgr.showWin(UI_2.VIEW_ID.load, Define_1.LoadingType.AppStart);
    };
    MapStart = __decorate([
        ccclass,
        menu("MapStart")
    ], MapStart);
    return MapStart;
}(GComponent_1.default));
exports.default = MapStart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9NYXAvTWFwU3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTBEO0FBQzFELHNDQUEyRDtBQUMzRCx3REFBK0M7QUFDL0MsK0NBQTBDO0FBQzFDLGdEQUFvRDtBQUNwRCx3Q0FBNEM7QUFDNUMsbURBQStDO0FBQy9DLCtDQUEwQztBQUUxQyxJQUFNLFFBQVEsR0FBRyxjQUFjLENBQUM7QUFDMUIsSUFBQSxLQUFvQixFQUFFLENBQUMsVUFBVSxFQUEvQixPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHeEM7SUFBc0MsNEJBQVU7SUFBaEQ7O0lBaUNBLENBQUM7SUFoQ1csMkJBQVEsR0FBbEI7UUFBQSxpQkFVQztRQVRDLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdDLHVEQUF1RDtZQUN2RCxpQkFBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBUyxFQUFFLGtCQUFhLEVBQUUsVUFBQyxJQUFJO2dCQUN4RCxPQUFPLElBQUksZ0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0UsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSw4QkFBVyxHQUFsQjtRQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxVQUFVO1lBQ1YsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO2dCQUMzQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQztnQkFDcEQsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQixFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFDRCwrREFBK0Q7UUFDL0QsaUVBQWlFO1FBQ2pFLGlCQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFPLENBQUMsSUFBSSxFQUFFLG9CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWhDa0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQztPQUNJLFFBQVEsQ0FpQzVCO0lBQUQsZUFBQztDQWpDRCxBQWlDQyxDQWpDcUMsb0JBQVUsR0FpQy9DO2tCQWpDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvR0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBKWFZpZXdQcmVMb2FkLCBKWFdpbkluZm8gfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuaW1wb3J0IHsgTG9hZGluZ1R5cGUgfSBmcm9tIFwiLi8uLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IFZJRVdfSUQgfSBmcm9tIFwiLi8uLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi8uLi8uLi9Mb2dpYy9Ub2FzdE1nclwiO1xyXG5pbXBvcnQgTWFwU3RhcnRDdHJsIGZyb20gXCIuL01hcFN0YXJ0Q3RybFwiO1xyXG5cclxuY29uc3QgTWFwX0NUUkwgPSBcIk1hcFN0YXJ0Q3RybFwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiTWFwU3RhcnRcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwU3RhcnQgZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICBwcm90ZWN0ZWQgX19vbkxvYWQoKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBpMThuLmluaXQoXCJ6aF9DTlwiLCAoKSA9PiB7XHJcbiAgICAgIGNjLkJ1dHRvbi5jb21BdWRpbyA9IFJlcy5jb21tb24uYXVkaW8uYnV0dG9uO1xyXG4gICAgICAvLyBHYW1lTWdyLnVpTWdyLmludmFsaWRBdWRpbyA9IFJlcy5hdWRpby5pbnZhbGlkQ2xpY2s7XHJcbiAgICAgIEdhbWVNZ3IudWlNZ3IuaW5pdFdpbkluZm9zKEpYV2luSW5mbywgSlhWaWV3UHJlTG9hZCwgKG5vZGUpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFRvYXN0KG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vbkdhbWVTdGFydCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkdhbWVTdGFydCgpIHtcclxuICAgIGxldCBub2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShNYXBfQ1RSTCk7XHJcbiAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgLy/mt7vliqDkuIDkuKrmjqfliLboioLngrlcclxuICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgbm9kZS5uYW1lID0gXCJNYXBTdGFydEN0cmxcIjtcclxuICAgICAgICBsZXQgX01hcFN0YXJ0Q3RybCA9IG5vZGUuYWRkQ29tcG9uZW50KE1hcFN0YXJ0Q3RybCk7XHJcbiAgICAgICAgX01hcFN0YXJ0Q3RybC5pbml0RXZlbnQoKTtcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZShub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gR2FtZU1nci51aU1nci5zaG93V2luKFZJRVdfSUQuZmlnaHQsIExvYWRpbmdUeXBlLkdhbWVTY2VuZSk7XHJcbiAgICAvLyBHYW1lTWdyLnVpTWdyLnNob3dXaW4oVklFV19JRC5tYXBDdHJsLCBMb2FkaW5nVHlwZS5HYW1lU2NlbmUpO1xyXG4gICAgR2FtZU1nci51aU1nci5zaG93V2luKFZJRVdfSUQubG9hZCwgTG9hZGluZ1R5cGUuQXBwU3RhcnQpO1xyXG4gIH1cclxufVxyXG4iXX0=