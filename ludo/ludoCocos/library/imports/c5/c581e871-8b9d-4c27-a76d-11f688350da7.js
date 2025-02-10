"use strict";
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