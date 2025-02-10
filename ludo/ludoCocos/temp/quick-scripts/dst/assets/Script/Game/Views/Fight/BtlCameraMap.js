
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/BtlCameraMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '941c6p+Hq1A6o6cx4On3C4J', 'BtlCameraMap');
// Script/Game/Views/Fight/BtlCameraMap.ts

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
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../../Core/GCtrl");
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var GNodePool_1 = require("../../../Core/Manager/GNodePool");
var Define_1 = require("../../Common/Define");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var BtlFighltLayer_1 = require("./BtlFighltLayer");
/**节点池 */
var CNodePool = /** @class */ (function (_super) {
    __extends(CNodePool, _super);
    function CNodePool(parent, opt) {
        var _this = _super.call(this, parent) || this;
        _this._opt = opt;
        return _this;
    }
    CNodePool.prototype.syncCreate = function () {
        var node = new cc.Node();
        if (this._opt.size)
            node.setContentSize(this._opt.size);
        if (this._opt.anchor)
            node.setAnchorPoint(this._opt.anchor);
        return node;
    };
    CNodePool.prototype.asyncCreate = function (cb) {
        var node = this.syncCreate();
        cb(node);
    };
    return CNodePool;
}(GNodePool_1.GNodePool));
/**精灵池 */
var CSpritePool = /** @class */ (function (_super) {
    __extends(CSpritePool, _super);
    function CSpritePool(parent, opts) {
        var _this = _super.call(this, parent) || this;
        _this._opt = opts;
        return _this;
    }
    CSpritePool.prototype.syncCreate = function () {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        if (this._opt.size)
            node.setContentSize(this._opt.size);
        if (this._opt.anchor)
            node.setAnchorPoint(this._opt.anchor);
        if (this._opt.type != null)
            sp.type = this._opt.type;
        if (this._opt.sizeMode != null)
            sp.sizeMode = this._opt.sizeMode;
        if (this._opt.trim != null)
            sp.trim = this._opt.trim;
        if (this._opt.src != null)
            sp["srcBlendFactor"] = this._opt.src;
        return node;
    };
    CSpritePool.prototype.asyncCreate = function (cb) {
        var node = this.syncCreate();
        cb(node);
    };
    return CSpritePool;
}(GNodePool_1.GNodePool));
/** 必要条件初始化状态 */
var INIT_FLAG = {
    /** 地图静态资源 */
    STATIC: 1 << 0,
    /** 摄像机准备 */
    CAMERA: 1 << 1,
    /**戰鬥 */
    BATTLE: 1 << 2,
    /** 准备完成 */
    ALL: (1 << 0) | (1 << 1) | (1 << 2),
};
var VisitState;
(function (VisitState) {
    /** 不进行渲染 */
    VisitState[VisitState["VSIdle"] = 0] = "VSIdle";
    /** 第一次渲染地图 */
    VisitState[VisitState["VSInit"] = 1] = "VSInit";
    /** 采用更新模式更新地图 */
    VisitState[VisitState["VSUpdate"] = 2] = "VSUpdate";
})(VisitState || (VisitState = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var BtlCameraMap = /** @class */ (function (_super) {
    __extends(BtlCameraMap, _super);
    function BtlCameraMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**对象层 */
        _this.objectLayer = null;
        /**效果层 */
        _this.UIRoot2d_Down = null;
        _this.UIRoot2d_Up = null;
        /**战斗层 */
        _this.fightLayer = null;
        _this.diceBtn = null;
        /** 用来标识所有条件是否准备完成 */
        _this._initFlag = 0;
        /**戰鬥層級 */
        _this._fightLayer = null;
        /** 地图层级节点 */
        _this._layers = new ES5Ex_1.MapWrap();
        /** 地图节点缓存池 */
        _this._layerPools = new ES5Ex_1.MapWrap();
        /** 元素Size(用于位置计算) */
        _this._unitSize = null;
        /** 元素Size（用于大小计算） */
        _this._gridSize = null;
        /**可视区域 */
        _this._visitRect = null;
        ///////////////////逻辑变量以及事件/////////////////////////
        //绘制状态
        _this._drawState = VisitState.VSIdle;
        //活动item容器
        _this._elementComponents = new ES5Ex_1.MapWrap();
        //回收的item容器
        _this._recoverComponents = new Array();
        _this._winArgs = null;
        _this._winCb = null;
        /////////////////节点池///////////////////////
        //精灵池
        _this._spritePool = new cc.NodePool();
        _this._NodePool = new cc.NodePool();
        _this.play = true;
        return _this;
    }
    Object.defineProperty(BtlCameraMap.prototype, "mapSize", {
        get: function () {
            return this._mapSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlCameraMap.prototype, "unitSize", {
        get: function () {
            return this._unitSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlCameraMap.prototype, "gridSize", {
        get: function () {
            return this._gridSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlCameraMap.prototype, "visitRect", {
        get: function () {
            return this._visitRect;
        },
        enumerable: false,
        configurable: true
    });
    ///////////////////////////////////////////////////////////////////////////// 生命周期 //////////////////////////////////////////////////////////////////////
    // matchCtrl(winArgs,winCb)
    BtlCameraMap.prototype.onGStart = function (winArgs, winCb) {
        this._winArgs = winArgs;
        this._winCb = winCb;
        this._fightLayer = this.fightLayer.getComponent(BtlFighltLayer_1.default);
        this.startLoadData();
    };
    BtlCameraMap.prototype.jump = function () {
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.battleResultCtrl, 2, this._winCb);
    };
    BtlCameraMap.prototype.startLoadData = function () {
        var _this = this;
        this.allReady(INIT_FLAG.STATIC);
        this._fightLayer.fightInit(this._winArgs, // winArgs
        function (cmd) {
            // cb
            _this._cmdMgr = cmd;
            _this.allReady(INIT_FLAG.BATTLE);
        }, this._winCb // winCb
        );
    };
    BtlCameraMap.prototype.start = function () {
        this.allReady(INIT_FLAG.CAMERA);
    };
    BtlCameraMap.prototype.onGDestroy = function () {
        // 删除所有对象，和引用
        this._recoverComponents.forEach(function (ele) {
            ele.layerElements.values().forEach(function (node) {
                node.destroy();
            });
        });
        for (var i = 0; i < this._spritePool.size(); i++) {
            this._spritePool.get().destroy();
        }
        for (var i = 0; i < this._NodePool.size(); i++) {
            this._NodePool.get().destroy();
        }
    };
    ///////////////////////////////////////////////////////////////////////////// 初始化配置 //////////////////////////////////////////////////////////////////////
    /** 都准备好了，整是开始流程 */
    BtlCameraMap.prototype.allReady = function (curReadyFlag) {
        this._initFlag |= curReadyFlag;
        if (this._initFlag != INIT_FLAG.ALL)
            return;
        this._initEvent();
        this._cmdMgr.btlCameraMap = this;
        this._cmdMgr.createTeam();
        this._cmdMgr.startCmd();
    };
    /**监听事件 */
    BtlCameraMap.prototype._initEvent = function () {
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.client.fight.onChangeDiceBtn, this, this.onChangeDiceBtn.bind(this));
    };
    ///////////////////////////////////////////////////////////////////////////// 地图操作 //////////////////////////////////////////////////////////////////////
    /**从节点池获取节点 */
    BtlCameraMap.prototype.getNodeFromPool = function (type) {
        switch (type) {
            case Define_1.MapLayer.MLMaterial: {
                if (this._spritePool.size()) {
                    return this._spritePool.get();
                }
                else {
                    var node = new cc.Node();
                    node.addComponent(cc.Sprite);
                    return node;
                }
            }
        }
    };
    /**回收节点到节点池 */
    BtlCameraMap.prototype.recoverNodeToPool = function (node) {
        node.removeFromParent();
        switch (Number(node.name)) {
            case Define_1.MapLayer.MLMaterial: {
                node.scaleY = 1;
                node.scaleX = 1;
                node.zIndex = 0;
                node.getComponent(cc.Sprite).spriteFrame = null;
                this._spritePool.put(node);
                break;
            }
        }
    };
    BtlCameraMap.prototype.getElementById = function (id) {
        var element = this._elementComponents.get(id);
        return element;
    };
    ///////////////////////////////////////////游戏操作/////////////////////////////////////////////////////////////////////////
    BtlCameraMap.prototype.onDiceBtnClick = function () {
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.fight.onPlayerDice);
    };
    BtlCameraMap.prototype.onChangeDiceBtn = function (_, n) {
        ColorLog_1.default.esOn("CMsg.client.fight.onChangeDiceBtn");
        var status = n.get();
        this.diceBtn.active = status;
    };
    BtlCameraMap.prototype.onJumpBtnClick = function () {
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.fight.onPlayerJump);
    };
    BtlCameraMap.prototype.exit = function () {
        this.onClose();
        console.error("");
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.home);
        console.error("BtlCameraMap exit homeWin");
    };
    BtlCameraMap.prototype.stop = function () {
        if (this.play) {
            this.play = false;
            this._cmdMgr.stopRun();
        }
        else {
            this.play = true;
            this._cmdMgr.run();
        }
    };
    __decorate([
        property(cc.Node)
    ], BtlCameraMap.prototype, "objectLayer", void 0);
    __decorate([
        property(cc.Node)
    ], BtlCameraMap.prototype, "UIRoot2d_Down", void 0);
    __decorate([
        property(cc.Node)
    ], BtlCameraMap.prototype, "UIRoot2d_Up", void 0);
    __decorate([
        property(cc.Node)
    ], BtlCameraMap.prototype, "fightLayer", void 0);
    __decorate([
        property(cc.Node)
    ], BtlCameraMap.prototype, "diceBtn", void 0);
    BtlCameraMap = __decorate([
        ccclass,
        menu("View/Fight/BtlCameraMap")
    ], BtlCameraMap);
    return BtlCameraMap;
}(GViewBase_1.default));
exports.default = BtlCameraMap;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9CdGxDYW1lcmFNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLDJEQUFzRDtBQUN0RCxxREFBc0Q7QUFDdEQsNkNBQTRDO0FBRTVDLDJEQUFzRDtBQUN0RCw2REFBNEQ7QUFFNUQsOENBQXFEO0FBQ3JELHNDQUEwQztBQUMxQywrQ0FBMEM7QUFDMUMsbURBQTZDO0FBUTdDLFNBQVM7QUFDVDtJQUF3Qiw2QkFBUztJQUUvQixtQkFBWSxNQUFnQixFQUFFLEdBQWE7UUFBM0MsWUFDRSxrQkFBTSxNQUFNLENBQUMsU0FFZDtRQURDLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDOztJQUNsQixDQUFDO0lBQ0QsOEJBQVUsR0FBVjtRQUNFLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELCtCQUFXLEdBQVgsVUFBWSxFQUFnQjtRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsQ0FoQnVCLHFCQUFTLEdBZ0JoQztBQVlELFNBQVM7QUFDVDtJQUEwQiwrQkFBUztJQUVqQyxxQkFBWSxNQUFnQixFQUFFLElBQWdCO1FBQTlDLFlB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QyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUE2QjtJQUU1QjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFBNEI7SUFDM0I7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQXlCO0lBUnhCLFlBQVk7UUFGaEMsT0FBTztRQUNQLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztPQUNYLFlBQVksQ0FxTWhDO0lBQUQsbUJBQUM7Q0FyTUQsQUFxTUMsQ0FyTXlDLG1CQUFTLEdBcU1sRDtrQkFyTW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogWW91IG1heSB0aGluayB5b3Uga25vdyB3aGF0IHRoZSBmb2xsb3dpbmcgY29kZSBkb2VzLlxyXG4gKiBCdXQgeW91IGRvbnQuIFRydXN0IG1lLlxyXG4gKiBGaWRkbGUgd2l0aCBpdCwgYW5kIHlvdWxsIHNwZW5kIG1hbnkgYSBzbGVlcGxlc3NcclxuICogbmlnaHQgY3Vyc2luZyB0aGUgbW9tZW50IHlvdSB0aG91Z2h0IHlvdWQgYmUgY2xldmVyXHJcbiAqIGVub3VnaCB0byBcIm9wdGltaXplXCIgdGhlIGNvZGUgYmVsb3cuXHJcbiAqIE5vdyBjbG9zZSB0aGlzIGZpbGUgYW5kIGdvIHBsYXkgd2l0aCBzb21ldGhpbmcgZWxzZS5cclxuICovXHJcbi8qKlxyXG4gKiDkvaDlj6/og73kvJrorqTkuLrkvaDor7vlvpfmh4Lku6XkuIvnmoTku6PnoIHjgILkvYbmmK/kvaDkuI3kvJrmh4LnmoTvvIznm7jkv6HmiJHlkKfjgIJcclxuICog6KaB5piv5L2g5bCd6K+V546p5byE6L+Z5q615Luj56CB55qE6K+d77yM5L2g5bCG5Lya5Zyo5peg5bC955qE6YCa5a615Lit5LiN5pat5Zyw5ZKS6aqC6Ieq5bex5Li65LuA5LmI5Lya6K6k5Li66Ieq5bex6IGq5piO5Yiw5Y+v5Lul5LyY5YyW6L+Z5q615Luj56CB44CCXHJcbiAqIOeOsOWcqOivt+WFs+mXrei/meS4quaWh+S7tuWOu+eOqeeCueWIq+eahOWQp+OAglxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBBcmdzQmF0dGxlVmlld0N0cmwsXHJcbiAgSUNoZXNzQnRsLFxyXG4gIE5vZGVDYWxsQmFjayxcclxuICBXaW5DYixcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IENvbG9yTG9nIGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvQ29sb3JMb2dcIjtcclxuaW1wb3J0IHsgTWFwV3JhcCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HQ3RybFwiO1xyXG5pbXBvcnQgR1BhcmFtIGZyb20gXCIuLi8uLi8uLi9Db3JlL0dFdmVudC9HUGFyYW1cIjtcclxuaW1wb3J0IEdWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HVmlldy9HVmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgR05vZGVQb29sIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9HTm9kZVBvb2xcIjtcclxuaW1wb3J0IE1hdGhFeCBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYXRoL01hdGhFeFwiO1xyXG5pbXBvcnQgeyBDTXNnLCBNYXBMYXllciB9IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IFZJRVdfSUQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJXCI7XHJcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuLi8uLi9Mb2dpYy9HYW1lTWdyXCI7XHJcbmltcG9ydCBCdGxGaWdodExheWVyIGZyb20gXCIuL0J0bEZpZ2hsdExheWVyXCI7XHJcbmltcG9ydCBCdGxNYXBFbGVtZW50IGZyb20gXCIuL0J0bE1hcEVsZW1lbnRcIjtcclxuaW1wb3J0IEpYUkJDbWRNZ3IgZnJvbSBcIi4vSlhSQkNtZE1nclwiO1xyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgTm9kZU9wdCB7XHJcbiAgc2l6ZT86IGNjLlNpemU7XHJcbiAgYW5jaG9yPzogY2MuVmVjMjtcclxufVxyXG4vKiroioLngrnmsaAgKi9cclxuY2xhc3MgQ05vZGVQb29sIGV4dGVuZHMgR05vZGVQb29sIHtcclxuICBwcm90ZWN0ZWQgX29wdDogTm9kZU9wdDtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQ/OiBjYy5Ob2RlLCBvcHQ/OiBOb2RlT3B0KSB7XHJcbiAgICBzdXBlcihwYXJlbnQpO1xyXG4gICAgdGhpcy5fb3B0ID0gb3B0O1xyXG4gIH1cclxuICBzeW5jQ3JlYXRlKCkge1xyXG4gICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgaWYgKHRoaXMuX29wdC5zaXplKSBub2RlLnNldENvbnRlbnRTaXplKHRoaXMuX29wdC5zaXplKTtcclxuICAgIGlmICh0aGlzLl9vcHQuYW5jaG9yKSBub2RlLnNldEFuY2hvclBvaW50KHRoaXMuX29wdC5hbmNob3IpO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIGFzeW5jQ3JlYXRlKGNiOiBOb2RlQ2FsbEJhY2spIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5zeW5jQ3JlYXRlKCk7XHJcbiAgICBjYihub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFNwcml0ZU9wdCB7XHJcbiAgdHlwZT86IGNjLlNwcml0ZS5UeXBlO1xyXG4gIHNpemVNb2RlPzogY2MuU3ByaXRlLlNpemVNb2RlO1xyXG4gIHRyaW0/OiBib29sZWFuO1xyXG4gIHNyYz86IGNjLm1hY3JvLkJsZW5kRmFjdG9yO1xyXG4gIGRzdD86IGNjLm1hY3JvLkJsZW5kRmFjdG9yO1xyXG4gIHNpemU/OiBjYy5TaXplO1xyXG4gIGFuY2hvcj86IGNjLlZlYzI7XHJcbn1cclxuXHJcbi8qKueyvueBteaxoCAqL1xyXG5jbGFzcyBDU3ByaXRlUG9vbCBleHRlbmRzIEdOb2RlUG9vbCB7XHJcbiAgcHJvdGVjdGVkIF9vcHQ6IFNwcml0ZU9wdDtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQ/OiBjYy5Ob2RlLCBvcHRzPzogU3ByaXRlT3B0KSB7XHJcbiAgICBzdXBlcihwYXJlbnQpO1xyXG4gICAgdGhpcy5fb3B0ID0gb3B0cztcclxuICB9XHJcblxyXG4gIHN5bmNDcmVhdGUoKSB7XHJcbiAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICBsZXQgc3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgaWYgKHRoaXMuX29wdC5zaXplKSBub2RlLnNldENvbnRlbnRTaXplKHRoaXMuX29wdC5zaXplKTtcclxuICAgIGlmICh0aGlzLl9vcHQuYW5jaG9yKSBub2RlLnNldEFuY2hvclBvaW50KHRoaXMuX29wdC5hbmNob3IpO1xyXG4gICAgaWYgKHRoaXMuX29wdC50eXBlICE9IG51bGwpIHNwLnR5cGUgPSB0aGlzLl9vcHQudHlwZTtcclxuICAgIGlmICh0aGlzLl9vcHQuc2l6ZU1vZGUgIT0gbnVsbCkgc3Auc2l6ZU1vZGUgPSB0aGlzLl9vcHQuc2l6ZU1vZGU7XHJcbiAgICBpZiAodGhpcy5fb3B0LnRyaW0gIT0gbnVsbCkgc3AudHJpbSA9IHRoaXMuX29wdC50cmltO1xyXG4gICAgaWYgKHRoaXMuX29wdC5zcmMgIT0gbnVsbCkgc3BbXCJzcmNCbGVuZEZhY3RvclwiXSA9IHRoaXMuX29wdC5zcmM7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIGFzeW5jQ3JlYXRlKGNiOiBOb2RlQ2FsbEJhY2spIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5zeW5jQ3JlYXRlKCk7XHJcbiAgICBjYihub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKiDlv4XopoHmnaHku7bliJ3lp4vljJbnirbmgIEgKi9cclxuY29uc3QgSU5JVF9GTEFHID0ge1xyXG4gIC8qKiDlnLDlm77pnZnmgIHotYTmupAgKi9cclxuICBTVEFUSUM6IDEgPDwgMCxcclxuICAvKiog5pGE5YOP5py65YeG5aSHICovXHJcbiAgQ0FNRVJBOiAxIDw8IDEsXHJcbiAgLyoq5oiw6aylICovXHJcbiAgQkFUVExFOiAxIDw8IDIsXHJcbiAgLyoqIOWHhuWkh+WujOaIkCAqL1xyXG4gIEFMTDogKDEgPDwgMCkgfCAoMSA8PCAxKSB8ICgxIDw8IDIpLFxyXG59O1xyXG5cclxuZW51bSBWaXNpdFN0YXRlIHtcclxuICAvKiog5LiN6L+b6KGM5riy5p+TICovXHJcbiAgVlNJZGxlLFxyXG4gIC8qKiDnrKzkuIDmrKHmuLLmn5PlnLDlm74gKi9cclxuICBWU0luaXQsXHJcbiAgLyoqIOmHh+eUqOabtOaWsOaooeW8j+abtOaWsOWcsOWbviAqL1xyXG4gIFZTVXBkYXRlLFxyXG59XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvRmlnaHQvQnRsQ2FtZXJhTWFwXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0bENhbWVyYU1hcCBleHRlbmRzIEdWaWV3QmFzZSB7XHJcbiAgLyoq5a+56LGh5bGCICovXHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIG9iamVjdExheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAvKirmlYjmnpzlsYIgKi9cclxuICBAcHJvcGVydHkoY2MuTm9kZSkgVUlSb290MmRfRG93bjogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIFVJUm9vdDJkX1VwOiBjYy5Ob2RlID0gbnVsbDtcclxuICAvKirmiJjmlpflsYIgKi9cclxuICBAcHJvcGVydHkoY2MuTm9kZSkgZmlnaHRMYXllcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIGRpY2VCdG46IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAvKiog55So5p2l5qCH6K+G5omA5pyJ5p2h5Lu25piv5ZCm5YeG5aSH5a6M5oiQICovXHJcbiAgcHJvdGVjdGVkIF9pbml0RmxhZyA9IDA7XHJcbiAgLyoq5oiw6ayl5bGk57SaICovXHJcbiAgcHJvdGVjdGVkIF9maWdodExheWVyOiBCdGxGaWdodExheWVyID0gbnVsbDtcclxuICAvKiog5Zyw5Zu+5bGC57qn6IqC54K5ICovXHJcbiAgcHJvdGVjdGVkIF9sYXllcnM6IE1hcFdyYXA8bnVtYmVyLCBjYy5Ob2RlPiA9IG5ldyBNYXBXcmFwKCk7XHJcbiAgLyoqIOWcsOWbvuiKgueCuee8k+WtmOaxoCAqL1xyXG4gIHByb3RlY3RlZCBfbGF5ZXJQb29sczogTWFwV3JhcDxudW1iZXIsIEdOb2RlUG9vbD4gPSBuZXcgTWFwV3JhcCgpO1xyXG4gIC8qKiDlnLDlm77mspnnm5jlpKflsI8gKi9cclxuICBwcm90ZWN0ZWQgX21hcFNpemU6IGNjLlNpemU7XHJcbiAgcHVibGljIGdldCBtYXBTaXplKCk6IGNjLlNpemUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcFNpemU7XHJcbiAgfVxyXG4gIC8qKiDlhYPntKBTaXplKOeUqOS6juS9jee9ruiuoeeulykgKi9cclxuICBwcm90ZWN0ZWQgX3VuaXRTaXplOiBjYy5TaXplID0gbnVsbDtcclxuICBwdWJsaWMgZ2V0IHVuaXRTaXplKCk6IGNjLlNpemUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuaXRTaXplO1xyXG4gIH1cclxuICAvKiog5YWD57SgU2l6Ze+8iOeUqOS6juWkp+Wwj+iuoeeul++8iSAqL1xyXG4gIHByb3RlY3RlZCBfZ3JpZFNpemU6IGNjLlNpemUgPSBudWxsO1xyXG4gIHB1YmxpYyBnZXQgZ3JpZFNpemUoKTogY2MuU2l6ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZFNpemU7XHJcbiAgfVxyXG4gIC8qKiDlnLDlm77nu5jliLbljLrln58gKi9cclxuICBwcm90ZWN0ZWQgX2xhc3RWZXJ0czogW2NjLlZlYzIsIGNjLlZlYzIsIGNjLlZlYzIsIGNjLlZlYzJdO1xyXG4gIHB1YmxpYyBtaW5pVGNnUG9zOiBjYy5WZWMyO1xyXG4gIC8qKuWPr+inhuWMuuWfnyAqL1xyXG4gIHByb3RlY3RlZCBfdmlzaXRSZWN0OiBjYy5SZWN0ID0gbnVsbDtcclxuICBwdWJsaWMgZ2V0IHZpc2l0UmVjdCgpOiBjYy5SZWN0IHtcclxuICAgIHJldHVybiB0aGlzLl92aXNpdFJlY3Q7XHJcbiAgfVxyXG5cclxuICAvKiog6YCJ5Lit5qCH5b+X77yI5b2T5YmN6YCJ5Lit55qE5a+56LGh77yJICovXHJcbiAgcHJvdGVjdGVkIF9zZWxlY3RlZDogQnRsTWFwRWxlbWVudDtcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8v6YC76L6R5Y+Y6YeP5Lul5Y+K5LqL5Lu2Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8v57uY5Yi254q25oCBXHJcbiAgcHJvdGVjdGVkIF9kcmF3U3RhdGU6IFZpc2l0U3RhdGUgPSBWaXNpdFN0YXRlLlZTSWRsZTtcclxuICAvL+a0u+WKqGl0ZW3lrrnlmahcclxuICBwcm90ZWN0ZWQgX2VsZW1lbnRDb21wb25lbnRzOiBNYXBXcmFwPG51bWJlciwgQnRsTWFwRWxlbWVudD4gPSBuZXcgTWFwV3JhcDxcclxuICAgIG51bWJlcixcclxuICAgIEJ0bE1hcEVsZW1lbnRcclxuICA+KCk7XHJcbiAgLy/lm57mlLbnmoRpdGVt5a655ZmoXHJcbiAgcHJvdGVjdGVkIF9yZWNvdmVyQ29tcG9uZW50czogQXJyYXk8QnRsTWFwRWxlbWVudD4gPVxyXG4gICAgbmV3IEFycmF5PEJ0bE1hcEVsZW1lbnQ+KCk7XHJcblxyXG4gIHByb3RlY3RlZCBfd2luQXJnczogQXJnc0JhdHRsZVZpZXdDdHJsPElDaGVzc0J0bFtdPiA9IG51bGw7XHJcbiAgcHVibGljIF93aW5DYjogV2luQ2IgPSBudWxsO1xyXG4gIHByaXZhdGUgX2NtZE1ncjogSlhSQkNtZE1ncjtcclxuICAvLy8vLy8vLy8vLy8vLy8vL+iKgueCueaxoC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy/nsr7ngbXmsaBcclxuICBwcml2YXRlIF9zcHJpdGVQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gIHByaXZhdGUgX05vZGVQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gIHByaXZhdGUgcGxheTogYm9vbGVhbiA9IHRydWU7XHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g55Sf5ZG95ZGo5pyfIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBtYXRjaEN0cmwod2luQXJncyx3aW5DYilcclxuICBwdWJsaWMgb25HU3RhcnQod2luQXJnczogQXJnc0JhdHRsZVZpZXdDdHJsPGFueT4sIHdpbkNiOiBXaW5DYik6IHZvaWQge1xyXG4gICAgdGhpcy5fd2luQXJncyA9IHdpbkFyZ3M7XHJcbiAgICB0aGlzLl93aW5DYiA9IHdpbkNiO1xyXG4gICAgdGhpcy5fZmlnaHRMYXllciA9IHRoaXMuZmlnaHRMYXllci5nZXRDb21wb25lbnQoQnRsRmlnaHRMYXllcik7XHJcbiAgICB0aGlzLnN0YXJ0TG9hZERhdGEoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBqdW1wKCkge1xyXG4gICAgR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5iYXR0bGVSZXN1bHRDdHJsLCAyLCB0aGlzLl93aW5DYik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnRMb2FkRGF0YSgpIHtcclxuICAgIHRoaXMuYWxsUmVhZHkoSU5JVF9GTEFHLlNUQVRJQyk7XHJcbiAgICB0aGlzLl9maWdodExheWVyLmZpZ2h0SW5pdChcclxuICAgICAgdGhpcy5fd2luQXJncywgLy8gd2luQXJnc1xyXG4gICAgICAoY21kKSA9PiB7XHJcbiAgICAgICAgLy8gY2JcclxuICAgICAgICB0aGlzLl9jbWRNZ3IgPSBjbWQ7XHJcbiAgICAgICAgdGhpcy5hbGxSZWFkeShJTklUX0ZMQUcuQkFUVExFKTtcclxuICAgICAgfSxcclxuICAgICAgdGhpcy5fd2luQ2IgLy8gd2luQ2JcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuYWxsUmVhZHkoSU5JVF9GTEFHLkNBTUVSQSk7XHJcbiAgfVxyXG4gIG9uR0Rlc3Ryb3koKSB7XHJcbiAgICAvLyDliKDpmaTmiYDmnInlr7nosaHvvIzlkozlvJXnlKhcclxuICAgIHRoaXMuX3JlY292ZXJDb21wb25lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICBlbGUubGF5ZXJFbGVtZW50cy52YWx1ZXMoKS5mb3JFYWNoKChub2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nwcml0ZVBvb2wuc2l6ZSgpOyBpKyspIHtcclxuICAgICAgdGhpcy5fc3ByaXRlUG9vbC5nZXQoKS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX05vZGVQb29sLnNpemUoKTsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX05vZGVQb29sLmdldCgpLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIOWIneWni+WMlumFjee9riAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gIC8qKiDpg73lh4blpIflpb3kuobvvIzmlbTmmK/lvIDlp4vmtYHnqIsgKi9cclxuICBwcm90ZWN0ZWQgYWxsUmVhZHkoY3VyUmVhZHlGbGFnOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2luaXRGbGFnIHw9IGN1clJlYWR5RmxhZztcclxuICAgIGlmICh0aGlzLl9pbml0RmxhZyAhPSBJTklUX0ZMQUcuQUxMKSByZXR1cm47XHJcbiAgICB0aGlzLl9pbml0RXZlbnQoKTtcclxuICAgIHRoaXMuX2NtZE1nci5idGxDYW1lcmFNYXAgPSB0aGlzO1xyXG4gICAgdGhpcy5fY21kTWdyLmNyZWF0ZVRlYW0oKTtcclxuICAgIHRoaXMuX2NtZE1nci5zdGFydENtZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoq55uR5ZCs5LqL5Lu2ICovXHJcbiAgcHJvdGVjdGVkIF9pbml0RXZlbnQoKSB7XHJcbiAgICBHQ3RybC5FUy5vbihcclxuICAgICAgQ01zZy5jbGllbnQuZmlnaHQub25DaGFuZ2VEaWNlQnRuLFxyXG4gICAgICB0aGlzLFxyXG4gICAgICB0aGlzLm9uQ2hhbmdlRGljZUJ0bi5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g5Zyw5Zu+5pON5L2cIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvKirku47oioLngrnmsaDojrflj5boioLngrkgKi9cclxuICBwdWJsaWMgZ2V0Tm9kZUZyb21Qb29sKHR5cGUpOiBjYy5Ob2RlIHtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIE1hcExheWVyLk1MTWF0ZXJpYWw6IHtcclxuICAgICAgICBpZiAodGhpcy5fc3ByaXRlUG9vbC5zaXplKCkpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVQb29sLmdldCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirlm57mlLboioLngrnliLDoioLngrnmsaAgKi9cclxuICBwdWJsaWMgcmVjb3Zlck5vZGVUb1Bvb2wobm9kZTogY2MuTm9kZSkge1xyXG4gICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICBzd2l0Y2ggKE51bWJlcihub2RlLm5hbWUpKSB7XHJcbiAgICAgIGNhc2UgTWFwTGF5ZXIuTUxNYXRlcmlhbDoge1xyXG4gICAgICAgIG5vZGUuc2NhbGVZID0gMTtcclxuICAgICAgICBub2RlLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSAwO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZVBvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IG51bWJlcikge1xyXG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Q29tcG9uZW50cy5nZXQoaWQpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5ri45oiP5pON5L2cLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICBwcm90ZWN0ZWQgb25EaWNlQnRuQ2xpY2soKSB7XHJcbiAgICBHQ3RybC5FUy5lbWl0KENNc2cuY2xpZW50LmZpZ2h0Lm9uUGxheWVyRGljZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25DaGFuZ2VEaWNlQnRuKF8sIG46IEdQYXJhbSkge1xyXG4gICAgQ29sb3JMb2cuZXNPbihcIkNNc2cuY2xpZW50LmZpZ2h0Lm9uQ2hhbmdlRGljZUJ0blwiKTtcclxuICAgIGxldCBzdGF0dXMgPSBuLmdldDxib29sZWFuPigpO1xyXG4gICAgdGhpcy5kaWNlQnRuLmFjdGl2ZSA9IHN0YXR1cztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkp1bXBCdG5DbGljaygpIHtcclxuICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5jbGllbnQuZmlnaHQub25QbGF5ZXJKdW1wKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBleGl0KCkge1xyXG4gICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiXCIpO1xyXG4gICAgR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5ob21lKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJCdGxDYW1lcmFNYXAgZXhpdCBob21lV2luXCIpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHN0b3AoKSB7XHJcbiAgICBpZiAodGhpcy5wbGF5KSB7XHJcbiAgICAgIHRoaXMucGxheSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9jbWRNZ3Iuc3RvcFJ1bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGF5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fY21kTWdyLnJ1bigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=