"use strict";
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