import { HtmlTextParser } from "../BaseFSM/HtmlTextParser";

const { ccclass, property, executionOrder, menu } = cc._decorator;

const renderEngine = cc.renderer.renderEngine;
const gfx = cc.gfx;

// 引擎定义的顶点数据的 buffer 格式, 参考引擎中的 vertex-format.js
// 传递位置及 UV
let vfmtPosUv = new gfx.VertexFormat([
  { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
]);
// 传递位置，UV 及颜色数据
let vfmtPosUvColor = new gfx.VertexFormat([
  { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);

let _tmpRect = cc.rect();

function fillMeshVertices(node, buffer, renderData, colors) {
  let vertexCount = renderData.vertexCount;
  let offsetInfo = buffer.request(vertexCount, renderData.indiceCount);

  // buffer data may be realloc, need get reference after request.
  let indiceOffset = offsetInfo.indiceOffset,
    vertexOffset = offsetInfo.byteOffset >> 2,
    vertexId = offsetInfo.vertexOffset,
    vbuf = buffer._vData,
    uintbuf = buffer._uintVData,
    ibuf = buffer._iData;

  let matrix = node._worldMatrix;
  let a = matrix.m00,
    b = matrix.m01,
    c = matrix.m04,
    d = matrix.m05,
    tx = matrix.m12,
    ty = matrix.m13;

  let data = renderData._data;

  for (let i = 0; i < vertexCount; i++) {
    // change by visow
    let vert = data[i];
    vbuf[vertexOffset++] = vert.x * a + vert.y * c + tx;
    vbuf[vertexOffset++] = vert.x * b + vert.y * d + ty;
    vbuf[vertexOffset++] = vert.u;
    vbuf[vertexOffset++] = vert.v;
    let color = colors[Math.floor(i / 4)];
    color._fastSetA(node.color.a);
    uintbuf[vertexOffset++] = color._val;
  }

  // fill indice data
  for (let i = 0, count = vertexCount / 4; i < count; i++) {
    let start = vertexId + i * 4;
    ibuf[indiceOffset++] = start;
    ibuf[indiceOffset++] = start + 1;
    ibuf[indiceOffset++] = start + 2;
    ibuf[indiceOffset++] = start + 1;
    ibuf[indiceOffset++] = start + 3;
    ibuf[indiceOffset++] = start + 2;
  }

  return offsetInfo;
}

var PlistLabelAssembler = {
  userModel: false,
  createData(comp) {
    return comp.requestRenderData();
  },

  fillBuffers(comp, renderer) {
    if (!comp.atlas || !comp.getMaterials[0]) return;
    let node = comp.node;
    fillMeshVertices(
      node,
      renderer._meshBuffer,
      comp._renderData,
      comp._vertColors
    );
  },

  updateRenderData(comp) {
    if (!comp._renderData) {
      comp._renderData = null;
      comp._renderData = comp.requestRenderData();
    }
    this._updateQuads(comp);
  },

  renderIA(comp, renderer) {
    renderer._flushIA(comp._renderData);
  },

  appendQuad(renderData, texture, rect, rotated, x, y, scale) {
    let dataOffset = renderData.dataLength;

    renderData.dataLength += 4;
    renderData.vertexCount = renderData.dataLength;
    renderData.indiceCount = (renderData.dataLength / 2) * 3;

    let data = renderData._data;
    let texw = texture.width,
      texh = texture.height;

    let rectWidth = rect.width,
      rectHeight = rect.height;

    let l, b, r, t;
    if (!rotated) {
      l = rect.x / texw;
      r = (rect.x + rectWidth) / texw;
      b = (rect.y + rectHeight) / texh;
      t = rect.y / texh;

      data[dataOffset].u = l;
      data[dataOffset].v = b;
      data[dataOffset + 1].u = r;
      data[dataOffset + 1].v = b;
      data[dataOffset + 2].u = l;
      data[dataOffset + 2].v = t;
      data[dataOffset + 3].u = r;
      data[dataOffset + 3].v = t;
    } else {
      l = rect.x / texw;
      r = (rect.x + rectHeight) / texw;
      b = (rect.y + rectWidth) / texh;
      t = rect.y / texh;

      data[dataOffset].u = l;
      data[dataOffset].v = t;
      data[dataOffset + 1].u = l;
      data[dataOffset + 1].v = b;
      data[dataOffset + 2].u = r;
      data[dataOffset + 2].v = t;
      data[dataOffset + 3].u = r;
      data[dataOffset + 3].v = b;
    }

    data[dataOffset].x = x;
    data[dataOffset].y = y - rectHeight * scale;
    data[dataOffset + 1].x = x + rectWidth * scale;
    data[dataOffset + 1].y = y - rectHeight * scale;
    data[dataOffset + 2].x = x;
    data[dataOffset + 2].y = y;
    data[dataOffset + 3].x = x + rectWidth * scale;
    data[dataOffset + 3].y = y;
  },

  _updateQuads(comp) {
    let spriteAtlas = (comp as PlistLabel)._atlas;
    let spliteChar = (comp as PlistLabel).spliteChar;
    if (!spriteAtlas) return false;
    let texture = spriteAtlas.getTexture();
    if (!texture) return false;

    let node = comp.node;
    let renderData = comp._renderData;
    renderData.dataLength = renderData.vertexCount = renderData.indiceCount = 0;

    let width = 0;
    let offsetX = comp._offsetX;
    let letterInfos = [];
    let maxWidth = 0;
    let line = 0;
    let renderIdx = 0;
    let curHtml = null;
    while (((curHtml = comp._renderStrings[renderIdx++]), curHtml)) {
      if (!curHtml.text) continue;
      let color =
        curHtml.style && curHtml.style.color
          ? cc.color().fromHEX(curHtml.style.color)
          : node.color;
      let letters = curHtml.text.split(spliteChar || "");
      for (let ctr = 0, l = letters.length; ctr < l; ++ctr) {
        let letter = letters[ctr];
        if (letterInfos.length == 0) {
          line += 1;
        }
        if (letter == "\n") {
          line += 1;
          maxWidth = width > maxWidth ? width : maxWidth;
          width = 0;
          continue;
        }
        let frame = spriteAtlas.getSpriteFrame(letter);
        if (!frame) continue;
        _tmpRect = frame.getRect();
        if (_tmpRect.height > 0 && _tmpRect.width > 0) {
          letterInfos.push({
            frame,
            width,
            line,
            height: _tmpRect.height,
            color,
          });
          width += _tmpRect.width;
        }
        if (ctr != letters.length - 1) {
          width += offsetX;
        }
      }
    }

    maxWidth = width > maxWidth ? width : maxWidth;
    let lineHieght = comp._lineHeight;
    let height = lineHieght * line;
    let appx = node._anchorPoint.x * maxWidth,
      appy = node._anchorPoint.y * height;
    for (let i = 0; i < letterInfos.length; i++) {
      let letterInfo = letterInfos[i];
      this.appendQuad(
        renderData,
        texture,
        letterInfo.frame.getRect(),
        letterInfo.frame.isRotated(),
        letterInfo.width - appx,
        (line - (letterInfo.line - 1)) * lineHieght -
          appy -
          (lineHieght - letterInfo.height) * 0.5,
        1
      );
      comp._vertColors.push(letterInfo.color);
    }
    node.setContentSize(cc.size(maxWidth, height));
    return true;
  },
};

@ccclass
@menu("FrameEx/PlistLabel")
export default class PlistLabel extends cc.RenderComponent {
  @property(cc.SpriteAtlas) _atlas: cc.SpriteAtlas = null;
  @property({ type: cc.SpriteAtlas })
  public get atlas(): cc.SpriteAtlas {
    return this._atlas;
  }
  public set atlas(value: cc.SpriteAtlas) {
    if (!this.isValid) return;
    this._atlas = value;
    this["_assembler"] = PlistLabelAssembler;
    this._activateMaterial(true);
    this._updateRenderData(true);
  }

  @property spliteChar: string = "";

  @property _string: string = "";
  @property({
    multiline: true,
  })
  public get string(): string {
    return this._string;
  }

  protected _renderStrings = [];
  protected _vertColors = [];
  public set string(value: string) {
    if (this._string == value) return;
    this._string = value;
    this.parse();
    this._updateRenderData();
  }

  protected parse() {
    if (!this._string) {
      this._string = "";
    }
    let htmlTextParse = HtmlTextParser.ins;
    let keys = Object.keys(this._repleaceList);
    let htmls = htmlTextParse.parse(this._string);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < htmls.length; j++) {
        if (!htmls[j].text) continue;
        htmls[j].text = htmls[j].text.replace(
          new RegExp(keys[i], "g"),
          this._repleaceList[keys[i]]
        );
      }
    }
    this._vertColors = [];
    this._renderStrings = htmls;
  }

  @property _lineHeight: number = 0;
  @property()
  public get lineHeight(): number {
    return this._lineHeight;
  }
  public set lineHeight(value: number) {
    if (this._lineHeight == value) return;
    this._lineHeight = value;
    this._updateRenderData();
  }

  @property _offsetX: number = 0;
  @property()
  public get offsetX(): number {
    return this._offsetX;
  }
  public set offsetX(value: number) {
    if (this._offsetX == value) return;
    this._offsetX = value;
    this._updateRenderData();
  }

  protected _repleaceList = {
    "/": "x",
  };

  onLoad() {
    this.node.on(
      cc.Node.EventType.ANCHOR_CHANGED,
      this.onTransfromChange,
      this
    );
    if (this._string && this._renderStrings.length == 0) {
      this.parse();
    }
    if (!this._atlas) {
      this._activateMaterial(true);
      return;
    }
    let texture = this._atlas.getTexture();
    if (texture.loaded) {
      this._updateRenderData(true);
    } else {
      texture.once("load", this._onTextureLoaded, this);
      cc["textureUtil"].postLoadTexture(texture);
    }
  }

  _updateRenderData(force?) {
    if (this.getMaterials()[0] == null) {
      this._activateMaterial(true);
      return;
    }
    let rednerData = this["_renderData"];
    if (rednerData) {
      rednerData.vertDirty = true;
      rednerData.uvDirty = true;
      this["markForRender"](true);
    } else {
      this._applyFontTexture(force);
    }
  }

  _applyFontTexture(force) {
    this._activateMaterial(force);
    if (force) {
      this["_assembler"].updateRenderData(this);
    }
  }

  _activateMaterial(force) {
    if (!force) return;
    let material = this.getMaterials[0];

    if (!material) {
      material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
    } else {
      material = cc.MaterialVariant.create(material, this);
    }
    if (this._atlas) {
      material.setProperty("texture", this._atlas.getTexture());
    }
    this.setMaterial(0, material);

    this["markForRender"](true);
  }

  protected _onTextureLoaded() {
    this._activateMaterial(true);
    this._updateRenderData(true);
  }

  onEnable() {
    super.onEnable();
  }

  protected onTransfromChange() {
    this._updateRenderData();
  }
}
