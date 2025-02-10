/**
 * @name GEventSystem.ts
 * @author  Visow
 * @description 事件派发系统
 * @class GEventSystem
 */
const Default_PRIORITY = 99999; // 默认优先级, 数值越大，级别越低

import { MapWrap, ObjectWrap } from "../FrameEx/ES5Ex";

declare type EventObject = ObjectWrap | cc.Node | cc.Component;

export interface GCallBack {
  target?: Object;
  handler?: any; // 事件触发函数，需要bind上下文，目的是为了解耦函数对象和注册对象。
  msgID?: StringOrNumber;
  priority?: number;
}

export default class GEventSystem extends ObjectWrap {
  private static _instance: GEventSystem = null;
  /**
   * 事件单例
   */
  public static ins(): GEventSystem {
    if (!this._instance) {
      this._instance = new GEventSystem();
    }
    return this._instance;
  }

  public static createNew() {
    return new GEventSystem();
  }

  /**
   * 监听消息
   * @param msgID 消息ID
   * @param obj 目标
   * @param handler 毁掉
   * @param priority 优先级
   */
  public static on(
    msgID: StringOrNumber,
    obj: EventObject,
    handler: any,
    priority?: number
  ) {
    let ins = GEventSystem.ins();
    ins.register(msgID, obj, handler, priority);
  }

  /**
   * 推送消息
   * @param msgID 消息ID
   * @param param 参数
   */
  public static emit(msgID: StringOrNumber, param?: any) {
    let ins = GEventSystem.ins();
    ins.post(msgID, param);
  }

  /**
   * 注销监听
   * @param obj 对象
   */
  public static off(obj: EventObject, msgID?: StringOrNumber) {
    let ins = GEventSystem.ins();
    ins.unRegister(obj, msgID);
  }

  // constructor() {
  //     super();
  //     if(GEventSystem._instance) {
  //         throw new Error('This single case has already existed!');
  //     }
  // }

  /***********************************************************/
  protected eventMap: MapWrap<StringOrNumber, GCallBack[]> = new MapWrap<
    StringOrNumber,
    GCallBack[]
  >(); // Map<msgKey, event Array>;
  protected _objectMap: MapWrap<StringOrNumber, EventObject> = new MapWrap<
    StringOrNumber,
    EventObject
  >(); // 对象存储容器
  protected objectMap: MapWrap<StringOrNumber, GCallBack[]> = new MapWrap<
    StringOrNumber,
    GCallBack[]
  >(); // Map<target, event Array>; 事件存储容器

  /**
   *
   * @param msgID 消息ID
   * @param obj 对象
   */
  public checkEvent(msgID: StringOrNumber, obj: EventObject): boolean {
    if (!this.eventMap.get(msgID)) return false;
    let listCallBack = this.eventMap.get(msgID);
    for (let i = 0; i < listCallBack.length; i++) {
      if (listCallBack[i].target == obj) return true;
    }
    return false;
  }

  public wrapKey(obj: EventObject): StringOrNumber {
    if (obj instanceof ObjectWrap) {
      return obj.wrapId;
    } else return obj.uuid;
  }

  /**
   * 移除某一条事件的监听
   * @param msgID 消息ID
   * @param obj 对象
   */
  public removeByEventMap(msgID: StringOrNumber, obj: EventObject): boolean {
    let listCallBack = this.eventMap.get(msgID);
    if (!listCallBack) return true;
    let callBack: GCallBack = null;
    for (var i = 0; i < listCallBack.length; i++) {
      if (listCallBack[i].target == obj) {
        callBack = listCallBack[i];
        break;
      }
    }
    if (!callBack) {
      cc.warn("Trying to remove non - existent events by events map");
      return false;
    }
    listCallBack.splice(i, 1);

    listCallBack = this.objectMap.get(this.wrapKey(obj));
    if (!listCallBack) {
      cc.warn("Trying to remove non - existent events by objects map");
      return false;
    }
    for (let j = 0; j < listCallBack.length; j++) {
      if (listCallBack[j].msgID == msgID) {
        listCallBack.splice(j, 1);
        break;
      }
    }
    return true;
  }

  /**
   * 移除对象的监听
   * @param obj 对象
   */
  public removeByObjectMap(obj: EventObject): boolean {
    let wrapKey = this.wrapKey(obj);
    let listCallBack = this.objectMap.get(wrapKey);
    if (!listCallBack) return;

    for (let i = listCallBack.length - 1; listCallBack.length > 0; i--) {
      let callBack = listCallBack[i];
      if (!this.eventMap.get(callBack.msgID)) continue;
      let events = this.eventMap.get(callBack.msgID);
      for (let j = 0; j < events.length; j++) {
        if (events[j].target == obj) {
          events.splice(j, 1);
          break;
        }
      }
      listCallBack.splice(i, 1);
    }
    this._objectMap.delete(wrapKey);
    this.objectMap.delete(wrapKey);

    return true;
  }

  /**
   * 注册消息
   * @param msgID 消息ID
   * @param obj 对象
   * @param handler 回掉函数
   * @param priority 优先级
   */
  public register(
    msgID: StringOrNumber,
    obj: EventObject,
    handler: any,
    priority?: number
  ): boolean {
    if (this.checkEvent(msgID, obj)) {
      cc.warn("the object and msgID has beed registered!" + this.wrapKey(obj));
      return false;
    }

    // push to event map;
    let callBack = {
      target: obj,
      handler: handler,
      msgID: msgID,
      priority: priority ? priority : Default_PRIORITY,
    };
    var listCallBack: GCallBack[] = null;
    listCallBack = this.eventMap.get(msgID);
    if (listCallBack == null) {
      listCallBack = new Array<GCallBack>();
      this.eventMap.set(msgID, listCallBack);
    }
    listCallBack.push(callBack);

    // sort by priority;
    listCallBack.sort((a: GCallBack, b: GCallBack) => {
      return a.priority - b.priority;
    });

    //push to object map;
    let wrapKey = this.wrapKey(obj);
    listCallBack = this.objectMap.get(wrapKey);
    if (!listCallBack) {
      listCallBack = new Array<GCallBack>();
      this.objectMap.set(wrapKey, listCallBack);
      this._objectMap.set(wrapKey, obj);
    }
    listCallBack.push(callBack);
    return true;
  }

  /**
   * 注销事件
   * @param obj 对象
   * @param msgID 消息ID
   */
  public unRegister(obj: EventObject, msgID?: StringOrNumber): boolean {
    if (msgID) {
      return this.removeByEventMap(msgID, obj);
    }
    return this.removeByObjectMap(obj);
  }

  /**
   * 推送消息
   * @param msgID 消息ID
   * @param param 参数
   */
  public post(msgID: StringOrNumber, param?: any): void {
    let listCallBack = this.eventMap.get(msgID);
    if (!listCallBack) return;
    listCallBack.forEach((callBack) => {
      callBack.handler(callBack.target, param);
    });
  }
}
