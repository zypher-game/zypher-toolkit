
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/CoreDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '54cfe4hI6FIS61xCa+MIUda', 'CoreDefine');
// Script/Core/CoreDefine.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.PaySateNum = exports.OBJECT_ROUTE = exports.CONVERT_ATTRIBUTES = exports.IS_EMPTY_ARRAY = exports.IS_EMPTY_ZERO = exports.IS_EMPTY_INVALID = exports.OVER_WRITE = exports.OBJECT_COPY = exports.MaskSpriteType = exports.WinPageType = exports.WinPage = exports.WinCloseMode = exports.WinLayer = exports.WinAddMode = exports.WinMaskStatus = exports.WinType = exports.WinCreateEnv = exports.NetCoreEvent = exports.ConnectStates = exports.PRIORITY_VIEW = exports.PRIORITY_DATA = exports.PRIORITY_LOCAL = exports.GUIDE_TAG = exports.MAX_TAG = exports.INVALID_STRING_VALUE = exports.INVALID_VALUE = exports.INVALID_VALUE_ZERO = void 0;
/** 无效值 */
exports.INVALID_VALUE_ZERO = 0;
exports.INVALID_VALUE = -1;
exports.INVALID_STRING_VALUE = "-1";
/** 最大节点ID */
exports.MAX_TAG = Math.pow(2, 15) - 1;
exports.GUIDE_TAG = exports.MAX_TAG - 1000;
/** 本地事件优先级 */
exports.PRIORITY_LOCAL = 1001;
/** 数据事件优先级 */
exports.PRIORITY_DATA = 2001;
/** 视图事件优先级 */
exports.PRIORITY_VIEW = 3001;
var ConnectStates;
(function (ConnectStates) {
    ConnectStates[ConnectStates["ConNull"] = 0] = "ConNull";
    ConnectStates[ConnectStates["Connecting"] = 1] = "Connecting";
    ConnectStates[ConnectStates["Connected"] = 2] = "Connected";
    ConnectStates[ConnectStates["ConnectRe"] = 3] = "ConnectRe";
    ConnectStates[ConnectStates["ConnetctErr"] = 4] = "ConnetctErr";
    ConnectStates[ConnectStates["ConDis"] = 5] = "ConDis";
    ConnectStates[ConnectStates["ForceClose"] = 6] = "ForceClose";
    ConnectStates[ConnectStates["WaitConfirm"] = 7] = "WaitConfirm";
})(ConnectStates = exports.ConnectStates || (exports.ConnectStates = {}));
var NetCoreEvent = /** @class */ (function () {
    function NetCoreEvent() {
    }
    NetCoreEvent.DIS_CONNECT = 'disconnect';
    NetCoreEvent.IO_ERROR = 'io-error';
    NetCoreEvent.CLOSE = 'close';
    NetCoreEvent.RE_CONNECT = 'reconnect';
    NetCoreEvent.CONNECTED = 'connected';
    NetCoreEvent.HSHAKE_ERR = 'handshake-error';
    NetCoreEvent.HEART_BEAT_TIMEOUT = 'heartbeat-timeout';
    NetCoreEvent.KICK = 'onKick';
    NetCoreEvent.WAIT_RECONECT = 'wait-reconnect';
    NetCoreEvent.RECONECT_TIMES_OUT = 'reconnect-times-out';
    NetCoreEvent.LOGIC_ERROR = 'LoginError';
    return NetCoreEvent;
}());
exports.NetCoreEvent = NetCoreEvent;
var WinCreateEnv;
(function (WinCreateEnv) {
    /** 全新的窗口 */
    WinCreateEnv[WinCreateEnv["New"] = 0] = "New";
    /** 当前活跃栈中 */
    WinCreateEnv[WinCreateEnv["lStack"] = 1] = "lStack";
    /** 当前隐藏堆中 */
    WinCreateEnv[WinCreateEnv["Heap"] = 2] = "Heap";
    /** 回收容器中 */
    WinCreateEnv[WinCreateEnv["Recycle"] = 3] = "Recycle";
})(WinCreateEnv = exports.WinCreateEnv || (exports.WinCreateEnv = {}));
////// ui define
var WinType;
(function (WinType) {
    /** 全屏界面 */
    WinType[WinType["FullView"] = 0] = "FullView";
    /** 导航窗口 */
    WinType[WinType["Navigator"] = 1] = "Navigator";
    /** 弹出窗口 */
    WinType[WinType["Window"] = 2] = "Window";
    /** 固定位置 */
    WinType[WinType["Fix"] = 3] = "Fix";
})(WinType = exports.WinType || (exports.WinType = {}));
exports.WinMaskStatus = {
    /** 不创建蒙版 */
    kNone: 1 << 0,
    /** 只显示,点击不做响应 */
    kOnlyShow: 1 << 1,
    /** 点击蒙版关闭界面 */
    kTouchClose: 1 << 2,
    /** 156透明度 */
    kOpacity156: 1 << 3,
    /** 纯黑背景 */
    kOpacity255: 1 << 4,
    /** 背景图片不阻挡穿透 */
    kUnBlockInput: 1 << 5,
};
var WinAddMode;
(function (WinAddMode) {
    /** 替换本层级的界面，同时会关闭层高级的界面 */
    WinAddMode[WinAddMode["ReplaceLayer"] = 0] = "ReplaceLayer";
    /** 只替换存在的自己实例， 同时会关闭高层级的界面 */
    WinAddMode[WinAddMode["ReplaceSelf"] = 1] = "ReplaceSelf";
    /** 入栈本层之下的UI,移除本层之上的UI */
    WinAddMode[WinAddMode["PushLower"] = 2] = "PushLower";
    /** 入栈本层之上的UI */
    WinAddMode[WinAddMode["PushHeigh"] = 3] = "PushHeigh";
    /** 堆叠模式 */
    WinAddMode[WinAddMode["Stack"] = 4] = "Stack";
})(WinAddMode = exports.WinAddMode || (exports.WinAddMode = {}));
var WinLayer;
(function (WinLayer) {
    WinLayer[WinLayer["NONE"] = 0] = "NONE";
    WinLayer[WinLayer["FirstWindow"] = 1] = "FirstWindow";
    WinLayer[WinLayer["Navigator"] = 2] = "Navigator";
    WinLayer[WinLayer["SecondWindow"] = 3] = "SecondWindow";
    WinLayer[WinLayer["ThirdWindow"] = 4] = "ThirdWindow";
    WinLayer[WinLayer["UnCheckMutex"] = 5] = "UnCheckMutex";
    WinLayer[WinLayer["TouchShow"] = 6] = "TouchShow";
    WinLayer[WinLayer["WarnWindow"] = 7] = "WarnWindow";
    WinLayer[WinLayer["RollWindow"] = 8] = "RollWindow";
    WinLayer[WinLayer["TopWindow"] = 9] = "TopWindow";
    WinLayer[WinLayer["TopUpWindow"] = 10] = "TopUpWindow";
    WinLayer[WinLayer["ClickEffect"] = 11] = "ClickEffect";
})(WinLayer = exports.WinLayer || (exports.WinLayer = {}));
exports.WinCloseMode = {
    /** 弹出非活动堆内的窗口 */
    PopAll: 1 << 0,
    /** 隐藏，缓存下次使用 */
    Hide: 1 << 2,
    // /** 移动到边界 */
    // Move: 1 << 3,
    /** 频繁出现界面需要回收在用 */
    Recycle: 1 << 4,
    /** 仅销毁 */
    OnlyDestroy: 1 << 5,
};
/**界面切页 */
var WinPage;
(function (WinPage) {
    WinPage[WinPage["Page0"] = 0] = "Page0";
    WinPage[WinPage["Page1"] = 1] = "Page1";
    WinPage[WinPage["Page2"] = 2] = "Page2";
    WinPage[WinPage["Page3"] = 3] = "Page3";
    WinPage[WinPage["Page4"] = 4] = "Page4";
    WinPage[WinPage["Page5"] = 5] = "Page5";
    WinPage[WinPage["Page6"] = 6] = "Page6";
})(WinPage = exports.WinPage || (exports.WinPage = {}));
/** 切页类型 */
var WinPageType;
(function (WinPageType) {
    /** 只是节点 */
    WinPageType[WinPageType["Node"] = 0] = "Node";
    /** 带切页组件 */
    WinPageType[WinPageType["GPage"] = 1] = "GPage";
    /** 仅内容重置 */
    WinPageType[WinPageType["Content"] = 2] = "Content";
})(WinPageType = exports.WinPageType || (exports.WinPageType = {}));
var MaskSpriteType;
(function (MaskSpriteType) {
    /** 矩形 */
    MaskSpriteType[MaskSpriteType["Square"] = 0] = "Square";
    /** 圆形 */
    MaskSpriteType[MaskSpriteType["Clire"] = 1] = "Clire";
    /** 六边形 */
    MaskSpriteType[MaskSpriteType["Octagon"] = 2] = "Octagon";
    /** 大卡裁切 */
    MaskSpriteType[MaskSpriteType["CardClip"] = 3] = "CardClip";
})(MaskSpriteType = exports.MaskSpriteType || (exports.MaskSpriteType = {}));
// 拷贝
function OBJECT_COPY(obj) {
    if (!obj)
        return null;
    return JSON.parse(JSON.stringify(obj));
}
exports.OBJECT_COPY = OBJECT_COPY;
// 覆盖
function OVER_WRITE(obj, source) {
    for (var key in source) {
        if (source[key] != null)
            obj[key] = source[key];
    }
}
exports.OVER_WRITE = OVER_WRITE;
// 判空（-1）
function IS_EMPTY_INVALID(obj) {
    return obj == null || obj == exports.INVALID_VALUE || obj == exports.INVALID_STRING_VALUE;
}
exports.IS_EMPTY_INVALID = IS_EMPTY_INVALID;
/** 判空（0） */
function IS_EMPTY_ZERO(obj) {
    return obj == null || obj == 0 || obj == '0';
}
exports.IS_EMPTY_ZERO = IS_EMPTY_ZERO;
function IS_EMPTY_ARRAY(array) {
    if (!array)
        return true;
    for (var i = 0; i < array.length; i++) {
        if (array[i])
            return false;
    }
    return true;
}
exports.IS_EMPTY_ARRAY = IS_EMPTY_ARRAY;
/**
 * 将本部属性修改为一维的数组[[1, 2]]=>[null,2]
 * @param attributes 本部属性
 */
function CONVERT_ATTRIBUTES(attributes) {
    var result = [];
    for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
        var attr = attributes_1[_i];
        result[attr[0]] = attr[1];
    }
    return result;
}
exports.CONVERT_ATTRIBUTES = CONVERT_ATTRIBUTES;
/** 将结构的末端赋值为链路字符串
 * A:{B:{C: ""}} ==》 A.B.C = "A.B.C"
 */
function OBJECT_ROUTE(obj, parent) {
    parent = parent ? parent + '.' : '';
    for (var key in obj) {
        if (typeof obj[key] != "string") {
            OBJECT_ROUTE(obj[key], parent + key);
            continue;
        }
        obj[key] = parent + key;
    }
}
exports.OBJECT_ROUTE = OBJECT_ROUTE;
var PaySateNum;
(function (PaySateNum) {
    /** 不可支付 */
    PaySateNum[PaySateNum["NonPayment"] = 0] = "NonPayment";
    /** 显示支付*/
    PaySateNum[PaySateNum["DisPayment"] = 1] = "DisPayment";
    /** 显示支付，点击时提示“iOS受政策影响不可支付" */
    PaySateNum[PaySateNum["DisPaymentTip"] = 2] = "DisPaymentTip";
})(PaySateNum = exports.PaySateNum || (exports.PaySateNum = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9Db3JlRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNHLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0FBRXpDLGFBQWE7QUFDQSxRQUFBLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsUUFBQSxTQUFTLEdBQUcsZUFBTyxHQUFHLElBQUksQ0FBQztBQUl4QyxjQUFjO0FBQ0QsUUFBQSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ25DLGNBQWM7QUFDRCxRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsY0FBYztBQUNELFFBQUEsYUFBYSxHQUFHLElBQUksQ0FBQztBQUVsQyxJQUFZLGFBU1g7QUFURCxXQUFZLGFBQWE7SUFDckIsdURBQU8sQ0FBQTtJQUNQLDZEQUFVLENBQUE7SUFDViwyREFBUyxDQUFBO0lBQ1QsMkRBQVMsQ0FBQTtJQUNULCtEQUFXLENBQUE7SUFDWCxxREFBTSxDQUFBO0lBQ04sNkRBQVUsQ0FBQTtJQUNWLCtEQUFXLENBQUE7QUFDZixDQUFDLEVBVFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFTeEI7QUFFRDtJQUFBO0lBWUEsQ0FBQztJQVhpQix3QkFBVyxHQUFHLFlBQVksQ0FBQztJQUMzQixxQkFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixrQkFBSyxHQUFHLE9BQU8sQ0FBQztJQUNoQix1QkFBVSxHQUFHLFdBQVcsQ0FBQztJQUN6QixzQkFBUyxHQUFHLFdBQVcsQ0FBQztJQUN4Qix1QkFBVSxHQUFHLGlCQUFpQixDQUFDO0lBQy9CLCtCQUFrQixHQUFHLG1CQUFtQixDQUFDO0lBQ3pDLGlCQUFJLEdBQUcs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LFdBQVksVUFBVTtJQUNsQixXQUFXO0lBQ1gsdURBQVUsQ0FBQTtJQUNWLFVBQVU7SUFDVix1REFBVSxDQUFBO0lBQ1YsK0JBQStCO0lBQy9CLDZEQUFhLENBQUE7QUFDakIsQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOaXoOaViOWAvCAqL1xyXG5leHBvcnQgY29uc3QgSU5WQUxJRF9WQUxVRV9aRVJPID0gMDtcclxuZXhwb3J0IGNvbnN0IElOVkFMSURfVkFMVUUgPSAtMTtcclxuZXhwb3J0IGNvbnN0IElOVkFMSURfU1RSSU5HX1ZBTFVFID0gXCItMVwiO1xyXG5cclxuLyoqIOacgOWkp+iKgueCuUlEICovXHJcbmV4cG9ydCBjb25zdCBNQVhfVEFHID0gTWF0aC5wb3coMiwgMTUpIC0gMTtcclxuZXhwb3J0IGNvbnN0IEdVSURFX1RBRyA9IE1BWF9UQUcgLSAxMDAwO1xyXG5cclxuXHJcblxyXG4vKiog5pys5Zyw5LqL5Lu25LyY5YWI57qnICovXHJcbmV4cG9ydCBjb25zdCBQUklPUklUWV9MT0NBTCA9IDEwMDE7XHJcbi8qKiDmlbDmja7kuovku7bkvJjlhYjnuqcgKi9cclxuZXhwb3J0IGNvbnN0IFBSSU9SSVRZX0RBVEEgPSAyMDAxO1xyXG4vKiog6KeG5Zu+5LqL5Lu25LyY5YWI57qnICovXHJcbmV4cG9ydCBjb25zdCBQUklPUklUWV9WSUVXID0gMzAwMTtcclxuXHJcbmV4cG9ydCBlbnVtIENvbm5lY3RTdGF0ZXMge1xyXG4gICAgQ29uTnVsbCwgICAgLy8g5peg54q25oCBXHJcbiAgICBDb25uZWN0aW5nLCAvLyDlj5Hotbfov57mjqVcclxuICAgIENvbm5lY3RlZCwgIC8vIOi/nuaOpeedgFxyXG4gICAgQ29ubmVjdFJlLCAgLy8g6YeN5paw6L+e5o6lXHJcbiAgICBDb25uZXRjdEVyciwgICAgLy8g6L+e5o6l5aSx6LSlXHJcbiAgICBDb25EaXMsIC8vIOWkseWOu+i/nuaOpVxyXG4gICAgRm9yY2VDbG9zZSwgLy8g5by65Yi25pat5byAXHJcbiAgICBXYWl0Q29uZmlybSwgLy8g562J5b6F6YeN6L+e56Gu6K6kXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOZXRDb3JlRXZlbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBESVNfQ09OTkVDVCA9ICdkaXNjb25uZWN0JztcclxuICAgIHB1YmxpYyBzdGF0aWMgSU9fRVJST1IgPSAnaW8tZXJyb3InO1xyXG4gICAgcHVibGljIHN0YXRpYyBDTE9TRSA9ICdjbG9zZSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJFX0NPTk5FQ1QgPSAncmVjb25uZWN0JztcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OTkVDVEVEID0gJ2Nvbm5lY3RlZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhTSEFLRV9FUlIgPSAnaGFuZHNoYWtlLWVycm9yJztcclxuICAgIHB1YmxpYyBzdGF0aWMgSEVBUlRfQkVBVF9USU1FT1VUID0gJ2hlYXJ0YmVhdC10aW1lb3V0JztcclxuICAgIHB1YmxpYyBzdGF0aWMgS0lDSyA9ICdvbktpY2snO1xyXG4gICAgcHVibGljIHN0YXRpYyBXQUlUX1JFQ09ORUNUID0gJ3dhaXQtcmVjb25uZWN0JztcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVDT05FQ1RfVElNRVNfT1VUID0gJ3JlY29ubmVjdC10aW1lcy1vdXQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBMT0dJQ19FUlJPUiA9ICdMb2dpbkVycm9yJztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIFdpbkNyZWF0ZUVudiB7XHJcbiAgICAvKiog5YWo5paw55qE56qX5Y+jICovXHJcbiAgICBOZXcsXHJcbiAgICAvKiog5b2T5YmN5rS76LeD5qCI5LitICovXHJcbiAgICBsU3RhY2ssXHJcbiAgICAvKiog5b2T5YmN6ZqQ6JeP5aCG5LitICovXHJcbiAgICBIZWFwLFxyXG4gICAgLyoqIOWbnuaUtuWuueWZqOS4rSAqL1xyXG4gICAgUmVjeWNsZVxyXG59XHJcblxyXG4vLy8vLy8gdWkgZGVmaW5lXHJcbmV4cG9ydCBlbnVtIFdpblR5cGUge1xyXG4gICAgLyoqIOWFqOWxj+eVjOmdoiAqL1xyXG4gICAgRnVsbFZpZXcsXHJcbiAgICAvKiog5a+86Iiq56qX5Y+jICovXHJcbiAgICBOYXZpZ2F0b3IsXHJcbiAgICAvKiog5by55Ye656qX5Y+jICovXHJcbiAgICBXaW5kb3csXHJcbiAgICAvKiog5Zu65a6a5L2N572uICovXHJcbiAgICBGaXgsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBXaW5NYXNrU3RhdHVzID0ge1xyXG4gICAgLyoqIOS4jeWIm+W7uuiSmeeJiCAqL1xyXG4gICAga05vbmU6IDEgPDwgMCxcclxuICAgIC8qKiDlj6rmmL7npLos54K55Ye75LiN5YGa5ZON5bqUICovXHJcbiAgICBrT25seVNob3c6IDEgPDwgMSxcclxuICAgIC8qKiDngrnlh7vokpnniYjlhbPpl63nlYzpnaIgKi9cclxuICAgIGtUb3VjaENsb3NlOiAxIDw8IDIsXHJcbiAgICAvKiogMTU26YCP5piO5bqmICovXHJcbiAgICBrT3BhY2l0eTE1NjogMSA8PCAzLFxyXG4gICAgLyoqIOe6r+m7keiDjOaZryAqL1xyXG4gICAga09wYWNpdHkyNTU6IDEgPDwgNCxcclxuICAgIC8qKiDog4zmma/lm77niYfkuI3pmLvmjKHnqb/pgI8gKi9cclxuICAgIGtVbkJsb2NrSW5wdXQ6IDEgPDwgNSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gV2luQWRkTW9kZSB7XHJcbiAgICAvKiog5pu/5o2i5pys5bGC57qn55qE55WM6Z2i77yM5ZCM5pe25Lya5YWz6Zet5bGC6auY57qn55qE55WM6Z2iICovXHJcbiAgICBSZXBsYWNlTGF5ZXIsXHJcbiAgICAvKiog5Y+q5pu/5o2i5a2Y5Zyo55qE6Ieq5bex5a6e5L6L77yMIOWQjOaXtuS8muWFs+mXremrmOWxgue6p+eahOeVjOmdoiAqL1xyXG4gICAgUmVwbGFjZVNlbGYsXHJcbiAgICAvKiog5YWl5qCI5pys5bGC5LmL5LiL55qEVUks56e76Zmk5pys5bGC5LmL5LiK55qEVUkgKi9cclxuICAgIFB1c2hMb3dlcixcclxuICAgIC8qKiDlhaXmoIjmnKzlsYLkuYvkuIrnmoRVSSAqL1xyXG4gICAgUHVzaEhlaWdoLFxyXG4gICAgLyoqIOWghuWPoOaooeW8jyAqL1xyXG4gICAgU3RhY2tcclxufVxyXG5cclxuZXhwb3J0IGVudW0gV2luTGF5ZXIge1xyXG4gICAgTk9ORSxcclxuICAgIEZpcnN0V2luZG93LCAvLyDlupXlsYI7XHJcbiAgICBOYXZpZ2F0b3IsIC8vIOWfuuehgOWvvOiIquWxgu+8m1xyXG4gICAgU2Vjb25kV2luZG93LCAvLyDkuoznuqfvvJtcclxuICAgIFRoaXJkV2luZG93LCAvLyDkuInnuqfvvJtcclxuXHJcbiAgICBVbkNoZWNrTXV0ZXgsIC8vIOi/meS4quWxgue6p+S5i+WQju+8jOS4jeajgOa1i+eql+WPo+S5i+mXtOeahOS6kuaWpVxyXG5cclxuICAgIFRvdWNoU2hvdywgLy8g5L+h5oGv5bGV56S65bGC57qnXHJcblxyXG4gICAgV2FybldpbmRvdywgLy8g6K2m5ZGKO1xyXG4gICAgUm9sbFdpbmRvdywgIC8vIOi3kemprOeBr1xyXG4gICAgVG9wV2luZG93LCAgLy8g6aG257qn77ybXHJcbiAgICBUb3BVcFdpbmRvdywgIC8vIOmhtue6p+S5i+S4iu+8jOe7meWBnOacjemAmuefpeeUqO+8jOmYsuatouiiq3RvcOWxguWBnOacjemHjei/nuebluS9j++8m1xyXG4gICAgQ2xpY2tFZmZlY3QsLy8g54K55Ye754m55pWIXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBXaW5DbG9zZU1vZGUgPSB7XHJcbiAgICAvKiog5by55Ye66Z2e5rS75Yqo5aCG5YaF55qE56qX5Y+jICovXHJcbiAgICBQb3BBbGw6IDEgPDwgMCxcclxuICAgIC8qKiDpmpDol4/vvIznvJPlrZjkuIvmrKHkvb/nlKggKi9cclxuICAgIEhpZGU6IDEgPDwgMixcclxuICAgIC8vIC8qKiDnp7vliqjliLDovrnnlYwgKi9cclxuICAgIC8vIE1vdmU6IDEgPDwgMyxcclxuICAgIC8qKiDpopHnuYHlh7rnjrDnlYzpnaLpnIDopoHlm57mlLblnKjnlKggKi9cclxuICAgIFJlY3ljbGU6IDEgPDwgNCxcclxuICAgIC8qKiDku4XplIDmr4EgKi9cclxuICAgIE9ubHlEZXN0cm95OiAxIDw8IDUsXHJcbn1cclxuXHJcbi8qKueVjOmdouWIh+mhtSAqL1xyXG5leHBvcnQgZW51bSBXaW5QYWdlIHtcclxuICAgIFBhZ2UwID0gMCxcclxuICAgIFBhZ2UxLFxyXG4gICAgUGFnZTIsXHJcbiAgICBQYWdlMyxcclxuICAgIFBhZ2U0LFxyXG4gICAgUGFnZTUsXHJcbiAgICBQYWdlNixcclxufVxyXG5cclxuLyoqIOWIh+mhteexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBXaW5QYWdlVHlwZSB7XHJcbiAgICAvKiog5Y+q5piv6IqC54K5ICovXHJcbiAgICBOb2RlLFxyXG4gICAgLyoqIOW4puWIh+mhtee7hOS7tiAqL1xyXG4gICAgR1BhZ2UsXHJcbiAgICAvKiog5LuF5YaF5a656YeN572uICovXHJcbiAgICBDb250ZW50LFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNYXNrU3ByaXRlVHlwZSB7XHJcbiAgICAvKiog55+p5b2iICovXHJcbiAgICBTcXVhcmUsXHJcbiAgICAvKiog5ZyG5b2iICovXHJcbiAgICBDbGlyZSxcclxuICAgIC8qKiDlha3ovrnlvaIgKi9cclxuICAgIE9jdGFnb24sXHJcbiAgICAvKiog5aSn5Y2h6KOB5YiHICovXHJcbiAgICBDYXJkQ2xpcCxcclxufVxyXG5cclxuLy8g5ou36LSdXHJcbmV4cG9ydCBmdW5jdGlvbiBPQkpFQ1RfQ09QWTxUPihvYmopIHtcclxuICAgIGlmICghb2JqKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIGFzIFQ7XHJcbn1cclxuXHJcbi8vIOimhuebllxyXG5leHBvcnQgZnVuY3Rpb24gT1ZFUl9XUklURShvYmosIHNvdXJjZSkge1xyXG4gICAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChzb3VyY2Vba2V5XSAhPSBudWxsKSBvYmpba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDliKTnqbrvvIgtMe+8iVxyXG5leHBvcnQgZnVuY3Rpb24gSVNfRU1QVFlfSU5WQUxJRChvYmopOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT0gbnVsbCB8fCBvYmogPT0gSU5WQUxJRF9WQUxVRSB8fCBvYmogPT0gSU5WQUxJRF9TVFJJTkdfVkFMVUU7XHJcbn1cclxuXHJcbi8qKiDliKTnqbrvvIgw77yJICovXHJcbmV4cG9ydCBmdW5jdGlvbiBJU19FTVBUWV9aRVJPKG9iaik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PSBudWxsIHx8IG9iaiA9PSAwIHx8IG9iaiA9PSAnMCc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJU19FTVBUWV9BUlJBWTxUPihhcnJheTogQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgIGlmICghYXJyYXkpIHJldHVybiB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnJheVtpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOWwhuacrOmDqOWxnuaAp+S/ruaUueS4uuS4gOe7tOeahOaVsOe7hFtbMSwgMl1dPT5bbnVsbCwyXVxyXG4gKiBAcGFyYW0gYXR0cmlidXRlcyDmnKzpg6jlsZ7mgKdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBDT05WRVJUX0FUVFJJQlVURVM8VD4oYXR0cmlidXRlczogQXJyYXk8W251bWJlciwgVF0+KTogQXJyYXk8VD4ge1xyXG4gICAgbGV0IHJlc3VsdDogQXJyYXk8VD4gPSBbXTtcclxuICAgIGZvciAobGV0IGF0dHIgb2YgYXR0cmlidXRlcykge1xyXG4gICAgICAgIHJlc3VsdFthdHRyWzBdXSA9IGF0dHJbMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKiog5bCG57uT5p6E55qE5pyr56uv6LWL5YC85Li66ZO+6Lev5a2X56ym5LiyXHJcbiAqIEE6e0I6e0M6IFwiXCJ9fSA9PeOAiyBBLkIuQyA9IFwiQS5CLkNcIlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE9CSkVDVF9ST1VURShvYmosIHBhcmVudD86IHN0cmluZykge1xyXG4gICAgcGFyZW50ID0gcGFyZW50ID8gcGFyZW50ICsgJy4nIDogJyc7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSAhPSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIE9CSkVDVF9ST1VURShvYmpba2V5XSwgcGFyZW50ICsga2V5KTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ialtrZXldID0gcGFyZW50ICsga2V5O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gUGF5U2F0ZU51bSB7XHJcbiAgICAvKiog5LiN5Y+v5pSv5LuYICovXHJcbiAgICBOb25QYXltZW50LFxyXG4gICAgLyoqIOaYvuekuuaUr+S7mCovXHJcbiAgICBEaXNQYXltZW50LFxyXG4gICAgLyoqIOaYvuekuuaUr+S7mO+8jOeCueWHu+aXtuaPkOekuuKAnGlPU+WPl+aUv+etluW9seWTjeS4jeWPr+aUr+S7mFwiICovXHJcbiAgICBEaXNQYXltZW50VGlwLFxyXG59XHJcbiJdfQ==