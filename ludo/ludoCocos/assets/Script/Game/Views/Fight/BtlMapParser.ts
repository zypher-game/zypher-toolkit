/**
 * For the brave souls who get this far: You are the chosen ones,
 * the valiant knights of programming who toil away, without rest,
 * fixing our most awful code. To you, true saviors, kings of men,
 * I say this: never gonna give you up, never gonna let you down,
 * never gonna run around and desert you. Never gonna make you cry,
 * never gonna say goodbye. Never gonna tell a lie and hurt you.
 */
/**
 * 致终于来到这里的勇敢的人：
 * 你是被上帝选中的人，是英勇的、不敌辛苦的、不眠不休的来修改我们这最棘手的代码的编程骑士。
 * 你，我们的救世主，人中之龙，我要对你说：永远不要放弃，永远不要对自己失望，永远不要逃走，辜负了自己，
 * 永远不要哭啼，永远不要说再见，永远不要说谎来伤害自己。
 */
import { MapElementDataTpl } from "../../../../../d.ts/game/JXCLBtl";
import { MapWrap } from "../../../Core/FrameEx/ES5Ex";
import { GAssetImpl } from "../../../Core/GLoader/GLoader";
import { GRID_INFO, MATERIAL_INFO } from "./../../Common/Define";

export interface MapGridData {
  id: number;
  coordinate: cc.Vec2;
  gridInfo: number[];
  zIndex: number;
  material: MaterialData[];
}

export interface MapFogData {
  id: number;
  position: cc.Vec2;
  scale: cc.Vec2;
  zIndex: number;
}

export interface MaterialData {
  type: number;
  position: cc.Vec2;
  scale: cc.Vec2;
  zindex: number;
}

export declare type MaterialDataTpl = [string, number, number[], number[], 0];
/**
 * 地图加载进度
 */
export enum MapParseProgress {
  MPP_LoadMapData, // 加载地图数据
}

/**
 * 地图加载状态
 */
export enum MapParseStatus {
  MPS_BeginLoad, // 开始加载；
  MPS_Loading, // 加载中
  MPS_LoadSuccess, // 加载成功
  MPS_LoadFailed, // 加载失败
}

/******************************************************************************************************************* loader */
export class BtlMapParser {
  protected _worldAsseet: cc.JsonAsset;
  public _mapData: MapWrap<number, MapGridData> = new MapWrap<
    number,
    MapGridData
  >();

  /**单元大小用于计算地块位子 */
  protected _unitSize: cc.Size = new cc.Size(40, 40);
  public get unitSize(): cc.Size {
    return this._unitSize;
  }

  /**地块大小 */
  protected _gridSize: cc.Size = new cc.Size(40, 40);
  public get gridSize(): cc.Size {
    return this._gridSize;
  }

  /**地图大小 */
  protected _mapSize: cc.Size = new cc.Size(15, 15);
  public get mapSize(): cc.Size {
    return this._mapSize;
  }

  protected _itemScale: number = 0.5;
  public get itemsScale() {
    return this._itemScale;
  }

  // 加载进度回调
  protected _progressCallBack: any = null;
  // 地图文件夹的根目录
  protected _filePath: string = "";
  private _assetImpl: GAssetImpl = null;
  constructor(path: string, progressCallBack: any, assetImpl: GAssetImpl) {
    this._filePath = path;
    this._assetImpl = assetImpl;
    this._progressCallBack = progressCallBack;
  }

  /**加载地图数据 */
  public loadMapData0() {
    this.callProgress(
      MapParseProgress.MPP_LoadMapData,
      MapParseStatus.MPS_BeginLoad
    );
    this._assetImpl.json(
      this._filePath,
      (err, JsonAsset: cc.JsonAsset) => {
        if (err) {
          this.callProgress(
            MapParseProgress.MPP_LoadMapData,
            MapParseStatus.MPS_LoadFailed,
            err
          );
        }
        this._worldAsseet = JsonAsset;
        this._unitSize = this.arrToSize(this._worldAsseet.json.unitSize);
        this._mapSize = this.arrToSize(this._worldAsseet.json.size);
        this._gridSize = this.arrToSize(this._worldAsseet.json.gridSize);
        this._itemScale = this._gridSize.width / 80;
        let datas: MapElementDataTpl[] = this._worldAsseet.json.data;
        this.dealWithMapData(datas);
        this.callProgress(
          MapParseProgress.MPP_LoadMapData,
          MapParseStatus.MPS_LoadSuccess,
          this
        );
      },
      false
    );
  }
  /**加载地图数据 */
  public loadMapData() {
    this.callProgress(
      MapParseProgress.MPP_LoadMapData,
      MapParseStatus.MPS_BeginLoad
    );
    this._assetImpl.json(
      this._filePath,
      (err, JsonAsset: cc.JsonAsset) => {
        if (err) {
          this.callProgress(
            MapParseProgress.MPP_LoadMapData,
            MapParseStatus.MPS_LoadFailed,
            err
          );
        }

        const _mapData = JsonAsset.json;
        for (const key in _mapData) {
          this._mapData.set(Number(key), _mapData[key]);
        }
        this.callProgress(
          MapParseProgress.MPP_LoadMapData,
          MapParseStatus.MPS_LoadSuccess,
          this
        );
      },
      false
    );
  }
  /**处理地图数据 */
  protected dealWithMapData(datas: MapElementDataTpl[]) {
    datas.forEach((element) => {
      let data: MapElementDataTpl = element;
      if (!data) return null;
      let mapGridData: MapGridData = {
        id: data[GRID_INFO.ID],
        coordinate: cc.v2(
          data[GRID_INFO.POSITION][0],
          data[GRID_INFO.POSITION][1]
        ),
        gridInfo: data[GRID_INFO.INFO],
        zIndex: data[GRID_INFO.ZINDEX],
        material: [],
      };
      /**处理素材数据 */
      data[GRID_INFO.MATERIAL].forEach((mat) => {
        let matData: MaterialData = {
          type: mat[MATERIAL_INFO.TYPE],
          position: cc.v2(
            mat[MATERIAL_INFO.POSITION][0],
            mat[MATERIAL_INFO.POSITION][1]
          ),
          scale: cc.v2(
            mat[MATERIAL_INFO.SCALE][0],
            mat[MATERIAL_INFO.SCALE][1]
          ),
          zindex: mat[MATERIAL_INFO.ZINDEX],
        };
        mapGridData.material.push(matData);
      });
      this._mapData.set(element[0], mapGridData);
    });
    console.log("地图数据解析完成:", this._mapData);
  }

  /**
   * 获取地块数据
   * @param posX
   * @param posY
   */
  public getElementData(posX: cc.Vec2 | number, posY?: number): MapGridData {
    let pos: cc.Vec2;
    if (posX instanceof cc.Vec2) {
      pos = posX;
    } else {
      pos = cc.v2(posX, posY);
    }
    if (!this.checkInMapRange(pos)) return null;
    let mapGridData = this._mapData.get(pos.x * 100 + pos.y);
    return mapGridData;
  }

  /**
   * 确认地块在地图范围内
   * @param pos
   * @param y
   */
  public checkInMapRange(pos: cc.Vec2 | number, y?: number): boolean {
    if (typeof pos === "number") {
      pos = cc.v2(pos, y);
    }
    if (
      pos.x < 0 ||
      pos.x >= this._mapSize.width ||
      pos.y < 0 ||
      pos.y >= this._mapSize.height
    )
      return false;
    return true;
  }

  /**
   * 地图加载进度回调
   * @param mpp 进度回调
   * @param mps 加载状态
   * @param param 额外参数
   */
  public callProgress(
    mpp: MapParseProgress,
    mps: MapParseStatus,
    param: any = null
  ) {
    if (!this._progressCallBack) return;
    this._progressCallBack(mpp, mps, param);
  }

  /**将数组转化为cc.Size */
  private arrToSize(arr: number[]): cc.Size {
    let size = new cc.Size(0);
    size.width = arr[0];
    size.height = arr[1];
    return size;
  }
}
