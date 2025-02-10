
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/PlistLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L1BsaXN0TGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQTJEO0FBRXJELElBQUEsS0FBOEMsRUFBRSxDQUFDLFVBQVUsRUFBekQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsY0FBYyxvQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUVsRSxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztBQUM5QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBRW5CLGdEQUFnRDtBQUNoRCxXQUFXO0FBQ1gsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ25DLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0lBQ2hFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0NBQzVELENBQUMsQ0FBQztBQUNILGdCQUFnQjtBQUNoQixJQUFJLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDeEMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDaEUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FB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QUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxD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LENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVTLHNDQUFpQixHQUEzQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUF0SnlCO1FBQXpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzhDQUErQjtJQUV4RDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7MkNBR2xDO0lBU1M7UUFBVCxRQUFRO2tEQUF5QjtJQUV4QjtRQUFULFFBQVE7K0NBQXNCO0lBSS9CO1FBSEMsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQzs0Q0FHRDtJQStCUztRQUFULFFBQVE7bURBQXlCO0lBRWxDO1FBREMsUUFBUSxFQUFFO2dEQUdWO0lBT1M7UUFBVCxRQUFRO2dEQUFzQjtJQUUvQjtRQURDLFFBQVEsRUFBRTs2Q0FHVjtJQXBFa0IsVUFBVTtRQUY5QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO09BQ04sVUFBVSxDQXdKOUI7SUFBRCxpQkFBQztDQXhKRCxBQXdKQyxDQXhKdUMsRUFBRSxDQUFDLGVBQWUsR0F3SnpEO2tCQXhKb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0bWxUZXh0UGFyc2VyIH0gZnJvbSBcIi4uL0Jhc2VGU00vSHRtbFRleHRQYXJzZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGlvbk9yZGVyLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgcmVuZGVyRW5naW5lID0gY2MucmVuZGVyZXIucmVuZGVyRW5naW5lO1xyXG5jb25zdCBnZnggPSBjYy5nZng7XHJcblxyXG4vLyDlvJXmk47lrprkuYnnmoTpobbngrnmlbDmja7nmoQgYnVmZmVyIOagvOW8jywg5Y+C6ICD5byV5pOO5Lit55qEIHZlcnRleC1mb3JtYXQuanNcclxuLy8g5Lyg6YCS5L2N572u5Y+KIFVWXHJcbmxldCB2Zm10UG9zVXYgPSBuZXcgZ2Z4LlZlcnRleEZvcm1hdChbXHJcbiAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICB7IG5hbWU6IGdmeC5BVFRSX1VWMCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuXSk7XHJcbi8vIOS8oOmAkuS9jee9ru+8jFVWIOWPiuminOiJsuaVsOaNrlxyXG5sZXQgdmZtdFBvc1V2Q29sb3IgPSBuZXcgZ2Z4LlZlcnRleEZvcm1hdChbXHJcbiAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICB7IG5hbWU6IGdmeC5BVFRSX1VWMCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICB7IG5hbWU6IGdmeC5BVFRSX0NPTE9SLCB0eXBlOiBnZnguQVRUUl9UWVBFX1VJTlQ4LCBudW06IDQsIG5vcm1hbGl6ZTogdHJ1ZSB9LFxyXG5dKTtcclxuXHJcbmxldCBfdG1wUmVjdCA9IGNjLnJlY3QoKTtcclxuXHJcbmZ1bmN0aW9uIGZpbGxNZXNoVmVydGljZXMobm9kZSwgYnVmZmVyLCByZW5kZXJEYXRhLCBjb2xvcnMpIHtcclxuICBsZXQgdmVydGV4Q291bnQgPSByZW5kZXJEYXRhLnZlcnRleENvdW50O1xyXG4gIGxldCBvZmZzZXRJbmZvID0gYnVmZmVyLnJlcXVlc3QodmVydGV4Q291bnQsIHJlbmRlckRhdGEuaW5kaWNlQ291bnQpO1xyXG5cclxuICAvLyBidWZmZXIgZGF0YSBtYXkgYmUgcmVhbGxvYywgbmVlZCBnZXQgcmVmZXJlbmNlIGFmdGVyIHJlcXVlc3QuXHJcbiAgbGV0IGluZGljZU9mZnNldCA9IG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0LFxyXG4gICAgdmVydGV4T2Zmc2V0ID0gb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID4+IDIsXHJcbiAgICB2ZXJ0ZXhJZCA9IG9mZnNldEluZm8udmVydGV4T2Zmc2V0LFxyXG4gICAgdmJ1ZiA9IGJ1ZmZlci5fdkRhdGEsXHJcbiAgICB1aW50YnVmID0gYnVmZmVyLl91aW50VkRhdGEsXHJcbiAgICBpYnVmID0gYnVmZmVyLl9pRGF0YTtcclxuXHJcbiAgbGV0IG1hdHJpeCA9IG5vZGUuX3dvcmxkTWF0cml4O1xyXG4gIGxldCBhID0gbWF0cml4Lm0wMCxcclxuICAgIGIgPSBtYXRyaXgubTAxLFxyXG4gICAgYyA9IG1hdHJpeC5tMDQsXHJcbiAgICBkID0gbWF0cml4Lm0wNSxcclxuICAgIHR4ID0gbWF0cml4Lm0xMixcclxuICAgIHR5ID0gbWF0cml4Lm0xMztcclxuXHJcbiAgbGV0IGRhdGEgPSByZW5kZXJEYXRhLl9kYXRhO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleENvdW50OyBpKyspIHtcclxuICAgIC8vIGNoYW5nZSBieSB2aXNvd1xyXG4gICAgbGV0IHZlcnQgPSBkYXRhW2ldO1xyXG4gICAgdmJ1Zlt2ZXJ0ZXhPZmZzZXQrK10gPSB2ZXJ0LnggKiBhICsgdmVydC55ICogYyArIHR4O1xyXG4gICAgdmJ1Zlt2ZXJ0ZXhPZmZzZXQrK10gPSB2ZXJ0LnggKiBiICsgdmVydC55ICogZCArIHR5O1xyXG4gICAgdmJ1Zlt2ZXJ0ZXhPZmZzZXQrK10gPSB2ZXJ0LnU7XHJcbiAgICB2YnVmW3ZlcnRleE9mZnNldCsrXSA9IHZlcnQudjtcclxuICAgIGxldCBjb2xvciA9IGNvbG9yc1tNYXRoLmZsb29yKGkgLyA0KV07XHJcbiAgICBjb2xvci5fZmFzdFNldEEobm9kZS5jb2xvci5hKTtcclxuICAgIHVpbnRidWZbdmVydGV4T2Zmc2V0KytdID0gY29sb3IuX3ZhbDtcclxuICB9XHJcblxyXG4gIC8vIGZpbGwgaW5kaWNlIGRhdGFcclxuICBmb3IgKGxldCBpID0gMCwgY291bnQgPSB2ZXJ0ZXhDb3VudCAvIDQ7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICBsZXQgc3RhcnQgPSB2ZXJ0ZXhJZCArIGkgKiA0O1xyXG4gICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSBzdGFydDtcclxuICAgIGlidWZbaW5kaWNlT2Zmc2V0KytdID0gc3RhcnQgKyAxO1xyXG4gICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSBzdGFydCArIDI7XHJcbiAgICBpYnVmW2luZGljZU9mZnNldCsrXSA9IHN0YXJ0ICsgMTtcclxuICAgIGlidWZbaW5kaWNlT2Zmc2V0KytdID0gc3RhcnQgKyAzO1xyXG4gICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSBzdGFydCArIDI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2Zmc2V0SW5mbztcclxufVxyXG5cclxudmFyIFBsaXN0TGFiZWxBc3NlbWJsZXIgPSB7XHJcbiAgdXNlck1vZGVsOiBmYWxzZSxcclxuICBjcmVhdGVEYXRhKGNvbXApIHtcclxuICAgIHJldHVybiBjb21wLnJlcXVlc3RSZW5kZXJEYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgZmlsbEJ1ZmZlcnMoY29tcCwgcmVuZGVyZXIpIHtcclxuICAgIGlmICghY29tcC5hdGxhcyB8fCAhY29tcC5nZXRNYXRlcmlhbHNbMF0pIHJldHVybjtcclxuICAgIGxldCBub2RlID0gY29tcC5ub2RlO1xyXG4gICAgZmlsbE1lc2hWZXJ0aWNlcyhcclxuICAgICAgbm9kZSxcclxuICAgICAgcmVuZGVyZXIuX21lc2hCdWZmZXIsXHJcbiAgICAgIGNvbXAuX3JlbmRlckRhdGEsXHJcbiAgICAgIGNvbXAuX3ZlcnRDb2xvcnNcclxuICAgICk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlUmVuZGVyRGF0YShjb21wKSB7XHJcbiAgICBpZiAoIWNvbXAuX3JlbmRlckRhdGEpIHtcclxuICAgICAgY29tcC5fcmVuZGVyRGF0YSA9IG51bGw7XHJcbiAgICAgIGNvbXAuX3JlbmRlckRhdGEgPSBjb21wLnJlcXVlc3RSZW5kZXJEYXRhKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl91cGRhdGVRdWFkcyhjb21wKTtcclxuICB9LFxyXG5cclxuICByZW5kZXJJQShjb21wLCByZW5kZXJlcikge1xyXG4gICAgcmVuZGVyZXIuX2ZsdXNoSUEoY29tcC5fcmVuZGVyRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgYXBwZW5kUXVhZChyZW5kZXJEYXRhLCB0ZXh0dXJlLCByZWN0LCByb3RhdGVkLCB4LCB5LCBzY2FsZSkge1xyXG4gICAgbGV0IGRhdGFPZmZzZXQgPSByZW5kZXJEYXRhLmRhdGFMZW5ndGg7XHJcblxyXG4gICAgcmVuZGVyRGF0YS5kYXRhTGVuZ3RoICs9IDQ7XHJcbiAgICByZW5kZXJEYXRhLnZlcnRleENvdW50ID0gcmVuZGVyRGF0YS5kYXRhTGVuZ3RoO1xyXG4gICAgcmVuZGVyRGF0YS5pbmRpY2VDb3VudCA9IChyZW5kZXJEYXRhLmRhdGFMZW5ndGggLyAyKSAqIDM7XHJcblxyXG4gICAgbGV0IGRhdGEgPSByZW5kZXJEYXRhLl9kYXRhO1xyXG4gICAgbGV0IHRleHcgPSB0ZXh0dXJlLndpZHRoLFxyXG4gICAgICB0ZXhoID0gdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgbGV0IHJlY3RXaWR0aCA9IHJlY3Qud2lkdGgsXHJcbiAgICAgIHJlY3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuXHJcbiAgICBsZXQgbCwgYiwgciwgdDtcclxuICAgIGlmICghcm90YXRlZCkge1xyXG4gICAgICBsID0gcmVjdC54IC8gdGV4dztcclxuICAgICAgciA9IChyZWN0LnggKyByZWN0V2lkdGgpIC8gdGV4dztcclxuICAgICAgYiA9IChyZWN0LnkgKyByZWN0SGVpZ2h0KSAvIHRleGg7XHJcbiAgICAgIHQgPSByZWN0LnkgLyB0ZXhoO1xyXG5cclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0XS51ID0gbDtcclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0XS52ID0gYjtcclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0ICsgMV0udSA9IHI7XHJcbiAgICAgIGRhdGFbZGF0YU9mZnNldCArIDFdLnYgPSBiO1xyXG4gICAgICBkYXRhW2RhdGFPZmZzZXQgKyAyXS51ID0gbDtcclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0ICsgMl0udiA9IHQ7XHJcbiAgICAgIGRhdGFbZGF0YU9mZnNldCArIDNdLnUgPSByO1xyXG4gICAgICBkYXRhW2RhdGFPZmZzZXQgKyAzXS52ID0gdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGwgPSByZWN0LnggLyB0ZXh3O1xyXG4gICAgICByID0gKHJlY3QueCArIHJlY3RIZWlnaHQpIC8gdGV4dztcclxuICAgICAgYiA9IChyZWN0LnkgKyByZWN0V2lkdGgpIC8gdGV4aDtcclxuICAgICAgdCA9IHJlY3QueSAvIHRleGg7XHJcblxyXG4gICAgICBkYXRhW2RhdGFPZmZzZXRdLnUgPSBsO1xyXG4gICAgICBkYXRhW2RhdGFPZmZzZXRdLnYgPSB0O1xyXG4gICAgICBkYXRhW2RhdGFPZmZzZXQgKyAxXS51ID0gbDtcclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0ICsgMV0udiA9IGI7XHJcbiAgICAgIGRhdGFbZGF0YU9mZnNldCArIDJdLnUgPSByO1xyXG4gICAgICBkYXRhW2RhdGFPZmZzZXQgKyAyXS52ID0gdDtcclxuICAgICAgZGF0YVtkYXRhT2Zmc2V0ICsgM10udSA9IHI7XHJcbiAgICAgIGRhdGFbZGF0YU9mZnNldCArIDNdLnYgPSBiO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGFbZGF0YU9mZnNldF0ueCA9IHg7XHJcbiAgICBkYXRhW2RhdGFPZmZzZXRdLnkgPSB5IC0gcmVjdEhlaWdodCAqIHNjYWxlO1xyXG4gICAgZGF0YVtkYXRhT2Zmc2V0ICsgMV0ueCA9IHggKyByZWN0V2lkdGggKiBzY2FsZTtcclxuICAgIGRhdGFbZGF0YU9mZnNldCArIDFdLnkgPSB5IC0gcmVjdEhlaWdodCAqIHNjYWxlO1xyXG4gICAgZGF0YVtkYXRhT2Zmc2V0ICsgMl0ueCA9IHg7XHJcbiAgICBkYXRhW2RhdGFPZmZzZXQgKyAyXS55ID0geTtcclxuICAgIGRhdGFbZGF0YU9mZnNldCArIDNdLnggPSB4ICsgcmVjdFdpZHRoICogc2NhbGU7XHJcbiAgICBkYXRhW2RhdGFPZmZzZXQgKyAzXS55ID0geTtcclxuICB9LFxyXG5cclxuICBfdXBkYXRlUXVhZHMoY29tcCkge1xyXG4gICAgbGV0IHNwcml0ZUF0bGFzID0gKGNvbXAgYXMgUGxpc3RMYWJlbCkuX2F0bGFzO1xyXG4gICAgbGV0IHNwbGl0ZUNoYXIgPSAoY29tcCBhcyBQbGlzdExhYmVsKS5zcGxpdGVDaGFyO1xyXG4gICAgaWYgKCFzcHJpdGVBdGxhcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgbGV0IHRleHR1cmUgPSBzcHJpdGVBdGxhcy5nZXRUZXh0dXJlKCk7XHJcbiAgICBpZiAoIXRleHR1cmUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgbm9kZSA9IGNvbXAubm9kZTtcclxuICAgIGxldCByZW5kZXJEYXRhID0gY29tcC5fcmVuZGVyRGF0YTtcclxuICAgIHJlbmRlckRhdGEuZGF0YUxlbmd0aCA9IHJlbmRlckRhdGEudmVydGV4Q291bnQgPSByZW5kZXJEYXRhLmluZGljZUNvdW50ID0gMDtcclxuXHJcbiAgICBsZXQgd2lkdGggPSAwO1xyXG4gICAgbGV0IG9mZnNldFggPSBjb21wLl9vZmZzZXRYO1xyXG4gICAgbGV0IGxldHRlckluZm9zID0gW107XHJcbiAgICBsZXQgbWF4V2lkdGggPSAwO1xyXG4gICAgbGV0IGxpbmUgPSAwO1xyXG4gICAgbGV0IHJlbmRlcklkeCA9IDA7XHJcbiAgICBsZXQgY3VySHRtbCA9IG51bGw7XHJcbiAgICB3aGlsZSAoKChjdXJIdG1sID0gY29tcC5fcmVuZGVyU3RyaW5nc1tyZW5kZXJJZHgrK10pLCBjdXJIdG1sKSkge1xyXG4gICAgICBpZiAoIWN1ckh0bWwudGV4dCkgY29udGludWU7XHJcbiAgICAgIGxldCBjb2xvciA9XHJcbiAgICAgICAgY3VySHRtbC5zdHlsZSAmJiBjdXJIdG1sLnN0eWxlLmNvbG9yXHJcbiAgICAgICAgICA/IGNjLmNvbG9yKCkuZnJvbUhFWChjdXJIdG1sLnN0eWxlLmNvbG9yKVxyXG4gICAgICAgICAgOiBub2RlLmNvbG9yO1xyXG4gICAgICBsZXQgbGV0dGVycyA9IGN1ckh0bWwudGV4dC5zcGxpdChzcGxpdGVDaGFyIHx8IFwiXCIpO1xyXG4gICAgICBmb3IgKGxldCBjdHIgPSAwLCBsID0gbGV0dGVycy5sZW5ndGg7IGN0ciA8IGw7ICsrY3RyKSB7XHJcbiAgICAgICAgbGV0IGxldHRlciA9IGxldHRlcnNbY3RyXTtcclxuICAgICAgICBpZiAobGV0dGVySW5mb3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIGxpbmUgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxldHRlciA9PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICBsaW5lICs9IDE7XHJcbiAgICAgICAgICBtYXhXaWR0aCA9IHdpZHRoID4gbWF4V2lkdGggPyB3aWR0aCA6IG1heFdpZHRoO1xyXG4gICAgICAgICAgd2lkdGggPSAwO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmcmFtZSA9IHNwcml0ZUF0bGFzLmdldFNwcml0ZUZyYW1lKGxldHRlcik7XHJcbiAgICAgICAgaWYgKCFmcmFtZSkgY29udGludWU7XHJcbiAgICAgICAgX3RtcFJlY3QgPSBmcmFtZS5nZXRSZWN0KCk7XHJcbiAgICAgICAgaWYgKF90bXBSZWN0LmhlaWdodCA+IDAgJiYgX3RtcFJlY3Qud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICBsZXR0ZXJJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgZnJhbWUsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBsaW5lLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IF90bXBSZWN0LmhlaWdodCxcclxuICAgICAgICAgICAgY29sb3IsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHdpZHRoICs9IF90bXBSZWN0LndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3RyICE9IGxldHRlcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgd2lkdGggKz0gb2Zmc2V0WDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXhXaWR0aCA9IHdpZHRoID4gbWF4V2lkdGggPyB3aWR0aCA6IG1heFdpZHRoO1xyXG4gICAgbGV0IGxpbmVIaWVnaHQgPSBjb21wLl9saW5lSGVpZ2h0O1xyXG4gICAgbGV0IGhlaWdodCA9IGxpbmVIaWVnaHQgKiBsaW5lO1xyXG4gICAgbGV0IGFwcHggPSBub2RlLl9hbmNob3JQb2ludC54ICogbWF4V2lkdGgsXHJcbiAgICAgIGFwcHkgPSBub2RlLl9hbmNob3JQb2ludC55ICogaGVpZ2h0O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXJJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgbGV0dGVySW5mbyA9IGxldHRlckluZm9zW2ldO1xyXG4gICAgICB0aGlzLmFwcGVuZFF1YWQoXHJcbiAgICAgICAgcmVuZGVyRGF0YSxcclxuICAgICAgICB0ZXh0dXJlLFxyXG4gICAgICAgIGxldHRlckluZm8uZnJhbWUuZ2V0UmVjdCgpLFxyXG4gICAgICAgIGxldHRlckluZm8uZnJhbWUuaXNSb3RhdGVkKCksXHJcbiAgICAgICAgbGV0dGVySW5mby53aWR0aCAtIGFwcHgsXHJcbiAgICAgICAgKGxpbmUgLSAobGV0dGVySW5mby5saW5lIC0gMSkpICogbGluZUhpZWdodCAtXHJcbiAgICAgICAgICBhcHB5IC1cclxuICAgICAgICAgIChsaW5lSGllZ2h0IC0gbGV0dGVySW5mby5oZWlnaHQpICogMC41LFxyXG4gICAgICAgIDFcclxuICAgICAgKTtcclxuICAgICAgY29tcC5fdmVydENvbG9ycy5wdXNoKGxldHRlckluZm8uY29sb3IpO1xyXG4gICAgfVxyXG4gICAgbm9kZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKG1heFdpZHRoLCBoZWlnaHQpKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbn07XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvUGxpc3RMYWJlbFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGlzdExhYmVsIGV4dGVuZHMgY2MuUmVuZGVyQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpIF9hdGxhczogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZUF0bGFzIH0pXHJcbiAgcHVibGljIGdldCBhdGxhcygpOiBjYy5TcHJpdGVBdGxhcyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXRsYXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgYXRsYXModmFsdWU6IGNjLlNwcml0ZUF0bGFzKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fYXRsYXMgPSB2YWx1ZTtcclxuICAgIHRoaXNbXCJfYXNzZW1ibGVyXCJdID0gUGxpc3RMYWJlbEFzc2VtYmxlcjtcclxuICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwodHJ1ZSk7XHJcbiAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5IHNwbGl0ZUNoYXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gIEBwcm9wZXJ0eSBfc3RyaW5nOiBzdHJpbmcgPSBcIlwiO1xyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICBtdWx0aWxpbmU6IHRydWUsXHJcbiAgfSlcclxuICBwdWJsaWMgZ2V0IHN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfcmVuZGVyU3RyaW5ncyA9IFtdO1xyXG4gIHByb3RlY3RlZCBfdmVydENvbG9ycyA9IFtdO1xyXG4gIHB1YmxpYyBzZXQgc3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLl9zdHJpbmcgPT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX3N0cmluZyA9IHZhbHVlO1xyXG4gICAgdGhpcy5wYXJzZSgpO1xyXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhcnNlKCkge1xyXG4gICAgaWYgKCF0aGlzLl9zdHJpbmcpIHtcclxuICAgICAgdGhpcy5fc3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxuICAgIGxldCBodG1sVGV4dFBhcnNlID0gSHRtbFRleHRQYXJzZXIuaW5zO1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9yZXBsZWFjZUxpc3QpO1xyXG4gICAgbGV0IGh0bWxzID0gaHRtbFRleHRQYXJzZS5wYXJzZSh0aGlzLl9zdHJpbmcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaHRtbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoIWh0bWxzW2pdLnRleHQpIGNvbnRpbnVlO1xyXG4gICAgICAgIGh0bWxzW2pdLnRleHQgPSBodG1sc1tqXS50ZXh0LnJlcGxhY2UoXHJcbiAgICAgICAgICBuZXcgUmVnRXhwKGtleXNbaV0sIFwiZ1wiKSxcclxuICAgICAgICAgIHRoaXMuX3JlcGxlYWNlTGlzdFtrZXlzW2ldXVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX3ZlcnRDb2xvcnMgPSBbXTtcclxuICAgIHRoaXMuX3JlbmRlclN0cmluZ3MgPSBodG1scztcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eSBfbGluZUhlaWdodDogbnVtYmVyID0gMDtcclxuICBAcHJvcGVydHkoKVxyXG4gIHB1YmxpYyBnZXQgbGluZUhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpbmVIZWlnaHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgbGluZUhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fbGluZUhlaWdodCA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fbGluZUhlaWdodCA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5IF9vZmZzZXRYOiBudW1iZXIgPSAwO1xyXG4gIEBwcm9wZXJ0eSgpXHJcbiAgcHVibGljIGdldCBvZmZzZXRYKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0WDtcclxuICB9XHJcbiAgcHVibGljIHNldCBvZmZzZXRYKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLl9vZmZzZXRYID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl9vZmZzZXRYID0gdmFsdWU7XHJcbiAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3JlcGxlYWNlTGlzdCA9IHtcclxuICAgIFwiL1wiOiBcInhcIixcclxuICB9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLm5vZGUub24oXHJcbiAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELFxyXG4gICAgICB0aGlzLm9uVHJhbnNmcm9tQ2hhbmdlLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuX3N0cmluZyAmJiB0aGlzLl9yZW5kZXJTdHJpbmdzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMucGFyc2UoKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fYXRsYXMpIHtcclxuICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCh0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHRleHR1cmUgPSB0aGlzLl9hdGxhcy5nZXRUZXh0dXJlKCk7XHJcbiAgICBpZiAodGV4dHVyZS5sb2FkZWQpIHtcclxuICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHR1cmUub25jZShcImxvYWRcIiwgdGhpcy5fb25UZXh0dXJlTG9hZGVkLCB0aGlzKTtcclxuICAgICAgY2NbXCJ0ZXh0dXJlVXRpbFwiXS5wb3N0TG9hZFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfdXBkYXRlUmVuZGVyRGF0YShmb3JjZT8pIHtcclxuICAgIGlmICh0aGlzLmdldE1hdGVyaWFscygpWzBdID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCh0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlZG5lckRhdGEgPSB0aGlzW1wiX3JlbmRlckRhdGFcIl07XHJcbiAgICBpZiAocmVkbmVyRGF0YSkge1xyXG4gICAgICByZWRuZXJEYXRhLnZlcnREaXJ0eSA9IHRydWU7XHJcbiAgICAgIHJlZG5lckRhdGEudXZEaXJ0eSA9IHRydWU7XHJcbiAgICAgIHRoaXNbXCJtYXJrRm9yUmVuZGVyXCJdKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYXBwbHlGb250VGV4dHVyZShmb3JjZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfYXBwbHlGb250VGV4dHVyZShmb3JjZSkge1xyXG4gICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbChmb3JjZSk7XHJcbiAgICBpZiAoZm9yY2UpIHtcclxuICAgICAgdGhpc1tcIl9hc3NlbWJsZXJcIl0udXBkYXRlUmVuZGVyRGF0YSh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9hY3RpdmF0ZU1hdGVyaWFsKGZvcmNlKSB7XHJcbiAgICBpZiAoIWZvcmNlKSByZXR1cm47XHJcbiAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsc1swXTtcclxuXHJcbiAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgIG1hdGVyaWFsID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKFwiMmQtc3ByaXRlXCIsIHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWF0ZXJpYWwgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9hdGxhcykge1xyXG4gICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eShcInRleHR1cmVcIiwgdGhpcy5fYXRsYXMuZ2V0VGV4dHVyZSgpKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWwpO1xyXG5cclxuICAgIHRoaXNbXCJtYXJrRm9yUmVuZGVyXCJdKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vblRleHR1cmVMb2FkZWQoKSB7XHJcbiAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKHRydWUpO1xyXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSh0cnVlKTtcclxuICB9XHJcblxyXG4gIG9uRW5hYmxlKCkge1xyXG4gICAgc3VwZXIub25FbmFibGUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvblRyYW5zZnJvbUNoYW5nZSgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcclxuICB9XHJcbn1cclxuIl19