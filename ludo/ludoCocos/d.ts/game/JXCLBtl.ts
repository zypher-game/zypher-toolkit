import { taskType } from "../../assets/Script/Game/Common/Define";
import { GuidType } from "../../assets/Script/Game/Guide/GuideLogic";
import { BattleAssets } from "../../assets/Script/Game/Views/Fight/JXULAssets";
/**
 * 地图元素（实例化的模板，或者实例化的格子）
 */
// [
//   1214, // id 0
//   [ // coordinate 1
//       12,
//       14
//   ],
//   [ // gridInfo 2
//       0,
//       0,
//       0
//   ],
//   -211, // index 3
//   [ // MATERIAL 4
//       [
//           1, // TYPE
//           [  // position
//               0,
//               -20
//           ],
//           [ // scale
//               1.1,
//               1
//           ],
//           0 // zindex
//       ]
//   ]
// ],
export declare type MapElementDataTpl = [
  number, // id
  number[],
  number[],
  number,
  any[]
];
export type StringOrNumber = string | number;
export interface ProgressCallback<T> {
  (completedCount: number, totalCount: number, item?: T): void;
}

export interface CompleteCallback<T> {
  (): void;
}
export type GDataRaw = {};
declare var i18n: {
  curLang: string;
  inited: boolean;
  ttf: any;
};
declare global {
  interface Window {
    wdStatics: {
      locales: string[];
      launchFiles: string[];
      allFiles: string[];
      loadStatus?: string[];
    };
  }
}
export type SSystemConfigRaw = {
  key: string;
  value: any;
};
export type SPlaneDataRaw = {
  id: string | number;
  model?: string | number;
  name?: string;
};

export type SLevelRewardDataRaw = {
  id: string | number;
  task?: taskType[][];
  info?: string;
};

export type SNpcDataRaw = {
  id: string | number;
  name?: string;
  icon?: number;
};

export type SRankRewardDataRaw = {
  id: string | number;
  type: string | number;
  name: number;
};

export type SRankDataRaw = {
  id: string | number;
  blindBox?: number[];
};
export type SGuideChainDataRaw = {
  guideId: number;
  viewId?: number;
  closeId?: number;
  chain?: number[];
  keyStep?: number;
};

export type SLevelDataRaw = {
  id: string | number;
  type: string | number;
  level: string | number;
  videoReward: number[];
  npcquantity?: number;
};

export type LevelReward = {
  adbox: number;
  box: number;
};
export type IGradeRankInfo = {
  isSelf?: number;
  name?: string;
  icon?: number;
  levelLv?: number;
  starNum?: number;
};
export type ItemCostResult = {
  raw?: number;
  cur?: number;
  need?: number;
  ext?: {
    enoughTimes?: number;
    enoughCost?: number;
  };
  enough?: boolean;
  tip?: string;
};
export type IRankLevel = {
  lv: number;
  count: number;
};
export type RPointNode = {
  mask: number[];
  subPath: string | cc.Node;
  effectType?: number;
  posType?: number;
  cb?: any;
};
export type RPointValue = {
  mask: number;
  value: boolean;
  forceStop?: boolean;
};
export type TimerTaskInfo = {
  time: number;
  tickTime: number;
  end?: number;
  start?: number;
  update?: (subTime: number, totalTime: number) => {};
  endcb?: () => {};
};

export type TimerTickInfo = {
  time: number;
  tickTime: number;
  update?: (subTime: number, totalTime: number) => {};
  endcb?: () => {};
};
export type PreventClicksValue = {
  target: any;
  time: number;
  startCb?: () => {};
  endCb?: () => {};
};
export type GameTimer = {
  delta: number;
  checkTime: number;
  outTimeHandler?: (delta: number) => void;
};
export type GameTimeClock = {};
export type AnimationConfigure = {
  aniName: string;
  prefix: string;
  numberFix: number;
  minIdx: number;
  maxIdx: number;
};
export type GListItem = {
  isSelect: boolean;
  node: cc.Node;
  x: number;
  y: number;
  data: any;
};
export type GListViewParams = {
  itemTpl: cc.Node;
  width?: number;
  height?: number;
  gapX?: number;
  gapY?: number;
  padingX?: number;
  padingY?: number;
  row?: number;
  column?: number;

  cbHost?: number;
  itemSetter?: (item: any, data: any, index: number) => void;
  recycleCb?: (item: any) => void;
  selectSetter?: (
    item: any,
    data: any,
    is_select: boolean,
    index: number
  ) => void;
  scrollToEndCb?: () => void;
  childClick?: (item: any, data: any, index: number) => void;
  autoScrolling?: boolean;
  isCbClass?: boolean;
  isWidget?: boolean;
  childLongTouch?: (item: any, data: any, index: number, times: number) => void;
  childLongTouchFristTime?: number;
  childLongTouchUpdateTime?: number;

  scrollview?: cc.ScrollView;
  mask?: cc.Node;
  content?: cc.Node;
  direction?: number;
  scrollingCb?: () => void;
};
export type PreLoadAsset = {
  path: string;
};
export interface ArgsBattleViewCtrl<T> {
  // 根据实际情况添加属性
  // 例如：
  playerId?: number;
  levelId?: number;
  enemyIds?: number[];
  args: any[];
  sceneId?: number;
  assetManager?: BattleAssets;
}

export type IChessBtl = {
  isPlayer: boolean;
  name: string;
  icon: number;
  id: string;
  dir?: number;
  tableId?: number;
};
export type NodeCallBack = (node: cc.Node) => void;
export type WinCb = {
  rankIndex: number;
  max: number;
  rankBoxItem: IRankBoxItem;
  curLevel: number;
  sceneId?: number;
};

export type RankInfo = {
  rankLv: number;
  rankNum: number;
};

export type IRankBoxItem = {
  rankLv: number;
  rankPageLv: number;
  rankCount: number;
  rankEnd: boolean;
};
export type IComLike = {};
export type JXCLAction = {};
export type COINPAREM = {
  coin: string;
  add: string;
};
