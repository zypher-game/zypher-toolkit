import GComponent from "../FrameEx/GComponent";
import { GCtrl } from "../GCtrl";
import { GAssetImpl } from "../GLoader/GLoader";
import GCustomData from "./GCustomData";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/GBase/GChild")
export default class GChild extends GComponent {
  public get assetImpl(): GAssetImpl {
    if (!this._assetImpl) {
      this._assetImpl = GAssetImpl.getAssetImpl(
        cc.js.getClassName(this) + this.uuid
      );
    }
    return this._assetImpl;
  }

  protected _customData: GCustomData = null;
  public get customData(): GCustomData {
    return this._customData;
  }
  public setCustomData(data) {
    if (!this._customData) {
      this._customData = this.node.addComponent(GCustomData);
    }
    this._customData.setData(data);
  }

  protected __onLoad() {
    this.onGLoad();
  }

  public onGLoad() {}

  public onGStart(...args) {}

  protected __onDestroy() {
    GCtrl.ES.off(this);
    GCtrl.ES.off(this.node);
    GCtrl.ES.emit("ONGChildDestroy", GCtrl.param(this));
    this.onGDestroy();
  }

  public onGDestroy() {}
}
