import { BtlMapParser } from "../Views/Fight/BtlMapParser";
import { INVALID_VALUE } from "./../../Core/CoreDefine";
import { ObjectWrap } from "./../../Core/FrameEx/ES5Ex";
import MaskUtil = require("../../Core/Manager/MaskUtil");

enum AddState {
  Add,
  Del,
  Noc,
}

const DirNum = {
  top: [2, 3, 4],
  bottom: [8, 7, 6],
  left: [2, 1, 8],
  right: [4, 5, 6],
};
export default class MapMgr extends ObjectWrap {
  protected static _ins: MapMgr;
  public static get ins(): MapMgr {
    if (!this._ins) {
      this._ins = new MapMgr();
    }
    return this._ins;
  }

  constructor() {
    super();
  }

  public _fsMapPatser: BtlMapParser = null;
  private _mapId: number = INVALID_VALUE;

  public set mapId(id: number) {
    this._mapId = id;
  }

  public get mapId(): number {
    return this._mapId;
  }

  public getAround(pos: cc.Vec2) {
    let points = [];
    points.push(cc.v2(pos.x - 1, pos.y));
    points.push(cc.v2(pos.x + 1, pos.y));
    points.push(cc.v2(pos.x, pos.y + 1));
    points.push(cc.v2(pos.x - 1, pos.y - 1));
    points.push(pos);
    return points;
  }

  public encodeXxyy(pos: cc.Vec2) {
    return pos.x * 100 + pos.y;
  }

  public decodeXxyy(xxyy: number): cc.Vec2 {
    let x = (xxyy / 100) | 0;
    let y = xxyy % 100;
    return cc.v2(x, y);
  }
}
