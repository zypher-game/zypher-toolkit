"use strict";
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