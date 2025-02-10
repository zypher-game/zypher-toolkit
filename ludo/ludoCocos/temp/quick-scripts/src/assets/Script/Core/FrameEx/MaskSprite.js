"use strict";
cc._RF.push(module, 'f5760MiF6xL9IEQaoBApN03', 'MaskSprite');
// Script/Core/FrameEx/MaskSprite.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreDefine_1 = require("../CoreDefine");
function fillVerticesWithoutCalc(node, buffer, renderData, color) {
    var vertexCount = renderData.vertexCount;
    var offsetInfo = buffer.request(vertexCount, renderData.indiceCount);
    // buffer data may be realloc, need get reference after request.
    var vertexOffset = offsetInfo.byteOffset >> 2, vbuf = buffer._vData, uintbuf = buffer._uintVData;
    var data = renderData._data;
    for (var i = 0; i < vertexCount; i++) {
        var vert = data[i];
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
    createData: function (maskSprite) {
        return maskSprite.requestRenderData();
    },
    updateRenderData: function (maskSprite) {
        if (!maskSprite._renderData) {
            maskSprite._renderData = this.createData(maskSprite);
        }
        var renderData = maskSprite._renderData;
        var frame = maskSprite._spriteFrame;
        if (!renderData || !frame)
            return;
        var vertices = maskSprite._vertices;
        if (!vertices) {
            vertices = maskSprite.caculateVertices();
        }
        if (!vertices)
            return;
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
        var vertDirty = renderData.vertDirty;
        if (vertDirty) {
            this.updateVerts(maskSprite);
            this.updateWorldVerts(maskSprite);
        }
    },
    updateUVs: function (maskSprite) {
        var vertices = maskSprite.vertices, u = vertices.nu, v = vertices.nv;
        var renderData = maskSprite._renderData;
        var data = renderData._data;
        for (var i = 0, l = u.length; i < l; i++) {
            var vertice = data[i];
            vertice.u = u[i];
            vertice.v = v[i];
        }
        renderData.uvDirty = false;
    },
    updateVerts: function (maskSprite) {
        var node = maskSprite.node, contentWidth = Math.abs(node.width), contentHeight = Math.abs(node.height), appx = node.anchorX * contentWidth, appy = node.anchorY * contentHeight;
        var vertices = maskSprite.vertices, x = vertices.x, y = vertices.y;
        var scaleX = node.scaleX, scaleY = node.scaleY;
        var renderData = maskSprite._renderData;
        var data = renderData._data;
        for (var i = 0, l = x.length; i < l; i++) {
            var vertice = data[i + l];
            vertice.x = (x[i] + node.width * node.anchorX - appx) * scaleX;
            vertice.y = (-y[i] + node.height * (1 - node.anchorY) - appy) * scaleY;
        }
        renderData.vertDirty = false;
    },
    updateWorldVerts: function (maskSprite) {
        var node = maskSprite.node, renderData = maskSprite._renderData, data = renderData._data;
        var matrix = node._worldMatrix;
        var a = matrix.m00, b = matrix.m01, c = matrix.m04, d = matrix.m05, tx = matrix.m12, ty = matrix.m13;
        for (var i = 0, l = renderData.vertexCount; i < l; i++) {
            var local = data[i + l];
            var world = data[i];
            world.x = local.x * a + local.y * c + tx;
            world.y = local.x * b + local.y * d + ty;
        }
    },
    fillBuffers: function (maskSprite, renderer) {
        var vertices = maskSprite.vertices;
        if (!vertices) {
            return;
        }
        // update world verts
        if (renderer.worldMatDirty) {
            this.updateWorldVerts(maskSprite);
        }
        // buffer
        var buffer = renderer._meshBuffer;
        var node = maskSprite.node;
        var offsetInfo = fillVerticesWithoutCalc(node, buffer, maskSprite._renderData, node._color._val);
        var ibuf = buffer._iData, indiceOffset = offsetInfo.indiceOffset, vertexId = offsetInfo.vertexOffset;
        var triangles = vertices.triangles;
        for (var i = 0, l = triangles.length; i < l; i++) {
            ibuf[indiceOffset++] = vertexId + triangles[i];
        }
    },
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var CARD_CLIPS = [
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
var CARD_SIZE = cc.size(97, 203);
var MaskSprite = /** @class */ (function (_super) {
    __extends(MaskSprite, _super);
    function MaskSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._spriteFrame = null;
        _this._maskType = CoreDefine_1.MaskSpriteType.Square;
        _this._c = cc.Vec2.ZERO;
        _this._r = 42;
        _this._octParam = cc.Vec2.ONE;
        return _this;
    }
    Object.defineProperty(MaskSprite.prototype, "spriteFrame", {
        get: function () {
            return this._spriteFrame;
        },
        set: function (value) {
            if (!this.isValid)
                return;
            var lastSprite = this._spriteFrame;
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskSprite.prototype, "maskType", {
        get: function () {
            return this._maskType;
        },
        set: function (value) {
            if (value == this._maskType)
                return;
            this._maskType = value;
            this._vertices = null;
            this.markForUpdateRenderData(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskSprite.prototype, "center", {
        get: function () {
            return this._c;
        },
        set: function (value) {
            if (value.equals(this._c))
                return;
            this._c = value;
            this._vertices = null;
            this.markForUpdateRenderData(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskSprite.prototype, "radius", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            if (this._r == value)
                return;
            this._r = value;
            this._vertices = null;
            this.markForUpdateRenderData(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskSprite.prototype, "octParam", {
        get: function () {
            return this._octParam;
        },
        set: function (value) {
            if (value.equals(this._octParam))
                return;
            this._octParam = value;
            this._vertices = null;
            this.markForUpdateRenderData(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskSprite.prototype, "vertices", {
        get: function () {
            return this._vertices;
        },
        enumerable: false,
        configurable: true
    });
    MaskSprite.prototype.setSprite = function (spriteFrame, type, center, radius, minOffset, maxOffset) {
        if (spriteFrame)
            this.spriteFrame = spriteFrame;
        if (type)
            this.maskType = type;
        if (center)
            this.center = center;
        if (radius)
            this.radius = radius;
        if (minOffset)
            this.octParam.x = minOffset;
        if (maxOffset)
            this.octParam.y = maxOffset;
    };
    MaskSprite.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.onTransfromChange, this);
        // 设置默认材质
        var material = this.sharedMaterials[0];
        if (!material) {
            material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
            this.setMaterial(0, material);
        }
        this._applySpriteFrame();
    };
    MaskSprite.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        this.markForUpdateRenderData(true);
    };
    MaskSprite.prototype._activateMaterial = function () {
        var spriteFrame = this._spriteFrame;
        // If spriteframe not loaded, disable render and return.
        if (!spriteFrame || !spriteFrame.textureLoaded()) {
            this["disableRender"]();
            return;
        }
        // make sure material is belong to self.
        var material = this.sharedMaterials[0];
        if (!material) {
            material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
        }
        else {
            material = cc.MaterialVariant.create(material, this);
        }
        var texture = spriteFrame.getTexture();
        material.setProperty("texture", texture);
        this.setMaterial(0, material);
        this["markForRender"](true);
        this.markForUpdateRenderData(true);
    };
    MaskSprite.prototype._onTextureLoaded = function () {
        if (!this.isValid) {
            return;
        }
        this._activateMaterial();
    };
    MaskSprite.prototype.onTransfromChange = function () {
        this._vertices = null;
        this.markForUpdateRenderData(true);
    };
    MaskSprite.prototype.caculateVertices = function () {
        if (!this._spriteFrame)
            return;
        switch (this._maskType) {
            case CoreDefine_1.MaskSpriteType.Square: {
                this.getSquareVertices();
                break;
            }
            case CoreDefine_1.MaskSpriteType.Clire: {
                this.getClireVertices();
                break;
            }
            case CoreDefine_1.MaskSpriteType.Octagon: {
                this.getOctagonVertices();
                break;
            }
            case CoreDefine_1.MaskSpriteType.CardClip: {
                this.getCardClipVertices();
                break;
            }
        }
        // 锁定大小
        if (this._maskType != CoreDefine_1.MaskSpriteType.CardClip) {
            this.node.width = this.node.height = this.radius * 2;
        }
        else {
            this.node.setContentSize(CARD_SIZE);
        }
        return this._vertices;
    };
    MaskSprite.prototype._applySpriteFrame = function (oldFrame) {
        if (oldFrame === void 0) { oldFrame = null; }
        if (oldFrame && oldFrame.off) {
            oldFrame.off("load", this._onTextureLoaded, this);
        }
        var spriteFrame = this._spriteFrame;
        var material = this.sharedMaterials[0];
        if (!spriteFrame ||
            (material && material["_texture"]) !==
                (spriteFrame && spriteFrame["_texture"])) {
            // disable render flow until texture is loaded
            this["markForRender"](false);
        }
        if (spriteFrame) {
            if (!oldFrame || spriteFrame["_texture"] !== oldFrame["_texture"]) {
                if (spriteFrame.textureLoaded()) {
                    this._onTextureLoaded();
                }
                else {
                    spriteFrame.once("load", this._onTextureLoaded, this);
                    spriteFrame.ensureLoadTexture();
                }
            }
        }
    };
    MaskSprite.prototype.getSquareVertices = function () {
        var texture = this._spriteFrame.getTexture();
        var texw = texture.width, texh = texture.height, ratio = texw / texh;
        var tc = this.convertN2T(this._c, texw, texh);
        var tr = this._r / texw;
        var l = tc.x - tr, r = tc.x + tr, t = tc.y - tr * ratio, b = tc.y + tr * ratio;
        var nw = this.node.width, ny = this.node.height, nax = this.node.anchorX, nay = this.node.anchorY;
        var nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
        this._vertices = {
            x: [nc.x - this._r, nc.x + this._r, nc.x + this._r, nc.x - this._r],
            y: [nc.y - this._r, nc.y - this._r, nc.y + this._r, nc.y + this._r],
            nu: [l, r, r, l],
            nv: [t, t, b, b],
            triangles: [0, 1, 2, 2, 3, 0],
        };
        return this._vertices;
    };
    MaskSprite.prototype._canRender = function () {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            if (!this["_enabled"])
                return false;
        }
        else {
            if (!this["_enabled"] ||
                !this.sharedMaterials[0] ||
                !this.node["_activeInHierarchy"])
                return false;
        }
        var spriteFrame = this._spriteFrame;
        if (!spriteFrame || !spriteFrame.textureLoaded()) {
            return false;
        }
        return true;
    };
    MaskSprite.prototype.markForUpdateRenderData = function (enable) {
        if (enable && this._canRender()) {
            this.node["_renderFlag"] |= cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
            this._vertices = null;
            var renderData = this["_renderData"];
            if (renderData) {
                renderData.uvDirty = true;
                renderData.vertDirty = true;
            }
        }
        else if (!enable) {
            this.node["_renderFlag"] &= ~cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
            cc.Node;
        }
    };
    MaskSprite.prototype.getClireVertices = function () {
        this._vertices = {
            x: [],
            y: [],
            nu: [],
            nv: [],
            triangles: [],
        };
        var segments = 64;
        var deltaAngle = cc.misc.degreesToRadians(360) / segments;
        var curentAngle = 0;
        var texture = this._spriteFrame.getTexture();
        var texw = texture.width, texh = texture.height, ratio = texw / texh;
        var tc = this.convertN2T(this._c, texw, texh);
        var tr = this._r / texw;
        var nw = this.node.width, ny = this.node.height, nax = this.node.anchorX, nay = this.node.anchorY;
        var nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
        for (var i = 0; i < segments + 1; i++) {
            var cosA = Math.cos(curentAngle);
            var sinA = Math.sin(curentAngle);
            this.vertices.x[i] = cosA * this._r + nc.x;
            this.vertices.y[i] = sinA * this._r + nc.y;
            this.vertices.nu[i] = cosA * tr + tc.x;
            this.vertices.nv[i] = sinA * tr * ratio + tc.y;
            curentAngle += deltaAngle;
        }
        for (var i = 0, j = 1; i < segments * 3 - 3; i += 3, j++) {
            this.vertices.triangles[i] = 0;
            this.vertices.triangles[i + 1] = j + 1;
            this.vertices.triangles[i + 2] = j;
        }
        this.vertices.triangles[segments * 3 - 3] = 0;
        this.vertices.triangles[segments * 3 - 2] = 1;
        this.vertices.triangles[segments * 3 - 1] = segments;
        return this._vertices;
    };
    MaskSprite.prototype.getOctagonVertices = function () {
        this._vertices = {
            x: [],
            y: [],
            nu: [],
            nv: [],
            triangles: [],
        };
        var texture = this._spriteFrame.getTexture();
        var texw = texture.width, texh = texture.height, ratio = texw / texh;
        var tc = this.convertN2T(this._c, texw, texh);
        var tr = this._r / texw;
        var l = tc.x - tr, r = tc.x + tr, t = tc.y - tr * ratio, b = tc.y + tr * ratio;
        var tox = this._octParam.x / texw, toy = this._octParam.y / texw;
        var nw = this.node.width, ny = this.node.height, nax = this.node.anchorX, nay = this.node.anchorY;
        var nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
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
    };
    MaskSprite.prototype.getCardClipVertices = function () {
        this._vertices = {
            x: [],
            y: [],
            nu: [],
            nv: [],
            triangles: [],
        };
        var texture = this._spriteFrame.getTexture();
        var texw = texture.width, texh = texture.height, ratio = texw / texh;
        var tc = this.convertN2T(this._c, texw, texh);
        var tr = this._r / texw;
        var l = tc.x - tr, r = tc.x + tr, t = tc.y - tr * ratio, b = tc.y + tr * ratio;
        var nw = this.node.width, ny = this.node.height, nax = this.node.anchorX, nay = this.node.anchorY;
        var nc = cc.v2(nw * (0.5 - nax), ny * (0.5 - nay));
        var pl = CARD_CLIPS.length;
        for (var i = 0; i < pl; i++) {
            this._vertices.x[i] = CARD_CLIPS[i][0] + nc.x;
            this._vertices.y[i] = -(CARD_CLIPS[i][1] + nc.y);
            this._vertices.nu[i] = (CARD_CLIPS[i][0] + tc.x * texw) / texw;
            this._vertices.nv[i] = 1 - (CARD_CLIPS[i][1] + tc.y * texh) / texh;
        }
        for (var i = 0, j = 1; i < pl * 3 - 6; i += 3, j++) {
            this._vertices.triangles[i] = 0;
            this._vertices.triangles[i + 1] = j + 1;
            this._vertices.triangles[i + 2] = j;
        }
        return this._vertices;
    };
    /** 将节点坐标转换到纹理坐标
     * 注意： 这里有个假设环境：
     * 1.假设节点的中心在图片的中心点上
     * 2.假设节点的大小等于纹理的大小
     * ==》就是cocos坐标系转换成纹理坐标系
     */
    MaskSprite.prototype.convertN2T = function (p, width, height) {
        var x = (width * 0.5 + p.x) / width;
        var y = 1 - (height * 0.5 + p.y) / height;
        return cc.v2(x, y);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], MaskSprite.prototype, "_spriteFrame", void 0);
    __decorate([
        property({ type: cc.SpriteFrame })
    ], MaskSprite.prototype, "spriteFrame", null);
    __decorate([
        property({ type: cc.Enum(CoreDefine_1.MaskSpriteType) })
    ], MaskSprite.prototype, "_maskType", void 0);
    __decorate([
        property({ type: cc.Enum(CoreDefine_1.MaskSpriteType) })
    ], MaskSprite.prototype, "maskType", null);
    __decorate([
        property(cc.Vec2)
    ], MaskSprite.prototype, "_c", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "绝对坐标下的中心点，针对的是纹理",
        })
    ], MaskSprite.prototype, "center", null);
    __decorate([
        property()
    ], MaskSprite.prototype, "_r", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "以中心点为原点，的半径范围内为锁定目标",
            visible: function () {
                return this._maskType != CoreDefine_1.MaskSpriteType.CardClip;
            },
        })
    ], MaskSprite.prototype, "radius", null);
    __decorate([
        property(cc.Vec2)
    ], MaskSprite.prototype, "_octParam", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "八边形裁切的情况下，x表示第一个裁切长度，y便是第二个裁切长度",
            visible: function () {
                return this._maskType == CoreDefine_1.MaskSpriteType.Octagon;
            },
        })
    ], MaskSprite.prototype, "octParam", null);
    MaskSprite = __decorate([
        ccclass,
        menu("FrameEx/MaskSprite")
    ], MaskSprite);
    return MaskSprite;
}(cc.RenderComponent));
exports.default = MaskSprite;
MaskSprite["_assembler"] = MaskSpriteAssembler;

cc._RF.pop();