"use strict";
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