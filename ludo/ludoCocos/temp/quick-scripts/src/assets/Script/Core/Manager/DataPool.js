"use strict";
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