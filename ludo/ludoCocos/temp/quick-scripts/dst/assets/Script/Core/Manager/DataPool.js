
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/DataPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e993fptHARDjpYjK2L9w4Z5', 'DataPool');
// Script/Core/Manager/DataPool.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPool = exports.GLocal = exports.GRunTime = exports.GStatic = exports.GData = void 0;
var UIResources_1 = require("../../Game/Common/UIResources");
var CoreDefine_1 = require("../CoreDefine");
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GCtrl_1 = require("../GCtrl");
var GLoader_1 = require("../GLoader/GLoader");
/**
 * 数据池
 */
var unLoadGetRawErr = {
    getRaw: function () {
        console.log("%c" + "GetRaw Error! may the data configure unload.", "color:red");
        return null;
    },
};
var GData = /** @class */ (function (_super) {
    __extends(GData, _super);
    function GData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GData.prototype.clear = function () {
        return true;
    };
    return GData;
}(cc.Component));
exports.GData = GData;
var GStatic = /** @class */ (function (_super) {
    __extends(GStatic, _super);
    function GStatic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = new ES5Ex_1.MapWrap();
        return _this;
    }
    GStatic.prototype.parse = function (obj) {
        if (!obj)
            return false;
        return true;
    };
    Object.defineProperty(GStatic.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GStatic.prototype, "size", {
        get: function () {
            return this._data.size;
        },
        enumerable: false,
        configurable: true
    });
    GStatic.prototype.getRaw = function (key) {
        var raw = this._data.get(key);
        if (CC_DEBUG || CC_DEV) {
            if (!raw) {
                cc.warn("can't find raw by key = " + key + " in static table " + cc.js.getClassName(this) + ".");
            }
        }
        return CoreDefine_1.OBJECT_COPY(raw);
    };
    GStatic.prototype.tryGetRaw = function (key) {
        return this._data.get(key);
    };
    GStatic.prototype.getComRaw = function (keyMain, keySub) {
        var mainRaw = this._data.get(keyMain);
        return mainRaw.get(keySub);
    };
    GStatic.prototype.hasRaw = function (key) {
        return this._data.has(key);
    };
    GStatic.prototype.clear = function () {
        var keys = [];
        this._data.forEach(function (value, key) {
            keys.push(key);
        });
        for (var i = 0; i < keys.length; i++) {
            if (this._data.has(keys[i]))
                this._data.delete(keys[i]);
        }
        this._data.clear();
        return true;
    };
    GStatic.addonRaw = function (objRaw) {
        return objRaw;
    };
    return GStatic;
}(GData));
exports.GStatic = GStatic;
var GRunTime = /** @class */ (function (_super) {
    __extends(GRunTime, _super);
    function GRunTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GRunTime.prototype.clear = function () {
        GCtrl_1.GCtrl.ES.off(this);
        return true;
    };
    return GRunTime;
}(GData));
exports.GRunTime = GRunTime;
var GLocal = /** @class */ (function (_super) {
    __extends(GLocal, _super);
    function GLocal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GLocal.prototype.set = function () {
        var obj = cc.js.createMap(true);
        for (var key in this) {
            if (key.indexOf("$") != CoreDefine_1.INVALID_VALUE) {
                obj[key] = this[key];
            }
        }
        cc.sys.localStorage.setItem(this.$localKey, JSON.stringify(obj));
    };
    GLocal.prototype.remove = function () {
        cc.sys.localStorage.removeItem(this.$localKey);
        this.unscheduleAllCallbacks();
        GCtrl_1.GCtrl.ES.off(this);
    };
    GLocal.prototype.load = function () {
        var obj = cc.sys.localStorage.getItem(this.$localKey);
        if (obj) {
            cc.js.mixin(this, JSON.parse(obj));
        }
    };
    return GLocal;
}(GData));
exports.GLocal = GLocal;
var DataPool = /** @class */ (function () {
    function DataPool() {
        this.spools = new ES5Ex_1.MapWrap();
        this.rpools = new ES5Ex_1.MapWrap();
        this.lpools = new ES5Ex_1.MapWrap();
        this.spools.clear();
        this.rpools.clear();
    }
    DataPool.ins = function () {
        if (!this._instance) {
            this._instance = new DataPool();
        }
        return this._instance;
    };
    DataPool.prototype.getStatic = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.spools.get(className);
        if (!pool) {
            cc.log("GStatic Data: '" +
                className +
                "' don't init, it where return a fix object with function getRaw!");
            return unLoadGetRawErr;
        }
        return pool;
    };
    DataPool.prototype.getRunTime = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.rpools.get(className);
        if (!pool) {
            pool = new type();
            pool.onInit();
            this.rpools.set(className, pool);
        }
        return pool;
    };
    DataPool.prototype.getLocal = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.lpools.get(className);
        if (!pool) {
            pool = new type();
            pool.onInit();
            this.lpools.set(className, pool);
        }
        return pool;
    };
    DataPool.prototype.clearStatic = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.spools.get(className);
        if (!pool)
            return;
        pool.clear();
        this.spools.delete(className);
        pool = null;
    };
    DataPool.prototype.clearRunTime = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.rpools.get(className);
        if (!pool)
            return;
        pool.clear();
        this.rpools.delete(className);
        pool = null;
    };
    DataPool.prototype.clearStatics = function () {
        var _this = this;
        this.spools.forEach(function (k, v) {
            var poolFunc = cc.js.getClassByName(v);
            _this.clearRunTime(poolFunc);
        });
    };
    DataPool.prototype.clearRunTimes = function () {
        var _this = this;
        this.rpools.forEach(function (k, v) {
            var poolFunc = cc.js.getClassByName(v);
            _this.clearRunTime(poolFunc);
        });
    };
    DataPool.prototype.clearLocals = function () {
        var _this = this;
        this.lpools.forEach(function (k, v) {
            var poolFunc = cc.js.getClassByName(v);
            _this.clearLocal(poolFunc);
        });
    };
    DataPool.prototype.clearLocal = function (type) {
        var className = cc.js.getClassName(type);
        var pool = this.lpools.get(className);
        if (!pool)
            return;
        pool.remove();
        this.lpools.delete(className);
        pool = null;
    };
    DataPool.prototype.createStaticPool = function (className, json) {
        if (className.indexOf("SMulLangugeData") != CoreDefine_1.INVALID_VALUE) {
            className = "SMulLangugeData";
        }
        var constructor = cc.js.getClassByName(className);
        if (!constructor) {
            cc.log("Class: '" + className + "' not find!");
            return;
        }
        if (typeof constructor !== "function") {
            cc.error("Constructor not function！");
            return;
        }
        if (!cc.js.isChildClassOf(constructor, cc.Component)) {
            cc.error("constructor not child class of cc.Component!");
            return;
        }
        var pool = this.spools.get(className);
        if (!pool) {
            pool = new constructor();
            this.spools.set(className, pool);
        }
        pool.parse(json);
    };
    DataPool.prototype.cvtTbn2Clsn = function (tableName) {
        return ("S" +
            tableName[0].toUpperCase() +
            tableName.substring(1, tableName.length));
    };
    /** 加载单张静态表 */
    DataPool.prototype.loadRTStatic = function (fileName, cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        // let wdStatics = window.wdStatics;
        var loadFunc;
        console.log({ fileName: fileName });
        // if (CC_DEV) {
        // loadFunc = cc.loader.loadRes.bind(cc.loader);
        loadFunc = GLoader_1.GAssetImpl.loader.loadRes.bind(GLoader_1.GAssetImpl.loader);
        // }
        // else {
        //     loadFunc = cc.loader.load.bind(cc.loader);
        // }
        var cdnPrefix = window["cdnPrifix"] || "";
        var decodeTable = function (tableData) {
            if (!!DataPool.__enNames) {
                var tableName = DataPool.__enNames[tableData._id];
                tableData._name = tableName;
                var enData = tableData.data;
                var data = (tableData.data = []);
                var cloums = DataPool.__enCloums[tableData._id];
                var keys = Object.keys(cloums);
                for (var i = 0; i < tableData._length; i++) {
                    var raw = (data[i] = {});
                    for (var j = 0; j < keys.length; j++) {
                        raw[cloums[keys[j]]] = enData[keys[j]][i];
                    }
                }
            }
        };
        var pathArr = UIResources_1.Res.data.data.split("/");
        pathArr.splice(0, 1);
        pathArr.concat();
        loadFunc(UIResources_1.Res.data.data + fileName, cc.JsonAsset, function (err, asset) {
            if (err) {
                cc.error("can't find statis file" + fileName);
                return;
            }
            if (asset["__merges"]) {
                var tableDatas = asset["__datas"];
                for (var i = 0; i < tableDatas.length; i++) {
                    var tableData = tableDatas[i].json;
                    decodeTable(tableData);
                    var tableName = tableData._name;
                    var className = _this.cvtTbn2Clsn(tableName);
                    _this.createStaticPool(className, tableData);
                }
            }
            else {
                var tableData = asset.json;
                decodeTable(tableData);
                var tableName = tableData._name;
                var className = _this.cvtTbn2Clsn(tableName);
                _this.createStaticPool(className, tableData);
            }
            // cc.loader.release(asset);
            cc.assetManager.releaseAsset(asset);
            cb && cb(fileName);
        });
    };
    /** 加载静态表集群 */
    DataPool.prototype.loadRTStatics = function (fileNames, processCb, completeCb) {
        if (processCb === void 0) { processCb = null; }
        if (completeCb === void 0) { completeCb = null; }
        var size = fileNames.length;
        var index = 0;
        if (size > 0) {
            for (var i = 0; i < fileNames.length; i++) {
                if (window.wdStatics.loadStatus[fileNames[i]]) {
                    index++;
                    index == size && completeCb && completeCb();
                    continue;
                }
                this.loadRTStatic(fileNames[i], function (fileName) {
                    index++;
                    processCb && processCb(fileName, index, size);
                    index == size && completeCb && completeCb();
                });
            }
        }
        else {
            completeCb && completeCb();
        }
    };
    DataPool._instance = null;
    return DataPool;
}());
exports.DataPool = DataPool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL0RhdGFQb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBb0Q7QUFFcEQsNENBQTJEO0FBQzNELDBDQUEyQztBQUMzQyxrQ0FBaUM7QUFDakMsOENBQWdEO0FBRWhEOztHQUVHO0FBRUgsSUFBSSxlQUFlLEdBQUc7SUFDcEIsTUFBTSxFQUFFO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FDVCxJQUFJLEdBQUcsOENBQThDLEVBQ3JELFdBQVcsQ0FDWixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0ssQ0FBQztBQUVUO0lBQTJCLHlCQUFZO0lBQXZDOztJQUlBLENBQUM7SUFIUSxxQkFBSyxHQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsWUFBQztBQUFELENBSkEsQUFJQyxDQUowQixFQUFFLENBQUMsU0FBUyxHQUl0QztBQUpZLHNCQUFLO0FBTWxCO0lBQTZCLDJCQUFLO0lBQWxDO1FBQUEscUVBeUVDO1FBeEVXLFdBQUssR0FHWCxJQUFJLGVBQU8sRUFHWixDQUFDOztJQWtFTixDQUFDO0lBakVRLHVCQUFLLEdBQVosVUFBYSxHQUFRO1FBQ25CLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsc0JBQVcseUJBQUk7YUFBZjtZQUlFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLHlCQUFJO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ00sd0JBQU0sR0FBYixVQUVFLEdBQW9CO1FBQ3BCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBTSxD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QzlDLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLFVBQVUsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFuT2Msa0JBQVMsR0FBYSxJQUFJLENBQUM7SUFvTzVDLGVBQUM7Q0FyT0QsQUFxT0MsSUFBQTtBQXJPWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9HYW1lL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgeyBHRGF0YVJhdyB9IGZyb20gXCIuLi8uLi9HYW1lL0d1aWRlL0d1aWRlLnR5cGVcIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSwgT0JKRUNUX0NPUFkgfSBmcm9tIFwiLi4vQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgeyBNYXBXcmFwIH0gZnJvbSBcIi4uL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuaW1wb3J0IHsgR0Fzc2V0SW1wbCB9IGZyb20gXCIuLi9HTG9hZGVyL0dMb2FkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDmlbDmja7msaBcclxuICovXHJcblxyXG52YXIgdW5Mb2FkR2V0UmF3RXJyID0ge1xyXG4gIGdldFJhdzogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIFwiJWNcIiArIFwiR2V0UmF3IEVycm9yISBtYXkgdGhlIGRhdGEgY29uZmlndXJlIHVubG9hZC5cIixcclxuICAgICAgXCJjb2xvcjpyZWRcIlxyXG4gICAgKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0gYXMgYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEdEYXRhIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICBwdWJsaWMgY2xlYXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHU3RhdGljIGV4dGVuZHMgR0RhdGEge1xyXG4gIHByb3RlY3RlZCBfZGF0YTogTWFwV3JhcDxcclxuICAgIG51bWJlciB8IHN0cmluZyxcclxuICAgIEdEYXRhUmF3IHwgTWFwV3JhcDxudW1iZXIgfCBzdHJpbmcsIEdEYXRhUmF3PiB8IEFycmF5PEdEYXRhUmF3PlxyXG4gID4gPSBuZXcgTWFwV3JhcDxcclxuICAgIG51bWJlciB8IHN0cmluZyxcclxuICAgIEdEYXRhUmF3IHwgTWFwV3JhcDxudW1iZXIgfCBzdHJpbmcsIEdEYXRhUmF3PiB8IEFycmF5PEdEYXRhUmF3PlxyXG4gID4oKTtcclxuICBwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGEoKTogTWFwV3JhcDxcclxuICAgIG51bWJlciB8IHN0cmluZyxcclxuICAgIEdEYXRhUmF3IHwgTWFwV3JhcDxudW1iZXIgfCBzdHJpbmcsIEdEYXRhUmF3PiB8IEFycmF5PEdEYXRhUmF3PlxyXG4gID4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuc2l6ZTtcclxuICB9XHJcbiAgcHVibGljIGdldFJhdzxcclxuICAgIFQgZXh0ZW5kcyBHRGF0YVJhdyB8IE1hcFdyYXA8bnVtYmVyIHwgc3RyaW5nLCBHRGF0YVJhdz4gfCBBcnJheTxHRGF0YVJhdz5cclxuICA+KGtleTogc3RyaW5nIHwgbnVtYmVyKTogVCB7XHJcbiAgICBsZXQgcmF3ID0gdGhpcy5fZGF0YS5nZXQoa2V5KSBhcyBUO1xyXG4gICAgaWYgKENDX0RFQlVHIHx8IENDX0RFVikge1xyXG4gICAgICBpZiAoIXJhdykge1xyXG4gICAgICAgIGNjLndhcm4oXHJcbiAgICAgICAgICBgY2FuJ3QgZmluZCByYXcgYnkga2V5ID0gJHtrZXl9IGluIHN0YXRpYyB0YWJsZSAke2NjLmpzLmdldENsYXNzTmFtZShcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgKX0uYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBPQkpFQ1RfQ09QWShyYXcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyeUdldFJhdzxcclxuICAgIFQgZXh0ZW5kcyBHRGF0YVJhdyB8IE1hcFdyYXA8bnVtYmVyIHwgc3RyaW5nLCBHRGF0YVJhdz4gfCBBcnJheTxHRGF0YVJhdz5cclxuICA+KGtleTogc3RyaW5nIHwgbnVtYmVyKTogVCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5nZXQoa2V5KSBhcyBUO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENvbVJhdzxUIGV4dGVuZHMgR0RhdGFSYXc+KFxyXG4gICAga2V5TWFpbjogc3RyaW5nIHwgbnVtYmVyLFxyXG4gICAga2V5U3ViOiBzdHJpbmcgfCBudW1iZXJcclxuICApOiBHRGF0YVJhdyB7XHJcbiAgICBsZXQgbWFpblJhdyA9IHRoaXMuX2RhdGEuZ2V0KGtleU1haW4pIGFzIE1hcFdyYXA8bnVtYmVyIHwgc3RyaW5nLCBHRGF0YVJhdz47XHJcbiAgICByZXR1cm4gbWFpblJhdy5nZXQoa2V5U3ViKSBhcyBUO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc1JhdyhrZXk6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuaGFzKGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQga2V5cyA9IFtdO1xyXG4gICAgdGhpcy5fZGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9kYXRhLmhhcyhrZXlzW2ldKSkgdGhpcy5fZGF0YS5kZWxldGUoa2V5c1tpXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kYXRhLmNsZWFyKCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWRkb25SYXc8VD4ob2JqUmF3OiBhbnkpOiBUIHtcclxuICAgIHJldHVybiBvYmpSYXc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR1J1blRpbWUgZXh0ZW5kcyBHRGF0YSB7XHJcbiAgcHVibGljIGFic3RyYWN0IG9uSW5pdCgpOiB2b2lkO1xyXG4gIHB1YmxpYyBjbGVhcigpOiBib29sZWFuIHtcclxuICAgIEdDdHJsLkVTLm9mZih0aGlzKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdMb2NhbCBleHRlbmRzIEdEYXRhIHtcclxuICBwdWJsaWMgYWJzdHJhY3QgJGxvY2FsS2V5OiBzdHJpbmc7XHJcbiAgcHVibGljIGFic3RyYWN0IG9uSW5pdCgpOiB2b2lkO1xyXG4gIHB1YmxpYyBzZXQoKSB7XHJcbiAgICBsZXQgb2JqID0gY2MuanMuY3JlYXRlTWFwKHRydWUpO1xyXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMpIHtcclxuICAgICAgaWYgKGtleS5pbmRleE9mKFwiJFwiKSAhPSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLiRsb2NhbEtleSwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKCkge1xyXG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuJGxvY2FsS2V5KTtcclxuICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvYWQoKSB7XHJcbiAgICBsZXQgb2JqID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuJGxvY2FsS2V5KTtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgY2MuanMubWl4aW4odGhpcywgSlNPTi5wYXJzZShvYmopKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhUG9vbCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBEYXRhUG9vbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgX19lbk5hbWVzOiBzdHJpbmdbXTtcclxuICBwdWJsaWMgc3RhdGljIF9fZW5DbG91bXM6IHsgW3RhYmxlSWR4OiBudW1iZXJdOiB7IFtjaGFyOiBzdHJpbmddOiBzdHJpbmcgfSB9O1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGlucygpOiBEYXRhUG9vbCB7XHJcbiAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IERhdGFQb29sKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc3Bvb2xzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJwb29scy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzcG9vbHM6IE1hcFdyYXA8c3RyaW5nLCBHU3RhdGljPiA9IG5ldyBNYXBXcmFwPHN0cmluZywgR1N0YXRpYz4oKTtcclxuICBwcml2YXRlIHJwb29sczogTWFwV3JhcDxzdHJpbmcsIEdSdW5UaW1lPiA9IG5ldyBNYXBXcmFwPHN0cmluZywgR1J1blRpbWU+KCk7XHJcbiAgcHJpdmF0ZSBscG9vbHM6IE1hcFdyYXA8c3RyaW5nLCBHTG9jYWw+ID0gbmV3IE1hcFdyYXA8c3RyaW5nLCBHTG9jYWw+KCk7XHJcblxyXG4gIHB1YmxpYyBnZXRTdGF0aWM8VCBleHRlbmRzIEdTdGF0aWM+KHR5cGU6IHsgbmV3ICgpOiBUIH0pOiBUIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUodHlwZSk7XHJcbiAgICBsZXQgcG9vbCA9IHRoaXMuc3Bvb2xzLmdldChjbGFzc05hbWUpIGFzIFQ7XHJcbiAgICBpZiAoIXBvb2wpIHtcclxuICAgICAgY2MubG9nKFxyXG4gICAgICAgIFwiR1N0YXRpYyBEYXRhOiAnXCIgK1xyXG4gICAgICAgICAgY2xhc3NOYW1lICtcclxuICAgICAgICAgIFwiJyBkb24ndCBpbml0LCBpdCB3aGVyZSByZXR1cm4gYSBmaXggb2JqZWN0IHdpdGggZnVuY3Rpb24gZ2V0UmF3IVwiXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB1bkxvYWRHZXRSYXdFcnI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9vbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSdW5UaW1lPFQgZXh0ZW5kcyBHUnVuVGltZT4odHlwZTogeyBuZXcgKCk6IFQgfSk6IFQge1xyXG4gICAgbGV0IGNsYXNzTmFtZSA9IGNjLmpzLmdldENsYXNzTmFtZSh0eXBlKTtcclxuICAgIGxldCBwb29sID0gdGhpcy5ycG9vbHMuZ2V0KGNsYXNzTmFtZSkgYXMgVDtcclxuICAgIGlmICghcG9vbCkge1xyXG4gICAgICBwb29sID0gbmV3IHR5cGUoKTtcclxuICAgICAgcG9vbC5vbkluaXQoKTtcclxuICAgICAgdGhpcy5ycG9vbHMuc2V0KGNsYXNzTmFtZSwgcG9vbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9vbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMb2NhbDxUIGV4dGVuZHMgR0xvY2FsPih0eXBlOiB7IG5ldyAoKTogVCB9KTogVCB7XHJcbiAgICBsZXQgY2xhc3NOYW1lID0gY2MuanMuZ2V0Q2xhc3NOYW1lKHR5cGUpO1xyXG4gICAgbGV0IHBvb2wgPSB0aGlzLmxwb29scy5nZXQoY2xhc3NOYW1lKSBhcyBUO1xyXG4gICAgaWYgKCFwb29sKSB7XHJcbiAgICAgIHBvb2wgPSBuZXcgdHlwZSgpO1xyXG4gICAgICBwb29sLm9uSW5pdCgpO1xyXG4gICAgICB0aGlzLmxwb29scy5zZXQoY2xhc3NOYW1lLCBwb29sKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb29sO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyU3RhdGljPFQgZXh0ZW5kcyBHU3RhdGljPih0eXBlOiB7IG5ldyAoKTogVCB9KTogdm9pZCB7XHJcbiAgICBsZXQgY2xhc3NOYW1lID0gY2MuanMuZ2V0Q2xhc3NOYW1lKHR5cGUpO1xyXG4gICAgbGV0IHBvb2wgPSB0aGlzLnNwb29scy5nZXQoY2xhc3NOYW1lKSBhcyBUO1xyXG4gICAgaWYgKCFwb29sKSByZXR1cm47XHJcbiAgICBwb29sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnNwb29scy5kZWxldGUoY2xhc3NOYW1lKTtcclxuICAgIHBvb2wgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyUnVuVGltZTxUIGV4dGVuZHMgR1J1blRpbWU+KHR5cGU6IHsgbmV3ICgpOiBUIH0pOiB2b2lkIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUodHlwZSk7XHJcbiAgICBsZXQgcG9vbCA9IHRoaXMucnBvb2xzLmdldChjbGFzc05hbWUpIGFzIFQ7XHJcbiAgICBpZiAoIXBvb2wpIHJldHVybjtcclxuICAgIHBvb2wuY2xlYXIoKTtcclxuICAgIHRoaXMucnBvb2xzLmRlbGV0ZShjbGFzc05hbWUpO1xyXG4gICAgcG9vbCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJTdGF0aWNzKCkge1xyXG4gICAgdGhpcy5zcG9vbHMuZm9yRWFjaCgoaywgdikgPT4ge1xyXG4gICAgICBsZXQgcG9vbEZ1bmMgPSBjYy5qcy5nZXRDbGFzc0J5TmFtZSh2KTtcclxuICAgICAgdGhpcy5jbGVhclJ1blRpbWUocG9vbEZ1bmMgYXMgYW55KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyUnVuVGltZXMoKSB7XHJcbiAgICB0aGlzLnJwb29scy5mb3JFYWNoKChrLCB2KSA9PiB7XHJcbiAgICAgIGxldCBwb29sRnVuYyA9IGNjLmpzLmdldENsYXNzQnlOYW1lKHYpO1xyXG4gICAgICB0aGlzLmNsZWFyUnVuVGltZShwb29sRnVuYyBhcyBhbnkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbGVhckxvY2FscygpIHtcclxuICAgIHRoaXMubHBvb2xzLmZvckVhY2goKGssIHYpID0+IHtcclxuICAgICAgbGV0IHBvb2xGdW5jID0gY2MuanMuZ2V0Q2xhc3NCeU5hbWUodik7XHJcbiAgICAgIHRoaXMuY2xlYXJMb2NhbChwb29sRnVuYyBhcyBhbnkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbGVhckxvY2FsPFQgZXh0ZW5kcyBHTG9jYWw+KHR5cGU6IHsgbmV3ICgpOiBUIH0pOiB2b2lkIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUodHlwZSk7XHJcbiAgICBsZXQgcG9vbCA9IHRoaXMubHBvb2xzLmdldChjbGFzc05hbWUpIGFzIFQ7XHJcbiAgICBpZiAoIXBvb2wpIHJldHVybjtcclxuICAgIHBvb2wucmVtb3ZlKCk7XHJcbiAgICB0aGlzLmxwb29scy5kZWxldGUoY2xhc3NOYW1lKTtcclxuICAgIHBvb2wgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZVN0YXRpY1Bvb2woY2xhc3NOYW1lOiBzdHJpbmcsIGpzb246IGFueSkge1xyXG4gICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKFwiU011bExhbmd1Z2VEYXRhXCIpICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJTTXVsTGFuZ3VnZURhdGFcIjtcclxuICAgIH1cclxuICAgIGxldCBjb25zdHJ1Y3RvciA9IGNjLmpzLmdldENsYXNzQnlOYW1lKGNsYXNzTmFtZSkgYXMgYW55O1xyXG4gICAgaWYgKCFjb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYy5sb2coXCJDbGFzczogJ1wiICsgY2xhc3NOYW1lICsgXCInIG5vdCBmaW5kIVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGNjLmVycm9yKFwiQ29uc3RydWN0b3Igbm90IGZ1bmN0aW9u77yBXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIWNjLmpzLmlzQ2hpbGRDbGFzc09mKGNvbnN0cnVjdG9yLCBjYy5Db21wb25lbnQpKSB7XHJcbiAgICAgIGNjLmVycm9yKFwiY29uc3RydWN0b3Igbm90IGNoaWxkIGNsYXNzIG9mIGNjLkNvbXBvbmVudCFcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwb29sID0gdGhpcy5zcG9vbHMuZ2V0KGNsYXNzTmFtZSk7XHJcbiAgICBpZiAoIXBvb2wpIHtcclxuICAgICAgcG9vbCA9IG5ldyBjb25zdHJ1Y3RvcigpIGFzIEdTdGF0aWM7XHJcbiAgICAgIHRoaXMuc3Bvb2xzLnNldChjbGFzc05hbWUsIHBvb2wpO1xyXG4gICAgfVxyXG4gICAgcG9vbC5wYXJzZShqc29uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjdnRUYm4yQ2xzbih0YWJsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBcIlNcIiArXHJcbiAgICAgIHRhYmxlTmFtZVswXS50b1VwcGVyQ2FzZSgpICtcclxuICAgICAgdGFibGVOYW1lLnN1YnN0cmluZygxLCB0YWJsZU5hbWUubGVuZ3RoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiDliqDovb3ljZXlvKDpnZnmgIHooaggKi9cclxuICBwdWJsaWMgbG9hZFJUU3RhdGljKGZpbGVOYW1lOiBzdHJpbmcsIGNiOiBhbnkgPSBudWxsKSB7XHJcbiAgICAvLyBsZXQgd2RTdGF0aWNzID0gd2luZG93LndkU3RhdGljcztcclxuICAgIGxldCBsb2FkRnVuYztcclxuICAgIGNvbnNvbGUubG9nKHsgZmlsZU5hbWUgfSk7XHJcbiAgICAvLyBpZiAoQ0NfREVWKSB7XHJcbiAgICAvLyBsb2FkRnVuYyA9IGNjLmxvYWRlci5sb2FkUmVzLmJpbmQoY2MubG9hZGVyKTtcclxuICAgIGxvYWRGdW5jID0gR0Fzc2V0SW1wbC5sb2FkZXIubG9hZFJlcy5iaW5kKEdBc3NldEltcGwubG9hZGVyKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2Uge1xyXG4gICAgLy8gICAgIGxvYWRGdW5jID0gY2MubG9hZGVyLmxvYWQuYmluZChjYy5sb2FkZXIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGxldCBjZG5QcmVmaXggPSB3aW5kb3dbXCJjZG5QcmlmaXhcIl0gfHwgXCJcIjtcclxuXHJcbiAgICBsZXQgZGVjb2RlVGFibGUgPSAodGFibGVEYXRhKSA9PiB7XHJcbiAgICAgIGlmICghIURhdGFQb29sLl9fZW5OYW1lcykge1xyXG4gICAgICAgIGxldCB0YWJsZU5hbWUgPSBEYXRhUG9vbC5fX2VuTmFtZXNbdGFibGVEYXRhLl9pZF07XHJcbiAgICAgICAgdGFibGVEYXRhLl9uYW1lID0gdGFibGVOYW1lO1xyXG4gICAgICAgIGxldCBlbkRhdGEgPSB0YWJsZURhdGEuZGF0YTtcclxuICAgICAgICBsZXQgZGF0YSA9ICh0YWJsZURhdGEuZGF0YSA9IFtdKTtcclxuICAgICAgICBsZXQgY2xvdW1zID0gRGF0YVBvb2wuX19lbkNsb3Vtc1t0YWJsZURhdGEuX2lkXTtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGNsb3Vtcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZURhdGEuX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgcmF3ID0gKGRhdGFbaV0gPSB7fSk7XHJcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgcmF3W2Nsb3Vtc1trZXlzW2pdXV0gPSBlbkRhdGFba2V5c1tqXV1baV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBwYXRoQXJyID0gUmVzLmRhdGEuZGF0YS5zcGxpdChcIi9cIik7XHJcbiAgICBwYXRoQXJyLnNwbGljZSgwLCAxKTtcclxuICAgIHBhdGhBcnIuY29uY2F0KCk7XHJcbiAgICBsb2FkRnVuYyhcclxuICAgICAgUmVzLmRhdGEuZGF0YSArIGZpbGVOYW1lLFxyXG4gICAgICBjYy5Kc29uQXNzZXQsXHJcbiAgICAgIChlcnI6IEVycm9yLCBhc3NldDogY2MuSnNvbkFzc2V0KSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgY2MuZXJyb3IoXCJjYW4ndCBmaW5kIHN0YXRpcyBmaWxlXCIgKyBmaWxlTmFtZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXNzZXRbXCJfX21lcmdlc1wiXSkge1xyXG4gICAgICAgICAgbGV0IHRhYmxlRGF0YXMgPSBhc3NldFtcIl9fZGF0YXNcIl07XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlRGF0YXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlRGF0YSA9IHRhYmxlRGF0YXNbaV0uanNvbjtcclxuICAgICAgICAgICAgZGVjb2RlVGFibGUodGFibGVEYXRhKTtcclxuICAgICAgICAgICAgbGV0IHRhYmxlTmFtZSA9IHRhYmxlRGF0YS5fbmFtZTtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3Z0VGJuMkNsc24odGFibGVOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGF0aWNQb29sKGNsYXNzTmFtZSwgdGFibGVEYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IHRhYmxlRGF0YSA9IGFzc2V0Lmpzb247XHJcbiAgICAgICAgICBkZWNvZGVUYWJsZSh0YWJsZURhdGEpO1xyXG4gICAgICAgICAgbGV0IHRhYmxlTmFtZSA9IHRhYmxlRGF0YS5fbmFtZTtcclxuICAgICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmN2dFRibjJDbHNuKHRhYmxlTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXRpY1Bvb2woY2xhc3NOYW1lLCB0YWJsZURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5sb2FkZXIucmVsZWFzZShhc3NldCk7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChhc3NldCk7XHJcbiAgICAgICAgY2IgJiYgY2IoZmlsZU5hbWUpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWKoOi9vemdmeaAgeihqOmbhue+pCAqL1xyXG4gIHB1YmxpYyBsb2FkUlRTdGF0aWNzKFxyXG4gICAgZmlsZU5hbWVzOiBzdHJpbmdbXSxcclxuICAgIHByb2Nlc3NDYjogYW55ID0gbnVsbCxcclxuICAgIGNvbXBsZXRlQ2I6IGFueSA9IG51bGxcclxuICApIHtcclxuICAgIGxldCBzaXplID0gZmlsZU5hbWVzLmxlbmd0aDtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBpZiAoc2l6ZSA+IDApIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAod2luZG93LndkU3RhdGljcy5sb2FkU3RhdHVzW2ZpbGVOYW1lc1tpXV0pIHtcclxuICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICBpbmRleCA9PSBzaXplICYmIGNvbXBsZXRlQ2IgJiYgY29tcGxldGVDYigpO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFJUU3RhdGljKGZpbGVOYW1lc1tpXSwgKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICBwcm9jZXNzQ2IgJiYgcHJvY2Vzc0NiKGZpbGVOYW1lLCBpbmRleCwgc2l6ZSk7XHJcbiAgICAgICAgICBpbmRleCA9PSBzaXplICYmIGNvbXBsZXRlQ2IgJiYgY29tcGxldGVDYigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb21wbGV0ZUNiICYmIGNvbXBsZXRlQ2IoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19