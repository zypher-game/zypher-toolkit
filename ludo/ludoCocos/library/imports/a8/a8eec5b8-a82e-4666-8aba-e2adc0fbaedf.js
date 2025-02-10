"use strict";
cc._RF.push(module, 'a8eecW4qC5GZoq64q3A+67f', 'RedPointLogicMgr');
// Script/Core/Manager/RedPointLogicMgr.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedPointLogicMgr = exports.RED_POINT_LABEL_NAME = exports.RED_POINT_NAME = void 0;
var Define_1 = require("../../Game/Common/Define");
var CoreDefine_1 = require("../CoreDefine");
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GCtrl_1 = require("../GCtrl");
var GLoader_1 = require("../GLoader/GLoader");
var reg = /^[0-9]+.?[0-9]*$/;
exports.RED_POINT_NAME = "red_point";
exports.RED_POINT_LABEL_NAME = "label";
var RedPointLogicMgr = /** @class */ (function (_super) {
    __extends(RedPointLogicMgr, _super);
    function RedPointLogicMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 定时器句柄 */
        _this._updateHandler = CoreDefine_1.INVALID_VALUE;
        return _this;
    }
    RedPointLogicMgr.ins = function () {
        if (this._instance == null) {
            this._instance = new RedPointLogicMgr();
        }
        return this._instance;
    };
    /** 更新 */
    RedPointLogicMgr.prototype.update = function () {
        this.updateCheck();
        this.updateVisit();
        this.checkState();
    };
    RedPointLogicMgr.prototype.initGame = function () {
        this.initEvent();
        this._redPointMask = new ES5Ex_1.MapWrap();
        this._waitSends = [];
        this._waitChecks = [];
        this._unlockMasks = [];
        this._targets = new ES5Ex_1.MapWrap();
        this._targetWraps = new ES5Ex_1.MapWrap();
        this._masks = new ES5Ex_1.MapWrap();
        this.stopUpdate();
        // 本地红点检测
        var keys = Object.keys(Define_1.RPointMask);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!reg.test(key))
                continue;
            this._waitChecks.push(parseInt(key));
        }
        this.checkState();
        // this.onCMSUserChange$tip();
    };
    RedPointLogicMgr.prototype.initEvent = function () {
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.rPoint.valueSetting, this, this.onCMSGRPValueSetting.bind(this), CoreDefine_1.PRIORITY_DATA);
    };
    RedPointLogicMgr.prototype.updateState = function () {
        var keys = Object.keys(Define_1.RPointMask);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (!reg.test(key))
                continue;
            var checkIndex = this._waitChecks.indexOf(parseInt(key));
            if (checkIndex === CoreDefine_1.INVALID_VALUE) {
                this._waitChecks.push(parseInt(key));
            }
        }
        this.checkState();
    };
    //在需要红点的地方用该方法进行注册
    RedPointLogicMgr.prototype.on = function (target, nodes) {
        var targetIt = this._targets.get(target.uuid);
        if (!targetIt) {
            targetIt = [];
            this._targets.set(target.uuid, targetIt);
            this._targetWraps.set(target.uuid, target);
        }
        targetIt.push.apply(targetIt, nodes);
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var value = false;
            for (var _a = 0, _b = node.mask; _a < _b.length; _a++) {
                var cMask = _b[_a];
                var maskIt = this._masks.get(cMask);
                if (!maskIt) {
                    maskIt = [];
                    this._masks.set(cMask, maskIt);
                }
                if (maskIt.indexOf(target) == CoreDefine_1.INVALID_VALUE) {
                    maskIt.push(target);
                }
                value = value || this._redPointMask.get(cMask);
            }
            this.setRPointView(target, node.subPath, value, node.effectType, node.posType, node.cb);
        }
    };
    /**注销红点 */
    RedPointLogicMgr.prototype.off = function (target) {
        var targetIt = this._targets.get(target.uuid);
        if (!targetIt)
            return;
        for (var _i = 0, targetIt_1 = targetIt; _i < targetIt_1.length; _i++) {
            var node = targetIt_1[_i];
            for (var _a = 0, _b = node.mask; _a < _b.length; _a++) {
                var cMask = _b[_a];
                var maskIt = this._masks.get(cMask);
                if (maskIt) {
                    var index = maskIt.indexOf(target);
                    if (index != CoreDefine_1.INVALID_VALUE)
                        maskIt.splice(index, 1);
                    if (maskIt.length == 0)
                        this._masks.delete(cMask);
                }
            }
        }
        this._targets.delete(target.uuid);
        this._targetWraps.delete(target.uuid);
    };
    RedPointLogicMgr.prototype.loginOut = function () {
        this.stopUpdate();
        GCtrl_1.GCtrl.ES.off(this);
        this._waitChecks = [];
        this._waitSends = [];
        this._targets.clear();
        this._targetWraps.clear();
        this._masks.clear();
    };
    RedPointLogicMgr.prototype.sendValueSettingMsg = function (mask, value, forceStop) {
        var target = {
            mask: mask,
            value: value,
            forceStop: forceStop,
        };
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.rPoint.valueSetting, GCtrl_1.GCtrl.param(target));
    };
    RedPointLogicMgr.prototype.sendValuesSettingMsgs = function (mask, value, forceStop) {
        for (var i = 0; i < mask.length; i++) {
            this.sendValueSettingMsg(mask[i], value, forceStop);
        }
    };
    /**定时检测红点 */
    RedPointLogicMgr.prototype.timingCheck = function () {
        //需要定时检测的红点
        // GameMgr.redMgr.sendValueSettingMsg(RPointMask.RPM_DrawFree, false);
    };
    /**
     * 红点值变更
     * @param _
     * @param param
     */
    RedPointLogicMgr.prototype.onCMSGRPValueSetting = function (_, param) {
        var rp = param.get();
        // 如果传过来的红点为True，则表示必定红点；如果为false,则需要重新计算
        if (rp.value == true) {
            // 如果等待计算项中存在该红点，则删除
            var checkIndex = this._waitChecks.indexOf(rp.mask);
            if (checkIndex != CoreDefine_1.INVALID_VALUE) {
                this._waitChecks.splice(checkIndex, 1);
            }
            // 如果当前的值为true，则不需要更新
            if (this._redPointMask.get(rp.mask))
                return;
            this._redPointMask.set(rp.mask, rp.value);
            // 更新更新待推送的红点
            if (this._waitSends.indexOf(rp.mask) != CoreDefine_1.INVALID_VALUE)
                return;
            this._waitSends.push(rp.mask);
        }
        else {
            if (rp.forceStop == true) {
                var checkIndex = this._waitChecks.indexOf(rp.mask);
                if (checkIndex != CoreDefine_1.INVALID_VALUE) {
                    this._waitChecks.splice(checkIndex, 1);
                }
                this._redPointMask.set(rp.mask, rp.value);
                // 更新更新待推送的红点
                if (this._waitSends.indexOf(rp.mask) != CoreDefine_1.INVALID_VALUE)
                    return;
                this._waitSends.push(rp.mask);
            }
            // 重新检测红点的值
            // 如果当前待检测列表中存在该枚举，等待检测，否则加入待检测列表
            else if (this._waitChecks.indexOf(rp.mask) == CoreDefine_1.INVALID_VALUE) {
                this._waitChecks.push(rp.mask);
            }
        }
        this.checkState();
    };
    RedPointLogicMgr.prototype.startUpdate = function () {
        if (this._updateHandler != CoreDefine_1.INVALID_VALUE) {
            return;
        }
        this._updateHandler = setInterval(this.update.bind(this), 100);
    };
    RedPointLogicMgr.prototype.stopUpdate = function () {
        if (CoreDefine_1.INVALID_VALUE == this._updateHandler)
            return;
        clearInterval(this._updateHandler);
        this._updateHandler = CoreDefine_1.INVALID_VALUE;
    };
    RedPointLogicMgr.prototype.checkState = function () {
        if (this._waitChecks.length > 0 || this._waitSends.length > 0) {
            if (this._updateHandler == CoreDefine_1.INVALID_VALUE)
                this.startUpdate();
        }
        else if (this._waitChecks.length == 0 && this._waitSends.length == 0) {
            if (this._updateHandler != CoreDefine_1.INVALID_VALUE)
                this.stopUpdate();
        }
    };
    /**更新状态 */
    RedPointLogicMgr.prototype.updateCheck = function () {
        if (this._waitChecks.length == 0)
            return;
        var mask = this._waitChecks.shift();
        var value = true;
        if (value) {
            value = false;
            switch (mask) {
                default:
                    value = false;
                    break;
            }
        }
        if (this._redPointMask.get(mask) == value)
            return;
        this._redPointMask.set(mask, value);
        // 更新更新待推送的红点
        if (this._waitSends.indexOf(mask) != CoreDefine_1.INVALID_VALUE)
            return;
        this._waitSends.push(mask);
    };
    /**表现更新 */
    RedPointLogicMgr.prototype.updateVisit = function () {
        if (this._waitSends.length == 0)
            return;
        var mask = this._waitSends.shift();
        var mask_value = this._redPointMask.get(mask);
        // 取出所有需要变更的节点
        var maskIter = this._masks.get(mask);
        if (!maskIter || maskIter.length == 0)
            return;
        for (var _i = 0, maskIter_1 = maskIter; _i < maskIter_1.length; _i++) {
            var obj = maskIter_1[_i];
            var targetIt = this._targets.get(obj.uuid);
            if (!targetIt)
                return;
            for (var _a = 0, targetIt_2 = targetIt; _a < targetIt_2.length; _a++) {
                var node = targetIt_2[_a];
                if (!node) {
                    continue;
                }
                if (node.mask.indexOf(mask) == CoreDefine_1.INVALID_VALUE)
                    continue;
                if (mask_value == true)
                    this.setRPointView(obj, node.subPath, mask_value, node.effectType, node.posType, node.cb);
                else {
                    // 如果为false则需要取组合值
                    var value = false;
                    for (var _b = 0, _c = node.mask; _b < _c.length; _b++) {
                        var cMask = _c[_b];
                        if (this._redPointMask.get(cMask)) {
                            value = true;
                            break;
                        }
                    }
                    this.setRPointView(obj, node.subPath, value, node.effectType, node.posType, node.cb);
                }
            }
        }
    };
    RedPointLogicMgr.prototype.setRPointView = function (parent, subPath, value, effectType, posType, cb) {
        var node = parent;
        if (subPath) {
            if (typeof subPath == "string") {
                node = cc.find(subPath, parent);
            }
            else {
                node = subPath;
            }
        }
        if (!node)
            return;
        switch (effectType) {
            case Define_1.RedpointEffect.BLING: {
                if (!value) {
                    node.opacity = 255;
                    node.stopAllActions();
                }
                else {
                    node.stopAllActions();
                    cc.tween(node)
                        .repeatForever(cc
                        .tween(node)
                        .to(1, { opacity: 255 * 0.2 })
                        .to(1, { opacity: 255 }))
                        .start();
                }
                break;
            }
            case Define_1.RedpointEffect.RUNNING: {
                var aniNode = node.getChildByName(exports.RED_POINT_NAME);
                if (!value) {
                    if (aniNode)
                        aniNode.active = false;
                    return;
                }
                else {
                    if (aniNode) {
                        aniNode.active = true;
                        return;
                    }
                }
                GLoader_1.GLoader.loadJXAniClips("anis/frames/btnAni", function (clips) {
                    if (!cc.isValid(node)) {
                        return;
                    }
                    var ani = new cc.Node();
                    ani.y = 12.5;
                    ani.name = exports.RED_POINT_NAME;
                    ani.setAnchorPoint(cc.v2(0.5, 0.5));
                    ani.addComponent(cc.Sprite);
                    var aniSp = ani.addComponent(cc.Animation);
                    for (var i = 0; i < clips.length; i++) {
                        aniSp.addClip(clips[i]);
                    }
                    node.addChild(ani);
                    var animation = aniSp.play("effect");
                    animation.wrapMode = cc.WrapMode.Loop;
                }, {
                    aniName: "effect",
                    prefix: "anniu",
                    maxIdx: 8,
                    minIdx: 3,
                    numberFix: 4,
                });
                break;
            }
            case Define_1.RedpointEffect.REDPOINT: {
                var pt = node.getChildByName(exports.RED_POINT_NAME);
                if (!pt) {
                    if (!value)
                        return;
                    // pt = UICreate.altsSprite({ path: Res.texture.views.common, sub: "redPoint", apl: GLoader }).node;
                    pt.name = exports.RED_POINT_NAME;
                    pt.parent = node;
                    pt.zIndex = CoreDefine_1.MAX_TAG;
                }
                pt.position = cc.v3(node.width * (1 - node.anchorX) - 5, node.height * (1 - node.anchorY) - 5);
                pt.active = value;
                break;
            }
        }
        cb && cb(node);
    };
    /**获取该节点红点应处于的状态 */
    RedPointLogicMgr.prototype.getMaskRedpointState = function (masks) {
        for (var i = 0; i < masks.length; i++) {
            var value = this._redPointMask.get(masks[i]);
            if (value)
                return value;
        }
        return false;
    };
    RedPointLogicMgr._instance = null;
    return RedPointLogicMgr;
}(ES5Ex_1.ObjectWrap));
exports.RedPointLogicMgr = RedPointLogicMgr;

cc._RF.pop();