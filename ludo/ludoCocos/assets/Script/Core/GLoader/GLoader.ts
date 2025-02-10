import { AnimationConfigure } from "../../../../d.ts/game/JXCLBtl";
import { Res } from "../../Game/Common/UIResources";
import { INVALID_VALUE } from "../CoreDefine";
import ColorLog from "../FrameEx/ColorLog";
import { MapWrap, ObjectWrap, SetWrap } from "../FrameEx/ES5Ex";
import MaskSprite from "../FrameEx/MaskSprite";
import { AnimationChipCallBack, AnimationClipsCallBack } from "../Manager/type";
import { UIMgr } from "../Manager/UIMgr";
import MathEx from "../Math/MathEx";

let ccloader: cc.AssetManager = cc.assetManager;
// 资源加载的处理回调
export type ProcessCallback = (
  completedCount: number,
  totalCount: number,
  item: any
) => void;
// 资源加载的完成回调
export type CompletedCallback = (error: Error, resource: any) => void;
/** 每5秒进行资源GC检测 */
const ASSET_GC_CHECKTIME = 5000;
/** 每分钟释放一次资源 */
const ASSET_GC_TIME = 60000;
// re
interface CacheInfo {
  refs: SetWrap<string>;
  uses: SetWrap<string>;
}

// LoadRes方法的参数结构
interface LoadResArgs {
  bundle: string;
  url: string;
  type?: typeof cc.Asset;
  onCompleted?: CompletedCallback;
  onProgess?: ProcessCallback;
  use?: string;
}

// ReleaseRes方法的参数结构
interface ReleaseResArgs {
  url: string;
  type?: typeof cc.Asset;
  use?: string;
}

// 兼容性处理
let isChildClassOf = cc.js["isChildClassOf"];
if (!isChildClassOf) {
  isChildClassOf = cc["isChildClassOf"];
}

function resLog(...args) {
  // cc.log(...args);
}

class ResContrl {
  private _resMap: MapWrap<string, CacheInfo> = new MapWrap<
    string,
    CacheInfo
  >();
  private _assetTypes: { [url: string]: typeof cc.Asset } = {};

  private __nLoadRef: number = 0;
  private _allAssetImps: MapWrap<string, GAssetImpl> = new MapWrap<
    string,
    GAssetImpl
  >();
  private _waitReleaseUseKeys: string[] = [];

  /** 做一个资源清理器，被标记释放的资源如果五分钟内没有使用情况则进行清理 */
  private _waitReleaseAssets: MapWrap<string, number> = new MapWrap<
    string,
    number
  >();
  /** 上一次GC检测时间 */
  private _lastGCCheckTime = 0;

  public getAssetImpl(userKey: string): GAssetImpl {
    let apl = this._allAssetImps.get(userKey);
    if (apl) {
      let index = this._waitReleaseUseKeys.indexOf(userKey);
      if (index != INVALID_VALUE) {
        cc.js.array.fastRemoveAt(this._waitReleaseUseKeys, index);
      }
    } else {
      apl = new GAssetImpl(userKey);
      this._allAssetImps.set(userKey, apl);
    }
    apl.retain();
    return apl;
  }

  public popAssetImp(userKey: string, apl: GAssetImpl) {
    if (this._allAssetImps.get(userKey) != apl) {
      resLog("the apl don't in the allAssetImps!");
      return;
    }

    if (this._waitReleaseUseKeys.indexOf(userKey) == INVALID_VALUE) {
      this._waitReleaseUseKeys.push(userKey);
    } else {
      resLog("the will release assetImp is always int the waitReleaseUserkeys");
    }
  }

  private checkReleaseAssets() {
    if (this.isLoading()) return;
    if (this._waitReleaseAssets.size > 0) {
      let now = Date.now();
      if (now - this._lastGCCheckTime > ASSET_GC_CHECKTIME) {
        this._lastGCCheckTime = now;
        let timeOutAssets: string[] = [];
        this._waitReleaseAssets.forEach((time, id) => {
          if (now - time > ASSET_GC_TIME) {
            timeOutAssets.push(id);
          }
        });
        for (let i = 0; i < timeOutAssets.length; i++) {
          if (CC_DEV) {
            let path = ccloader.utils.getUrlWithUuid(timeOutAssets[i]);
            let item = cc.resources.getInfoWithPath(path);
            if (item) {
              resLog(
                "resloader release item by uuid :" +
                  item.uuid +
                  "=" +
                  (item.content && item.content.name
                    ? item.content.name
                    : item._owner && item._owner.name
                    ? item._owner.name
                    : "")
              );
            } else {
              resLog(" not find item and release by key =" + timeOutAssets[i]);
            }
          }
          cc.resources.release(timeOutAssets[i]);
          this._waitReleaseAssets.delete(timeOutAssets[i]);
        }
        timeOutAssets = null;
      }
    }

    if (this._waitReleaseUseKeys.length > 0) {
      let releaseKey = this._waitReleaseUseKeys.pop();
      let apl = this._allAssetImps.get(releaseKey);
      if (apl.refCount != 0) {
        cc.error("apl.refCount  is not zero!");
      }
      this._allAssetImps.delete(releaseKey);
      apl.destroy();
    }
  }

  /** 立即清理 */
  public rightNowGC() {
    this._waitReleaseAssets.forEach((time, key) => {
      let path = ccloader.utils.getUrlWithUuid(key);
      let item = cc.resources.getInfoWithPath(path);
      if (CC_DEV) {
        if (item) {
          resLog(
            "resloader release item by uuid :" +
              item.uuid +
              "=" +
              (item.content && item.content.name
                ? item.content.name
                : item._owner && item._owner.name
                ? item._owner.name
                : "")
          );
        } else {
          resLog(" not find item and release by key =" + key);
        }
      }
      cc.resources.release(key);
    });
    this._waitReleaseAssets.clear();
  }

  public testCanReleaseInfo() {
    this._resMap.forEach((k, v) => {
      if (k.uses.size == 0 && k.refs.size > 0) {
        cc.log(v);
      }
    });
  }

  constructor() {
    cc.director.on(cc.Director.EVENT_AFTER_UPDATE, () => {
      this.checkReleaseAssets();
    });
  }

  /** 检测资源是否加载中 */
  public isLoading(): boolean {
    return this.__nLoadRef > 0;
  }

  /**
   * 从cc.loader中获取一个资源的item
   * @param url 查询的url
   * @param type 查询的资源类型
   */
  private _getResItem(url: string, type: typeof cc.Asset): any {
    return this.getResInfoByPath(url, type);
  }

  /**
   * loadRes方法的参数预处理
   */
  private _makeLoadResArgs(): LoadResArgs {
    if (arguments.length < 1 || typeof arguments[0] != "string") {
      console.error(`_makeLoadResArgs error ${arguments}`);
      return null;
    }
    let url = arguments[0];
    let info = this.getInfoByPath(url);
    let ret: LoadResArgs = { bundle: info.bundle, url: info.url };

    for (let i = 1; i < arguments.length; ++i) {
      if (i == 1 && isChildClassOf(arguments[i], cc.Asset)) {
        // 判断是不是第一个参数type
        ret.type = arguments[i];
      } else if (i == arguments.length - 1 && typeof arguments[i] == "string") {
        // 判断是不是最后一个参数use
        ret.use = arguments[i];
      } else if (typeof arguments[i] == "function") {
        // 其他情况为函数
        if (arguments.length > i + 1 && typeof arguments[i + 1] == "function") {
          ret.onProgess = arguments[i];
        } else {
          ret.onCompleted = arguments[i];
        }
      }
    }
    return ret;
  }

  /*资源信息通过url获取 */
  public getInfoByPath(url: string) {
    let arr = url.split("/");
    let bundle = arr[0];
    let path = "";
    for (let i = 1; i < arr.length; i++) {
      let info = arr[i];
      if (i == 1) {
        path += info;
      } else {
        let str = "/" + info;
        path += str;
      }
    }
    return { bundle, url: path };
  }

  /**
   * releaseRes方法的参数预处理
   */
  private _makeReleaseResArgs(): ReleaseResArgs {
    if (arguments.length < 1 || typeof arguments[0] != "string") {
      console.error(`_makeReleaseResArgs error ${arguments}`);
      return null;
    }
    let info = this.getInfoByPath(arguments[0]);
    let ret: ReleaseResArgs = { url: info.url };
    for (let i = 1; i < arguments.length; ++i) {
      if (typeof arguments[i] == "string") {
        ret.use = arguments[i];
      } else {
        ret.type = arguments[i];
      }
    }
    return ret;
  }

  /**
   * 生成一个资源使用Key
   * @param where 在哪里使用，如Scene、UI、Pool
   * @param who 使用者，如Login、UIHelp...
   * @param why 使用原因，自定义...
   */
  public static makeUseKey(
    where: string,
    who: string = "none",
    why: string = ""
  ): string {
    return `use_${where}_by_${who}_for_${why}`;
  }

  /**
   * 获取资源缓存信息
   * @param key 要获取的资源url
   */ public getCacheInfo(key: string): CacheInfo {
    if (!this._resMap.has(key)) {
      this._resMap.set(key, {
        refs: new SetWrap<string>(),
        uses: new SetWrap<string>(),
      });
    }
    return this._resMap.get(key);
  }

  /**
   * 获取资源的url
   * @param asset
   */
  public getUrlByAsset(asset: cc.Asset): string {
    let checkAsset: any = asset;
    if (checkAsset && checkAsset._uuid) {
      return ccloader.utils.getUrlWithUuid(checkAsset._uuid);
    }
    console.error(`getUrlByAssets error ${asset}`);
    return null;
  }

  /**
   * 为某资源增加一个新的use
   * @param key 资源的url
   * @param use 新的use字符串
   */
  public addUse(key: string, use: string): boolean {
    if (this._resMap.has(key)) {
      let uses = this._resMap.get(key).uses;
      if (!uses.has(use)) {
        uses.add(use);
        return true;
      } else {
        console.warn(`addUse ${key} by ${use} faile, repeating use key`);
        return false;
      }
    }
    console.warn(
      `addUse ${key} faile, key nofound, make sure you load with resloader`
    );
    return false;
  }

  private _buildDepend(item: any, refKey: string) {
    // 反向关联引用（为所有引用到的资源打上本资源引用到的标记）
    if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
      for (let depKey of item.dependKeys) {
        // 记录该资源被我引用
        let cacheInfo = this.getCacheInfo(depKey);
        if (!cacheInfo.refs.has(refKey)) {
          cacheInfo.refs.add(refKey);
          let depItem = ccloader.assets.get(depKey) as any;
          if (depItem) {
            let id = depItem.uuid || depItem.id;
            if (this._waitReleaseAssets.has(id)) {
              this._waitReleaseAssets.delete(id);
            }
            this._buildDepend(depItem, depItem.id);
          }
        }
      }
    }
  }

  public _releaseDepend(item: any, refKey: string) {
    if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
      for (let depKey of item.dependKeys) {
        // 记录该资源被我引用
        let cacheInfo = this._resMap.get(depKey);
        if (!cacheInfo) continue;
        if (cacheInfo.refs.has(refKey)) {
          cacheInfo.refs.delete(refKey);
          let depItem = ccloader.assets.get(depKey) as any;
          if (depItem) {
            this._releaseDepend(depItem, depItem._uuid);
          }
        }
      }
    }
  }

  /**
   * 缓存一个Item
   * @param item
   * @param use
   */
  private _cacheItem(item: any, use?: string): boolean {
    if (item && item.uuid) {
      let info = this.getCacheInfo(item.uuid);
      if (use) {
        info.uses.add(use);
      }
      if (!info.refs.has(item.id)) {
        info.refs.add(item.id);
        let id = item.uuid || item.id;
        if (this._waitReleaseAssets.has(id)) {
          this._waitReleaseAssets.delete(id);
        }
        this._buildDepend(item, item.id);
      }
      return true;
    }
    return false;
  }

  /**
   * 完成一个Item的加载
   * @param url
   * @param assetType
   * @param use
   */
  private _finishItem(url: string, assetType: typeof cc.Asset, use?: string) {
    let item = this._getResItem(url, assetType);
    if (!this._cacheItem(item, use)) {
      cc.warn(`addDependKey item error! for ${url}`);
    }
  }

  public addDependKey(item, refKey) {
    if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
      for (let depKey of item.dependKeys) {
        // 记录该资源被我引用
        this.getCacheInfo(depKey).refs.add(refKey);
        // resLog(`${depKey} ref by ${refKey}`);
        let depItem = cc.assetManager.assets.get(depKey);
        this.addDependKey(depItem, refKey);
      }
    }
  }

  public finishCallback(resArgs, error: Error, resource: any) {
    if (!error) {
      if (!CC_EDITOR) {
        this._finishItem(resArgs.url, resArgs.type, resArgs.use);
      }
    }
    if (resArgs.onCompleted) {
      resArgs.onCompleted(error, resource);
    }
  }

  /**
   * 开始加载资源
   * @param url           资源url
   * @param type          资源类型，默认为null
   * @param onProgess     加载进度回调
   * @param onCompleted   加载完成回调
   * @param use           资源使用key，根据makeUseKey方法生成
   */
  public loadRes(url: string, use?: string);
  public loadRes(url: string, onCompleted: CompletedCallback, use?: string);
  public loadRes(
    url: string,
    onProgess: ProcessCallback,
    onCompleted: CompletedCallback,
    use?: string
  );
  public loadRes(url: string, type: { prototype: cc.Asset }, use?: string);
  public loadRes(
    url: string,
    type: { prototype: cc.Asset },
    onCompleted: CompletedCallback,
    use?: string
  );
  public loadRes(
    url: string,
    type: { prototype: cc.Asset },
    onProgess: ProcessCallback,
    onCompleted: CompletedCallback,
    use?: string
  );
  public loadRes() {
    let resArgs: LoadResArgs = this._makeLoadResArgs.apply(this, arguments);
    // 预判是否资源已加载
    let res = this.getRes(resArgs);
    if (res) return;
    this.getBundle(resArgs.bundle, (bundle: cc.AssetManager.Bundle) => {
      this.__nLoadRef++;
      bundle.load(resArgs.url, resArgs.type, resArgs.onProgess, (err, res) => {
        if (!err) {
          this._assetTypes[resArgs.url] = resArgs.type;
        }
        this.__nLoadRef--;
        this.finishCallback(resArgs, err, res);
      });
    });
  }

  /**获取资源 */
  public getRes<T>(url: string | any, resType?: typeof cc.Asset, use?: string) {
    let item;
    let assetType;
    if (typeof url == "string") {
      let resArgs = this.getInfoByPath(url);
      assetType = this._assetTypes[resArgs.url] || resType;
      if (!assetType) return null;
      item = this.getResByPath(resArgs.url, assetType);
      if (item) {
        if (!this._assetTypes[resArgs.url]) {
          this._assetTypes[resArgs.url] = assetType;
        }
        this.finishCallback({ url: resArgs.url, type: assetType }, null, item);
      }
      return item;
    } else {
      let resArgs: { url: string; type: typeof cc.Asset } = url;
      assetType = this._assetTypes[resArgs.url] || resArgs.type;
      item = this.getResByPath(resArgs.url, assetType);
      if (!assetType) return null;
      if (item) {
        if (!this._assetTypes[resArgs.url]) {
          this._assetTypes[resArgs.url] = assetType;
        }
        this.finishCallback(resArgs, null, item);
      }
      return item;
    }
  }

  public getResByPath(path: string, type: typeof cc.Asset) {
    let _item = null;
    cc.assetManager.bundles.forEach((bundle) => {
      let item = bundle.get(path, type);
      if (item) {
        _item = item;
      }
    });
    return _item;
  }

  public getResInfoByPath(path: string, type: typeof cc.Asset) {
    let _info = null;
    cc.assetManager.bundles.forEach((bundle) => {
      let info = bundle.getInfoWithPath(path, type);
      if (info) {
        _info = info;
      }
    });
    return _info;
  }

  public getBundle(
    bundleName: string,
    callBack: (bundle: cc.AssetManager.Bundle) => void
  ) {
    if (bundleName == "resources") {
      callBack(cc.resources);
      return;
    }
    let bundle = cc.assetManager.getBundle(bundleName);
    if (bundle) {
      return callBack(bundle);
    } else {
      cc.assetManager.loadBundle(
        bundleName,
        (err: Error, bundle: cc.AssetManager.Bundle) => {
          UIMgr.closeWait();
          if (err) {
            cc.error("分包加载失败:" + bundleName, err);
            callBack(cc.resources);
          } else {
            cc.log("分包加载成功:" + bundleName);
            callBack(bundle);
          }
        }
      );
    }
  }

  public hasRes(url: string): boolean {
    let assetType = this._assetTypes[url];
    if (!assetType) return false;
    return true;
  }

  /**
   * 释放资源
   * @param url   要释放的url
   * @param type  资源类型
   * @param use   要解除的资源使用key，根据makeUseKey方法生成
   */
  public releaseRes(url: string, use?: string);
  public releaseRes(url: string, type: typeof cc.Asset, use?: string);
  public releaseRes() {
    if (CC_EDITOR) return;
    /**暂时不释放资源 */
    // return;
    let resArgs: ReleaseResArgs = this._makeReleaseResArgs.apply(
      this,
      arguments
    );
    if (!resArgs.type) {
      resArgs.type = this._assetTypes[resArgs.url];
    }
    let item = this._getResItem(resArgs.url, resArgs.type);
    if (!item) {
      console.warn(`releaseRes item is null ${resArgs.url} ${resArgs.type}`);
      return;
    }

    let cacheInfo = this.getCacheInfo(item.uuid);
    if (resArgs.use) {
      cacheInfo.uses.delete(resArgs.use);
    }
    if (cacheInfo.uses.size == 0) {
      this._tagRelease(item, item.uuid);
    }
  }

  // 标记资源释放
  private _tagRelease(item, refKey) {
    let cacheInfo = this.getCacheInfo(item.uuid);
    if (!cacheInfo.refs.has(refKey)) {
      resLog(
        "resloader jump release item by uuid :" +
          item.id +
          "=" +
          (item.content && item.content.name
            ? item.content.name
            : item._owner && item._owner.name
            ? item._owner.name
            : "")
      );
      return;
    }

    // 解除自身对自己的引用
    cacheInfo.refs.delete(refKey);

    if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
      if (item.dependKeys && Array.isArray(item.dependKeys)) {
        for (let depKey of item.dependKeys) {
          let depItem = cc.assetManager.assets.get(depKey);
          if (depItem) {
            this._tagRelease(depItem, item.id);
          }
        }
      }
      if (item.uuid) {
        this._waitReleaseAssets.set(item.uuid, Date.now());
      } else {
        this._waitReleaseAssets.set(item.id, Date.now());
      }
      this._resMap.delete(item.id);
    } else {
      resLog(
        "resloader can't release item by url:" +
          item.id +
          "=" +
          (item.content && item.content.name
            ? item.content.name
            : item._owner && item._owner.name
            ? item._owner.name
            : "") +
          `, why: the uses.size = ${cacheInfo.uses.size}, ref.size = ${cacheInfo.refs.size}`
      );
    }
  }

  /**
   * 是否可以释放某资源
   * @param url
   * @param use
   */
  public canRelease(url: string, use: string): boolean {
    // !!! url需要转成ID,这是一个错误函数
    let cacheInfo = this.getCacheInfo(url);
    // 有其它Res引用它
    if (cacheInfo.refs.size > 1 || !cacheInfo.refs.has(url)) return false;
    // 有其它的Use使用
    if (cacheInfo.uses.size > 1 || !cacheInfo.uses.has(use)) return false;
    return true;
  }

  /**
   * 判断一个资源能否被释放
   * @param url 资源url
   * @param type  资源类型
   * @param use   要解除的资源使用key，根据makeUseKey方法生成
   */
  public checkReleaseUse(url: string, use?: string): boolean;
  public checkReleaseUse(
    url: string,
    type: typeof cc.Asset,
    use?: string
  ): boolean;
  public checkReleaseUse() {
    let resArgs: ReleaseResArgs = this._makeReleaseResArgs.apply(
      this,
      arguments
    );
    resArgs.type = resArgs.type || this._assetTypes[resArgs.url];
    let item = this._getResItem(resArgs.url, resArgs.type);
    if (!item) {
      console.log(`cant release,item is null ${resArgs.url} ${resArgs.type}`);
      return true;
    }

    let cacheInfo = this.getCacheInfo(item.id);
    let checkUse = false;
    let checkRef = false;

    if (resArgs.use && cacheInfo.uses.size > 0) {
      if (cacheInfo.uses.size == 1 && cacheInfo.uses.has(resArgs.use)) {
        checkUse = true;
      } else {
        checkUse = false;
      }
    } else {
      checkUse = true;
    }

    if (
      (cacheInfo.refs.size == 1 && cacheInfo.refs.has(item.url)) ||
      cacheInfo.refs.size == 0
    ) {
      checkRef = true;
    } else {
      checkRef = false;
    }

    return checkUse && checkRef;
  }

  //#region 资源调试接口

  /** 从ResMap中拿资源索引 */
  public getResKeyByResMap(ext: string) {
    let keys = [];
    this._resMap.forEach((resInfo: CacheInfo, key: string) => {
      if (key.indexOf(ext) != INVALID_VALUE) {
        keys.push(key);
      }
    });
    return keys;
  }

  /** 从cc._cache中拿资源索引  */
  public getResKeyByCCCache(ext: string) {
    // let caches = cc.loader["_cache"];
    // let keys = []
    // for (let key in caches) {
    //     if (key.indexOf(ext) != INVALID_VALUE) {
    //         keys.push(key);
    //     };
    // }
    // return keys
    let keys = [];
    cc.assetManager.assets.forEach((value: cc.Asset, key: string) => {
      if (key.indexOf(ext) != INVALID_VALUE) {
        keys.push(key);
      }
    });
    return keys;
  }

  /** 比较资源索引，检测keys2中的资源如果不存在keys1中，则列出 */
  public compareKeys(
    keys1: string[],
    keys2: string[],
    key1Name: string,
    key2Name: string
  ) {
    keys2.forEach((v, k) => {
      if (keys1.indexOf(v) == INVALID_VALUE) {
        console.log(
          `${key2Name} res path ${cc.AssetManager.Pipeline[
            "_debugGetAssetInfo"
          ](v)} key ${v} don't in ${key1Name}.`
        );
      }
    });
  }

  /** 比对和引擎中的资源缓存 */
  public compareResMapWithCCCache(ext: string) {
    let keys1 = this.getResKeyByResMap(ext);
    let keys2 = this.getResKeyByCCCache(ext);
    console.log(
      `_resMap.size = ${keys1.length}, cc_cache.size = ${keys2.length}`
    );
    this.compareKeys(keys1, keys2, "ResMap", "CCCache");
  }

  /** 尝试获取资源在资源管理器中的名称 */
  public getResPaths(...libPaths: string[]) {
    let paths = [];
    for (let i = 0; i < libPaths.length; i++) {
      paths.push(cc.AssetManager.Pipeline["_debugGetAssetInfo"](libPaths[i]));
    }
    return paths;
  }

  protected _tempResMaps: { [time: string]: string[] } = {};
  public setRecordResMap() {
    let now = Date.now();
    this._tempResMaps[now] = this._resMap.keys();
  }

  /** 删除资源记录的时间节点 */
  public clearRecordResMap() {
    this._tempResMaps = {};
  }

  /** 比较缓存中的资源 */
  public compareRecordResMap() {
    let timeStamps = Object.keys(this._tempResMaps);
    for (let i = 1; i < timeStamps.length; i++) {
      console.log(
        `compare time stamp left: ${timeStamps[i - 1]}, file count ${
          this._tempResMaps[timeStamps[i - 1]].length
        }, right: ${timeStamps[i]}, file count ${
          this._tempResMaps[timeStamps[i]].length
        } `
      );
      this.compareKeys(
        this._tempResMaps[timeStamps[i - 1]],
        this._tempResMaps[timeStamps[i]],
        "befor",
        "after"
      );
    }
  }

  /** 查找所有资源，找出丢失加载器的资源，这部分资源一定程度上代表了内存泄漏 */
  public findAllLostInfos() {
    let lostInfos: { [aplName: string]: string[] } = {};
    this._resMap.forEach((cahceInfo: CacheInfo, resKey: string) => {
      /** 如果有资源引导自生，查找引用的使用情况 */
      this.findLostInfo(resKey, cahceInfo, lostInfos);
    });
    return lostInfos;
  }

  /** 查找单个资源的丢失情况 */
  public findLostInfo(
    resId: string,
    cacheInfo: CacheInfo,
    lostInfos: { [aplName: string]: string[] }
  ) {
    if (cacheInfo.refs.size > 0) {
      cacheInfo.refs.toArray().forEach((refKey: string, _) => {
        if (refKey == resId) return;
        let subInfo = this._resMap.get(refKey);
        this.findLostInfo(refKey, subInfo, lostInfos);
      });
    }
    if (cacheInfo.uses.size > 0) {
      cacheInfo.uses.toArray().forEach((userKey: string, _) => {
        if (!this._allAssetImps.has(userKey)) {
          lostInfos[userKey] = lostInfos[userKey] || [];
          if (lostInfos[userKey].indexOf(resId) == INVALID_VALUE) {
            lostInfos[userKey].push(resId);
          }
        }
      });
    }
  }

  //#endregion
}

/**
 * @name GAssetImpl
 * @author Visow
 * @description 文件加载帮助类
 * @class GAssetImpl
 */

export class GAssetImpl {
  public static loader: ResContrl = new ResContrl();

  /** 检测当前资源加载状态 */
  public static isLoading(): boolean {
    return this.loader.isLoading();
  }

  public static getAssetImpl(refKey: string) {
    return this.loader.getAssetImpl(refKey);
  }

  // 遮罩信息
  public static Default_MASK_SPRITE = {
    c: cc.Vec2.ZERO,
    r: 46,
    min: 13,
    max: 34,
  };
  public static _assetMaskInfo: {
    [path: string]: { c: cc.Vec2; r: number; min: number; max: number };
  } = {};
  public static _unpackPaths: string[] = [];
  public static initLoadRules(maskInfo, unpackPaths: string[]) {
    this._assetMaskInfo = maskInfo;
    this._unpackPaths = unpackPaths;
  }

  /** 单个精灵进动态图集规则 */
  public static checkDyPack(path: string, sp: cc.SpriteFrame) {
    if (GAssetImpl._unpackPaths && !sp["__unpack"]) {
      for (let i = 0, l = GAssetImpl._unpackPaths.length; i < l; i++) {
        if (path.indexOf(GAssetImpl._unpackPaths[i]) != INVALID_VALUE) {
          sp["__unpack"] = true;
          break;
        }
      }
    }
  }

  /** 图集进动态图集规则 */
  public static checkAtlasDyPack(path: string, atls: cc.SpriteAtlas) {
    if (GAssetImpl._unpackPaths && !atls["__unpack"]) {
      for (let i = 0, l = GAssetImpl._unpackPaths.length; i < l; i++) {
        if (path.indexOf(GAssetImpl._unpackPaths[i]) != INVALID_VALUE) {
          atls["__unpack"] = true;
          for (
            let i = 0, s = atls.getSpriteFrames(), l = s.length;
            i < l;
            i++
          ) {
            s[i]["__unpack"] = true;
          }
          break;
        }
      }
    }
  }

  /**
   * return loader.textureRes.A.B.C
   * @param keyLinks "A.B.C"
   */
  public static routeConvert(keyLinks: string) {
    if (keyLinks && keyLinks.indexOf("/") == INVALID_VALUE) {
      let keys = keyLinks.split(".");
      let res = Res.texture;
      for (let i = 0; i < keys.length; i++) {
        if (!res) break;
        res = res[keys[i]];
      }
      if (typeof res == "string") {
        return res;
      }
    }
    return keyLinks;
  }

  /** 转成实际的url,精确到是否为i18n */
  public static realUrl(url: string): string {
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

    let uuid = null;
    cc.assetManager.bundles.forEach((bundle) => {
      let item = bundle.getInfoWithPath(url);
      if (item) {
        uuid = item.uuid;
      }
    });
    if (uuid) {
      return uuid;
    } else {
      return url;
    }
  }

  /** 不带i18n的资源索引（也就是说，实际引用中，i18n目录下的资源和非i18n下的资源，默认无交集） */
  protected _tempAssts: SetWrap<string>;
  protected _refKey: string;

  private __nRef: number = 0;

  constructor(refKey: string) {
    this._refKey = refKey;
    this.__nRef = 0;
    this._tempAssts = new SetWrap();
  }

  public retain() {
    this.__nRef++;
  }

  public release() {
    this.__nRef--;
    if (this.__nRef == 0) {
      GAssetImpl.loader.popAssetImp(this._refKey, this);
    }
  }

  public get refCount() {
    return this.__nRef;
  }

  public preLoads(
    loadCallBack: {
      (
        cur: number,
        count: number,
        path: string,
        err: Error,
        asset: typeof cc.Asset
      ): void;
    },
    ...assetInfos: AssetInfo[]
  ) {
    var count = assetInfos.length;
    var index = 0;
    assetInfos.forEach((assetInfo) => {
      let path = GAssetImpl.realUrl(assetInfo.path);
      if (!path) {
        loadCallBack(
          ++index,
          count,
          assetInfo.path,
          new Error("not uuid!"),
          null
        );
        return;
      }
      this._tempAssts.add(path);
      GAssetImpl.loader.loadRes(
        path,
        assetInfo.type,
        (err: Error, asset) => {
          if (assetInfo.type == cc.SpriteAtlas && asset) {
            let atlas = asset as cc.SpriteAtlas;
            this.loadAtlasTexture(atlas, () => {
              if (loadCallBack) {
                loadCallBack(++index, count, path, err, asset);
              }
            });
            return;
          }
          if (loadCallBack) {
            loadCallBack(++index, count, path, err, asset);
          }
        },
        this._refKey
      );
    });
  }

  /**
   * 获取预加载资源
   * @param path 文件名
   */
  public getPreLoadAsset<T extends cc.Asset>(path: string): T {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    let asset = GAssetImpl.loader.getRes(path, null, this._refKey);
    return asset as T;
  }

  /**
   * 检测是否预加载资源
   * @param path 文件名
   */
  public hasPreLoadAsset(path: string) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    return GAssetImpl.loader.hasRes(path);
  }

  public releaseAsset(path: string) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.delete(path);
    GAssetImpl.loader.releaseRes(path, this._refKey);
  }

  /**
   * 加载SpriteFrame
   * @param sprite 精灵对象
   * @param path 资源路径
   * @param reSize 是否自动大小： false: 保持原来资源大小， true: 跟随sprite自身的设置
   */
  public spriteFrame(
    sprite: cc.Sprite | MaskSprite,
    path: string,
    callback?: any
  ): void {
    if (!sprite || !path) return;
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    let func = function (err: Error, sp: cc.SpriteFrame) {
      if (err) {
        cc.warn(err.message);
        sprite.spriteFrame = null;
        return;
      }
      if (!sprite.node || !sprite.node.isValid) {
        cc.warn("the sprite.node is destory");
        return;
      }
      if (sprite["_curloadAssetPath"] != path) return;
      GAssetImpl.checkDyPack(path, sp);

      // 表示这个是自定义裁切
      if (sprite["_maskType"] != null && sprite["_maskType"] < 3) {
        let maskInfo =
          GAssetImpl._assetMaskInfo[path] || GAssetImpl.Default_MASK_SPRITE;
        let mp = sprite as MaskSprite;
        let maskType = null;
        if (typeof callback == "number") {
          // 遮罩类型
        }
        mp.setSprite(
          sp,
          maskType,
          maskInfo.c,
          maskInfo.r,
          maskInfo.min,
          maskInfo.max
        );
      } else {
        sprite.spriteFrame = sp;
      }
      if (callback) {
        if (typeof callback == "boolean") {
          if (callback)
            (sprite as cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
          return;
        }
        callback(sprite);
      }
    }.bind(this);
    sprite["_curloadAssetPath"] = path;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(path, cc.SpriteFrame, func, this._refKey);
  }
  public spriteFrameByResources(sprite: cc.Sprite, path: string, cb?: any) {
    cc.resources.load(
      path,
      cc.SpriteFrame,
      (err: Error, spriteFrame: cc.SpriteFrame) => {
        if (err) {
          cc.error(err);
        } else {
          sprite.spriteFrame = spriteFrame;
          if (cb) {
            cb(err, spriteFrame);
          }
        }
      }
    );
  }
  public spriteFrameAsset(path: string, cb: { (sp: cc.SpriteFrame): void }) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    GAssetImpl.loader.loadRes(
      path,
      cc.SpriteFrame,
      (err, asset) => {
        if (err) {
          cc.warn(err.message);
          return;
        }

        GAssetImpl.checkDyPack(path, asset);

        cb && cb(asset);
      },
      this._refKey
    );
  }

  /**
   * 获取图集
   * @param path
   * @param callback
   */
  public spriteAtlas(path: string, callback: any) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(
      path,
      cc.SpriteAtlas,
      (err, atlas) => {
        GAssetImpl.checkAtlasDyPack(path, atlas);
        this.loadAtlasTexture(atlas, () => {
          callback && callback(atlas);
        });
      },
      this._refKey
    );
  }

  public loadAtlasTexture(atlas: cc.SpriteAtlas, cb) {
    let texture = atlas.getTexture();
    if (!texture) {
      let frames = atlas.getSpriteFrames();
      texture = frames.length > 0 ? frames[0].getTexture() : null;
    }
    if (!texture) return cb && cb();
    if (!texture.loaded) {
      texture.once(
        "load",
        () => {
          cb && cb();
        },
        this
      );
      cc["textureUtil"].postLoadTexture(texture);
      return;
    } else {
      cb && cb();
    }
  }

  public font(path: string, callback: any) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(path, cc.TTFFont, (err, font) => {
      if (err) {
        cc.warn(err.message);
        return;
      }
      callback && callback(font);
    });
  }

  /**
   * 获取图集中的图源
   * @param path 路径
   * @param callback 毁掉
   */
  public spriteAtlasFrame(
    sprite: cc.Sprite,
    path: string,
    item: string,
    callback?: any
  ): void {
    if (!sprite || !path) return;
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    let func = function (err: Error, atlas: cc.SpriteAtlas) {
      if (err) {
        cc.warn(err.message);
        sprite.spriteFrame = null;
        return;
      }
      // ColorLog.log({ path });
      if (!sprite.isValid) return;
      if (sprite["_curloadAssetPath"] != path + "." + item) return;
      GAssetImpl.checkAtlasDyPack(path, atlas);
      sprite.spriteFrame = atlas.getSpriteFrame(item);
      if (CC_DEV && !sprite.spriteFrame) {
        cc.warn(
          "can't find atlas frame asset by path = " +
            path +
            " sub name = " +
            item
        );
      }
      if (callback) {
        if (typeof callback == "boolean") {
          if (callback) sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          return;
        }
        callback(sprite);
      }
    }.bind(this);
    sprite["_curloadAssetPath"] = path + "." + item;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(path, cc.SpriteAtlas, func, this._refKey);
  }

  public json(path: string, callBack: any, destory: boolean = true): void {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    GAssetImpl.loader.loadRes(
      path,
      cc.JsonAsset,
      (err, asset) => {
        callBack(err, asset);
        if (!err && destory) {
          this.releaseAsset(path);
        }
      },
      this._refKey
    );
  }

  /**
   * 获取预制件资源
   * @param path 路径
   * @param callback 毁掉
   */
  public prefab(path: string, callback: { (prefab: cc.Prefab): void }) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(
      path,
      cc.Prefab,
      (err: Error, prefab: cc.Prefab) => {
        if (err) {
          cc.error(err.message);
          return;
        }
        if (callback) callback(prefab);
      },
      this._refKey
    );
  }

  public material(path: string, callback: { (material: cc.Material): void }) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(
      path,
      cc.Material,
      (err: Error, material: cc.Material) => {
        if (err) {
          cc.error(err.message);
          return;
        }
        if (callback) callback(material);
      },
      this._refKey
    );
  }

  public spine(path: string, callback: any) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    this._tempAssts.add(path);
    GAssetImpl.loader.loadRes(
      path,
      sp.SkeletonData,
      (err, res) => {
        if (err) {
          cc.error(err.message);
          return;
        }
        if (callback) callback(res);
      },
      this._refKey
    );
  }

  /**加载龙骨动画 */
  public dragonBones(
    path: string,
    callback: {
      (
        dragonAsset: dragonBones.DragonBonesAsset,
        dragonAtlas: dragonBones.DragonBonesAtlasAsset
      ): void;
    }
  ) {
    let path1 = GAssetImpl.realUrl(path + "ske");
    let path2 = GAssetImpl.realUrl(path + "tex");
    if (!path2 || !path1) return;
    this._tempAssts.add(path1);
    GAssetImpl.loader.loadRes(
      path1,
      dragonBones.DragonBonesAsset,
      (err, res) => {
        if (err) {
          cc.error(err.message);
          return;
        }
        let bonesAsset = res;
        this._tempAssts.add(path2);
        GAssetImpl.loader.loadRes(
          path2,
          dragonBones.DragonBonesAtlasAsset,
          (err, res) => {
            if (err) {
              cc.error(err.message);
              return;
            }
            if (callback) callback(bonesAsset, res);
          },
          this._refKey
        );
      },
      this._refKey
    );
  }

  public audioClip(path: string, callback: any) {
    path = GAssetImpl.realUrl(path);
    if (!path) return;
    GAssetImpl.loader.loadRes(
      path,
      cc.AudioClip,
      (err, res) => {
        if (err) {
          cc.error(err.message);
          return;
        }
        if (callback) callback(res);
      },
      this._refKey
    );
  }

  public destroy() {
    let assets = this._tempAssts.toArray();
    for (let i = assets.length - 1; i >= 0; i--) {
      this.releaseAsset(assets[i]);
    }
    this._tempAssts.clear();
    this._tempAssts = null;
    this.__nRef = null;
  }

  /** 标记一下当前加载的资源释放 */
  public tagReleaseTempAssets() {
    if (this.__nRef > 1) {
      resLog("There are at least 2 references to the resource loader!");
    }
    let assets = this._tempAssts.toArray();
    for (let i = assets.length - 1; i >= 0; i--) {
      this.releaseAsset(assets[i]);
    }
    this._tempAssts.clear();
  }

  ///////////////////////////////////////////////////////////////////////////// Logic Function //////////////////////////////////////////////////////////////////////

  public addGChild<T>(path: string | cc.Prefab, cb?: { (comp: T): void }): T {
    let gchild;
    if (typeof path == "string") {
      this.prefab(path, (asset: cc.Prefab) => {
        let node = cc.instantiate(asset);
        gchild = node.getComponent("GChild");
        if (cb) cb(gchild);
      });
    } else {
      let node = cc.instantiate(path);
      gchild = node.getComponent("GChild");
      if (cb) cb(gchild);
    }

    return gchild;
  }

  /**
   *
   * @param path
   * @param cb
   * @param configs
   */
  public loadJXAniClips(
    path: string,
    cb: AnimationClipsCallBack,
    ...configs: AnimationConfigure[]
  ) {
    let clips: cc.AnimationClip[] = [];
    let clipNames = [];
    let createClip = (
      path: string,
      clipName: string,
      frames: cc.SpriteFrame[]
    ) => {
      let clip = cc.AnimationClip.createWithSpriteFrames(frames as any, 10);
      clip.name = clipName;
      clip.wrapMode = cc.WrapMode.Normal;
      clips.push(clip);
      clipNames.push(clipName);
    };

    this.spriteAtlas(path, (atlas: cc.SpriteAtlas) => {
      if (!atlas) return;
      GAssetImpl.checkAtlasDyPack(path, atlas);
      for (let i = 0; i < configs.length; i++) {
        let config = configs[i];
        config.minIdx = config.minIdx || 0;
        config.maxIdx = config.maxIdx || 1000;
        let frames = [];
        for (let j = config.minIdx; j <= config.maxIdx; j++) {
          let frameName =
            config.prefix + MathEx.prefixInteger(j, config.numberFix);
          let frame = atlas.getSpriteFrame(frameName);
          if (!frame && j != 0) break;
          frames.push(frame);
        }
        if (frames[0] == null) frames.splice(0, 1);
        createClip(path, config.aniName, frames);
      }
      cb(clips);
    });
  }

  public atlasJXLoadClips(
    atlas: cc.SpriteAtlas,
    ...configs: AnimationConfigure[]
  ): cc.AnimationClip[] {
    let clips: cc.AnimationClip[] = [];
    let clipNames = [];
    let createClip = (clipName: string, frames: cc.SpriteFrame[]) => {
      let clip = cc.AnimationClip.createWithSpriteFrames(frames as any, 10);
      clip.name = clipName;
      clip.wrapMode = cc.WrapMode.Normal;
      clips.push(clip);
      clipNames.push(clipName);
    };

    if (!atlas) return;
    for (let i = 0; i < configs.length; i++) {
      let config = configs[i];
      config.minIdx = config.minIdx || 0;
      config.maxIdx = config.maxIdx || 1000;
      let frames = [];
      for (let j = config.minIdx; j <= config.maxIdx; j++) {
        let frameName =
          config.prefix + MathEx.prefixInteger(j, config.numberFix);
        let frame = atlas.getSpriteFrame(frameName);
        if (!frame && j != 0) break;
        frames.push(frame);
      }
      if (frames[0] == null) frames.splice(0, 1);
      if (frames.length > 0) createClip(config.aniName, frames);
    }
    return clips;
  }

  public loadJXAniClip(
    path: string,
    aniName: string,
    prefix: string,
    numberFix: number,
    cb: AnimationChipCallBack
  ) {
    GLoader.spriteAtlas(path, (atlas: cc.SpriteAtlas) => {
      if (!atlas) return;
      let clipFrames: cc.SpriteFrame[] = [];
      for (let i = 0; i < 1000; i++) {
        let frameName = prefix + MathEx.prefixInteger(i, numberFix);
        let frame = atlas.getSpriteFrame(frameName);
        if (!frame && i != 0) break;
        clipFrames.push(frame);
      }
      if (!clipFrames[0]) clipFrames.splice(0, 1);
      let clip = cc.AnimationClip.createWithSpriteFrames(clipFrames as any, 10);
      clip.name = aniName;
      clip.wrapMode = cc.WrapMode.Normal;
      cb(clip);
    });
  }
}

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

export class GAssetsAsyncHanlder extends ObjectWrap {
  /** 加载状态 */
  public static STATE = {
    /** 无状态 */
    Null: 0,
    /** 加载中 */
    Loading: 1,
    /** 已完成 */
    Completed: 2,
    /** 出错了 */
    Error: 3,
  };

  /** 资源加载对象 */
  protected _apl: GAssetImpl = null;
  /** 加载状态 */
  protected _state: number = GAssetsAsyncHanlder.STATE.Null;
  /** 等待加载的资源 */
  protected _assets: AssetInfo[];
  /** 加载完成回调 */
  protected _resultCallBacks: Array<{ (state: number): void }> = [];

  constructor(apl: GAssetImpl, ...assets: AssetInfo[]) {
    super();
    this._apl = apl;
    this._assets = assets;
  }

  /** 加载资源 */
  public load() {
    if (this._state != GAssetsAsyncHanlder.STATE.Null) return;
    if (this._assets.length == 0) {
      cc.warn("GassetAsyncHandler assets.length == 0!");
      return;
    }
    this._apl.preLoads((cur, count, path, err, assets) => {
      let func = err ? cc.warn : cc.log;
      func(
        `加载资源中，当前进度${cur}/${count},加载资源路径：${path}，状态 ${
          err ? "加载失败" : "加载成功"
        }`
      );
      if (err) {
        this._state = GAssetsAsyncHanlder.STATE.Error;
        return this.endCallbacks();
      }
      if (cur == count) {
        this._state = GAssetsAsyncHanlder.STATE.Completed;
        return this.endCallbacks();
      }
    }, ...this._assets);
    return this;
  }

  /** 等待资源加载完成回调 */
  public work(cb: { (state: number): void }) {
    if (
      this._state == GAssetsAsyncHanlder.STATE.Completed ||
      this._state == GAssetsAsyncHanlder.STATE.Error
    ) {
      return cb(this._state);
    }
    this._resultCallBacks.push(cb);
    if (this._state == GAssetsAsyncHanlder.STATE.Null) {
      this.load();
    }
    return this;
  }

  /**
   * endCallback
   */
  protected endCallbacks() {
    while (this._resultCallBacks.length > 0) {
      let callBack = this._resultCallBacks.shift();
      callBack(this._state);
    }
  }
}

export const GLoader = GAssetImpl.getAssetImpl("GLOBAL-ASSETIMPL");

if (CC_DEV) {
  window["ResContrl"] = GAssetImpl.loader;
}
