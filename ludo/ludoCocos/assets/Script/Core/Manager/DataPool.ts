import { Res } from "../../Game/Common/UIResources";
import { GDataRaw } from "../../Game/Guide/Guide.type";
import { INVALID_VALUE, OBJECT_COPY } from "../CoreDefine";
import { MapWrap } from "../FrameEx/ES5Ex";
import { GCtrl } from "../GCtrl";
import { GAssetImpl } from "../GLoader/GLoader";

/**
 * 数据池
 */

var unLoadGetRawErr = {
  getRaw: function () {
    console.log(
      "%c" + "GetRaw Error! may the data configure unload.",
      "color:red"
    );
    return null;
  },
} as any;

export class GData extends cc.Component {
  public clear(): boolean {
    return true;
  }
}

export class GStatic extends GData {
  protected _data: MapWrap<
    number | string,
    GDataRaw | MapWrap<number | string, GDataRaw> | Array<GDataRaw>
  > = new MapWrap<
    number | string,
    GDataRaw | MapWrap<number | string, GDataRaw> | Array<GDataRaw>
  >();
  public parse(obj: any): boolean {
    if (!obj) return false;

    return true;
  }

  public get data(): MapWrap<
    number | string,
    GDataRaw | MapWrap<number | string, GDataRaw> | Array<GDataRaw>
  > {
    return this._data;
  }
  public get size(): number {
    return this._data.size;
  }
  public getRaw<
    T extends GDataRaw | MapWrap<number | string, GDataRaw> | Array<GDataRaw>
  >(key: string | number): T {
    let raw = this._data.get(key) as T;
    if (CC_DEBUG || CC_DEV) {
      if (!raw) {
        cc.warn(
          `can't find raw by key = ${key} in static table ${cc.js.getClassName(
            this
          )}.`
        );
      }
    }
    return OBJECT_COPY(raw);
  }

  public tryGetRaw<
    T extends GDataRaw | MapWrap<number | string, GDataRaw> | Array<GDataRaw>
  >(key: string | number): T {
    return this._data.get(key) as T;
  }

  public getComRaw<T extends GDataRaw>(
    keyMain: string | number,
    keySub: string | number
  ): GDataRaw {
    let mainRaw = this._data.get(keyMain) as MapWrap<number | string, GDataRaw>;
    return mainRaw.get(keySub) as T;
  }

  public hasRaw(key: string | number): boolean {
    return this._data.has(key);
  }

  public clear(): boolean {
    let keys = [];
    this._data.forEach((value, key) => {
      keys.push(key);
    });

    for (let i = 0; i < keys.length; i++) {
      if (this._data.has(keys[i])) this._data.delete(keys[i]);
    }
    this._data.clear();
    return true;
  }

  public static addonRaw<T>(objRaw: any): T {
    return objRaw;
  }
}

export abstract class GRunTime extends GData {
  public abstract onInit(): void;
  public clear(): boolean {
    GCtrl.ES.off(this);
    return true;
  }
}

export abstract class GLocal extends GData {
  public abstract $localKey: string;
  public abstract onInit(): void;
  public set() {
    let obj = cc.js.createMap(true);
    for (let key in this) {
      if (key.indexOf("$") != INVALID_VALUE) {
        obj[key] = this[key];
      }
    }
    cc.sys.localStorage.setItem(this.$localKey, JSON.stringify(obj));
  }

  public remove() {
    cc.sys.localStorage.removeItem(this.$localKey);
    this.unscheduleAllCallbacks();
    GCtrl.ES.off(this);
  }

  public load() {
    let obj = cc.sys.localStorage.getItem(this.$localKey);
    if (obj) {
      cc.js.mixin(this, JSON.parse(obj));
    }
  }
}

export class DataPool {
  private static _instance: DataPool = null;

  public static __enNames: string[];
  public static __enCloums: { [tableIdx: number]: { [char: string]: string } };

  public static ins(): DataPool {
    if (!this._instance) {
      this._instance = new DataPool();
    }
    return this._instance;
  }

  constructor() {
    this.spools.clear();
    this.rpools.clear();
  }

  private spools: MapWrap<string, GStatic> = new MapWrap<string, GStatic>();
  private rpools: MapWrap<string, GRunTime> = new MapWrap<string, GRunTime>();
  private lpools: MapWrap<string, GLocal> = new MapWrap<string, GLocal>();

  public getStatic<T extends GStatic>(type: { new (): T }): T {
    let className = cc.js.getClassName(type);
    let pool = this.spools.get(className) as T;
    if (!pool) {
      cc.log(
        "GStatic Data: '" +
          className +
          "' don't init, it where return a fix object with function getRaw!"
      );
      return unLoadGetRawErr;
    }
    return pool;
  }

  public getRunTime<T extends GRunTime>(type: { new (): T }): T {
    let className = cc.js.getClassName(type);
    let pool = this.rpools.get(className) as T;
    if (!pool) {
      pool = new type();
      pool.onInit();
      this.rpools.set(className, pool);
    }
    return pool;
  }

  public getLocal<T extends GLocal>(type: { new (): T }): T {
    let className = cc.js.getClassName(type);
    let pool = this.lpools.get(className) as T;
    if (!pool) {
      pool = new type();
      pool.onInit();
      this.lpools.set(className, pool);
    }
    return pool;
  }

  public clearStatic<T extends GStatic>(type: { new (): T }): void {
    let className = cc.js.getClassName(type);
    let pool = this.spools.get(className) as T;
    if (!pool) return;
    pool.clear();
    this.spools.delete(className);
    pool = null;
  }

  public clearRunTime<T extends GRunTime>(type: { new (): T }): void {
    let className = cc.js.getClassName(type);
    let pool = this.rpools.get(className) as T;
    if (!pool) return;
    pool.clear();
    this.rpools.delete(className);
    pool = null;
  }

  public clearStatics() {
    this.spools.forEach((k, v) => {
      let poolFunc = cc.js.getClassByName(v);
      this.clearRunTime(poolFunc as any);
    });
  }

  public clearRunTimes() {
    this.rpools.forEach((k, v) => {
      let poolFunc = cc.js.getClassByName(v);
      this.clearRunTime(poolFunc as any);
    });
  }
  public clearLocals() {
    this.lpools.forEach((k, v) => {
      let poolFunc = cc.js.getClassByName(v);
      this.clearLocal(poolFunc as any);
    });
  }
  public clearLocal<T extends GLocal>(type: { new (): T }): void {
    let className = cc.js.getClassName(type);
    let pool = this.lpools.get(className) as T;
    if (!pool) return;
    pool.remove();
    this.lpools.delete(className);
    pool = null;
  }

  protected createStaticPool(className: string, json: any) {
    if (className.indexOf("SMulLangugeData") != INVALID_VALUE) {
      className = "SMulLangugeData";
    }
    let constructor = cc.js.getClassByName(className) as any;
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
    let pool = this.spools.get(className);
    if (!pool) {
      pool = new constructor() as GStatic;
      this.spools.set(className, pool);
    }
    pool.parse(json);
  }

  public cvtTbn2Clsn(tableName: string): string {
    return (
      "S" +
      tableName[0].toUpperCase() +
      tableName.substring(1, tableName.length)
    );
  }

  /** 加载单张静态表 */
  public loadRTStatic(fileName: string, cb: any = null) {
    // let wdStatics = window.wdStatics;
    let loadFunc;
    console.log({ fileName });
    // if (CC_DEV) {
    // loadFunc = cc.loader.loadRes.bind(cc.loader);
    loadFunc = GAssetImpl.loader.loadRes.bind(GAssetImpl.loader);
    // }
    // else {
    //     loadFunc = cc.loader.load.bind(cc.loader);
    // }

    let cdnPrefix = window["cdnPrifix"] || "";

    let decodeTable = (tableData) => {
      if (!!DataPool.__enNames) {
        let tableName = DataPool.__enNames[tableData._id];
        tableData._name = tableName;
        let enData = tableData.data;
        let data = (tableData.data = []);
        let cloums = DataPool.__enCloums[tableData._id];
        let keys = Object.keys(cloums);
        for (let i = 0; i < tableData._length; i++) {
          let raw = (data[i] = {});
          for (let j = 0; j < keys.length; j++) {
            raw[cloums[keys[j]]] = enData[keys[j]][i];
          }
        }
      }
    };

    let pathArr = Res.data.data.split("/");
    pathArr.splice(0, 1);
    pathArr.concat();
    loadFunc(
      Res.data.data + fileName,
      cc.JsonAsset,
      (err: Error, asset: cc.JsonAsset) => {
        if (err) {
          cc.error("can't find statis file" + fileName);
          return;
        }

        if (asset["__merges"]) {
          let tableDatas = asset["__datas"];
          for (let i = 0; i < tableDatas.length; i++) {
            let tableData = tableDatas[i].json;
            decodeTable(tableData);
            let tableName = tableData._name;
            let className = this.cvtTbn2Clsn(tableName);
            this.createStaticPool(className, tableData);
          }
        } else {
          let tableData = asset.json;
          decodeTable(tableData);
          let tableName = tableData._name;
          let className = this.cvtTbn2Clsn(tableName);
          this.createStaticPool(className, tableData);
        }
        // cc.loader.release(asset);
        cc.assetManager.releaseAsset(asset);
        cb && cb(fileName);
      }
    );
  }

  /** 加载静态表集群 */
  public loadRTStatics(
    fileNames: string[],
    processCb: any = null,
    completeCb: any = null
  ) {
    let size = fileNames.length;
    let index = 0;
    if (size > 0) {
      for (let i = 0; i < fileNames.length; i++) {
        if (window.wdStatics.loadStatus[fileNames[i]]) {
          index++;
          index == size && completeCb && completeCb();
          continue;
        }
        this.loadRTStatic(fileNames[i], (fileName: string) => {
          index++;
          processCb && processCb(fileName, index, size);
          index == size && completeCb && completeCb();
        });
      }
    } else {
      completeCb && completeCb();
    }
  }
}
