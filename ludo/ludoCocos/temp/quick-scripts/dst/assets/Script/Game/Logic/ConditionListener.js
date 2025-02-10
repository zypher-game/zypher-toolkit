
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/ConditionListener.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9Db25kaXRpb25MaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzRDtBQUN0RCxrREFBc0Q7QUFDdEQsMENBQXlDO0FBRXpDLFlBQVk7QUFDWjtJQUFzQyxvQ0FBVTtJQWlCNUM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFsQkQsZUFBZTtRQUNMLGVBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDckMsOEJBQThCO1FBQ3BCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsY0FBUSxHQUE0QyxFQUFFLENBQUM7O0lBWWpFLENBQUM7SUFYTSxzQ0FBVyxHQUFsQixVQUFtQixRQUErQztRQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx5Q0FBYyxHQUFyQixjQUEwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDO0lBQ3hDLGlDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBS0QscUNBQVUsR0FBVixVQUFXLE9BQXlCO1FBQ2hDLFlBQVk7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLHdDQUFhLEdBQXBCLFVBQXFCLE9BQXlCO1FBQzFDLElBQUksQ0FBQyxJQUFJLENB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QVo7UUFDSSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsa0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDTCx1QkFBQztBQUFELENBL0NBLEFBK0NDLENBL0NxQyxrQkFBVSxHQStDL0M7QUEvQ1ksNENBQWdCO0FBaUQ3Qjs7R0FFRztBQUNILElBQUssYUFHSjtBQUhELFdBQUssYUFBYTtJQUNkLGlEQUFJLENBQUE7QUFFUixDQUFDLEVBSEksYUFBYSxLQUFiLGFBQWEsUUFHakI7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxTQUFnQixFQUFFLFFBQTBCO0lBQ3pFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixRQUFRLElBQUksRUFBRTtLQUViO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQU5ELDRDQU1DO0FBQ0QsU0FBZ0IsaUJBQWlCLENBQUMsVUFBaUIsRUFBRSxRQUEwQjtJQUMzRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUQsSUFBSSxTQUFTO1lBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMzQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVJELDhDQVFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSB9IGZyb20gXCIuLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IHsgT2JqZWN0V3JhcCB9IGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vLi4vQ29yZS9HQ3RybFwiO1xyXG5cclxuLyoqIOadoeS7tuebkeWQrOiAhSAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uTGlzdHRlciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gICAgLyoqIOadoeS7tuS+nei1lueahOWPkeWwhOWZqCAqL1xyXG4gICAgcHJvdGVjdGVkIF9lbWl0dGVyczogQ29uZGl0aW9uRW1pdHRlcltdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX2N1clN0YXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5Yid5aeL5YyW5a6M5oiQLCDnm67liY3nlKjmnaXpmLvmraLlj5HpgIHlsYDpg6jmnaHku7bkv6Hmga8gKi9cclxuICAgIHByb3RlY3RlZCBfaW5pdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9lbWl0Q2JzOiB7IChlbWl0dGVyOiBDb25kaXRpb25FbWl0dGVyKTogdm9pZCB9W10gPSBbXTtcclxuICAgIHB1YmxpYyBhZGRDYWxsQmFjayhjYWxsYmFjazogeyAoZW1pdHRlcjogQ29uZGl0aW9uRW1pdHRlcik6IHZvaWQgfSkge1xyXG4gICAgICAgIHRoaXMuX2VtaXRDYnMgPSB0aGlzLl9lbWl0Q2JzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2VtaXRDYnMucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluaXRlZFN0YXRlKCkgeyByZXR1cm4gdGhpcy5faW5pdGVkIH1cclxuICAgIHB1YmxpYyBpbml0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRW1pdHRlcihlbWl0dGVyOiBDb25kaXRpb25FbWl0dGVyKSB7XHJcbiAgICAgICAgLy8g6buY6K6k572u5Li6ZmFsc2VcclxuICAgICAgICB0aGlzLl9jdXJTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5fZW1pdHRlcnMpIHRoaXMuX2VtaXR0ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcclxuICAgICAgICBlbWl0dGVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcjogQ29uZGl0aW9uRW1pdHRlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5fZW1pdHRlcnMpIHJldHVybjtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSBJTlZBTElEX1ZBTFVFKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fZW1pdHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLm9uQ29uZGl0aW9uQ2hhbmdlKGVtaXR0ZXIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDliKTmlq3lvZPliY3nm5HlkKzlmajmmK/lkKbmu6HotrPmnaHku7YgKi9cclxuICAgIHB1YmxpYyBnZXQgY3VyZVN0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog546v5aKD5Y+Y5pu05Zue6LCDICovXHJcbiAgICBwdWJsaWMgb25Db25kaXRpb25DaGFuZ2UoZW1pdHRlcjogQ29uZGl0aW9uRW1pdHRlciwgaXNBY3RpdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNBY3RpdmUgJiYgIXRoaXMuX2N1clN0YXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGUgJiYgdGhpcy5fZW1pdHRlcnNbaV0uY3VyU3RhdGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0YXRlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gZW1pdCBvcGVuIGV2ZW50IVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRDb25kaXRpb25FbnZDaGFuZ2UoZW1pdHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlICYmIHRoaXMuX2N1clN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdENvbmRpdGlvbkVudkNoYW5nZShlbWl0dGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+aenOWPmOabtOS6i+S7tlxyXG4gICAgICogQHBhcmFtIGVtaXR0ZXIg6Kem5Y+R5Y+Y5pu055qE5p2h5Lu2XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBlbWl0Q29uZGl0aW9uRW52Q2hhbmdlKGVtaXR0ZXI6IENvbmRpdGlvbkVtaXR0ZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMuX2VtaXRDYnMgfHwgW107IGkgPCBjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VtaXRDYnNbaV0oZW1pdHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmnKrovr7miJDnirbmgIHmj5DnpLogKi9cclxuICAgIHB1YmxpYyB0b2FzdCgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VtaXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyLmN1clN0YXRlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZW1pdHRlci50b2FzdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmjIflvJXovr7miJDmnaHku7YgKi9cclxuICAgIHB1YmxpYyBndWlkZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VtaXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyLmN1clN0YXRlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZW1pdHRlci5ndWlkZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9lbWl0dGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlcnMucG9wKCk7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBlbWl0dGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW1pdHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqIOadoeS7tuWPmOabtOWPkeWwhOWZqCAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uRW1pdHRlciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gICAgLyoqIOS4muS4uyAqL1xyXG4gICAgcHJvdGVjdGVkIF9saXN0ZW5lcjogQ29uZGl0aW9uTGlzdHRlcjtcclxuICAgIC8qKiDlvZPliY3mo4DmtYvnirbmgIEgKi9cclxuICAgIHByb3RlY3RlZCBfY3VyU3RhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKGxpc3RlcjogQ29uZGl0aW9uTGlzdHRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBsaXN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWIneWni+WMluS6i+S7tiAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRFdmVudCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOenu+mZpOS6i+S7tiAqL1xyXG4gICAgcHJvdGVjdGVkIHVuRXZlbnQoKSB7XHJcbiAgICAgICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDliJ3lp4vljJblvZPliY3nirbmgIEgKi9cclxuICAgIHByb3RlY3RlZCBpbml0U3RhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvIDlp4vlt6XkvZwgKi9cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1clN0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9hc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBndWlkZSgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuRXZlbnQoKTtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lciA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiDop6PmnpDmnaHku7bphY3nva7mlbDmja7lvZPliY3lj6/phY3nva7nmoTlhoXlrrnkuLrkuItcclxuXHJcbiAqL1xyXG5lbnVtIENvbmRpdGlvblR5cGUge1xyXG4gICAgTk9ORSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Q29uZGl0aW9uKGNvbmRpdGlvbjogYW55W10sIGxpc3RlbmVyOiBDb25kaXRpb25MaXN0dGVyKTogQ29uZGl0aW9uRW1pdHRlciB7XHJcbiAgICBsZXQgdHlwZSA9IGNvbmRpdGlvblswXTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Q29uZGl0aW9ucyhjb25kaXRpb25zOiBhbnlbXSwgbGlzdGVuZXI6IENvbmRpdGlvbkxpc3R0ZXIpOiBDb25kaXRpb25FbWl0dGVyW10ge1xyXG4gICAgbGV0IHJldCA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25kaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IGNvbnZlcnRDb25kaXRpb24oY29uZGl0aW9uc1tpXSwgbGlzdGVuZXIpO1xyXG4gICAgICAgIGlmIChjb25kaXRpb24pXHJcbiAgICAgICAgICAgIHJldC5wdXNoKGNvbmRpdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG4iXX0=