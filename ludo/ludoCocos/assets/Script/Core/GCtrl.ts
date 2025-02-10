import GEventSystem from "./GEvent/GEventSystem";
import GParam from "./GEvent/GParam";
import { GAssetImpl, GLoader } from "./GLoader/GLoader";
import GChild from "./GView/GChild";
import GTimerMgr from "./Manager/GTimerMgr";

export class GCtrl {
  /** 全局秒级别时间时间 */
  public static GTimerSecondEventMsg = "GTimer.Event.GTimerSecondEventMsg";
  /** 全局毫秒级时间事件 */
  public static GTimerMilliEventMsg = "GTimer.Event.GTimerMilliEventMsg";
  /** 全局窗口析构事件 */
  public static GClientWinDestroyEventMsg =
    "UIMgr.Event.GClientWinDestroyEventMsg";
  /** 全局窗口打开事件 */
  public static GClientWinOpenEventMsg = "UIMgr.Event.GClientWinOpenEventMsg";
  public static GClientWinOpenEventAfterMsg =
    "UIMgr.Event.GClientWinOpenEventAfterMsg";
  /** 客户端服务端时间差 */
  public static serverSubTime: number = 0;
  /** 获取当前服务器时间 */
  public static get now(): number {
    return this.serverSubTime + Date.now();
  }
  /** 获取统一的事件调度间隔(s) */
  public static get deltaSecondTime(): number {
    return GTimerMgr.secondDelta;
  }
  /** 获取统一的事件调度间隔(ms) */
  public static get deltaMilliTime(): number {
    return GTimerMgr.mDelta;
  }

  /**事件对象 */
  public static ES = GEventSystem;
  /**new GParam */
  public static param(msg?: any): GParam {
    return new GParam(msg);
  }

  /**碰撞分组 */
  public static ColliderGroup = {
    /** 默认分组 */
    default: "default",
    /*障碍分组 */
    platform: "platform",
    /**玩家分组 */
    player: "player",
    /**道具分组*/
    item: "item",
  };

  protected static _isWaitting = false;

  /** 获取当前场景的画布 */
  public static get canvase(): cc.Canvas {
    var node = cc.director.getScene().getChildByName("Canvas");
    return node.getComponent(cc.Canvas);
  }

  /** 视图大小 */
  public static get winSize(): cc.Size {
    return cc.view.getVisibleSize();
  }
  /** 设计分辨率 */
  public static get designSize(): cc.Size {
    return cc.view.getDesignResolutionSize();
  }

  /** 舞台最大大小 */
  public static get actualSize(): cc.Size {
    let winSize = cc.winSize;
    return cc.size(
      Math.min(winSize.width, 1442),
      Math.min(winSize.height, 640)
    );
  }

  /** 高度适配比例 */
  public static get hRatio(): number {
    return this.winSize.height / this.designSize.height;
  }

  public static getGChild<T extends GChild>(
    node: cc.Node,
    type: { new (): T }
  ): T {
    let className = cc.js.getClassName(type);
    return node.getComponent(className);
  }

  public static findCom<T extends cc.Component>(
    path: string,
    parent: cc.Node,
    type: { prototype: T }
  ): T {
    let node = cc.find(path, parent);
    if (!node) return null;
    return node.getComponent(type);
  }

  public static preLoadRawAssets(
    progressCallBack: ProgressCallback<any>,
    completeCallBack: CompleteCallback<any>,
    ...assetInfos: { type: typeof cc.Asset; path: string }[]
  ) {
    if (assetInfos.length == 0) {
      if (completeCallBack) completeCallBack();
      return;
    }
    GLoader.preLoads(
      (
        curIndex: number,
        count: number,
        assetName: string,
        err: Error,
        asset
      ) => {
        let result =
          "加载资源中, 当前进度：" +
          curIndex +
          "/" +
          count +
          ", 加载资源名称：" +
          assetName +
          ", 状态:";

        if (!err) {
          cc.log(result + "加载成功");
        } else {
          cc.log(result + err.message);
        }
        progressCallBack && progressCallBack(curIndex, count, asset);
        if (curIndex == assetInfos.length) {
          if (completeCallBack) completeCallBack();
        }
      },
      ...assetInfos
    );
  }

  public static afterFrames(cb) {
    cc.director.once(cc.Director.EVENT_AFTER_UPDATE, () => {
      cc.director.once(cc.Director.EVENT_BEFORE_DRAW, () => {
        cb && cb();
      });
    });
  }

  /**
   * 播放指定动画
   * @param state 播放的动画
   * @param isLoop 是否循环
   * @param Fun 回调
   */
  public static playDragonAni(
    ani: dragonBones.ArmatureDisplay,
    state: string,
    isLoop: boolean | number,
    callback?: () => void
  ) {
    //循环
    const loopTime = isLoop ? 0 : 1;
    if (state != ani.animationName) {
      ani.playAnimation(state, loopTime);
    }
    if (loopTime) {
      if (callback) {
        let cb = () => {
          callback.call(this);
        };
        ani.once(dragonBones.EventObject.COMPLETE, cb);
      }
    }
  }

  /**播放帧动画 */
  public static playFrameAni(
    assetImpl: GAssetImpl,
    config,
    aniNode: cc.Node,
    isLood: boolean = false,
    cb?,
    speed?: number,
    setBlend: boolean = false
  ) {
    assetImpl.loadJXAniClip(
      config.path,
      config.aniName,
      config.prefix,
      config.numberFix,
      (clip: cc.AnimationClip) => {
        if (!cc.isValid(aniNode)) return;
        let ani = aniNode.getComponent(cc.Animation);
        if (!ani) {
          ani = aniNode.addComponent(cc.Animation);
        }
        let sp = aniNode.getComponent(cc.Sprite);
        if (!sp) {
          sp = aniNode.addComponent(cc.Sprite);
        }
        if (setBlend) {
          sp.setBlend(cc.macro.BlendFactor.SRC_ALPHA, cc.macro.BlendFactor.ONE);
        }
        sp.sizeMode = cc.Sprite.SizeMode.RAW;
        sp.trim = false;
        ani.addClip(clip);
        if (speed) {
          clip.speed = speed;
        }
        aniNode.active = true;
        if (!isLood) {
          ani.play(config.aniName).wrapMode = cc.WrapMode.Normal;
          ani.once(cc.Animation.EventType.FINISHED, () => {
            aniNode.active = false;
            if (cb) {
              cb();
            }
          });
        } else {
          ani.play(config.aniName).wrapMode = cc.WrapMode.Loop;
        }
      }
    );
  }

  /**设置龙骨动画 */
  public static setDragonBoanesAni(
    aslp,
    node: cc.Node,
    path: string,
    aniName: string,
    isLoop: boolean,
    cb?
  ) {
    let dar = node.addComponent(dragonBones.ArmatureDisplay);
    if (!dar) return;
    aslp.dragonBones(
      path,
      (
        dragonBonesAsset: dragonBones.DragonBonesAsset,
        dragonBonesAtlas: dragonBones.DragonBonesAtlasAsset
      ) => {
        dar.dragonAsset = dragonBonesAsset;
        dar.dragonAtlasAsset = dragonBonesAtlas;
        dar.armatureName = "Armature";
        GCtrl.playDragonAni(dar, aniName, isLoop, cb);
      }
    );
  }
}
