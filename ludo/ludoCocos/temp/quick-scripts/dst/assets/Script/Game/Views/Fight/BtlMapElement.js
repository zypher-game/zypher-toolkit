
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/BtlMapElement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9CdGxNYXBFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQXNEO0FBQ3RELDhDQUFxRTtBQUNyRSx3REFBK0M7QUFJL0MsSUFBSSxXQUFXLEdBQVksSUFBSSxDQUFDO0FBQ2hDO0lBeUNFLHVCQUFZLFNBQXFCO1FBeENqQyxXQUFXO1FBQ0osa0JBQWEsR0FBNkIsSUFBSSxDQUFDO1FBQ3RELFdBQVc7UUFDRCxlQUFVLEdBQWlCLElBQUksQ0FBQztRQW1DbEMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUdwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBTyxFQUFtQixDQUFDO0lBQ3RELENBQUM7SUF2Q0Qsc0JBQVcsb0NBQVM7YUFLcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQVBELFVBQXFCLEtBQW1CO1lBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVc7Z0JBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBTUQsc0JBQVcsNkJBQUU7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO2FBQ0QsVUFBYyxLQUFhO1lBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUM7OztPQUhBO0lBTUQsc0JBQVcsaUNBQU07YUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzthQUNELFVBQWtCLEtBQWM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7O09BSEE7SUFPRCxzQkFBVywrQkFBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7YUFDRCxVQUFnQixJQUFpQjtZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FIQTtJQVlNLGdDQUFRLEdBQWY7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUUsSUFBSTtZQUN6QyxTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzNDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNwQixLQUFLLGlCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdCLE1BQU07aUJBQ1A7Z0JBQ0QsS0FBSyxpQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2pDLE1BQU07aUJBQ1A7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDRCQUFJLEdBQVg7UUFDRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsV0FBVztJQUNKLG9DQUFZLEdBQW5CLFVBQW9CLFNBQW1CO1FBQ3JDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3hELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsSUFBSSxHQUFHLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxpQkFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzlCO1FBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVc7SUFDRCx3Q0FBZ0IsR0FBMUIsVUFBMkIsU0FBbUI7UUFBOUMsaUJBMkJDO1FBMUJDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNmLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGlCQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQzlCLEVBQUUsRUFDRixpQkFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ2YsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQ3ZCLENBQUM7WUFDRixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTTtnQkFDVCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYztJQUNQLGdDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsVUFBVTtJQUNILDRCQUFJLEdBQVg7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxZQUFZO0lBQ0wsNEJBQUksR0FBWDtRQUNFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ1osR0FBRyxDQUFDLENBQUMsRUFDTCxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUM5QixXQUFXLENBQUMsS0FBSyxFQUNqQixXQUFXLENBQUMsTUFBTSxDQUNuQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUNBQVMsR0FBaEI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLElBQUk7WUFDakMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssaUJBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztvQkFDckIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0EvSkEsQUErSkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcFdyYXAgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0VTNUV4XCI7XHJcbmltcG9ydCB7IEdSSURfVFlQRSwgSU5GT19UWVBFLCBNYXBMYXllciB9IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IHsgR0Fzc2V0SW1wbCB9IGZyb20gXCIuLy4uLy4uLy4uL0NvcmUvR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCBCdGxDYW1lcmFNYXAgZnJvbSBcIi4vQnRsQ2FtZXJhTWFwXCI7XHJcbmltcG9ydCB7IE1hcEdyaWREYXRhIH0gZnJvbSBcIi4vQnRsTWFwUGFyc2VyXCI7XHJcbmxldCBzX3VuaXRfc3ppZTogY2MuU2l6ZSA9IG51bGw7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0bE1hcEVsZW1lbnQge1xyXG4gIC8qKiDoioLngrnlrrnlmaggKi9cclxuICBwdWJsaWMgbGF5ZXJFbGVtZW50czogTWFwV3JhcDxudW1iZXIsIGNjLk5vZGU+ID0gbnVsbDtcclxuICAvKiog5Zyw5Zu+5a+56LGhICovXHJcbiAgcHJvdGVjdGVkIF9jYW1lcmFNYXA6IEJ0bENhbWVyYU1hcCA9IG51bGw7XHJcbiAgcHVibGljIHNldCBjYW1lcmFNYXAodmFsdWU6IEJ0bENhbWVyYU1hcCkge1xyXG4gICAgaWYgKHRoaXMuX2NhbWVyYU1hcCA9PT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX2NhbWVyYU1hcCA9IHZhbHVlO1xyXG4gICAgaWYgKCFzX3VuaXRfc3ppZSkgc191bml0X3N6aWUgPSB0aGlzLl9jYW1lcmFNYXAudW5pdFNpemU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgY2FtZXJhTWFwKCk6IEJ0bENhbWVyYU1hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FtZXJhTWFwO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9pZDogbnVtYmVyO1xyXG4gIHB1YmxpYyBnZXQgaWQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pZDtcclxuICB9XHJcbiAgcHVibGljIHNldCBpZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xyXG4gIH1cclxuICAvKirlhYPntKDlnZDmoIcgICjlnLDlm74pKi9cclxuICBwcm90ZWN0ZWQgX3RjZ3BvczogY2MuVmVjMjtcclxuICBwdWJsaWMgZ2V0IHRjZ1BvcygpOiBjYy5WZWMyIHtcclxuICAgIHJldHVybiB0aGlzLl90Y2dwb3M7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgdGNnUG9zKHZhbHVlOiBjYy5WZWMyKSB7XHJcbiAgICB0aGlzLl90Y2dwb3MgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKuWFg+e0oOaVsOaNriAqL1xyXG4gIHByb3RlY3RlZCBfc0VsZW1lbnREYXRhOiBNYXBHcmlkRGF0YTtcclxuICBwdWJsaWMgZ2V0IGRhdGEoKTogTWFwR3JpZERhdGEge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NFbGVtZW50RGF0YTtcclxuICB9XHJcbiAgcHVibGljIHNldCBkYXRhKGRhdGE6IE1hcEdyaWREYXRhKSB7XHJcbiAgICB0aGlzLl9zRWxlbWVudERhdGEgPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXNzZXRJbXBsOiBHQXNzZXRJbXBsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoYXNzZXRJbXBsOiBHQXNzZXRJbXBsKSB7XHJcbiAgICB0aGlzLl9hc3NldEltcGwgPSBhc3NldEltcGw7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudHMgPSBuZXcgTWFwV3JhcDxudW1iZXIsIGNjLk5vZGU+KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25BY3RpdmUoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgYW5jaFBvcyA9IHRoaXMuYW5jaHJwb3MoKTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50cy5mb3JFYWNoKChsYXllck5vZGUsIHR5cGUpID0+IHtcclxuICAgICAgbGF5ZXJOb2RlLnBvc2l0aW9uID0gY2MudjMoYW5jaFBvcy54LCBhbmNoUG9zLnkpO1xyXG4gICAgICBsYXllck5vZGUubmFtZSA9IHRoaXMuZGF0YS5pZCArIFwiX1wiICsgdHlwZTtcclxuICAgICAgc3dpdGNoIChOdW1iZXIodHlwZSkpIHtcclxuICAgICAgICBjYXNlIE1hcExheWVyLk1MR3JpZDoge1xyXG4gICAgICAgICAgdGhpcy5zZXRHcmlkTGF5ZXIobGF5ZXJOb2RlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIE1hcExheWVyLk1MTWF0ZXJpYWw6IHtcclxuICAgICAgICAgIHRoaXMuc2V0TWF0ZXJpYWxMYXllcihsYXllck5vZGUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93KCkge1xyXG4gICAgbGV0IGxheWVyID0gdGhpcy5sYXllckVsZW1lbnRzLmdldChNYXBMYXllci5NTEdyaWQpO1xyXG4gICAgY2MudHdlZW4obGF5ZXIpLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgbGV0IGxheWVyID0gdGhpcy5sYXllckVsZW1lbnRzLmdldChNYXBMYXllci5NTEdyaWQpO1xyXG4gICAgY2MudHdlZW4obGF5ZXIpLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICAvKirorr7nva7lnLDlnZflsYIgKi9cclxuICBwdWJsaWMgc2V0R3JpZExheWVyKGxheWVyTm9kZT86IGNjLk5vZGUpIHtcclxuICAgIGxheWVyTm9kZSA9IGxheWVyTm9kZSB8fCB0aGlzLmxheWVyRWxlbWVudHMuZ2V0KE1hcExheWVyLk1MR3JpZCk7XHJcbiAgICBsZXQgc3VyZmFjZVNwID0gbGF5ZXJOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgaWYgKCFzdXJmYWNlU3ApIHJldHVybjtcclxuICAgIGlmICh0aGlzLmRhdGEuZ3JpZEluZm9bSU5GT19UWVBFLkdSSURdICE9IEdSSURfVFlQRS5WT0lEKSB7XHJcbiAgICAgIGxldCBncmlkVHlwZSA9IHRoaXMuZGF0YS5ncmlkSW5mb1tJTkZPX1RZUEUuR1JJRF07XHJcbiAgICAgIGxldCBzdHIgPSBcImdyaWRfXCIgKyBncmlkVHlwZTtcclxuICAgICAgdGhpcy5fYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUoc3VyZmFjZVNwLCBSZXMuZmlnaHQuZmlnaHQsIHN0cik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdXJmYWNlU3Auc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc3VyZmFjZVNwLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5jYW1lcmFNYXAudW5pdFNpemUpO1xyXG4gICAgc3VyZmFjZVNwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKuiuvue9rue0oOadkOWxgiAqL1xyXG4gIHByb3RlY3RlZCBzZXRNYXRlcmlhbExheWVyKGxheWVyTm9kZT86IGNjLk5vZGUpIHtcclxuICAgIGxldCBtYXRzID0gdGhpcy5kYXRhLm1hdGVyaWFsO1xyXG4gICAgaWYgKGxheWVyTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgbGF5ZXJOb2RlLmNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICB0aGlzLl9jYW1lcmFNYXAucmVjb3Zlck5vZGVUb1Bvb2wobm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbWF0cy5mb3JFYWNoKChtYXQpID0+IHtcclxuICAgICAgbGV0IG5vZGUgPSB0aGlzLmNhbWVyYU1hcC5nZXROb2RlRnJvbVBvb2woTWFwTGF5ZXIuTUxNYXRlcmlhbCk7XHJcbiAgICAgIGxldCBzcCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgIHNwLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgc3AudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcclxuICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBub2RlLnBvc2l0aW9uID0gbWF0LnBvc2l0aW9uO1xyXG4gICAgICBub2RlLm5hbWUgPSBNYXBMYXllci5NTE1hdGVyaWFsICsgXCJcIjtcclxuICAgICAgdGhpcy5fYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUoXHJcbiAgICAgICAgc3AsXHJcbiAgICAgICAgUmVzLmZpZ2h0LmZpZ2h0LFxyXG4gICAgICAgIFwibWF0ZXJpYWxfXCIgKyBtYXQudHlwZVxyXG4gICAgICApO1xyXG4gICAgICBsYXllck5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgIG5vZGUuc2NhbGVZID0gbWF0LnNjYWxlLnk7XHJcbiAgICAgIG5vZGUuc2NhbGVYID0gbWF0LnNjYWxlLng7XHJcbiAgICAgIG5vZGUuekluZGV4ID1cclxuICAgICAgICBtYXQuemluZGV4ICogMTAwICsgbGF5ZXJOb2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGxheWVyTm9kZSk7XHJcbiAgICB9KTtcclxuICAgIGxheWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8g6ZSa54K55omA5Zyo5L2N572u5a+55bqU55qE5Z2Q5qCHXHJcbiAgcHVibGljIGFuY2hycG9zKCk6IGNjLlZlYzIge1xyXG4gICAgbGV0IG4gPSB0aGlzLm5wb3MoKTtcclxuICAgIHJldHVybiBuO1xyXG4gIH1cclxuXHJcbiAgLy8g5ZyoY2PkuIrnmoTlnZDmoIdcclxuICBwdWJsaWMgbnBvcygpOiBjYy5WZWMyIHtcclxuICAgIGNvbnNvbGUubG9nKFwibnBvcyAgbTJuXCIpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbWVyYU1hcC5tMm4odGhpcy50Y2dQb3MpO1xyXG4gIH1cclxuXHJcbiAgLy8g5ZyoQ0PkuIrnmoRyZWN0XHJcbiAgcHVibGljIHJlY3QoKTogY2MuUmVjdCB7XHJcbiAgICBsZXQgcG9zID0gdGhpcy5ucG9zKCk7XHJcbiAgICByZXR1cm4gY2MucmVjdChcclxuICAgICAgcG9zLngsXHJcbiAgICAgIHBvcy55IC0gc191bml0X3N6aWUuaGVpZ2h0IC8gMixcclxuICAgICAgc191bml0X3N6aWUud2lkdGgsXHJcbiAgICAgIHNfdW5pdF9zemllLmhlaWdodFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWbnuaUtuWHuuWPkeWHveaVsFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvblJlY292ZXIoKSB7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudHMuZm9yRWFjaCgoZSwgdHlwZSkgPT4ge1xyXG4gICAgICBpZiAoTnVtYmVyKHR5cGUpID09PSBNYXBMYXllci5NTE1hdGVyaWFsKSB7XHJcbiAgICAgICAgZS5jaGlsZHJlbi5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2FtZXJhTWFwLnJlY292ZXJOb2RlVG9Qb29sKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZS5uYW1lID0gXCJudWxsXCI7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19