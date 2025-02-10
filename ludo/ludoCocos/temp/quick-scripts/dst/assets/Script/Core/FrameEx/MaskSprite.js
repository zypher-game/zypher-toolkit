
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/MaskSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L01hc2tTcHJpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQStDO0FBRS9DLFNBQVMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSztJQUM5RCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3pDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVyRSxnRUFBZ0U7SUFDaEUsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQzNDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxFQUNwQixPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUU5QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIs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QUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsV0FBVyxJQUFJLFVBQVUsQ0FBQztTQUMzQjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVTLHVDQUFrQixHQUE1QjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsRUFBRSxFQUFFLEVBQUU7WUFDTixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFDdEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQ3JCLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQ2YsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUNiLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQ3JCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUMvQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUN0QixFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ3JCLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUV0RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUc7WUFDeEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3JELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVTLHdDQUFtQixHQUE3QjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsRUFBRSxFQUFFLEVBQUU7WUFDTixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFDdEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQ3JCLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQ2YsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUNiLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQ3JCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ3RCLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUN2QixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFD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WUFDN0MsT0FBTyxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSwyQkFBYyxDQUFDLE9BQU8sQ0FBQztZQUNsRCxDQUFDO1NBQ0YsQ0FBQzs4Q0FHRDtJQTdFa0IsVUFBVTtRQUY5QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO09BQ04sVUFBVSxDQStiOUI7SUFBRCxpQkFBQztDQS9iRCxBQStiQyxDQS9idUMsRUFBRSxDQUFDLGVBQWUsR0ErYnpEO2tCQS9ib0IsVUFBVTtBQWljL0IsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLG1CQUFtQixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFza1Nwcml0ZVR5cGUgfSBmcm9tIFwiLi4vQ29yZURlZmluZVwiO1xyXG5cclxuZnVuY3Rpb24gZmlsbFZlcnRpY2VzV2l0aG91dENhbGMobm9kZSwgYnVmZmVyLCByZW5kZXJEYXRhLCBjb2xvcikge1xyXG4gIGxldCB2ZXJ0ZXhDb3VudCA9IHJlbmRlckRhdGEudmVydGV4Q291bnQ7XHJcbiAgbGV0IG9mZnNldEluZm8gPSBidWZmZXIucmVxdWVzdCh2ZXJ0ZXhDb3VudCwgcmVuZGVyRGF0YS5pbmRpY2VDb3VudCk7XHJcblxyXG4gIC8vIGJ1ZmZlciBkYXRhIG1heSBiZSByZWFsbG9jLCBuZWVkIGdldCByZWZlcmVuY2UgYWZ0ZXIgcmVxdWVzdC5cclxuICBsZXQgdmVydGV4T2Zmc2V0ID0gb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID4+IDIsXHJcbiAgICB2YnVmID0gYnVmZmVyLl92RGF0YSxcclxuICAgIHVpbnRidWYgPSBidWZmZXIuX3VpbnRWRGF0YTtcclxuXHJcbiAgbGV0IGRhdGEgPSByZW5kZXJEYXRhLl9kYXRhO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4Q291bnQ7IGkrKykge1xyXG4gICAgbGV0IHZlcnQgPSBkYXRhW2ldO1xyXG4gICAgdmJ1Zlt2ZXJ0ZXhPZmZzZXQrK10gPSB2ZXJ0Lng7XHJcbiAgICB2YnVmW3ZlcnRleE9mZnNldCsrXSA9IHZlcnQueTtcclxuICAgIHZidWZbdmVydGV4T2Zmc2V0KytdID0gdmVydC51O1xyXG4gICAgdmJ1Zlt2ZXJ0ZXhPZmZzZXQrK10gPSB2ZXJ0LnY7XHJcbiAgICB1aW50YnVmW3ZlcnRleE9mZnNldCsrXSA9IGNvbG9yO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9mZnNldEluZm87XHJcbn1cclxuXHJcbnZhciBNYXNrU3ByaXRlQXNzZW1ibGVyID0ge1xyXG4gIHVzZXJNb2RlbDogZmFsc2UsXHJcbiAgY3JlYXRlRGF0YShtYXNrU3ByaXRlKSB7XHJcbiAgICByZXR1cm4gbWFza1Nwcml0ZS5yZXF1ZXN0UmVuZGVyRGF0YSgpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVJlbmRlckRhdGEobWFza1Nwcml0ZSkge1xyXG4gICAgaWYgKCFtYXNrU3ByaXRlLl9yZW5kZXJEYXRhKSB7XHJcbiAgICAgIG1hc2tTcHJpdGUuX3JlbmRlckRhdGEgPSB0aGlzLmNyZWF0ZURhdGEobWFza1Nwcml0ZSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVuZGVyRGF0YSA9IG1hc2tTcHJpdGUuX3JlbmRlckRhdGE7XHJcbiAgICBsZXQgZnJhbWUgPSBtYXNrU3ByaXRlLl9zcHJpdGVGcmFtZTtcclxuICAgIGlmICghcmVuZGVyRGF0YSB8fCAhZnJhbWUpIHJldHVybjtcclxuICAgIGxldCB2ZXJ0aWNlcyA9IG1hc2tTcHJpdGUuX3ZlcnRpY2VzO1xyXG4gICAgaWYgKCF2ZXJ0aWNlcykge1xyXG4gICAgICB2ZXJ0aWNlcyA9IG1hc2tTcHJpdGUuY2FjdWxhdGVWZXJ0aWNlcygpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF2ZXJ0aWNlcykgcmV0dXJuO1xyXG4gICAgaWYgKHJlbmRlckRhdGEudmVydGV4Q291bnQgIT09IHZlcnRpY2VzLngubGVuZ3RoKSB7XHJcbiAgICAgIHJlbmRlckRhdGEudmVydGV4Q291bnQgPSB2ZXJ0aWNlcy54Lmxlbmd0aDtcclxuICAgICAgcmVuZGVyRGF0YS5pbmRpY2VDb3VudCA9IHZlcnRpY2VzLnRyaWFuZ2xlcy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyAxIGZvciB3b3JsZCB2ZXJ0aWNlcywgMiBmb3IgbG9jYWwgdmVydGljZXNcclxuICAgICAgcmVuZGVyRGF0YS5kYXRhTGVuZ3RoID0gcmVuZGVyRGF0YS52ZXJ0ZXhDb3VudCAqIDI7XHJcblxyXG4gICAgICByZW5kZXJEYXRhLnV2RGlydHkgPSByZW5kZXJEYXRhLnZlcnREaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlbmRlckRhdGEudXZEaXJ0eSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVVWcyhtYXNrU3ByaXRlKTtcclxuICAgIH1cclxuICAgIGxldCB2ZXJ0RGlydHkgPSByZW5kZXJEYXRhLnZlcnREaXJ0eTtcclxuICAgIGlmICh2ZXJ0RGlydHkpIHtcclxuICAgICAgdGhpcy51cGRhdGVWZXJ0cyhtYXNrU3ByaXRlKTtcclxuICAgICAgdGhpcy51cGRhdGVXb3JsZFZlcnRzKG1hc2tTcHJpdGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVWcyhtYXNrU3ByaXRlKSB7XHJcbiAgICBsZXQgdmVydGljZXMgPSBtYXNrU3ByaXRlLnZlcnRpY2VzLFxyXG4gICAgICB1ID0gdmVydGljZXMubnUsXHJcbiAgICAgIHYgPSB2ZXJ0aWNlcy5udjtcclxuXHJcbiAgICBsZXQgcmVuZGVyRGF0YSA9IG1hc2tTcHJpdGUuX3JlbmRlckRhdGE7XHJcbiAgICBsZXQgZGF0YSA9IHJlbmRlckRhdGEuX2RhdGE7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBsZXQgdmVydGljZSA9IGRhdGFbaV07XHJcbiAgICAgIHZlcnRpY2UudSA9IHVbaV07XHJcbiAgICAgIHZlcnRpY2UudiA9IHZbaV07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRGF0YS51dkRpcnR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVmVydHMobWFza1Nwcml0ZSkge1xyXG4gICAgbGV0IG5vZGUgPSBtYXNrU3ByaXRlLm5vZGUsXHJcbiAgICAgIGNvbnRlbnRXaWR0aCA9IE1hdGguYWJzKG5vZGUud2lkdGgpLFxyXG4gICAgICBjb250ZW50SGVpZ2h0ID0gTWF0aC5hYnMobm9kZS5oZWlnaHQpLFxyXG4gICAgICBhcHB4ID0gbm9kZS5hbmNob3JYICogY29udGVudFdpZHRoLFxyXG4gICAgICBhcHB5ID0gbm9kZS5hbmNob3JZICogY29udGVudEhlaWdodDtcclxuXHJcbiAgICBsZXQgdmVydGljZXMgPSBtYXNrU3ByaXRlLnZlcnRpY2VzLFxyXG4gICAgICB4ID0gdmVydGljZXMueCxcclxuICAgICAgeSA9IHZlcnRpY2VzLnk7XHJcblxyXG4gICAgbGV0IHNjYWxlWCA9IG5vZGUuc2NhbGVYLFxyXG4gICAgICBzY2FsZVkgPSBub2RlLnNjYWxlWTtcclxuXHJcbiAgICBsZXQgcmVuZGVyRGF0YSA9IG1hc2tTcHJpdGUuX3JlbmRlckRhdGE7XHJcbiAgICBsZXQgZGF0YSA9IHJlbmRlckRhdGEuX2RhdGE7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB4Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBsZXQgdmVydGljZSA9IGRhdGFbaSArIGxdO1xyXG4gICAgICB2ZXJ0aWNlLnggPSAoeFtpXSArIG5vZGUud2lkdGggKiBub2RlLmFuY2hvclggLSBhcHB4KSAqIHNjYWxlWDtcclxuICAgICAgdmVydGljZS55ID0gKC15W2ldICsgbm9kZS5oZWlnaHQgKiAoMSAtIG5vZGUuYW5jaG9yWSkgLSBhcHB5KSAqIHNjYWxlWTtcclxuICAgIH1cclxuICAgIHJlbmRlckRhdGEudmVydERpcnR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlV29ybGRWZXJ0cyhtYXNrU3ByaXRlKSB7XHJcbiAgICBsZXQgbm9kZSA9IG1hc2tTcHJpdGUubm9kZSxcclxuICAgICAgcmVuZGVyRGF0YSA9IG1hc2tTcHJpdGUuX3JlbmRlckRhdGEsXHJcbiAgICAgIGRhdGEgPSByZW5kZXJEYXRhLl9kYXRhO1xyXG5cclxuICAgIGxldCBtYXRyaXggPSBub2RlLl93b3JsZE1hdHJpeDtcclxuXHJcbiAgICBsZXQgYSA9IG1hdHJpeC5tMDAsXHJcbiAgICAgIGIgPSBtYXRyaXgubTAxLFxyXG4gICAgICBjID0gbWF0cml4Lm0wNCxcclxuICAgICAgZCA9IG1hdHJpeC5tMDUsXHJcbiAgICAgIHR4ID0gbWF0cml4Lm0xMixcclxuICAgICAgdHkgPSBtYXRyaXgubTEzO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZW5kZXJEYXRhLnZlcnRleENvdW50OyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGxldCBsb2NhbCA9IGRhdGFbaSArIGxdO1xyXG4gICAgICBsZXQgd29ybGQgPSBkYXRhW2ldO1xyXG4gICAgICB3b3JsZC54ID0gbG9jYWwueCAqIGEgKyBsb2NhbC55ICogYyArIHR4O1xyXG4gICAgICB3b3JsZC55ID0gbG9jYWwueCAqIGIgKyBsb2NhbC55ICogZCArIHR5O1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGZpbGxCdWZmZXJzKG1hc2tTcHJpdGUsIHJlbmRlcmVyKSB7XHJcbiAgICBsZXQgdmVydGljZXMgPSBtYXNrU3ByaXRlLnZlcnRpY2VzO1xyXG4gICAgaWYgKCF2ZXJ0aWNlcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHdvcmxkIHZlcnRzXHJcbiAgICBpZiAocmVuZGVyZXIud29ybGRNYXREaXJ0eSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMobWFza1Nwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnVmZmVyXHJcbiAgICBsZXQgYnVmZmVyID0gcmVuZGVyZXIuX21lc2hCdWZmZXI7XHJcbiAgICBsZXQgbm9kZSA9IG1hc2tTcHJpdGUubm9kZTtcclxuICAgIGxldCBvZmZzZXRJbmZvID0gZmlsbFZlcnRpY2VzV2l0aG91dENhbGMoXHJcbiAgICAgIG5vZGUsXHJcbiAgICAgIGJ1ZmZlcixcclxuICAgICAgbWFza1Nwcml0ZS5fcmVuZGVyRGF0YSxcclxuICAgICAgbm9kZS5fY29sb3IuX3ZhbFxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgaWJ1ZiA9IGJ1ZmZlci5faURhdGEsXHJcbiAgICAgIGluZGljZU9mZnNldCA9IG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0LFxyXG4gICAgICB2ZXJ0ZXhJZCA9IG9mZnNldEluZm8udmVydGV4T2Zmc2V0O1xyXG5cclxuICAgIGxldCB0cmlhbmdsZXMgPSB2ZXJ0aWNlcy50cmlhbmdsZXM7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRyaWFuZ2xlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSB2ZXJ0ZXhJZCArIHRyaWFuZ2xlc1tpXTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0aW9uT3JkZXIsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBDQVJEX0NMSVBTID0gW1xyXG4gIFstNDgsIC05M10sXHJcbiAgWzAsIC0xMTBdLFxyXG4gIFs0OCwgLTkzXSxcclxuICBbNDgsIDg5XSxcclxuICBbMzAsIDkzXSxcclxuICBbMjgsIDk4XSxcclxuICBbMjAsIDk4XSxcclxuICBbMTYsIDEwM10sXHJcbiAgWy0xNiwgMTAzXSxcclxuICBbLTIxLCA5OF0sXHJcbiAgWy0yOSwgOThdLFxyXG4gIFstMzEsIDkzXSxcclxuICBbLTQ4LCA4OV0sXHJcbl07XHJcbmNvbnN0IENBUkRfU0laRSA9IGNjLnNpemUoOTcsIDIwMyk7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvTWFza1Nwcml0ZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNrU3ByaXRlIGV4dGVuZHMgY2MuUmVuZGVyQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpIF9zcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZUZyYW1lIH0pXHJcbiAgcHVibGljIGdldCBzcHJpdGVGcmFtZSgpOiBjYy5TcHJpdGVGcmFtZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3ByaXRlRnJhbWU7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgc3ByaXRlRnJhbWUodmFsdWU6IGNjLlNwcml0ZUZyYW1lKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgbGV0IGxhc3RTcHJpdGUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgIHRoaXMuX3Nwcml0ZUZyYW1lID0gdmFsdWU7XHJcbiAgICBpZiAobGFzdFNwcml0ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdmVydGljZXMgPSBudWxsO1xyXG4gICAgdGhpcy5fc3ByaXRlRnJhbWUgPSB2YWx1ZTtcclxuICAgIC8vIHJlbmRlciAmIHVwZGF0ZSByZW5kZXIgZGF0YSBmbGFnIHdpbGwgYmUgdHJpZ2dlcmVkIHdoaWxlIGFwcGx5aW5nIG5ldyBzcHJpdGUgZnJhbWVcclxuICAgIHRoaXMubWFya0ZvclVwZGF0ZVJlbmRlckRhdGEoZmFsc2UpO1xyXG4gICAgdGhpcy5fYXBwbHlTcHJpdGVGcmFtZShsYXN0U3ByaXRlKTtcclxuICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgdGhpcy5ub2RlLmVtaXQoXCJzcHJpdGVmcmFtZS1jaGFuZ2VkXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShNYXNrU3ByaXRlVHlwZSkgfSkgX21hc2tUeXBlOiBNYXNrU3ByaXRlVHlwZSA9XHJcbiAgICBNYXNrU3ByaXRlVHlwZS5TcXVhcmU7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShNYXNrU3ByaXRlVHlwZSkgfSlcclxuICBwdWJsaWMgZ2V0IG1hc2tUeXBlKCk6IE1hc2tTcHJpdGVUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXNrVHlwZTtcclxuICB9XHJcbiAgcHVibGljIHNldCBtYXNrVHlwZSh2YWx1ZTogTWFza1Nwcml0ZVR5cGUpIHtcclxuICAgIGlmICh2YWx1ZSA9PSB0aGlzLl9tYXNrVHlwZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fbWFza1R5cGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX3ZlcnRpY2VzID0gbnVsbDtcclxuICAgIHRoaXMubWFya0ZvclVwZGF0ZVJlbmRlckRhdGEodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkoY2MuVmVjMikgX2M6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcbiAgQHByb3BlcnR5KHtcclxuICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIue7neWvueWdkOagh+S4i+eahOS4reW/g+eCue+8jOmSiOWvueeahOaYr+e6ueeQhlwiLFxyXG4gIH0pXHJcbiAgcHVibGljIGdldCBjZW50ZXIoKTogY2MuVmVjMiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYztcclxuICB9XHJcbiAgcHVibGljIHNldCBjZW50ZXIodmFsdWU6IGNjLlZlYzIpIHtcclxuICAgIGlmICh2YWx1ZS5lcXVhbHModGhpcy5fYykpIHJldHVybjtcclxuICAgIHRoaXMuX2MgPSB2YWx1ZTtcclxuICAgIHRoaXMuX3ZlcnRpY2VzID0gbnVsbDtcclxuICAgIHRoaXMubWFya0ZvclVwZGF0ZVJlbmRlckRhdGEodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkoKSBfcjogbnVtYmVyID0gNDI7XHJcbiAgQHByb3BlcnR5KHtcclxuICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuS7peS4reW/g+eCueS4uuWOn+eCue+8jOeahOWNiuW+hOiMg+WbtOWGheS4uumUgeWumuebruagh1wiLFxyXG4gICAgdmlzaWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbWFza1R5cGUgIT0gTWFza1Nwcml0ZVR5cGUuQ2FyZENsaXA7XHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgcHVibGljIGdldCByYWRpdXMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IHJhZGl1cyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fciA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fciA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdmVydGljZXMgPSBudWxsO1xyXG4gICAgdGhpcy5tYXJrRm9yVXBkYXRlUmVuZGVyRGF0YSh0cnVlKTtcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5WZWMyKSBfb2N0UGFyYW06IGNjLlZlYzIgPSBjYy5WZWMyLk9ORTtcclxuICBAcHJvcGVydHkoe1xyXG4gICAgdG9vbHRpcDpcclxuICAgICAgQ0NfREVWICYmIFwi5YWr6L655b2i6KOB5YiH55qE5oOF5Ya15LiL77yMeOihqOekuuesrOS4gOS4quijgeWIh+mVv+W6pu+8jHnkvr/mmK/nrKzkuozkuKroo4HliIfplb/luqZcIixcclxuICAgIHZpc2libGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21hc2tUeXBlID09IE1hc2tTcHJpdGVUeXBlLk9jdGFnb247XHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgcHVibGljIGdldCBvY3RQYXJhbSgpOiBjYy5WZWMyIHtcclxuICAgIHJldHVybiB0aGlzLl9vY3RQYXJhbTtcclxuICB9XHJcbiAgcHVibGljIHNldCBvY3RQYXJhbSh2YWx1ZTogY2MuVmVjMikge1xyXG4gICAgaWYgKHZhbHVlLmVxdWFscyh0aGlzLl9vY3RQYXJhbSkpIHJldHVybjtcclxuICAgIHRoaXMuX29jdFBhcmFtID0gdmFsdWU7XHJcbiAgICB0aGlzLl92ZXJ0aWNlcyA9IG51bGw7XHJcbiAgICB0aGlzLm1hcmtGb3JVcGRhdGVSZW5kZXJEYXRhKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF92ZXJ0aWNlcztcclxuICBwdWJsaWMgZ2V0IHZlcnRpY2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFNwcml0ZShcclxuICAgIHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgIHR5cGU6IE1hc2tTcHJpdGVUeXBlLFxyXG4gICAgY2VudGVyOiBjYy5WZWMyLFxyXG4gICAgcmFkaXVzOiBudW1iZXIsXHJcbiAgICBtaW5PZmZzZXQ/OiBudW1iZXIsXHJcbiAgICBtYXhPZmZzZXQ/OiBudW1iZXJcclxuICApIHtcclxuICAgIGlmIChzcHJpdGVGcmFtZSkgdGhpcy5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgaWYgKHR5cGUpIHRoaXMubWFza1R5cGUgPSB0eXBlO1xyXG4gICAgaWYgKGNlbnRlcikgdGhpcy5jZW50ZXIgPSBjZW50ZXI7XHJcbiAgICBpZiAocmFkaXVzKSB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgIGlmIChtaW5PZmZzZXQpIHRoaXMub2N0UGFyYW0ueCA9IG1pbk9mZnNldDtcclxuICAgIGlmIChtYXhPZmZzZXQpIHRoaXMub2N0UGFyYW0ueSA9IG1heE9mZnNldDtcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMubm9kZS5vbihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsXHJcbiAgICAgIHRoaXMub25UcmFuc2Zyb21DaGFuZ2UsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICAvLyDorr7nva7pu5jorqTmnZDotKhcclxuICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuc2hhcmVkTWF0ZXJpYWxzWzBdO1xyXG4gICAgaWYgKCFtYXRlcmlhbCkge1xyXG4gICAgICBtYXRlcmlhbCA9IGNjLk1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbihcIjJkLXNwcml0ZVwiLCB0aGlzKTtcclxuICAgICAgdGhpcy5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYXBwbHlTcHJpdGVGcmFtZSgpO1xyXG4gIH1cclxuXHJcbiAgb25FbmFibGUoKSB7XHJcbiAgICBzdXBlci5vbkVuYWJsZSgpO1xyXG4gICAgdGhpcy5tYXJrRm9yVXBkYXRlUmVuZGVyRGF0YSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfYWN0aXZhdGVNYXRlcmlhbCgpIHtcclxuICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lO1xyXG4gICAgLy8gSWYgc3ByaXRlZnJhbWUgbm90IGxvYWRlZCwgZGlzYWJsZSByZW5kZXIgYW5kIHJldHVybi5cclxuICAgIGlmICghc3ByaXRlRnJhbWUgfHwgIXNwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKSkge1xyXG4gICAgICB0aGlzW1wiZGlzYWJsZVJlbmRlclwiXSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIG1hdGVyaWFsIGlzIGJlbG9uZyB0byBzZWxmLlxyXG4gICAgbGV0IG1hdGVyaWFsID0gdGhpcy5zaGFyZWRNYXRlcmlhbHNbMF07XHJcbiAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgIG1hdGVyaWFsID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKFwiMmQtc3ByaXRlXCIsIHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWF0ZXJpYWwgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGV4dHVyZSA9IHNwcml0ZUZyYW1lLmdldFRleHR1cmUoKTtcclxuICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwidGV4dHVyZVwiLCB0ZXh0dXJlKTtcclxuICAgIHRoaXMuc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWwpO1xyXG4gICAgdGhpc1tcIm1hcmtGb3JSZW5kZXJcIl0odHJ1ZSk7XHJcbiAgICB0aGlzLm1hcmtGb3JVcGRhdGVSZW5kZXJEYXRhKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vblRleHR1cmVMb2FkZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25UcmFuc2Zyb21DaGFuZ2UoKSB7XHJcbiAgICB0aGlzLl92ZXJ0aWNlcyA9IG51bGw7XHJcbiAgICB0aGlzLm1hcmtGb3JVcGRhdGVSZW5kZXJEYXRhKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNhY3VsYXRlVmVydGljZXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3Nwcml0ZUZyYW1lKSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKHRoaXMuX21hc2tUeXBlKSB7XHJcbiAgICAgIGNhc2UgTWFza1Nwcml0ZVR5cGUuU3F1YXJlOiB7XHJcbiAgICAgICAgdGhpcy5nZXRTcXVhcmVWZXJ0aWNlcygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgTWFza1Nwcml0ZVR5cGUuQ2xpcmU6IHtcclxuICAgICAgICB0aGlzLmdldENsaXJlVmVydGljZXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIE1hc2tTcHJpdGVUeXBlLk9jdGFnb246IHtcclxuICAgICAgICB0aGlzLmdldE9jdGFnb25WZXJ0aWNlcygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgTWFza1Nwcml0ZVR5cGUuQ2FyZENsaXA6IHtcclxuICAgICAgICB0aGlzLmdldENhcmRDbGlwVmVydGljZXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g6ZSB5a6a5aSn5bCPXHJcbiAgICBpZiAodGhpcy5fbWFza1R5cGUgIT0gTWFza1Nwcml0ZVR5cGUuQ2FyZENsaXApIHtcclxuICAgICAgdGhpcy5ub2RlLndpZHRoID0gdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMucmFkaXVzICogMjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShDQVJEX1NJWkUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgX2FwcGx5U3ByaXRlRnJhbWUob2xkRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbCkge1xyXG4gICAgaWYgKG9sZEZyYW1lICYmIG9sZEZyYW1lLm9mZikge1xyXG4gICAgICBvbGRGcmFtZS5vZmYoXCJsb2FkXCIsIHRoaXMuX29uVGV4dHVyZUxvYWRlZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNwcml0ZUZyYW1lID0gdGhpcy5fc3ByaXRlRnJhbWU7XHJcbiAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLnNoYXJlZE1hdGVyaWFsc1swXTtcclxuICAgIGlmIChcclxuICAgICAgIXNwcml0ZUZyYW1lIHx8XHJcbiAgICAgIChtYXRlcmlhbCAmJiBtYXRlcmlhbFtcIl90ZXh0dXJlXCJdKSAhPT1cclxuICAgICAgICAoc3ByaXRlRnJhbWUgJiYgc3ByaXRlRnJhbWVbXCJfdGV4dHVyZVwiXSlcclxuICAgICkge1xyXG4gICAgICAvLyBkaXNhYmxlIHJlbmRlciBmbG93IHVudGlsIHRleHR1cmUgaXMgbG9hZGVkXHJcbiAgICAgIHRoaXNbXCJtYXJrRm9yUmVuZGVyXCJdKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3ByaXRlRnJhbWUpIHtcclxuICAgICAgaWYgKCFvbGRGcmFtZSB8fCBzcHJpdGVGcmFtZVtcIl90ZXh0dXJlXCJdICE9PSBvbGRGcmFtZVtcIl90ZXh0dXJlXCJdKSB7XHJcbiAgICAgICAgaWYgKHNwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKSkge1xyXG4gICAgICAgICAgdGhpcy5fb25UZXh0dXJlTG9hZGVkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNwcml0ZUZyYW1lLm9uY2UoXCJsb2FkXCIsIHRoaXMuX29uVGV4dHVyZUxvYWRlZCwgdGhpcyk7XHJcbiAgICAgICAgICBzcHJpdGVGcmFtZS5lbnN1cmVMb2FkVGV4dHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFNxdWFyZVZlcnRpY2VzKCkge1xyXG4gICAgbGV0IHRleHR1cmUgPSB0aGlzLl9zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XHJcbiAgICBsZXQgdGV4dyA9IHRleHR1cmUud2lkdGgsXHJcbiAgICAgIHRleGggPSB0ZXh0dXJlLmhlaWdodCxcclxuICAgICAgcmF0aW8gPSB0ZXh3IC8gdGV4aDtcclxuXHJcbiAgICBsZXQgdGMgPSB0aGlzLmNvbnZlcnROMlQodGhpcy5fYywgdGV4dywgdGV4aCk7XHJcbiAgICBsZXQgdHIgPSB0aGlzLl9yIC8gdGV4dztcclxuICAgIGxldCBsID0gdGMueCAtIHRyLFxyXG4gICAgICByID0gdGMueCArIHRyLFxyXG4gICAgICB0ID0gdGMueSAtIHRyICogcmF0aW8sXHJcbiAgICAgIGIgPSB0Yy55ICsgdHIgKiByYXRpbztcclxuICAgIGxldCBudyA9IHRoaXMubm9kZS53aWR0aCxcclxuICAgICAgbnkgPSB0aGlzLm5vZGUuaGVpZ2h0LFxyXG4gICAgICBuYXggPSB0aGlzLm5vZGUuYW5jaG9yWCxcclxuICAgICAgbmF5ID0gdGhpcy5ub2RlLmFuY2hvclk7XHJcbiAgICBsZXQgbmMgPSBjYy52MihudyAqICgwLjUgLSBuYXgpLCBueSAqICgwLjUgLSBuYXkpKTtcclxuICAgIHRoaXMuX3ZlcnRpY2VzID0ge1xyXG4gICAgICB4OiBbbmMueCAtIHRoaXMuX3IsIG5jLnggKyB0aGlzLl9yLCBuYy54ICsgdGhpcy5fciwgbmMueCAtIHRoaXMuX3JdLFxyXG4gICAgICB5OiBbbmMueSAtIHRoaXMuX3IsIG5jLnkgLSB0aGlzLl9yLCBuYy55ICsgdGhpcy5fciwgbmMueSArIHRoaXMuX3JdLFxyXG4gICAgICBudTogW2wsIHIsIHIsIGxdLFxyXG4gICAgICBudjogW3QsIHQsIGIsIGJdLFxyXG4gICAgICB0cmlhbmdsZXM6IFswLCAxLCAyLCAyLCAzLCAwXSxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgX2NhblJlbmRlcigpIHtcclxuICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgIGlmICghdGhpc1tcIl9lbmFibGVkXCJdKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIXRoaXNbXCJfZW5hYmxlZFwiXSB8fFxyXG4gICAgICAgICF0aGlzLnNoYXJlZE1hdGVyaWFsc1swXSB8fFxyXG4gICAgICAgICF0aGlzLm5vZGVbXCJfYWN0aXZlSW5IaWVyYXJjaHlcIl1cclxuICAgICAgKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgIGlmICghc3ByaXRlRnJhbWUgfHwgIXNwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1hcmtGb3JVcGRhdGVSZW5kZXJEYXRhKGVuYWJsZSkge1xyXG4gICAgaWYgKGVuYWJsZSAmJiB0aGlzLl9jYW5SZW5kZXIoKSkge1xyXG4gICAgICB0aGlzLm5vZGVbXCJfcmVuZGVyRmxhZ1wiXSB8PSBjYy5SZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBO1xyXG4gICAgICB0aGlzLl92ZXJ0aWNlcyA9IG51bGw7XHJcbiAgICAgIGxldCByZW5kZXJEYXRhID0gdGhpc1tcIl9yZW5kZXJEYXRhXCJdO1xyXG4gICAgICBpZiAocmVuZGVyRGF0YSkge1xyXG4gICAgICAgIHJlbmRlckRhdGEudXZEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgcmVuZGVyRGF0YS52ZXJ0RGlydHkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCFlbmFibGUpIHtcclxuICAgICAgdGhpcy5ub2RlW1wiX3JlbmRlckZsYWdcIl0gJj0gfmNjLlJlbmRlckZsb3cuRkxBR19VUERBVEVfUkVOREVSX0RBVEE7XHJcbiAgICAgIGNjLk5vZGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0Q2xpcmVWZXJ0aWNlcygpIHtcclxuICAgIHRoaXMuX3ZlcnRpY2VzID0ge1xyXG4gICAgICB4OiBbXSxcclxuICAgICAgeTogW10sXHJcbiAgICAgIG51OiBbXSxcclxuICAgICAgbnY6IFtdLFxyXG4gICAgICB0cmlhbmdsZXM6IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgc2VnbWVudHMgPSA2NDtcclxuICAgIGxldCBkZWx0YUFuZ2xlID0gY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKDM2MCkgLyBzZWdtZW50cztcclxuICAgIGxldCBjdXJlbnRBbmdsZSA9IDA7XHJcbiAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX3Nwcml0ZUZyYW1lLmdldFRleHR1cmUoKTtcclxuICAgIGxldCB0ZXh3ID0gdGV4dHVyZS53aWR0aCxcclxuICAgICAgdGV4aCA9IHRleHR1cmUuaGVpZ2h0LFxyXG4gICAgICByYXRpbyA9IHRleHcgLyB0ZXhoO1xyXG4gICAgbGV0IHRjID0gdGhpcy5jb252ZXJ0TjJUKHRoaXMuX2MsIHRleHcsIHRleGgpO1xyXG4gICAgbGV0IHRyID0gdGhpcy5fciAvIHRleHc7XHJcbiAgICBsZXQgbncgPSB0aGlzLm5vZGUud2lkdGgsXHJcbiAgICAgIG55ID0gdGhpcy5ub2RlLmhlaWdodCxcclxuICAgICAgbmF4ID0gdGhpcy5ub2RlLmFuY2hvclgsXHJcbiAgICAgIG5heSA9IHRoaXMubm9kZS5hbmNob3JZO1xyXG4gICAgbGV0IG5jID0gY2MudjIobncgKiAoMC41IC0gbmF4KSwgbnkgKiAoMC41IC0gbmF5KSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzICsgMTsgaSsrKSB7XHJcbiAgICAgIGxldCBjb3NBID0gTWF0aC5jb3MoY3VyZW50QW5nbGUpO1xyXG4gICAgICBsZXQgc2luQSA9IE1hdGguc2luKGN1cmVudEFuZ2xlKTtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy54W2ldID0gY29zQSAqIHRoaXMuX3IgKyBuYy54O1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLnlbaV0gPSBzaW5BICogdGhpcy5fciArIG5jLnk7XHJcbiAgICAgIHRoaXMudmVydGljZXMubnVbaV0gPSBjb3NBICogdHIgKyB0Yy54O1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLm52W2ldID0gc2luQSAqIHRyICogcmF0aW8gKyB0Yy55O1xyXG4gICAgICBjdXJlbnRBbmdsZSArPSBkZWx0YUFuZ2xlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAxOyBpIDwgc2VnbWVudHMgKiAzIC0gMzsgaSArPSAzLCBqKyspIHtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy50cmlhbmdsZXNbaV0gPSAwO1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLnRyaWFuZ2xlc1tpICsgMV0gPSBqICsgMTtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy50cmlhbmdsZXNbaSArIDJdID0gajtcclxuICAgIH1cclxuICAgIHRoaXMudmVydGljZXMudHJpYW5nbGVzW3NlZ21lbnRzICogMyAtIDNdID0gMDtcclxuICAgIHRoaXMudmVydGljZXMudHJpYW5nbGVzW3NlZ21lbnRzICogMyAtIDJdID0gMTtcclxuICAgIHRoaXMudmVydGljZXMudHJpYW5nbGVzW3NlZ21lbnRzICogMyAtIDFdID0gc2VnbWVudHM7XHJcbiAgICByZXR1cm4gdGhpcy5fdmVydGljZXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0T2N0YWdvblZlcnRpY2VzKCkge1xyXG4gICAgdGhpcy5fdmVydGljZXMgPSB7XHJcbiAgICAgIHg6IFtdLFxyXG4gICAgICB5OiBbXSxcclxuICAgICAgbnU6IFtdLFxyXG4gICAgICBudjogW10sXHJcbiAgICAgIHRyaWFuZ2xlczogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fc3ByaXRlRnJhbWUuZ2V0VGV4dHVyZSgpO1xyXG4gICAgbGV0IHRleHcgPSB0ZXh0dXJlLndpZHRoLFxyXG4gICAgICB0ZXhoID0gdGV4dHVyZS5oZWlnaHQsXHJcbiAgICAgIHJhdGlvID0gdGV4dyAvIHRleGg7XHJcbiAgICBsZXQgdGMgPSB0aGlzLmNvbnZlcnROMlQodGhpcy5fYywgdGV4dywgdGV4aCk7XHJcbiAgICBsZXQgdHIgPSB0aGlzLl9yIC8gdGV4dztcclxuICAgIGxldCBsID0gdGMueCAtIHRyLFxyXG4gICAgICByID0gdGMueCArIHRyLFxyXG4gICAgICB0ID0gdGMueSAtIHRyICogcmF0aW8sXHJcbiAgICAgIGIgPSB0Yy55ICsgdHIgKiByYXRpbztcclxuICAgIGxldCB0b3ggPSB0aGlzLl9vY3RQYXJhbS54IC8gdGV4dyxcclxuICAgICAgdG95ID0gdGhpcy5fb2N0UGFyYW0ueSAvIHRleHc7XHJcbiAgICBsZXQgbncgPSB0aGlzLm5vZGUud2lkdGgsXHJcbiAgICAgIG55ID0gdGhpcy5ub2RlLmhlaWdodCxcclxuICAgICAgbmF4ID0gdGhpcy5ub2RlLmFuY2hvclgsXHJcbiAgICAgIG5heSA9IHRoaXMubm9kZS5hbmNob3JZO1xyXG4gICAgbGV0IG5jID0gY2MudjIobncgKiAoMC41IC0gbmF4KSwgbnkgKiAoMC41IC0gbmF5KSk7XHJcblxyXG4gICAgdGhpcy52ZXJ0aWNlcy54WzBdID0gLXRoaXMuX3IgKyB0aGlzLl9vY3RQYXJhbS54ICsgbmMueDtcclxuICAgIHRoaXMudmVydGljZXMueVswXSA9IC10aGlzLl9yICsgbmMueTtcclxuICAgIHRoaXMudmVydGljZXMubnVbMF0gPSBsICsgdG94O1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udlswXSA9IHQ7XHJcblxyXG4gICAgdGhpcy52ZXJ0aWNlcy54WzFdID0gdGhpcy5fciAtIHRoaXMuX29jdFBhcmFtLnkgKyBuYy54O1xyXG4gICAgdGhpcy52ZXJ0aWNlcy55WzFdID0gLXRoaXMuX3IgKyBuYy55O1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udVsxXSA9IHIgLSB0b3k7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm52WzFdID0gdDtcclxuXHJcbiAgICB0aGlzLnZlcnRpY2VzLnhbMl0gPSB0aGlzLl9yICsgbmMueDtcclxuICAgIHRoaXMudmVydGljZXMueVsyXSA9IG5jLnkgLSAodGhpcy5fciAtIHRoaXMub2N0UGFyYW0ueSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm51WzJdID0gdHIgKyB0Yy54O1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udlsyXSA9IHRjLnkgLSB0ciAqIHJhdGlvICsgdG95ICogcmF0aW87XHJcblxyXG4gICAgdGhpcy52ZXJ0aWNlcy54WzNdID0gdGhpcy5fciArIG5jLng7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnlbM10gPSBuYy55ICsgKHRoaXMuX3IgLSB0aGlzLl9vY3RQYXJhbS54KTtcclxuICAgIHRoaXMudmVydGljZXMubnVbM10gPSByO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udlszXSA9IGIgLSB0b3ggKiByYXRpbztcclxuXHJcbiAgICB0aGlzLnZlcnRpY2VzLnhbNF0gPSB0aGlzLl9yICsgbmMueCAtIHRoaXMub2N0UGFyYW0ueDtcclxuICAgIHRoaXMudmVydGljZXMueVs0XSA9IG5jLnkgKyB0aGlzLl9yO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udVs0XSA9IHIgLSB0b3g7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm52WzRdID0gYjtcclxuXHJcbiAgICB0aGlzLnZlcnRpY2VzLnhbNV0gPSAtdGhpcy5fciArIHRoaXMuX29jdFBhcmFtLnkgKyBuYy54O1xyXG4gICAgdGhpcy52ZXJ0aWNlcy55WzVdID0gbmMueSArIHRoaXMuX3I7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm51WzVdID0gbCArIHRveTtcclxuICAgIHRoaXMudmVydGljZXMubnZbNV0gPSBiO1xyXG5cclxuICAgIHRoaXMudmVydGljZXMueFs2XSA9IC10aGlzLl9yICsgbmMueDtcclxuICAgIHRoaXMudmVydGljZXMueVs2XSA9IG5jLnkgKyAodGhpcy5fciAtIHRoaXMuX29jdFBhcmFtLnkpO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udVs2XSA9IGw7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm52WzZdID0gYiAtIHRveSAqIHJhdGlvO1xyXG5cclxuICAgIHRoaXMudmVydGljZXMueFs3XSA9IC10aGlzLl9yICsgbmMueDtcclxuICAgIHRoaXMudmVydGljZXMueVs3XSA9IG5jLnkgLSAodGhpcy5fciAtIHRoaXMuX29jdFBhcmFtLngpO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5udVs3XSA9IGw7XHJcbiAgICB0aGlzLnZlcnRpY2VzLm52WzddID0gdCArIHRveCAqIHJhdGlvO1xyXG5cclxuICAgIHRoaXMudmVydGljZXMudHJpYW5nbGVzID0gW1xyXG4gICAgICAwLCAxLCAyLCAwLCAyLCAzLCAwLCAzLCA0LCAwLCA0LCA1LCAwLCA1LCA2LCA3LCAwLCA2LFxyXG4gICAgXTtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldENhcmRDbGlwVmVydGljZXMoKSB7XHJcbiAgICB0aGlzLl92ZXJ0aWNlcyA9IHtcclxuICAgICAgeDogW10sXHJcbiAgICAgIHk6IFtdLFxyXG4gICAgICBudTogW10sXHJcbiAgICAgIG52OiBbXSxcclxuICAgICAgdHJpYW5nbGVzOiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRleHR1cmUgPSB0aGlzLl9zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XHJcbiAgICBsZXQgdGV4dyA9IHRleHR1cmUud2lkdGgsXHJcbiAgICAgIHRleGggPSB0ZXh0dXJlLmhlaWdodCxcclxuICAgICAgcmF0aW8gPSB0ZXh3IC8gdGV4aDtcclxuICAgIGxldCB0YyA9IHRoaXMuY29udmVydE4yVCh0aGlzLl9jLCB0ZXh3LCB0ZXhoKTtcclxuICAgIGxldCB0ciA9IHRoaXMuX3IgLyB0ZXh3O1xyXG4gICAgbGV0IGwgPSB0Yy54IC0gdHIsXHJcbiAgICAgIHIgPSB0Yy54ICsgdHIsXHJcbiAgICAgIHQgPSB0Yy55IC0gdHIgKiByYXRpbyxcclxuICAgICAgYiA9IHRjLnkgKyB0ciAqIHJhdGlvO1xyXG4gICAgbGV0IG53ID0gdGhpcy5ub2RlLndpZHRoLFxyXG4gICAgICBueSA9IHRoaXMubm9kZS5oZWlnaHQsXHJcbiAgICAgIG5heCA9IHRoaXMubm9kZS5hbmNob3JYLFxyXG4gICAgICBuYXkgPSB0aGlzLm5vZGUuYW5jaG9yWTtcclxuICAgIGxldCBuYyA9IGNjLnYyKG53ICogKDAuNSAtIG5heCksIG55ICogKDAuNSAtIG5heSkpO1xyXG4gICAgbGV0IHBsID0gQ0FSRF9DTElQUy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsOyBpKyspIHtcclxuICAgICAgdGhpcy5fdmVydGljZXMueFtpXSA9IENBUkRfQ0xJUFNbaV1bMF0gKyBuYy54O1xyXG4gICAgICB0aGlzLl92ZXJ0aWNlcy55W2ldID0gLShDQVJEX0NMSVBTW2ldWzFdICsgbmMueSk7XHJcbiAgICAgIHRoaXMuX3ZlcnRpY2VzLm51W2ldID0gKENBUkRfQ0xJUFNbaV1bMF0gKyB0Yy54ICogdGV4dykgLyB0ZXh3O1xyXG4gICAgICB0aGlzLl92ZXJ0aWNlcy5udltpXSA9IDEgLSAoQ0FSRF9DTElQU1tpXVsxXSArIHRjLnkgKiB0ZXhoKSAvIHRleGg7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDE7IGkgPCBwbCAqIDMgLSA2OyBpICs9IDMsIGorKykge1xyXG4gICAgICB0aGlzLl92ZXJ0aWNlcy50cmlhbmdsZXNbaV0gPSAwO1xyXG4gICAgICB0aGlzLl92ZXJ0aWNlcy50cmlhbmdsZXNbaSArIDFdID0gaiArIDE7XHJcbiAgICAgIHRoaXMuX3ZlcnRpY2VzLnRyaWFuZ2xlc1tpICsgMl0gPSBqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWwhuiKgueCueWdkOagh+i9rOaNouWIsOe6ueeQhuWdkOagh1xyXG4gICAqIOazqOaEj++8miDov5nph4zmnInkuKrlgYforr7njq/looPvvJpcclxuICAgKiAxLuWBh+iuvuiKgueCueeahOS4reW/g+WcqOWbvueJh+eahOS4reW/g+eCueS4ilxyXG4gICAqIDIu5YGH6K6+6IqC54K555qE5aSn5bCP562J5LqO57q555CG55qE5aSn5bCPXHJcbiAgICogPT3jgIvlsLHmmK9jb2Nvc+WdkOagh+ezu+i9rOaNouaIkOe6ueeQhuWdkOagh+ezu1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY29udmVydE4yVChwOiBjYy5WZWMyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IGNjLlZlYzIge1xyXG4gICAgbGV0IHggPSAod2lkdGggKiAwLjUgKyBwLngpIC8gd2lkdGg7XHJcbiAgICBsZXQgeSA9IDEgLSAoaGVpZ2h0ICogMC41ICsgcC55KSAvIGhlaWdodDtcclxuICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICB9XHJcbn1cclxuXHJcbk1hc2tTcHJpdGVbXCJfYXNzZW1ibGVyXCJdID0gTWFza1Nwcml0ZUFzc2VtYmxlcjtcclxuIl19