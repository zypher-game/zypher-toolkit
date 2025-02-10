import GComponent from "../Core/FrameEx/GComponent";

const { ccclass, property, requireComponent, executeInEditMode, menu } =
  cc._decorator;
@ccclass
@menu("Shaders/SLGuideShader")
export default class SLGuideShader extends GComponent {
  @property([cc.Float]) mask1: number[] = [0, 0, 0, 0];
  @property([cc.Float]) mask2: number[] = [0, 0, 0, 0];
  @property(cc.Boolean) inverted: boolean = false;

  @property(cc.Material) _maskMaterial: cc.Material = null;
  @property(cc.Sprite) _sprite: cc.Sprite = null;
  __onLoad() {
    this.node.setContentSize(cc.winSize);
    let material =
      this.assetImpl.getPreLoadAsset<cc.Material>("materials/ui-guide");
    this._sprite = this.node.getComponent(cc.Sprite);
    if (material) {
      this._sprite.setMaterial(0, material);
      this._maskMaterial = this._sprite.getMaterial(0);
      this._maskMaterial.setProperty(
        "wh_ratio",
        cc.winSize.width / cc.winSize.height
      );
    }
  }

  reSetMask1(mask1: number[], mask2?: number[]) {
    if (!this._maskMaterial) return;
    if (
      this.mask1[0] == mask1[0] &&
      this.mask1[1] == mask1[1] &&
      this.mask1[2] == mask1[2] &&
      this.mask1[3] == mask1[3]
    )
      return;
    this.mask1 = mask1;
    this._maskMaterial.setProperty(
      "mask1_point",
      cc.v2(
        this.mask1[0] / this.node.width,
        1 - this.mask1[1] / this.node.height
      )
    );
    this._maskMaterial.setProperty(
      "mask1_size",
      cc.v2(this.mask1[2] / this.node.width, this.mask1[3] / this.node.height)
    );
    if (mask2) this.reSetMask2(mask2);
  }

  reSetMask2(mask2: number[]) {
    if (!this._maskMaterial) return;
    if (
      this.mask2[0] == mask2[0] &&
      this.mask2[1] == mask2[1] &&
      this.mask2[2] == mask2[2] &&
      this.mask2[3] == mask2[3]
    )
      return;
    this.mask2 = mask2;

    this._maskMaterial.setProperty(
      "mask2_point",
      cc.v2(
        this.mask2[0] / this.node.width,
        1 - this.mask2[1] / this.node.height
      )
    );
    this._maskMaterial.setProperty(
      "mask2_size",
      cc.v2(this.mask2[2] / this.node.width, this.mask2[3] / this.node.height)
    );
  }
}
