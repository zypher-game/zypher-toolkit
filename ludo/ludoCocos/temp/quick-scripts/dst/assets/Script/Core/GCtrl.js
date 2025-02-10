
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELDBDQUFxQztBQUNyQyw2Q0FBd0Q7QUFFeEQsaURBQTRDO0FBRTVDO0lBQUE7SUFvUEEsQ0FBQztJQXJPQyxzQkFBa0IsWUFBRztRQURyQixnQkFBZ0I7YUFDaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQWtCLHdCQUFlO1FBRGpDLHFCQUFxQjthQUNyQjtZQUNFLE9BQU8sbUJBQVMsQ0FBQyxXQUFXLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBa0IsdUJBQWM7UUFEaEMsc0JBQXNCO2FBQ3RCO1lBQ0UsT0FBTyxtQkFBUyxDQUFDLE1BQU0sQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUlELGdCQUFnQjtJQUNGLFdBQUssR0FBbkIsVUFBb0IsR0FBUztRQUMzQixPQUFPLElBQUksZ0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBaUJELHNCQUFrQixnQkFBTztRQUR6QixnQkFBZ0I7YUFDaEI7WUFDRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLGdCQUFPO1FBRHpCLFdBQVc7YUFDWDtZQUNFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFrQixtQkFBVTtRQUQ1QixZQUFZO2FBQ1o7WUFDRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFrQixtQkFBVTtRQUQ1QixhQUFhO2FBQ2I7WUFDRSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FDOUIsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLGVBQU07UUFEeEIsYUFBYTthQUNiO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTtJQUVhLGVBQVMsR0FBdkIsVUFDRSxJQUFhLEVBQ2IsSUFBbUI7UUFFbkIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFYSxhQUFPLEdBQXJCLFVBQ0UsSUFBWSxFQUNaLE1BQWUsRUFDZixJQUFzQjtRQUV0QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRWEsc0JBQWdCLEdBQTlCLFVBQ0UsZ0JBQXVDLEVBQ3ZDLGdCQUF1QztRQUN2QyxvQkFBd0Q7YUFBeEQsVUFBd0QsRUFBeEQscUJBQXdELEVBQXhELElBQXdEO1lBQXhELG1DQUF3RDs7UUFFeEQsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLGdCQUFnQjtnQkFBRSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3pDLE9BQU87U0FDUjtRQUNELGlCQUFPLENBQUMsUUFBUSxPQUFoQixpQkFBTyxrQkFDTCxVQUNFLFFBQWdCLEVBQ2hCLEtBQWEsRUFDYixTQUFpQixFQUNqQixHQUFVLEVBQ1YsS0FBSztnQkFFTCxJQUFJLE1BQU0sR0FDUixjQUFjO29CQUNkLFFBQVE7b0JBQ1IsR0FBRztvQkFDSCxLQUFLO29CQUNMLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxPQUFPLENBQUM7Z0JBRVYsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDUixFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUNqQyxJQUFJLGdCQUFnQjt3QkFBRSxnQkFBZ0IsRUFBRSxDQUFDO2lCQUMxQztZQUNILENBQUMsR0FDRSxVQUFVLEdBQ2I7SUFDSixDQUFDO0lBRWEsaUJBQVcsR0FBekIsVUFBMEIsRUFBRTtRQUMxQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9DLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzlDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxtQkFBYSxHQUEzQixVQUNFLEdBQWdDLEVBQ2hDLEtBQWEsRUFDYixNQUF3QixFQUN4QixRQUFxQjtRQUp2QixpQkFtQkM7UUFiQyxJQUFJO1FBQ0osSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQzlCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLEVBQUUsR0FBRztvQkFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNoRDtTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7SUFDRyxrQkFBWSxHQUExQixVQUNFLFNBQXFCLEVBQ3JCLE1BQU0sRUFDTixPQUFnQixFQUNoQixNQUF1QixFQUN2QixFQUFHLEVBQ0gsS0FBYyxFQUNkLFFBQXlCO1FBSHpCLHVCQUFBLEVBQUEsY0FBdUI7UUFHdkIseUJBQUEsRUFBQSxnQkFBeUI7UUFFekIsU0FBUyxDQUFDLGFBQWEsQ0FDckIsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsT0FBTyxFQUNkLE1BQU0sQ0FBQyxNQUFNLEVBQ2IsTUFBTSxDQUFDLFNBQVMsRUFDaEIsVUFBQyxJQUFzQjtZQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQUUsT0FBTztZQUNqQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQztZQUNELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkU7WUFDRCxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNyQyxFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO29CQUN4QyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxFQUFFLEVBQUU7d0JBQ04sRUFBRSxFQUFFLENBQUM7cUJBQ047Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDdEQ7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZO0lBQ0Usd0JBQWtCLEdBQWhDLFVBQ0UsSUFBSSxFQUNKLElBQWEsRUFDYixJQUFZLEVBQ1osT0FBZSxFQUNmLE1BQWUsRUFDZixFQUFHO1FBRUgsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQ2QsSUFBSSxFQUNKLFVBQ0UsZ0JBQThDLEVBQzlDLGdCQUFtRDtZQUVuRCxHQUFHLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDO1lBQ25DLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxHQUFHLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUM5QixLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWxQRCxnQkFBZ0I7SUFDRiwwQkFBb0IsR0FBRyxtQ0FBbUMsQ0FBQztJQUN6RSxnQkFBZ0I7SUFDRix5QkFBbUIsR0FBRyxrQ0FBa0MsQ0FBQztJQUN2RSxlQUFlO0lBQ0QsK0JBQXlCLEdBQ3JDLHVDQUF1QyxDQUFDO0lBQzFDLGVBQWU7SUFDRCw0QkFBc0IsR0FBRyxvQ0FBb0MsQ0FBQztJQUM5RCxpQ0FBMkIsR0FDdkMseUNBQXlDLENBQUM7SUFDNUMsZ0JBQWdCO0lBQ0YsbUJBQWEsR0FBVyxDQUFDLENBQUM7SUFjeEMsVUFBVTtJQUNJLFFBQUUsR0FBRyxzQkFBWSxDQUFDO0lBTWhDLFVBQVU7SUFDSSxtQkFBYSxHQUFHO1FBQzVCLFdBQVc7UUFDWCxPQUFPLEVBQUUsU0FBUztRQUNsQixTQUFTO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsVUFBVTtRQUNWLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFNBQVM7UUFDVCxJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUM7SUFFZSxpQkFBVyxHQUFHLEtBQUssQ0FBQztJQXNNdkMsWUFBQztDQXBQRCxBQW9QQyxJQUFBO0FBcFBZLHNCQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdFdmVudFN5c3RlbSBmcm9tIFwiLi9HRXZlbnQvR0V2ZW50U3lzdGVtXCI7XHJcbmltcG9ydCBHUGFyYW0gZnJvbSBcIi4vR0V2ZW50L0dQYXJhbVwiO1xyXG5pbXBvcnQgeyBHQXNzZXRJbXBsLCBHTG9hZGVyIH0gZnJvbSBcIi4vR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCBHQ2hpbGQgZnJvbSBcIi4vR1ZpZXcvR0NoaWxkXCI7XHJcbmltcG9ydCBHVGltZXJNZ3IgZnJvbSBcIi4vTWFuYWdlci9HVGltZXJNZ3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHQ3RybCB7XHJcbiAgLyoqIOWFqOWxgOenkue6p+WIq+aXtumXtOaXtumXtCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgR1RpbWVyU2Vjb25kRXZlbnRNc2cgPSBcIkdUaW1lci5FdmVudC5HVGltZXJTZWNvbmRFdmVudE1zZ1wiO1xyXG4gIC8qKiDlhajlsYDmr6vnp5Lnuqfml7bpl7Tkuovku7YgKi9cclxuICBwdWJsaWMgc3RhdGljIEdUaW1lck1pbGxpRXZlbnRNc2cgPSBcIkdUaW1lci5FdmVudC5HVGltZXJNaWxsaUV2ZW50TXNnXCI7XHJcbiAgLyoqIOWFqOWxgOeql+WPo+aekOaehOS6i+S7tiAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgR0NsaWVudFdpbkRlc3Ryb3lFdmVudE1zZyA9XHJcbiAgICBcIlVJTWdyLkV2ZW50LkdDbGllbnRXaW5EZXN0cm95RXZlbnRNc2dcIjtcclxuICAvKiog5YWo5bGA56qX5Y+j5omT5byA5LqL5Lu2ICovXHJcbiAgcHVibGljIHN0YXRpYyBHQ2xpZW50V2luT3BlbkV2ZW50TXNnID0gXCJVSU1nci5FdmVudC5HQ2xpZW50V2luT3BlbkV2ZW50TXNnXCI7XHJcbiAgcHVibGljIHN0YXRpYyBHQ2xpZW50V2luT3BlbkV2ZW50QWZ0ZXJNc2cgPVxyXG4gICAgXCJVSU1nci5FdmVudC5HQ2xpZW50V2luT3BlbkV2ZW50QWZ0ZXJNc2dcIjtcclxuICAvKiog5a6i5oi356uv5pyN5Yqh56uv5pe26Ze05beuICovXHJcbiAgcHVibGljIHN0YXRpYyBzZXJ2ZXJTdWJUaW1lOiBudW1iZXIgPSAwO1xyXG4gIC8qKiDojrflj5blvZPliY3mnI3liqHlmajml7bpl7QgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBub3coKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnNlcnZlclN1YlRpbWUgKyBEYXRlLm5vdygpO1xyXG4gIH1cclxuICAvKiog6I635Y+W57uf5LiA55qE5LqL5Lu26LCD5bqm6Ze06ZqUKHMpICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZGVsdGFTZWNvbmRUaW1lKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gR1RpbWVyTWdyLnNlY29uZERlbHRhO1xyXG4gIH1cclxuICAvKiog6I635Y+W57uf5LiA55qE5LqL5Lu26LCD5bqm6Ze06ZqUKG1zKSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGRlbHRhTWlsbGlUaW1lKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gR1RpbWVyTWdyLm1EZWx0YTtcclxuICB9XHJcblxyXG4gIC8qKuS6i+S7tuWvueixoSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgRVMgPSBHRXZlbnRTeXN0ZW07XHJcbiAgLyoqbmV3IEdQYXJhbSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcGFyYW0obXNnPzogYW55KTogR1BhcmFtIHtcclxuICAgIHJldHVybiBuZXcgR1BhcmFtKG1zZyk7XHJcbiAgfVxyXG5cclxuICAvKirnorDmkp7liIbnu4QgKi9cclxuICBwdWJsaWMgc3RhdGljIENvbGxpZGVyR3JvdXAgPSB7XHJcbiAgICAvKiog6buY6K6k5YiG57uEICovXHJcbiAgICBkZWZhdWx0OiBcImRlZmF1bHRcIixcclxuICAgIC8q6Zqc56KN5YiG57uEICovXHJcbiAgICBwbGF0Zm9ybTogXCJwbGF0Zm9ybVwiLFxyXG4gICAgLyoq546p5a625YiG57uEICovXHJcbiAgICBwbGF5ZXI6IFwicGxheWVyXCIsXHJcbiAgICAvKirpgZPlhbfliIbnu4QqL1xyXG4gICAgaXRlbTogXCJpdGVtXCIsXHJcbiAgfTtcclxuXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaXNXYWl0dGluZyA9IGZhbHNlO1xyXG5cclxuICAvKiog6I635Y+W5b2T5YmN5Zy65pmv55qE55S75biDICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgY2FudmFzZSgpOiBjYy5DYW52YXMge1xyXG4gICAgdmFyIG5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpO1xyXG4gICAgcmV0dXJuIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcyk7XHJcbiAgfVxyXG5cclxuICAvKiog6KeG5Zu+5aSn5bCPICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgd2luU2l6ZSgpOiBjYy5TaXplIHtcclxuICAgIHJldHVybiBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgfVxyXG4gIC8qKiDorr7orqHliIbovqjnjocgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBkZXNpZ25TaXplKCk6IGNjLlNpemUge1xyXG4gICAgcmV0dXJuIGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKTtcclxuICB9XHJcblxyXG4gIC8qKiDoiJ7lj7DmnIDlpKflpKflsI8gKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBhY3R1YWxTaXplKCk6IGNjLlNpemUge1xyXG4gICAgbGV0IHdpblNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgcmV0dXJuIGNjLnNpemUoXHJcbiAgICAgIE1hdGgubWluKHdpblNpemUud2lkdGgsIDE0NDIpLFxyXG4gICAgICBNYXRoLm1pbih3aW5TaXplLmhlaWdodCwgNjQwKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiDpq5jluqbpgILphY3mr5TkvosgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBoUmF0aW8oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLndpblNpemUuaGVpZ2h0IC8gdGhpcy5kZXNpZ25TaXplLmhlaWdodDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0R0NoaWxkPFQgZXh0ZW5kcyBHQ2hpbGQ+KFxyXG4gICAgbm9kZTogY2MuTm9kZSxcclxuICAgIHR5cGU6IHsgbmV3ICgpOiBUIH1cclxuICApOiBUIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUodHlwZSk7XHJcbiAgICByZXR1cm4gbm9kZS5nZXRDb21wb25lbnQoY2xhc3NOYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmluZENvbTxUIGV4dGVuZHMgY2MuQ29tcG9uZW50PihcclxuICAgIHBhdGg6IHN0cmluZyxcclxuICAgIHBhcmVudDogY2MuTm9kZSxcclxuICAgIHR5cGU6IHsgcHJvdG90eXBlOiBUIH1cclxuICApOiBUIHtcclxuICAgIGxldCBub2RlID0gY2MuZmluZChwYXRoLCBwYXJlbnQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBub2RlLmdldENvbXBvbmVudCh0eXBlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcHJlTG9hZFJhd0Fzc2V0cyhcclxuICAgIHByb2dyZXNzQ2FsbEJhY2s6IFByb2dyZXNzQ2FsbGJhY2s8YW55PixcclxuICAgIGNvbXBsZXRlQ2FsbEJhY2s6IENvbXBsZXRlQ2FsbGJhY2s8YW55PixcclxuICAgIC4uLmFzc2V0SW5mb3M6IHsgdHlwZTogdHlwZW9mIGNjLkFzc2V0OyBwYXRoOiBzdHJpbmcgfVtdXHJcbiAgKSB7XHJcbiAgICBpZiAoYXNzZXRJbmZvcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICBpZiAoY29tcGxldGVDYWxsQmFjaykgY29tcGxldGVDYWxsQmFjaygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBHTG9hZGVyLnByZUxvYWRzKFxyXG4gICAgICAoXHJcbiAgICAgICAgY3VySW5kZXg6IG51bWJlcixcclxuICAgICAgICBjb3VudDogbnVtYmVyLFxyXG4gICAgICAgIGFzc2V0TmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGVycjogRXJyb3IsXHJcbiAgICAgICAgYXNzZXRcclxuICAgICAgKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9XHJcbiAgICAgICAgICBcIuWKoOi9vei1hOa6kOS4rSwg5b2T5YmN6L+b5bqm77yaXCIgK1xyXG4gICAgICAgICAgY3VySW5kZXggK1xyXG4gICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgY291bnQgK1xyXG4gICAgICAgICAgXCIsIOWKoOi9vei1hOa6kOWQjeensO+8mlwiICtcclxuICAgICAgICAgIGFzc2V0TmFtZSArXHJcbiAgICAgICAgICBcIiwg54q25oCBOlwiO1xyXG5cclxuICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgY2MubG9nKHJlc3VsdCArIFwi5Yqg6L295oiQ5YqfXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYy5sb2cocmVzdWx0ICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9ncmVzc0NhbGxCYWNrICYmIHByb2dyZXNzQ2FsbEJhY2soY3VySW5kZXgsIGNvdW50LCBhc3NldCk7XHJcbiAgICAgICAgaWYgKGN1ckluZGV4ID09IGFzc2V0SW5mb3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICBpZiAoY29tcGxldGVDYWxsQmFjaykgY29tcGxldGVDYWxsQmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgLi4uYXNzZXRJbmZvc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWZ0ZXJGcmFtZXMoY2IpIHtcclxuICAgIGNjLmRpcmVjdG9yLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFLCAoKSA9PiB7XHJcbiAgICAgIGNjLmRpcmVjdG9yLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcsICgpID0+IHtcclxuICAgICAgICBjYiAmJiBjYigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICrCoOaSreaUvuaMh+WumuWKqOeUu1xyXG4gICAqwqBAcGFyYW3CoHN0YXRlwqDmkq3mlL7nmoTliqjnlLtcclxuICAgKsKgQHBhcmFtwqBpc0xvb3DCoOaYr+WQpuW+queOr1xyXG4gICAqwqBAcGFyYW3CoEZ1bsKg5Zue6LCDXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwbGF5RHJhZ29uQW5pKFxyXG4gICAgYW5pOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXksXHJcbiAgICBzdGF0ZTogc3RyaW5nLFxyXG4gICAgaXNMb29wOiBib29sZWFuIHwgbnVtYmVyLFxyXG4gICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkXHJcbiAgKSB7XHJcbiAgICAvL+W+queOr1xyXG4gICAgY29uc3QgbG9vcFRpbWUgPSBpc0xvb3AgPyAwIDogMTtcclxuICAgIGlmIChzdGF0ZSAhPSBhbmkuYW5pbWF0aW9uTmFtZSkge1xyXG4gICAgICBhbmkucGxheUFuaW1hdGlvbihzdGF0ZSwgbG9vcFRpbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvb3BUaW1lKSB7XHJcbiAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBjYiA9ICgpID0+IHtcclxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBhbmkub25jZShkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgY2IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirmkq3mlL7luKfliqjnlLsgKi9cclxuICBwdWJsaWMgc3RhdGljIHBsYXlGcmFtZUFuaShcclxuICAgIGFzc2V0SW1wbDogR0Fzc2V0SW1wbCxcclxuICAgIGNvbmZpZyxcclxuICAgIGFuaU5vZGU6IGNjLk5vZGUsXHJcbiAgICBpc0xvb2Q6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgIGNiPyxcclxuICAgIHNwZWVkPzogbnVtYmVyLFxyXG4gICAgc2V0QmxlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgYXNzZXRJbXBsLmxvYWRKWEFuaUNsaXAoXHJcbiAgICAgIGNvbmZpZy5wYXRoLFxyXG4gICAgICBjb25maWcuYW5pTmFtZSxcclxuICAgICAgY29uZmlnLnByZWZpeCxcclxuICAgICAgY29uZmlnLm51bWJlckZpeCxcclxuICAgICAgKGNsaXA6IGNjLkFuaW1hdGlvbkNsaXApID0+IHtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQoYW5pTm9kZSkpIHJldHVybjtcclxuICAgICAgICBsZXQgYW5pID0gYW5pTm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBpZiAoIWFuaSkge1xyXG4gICAgICAgICAgYW5pID0gYW5pTm9kZS5hZGRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNwID0gYW5pTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAoIXNwKSB7XHJcbiAgICAgICAgICBzcCA9IGFuaU5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXRCbGVuZCkge1xyXG4gICAgICAgICAgc3Auc2V0QmxlbmQoY2MubWFjcm8uQmxlbmRGYWN0b3IuU1JDX0FMUEhBLCBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcC5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5SQVc7XHJcbiAgICAgICAgc3AudHJpbSA9IGZhbHNlO1xyXG4gICAgICAgIGFuaS5hZGRDbGlwKGNsaXApO1xyXG4gICAgICAgIGlmIChzcGVlZCkge1xyXG4gICAgICAgICAgY2xpcC5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbmlOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCFpc0xvb2QpIHtcclxuICAgICAgICAgIGFuaS5wbGF5KGNvbmZpZy5hbmlOYW1lKS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbDtcclxuICAgICAgICAgIGFuaS5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgICAgYW5pTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFuaS5wbGF5KGNvbmZpZy5hbmlOYW1lKS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoq6K6+572u6b6Z6aqo5Yqo55S7ICovXHJcbiAgcHVibGljIHN0YXRpYyBzZXREcmFnb25Cb2FuZXNBbmkoXHJcbiAgICBhc2xwLFxyXG4gICAgbm9kZTogY2MuTm9kZSxcclxuICAgIHBhdGg6IHN0cmluZyxcclxuICAgIGFuaU5hbWU6IHN0cmluZyxcclxuICAgIGlzTG9vcDogYm9vbGVhbixcclxuICAgIGNiP1xyXG4gICkge1xyXG4gICAgbGV0IGRhciA9IG5vZGUuYWRkQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICBpZiAoIWRhcikgcmV0dXJuO1xyXG4gICAgYXNscC5kcmFnb25Cb25lcyhcclxuICAgICAgcGF0aCxcclxuICAgICAgKFxyXG4gICAgICAgIGRyYWdvbkJvbmVzQXNzZXQ6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXQsXHJcbiAgICAgICAgZHJhZ29uQm9uZXNBdGxhczogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBdGxhc0Fzc2V0XHJcbiAgICAgICkgPT4ge1xyXG4gICAgICAgIGRhci5kcmFnb25Bc3NldCA9IGRyYWdvbkJvbmVzQXNzZXQ7XHJcbiAgICAgICAgZGFyLmRyYWdvbkF0bGFzQXNzZXQgPSBkcmFnb25Cb25lc0F0bGFzO1xyXG4gICAgICAgIGRhci5hcm1hdHVyZU5hbWUgPSBcIkFybWF0dXJlXCI7XHJcbiAgICAgICAgR0N0cmwucGxheURyYWdvbkFuaShkYXIsIGFuaU5hbWUsIGlzTG9vcCwgY2IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=