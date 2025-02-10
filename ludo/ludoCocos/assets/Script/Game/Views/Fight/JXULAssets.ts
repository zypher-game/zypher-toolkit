import { IChessBtl, SPlaneDataRaw } from "../../../../../d.ts/game/JXCLBtl";
import { INVALID_VALUE } from "../../../Core/CoreDefine";
import { ObjectWrap } from "../../../Core/FrameEx/ES5Ex";
import { GAssetImpl } from "../../../Core/GLoader/GLoader";
import { Res } from "../../Common/UIResources";
import GameMgr from "../../Logic/GameMgr";

export class BattleAssets extends ObjectWrap {
  public assetImpl: GAssetImpl = null;

  constructor(key: string) {
    super();
    this.assetImpl = GAssetImpl.getAssetImpl(key);
  }

  /** 加载资源 */
  public preLoads(endCb: any, ...allAssets) {
    this.assetImpl.preLoads(
      (
        curIndx: number,
        totalCount: number,
        path: string,
        err: Error,
        asset: typeof cc.Asset
      ) => {
        if (curIndx == totalCount) {
          endCb();
        }
      },
      { type: cc.Prefab, path: Res.fight.role },
      { type: cc.Prefab, path: Res.fight.player },
      { type: cc.SpriteAtlas, path: Res.fight.fight },
      { type: sp.SkeletonData, path: Res.fight.shaizi },
      ...allAssets
    );
  }

  /**
   * 加载所有回合战斗资源
   * @param iTeams 交战双方队伍信息
   * @param sceneId 场景ID
   * @param endCb 加载完成回调
   */
  public loadAllRoundAssets(iTeams: IChessBtl[], sceneId: number, endCb: any) {
    let allPaths = [];
    let allAssets = [];
    for (let i = 0; i < iTeams.length; i++) {
      let team = iTeams[i];
      this.loadPalneAssets(team.tableId, allAssets, allPaths);
    }
    console.log({ allAssets });
    allAssets.push();
    this.preLoads(
      (curIndx: number, totalCount: number, asset: cc.Asset) => endCb(),
      ...allAssets
    );
  }
  /**
   *加载飞机模型
   * @param tableId 飞机静态表ID；
   * @param assets
   * @param paths
   */
  public loadPalneAssets(
    tableId: number,
    assets: AssetInfo[],
    paths: string[]
  ) {
    let plane = GameMgr.planeData.getRaw<SPlaneDataRaw>(tableId);
    let path = Res.fight.plane + plane.model + "/" + plane.model;
    console.log("loadPalneAssets:", { path });
    if (!this.hasLoadAsset(paths, path)) {
      assets.push({ type: sp.SkeletonData, path });
      paths.push(path);
    }
  }

  /**
   * 检测paths中是否包含path
   * @param paths -
   * @param path -
   */
  public hasLoadAsset(paths: string[], path: string): boolean {
    return paths.indexOf(path) != INVALID_VALUE;
  }

  /**
   * 创建一个spine
   * @param path
   */
  public createSpine(path: string): sp.Skeleton {
    let spineNode = new cc.Node();
    let spine = spineNode.addComponent(sp.Skeleton);
    spine.premultipliedAlpha = true;
    spine.skeletonData = this.assetImpl.getPreLoadAsset<sp.SkeletonData>(path);
    return spine;
  }

  /**
   * 析构，释放资源
   */
  public destroy() {
    this.assetImpl.release();
    this.assetImpl = null;
  }
}
