import { GCtrl } from "../GCtrl";

/**
 * @name GViewDestory
 * @author Visow
 * @description 对象销毁同意统一处理组件
 * @class
 */

const { ccclass, property, menu } = cc._decorator;

/**自动销毁组件，用来处理销毁时的通用组件 */
@ccclass
@menu("View/GBase/GViewDestory")
export default class GViewDestory extends cc.Component {
  public otherDestroyCb: any;

  onDestroy() {
    GCtrl.ES.off(this.node);
    if (this.otherDestroyCb) this.otherDestroyCb();
    this.otherDestroyCb = null;
  }
}
