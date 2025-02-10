import { MapWrap } from "../../../Core/FrameEx/ES5Ex";
import { GRID_TYPE, INFO_TYPE, MapLayer } from "../../Common/Define";
import { Res } from "../../Common/UIResources";
import { GAssetImpl } from "./../../../Core/GLoader/GLoader";
import BtlCameraMap from "./BtlCameraMap";
import { MapGridData } from "./BtlMapParser";
let s_unit_szie: cc.Size = null;
export default class BtlMapElement {
  /** 节点容器 */
  public layerElements: MapWrap<number, cc.Node> = null;
  /** 地图对象 */
  protected _cameraMap: BtlCameraMap = null;
  public set cameraMap(value: BtlCameraMap) {
    if (this._cameraMap === value) return;
    this._cameraMap = value;
    if (!s_unit_szie) s_unit_szie = this._cameraMap.unitSize;
  }
  public get cameraMap(): BtlCameraMap {
    return this._cameraMap;
  }

  protected _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  /**元素坐标  (地图)*/
  protected _tcgpos: cc.Vec2;
  public get tcgPos(): cc.Vec2 {
    return this._tcgpos;
  }
  public set tcgPos(value: cc.Vec2) {
    this._tcgpos = value;
  }

  /**元素数据 */
  protected _sElementData: MapGridData;
  public get data(): MapGridData {
    return this._sElementData;
  }
  public set data(data: MapGridData) {
    this._sElementData = data;
  }

  private _assetImpl: GAssetImpl = null;

  constructor(assetImpl: GAssetImpl) {
    this._assetImpl = assetImpl;
    this.layerElements = new MapWrap<number, cc.Node>();
  }

  public onActive() {
    if (!this.data) {
      return;
    }
    let anchPos = this.anchrpos();
    this.layerElements.forEach((layerNode, type) => {
      layerNode.position = cc.v3(anchPos.x, anchPos.y);
      layerNode.name = this.data.id + "_" + type;
      switch (Number(type)) {
        case MapLayer.MLGrid: {
          this.setGridLayer(layerNode);
          break;
        }
        case MapLayer.MLMaterial: {
          this.setMaterialLayer(layerNode);
          break;
        }
      }
    });
  }

  public show() {
    let layer = this.layerElements.get(MapLayer.MLGrid);
    cc.tween(layer).to(0.5, { opacity: 255 }).start();
  }

  public hide() {
    let layer = this.layerElements.get(MapLayer.MLGrid);
    cc.tween(layer).to(0.5, { opacity: 0 }).start();
  }

  /**设置地块层 */
  public setGridLayer(layerNode?: cc.Node) {
    layerNode = layerNode || this.layerElements.get(MapLayer.MLGrid);
    let surfaceSp = layerNode.getComponent(cc.Sprite);
    if (!surfaceSp) return;
    if (this.data.gridInfo[INFO_TYPE.GRID] != GRID_TYPE.VOID) {
      let gridType = this.data.gridInfo[INFO_TYPE.GRID];
      let str = "grid_" + gridType;
      this._assetImpl.spriteAtlasFrame(surfaceSp, Res.fight.fight, str);
    } else {
      surfaceSp.spriteFrame = null;
    }
    surfaceSp.node.setContentSize(this.cameraMap.unitSize);
    surfaceSp.node.active = true;
  }

  /**设置素材层 */
  protected setMaterialLayer(layerNode?: cc.Node) {
    let mats = this.data.material;
    if (layerNode.children.length) {
      layerNode.children.forEach((node) => {
        this._cameraMap.recoverNodeToPool(node);
      });
    }
    mats.forEach((mat) => {
      let node = this.cameraMap.getNodeFromPool(MapLayer.MLMaterial);
      let sp = node.getComponent(cc.Sprite);
      sp.spriteFrame = null;
      sp.type = cc.Sprite.Type.SIMPLE;
      node.active = true;
      node.position = mat.position;
      node.name = MapLayer.MLMaterial + "";
      this._assetImpl.spriteAtlasFrame(
        sp,
        Res.fight.fight,
        "material_" + mat.type
      );
      layerNode.addChild(node);
      node.scaleY = mat.scale.y;
      node.scaleX = mat.scale.x;
      node.zIndex =
        mat.zindex * 100 + layerNode.parent.children.indexOf(layerNode);
    });
    layerNode.active = true;
  }

  // 锚点所在位置对应的坐标
  public anchrpos(): cc.Vec2 {
    let n = this.npos();
    return n;
  }

  // 在cc上的坐标
  public npos(): cc.Vec2 {
    console.log("npos  m2n");
    return this._cameraMap.m2n(this.tcgPos);
  }

  // 在CC上的rect
  public rect(): cc.Rect {
    let pos = this.npos();
    return cc.rect(
      pos.x,
      pos.y - s_unit_szie.height / 2,
      s_unit_szie.width,
      s_unit_szie.height
    );
  }

  /**
   * 回收出发函数
   */
  public onRecover() {
    this.layerElements.forEach((e, type) => {
      if (Number(type) === MapLayer.MLMaterial) {
        e.children.forEach((ele) => {
          this.cameraMap.recoverNodeToPool(ele);
        });
      }
      e.name = "null";
    });
  }
}
