import { ObjectWrap, MapWrap } from "../FrameEx/ES5Ex";
export default class GParam extends ObjectWrap {
  private arguments: MapWrap<string, Object> = new MapWrap<string, Object>();

  private _onlyArgument;
  constructor(msg?: any) {
    super();
    this._onlyArgument = msg;
  }

  public push(key: string, val: Object) {
    if (!key) return;
    this.arguments.set(key, val);
  }

  /**
   * 获取参数
   * @param key 参数Key
   */
  public get<T>(key?: string): T {
    if (!key) return this._onlyArgument as T;
    return this.arguments.get(key) as T;
  }

  /**
   * 清理
   */
  public clear(): void {
    this.arguments.clear();
  }

  /**
   * 将参数转成Array
   */
  public toList(): Object[] {
    if (this.arguments.size == 0) return null;
    return this.arguments.values();
  }

  /**
   * ToString实现
   */
  public toString(): string {
    let keys = this.arguments.keys();
    var str = "";
    for (let index = 0; index < keys.length; index++) {
      str += keys[index] + "=" + this.get(keys[index]) + "/t";
    }
    return str;
  }
}
