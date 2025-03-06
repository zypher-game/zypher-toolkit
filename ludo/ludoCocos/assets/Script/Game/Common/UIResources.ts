export const Res = {
  font: {},
  // spriteframe
  texture: {
    views: {},
  },
  prefab: {
    vw: {
      home: {},
      tip: {
        wait: "tip/WaitCtrl",
      },
      fight: {},
    },

    item: {},
  },

  animation: {
    kuang: {
      // kuang1: { path: "frames/views/kuangAni1", aniName: 'kuang', prefix: 'K_', numberFix: 4 },
      // kuang2: { path: "frames/views/kuangAni2", aniName: 'kuang', prefix: 'K2_', numberFix: 4 },
    },
  },
  spine: {},
  dragonBones: {
    guide: "dragon/sp_shouzhi_",
  },
  material: {
    // uiguide: 'materials/ui-guide'
  },
  audio: {},
  // 路径索引统一中心位置修复配置
  positionOffset: {
    invalidClick: "1",
  },

  mapCtrl: "commonPrefab/map/MapCtrl",
  mapPlayer: "commonPrefab/map/Player",

  /**加载页模块 */
  loadCtrl: "common/loadCtrl/LoadCtrl",
  /**某白色图片 */
  single: "resources/singleColor",
  /**主界面模块 */
  homeCtrl: {
    homeCtrl: "homeCtrl/HomeCtrl",
    AIPlayerSetting: "homeCtrl/dialog/AIPlayerSetting",
    DailyTasks: "homeCtrl/dialog/DailyTasks",
    Help: "homeCtrl/dialog/Help",
    LeaderBoard: "homeCtrl/dialog/LeaderBoard",
    Settings: "homeCtrl/dialog/Settings",
  },
  /**公共模块 */
  common: {
    toast: "common/tip/ToastCtrl",
    topUiItem: "commonPrefab/TopUiItem",
    frameItem: "commonPrefab/FrameItem",
    rewardCtrl: "commonPrefab/RewardCtrl",
    JXItem: "commonPrefab/JXItem",
    npcHead: "commonPrefab/views/npcHead",
    guide_item: "common/guide/GuideNode",
    guide: "common/dragon/sp_shouzhi_",
    audio: {
      bgm: "commonPrefab/audio/bgm", //
      baoza: "commonPrefab/audio/baoza", //
      button: "commonPrefab/audio/button", //
      fail: "commonPrefab/audio/fail", //
      fashe: "commonPrefab/audio/fashe", //
      feiji: "commonPrefab/audio/feiji", //
      feixing: "commonPrefab/audio/feixing", //
      houtui: "commonPrefab/audio/houtui", //
      baoza1: "commonPrefab/audio/baoza1",
      paotai: "commonPrefab/audio/paotai", //
      reward: "commonPrefab/audio/reward", //
      star: "commonPrefab/audio/star", //
      success: "commonPrefab/audio/success", //
      touzi: "commonPrefab/audio/touzi", //
      zhuangfei: "commonPrefab/audio/zhuangfei", //
      suikuai: "commonPrefab/audio/suikuai",
      smile: "commonPrefab/audio/smile",
    },
  },
  /**数据模块 */
  data: {
    data: "data/",
  },
  /**匹配界面 */
  MatchCtrl: {
    MatchCtrl: "MatchCtrl/MatchCtrl",
  },
  /**战斗 */
  fight: {
    fightCtrl: "fight/prefab/BattleViewCtrl",
    role: "fight/prefab/JXRole",
    player: "fight/prefab/JXRBPlayer",
    plane: "fight/",
    shaizi: "fight/effect/shaizi",
    fight: "fight/views/fightPage",
  },

  gameOverCtrl: {
    battleResultCtrl: "gameOverCtrl/prefab/BattleResultCtrl",
    battleResultCtrlImg: "gameOverCtrl/views/gameOver",
  },
};
//GAssetImpl.loader.textureRes = Res.texture;
