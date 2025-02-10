const { ccclass, property } = cc._decorator;

@ccclass
export default class ColorAssembler2D extends cc.Component {
  @property({
    type: cc.Color,
    tooltip: "颜色",
  })
  colors: cc.Color[] = [];

  start() {}

  onEnable() {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
  }

  onDisable() {
    cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
    this.node["_renderFlag"] |= cc["RenderFlow"].FLAG_COLOR;
  }

  protected _updateColors() {
    const cmp = this.getComponent(cc.RenderComponent);
    if (!cmp) return;
    const _assembler: cc.Assembler2D = cmp["_assembler"];
    if (!(_assembler instanceof cc["Assembler2D"])) return;
    const uintVerts = _assembler._renderData.uintVDatas[0];
    if (!uintVerts) return;
    const color = this.node.color;
    const floatsPerVert = _assembler.floatsPerVert;
    const colorOffset = _assembler.colorOffset;
    let count = 0;
    for (let i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
      uintVerts[i] = (this.colors[count++] || color)["_val"];
    }
  }
}
