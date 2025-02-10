export default class GCustomData extends cc.Component {
  protected _customData: any = null;
  onLoad() {}

  public setData(data) {
    this._customData = data;
  }

  public getData<T>(): T {
    return this._customData as T;
  }
}
