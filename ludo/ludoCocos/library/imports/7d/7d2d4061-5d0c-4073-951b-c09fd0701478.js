"use strict";
cc._RF.push(module, '7d2d4BhXQxAc5UbwJ/QcBR4', 'BtlMapElement');
// Script/Game/Views/Fight/BtlMapElement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var Define_1 = require("../../Common/Define");
var UIResources_1 = require("../../Common/UIResources");
var s_unit_szie = null;
var BtlMapElement = /** @class */ (function () {
    function BtlMapElement(assetImpl) {
        /** 节点容器 */
        this.layerElements = null;
        /** 地图对象 */
        this._cameraMap = null;
        this._assetImpl = null;
        this._assetImpl = assetImpl;
        this.layerElements = new ES5Ex_1.MapWrap();
    }
    Object.defineProperty(BtlMapElement.prototype, "cameraMap", {
        get: function () {
            return this._cameraMap;
        },
        set: function (value) {
            if (this._cameraMap === value)
                return;
            this._cameraMap = value;
            if (!s_unit_szie)
                s_unit_szie = this._cameraMap.unitSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapElement.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapElement.prototype, "tcgPos", {
        get: function () {
            return this._tcgpos;
        },
        set: function (value) {
            this._tcgpos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapElement.prototype, "data", {
        get: function () {
            return this._sElementData;
        },
        set: function (data) {
            this._sElementData = data;
        },
        enumerable: false,
        configurable: true
    });
    BtlMapElement.prototype.onActive = function () {
        var _this = this;
        if (!this.data) {
            return;
        }
        var anchPos = this.anchrpos();
        this.layerElements.forEach(function (layerNode, type) {
            layerNode.position = cc.v3(anchPos.x, anchPos.y);
            layerNode.name = _this.data.id + "_" + type;
            switch (Number(type)) {
                case Define_1.MapLayer.MLGrid: {
                    _this.setGridLayer(layerNode);
                    break;
                }
                case Define_1.MapLayer.MLMaterial: {
                    _this.setMaterialLayer(layerNode);
                    break;
                }
            }
        });
    };
    BtlMapElement.prototype.show = function () {
        var layer = this.layerElements.get(Define_1.MapLayer.MLGrid);
        cc.tween(layer).to(0.5, { opacity: 255 }).start();
    };
    BtlMapElement.prototype.hide = function () {
        var layer = this.layerElements.get(Define_1.MapLayer.MLGrid);
        cc.tween(layer).to(0.5, { opacity: 0 }).start();
    };
    /**设置地块层 */
    BtlMapElement.prototype.setGridLayer = function (layerNode) {
        layerNode = layerNode || this.layerElements.get(Define_1.MapLayer.MLGrid);
        var surfaceSp = layerNode.getComponent(cc.Sprite);
        if (!surfaceSp)
            return;
        if (this.data.gridInfo[Define_1.INFO_TYPE.GRID] != Define_1.GRID_TYPE.VOID) {
            var gridType = this.data.gridInfo[Define_1.INFO_TYPE.GRID];
            var str = "grid_" + gridType;
            this._assetImpl.spriteAtlasFrame(surfaceSp, UIResources_1.Res.fight.fight, str);
        }
        else {
            surfaceSp.spriteFrame = null;
        }
        surfaceSp.node.setContentSize(this.cameraMap.unitSize);
        surfaceSp.node.active = true;
    };
    /**设置素材层 */
    BtlMapElement.prototype.setMaterialLayer = function (layerNode) {
        var _this = this;
        var mats = this.data.material;
        if (layerNode.children.length) {
            layerNode.children.forEach(function (node) {
                _this._cameraMap.recoverNodeToPool(node);
            });
        }
        mats.forEach(function (mat) {
            var node = _this.cameraMap.getNodeFromPool(Define_1.MapLayer.MLMaterial);
            var sp = node.getComponent(cc.Sprite);
            sp.spriteFrame = null;
            sp.type = cc.Sprite.Type.SIMPLE;
            node.active = true;
            node.position = mat.position;
            node.name = Define_1.MapLayer.MLMaterial + "";
            _this._assetImpl.spriteAtlasFrame(sp, UIResources_1.Res.fight.fight, "material_" + mat.type);
            layerNode.addChild(node);
            node.scaleY = mat.scale.y;
            node.scaleX = mat.scale.x;
            node.zIndex =
                mat.zindex * 100 + layerNode.parent.children.indexOf(layerNode);
        });
        layerNode.active = true;
    };
    // 锚点所在位置对应的坐标
    BtlMapElement.prototype.anchrpos = function () {
        var n = this.npos();
        return n;
    };
    // 在cc上的坐标
    BtlMapElement.prototype.npos = function () {
        console.log("npos  m2n");
        return this._cameraMap.m2n(this.tcgPos);
    };
    // 在CC上的rect
    BtlMapElement.prototype.rect = function () {
        var pos = this.npos();
        return cc.rect(pos.x, pos.y - s_unit_szie.height / 2, s_unit_szie.width, s_unit_szie.height);
    };
    /**
     * 回收出发函数
     */
    BtlMapElement.prototype.onRecover = function () {
        var _this = this;
        this.layerElements.forEach(function (e, type) {
            if (Number(type) === Define_1.MapLayer.MLMaterial) {
                e.children.forEach(function (ele) {
                    _this.cameraMap.recoverNodeToPool(ele);
                });
            }
            e.name = "null";
        });
    };
    return BtlMapElement;
}());
exports.default = BtlMapElement;

cc._RF.pop();