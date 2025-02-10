import GChild from "./GChild";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/Base/GPage")
export default class GPage extends GChild {
  protected _isPageShow: boolean = false;

  public onPageActive() {
    this.node.active = true;
  }

  public onPageDisable() {
    this.node.active = false;
  }

  public onPageOut() {
    this._isPageShow = false;
  }

  public onPageIn() {
    this._isPageShow = true;
  }
}
