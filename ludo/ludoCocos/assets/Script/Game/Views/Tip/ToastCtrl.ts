import MaskSprite from "../../../Core/FrameEx/MaskSprite";
import GChild from "../../../Core/GView/GChild";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/Tip/ToastCtrl")
export default class ToastCtrl extends GChild {
  @property(cc.RichText) tip: cc.RichText = null;

  @property(MaskSprite) icon: MaskSprite = null;
  @property(cc.Sprite) bgImage: cc.Sprite = null;

  protected _duration: number = 2;

  protected _rCb: any = null;

  public setRcb(rCb) {
    this._rCb = rCb;
  }

  public setText(msg: string, duration?: number) {
    this.node.y = 0;
    this.node.x = 0;
    this.node.opacity = 255;
    let msgs = msg.split("$");
    let icon, maskType;
    if (msgs.length > 1) {
      icon = msgs[0];
      maskType = parseInt(msgs[1]);
      msg = msgs[2];
    }
    if (this.icon && icon) {
      this.icon.node.active = true;
      this.icon._maskType = maskType;
      this.assetImpl.spriteFrame(this.icon, icon);
    } else {
      if (this.icon) {
        this.icon.node.active = true;
      }
    }
    if (!this.tip) return;
    if (duration) this._duration = duration;
    this.tip.string = msg;
    this.node.y = -100;
    let spaw = cc.spawn(
      cc.moveTo(this._duration, cc.v2(0, 100)),
      cc.sequence(
        cc.delayTime((1 * this._duration) / 2),
        cc.fadeOut((1 * this._duration) / 2)
      )
    );
    let action = cc.sequence(
      spaw,
      cc.callFunc(() => {
        // GCtrl.destroy(this.node);
        this._rCb && this._rCb(this.node);
      })
    );
    this.node.runAction(action);
    if (this.tip.node.width > 350) {
      this.bgImage.node.width = this.tip.node.width + 50;
    } else {
      this.bgImage.node.width = 350;
    }
  }

  public setDuration(duration: number) {
    this._duration = duration;
  }
}
