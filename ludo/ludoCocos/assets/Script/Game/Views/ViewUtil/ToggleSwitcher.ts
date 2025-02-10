import { ViewUtil } from "../ViewUtil/VIewUtil";

const { property, ccclass, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class ToggleSwitcher extends cc.Component {
  @property(cc.Node) markNode: cc.Node = null;
  @property(cc.Node) unMarkNode: cc.Node = null;
  @property(cc.Node) clickNode: cc.Node = null;
  @property({
    type: cc.Boolean,
  })
  get Mark() {
    return this._isMark;
  }
  set Mark(is: boolean) {
    this._isMark = is;
    this.init();
  }

  @property()
  _isMark: boolean = false;

  @property({
    type: cc.Component.EventHandler,
  })
  clickEventHander: cc.Component.EventHandler = null;

  public onLoad() {
    this.init();
    if (!CC_EDITOR) {
      if (!this.clickNode.getComponent(cc.Button)) {
        this.clickNode.addComponent(cc.Button);
      }
      this.clickNode.on(
        "click",
        () => {
          this.Mark = !this.Mark;
          this.init();
          this.clickEventHander.emit([
            this.Mark,
            this.clickEventHander.customEventData,
          ]);
        },
        this
      );
    }
  }

  public init() {
    if (this.unMarkNode && this.markNode) {
      if (this.Mark) {
        this.markNode.active = true;
        this.unMarkNode.active = false;
      } else {
        this.markNode.active = false;
        this.unMarkNode.active = true;
      }
    }
  }
}
