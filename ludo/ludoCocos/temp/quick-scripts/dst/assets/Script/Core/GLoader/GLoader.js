
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GLoader/GLoader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c581ehxi51MJ6dtEfaINQ2n', 'GLoader');
// Script/Core/GLoader/GLoader.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLoader = exports.GAssetsAsyncHanlder = exports.GAssetImpl = void 0;
var UIResources_1 = require("../../Game/Common/UIResources");
var CoreDefine_1 = require("../CoreDefine");
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var UIMgr_1 = require("../Manager/UIMgr");
var MathEx_1 = require("../Math/MathEx");
var ccloader = cc.assetManager;
/** 每5秒进行资源GC检测 */
var ASSET_GC_CHECKTIME = 5000;
/** 每分钟释放一次资源 */
var ASSET_GC_TIME = 60000;
// 兼容性处理
var isChildClassOf = cc.js["isChildClassOf"];
if (!isChildClassOf) {
    isChildClassOf = cc["isChildClassOf"];
}
function resLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // cc.log(...args);
}
var ResContrl = /** @class */ (function () {
    function ResContrl() {
        var _this = this;
        this._resMap = new ES5Ex_1.MapWrap();
        this._assetTypes = {};
        this.__nLoadRef = 0;
        this._allAssetImps = new ES5Ex_1.MapWrap();
        this._waitReleaseUseKeys = [];
        /** 做一个资源清理器，被标记释放的资源如果五分钟内没有使用情况则进行清理 */
        this._waitReleaseAssets = new ES5Ex_1.MapWrap();
        /** 上一次GC检测时间 */
        this._lastGCCheckTime = 0;
        this._tempResMaps = {};
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, function () {
            _this.checkReleaseAssets();
        });
    }
    ResContrl.prototype.getAssetImpl = function (userKey) {
        var apl = this._allAssetImps.get(userKey);
        if (apl) {
            var index = this._waitReleaseUseKeys.indexOf(userKey);
            if (index != CoreDefine_1.INVALID_VALUE) {
                cc.js.array.fastRemoveAt(this._waitReleaseUseKeys, index);
            }
        }
        else {
            apl = new GAssetImpl(userKey);
            this._allAssetImps.set(userKey, apl);
        }
        apl.retain();
        return apl;
    };
    ResContrl.prototype.popAssetImp = function (userKey, apl) {
        if (this._allAssetImps.get(userKey) != apl) {
            resLog("the apl don't in the allAssetImps!");
            return;
        }
        if (this._waitReleaseUseKeys.indexOf(userKey) == CoreDefine_1.INVALID_VALUE) {
            this._waitReleaseUseKeys.push(userKey);
        }
        else {
            resLog("the will release assetImp is always int the waitReleaseUserkeys");
        }
    };
    ResContrl.prototype.checkReleaseAssets = function () {
        if (this.isLoading())
            return;
        if (this._waitReleaseAssets.size > 0) {
            var now_1 = Date.now();
            if (now_1 - this._lastGCCheckTime > ASSET_GC_CHECKTIME) {
                this._lastGCCheckTime = now_1;
                var timeOutAssets_1 = [];
                this._waitReleaseAssets.forEach(function (time, id) {
                    if (now_1 - time > ASSET_GC_TIME) {
                        timeOutAssets_1.push(id);
                    }
                });
                for (var i = 0; i < timeOutAssets_1.length; i++) {
                    if (CC_DEV) {
                        var path = ccloader.utils.getUrlWithUuid(timeOutAssets_1[i]);
                        var item = cc.resources.getInfoWithPath(path);
                        if (item) {
                            resLog("resloader release item by uuid :" +
                                item.uuid +
                                "=" +
                                (item.content && item.content.name
                                    ? item.content.name
                                    : item._owner && item._owner.name
                                        ? item._owner.name
                                        : ""));
                        }
                        else {
                            resLog(" not find item and release by key =" + timeOutAssets_1[i]);
                        }
                    }
                    cc.resources.release(timeOutAssets_1[i]);
                    this._waitReleaseAssets.delete(timeOutAssets_1[i]);
                }
                timeOutAssets_1 = null;
            }
        }
        if (this._waitReleaseUseKeys.length > 0) {
            var releaseKey = this._waitReleaseUseKeys.pop();
            var apl = this._allAssetImps.get(releaseKey);
            if (apl.refCount != 0) {
                cc.error("apl.refCount  is not zero!");
            }
            this._allAssetImps.delete(releaseKey);
            apl.destroy();
        }
    };
    /** 立即清理 */
    ResContrl.prototype.rightNowGC = function () {
        this._waitReleaseAssets.forEach(function (time, key) {
            var path = ccloader.utils.getUrlWithUuid(key);
            var item = cc.resources.getInfoWithPath(path);
            if (CC_DEV) {
                if (item) {
                    resLog("resloader release item by uuid :" +
                        item.uuid +
                        "=" +
                        (item.content && item.content.name
                            ? item.content.name
                            : item._owner && item._owner.name
                                ? item._owner.name
                                : ""));
                }
                else {
                    resLog(" not find item and release by key =" + key);
                }
            }
            cc.resources.release(key);
        });
        this._waitReleaseAssets.clear();
    };
    ResContrl.prototype.testCanReleaseInfo = function () {
        this._resMap.forEach(function (k, v) {
            if (k.uses.size == 0 && k.refs.size > 0) {
                cc.log(v);
            }
        });
    };
    /** 检测资源是否加载中 */
    ResContrl.prototype.isLoading = function () {
        return this.__nLoadRef > 0;
    };
    /**
     * 从cc.loader中获取一个资源的item
     * @param url 查询的url
     * @param type 查询的资源类型
     */
    ResContrl.prototype._getResItem = function (url, type) {
        return this.getResInfoByPath(url, type);
    };
    /**
     * loadRes方法的参数预处理
     */
    ResContrl.prototype._makeLoadResArgs = function () {
        if (arguments.length < 1 || typeof arguments[0] != "string") {
            console.error("_makeLoadResArgs error " + arguments);
            return null;
        }
        var url = arguments[0];
        var info = this.getInfoByPath(url);
        var ret = { bundle: info.bundle, url: info.url };
        for (var i = 1; i < arguments.length; ++i) {
            if (i == 1 && isChildClassOf(arguments[i], cc.Asset)) {
                // 判断是不是第一个参数type
                ret.type = arguments[i];
            }
            else if (i == arguments.length - 1 && typeof arguments[i] == "string") {
                // 判断是不是最后一个参数use
                ret.use = arguments[i];
            }
            else if (typeof arguments[i] == "function") {
                // 其他情况为函数
                if (arguments.length > i + 1 && typeof arguments[i + 1] == "function") {
                    ret.onProgess = arguments[i];
                }
                else {
                    ret.onCompleted = arguments[i];
                }
            }
        }
        return ret;
    };
    /*资源信息通过url获取 */
    ResContrl.prototype.getInfoByPath = function (url) {
        var arr = url.split("/");
        var bundle = arr[0];
        var path = "";
        for (var i = 1; i < arr.length; i++) {
            var info = arr[i];
            if (i == 1) {
                path += info;
            }
            else {
                var str = "/" + info;
                path += str;
            }
        }
        return { bundle: bundle, url: path };
    };
    /**
     * releaseRes方法的参数预处理
     */
    ResContrl.prototype._makeReleaseResArgs = function () {
        if (arguments.length < 1 || typeof arguments[0] != "string") {
            console.error("_makeReleaseResArgs error " + arguments);
            return null;
        }
        var info = this.getInfoByPath(arguments[0]);
        var ret = { url: info.url };
        for (var i = 1; i < arguments.length; ++i) {
            if (typeof arguments[i] == "string") {
                ret.use = arguments[i];
            }
            else {
                ret.type = arguments[i];
            }
        }
        return ret;
    };
    /**
     * 生成一个资源使用Key
     * @param where 在哪里使用，如Scene、UI、Pool
     * @param who 使用者，如Login、UIHelp...
     * @param why 使用原因，自定义...
     */
    ResContrl.makeUseKey = function (where, who, why) {
        if (who === void 0) { who = "none"; }
        if (why === void 0) { why = ""; }
        return "use_" + where + "_by_" + who + "_for_" + why;
    };
    /**
     * 获取资源缓存信息
     * @param key 要获取的资源url
     */ ResContrl.prototype.getCacheInfo = function (key) {
        if (!this._resMap.has(key)) {
            this._resMap.set(key, {
                refs: new ES5Ex_1.SetWrap(),
                uses: new ES5Ex_1.SetWrap(),
            });
        }
        return this._resMap.get(key);
    };
    /**
     * 获取资源的url
     * @param asset
     */
    ResContrl.prototype.getUrlByAsset = function (asset) {
        var checkAsset = asset;
        if (checkAsset && checkAsset._uuid) {
            return ccloader.utils.getUrlWithUuid(checkAsset._uuid);
        }
        console.error("getUrlByAssets error " + asset);
        return null;
    };
    /**
     * 为某资源增加一个新的use
     * @param key 资源的url
     * @param use 新的use字符串
     */
    ResContrl.prototype.addUse = function (key, use) {
        if (this._resMap.has(key)) {
            var uses = this._resMap.get(key).uses;
            if (!uses.has(use)) {
                uses.add(use);
                return true;
            }
            else {
                console.warn("addUse " + key + " by " + use + " faile, repeating use key");
                return false;
            }
        }
        console.warn("addUse " + key + " faile, key nofound, make sure you load with resloader");
        return false;
    };
    ResContrl.prototype._buildDepend = function (item, refKey) {
        // 反向关联引用（为所有引用到的资源打上本资源引用到的标记）
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                var depKey = _a[_i];
                // 记录该资源被我引用
                var cacheInfo = this.getCacheInfo(depKey);
                if (!cacheInfo.refs.has(refKey)) {
                    cacheInfo.refs.add(refKey);
                    var depItem = ccloader.assets.get(depKey);
                    if (depItem) {
                        var id = depItem.uuid || depItem.id;
                        if (this._waitReleaseAssets.has(id)) {
                            this._waitReleaseAssets.delete(id);
                        }
                        this._buildDepend(depItem, depItem.id);
                    }
                }
            }
        }
    };
    ResContrl.prototype._releaseDepend = function (item, refKey) {
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                var depKey = _a[_i];
                // 记录该资源被我引用
                var cacheInfo = this._resMap.get(depKey);
                if (!cacheInfo)
                    continue;
                if (cacheInfo.refs.has(refKey)) {
                    cacheInfo.refs.delete(refKey);
                    var depItem = ccloader.assets.get(depKey);
                    if (depItem) {
                        this._releaseDepend(depItem, depItem._uuid);
                    }
                }
            }
        }
    };
    /**
     * 缓存一个Item
     * @param item
     * @param use
     */
    ResContrl.prototype._cacheItem = function (item, use) {
        if (item && item.uuid) {
            var info = this.getCacheInfo(item.uuid);
            if (use) {
                info.uses.add(use);
            }
            if (!info.refs.has(item.id)) {
                info.refs.add(item.id);
                var id = item.uuid || item.id;
                if (this._waitReleaseAssets.has(id)) {
                    this._waitReleaseAssets.delete(id);
                }
                this._buildDepend(item, item.id);
            }
            return true;
        }
        return false;
    };
    /**
     * 完成一个Item的加载
     * @param url
     * @param assetType
     * @param use
     */
    ResContrl.prototype._finishItem = function (url, assetType, use) {
        var item = this._getResItem(url, assetType);
        if (!this._cacheItem(item, use)) {
            cc.warn("addDependKey item error! for " + url);
        }
    };
    ResContrl.prototype.addDependKey = function (item, refKey) {
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                var depKey = _a[_i];
                // 记录该资源被我引用
                this.getCacheInfo(depKey).refs.add(refKey);
                // resLog(`${depKey} ref by ${refKey}`);
                var depItem = cc.assetManager.assets.get(depKey);
                this.addDependKey(depItem, refKey);
            }
        }
    };
    ResContrl.prototype.finishCallback = function (resArgs, error, resource) {
        if (!error) {
            if (!CC_EDITOR) {
                this._finishItem(resArgs.url, resArgs.type, resArgs.use);
            }
        }
        if (resArgs.onCompleted) {
            resArgs.onCompleted(error, resource);
        }
    };
    ResContrl.prototype.loadRes = function () {
        var _this = this;
        var resArgs = this._makeLoadResArgs.apply(this, arguments);
        // 预判是否资源已加载
        var res = this.getRes(resArgs);
        if (res)
            return;
        this.getBundle(resArgs.bundle, function (bundle) {
            _this.__nLoadRef++;
            bundle.load(resArgs.url, resArgs.type, resArgs.onProgess, function (err, res) {
                if (!err) {
                    _this._assetTypes[resArgs.url] = resArgs.type;
                }
                _this.__nLoadRef--;
                _this.finishCallback(resArgs, err, res);
            });
        });
    };
    /**获取资源 */
    ResContrl.prototype.getRes = function (url, resType, use) {
        var item;
        var assetType;
        if (typeof url == "string") {
            var resArgs = this.getInfoByPath(url);
            assetType = this._assetTypes[resArgs.url] || resType;
            if (!assetType)
                return null;
            item = this.getResByPath(resArgs.url, assetType);
            if (item) {
                if (!this._assetTypes[resArgs.url]) {
                    this._assetTypes[resArgs.url] = assetType;
                }
                this.finishCallback({ url: resArgs.url, type: assetType }, null, item);
            }
            return item;
        }
        else {
            var resArgs = url;
            assetType = this._assetTypes[resArgs.url] || resArgs.type;
            item = this.getResByPath(resArgs.url, assetType);
            if (!assetType)
                return null;
            if (item) {
                if (!this._assetTypes[resArgs.url]) {
                    this._assetTypes[resArgs.url] = assetType;
                }
                this.finishCallback(resArgs, null, item);
            }
            return item;
        }
    };
    ResContrl.prototype.getResByPath = function (path, type) {
        var _item = null;
        cc.assetManager.bundles.forEach(function (bundle) {
            var item = bundle.get(path, type);
            if (item) {
                _item = item;
            }
        });
        return _item;
    };
    ResContrl.prototype.getResInfoByPath = function (path, type) {
        var _info = null;
        cc.assetManager.bundles.forEach(function (bundle) {
            var info = bundle.getInfoWithPath(path, type);
            if (info) {
                _info = info;
            }
        });
        return _info;
    };
    ResContrl.prototype.getBundle = function (bundleName, callBack) {
        if (bundleName == "resources") {
            callBack(cc.resources);
            return;
        }
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            return callBack(bundle);
        }
        else {
            cc.assetManager.loadBundle(bundleName, function (err, bundle) {
                UIMgr_1.UIMgr.closeWait();
                if (err) {
                    cc.error("分包加载失败:" + bundleName, err);
                    callBack(cc.resources);
                }
                else {
                    cc.log("分包加载成功:" + bundleName);
                    callBack(bundle);
                }
            });
        }
    };
    ResContrl.prototype.hasRes = function (url) {
        var assetType = this._assetTypes[url];
        if (!assetType)
            return false;
        return true;
    };
    ResContrl.prototype.releaseRes = function () {
        if (CC_EDITOR)
            return;
        /**暂时不释放资源 */
        // return;
        var resArgs = this._makeReleaseResArgs.apply(this, arguments);
        if (!resArgs.type) {
            resArgs.type = this._assetTypes[resArgs.url];
        }
        var item = this._getResItem(resArgs.url, resArgs.type);
        if (!item) {
            console.warn("releaseRes item is null " + resArgs.url + " " + resArgs.type);
            return;
        }
        var cacheInfo = this.getCacheInfo(item.uuid);
        if (resArgs.use) {
            cacheInfo.uses.delete(resArgs.use);
        }
        if (cacheInfo.uses.size == 0) {
            this._tagRelease(item, item.uuid);
        }
    };
    // 标记资源释放
    ResContrl.prototype._tagRelease = function (item, refKey) {
        var cacheInfo = this.getCacheInfo(item.uuid);
        if (!cacheInfo.refs.has(refKey)) {
            resLog("resloader jump release item by uuid :" +
                item.id +
                "=" +
                (item.content && item.content.name
                    ? item.content.name
                    : item._owner && item._owner.name
                        ? item._owner.name
                        : ""));
            return;
        }
        // 解除自身对自己的引用
        cacheInfo.refs.delete(refKey);
        if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
            if (item.dependKeys && Array.isArray(item.dependKeys)) {
                for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                    var depKey = _a[_i];
                    var depItem = cc.assetManager.assets.get(depKey);
                    if (depItem) {
                        this._tagRelease(depItem, item.id);
                    }
                }
            }
            if (item.uuid) {
                this._waitReleaseAssets.set(item.uuid, Date.now());
            }
            else {
                this._waitReleaseAssets.set(item.id, Date.now());
            }
            this._resMap.delete(item.id);
        }
        else {
            resLog("resloader can't release item by url:" +
                item.id +
                "=" +
                (item.content && item.content.name
                    ? item.content.name
                    : item._owner && item._owner.name
                        ? item._owner.name
                        : "") +
                (", why: the uses.size = " + cacheInfo.uses.size + ", ref.size = " + cacheInfo.refs.size));
        }
    };
    /**
     * 是否可以释放某资源
     * @param url
     * @param use
     */
    ResContrl.prototype.canRelease = function (url, use) {
        // !!! url需要转成ID,这是一个错误函数
        var cacheInfo = this.getCacheInfo(url);
        // 有其它Res引用它
        if (cacheInfo.refs.size > 1 || !cacheInfo.refs.has(url))
            return false;
        // 有其它的Use使用
        if (cacheInfo.uses.size > 1 || !cacheInfo.uses.has(use))
            return false;
        return true;
    };
    ResContrl.prototype.checkReleaseUse = function () {
        var resArgs = this._makeReleaseResArgs.apply(this, arguments);
        resArgs.type = resArgs.type || this._assetTypes[resArgs.url];
        var item = this._getResItem(resArgs.url, resArgs.type);
        if (!item) {
            console.log("cant release,item is null " + resArgs.url + " " + resArgs.type);
            return true;
        }
        var cacheInfo = this.getCacheInfo(item.id);
        var checkUse = false;
        var checkRef = false;
        if (resArgs.use && cacheInfo.uses.size > 0) {
            if (cacheInfo.uses.size == 1 && cacheInfo.uses.has(resArgs.use)) {
                checkUse = true;
            }
            else {
                checkUse = false;
            }
        }
        else {
            checkUse = true;
        }
        if ((cacheInfo.refs.size == 1 && cacheInfo.refs.has(item.url)) ||
            cacheInfo.refs.size == 0) {
            checkRef = true;
        }
        else {
            checkRef = false;
        }
        return checkUse && checkRef;
    };
    //#region 资源调试接口
    /** 从ResMap中拿资源索引 */
    ResContrl.prototype.getResKeyByResMap = function (ext) {
        var keys = [];
        this._resMap.forEach(function (resInfo, key) {
            if (key.indexOf(ext) != CoreDefine_1.INVALID_VALUE) {
                keys.push(key);
            }
        });
        return keys;
    };
    /** 从cc._cache中拿资源索引  */
    ResContrl.prototype.getResKeyByCCCache = function (ext) {
        // let caches = cc.loader["_cache"];
        // let keys = []
        // for (let key in caches) {
        //     if (key.indexOf(ext) != INVALID_VALUE) {
        //         keys.push(key);
        //     };
        // }
        // return keys
        var keys = [];
        cc.assetManager.assets.forEach(function (value, key) {
            if (key.indexOf(ext) != CoreDefine_1.INVALID_VALUE) {
                keys.push(key);
            }
        });
        return keys;
    };
    /** 比较资源索引，检测keys2中的资源如果不存在keys1中，则列出 */
    ResContrl.prototype.compareKeys = function (keys1, keys2, key1Name, key2Name) {
        keys2.forEach(function (v, k) {
            if (keys1.indexOf(v) == CoreDefine_1.INVALID_VALUE) {
                console.log(key2Name + " res path " + cc.AssetManager.Pipeline["_debugGetAssetInfo"](v) + " key " + v + " don't in " + key1Name + ".");
            }
        });
    };
    /** 比对和引擎中的资源缓存 */
    ResContrl.prototype.compareResMapWithCCCache = function (ext) {
        var keys1 = this.getResKeyByResMap(ext);
        var keys2 = this.getResKeyByCCCache(ext);
        console.log("_resMap.size = " + keys1.length + ", cc_cache.size = " + keys2.length);
        this.compareKeys(keys1, keys2, "ResMap", "CCCache");
    };
    /** 尝试获取资源在资源管理器中的名称 */
    ResContrl.prototype.getResPaths = function () {
        var libPaths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            libPaths[_i] = arguments[_i];
        }
        var paths = [];
        for (var i = 0; i < libPaths.length; i++) {
            paths.push(cc.AssetManager.Pipeline["_debugGetAssetInfo"](libPaths[i]));
        }
        return paths;
    };
    ResContrl.prototype.setRecordResMap = function () {
        var now = Date.now();
        this._tempResMaps[now] = this._resMap.keys();
    };
    /** 删除资源记录的时间节点 */
    ResContrl.prototype.clearRecordResMap = function () {
        this._tempResMaps = {};
    };
    /** 比较缓存中的资源 */
    ResContrl.prototype.compareRecordResMap = function () {
        var timeStamps = Object.keys(this._tempResMaps);
        for (var i = 1; i < timeStamps.length; i++) {
            console.log("compare time stamp left: " + timeStamps[i - 1] + ", file count " + this._tempResMaps[timeStamps[i - 1]].length + ", right: " + timeStamps[i] + ", file count " + this._tempResMaps[timeStamps[i]].length + " ");
            this.compareKeys(this._tempResMaps[timeStamps[i - 1]], this._tempResMaps[timeStamps[i]], "befor", "after");
        }
    };
    /** 查找所有资源，找出丢失加载器的资源，这部分资源一定程度上代表了内存泄漏 */
    ResContrl.prototype.findAllLostInfos = function () {
        var _this = this;
        var lostInfos = {};
        this._resMap.forEach(function (cahceInfo, resKey) {
            /** 如果有资源引导自生，查找引用的使用情况 */
            _this.findLostInfo(resKey, cahceInfo, lostInfos);
        });
        return lostInfos;
    };
    /** 查找单个资源的丢失情况 */
    ResContrl.prototype.findLostInfo = function (resId, cacheInfo, lostInfos) {
        var _this = this;
        if (cacheInfo.refs.size > 0) {
            cacheInfo.refs.toArray().forEach(function (refKey, _) {
                if (refKey == resId)
                    return;
                var subInfo = _this._resMap.get(refKey);
                _this.findLostInfo(refKey, subInfo, lostInfos);
            });
        }
        if (cacheInfo.uses.size > 0) {
            cacheInfo.uses.toArray().forEach(function (userKey, _) {
                if (!_this._allAssetImps.has(userKey)) {
                    lostInfos[userKey] = lostInfos[userKey] || [];
                    if (lostInfos[userKey].indexOf(resId) == CoreDefine_1.INVALID_VALUE) {
                        lostInfos[userKey].push(resId);
                    }
                }
            });
        }
    };
    return ResContrl;
}());
/**
 * @name GAssetImpl
 * @author Visow
 * @description 文件加载帮助类
 * @class GAssetImpl
 */
var GAssetImpl = /** @class */ (function () {
    function GAssetImpl(refKey) {
        this.__nRef = 0;
        this._refKey = refKey;
        this.__nRef = 0;
        this._tempAssts = new ES5Ex_1.SetWrap();
    }
    /** 检测当前资源加载状态 */
    GAssetImpl.isLoading = function () {
        return this.loader.isLoading();
    };
    GAssetImpl.getAssetImpl = function (refKey) {
        return this.loader.getAssetImpl(refKey);
    };
    GAssetImpl.initLoadRules = function (maskInfo, unpackPaths) {
        this._assetMaskInfo = maskInfo;
        this._unpackPaths = unpackPaths;
    };
    /** 单个精灵进动态图集规则 */
    GAssetImpl.checkDyPack = function (path, sp) {
        if (GAssetImpl._unpackPaths && !sp["__unpack"]) {
            for (var i = 0, l = GAssetImpl._unpackPaths.length; i < l; i++) {
                if (path.indexOf(GAssetImpl._unpackPaths[i]) != CoreDefine_1.INVALID_VALUE) {
                    sp["__unpack"] = true;
                    break;
                }
            }
        }
    };
    /** 图集进动态图集规则 */
    GAssetImpl.checkAtlasDyPack = function (path, atls) {
        if (GAssetImpl._unpackPaths && !atls["__unpack"]) {
            for (var i = 0, l = GAssetImpl._unpackPaths.length; i < l; i++) {
                if (path.indexOf(GAssetImpl._unpackPaths[i]) != CoreDefine_1.INVALID_VALUE) {
                    atls["__unpack"] = true;
                    for (var i_1 = 0, s = atls.getSpriteFrames(), l_1 = s.length; i_1 < l_1; i_1++) {
                        s[i_1]["__unpack"] = true;
                    }
                    break;
                }
            }
        }
    };
    /**
     * return loader.textureRes.A.B.C
     * @param keyLinks "A.B.C"
     */
    GAssetImpl.routeConvert = function (keyLinks) {
        if (keyLinks && keyLinks.indexOf("/") == CoreDefine_1.INVALID_VALUE) {
            var keys = keyLinks.split(".");
            var res = UIResources_1.Res.texture;
            for (var i = 0; i < keys.length; i++) {
                if (!res)
                    break;
                res = res[keys[i]];
            }
            if (typeof res == "string") {
                return res;
            }
        }
        return keyLinks;
    };
    /** 转成实际的url,精确到是否为i18n */
    GAssetImpl.realUrl = function (url) {
        return url;
        // if (!CC_EDITOR) {
        //     let uuid = ""
        //     try {
        //         uuid = cc.resources.getInfoWithPath(url).uuid;
        //     } catch {
        //         cc.log("资源未找到：" + url)
        //     }
        //     if (uuid) return url;
        // } else {
        //     return url;
        // }
        var uuid = null;
        cc.assetManager.bundles.forEach(function (bundle) {
            var item = bundle.getInfoWithPath(url);
            if (item) {
                uuid = item.uuid;
            }
        });
        if (uuid) {
            return uuid;
        }
        else {
            return url;
        }
    };
    GAssetImpl.prototype.retain = function () {
        this.__nRef++;
    };
    GAssetImpl.prototype.release = function () {
        this.__nRef--;
        if (this.__nRef == 0) {
            GAssetImpl.loader.popAssetImp(this._refKey, this);
        }
    };
    Object.defineProperty(GAssetImpl.prototype, "refCount", {
        get: function () {
            return this.__nRef;
        },
        enumerable: false,
        configurable: true
    });
    GAssetImpl.prototype.preLoads = function (loadCallBack) {
        var _this = this;
        var assetInfos = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            assetInfos[_i - 1] = arguments[_i];
        }
        var count = assetInfos.length;
        var index = 0;
        assetInfos.forEach(function (assetInfo) {
            var path = GAssetImpl.realUrl(assetInfo.path);
            if (!path) {
                loadCallBack(++index, count, assetInfo.path, new Error("not uuid!"), null);
                return;
            }
            _this._tempAssts.add(path);
            GAssetImpl.loader.loadRes(path, assetInfo.type, function (err, asset) {
                if (assetInfo.type == cc.SpriteAtlas && asset) {
                    var atlas = asset;
                    _this.loadAtlasTexture(atlas, function () {
                        if (loadCallBack) {
                            loadCallBack(++index, count, path, err, asset);
                        }
                    });
                    return;
                }
                if (loadCallBack) {
                    loadCallBack(++index, count, path, err, asset);
                }
            }, _this._refKey);
        });
    };
    /**
     * 获取预加载资源
     * @param path 文件名
     */
    GAssetImpl.prototype.getPreLoadAsset = function (path) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        var asset = GAssetImpl.loader.getRes(path, null, this._refKey);
        return asset;
    };
    /**
     * 检测是否预加载资源
     * @param path 文件名
     */
    GAssetImpl.prototype.hasPreLoadAsset = function (path) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        return GAssetImpl.loader.hasRes(path);
    };
    GAssetImpl.prototype.releaseAsset = function (path) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.delete(path);
        GAssetImpl.loader.releaseRes(path, this._refKey);
    };
    /**
     * 加载SpriteFrame
     * @param sprite 精灵对象
     * @param path 资源路径
     * @param reSize 是否自动大小： false: 保持原来资源大小， true: 跟随sprite自身的设置
     */
    GAssetImpl.prototype.spriteFrame = function (sprite, path, callback) {
        if (!sprite || !path)
            return;
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        var func = function (err, sp) {
            if (err) {
                cc.warn(err.message);
                sprite.spriteFrame = null;
                return;
            }
            if (!sprite.node || !sprite.node.isValid) {
                cc.warn("the sprite.node is destory");
                return;
            }
            if (sprite["_curloadAssetPath"] != path)
                return;
            GAssetImpl.checkDyPack(path, sp);
            // 表示这个是自定义裁切
            if (sprite["_maskType"] != null && sprite["_maskType"] < 3) {
                var maskInfo = GAssetImpl._assetMaskInfo[path] || GAssetImpl.Default_MASK_SPRITE;
                var mp = sprite;
                var maskType = null;
                if (typeof callback == "number") {
                    // 遮罩类型
                }
                mp.setSprite(sp, maskType, maskInfo.c, maskInfo.r, maskInfo.min, maskInfo.max);
            }
            else {
                sprite.spriteFrame = sp;
            }
            if (callback) {
                if (typeof callback == "boolean") {
                    if (callback)
                        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    return;
                }
                callback(sprite);
            }
        }.bind(this);
        sprite["_curloadAssetPath"] = path;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.SpriteFrame, func, this._refKey);
    };
    GAssetImpl.prototype.spriteFrameByResources = function (sprite, path, cb) {
        cc.resources.load(path, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err);
            }
            else {
                sprite.spriteFrame = spriteFrame;
                if (cb) {
                    cb(err, spriteFrame);
                }
            }
        });
    };
    GAssetImpl.prototype.spriteFrameAsset = function (path, cb) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        GAssetImpl.loader.loadRes(path, cc.SpriteFrame, function (err, asset) {
            if (err) {
                cc.warn(err.message);
                return;
            }
            GAssetImpl.checkDyPack(path, asset);
            cb && cb(asset);
        }, this._refKey);
    };
    /**
     * 获取图集
     * @param path
     * @param callback
     */
    GAssetImpl.prototype.spriteAtlas = function (path, callback) {
        var _this = this;
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.SpriteAtlas, function (err, atlas) {
            GAssetImpl.checkAtlasDyPack(path, atlas);
            _this.loadAtlasTexture(atlas, function () {
                callback && callback(atlas);
            });
        }, this._refKey);
    };
    GAssetImpl.prototype.loadAtlasTexture = function (atlas, cb) {
        var texture = atlas.getTexture();
        if (!texture) {
            var frames = atlas.getSpriteFrames();
            texture = frames.length > 0 ? frames[0].getTexture() : null;
        }
        if (!texture)
            return cb && cb();
        if (!texture.loaded) {
            texture.once("load", function () {
                cb && cb();
            }, this);
            cc["textureUtil"].postLoadTexture(texture);
            return;
        }
        else {
            cb && cb();
        }
    };
    GAssetImpl.prototype.font = function (path, callback) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.TTFFont, function (err, font) {
            if (err) {
                cc.warn(err.message);
                return;
            }
            callback && callback(font);
        });
    };
    /**
     * 获取图集中的图源
     * @param path 路径
     * @param callback 毁掉
     */
    GAssetImpl.prototype.spriteAtlasFrame = function (sprite, path, item, callback) {
        if (!sprite || !path)
            return;
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        var func = function (err, atlas) {
            if (err) {
                cc.warn(err.message);
                sprite.spriteFrame = null;
                return;
            }
            // ColorLog.log({ path });
            if (!sprite.isValid)
                return;
            if (sprite["_curloadAssetPath"] != path + "." + item)
                return;
            GAssetImpl.checkAtlasDyPack(path, atlas);
            sprite.spriteFrame = atlas.getSpriteFrame(item);
            if (CC_DEV && !sprite.spriteFrame) {
                cc.warn("can't find atlas frame asset by path = " +
                    path +
                    " sub name = " +
                    item);
            }
            if (callback) {
                if (typeof callback == "boolean") {
                    if (callback)
                        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    return;
                }
                callback(sprite);
            }
        }.bind(this);
        sprite["_curloadAssetPath"] = path + "." + item;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.SpriteAtlas, func, this._refKey);
    };
    GAssetImpl.prototype.json = function (path, callBack, destory) {
        var _this = this;
        if (destory === void 0) { destory = true; }
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        GAssetImpl.loader.loadRes(path, cc.JsonAsset, function (err, asset) {
            callBack(err, asset);
            if (!err && destory) {
                _this.releaseAsset(path);
            }
        }, this._refKey);
    };
    /**
     * 获取预制件资源
     * @param path 路径
     * @param callback 毁掉
     */
    GAssetImpl.prototype.prefab = function (path, callback) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.Prefab, function (err, prefab) {
            if (err) {
                cc.error(err.message);
                return;
            }
            if (callback)
                callback(prefab);
        }, this._refKey);
    };
    GAssetImpl.prototype.material = function (path, callback) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, cc.Material, function (err, material) {
            if (err) {
                cc.error(err.message);
                return;
            }
            if (callback)
                callback(material);
        }, this._refKey);
    };
    GAssetImpl.prototype.spine = function (path, callback) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        this._tempAssts.add(path);
        GAssetImpl.loader.loadRes(path, sp.SkeletonData, function (err, res) {
            if (err) {
                cc.error(err.message);
                return;
            }
            if (callback)
                callback(res);
        }, this._refKey);
    };
    /**加载龙骨动画 */
    GAssetImpl.prototype.dragonBones = function (path, callback) {
        var _this = this;
        var path1 = GAssetImpl.realUrl(path + "ske");
        var path2 = GAssetImpl.realUrl(path + "tex");
        if (!path2 || !path1)
            return;
        this._tempAssts.add(path1);
        GAssetImpl.loader.loadRes(path1, dragonBones.DragonBonesAsset, function (err, res) {
            if (err) {
                cc.error(err.message);
                return;
            }
            var bonesAsset = res;
            _this._tempAssts.add(path2);
            GAssetImpl.loader.loadRes(path2, dragonBones.DragonBonesAtlasAsset, function (err, res) {
                if (err) {
                    cc.error(err.message);
                    return;
                }
                if (callback)
                    callback(bonesAsset, res);
            }, _this._refKey);
        }, this._refKey);
    };
    GAssetImpl.prototype.audioClip = function (path, callback) {
        path = GAssetImpl.realUrl(path);
        if (!path)
            return;
        GAssetImpl.loader.loadRes(path, cc.AudioClip, function (err, res) {
            if (err) {
                cc.error(err.message);
                return;
            }
            if (callback)
                callback(res);
        }, this._refKey);
    };
    GAssetImpl.prototype.destroy = function () {
        var assets = this._tempAssts.toArray();
        for (var i = assets.length - 1; i >= 0; i--) {
            this.releaseAsset(assets[i]);
        }
        this._tempAssts.clear();
        this._tempAssts = null;
        this.__nRef = null;
    };
    /** 标记一下当前加载的资源释放 */
    GAssetImpl.prototype.tagReleaseTempAssets = function () {
        if (this.__nRef > 1) {
            resLog("There are at least 2 references to the resource loader!");
        }
        var assets = this._tempAssts.toArray();
        for (var i = assets.length - 1; i >= 0; i--) {
            this.releaseAsset(assets[i]);
        }
        this._tempAssts.clear();
    };
    ///////////////////////////////////////////////////////////////////////////// Logic Function //////////////////////////////////////////////////////////////////////
    GAssetImpl.prototype.addGChild = function (path, cb) {
        var gchild;
        if (typeof path == "string") {
            this.prefab(path, function (asset) {
                var node = cc.instantiate(asset);
                gchild = node.getComponent("GChild");
                if (cb)
                    cb(gchild);
            });
        }
        else {
            var node = cc.instantiate(path);
            gchild = node.getComponent("GChild");
            if (cb)
                cb(gchild);
        }
        return gchild;
    };
    /**
     *
     * @param path
     * @param cb
     * @param configs
     */
    GAssetImpl.prototype.loadJXAniClips = function (path, cb) {
        var configs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            configs[_i - 2] = arguments[_i];
        }
        var clips = [];
        var clipNames = [];
        var createClip = function (path, clipName, frames) {
            var clip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
            clip.name = clipName;
            clip.wrapMode = cc.WrapMode.Normal;
            clips.push(clip);
            clipNames.push(clipName);
        };
        this.spriteAtlas(path, function (atlas) {
            if (!atlas)
                return;
            GAssetImpl.checkAtlasDyPack(path, atlas);
            for (var i = 0; i < configs.length; i++) {
                var config = configs[i];
                config.minIdx = config.minIdx || 0;
                config.maxIdx = config.maxIdx || 1000;
                var frames = [];
                for (var j = config.minIdx; j <= config.maxIdx; j++) {
                    var frameName = config.prefix + MathEx_1.default.prefixInteger(j, config.numberFix);
                    var frame = atlas.getSpriteFrame(frameName);
                    if (!frame && j != 0)
                        break;
                    frames.push(frame);
                }
                if (frames[0] == null)
                    frames.splice(0, 1);
                createClip(path, config.aniName, frames);
            }
            cb(clips);
        });
    };
    GAssetImpl.prototype.atlasJXLoadClips = function (atlas) {
        var configs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            configs[_i - 1] = arguments[_i];
        }
        var clips = [];
        var clipNames = [];
        var createClip = function (clipName, frames) {
            var clip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
            clip.name = clipName;
            clip.wrapMode = cc.WrapMode.Normal;
            clips.push(clip);
            clipNames.push(clipName);
        };
        if (!atlas)
            return;
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            config.minIdx = config.minIdx || 0;
            config.maxIdx = config.maxIdx || 1000;
            var frames = [];
            for (var j = config.minIdx; j <= config.maxIdx; j++) {
                var frameName = config.prefix + MathEx_1.default.prefixInteger(j, config.numberFix);
                var frame = atlas.getSpriteFrame(frameName);
                if (!frame && j != 0)
                    break;
                frames.push(frame);
            }
            if (frames[0] == null)
                frames.splice(0, 1);
            if (frames.length > 0)
                createClip(config.aniName, frames);
        }
        return clips;
    };
    GAssetImpl.prototype.loadJXAniClip = function (path, aniName, prefix, numberFix, cb) {
        exports.GLoader.spriteAtlas(path, function (atlas) {
            if (!atlas)
                return;
            var clipFrames = [];
            for (var i = 0; i < 1000; i++) {
                var frameName = prefix + MathEx_1.default.prefixInteger(i, numberFix);
                var frame = atlas.getSpriteFrame(frameName);
                if (!frame && i != 0)
                    break;
                clipFrames.push(frame);
            }
            if (!clipFrames[0])
                clipFrames.splice(0, 1);
            var clip = cc.AnimationClip.createWithSpriteFrames(clipFrames, 10);
            clip.name = aniName;
            clip.wrapMode = cc.WrapMode.Normal;
            cb(clip);
        });
    };
    GAssetImpl.loader = new ResContrl();
    // 遮罩信息
    GAssetImpl.Default_MASK_SPRITE = {
        c: cc.Vec2.ZERO,
        r: 46,
        min: 13,
        max: 34,
    };
    GAssetImpl._assetMaskInfo = {};
    GAssetImpl._unpackPaths = [];
    return GAssetImpl;
}());
exports.GAssetImpl = GAssetImpl;
if (CC_EDITOR) {
    // ResContrl.prototype.loadRes = function () {
    //     let resArgs: LoadResArgs = this._makeLoadResArgs.apply(this, arguments);
    //     cc.resources.load(resArgs.url, resArgs.type, resArgs.onProgess, (err, res) => {
    //         if (err) {
    //             return;
    //         }
    //         this.finishCallback(resArgs, err, res);
    //     });
    // }
}
var GAssetsAsyncHanlder = /** @class */ (function (_super) {
    __extends(GAssetsAsyncHanlder, _super);
    function GAssetsAsyncHanlder(apl) {
        var assets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            assets[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        /** 资源加载对象 */
        _this._apl = null;
        /** 加载状态 */
        _this._state = GAssetsAsyncHanlder.STATE.Null;
        /** 加载完成回调 */
        _this._resultCallBacks = [];
        _this._apl = apl;
        _this._assets = assets;
        return _this;
    }
    /** 加载资源 */
    GAssetsAsyncHanlder.prototype.load = function () {
        var _a;
        var _this = this;
        if (this._state != GAssetsAsyncHanlder.STATE.Null)
            return;
        if (this._assets.length == 0) {
            cc.warn("GassetAsyncHandler assets.length == 0!");
            return;
        }
        (_a = this._apl).preLoads.apply(_a, __spreadArrays([function (cur, count, path, err, assets) {
                var func = err ? cc.warn : cc.log;
                func("\u52A0\u8F7D\u8D44\u6E90\u4E2D\uFF0C\u5F53\u524D\u8FDB\u5EA6" + cur + "/" + count + ",\u52A0\u8F7D\u8D44\u6E90\u8DEF\u5F84\uFF1A" + path + "\uFF0C\u72B6\u6001 " + (err ? "加载失败" : "加载成功"));
                if (err) {
                    _this._state = GAssetsAsyncHanlder.STATE.Error;
                    return _this.endCallbacks();
                }
                if (cur == count) {
                    _this._state = GAssetsAsyncHanlder.STATE.Completed;
                    return _this.endCallbacks();
                }
            }], this._assets));
        return this;
    };
    /** 等待资源加载完成回调 */
    GAssetsAsyncHanlder.prototype.work = function (cb) {
        if (this._state == GAssetsAsyncHanlder.STATE.Completed ||
            this._state == GAssetsAsyncHanlder.STATE.Error) {
            return cb(this._state);
        }
        this._resultCallBacks.push(cb);
        if (this._state == GAssetsAsyncHanlder.STATE.Null) {
            this.load();
        }
        return this;
    };
    /**
     * endCallback
     */
    GAssetsAsyncHanlder.prototype.endCallbacks = function () {
        while (this._resultCallBacks.length > 0) {
            var callBack = this._resultCallBacks.shift();
            callBack(this._state);
        }
    };
    /** 加载状态 */
    GAssetsAsyncHanlder.STATE = {
        /** 无状态 */
        Null: 0,
        /** 加载中 */
        Loading: 1,
        /** 已完成 */
        Completed: 2,
        /** 出错了 */
        Error: 3,
    };
    return GAssetsAsyncHanlder;
}(ES5Ex_1.ObjectWrap));
exports.GAssetsAsyncHanlder = GAssetsAsyncHanlder;
exports.GLoader = GAssetImpl.getAssetImpl("GLOBAL-ASSETIMPL");
if (CC_DEV) {
    window["ResContrl"] = GAssetImpl.loader;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HTG9hZGVyL0dMb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2REFBb0Q7QUFDcEQsNENBQThDO0FBRTlDLDBDQUFnRTtBQUdoRSwwQ0FBeUM7QUFDekMseUNBQW9DO0FBRXBDLElBQUksUUFBUSxHQUFvQixFQUFFLENBQUMsWUFBWSxDQUFDO0FBU2hELGtCQUFrQjtBQUNsQixJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUNoQyxnQkFBZ0I7QUFDaEIsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBd0I1QixRQUFRO0FBQ1IsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzdDLElBQUksQ0FBQyxjQUFjLEVBQUU7SUFDbkIsY0FBYyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0NBQ3ZDO0FBRUQsU0FBUyxNQUFNO0lBQUMsY0FBTztTQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBUCx5QkFBTzs7SUFDckIsbUJBQW1CO0FBQ3JCLENBQUM7QUFFRDtJQXFJRTtRQUFBLGlCQUlDO1FBeElPLFlBQU8sR0FBK0IsSUFBSSxlQUFPLEVBR3RELENBQUM7UUFDSSxnQkFBVyxHQUF1QyxFQUFFLENBQUM7UUFFckQsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixrQkFBYSxHQUFnQyxJQUFJLGVBQU8sRUFHN0QsQ0FBQztRQUNJLHdCQUFtQixHQUFhLEVBQUUsQ0FBQztRQUUzQyx5Q0FBeUM7UUFDakMsdUJBQWtCLEdBQTRCLElBQUksZUFBTyxFQUc5RCxDQUFDO1FBQ0osZ0JBQWdCO1FBQ1IscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBeXNCbkIsaUJBQVksR0FBaUMsRUFBRSxDQUFDO1FBdmxCeEQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFB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SyxHQUFHO1FBQ3BCLFVBQVU7UUFDVixJQUFJLEVBQUUsQ0FBQztRQUNQLFVBQVU7UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLFVBQVU7UUFDVixTQUFTLEVBQUUsQ0FBQztRQUNaLFVBQVU7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNULENBQUM7SUFtRUosMEJBQUM7Q0E5RUQsQUE4RUMsQ0E5RXdDLGtCQUFVLEdBOEVsRDtBQTlFWSxrREFBbUI7QUFnRm5CLFFBQUEsT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVuRSxJQUFJLE1BQU0sRUFBRTtJQUNWLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQ3pDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uQ29uZmlndXJlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9HYW1lL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgeyBJTlZBTElEX1ZBTFVFIH0gZnJvbSBcIi4uL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IENvbG9yTG9nIGZyb20gXCIuLi9GcmFtZUV4L0NvbG9yTG9nXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAsIE9iamVjdFdyYXAsIFNldFdyYXAgfSBmcm9tIFwiLi4vRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgTWFza1Nwcml0ZSBmcm9tIFwiLi4vRnJhbWVFeC9NYXNrU3ByaXRlXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkNoaXBDYWxsQmFjaywgQW5pbWF0aW9uQ2xpcHNDYWxsQmFjayB9IGZyb20gXCIuLi9NYW5hZ2VyL3R5cGVcIjtcclxuaW1wb3J0IHsgVUlNZ3IgfSBmcm9tIFwiLi4vTWFuYWdlci9VSU1nclwiO1xyXG5pbXBvcnQgTWF0aEV4IGZyb20gXCIuLi9NYXRoL01hdGhFeFwiO1xyXG5cclxubGV0IGNjbG9hZGVyOiBjYy5Bc3NldE1hbmFnZXIgPSBjYy5hc3NldE1hbmFnZXI7XHJcbi8vIOi1hOa6kOWKoOi9veeahOWkhOeQhuWbnuiwg1xyXG5leHBvcnQgdHlwZSBQcm9jZXNzQ2FsbGJhY2sgPSAoXHJcbiAgY29tcGxldGVkQ291bnQ6IG51bWJlcixcclxuICB0b3RhbENvdW50OiBudW1iZXIsXHJcbiAgaXRlbTogYW55XHJcbikgPT4gdm9pZDtcclxuLy8g6LWE5rqQ5Yqg6L2955qE5a6M5oiQ5Zue6LCDXHJcbmV4cG9ydCB0eXBlIENvbXBsZXRlZENhbGxiYWNrID0gKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4gdm9pZDtcclxuLyoqIOavjzXnp5Lov5vooYzotYTmupBHQ+ajgOa1iyAqL1xyXG5jb25zdCBBU1NFVF9HQ19DSEVDS1RJTUUgPSA1MDAwO1xyXG4vKiog5q+P5YiG6ZKf6YeK5pS+5LiA5qyh6LWE5rqQICovXHJcbmNvbnN0IEFTU0VUX0dDX1RJTUUgPSA2MDAwMDtcclxuLy8gcmVcclxuaW50ZXJmYWNlIENhY2hlSW5mbyB7XHJcbiAgcmVmczogU2V0V3JhcDxzdHJpbmc+O1xyXG4gIHVzZXM6IFNldFdyYXA8c3RyaW5nPjtcclxufVxyXG5cclxuLy8gTG9hZFJlc+aWueazleeahOWPguaVsOe7k+aehFxyXG5pbnRlcmZhY2UgTG9hZFJlc0FyZ3Mge1xyXG4gIGJ1bmRsZTogc3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQ7XHJcbiAgb25Db21wbGV0ZWQ/OiBDb21wbGV0ZWRDYWxsYmFjaztcclxuICBvblByb2dlc3M/OiBQcm9jZXNzQ2FsbGJhY2s7XHJcbiAgdXNlPzogc3RyaW5nO1xyXG59XHJcblxyXG4vLyBSZWxlYXNlUmVz5pa55rOV55qE5Y+C5pWw57uT5p6EXHJcbmludGVyZmFjZSBSZWxlYXNlUmVzQXJncyB7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbiAgdHlwZT86IHR5cGVvZiBjYy5Bc3NldDtcclxuICB1c2U/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIOWFvOWuueaAp+WkhOeQhlxyXG5sZXQgaXNDaGlsZENsYXNzT2YgPSBjYy5qc1tcImlzQ2hpbGRDbGFzc09mXCJdO1xyXG5pZiAoIWlzQ2hpbGRDbGFzc09mKSB7XHJcbiAgaXNDaGlsZENsYXNzT2YgPSBjY1tcImlzQ2hpbGRDbGFzc09mXCJdO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNMb2coLi4uYXJncykge1xyXG4gIC8vIGNjLmxvZyguLi5hcmdzKTtcclxufVxyXG5cclxuY2xhc3MgUmVzQ29udHJsIHtcclxuICBwcml2YXRlIF9yZXNNYXA6IE1hcFdyYXA8c3RyaW5nLCBDYWNoZUluZm8+ID0gbmV3IE1hcFdyYXA8XHJcbiAgICBzdHJpbmcsXHJcbiAgICBDYWNoZUluZm9cclxuICA+KCk7XHJcbiAgcHJpdmF0ZSBfYXNzZXRUeXBlczogeyBbdXJsOiBzdHJpbmddOiB0eXBlb2YgY2MuQXNzZXQgfSA9IHt9O1xyXG5cclxuICBwcml2YXRlIF9fbkxvYWRSZWY6IG51bWJlciA9IDA7XHJcbiAgcHJpdmF0ZSBfYWxsQXNzZXRJbXBzOiBNYXBXcmFwPHN0cmluZywgR0Fzc2V0SW1wbD4gPSBuZXcgTWFwV3JhcDxcclxuICAgIHN0cmluZyxcclxuICAgIEdBc3NldEltcGxcclxuICA+KCk7XHJcbiAgcHJpdmF0ZSBfd2FpdFJlbGVhc2VVc2VLZXlzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAvKiog5YGa5LiA5Liq6LWE5rqQ5riF55CG5Zmo77yM6KKr5qCH6K6w6YeK5pS+55qE6LWE5rqQ5aaC5p6c5LqU5YiG6ZKf5YaF5rKh5pyJ5L2/55So5oOF5Ya15YiZ6L+b6KGM5riF55CGICovXHJcbiAgcHJpdmF0ZSBfd2FpdFJlbGVhc2VBc3NldHM6IE1hcFdyYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcFdyYXA8XHJcbiAgICBzdHJpbmcsXHJcbiAgICBudW1iZXJcclxuICA+KCk7XHJcbiAgLyoqIOS4iuS4gOasoUdD5qOA5rWL5pe26Ze0ICovXHJcbiAgcHJpdmF0ZSBfbGFzdEdDQ2hlY2tUaW1lID0gMDtcclxuXHJcbiAgcHVibGljIGdldEFzc2V0SW1wbCh1c2VyS2V5OiBzdHJpbmcpOiBHQXNzZXRJbXBsIHtcclxuICAgIGxldCBhcGwgPSB0aGlzLl9hbGxBc3NldEltcHMuZ2V0KHVzZXJLZXkpO1xyXG4gICAgaWYgKGFwbCkge1xyXG4gICAgICBsZXQgaW5kZXggPSB0aGlzLl93YWl0UmVsZWFzZVVzZUtleXMuaW5kZXhPZih1c2VyS2V5KTtcclxuICAgICAgaWYgKGluZGV4ICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlQXQodGhpcy5fd2FpdFJlbGVhc2VVc2VLZXlzLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwbCA9IG5ldyBHQXNzZXRJbXBsKHVzZXJLZXkpO1xyXG4gICAgICB0aGlzLl9hbGxBc3NldEltcHMuc2V0KHVzZXJLZXksIGFwbCk7XHJcbiAgICB9XHJcbiAgICBhcGwucmV0YWluKCk7XHJcbiAgICByZXR1cm4gYXBsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBvcEFzc2V0SW1wKHVzZXJLZXk6IHN0cmluZywgYXBsOiBHQXNzZXRJbXBsKSB7XHJcbiAgICBpZiAodGhpcy5fYWxsQXNzZXRJbXBzLmdldCh1c2VyS2V5KSAhPSBhcGwpIHtcclxuICAgICAgcmVzTG9nKFwidGhlIGFwbCBkb24ndCBpbiB0aGUgYWxsQXNzZXRJbXBzIVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl93YWl0UmVsZWFzZVVzZUtleXMuaW5kZXhPZih1c2VyS2V5KSA9PSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgIHRoaXMuX3dhaXRSZWxlYXNlVXNlS2V5cy5wdXNoKHVzZXJLZXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzTG9nKFwidGhlIHdpbGwgcmVsZWFzZSBhc3NldEltcCBpcyBhbHdheXMgaW50IHRoZSB3YWl0UmVsZWFzZVVzZXJrZXlzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja1JlbGVhc2VBc3NldHMoKSB7XHJcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcoKSkgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLnNpemUgPiAwKSB7XHJcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBpZiAobm93IC0gdGhpcy5fbGFzdEdDQ2hlY2tUaW1lID4gQVNTRVRfR0NfQ0hFQ0tUSU1FKSB7XHJcbiAgICAgICAgdGhpcy5fbGFzdEdDQ2hlY2tUaW1lID0gbm93O1xyXG4gICAgICAgIGxldCB0aW1lT3V0QXNzZXRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLmZvckVhY2goKHRpbWUsIGlkKSA9PiB7XHJcbiAgICAgICAgICBpZiAobm93IC0gdGltZSA+IEFTU0VUX0dDX1RJTUUpIHtcclxuICAgICAgICAgICAgdGltZU91dEFzc2V0cy5wdXNoKGlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVPdXRBc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBjY2xvYWRlci51dGlscy5nZXRVcmxXaXRoVXVpZCh0aW1lT3V0QXNzZXRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5yZXNvdXJjZXMuZ2V0SW5mb1dpdGhQYXRoKHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgIHJlc0xvZyhcclxuICAgICAgICAgICAgICAgIFwicmVzbG9hZGVyIHJlbGVhc2UgaXRlbSBieSB1dWlkIDpcIiArXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0udXVpZCArXHJcbiAgICAgICAgICAgICAgICAgIFwiPVwiICtcclxuICAgICAgICAgICAgICAgICAgKGl0ZW0uY29udGVudCAmJiBpdGVtLmNvbnRlbnQubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgID8gaXRlbS5jb250ZW50Lm5hbWVcclxuICAgICAgICAgICAgICAgICAgICA6IGl0ZW0uX293bmVyICYmIGl0ZW0uX293bmVyLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICA/IGl0ZW0uX293bmVyLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXNMb2coXCIgbm90IGZpbmQgaXRlbSBhbmQgcmVsZWFzZSBieSBrZXkgPVwiICsgdGltZU91dEFzc2V0c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNjLnJlc291cmNlcy5yZWxlYXNlKHRpbWVPdXRBc3NldHNbaV0pO1xyXG4gICAgICAgICAgdGhpcy5fd2FpdFJlbGVhc2VBc3NldHMuZGVsZXRlKHRpbWVPdXRBc3NldHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aW1lT3V0QXNzZXRzID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl93YWl0UmVsZWFzZVVzZUtleXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgcmVsZWFzZUtleSA9IHRoaXMuX3dhaXRSZWxlYXNlVXNlS2V5cy5wb3AoKTtcclxuICAgICAgbGV0IGFwbCA9IHRoaXMuX2FsbEFzc2V0SW1wcy5nZXQocmVsZWFzZUtleSk7XHJcbiAgICAgIGlmIChhcGwucmVmQ291bnQgIT0gMCkge1xyXG4gICAgICAgIGNjLmVycm9yKFwiYXBsLnJlZkNvdW50ICBpcyBub3QgemVybyFcIik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fYWxsQXNzZXRJbXBzLmRlbGV0ZShyZWxlYXNlS2V5KTtcclxuICAgICAgYXBsLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDnq4vljbPmuIXnkIYgKi9cclxuICBwdWJsaWMgcmlnaHROb3dHQygpIHtcclxuICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLmZvckVhY2goKHRpbWUsIGtleSkgPT4ge1xyXG4gICAgICBsZXQgcGF0aCA9IGNjbG9hZGVyLnV0aWxzLmdldFVybFdpdGhVdWlkKGtleSk7XHJcbiAgICAgIGxldCBpdGVtID0gY2MucmVzb3VyY2VzLmdldEluZm9XaXRoUGF0aChwYXRoKTtcclxuICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICByZXNMb2coXHJcbiAgICAgICAgICAgIFwicmVzbG9hZGVyIHJlbGVhc2UgaXRlbSBieSB1dWlkIDpcIiArXHJcbiAgICAgICAgICAgICAgaXRlbS51dWlkICtcclxuICAgICAgICAgICAgICBcIj1cIiArXHJcbiAgICAgICAgICAgICAgKGl0ZW0uY29udGVudCAmJiBpdGVtLmNvbnRlbnQubmFtZVxyXG4gICAgICAgICAgICAgICAgPyBpdGVtLmNvbnRlbnQubmFtZVxyXG4gICAgICAgICAgICAgICAgOiBpdGVtLl9vd25lciAmJiBpdGVtLl9vd25lci5uYW1lXHJcbiAgICAgICAgICAgICAgICA/IGl0ZW0uX293bmVyLm5hbWVcclxuICAgICAgICAgICAgICAgIDogXCJcIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc0xvZyhcIiBub3QgZmluZCBpdGVtIGFuZCByZWxlYXNlIGJ5IGtleSA9XCIgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYy5yZXNvdXJjZXMucmVsZWFzZShrZXkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl93YWl0UmVsZWFzZUFzc2V0cy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlc3RDYW5SZWxlYXNlSW5mbygpIHtcclxuICAgIHRoaXMuX3Jlc01hcC5mb3JFYWNoKChrLCB2KSA9PiB7XHJcbiAgICAgIGlmIChrLnVzZXMuc2l6ZSA9PSAwICYmIGsucmVmcy5zaXplID4gMCkge1xyXG4gICAgICAgIGNjLmxvZyh2KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNjLmRpcmVjdG9yLm9uKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrUmVsZWFzZUFzc2V0cygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiog5qOA5rWL6LWE5rqQ5piv5ZCm5Yqg6L295LitICovXHJcbiAgcHVibGljIGlzTG9hZGluZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9fbkxvYWRSZWYgPiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5LuOY2MubG9hZGVy5Lit6I635Y+W5LiA5Liq6LWE5rqQ55qEaXRlbVxyXG4gICAqIEBwYXJhbSB1cmwg5p+l6K+i55qEdXJsXHJcbiAgICogQHBhcmFtIHR5cGUg5p+l6K+i55qE6LWE5rqQ57G75Z6LXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0UmVzSXRlbSh1cmw6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmdldFJlc0luZm9CeVBhdGgodXJsLCB0eXBlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvYWRSZXPmlrnms5XnmoTlj4LmlbDpooTlpITnkIZcclxuICAgKi9cclxuICBwcml2YXRlIF9tYWtlTG9hZFJlc0FyZ3MoKTogTG9hZFJlc0FyZ3Mge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IHR5cGVvZiBhcmd1bWVudHNbMF0gIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBfbWFrZUxvYWRSZXNBcmdzIGVycm9yICR7YXJndW1lbnRzfWApO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGxldCB1cmwgPSBhcmd1bWVudHNbMF07XHJcbiAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SW5mb0J5UGF0aCh1cmwpO1xyXG4gICAgbGV0IHJldDogTG9hZFJlc0FyZ3MgPSB7IGJ1bmRsZTogaW5mby5idW5kbGUsIHVybDogaW5mby51cmwgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBpZiAoaSA9PSAxICYmIGlzQ2hpbGRDbGFzc09mKGFyZ3VtZW50c1tpXSwgY2MuQXNzZXQpKSB7XHJcbiAgICAgICAgLy8g5Yik5pat5piv5LiN5piv56ys5LiA5Liq5Y+C5pWwdHlwZVxyXG4gICAgICAgIHJldC50eXBlID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT0gYXJndW1lbnRzLmxlbmd0aCAtIDEgJiYgdHlwZW9mIGFyZ3VtZW50c1tpXSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8g5Yik5pat5piv5LiN5piv5pyA5ZCO5LiA5Liq5Y+C5pWwdXNlXHJcbiAgICAgICAgcmV0LnVzZSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIC8vIOWFtuS7luaDheWGteS4uuWHveaVsFxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gaSArIDEgJiYgdHlwZW9mIGFyZ3VtZW50c1tpICsgMV0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICByZXQub25Qcm9nZXNzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXQub25Db21wbGV0ZWQgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgLyrotYTmupDkv6Hmga/pgJrov4d1cmzojrflj5YgKi9cclxuICBwdWJsaWMgZ2V0SW5mb0J5UGF0aCh1cmw6IHN0cmluZykge1xyXG4gICAgbGV0IGFyciA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICBsZXQgYnVuZGxlID0gYXJyWzBdO1xyXG4gICAgbGV0IHBhdGggPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGluZm8gPSBhcnJbaV07XHJcbiAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICBwYXRoICs9IGluZm87XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiL1wiICsgaW5mbztcclxuICAgICAgICBwYXRoICs9IHN0cjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgYnVuZGxlLCB1cmw6IHBhdGggfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlbGVhc2VSZXPmlrnms5XnmoTlj4LmlbDpooTlpITnkIZcclxuICAgKi9cclxuICBwcml2YXRlIF9tYWtlUmVsZWFzZVJlc0FyZ3MoKTogUmVsZWFzZVJlc0FyZ3Mge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IHR5cGVvZiBhcmd1bWVudHNbMF0gIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBfbWFrZVJlbGVhc2VSZXNBcmdzIGVycm9yICR7YXJndW1lbnRzfWApO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGxldCBpbmZvID0gdGhpcy5nZXRJbmZvQnlQYXRoKGFyZ3VtZW50c1swXSk7XHJcbiAgICBsZXQgcmV0OiBSZWxlYXNlUmVzQXJncyA9IHsgdXJsOiBpbmZvLnVybCB9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldC51c2UgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0LnR5cGUgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnlJ/miJDkuIDkuKrotYTmupDkvb/nlKhLZXlcclxuICAgKiBAcGFyYW0gd2hlcmUg5Zyo5ZOq6YeM5L2/55So77yM5aaCU2NlbmXjgIFVSeOAgVBvb2xcclxuICAgKiBAcGFyYW0gd2hvIOS9v+eUqOiAhe+8jOWmgkxvZ2lu44CBVUlIZWxwLi4uXHJcbiAgICogQHBhcmFtIHdoeSDkvb/nlKjljp/lm6DvvIzoh6rlrprkuYkuLi5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIG1ha2VVc2VLZXkoXHJcbiAgICB3aGVyZTogc3RyaW5nLFxyXG4gICAgd2hvOiBzdHJpbmcgPSBcIm5vbmVcIixcclxuICAgIHdoeTogc3RyaW5nID0gXCJcIlxyXG4gICk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYHVzZV8ke3doZXJlfV9ieV8ke3dob31fZm9yXyR7d2h5fWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5botYTmupDnvJPlrZjkv6Hmga9cclxuICAgKiBAcGFyYW0ga2V5IOimgeiOt+WPlueahOi1hOa6kHVybFxyXG4gICAqLyBwdWJsaWMgZ2V0Q2FjaGVJbmZvKGtleTogc3RyaW5nKTogQ2FjaGVJbmZvIHtcclxuICAgIGlmICghdGhpcy5fcmVzTWFwLmhhcyhrZXkpKSB7XHJcbiAgICAgIHRoaXMuX3Jlc01hcC5zZXQoa2V5LCB7XHJcbiAgICAgICAgcmVmczogbmV3IFNldFdyYXA8c3RyaW5nPigpLFxyXG4gICAgICAgIHVzZXM6IG5ldyBTZXRXcmFwPHN0cmluZz4oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzTWFwLmdldChrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W6LWE5rqQ55qEdXJsXHJcbiAgICogQHBhcmFtIGFzc2V0XHJcbiAgICovXHJcbiAgcHVibGljIGdldFVybEJ5QXNzZXQoYXNzZXQ6IGNjLkFzc2V0KTogc3RyaW5nIHtcclxuICAgIGxldCBjaGVja0Fzc2V0OiBhbnkgPSBhc3NldDtcclxuICAgIGlmIChjaGVja0Fzc2V0ICYmIGNoZWNrQXNzZXQuX3V1aWQpIHtcclxuICAgICAgcmV0dXJuIGNjbG9hZGVyLnV0aWxzLmdldFVybFdpdGhVdWlkKGNoZWNrQXNzZXQuX3V1aWQpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgZ2V0VXJsQnlBc3NldHMgZXJyb3IgJHthc3NldH1gKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Li65p+Q6LWE5rqQ5aKe5Yqg5LiA5Liq5paw55qEdXNlXHJcbiAgICogQHBhcmFtIGtleSDotYTmupDnmoR1cmxcclxuICAgKiBAcGFyYW0gdXNlIOaWsOeahHVzZeWtl+espuS4slxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRVc2Uoa2V5OiBzdHJpbmcsIHVzZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5fcmVzTWFwLmhhcyhrZXkpKSB7XHJcbiAgICAgIGxldCB1c2VzID0gdGhpcy5fcmVzTWFwLmdldChrZXkpLnVzZXM7XHJcbiAgICAgIGlmICghdXNlcy5oYXModXNlKSkge1xyXG4gICAgICAgIHVzZXMuYWRkKHVzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBhZGRVc2UgJHtrZXl9IGJ5ICR7dXNlfSBmYWlsZSwgcmVwZWF0aW5nIHVzZSBrZXlgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgYGFkZFVzZSAke2tleX0gZmFpbGUsIGtleSBub2ZvdW5kLCBtYWtlIHN1cmUgeW91IGxvYWQgd2l0aCByZXNsb2FkZXJgXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYnVpbGREZXBlbmQoaXRlbTogYW55LCByZWZLZXk6IHN0cmluZykge1xyXG4gICAgLy8g5Y+N5ZCR5YWz6IGU5byV55So77yI5Li65omA5pyJ5byV55So5Yiw55qE6LWE5rqQ5omT5LiK5pys6LWE5rqQ5byV55So5Yiw55qE5qCH6K6w77yJXHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmRlcGVuZEtleXMgJiYgQXJyYXkuaXNBcnJheShpdGVtLmRlcGVuZEtleXMpKSB7XHJcbiAgICAgIGZvciAobGV0IGRlcEtleSBvZiBpdGVtLmRlcGVuZEtleXMpIHtcclxuICAgICAgICAvLyDorrDlvZXor6XotYTmupDooqvmiJHlvJXnlKhcclxuICAgICAgICBsZXQgY2FjaGVJbmZvID0gdGhpcy5nZXRDYWNoZUluZm8oZGVwS2V5KTtcclxuICAgICAgICBpZiAoIWNhY2hlSW5mby5yZWZzLmhhcyhyZWZLZXkpKSB7XHJcbiAgICAgICAgICBjYWNoZUluZm8ucmVmcy5hZGQocmVmS2V5KTtcclxuICAgICAgICAgIGxldCBkZXBJdGVtID0gY2Nsb2FkZXIuYXNzZXRzLmdldChkZXBLZXkpIGFzIGFueTtcclxuICAgICAgICAgIGlmIChkZXBJdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGRlcEl0ZW0udXVpZCB8fCBkZXBJdGVtLmlkO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fd2FpdFJlbGVhc2VBc3NldHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYnVpbGREZXBlbmQoZGVwSXRlbSwgZGVwSXRlbS5pZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgX3JlbGVhc2VEZXBlbmQoaXRlbTogYW55LCByZWZLZXk6IHN0cmluZykge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5kZXBlbmRLZXlzICYmIEFycmF5LmlzQXJyYXkoaXRlbS5kZXBlbmRLZXlzKSkge1xyXG4gICAgICBmb3IgKGxldCBkZXBLZXkgb2YgaXRlbS5kZXBlbmRLZXlzKSB7XHJcbiAgICAgICAgLy8g6K6w5b2V6K+l6LWE5rqQ6KKr5oiR5byV55SoXHJcbiAgICAgICAgbGV0IGNhY2hlSW5mbyA9IHRoaXMuX3Jlc01hcC5nZXQoZGVwS2V5KTtcclxuICAgICAgICBpZiAoIWNhY2hlSW5mbykgY29udGludWU7XHJcbiAgICAgICAgaWYgKGNhY2hlSW5mby5yZWZzLmhhcyhyZWZLZXkpKSB7XHJcbiAgICAgICAgICBjYWNoZUluZm8ucmVmcy5kZWxldGUocmVmS2V5KTtcclxuICAgICAgICAgIGxldCBkZXBJdGVtID0gY2Nsb2FkZXIuYXNzZXRzLmdldChkZXBLZXkpIGFzIGFueTtcclxuICAgICAgICAgIGlmIChkZXBJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbGVhc2VEZXBlbmQoZGVwSXRlbSwgZGVwSXRlbS5fdXVpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnvJPlrZjkuIDkuKpJdGVtXHJcbiAgICogQHBhcmFtIGl0ZW1cclxuICAgKiBAcGFyYW0gdXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2FjaGVJdGVtKGl0ZW06IGFueSwgdXNlPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLnV1aWQpIHtcclxuICAgICAgbGV0IGluZm8gPSB0aGlzLmdldENhY2hlSW5mbyhpdGVtLnV1aWQpO1xyXG4gICAgICBpZiAodXNlKSB7XHJcbiAgICAgICAgaW5mby51c2VzLmFkZCh1c2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghaW5mby5yZWZzLmhhcyhpdGVtLmlkKSkge1xyXG4gICAgICAgIGluZm8ucmVmcy5hZGQoaXRlbS5pZCk7XHJcbiAgICAgICAgbGV0IGlkID0gaXRlbS51dWlkIHx8IGl0ZW0uaWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2J1aWxkRGVwZW5kKGl0ZW0sIGl0ZW0uaWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5a6M5oiQ5LiA5LiqSXRlbeeahOWKoOi9vVxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gYXNzZXRUeXBlXHJcbiAgICogQHBhcmFtIHVzZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZpbmlzaEl0ZW0odXJsOiBzdHJpbmcsIGFzc2V0VHlwZTogdHlwZW9mIGNjLkFzc2V0LCB1c2U/OiBzdHJpbmcpIHtcclxuICAgIGxldCBpdGVtID0gdGhpcy5fZ2V0UmVzSXRlbSh1cmwsIGFzc2V0VHlwZSk7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlSXRlbShpdGVtLCB1c2UpKSB7XHJcbiAgICAgIGNjLndhcm4oYGFkZERlcGVuZEtleSBpdGVtIGVycm9yISBmb3IgJHt1cmx9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRGVwZW5kS2V5KGl0ZW0sIHJlZktleSkge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5kZXBlbmRLZXlzICYmIEFycmF5LmlzQXJyYXkoaXRlbS5kZXBlbmRLZXlzKSkge1xyXG4gICAgICBmb3IgKGxldCBkZXBLZXkgb2YgaXRlbS5kZXBlbmRLZXlzKSB7XHJcbiAgICAgICAgLy8g6K6w5b2V6K+l6LWE5rqQ6KKr5oiR5byV55SoXHJcbiAgICAgICAgdGhpcy5nZXRDYWNoZUluZm8oZGVwS2V5KS5yZWZzLmFkZChyZWZLZXkpO1xyXG4gICAgICAgIC8vIHJlc0xvZyhgJHtkZXBLZXl9IHJlZiBieSAke3JlZktleX1gKTtcclxuICAgICAgICBsZXQgZGVwSXRlbSA9IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KGRlcEtleSk7XHJcbiAgICAgICAgdGhpcy5hZGREZXBlbmRLZXkoZGVwSXRlbSwgcmVmS2V5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmlzaENhbGxiYWNrKHJlc0FyZ3MsIGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkge1xyXG4gICAgaWYgKCFlcnJvcikge1xyXG4gICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgIHRoaXMuX2ZpbmlzaEl0ZW0ocmVzQXJncy51cmwsIHJlc0FyZ3MudHlwZSwgcmVzQXJncy51c2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocmVzQXJncy5vbkNvbXBsZXRlZCkge1xyXG4gICAgICByZXNBcmdzLm9uQ29tcGxldGVkKGVycm9yLCByZXNvdXJjZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvIDlp4vliqDovb3otYTmupBcclxuICAgKiBAcGFyYW0gdXJsICAgICAgICAgICDotYTmupB1cmxcclxuICAgKiBAcGFyYW0gdHlwZSAgICAgICAgICDotYTmupDnsbvlnovvvIzpu5jorqTkuLpudWxsXHJcbiAgICogQHBhcmFtIG9uUHJvZ2VzcyAgICAg5Yqg6L296L+b5bqm5Zue6LCDXHJcbiAgICogQHBhcmFtIG9uQ29tcGxldGVkICAg5Yqg6L295a6M5oiQ5Zue6LCDXHJcbiAgICogQHBhcmFtIHVzZSAgICAgICAgICAg6LWE5rqQ5L2/55Soa2V577yM5qC55o2ubWFrZVVzZUtleeaWueazleeUn+aIkFxyXG4gICAqL1xyXG4gIHB1YmxpYyBsb2FkUmVzKHVybDogc3RyaW5nLCB1c2U/OiBzdHJpbmcpO1xyXG4gIHB1YmxpYyBsb2FkUmVzKHVybDogc3RyaW5nLCBvbkNvbXBsZXRlZDogQ29tcGxldGVkQ2FsbGJhY2ssIHVzZT86IHN0cmluZyk7XHJcbiAgcHVibGljIGxvYWRSZXMoXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIG9uUHJvZ2VzczogUHJvY2Vzc0NhbGxiYWNrLFxyXG4gICAgb25Db21wbGV0ZWQ6IENvbXBsZXRlZENhbGxiYWNrLFxyXG4gICAgdXNlPzogc3RyaW5nXHJcbiAgKTtcclxuICBwdWJsaWMgbG9hZFJlcyh1cmw6IHN0cmluZywgdHlwZTogeyBwcm90b3R5cGU6IGNjLkFzc2V0IH0sIHVzZT86IHN0cmluZyk7XHJcbiAgcHVibGljIGxvYWRSZXMoXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIHR5cGU6IHsgcHJvdG90eXBlOiBjYy5Bc3NldCB9LFxyXG4gICAgb25Db21wbGV0ZWQ6IENvbXBsZXRlZENhbGxiYWNrLFxyXG4gICAgdXNlPzogc3RyaW5nXHJcbiAgKTtcclxuICBwdWJsaWMgbG9hZFJlcyhcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgdHlwZTogeyBwcm90b3R5cGU6IGNjLkFzc2V0IH0sXHJcbiAgICBvblByb2dlc3M6IFByb2Nlc3NDYWxsYmFjayxcclxuICAgIG9uQ29tcGxldGVkOiBDb21wbGV0ZWRDYWxsYmFjayxcclxuICAgIHVzZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgcHVibGljIGxvYWRSZXMoKSB7XHJcbiAgICBsZXQgcmVzQXJnczogTG9hZFJlc0FyZ3MgPSB0aGlzLl9tYWtlTG9hZFJlc0FyZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIC8vIOmihOWIpOaYr+WQpui1hOa6kOW3suWKoOi9vVxyXG4gICAgbGV0IHJlcyA9IHRoaXMuZ2V0UmVzKHJlc0FyZ3MpO1xyXG4gICAgaWYgKHJlcykgcmV0dXJuO1xyXG4gICAgdGhpcy5nZXRCdW5kbGUocmVzQXJncy5idW5kbGUsIChidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgdGhpcy5fX25Mb2FkUmVmKys7XHJcbiAgICAgIGJ1bmRsZS5sb2FkKHJlc0FyZ3MudXJsLCByZXNBcmdzLnR5cGUsIHJlc0FyZ3Mub25Qcm9nZXNzLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgdGhpcy5fYXNzZXRUeXBlc1tyZXNBcmdzLnVybF0gPSByZXNBcmdzLnR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX19uTG9hZFJlZi0tO1xyXG4gICAgICAgIHRoaXMuZmluaXNoQ2FsbGJhY2socmVzQXJncywgZXJyLCByZXMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W6LWE5rqQICovXHJcbiAgcHVibGljIGdldFJlczxUPih1cmw6IHN0cmluZyB8IGFueSwgcmVzVHlwZT86IHR5cGVvZiBjYy5Bc3NldCwgdXNlPzogc3RyaW5nKSB7XHJcbiAgICBsZXQgaXRlbTtcclxuICAgIGxldCBhc3NldFR5cGU7XHJcbiAgICBpZiAodHlwZW9mIHVybCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGxldCByZXNBcmdzID0gdGhpcy5nZXRJbmZvQnlQYXRoKHVybCk7XHJcbiAgICAgIGFzc2V0VHlwZSA9IHRoaXMuX2Fzc2V0VHlwZXNbcmVzQXJncy51cmxdIHx8IHJlc1R5cGU7XHJcbiAgICAgIGlmICghYXNzZXRUeXBlKSByZXR1cm4gbnVsbDtcclxuICAgICAgaXRlbSA9IHRoaXMuZ2V0UmVzQnlQYXRoKHJlc0FyZ3MudXJsLCBhc3NldFR5cGUpO1xyXG4gICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fYXNzZXRUeXBlc1tyZXNBcmdzLnVybF0pIHtcclxuICAgICAgICAgIHRoaXMuX2Fzc2V0VHlwZXNbcmVzQXJncy51cmxdID0gYXNzZXRUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbmlzaENhbGxiYWNrKHsgdXJsOiByZXNBcmdzLnVybCwgdHlwZTogYXNzZXRUeXBlIH0sIG51bGwsIGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHJlc0FyZ3M6IHsgdXJsOiBzdHJpbmc7IHR5cGU6IHR5cGVvZiBjYy5Bc3NldCB9ID0gdXJsO1xyXG4gICAgICBhc3NldFR5cGUgPSB0aGlzLl9hc3NldFR5cGVzW3Jlc0FyZ3MudXJsXSB8fCByZXNBcmdzLnR5cGU7XHJcbiAgICAgIGl0ZW0gPSB0aGlzLmdldFJlc0J5UGF0aChyZXNBcmdzLnVybCwgYXNzZXRUeXBlKTtcclxuICAgICAgaWYgKCFhc3NldFR5cGUpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fYXNzZXRUeXBlc1tyZXNBcmdzLnVybF0pIHtcclxuICAgICAgICAgIHRoaXMuX2Fzc2V0VHlwZXNbcmVzQXJncy51cmxdID0gYXNzZXRUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbmlzaENhbGxiYWNrKHJlc0FyZ3MsIG51bGwsIGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFJlc0J5UGF0aChwYXRoOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCkge1xyXG4gICAgbGV0IF9pdGVtID0gbnVsbDtcclxuICAgIGNjLmFzc2V0TWFuYWdlci5idW5kbGVzLmZvckVhY2goKGJ1bmRsZSkgPT4ge1xyXG4gICAgICBsZXQgaXRlbSA9IGJ1bmRsZS5nZXQocGF0aCwgdHlwZSk7XHJcbiAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgX2l0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBfaXRlbTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSZXNJbmZvQnlQYXRoKHBhdGg6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KSB7XHJcbiAgICBsZXQgX2luZm8gPSBudWxsO1xyXG4gICAgY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuZm9yRWFjaCgoYnVuZGxlKSA9PiB7XHJcbiAgICAgIGxldCBpbmZvID0gYnVuZGxlLmdldEluZm9XaXRoUGF0aChwYXRoLCB0eXBlKTtcclxuICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICBfaW5mbyA9IGluZm87XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIF9pbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJ1bmRsZShcclxuICAgIGJ1bmRsZU5hbWU6IHN0cmluZyxcclxuICAgIGNhbGxCYWNrOiAoYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB2b2lkXHJcbiAgKSB7XHJcbiAgICBpZiAoYnVuZGxlTmFtZSA9PSBcInJlc291cmNlc1wiKSB7XHJcbiAgICAgIGNhbGxCYWNrKGNjLnJlc291cmNlcyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgaWYgKGJ1bmRsZSkge1xyXG4gICAgICByZXR1cm4gY2FsbEJhY2soYnVuZGxlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKFxyXG4gICAgICAgIGJ1bmRsZU5hbWUsXHJcbiAgICAgICAgKGVycjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgVUlNZ3IuY2xvc2VXYWl0KCk7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwi5YiG5YyF5Yqg6L295aSx6LSlOlwiICsgYnVuZGxlTmFtZSwgZXJyKTtcclxuICAgICAgICAgICAgY2FsbEJhY2soY2MucmVzb3VyY2VzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuWIhuWMheWKoOi9veaIkOWKnzpcIiArIGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgICAgICBjYWxsQmFjayhidW5kbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNSZXModXJsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGxldCBhc3NldFR5cGUgPSB0aGlzLl9hc3NldFR5cGVzW3VybF07XHJcbiAgICBpZiAoIWFzc2V0VHlwZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph4rmlL7otYTmupBcclxuICAgKiBAcGFyYW0gdXJsICAg6KaB6YeK5pS+55qEdXJsXHJcbiAgICogQHBhcmFtIHR5cGUgIOi1hOa6kOexu+Wei1xyXG4gICAqIEBwYXJhbSB1c2UgICDopoHop6PpmaTnmoTotYTmupDkvb/nlKhrZXnvvIzmoLnmja5tYWtlVXNlS2V55pa55rOV55Sf5oiQXHJcbiAgICovXHJcbiAgcHVibGljIHJlbGVhc2VSZXModXJsOiBzdHJpbmcsIHVzZT86IHN0cmluZyk7XHJcbiAgcHVibGljIHJlbGVhc2VSZXModXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgdXNlPzogc3RyaW5nKTtcclxuICBwdWJsaWMgcmVsZWFzZVJlcygpIHtcclxuICAgIGlmIChDQ19FRElUT1IpIHJldHVybjtcclxuICAgIC8qKuaaguaXtuS4jemHiuaUvui1hOa6kCAqL1xyXG4gICAgLy8gcmV0dXJuO1xyXG4gICAgbGV0IHJlc0FyZ3M6IFJlbGVhc2VSZXNBcmdzID0gdGhpcy5fbWFrZVJlbGVhc2VSZXNBcmdzLmFwcGx5KFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBhcmd1bWVudHNcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc0FyZ3MudHlwZSkge1xyXG4gICAgICByZXNBcmdzLnR5cGUgPSB0aGlzLl9hc3NldFR5cGVzW3Jlc0FyZ3MudXJsXTtcclxuICAgIH1cclxuICAgIGxldCBpdGVtID0gdGhpcy5fZ2V0UmVzSXRlbShyZXNBcmdzLnVybCwgcmVzQXJncy50eXBlKTtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oYHJlbGVhc2VSZXMgaXRlbSBpcyBudWxsICR7cmVzQXJncy51cmx9ICR7cmVzQXJncy50eXBlfWApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhY2hlSW5mbyA9IHRoaXMuZ2V0Q2FjaGVJbmZvKGl0ZW0udXVpZCk7XHJcbiAgICBpZiAocmVzQXJncy51c2UpIHtcclxuICAgICAgY2FjaGVJbmZvLnVzZXMuZGVsZXRlKHJlc0FyZ3MudXNlKTtcclxuICAgIH1cclxuICAgIGlmIChjYWNoZUluZm8udXNlcy5zaXplID09IDApIHtcclxuICAgICAgdGhpcy5fdGFnUmVsZWFzZShpdGVtLCBpdGVtLnV1aWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g5qCH6K6w6LWE5rqQ6YeK5pS+XHJcbiAgcHJpdmF0ZSBfdGFnUmVsZWFzZShpdGVtLCByZWZLZXkpIHtcclxuICAgIGxldCBjYWNoZUluZm8gPSB0aGlzLmdldENhY2hlSW5mbyhpdGVtLnV1aWQpO1xyXG4gICAgaWYgKCFjYWNoZUluZm8ucmVmcy5oYXMocmVmS2V5KSkge1xyXG4gICAgICByZXNMb2coXHJcbiAgICAgICAgXCJyZXNsb2FkZXIganVtcCByZWxlYXNlIGl0ZW0gYnkgdXVpZCA6XCIgK1xyXG4gICAgICAgICAgaXRlbS5pZCArXHJcbiAgICAgICAgICBcIj1cIiArXHJcbiAgICAgICAgICAoaXRlbS5jb250ZW50ICYmIGl0ZW0uY29udGVudC5uYW1lXHJcbiAgICAgICAgICAgID8gaXRlbS5jb250ZW50Lm5hbWVcclxuICAgICAgICAgICAgOiBpdGVtLl9vd25lciAmJiBpdGVtLl9vd25lci5uYW1lXHJcbiAgICAgICAgICAgID8gaXRlbS5fb3duZXIubmFtZVxyXG4gICAgICAgICAgICA6IFwiXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyDop6PpmaToh6rouqvlr7noh6rlt7HnmoTlvJXnlKhcclxuICAgIGNhY2hlSW5mby5yZWZzLmRlbGV0ZShyZWZLZXkpO1xyXG5cclxuICAgIGlmIChjYWNoZUluZm8udXNlcy5zaXplID09IDAgJiYgY2FjaGVJbmZvLnJlZnMuc2l6ZSA9PSAwKSB7XHJcbiAgICAgIGlmIChpdGVtLmRlcGVuZEtleXMgJiYgQXJyYXkuaXNBcnJheShpdGVtLmRlcGVuZEtleXMpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgZGVwS2V5IG9mIGl0ZW0uZGVwZW5kS2V5cykge1xyXG4gICAgICAgICAgbGV0IGRlcEl0ZW0gPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChkZXBLZXkpO1xyXG4gICAgICAgICAgaWYgKGRlcEl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFnUmVsZWFzZShkZXBJdGVtLCBpdGVtLmlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW0udXVpZCkge1xyXG4gICAgICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLnNldChpdGVtLnV1aWQsIERhdGUubm93KCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3dhaXRSZWxlYXNlQXNzZXRzLnNldChpdGVtLmlkLCBEYXRlLm5vdygpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9yZXNNYXAuZGVsZXRlKGl0ZW0uaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzTG9nKFxyXG4gICAgICAgIFwicmVzbG9hZGVyIGNhbid0IHJlbGVhc2UgaXRlbSBieSB1cmw6XCIgK1xyXG4gICAgICAgICAgaXRlbS5pZCArXHJcbiAgICAgICAgICBcIj1cIiArXHJcbiAgICAgICAgICAoaXRlbS5jb250ZW50ICYmIGl0ZW0uY29udGVudC5uYW1lXHJcbiAgICAgICAgICAgID8gaXRlbS5jb250ZW50Lm5hbWVcclxuICAgICAgICAgICAgOiBpdGVtLl9vd25lciAmJiBpdGVtLl9vd25lci5uYW1lXHJcbiAgICAgICAgICAgID8gaXRlbS5fb3duZXIubmFtZVxyXG4gICAgICAgICAgICA6IFwiXCIpICtcclxuICAgICAgICAgIGAsIHdoeTogdGhlIHVzZXMuc2l6ZSA9ICR7Y2FjaGVJbmZvLnVzZXMuc2l6ZX0sIHJlZi5zaXplID0gJHtjYWNoZUluZm8ucmVmcy5zaXplfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWPr+S7pemHiuaUvuafkOi1hOa6kFxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gdXNlXHJcbiAgICovXHJcbiAgcHVibGljIGNhblJlbGVhc2UodXJsOiBzdHJpbmcsIHVzZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAvLyAhISEgdXJs6ZyA6KaB6L2s5oiQSUQs6L+Z5piv5LiA5Liq6ZSZ6K+v5Ye95pWwXHJcbiAgICBsZXQgY2FjaGVJbmZvID0gdGhpcy5nZXRDYWNoZUluZm8odXJsKTtcclxuICAgIC8vIOacieWFtuWug1Jlc+W8leeUqOWug1xyXG4gICAgaWYgKGNhY2hlSW5mby5yZWZzLnNpemUgPiAxIHx8ICFjYWNoZUluZm8ucmVmcy5oYXModXJsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8g5pyJ5YW25a6D55qEVXNl5L2/55SoXHJcbiAgICBpZiAoY2FjaGVJbmZvLnVzZXMuc2l6ZSA+IDEgfHwgIWNhY2hlSW5mby51c2VzLmhhcyh1c2UpKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIpOaWreS4gOS4qui1hOa6kOiDveWQpuiiq+mHiuaUvlxyXG4gICAqIEBwYXJhbSB1cmwg6LWE5rqQdXJsXHJcbiAgICogQHBhcmFtIHR5cGUgIOi1hOa6kOexu+Wei1xyXG4gICAqIEBwYXJhbSB1c2UgICDopoHop6PpmaTnmoTotYTmupDkvb/nlKhrZXnvvIzmoLnmja5tYWtlVXNlS2V55pa55rOV55Sf5oiQXHJcbiAgICovXHJcbiAgcHVibGljIGNoZWNrUmVsZWFzZVVzZSh1cmw6IHN0cmluZywgdXNlPzogc3RyaW5nKTogYm9vbGVhbjtcclxuICBwdWJsaWMgY2hlY2tSZWxlYXNlVXNlKFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsXHJcbiAgICB1c2U/OiBzdHJpbmdcclxuICApOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjaGVja1JlbGVhc2VVc2UoKSB7XHJcbiAgICBsZXQgcmVzQXJnczogUmVsZWFzZVJlc0FyZ3MgPSB0aGlzLl9tYWtlUmVsZWFzZVJlc0FyZ3MuYXBwbHkoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIGFyZ3VtZW50c1xyXG4gICAgKTtcclxuICAgIHJlc0FyZ3MudHlwZSA9IHJlc0FyZ3MudHlwZSB8fCB0aGlzLl9hc3NldFR5cGVzW3Jlc0FyZ3MudXJsXTtcclxuICAgIGxldCBpdGVtID0gdGhpcy5fZ2V0UmVzSXRlbShyZXNBcmdzLnVybCwgcmVzQXJncy50eXBlKTtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhgY2FudCByZWxlYXNlLGl0ZW0gaXMgbnVsbCAke3Jlc0FyZ3MudXJsfSAke3Jlc0FyZ3MudHlwZX1gKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhY2hlSW5mbyA9IHRoaXMuZ2V0Q2FjaGVJbmZvKGl0ZW0uaWQpO1xyXG4gICAgbGV0IGNoZWNrVXNlID0gZmFsc2U7XHJcbiAgICBsZXQgY2hlY2tSZWYgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAocmVzQXJncy51c2UgJiYgY2FjaGVJbmZvLnVzZXMuc2l6ZSA+IDApIHtcclxuICAgICAgaWYgKGNhY2hlSW5mby51c2VzLnNpemUgPT0gMSAmJiBjYWNoZUluZm8udXNlcy5oYXMocmVzQXJncy51c2UpKSB7XHJcbiAgICAgICAgY2hlY2tVc2UgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoZWNrVXNlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrVXNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChjYWNoZUluZm8ucmVmcy5zaXplID09IDEgJiYgY2FjaGVJbmZvLnJlZnMuaGFzKGl0ZW0udXJsKSkgfHxcclxuICAgICAgY2FjaGVJbmZvLnJlZnMuc2l6ZSA9PSAwXHJcbiAgICApIHtcclxuICAgICAgY2hlY2tSZWYgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tSZWYgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2hlY2tVc2UgJiYgY2hlY2tSZWY7XHJcbiAgfVxyXG5cclxuICAvLyNyZWdpb24g6LWE5rqQ6LCD6K+V5o6l5Y+jXHJcblxyXG4gIC8qKiDku45SZXNNYXDkuK3mi7/otYTmupDntKLlvJUgKi9cclxuICBwdWJsaWMgZ2V0UmVzS2V5QnlSZXNNYXAoZXh0OiBzdHJpbmcpIHtcclxuICAgIGxldCBrZXlzID0gW107XHJcbiAgICB0aGlzLl9yZXNNYXAuZm9yRWFjaCgocmVzSW5mbzogQ2FjaGVJbmZvLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoa2V5LmluZGV4T2YoZXh0KSAhPSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGtleXM7XHJcbiAgfVxyXG5cclxuICAvKiog5LuOY2MuX2NhY2hl5Lit5ou/6LWE5rqQ57Si5byVICAqL1xyXG4gIHB1YmxpYyBnZXRSZXNLZXlCeUNDQ2FjaGUoZXh0OiBzdHJpbmcpIHtcclxuICAgIC8vIGxldCBjYWNoZXMgPSBjYy5sb2FkZXJbXCJfY2FjaGVcIl07XHJcbiAgICAvLyBsZXQga2V5cyA9IFtdXHJcbiAgICAvLyBmb3IgKGxldCBrZXkgaW4gY2FjaGVzKSB7XHJcbiAgICAvLyAgICAgaWYgKGtleS5pbmRleE9mKGV4dCkgIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgLy8gICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gfVxyXG4gICAgLy8gcmV0dXJuIGtleXNcclxuICAgIGxldCBrZXlzID0gW107XHJcbiAgICBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmZvckVhY2goKHZhbHVlOiBjYy5Bc3NldCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGtleS5pbmRleE9mKGV4dCkgIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBrZXlzO1xyXG4gIH1cclxuXHJcbiAgLyoqIOavlOi+g+i1hOa6kOe0ouW8le+8jOajgOa1i2tleXMy5Lit55qE6LWE5rqQ5aaC5p6c5LiN5a2Y5Zyoa2V5czHkuK3vvIzliJnliJflh7ogKi9cclxuICBwdWJsaWMgY29tcGFyZUtleXMoXHJcbiAgICBrZXlzMTogc3RyaW5nW10sXHJcbiAgICBrZXlzMjogc3RyaW5nW10sXHJcbiAgICBrZXkxTmFtZTogc3RyaW5nLFxyXG4gICAga2V5Mk5hbWU6IHN0cmluZ1xyXG4gICkge1xyXG4gICAga2V5czIuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICBpZiAoa2V5czEuaW5kZXhPZih2KSA9PSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICBgJHtrZXkyTmFtZX0gcmVzIHBhdGggJHtjYy5Bc3NldE1hbmFnZXIuUGlwZWxpbmVbXHJcbiAgICAgICAgICAgIFwiX2RlYnVnR2V0QXNzZXRJbmZvXCJcclxuICAgICAgICAgIF0odil9IGtleSAke3Z9IGRvbid0IGluICR7a2V5MU5hbWV9LmBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiDmr5Tlr7nlkozlvJXmk47kuK3nmoTotYTmupDnvJPlrZggKi9cclxuICBwdWJsaWMgY29tcGFyZVJlc01hcFdpdGhDQ0NhY2hlKGV4dDogc3RyaW5nKSB7XHJcbiAgICBsZXQga2V5czEgPSB0aGlzLmdldFJlc0tleUJ5UmVzTWFwKGV4dCk7XHJcbiAgICBsZXQga2V5czIgPSB0aGlzLmdldFJlc0tleUJ5Q0NDYWNoZShleHQpO1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBfcmVzTWFwLnNpemUgPSAke2tleXMxLmxlbmd0aH0sIGNjX2NhY2hlLnNpemUgPSAke2tleXMyLmxlbmd0aH1gXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb21wYXJlS2V5cyhrZXlzMSwga2V5czIsIFwiUmVzTWFwXCIsIFwiQ0NDYWNoZVwiKTtcclxuICB9XHJcblxyXG4gIC8qKiDlsJ3or5Xojrflj5botYTmupDlnKjotYTmupDnrqHnkIblmajkuK3nmoTlkI3np7AgKi9cclxuICBwdWJsaWMgZ2V0UmVzUGF0aHMoLi4ubGliUGF0aHM6IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgcGF0aHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGliUGF0aHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcGF0aHMucHVzaChjYy5Bc3NldE1hbmFnZXIuUGlwZWxpbmVbXCJfZGVidWdHZXRBc3NldEluZm9cIl0obGliUGF0aHNbaV0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRocztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdGVtcFJlc01hcHM6IHsgW3RpbWU6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcclxuICBwdWJsaWMgc2V0UmVjb3JkUmVzTWFwKCkge1xyXG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLl90ZW1wUmVzTWFwc1tub3ddID0gdGhpcy5fcmVzTWFwLmtleXMoKTtcclxuICB9XHJcblxyXG4gIC8qKiDliKDpmaTotYTmupDorrDlvZXnmoTml7bpl7ToioLngrkgKi9cclxuICBwdWJsaWMgY2xlYXJSZWNvcmRSZXNNYXAoKSB7XHJcbiAgICB0aGlzLl90ZW1wUmVzTWFwcyA9IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIOavlOi+g+e8k+WtmOS4reeahOi1hOa6kCAqL1xyXG4gIHB1YmxpYyBjb21wYXJlUmVjb3JkUmVzTWFwKCkge1xyXG4gICAgbGV0IHRpbWVTdGFtcHMgPSBPYmplY3Qua2V5cyh0aGlzLl90ZW1wUmVzTWFwcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRpbWVTdGFtcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYGNvbXBhcmUgdGltZSBzdGFtcCBsZWZ0OiAke3RpbWVTdGFtcHNbaSAtIDFdfSwgZmlsZSBjb3VudCAke1xyXG4gICAgICAgICAgdGhpcy5fdGVtcFJlc01hcHNbdGltZVN0YW1wc1tpIC0gMV1dLmxlbmd0aFxyXG4gICAgICAgIH0sIHJpZ2h0OiAke3RpbWVTdGFtcHNbaV19LCBmaWxlIGNvdW50ICR7XHJcbiAgICAgICAgICB0aGlzLl90ZW1wUmVzTWFwc1t0aW1lU3RhbXBzW2ldXS5sZW5ndGhcclxuICAgICAgICB9IGBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5jb21wYXJlS2V5cyhcclxuICAgICAgICB0aGlzLl90ZW1wUmVzTWFwc1t0aW1lU3RhbXBzW2kgLSAxXV0sXHJcbiAgICAgICAgdGhpcy5fdGVtcFJlc01hcHNbdGltZVN0YW1wc1tpXV0sXHJcbiAgICAgICAgXCJiZWZvclwiLFxyXG4gICAgICAgIFwiYWZ0ZXJcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIOafpeaJvuaJgOaciei1hOa6kO+8jOaJvuWHuuS4ouWkseWKoOi9veWZqOeahOi1hOa6kO+8jOi/memDqOWIhui1hOa6kOS4gOWumueoi+W6puS4iuS7o+ihqOS6huWGheWtmOazhOa8jyAqL1xyXG4gIHB1YmxpYyBmaW5kQWxsTG9zdEluZm9zKCkge1xyXG4gICAgbGV0IGxvc3RJbmZvczogeyBbYXBsTmFtZTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xyXG4gICAgdGhpcy5fcmVzTWFwLmZvckVhY2goKGNhaGNlSW5mbzogQ2FjaGVJbmZvLCByZXNLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAvKiog5aaC5p6c5pyJ6LWE5rqQ5byV5a+86Ieq55Sf77yM5p+l5om+5byV55So55qE5L2/55So5oOF5Ya1ICovXHJcbiAgICAgIHRoaXMuZmluZExvc3RJbmZvKHJlc0tleSwgY2FoY2VJbmZvLCBsb3N0SW5mb3MpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbG9zdEluZm9zO1xyXG4gIH1cclxuXHJcbiAgLyoqIOafpeaJvuWNleS4qui1hOa6kOeahOS4ouWkseaDheWGtSAqL1xyXG4gIHB1YmxpYyBmaW5kTG9zdEluZm8oXHJcbiAgICByZXNJZDogc3RyaW5nLFxyXG4gICAgY2FjaGVJbmZvOiBDYWNoZUluZm8sXHJcbiAgICBsb3N0SW5mb3M6IHsgW2FwbE5hbWU6IHN0cmluZ106IHN0cmluZ1tdIH1cclxuICApIHtcclxuICAgIGlmIChjYWNoZUluZm8ucmVmcy5zaXplID4gMCkge1xyXG4gICAgICBjYWNoZUluZm8ucmVmcy50b0FycmF5KCkuZm9yRWFjaCgocmVmS2V5OiBzdHJpbmcsIF8pID0+IHtcclxuICAgICAgICBpZiAocmVmS2V5ID09IHJlc0lkKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHN1YkluZm8gPSB0aGlzLl9yZXNNYXAuZ2V0KHJlZktleSk7XHJcbiAgICAgICAgdGhpcy5maW5kTG9zdEluZm8ocmVmS2V5LCBzdWJJbmZvLCBsb3N0SW5mb3MpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjYWNoZUluZm8udXNlcy5zaXplID4gMCkge1xyXG4gICAgICBjYWNoZUluZm8udXNlcy50b0FycmF5KCkuZm9yRWFjaCgodXNlcktleTogc3RyaW5nLCBfKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hbGxBc3NldEltcHMuaGFzKHVzZXJLZXkpKSB7XHJcbiAgICAgICAgICBsb3N0SW5mb3NbdXNlcktleV0gPSBsb3N0SW5mb3NbdXNlcktleV0gfHwgW107XHJcbiAgICAgICAgICBpZiAobG9zdEluZm9zW3VzZXJLZXldLmluZGV4T2YocmVzSWQpID09IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICAgICAgbG9zdEluZm9zW3VzZXJLZXldLnB1c2gocmVzSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyNlbmRyZWdpb25cclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lIEdBc3NldEltcGxcclxuICogQGF1dGhvciBWaXNvd1xyXG4gKiBAZGVzY3JpcHRpb24g5paH5Lu25Yqg6L295biu5Yqp57G7XHJcbiAqIEBjbGFzcyBHQXNzZXRJbXBsXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdBc3NldEltcGwge1xyXG4gIHB1YmxpYyBzdGF0aWMgbG9hZGVyOiBSZXNDb250cmwgPSBuZXcgUmVzQ29udHJsKCk7XHJcblxyXG4gIC8qKiDmo4DmtYvlvZPliY3otYTmupDliqDovb3nirbmgIEgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzTG9hZGluZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxvYWRlci5pc0xvYWRpbmcoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QXNzZXRJbXBsKHJlZktleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkZXIuZ2V0QXNzZXRJbXBsKHJlZktleSk7XHJcbiAgfVxyXG5cclxuICAvLyDpga7nvankv6Hmga9cclxuICBwdWJsaWMgc3RhdGljIERlZmF1bHRfTUFTS19TUFJJVEUgPSB7XHJcbiAgICBjOiBjYy5WZWMyLlpFUk8sXHJcbiAgICByOiA0NixcclxuICAgIG1pbjogMTMsXHJcbiAgICBtYXg6IDM0LFxyXG4gIH07XHJcbiAgcHVibGljIHN0YXRpYyBfYXNzZXRNYXNrSW5mbzoge1xyXG4gICAgW3BhdGg6IHN0cmluZ106IHsgYzogY2MuVmVjMjsgcjogbnVtYmVyOyBtaW46IG51bWJlcjsgbWF4OiBudW1iZXIgfTtcclxuICB9ID0ge307XHJcbiAgcHVibGljIHN0YXRpYyBfdW5wYWNrUGF0aHM6IHN0cmluZ1tdID0gW107XHJcbiAgcHVibGljIHN0YXRpYyBpbml0TG9hZFJ1bGVzKG1hc2tJbmZvLCB1bnBhY2tQYXRoczogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuX2Fzc2V0TWFza0luZm8gPSBtYXNrSW5mbztcclxuICAgIHRoaXMuX3VucGFja1BhdGhzID0gdW5wYWNrUGF0aHM7XHJcbiAgfVxyXG5cclxuICAvKiog5Y2V5Liq57K+54G16L+b5Yqo5oCB5Zu+6ZuG6KeE5YiZICovXHJcbiAgcHVibGljIHN0YXRpYyBjaGVja0R5UGFjayhwYXRoOiBzdHJpbmcsIHNwOiBjYy5TcHJpdGVGcmFtZSkge1xyXG4gICAgaWYgKEdBc3NldEltcGwuX3VucGFja1BhdGhzICYmICFzcFtcIl9fdW5wYWNrXCJdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gR0Fzc2V0SW1wbC5fdW5wYWNrUGF0aHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHBhdGguaW5kZXhPZihHQXNzZXRJbXBsLl91bnBhY2tQYXRoc1tpXSkgIT0gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICAgICAgc3BbXCJfX3VucGFja1wiXSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDlm77pm4bov5vliqjmgIHlm77pm4bop4TliJkgKi9cclxuICBwdWJsaWMgc3RhdGljIGNoZWNrQXRsYXNEeVBhY2socGF0aDogc3RyaW5nLCBhdGxzOiBjYy5TcHJpdGVBdGxhcykge1xyXG4gICAgaWYgKEdBc3NldEltcGwuX3VucGFja1BhdGhzICYmICFhdGxzW1wiX191bnBhY2tcIl0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBHQXNzZXRJbXBsLl91bnBhY2tQYXRocy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAocGF0aC5pbmRleE9mKEdBc3NldEltcGwuX3VucGFja1BhdGhzW2ldKSAhPSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgICBhdGxzW1wiX191bnBhY2tcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IGkgPSAwLCBzID0gYXRscy5nZXRTcHJpdGVGcmFtZXMoKSwgbCA9IHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpIDwgbDtcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgc1tpXVtcIl9fdW5wYWNrXCJdID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIGxvYWRlci50ZXh0dXJlUmVzLkEuQi5DXHJcbiAgICogQHBhcmFtIGtleUxpbmtzIFwiQS5CLkNcIlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcm91dGVDb252ZXJ0KGtleUxpbmtzOiBzdHJpbmcpIHtcclxuICAgIGlmIChrZXlMaW5rcyAmJiBrZXlMaW5rcy5pbmRleE9mKFwiL1wiKSA9PSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgIGxldCBrZXlzID0ga2V5TGlua3Muc3BsaXQoXCIuXCIpO1xyXG4gICAgICBsZXQgcmVzID0gUmVzLnRleHR1cmU7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghcmVzKSBicmVhaztcclxuICAgICAgICByZXMgPSByZXNba2V5c1tpXV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiByZXMgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBrZXlMaW5rcztcclxuICB9XHJcblxyXG4gIC8qKiDovazmiJDlrp7pmYXnmoR1cmws57K+56Gu5Yiw5piv5ZCm5Li6aTE4biAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gICAgLy8gaWYgKCFDQ19FRElUT1IpIHtcclxuICAgIC8vICAgICBsZXQgdXVpZCA9IFwiXCJcclxuICAgIC8vICAgICB0cnkge1xyXG4gICAgLy8gICAgICAgICB1dWlkID0gY2MucmVzb3VyY2VzLmdldEluZm9XaXRoUGF0aCh1cmwpLnV1aWQ7XHJcbiAgICAvLyAgICAgfSBjYXRjaCB7XHJcbiAgICAvLyAgICAgICAgIGNjLmxvZyhcIui1hOa6kOacquaJvuWIsO+8mlwiICsgdXJsKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZiAodXVpZCkgcmV0dXJuIHVybDtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHVybDtcclxuICAgIC8vIH1cclxuXHJcbiAgICBsZXQgdXVpZCA9IG51bGw7XHJcbiAgICBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5mb3JFYWNoKChidW5kbGUpID0+IHtcclxuICAgICAgbGV0IGl0ZW0gPSBidW5kbGUuZ2V0SW5mb1dpdGhQYXRoKHVybCk7XHJcbiAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgdXVpZCA9IGl0ZW0udXVpZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodXVpZCkge1xyXG4gICAgICByZXR1cm4gdXVpZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog5LiN5bimaTE4bueahOi1hOa6kOe0ouW8le+8iOS5n+WwseaYr+ivtO+8jOWunumZheW8leeUqOS4re+8jGkxOG7nm67lvZXkuIvnmoTotYTmupDlkozpnZ5pMThu5LiL55qE6LWE5rqQ77yM6buY6K6k5peg5Lqk6ZuG77yJICovXHJcbiAgcHJvdGVjdGVkIF90ZW1wQXNzdHM6IFNldFdyYXA8c3RyaW5nPjtcclxuICBwcm90ZWN0ZWQgX3JlZktleTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIF9fblJlZjogbnVtYmVyID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IocmVmS2V5OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3JlZktleSA9IHJlZktleTtcclxuICAgIHRoaXMuX19uUmVmID0gMDtcclxuICAgIHRoaXMuX3RlbXBBc3N0cyA9IG5ldyBTZXRXcmFwKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0YWluKCkge1xyXG4gICAgdGhpcy5fX25SZWYrKztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxlYXNlKCkge1xyXG4gICAgdGhpcy5fX25SZWYtLTtcclxuICAgIGlmICh0aGlzLl9fblJlZiA9PSAwKSB7XHJcbiAgICAgIEdBc3NldEltcGwubG9hZGVyLnBvcEFzc2V0SW1wKHRoaXMuX3JlZktleSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJlZkNvdW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX19uUmVmO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZUxvYWRzKFxyXG4gICAgbG9hZENhbGxCYWNrOiB7XHJcbiAgICAgIChcclxuICAgICAgICBjdXI6IG51bWJlcixcclxuICAgICAgICBjb3VudDogbnVtYmVyLFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICBlcnI6IEVycm9yLFxyXG4gICAgICAgIGFzc2V0OiB0eXBlb2YgY2MuQXNzZXRcclxuICAgICAgKTogdm9pZDtcclxuICAgIH0sXHJcbiAgICAuLi5hc3NldEluZm9zOiBBc3NldEluZm9bXVxyXG4gICkge1xyXG4gICAgdmFyIGNvdW50ID0gYXNzZXRJbmZvcy5sZW5ndGg7XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgYXNzZXRJbmZvcy5mb3JFYWNoKChhc3NldEluZm8pID0+IHtcclxuICAgICAgbGV0IHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwoYXNzZXRJbmZvLnBhdGgpO1xyXG4gICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICBsb2FkQ2FsbEJhY2soXHJcbiAgICAgICAgICArK2luZGV4LFxyXG4gICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICBhc3NldEluZm8ucGF0aCxcclxuICAgICAgICAgIG5ldyBFcnJvcihcIm5vdCB1dWlkIVwiKSxcclxuICAgICAgICAgIG51bGxcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl90ZW1wQXNzdHMuYWRkKHBhdGgpO1xyXG4gICAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICAgIHBhdGgsXHJcbiAgICAgICAgYXNzZXRJbmZvLnR5cGUsXHJcbiAgICAgICAgKGVycjogRXJyb3IsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLnR5cGUgPT0gY2MuU3ByaXRlQXRsYXMgJiYgYXNzZXQpIHtcclxuICAgICAgICAgICAgbGV0IGF0bGFzID0gYXNzZXQgYXMgY2MuU3ByaXRlQXRsYXM7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEF0bGFzVGV4dHVyZShhdGxhcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChsb2FkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsQmFjaygrK2luZGV4LCBjb3VudCwgcGF0aCwgZXJyLCBhc3NldCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGxvYWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICBsb2FkQ2FsbEJhY2soKytpbmRleCwgY291bnQsIHBhdGgsIGVyciwgYXNzZXQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5fcmVmS2V5XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlumihOWKoOi9vei1hOa6kFxyXG4gICAqIEBwYXJhbSBwYXRoIOaWh+S7tuWQjVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRQcmVMb2FkQXNzZXQ8VCBleHRlbmRzIGNjLkFzc2V0PihwYXRoOiBzdHJpbmcpOiBUIHtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIHRoaXMuX3RlbXBBc3N0cy5hZGQocGF0aCk7XHJcbiAgICBsZXQgYXNzZXQgPSBHQXNzZXRJbXBsLmxvYWRlci5nZXRSZXMocGF0aCwgbnVsbCwgdGhpcy5fcmVmS2V5KTtcclxuICAgIHJldHVybiBhc3NldCBhcyBUO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5rWL5piv5ZCm6aKE5Yqg6L296LWE5rqQXHJcbiAgICogQHBhcmFtIHBhdGgg5paH5Lu25ZCNXHJcbiAgICovXHJcbiAgcHVibGljIGhhc1ByZUxvYWRBc3NldChwYXRoOiBzdHJpbmcpIHtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIHJldHVybiBHQXNzZXRJbXBsLmxvYWRlci5oYXNSZXMocGF0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsZWFzZUFzc2V0KHBhdGg6IHN0cmluZykge1xyXG4gICAgcGF0aCA9IEdBc3NldEltcGwucmVhbFVybChwYXRoKTtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmRlbGV0ZShwYXRoKTtcclxuICAgIEdBc3NldEltcGwubG9hZGVyLnJlbGVhc2VSZXMocGF0aCwgdGhpcy5fcmVmS2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWKoOi9vVNwcml0ZUZyYW1lXHJcbiAgICogQHBhcmFtIHNwcml0ZSDnsr7ngbXlr7nosaFcclxuICAgKiBAcGFyYW0gcGF0aCDotYTmupDot6/lvoRcclxuICAgKiBAcGFyYW0gcmVTaXplIOaYr+WQpuiHquWKqOWkp+Wwj++8miBmYWxzZTog5L+d5oyB5Y6f5p2l6LWE5rqQ5aSn5bCP77yMIHRydWU6IOi3n+maj3Nwcml0ZeiHqui6q+eahOiuvue9rlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzcHJpdGVGcmFtZShcclxuICAgIHNwcml0ZTogY2MuU3ByaXRlIHwgTWFza1Nwcml0ZSxcclxuICAgIHBhdGg6IHN0cmluZyxcclxuICAgIGNhbGxiYWNrPzogYW55XHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIXNwcml0ZSB8fCAhcGF0aCkgcmV0dXJuO1xyXG4gICAgcGF0aCA9IEdBc3NldEltcGwucmVhbFVybChwYXRoKTtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuO1xyXG4gICAgbGV0IGZ1bmMgPSBmdW5jdGlvbiAoZXJyOiBFcnJvciwgc3A6IGNjLlNwcml0ZUZyYW1lKSB7XHJcbiAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICBjYy53YXJuKGVyci5tZXNzYWdlKTtcclxuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXNwcml0ZS5ub2RlIHx8ICFzcHJpdGUubm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgY2Mud2FybihcInRoZSBzcHJpdGUubm9kZSBpcyBkZXN0b3J5XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3ByaXRlW1wiX2N1cmxvYWRBc3NldFBhdGhcIl0gIT0gcGF0aCkgcmV0dXJuO1xyXG4gICAgICBHQXNzZXRJbXBsLmNoZWNrRHlQYWNrKHBhdGgsIHNwKTtcclxuXHJcbiAgICAgIC8vIOihqOekuui/meS4quaYr+iHquWumuS5ieijgeWIh1xyXG4gICAgICBpZiAoc3ByaXRlW1wiX21hc2tUeXBlXCJdICE9IG51bGwgJiYgc3ByaXRlW1wiX21hc2tUeXBlXCJdIDwgMykge1xyXG4gICAgICAgIGxldCBtYXNrSW5mbyA9XHJcbiAgICAgICAgICBHQXNzZXRJbXBsLl9hc3NldE1hc2tJbmZvW3BhdGhdIHx8IEdBc3NldEltcGwuRGVmYXVsdF9NQVNLX1NQUklURTtcclxuICAgICAgICBsZXQgbXAgPSBzcHJpdGUgYXMgTWFza1Nwcml0ZTtcclxuICAgICAgICBsZXQgbWFza1R5cGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgLy8g6YGu572p57G75Z6LXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1wLnNldFNwcml0ZShcclxuICAgICAgICAgIHNwLFxyXG4gICAgICAgICAgbWFza1R5cGUsXHJcbiAgICAgICAgICBtYXNrSW5mby5jLFxyXG4gICAgICAgICAgbWFza0luZm8ucixcclxuICAgICAgICAgIG1hc2tJbmZvLm1pbixcclxuICAgICAgICAgIG1hc2tJbmZvLm1heFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAoc3ByaXRlIGFzIGNjLlNwcml0ZSkuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayhzcHJpdGUpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcyk7XHJcbiAgICBzcHJpdGVbXCJfY3VybG9hZEFzc2V0UGF0aFwiXSA9IHBhdGg7XHJcbiAgICB0aGlzLl90ZW1wQXNzdHMuYWRkKHBhdGgpO1xyXG4gICAgR0Fzc2V0SW1wbC5sb2FkZXIubG9hZFJlcyhwYXRoLCBjYy5TcHJpdGVGcmFtZSwgZnVuYywgdGhpcy5fcmVmS2V5KTtcclxuICB9XHJcbiAgcHVibGljIHNwcml0ZUZyYW1lQnlSZXNvdXJjZXMoc3ByaXRlOiBjYy5TcHJpdGUsIHBhdGg6IHN0cmluZywgY2I/OiBhbnkpIHtcclxuICAgIGNjLnJlc291cmNlcy5sb2FkKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgKGVycjogRXJyb3IsIHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNjLmVycm9yKGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIGNiKGVyciwgc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHVibGljIHNwcml0ZUZyYW1lQXNzZXQocGF0aDogc3RyaW5nLCBjYjogeyAoc3A6IGNjLlNwcml0ZUZyYW1lKTogdm9pZCB9KSB7XHJcbiAgICBwYXRoID0gR0Fzc2V0SW1wbC5yZWFsVXJsKHBhdGgpO1xyXG4gICAgaWYgKCFwYXRoKSByZXR1cm47XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgKGVyciwgYXNzZXQpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjYy53YXJuKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdBc3NldEltcGwuY2hlY2tEeVBhY2socGF0aCwgYXNzZXQpO1xyXG5cclxuICAgICAgICBjYiAmJiBjYihhc3NldCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWbvumbhlxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICovXHJcbiAgcHVibGljIHNwcml0ZUF0bGFzKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgcGF0aCA9IEdBc3NldEltcGwucmVhbFVybChwYXRoKTtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmFkZChwYXRoKTtcclxuICAgIEdBc3NldEltcGwubG9hZGVyLmxvYWRSZXMoXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAoZXJyLCBhdGxhcykgPT4ge1xyXG4gICAgICAgIEdBc3NldEltcGwuY2hlY2tBdGxhc0R5UGFjayhwYXRoLCBhdGxhcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkQXRsYXNUZXh0dXJlKGF0bGFzLCAoKSA9PiB7XHJcbiAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhhdGxhcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkQXRsYXNUZXh0dXJlKGF0bGFzOiBjYy5TcHJpdGVBdGxhcywgY2IpIHtcclxuICAgIGxldCB0ZXh0dXJlID0gYXRsYXMuZ2V0VGV4dHVyZSgpO1xyXG4gICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgIGxldCBmcmFtZXMgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZXMoKTtcclxuICAgICAgdGV4dHVyZSA9IGZyYW1lcy5sZW5ndGggPiAwID8gZnJhbWVzWzBdLmdldFRleHR1cmUoKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRleHR1cmUpIHJldHVybiBjYiAmJiBjYigpO1xyXG4gICAgaWYgKCF0ZXh0dXJlLmxvYWRlZCkge1xyXG4gICAgICB0ZXh0dXJlLm9uY2UoXHJcbiAgICAgICAgXCJsb2FkXCIsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgICAgY2NbXCJ0ZXh0dXJlVXRpbFwiXS5wb3N0TG9hZFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNiICYmIGNiKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9udChwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIHRoaXMuX3RlbXBBc3N0cy5hZGQocGF0aCk7XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKHBhdGgsIGNjLlRURkZvbnQsIChlcnIsIGZvbnQpID0+IHtcclxuICAgICAgaWYgKGVycikge1xyXG4gICAgICAgIGNjLndhcm4oZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhmb250KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5Zu+6ZuG5Lit55qE5Zu+5rqQXHJcbiAgICogQHBhcmFtIHBhdGgg6Lev5b6EXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIOavgeaOiVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzcHJpdGVBdGxhc0ZyYW1lKFxyXG4gICAgc3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBpdGVtOiBzdHJpbmcsXHJcbiAgICBjYWxsYmFjaz86IGFueVxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFzcHJpdGUgfHwgIXBhdGgpIHJldHVybjtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIGxldCBmdW5jID0gZnVuY3Rpb24gKGVycjogRXJyb3IsIGF0bGFzOiBjYy5TcHJpdGVBdGxhcykge1xyXG4gICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgY2Mud2FybihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29sb3JMb2cubG9nKHsgcGF0aCB9KTtcclxuICAgICAgaWYgKCFzcHJpdGUuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICBpZiAoc3ByaXRlW1wiX2N1cmxvYWRBc3NldFBhdGhcIl0gIT0gcGF0aCArIFwiLlwiICsgaXRlbSkgcmV0dXJuO1xyXG4gICAgICBHQXNzZXRJbXBsLmNoZWNrQXRsYXNEeVBhY2socGF0aCwgYXRsYXMpO1xyXG4gICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZShpdGVtKTtcclxuICAgICAgaWYgKENDX0RFViAmJiAhc3ByaXRlLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgY2Mud2FybihcclxuICAgICAgICAgIFwiY2FuJ3QgZmluZCBhdGxhcyBmcmFtZSBhc3NldCBieSBwYXRoID0gXCIgK1xyXG4gICAgICAgICAgICBwYXRoICtcclxuICAgICAgICAgICAgXCIgc3ViIG5hbWUgPSBcIiArXHJcbiAgICAgICAgICAgIGl0ZW1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgIGlmIChjYWxsYmFjaykgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbGJhY2soc3ByaXRlKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgc3ByaXRlW1wiX2N1cmxvYWRBc3NldFBhdGhcIl0gPSBwYXRoICsgXCIuXCIgKyBpdGVtO1xyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmFkZChwYXRoKTtcclxuICAgIEdBc3NldEltcGwubG9hZGVyLmxvYWRSZXMocGF0aCwgY2MuU3ByaXRlQXRsYXMsIGZ1bmMsIHRoaXMuX3JlZktleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMganNvbihwYXRoOiBzdHJpbmcsIGNhbGxCYWNrOiBhbnksIGRlc3Rvcnk6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICBwYXRoID0gR0Fzc2V0SW1wbC5yZWFsVXJsKHBhdGgpO1xyXG4gICAgaWYgKCFwYXRoKSByZXR1cm47XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjYy5Kc29uQXNzZXQsXHJcbiAgICAgIChlcnIsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgY2FsbEJhY2soZXJyLCBhc3NldCk7XHJcbiAgICAgICAgaWYgKCFlcnIgJiYgZGVzdG9yeSkge1xyXG4gICAgICAgICAgdGhpcy5yZWxlYXNlQXNzZXQocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLl9yZWZLZXlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bpooTliLbku7botYTmupBcclxuICAgKiBAcGFyYW0gcGF0aCDot6/lvoRcclxuICAgKiBAcGFyYW0gY2FsbGJhY2sg5q+B5o6JXHJcbiAgICovXHJcbiAgcHVibGljIHByZWZhYihwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiB7IChwcmVmYWI6IGNjLlByZWZhYik6IHZvaWQgfSkge1xyXG4gICAgcGF0aCA9IEdBc3NldEltcGwucmVhbFVybChwYXRoKTtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmFkZChwYXRoKTtcclxuICAgIEdBc3NldEltcGwubG9hZGVyLmxvYWRSZXMoXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNjLlByZWZhYixcclxuICAgICAgKGVycjogRXJyb3IsIHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHByZWZhYik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtYXRlcmlhbChwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiB7IChtYXRlcmlhbDogY2MuTWF0ZXJpYWwpOiB2b2lkIH0pIHtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIHRoaXMuX3RlbXBBc3N0cy5hZGQocGF0aCk7XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjYy5NYXRlcmlhbCxcclxuICAgICAgKGVycjogRXJyb3IsIG1hdGVyaWFsOiBjYy5NYXRlcmlhbCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhtYXRlcmlhbCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzcGluZShwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIHBhdGggPSBHQXNzZXRJbXBsLnJlYWxVcmwocGF0aCk7XHJcbiAgICBpZiAoIXBhdGgpIHJldHVybjtcclxuICAgIHRoaXMuX3RlbXBBc3N0cy5hZGQocGF0aCk7XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBzcC5Ta2VsZXRvbkRhdGEsXHJcbiAgICAgIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXMpO1xyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLl9yZWZLZXlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKirliqDovb3pvpnpqqjliqjnlLsgKi9cclxuICBwdWJsaWMgZHJhZ29uQm9uZXMoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBjYWxsYmFjazoge1xyXG4gICAgICAoXHJcbiAgICAgICAgZHJhZ29uQXNzZXQ6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXQsXHJcbiAgICAgICAgZHJhZ29uQXRsYXM6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldFxyXG4gICAgICApOiB2b2lkO1xyXG4gICAgfVxyXG4gICkge1xyXG4gICAgbGV0IHBhdGgxID0gR0Fzc2V0SW1wbC5yZWFsVXJsKHBhdGggKyBcInNrZVwiKTtcclxuICAgIGxldCBwYXRoMiA9IEdBc3NldEltcGwucmVhbFVybChwYXRoICsgXCJ0ZXhcIik7XHJcbiAgICBpZiAoIXBhdGgyIHx8ICFwYXRoMSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmFkZChwYXRoMSk7XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoMSxcclxuICAgICAgZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldCxcclxuICAgICAgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYm9uZXNBc3NldCA9IHJlcztcclxuICAgICAgICB0aGlzLl90ZW1wQXNzdHMuYWRkKHBhdGgyKTtcclxuICAgICAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICAgICAgcGF0aDIsXHJcbiAgICAgICAgICBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXQsXHJcbiAgICAgICAgICAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhib25lc0Fzc2V0LCByZXMpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuX3JlZktleVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdWRpb0NsaXAocGF0aDogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICBwYXRoID0gR0Fzc2V0SW1wbC5yZWFsVXJsKHBhdGgpO1xyXG4gICAgaWYgKCFwYXRoKSByZXR1cm47XHJcbiAgICBHQXNzZXRJbXBsLmxvYWRlci5sb2FkUmVzKFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjYy5BdWRpb0NsaXAsXHJcbiAgICAgIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXMpO1xyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLl9yZWZLZXlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIGxldCBhc3NldHMgPSB0aGlzLl90ZW1wQXNzdHMudG9BcnJheSgpO1xyXG4gICAgZm9yIChsZXQgaSA9IGFzc2V0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB0aGlzLnJlbGVhc2VBc3NldChhc3NldHNbaV0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmNsZWFyKCk7XHJcbiAgICB0aGlzLl90ZW1wQXNzdHMgPSBudWxsO1xyXG4gICAgdGhpcy5fX25SZWYgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIOagh+iusOS4gOS4i+W9k+WJjeWKoOi9veeahOi1hOa6kOmHiuaUviAqL1xyXG4gIHB1YmxpYyB0YWdSZWxlYXNlVGVtcEFzc2V0cygpIHtcclxuICAgIGlmICh0aGlzLl9fblJlZiA+IDEpIHtcclxuICAgICAgcmVzTG9nKFwiVGhlcmUgYXJlIGF0IGxlYXN0IDIgcmVmZXJlbmNlcyB0byB0aGUgcmVzb3VyY2UgbG9hZGVyIVwiKTtcclxuICAgIH1cclxuICAgIGxldCBhc3NldHMgPSB0aGlzLl90ZW1wQXNzdHMudG9BcnJheSgpO1xyXG4gICAgZm9yIChsZXQgaSA9IGFzc2V0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB0aGlzLnJlbGVhc2VBc3NldChhc3NldHNbaV0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdGVtcEFzc3RzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBMb2dpYyBGdW5jdGlvbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gIHB1YmxpYyBhZGRHQ2hpbGQ8VD4ocGF0aDogc3RyaW5nIHwgY2MuUHJlZmFiLCBjYj86IHsgKGNvbXA6IFQpOiB2b2lkIH0pOiBUIHtcclxuICAgIGxldCBnY2hpbGQ7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLnByZWZhYihwYXRoLCAoYXNzZXQ6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgIGdjaGlsZCA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiR0NoaWxkXCIpO1xyXG4gICAgICAgIGlmIChjYikgY2IoZ2NoaWxkKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHBhdGgpO1xyXG4gICAgICBnY2hpbGQgPSBub2RlLmdldENvbXBvbmVudChcIkdDaGlsZFwiKTtcclxuICAgICAgaWYgKGNiKSBjYihnY2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnY2hpbGQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICogQHBhcmFtIGNiXHJcbiAgICogQHBhcmFtIGNvbmZpZ3NcclxuICAgKi9cclxuICBwdWJsaWMgbG9hZEpYQW5pQ2xpcHMoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBjYjogQW5pbWF0aW9uQ2xpcHNDYWxsQmFjayxcclxuICAgIC4uLmNvbmZpZ3M6IEFuaW1hdGlvbkNvbmZpZ3VyZVtdXHJcbiAgKSB7XHJcbiAgICBsZXQgY2xpcHM6IGNjLkFuaW1hdGlvbkNsaXBbXSA9IFtdO1xyXG4gICAgbGV0IGNsaXBOYW1lcyA9IFtdO1xyXG4gICAgbGV0IGNyZWF0ZUNsaXAgPSAoXHJcbiAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgY2xpcE5hbWU6IHN0cmluZyxcclxuICAgICAgZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdXHJcbiAgICApID0+IHtcclxuICAgICAgbGV0IGNsaXAgPSBjYy5BbmltYXRpb25DbGlwLmNyZWF0ZVdpdGhTcHJpdGVGcmFtZXMoZnJhbWVzIGFzIGFueSwgMTApO1xyXG4gICAgICBjbGlwLm5hbWUgPSBjbGlwTmFtZTtcclxuICAgICAgY2xpcC53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbDtcclxuICAgICAgY2xpcHMucHVzaChjbGlwKTtcclxuICAgICAgY2xpcE5hbWVzLnB1c2goY2xpcE5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNwcml0ZUF0bGFzKHBhdGgsIChhdGxhczogY2MuU3ByaXRlQXRsYXMpID0+IHtcclxuICAgICAgaWYgKCFhdGxhcykgcmV0dXJuO1xyXG4gICAgICBHQXNzZXRJbXBsLmNoZWNrQXRsYXNEeVBhY2socGF0aCwgYXRsYXMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY29uZmlnID0gY29uZmlnc1tpXTtcclxuICAgICAgICBjb25maWcubWluSWR4ID0gY29uZmlnLm1pbklkeCB8fCAwO1xyXG4gICAgICAgIGNvbmZpZy5tYXhJZHggPSBjb25maWcubWF4SWR4IHx8IDEwMDA7XHJcbiAgICAgICAgbGV0IGZyYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSBjb25maWcubWluSWR4OyBqIDw9IGNvbmZpZy5tYXhJZHg7IGorKykge1xyXG4gICAgICAgICAgbGV0IGZyYW1lTmFtZSA9XHJcbiAgICAgICAgICAgIGNvbmZpZy5wcmVmaXggKyBNYXRoRXgucHJlZml4SW50ZWdlcihqLCBjb25maWcubnVtYmVyRml4KTtcclxuICAgICAgICAgIGxldCBmcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKGZyYW1lTmFtZSk7XHJcbiAgICAgICAgICBpZiAoIWZyYW1lICYmIGogIT0gMCkgYnJlYWs7XHJcbiAgICAgICAgICBmcmFtZXMucHVzaChmcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmcmFtZXNbMF0gPT0gbnVsbCkgZnJhbWVzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICBjcmVhdGVDbGlwKHBhdGgsIGNvbmZpZy5hbmlOYW1lLCBmcmFtZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNiKGNsaXBzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF0bGFzSlhMb2FkQ2xpcHMoXHJcbiAgICBhdGxhczogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAuLi5jb25maWdzOiBBbmltYXRpb25Db25maWd1cmVbXVxyXG4gICk6IGNjLkFuaW1hdGlvbkNsaXBbXSB7XHJcbiAgICBsZXQgY2xpcHM6IGNjLkFuaW1hdGlvbkNsaXBbXSA9IFtdO1xyXG4gICAgbGV0IGNsaXBOYW1lcyA9IFtdO1xyXG4gICAgbGV0IGNyZWF0ZUNsaXAgPSAoY2xpcE5hbWU6IHN0cmluZywgZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdKSA9PiB7XHJcbiAgICAgIGxldCBjbGlwID0gY2MuQW5pbWF0aW9uQ2xpcC5jcmVhdGVXaXRoU3ByaXRlRnJhbWVzKGZyYW1lcyBhcyBhbnksIDEwKTtcclxuICAgICAgY2xpcC5uYW1lID0gY2xpcE5hbWU7XHJcbiAgICAgIGNsaXAud3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Ob3JtYWw7XHJcbiAgICAgIGNsaXBzLnB1c2goY2xpcCk7XHJcbiAgICAgIGNsaXBOYW1lcy5wdXNoKGNsaXBOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFhdGxhcykgcmV0dXJuO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb25maWcgPSBjb25maWdzW2ldO1xyXG4gICAgICBjb25maWcubWluSWR4ID0gY29uZmlnLm1pbklkeCB8fCAwO1xyXG4gICAgICBjb25maWcubWF4SWR4ID0gY29uZmlnLm1heElkeCB8fCAxMDAwO1xyXG4gICAgICBsZXQgZnJhbWVzID0gW107XHJcbiAgICAgIGZvciAobGV0IGogPSBjb25maWcubWluSWR4OyBqIDw9IGNvbmZpZy5tYXhJZHg7IGorKykge1xyXG4gICAgICAgIGxldCBmcmFtZU5hbWUgPVxyXG4gICAgICAgICAgY29uZmlnLnByZWZpeCArIE1hdGhFeC5wcmVmaXhJbnRlZ2VyKGosIGNvbmZpZy5udW1iZXJGaXgpO1xyXG4gICAgICAgIGxldCBmcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKGZyYW1lTmFtZSk7XHJcbiAgICAgICAgaWYgKCFmcmFtZSAmJiBqICE9IDApIGJyZWFrO1xyXG4gICAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZnJhbWVzWzBdID09IG51bGwpIGZyYW1lcy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgIGlmIChmcmFtZXMubGVuZ3RoID4gMCkgY3JlYXRlQ2xpcChjb25maWcuYW5pTmFtZSwgZnJhbWVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjbGlwcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkSlhBbmlDbGlwKFxyXG4gICAgcGF0aDogc3RyaW5nLFxyXG4gICAgYW5pTmFtZTogc3RyaW5nLFxyXG4gICAgcHJlZml4OiBzdHJpbmcsXHJcbiAgICBudW1iZXJGaXg6IG51bWJlcixcclxuICAgIGNiOiBBbmltYXRpb25DaGlwQ2FsbEJhY2tcclxuICApIHtcclxuICAgIEdMb2FkZXIuc3ByaXRlQXRsYXMocGF0aCwgKGF0bGFzOiBjYy5TcHJpdGVBdGxhcykgPT4ge1xyXG4gICAgICBpZiAoIWF0bGFzKSByZXR1cm47XHJcbiAgICAgIGxldCBjbGlwRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGZyYW1lTmFtZSA9IHByZWZpeCArIE1hdGhFeC5wcmVmaXhJbnRlZ2VyKGksIG51bWJlckZpeCk7XHJcbiAgICAgICAgbGV0IGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoZnJhbWVOYW1lKTtcclxuICAgICAgICBpZiAoIWZyYW1lICYmIGkgIT0gMCkgYnJlYWs7XHJcbiAgICAgICAgY2xpcEZyYW1lcy5wdXNoKGZyYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWNsaXBGcmFtZXNbMF0pIGNsaXBGcmFtZXMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICBsZXQgY2xpcCA9IGNjLkFuaW1hdGlvbkNsaXAuY3JlYXRlV2l0aFNwcml0ZUZyYW1lcyhjbGlwRnJhbWVzIGFzIGFueSwgMTApO1xyXG4gICAgICBjbGlwLm5hbWUgPSBhbmlOYW1lO1xyXG4gICAgICBjbGlwLndyYXBNb2RlID0gY2MuV3JhcE1vZGUuTm9ybWFsO1xyXG4gICAgICBjYihjbGlwKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuaWYgKENDX0VESVRPUikge1xyXG4gIC8vIFJlc0NvbnRybC5wcm90b3R5cGUubG9hZFJlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyAgICAgbGV0IHJlc0FyZ3M6IExvYWRSZXNBcmdzID0gdGhpcy5fbWFrZUxvYWRSZXNBcmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgLy8gICAgIGNjLnJlc291cmNlcy5sb2FkKHJlc0FyZ3MudXJsLCByZXNBcmdzLnR5cGUsIHJlc0FyZ3Mub25Qcm9nZXNzLCAoZXJyLCByZXMpID0+IHtcclxuICAvLyAgICAgICAgIGlmIChlcnIpIHtcclxuICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgICB0aGlzLmZpbmlzaENhbGxiYWNrKHJlc0FyZ3MsIGVyciwgcmVzKTtcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR0Fzc2V0c0FzeW5jSGFubGRlciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIC8qKiDliqDovb3nirbmgIEgKi9cclxuICBwdWJsaWMgc3RhdGljIFNUQVRFID0ge1xyXG4gICAgLyoqIOaXoOeKtuaAgSAqL1xyXG4gICAgTnVsbDogMCxcclxuICAgIC8qKiDliqDovb3kuK0gKi9cclxuICAgIExvYWRpbmc6IDEsXHJcbiAgICAvKiog5bey5a6M5oiQICovXHJcbiAgICBDb21wbGV0ZWQ6IDIsXHJcbiAgICAvKiog5Ye66ZSZ5LqGICovXHJcbiAgICBFcnJvcjogMyxcclxuICB9O1xyXG5cclxuICAvKiog6LWE5rqQ5Yqg6L295a+56LGhICovXHJcbiAgcHJvdGVjdGVkIF9hcGw6IEdBc3NldEltcGwgPSBudWxsO1xyXG4gIC8qKiDliqDovb3nirbmgIEgKi9cclxuICBwcm90ZWN0ZWQgX3N0YXRlOiBudW1iZXIgPSBHQXNzZXRzQXN5bmNIYW5sZGVyLlNUQVRFLk51bGw7XHJcbiAgLyoqIOetieW+heWKoOi9veeahOi1hOa6kCAqL1xyXG4gIHByb3RlY3RlZCBfYXNzZXRzOiBBc3NldEluZm9bXTtcclxuICAvKiog5Yqg6L295a6M5oiQ5Zue6LCDICovXHJcbiAgcHJvdGVjdGVkIF9yZXN1bHRDYWxsQmFja3M6IEFycmF5PHsgKHN0YXRlOiBudW1iZXIpOiB2b2lkIH0+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGFwbDogR0Fzc2V0SW1wbCwgLi4uYXNzZXRzOiBBc3NldEluZm9bXSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuX2FwbCA9IGFwbDtcclxuICAgIHRoaXMuX2Fzc2V0cyA9IGFzc2V0cztcclxuICB9XHJcblxyXG4gIC8qKiDliqDovb3otYTmupAgKi9cclxuICBwdWJsaWMgbG9hZCgpIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBHQXNzZXRzQXN5bmNIYW5sZGVyLlNUQVRFLk51bGwpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl9hc3NldHMubGVuZ3RoID09IDApIHtcclxuICAgICAgY2Mud2FybihcIkdhc3NldEFzeW5jSGFuZGxlciBhc3NldHMubGVuZ3RoID09IDAhXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hcGwucHJlTG9hZHMoKGN1ciwgY291bnQsIHBhdGgsIGVyciwgYXNzZXRzKSA9PiB7XHJcbiAgICAgIGxldCBmdW5jID0gZXJyID8gY2Mud2FybiA6IGNjLmxvZztcclxuICAgICAgZnVuYyhcclxuICAgICAgICBg5Yqg6L296LWE5rqQ5Lit77yM5b2T5YmN6L+b5bqmJHtjdXJ9LyR7Y291bnR9LOWKoOi9vei1hOa6kOi3r+W+hO+8miR7cGF0aH3vvIznirbmgIEgJHtcclxuICAgICAgICAgIGVyciA/IFwi5Yqg6L295aSx6LSlXCIgOiBcIuWKoOi9veaIkOWKn1wiXHJcbiAgICAgICAgfWBcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycikge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gR0Fzc2V0c0FzeW5jSGFubGRlci5TVEFURS5FcnJvcjtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmRDYWxsYmFja3MoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY3VyID09IGNvdW50KSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBHQXNzZXRzQXN5bmNIYW5sZGVyLlNUQVRFLkNvbXBsZXRlZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmRDYWxsYmFja3MoKTtcclxuICAgICAgfVxyXG4gICAgfSwgLi4udGhpcy5fYXNzZXRzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqIOetieW+hei1hOa6kOWKoOi9veWujOaIkOWbnuiwgyAqL1xyXG4gIHB1YmxpYyB3b3JrKGNiOiB7IChzdGF0ZTogbnVtYmVyKTogdm9pZCB9KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuX3N0YXRlID09IEdBc3NldHNBc3luY0hhbmxkZXIuU1RBVEUuQ29tcGxldGVkIHx8XHJcbiAgICAgIHRoaXMuX3N0YXRlID09IEdBc3NldHNBc3luY0hhbmxkZXIuU1RBVEUuRXJyb3JcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gY2IodGhpcy5fc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcmVzdWx0Q2FsbEJhY2tzLnB1c2goY2IpO1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlID09IEdBc3NldHNBc3luY0hhbmxkZXIuU1RBVEUuTnVsbCkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZW5kQ2FsbGJhY2tcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZW5kQ2FsbGJhY2tzKCkge1xyXG4gICAgd2hpbGUgKHRoaXMuX3Jlc3VsdENhbGxCYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBjYWxsQmFjayA9IHRoaXMuX3Jlc3VsdENhbGxCYWNrcy5zaGlmdCgpO1xyXG4gICAgICBjYWxsQmFjayh0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgR0xvYWRlciA9IEdBc3NldEltcGwuZ2V0QXNzZXRJbXBsKFwiR0xPQkFMLUFTU0VUSU1QTFwiKTtcclxuXHJcbmlmIChDQ19ERVYpIHtcclxuICB3aW5kb3dbXCJSZXNDb250cmxcIl0gPSBHQXNzZXRJbXBsLmxvYWRlcjtcclxufVxyXG4iXX0=