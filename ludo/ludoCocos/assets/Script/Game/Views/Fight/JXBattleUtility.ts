import { JXBtlPs } from "./JXULDefine";

var NonUuidMark = ".";

export class JXIdGenerater {
  protected _id: number;
  protected _prefix: string;
  constructor(category) {
    this._id = 0 | (Math.random() * 998);
    this._prefix = category ? category + NonUuidMark : "";
  }

  getNewId() {
    return this._prefix + ++this._id;
  }

  getOffsetId(offset: number) {
    return this._prefix + (this._id + offset);
  }
}

export class JXBattleUtility {
  /** buff uuid */
  public static BuffIdGtor = new JXIdGenerater("JXBf");
  /** 技能组ID */
  public static EffectGRoupGtor = new JXIdGenerater("JXEC");
  /** 环境索引ID */
  public static AmbientGtor = new JXIdGenerater("JXAb");

  /** 判断是否是数值 */
  public static isNumber(obj: any): boolean {
    return typeof obj === "number" || obj instanceof Number;
  }

  /** 快速移除数组中的元素，无序的 */
  public static fastRemove(arr: Array<any>, el: any): boolean {
    let index = arr.indexOf(el);
    if (index == JXBtlPs.Invalid) return false;
    if (index >= arr.length) {
      return false;
    } else {
      arr[index] = arr[arr.length - 1];
      arr.pop();
    }
    return true;
  }

  public static fastRemoveAt(arr: Array<any>, index: number): boolean {
    if (index == JXBtlPs.Invalid) return false;
    if (index >= arr.length) {
      return false;
    } else {
      arr[index] = arr[arr.length - 1];
      arr.pop();
    }
    return true;
  }

  /** 移除数组中的某个元素，有序的 */
  public static remove(arr: Array<any>, el: any): boolean {
    let index = arr.indexOf(el);
    if (index == JXBtlPs.Invalid) return false;
    arr.splice(index, 1);
    return true;
  }

  /** 任意加法数据或者数值 */
  public static computePropts(src, dest) {
    if (typeof src == "number") {
      dest = dest || 0;
      return dest + src;
    } else {
      dest = dest || [];
      for (let i = 0; i < src.length; i++) {
        dest[i] = dest[i] || 0;
        dest[i] = dest[i] + src[i];
      }
      return dest;
    }
  }

  /** 数组加法 [a1,b1,c1...] + [a2,b2,c3...] = [a1+b1,....]  */
  public static addToPropts(src: number[], dest: number[]) {
    if (!src || !src.length) return;
    for (let i = 0; i < src.length; i++) {
      if (!src[i]) continue;
      dest[i] = dest[i] || 0;
      dest[i] = dest[i] + src[i];
    }
  }

  /** 数组减法，同上 */
  public static subToPropts(src: number[], dest: number) {
    for (let i = 0; i < src.length; i++) {
      if (!src[i]) continue;
      if (!dest[i]) continue;
      dest[i] = dest[i] + src[i];
    }
  }

  /** 深度拷贝一份数组 */
  public static copyArray(arr: Array<number>): Array<number> {
    let ret = [];
    for (let i = 0; i < arr.length; i++) {
      ret[i] = arr[i];
    }
    return ret;
  }

  /** 数值限定 min < value < max */
  public static clamp(
    value: number,
    min_inclusive: number,
    max_inclusive: number
  ): number {
    if (min_inclusive > max_inclusive) {
      var temp = min_inclusive;
      min_inclusive = max_inclusive;
      max_inclusive = temp;
    }
    return value < min_inclusive
      ? min_inclusive
      : value < max_inclusive
      ? value
      : max_inclusive;
  }

  /** 不可为负数 */
  public static minZero(value: number): number {
    return Math.max(0, value);
  }
}

declare type StringOrNumber = string | number;
export class JXBattleMap<K extends StringOrNumber, V> {
  // protected _array: Array<{key: K, value: V}>;
  protected _objects;
  protected _size = 0;

  constructor() {
    // this._array = new Array<{key: K, value: V}>();
    this._objects = Object.create(null);
    this._size = 0;
  }

  public get size(): number {
    return this._size;
  }

  public clear(): void {
    this._objects = Object.create(null);
    this._size = 0;
  }

  public has(key: K): boolean {
    return (key as any) in this._objects;
  }

  public set(key: K, value: V): void {
    if (!this.has(key)) {
      this._size++;
    }
    this._objects[key] = value;
  }

  public get(key: K): V {
    if (!this.has(key)) return null;
    return this._objects[key];
  }

  public delete(key: K): void {
    if (this.has(key)) {
      delete this._objects[key];
      this._size--;
    }
  }

  public keys(): K[] {
    let keys = Object.keys(this._objects);
    return keys as any;
  }

  public values(): V[] {
    let keys = this.keys();
    let values = [];
    keys.forEach((key) => {
      values.push(this.get(key));
    });
    return values;
  }

  public toArray(): Array<[K, V]> {
    let rets = [];
    let keys = this.keys();
    keys.forEach((key) => {
      rets.push([key, this.get(key)]);
    });
    return rets;
  }

  public forEach<T>(callBack: { (value: V, key: K): T }): T {
    let keys = this.keys();
    for (let i = 0; i < keys.length; i++) {
      let result = callBack(this._objects[keys[i]], keys[i]);
      if (!!result) return result;
    }
  }

  public rforEach<T>(callBack: { (value: V, key: K): T }): T {
    let keys = this.keys();
    for (let i = keys.length - 1; i >= 0; i--) {
      let result = callBack(this._objects[keys[i]], keys[i]);
      if (!!result) return result;
    }
  }
}

/** 回合定时器 */
export class JXRoundTimer {
  /** 当前计数 */
  protected _nCur: number;
  /** 需求计数 */
  protected _nTotal: number;
  /** 结束回调 */
  protected _endCb: any;
  protected _lifeCb: any;

  /** 增加上限 */
  public addTotalTimes(nAdd: number) {
    this._nTotal += nAdd;
  }

  public get nLife(): number {
    return this._nCur;
  }

  public get nTotal(): number {
    return this._nTotal;
  }

  constructor(nWait: number, endCb?: any, lifeCb?: any) {
    this._nCur = 0;
    this._nTotal = nWait;
    this._endCb = endCb;
  }

  /** 执行生命周期 */
  public life() {
    this._nCur++;
    if (this._nCur >= this._nTotal) {
      this._endCb && this._endCb();
    }
  }

  public destroy() {
    this._nCur = null;
    this._nTotal = null;
    this._endCb = null;
  }
}
