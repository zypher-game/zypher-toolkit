import GViewBase from "../../../Core/GView/GViewBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("View/Tip/WaitCtrl")
export default class WaitCtrl extends GViewBase {
  // @property(cc.Node) load: cc.Node[] = []
  @property(cc.Node) loadRing: cc.Node = null;
  @property(cc.Label) netTip: cc.Label = null;
  protected _curNetText: string = "";
  onGLoad() {}

  onGStart() {
    this.commonWait();
  }

  public commonWait(unAutoClose?: boolean) {
    this.loadRing.stopAllActions();
    this.bgImage.node.opacity = 0;
    let endFunc = () => {
      if (unAutoClose) {
        this.commonWait(true);
        return;
      }
      this.onClose();
    };
    cc.tween(this.loadRing)
      .delay(0.2)
      .call(() => {
        this.bgImage.node.opacity = 255;
      })
      .repeat(100, cc.tween(this.loadRing).by(0.2, { angle: -90 }))
      .call(endFunc)
      .start();
  }

  public disConnectWait() {
    this.commonWait(true);
    this._curNetText = "";
  }
}
