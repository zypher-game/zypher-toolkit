"use strict";
cc._RF.push(module, '52223zqdEhJIK8P8qPfFlhr', 'BtlMapParser');
// Script/Game/Views/Fight/BtlMapParser.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtlMapParser = exports.MapParseStatus = exports.MapParseProgress = void 0;
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var Define_1 = require("./../../Common/Define");
/**
 * 地图加载进度
 */
var MapParseProgress;
(function (MapParseProgress) {
    MapParseProgress[MapParseProgress["MPP_LoadMapData"] = 0] = "MPP_LoadMapData";
})(MapParseProgress = exports.MapParseProgress || (exports.MapParseProgress = {}));
/**
 * 地图加载状态
 */
var MapParseStatus;
(function (MapParseStatus) {
    MapParseStatus[MapParseStatus["MPS_BeginLoad"] = 0] = "MPS_BeginLoad";
    MapParseStatus[MapParseStatus["MPS_Loading"] = 1] = "MPS_Loading";
    MapParseStatus[MapParseStatus["MPS_LoadSuccess"] = 2] = "MPS_LoadSuccess";
    MapParseStatus[MapParseStatus["MPS_LoadFailed"] = 3] = "MPS_LoadFailed";
})(MapParseStatus = exports.MapParseStatus || (exports.MapParseStatus = {}));
/******************************************************************************************************************* loader */
var BtlMapParser = /** @class */ (function () {
    function BtlMapParser(path, progressCallBack, assetImpl) {
        this._mapData = new ES5Ex_1.MapWrap();
        /**单元大小用于计算地块位子 */
        this._unitSize = new cc.Size(40, 40);
        /**地块大小 */
        this._gridSize = new cc.Size(40, 40);
        /**地图大小 */
        this._mapSize = new cc.Size(15, 15);
        this._itemScale = 0.5;
        // 加载进度回调
        this._progressCallBack = null;
        // 地图文件夹的根目录
        this._filePath = "";
        this._assetImpl = null;
        this._filePath = path;
        this._assetImpl = assetImpl;
        this._progressCallBack = progressCallBack;
    }
    Object.defineProperty(BtlMapParser.prototype, "unitSize", {
        get: function () {
            return this._unitSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapParser.prototype, "gridSize", {
        get: function () {
            return this._gridSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapParser.prototype, "mapSize", {
        get: function () {
            return this._mapSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BtlMapParser.prototype, "itemsScale", {
        get: function () {
            return this._itemScale;
        },
        enumerable: false,
        configurable: true
    });
    /**加载地图数据 */
    BtlMapParser.prototype.loadMapData0 = function () {
        var _this = this;
        this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_BeginLoad);
        this._assetImpl.json(this._filePath, function (err, JsonAsset) {
            if (err) {
                _this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_LoadFailed, err);
            }
            _this._worldAsseet = JsonAsset;
            _this._unitSize = _this.arrToSize(_this._worldAsseet.json.unitSize);
            _this._mapSize = _this.arrToSize(_this._worldAsseet.json.size);
            _this._gridSize = _this.arrToSize(_this._worldAsseet.json.gridSize);
            _this._itemScale = _this._gridSize.width / 80;
            var datas = _this._worldAsseet.json.data;
            _this.dealWithMapData(datas);
            _this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_LoadSuccess, _this);
        }, false);
    };
    /**加载地图数据 */
    BtlMapParser.prototype.loadMapData = function () {
        var _this = this;
        this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_BeginLoad);
        this._assetImpl.json(this._filePath, function (err, JsonAsset) {
            if (err) {
                _this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_LoadFailed, err);
            }
            var _mapData = JsonAsset.json;
            for (var key in _mapData) {
                _this._mapData.set(Number(key), _mapData[key]);
            }
            _this.callProgress(MapParseProgress.MPP_LoadMapData, MapParseStatus.MPS_LoadSuccess, _this);
        }, false);
    };
    /**处理地图数据 */
    BtlMapParser.prototype.dealWithMapData = function (datas) {
        var _this = this;
        datas.forEach(function (element) {
            var data = element;
            if (!data)
                return null;
            var mapGridData = {
                id: data[Define_1.GRID_INFO.ID],
                coordinate: cc.v2(data[Define_1.GRID_INFO.POSITION][0], data[Define_1.GRID_INFO.POSITION][1]),
                gridInfo: data[Define_1.GRID_INFO.INFO],
                zIndex: data[Define_1.GRID_INFO.ZINDEX],
                material: [],
            };
            /**处理素材数据 */
            data[Define_1.GRID_INFO.MATERIAL].forEach(function (mat) {
                var matData = {
                    type: mat[Define_1.MATERIAL_INFO.TYPE],
                    position: cc.v2(mat[Define_1.MATERIAL_INFO.POSITION][0], mat[Define_1.MATERIAL_INFO.POSITION][1]),
                    scale: cc.v2(mat[Define_1.MATERIAL_INFO.SCALE][0], mat[Define_1.MATERIAL_INFO.SCALE][1]),
                    zindex: mat[Define_1.MATERIAL_INFO.ZINDEX],
                };
                mapGridData.material.push(matData);
            });
            _this._mapData.set(element[0], mapGridData);
        });
        console.log("地图数据解析完成:", this._mapData);
    };
    /**
     * 获取地块数据
     * @param posX
     * @param posY
     */
    BtlMapParser.prototype.getElementData = function (posX, posY) {
        var pos;
        if (posX instanceof cc.Vec2) {
            pos = posX;
        }
        else {
            pos = cc.v2(posX, posY);
        }
        if (!this.checkInMapRange(pos))
            return null;
        var mapGridData = this._mapData.get(pos.x * 100 + pos.y);
        return mapGridData;
    };
    /**
     * 确认地块在地图范围内
     * @param pos
     * @param y
     */
    BtlMapParser.prototype.checkInMapRange = function (pos, y) {
        if (typeof pos === "number") {
            pos = cc.v2(pos, y);
        }
        if (pos.x < 0 ||
            pos.x >= this._mapSize.width ||
            pos.y < 0 ||
            pos.y >= this._mapSize.height)
            return false;
        return true;
    };
    /**
     * 地图加载进度回调
     * @param mpp 进度回调
     * @param mps 加载状态
     * @param param 额外参数
     */
    BtlMapParser.prototype.callProgress = function (mpp, mps, param) {
        if (param === void 0) { param = null; }
        if (!this._progressCallBack)
            return;
        this._progressCallBack(mpp, mps, param);
    };
    /**将数组转化为cc.Size */
    BtlMapParser.prototype.arrToSize = function (arr) {
        var size = new cc.Size(0);
        size.width = arr[0];
        size.height = arr[1];
        return size;
    };
    return BtlMapParser;
}());
exports.BtlMapParser = BtlMapParser;

cc._RF.pop();