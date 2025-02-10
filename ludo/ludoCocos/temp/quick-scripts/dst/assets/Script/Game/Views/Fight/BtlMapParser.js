
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/BtlMapParser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9CdGxNYXBQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEscURBQXNEO0FBRXRELGdEQUFpRTtBQXlCakU7O0dBRUc7QUFDSCxJQUFZLGdCQUVYO0FBRkQsV0FBWSxnQkFBZ0I7SUFDMUIsNkVBQWUsQ0FBQTtBQUNqQixDQUFDLEVBRlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFFM0I7QUFFRDs7R0FFRztBQUNILElBQVksY0FLWDtBQUxELFdBQVksY0FBYztJQUN4QixxRUFBYSxDQUFBO0lBQ2IsaUVBQVcsQ0FBQTtJQUNYLHlFQUFlLENBQUE7SUFDZix1RUFBYyxDQUFBO0FBQ2hCLENBQUMsRUFMVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUt6QjtBQUVELDhIQUE4SDtBQUM5SDtJQW1DRSxzQkFBWSxJQUFZLEVBQUUsZ0JBQXFCLEVBQUUsU0FBcUI7UUFqQy9ELGFBQVEsR0FBaUMsSUFBSSxlQUFPLEVBR3hELENBQUM7UUFFSixrQkFBa0I7UUFDUixjQUFTLEdBQVksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUtuRCxVQUFVO1FBQ0EsY0FBUyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFLbkQsVUFBVTtRQUNBLGFBQVEsR0FBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBS3hDLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFLbkMsU0FBUztRQUNDLHNCQUFpQixHQUFRLElBQUksQ0FBQztRQUN4QyxZQUFZO1FBQ0YsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQWUsSUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFD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RUFBRTtZQUMzQixHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUNFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNULEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzVCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNULEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBRTdCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQ0FBWSxHQUFuQixVQUNFLEdBQXFCLEVBQ3JCLEdBQW1CLEVBQ25CLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7WUFBRSxPQUFPO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQkFBbUI7SUFDWCxnQ0FBUyxHQUFqQixVQUFrQixHQUFhO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxtQkFBQztBQUFELENBck1BLEFBcU1DLElBQUE7QUFyTVksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBicmF2ZSBzb3VscyB3aG8gZ2V0IHRoaXMgZmFyOiBZb3UgYXJlIHRoZSBjaG9zZW4gb25lcyxcclxuICogdGhlIHZhbGlhbnQga25pZ2h0cyBvZiBwcm9ncmFtbWluZyB3aG8gdG9pbCBhd2F5LCB3aXRob3V0IHJlc3QsXHJcbiAqIGZpeGluZyBvdXIgbW9zdCBhd2Z1bCBjb2RlLiBUbyB5b3UsIHRydWUgc2F2aW9ycywga2luZ3Mgb2YgbWVuLFxyXG4gKiBJIHNheSB0aGlzOiBuZXZlciBnb25uYSBnaXZlIHlvdSB1cCwgbmV2ZXIgZ29ubmEgbGV0IHlvdSBkb3duLFxyXG4gKiBuZXZlciBnb25uYSBydW4gYXJvdW5kIGFuZCBkZXNlcnQgeW91LiBOZXZlciBnb25uYSBtYWtlIHlvdSBjcnksXHJcbiAqIG5ldmVyIGdvbm5hIHNheSBnb29kYnllLiBOZXZlciBnb25uYSB0ZWxsIGEgbGllIGFuZCBodXJ0IHlvdS5cclxuICovXHJcbi8qKlxyXG4gKiDoh7Tnu4jkuo7mnaXliLDov5nph4znmoTli4fmlaLnmoTkurrvvJpcclxuICog5L2g5piv6KKr5LiK5bid6YCJ5Lit55qE5Lq677yM5piv6Iux5YuH55qE44CB5LiN5pWM6L6b6Ium55qE44CB5LiN55yg5LiN5LyR55qE5p2l5L+u5pS55oiR5Lus6L+Z5pyA5qOY5omL55qE5Luj56CB55qE57yW56iL6aqR5aOr44CCXHJcbiAqIOS9oO+8jOaIkeS7rOeahOaVkeS4luS4u++8jOS6uuS4reS5i+m+me+8jOaIkeimgeWvueS9oOivtO+8muawuOi/nOS4jeimgeaUvuW8g++8jOawuOi/nOS4jeimgeWvueiHquW3seWkseacm++8jOawuOi/nOS4jeimgemAg+i1sO+8jOi+nOi0n+S6huiHquW3se+8jFxyXG4gKiDmsLjov5zkuI3opoHlk63llbzvvIzmsLjov5zkuI3opoHor7Tlho3op4HvvIzmsLjov5zkuI3opoHor7TosI7mnaXkvKTlrrPoh6rlt7HjgIJcclxuICovXHJcbmltcG9ydCB7IE1hcEVsZW1lbnREYXRhVHBsIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0VTNUV4XCI7XHJcbmltcG9ydCB7IEdBc3NldEltcGwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HTG9hZGVyL0dMb2FkZXJcIjtcclxuaW1wb3J0IHsgR1JJRF9JTkZPLCBNQVRFUklBTF9JTkZPIH0gZnJvbSBcIi4vLi4vLi4vQ29tbW9uL0RlZmluZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBHcmlkRGF0YSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBjb29yZGluYXRlOiBjYy5WZWMyO1xyXG4gIGdyaWRJbmZvOiBudW1iZXJbXTtcclxuICB6SW5kZXg6IG51bWJlcjtcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxEYXRhW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFwRm9nRGF0YSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBwb3NpdGlvbjogY2MuVmVjMjtcclxuICBzY2FsZTogY2MuVmVjMjtcclxuICB6SW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbERhdGEge1xyXG4gIHR5cGU6IG51bWJlcjtcclxuICBwb3NpdGlvbjogY2MuVmVjMjtcclxuICBzY2FsZTogY2MuVmVjMjtcclxuICB6aW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgdHlwZSBNYXRlcmlhbERhdGFUcGwgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcltdLCBudW1iZXJbXSwgMF07XHJcbi8qKlxyXG4gKiDlnLDlm77liqDovb3ov5vluqZcclxuICovXHJcbmV4cG9ydCBlbnVtIE1hcFBhcnNlUHJvZ3Jlc3Mge1xyXG4gIE1QUF9Mb2FkTWFwRGF0YSwgLy8g5Yqg6L295Zyw5Zu+5pWw5o2uXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlnLDlm77liqDovb3nirbmgIFcclxuICovXHJcbmV4cG9ydCBlbnVtIE1hcFBhcnNlU3RhdHVzIHtcclxuICBNUFNfQmVnaW5Mb2FkLCAvLyDlvIDlp4vliqDovb3vvJtcclxuICBNUFNfTG9hZGluZywgLy8g5Yqg6L295LitXHJcbiAgTVBTX0xvYWRTdWNjZXNzLCAvLyDliqDovb3miJDlip9cclxuICBNUFNfTG9hZEZhaWxlZCwgLy8g5Yqg6L295aSx6LSlXHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIGxvYWRlciAqL1xyXG5leHBvcnQgY2xhc3MgQnRsTWFwUGFyc2VyIHtcclxuICBwcm90ZWN0ZWQgX3dvcmxkQXNzZWV0OiBjYy5Kc29uQXNzZXQ7XHJcbiAgcHVibGljIF9tYXBEYXRhOiBNYXBXcmFwPG51bWJlciwgTWFwR3JpZERhdGE+ID0gbmV3IE1hcFdyYXA8XHJcbiAgICBudW1iZXIsXHJcbiAgICBNYXBHcmlkRGF0YVxyXG4gID4oKTtcclxuXHJcbiAgLyoq5Y2V5YWD5aSn5bCP55So5LqO6K6h566X5Zyw5Z2X5L2N5a2QICovXHJcbiAgcHJvdGVjdGVkIF91bml0U2l6ZTogY2MuU2l6ZSA9IG5ldyBjYy5TaXplKDQwLCA0MCk7XHJcbiAgcHVibGljIGdldCB1bml0U2l6ZSgpOiBjYy5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl91bml0U2l6ZTtcclxuICB9XHJcblxyXG4gIC8qKuWcsOWdl+Wkp+WwjyAqL1xyXG4gIHByb3RlY3RlZCBfZ3JpZFNpemU6IGNjLlNpemUgPSBuZXcgY2MuU2l6ZSg0MCwgNDApO1xyXG4gIHB1YmxpYyBnZXQgZ3JpZFNpemUoKTogY2MuU2l6ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZFNpemU7XHJcbiAgfVxyXG5cclxuICAvKirlnLDlm77lpKflsI8gKi9cclxuICBwcm90ZWN0ZWQgX21hcFNpemU6IGNjLlNpemUgPSBuZXcgY2MuU2l6ZSgxNSwgMTUpO1xyXG4gIHB1YmxpYyBnZXQgbWFwU2l6ZSgpOiBjYy5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXBTaXplO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9pdGVtU2NhbGU6IG51bWJlciA9IDAuNTtcclxuICBwdWJsaWMgZ2V0IGl0ZW1zU2NhbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXRlbVNjYWxlO1xyXG4gIH1cclxuXHJcbiAgLy8g5Yqg6L296L+b5bqm5Zue6LCDXHJcbiAgcHJvdGVjdGVkIF9wcm9ncmVzc0NhbGxCYWNrOiBhbnkgPSBudWxsO1xyXG4gIC8vIOWcsOWbvuaWh+S7tuWkueeahOagueebruW9lVxyXG4gIHByb3RlY3RlZCBfZmlsZVBhdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBfYXNzZXRJbXBsOiBHQXNzZXRJbXBsID0gbnVsbDtcclxuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcsIHByb2dyZXNzQ2FsbEJhY2s6IGFueSwgYXNzZXRJbXBsOiBHQXNzZXRJbXBsKSB7XHJcbiAgICB0aGlzLl9maWxlUGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLl9hc3NldEltcGwgPSBhc3NldEltcGw7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0NhbGxCYWNrID0gcHJvZ3Jlc3NDYWxsQmFjaztcclxuICB9XHJcblxyXG4gIC8qKuWKoOi9veWcsOWbvuaVsOaNriAqL1xyXG4gIHB1YmxpYyBsb2FkTWFwRGF0YTAoKSB7XHJcbiAgICB0aGlzLmNhbGxQcm9ncmVzcyhcclxuICAgICAgTWFwUGFyc2VQcm9ncmVzcy5NUFBfTG9hZE1hcERhdGEsXHJcbiAgICAgIE1hcFBhcnNlU3RhdHVzLk1QU19CZWdpbkxvYWRcclxuICAgICk7XHJcbiAgICB0aGlzLl9hc3NldEltcGwuanNvbihcclxuICAgICAgdGhpcy5fZmlsZVBhdGgsXHJcbiAgICAgIChlcnIsIEpzb25Bc3NldDogY2MuSnNvbkFzc2V0KSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgdGhpcy5jYWxsUHJvZ3Jlc3MoXHJcbiAgICAgICAgICAgIE1hcFBhcnNlUHJvZ3Jlc3MuTVBQX0xvYWRNYXBEYXRhLFxyXG4gICAgICAgICAgICBNYXBQYXJzZVN0YXR1cy5NUFNfTG9hZEZhaWxlZCxcclxuICAgICAgICAgICAgZXJyXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93b3JsZEFzc2VldCA9IEpzb25Bc3NldDtcclxuICAgICAgICB0aGlzLl91bml0U2l6ZSA9IHRoaXMuYXJyVG9TaXplKHRoaXMuX3dvcmxkQXNzZWV0Lmpzb24udW5pdFNpemUpO1xyXG4gICAgICAgIHRoaXMuX21hcFNpemUgPSB0aGlzLmFyclRvU2l6ZSh0aGlzLl93b3JsZEFzc2VldC5qc29uLnNpemUpO1xyXG4gICAgICAgIHRoaXMuX2dyaWRTaXplID0gdGhpcy5hcnJUb1NpemUodGhpcy5fd29ybGRBc3NlZXQuanNvbi5ncmlkU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5faXRlbVNjYWxlID0gdGhpcy5fZ3JpZFNpemUud2lkdGggLyA4MDtcclxuICAgICAgICBsZXQgZGF0YXM6IE1hcEVsZW1lbnREYXRhVHBsW10gPSB0aGlzLl93b3JsZEFzc2VldC5qc29uLmRhdGE7XHJcbiAgICAgICAgdGhpcy5kZWFsV2l0aE1hcERhdGEoZGF0YXMpO1xyXG4gICAgICAgIHRoaXMuY2FsbFByb2dyZXNzKFxyXG4gICAgICAgICAgTWFwUGFyc2VQcm9ncmVzcy5NUFBfTG9hZE1hcERhdGEsXHJcbiAgICAgICAgICBNYXBQYXJzZVN0YXR1cy5NUFNfTG9hZFN1Y2Nlc3MsXHJcbiAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKuWKoOi9veWcsOWbvuaVsOaNriAqL1xyXG4gIHB1YmxpYyBsb2FkTWFwRGF0YSgpIHtcclxuICAgIHRoaXMuY2FsbFByb2dyZXNzKFxyXG4gICAgICBNYXBQYXJzZVByb2dyZXNzLk1QUF9Mb2FkTWFwRGF0YSxcclxuICAgICAgTWFwUGFyc2VTdGF0dXMuTVBTX0JlZ2luTG9hZFxyXG4gICAgKTtcclxuICAgIHRoaXMuX2Fzc2V0SW1wbC5qc29uKFxyXG4gICAgICB0aGlzLl9maWxlUGF0aCxcclxuICAgICAgKGVyciwgSnNvbkFzc2V0OiBjYy5Kc29uQXNzZXQpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICB0aGlzLmNhbGxQcm9ncmVzcyhcclxuICAgICAgICAgICAgTWFwUGFyc2VQcm9ncmVzcy5NUFBfTG9hZE1hcERhdGEsXHJcbiAgICAgICAgICAgIE1hcFBhcnNlU3RhdHVzLk1QU19Mb2FkRmFpbGVkLFxyXG4gICAgICAgICAgICBlcnJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBfbWFwRGF0YSA9IEpzb25Bc3NldC5qc29uO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIF9tYXBEYXRhKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXBEYXRhLnNldChOdW1iZXIoa2V5KSwgX21hcERhdGFba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbFByb2dyZXNzKFxyXG4gICAgICAgICAgTWFwUGFyc2VQcm9ncmVzcy5NUFBfTG9hZE1hcERhdGEsXHJcbiAgICAgICAgICBNYXBQYXJzZVN0YXR1cy5NUFNfTG9hZFN1Y2Nlc3MsXHJcbiAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKuWkhOeQhuWcsOWbvuaVsOaNriAqL1xyXG4gIHByb3RlY3RlZCBkZWFsV2l0aE1hcERhdGEoZGF0YXM6IE1hcEVsZW1lbnREYXRhVHBsW10pIHtcclxuICAgIGRhdGFzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgbGV0IGRhdGE6IE1hcEVsZW1lbnREYXRhVHBsID0gZWxlbWVudDtcclxuICAgICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcclxuICAgICAgbGV0IG1hcEdyaWREYXRhOiBNYXBHcmlkRGF0YSA9IHtcclxuICAgICAgICBpZDogZGF0YVtHUklEX0lORk8uSURdLFxyXG4gICAgICAgIGNvb3JkaW5hdGU6IGNjLnYyKFxyXG4gICAgICAgICAgZGF0YVtHUklEX0lORk8uUE9TSVRJT05dWzBdLFxyXG4gICAgICAgICAgZGF0YVtHUklEX0lORk8uUE9TSVRJT05dWzFdXHJcbiAgICAgICAgKSxcclxuICAgICAgICBncmlkSW5mbzogZGF0YVtHUklEX0lORk8uSU5GT10sXHJcbiAgICAgICAgekluZGV4OiBkYXRhW0dSSURfSU5GTy5aSU5ERVhdLFxyXG4gICAgICAgIG1hdGVyaWFsOiBbXSxcclxuICAgICAgfTtcclxuICAgICAgLyoq5aSE55CG57Sg5p2Q5pWw5o2uICovXHJcbiAgICAgIGRhdGFbR1JJRF9JTkZPLk1BVEVSSUFMXS5mb3JFYWNoKChtYXQpID0+IHtcclxuICAgICAgICBsZXQgbWF0RGF0YTogTWF0ZXJpYWxEYXRhID0ge1xyXG4gICAgICAgICAgdHlwZTogbWF0W01BVEVSSUFMX0lORk8uVFlQRV0sXHJcbiAgICAgICAgICBwb3NpdGlvbjogY2MudjIoXHJcbiAgICAgICAgICAgIG1hdFtNQVRFUklBTF9JTkZPLlBPU0lUSU9OXVswXSxcclxuICAgICAgICAgICAgbWF0W01BVEVSSUFMX0lORk8uUE9TSVRJT05dWzFdXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgc2NhbGU6IGNjLnYyKFxyXG4gICAgICAgICAgICBtYXRbTUFURVJJQUxfSU5GTy5TQ0FMRV1bMF0sXHJcbiAgICAgICAgICAgIG1hdFtNQVRFUklBTF9JTkZPLlNDQUxFXVsxXVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHppbmRleDogbWF0W01BVEVSSUFMX0lORk8uWklOREVYXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1hcEdyaWREYXRhLm1hdGVyaWFsLnB1c2gobWF0RGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9tYXBEYXRhLnNldChlbGVtZW50WzBdLCBtYXBHcmlkRGF0YSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwi5Zyw5Zu+5pWw5o2u6Kej5p6Q5a6M5oiQOlwiLCB0aGlzLl9tYXBEYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWcsOWdl+aVsOaNrlxyXG4gICAqIEBwYXJhbSBwb3NYXHJcbiAgICogQHBhcmFtIHBvc1lcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RWxlbWVudERhdGEocG9zWDogY2MuVmVjMiB8IG51bWJlciwgcG9zWT86IG51bWJlcik6IE1hcEdyaWREYXRhIHtcclxuICAgIGxldCBwb3M6IGNjLlZlYzI7XHJcbiAgICBpZiAocG9zWCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcclxuICAgICAgcG9zID0gcG9zWDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBvcyA9IGNjLnYyKHBvc1gsIHBvc1kpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmNoZWNrSW5NYXBSYW5nZShwb3MpKSByZXR1cm4gbnVsbDtcclxuICAgIGxldCBtYXBHcmlkRGF0YSA9IHRoaXMuX21hcERhdGEuZ2V0KHBvcy54ICogMTAwICsgcG9zLnkpO1xyXG4gICAgcmV0dXJuIG1hcEdyaWREYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog56Gu6K6k5Zyw5Z2X5Zyo5Zyw5Zu+6IyD5Zu05YaFXHJcbiAgICogQHBhcmFtIHBvc1xyXG4gICAqIEBwYXJhbSB5XHJcbiAgICovXHJcbiAgcHVibGljIGNoZWNrSW5NYXBSYW5nZShwb3M6IGNjLlZlYzIgfCBudW1iZXIsIHk/OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGlmICh0eXBlb2YgcG9zID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIHBvcyA9IGNjLnYyKHBvcywgeSk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHBvcy54IDwgMCB8fFxyXG4gICAgICBwb3MueCA+PSB0aGlzLl9tYXBTaXplLndpZHRoIHx8XHJcbiAgICAgIHBvcy55IDwgMCB8fFxyXG4gICAgICBwb3MueSA+PSB0aGlzLl9tYXBTaXplLmhlaWdodFxyXG4gICAgKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWcsOWbvuWKoOi9vei/m+W6puWbnuiwg1xyXG4gICAqIEBwYXJhbSBtcHAg6L+b5bqm5Zue6LCDXHJcbiAgICogQHBhcmFtIG1wcyDliqDovb3nirbmgIFcclxuICAgKiBAcGFyYW0gcGFyYW0g6aKd5aSW5Y+C5pWwXHJcbiAgICovXHJcbiAgcHVibGljIGNhbGxQcm9ncmVzcyhcclxuICAgIG1wcDogTWFwUGFyc2VQcm9ncmVzcyxcclxuICAgIG1wczogTWFwUGFyc2VTdGF0dXMsXHJcbiAgICBwYXJhbTogYW55ID0gbnVsbFxyXG4gICkge1xyXG4gICAgaWYgKCF0aGlzLl9wcm9ncmVzc0NhbGxCYWNrKSByZXR1cm47XHJcbiAgICB0aGlzLl9wcm9ncmVzc0NhbGxCYWNrKG1wcCwgbXBzLCBwYXJhbSk7XHJcbiAgfVxyXG5cclxuICAvKirlsIbmlbDnu4TovazljJbkuLpjYy5TaXplICovXHJcbiAgcHJpdmF0ZSBhcnJUb1NpemUoYXJyOiBudW1iZXJbXSk6IGNjLlNpemUge1xyXG4gICAgbGV0IHNpemUgPSBuZXcgY2MuU2l6ZSgwKTtcclxuICAgIHNpemUud2lkdGggPSBhcnJbMF07XHJcbiAgICBzaXplLmhlaWdodCA9IGFyclsxXTtcclxuICAgIHJldHVybiBzaXplO1xyXG4gIH1cclxufVxyXG4iXX0=