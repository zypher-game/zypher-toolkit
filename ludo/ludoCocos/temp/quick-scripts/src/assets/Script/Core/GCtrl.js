"use strict";
cc._RF.push(module, 'af3d4/tO/FHULYLN4RLF+LF', 'GCtrl');
// Script/Core/GCtrl.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCtrl = void 0;
var GEventSystem_1 = require("./GEvent/GEventSystem");
var GParam_1 = require("./GEvent/GParam");
var GLoader_1 = require("./GLoader/GLoader");
var GTimerMgr_1 = require("./Manager/GTimerMgr");
var GCtrl = /** @class */ (function () {
    function GCtrl() {
    }
    Object.defineProperty(GCtrl, "now", {
        /** 获取当前服务器时间 */
        get: function () {
            return this.serverSubTime + Date.now();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "deltaSecondTime", {
        /** 获取统一的事件调度间隔(s) */
        get: function () {
            return GTimerMgr_1.default.secondDelta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "deltaMilliTime", {
        /** 获取统一的事件调度间隔(ms) */
        get: function () {
            return GTimerMgr_1.default.mDelta;
        },
        enumerable: false,
        configurable: true
    });
    /**new GParam */
    GCtrl.param = function (msg) {
        return new GParam_1.default(msg);
    };
    Object.defineProperty(GCtrl, "canvase", {
        /** 获取当前场景的画布 */
        get: function () {
            var node = cc.director.getScene().getChildByName("Canvas");
            return node.getComponent(cc.Canvas);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "winSize", {
        /** 视图大小 */
        get: function () {
            return cc.view.getVisibleSize();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "designSize", {
        /** 设计分辨率 */
        get: function () {
            return cc.view.getDesignResolutionSize();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "actualSize", {
        /** 舞台最大大小 */
        get: function () {
            var winSize = cc.winSize;
            return cc.size(Math.min(winSize.width, 1442), Math.min(winSize.height, 640));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GCtrl, "hRatio", {
        /** 高度适配比例 */
        get: function () {
            return this.winSize.height / this.designSize.height;
        },
        enumerable: false,
        configurable: true
    });
    GCtrl.getGChild = function (node, type) {
        var className = cc.js.getClassName(type);
        return node.getComponent(className);
    };
    GCtrl.findCom = function (path, parent, type) {
        var node = cc.find(path, parent);
        if (!node)
            return null;
        return node.getComponent(type);
    };
    GCtrl.preLoadRawAssets = function (progressCallBack, completeCallBack) {
        var assetInfos = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            assetInfos[_i - 2] = arguments[_i];
        }
        if (assetInfos.length == 0) {
            if (completeCallBack)
                completeCallBack();
            return;
        }
        GLoader_1.GLoader.preLoads.apply(GLoader_1.GLoader, __spreadArrays([function (curIndex, count, assetName, err, asset) {
                var result = "加载资源中, 当前进度：" +
                    curIndex +
                    "/" +
                    count +
                    ", 加载资源名称：" +
                    assetName +
                    ", 状态:";
                if (!err) {
                    cc.log(result + "加载成功");
                }
                else {
                    cc.log(result + err.message);
                }
                progressCallBack && progressCallBack(curIndex, count, asset);
                if (curIndex == assetInfos.length) {
                    if (completeCallBack)
                        completeCallBack();
                }
            }], assetInfos));
    };
    GCtrl.afterFrames = function (cb) {
        cc.director.once(cc.Director.EVENT_AFTER_UPDATE, function () {
            cc.director.once(cc.Director.EVENT_BEFORE_DRAW, function () {
                cb && cb();
            });
        });
    };
    /**
     * 播放指定动画
     * @param state 播放的动画
     * @param isLoop 是否循环
     * @param Fun 回调
     */
    GCtrl.playDragonAni = function (ani, state, isLoop, callback) {
        var _this = this;
        //循环
        var loopTime = isLoop ? 0 : 1;
        if (state != ani.animationName) {
            ani.playAnimation(state, loopTime);
        }
        if (loopTime) {
            if (callback) {
                var cb = function () {
                    callback.call(_this);
                };
                ani.once(dragonBones.EventObject.COMPLETE, cb);
            }
        }
    };
    /**播放帧动画 */
    GCtrl.playFrameAni = function (assetImpl, config, aniNode, isLood, cb, speed, setBlend) {
        if (isLood === void 0) { isLood = false; }
        if (setBlend === void 0) { setBlend = false; }
        assetImpl.loadJXAniClip(config.path, config.aniName, config.prefix, config.numberFix, function (clip) {
            if (!cc.isValid(aniNode))
                return;
            var ani = aniNode.getComponent(cc.Animation);
            if (!ani) {
                ani = aniNode.addComponent(cc.Animation);
            }
            var sp = aniNode.getComponent(cc.Sprite);
            if (!sp) {
                sp = aniNode.addComponent(cc.Sprite);
            }
            if (setBlend) {
                sp.setBlend(cc.macro.BlendFactor.SRC_ALPHA, cc.macro.BlendFactor.ONE);
            }
            sp.sizeMode = cc.Sprite.SizeMode.RAW;
            sp.trim = false;
            ani.addClip(clip);
            if (speed) {
                clip.speed = speed;
            }
            aniNode.active = true;
            if (!isLood) {
                ani.play(config.aniName).wrapMode = cc.WrapMode.Normal;
                ani.once(cc.Animation.EventType.FINISHED, function () {
                    aniNode.active = false;
                    if (cb) {
                        cb();
                    }
                });
            }
            else {
                ani.play(config.aniName).wrapMode = cc.WrapMode.Loop;
            }
        });
    };
    /**设置龙骨动画 */
    GCtrl.setDragonBoanesAni = function (aslp, node, path, aniName, isLoop, cb) {
        var dar = node.addComponent(dragonBones.ArmatureDisplay);
        if (!dar)
            return;
        aslp.dragonBones(path, function (dragonBonesAsset, dragonBonesAtlas) {
            dar.dragonAsset = dragonBonesAsset;
            dar.dragonAtlasAsset = dragonBonesAtlas;
            dar.armatureName = "Armature";
            GCtrl.playDragonAni(dar, aniName, isLoop, cb);
        });
    };
    /** 全局秒级别时间时间 */
    GCtrl.GTimerSecondEventMsg = "GTimer.Event.GTimerSecondEventMsg";
    /** 全局毫秒级时间事件 */
    GCtrl.GTimerMilliEventMsg = "GTimer.Event.GTimerMilliEventMsg";
    /** 全局窗口析构事件 */
    GCtrl.GClientWinDestroyEventMsg = "UIMgr.Event.GClientWinDestroyEventMsg";
    /** 全局窗口打开事件 */
    GCtrl.GClientWinOpenEventMsg = "UIMgr.Event.GClientWinOpenEventMsg";
    GCtrl.GClientWinOpenEventAfterMsg = "UIMgr.Event.GClientWinOpenEventAfterMsg";
    /** 客户端服务端时间差 */
    GCtrl.serverSubTime = 0;
    /**事件对象 */
    GCtrl.ES = GEventSystem_1.default;
    /**碰撞分组 */
    GCtrl.ColliderGroup = {
        /** 默认分组 */
        default: "default",
        /*障碍分组 */
        platform: "platform",
        /**玩家分组 */
        player: "player",
        /**道具分组*/
        item: "item",
    };
    GCtrl._isWaitting = false;
    return GCtrl;
}());
exports.GCtrl = GCtrl;

cc._RF.pop();