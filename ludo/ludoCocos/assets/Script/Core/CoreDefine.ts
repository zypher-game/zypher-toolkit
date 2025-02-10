/** 无效值 */
export const INVALID_VALUE_ZERO = 0;
export const INVALID_VALUE = -1;
export const INVALID_STRING_VALUE = "-1";

/** 最大节点ID */
export const MAX_TAG = Math.pow(2, 15) - 1;
export const GUIDE_TAG = MAX_TAG - 1000;



/** 本地事件优先级 */
export const PRIORITY_LOCAL = 1001;
/** 数据事件优先级 */
export const PRIORITY_DATA = 2001;
/** 视图事件优先级 */
export const PRIORITY_VIEW = 3001;

export enum ConnectStates {
    ConNull,    // 无状态
    Connecting, // 发起连接
    Connected,  // 连接着
    ConnectRe,  // 重新连接
    ConnetctErr,    // 连接失败
    ConDis, // 失去连接
    ForceClose, // 强制断开
    WaitConfirm, // 等待重连确认
}

export class NetCoreEvent {
    public static DIS_CONNECT = 'disconnect';
    public static IO_ERROR = 'io-error';
    public static CLOSE = 'close';
    public static RE_CONNECT = 'reconnect';
    public static CONNECTED = 'connected';
    public static HSHAKE_ERR = 'handshake-error';
    public static HEART_BEAT_TIMEOUT = 'heartbeat-timeout';
    public static KICK = 'onKick';
    public static WAIT_RECONECT = 'wait-reconnect';
    public static RECONECT_TIMES_OUT = 'reconnect-times-out';
    public static LOGIC_ERROR = 'LoginError';
}


export enum WinCreateEnv {
    /** 全新的窗口 */
    New,
    /** 当前活跃栈中 */
    lStack,
    /** 当前隐藏堆中 */
    Heap,
    /** 回收容器中 */
    Recycle
}

////// ui define
export enum WinType {
    /** 全屏界面 */
    FullView,
    /** 导航窗口 */
    Navigator,
    /** 弹出窗口 */
    Window,
    /** 固定位置 */
    Fix,
}

export const WinMaskStatus = {
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
}

export enum WinAddMode {
    /** 替换本层级的界面，同时会关闭层高级的界面 */
    ReplaceLayer,
    /** 只替换存在的自己实例， 同时会关闭高层级的界面 */
    ReplaceSelf,
    /** 入栈本层之下的UI,移除本层之上的UI */
    PushLower,
    /** 入栈本层之上的UI */
    PushHeigh,
    /** 堆叠模式 */
    Stack
}

export enum WinLayer {
    NONE,
    FirstWindow, // 底层;
    Navigator, // 基础导航层；
    SecondWindow, // 二级；
    ThirdWindow, // 三级；

    UnCheckMutex, // 这个层级之后，不检测窗口之间的互斥

    TouchShow, // 信息展示层级

    WarnWindow, // 警告;
    RollWindow,  // 跑马灯
    TopWindow,  // 顶级；
    TopUpWindow,  // 顶级之上，给停服通知用，防止被top层停服重连盖住；
    ClickEffect,// 点击特效
}

export const WinCloseMode = {
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
}

/**界面切页 */
export enum WinPage {
    Page0 = 0,
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
}

/** 切页类型 */
export enum WinPageType {
    /** 只是节点 */
    Node,
    /** 带切页组件 */
    GPage,
    /** 仅内容重置 */
    Content,
}

export enum MaskSpriteType {
    /** 矩形 */
    Square,
    /** 圆形 */
    Clire,
    /** 六边形 */
    Octagon,
    /** 大卡裁切 */
    CardClip,
}

// 拷贝
export function OBJECT_COPY<T>(obj) {
    if (!obj) return null;
    return JSON.parse(JSON.stringify(obj)) as T;
}

// 覆盖
export function OVER_WRITE(obj, source) {
    for (let key in source) {
        if (source[key] != null) obj[key] = source[key];
    }
}

// 判空（-1）
export function IS_EMPTY_INVALID(obj): boolean {
    return obj == null || obj == INVALID_VALUE || obj == INVALID_STRING_VALUE;
}

/** 判空（0） */
export function IS_EMPTY_ZERO(obj): boolean {
    return obj == null || obj == 0 || obj == '0';
}

export function IS_EMPTY_ARRAY<T>(array: Array<T>): boolean {
    if (!array) return true;
    for (let i = 0; i < array.length; i++) {
        if (array[i]) return false;
    }
    return true;
}



/**
 * 将本部属性修改为一维的数组[[1, 2]]=>[null,2]
 * @param attributes 本部属性
 */
export function CONVERT_ATTRIBUTES<T>(attributes: Array<[number, T]>): Array<T> {
    let result: Array<T> = [];
    for (let attr of attributes) {
        result[attr[0]] = attr[1];
    }
    return result;
}

/** 将结构的末端赋值为链路字符串
 * A:{B:{C: ""}} ==》 A.B.C = "A.B.C"
 */
export function OBJECT_ROUTE(obj, parent?: string) {
    parent = parent ? parent + '.' : '';
    for (let key in obj) {
        if (typeof obj[key] != "string") {
            OBJECT_ROUTE(obj[key], parent + key);
            continue;
        }
        obj[key] = parent + key;
    }
}


export enum PaySateNum {
    /** 不可支付 */
    NonPayment,
    /** 显示支付*/
    DisPayment,
    /** 显示支付，点击时提示“iOS受政策影响不可支付" */
    DisPaymentTip,
}
