import { MaskSpriteType } from "../CoreDefine";

function fillVerticesWithoutCalc(node, buffer, renderData, color) {
  let vertexCount = renderData.vertexCount;
  let offsetInfo = buffer.request(vertexCount, renderData.indiceCount);

  // buffer data may be realloc, need get reference after request.
  let vertexOffset = offsetInfo.byteOffset >> 2,
    vbuf = buffer._vData,
    uintbuf = buffer._uintVData;

  let data = renderData._data;
  for (let i = 0; i < vertexCount; i++) {
    let vert = data[i];
    vbuf[vertexOffset++] = vert.x;
    vbuf[vertexOffset++] = vert.y;
    vbuf[vertexOffset++] = vert.u;
    vbuf[vertexOffset++] = vert.v;
    uintbuf[vertexOffset++] = color;
  }

  return offsetInfo;
}

var MaskSpriteAssembler = {
  userModel: false,
  createData(maskSprite) {
    return maskSprite.requestRenderData();
  },

  updateRenderData(maskSprite) {
    if (!maskSprite._renderData) {
      maskSprite._renderData = this.createData(maskSprite);
    }
    let renderData = maskSprite._renderData;
    let frame = maskSprite._spriteFrame;
    if (!renderData || !frame) return;
    let vertices = maskSprite._vertices;
    if (!vertices) {
      vertices = maskSprite.caculateVertices();
    }
    if (!vertices) return;
    if (renderData.vertexCount !== vertices.x.length) {
      renderData.vertexCount = vertices.x.length;
      renderData.indiceCount = vertices.triangles.length;

      // 1 for world vertices, 2 for local vertices
      renderData.dataLength = renderData.vertexCount * 2;

      renderData.uvDirty = renderData.vertDirty = true;
    }

    if (renderData.uvDirty) {
      this.updateUVs(maskSprite);
    }
    let vertDirty = renderData.vertDirty;
    if (vertDirty) {
      this.updateVerts(maskSprite);
      this.updateWorldVerts(maskSprite);
    }
  },

  updateUVs(maskSprite) {
    let vertices = maskSprite.vertices,
      u = vertices.nu,
      v = vertices.nv;

    let renderData = maskSprite._renderData;
    let data = renderData._data;

    for (let i = 0, l = u.length; i < l; i++) {
      let vertice = data[i];
      vertice.u = u[i];
      vertice.v = v[i];
    }

    renderData.uvDirty = false;
  },

  updateVerts(maskSprite) {
    let node = maskSprite.node,
      contentWidth = Math.abs(node.width),
      contentHeight = Math.abs(node.height),
      appx = node.anchorX * contentWidth,
      appy = node.anchorY * contentHeight;

    let vertices = maskSprite.vertices,
      x = vertices.x,
      y = vertices.y;

    let scaleX = node.scaleX,
      scaleY = node.scaleY;

    let renderData = maskSprite._renderData;
    let data = renderData._data;

    for (let i = 0, l = x.length; i < l; i++) {
      let vertice = data[i + l];
      vertice.x = (x[i] + node.width * node.anchorX - appx) * scaleX;
      vertice.y = (-y[i] + node.height * (1 - node.anchorY) - appy) * scaleY;
    }
    renderData.vertDirty = false;
  },

  updateWorldVerts(maskSprite) {
    let node = maskSprite.node,
      renderData = maskSprite._renderData,
      data = renderData._data;

    let matrix = node._worldMatrix;

    let a = matrix.m00,
      b = matrix.m01,
      c = matrix.m04,
      d = matrix.m05,
      tx = matrix.m12,
      ty = matrix.m13;
    for (let i = 0, l = renderData.vertexCount; i < l; i++) {
      let local = data[i + l];
      let world = data[i];
      world.x = local.x * a + local.y * c + tx;
      world.y = local.x * b + local.y * d + ty;
    }
  },

  fillBuffers(maskSprite, renderer) {
    let vertices = maskSprite.vertices;
    if (!vertices) {
      return;
    }

    // update world verts
    if (renderer.worldMatDirty) {
      this.updateWorldVerts(maskSprite);
    }

    // buffer
    let buffer = renderer._meshBuffer;
    let node = maskSprite.node;
    let offsetInfo = fillVerticesWithoutCalc(
      node,
      buffer,
      maskSprite._renderData,
      node._color._val
    );

    let ibuf = buffer._iData,
      indiceOffset = offsetInfo.indiceOffset,
      vertexId = offsetInfo.vertexOffset;

    let triangles = vertices.triangles;
    for (let i = 0, l = triangles.length; i < l; i++) {
      ibuf[indiceOffset++] = vertexId + triangles[i];
    }
  },
};

const { ccclass, property, executionOrder, menu } = cc._decorator;

const CARD_CLIPS = [
  [-48, -93],
  [0, -110],
  [48, -93],
  [48, 89],
  [30, 93],
  [28, 98],
  [20, 98],
  [16, 103],
  [-16, 103],
  [-21, 98],
  [-29, 98],
  [-31, 93],
  [-48, 89],
];
const CARD_SIZE = cc.size(97, 203);

@ccclass
@menu("FrameEx/MaskSprite")
export default class MaskSprite extends cc.RenderComponent {
  @property(cc.SpriteFrame) _spriteFrame: cc.SpriteFrame = null;
  @property({ type: cc.SpriteFrame })
  public get spriteFrame(): cc.SpriteFrame {
    return this._spriteFrame;
  }
  public set spriteFrame(value: cc.SpriteFrame) {
    if (!this.isValid) return;
    let lastSprite = this._spriteFrame;
    this._spriteFrame = value;
    if (lastSprite === value) {
      return;
    }
    this._vertices = null;
    this._spriteFrame = value;
    // render & update render data flag will be triggered while applying new sprite frame
    this.markForUpdateRenderData(false);
    this._applySpriteFrame(lastSprite);
    if (CC_EDITOR) {
      this.node.emit("spriteframe-changed", this);
    }
  }

  @property({ type: cc.Enum(MaskSpriteType) }) _maskType: MaskSpriteType =
    MaskSpriteType.Square;
  @property({ type: cc.Enum(MaskSpriteType) })
  public get maskType(): MaskSpriteType {
    return this._maskType;
  }
  public set maskType(value: MaskSpriteType) {
    if (value == this._maskType) return;
    this._maskType = value;
    this._vertices = null;
    this.markForUpdateRenderData(true);
  }

  @property(cc.Vec2) _c: cc.Vec2 = cc.Vec2.ZERO;
  @property({
    tooltip: CC_DEV && "绝对坐标下的中心点，针对的是纹理",
  })
  public get center(): cc.Vec2 {
    return this._c;
  }
  public set center(value: cc.Vec2) {
    if (value.equals(this._c)) return;
    this._c = value;
    this._vertices = null;
    this.markForUpdateRenderData(true);
  }

  @property() _r: number = 42;
  @property({
    tooltip: CC_DEV && "以中心点为原点，的半径范围内为锁定目标",
    visible: function () {
      return this._maskType != MaskSpriteType.CardClip;
    },
  })
  public get radius(): number {
    return this._r;
  }
  public set radius(value: number) {
    if (this._r == value) return;
    this._r = value;
    this._vertices = null;
    this.markForUpdateRenderData(true);
  }

  @property(cc.Vec2) _octParam: cc.Vec2 = cc.Vec2.ONE;
  @property({
    tooltip:
      CC_DEV && "八边形裁切的情况下，x表示第一个裁切长度，y便是第二个裁切长度",
    visible: function () {
      return this._maskType == MaskSpriteType.Octagon;
    },
  })
  public get octParam(): cc.Vec2 {
    return this._octParam;
  }
  public set octParam(value: cc.Vec2) {
    if (value.equals(this._octParam)) return;
    this._octParam = value;
    this._vertices = null;
    this.markForUpdateRenderData(true);
  }

  protected _vertices;
  public get vertices() {
    return this._vertices;
  }

  public setSprite(
    spriteFrame: cc.SpriteFrame,
    type: MaskSpriteType,
    center: cc.Vec2,
    radius: number,
    minOffset?: number,
    maxOffset?: number
  ) {
    if (spriteFrame) this.spriteFrame = spriteFrame;
    if (type) this.maskType = type;
    if (center) this.center = center;
    if (radius) this.radius = radius;
    if (minOffset) this.octParam.x = minOffset;
    if (maxOffset) this.octParam.y = maxOffset;
  }

  onLoad() {
    this.node.on(
      cc.Node.EventType.ANCHOR_CHANGED,
      this.onTransfromChange,
      this
    );
    // 设置默认材质
    let material = this.sharedMaterials[0];
    if (!material) {
      material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
      this.setMaterial(0, material);
    }

    this._applySpriteFrame();
  }

  onEnable() {
    super.onEnable();
    this.markForUpdateRenderData(true);
  }

  protected _activateMaterial() {
    let spriteFrame = this._spriteFrame;
    // If spriteframe not loaded, disable render and return.
    if (!spriteFrame || !spriteFrame.textureLoaded()) {
      this["disableRender"]();
      return;
    }

    // make sure material is belong to self.
    let material = this.sharedMaterials[0];
    if (!material) {
      material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
    } else {
      material = cc.MaterialVariant.create(material, this);
    }

    let texture = spriteFrame.getTexture();
    material.setProperty("texture", texture);
    this.setMaterial(0, material);
    this["markForRender"](true);
    this.markForUpdateRenderData(true);
  }

  protected _onTextureLoaded() {
    if (!this.isValid) {
      return;
    }
    this._activateMaterial();
  }

  protected onTransfromChange() {
    this._vertices = null;
    this.markForUpdateRenderData(true);
  }

  protected caculateVertices() {
    if (!this._spriteFrame) return;
    switch (this._maskType) {
      case MaskSpriteType.Square: {
        this.getSquareVertices();
        break;
      }
      case MaskSpriteType.Clire: {
        this.getClireVertices();
        break;
      }
      case MaskSpriteType.Octagon: {
        this.getOctagonVertices();
        break;
      }
      case MaskSpriteType.CardClip: {
        this.getCardClipVertices();
        break;
      }
    }
    // 锁定大小
    if (this._maskType != MaskSpriteType.CardClip) {
      this.node.width = this.node.height = this.radius * 2;
    } else {
      this.node.setContentSize(CARD_SIZE);
    }
    return this._vertices;
  }

  _applySpriteFrame(oldFrame: cc.SpriteFrame = null) {
    if (oldFrame && oldFrame.off) {
      oldFrame.off("load", this._onTextureLoaded, this);
    }

    var spriteFrame = this._spriteFrame;
    let material = this.sharedMaterials[0];
    if (
      !spriteFrame ||
      (material && material["_texture"]) !==
        (spriteFrame && spriteFrame["_texture"])
    ) {
      // disable render flow until texture is loaded
      this["markForRender"](false);
    }

    if (spriteFrame) {
      if (!oldFrame || spriteFrame["_texture"] !== oldFrame["_texture"]) {
        if (spriteFrame.textureLoaded()) {
          this._onTextureLoaded();
        } else {
          spriteFrame.once("load", this._onTextureLoaded, this);
          spriteFrame.ensureLoadTexture();
        }
      }
    }
  }

  protected getSquareVertices() {
    let texture = this._spriteFrame.getTexture();
    let texw = texture.width,
      texh = texture.height,
      ratio = texw / texh;

    let tc = this.convertN2T(this._c, texw, texh);
    let tr = this._r / texw;
    let l = tc.x - tr,
      r = tc.x + tr,
      t = tc.y - tr * ratio,
      b = tc.y + tr * ratio;
    let nw = this.node.width,
      ny = this.node.height,
      nax = this.node.anchorX,
      nay = this.node.anchorY;
    let nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
    this._vertices = {
      x: [nc.x - this._r, nc.x + this._r, nc.x + this._r, nc.x - this._r],
      y: [nc.y - this._r, nc.y - this._r, nc.y + this._r, nc.y + this._r],
      nu: [l, r, r, l],
      nv: [t, t, b, b],
      triangles: [0, 1, 2, 2, 3, 0],
    };

    return this._vertices;
  }

  _canRender() {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      if (!this["_enabled"]) return false;
    } else {
      if (
        !this["_enabled"] ||
        !this.sharedMaterials[0] ||
        !this.node["_activeInHierarchy"]
      )
        return false;
    }

    let spriteFrame = this._spriteFrame;
    if (!spriteFrame || !spriteFrame.textureLoaded()) {
      return false;
    }
    return true;
  }

  markForUpdateRenderData(enable) {
    if (enable && this._canRender()) {
      this.node["_renderFlag"] |= cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
      this._vertices = null;
      let renderData = this["_renderData"];
      if (renderData) {
        renderData.uvDirty = true;
        renderData.vertDirty = true;
      }
    } else if (!enable) {
      this.node["_renderFlag"] &= ~cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
      cc.Node;
    }
  }

  protected getClireVertices() {
    this._vertices = {
      x: [],
      y: [],
      nu: [],
      nv: [],
      triangles: [],
    };

    let segments = 64;
    let deltaAngle = cc.misc.degreesToRadians(360) / segments;
    let curentAngle = 0;
    let texture = this._spriteFrame.getTexture();
    let texw = texture.width,
      texh = texture.height,
      ratio = texw / texh;
    let tc = this.convertN2T(this._c, texw, texh);
    let tr = this._r / texw;
    let nw = this.node.width,
      ny = this.node.height,
      nax = this.node.anchorX,
      nay = this.node.anchorY;
    let nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
    for (let i = 0; i < segments + 1; i++) {
      let cosA = Math.cos(curentAngle);
      let sinA = Math.sin(curentAngle);
      this.vertices.x[i] = cosA * this._r + nc.x;
      this.vertices.y[i] = sinA * this._r + nc.y;
      this.vertices.nu[i] = cosA * tr + tc.x;
      this.vertices.nv[i] = sinA * tr * ratio + tc.y;
      curentAngle += deltaAngle;
    }
    for (let i = 0, j = 1; i < segments * 3 - 3; i += 3, j++) {
      this.vertices.triangles[i] = 0;
      this.vertices.triangles[i + 1] = j + 1;
      this.vertices.triangles[i + 2] = j;
    }
    this.vertices.triangles[segments * 3 - 3] = 0;
    this.vertices.triangles[segments * 3 - 2] = 1;
    this.vertices.triangles[segments * 3 - 1] = segments;
    return this._vertices;
  }

  protected getOctagonVertices() {
    this._vertices = {
      x: [],
      y: [],
      nu: [],
      nv: [],
      triangles: [],
    };

    let texture = this._spriteFrame.getTexture();
    let texw = texture.width,
      texh = texture.height,
      ratio = texw / texh;
    let tc = this.convertN2T(this._c, texw, texh);
    let tr = this._r / texw;
    let l = tc.x - tr,
      r = tc.x + tr,
      t = tc.y - tr * ratio,
      b = tc.y + tr * ratio;
    let tox = this._octParam.x / texw,
      toy = this._octParam.y / texw;
    let nw = this.node.width,
      ny = this.node.height,
      nax = this.node.anchorX,
      nay = this.node.anchorY;
    let nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));

    this.vertices.x[0] = -this._r + this._octParam.x + nc.x;
    this.vertices.y[0] = -this._r + nc.y;
    this.vertices.nu[0] = l + tox;
    this.vertices.nv[0] = t;

    this.vertices.x[1] = this._r - this._octParam.y + nc.x;
    this.vertices.y[1] = -this._r + nc.y;
    this.vertices.nu[1] = r - toy;
    this.vertices.nv[1] = t;

    this.vertices.x[2] = this._r + nc.x;
    this.vertices.y[2] = nc.y - (this._r - this.octParam.y);
    this.vertices.nu[2] = tr + tc.x;
    this.vertices.nv[2] = tc.y - tr * ratio + toy * ratio;

    this.vertices.x[3] = this._r + nc.x;
    this.vertices.y[3] = nc.y + (this._r - this._octParam.x);
    this.vertices.nu[3] = r;
    this.vertices.nv[3] = b - tox * ratio;

    this.vertices.x[4] = this._r + nc.x - this.octParam.x;
    this.vertices.y[4] = nc.y + this._r;
    this.vertices.nu[4] = r - tox;
    this.vertices.nv[4] = b;

    this.vertices.x[5] = -this._r + this._octParam.y + nc.x;
    this.vertices.y[5] = nc.y + this._r;
    this.vertices.nu[5] = l + toy;
    this.vertices.nv[5] = b;

    this.vertices.x[6] = -this._r + nc.x;
    this.vertices.y[6] = nc.y + (this._r - this._octParam.y);
    this.vertices.nu[6] = l;
    this.vertices.nv[6] = b - toy * ratio;

    this.vertices.x[7] = -this._r + nc.x;
    this.vertices.y[7] = nc.y - (this._r - this._octParam.x);
    this.vertices.nu[7] = l;
    this.vertices.nv[7] = t + tox * ratio;

    this.vertices.triangles = [
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 7, 0, 6,
    ];
    return this.vertices;
  }

  protected getCardClipVertices() {
    this._vertices = {
      x: [],
      y: [],
      nu: [],
      nv: [],
      triangles: [],
    };

    let texture = this._spriteFrame.getTexture();
    let texw = texture.width,
      texh = texture.height,
      ratio = texw / texh;
    let tc = this.convertN2T(this._c, texw, texh);
    let tr = this._r / texw;
    let l = tc.x - tr,
      r = tc.x + tr,
      t = tc.y - tr * ratio,
      b = tc.y + tr * ratio;
    let nw = this.node.width,
      ny = this.node.height,
      nax = this.node.anchorX,
      nay = this.node.anchorY;
    let nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
    let pl = CARD_CLIPS.length;
    for (let i = 0; i < pl; i++) {
      this._vertices.x[i] = CARD_CLIPS[i][0] + nc.x;
      this._vertices.y[i] = -(CARD_CLIPS[i][1] + nc.y);
      this._vertices.nu[i] = (CARD_CLIPS[i][0] + tc.x * texw) / texw;
      this._vertices.nv[i] = 1 - (CARD_CLIPS[i][1] + tc.y * texh) / texh;
    }
    for (let i = 0, j = 1; i < pl * 3 - 6; i += 3, j++) {
      this._vertices.triangles[i] = 0;
      this._vertices.triangles[i + 1] = j + 1;
      this._vertices.triangles[i + 2] = j;
    }
    return this._vertices;
  }

  /** 将节点坐标转换到纹理坐标
   * 注意： 这里有个假设环境：
   * 1.假设节点的中心在图片的中心点上
   * 2.假设节点的大小等于纹理的大小
   * ==》就是cocos坐标系转换成纹理坐标系
   */
  private convertN2T(p: cc.Vec2, width: number, height: number): cc.Vec2 {
    let x = (width * 0.5 + p.x) / width;
    let y = 1 - (height * 0.5 + p.y) / height;
    return cc.v2(x, y);
  }
}

MaskSprite["_assembler"] = MaskSpriteAssembler;
