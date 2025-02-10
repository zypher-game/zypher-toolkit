const { ccclass, property, menu } = cc._decorator;

export enum MaskProgressMode {
  HORIZONTAL,
  VERTICAL,
}

@ccclass
@menu("FrameEx/MaskProgressBar")
export default class MaskProgressBar extends cc.Component {
  @property(cc.Node) _maskBar: cc.Node = null;

  @property({ type: cc.Node })
  public get maskBar(): cc.Node {
    return this._maskBar;
  }
  public set maskBar(value: cc.Node) {
    if (this._maskBar == value) return;
    this._maskBar = value;
    this._initStatus();
  }

  @property(cc.Sprite) _barSprite: cc.Sprite = null;
  @property({ type: cc.Sprite })
  public get barSprite(): cc.Sprite {
    return this._barSprite;
  }
  public set barSprite(value: cc.Sprite) {
    if (this._barSprite == value) return;
    this._barSprite = value;
    this._initStatus();
  }

  @property({ type: cc.Enum(MaskProgressMode) }) _mode: MaskProgressMode =
    MaskProgressMode.HORIZONTAL;

  @property({ type: cc.Enum(MaskProgressMode) })
  public get mode() {
    return this._mode;
  }
  public set mode(value: MaskProgressMode) {
    if (this._mode == value) return;
    this._mode = value;
    this._initStatus();
  }

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

  @property _progress: number = 0;
  @property({ range: [0, 1, 0.01], slide: true })
  public get progress() {
    return this._progress;
  }
  public set progress(value: number) {
    if (this._progress == value) return;
    this._progress = cc.misc.clamp01(value);
    this._updateBarStatus();
  }

  @property _reverse: boolean = false;
  @property
  public get reverse() {
    return this._reverse;
  }
  public set reverse(value: boolean) {
    if (this._reverse == value) return;
    this._reverse = value;
    this._initStatus();
  }

  protected _initStatus() {
    if (!this.maskBar) return;
    if (!this.barSprite) return;
    switch (this._mode) {
      case MaskProgressMode.HORIZONTAL: {
        this._barSprite.node.width = this._totalLenth;
        break;
      }
      case MaskProgressMode.VERTICAL: {
        this._barSprite.node.height = this._totalLenth;
        break;
      }
    }

    this.maskBar.getComponent(cc.Mask).inverted = this._reverse;

    this._updateBarStatus();
  }

  protected _updateBarStatus() {
    if (!this._maskBar) return;
    switch (this._mode) {
      case MaskProgressMode.HORIZONTAL: {
        this._maskBar.width = this._totalLenth * this._progress;
        break;
      }
      case MaskProgressMode.VERTICAL: {
        this.maskBar.height = this._totalLenth * this._progress;
        break;
      }
    }
  }
}
