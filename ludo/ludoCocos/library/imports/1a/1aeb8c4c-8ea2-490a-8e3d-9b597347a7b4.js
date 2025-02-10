"use strict";
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