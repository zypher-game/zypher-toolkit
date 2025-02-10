import GComponent from "../Core/FrameEx/GComponent";
import { GAssetImpl } from "../Core/GLoader/GLoader";
import { JXColor } from "../Game/Common/JXColor";
import { delayAction } from "../Game/Common/UIAction";

const { ccclass, property, requireComponent, executeInEditMode, menu } =
  cc._decorator;
@ccclass
@menu("Shaders/SLTransitions")
export default class SLTransitions extends GComponent {
  @property(cc.Material) material: cc.Material = null;
  @property(cc.Sprite) sprite: cc.Sprite = null;
  @property(cc.Node) targetNode: cc.Node = null;
  @property transitionTime: number = 1;

  /** 材质实例 */
  protected _insMaterial: cc.Material = null;
  /** 初始化状态标识 */
  protected _inited: boolean = false;
  /** 切换前纹理 */
  protected _texture1: cc.RenderTexture = null;
  /** 切换后纹理 */
  protected _texture2: cc.RenderTexture = null;
  /** 纹理相机 */
  protected _camera: cc.Camera = null;
  /** shader 时间进度 */
  protected _time: number = 0;
  /** 是否动态效果展示中 */
  protected _isLoading: boolean = false;
  /** 等待资源加载完成 */
  protected _isStartFlag: boolean = false;

  protected _finishedCallBack: any = null;
  public setOnceFinishedCallback(cb: any) {
    this._finishedCallBack = cb;
  }

  __onLoad() {
    this._init();
  }

  __onDestroy() {
    if (cc.isValid(this._camera)) this._camera.node.destroy();
    if (cc.isValid(this.sprite)) this.sprite.node.destroy();
  }

  /** 初始化 */
  protected _init() {
    if (this._inited) return;
    this._inited = true;
    if (!this._texture1) this._texture1 = this._createTexture();
    if (!this._texture2) this._texture2 = this._createTexture();
    if (!this._camera) {
      let cameraNode = new cc.Node("TRANSITION_CAMERA");
      this._camera = cameraNode.addComponent(cc.Camera);
      this._camera.backgroundColor = JXColor.C000000;
      cameraNode.parent = this.node;
    }
    this._camera.cullingMask = cc.Camera.main.cullingMask;

    if (this.sprite) {
      this.updateSpriteMaterial();
    }
  }

  public updateSpriteMaterial() {
    if (!this.sprite) return;
    if (!this.material) return;
    if (
      !this._insMaterial ||
      this.material["_effect"]["_name"] != this._insMaterial["_effect"]["_name"]
    ) {
      this._insMaterial = cc.MaterialVariant.create(this.material, this.sprite);
      this.sprite.setMaterial(0, this._insMaterial);
    }
    this._insMaterial.setProperty("texture2", this._texture2);
    this._insMaterial.setProperty(
      "ratio",
      this._texture2.width / this._texture2.height
    );
    this._insMaterial.setProperty(
      "screenSize",
      cc.v2(this._texture2.width, this._texture2.height)
    );
  }

  protected _createTexture() {
    let texture = new cc.RenderTexture();
    texture.initWithSize(
      cc.visibleRect.width,
      cc.visibleRect.height,
      cc["gfx"].RB_FMT_D24S8
    );
    return texture;
  }

  public prepareTransitions() {
    if (!this._inited) return;
    if (!this.sprite) return;
    if (!this._insMaterial) {
      this.updateSpriteMaterial();
    }
    if (!this.targetNode) return;
    this._camera.enabled = true;
    this._camera.targetTexture = this._texture1;
    this._camera.render(this.targetNode);
    let spFrame = new cc.SpriteFrame(this._texture1);
    this.sprite.spriteFrame = spFrame;
    this._camera.targetTexture = null;
    this._insMaterial.setProperty("time", 0);
  }

  public startTransitions() {
    if (!this._inited) return;
    if (!this.sprite) return;
    if (!this.targetNode) return;
    if (GAssetImpl.isLoading()) {
      this._isStartFlag = true;
      return;
    } else {
      this.renderTexure2();
    }
  }

  public renderTexure2() {
    delayAction(this._camera.node, 0.01, () => {
      this._camera.targetTexture = this._texture2;
      this._camera.render(this.targetNode);
      this._camera.targetTexture = null;
      this._isLoading = true;
      this._time = 0;
      this._insMaterial.setProperty("time", 0);
    });
  }

  public update(dt) {
    if (this._isStartFlag) {
      if (GAssetImpl.isLoading()) return;
      this._isStartFlag = false;
      this.renderTexure2();
      return;
    }
    if (this._isLoading) {
      this._time += dt;
      if (this._time >= this.transitionTime) {
        this._time = this.transitionTime;
        this._isLoading = false;
        this.sprite.spriteFrame = null;
        this._camera.targetTexture = null;
        this._camera.enabled = false;
        if (this._finishedCallBack) {
          this._finishedCallBack();
          this._finishedCallBack = null;
        }
      }
      this._insMaterial.setProperty("time", this._time / this.transitionTime);
    }
  }
}
