"use strict";
cc._RF.push(module, '3af50x51kVPDLXsU0E9Xk88', 'ConditionListener');
// Script/Game/Logic/ConditionListener.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.convertConditions = exports.convertCondition = exports.ConditionEmitter = exports.ConditionListter = void 0;
var CoreDefine_1 = require("../../Core/CoreDefine");
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../Core/GCtrl");
/** 条件监听者 */
var ConditionListter = /** @class */ (function (_super) {
    __extends(ConditionListter, _super);
    function ConditionListter() {
        var _this = _super.call(this) || this;
        /** 条件依赖的发射器 */
        _this._emitters = [];
        _this._curState = false;
        /** 是否初始化完成, 目前用来阻止发送局部条件信息 */
        _this._inited = false;
        _this._emitCbs = [];
        return _this;
    }
    ConditionListter.prototype.addCallBack = function (callback) {
        this._emitCbs = this._emitCbs || [];
        this._emitCbs.push(callback);
    };
    ConditionListter.prototype.getInitedState = function () { return this._inited; };
    ConditionListter.prototype.inited = function () {
        this._inited = true;
    };
    ConditionListter.prototype.addEmitter = function (emitter) {
        // 默认置为false
        this._curState = false;
        if (!this._emitters)
            this._emitters = [];
        this._emitters.push(emitter);
        emitter.start();
    };
    ConditionListter.prototype.removeEmitter = function (emitter) {
        if (!this._emitters)
            return;
        var index = this._emitters.indexOf(emitter);
        if (index == CoreDefine_1.INVALID_VALUE)
            return;
        this._emitters.splice(index, 1);
        this.onConditionChange(emitter, true);
    };
    Object.defineProperty(ConditionListter.prototype, "cureState", {
        /** 判断当前监听器是否满足条件 */
        get: function () {
            return this._curState;
        },
        enumerable: false,
        configurable: true
    });
    /** 环境变更回调 */
    ConditionListter.prototype.onConditionChange = function (emitter, isActive) {
        if (isActive && !this._curState) {
            var state = true;
            for (var i = 0; i < this._emitters.length; i++) {
                state = state && this._emitters[i].curState;
                if (!state) {
                    state = false;
                    break;
                }
            }
            if (!state)
                return;
            this._curState = true;
            // emit open event!
            if (!this._inited)
                return;
            this.emitConditionEnvChange(emitter);
        }
        else {
            if (!isActive && this._curState) {
                this._curState = false;
                if (!this._inited)
                    return;
                this.emitConditionEnvChange(emitter);
            }
        }
    };
    /**
     * 结果变更事件
     * @param emitter 触发变更的条件
     */
    ConditionListter.prototype.emitConditionEnvChange = function (emitter) {
        for (var i = 0, c = this._emitCbs || []; i < c.length; i++) {
            this._emitCbs[i](emitter);
        }
    };
    /** 未达成状态提示 */
    ConditionListter.prototype.toast = function () {
        for (var i = 0; i < this._emitters.length; i++) {
            var emitter = this._emitters[i];
            if (emitter.curState)
                continue;
            emitter.toast();
            return;
        }
    };
    /** 指引达成条件 */
    ConditionListter.prototype.guide = function () {
        for (var i = 0; i < this._emitters.length; i++) {
            var emitter = this._emitters[i];
            if (emitter.curState)
                continue;
            emitter.guide();
            return;
        }
    };
    ConditionListter.prototype.destroy = function () {
        while (this._emitters.length > 0) {
            var emitter = this._emitters.pop();
            emitter.destroy();
            emitter = null;
        }
        this._emitters = null;
        this._inited = false;
    };
    return ConditionListter;
}(ES5Ex_1.ObjectWrap));
exports.ConditionListter = ConditionListter;
/** 条件变更发射器 */
var ConditionEmitter = /** @class */ (function (_super) {
    __extends(ConditionEmitter, _super);
    function ConditionEmitter(lister) {
        var _this = _super.call(this) || this;
        /** 当前检测状态 */
        _this._curState = false;
        _this._listener = lister;
        return _this;
    }
    /** 初始化事件 */
    ConditionEmitter.prototype.initEvent = function () {
    };
    /** 移除事件 */
    ConditionEmitter.prototype.unEvent = function () {
        GCtrl_1.GCtrl.ES.off(this);
    };
    /** 初始化当前状态 */
    ConditionEmitter.prototype.initState = function () {
    };
    /** 开始工作 */
    ConditionEmitter.prototype.start = function () {
        this.initState();
        this.initEvent();
    };
    Object.defineProperty(ConditionEmitter.prototype, "curState", {
        get: function () {
            return this._curState;
        },
        enumerable: false,
        configurable: true
    });
    ConditionEmitter.prototype.toast = function () {
        return false;
    };
    ConditionEmitter.prototype.guide = function () {
        return false;
    };
    ConditionEmitter.prototype.destroy = function () {
        this.unEvent();
        this._listener = null;
    };
    return ConditionEmitter;
}(ES5Ex_1.ObjectWrap));
exports.ConditionEmitter = ConditionEmitter;
/** 解析条件配置数据当前可配置的内容为下

 */
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["NONE"] = 0] = "NONE";
})(ConditionType || (ConditionType = {}));
function convertCondition(condition, listener) {
    var type = condition[0];
    switch (type) {
    }
    return null;
}
exports.convertCondition = convertCondition;
function convertConditions(conditions, listener) {
    var ret = [];
    for (var i = 0; i < conditions.length; i++) {
        var condition = convertCondition(conditions[i], listener);
        if (condition)
            ret.push(condition);
    }
    return ret;
}
exports.convertConditions = convertConditions;

cc._RF.pop();