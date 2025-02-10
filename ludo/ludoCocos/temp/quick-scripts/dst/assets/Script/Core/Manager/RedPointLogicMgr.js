
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/RedPointLogicMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL1JlZFBvaW50TG9naWNNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE0RTtBQUM1RSw0Q0FBc0U7QUFDdEUsMENBQXVEO0FBQ3ZELGtDQUFpQztBQUVqQyw4Q0FBNkM7QUFFN0MsSUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUM7QUFFbEIsUUFBQSxjQUFjLEdBQUcsV0FBVyxDQUFDO0FBQzdCLFFBQUEsb0JBQW9CLEdBQUcsT0FBTyxDQUFDO0FBRTVDO0lBQXNDLG9DQUFVO0lBQWhEO1FBQUEscUVBNFlDO1FBN1hDLFlBQVk7UUFDRixvQkFBYyxHQUFXLDBCQUFhLENBQUM7O0lBNFhuRCxDQUFDO0lBMVllLG9CQUFHLEdBQWpCO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBa0JELFNBQVM7SUFDQyxpQ0FBTSxHQUFoQjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxtQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFPLEVBQW1CLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQU8sRUFB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QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDckMsQ0FBQztnQkFDRixFQUFFLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDbEIsTUFBTTthQUNQO1NBQ0Y7UUFDRCxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQkFBbUI7SUFDWiwrQ0FBb0IsR0FBM0IsVUFBNEIsS0FBZTtRQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLEtBQUs7Z0JBQUUsT0FBTyxLQUFLLENBQUM7U0FDekI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUExWWdCLDBCQUFTLEdBQXFCLElBQUksQ0FBQztJQTJZdEQsdUJBQUM7Q0E1WUQsQUE0WUMsQ0E1WXFDLGtCQUFVLEdBNFkvQztBQTVZWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSUG9pbnROb2RlLCBSUG9pbnRWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5pbXBvcnQgeyBDTXNnLCBSZWRwb2ludEVmZmVjdCwgUlBvaW50TWFzayB9IGZyb20gXCIuLi8uLi9HYW1lL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSwgTUFYX1RBRywgUFJJT1JJVFlfREFUQSB9IGZyb20gXCIuLi9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAsIE9iamVjdFdyYXAgfSBmcm9tIFwiLi4vRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLi9HQ3RybFwiO1xyXG5pbXBvcnQgR1BhcmFtIGZyb20gXCIuLi9HRXZlbnQvR1BhcmFtXCI7XHJcbmltcG9ydCB7IEdMb2FkZXIgfSBmcm9tIFwiLi4vR0xvYWRlci9HTG9hZGVyXCI7XHJcblxyXG5jb25zdCByZWcgPSAvXlswLTldKy4/WzAtOV0qJC87XHJcblxyXG5leHBvcnQgY29uc3QgUkVEX1BPSU5UX05BTUUgPSBcInJlZF9wb2ludFwiO1xyXG5leHBvcnQgY29uc3QgUkVEX1BPSU5UX0xBQkVMX05BTUUgPSBcImxhYmVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVkUG9pbnRMb2dpY01nciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2luc3RhbmNlOiBSZWRQb2ludExvZ2ljTWdyID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIGlucygpOiBSZWRQb2ludExvZ2ljTWdyIHtcclxuICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IFJlZFBvaW50TG9naWNNZ3IoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKiDnuqLngrnmlbDlgLwgKi9cclxuICBwcm90ZWN0ZWQgX3JlZFBvaW50TWFzazogTWFwV3JhcDxudW1iZXIsIGJvb2xlYW4+O1xyXG4gIC8qKiDnvJPlrZjmm7TmlrAgKi9cclxuICBwcm90ZWN0ZWQgX3dhaXRTZW5kczogbnVtYmVyW107XHJcbiAgLyoqIOe8k+WtmOiuoeeulyAqL1xyXG4gIHByb3RlY3RlZCBfd2FpdENoZWNrczogbnVtYmVyW107XHJcbiAgLyoqIOWumuaXtuWZqOWPpeafhCAqL1xyXG4gIHByb3RlY3RlZCBfdXBkYXRlSGFuZGxlcjogbnVtYmVyID0gSU5WQUxJRF9WQUxVRTtcclxuICAvKiog5b6F6Kej6ZSBbWFzayAqL1xyXG4gIHByb3RlY3RlZCBfdW5sb2NrTWFza3M6IG51bWJlcltdO1xyXG5cclxuICAvKiog57qi54K55rOo5YaM6KGoIOmAmui/h3V1aWTov5vooYzms6jlhowgKi9cclxuICBwcm90ZWN0ZWQgX3RhcmdldHM6IE1hcFdyYXA8c3RyaW5nLCBSUG9pbnROb2RlW10+O1xyXG4gIHByb3RlY3RlZCBfdGFyZ2V0V3JhcHM6IE1hcFdyYXA8c3RyaW5nLCBjYy5Ob2RlPjtcclxuICBwcm90ZWN0ZWQgX21hc2tzOiBNYXBXcmFwPG51bWJlciwgY2MuTm9kZVtdPjtcclxuXHJcbiAgLyoqIOabtOaWsCAqL1xyXG4gIHByb3RlY3RlZCB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUNoZWNrKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVZpc2l0KCk7XHJcbiAgICB0aGlzLmNoZWNrU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0R2FtZSgpIHtcclxuICAgIHRoaXMuaW5pdEV2ZW50KCk7XHJcbiAgICB0aGlzLl9yZWRQb2ludE1hc2sgPSBuZXcgTWFwV3JhcDxudW1iZXIsIGJvb2xlYW4+KCk7XHJcbiAgICB0aGlzLl93YWl0U2VuZHMgPSBbXTtcclxuICAgIHRoaXMuX3dhaXRDaGVja3MgPSBbXTtcclxuICAgIHRoaXMuX3VubG9ja01hc2tzID0gW107XHJcbiAgICB0aGlzLl90YXJnZXRzID0gbmV3IE1hcFdyYXA8c3RyaW5nLCBSUG9pbnROb2RlW10+KCk7XHJcbiAgICB0aGlzLl90YXJnZXRXcmFwcyA9IG5ldyBNYXBXcmFwPHN0cmluZywgY2MuTm9kZT4oKTtcclxuICAgIHRoaXMuX21hc2tzID0gbmV3IE1hcFdyYXA8bnVtYmVyLCBjYy5Ob2RlW10+KCk7XHJcbiAgICB0aGlzLnN0b3BVcGRhdGUoKTtcclxuICAgIC8vIOacrOWcsOe6oueCueajgOa1i1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhSUG9pbnRNYXNrKTtcclxuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgIGlmICghcmVnLnRlc3Qoa2V5KSkgY29udGludWU7XHJcbiAgICAgIHRoaXMuX3dhaXRDaGVja3MucHVzaChwYXJzZUludChrZXkpKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xyXG4gICAgLy8gdGhpcy5vbkNNU1VzZXJDaGFuZ2UkdGlwKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdEV2ZW50KCkge1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIENNc2cuclBvaW50LnZhbHVlU2V0dGluZyxcclxuICAgICAgdGhpcyxcclxuICAgICAgdGhpcy5vbkNNU0dSUFZhbHVlU2V0dGluZy5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9EQVRBXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVwZGF0ZVN0YXRlKCkge1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhSUG9pbnRNYXNrKTtcclxuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgIGlmICghcmVnLnRlc3Qoa2V5KSkgY29udGludWU7XHJcbiAgICAgIGxldCBjaGVja0luZGV4ID0gdGhpcy5fd2FpdENoZWNrcy5pbmRleE9mKHBhcnNlSW50KGtleSkpO1xyXG4gICAgICBpZiAoY2hlY2tJbmRleCA9PT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICAgIHRoaXMuX3dhaXRDaGVja3MucHVzaChwYXJzZUludChrZXkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5jaGVja1N0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvL+WcqOmcgOimgee6oueCueeahOWcsOaWueeUqOivpeaWueazlei/m+ihjOazqOWGjFxyXG4gIHB1YmxpYyBvbih0YXJnZXQ6IGNjLk5vZGUsIG5vZGVzOiBSUG9pbnROb2RlW10pIHtcclxuICAgIGxldCB0YXJnZXRJdCA9IHRoaXMuX3RhcmdldHMuZ2V0KHRhcmdldC51dWlkKTtcclxuICAgIGlmICghdGFyZ2V0SXQpIHtcclxuICAgICAgdGFyZ2V0SXQgPSBbXTtcclxuICAgICAgdGhpcy5fdGFyZ2V0cy5zZXQodGFyZ2V0LnV1aWQsIHRhcmdldEl0KTtcclxuICAgICAgdGhpcy5fdGFyZ2V0V3JhcHMuc2V0KHRhcmdldC51dWlkLCB0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgdGFyZ2V0SXQucHVzaCguLi5ub2Rlcyk7XHJcblxyXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICBsZXQgdmFsdWUgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgY01hc2sgb2Ygbm9kZS5tYXNrKSB7XHJcbiAgICAgICAgbGV0IG1hc2tJdCA9IHRoaXMuX21hc2tzLmdldChjTWFzayk7XHJcbiAgICAgICAgaWYgKCFtYXNrSXQpIHtcclxuICAgICAgICAgIG1hc2tJdCA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5fbWFza3Muc2V0KGNNYXNrLCBtYXNrSXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFza0l0LmluZGV4T2YodGFyZ2V0KSA9PSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgICBtYXNrSXQucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YWx1ZSA9IHZhbHVlIHx8IHRoaXMuX3JlZFBvaW50TWFzay5nZXQoY01hc2spO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0UlBvaW50VmlldyhcclxuICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgbm9kZS5zdWJQYXRoLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIG5vZGUuZWZmZWN0VHlwZSxcclxuICAgICAgICBub2RlLnBvc1R5cGUsXHJcbiAgICAgICAgbm9kZS5jYlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq5rOo6ZSA57qi54K5ICovXHJcbiAgcHVibGljIG9mZih0YXJnZXQ6IGNjLk5vZGUpIHtcclxuICAgIGxldCB0YXJnZXRJdCA9IHRoaXMuX3RhcmdldHMuZ2V0KHRhcmdldC51dWlkKTtcclxuICAgIGlmICghdGFyZ2V0SXQpIHJldHVybjtcclxuICAgIGZvciAobGV0IG5vZGUgb2YgdGFyZ2V0SXQpIHtcclxuICAgICAgZm9yIChsZXQgY01hc2sgb2Ygbm9kZS5tYXNrKSB7XHJcbiAgICAgICAgbGV0IG1hc2tJdCA9IHRoaXMuX21hc2tzLmdldChjTWFzayk7XHJcbiAgICAgICAgaWYgKG1hc2tJdCkge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gbWFza0l0LmluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgIGlmIChpbmRleCAhPSBJTlZBTElEX1ZBTFVFKSBtYXNrSXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIGlmIChtYXNrSXQubGVuZ3RoID09IDApIHRoaXMuX21hc2tzLmRlbGV0ZShjTWFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl90YXJnZXRzLmRlbGV0ZSh0YXJnZXQudXVpZCk7XHJcbiAgICB0aGlzLl90YXJnZXRXcmFwcy5kZWxldGUodGFyZ2V0LnV1aWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luT3V0KCkge1xyXG4gICAgdGhpcy5zdG9wVXBkYXRlKCk7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcyk7XHJcbiAgICB0aGlzLl93YWl0Q2hlY2tzID0gW107XHJcbiAgICB0aGlzLl93YWl0U2VuZHMgPSBbXTtcclxuICAgIHRoaXMuX3RhcmdldHMuY2xlYXIoKTtcclxuICAgIHRoaXMuX3RhcmdldFdyYXBzLmNsZWFyKCk7XHJcbiAgICB0aGlzLl9tYXNrcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmRWYWx1ZVNldHRpbmdNc2coXHJcbiAgICBtYXNrOiBudW1iZXIsXHJcbiAgICB2YWx1ZTogYm9vbGVhbixcclxuICAgIGZvcmNlU3RvcD86IGJvb2xlYW5cclxuICApIHtcclxuICAgIGxldCB0YXJnZXQ6IFJQb2ludFZhbHVlID0ge1xyXG4gICAgICBtYXNrOiBtYXNrLFxyXG4gICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgIGZvcmNlU3RvcDogZm9yY2VTdG9wLFxyXG4gICAgfTtcclxuICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5yUG9pbnQudmFsdWVTZXR0aW5nLCBHQ3RybC5wYXJhbSh0YXJnZXQpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZW5kVmFsdWVzU2V0dGluZ01zZ3MoXHJcbiAgICBtYXNrOiBudW1iZXJbXSxcclxuICAgIHZhbHVlOiBib29sZWFuLFxyXG4gICAgZm9yY2VTdG9wPzogYm9vbGVhblxyXG4gICkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc2VuZFZhbHVlU2V0dGluZ01zZyhtYXNrW2ldLCB2YWx1ZSwgZm9yY2VTdG9wKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKuWumuaXtuajgOa1i+e6oueCuSAqL1xyXG4gIHB1YmxpYyB0aW1pbmdDaGVjaygpIHtcclxuICAgIC8v6ZyA6KaB5a6a5pe25qOA5rWL55qE57qi54K5XHJcbiAgICAvLyBHYW1lTWdyLnJlZE1nci5zZW5kVmFsdWVTZXR0aW5nTXNnKFJQb2ludE1hc2suUlBNX0RyYXdGcmVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnuqLngrnlgLzlj5jmm7RcclxuICAgKiBAcGFyYW0gX1xyXG4gICAqIEBwYXJhbSBwYXJhbVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvbkNNU0dSUFZhbHVlU2V0dGluZyhfLCBwYXJhbTogR1BhcmFtKSB7XHJcbiAgICBsZXQgcnAgPSBwYXJhbS5nZXQ8UlBvaW50VmFsdWU+KCk7XHJcbiAgICAvLyDlpoLmnpzkvKDov4fmnaXnmoTnuqLngrnkuLpUcnVl77yM5YiZ6KGo56S65b+F5a6a57qi54K577yb5aaC5p6c5Li6ZmFsc2Us5YiZ6ZyA6KaB6YeN5paw6K6h566XXHJcbiAgICBpZiAocnAudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAvLyDlpoLmnpznrYnlvoXorqHnrpfpobnkuK3lrZjlnKjor6XnuqLngrnvvIzliJnliKDpmaRcclxuICAgICAgbGV0IGNoZWNrSW5kZXggPSB0aGlzLl93YWl0Q2hlY2tzLmluZGV4T2YocnAubWFzayk7XHJcbiAgICAgIGlmIChjaGVja0luZGV4ICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICB0aGlzLl93YWl0Q2hlY2tzLnNwbGljZShjaGVja0luZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgICAvLyDlpoLmnpzlvZPliY3nmoTlgLzkuLp0cnVl77yM5YiZ5LiN6ZyA6KaB5pu05pawXHJcbiAgICAgIGlmICh0aGlzLl9yZWRQb2ludE1hc2suZ2V0KHJwLm1hc2spKSByZXR1cm47XHJcbiAgICAgIHRoaXMuX3JlZFBvaW50TWFzay5zZXQocnAubWFzaywgcnAudmFsdWUpO1xyXG4gICAgICAvLyDmm7TmlrDmm7TmlrDlvoXmjqjpgIHnmoTnuqLngrlcclxuICAgICAgaWYgKHRoaXMuX3dhaXRTZW5kcy5pbmRleE9mKHJwLm1hc2spICE9IElOVkFMSURfVkFMVUUpIHJldHVybjtcclxuICAgICAgdGhpcy5fd2FpdFNlbmRzLnB1c2gocnAubWFzayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAocnAuZm9yY2VTdG9wID09IHRydWUpIHtcclxuICAgICAgICBsZXQgY2hlY2tJbmRleCA9IHRoaXMuX3dhaXRDaGVja3MuaW5kZXhPZihycC5tYXNrKTtcclxuICAgICAgICBpZiAoY2hlY2tJbmRleCAhPSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgICB0aGlzLl93YWl0Q2hlY2tzLnNwbGljZShjaGVja0luZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVkUG9pbnRNYXNrLnNldChycC5tYXNrLCBycC52YWx1ZSk7XHJcbiAgICAgICAgLy8g5pu05paw5pu05paw5b6F5o6o6YCB55qE57qi54K5XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhaXRTZW5kcy5pbmRleE9mKHJwLm1hc2spICE9IElOVkFMSURfVkFMVUUpIHJldHVybjtcclxuICAgICAgICB0aGlzLl93YWl0U2VuZHMucHVzaChycC5tYXNrKTtcclxuICAgICAgfVxyXG4gICAgICAvLyDph43mlrDmo4DmtYvnuqLngrnnmoTlgLxcclxuICAgICAgLy8g5aaC5p6c5b2T5YmN5b6F5qOA5rWL5YiX6KGo5Lit5a2Y5Zyo6K+l5p6a5Li+77yM562J5b6F5qOA5rWL77yM5ZCm5YiZ5Yqg5YWl5b6F5qOA5rWL5YiX6KGoXHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuX3dhaXRDaGVja3MuaW5kZXhPZihycC5tYXNrKSA9PSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgdGhpcy5fd2FpdENoZWNrcy5wdXNoKHJwLm1hc2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoZWNrU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzdGFydFVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLl91cGRhdGVIYW5kbGVyICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdXBkYXRlSGFuZGxlciA9IHNldEludGVydmFsKHRoaXMudXBkYXRlLmJpbmQodGhpcyksIDEwMCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHN0b3BVcGRhdGUoKSB7XHJcbiAgICBpZiAoSU5WQUxJRF9WQUxVRSA9PSB0aGlzLl91cGRhdGVIYW5kbGVyKSByZXR1cm47XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuX3VwZGF0ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5fdXBkYXRlSGFuZGxlciA9IElOVkFMSURfVkFMVUU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2hlY2tTdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLl93YWl0Q2hlY2tzLmxlbmd0aCA+IDAgfHwgdGhpcy5fd2FpdFNlbmRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKHRoaXMuX3VwZGF0ZUhhbmRsZXIgPT0gSU5WQUxJRF9WQUxVRSkgdGhpcy5zdGFydFVwZGF0ZSgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl93YWl0Q2hlY2tzLmxlbmd0aCA9PSAwICYmIHRoaXMuX3dhaXRTZW5kcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICBpZiAodGhpcy5fdXBkYXRlSGFuZGxlciAhPSBJTlZBTElEX1ZBTFVFKSB0aGlzLnN0b3BVcGRhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKuabtOaWsOeKtuaAgSAqL1xyXG4gIHByb3RlY3RlZCB1cGRhdGVDaGVjaygpIHtcclxuICAgIGlmICh0aGlzLl93YWl0Q2hlY2tzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICBsZXQgbWFzayA9IHRoaXMuX3dhaXRDaGVja3Muc2hpZnQoKTtcclxuICAgIGxldCB2YWx1ZSA9IHRydWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdmFsdWUgPSBmYWxzZTtcclxuICAgICAgc3dpdGNoIChtYXNrKSB7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3JlZFBvaW50TWFzay5nZXQobWFzaykgPT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX3JlZFBvaW50TWFzay5zZXQobWFzaywgdmFsdWUpO1xyXG4gICAgLy8g5pu05paw5pu05paw5b6F5o6o6YCB55qE57qi54K5XHJcbiAgICBpZiAodGhpcy5fd2FpdFNlbmRzLmluZGV4T2YobWFzaykgIT0gSU5WQUxJRF9WQUxVRSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fd2FpdFNlbmRzLnB1c2gobWFzayk7XHJcbiAgfVxyXG5cclxuICAvKirooajnjrDmm7TmlrAgKi9cclxuICBwcm90ZWN0ZWQgdXBkYXRlVmlzaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fd2FpdFNlbmRzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICBsZXQgbWFzayA9IHRoaXMuX3dhaXRTZW5kcy5zaGlmdCgpO1xyXG4gICAgbGV0IG1hc2tfdmFsdWUgPSB0aGlzLl9yZWRQb2ludE1hc2suZ2V0KG1hc2spO1xyXG5cclxuICAgIC8vIOWPluWHuuaJgOaciemcgOimgeWPmOabtOeahOiKgueCuVxyXG4gICAgbGV0IG1hc2tJdGVyID0gdGhpcy5fbWFza3MuZ2V0KG1hc2spO1xyXG4gICAgaWYgKCFtYXNrSXRlciB8fCBtYXNrSXRlci5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgZm9yIChsZXQgb2JqIG9mIG1hc2tJdGVyKSB7XHJcbiAgICAgIGxldCB0YXJnZXRJdCA9IHRoaXMuX3RhcmdldHMuZ2V0KG9iai51dWlkKTtcclxuICAgICAgaWYgKCF0YXJnZXRJdCkgcmV0dXJuO1xyXG4gICAgICBmb3IgKGxldCBub2RlIG9mIHRhcmdldEl0KSB7XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUubWFzay5pbmRleE9mKG1hc2spID09IElOVkFMSURfVkFMVUUpIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmIChtYXNrX3ZhbHVlID09IHRydWUpXHJcbiAgICAgICAgICB0aGlzLnNldFJQb2ludFZpZXcoXHJcbiAgICAgICAgICAgIG9iaixcclxuICAgICAgICAgICAgbm9kZS5zdWJQYXRoLFxyXG4gICAgICAgICAgICBtYXNrX3ZhbHVlLFxyXG4gICAgICAgICAgICBub2RlLmVmZmVjdFR5cGUsXHJcbiAgICAgICAgICAgIG5vZGUucG9zVHlwZSxcclxuICAgICAgICAgICAgbm9kZS5jYlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIOWmguaenOS4umZhbHNl5YiZ6ZyA6KaB5Y+W57uE5ZCI5YC8XHJcbiAgICAgICAgICBsZXQgdmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgIGZvciAobGV0IGNNYXNrIG9mIG5vZGUubWFzaykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVkUG9pbnRNYXNrLmdldChjTWFzaykpIHtcclxuICAgICAgICAgICAgICB2YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2V0UlBvaW50VmlldyhcclxuICAgICAgICAgICAgb2JqLFxyXG4gICAgICAgICAgICBub2RlLnN1YlBhdGgsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBub2RlLmVmZmVjdFR5cGUsXHJcbiAgICAgICAgICAgIG5vZGUucG9zVHlwZSxcclxuICAgICAgICAgICAgbm9kZS5jYlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRSUG9pbnRWaWV3KFxyXG4gICAgcGFyZW50OiBjYy5Ob2RlLFxyXG4gICAgc3ViUGF0aDogc3RyaW5nIHwgY2MuTm9kZSxcclxuICAgIHZhbHVlOiBib29sZWFuLFxyXG4gICAgZWZmZWN0VHlwZT86IG51bWJlcixcclxuICAgIHBvc1R5cGU/OiBudW1iZXIsXHJcbiAgICBjYj86IGFueVxyXG4gICkge1xyXG4gICAgbGV0IG5vZGUgPSBwYXJlbnQ7XHJcbiAgICBpZiAoc3ViUGF0aCkge1xyXG4gICAgICBpZiAodHlwZW9mIHN1YlBhdGggPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIG5vZGUgPSBjYy5maW5kKHN1YlBhdGgsIHBhcmVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZSA9IHN1YlBhdGg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgc3dpdGNoIChlZmZlY3RUeXBlKSB7XHJcbiAgICAgIGNhc2UgUmVkcG9pbnRFZmZlY3QuQkxJTkc6IHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgIGNjXHJcbiAgICAgICAgICAgICAgICAudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC50bygxLCB7IG9wYWNpdHk6IDI1NSAqIDAuMiB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDEsIHsgb3BhY2l0eTogMjU1IH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgUmVkcG9pbnRFZmZlY3QuUlVOTklORzoge1xyXG4gICAgICAgIGxldCBhbmlOb2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShSRURfUE9JTlRfTkFNRSk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKGFuaU5vZGUpIGFuaU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChhbmlOb2RlKSB7XHJcbiAgICAgICAgICAgIGFuaU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHTG9hZGVyLmxvYWRKWEFuaUNsaXBzKFxyXG4gICAgICAgICAgXCJhbmlzL2ZyYW1lcy9idG5BbmlcIixcclxuICAgICAgICAgIChjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYW5pID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgYW5pLnkgPSAxMi41O1xyXG4gICAgICAgICAgICBhbmkubmFtZSA9IFJFRF9QT0lOVF9OQU1FO1xyXG4gICAgICAgICAgICBhbmkuc2V0QW5jaG9yUG9pbnQoY2MudjIoMC41LCAwLjUpKTtcclxuICAgICAgICAgICAgYW5pLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBsZXQgYW5pU3AgPSBhbmkuYWRkQ29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBhbmlTcC5hZGRDbGlwKGNsaXBzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLmFkZENoaWxkKGFuaSk7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBhbmlTcC5wbGF5KFwiZWZmZWN0XCIpO1xyXG4gICAgICAgICAgICBhbmltYXRpb24ud3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Mb29wO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYW5pTmFtZTogXCJlZmZlY3RcIixcclxuICAgICAgICAgICAgcHJlZml4OiBcImFubml1XCIsXHJcbiAgICAgICAgICAgIG1heElkeDogOCxcclxuICAgICAgICAgICAgbWluSWR4OiAzLFxyXG4gICAgICAgICAgICBudW1iZXJGaXg6IDQsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFJlZHBvaW50RWZmZWN0LlJFRFBPSU5UOiB7XHJcbiAgICAgICAgbGV0IHB0ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShSRURfUE9JTlRfTkFNRSk7XHJcbiAgICAgICAgaWYgKCFwdCkge1xyXG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgLy8gcHQgPSBVSUNyZWF0ZS5hbHRzU3ByaXRlKHsgcGF0aDogUmVzLnRleHR1cmUudmlld3MuY29tbW9uLCBzdWI6IFwicmVkUG9pbnRcIiwgYXBsOiBHTG9hZGVyIH0pLm5vZGU7XHJcbiAgICAgICAgICBwdC5uYW1lID0gUkVEX1BPSU5UX05BTUU7XHJcbiAgICAgICAgICBwdC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgcHQuekluZGV4ID0gTUFYX1RBRztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHQucG9zaXRpb24gPSBjYy52MyhcclxuICAgICAgICAgIG5vZGUud2lkdGggKiAoMSAtIG5vZGUuYW5jaG9yWCkgLSA1LFxyXG4gICAgICAgICAgbm9kZS5oZWlnaHQgKiAoMSAtIG5vZGUuYW5jaG9yWSkgLSA1XHJcbiAgICAgICAgKTtcclxuICAgICAgICBwdC5hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2IgJiYgY2Iobm9kZSk7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5bor6XoioLngrnnuqLngrnlupTlpITkuo7nmoTnirbmgIEgKi9cclxuICBwdWJsaWMgZ2V0TWFza1JlZHBvaW50U3RhdGUobWFza3M6IG51bWJlcltdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3JlZFBvaW50TWFzay5nZXQobWFza3NbaV0pO1xyXG4gICAgICBpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19