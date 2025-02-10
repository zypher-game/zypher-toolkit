import GComponent from "../Core/FrameEx/GComponent";

const { ccclass, property, requireComponent, executeInEditMode, menu } =
  cc._decorator;
@ccclass
@menu("Shaders/SLTextShowShader")
@executeInEditMode
export default class SLTextShowShader extends GComponent {
  @property(cc.Material) _maskMaterial: cc.Material = null;
  @property(cc.Sprite) _sprite: cc.Sprite = null;

  protected _easpTime: number = 0;
  __onLoad() {
    this._sprite = this.node.getComponent(cc.Sprite);
    let frame = this._sprite.spriteFrame;
    frame["__unpack"] = true;
    this._maskMaterial = this._sprite.getMaterial(0);
  }

  update(dt: number) {
    this._easpTime += dt;
    if (this._easpTime > 5) {
      this._easpTime = 5;
    }
    this._maskMaterial.setProperty("u_time", this._easpTime / 3);
  }
}
