import { INVALID_STRING_VALUE, INVALID_VALUE } from "./../../Core/CoreDefine";
/**地块信息类型 */
export enum INFO_TYPE {
  GRID,
  MATERIAL,
  TARGET,
}

/**地块数据 */
export enum GRID_INFO {
  ID = 0,
  POSITION, // 1
  INFO, // 2
  ZINDEX, // 3
  MATERIAL, // 4
}

/**材料 */
export enum MATERIAL_INFO {
  TYPE,
  POSITION,
  SCALE,
  ZINDEX,
}

export enum GRID_TYPE {
  //虚空
  VOID = 0,
  //蓝色
  BULE = 1,
  //红色
  RED,
  //黄色
  YELLO,
  //绿色
  GREEN,
  //通用
  COMMON,
}

/** */
export enum MapLayer {
  /**地表 */
  MLBase,
  /** 地块 */
  MLGrid,
  /**素材层 */
  MLMaterial,
  /** 触摸层 */
  MLTouch,
  /** 效果层1 用于显示选中*/
  MLEffect_Dowm,
  /**效果层2 */
  MLEffect_Up,
  /** 地块逻辑UI层 */
  MElementUI,
  /** 开发的时候测试层 */
  TestLayer,
}
/**渠道 */
export enum Channel {
  /**默认 浏览器*/
  Default = 0,
  /**微信 */
  WECHAT = 1,
  /**头条 抖音 */
  TT = 2,
  /**快手 */
  KS = 3,
  /**oppo渠道 */
  OPPO = 4,
  /**vivo渠道 */
  VIVO = 5,
  /**魅族渠道 */
  MEIZU = 6,
  /**小米渠道 */
  XIAOMI = 7,
}

/**
 * 红点枚举
 * 客户端红点从 300开始
 */

export enum RPointMask {
  /**客户端红点起始*/
  RPM_Client = 300,
}

/**图标旗帜 */
export const ITEM_DETAIL_FLAG = {
  /** 背包环境 */
  BAG: 1 << 0,
  /** 展示 */
  TPL: 1 << 1,
  /** 购买环境 */
  BUY: 1 << 2,
  /** 无操作（无响应，但是禁止穿透） */
  NOT_OP: 1 << 3,
  /** 禁用触摸事件(允许点击穿透) */
  NOT_TOUCH: 1 << 4,
  /** 文本位置下方正中间 */
  NUMPOS_ITEM_BC: 1 << 5,
  /** 不现实数量 */
  NO_NUM: 1 << 6,
  /** 被选中 */
  SELECT: 1 << 7,
  /** 不现实背景图 */
  NO_BG: 1 << 8,
  /** 图标缩小一半 */
  ICON_SCALE: 1 << 9,
  /** 材料类型，不显示自己拥有数量，只显示需要数量 */
  MATERIAL_NO_HAVE: 1 << 10,
  /**不显示数量操作 */
  NO_NUM_NODE: 1 << 11,
  /** 材料 */
  MATERIAL: 1 << 12,
  /** 数字反向缩放 */
  NUM_SCALE: 1 << 13,
  /** 消耗显示样式-左右显示图标和icon */
  MATERIAL_STYLE_LINE: (1 << 12) | (1 << 8) | (1 << 9),
  /**允许触摸事件 不现实数量*/
  TOUCH: 1 << 14,
  /**合成强化 */
  BLESS: 1 << 15,
  /**既无背景又有底部强化值 */
  NO_BG_SHOWSLV: 1 << 16,
  /**商店放大图标 */
  SCALEICON: 1 << 17,
  /**合成放大图标 */
  SCALEBLESSICON: 1 << 18,
  /**空图标 */
  NULLICON: 1 << 19,
  /**显示特效 */
  SHOWLIGHT: 1 << 20,
  /**无强化等级 */
  NO_SLV: 1 << 21,
};

/** 加载类型枚举 */
export enum LoadingType {
  MapStart,
  AppStart,
  PloatScene,
  GameScene,
  InitRole,
  BattleScene,
  Simulator,
}

/**排序 */
export enum CompareEnum {
  CEQual = 0,
  CGreater = -1,
  CLess = 1,
}

/** 弹窗提示类型 */
export enum ITEMTYPE {
  /**金币 */
  COIN,
  PY,
}

/**段位 */
export enum RANKLV {
  RANKLV0,
  /**青铜 */
  RANKLV1,
  /**白银 */
  RANKLV2,
  /**黄金 */
  RANKLV3,
  /**钻石 */
  RANKLV4,
  /**星耀 */
  RANKLV5,
  /**大师 */
  RANKLV6,
  /**王者 */
  RANKLV7,
}

/** 弹窗提示类型 */
export enum ToastType {
  Null,
  /** 游戏提示 */
  WarnTip,
  End,
}

/**战斗场景 */
export enum PART_BTL_SCENE {
  /** 过关 */
  GUANQIA = 0,
  /**竞技场 */
  ARENA,
}

/**打点点 */
export const PointInfo = {};

export const CHECK_TIME = {
  TIME_CLOCK_CHECK: 10, // (s)
};

/**
 * 红点动效类型
 */
export enum RedpointEffect {
  /**闪烁 */
  BLING,
  /**特效 */
  RUNNING,
  /**感叹号红点 */
  REDPOINT,
}

/**排位赛宝箱 */
export enum rankLvBoxItem {
  /**无宝箱 */
  NULL,
  /**未解锁 */
  box0,
  /**宝箱解锁待领取 */
  box1,
  /**宝箱已领取 */
  box2,
}

/**段位宝箱状态 */
export enum levelBoxItem {
  /**2个宝箱同时解锁 */
  doubleBox = 1,
  /**视频宝箱未解锁 */
  adbox0 = 2,
  /**视频宝箱解锁 */
  adbox1 = 3,
  /**视频宝箱已领取 */
  adbox2 = 4,
  /**普通宝箱未解锁 */
  box0 = 5,
  /**普通宝箱解锁 */
  box1 = 6,
  /**普通宝箱已领取 */
  box2 = 7,
  /**观看视频宝箱 */
  adbox,
  /**普通宝箱 */
  box,
}

/**段位奖励任务要求类型 */
export enum taskType {
  /**无 */
  default,
  /**段位要求 */
  rankLv,
  /**胜利场次 */
  battleWin,
  /**段位星数 */
  rankNum,
}

/**段位奖励任务状态 */
export enum taskState {
  /**未开启 */
  notOpen,
  /**开启 */
  open,
  /**完成 */
  complete,
}

export enum npc {
  default,
  /**npc */
  npc1,
  /** */
  npc2,
  /** */
  npc3,
}

export enum rewardType {
  /**id */
  id,
  /**数量 */
  num,
}

export enum rewardWind {
  default,
  /**段位宝箱奖励 */
  reward,
  /**排位赛宝箱奖励 */
  boxRank,
}

/**buff增益效果 */
//#region
export const CMsg = {
  client: {
    sdk: {
      onShareScreenSuc: "CMsg.client.sdk.onShareScreenSuc",
    },

    currency: {
      /**金币 体力 监听 */
      onCurrencyChange: "CMsg.client.currency.onCurrencyChange",
    },

    view: {
      /**监听当前窗口id */
      onViewChange: "CMsg.client.view.onViewChange",
      /**排位赛过关数量 */
      onRankPassLevel: "CMsg.client.view.onRankPassLevel",
      /**排位赛解锁 */
      onRankLock: "CMsg.client.view.onRankLock",
      /**战斗胜利 */
      onBattleWin: "CMsg.client.view.onBattleWin",
    },
    fight: {
      onPlayerMove: "CMsg.client.fight.onPlayerMove",
      onPlayerEndAction: "CMsg.client.fight.onPlayerEndAction",
      onPlayerDice: "CMsg.client.fight.onPlayerDice",
      onPlayerJump: "Cmsg.client.fight.onPlayerJump",
      onChangeDiceBtn: "CMsg.client.fight.onChangeDiceBtn",
      endFight: "CMsg.client.fightUI.endFight",
    },
  },
  rPoint: {
    // 红点模块
    valueSetting: "CMsg.rPoint.valueSetting",
    viewSetting: "CMsg.rPoint.viewSetting",
  },
  data: {
    onClientGuideChange: "CMsg.data.onClientGuideChange",
    setGuide: "CMsg.data.setGuide",
    onGuideEvent: "CMsg.data.onGuideEvent",
  },
  unlock: {},
};
//#endregion

/** Key format */
export const KF = {
  genItemKey(id: number, type: number): string {
    return id + "_" + type;
  },
  deItemKey(str: string): [number, number] {
    if (!str || str == INVALID_STRING_VALUE)
      return [INVALID_VALUE, INVALID_VALUE];
    let strs = str.split("_");
    return [parseInt(strs[0]), parseInt(strs[1])];
  },

  getLogKey(main: number, sub: number): number {
    return main * 10000 + sub;
  },
  deLogKey(key: number): [number, number] {
    return [Math.floor(key / 10000), key % 10000];
  },

  posDecode: function (str: string): cc.Vec2 {
    if (!str || str == INVALID_STRING_VALUE) return cc.Vec2.ZERO;
    let strs = str.split("_");
    if (strs.length != 2) {
      cc.error("army id format be error! ");
      return null;
    }
    return cc.v2(parseInt(strs[0]), parseInt(strs[1]));
  },

  posEncode: function (pos: cc.Vec2): string {
    return pos.x + "_" + pos.y;
  },

  spliteArrays<T>(src: T[], num: number): T[][] {
    let totalSize = src.length;
    let res = [];
    let item = [];
    for (let i = 0; i < totalSize; i++) {
      if (!item) item = [];
      item.push(src[i]);
      if (i == totalSize - 1) {
        res.push(item);
      } else if (item.length == num) {
        res.push(item);
        item = null;
      }
    }
    return res;
  },
};
