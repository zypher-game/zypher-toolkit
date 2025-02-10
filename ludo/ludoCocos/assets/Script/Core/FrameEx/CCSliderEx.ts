/**
 * !#en The Slider Direction
 * !#zh 滑动器方向
 * @enum Slider.Direction
 */
var Direction = cc.Enum({
  /**
   * !#en The horizontal direction.
   * !#zh 水平方向
   * @property {Number} Horizontal
   */
  Horizontal: 0,
  /**
   * !#en The vertical direction.
   * !#zh 垂直方向
   * @property {Number} Vertical
   */
  Vertical: 1,
});

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("FrameEx/SliderEx")
export default class SliderEx extends cc.Slider {
  @property(cc.Sprite) proBar: cc.Sprite = null;

  protected _updateHandlePosition() {
    if (!this.handle) {
      return;
    }
    var handlelocalPos;
    if (this.direction === Direction.Horizontal) {
      handlelocalPos = cc.v2(
        -this.node.width * this.node.anchorX + this.progress * this.node.width,
        0
      );
    } else {
      handlelocalPos = cc.v2(
        0,
        -this.node.height * this.node.anchorY + this.progress * this.node.height
      );
    }
    var worldSpacePos = this.node.convertToWorldSpaceAR(handlelocalPos);
    let nodePos = this.handle.node.parent.convertToNodeSpaceAR(worldSpacePos);
    if (this.direction === Direction.Horizontal) {
      this.handle.node.x = nodePos.x;
    } else {
      this.handle.node.y = nodePos.y;
    }
    if (this.proBar) this.proBar.fillRange = this.progress;
  }
}
