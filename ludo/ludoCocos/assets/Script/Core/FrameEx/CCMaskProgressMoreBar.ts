import { GLoader } from "../GLoader/GLoader";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("FrameEx/CCMaskProgressMoreBar")
export default class MaskProgressMoreBar extends cc.Component {
  @property(cc.Label) allNum: cc.Label = null;
  @property(cc.Label) proLabel: cc.Label = null;

  @property _totalLenth: number = 100;
  @property
  public get totalLenth() {
    return this._totalLenth;
  }
  public set totalLenth(value: number) {
    if (this._totalLenth == value) return;
    this._totalLenth = value;
    this._initStatus();
  }

  @property _nTotal: number = 10000;
  @property
  public get nTotal() {
    return this._nTotal;
  }
  public set nTotal(value: number) {
    if (this._nTotal == value) return;
    this._nTotal = value;
  }

  @property _barNum: number = 1;
  @property
  public get barNum() {
    return this._barNum;
  }
  public set barNum(value: number) {
    if (this._barNum == value) return;
    this._barNum = value;
    this._initStatus();
  }

  @property _progress: number = 0;
  @property({ range: [0, 1, 0.001], slide: true })
  public get progress() {
    return this._progress;
  }
  public set progress(value: number) {
    if (this._progress == value) return;
    this._progress = cc.misc.clamp01(value);
    this._updateBarStatus();
  }

  protected _maskBars: cc.Node[] = [];

  protected _initStatus() {
    this.node.destroyAllChildren();
    this._maskBars = [];
    if (this.allNum) {
      this.allNum.string = this._barNum.toString();
    }
    for (let i = 1; i <= this._barNum; i++) {
      let maskNode = new cc.Node(`maskNode_${i}`);
      maskNode.height = this.node.height - 4;
      maskNode.width = 0;
      maskNode.anchorX = 0;
      let mask = maskNode.addComponent(cc.Mask);
      let bar = new cc.Node("bar").addComponent(cc.Sprite);
      bar.type = cc.Sprite.Type.SLICED;
      let index = this._barNum != 1 ? i % 7 : i - 1;
      GLoader.spriteAtlasFrame(bar, "", "bar_" + index, () => {
        bar.node.height = this.node.height - 4;
        bar.node.width = this.totalLenth;
      });
      bar.node.anchorX = 0;
      maskNode.addChild(bar.node);
      this.node.addChild(maskNode);
      maskNode.position = cc.v3(-this.totalLenth / 2, 0);
      this._maskBars.push(maskNode);
    }
    this.progress = 0;
  }

  protected _updateBarStatus() {
    if (!this._maskBars || !this._maskBars.length) return;
    let singlePro = 1 / this._barNum;
    let curSinglePro = 1;
    for (let i = 0; i < this._maskBars.length; i++) {
      let maskBar = this._maskBars[i];
      let v = i + 1;
      if (this._progress >= v * singlePro) {
        maskBar.width = this._totalLenth;
      } else {
        let pro = this._progress - i * singlePro;
        if (pro > 0) {
          curSinglePro = pro;
          if (this.allNum) {
            this.allNum.node.parent.active = this._barNum > 1;
            this.allNum.string = (v - 1).toString();
          }
        } else {
          pro = 0;
        }
        maskBar.width = this._totalLenth * (pro / singlePro);
      }
    }
    if (this.proLabel) {
      if (this._barNum > 1) {
        this.proLabel.string = `${Math.floor(
          curSinglePro * singlePro * this._nTotal
        )} /${Math.floor(this._nTotal * singlePro)}`;
      } else {
        this.proLabel.string = `${Math.floor(
          this._progress * this._nTotal
        )} /${Math.floor(this._nTotal)}`;
      }
    }
  }
}
