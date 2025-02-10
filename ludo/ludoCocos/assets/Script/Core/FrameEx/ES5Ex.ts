import { StringOrNumber } from "../../../../d.ts/game/JXCLBtl";

export class ObjectWrap {
  protected static SGenWrapId: number = 0;
  public wrapId: number;
  constructor() {
    this.wrapId = ObjectWrap.SGenWrapId++;
  }

  public equal(b: ObjectWrap) {
    return this.wrapId == b.wrapId;
  }
}

export class MapWrap<K extends StringOrNumber, V> extends ObjectWrap {
  protected _objects;
  protected _size = 0;

  constructor(array?: Array<[K, V]>) {
    super();
    this._objects = cc.js.createMap(true);
    this._size = 0;
    if (array) {
      for (let i = 0; i < array.length; i++) {
        this.set(array[i][0], array[i][1]);
      }
    }
  }

  public set size(size) {
    this._size = size;
  }

  public set objects(objects) {
    this._objects = objects;
  }

  public get size(): number {
    return this._size;
  }

  public clear(): void {
    this._objects = cc.js.createMap(true);
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

  public values<V>(): V[] {
    let keys = this.keys();
    let values = [];
    keys.forEach((key) => {
      values.push(this.get(key));
    });
    return values;
  }

  public toArray(isNumberKey?: boolean): Array<[K, V]> {
    let rets = [];
    let keys = this.keys();
    keys.forEach((key) => {
      rets.push([!isNumberKey ? key : parseInt(key as any), this.get(key)]);
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

export class SetWrap<K extends StringOrNumber> extends ObjectWrap {
  protected sets: Array<K>;

  constructor() {
    super();
    this.sets = new Array<K>();
  }

  public get size(): number {
    return this.sets.length;
  }

  public has(key: K): boolean {
    return this.sets.indexOf(key) > -1;
  }

  public add(key: K) {
    if (this.has(key)) return;
    this.sets.push(key);
  }

  public delete(keyOrValue: K) {
    let index = this.sets.indexOf(keyOrValue);
    if (index != -1) {
      this.sets.splice(index, 1);
    }
  }

  public clear() {
    this.sets.length = 0;
  }

  toArray(): Array<K> {
    return this.sets;
  }
}

export function NewFillArray<T>(len: number, fill?: T): Array<T> {
  let ret = [];
  for (let i = 0; i < len; i++) {
    ret.push(fill == null ? 0 : fill);
  }
  return ret;
}

export function debounce(func: any, wait: number, immediate?: boolean) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function ObjectWrapArray<T extends ObjectWrap>(): T[] {
  let array = new Array<T>();
  array["prototype"].indexOf = function (elem, fromi) {
    fromi = fromi || 0; //默认值
    //this->将来调用indexOf的.前的子对象
    var arr = this;
    for (var i = fromi; i < arr.length; i++) {
      if (arr[i].wrapId === elem.wrapId) return i;
    }
    return -1;
  };
  return array;
}
