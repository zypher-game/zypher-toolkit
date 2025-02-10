
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/UIMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1aeb8xMjqJJCo49m1lzR6e0', 'UIMgr');
// Script/Core/Manager/UIMgr.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMgr = exports.BASE_VIEW_ID_EX = exports.Win = exports.WinInfos = exports.WinInfo = exports.WinModel = void 0;
var UIResources_1 = require("../../Game/Common/UIResources");
var CoreDefine_1 = require("../CoreDefine");
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GComponent_1 = require("../FrameEx/GComponent");
var GLoader_1 = require("../GLoader/GLoader");
var GViewBase_1 = require("../GView/GViewBase");
var GViewDestory_1 = require("../GView/GViewDestory");
var GCtrl_1 = require("./../GCtrl");
var AudioMgr_1 = require("./AudioMgr");
var ODER_OFFSET = 1000;
var SORT_OFFSET = 50;
var WIN_OPEN_AUDIO = "winOpen";
var WIN_CLOSE_AUDIO = "winClose";
var WinModel = /** @class */ (function () {
    function WinModel(type, mask, add, closeModel, layer) {
        this.winType = type;
        this.winMask = mask;
        this.winAddMode = add;
        this.winCloseMode = closeModel;
        this.winLayer = layer;
    }
    return WinModel;
}());
exports.WinModel = WinModel;
var WinInfo = /** @class */ (function () {
    function WinInfo(path, winModel) {
        this.path = path;
        this.winModel = winModel;
    }
    return WinInfo;
}());
exports.WinInfo = WinInfo;
var WinInfos = /** @class */ (function () {
    function WinInfos(winIds, opts) {
        this.winIds = winIds;
        this.winInfos = opts;
    }
    return WinInfos;
}());
exports.WinInfos = WinInfos;
// 窗口实例
var Win = /** @class */ (function (_super) {
    __extends(Win, _super);
    function Win() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 是否需要重新跑一次初始化逻辑 */
        _this._runGStart = true;
        /** 是否已经确认析构 */
        _this.isDestroy = false;
        return _this;
    }
    Object.defineProperty(Win.prototype, "logicArgs", {
        get: function () {
            return this._logicArgs;
        },
        set: function (val) {
            if (!this._logicArgs && !!val) {
                this._runGStart = true;
            }
            else if (this._logicArgs && val) {
                if (this._logicArgs.length != val.length) {
                    this._runGStart = true;
                }
                else {
                    for (var i = 0; i < val.length; i++) {
                        if (this._logicArgs[i] != val[i]) {
                            this._runGStart = true;
                            break;
                        }
                    }
                }
            }
            this._logicArgs = val;
        },
        enumerable: false,
        configurable: true
    });
    /** 预制件加载完成回调 */
    Win.prototype.onBinder = function (view) {
        var _a, _b;
        var _this = this;
        if (!!this.viewBinder && this.viewBinder != view) {
            throw new Error("this win has viewBinder!");
        }
        this.viewBinder = view;
        this.viewBinder.win = this;
        if (this.isDestroy) {
            this.onClose(true);
            return;
        }
        this.isDestroy = false;
        var node = this.viewBinder.node;
        if (node.zIndex != this.sortOrder)
            node.zIndex = this.sortOrder;
        if (this.winInfo.winModel.winType == CoreDefine_1.WinType.Window) {
            var animation = node.getComponent(cc.Animation);
            if (!animation) {
                node.scale = 0.6;
                node.opacity = 0;
                cc.tween(node)
                    .to(0.2, { scale: 1, opacity: 255 })
                    .call(function () {
                    _this.viewBinder.onAnimationLoaded();
                })
                    .start();
            }
            else {
                var chilps = animation.getClips();
                animation.play(chilps[0].name);
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    _this.viewBinder.onAnimationLoaded();
                });
            }
        }
        var isReGStart = this._runGStart || this.viewBinder.checkReGStart();
        if (isReGStart) {
            this._runGStart = false;
            (_a = this.viewBinder).__onGStart.apply(_a, this._logicArgs);
            // 找出本节点下的子组件，执行他的onGStart();
            var comps = this.viewBinder.getComponents(GComponent_1.default);
            if (comps.length > 1) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i] == this.viewBinder)
                        continue;
                    (_b = comps[i]).__onGStart.apply(_b, this._logicArgs);
                }
            }
        }
        this.viewBinder.onGActive();
        UIMgr.removeMutexWin(this);
        // 界面音效
        this.playWinAudioEffect(true);
    };
    Object.defineProperty(Win.prototype, "isLoad", {
        get: function () {
            return !!this.viewBinder;
        },
        enumerable: false,
        configurable: true
    });
    Win.prototype.addMaskEvent = function (cb) {
        if (!this.maskNode || !cb)
            return;
        this.maskNode.on("click", cb);
        this.maskNode.getComponent(cc.Button).clickAudio = null;
    };
    Win.prototype.onClose = function (force) {
        if (force === void 0) { force = false; }
        if (this.isDestroy && !force)
            return;
        this.isDestroy = true;
        UIMgr.onWinClose(this, force);
        // 界面关闭音效
        this.playWinAudioEffect(false);
    };
    /** 播放音效，开启或者关闭 */
    Win.prototype.playWinAudioEffect = function (isOpen) {
        var audio = null;
        audio = isOpen
            ? UIMgr.winAudios[WIN_OPEN_AUDIO + "_" + this.winId]
            : UIMgr.winAudios[WIN_CLOSE_AUDIO + "_" + this.winId];
        if (!audio) {
            var isAuto = this.winInfo.winModel.winLayer != CoreDefine_1.WinLayer.FirstWindow &&
                this.winInfo.winModel.winLayer < CoreDefine_1.WinLayer.RollWindow &&
                this.winInfo.winModel.winType != CoreDefine_1.WinType.FullView;
            if (isAuto) {
                audio = isOpen
                    ? UIMgr.winAudios[WIN_OPEN_AUDIO]
                    : UIMgr.winAudios[WIN_CLOSE_AUDIO];
            }
        }
        if (audio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(audio);
        }
    };
    Win.prototype.onDestroy = function () {
        UIMgr.onWinDestroy(this);
    };
    return Win;
}(ES5Ex_1.ObjectWrap));
exports.Win = Win;
exports.BASE_VIEW_ID_EX = {
    /** 跑马灯 */
    roll: 7001000,
    /** 常驻更新公告，警告层 */
    updateRemindCtrl: 8001000,
    /** toast */
    TOAST: 9000100,
    /** wiat */
    WAIT: 9000200,
    /** confirm */
    CONFIRM: 9000300,
    /** 热更新UI */
    hotUpdate: 9000500,
};
var UIMgr = /** @class */ (function () {
    function UIMgr() {
    }
    Object.defineProperty(UIMgr, "stack", {
        get: function () {
            return this._stack;
        },
        enumerable: false,
        configurable: true
    });
    /** 初始化窗口配置 */
    UIMgr.initWinInfos = function (infos, preLoadAsset, creatorToastCb) {
        this._infos = infos;
        this._preLoadAssets = preLoadAsset;
        this._creatorToastCb = creatorToastCb;
    };
    Object.defineProperty(UIMgr, "uiRoot", {
        /** 获取UIRoot */
        get: function () {
            var uiRoot = cc.director.getScene().getChildByList("Canvas/uiRoot");
            if (!uiRoot) {
                var canvas = cc.director.getScene().getChildByName("Canvas");
                if (!canvas)
                    return;
                uiRoot = new cc.Node();
                uiRoot.addComponent(GViewDestory_1.default);
                uiRoot.width = canvas.width;
                uiRoot.height = canvas.height;
                canvas.addChild(uiRoot);
                uiRoot.name = "uiRoot";
                uiRoot.position = cc.Vec3.ZERO;
                uiRoot.zIndex = 5000;
                this.initLayerSort();
                if (this._creatorToastCb) {
                    this._toast = this._creatorToastCb(uiRoot);
                    this.showToast("");
                }
                // 创建实际舞台区域之外的遮罩
                var actualSzie_1 = GCtrl_1.GCtrl.actualSize;
                var winSize_1 = cc.winSize;
                var leftNode_1 = new cc.Node("_GLOBAL_LEFT_");
                var leftSprite = leftNode_1.addComponent(cc.Sprite);
                leftSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                leftNode_1.anchorX = 0;
                leftNode_1.x = -winSize_1.width / 2;
                GLoader_1.GLoader.spriteFrame(leftSprite, UIResources_1.Res.single);
                leftNode_1.color = cc.Color.BLACK;
                leftNode_1.parent = canvas;
                leftNode_1.zIndex = CoreDefine_1.MAX_TAG;
                var rightNode_1 = new cc.Node("_GLOBAL_RIGHT_");
                var rightSprite = rightNode_1.addComponent(cc.Sprite);
                rightSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                rightNode_1.anchorX = 0;
                rightNode_1.x = actualSzie_1.width / 2;
                GLoader_1.GLoader.spriteFrame(rightSprite, UIResources_1.Res.single);
                rightNode_1.color = cc.Color.BLACK;
                rightNode_1.parent = canvas;
                rightNode_1.zIndex = CoreDefine_1.MAX_TAG;
                // leftNode.opacity = rightNode.opacity = 128;
                var setMaskSize = function () {
                    winSize_1 = cc.winSize;
                    leftNode_1.width = rightNode_1.width =
                        winSize_1.width / 2 - actualSzie_1.width / 2;
                    leftNode_1.height = rightNode_1.height = rightNode_1.height = winSize_1.height;
                    leftNode_1.x = -winSize_1.width / 2 - leftNode_1.width;
                    rightNode_1.x = actualSzie_1.width / 2 + leftNode_1.width;
                };
                setMaskSize();
                canvas.on(cc.Node.EventType.SIZE_CHANGED, setMaskSize, leftNode_1);
            }
            return uiRoot;
        },
        enumerable: false,
        configurable: true
    });
    /** 获取WinLayer初始ZIndex */
    UIMgr.layerOrder = function (layer) {
        return -ODER_OFFSET + (layer + 1) * ODER_OFFSET + SORT_OFFSET;
    };
    /** 初始化层级队列 */
    UIMgr.initLayerSort = function () {
        this._layerSortDic = new ES5Ex_1.MapWrap();
        for (var layerName in CoreDefine_1.WinLayer) {
            var layer = parseInt(CoreDefine_1.WinLayer[layerName]);
            this._layerSortDic.set(layer, [this.layerOrder(layer)]);
        }
    };
    /** 获取层级的下一个ZIndex-orderSort */
    UIMgr.genSortOrder = function (layer, isMask) {
        var orders = this._layerSortDic.get(layer);
        if (!orders) {
            cc.error("the layer init failed: " + layer);
            return this.layerOrder(layer);
        }
        var lastOrder = orders[orders.length - 1];
        if (isMask) {
            lastOrder += SORT_OFFSET - 1;
            return lastOrder;
        }
        else {
            lastOrder += SORT_OFFSET;
            orders.push(lastOrder);
            return lastOrder;
        }
    };
    /** 拿当前顶层 */
    UIMgr.getCurTopOrder = function (layer) {
        var orders = this._layerSortDic.get(layer);
        if (!orders) {
            cc.error("the layer init failed: " + layer);
            return this.layerOrder(layer);
        }
        var lastOrder = orders[orders.length - 1];
        return lastOrder;
    };
    /** 移除某个层级节点 */
    UIMgr.removeSortOrder = function (layer, sort) {
        var orders = this._layerSortDic.get(layer);
        if (!orders) {
            cc.error("the layer init failed: " + layer);
            return;
        }
        var index = orders.indexOf(sort);
        if (index != CoreDefine_1.INVALID_VALUE) {
            orders.splice(index, 1);
        }
    };
    /** 创建遮罩 */
    UIMgr.createMask = function () {
        this._maskPool = this._maskPool || new cc.NodePool();
        var maskNode, maskBtn;
        if (this._maskPool.size() == 0) {
            maskNode = new cc.Node();
            var sprite = maskNode.addComponent(cc.Sprite);
            GLoader_1.GLoader.spriteFrame(sprite, UIResources_1.Res.single, function () {
                maskNode.setContentSize(cc.size(3000, 3000));
            });
            maskBtn = maskNode.addComponent(cc.Button);
            maskNode.color = cc.Color.BLACK;
        }
        else {
            maskNode = this._maskPool.get();
            maskNode.opacity = 0;
            maskNode.off("click");
            maskBtn = maskNode.getComponent(cc.Button);
            if (maskBtn) {
                maskBtn.clickEvents = [];
            }
        }
        maskNode.setContentSize(cc.size(3000, 3000));
        if (this.invalidAudio) {
            maskBtn.clickAudio = this.invalidAudio;
        }
        return maskNode;
    };
    /** 获取窗口再活动栈的索引 */
    UIMgr.indexOfStack = function (win) {
        for (var i = 0; i < this._stack.length; i++) {
            if (this._stack[i] == win) {
                return i;
            }
        }
        return CoreDefine_1.INVALID_VALUE;
    };
    /** 从活动栈到隐藏堆 */
    UIMgr.stackToHeap = function (win, nstackIndex) {
        this.removeStackWin(win, nstackIndex);
        this._heap.push(win);
    };
    /** 从活动栈中移除, 对象没有真正移除的情况下
     *  仅供内部调用。逻辑层不允许调用
     */
    UIMgr.removeStackWin = function (win, index) {
        if (!index) {
            index = this.indexOfStack(win);
        }
        if (index != CoreDefine_1.INVALID_VALUE) {
            this._stack.splice(index, 1);
        }
        if (win.maskNode) {
            this._maskPool.put(win.maskNode);
            win.maskNode = null;
        }
        if (win.viewBinder && win.viewBinder.node && win.viewBinder.node.parent) {
            win.viewBinder.node.removeFromParent(false);
        }
        if (win.sortOrder != CoreDefine_1.INVALID_VALUE) {
            this.removeSortOrder(win.winInfo.winModel.winLayer, win.sortOrder);
            win.sortOrder = CoreDefine_1.INVALID_VALUE;
        }
    };
    UIMgr.pushStackWin = function (win) {
        var index = this.indexOfStack(win);
        if (index != CoreDefine_1.INVALID_VALUE) {
            // this.removeSortOrder(win.winInfo.winModel.winLayer, win.sortOrder);
            this.removeStackWin(win);
        }
        var viewName = this.getWinName(win.winInfo.path);
        var maskNode;
        var maskStatus = win.winInfo.winModel.winMask;
        if (!(maskStatus & CoreDefine_1.WinMaskStatus.kNone)) {
            if (!win.maskNode) {
                maskNode = this.createMask();
                maskNode.name = viewName + "_mask";
                maskNode.parent = this.uiRoot;
            }
            else {
                maskNode = win.maskNode;
                maskNode.active = true;
                if (!maskNode.parent)
                    maskNode.parent = this.uiRoot;
            }
        }
        maskNode.setContentSize(cc.winSize);
        win.maskNode = maskNode;
        win.sortOrder = this.genSortOrder(win.winInfo.winModel.winLayer);
        if (win.maskNode) {
            win.maskNode.zIndex = win.sortOrder - 1;
            if (maskStatus & CoreDefine_1.WinMaskStatus.kOpacity156) {
                win.maskNode.opacity = 156;
            }
            else if (maskStatus & CoreDefine_1.WinMaskStatus.kOpacity255) {
                win.maskNode.opacity = 255;
            }
            else {
                win.maskNode.opacity = 0;
            }
            if (maskStatus & CoreDefine_1.WinMaskStatus.kTouchClose) {
                win.addMaskEvent(function () { return win.onClose(); });
            }
        }
        this._stack.push(win);
        if (win.viewBinder) {
            var node = win.viewBinder.node;
            if (!node.parent) {
                node.parent = this.uiRoot;
            }
            if (!node.active) {
                node.active = true;
            }
            win.isDestroy = false;
            win.onBinder(win.viewBinder);
            return;
        }
    };
    UIMgr.getWinName = function (path) {
        var name = "";
        if (typeof path == "string") {
            var splits = path.split("/");
            name = splits[splits.length - 1];
        }
        else {
            name = path.name;
        }
        return name;
    };
    UIMgr.getFristWinById = function (id) {
        var wins = this._stack;
        for (var i = 0; i < wins.length; i++) {
            if (wins[i].winId == id) {
                return wins[i];
            }
        }
    };
    /**
     * 尝试获取当前节点所在的窗口
     * 注意该方法的使用需要在onGStart之后，可能undefined。
     * @param node 需要获取所在界面的节点
     */
    UIMgr.tryGetWinByNode = function (node) {
        var parent = node;
        while (parent) {
            if (parent == this.uiRoot)
                return;
            if (parent == cc.director.getScene())
                return;
            var viewBse = parent.getComponent(GViewBase_1.default);
            if (!viewBse) {
                parent = parent.parent;
                continue;
            }
            return viewBse.win;
        }
    };
    UIMgr.tryPopHeapWin = function (winId) {
        var wins = this._heap;
        for (var i = 0; i < wins.length; i++) {
            if (wins[i].winId == winId) {
                var win = wins[i];
                wins.splice(i, 1);
                return win;
            }
        }
    };
    UIMgr.tryGetRecycles = function (winId) {
        var wins = this._recycles.get(winId);
        if (wins && wins.length > 0) {
            return wins.pop();
        }
        return null;
    };
    UIMgr.getWinInfo = function (winId) {
        return this._infos.winInfos.get(winId);
    };
    /** 显示模态窗口 */
    UIMgr.showWin = function (winId) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var winInfo = this._infos.winInfos.get(winId);
        console.log({ winInfo: winInfo });
        if (!winInfo) {
            cc.error("this winId of: " + winId + " not init config (UI.ts)");
            return;
        }
        var model = winInfo.winModel;
        var win = null;
        if (model.winAddMode != CoreDefine_1.WinAddMode.Stack) {
            // 1.活动栈中查找
            win = this.getFristWinById(winId);
            if (win) {
                win.createStats = CoreDefine_1.WinCreateEnv.lStack;
                win.logicArgs = args;
                if (win.isLoad) {
                    this.pushStackWin(win);
                }
                return;
            }
        }
        // 2.从不活动栈中查找
        win = this.tryPopHeapWin(winId);
        if (win) {
            win.createStats = CoreDefine_1.WinCreateEnv.Heap;
        }
        else {
            // 3.从回收容器中查找
            win = this.tryGetRecycles(winId);
            if (win)
                win.createStats = CoreDefine_1.WinCreateEnv.Recycle;
        }
        if (!win) {
            win = new Win();
            win.winInfo = winInfo;
            win.winId = winId;
            win.createStats = CoreDefine_1.WinCreateEnv.New;
        }
        if (!win)
            return;
        win.logicArgs = args;
        this.pushStackWin(win);
        if (win.viewBinder) {
            return;
        }
        var __bindViewBase = function () {
            var path = win.winInfo.path;
            GLoader_1.GLoader.prefab(path, function (prefab) {
                var node = cc.instantiate(prefab);
                if (!node)
                    return;
                node.zIndex = win.sortOrder;
                node.parent = _this.uiRoot;
                var view = node.getComponent(GViewBase_1.default);
                if (!view)
                    return;
                if (win.winInfo.winModel.winType == CoreDefine_1.WinType.FullView) {
                    node.setContentSize(cc.winSize);
                }
                if (!(win.winInfo.winModel.winMask & CoreDefine_1.WinMaskStatus.kUnBlockInput) &&
                    view.bgImage &&
                    !view.bgImage.getComponent(cc.BlockInputEvents)) {
                    view.bgImage.addComponent(cc.BlockInputEvents);
                    view.bgImage.addComponent(cc.Button).clickAudio = UIMgr.invalidAudio;
                }
                win.onBinder(view);
            });
        };
        var preLoadAsset = this._preLoadAssets[win.winId];
        if (!!preLoadAsset && preLoadAsset.length > 0) {
            GCtrl_1.GCtrl.preLoadRawAssets.apply(GCtrl_1.GCtrl, __spreadArrays([function (curIndex, total, asset) {
                    asset && cc.log("preload assets: " + curIndex + "/" + total + ": " + asset.url);
                },
                function () {
                    _this.closeWait();
                    __bindViewBase();
                }], preLoadAsset));
        }
        else {
            __bindViewBase();
        }
    };
    UIMgr.removeMutexWin = function (win) {
        var wins = this._stack;
        var winLayer = win.winInfo.winModel.winLayer;
        var maxIndex = this.indexOfStack(win);
        maxIndex = maxIndex == CoreDefine_1.INVALID_VALUE ? this._stack.length - 1 : maxIndex;
        for (var i = maxIndex; i >= 0; i--) {
            var tarWin = wins[i];
            if (tarWin == win)
                continue;
            var tarLayer = tarWin.winInfo.winModel.winLayer;
            if (tarLayer >= CoreDefine_1.WinLayer.UnCheckMutex)
                continue;
            switch (win.winInfo.winModel.winAddMode) {
                case CoreDefine_1.WinAddMode.ReplaceLayer: {
                    if (winLayer <= tarLayer) {
                        tarWin.onClose(true);
                    }
                    break;
                }
                case CoreDefine_1.WinAddMode.ReplaceSelf: {
                    if (winLayer < tarLayer) {
                        tarWin.onClose(true);
                    }
                    break;
                }
                case CoreDefine_1.WinAddMode.PushLower: {
                    if (win.sortOrder > tarWin.sortOrder) {
                        this.stackToHeap(tarWin);
                    }
                    else if (win.sortOrder < tarWin.sortOrder) {
                        tarWin.onClose(true);
                    }
                    break;
                }
                case CoreDefine_1.WinAddMode.Stack: {
                    if (win.sortOrder < tarWin.sortOrder) {
                        tarWin.onClose(true);
                    }
                    break;
                }
                case CoreDefine_1.WinAddMode.PushHeigh: {
                    if (winLayer < tarLayer) {
                        this.stackToHeap(tarWin);
                    }
                    break;
                }
                default:
                    break;
            }
        }
    };
    /** 窗口关闭事件 */
    UIMgr.onWinClose = function (win, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var __closeLogic = function () {
            var winClose = win.winInfo.winModel.winCloseMode;
            if (winClose & CoreDefine_1.WinCloseMode.OnlyDestroy) {
                // 如果不存在bind数据
                _this.removeStackWin(win);
                if (win.viewBinder) {
                    win.viewBinder.node.destroy();
                    // 如果存在预加载资源，则释放它
                    var preLoadAssetPaths = _this._preLoadAssets[win.winId];
                    if (preLoadAssetPaths) {
                        for (var i = 0; i < preLoadAssetPaths.length; i++) {
                            GLoader_1.GLoader.releaseAsset(preLoadAssetPaths[i].path);
                        }
                    }
                    var path = win.winInfo.path;
                    GLoader_1.GLoader.releaseAsset(path);
                }
            }
            else if (winClose & CoreDefine_1.WinCloseMode.Recycle) {
                _this.removeStackWin(win);
                var wins = _this._recycles.get(win.winId);
                if (!wins) {
                    wins = [];
                    _this._recycles.set(win.winId, wins);
                }
                wins.push(win);
            }
            else if (winClose & CoreDefine_1.WinCloseMode.Hide) {
                if (win.maskNode)
                    win.maskNode.active = false;
                if (win.viewBinder)
                    win.viewBinder.node.active = false;
            }
            if (winClose & CoreDefine_1.WinCloseMode.PopAll && !force) {
                while (_this._heap.length > 0) {
                    var tarWin = _this._heap.pop();
                    // 回归场景
                    _this.pushStackWin(tarWin);
                    if (tarWin.winInfo.winModel.winCloseMode & CoreDefine_1.WinCloseMode.PopAll) {
                        break;
                    }
                }
            }
        };
        if (win.winInfo.winModel.winType == CoreDefine_1.WinType.Window &&
            win.viewBinder &&
            !force) {
            var node = win.viewBinder.node;
            var mask_1 = win.maskNode;
            var animation = win.viewBinder.getComponent(cc.Animation);
            if (!animation) {
                cc.tween(node)
                    .to(0.3, { opacity: 0 })
                    .call(function () {
                    cc.director
                        .getActionManager()
                        .removeAllActionsFromTarget(mask_1, true);
                    __closeLogic();
                })
                    .start();
            }
            else {
                var clips = animation.getClips();
                animation.play(clips[1].name);
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    cc.director.getActionManager().removeAllActionsFromTarget(mask_1, true);
                    __closeLogic();
                });
            }
            if (mask_1) {
                mask_1.zIndex = win.sortOrder + 1;
                cc.tween(mask_1).to(0.3, { opacity: 0 }).start();
            }
        }
        else {
            __closeLogic();
        }
    };
    /** 窗口析构事件 */
    UIMgr.onWinDestroy = function (win) {
        this.removeStackWin(win);
        // 1.非活动栈中查找：
        for (var i = 0; i < this._heap.length; i++) {
            if (this._heap[i] == win) {
                this._heap.splice(i, 1);
            }
        }
        var wins = this._recycles.get(win.winId);
        if (wins) {
            for (var i = 0; i < wins.length; i++) {
                if (wins[i] == win) {
                    wins.splice(i, 1);
                }
            }
        }
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GClientWinDestroyEventMsg, win);
        win.viewBinder = null;
        win.winInfo = null;
        win.maskNode = null;
        win.winId = CoreDefine_1.INVALID_VALUE;
    };
    /** 根据ViewId获取顶层的Win */
    UIMgr.getActiveTopWin = function (winId) {
        if (!winId) {
            for (var i = this._stack.length - 1; i >= 0; i--) {
                var win = this._stack[i];
                if (win.winId >= exports.BASE_VIEW_ID_EX.roll)
                    continue;
                return win;
            }
            return null;
        }
        for (var i = this._stack.length - 1; i >= 0; i--) {
            if (this._stack[i].winId == winId) {
                return this._stack[i];
            }
        }
    };
    /** 移除所有的活动Win */
    UIMgr.removeAllActiveWin = function () {
        if (!this._stack)
            return;
        while (this._stack.length > 0) {
            this._stack.pop().onClose(true);
        }
        while (this._heap.length > 0) {
            var win = this._heap.pop();
            win.viewBinder.node.destroy();
            win.viewBinder = null;
            win.logicArgs = null;
            win.winInfo = null;
        }
    };
    /** 移除ViewLayer的win */
    UIMgr.removeActiveByViewLayer = function () {
        var layers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            layers[_i] = arguments[_i];
        }
        for (var i = this._stack.length; i >= 0; i--) {
            var winLayer = this._stack[i].winInfo.winModel.winLayer;
            if (layers.indexOf(winLayer) != CoreDefine_1.INVALID_VALUE) {
                this._stack[i].onClose();
            }
        }
    };
    /** 移除viewId 的 win */
    UIMgr.removeActiveByViewId = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        for (var i = this._stack.length - 1; i >= 0; i--) {
            if (ids.indexOf(this._stack[i].winId) != CoreDefine_1.INVALID_VALUE) {
                this._stack[i].onClose();
            }
        }
    };
    /** 获取当前活动的窗口 */
    UIMgr.getView = function (winId) {
        var win = this.getActiveTopWin(winId);
        if (!win)
            return null;
        return win.viewBinder;
    };
    /** 判断该窗口ID当前是否活动 */
    UIMgr.isActiveView = function (winId) {
        return this.getActiveTopWin(winId) != null;
    };
    UIMgr.activeWin = function (win, isShow) {
        if (win.maskNode)
            win.maskNode.active = isShow;
        if (win.viewBinder)
            win.viewBinder.node.active = isShow;
    };
    UIMgr.getHeapViewByName = function (name) {
        for (var i = 0; i < this._heap.length; i++) {
            if (this._heap[i].viewBinder.node.name == name) {
                return this._heap[i];
            }
        }
    };
    UIMgr.showWait = function () {
        this.showWin(exports.BASE_VIEW_ID_EX.WAIT);
        var win = this.getActiveTopWin(exports.BASE_VIEW_ID_EX.WAIT);
        if (win && win.viewBinder) {
            console.log(1111);
            win.viewBinder.onGStart();
        }
    };
    UIMgr.closeWait = function () {
        var win = this.getActiveTopWin(exports.BASE_VIEW_ID_EX.WAIT);
        if (!win)
            return;
        win.onClose();
    };
    /** 普通提示 */
    UIMgr.showToast = function (msg) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._toast) {
            (_a = this._toast).show.apply(_a, __spreadArrays([msg], args));
        }
    };
    /** 触摸遮罩 */
    UIMgr.touchShow = function (cb, isAutoRemove, parent) {
        if (isAutoRemove === void 0) { isAutoRemove = true; }
        parent = parent || this.uiRoot;
        var touchNode = parent.getChildByName("touchNode");
        if (!touchNode) {
            touchNode = new cc.Node("touchNode");
            touchNode.parent = parent;
            touchNode.position = cc.v3(0, 0);
            touchNode.zIndex = this.layerOrder(CoreDefine_1.WinLayer.TouchShow);
            touchNode.setContentSize(cc.winSize);
        }
        touchNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (isAutoRemove) {
                touchNode.destroyAllChildren();
                touchNode.active = false;
                touchNode.off(cc.Node.EventType.TOUCH_START);
            }
            cb && cb(touchNode);
        });
        touchNode.destroyAllChildren();
        touchNode.active = true;
        return touchNode;
    };
    UIMgr.touchHid = function (parent) {
        parent = parent || this.uiRoot;
        var touchNode = parent.getChildByName("touchNode");
        if (touchNode) {
            touchNode.destroyAllChildren();
            touchNode.active = false;
            touchNode.off(cc.Node.EventType.TOUCH_START);
        }
    };
    /** 显示触摸遮罩 */
    UIMgr.showBlockInput = function () {
        var maskNode = this.uiRoot.getChildByName("uiRootMaskNode");
        if (!maskNode) {
            maskNode = new cc.Node("uiRootMaskNode");
            maskNode.parent = this.uiRoot;
            maskNode.position = cc.Vec3.ZERO;
            maskNode.zIndex = this.layerOrder(CoreDefine_1.WinLayer.WarnWindow);
            maskNode.setContentSize(cc.winSize);
            maskNode.addComponent(cc.BlockInputEvents);
        }
        maskNode.active = true;
    };
    /** 移除触摸遮罩 */
    UIMgr.hidBlockInput = function () {
        var maskNode = this.uiRoot.getChildByName("uiRootMaskNode");
        if (maskNode) {
            maskNode.destroy();
        }
    };
    /**
     * 播放骨骼动画
     * @param spine 骨骼动画
     * @param animName 动画名
     * @param loop 是否循环
     * @param callback 结束回调
     */
    UIMgr.playSpine = function (spine, animName, loop, callback) {
        var track = spine.setAnimation(0, animName, loop);
        if (track) {
            // 注册动画的结束回调
            spine.setCompleteListener(function (trackEntry, loopCount) {
                var name = trackEntry.animation ? trackEntry.animation.name : "";
                if (name === animName && callback) {
                    callback(); // 动画结束后执行自己的逻辑
                }
            });
        }
    };
    /** 窗口活动栈 */
    UIMgr._stack = [];
    /** 窗口待推出栈 */
    UIMgr._heap = [];
    /** 回收备用的窗口节点 */
    UIMgr._recycles = new ES5Ex_1.MapWrap();
    /** 遮罩缓存池 */
    UIMgr._maskPool = new cc.NodePool();
    /** 窗口开启和关闭音效 */
    UIMgr.winAudios = {};
    return UIMgr;
}());
exports.UIMgr = UIMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL1VJTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkRBQW9EO0FBQ3BELDRDQVN1QjtBQUN2QiwwQ0FBdUQ7QUFDdkQsb0RBQStDO0FBQy9DLDhDQUE2QztBQUM3QyxnREFBMkM7QUFDM0Msc0RBQWlEO0FBQ2pELG9DQUFtQztBQUNuQyx1Q0FBc0M7QUFFdEMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDakMsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBRW5DO0lBT0Usa0JBQ0UsSUFBYSxFQUNiLElBQVksRUFDWixHQUFlLEVBQ2YsVUFBa0IsRUFDbEIsS0FBZTtRQUVmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FwQkEsQUFvQkMsSUFBQTtBQXBCWSw0QkFBUTtBQXNCckI7SUFHRSxpQkFBWSxJQUFZLEVBQUUsUUFBa0I7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDBCQUFPO0FBU3BCO0lBR0Usa0JBQVksTUFBZ0IsRUFBRSxJQUE4QjtRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJ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ZEFzc2V0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9HYW1lL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQge1xyXG4gIElOVkFMSURfVkFMVUUsXHJcbiAgTUFYX1RBRyxcclxuICBXaW5BZGRNb2RlLFxyXG4gIFdpbkNsb3NlTW9kZSxcclxuICBXaW5DcmVhdGVFbnYsXHJcbiAgV2luTGF5ZXIsXHJcbiAgV2luTWFza1N0YXR1cyxcclxuICBXaW5UeXBlLFxyXG59IGZyb20gXCIuLi9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAsIE9iamVjdFdyYXAgfSBmcm9tIFwiLi4vRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgR0NvbXBvbmVudCBmcm9tIFwiLi4vRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdMb2FkZXIgfSBmcm9tIFwiLi4vR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCBHVmlld0Jhc2UgZnJvbSBcIi4uL0dWaWV3L0dWaWV3QmFzZVwiO1xyXG5pbXBvcnQgR1ZpZXdEZXN0b3J5IGZyb20gXCIuLi9HVmlldy9HVmlld0Rlc3RvcnlcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi8uLi9HQ3RybFwiO1xyXG5pbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCIuL0F1ZGlvTWdyXCI7XHJcblxyXG5jb25zdCBPREVSX09GRlNFVCA9IDEwMDA7XHJcbmNvbnN0IFNPUlRfT0ZGU0VUID0gNTA7XHJcbmNvbnN0IFdJTl9PUEVOX0FVRElPID0gXCJ3aW5PcGVuXCI7XHJcbmNvbnN0IFdJTl9DTE9TRV9BVURJTyA9IFwid2luQ2xvc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5Nb2RlbCB7XHJcbiAgd2luVHlwZTogV2luVHlwZTtcclxuICB3aW5NYXNrOiBudW1iZXI7XHJcbiAgd2luQWRkTW9kZTogV2luQWRkTW9kZTtcclxuICB3aW5DbG9zZU1vZGU6IG51bWJlcjtcclxuICB3aW5MYXllcjogV2luTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdHlwZTogV2luVHlwZSxcclxuICAgIG1hc2s6IG51bWJlcixcclxuICAgIGFkZDogV2luQWRkTW9kZSxcclxuICAgIGNsb3NlTW9kZWw6IG51bWJlcixcclxuICAgIGxheWVyOiBXaW5MYXllclxyXG4gICkge1xyXG4gICAgdGhpcy53aW5UeXBlID0gdHlwZTtcclxuICAgIHRoaXMud2luTWFzayA9IG1hc2s7XHJcbiAgICB0aGlzLndpbkFkZE1vZGUgPSBhZGQ7XHJcbiAgICB0aGlzLndpbkNsb3NlTW9kZSA9IGNsb3NlTW9kZWw7XHJcbiAgICB0aGlzLndpbkxheWVyID0gbGF5ZXI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luSW5mbyB7XHJcbiAgcGF0aDogc3RyaW5nO1xyXG4gIHdpbk1vZGVsOiBXaW5Nb2RlbDtcclxuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcsIHdpbk1vZGVsOiBXaW5Nb2RlbCkge1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIHRoaXMud2luTW9kZWwgPSB3aW5Nb2RlbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5JbmZvcyB7XHJcbiAgcHVibGljIHdpbklkczogbnVtYmVyW107XHJcbiAgcHVibGljIHdpbkluZm9zOiBNYXBXcmFwPG51bWJlciwgV2luSW5mbz47XHJcbiAgY29uc3RydWN0b3Iod2luSWRzOiBudW1iZXJbXSwgb3B0czogTWFwV3JhcDxudW1iZXIsIFdpbkluZm8+KSB7XHJcbiAgICB0aGlzLndpbklkcyA9IHdpbklkcztcclxuICAgIHRoaXMud2luSW5mb3MgPSBvcHRzO1xyXG4gIH1cclxufVxyXG5cclxuLy8g56qX5Y+j5a6e5L6LXHJcbmV4cG9ydCBjbGFzcyBXaW4gZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICAvKiog56qX5Y+j6YGu572pICovXHJcbiAgcHVibGljIG1hc2tOb2RlOiBjYy5Ob2RlO1xyXG4gIC8qKiDnu5HlrprnmoTnqpflj6PpgLvovpEgKi9cclxuICBwdWJsaWMgdmlld0JpbmRlcjogR1ZpZXdCYXNlO1xyXG4gIC8qKiDnqpflj6PnmoTln7rnoYDkv6Hmga8gKi9cclxuICBwdWJsaWMgd2luSW5mbzogV2luSW5mbztcclxuICAvKiog56qX5Y+jSUQgKi9cclxuICBwdWJsaWMgd2luSWQ6IG51bWJlcjtcclxuICAvKiog6YC76L6R6YCP5Y+CICovXHJcbiAgcHJvdGVjdGVkIF9sb2dpY0FyZ3M/OiBhbnlbXTtcclxuICBwdWJsaWMgc2V0IGxvZ2ljQXJncyh2YWw6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLl9sb2dpY0FyZ3MgJiYgISF2YWwpIHtcclxuICAgICAgdGhpcy5fcnVuR1N0YXJ0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fbG9naWNBcmdzICYmIHZhbCkge1xyXG4gICAgICBpZiAodGhpcy5fbG9naWNBcmdzLmxlbmd0aCAhPSB2YWwubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5fcnVuR1N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2xvZ2ljQXJnc1tpXSAhPSB2YWxbaV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fcnVuR1N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9sb2dpY0FyZ3MgPSB2YWw7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgbG9naWNBcmdzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvZ2ljQXJncztcclxuICB9XHJcbiAgLyoqIOaYr+WQpumcgOimgemHjeaWsOi3keS4gOasoeWIneWni+WMlumAu+i+kSAqL1xyXG4gIHByb3RlY3RlZCBfcnVuR1N0YXJ0OiBib29sZWFuID0gdHJ1ZTtcclxuICAvKiog5a6e6ZmF55qEekluZGV4ICovXHJcbiAgcHVibGljIHNvcnRPcmRlcjogbnVtYmVyO1xyXG4gIC8qKiDmmK/lkKblt7Lnu4/noa7orqTmnpDmnoQgKi9cclxuICBwdWJsaWMgaXNEZXN0cm95OiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqIGNyZWF0ZSBzdGF0dXMgKi9cclxuICBwdWJsaWMgY3JlYXRlU3RhdHM6IFdpbkNyZWF0ZUVudjtcclxuICAvKiog6aKE5Yi25Lu25Yqg6L295a6M5oiQ5Zue6LCDICovXHJcbiAgcHVibGljIG9uQmluZGVyKHZpZXc/OiBHVmlld0Jhc2UpIHtcclxuICAgIGlmICghIXRoaXMudmlld0JpbmRlciAmJiB0aGlzLnZpZXdCaW5kZXIgIT0gdmlldykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGlzIHdpbiBoYXMgdmlld0JpbmRlciFcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpZXdCaW5kZXIgPSB2aWV3O1xyXG4gICAgdGhpcy52aWV3QmluZGVyLndpbiA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5pc0Rlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5vbkNsb3NlKHRydWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzRGVzdHJveSA9IGZhbHNlO1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLnZpZXdCaW5kZXIubm9kZTtcclxuICAgIGlmIChub2RlLnpJbmRleCAhPSB0aGlzLnNvcnRPcmRlcikgbm9kZS56SW5kZXggPSB0aGlzLnNvcnRPcmRlcjtcclxuICAgIGlmICh0aGlzLndpbkluZm8ud2luTW9kZWwud2luVHlwZSA9PSBXaW5UeXBlLldpbmRvdykge1xyXG4gICAgICBsZXQgYW5pbWF0aW9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgaWYgKCFhbmltYXRpb24pIHtcclxuICAgICAgICBub2RlLnNjYWxlID0gMC42O1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgIC50bygwLjIsIHsgc2NhbGU6IDEsIG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdCaW5kZXIub25BbmltYXRpb25Mb2FkZWQoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgY2hpbHBzID0gYW5pbWF0aW9uLmdldENsaXBzKCk7XHJcbiAgICAgICAgYW5pbWF0aW9uLnBsYXkoY2hpbHBzWzBdLm5hbWUpO1xyXG4gICAgICAgIGFuaW1hdGlvbi5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudmlld0JpbmRlci5vbkFuaW1hdGlvbkxvYWRlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzUmVHU3RhcnQgPSB0aGlzLl9ydW5HU3RhcnQgfHwgdGhpcy52aWV3QmluZGVyLmNoZWNrUmVHU3RhcnQoKTtcclxuICAgIGlmIChpc1JlR1N0YXJ0KSB7XHJcbiAgICAgIHRoaXMuX3J1bkdTdGFydCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy52aWV3QmluZGVyLl9fb25HU3RhcnQoLi4udGhpcy5fbG9naWNBcmdzKTtcclxuICAgICAgLy8g5om+5Ye65pys6IqC54K55LiL55qE5a2Q57uE5Lu277yM5omn6KGM5LuW55qEb25HU3RhcnQoKTtcclxuICAgICAgbGV0IGNvbXBzID0gdGhpcy52aWV3QmluZGVyLmdldENvbXBvbmVudHMoR0NvbXBvbmVudCk7XHJcbiAgICAgIGlmIChjb21wcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGNvbXBzW2ldID09IHRoaXMudmlld0JpbmRlcikgY29udGludWU7XHJcbiAgICAgICAgICBjb21wc1tpXS5fX29uR1N0YXJ0KC4uLnRoaXMuX2xvZ2ljQXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3QmluZGVyLm9uR0FjdGl2ZSgpO1xyXG4gICAgVUlNZ3IucmVtb3ZlTXV0ZXhXaW4odGhpcyk7XHJcbiAgICAvLyDnlYzpnaLpn7PmlYhcclxuICAgIHRoaXMucGxheVdpbkF1ZGlvRWZmZWN0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0xvYWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gISF0aGlzLnZpZXdCaW5kZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkTWFza0V2ZW50KGNiOiBGdW5jdGlvbikge1xyXG4gICAgaWYgKCF0aGlzLm1hc2tOb2RlIHx8ICFjYikgcmV0dXJuO1xyXG4gICAgdGhpcy5tYXNrTm9kZS5vbihcImNsaWNrXCIsIGNiKTtcclxuICAgIHRoaXMubWFza05vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tBdWRpbyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DbG9zZShmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5pc0Rlc3Ryb3kgJiYgIWZvcmNlKSByZXR1cm47XHJcbiAgICB0aGlzLmlzRGVzdHJveSA9IHRydWU7XHJcbiAgICBVSU1nci5vbldpbkNsb3NlKHRoaXMsIGZvcmNlKTtcclxuXHJcbiAgICAvLyDnlYzpnaLlhbPpl63pn7PmlYhcclxuICAgIHRoaXMucGxheVdpbkF1ZGlvRWZmZWN0KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKiDmkq3mlL7pn7PmlYjvvIzlvIDlkK/miJbogIXlhbPpl60gKi9cclxuICBwdWJsaWMgcGxheVdpbkF1ZGlvRWZmZWN0KGlzT3BlbjogQ29uc3RyYWluQm9vbGVhbikge1xyXG4gICAgbGV0IGF1ZGlvOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgYXVkaW8gPSBpc09wZW5cclxuICAgICAgPyBVSU1nci53aW5BdWRpb3NbV0lOX09QRU5fQVVESU8gKyBcIl9cIiArIHRoaXMud2luSWRdXHJcbiAgICAgIDogVUlNZ3Iud2luQXVkaW9zW1dJTl9DTE9TRV9BVURJTyArIFwiX1wiICsgdGhpcy53aW5JZF07XHJcbiAgICBpZiAoIWF1ZGlvKSB7XHJcbiAgICAgIGxldCBpc0F1dG8gPVxyXG4gICAgICAgIHRoaXMud2luSW5mby53aW5Nb2RlbC53aW5MYXllciAhPSBXaW5MYXllci5GaXJzdFdpbmRvdyAmJlxyXG4gICAgICAgIHRoaXMud2luSW5mby53aW5Nb2RlbC53aW5MYXllciA8IFdpbkxheWVyLlJvbGxXaW5kb3cgJiZcclxuICAgICAgICB0aGlzLndpbkluZm8ud2luTW9kZWwud2luVHlwZSAhPSBXaW5UeXBlLkZ1bGxWaWV3O1xyXG4gICAgICBpZiAoaXNBdXRvKSB7XHJcbiAgICAgICAgYXVkaW8gPSBpc09wZW5cclxuICAgICAgICAgID8gVUlNZ3Iud2luQXVkaW9zW1dJTl9PUEVOX0FVRElPXVxyXG4gICAgICAgICAgOiBVSU1nci53aW5BdWRpb3NbV0lOX0NMT1NFX0FVRElPXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChhdWRpbykge1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KGF1ZGlvKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XHJcbiAgICBVSU1nci5vbldpbkRlc3Ryb3kodGhpcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQkFTRV9WSUVXX0lEX0VYID0ge1xyXG4gIC8qKiDot5Hpqaznga8gKi9cclxuICByb2xsOiA3MDAxMDAwLFxyXG4gIC8qKiDluLjpqbvmm7TmlrDlhazlkYrvvIzorablkYrlsYIgKi9cclxuICB1cGRhdGVSZW1pbmRDdHJsOiA4MDAxMDAwLFxyXG5cclxuICAvKiogdG9hc3QgKi9cclxuICBUT0FTVDogOTAwMDEwMCxcclxuICAvKiogd2lhdCAqL1xyXG4gIFdBSVQ6IDkwMDAyMDAsXHJcbiAgLyoqIGNvbmZpcm0gKi9cclxuICBDT05GSVJNOiA5MDAwMzAwLFxyXG4gIC8qKiDng63mm7TmlrBVSSAqL1xyXG4gIGhvdFVwZGF0ZTogOTAwMDUwMCxcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBVSU1nciB7XHJcbiAgLyoqIOeql+WPo+Wxgue6pyAqL1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2xheWVyU29ydERpYzogTWFwV3JhcDxudW1iZXIsIEFycmF5PG51bWJlcj4+O1xyXG4gIC8qKiDnqpflj6PmtLvliqjmoIggKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIF9zdGFjazogV2luW10gPSBbXTtcclxuICBwdWJsaWMgc3RhdGljIGdldCBzdGFjaygpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFjaztcclxuICB9XHJcbiAgLyoqIOeql+WPo+W+heaOqOWHuuagiCAqL1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2hlYXA6IFdpbltdID0gW107XHJcblxyXG4gIC8qKiDlm57mlLblpIfnlKjnmoTnqpflj6PoioLngrkgKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIF9yZWN5Y2xlczogTWFwV3JhcDxudW1iZXIsIFdpbltdPiA9IG5ldyBNYXBXcmFwPFxyXG4gICAgbnVtYmVyLFxyXG4gICAgV2luW11cclxuICA+KCk7XHJcbiAgLyoqIOmBrue9qee8k+WtmOaxoCAqL1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX21hc2tQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG5cclxuICAvKiog56qX5Y+j6Z2Z5oCB6YWN572u5pWw5o2uICovXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5mb3M6IFdpbkluZm9zO1xyXG4gIC8qKiDnqpflj6PpnZnmgIHpooTliqDovb3otYTmupAgKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIF9wcmVMb2FkQXNzZXRzOiB7IFtpZDogbnVtYmVyXTogUHJlTG9hZEFzc2V0W10gfTtcclxuICAvKiog5Yid5aeL5YyWdG9hc3TnrqHnkIblmaggKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIF90b2FzdDogeyBzaG93OiBGdW5jdGlvbiB9O1xyXG4gIC8qKiDliJ3lp4vljJZ0b2FzdOWbnuiwgyAqL1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2NyZWF0b3JUb2FzdENiOiBhbnk7XHJcblxyXG4gIC8qKiDliJ3lp4vljJbnqpflj6PphY3nva4gKi9cclxuICBwdWJsaWMgc3RhdGljIGluaXRXaW5JbmZvcyhcclxuICAgIGluZm9zOiBXaW5JbmZvcyxcclxuICAgIHByZUxvYWRBc3NldDogeyBbaWQ6IG51bWJlcl06IFByZUxvYWRBc3NldFtdIH0sXHJcbiAgICBjcmVhdG9yVG9hc3RDYlxyXG4gICkge1xyXG4gICAgdGhpcy5faW5mb3MgPSBpbmZvcztcclxuICAgIHRoaXMuX3ByZUxvYWRBc3NldHMgPSBwcmVMb2FkQXNzZXQ7XHJcbiAgICB0aGlzLl9jcmVhdG9yVG9hc3RDYiA9IGNyZWF0b3JUb2FzdENiO1xyXG4gIH1cclxuXHJcbiAgLyoqIOS4jeWtmOWcqG1hc2vkuovku7bnmoTml7blgJnnmoTlm57osIMgKi9cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWRBdWRpbzogc3RyaW5nO1xyXG4gIC8qKiDnqpflj6PlvIDlkK/lkozlhbPpl63pn7PmlYggKi9cclxuICBwdWJsaWMgc3RhdGljIHdpbkF1ZGlvczogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcblxyXG4gIC8qKiDojrflj5ZVSVJvb3QgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCB1aVJvb3QoKTogY2MuTm9kZSB7XHJcbiAgICBsZXQgdWlSb290ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TGlzdChcIkNhbnZhcy91aVJvb3RcIik7XHJcbiAgICBpZiAoIXVpUm9vdCkge1xyXG4gICAgICBsZXQgY2FudmFzID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKTtcclxuICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuICAgICAgdWlSb290ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgdWlSb290LmFkZENvbXBvbmVudChHVmlld0Rlc3RvcnkpO1xyXG4gICAgICB1aVJvb3Qud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgIHVpUm9vdC5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICBjYW52YXMuYWRkQ2hpbGQodWlSb290KTtcclxuICAgICAgdWlSb290Lm5hbWUgPSBcInVpUm9vdFwiO1xyXG4gICAgICB1aVJvb3QucG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgIHVpUm9vdC56SW5kZXggPSA1MDAwO1xyXG4gICAgICB0aGlzLmluaXRMYXllclNvcnQoKTtcclxuICAgICAgaWYgKHRoaXMuX2NyZWF0b3JUb2FzdENiKSB7XHJcbiAgICAgICAgdGhpcy5fdG9hc3QgPSB0aGlzLl9jcmVhdG9yVG9hc3RDYih1aVJvb3QpO1xyXG4gICAgICAgIHRoaXMuc2hvd1RvYXN0KFwiXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDliJvlu7rlrp7pmYXoiJ7lj7DljLrln5/kuYvlpJbnmoTpga7nvalcclxuICAgICAgbGV0IGFjdHVhbFN6aWUgPSBHQ3RybC5hY3R1YWxTaXplO1xyXG4gICAgICBsZXQgd2luU2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgIGxldCBsZWZ0Tm9kZSA9IG5ldyBjYy5Ob2RlKFwiX0dMT0JBTF9MRUZUX1wiKTtcclxuICAgICAgbGV0IGxlZnRTcHJpdGUgPSBsZWZ0Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgbGVmdFNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgIGxlZnROb2RlLmFuY2hvclggPSAwO1xyXG4gICAgICBsZWZ0Tm9kZS54ID0gLXdpblNpemUud2lkdGggLyAyO1xyXG4gICAgICBHTG9hZGVyLnNwcml0ZUZyYW1lKGxlZnRTcHJpdGUsIFJlcy5zaW5nbGUpO1xyXG4gICAgICBsZWZ0Tm9kZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICBsZWZ0Tm9kZS5wYXJlbnQgPSBjYW52YXM7XHJcbiAgICAgIGxlZnROb2RlLnpJbmRleCA9IE1BWF9UQUc7XHJcbiAgICAgIGxldCByaWdodE5vZGUgPSBuZXcgY2MuTm9kZShcIl9HTE9CQUxfUklHSFRfXCIpO1xyXG4gICAgICBsZXQgcmlnaHRTcHJpdGUgPSByaWdodE5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgIHJpZ2h0U3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgcmlnaHROb2RlLmFuY2hvclggPSAwO1xyXG4gICAgICByaWdodE5vZGUueCA9IGFjdHVhbFN6aWUud2lkdGggLyAyO1xyXG4gICAgICBHTG9hZGVyLnNwcml0ZUZyYW1lKHJpZ2h0U3ByaXRlLCBSZXMuc2luZ2xlKTtcclxuICAgICAgcmlnaHROb2RlLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgIHJpZ2h0Tm9kZS5wYXJlbnQgPSBjYW52YXM7XHJcbiAgICAgIHJpZ2h0Tm9kZS56SW5kZXggPSBNQVhfVEFHO1xyXG4gICAgICAvLyBsZWZ0Tm9kZS5vcGFjaXR5ID0gcmlnaHROb2RlLm9wYWNpdHkgPSAxMjg7XHJcbiAgICAgIGxldCBzZXRNYXNrU2l6ZSA9ICgpID0+IHtcclxuICAgICAgICB3aW5TaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICBsZWZ0Tm9kZS53aWR0aCA9IHJpZ2h0Tm9kZS53aWR0aCA9XHJcbiAgICAgICAgICB3aW5TaXplLndpZHRoIC8gMiAtIGFjdHVhbFN6aWUud2lkdGggLyAyO1xyXG4gICAgICAgIGxlZnROb2RlLmhlaWdodCA9IHJpZ2h0Tm9kZS5oZWlnaHQgPSByaWdodE5vZGUuaGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGVmdE5vZGUueCA9IC13aW5TaXplLndpZHRoIC8gMiAtIGxlZnROb2RlLndpZHRoO1xyXG4gICAgICAgIHJpZ2h0Tm9kZS54ID0gYWN0dWFsU3ppZS53aWR0aCAvIDIgKyBsZWZ0Tm9kZS53aWR0aDtcclxuICAgICAgfTtcclxuICAgICAgc2V0TWFza1NpemUoKTtcclxuICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgc2V0TWFza1NpemUsIGxlZnROb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1aVJvb3Q7XHJcbiAgfVxyXG5cclxuICAvKiog6I635Y+WV2luTGF5ZXLliJ3lp4taSW5kZXggKi9cclxuICBwdWJsaWMgc3RhdGljIGxheWVyT3JkZXIobGF5ZXI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIC1PREVSX09GRlNFVCArIChsYXllciArIDEpICogT0RFUl9PRkZTRVQgKyBTT1JUX09GRlNFVDtcclxuICB9XHJcblxyXG4gIC8qKiDliJ3lp4vljJblsYLnuqfpmJ/liJcgKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIGluaXRMYXllclNvcnQoKSB7XHJcbiAgICB0aGlzLl9sYXllclNvcnREaWMgPSBuZXcgTWFwV3JhcDxudW1iZXIsIEFycmF5PG51bWJlcj4+KCk7XHJcbiAgICBmb3IgKGxldCBsYXllck5hbWUgaW4gV2luTGF5ZXIpIHtcclxuICAgICAgbGV0IGxheWVyID0gcGFyc2VJbnQoV2luTGF5ZXJbbGF5ZXJOYW1lXSk7XHJcbiAgICAgIHRoaXMuX2xheWVyU29ydERpYy5zZXQobGF5ZXIsIFt0aGlzLmxheWVyT3JkZXIobGF5ZXIpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog6I635Y+W5bGC57qn55qE5LiL5LiA5LiqWkluZGV4LW9yZGVyU29ydCAqL1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgZ2VuU29ydE9yZGVyKGxheWVyOiBudW1iZXIsIGlzTWFzaz86IGJvb2xlYW4pOiBudW1iZXIge1xyXG4gICAgbGV0IG9yZGVycyA9IHRoaXMuX2xheWVyU29ydERpYy5nZXQobGF5ZXIpO1xyXG4gICAgaWYgKCFvcmRlcnMpIHtcclxuICAgICAgY2MuZXJyb3IoXCJ0aGUgbGF5ZXIgaW5pdCBmYWlsZWQ6IFwiICsgbGF5ZXIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllck9yZGVyKGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGFzdE9yZGVyID0gb3JkZXJzW29yZGVycy5sZW5ndGggLSAxXTtcclxuICAgIGlmIChpc01hc2spIHtcclxuICAgICAgbGFzdE9yZGVyICs9IFNPUlRfT0ZGU0VUIC0gMTtcclxuICAgICAgcmV0dXJuIGxhc3RPcmRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3RPcmRlciArPSBTT1JUX09GRlNFVDtcclxuICAgICAgb3JkZXJzLnB1c2gobGFzdE9yZGVyKTtcclxuICAgICAgcmV0dXJuIGxhc3RPcmRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDmi7/lvZPliY3pobblsYIgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEN1clRvcE9yZGVyKGxheWVyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IG9yZGVycyA9IHRoaXMuX2xheWVyU29ydERpYy5nZXQobGF5ZXIpO1xyXG4gICAgaWYgKCFvcmRlcnMpIHtcclxuICAgICAgY2MuZXJyb3IoXCJ0aGUgbGF5ZXIgaW5pdCBmYWlsZWQ6IFwiICsgbGF5ZXIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllck9yZGVyKGxheWVyKTtcclxuICAgIH1cclxuICAgIGxldCBsYXN0T3JkZXIgPSBvcmRlcnNbb3JkZXJzLmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuIGxhc3RPcmRlcjtcclxuICB9XHJcblxyXG4gIC8qKiDnp7vpmaTmn5DkuKrlsYLnuqfoioLngrkgKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIHJlbW92ZVNvcnRPcmRlcihsYXllcjogbnVtYmVyLCBzb3J0OiBudW1iZXIpIHtcclxuICAgIGxldCBvcmRlcnMgPSB0aGlzLl9sYXllclNvcnREaWMuZ2V0KGxheWVyKTtcclxuICAgIGlmICghb3JkZXJzKSB7XHJcbiAgICAgIGNjLmVycm9yKFwidGhlIGxheWVyIGluaXQgZmFpbGVkOiBcIiArIGxheWVyKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGluZGV4ID0gb3JkZXJzLmluZGV4T2Yoc29ydCk7XHJcbiAgICBpZiAoaW5kZXggIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICBvcmRlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDliJvlu7rpga7nvakgKi9cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZU1hc2soKTogY2MuTm9kZSB7XHJcbiAgICB0aGlzLl9tYXNrUG9vbCA9IHRoaXMuX21hc2tQb29sIHx8IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgbGV0IG1hc2tOb2RlOiBjYy5Ob2RlLCBtYXNrQnRuOiBjYy5CdXR0b247XHJcbiAgICBpZiAodGhpcy5fbWFza1Bvb2wuc2l6ZSgpID09IDApIHtcclxuICAgICAgbWFza05vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICBsZXQgc3ByaXRlID0gbWFza05vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgIEdMb2FkZXIuc3ByaXRlRnJhbWUoc3ByaXRlLCBSZXMuc2luZ2xlLCAoKSA9PiB7XHJcbiAgICAgICAgbWFza05vZGUuc2V0Q29udGVudFNpemUoY2Muc2l6ZSgzMDAwLCAzMDAwKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBtYXNrQnRuID0gbWFza05vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgIG1hc2tOb2RlLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXNrTm9kZSA9IHRoaXMuX21hc2tQb29sLmdldCgpO1xyXG4gICAgICBtYXNrTm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgbWFza05vZGUub2ZmKFwiY2xpY2tcIik7XHJcbiAgICAgIG1hc2tCdG4gPSBtYXNrTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgaWYgKG1hc2tCdG4pIHtcclxuICAgICAgICBtYXNrQnRuLmNsaWNrRXZlbnRzID0gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG1hc2tOb2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUoMzAwMCwgMzAwMCkpO1xyXG5cclxuICAgIGlmICh0aGlzLmludmFsaWRBdWRpbykge1xyXG4gICAgICBtYXNrQnRuLmNsaWNrQXVkaW8gPSB0aGlzLmludmFsaWRBdWRpbztcclxuICAgIH1cclxuICAgIHJldHVybiBtYXNrTm9kZTtcclxuICB9XHJcblxyXG4gIC8qKiDojrflj5bnqpflj6Plho3mtLvliqjmoIjnmoTntKLlvJUgKi9cclxuICBwcm90ZWN0ZWQgc3RhdGljIGluZGV4T2ZTdGFjayh3aW46IFdpbik6IG51bWJlciB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGFja1tpXSA9PSB3aW4pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIElOVkFMSURfVkFMVUU7XHJcbiAgfVxyXG5cclxuICAvKiog5LuO5rS75Yqo5qCI5Yiw6ZqQ6JeP5aCGICovXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBzdGFja1RvSGVhcCh3aW46IFdpbiwgbnN0YWNrSW5kZXg/OiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVtb3ZlU3RhY2tXaW4od2luLCBuc3RhY2tJbmRleCk7XHJcbiAgICB0aGlzLl9oZWFwLnB1c2god2luKTtcclxuICB9XHJcblxyXG4gIC8qKiDku47mtLvliqjmoIjkuK3np7vpmaQsIOWvueixoeayoeacieecn+ato+enu+mZpOeahOaDheWGteS4i1xyXG4gICAqICDku4XkvpvlhoXpg6josIPnlKjjgILpgLvovpHlsYLkuI3lhYHorrjosIPnlKhcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHJlbW92ZVN0YWNrV2luKHdpbjogV2luLCBpbmRleD86IG51bWJlcikge1xyXG4gICAgaWYgKCFpbmRleCkge1xyXG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhPZlN0YWNrKHdpbik7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICB0aGlzLl9zdGFjay5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW4ubWFza05vZGUpIHtcclxuICAgICAgdGhpcy5fbWFza1Bvb2wucHV0KHdpbi5tYXNrTm9kZSk7XHJcbiAgICAgIHdpbi5tYXNrTm9kZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAod2luLnZpZXdCaW5kZXIgJiYgd2luLnZpZXdCaW5kZXIubm9kZSAmJiB3aW4udmlld0JpbmRlci5ub2RlLnBhcmVudCkge1xyXG4gICAgICB3aW4udmlld0JpbmRlci5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbi5zb3J0T3JkZXIgIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICB0aGlzLnJlbW92ZVNvcnRPcmRlcih3aW4ud2luSW5mby53aW5Nb2RlbC53aW5MYXllciwgd2luLnNvcnRPcmRlcik7XHJcbiAgICAgIHdpbi5zb3J0T3JkZXIgPSBJTlZBTElEX1ZBTFVFO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBwdXNoU3RhY2tXaW4od2luOiBXaW4pIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhPZlN0YWNrKHdpbik7XHJcbiAgICBpZiAoaW5kZXggIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICAvLyB0aGlzLnJlbW92ZVNvcnRPcmRlcih3aW4ud2luSW5mby53aW5Nb2RlbC53aW5MYXllciwgd2luLnNvcnRPcmRlcik7XHJcbiAgICAgIHRoaXMucmVtb3ZlU3RhY2tXaW4od2luKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmlld05hbWUgPSB0aGlzLmdldFdpbk5hbWUod2luLndpbkluZm8ucGF0aCk7XHJcbiAgICBsZXQgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBsZXQgbWFza1N0YXR1cyA9IHdpbi53aW5JbmZvLndpbk1vZGVsLndpbk1hc2s7XHJcbiAgICBpZiAoIShtYXNrU3RhdHVzICYgV2luTWFza1N0YXR1cy5rTm9uZSkpIHtcclxuICAgICAgaWYgKCF3aW4ubWFza05vZGUpIHtcclxuICAgICAgICBtYXNrTm9kZSA9IHRoaXMuY3JlYXRlTWFzaygpO1xyXG4gICAgICAgIG1hc2tOb2RlLm5hbWUgPSB2aWV3TmFtZSArIFwiX21hc2tcIjtcclxuICAgICAgICBtYXNrTm9kZS5wYXJlbnQgPSB0aGlzLnVpUm9vdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtYXNrTm9kZSA9IHdpbi5tYXNrTm9kZTtcclxuICAgICAgICBtYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICghbWFza05vZGUucGFyZW50KSBtYXNrTm9kZS5wYXJlbnQgPSB0aGlzLnVpUm9vdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWFza05vZGUuc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XHJcbiAgICB3aW4ubWFza05vZGUgPSBtYXNrTm9kZTtcclxuICAgIHdpbi5zb3J0T3JkZXIgPSB0aGlzLmdlblNvcnRPcmRlcih3aW4ud2luSW5mby53aW5Nb2RlbC53aW5MYXllcik7XHJcbiAgICBpZiAod2luLm1hc2tOb2RlKSB7XHJcbiAgICAgIHdpbi5tYXNrTm9kZS56SW5kZXggPSB3aW4uc29ydE9yZGVyIC0gMTtcclxuICAgICAgaWYgKG1hc2tTdGF0dXMgJiBXaW5NYXNrU3RhdHVzLmtPcGFjaXR5MTU2KSB7XHJcbiAgICAgICAgd2luLm1hc2tOb2RlLm9wYWNpdHkgPSAxNTY7XHJcbiAgICAgIH0gZWxzZSBpZiAobWFza1N0YXR1cyAmIFdpbk1hc2tTdGF0dXMua09wYWNpdHkyNTUpIHtcclxuICAgICAgICB3aW4ubWFza05vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aW4ubWFza05vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1hc2tTdGF0dXMgJiBXaW5NYXNrU3RhdHVzLmtUb3VjaENsb3NlKSB7XHJcbiAgICAgICAgd2luLmFkZE1hc2tFdmVudCgoKSA9PiB3aW4ub25DbG9zZSgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3N0YWNrLnB1c2god2luKTtcclxuICAgIGlmICh3aW4udmlld0JpbmRlcikge1xyXG4gICAgICBsZXQgbm9kZSA9IHdpbi52aWV3QmluZGVyLm5vZGU7XHJcbiAgICAgIGlmICghbm9kZS5wYXJlbnQpIHtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMudWlSb290O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghbm9kZS5hY3RpdmUpIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgd2luLmlzRGVzdHJveSA9IGZhbHNlO1xyXG4gICAgICB3aW4ub25CaW5kZXIod2luLnZpZXdCaW5kZXIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldFdpbk5hbWUocGF0aDogc3RyaW5nIHwgY2MuUHJlZmFiKTogc3RyaW5nIHtcclxuICAgIGxldCBuYW1lID0gXCJcIjtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGxldCBzcGxpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcclxuICAgICAgbmFtZSA9IHNwbGl0c1tzcGxpdHMubGVuZ3RoIC0gMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuYW1lID0gcGF0aC5uYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEZyaXN0V2luQnlJZChpZDogbnVtYmVyKTogV2luIHtcclxuICAgIGxldCB3aW5zID0gdGhpcy5fc3RhY2s7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHdpbnNbaV0ud2luSWQgPT0gaWQpIHtcclxuICAgICAgICByZXR1cm4gd2luc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5bCd6K+V6I635Y+W5b2T5YmN6IqC54K55omA5Zyo55qE56qX5Y+jXHJcbiAgICog5rOo5oSP6K+l5pa55rOV55qE5L2/55So6ZyA6KaB5Zyob25HU3RhcnTkuYvlkI7vvIzlj6/og711bmRlZmluZWTjgIJcclxuICAgKiBAcGFyYW0gbm9kZSDpnIDopoHojrflj5bmiYDlnKjnlYzpnaLnmoToioLngrlcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRyeUdldFdpbkJ5Tm9kZShub2RlOiBjYy5Ob2RlKTogV2luIHtcclxuICAgIGxldCBwYXJlbnQgPSBub2RlO1xyXG4gICAgd2hpbGUgKHBhcmVudCkge1xyXG4gICAgICBpZiAocGFyZW50ID09IHRoaXMudWlSb290KSByZXR1cm47XHJcbiAgICAgIGlmIChwYXJlbnQgPT0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSkgcmV0dXJuO1xyXG4gICAgICBsZXQgdmlld0JzZSA9IHBhcmVudC5nZXRDb21wb25lbnQoR1ZpZXdCYXNlKTtcclxuICAgICAgaWYgKCF2aWV3QnNlKSB7XHJcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmlld0JzZS53aW47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHRyeVBvcEhlYXBXaW4od2luSWQ6IG51bWJlcik6IFdpbiB7XHJcbiAgICBsZXQgd2lucyA9IHRoaXMuX2hlYXA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHdpbnNbaV0ud2luSWQgPT0gd2luSWQpIHtcclxuICAgICAgICBsZXQgd2luID0gd2luc1tpXTtcclxuICAgICAgICB3aW5zLnNwbGljZShpLCAxKTtcclxuICAgICAgICByZXR1cm4gd2luO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHRyeUdldFJlY3ljbGVzKHdpbklkOiBudW1iZXIpOiBXaW4ge1xyXG4gICAgbGV0IHdpbnMgPSB0aGlzLl9yZWN5Y2xlcy5nZXQod2luSWQpO1xyXG4gICAgaWYgKHdpbnMgJiYgd2lucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB3aW5zLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldFdpbkluZm8od2luSWQ6IG51bWJlcik6IFdpbkluZm8ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZm9zLndpbkluZm9zLmdldCh3aW5JZCk7XHJcbiAgfVxyXG5cclxuICAvKiog5pi+56S65qih5oCB56qX5Y+jICovXHJcbiAgcHVibGljIHN0YXRpYyBzaG93V2luKHdpbklkOiBudW1iZXIsIC4uLmFyZ3MpIHtcclxuICAgIGxldCB3aW5JbmZvID0gdGhpcy5faW5mb3Mud2luSW5mb3MuZ2V0KHdpbklkKTtcclxuICAgIGNvbnNvbGUubG9nKHsgd2luSW5mbyB9KTtcclxuICAgIGlmICghd2luSW5mbykge1xyXG4gICAgICBjYy5lcnJvcihcInRoaXMgd2luSWQgb2Y6IFwiICsgd2luSWQgKyBcIiBub3QgaW5pdCBjb25maWcgKFVJLnRzKVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IG1vZGVsID0gd2luSW5mby53aW5Nb2RlbDtcclxuXHJcbiAgICBsZXQgd2luOiBXaW4gPSBudWxsO1xyXG4gICAgaWYgKG1vZGVsLndpbkFkZE1vZGUgIT0gV2luQWRkTW9kZS5TdGFjaykge1xyXG4gICAgICAvLyAxLua0u+WKqOagiOS4reafpeaJvlxyXG4gICAgICB3aW4gPSB0aGlzLmdldEZyaXN0V2luQnlJZCh3aW5JZCk7XHJcbiAgICAgIGlmICh3aW4pIHtcclxuICAgICAgICB3aW4uY3JlYXRlU3RhdHMgPSBXaW5DcmVhdGVFbnYubFN0YWNrO1xyXG4gICAgICAgIHdpbi5sb2dpY0FyZ3MgPSBhcmdzO1xyXG4gICAgICAgIGlmICh3aW4uaXNMb2FkKSB7XHJcbiAgICAgICAgICB0aGlzLnB1c2hTdGFja1dpbih3aW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAyLuS7juS4jea0u+WKqOagiOS4reafpeaJvlxyXG4gICAgd2luID0gdGhpcy50cnlQb3BIZWFwV2luKHdpbklkKTtcclxuICAgIGlmICh3aW4pIHtcclxuICAgICAgd2luLmNyZWF0ZVN0YXRzID0gV2luQ3JlYXRlRW52LkhlYXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAzLuS7juWbnuaUtuWuueWZqOS4reafpeaJvlxyXG4gICAgICB3aW4gPSB0aGlzLnRyeUdldFJlY3ljbGVzKHdpbklkKTtcclxuICAgICAgaWYgKHdpbikgd2luLmNyZWF0ZVN0YXRzID0gV2luQ3JlYXRlRW52LlJlY3ljbGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF3aW4pIHtcclxuICAgICAgd2luID0gbmV3IFdpbigpO1xyXG4gICAgICB3aW4ud2luSW5mbyA9IHdpbkluZm87XHJcbiAgICAgIHdpbi53aW5JZCA9IHdpbklkO1xyXG4gICAgICB3aW4uY3JlYXRlU3RhdHMgPSBXaW5DcmVhdGVFbnYuTmV3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghd2luKSByZXR1cm47XHJcbiAgICB3aW4ubG9naWNBcmdzID0gYXJncztcclxuICAgIHRoaXMucHVzaFN0YWNrV2luKHdpbik7XHJcbiAgICBpZiAod2luLnZpZXdCaW5kZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBfX2JpbmRWaWV3QmFzZSA9ICgpID0+IHtcclxuICAgICAgbGV0IHBhdGggPSB3aW4ud2luSW5mby5wYXRoO1xyXG4gICAgICBHTG9hZGVyLnByZWZhYihwYXRoLCAocHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSB3aW4uc29ydE9yZGVyO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy51aVJvb3Q7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBub2RlLmdldENvbXBvbmVudChHVmlld0Jhc2UpO1xyXG4gICAgICAgIGlmICghdmlldykgcmV0dXJuO1xyXG4gICAgICAgIGlmICh3aW4ud2luSW5mby53aW5Nb2RlbC53aW5UeXBlID09IFdpblR5cGUuRnVsbFZpZXcpIHtcclxuICAgICAgICAgIG5vZGUuc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhKHdpbi53aW5JbmZvLndpbk1vZGVsLndpbk1hc2sgJiBXaW5NYXNrU3RhdHVzLmtVbkJsb2NrSW5wdXQpICYmXHJcbiAgICAgICAgICB2aWV3LmJnSW1hZ2UgJiZcclxuICAgICAgICAgICF2aWV3LmJnSW1hZ2UuZ2V0Q29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB2aWV3LmJnSW1hZ2UuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgICAgICAgdmlldy5iZ0ltYWdlLmFkZENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrQXVkaW8gPSBVSU1nci5pbnZhbGlkQXVkaW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW4ub25CaW5kZXIodmlldyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcHJlTG9hZEFzc2V0ID0gdGhpcy5fcHJlTG9hZEFzc2V0c1t3aW4ud2luSWRdO1xyXG4gICAgaWYgKCEhcHJlTG9hZEFzc2V0ICYmIHByZUxvYWRBc3NldC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIEdDdHJsLnByZUxvYWRSYXdBc3NldHMoXHJcbiAgICAgICAgKGN1ckluZGV4OiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGFzc2V0OiBjYy5Bc3NldCkgPT4ge1xyXG4gICAgICAgICAgYXNzZXQgJiYgY2MubG9nKGBwcmVsb2FkIGFzc2V0czogJHtjdXJJbmRleH0vJHt0b3RhbH06ICR7YXNzZXQudXJsfWApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZVdhaXQoKTtcclxuICAgICAgICAgIF9fYmluZFZpZXdCYXNlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAuLi5wcmVMb2FkQXNzZXRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9fYmluZFZpZXdCYXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlbW92ZU11dGV4V2luKHdpbjogV2luKSB7XHJcbiAgICBsZXQgd2lucyA9IHRoaXMuX3N0YWNrO1xyXG4gICAgbGV0IHdpbkxheWVyID0gd2luLndpbkluZm8ud2luTW9kZWwud2luTGF5ZXI7XHJcbiAgICBsZXQgbWF4SW5kZXggPSB0aGlzLmluZGV4T2ZTdGFjayh3aW4pO1xyXG4gICAgbWF4SW5kZXggPSBtYXhJbmRleCA9PSBJTlZBTElEX1ZBTFVFID8gdGhpcy5fc3RhY2subGVuZ3RoIC0gMSA6IG1heEluZGV4O1xyXG4gICAgZm9yIChsZXQgaSA9IG1heEluZGV4OyBpID49IDA7IGktLSkge1xyXG4gICAgICBsZXQgdGFyV2luID0gd2luc1tpXTtcclxuICAgICAgaWYgKHRhcldpbiA9PSB3aW4pIGNvbnRpbnVlO1xyXG4gICAgICBsZXQgdGFyTGF5ZXIgPSB0YXJXaW4ud2luSW5mby53aW5Nb2RlbC53aW5MYXllcjtcclxuICAgICAgaWYgKHRhckxheWVyID49IFdpbkxheWVyLlVuQ2hlY2tNdXRleCkgY29udGludWU7XHJcbiAgICAgIHN3aXRjaCAod2luLndpbkluZm8ud2luTW9kZWwud2luQWRkTW9kZSkge1xyXG4gICAgICAgIGNhc2UgV2luQWRkTW9kZS5SZXBsYWNlTGF5ZXI6IHtcclxuICAgICAgICAgIGlmICh3aW5MYXllciA8PSB0YXJMYXllcikge1xyXG4gICAgICAgICAgICB0YXJXaW4ub25DbG9zZSh0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIFdpbkFkZE1vZGUuUmVwbGFjZVNlbGY6IHtcclxuICAgICAgICAgIGlmICh3aW5MYXllciA8IHRhckxheWVyKSB7XHJcbiAgICAgICAgICAgIHRhcldpbi5vbkNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgV2luQWRkTW9kZS5QdXNoTG93ZXI6IHtcclxuICAgICAgICAgIGlmICh3aW4uc29ydE9yZGVyID4gdGFyV2luLnNvcnRPcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrVG9IZWFwKHRhcldpbik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpbi5zb3J0T3JkZXIgPCB0YXJXaW4uc29ydE9yZGVyKSB7XHJcbiAgICAgICAgICAgIHRhcldpbi5vbkNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgV2luQWRkTW9kZS5TdGFjazoge1xyXG4gICAgICAgICAgaWYgKHdpbi5zb3J0T3JkZXIgPCB0YXJXaW4uc29ydE9yZGVyKSB7XHJcbiAgICAgICAgICAgIHRhcldpbi5vbkNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgV2luQWRkTW9kZS5QdXNoSGVpZ2g6IHtcclxuICAgICAgICAgIGlmICh3aW5MYXllciA8IHRhckxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2tUb0hlYXAodGFyV2luKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDnqpflj6PlhbPpl63kuovku7YgKi9cclxuICBwdWJsaWMgc3RhdGljIG9uV2luQ2xvc2Uod2luOiBXaW4sIGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGxldCBfX2Nsb3NlTG9naWMgPSAoKSA9PiB7XHJcbiAgICAgIGxldCB3aW5DbG9zZSA9IHdpbi53aW5JbmZvLndpbk1vZGVsLndpbkNsb3NlTW9kZTtcclxuICAgICAgaWYgKHdpbkNsb3NlICYgV2luQ2xvc2VNb2RlLk9ubHlEZXN0cm95KSB7XHJcbiAgICAgICAgLy8g5aaC5p6c5LiN5a2Y5ZyoYmluZOaVsOaNrlxyXG4gICAgICAgIHRoaXMucmVtb3ZlU3RhY2tXaW4od2luKTtcclxuICAgICAgICBpZiAod2luLnZpZXdCaW5kZXIpIHtcclxuICAgICAgICAgIHdpbi52aWV3QmluZGVyLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgLy8g5aaC5p6c5a2Y5Zyo6aKE5Yqg6L296LWE5rqQ77yM5YiZ6YeK5pS+5a6DXHJcbiAgICAgICAgICBsZXQgcHJlTG9hZEFzc2V0UGF0aHMgPSB0aGlzLl9wcmVMb2FkQXNzZXRzW3dpbi53aW5JZF07XHJcbiAgICAgICAgICBpZiAocHJlTG9hZEFzc2V0UGF0aHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVMb2FkQXNzZXRQYXRocy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIEdMb2FkZXIucmVsZWFzZUFzc2V0KHByZUxvYWRBc3NldFBhdGhzW2ldLnBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsZXQgcGF0aCA9IHdpbi53aW5JbmZvLnBhdGg7XHJcbiAgICAgICAgICBHTG9hZGVyLnJlbGVhc2VBc3NldChwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAod2luQ2xvc2UgJiBXaW5DbG9zZU1vZGUuUmVjeWNsZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3RhY2tXaW4od2luKTtcclxuICAgICAgICBsZXQgd2lucyA9IHRoaXMuX3JlY3ljbGVzLmdldCh3aW4ud2luSWQpO1xyXG4gICAgICAgIGlmICghd2lucykge1xyXG4gICAgICAgICAgd2lucyA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5fcmVjeWNsZXMuc2V0KHdpbi53aW5JZCwgd2lucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbnMucHVzaCh3aW4pO1xyXG4gICAgICB9IGVsc2UgaWYgKHdpbkNsb3NlICYgV2luQ2xvc2VNb2RlLkhpZGUpIHtcclxuICAgICAgICBpZiAod2luLm1hc2tOb2RlKSB3aW4ubWFza05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHdpbi52aWV3QmluZGVyKSB3aW4udmlld0JpbmRlci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh3aW5DbG9zZSAmIFdpbkNsb3NlTW9kZS5Qb3BBbGwgJiYgIWZvcmNlKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2hlYXAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgbGV0IHRhcldpbiA9IHRoaXMuX2hlYXAucG9wKCk7XHJcbiAgICAgICAgICAvLyDlm57lvZLlnLrmma9cclxuICAgICAgICAgIHRoaXMucHVzaFN0YWNrV2luKHRhcldpbik7XHJcbiAgICAgICAgICBpZiAodGFyV2luLndpbkluZm8ud2luTW9kZWwud2luQ2xvc2VNb2RlICYgV2luQ2xvc2VNb2RlLlBvcEFsbCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB3aW4ud2luSW5mby53aW5Nb2RlbC53aW5UeXBlID09IFdpblR5cGUuV2luZG93ICYmXHJcbiAgICAgIHdpbi52aWV3QmluZGVyICYmXHJcbiAgICAgICFmb3JjZVxyXG4gICAgKSB7XHJcbiAgICAgIGxldCBub2RlID0gd2luLnZpZXdCaW5kZXIubm9kZTtcclxuICAgICAgbGV0IG1hc2sgPSB3aW4ubWFza05vZGU7XHJcblxyXG4gICAgICBsZXQgYW5pbWF0aW9uID0gd2luLnZpZXdCaW5kZXIuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgIGlmICghYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgIC50bygwLjMsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3RvclxyXG4gICAgICAgICAgICAgIC5nZXRBY3Rpb25NYW5hZ2VyKClcclxuICAgICAgICAgICAgICAucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQobWFzaywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIF9fY2xvc2VMb2dpYygpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBjbGlwcyA9IGFuaW1hdGlvbi5nZXRDbGlwcygpO1xyXG4gICAgICAgIGFuaW1hdGlvbi5wbGF5KGNsaXBzWzFdLm5hbWUpO1xyXG4gICAgICAgIGFuaW1hdGlvbi5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldChtYXNrLCB0cnVlKTtcclxuICAgICAgICAgIF9fY2xvc2VMb2dpYygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtYXNrKSB7XHJcbiAgICAgICAgbWFzay56SW5kZXggPSB3aW4uc29ydE9yZGVyICsgMTtcclxuICAgICAgICBjYy50d2VlbihtYXNrKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfX2Nsb3NlTG9naWMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDnqpflj6PmnpDmnoTkuovku7YgKi9cclxuICBwdWJsaWMgc3RhdGljIG9uV2luRGVzdHJveSh3aW46IFdpbikge1xyXG4gICAgdGhpcy5yZW1vdmVTdGFja1dpbih3aW4pO1xyXG4gICAgLy8gMS7pnZ7mtLvliqjmoIjkuK3mn6Xmib7vvJpcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faGVhcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5faGVhcFtpXSA9PSB3aW4pIHtcclxuICAgICAgICB0aGlzLl9oZWFwLnNwbGljZShpLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHdpbnMgPSB0aGlzLl9yZWN5Y2xlcy5nZXQod2luLndpbklkKTtcclxuICAgIGlmICh3aW5zKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh3aW5zW2ldID09IHdpbikge1xyXG4gICAgICAgICAgd2lucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBHQ3RybC5FUy5lbWl0KEdDdHJsLkdDbGllbnRXaW5EZXN0cm95RXZlbnRNc2csIHdpbik7XHJcbiAgICB3aW4udmlld0JpbmRlciA9IG51bGw7XHJcbiAgICB3aW4ud2luSW5mbyA9IG51bGw7XHJcbiAgICB3aW4ubWFza05vZGUgPSBudWxsO1xyXG4gICAgd2luLndpbklkID0gSU5WQUxJRF9WQUxVRTtcclxuICB9XHJcblxyXG4gIC8qKiDmoLnmja5WaWV3SWTojrflj5bpobblsYLnmoRXaW4gKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEFjdGl2ZVRvcFdpbih3aW5JZD86IG51bWJlcik6IFdpbiB7XHJcbiAgICBpZiAoIXdpbklkKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zdGFjay5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGxldCB3aW4gPSB0aGlzLl9zdGFja1tpXTtcclxuICAgICAgICBpZiAod2luLndpbklkID49IEJBU0VfVklFV19JRF9FWC5yb2xsKSBjb250aW51ZTtcclxuICAgICAgICByZXR1cm4gd2luO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX3N0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGFja1tpXS53aW5JZCA9PSB3aW5JZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFja1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIOenu+mZpOaJgOacieeahOa0u+WKqFdpbiAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWxsQWN0aXZlV2luKCkge1xyXG4gICAgaWYgKCF0aGlzLl9zdGFjaykgcmV0dXJuO1xyXG4gICAgd2hpbGUgKHRoaXMuX3N0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5fc3RhY2sucG9wKCkub25DbG9zZSh0cnVlKTtcclxuICAgIH1cclxuICAgIHdoaWxlICh0aGlzLl9oZWFwLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IHdpbiA9IHRoaXMuX2hlYXAucG9wKCk7XHJcbiAgICAgIHdpbi52aWV3QmluZGVyLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICB3aW4udmlld0JpbmRlciA9IG51bGw7XHJcbiAgICAgIHdpbi5sb2dpY0FyZ3MgPSBudWxsO1xyXG4gICAgICB3aW4ud2luSW5mbyA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog56e76ZmkVmlld0xheWVy55qEd2luICovXHJcbiAgcHVibGljIHN0YXRpYyByZW1vdmVBY3RpdmVCeVZpZXdMYXllciguLi5sYXllcnM6IG51bWJlcltdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5fc3RhY2subGVuZ3RoOyBpID49IDA7IGktLSkge1xyXG4gICAgICBsZXQgd2luTGF5ZXIgPSB0aGlzLl9zdGFja1tpXS53aW5JbmZvLndpbk1vZGVsLndpbkxheWVyO1xyXG4gICAgICBpZiAobGF5ZXJzLmluZGV4T2Yod2luTGF5ZXIpICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICB0aGlzLl9zdGFja1tpXS5vbkNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDnp7vpmaR2aWV3SWQg55qEIHdpbiAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWN0aXZlQnlWaWV3SWQoLi4uaWRzOiBudW1iZXJbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX3N0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGlmIChpZHMuaW5kZXhPZih0aGlzLl9zdGFja1tpXS53aW5JZCkgIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICAgIHRoaXMuX3N0YWNrW2ldLm9uQ2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIOiOt+WPluW9k+WJjea0u+WKqOeahOeql+WPoyAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmlldzxUIGV4dGVuZHMgR1ZpZXdCYXNlPih3aW5JZDogbnVtYmVyKTogVCB7XHJcbiAgICBsZXQgd2luID0gdGhpcy5nZXRBY3RpdmVUb3BXaW4od2luSWQpO1xyXG4gICAgaWYgKCF3aW4pIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHdpbi52aWV3QmluZGVyIGFzIFQ7XHJcbiAgfVxyXG5cclxuICAvKiog5Yik5pat6K+l56qX5Y+jSUTlvZPliY3mmK/lkKbmtLvliqggKi9cclxuICBwdWJsaWMgc3RhdGljIGlzQWN0aXZlVmlldyh3aW5JZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVUb3BXaW4od2luSWQpICE9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFjdGl2ZVdpbih3aW46IFdpbiwgaXNTaG93OiBib29sZWFuKSB7XHJcbiAgICBpZiAod2luLm1hc2tOb2RlKSB3aW4ubWFza05vZGUuYWN0aXZlID0gaXNTaG93O1xyXG4gICAgaWYgKHdpbi52aWV3QmluZGVyKSB3aW4udmlld0JpbmRlci5ub2RlLmFjdGl2ZSA9IGlzU2hvdztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SGVhcFZpZXdCeU5hbWUobmFtZTogc3RyaW5nKTogV2luIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faGVhcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5faGVhcFtpXS52aWV3QmluZGVyLm5vZGUubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYXBbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2hvd1dhaXQoKSB7XHJcbiAgICB0aGlzLnNob3dXaW4oQkFTRV9WSUVXX0lEX0VYLldBSVQpO1xyXG4gICAgbGV0IHdpbiA9IHRoaXMuZ2V0QWN0aXZlVG9wV2luKEJBU0VfVklFV19JRF9FWC5XQUlUKTtcclxuICAgIGlmICh3aW4gJiYgd2luLnZpZXdCaW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coMTExMSk7XHJcbiAgICAgIHdpbi52aWV3QmluZGVyLm9uR1N0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNsb3NlV2FpdCgpIHtcclxuICAgIGxldCB3aW4gPSB0aGlzLmdldEFjdGl2ZVRvcFdpbihCQVNFX1ZJRVdfSURfRVguV0FJVCk7XHJcbiAgICBpZiAoIXdpbikgcmV0dXJuO1xyXG4gICAgd2luLm9uQ2xvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKiDmma7pgJrmj5DnpLogKi9cclxuICBwdWJsaWMgc3RhdGljIHNob3dUb2FzdChtc2c6IG51bWJlciB8IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmICh0aGlzLl90b2FzdCkge1xyXG4gICAgICB0aGlzLl90b2FzdC5zaG93KG1zZywgLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog6Kem5pG46YGu572pICovXHJcbiAgcHVibGljIHN0YXRpYyB0b3VjaFNob3coXHJcbiAgICBjYj86IGFueSxcclxuICAgIGlzQXV0b1JlbW92ZTogYm9vbGVhbiA9IHRydWUsXHJcbiAgICBwYXJlbnQ/OiBjYy5Ob2RlXHJcbiAgKSB7XHJcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgdGhpcy51aVJvb3Q7XHJcbiAgICBsZXQgdG91Y2hOb2RlID0gcGFyZW50LmdldENoaWxkQnlOYW1lKFwidG91Y2hOb2RlXCIpO1xyXG4gICAgaWYgKCF0b3VjaE5vZGUpIHtcclxuICAgICAgdG91Y2hOb2RlID0gbmV3IGNjLk5vZGUoXCJ0b3VjaE5vZGVcIik7XHJcbiAgICAgIHRvdWNoTm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgIHRvdWNoTm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIDApO1xyXG4gICAgICB0b3VjaE5vZGUuekluZGV4ID0gdGhpcy5sYXllck9yZGVyKFdpbkxheWVyLlRvdWNoU2hvdyk7XHJcbiAgICAgIHRvdWNoTm9kZS5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKTtcclxuICAgIH1cclxuICAgIHRvdWNoTm9kZS5vbihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgIChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0F1dG9SZW1vdmUpIHtcclxuICAgICAgICAgIHRvdWNoTm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgIHRvdWNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYiAmJiBjYih0b3VjaE5vZGUpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgdG91Y2hOb2RlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgdG91Y2hOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICByZXR1cm4gdG91Y2hOb2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB0b3VjaEhpZChwYXJlbnQ/OiBjYy5Ob2RlKSB7XHJcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgdGhpcy51aVJvb3Q7XHJcbiAgICBsZXQgdG91Y2hOb2RlID0gcGFyZW50LmdldENoaWxkQnlOYW1lKFwidG91Y2hOb2RlXCIpO1xyXG4gICAgaWYgKHRvdWNoTm9kZSkge1xyXG4gICAgICB0b3VjaE5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgIHRvdWNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog5pi+56S66Kem5pG46YGu572pICovXHJcbiAgcHVibGljIHN0YXRpYyBzaG93QmxvY2tJbnB1dCgpIHtcclxuICAgIGxldCBtYXNrTm9kZSA9IHRoaXMudWlSb290LmdldENoaWxkQnlOYW1lKFwidWlSb290TWFza05vZGVcIik7XHJcbiAgICBpZiAoIW1hc2tOb2RlKSB7XHJcbiAgICAgIG1hc2tOb2RlID0gbmV3IGNjLk5vZGUoXCJ1aVJvb3RNYXNrTm9kZVwiKTtcclxuICAgICAgbWFza05vZGUucGFyZW50ID0gdGhpcy51aVJvb3Q7XHJcbiAgICAgIG1hc2tOb2RlLnBvc2l0aW9uID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICBtYXNrTm9kZS56SW5kZXggPSB0aGlzLmxheWVyT3JkZXIoV2luTGF5ZXIuV2FybldpbmRvdyk7XHJcbiAgICAgIG1hc2tOb2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xyXG4gICAgICBtYXNrTm9kZS5hZGRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cyk7XHJcbiAgICB9XHJcbiAgICBtYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIOenu+mZpOinpuaRuOmBrue9qSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaGlkQmxvY2tJbnB1dCgpIHtcclxuICAgIGxldCBtYXNrTm9kZSA9IHRoaXMudWlSb290LmdldENoaWxkQnlOYW1lKFwidWlSb290TWFza05vZGVcIik7XHJcbiAgICBpZiAobWFza05vZGUpIHtcclxuICAgICAgbWFza05vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pKt5pS+6aqo6aq85Yqo55S7XHJcbiAgICogQHBhcmFtIHNwaW5lIOmqqOmqvOWKqOeUu1xyXG4gICAqIEBwYXJhbSBhbmltTmFtZSDliqjnlLvlkI1cclxuICAgKiBAcGFyYW0gbG9vcCDmmK/lkKblvqrnjq9cclxuICAgKiBAcGFyYW0gY2FsbGJhY2sg57uT5p2f5Zue6LCDXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwbGF5U3BpbmUoXHJcbiAgICBzcGluZTogc3AuU2tlbGV0b24sXHJcbiAgICBhbmltTmFtZTogc3RyaW5nLFxyXG4gICAgbG9vcDogYm9vbGVhbixcclxuICAgIGNhbGxiYWNrP1xyXG4gICkge1xyXG4gICAgbGV0IHRyYWNrID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsIGFuaW1OYW1lLCBsb29wKTtcclxuICAgIGlmICh0cmFjaykge1xyXG4gICAgICAvLyDms6jlhozliqjnlLvnmoTnu5PmnZ/lm57osINcclxuICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgIGlmIChuYW1lID09PSBhbmltTmFtZSAmJiBjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soKTsgLy8g5Yqo55S757uT5p2f5ZCO5omn6KGM6Ieq5bex55qE6YC76L6RXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19