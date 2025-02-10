"use strict";
cc._RF.push(module, 'dd6bcsdEdxLQZIj6ju7/4+5', 'PlistLabel');
// Script/Core/FrameEx/PlistLabel.ts

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
var HtmlTextParser_1 = require("../BaseFSM/HtmlTextParser");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var renderEngine = cc.renderer.renderEngine;
var gfx = cc.gfx;
// 引擎定义的顶点数据的 buffer 格式, 参考引擎中的 vertex-format.js
// 传递位置及 UV
var vfmtPosUv = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
]);
// 传递位置，UV 及颜色数据
var vfmtPosUvColor = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);
var _tmpRect = cc.rect();
function fillMeshVertices(node, buffer, renderData, colors) {
    var vertexCount = renderData.vertexCount;
    var offsetInfo = buffer.request(vertexCount, renderData.indiceCount);
    // buffer data may be realloc, need get reference after request.
    var indiceOffset = offsetInfo.indiceOffset, vertexOffset = offsetInfo.byteOffset >> 2, vertexId = offsetInfo.vertexOffset, vbuf = buffer._vData, uintbuf = buffer._uintVData, ibuf = buffer._iData;
    var matrix = node._worldMatrix;
    var a = matrix.m00, b = matrix.m01, c = matrix.m04, d = matrix.m05, tx = matrix.m12, ty = matrix.m13;
    var data = renderData._data;
    for (var i = 0; i < vertexCount; i++) {
        // change by visow
        var vert = data[i];
        vbuf[vertexOffset++] = vert.x * a + vert.y * c + tx;
        vbuf[vertexOffset++] = vert.x * b + vert.y * d + ty;
        vbuf[vertexOffset++] = vert.u;
        vbuf[vertexOffset++] = vert.v;
        var color = colors[Math.floor(i / 4)];
        color._fastSetA(node.color.a);
        uintbuf[vertexOffset++] = color._val;
    }
    // fill indice data
    for (var i = 0, count = vertexCount / 4; i < count; i++) {
        var start = vertexId + i * 4;
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
    createData: function (comp) {
        return comp.requestRenderData();
    },
    fillBuffers: function (comp, renderer) {
        if (!comp.atlas || !comp.getMaterials[0])
            return;
        var node = comp.node;
        fillMeshVertices(node, renderer._meshBuffer, comp._renderData, comp._vertColors);
    },
    updateRenderData: function (comp) {
        if (!comp._renderData) {
            comp._renderData = null;
            comp._renderData = comp.requestRenderData();
        }
        this._updateQuads(comp);
    },
    renderIA: function (comp, renderer) {
        renderer._flushIA(comp._renderData);
    },
    appendQuad: function (renderData, texture, rect, rotated, x, y, scale) {
        var dataOffset = renderData.dataLength;
        renderData.dataLength += 4;
        renderData.vertexCount = renderData.dataLength;
        renderData.indiceCount = (renderData.dataLength / 2) * 3;
        var data = renderData._data;
        var texw = texture.width, texh = texture.height;
        var rectWidth = rect.width, rectHeight = rect.height;
        var l, b, r, t;
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
        }
        else {
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
    _updateQuads: function (comp) {
        var spriteAtlas = comp._atlas;
        var spliteChar = comp.spliteChar;
        if (!spriteAtlas)
            return false;
        var texture = spriteAtlas.getTexture();
        if (!texture)
            return false;
        var node = comp.node;
        var renderData = comp._renderData;
        renderData.dataLength = renderData.vertexCount = renderData.indiceCount = 0;
        var width = 0;
        var offsetX = comp._offsetX;
        var letterInfos = [];
        var maxWidth = 0;
        var line = 0;
        var renderIdx = 0;
        var curHtml = null;
        while (((curHtml = comp._renderStrings[renderIdx++]), curHtml)) {
            if (!curHtml.text)
                continue;
            var color = curHtml.style && curHtml.style.color
                ? cc.color().fromHEX(curHtml.style.color)
                : node.color;
            var letters = curHtml.text.split(spliteChar || "");
            for (var ctr = 0, l = letters.length; ctr < l; ++ctr) {
                var letter = letters[ctr];
                if (letterInfos.length == 0) {
                    line += 1;
                }
                if (letter == "\n") {
                    line += 1;
                    maxWidth = width > maxWidth ? width : maxWidth;
                    width = 0;
                    continue;
                }
                var frame = spriteAtlas.getSpriteFrame(letter);
                if (!frame)
                    continue;
                _tmpRect = frame.getRect();
                if (_tmpRect.height > 0 && _tmpRect.width > 0) {
                    letterInfos.push({
                        frame: frame,
                        width: width,
                        line: line,
                        height: _tmpRect.height,
                        color: color,
                    });
                    width += _tmpRect.width;
                }
                if (ctr != letters.length - 1) {
                    width += offsetX;
                }
            }
        }
        maxWidth = width > maxWidth ? width : maxWidth;
        var lineHieght = comp._lineHeight;
        var height = lineHieght * line;
        var appx = node._anchorPoint.x * maxWidth, appy = node._anchorPoint.y * height;
        for (var i = 0; i < letterInfos.length; i++) {
            var letterInfo = letterInfos[i];
            this.appendQuad(renderData, texture, letterInfo.frame.getRect(), letterInfo.frame.isRotated(), letterInfo.width - appx, (line - (letterInfo.line - 1)) * lineHieght -
                appy -
                (lineHieght - letterInfo.height) * 0.5, 1);
            comp._vertColors.push(letterInfo.color);
        }
        node.setContentSize(cc.size(maxWidth, height));
        return true;
    },
};
var PlistLabel = /** @class */ (function (_super) {
    __extends(PlistLabel, _super);
    function PlistLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._atlas = null;
        _this.spliteChar = "";
        _this._string = "";
        _this._renderStrings = [];
        _this._vertColors = [];
        _this._lineHeight = 0;
        _this._offsetX = 0;
        _this._repleaceList = {
            "/": "x",
        };
        return _this;
    }
    Object.defineProperty(PlistLabel.prototype, "atlas", {
        get: function () {
            return this._atlas;
        },
        set: function (value) {
            if (!this.isValid)
                return;
            this._atlas = value;
            this["_assembler"] = PlistLabelAssembler;
            this._activateMaterial(true);
            this._updateRenderData(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlistLabel.prototype, "string", {
        get: function () {
            return this._string;
        },
        set: function (value) {
            if (this._string == value)
                return;
            this._string = value;
            this.parse();
            this._updateRenderData();
        },
        enumerable: false,
        configurable: true
    });
    PlistLabel.prototype.parse = function () {
        if (!this._string) {
            this._string = "";
        }
        var htmlTextParse = HtmlTextParser_1.HtmlTextParser.ins;
        var keys = Object.keys(this._repleaceList);
        var htmls = htmlTextParse.parse(this._string);
        for (var i = 0; i < keys.length; i++) {
            for (var j = 0; j < htmls.length; j++) {
                if (!htmls[j].text)
                    continue;
                htmls[j].text = htmls[j].text.replace(new RegExp(keys[i], "g"), this._repleaceList[keys[i]]);
            }
        }
        this._vertColors = [];
        this._renderStrings = htmls;
    };
    Object.defineProperty(PlistLabel.prototype, "lineHeight", {
        get: function () {
            return this._lineHeight;
        },
        set: function (value) {
            if (this._lineHeight == value)
                return;
            this._lineHeight = value;
            this._updateRenderData();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlistLabel.prototype, "offsetX", {
        get: function () {
            return this._offsetX;
        },
        set: function (value) {
            if (this._offsetX == value)
                return;
            this._offsetX = value;
            this._updateRenderData();
        },
        enumerable: false,
        configurable: true
    });
    PlistLabel.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.onTransfromChange, this);
        if (this._string && this._renderStrings.length == 0) {
            this.parse();
        }
        if (!this._atlas) {
            this._activateMaterial(true);
            return;
        }
        var texture = this._atlas.getTexture();
        if (texture.loaded) {
            this._updateRenderData(true);
        }
        else {
            texture.once("load", this._onTextureLoaded, this);
            cc["textureUtil"].postLoadTexture(texture);
        }
    };
    PlistLabel.prototype._updateRenderData = function (force) {
        if (this.getMaterials()[0] == null) {
            this._activateMaterial(true);
            return;
        }
        var rednerData = this["_renderData"];
        if (rednerData) {
            rednerData.vertDirty = true;
            rednerData.uvDirty = true;
            this["markForRender"](true);
        }
        else {
            this._applyFontTexture(force);
        }
    };
    PlistLabel.prototype._applyFontTexture = function (force) {
        this._activateMaterial(force);
        if (force) {
            this["_assembler"].updateRenderData(this);
        }
    };
    PlistLabel.prototype._activateMaterial = function (force) {
        if (!force)
            return;
        var material = this.getMaterials[0];
        if (!material) {
            material = cc.MaterialVariant.createWithBuiltin("2d-sprite", this);
        }
        else {
            material = cc.MaterialVariant.create(material, this);
        }
        if (this._atlas) {
            material.setProperty("texture", this._atlas.getTexture());
        }
        this.setMaterial(0, material);
        this["markForRender"](true);
    };
    PlistLabel.prototype._onTextureLoaded = function () {
        this._activateMaterial(true);
        this._updateRenderData(true);
    };
    PlistLabel.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    PlistLabel.prototype.onTransfromChange = function () {
        this._updateRenderData();
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], PlistLabel.prototype, "_atlas", void 0);
    __decorate([
        property({ type: cc.SpriteAtlas })
    ], PlistLabel.prototype, "atlas", null);
    __decorate([
        property
    ], PlistLabel.prototype, "spliteChar", void 0);
    __decorate([
        property
    ], PlistLabel.prototype, "_string", void 0);
    __decorate([
        property({
            multiline: true,
        })
    ], PlistLabel.prototype, "string", null);
    __decorate([
        property
    ], PlistLabel.prototype, "_lineHeight", void 0);
    __decorate([
        property()
    ], PlistLabel.prototype, "lineHeight", null);
    __decorate([
        property
    ], PlistLabel.prototype, "_offsetX", void 0);
    __decorate([
        property()
    ], PlistLabel.prototype, "offsetX", null);
    PlistLabel = __decorate([
        ccclass,
        menu("FrameEx/PlistLabel")
    ], PlistLabel);
    return PlistLabel;
}(cc.RenderComponent));
exports.default = PlistLabel;

cc._RF.pop();