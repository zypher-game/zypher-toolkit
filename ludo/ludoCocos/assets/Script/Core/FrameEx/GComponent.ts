import { AnimationConfigure } from "../../../../d.ts/game/JXCLBtl";
import { GAssetImpl } from "../GLoader/GLoader";
import { AnimationChipCallBack, AnimationClipsCallBack } from "../Manager/type";

let errorWrap = function (e) {
  return cc.js.formatStr((e && e.stack) || e);
};

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/GBase/GComponent")
export default class GComponent extends cc.Component {
  protected _assetImpl: GAssetImpl;
  public get assetImpl(): GAssetImpl {
    if (!this._assetImpl) {
      this._assetImpl = GAssetImpl.getAssetImpl(cc.js.getClassName(this));
    }
    return this._assetImpl;
  }

  onLoad() {
    // try {
    this.__onLoad();
    // } catch (error) {
    //     let classErr = `ClassName: ${cc.js.getClassName(this)} :`;
    //     cc.error(classErr, error);

    // }
  }

  protected __onLoad() {}

  /** 这个函数只有窗口初始化的时候可以调用，其他时候禁止调用 */
  public __onGStart(...args: any[]) {
    // try {
    this.onGStart(...args);
    this.emitEvent();
    // } catch (error) {
    //     let classErr = `ClassName: ${cc.js.getClassName(this)} :`;
    //     cc.error(classErr, error);
    // }
  }

  public emitEvent() {}

  public onGStart(...args: any[]) {}

  protected onDestroy() {
    if (!CC_EDITOR) {
      if (this._assetImpl) {
        this._assetImpl.release();
        this._assetImpl = null;
      }
    }
    this.__onDestroy();
  }

  protected __onDestroy() {}

  public addGChild<T>(
    path: string | cc.Prefab,
    cb?: { (comp: T): void } | cc.Node,
    ...otherArgs: any[]
  ): T {
    let item;
    this.assetImpl.addGChild(path, (gchild: any) => {
      if (!this.isValid) return;
      if (cb instanceof cc.Node) {
        gchild.node.parent = cb;
      } else cb && cb(gchild);
      gchild.__onGStart(...otherArgs);
      item = gchild;
    });
    return item;
  }

  protected nodeAddClip(
    aniNode: cc.Node,
    path,
    config: AnimationConfigure,
    cb
  ) {
    this.loadJXAniClip(
      path,
      config.aniName,
      config.prefix,
      config.numberFix,
      (clip) => {
        if (!cc.isValid(aniNode)) return;
        let ani = aniNode.getComponent(cc.Animation);
        if (!ani) {
          ani = aniNode.addComponent(cc.Animation);
        }
        let sp = aniNode.getComponent(cc.Sprite);
        if (!sp) {
          sp = aniNode.addComponent(cc.Sprite);
        }
        sp.sizeMode = cc.Sprite.SizeMode.RAW;
        sp.trim = false;
        ani.addClip(clip);
        cb(ani);
      }
    );
  }

  protected loadJXAniClip(
    path: string,
    aniName: string,
    prefix: string,
    numberFix: number,
    cb: AnimationChipCallBack
  ) {
    this.assetImpl.loadJXAniClip(path, aniName, prefix, numberFix, (clip) => {
      if (!cc.isValid(this)) return;
      cb(clip);
    });
  }

  protected loadJXAniClips(
    path: string,
    cb: AnimationClipsCallBack,
    ...configs: AnimationConfigure[]
  ) {
    this.assetImpl.loadJXAniClips(
      path,
      (clips) => {
        if (!cc.isValid(this)) return;
        cb(clips);
      },
      ...configs
    );
  }
}
