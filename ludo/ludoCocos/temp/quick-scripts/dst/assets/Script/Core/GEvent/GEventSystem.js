
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GEvent/GEventSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f825nx5/ZMCanCTPg19K3J', 'GEventSystem');
// Script/Core/GEvent/GEventSystem.ts

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
/**
 * @name GEventSystem.ts
 * @author  Visow
 * @description 事件派发系统
 * @class GEventSystem
 */
var Default_PRIORITY = 99999; // 默认优先级, 数值越大，级别越低
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GEventSystem = /** @class */ (function (_super) {
    __extends(GEventSystem, _super);
    function GEventSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // constructor() {
        //     super();
        //     if(GEventSystem._instance) {
        //         throw new Error('This single case has already existed!');
        //     }
        // }
        /***********************************************************/
        _this.eventMap = new ES5Ex_1.MapWrap(); // Map<msgKey, event Array>;
        _this._objectMap = new ES5Ex_1.MapWrap(); // 对象存储容器
        _this.objectMap = new ES5Ex_1.MapWrap(); // Map<target, event Array>; 事件存储容器
        return _this;
    }
    /**
     * 事件单例
     */
    GEventSystem.ins = function () {
        if (!this._instance) {
            this._instance = new GEventSystem();
        }
        return this._instance;
    };
    GEventSystem.createNew = function () {
        return new GEventSystem();
    };
    /**
     * 监听消息
     * @param msgID 消息ID
     * @param obj 目标
     * @param handler 毁掉
     * @param priority 优先级
     */
    GEventSystem.on = function (msgID, obj, handler, priority) {
        var ins = GEventSystem.ins();
        ins.register(msgID, obj, handler, priority);
    };
    /**
     * 推送消息
     * @param msgID 消息ID
     * @param param 参数
     */
    GEventSystem.emit = function (msgID, param) {
        var ins = GEventSystem.ins();
        ins.post(msgID, param);
    };
    /**
     * 注销监听
     * @param obj 对象
     */
    GEventSystem.off = function (obj, msgID) {
        var ins = GEventSystem.ins();
        ins.unRegister(obj, msgID);
    };
    /**
     *
     * @param msgID 消息ID
     * @param obj 对象
     */
    GEventSystem.prototype.checkEvent = function (msgID, obj) {
        if (!this.eventMap.get(msgID))
            return false;
        var listCallBack = this.eventMap.get(msgID);
        for (var i = 0; i < listCallBack.length; i++) {
            if (listCallBack[i].target == obj)
                return true;
        }
        return false;
    };
    GEventSystem.prototype.wrapKey = function (obj) {
        if (obj instanceof ES5Ex_1.ObjectWrap) {
            return obj.wrapId;
        }
        else
            return obj.uuid;
    };
    /**
     * 移除某一条事件的监听
     * @param msgID 消息ID
     * @param obj 对象
     */
    GEventSystem.prototype.removeByEventMap = function (msgID, obj) {
        var listCallBack = this.eventMap.get(msgID);
        if (!listCallBack)
            return true;
        var callBack = null;
        for (var i = 0; i < listCallBack.length; i++) {
            if (listCallBack[i].target == obj) {
                callBack = listCallBack[i];
                break;
            }
        }
        if (!callBack) {
            cc.warn("Trying to remove non - existent events by events map");
            return false;
        }
        listCallBack.splice(i, 1);
        listCallBack = this.objectMap.get(this.wrapKey(obj));
        if (!listCallBack) {
            cc.warn("Trying to remove non - existent events by objects map");
            return false;
        }
        for (var j = 0; j < listCallBack.length; j++) {
            if (listCallBack[j].msgID == msgID) {
                listCallBack.splice(j, 1);
                break;
            }
        }
        return true;
    };
    /**
     * 移除对象的监听
     * @param obj 对象
     */
    GEventSystem.prototype.removeByObjectMap = function (obj) {
        var wrapKey = this.wrapKey(obj);
        var listCallBack = this.objectMap.get(wrapKey);
        if (!listCallBack)
            return;
        for (var i = listCallBack.length - 1; listCallBack.length > 0; i--) {
            var callBack = listCallBack[i];
            if (!this.eventMap.get(callBack.msgID))
                continue;
            var events = this.eventMap.get(callBack.msgID);
            for (var j = 0; j < events.length; j++) {
                if (events[j].target == obj) {
                    events.splice(j, 1);
                    break;
                }
            }
            listCallBack.splice(i, 1);
        }
        this._objectMap.delete(wrapKey);
        this.objectMap.delete(wrapKey);
        return true;
    };
    /**
     * 注册消息
     * @param msgID 消息ID
     * @param obj 对象
     * @param handler 回掉函数
     * @param priority 优先级
     */
    GEventSystem.prototype.register = function (msgID, obj, handler, priority) {
        if (this.checkEvent(msgID, obj)) {
            cc.warn("the object and msgID has beed registered!" + this.wrapKey(obj));
            return false;
        }
        // push to event map;
        var callBack = {
            target: obj,
            handler: handler,
            msgID: msgID,
            priority: priority ? priority : Default_PRIORITY,
        };
        var listCallBack = null;
        listCallBack = this.eventMap.get(msgID);
        if (listCallBack == null) {
            listCallBack = new Array();
            this.eventMap.set(msgID, listCallBack);
        }
        listCallBack.push(callBack);
        // sort by priority;
        listCallBack.sort(function (a, b) {
            return a.priority - b.priority;
        });
        //push to object map;
        var wrapKey = this.wrapKey(obj);
        listCallBack = this.objectMap.get(wrapKey);
        if (!listCallBack) {
            listCallBack = new Array();
            this.objectMap.set(wrapKey, listCallBack);
            this._objectMap.set(wrapKey, obj);
        }
        listCallBack.push(callBack);
        return true;
    };
    /**
     * 注销事件
     * @param obj 对象
     * @param msgID 消息ID
     */
    GEventSystem.prototype.unRegister = function (obj, msgID) {
        if (msgID) {
            return this.removeByEventMap(msgID, obj);
        }
        return this.removeByObjectMap(obj);
    };
    /**
     * 推送消息
     * @param msgID 消息ID
     * @param param 参数
     */
    GEventSystem.prototype.post = function (msgID, param) {
        var listCallBack = this.eventMap.get(msgID);
        if (!listCallBack)
            return;
        listCallBack.forEach(function (callBack) {
            callBack.handler(callBack.target, param);
        });
    };
    GEventSystem._instance = null;
    return GEventSystem;
}(ES5Ex_1.ObjectWrap));
exports.default = GEventSystem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HRXZlbnQvR0V2ZW50U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztHQUtHO0FBQ0gsSUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxtQkFBbUI7QUFFbkQsMENBQXVEO0FBV3ZEO0lBQTBDLGdDQUFVO0lBQXBEO1FBQUEscUVBcU9DO1FBakxDLGtCQUFrQjtRQUNsQixlQUFlO1FBQ2YsbUNBQW1DO1FBQ25DLG9FQUFvRTtRQUNwRSxRQUFRO1FBQ1IsSUFBSTtRQUVKLDZEQUE2RDtRQUNuRCxjQUFRLEdBQXlDLElBQUksZUFBTyxFQUduRSxDQUFDLENBQUMsNEJBQTRCO1FBQ3ZCLGdCQUFVLEdBQXlDLElBQUksZUFBTyxFQUdyRSxDQUFDLENBQUMsU0FBUztRQUNKLGVBQVMsR0FBeUMsSUFBSSxlQUFPLEVBR3BFLENBQUMsQ0FBQyxtQ0FBbUM7O0lBOEoxQyxDQUFDO0lBbk9DOztPQUVHO0lBQ1csZ0JBQUcsR0FBakI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVhLHNCQUFTLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyxlQUFFLEdBQWhCLFVBQ0UsS0FBcUIsRUFDckIsR0FBZ0IsRUFDaEIsT0FBWSxFQUNaLFFBQWlCO1FBRWpCLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztP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bnRTeXN0ZW0udHNcclxuICogQGF1dGhvciAgVmlzb3dcclxuICogQGRlc2NyaXB0aW9uIOS6i+S7tua0vuWPkeezu+e7n1xyXG4gKiBAY2xhc3MgR0V2ZW50U3lzdGVtXHJcbiAqL1xyXG5jb25zdCBEZWZhdWx0X1BSSU9SSVRZID0gOTk5OTk7IC8vIOm7mOiupOS8mOWFiOe6pywg5pWw5YC86LaK5aSn77yM57qn5Yir6LaK5L2OXHJcblxyXG5pbXBvcnQgeyBNYXBXcmFwLCBPYmplY3RXcmFwIH0gZnJvbSBcIi4uL0ZyYW1lRXgvRVM1RXhcIjtcclxuXHJcbmRlY2xhcmUgdHlwZSBFdmVudE9iamVjdCA9IE9iamVjdFdyYXAgfCBjYy5Ob2RlIHwgY2MuQ29tcG9uZW50O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHQ2FsbEJhY2sge1xyXG4gIHRhcmdldD86IE9iamVjdDtcclxuICBoYW5kbGVyPzogYW55OyAvLyDkuovku7bop6blj5Hlh73mlbDvvIzpnIDopoFiaW5k5LiK5LiL5paH77yM55uu55qE5piv5Li65LqG6Kej6ICm5Ye95pWw5a+56LGh5ZKM5rOo5YaM5a+56LGh44CCXHJcbiAgbXNnSUQ/OiBTdHJpbmdPck51bWJlcjtcclxuICBwcmlvcml0eT86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0V2ZW50U3lzdGVtIGV4dGVuZHMgT2JqZWN0V3JhcCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHRXZlbnRTeXN0ZW0gPSBudWxsO1xyXG4gIC8qKlxyXG4gICAqIOS6i+S7tuWNleS+i1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5zKCk6IEdFdmVudFN5c3RlbSB7XHJcbiAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEdFdmVudFN5c3RlbSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVOZXcoKSB7XHJcbiAgICByZXR1cm4gbmV3IEdFdmVudFN5c3RlbSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5raI5oGvXHJcbiAgICogQHBhcmFtIG1zZ0lEIOa2iOaBr0lEXHJcbiAgICogQHBhcmFtIG9iaiDnm67moIdcclxuICAgKiBAcGFyYW0gaGFuZGxlciDmr4HmjolcclxuICAgKiBAcGFyYW0gcHJpb3JpdHkg5LyY5YWI57qnXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBvbihcclxuICAgIG1zZ0lEOiBTdHJpbmdPck51bWJlcixcclxuICAgIG9iajogRXZlbnRPYmplY3QsXHJcbiAgICBoYW5kbGVyOiBhbnksXHJcbiAgICBwcmlvcml0eT86IG51bWJlclxyXG4gICkge1xyXG4gICAgbGV0IGlucyA9IEdFdmVudFN5c3RlbS5pbnMoKTtcclxuICAgIGlucy5yZWdpc3Rlcihtc2dJRCwgb2JqLCBoYW5kbGVyLCBwcmlvcml0eSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjqjpgIHmtojmga9cclxuICAgKiBAcGFyYW0gbXNnSUQg5raI5oGvSURcclxuICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWwXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBlbWl0KG1zZ0lEOiBTdHJpbmdPck51bWJlciwgcGFyYW0/OiBhbnkpIHtcclxuICAgIGxldCBpbnMgPSBHRXZlbnRTeXN0ZW0uaW5zKCk7XHJcbiAgICBpbnMucG9zdChtc2dJRCwgcGFyYW0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5rOo6ZSA55uR5ZCsXHJcbiAgICogQHBhcmFtIG9iaiDlr7nosaFcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIG9mZihvYmo6IEV2ZW50T2JqZWN0LCBtc2dJRD86IFN0cmluZ09yTnVtYmVyKSB7XHJcbiAgICBsZXQgaW5zID0gR0V2ZW50U3lzdGVtLmlucygpO1xyXG4gICAgaW5zLnVuUmVnaXN0ZXIob2JqLCBtc2dJRCk7XHJcbiAgfVxyXG5cclxuICAvLyBjb25zdHJ1Y3RvcigpIHtcclxuICAvLyAgICAgc3VwZXIoKTtcclxuICAvLyAgICAgaWYoR0V2ZW50U3lzdGVtLl9pbnN0YW5jZSkge1xyXG4gIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHNpbmdsZSBjYXNlIGhhcyBhbHJlYWR5IGV4aXN0ZWQhJyk7XHJcbiAgLy8gICAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICBwcm90ZWN0ZWQgZXZlbnRNYXA6IE1hcFdyYXA8U3RyaW5nT3JOdW1iZXIsIEdDYWxsQmFja1tdPiA9IG5ldyBNYXBXcmFwPFxyXG4gICAgU3RyaW5nT3JOdW1iZXIsXHJcbiAgICBHQ2FsbEJhY2tbXVxyXG4gID4oKTsgLy8gTWFwPG1zZ0tleSwgZXZlbnQgQXJyYXk+O1xyXG4gIHByb3RlY3RlZCBfb2JqZWN0TWFwOiBNYXBXcmFwPFN0cmluZ09yTnVtYmVyLCBFdmVudE9iamVjdD4gPSBuZXcgTWFwV3JhcDxcclxuICAgIFN0cmluZ09yTnVtYmVyLFxyXG4gICAgRXZlbnRPYmplY3RcclxuICA+KCk7IC8vIOWvueixoeWtmOWCqOWuueWZqFxyXG4gIHByb3RlY3RlZCBvYmplY3RNYXA6IE1hcFdyYXA8U3RyaW5nT3JOdW1iZXIsIEdDYWxsQmFja1tdPiA9IG5ldyBNYXBXcmFwPFxyXG4gICAgU3RyaW5nT3JOdW1iZXIsXHJcbiAgICBHQ2FsbEJhY2tbXVxyXG4gID4oKTsgLy8gTWFwPHRhcmdldCwgZXZlbnQgQXJyYXk+OyDkuovku7blrZjlgqjlrrnlmahcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbXNnSUQg5raI5oGvSURcclxuICAgKiBAcGFyYW0gb2JqIOWvueixoVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjaGVja0V2ZW50KG1zZ0lEOiBTdHJpbmdPck51bWJlciwgb2JqOiBFdmVudE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmV2ZW50TWFwLmdldChtc2dJRCkpIHJldHVybiBmYWxzZTtcclxuICAgIGxldCBsaXN0Q2FsbEJhY2sgPSB0aGlzLmV2ZW50TWFwLmdldChtc2dJRCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RDYWxsQmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobGlzdENhbGxCYWNrW2ldLnRhcmdldCA9PSBvYmopIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyYXBLZXkob2JqOiBFdmVudE9iamVjdCk6IFN0cmluZ09yTnVtYmVyIHtcclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3RXcmFwKSB7XHJcbiAgICAgIHJldHVybiBvYmoud3JhcElkO1xyXG4gICAgfSBlbHNlIHJldHVybiBvYmoudXVpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOenu+mZpOafkOS4gOadoeS6i+S7tueahOebkeWQrFxyXG4gICAqIEBwYXJhbSBtc2dJRCDmtojmga9JRFxyXG4gICAqIEBwYXJhbSBvYmog5a+56LGhXHJcbiAgICovXHJcbiAgcHVibGljIHJlbW92ZUJ5RXZlbnRNYXAobXNnSUQ6IFN0cmluZ09yTnVtYmVyLCBvYmo6IEV2ZW50T2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICBsZXQgbGlzdENhbGxCYWNrID0gdGhpcy5ldmVudE1hcC5nZXQobXNnSUQpO1xyXG4gICAgaWYgKCFsaXN0Q2FsbEJhY2spIHJldHVybiB0cnVlO1xyXG4gICAgbGV0IGNhbGxCYWNrOiBHQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Q2FsbEJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGxpc3RDYWxsQmFja1tpXS50YXJnZXQgPT0gb2JqKSB7XHJcbiAgICAgICAgY2FsbEJhY2sgPSBsaXN0Q2FsbEJhY2tbaV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghY2FsbEJhY2spIHtcclxuICAgICAgY2Mud2FybihcIlRyeWluZyB0byByZW1vdmUgbm9uIC0gZXhpc3RlbnQgZXZlbnRzIGJ5IGV2ZW50cyBtYXBcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGxpc3RDYWxsQmFjay5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgbGlzdENhbGxCYWNrID0gdGhpcy5vYmplY3RNYXAuZ2V0KHRoaXMud3JhcEtleShvYmopKTtcclxuICAgIGlmICghbGlzdENhbGxCYWNrKSB7XHJcbiAgICAgIGNjLndhcm4oXCJUcnlpbmcgdG8gcmVtb3ZlIG5vbiAtIGV4aXN0ZW50IGV2ZW50cyBieSBvYmplY3RzIG1hcFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaXN0Q2FsbEJhY2subGVuZ3RoOyBqKyspIHtcclxuICAgICAgaWYgKGxpc3RDYWxsQmFja1tqXS5tc2dJRCA9PSBtc2dJRCkge1xyXG4gICAgICAgIGxpc3RDYWxsQmFjay5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog56e76Zmk5a+56LGh55qE55uR5ZCsXHJcbiAgICogQHBhcmFtIG9iaiDlr7nosaFcclxuICAgKi9cclxuICBwdWJsaWMgcmVtb3ZlQnlPYmplY3RNYXAob2JqOiBFdmVudE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHdyYXBLZXkgPSB0aGlzLndyYXBLZXkob2JqKTtcclxuICAgIGxldCBsaXN0Q2FsbEJhY2sgPSB0aGlzLm9iamVjdE1hcC5nZXQod3JhcEtleSk7XHJcbiAgICBpZiAoIWxpc3RDYWxsQmFjaykgcmV0dXJuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBsaXN0Q2FsbEJhY2subGVuZ3RoIC0gMTsgbGlzdENhbGxCYWNrLmxlbmd0aCA+IDA7IGktLSkge1xyXG4gICAgICBsZXQgY2FsbEJhY2sgPSBsaXN0Q2FsbEJhY2tbaV07XHJcbiAgICAgIGlmICghdGhpcy5ldmVudE1hcC5nZXQoY2FsbEJhY2subXNnSUQpKSBjb250aW51ZTtcclxuICAgICAgbGV0IGV2ZW50cyA9IHRoaXMuZXZlbnRNYXAuZ2V0KGNhbGxCYWNrLm1zZ0lEKTtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoZXZlbnRzW2pdLnRhcmdldCA9PSBvYmopIHtcclxuICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGlzdENhbGxCYWNrLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuICAgIHRoaXMuX29iamVjdE1hcC5kZWxldGUod3JhcEtleSk7XHJcbiAgICB0aGlzLm9iamVjdE1hcC5kZWxldGUod3JhcEtleSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDms6jlhozmtojmga9cclxuICAgKiBAcGFyYW0gbXNnSUQg5raI5oGvSURcclxuICAgKiBAcGFyYW0gb2JqIOWvueixoVxyXG4gICAqIEBwYXJhbSBoYW5kbGVyIOWbnuaOieWHveaVsFxyXG4gICAqIEBwYXJhbSBwcmlvcml0eSDkvJjlhYjnuqdcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXIoXHJcbiAgICBtc2dJRDogU3RyaW5nT3JOdW1iZXIsXHJcbiAgICBvYmo6IEV2ZW50T2JqZWN0LFxyXG4gICAgaGFuZGxlcjogYW55LFxyXG4gICAgcHJpb3JpdHk/OiBudW1iZXJcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmNoZWNrRXZlbnQobXNnSUQsIG9iaikpIHtcclxuICAgICAgY2Mud2FybihcInRoZSBvYmplY3QgYW5kIG1zZ0lEIGhhcyBiZWVkIHJlZ2lzdGVyZWQhXCIgKyB0aGlzLndyYXBLZXkob2JqKSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdXNoIHRvIGV2ZW50IG1hcDtcclxuICAgIGxldCBjYWxsQmFjayA9IHtcclxuICAgICAgdGFyZ2V0OiBvYmosXHJcbiAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXHJcbiAgICAgIG1zZ0lEOiBtc2dJRCxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5ID8gcHJpb3JpdHkgOiBEZWZhdWx0X1BSSU9SSVRZLFxyXG4gICAgfTtcclxuICAgIHZhciBsaXN0Q2FsbEJhY2s6IEdDYWxsQmFja1tdID0gbnVsbDtcclxuICAgIGxpc3RDYWxsQmFjayA9IHRoaXMuZXZlbnRNYXAuZ2V0KG1zZ0lEKTtcclxuICAgIGlmIChsaXN0Q2FsbEJhY2sgPT0gbnVsbCkge1xyXG4gICAgICBsaXN0Q2FsbEJhY2sgPSBuZXcgQXJyYXk8R0NhbGxCYWNrPigpO1xyXG4gICAgICB0aGlzLmV2ZW50TWFwLnNldChtc2dJRCwgbGlzdENhbGxCYWNrKTtcclxuICAgIH1cclxuICAgIGxpc3RDYWxsQmFjay5wdXNoKGNhbGxCYWNrKTtcclxuXHJcbiAgICAvLyBzb3J0IGJ5IHByaW9yaXR5O1xyXG4gICAgbGlzdENhbGxCYWNrLnNvcnQoKGE6IEdDYWxsQmFjaywgYjogR0NhbGxCYWNrKSA9PiB7XHJcbiAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vcHVzaCB0byBvYmplY3QgbWFwO1xyXG4gICAgbGV0IHdyYXBLZXkgPSB0aGlzLndyYXBLZXkob2JqKTtcclxuICAgIGxpc3RDYWxsQmFjayA9IHRoaXMub2JqZWN0TWFwLmdldCh3cmFwS2V5KTtcclxuICAgIGlmICghbGlzdENhbGxCYWNrKSB7XHJcbiAgICAgIGxpc3RDYWxsQmFjayA9IG5ldyBBcnJheTxHQ2FsbEJhY2s+KCk7XHJcbiAgICAgIHRoaXMub2JqZWN0TWFwLnNldCh3cmFwS2V5LCBsaXN0Q2FsbEJhY2spO1xyXG4gICAgICB0aGlzLl9vYmplY3RNYXAuc2V0KHdyYXBLZXksIG9iaik7XHJcbiAgICB9XHJcbiAgICBsaXN0Q2FsbEJhY2sucHVzaChjYWxsQmFjayk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOazqOmUgOS6i+S7tlxyXG4gICAqIEBwYXJhbSBvYmog5a+56LGhXHJcbiAgICogQHBhcmFtIG1zZ0lEIOa2iOaBr0lEXHJcbiAgICovXHJcbiAgcHVibGljIHVuUmVnaXN0ZXIob2JqOiBFdmVudE9iamVjdCwgbXNnSUQ/OiBTdHJpbmdPck51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKG1zZ0lEKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUJ5RXZlbnRNYXAobXNnSUQsIG9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVCeU9iamVjdE1hcChvYmopO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o6o6YCB5raI5oGvXHJcbiAgICogQHBhcmFtIG1zZ0lEIOa2iOaBr0lEXHJcbiAgICogQHBhcmFtIHBhcmFtIOWPguaVsFxyXG4gICAqL1xyXG4gIHB1YmxpYyBwb3N0KG1zZ0lEOiBTdHJpbmdPck51bWJlciwgcGFyYW0/OiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCBsaXN0Q2FsbEJhY2sgPSB0aGlzLmV2ZW50TWFwLmdldChtc2dJRCk7XHJcbiAgICBpZiAoIWxpc3RDYWxsQmFjaykgcmV0dXJuO1xyXG4gICAgbGlzdENhbGxCYWNrLmZvckVhY2goKGNhbGxCYWNrKSA9PiB7XHJcbiAgICAgIGNhbGxCYWNrLmhhbmRsZXIoY2FsbEJhY2sudGFyZ2V0LCBwYXJhbSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19