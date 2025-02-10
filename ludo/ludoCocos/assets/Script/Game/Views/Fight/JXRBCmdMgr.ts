import {
  IChessBtl,
  IComLike,
  SPlaneDataRaw,
  SRankDataRaw,
} from "../../../../../d.ts/game/JXCLBtl";
import { JXDef } from "../../../conventions/JXCommon";
import {
  INVALID_VALUE,
  IS_EMPTY_INVALID,
  OBJECT_COPY,
  PRIORITY_DATA,
} from "../../../Core/CoreDefine";
import {
  JXActionMgr,
  JXBezierTo,
  JXMoveTo,
} from "../../../Core/FrameEx/ActionEx";
import { CCNodeImpl } from "../../../Core/FrameEx/CCNodeImpl";
import { MapWrap, ObjectWrap } from "../../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../../Core/GCtrl";
import GEventSystem from "../../../Core/GEvent/GEventSystem";
import GParam from "../../../Core/GEvent/GParam";
import { GAssetImpl } from "../../../Core/GLoader/GLoader";
import { AudioMgr } from "../../../Core/Manager/AudioMgr";
import MathEx from "../../../Core/Math/MathEx";
import { CMsg, INFO_TYPE, MapLayer } from "../../Common/Define";
import { Res } from "../../Common/UIResources";
import { JXLocales } from "../../Common/Zh";
import GameMgr from "../../Logic/GameMgr";
import BtlCameraMap from "./BtlCameraMap";
import BtlFightLayer from "./BtlFighltLayer";
import { JXIdGenerater } from "./JXBattleUtility";
import JXRBPlayer from "./JXRBPlayer";
import { JXRBRole } from "./JXRBRole";
import { BattleAssets } from "./JXULAssets";
import {
  BirthAngle,
  ICampKeyCode,
  JXBtlBEMT,
  JXEAniNames,
  JXEDir,
  JXEState,
  ROLE_BORN_POS,
  ROLE_COMP_NAME,
  ROLE_NAME_PREFIX,
  ROLE_ROAD,
  ROLE_START_POS,
  RoleNumber,
} from "./JXULDefine";
export const ANIMATION_SPEED = 1.6;
const ShaiZi_Pos = [cc.v2(956, 540), cc.v2(956, 540)];
export default class JXRBCmdMgr extends ObjectWrap implements IComLike {
  /** 所有角色 */
  protected _roles: MapWrap<string, JXRBRole>;
  private _deathRoles: MapWrap<number, string[]>;
  /**所有玩家数据 */
  protected _players: MapWrap<string, JXRBPlayer>;
  /** 执行状态 */
  protected _running: boolean;
  public set running(v: boolean) {
    this._running = v;
  }
  /** 播放速度 */
  protected _speed: number = 1;
  /**  是否暂停中 */
  protected _pause: boolean = false;
  /** 暂停新的命令 */
  protected _pauseCmd: boolean = false;
  public rootNode: cc.Node;
  public headNode: cc.Node;
  /**场景 */
  protected _sceneId: number = 0;
  /** 战斗动作管理器 */
  public btlActionMgr: JXActionMgr;
  /** 战斗事件管理器 */
  public evtMgr: GEventSystem;
  /** 战斗资源管理器 */
  public assetManager: BattleAssets;
  private _team: IChessBtl[];
  /** ID生成器 */
  public insIdGentor: JXIdGenerater;
  /**战斗地图层 */
  public btlCameraMap: BtlCameraMap;
  public assetImpl: GAssetImpl = null;

  public fightLayer: BtlFightLayer;
  protected _count: number = 1;
  protected curIndex: number = 1;
  protected curRound: number = 1;
  private cardPool: number[] = [];
  private blindBox: number[] = [];
  public curVia: number[] = [];
  private spinePool: cc.NodePool = null;
  private spritePool: cc.NodePool = null;
  private teamNum: number = null;

  constructor(sceneId: number, assetManager: BattleAssets, num: number) {
    super();
    this.teamNum = num;
    this._sceneId = sceneId;
    this.assetManager = assetManager;
    this.spritePool = new cc.NodePool();
    this.spinePool = new cc.NodePool();
    this._roles = new MapWrap<string, JXRBRole>();
    this._deathRoles = new MapWrap<number, string[]>();
    this.btlActionMgr = new JXActionMgr();
    this.evtMgr = new GEventSystem();
    this.insIdGentor = new JXIdGenerater("Plane");
    this._players = new MapWrap<string, JXRBPlayer>();
    let curDan = GameMgr.lUserData.RankLv;
    let raw = GameMgr.rankData.getRaw<SRankDataRaw>(curDan);
    this.blindBox = raw.blindBox;
    this.btlCameraMap = null;
    this.registerEvent();
  }

  public initTeam(chessTeam: IChessBtl[]) {
    this._team = chessTeam;
  }

  /**注册事件 */
  protected registerEvent() {
    this.evtMgr.register(
      CMsg.client.fight.onPlayerEndAction,
      this,
      this.onPlayerActionFinish.bind(this),
      PRIORITY_DATA
    );
  }

  /**添加动作 */
  public addAction(
    impl: CCNodeImpl,
    action: cc.Action,
    pause: boolean = false
  ): cc.Action {
    this.btlActionMgr.addAction(action, impl, pause);
    return action;
  }

  /**移除动作 */
  public removeAction(action: cc.Action) {
    this.btlActionMgr.removeAction(action);
  }

  /** 实例化游戏场景 */
  public initRDBtlLayer(target: cc.Node, headContent: cc.Node) {
    if (!target || !headContent) return;
    this.rootNode = target;
    this.headNode = headContent;
    this.fightLayer = this.rootNode.getComponent(BtlFightLayer);
    this.assetImpl = this.fightLayer.assetImpl;
    return target;
  }

  /**加载场景所需的资源 */
  public loadAllResources(endCb: any) {
    this.assetManager.loadAllRoundAssets(this._team, this._sceneId, () => {
      endCb();
    });
  }

  /**添加角色 */
  public addRole(role: JXRBRole, id: string) {
    if (this._roles.has(id)) return;
    role.parent = this.rootNode;
    this._roles.set(id, role);
  }

  /**将角色移除 但是界面没有移除 */
  public removeRole(id: string) {
    if (this._roles.has(id)) {
      this._roles.delete(id);
    }
  }

  public startCmd() {
    // console.log({ _players: JSON.stringify(this._players.get("Player.1")) });
    this._running = true;
    this.curIndex = 0;
    this.curRound = 0;
    this.actionStart();
  }

  /**回合开始 */
  public actionStart() {
    this.curVia = [];
    let index = this.curIndex % this._team.length;
    let player = this._players.values<JXRBPlayer>()[index];
    if (index === 0) {
      if (this.curRound != 0) {
        console.groupEnd();
      }
      this.curRound++;
      console.group(`第${this.curRound}回合开始`);
    }
    player.startActionTimer(this.curRound);
  }

  /**下一回合 */
  public nextAction() {
    this.curIndex++;
    this.actionStart();
  }
  /**当一个玩家行动结束 */
  public onPlayerActionFinish(_, param: GParam) {
    this.nextAction();
  }

  /**创建队伍 */
  public createTeam() {
    let prefab = this.assetManager.assetImpl.getPreLoadAsset<cc.Prefab>(
      Res.fight.player
    );
    for (let i = 0; i < this._team.length; i++) {
      let info = this._team[i];
      console.log({ info });
      let tableId = info.tableId;
      let dir = info.dir;
      let headRoot = this.headNode.getChildByName("pos" + dir);
      let points = ROLE_BORN_POS[dir];
      let pointArr = [];
      for (let index = 0; index < this.teamNum; index++) {
        pointArr.push(points[index]);
      }
      console.log({ points, pointArr });
      let node = cc.instantiate(prefab);
      headRoot.addChild(node);
      node.name = info.id;
      let comp = node.getComponent(JXRBPlayer);
      comp.initData(info, this);
      this._players.set(info.id, comp);
      for (let i = 0; i < pointArr.length; i++) {
        let point = pointArr[i];
        // let pos = GameMgr.mapMgr.decodeXxyy(point);
        let planeId = this.insIdGentor.getNewId();
        let role = this.createRole(
          planeId,
          tableId,
          dir,
          i,
          cc.v2(point.x, point.y) // BirthPos
        );
        role.bindPlayer(comp);
        comp.setRole(role);
      }
    }
  }

  /**创建角色 */
  public createRole(
    planeId: string,
    tableId: number,
    dir: JXEDir,
    index: number,
    pos?: cc.Vec2
  ) {
    if (IS_EMPTY_INVALID(planeId)) return;
    let raw = GameMgr.planeData.getRaw<SPlaneDataRaw>(tableId);
    let role: JXRBRole;
    let model: string = Res.fight.plane + raw.model + "/" + raw.model;
    let road = ROLE_ROAD[dir];
    const startPos = ROLE_START_POS[dir];
    const anglePos = BirthAngle[dir];
    role = this.createRoleModel(
      dir,
      model,
      JXRBRole,
      dir * ICampKeyCode + this._count,
      planeId, // id
      index
    );
    this.addRole(role, role.id);
    let scale = role.scale;
    let size = cc.size(
      role.skeleton.node.width * scale,
      role.skeleton.node.height * scale
    );
    role.skeleton.node["sWidth"] = size.width;
    role.skeleton.node["sHeight"] = size.height;
    role._name = raw.name;
    role.setAngle(anglePos);
    role.setBirthPos(pos);
    role.setStartPos(startPos);
    role.setRoadPos(road);
    this._count++;
    role.skeleton.timeScale = ANIMATION_SPEED * this._speed;
    role.changeState(JXEState.Idle);
    return role;
  }

  /**创建模型角色模型*/
  protected createRoleModel<T extends JXRBRole>(
    dir: JXEDir,
    model: string,
    type: { new (object: cc.Node): T },
    iKey: number,
    id: string,
    index
  ): T {
    let prefab = this.assetManager.assetImpl.getPreLoadAsset<cc.Prefab>(
      Res.fight.role
    );
    if (!prefab) return;
    let roleNode = cc.instantiate(prefab);

    roleNode.name = ROLE_NAME_PREFIX + `_${dir}_${index}`;
    let roleSk = roleNode.getChildByName("skeleton").getComponent(sp.Skeleton);
    if (!roleSk) return;
    roleSk.skeletonData =
      this.assetManager.assetImpl.getPreLoadAsset<sp.SkeletonData>(model);
    roleSk.defaultSkin = "skin" + dir;
    roleSk.setAnimation(0, JXEAniNames.idle, true);
    let role = new type(roleNode);
    role.cmd = this;
    role.id = id;
    role.iKey = iKey;
    role.initState();
    role.setModel(model);
    role.setDir(dir);

    return role;
  }

  public getRoles(selectCb?: { (role: JXRBRole): boolean }): JXRBRole[] {
    if (!selectCb) return this._roles.values();
    let roles = [];
    this._roles.forEach((v) => {
      if (selectCb(v)) roles.push(v);
    });
    return roles;
  }

  /**停止 */
  public stopRun() {
    this._running = false;
  }

  /**恢复 */
  public run() {
    this._running = true;
  }

  public update() {
    if (!this._roles) return;
    if (this._pause) return;
    if (this._pauseCmd) return;
    if (!this._running) return;
    let dt = cc.director.getDeltaTime();
    dt *= this._speed * ANIMATION_SPEED;
    this._roles.forEach((v) => v.update(dt));
    this.btlActionMgr.update(dt);
  }

  /*投掷骰子**/
  public throwDice(dir: number, cb: Function, v?: number) {
    let diceResult = v ? [v] : this.getDiceNumber(1);
    let num = 0;
    diceResult.forEach((v) => {
      num += v;
    });
    //***模拟筛子投掷动画 */
    let skeleton: sp.Skeleton = this.fightLayer.shaizi;
    let pos = ShaiZi_Pos[0];
    skeleton.node.position = cc.v3(pos.x, pos.y);
    var ani = "shang" + num;
    // 1: "蓝方",
    // 2: "红方",
    // 3: "黄方",
    // 4: "绿方"
    switch (dir) {
      case 4:
        {
          ani = "youshang" + num;
        }

        break;
      case 3:
        {
          ani = "zuoxia" + num;
        }
        break;
      case 2:
        {
          ani = "zuoshang" + num;
        }
        break;
      case 1:
        {
          ani = "youxia" + num;
        }
        break;
      default:
        break;
    }

    skeleton.node.scale = 0.5;
    skeleton.node.active = true;
    skeleton.setAnimation(0, ani, false);
    skeleton.setCompleteListener(() => {
      cc.tween(skeleton.node).delay(0.5).to(0.5, { scale: 0 }).start();
      cb(num);
    });
  }

  /**根据数量获取筛子 */
  protected getDiceNumber(n: number): number[] {
    let num = [];
    let arr = [1, 2, 3, 4, 5, 6];
    arr = MathEx.fisherYatesShuffle(arr);
    let drawList = [];
    for (let j = 0; j < arr.length; j++) {
      let list = new Array(100 * n).fill(arr[j]);
      drawList.push(...list);
    }
    for (let i = 0; i < n; i++) {
      let index = MathEx.random(0, drawList.length - 1);
      num.push(drawList[index]);
    }
    return num;
  }
  /**判断是否存在相同颜色的飞机*/
  public setDeathRoles(dir: JXEDir, id: string): boolean {
    // _deathRoles
    let val: string[] = [];
    if (this._deathRoles.has(dir)) {
      val = this._deathRoles.get(dir);
    }
    this._deathRoles.set(dir, [...val, id]);
    console.log({ _deathRoles: this._deathRoles.get(dir) });
    return this._deathRoles.get(dir).length === RoleNumber ? true : false;
  }
  /**判断是否存在相同位置的飞机*/
  public checkHavePlaneInHere(position: cc.Vec2, roleId?: string): JXRBRole[] {
    let roles = this._roles.values<JXRBRole>();
    let targets = [];
    for (let i = 0; i < roles.length; i++) {
      let role = roles[i];
      if (
        Math.round(position.x) === Math.round(role.position.x) &&
        Math.round(position.y) === Math.round(role.position.y)
      ) {
        if (roleId && roleId != role.id) {
          targets.push(role);
        } else if (!roleId) {
          targets.push(role);
        }
      }
    }
    return targets;
  }

  public recoverTopool(item: cc.Node) {
    item.removeFromParent();
  }

  /**获取最远距离的角色*/
  protected getLongDistentByDir(
    dir: JXEDir,
    selectCb?: { (role: JXRBRole): boolean }
  ): JXRBRole {
    if (!selectCb) {
      selectCb = (role: JXRBRole) => {
        return role.dir === dir && role.isBorn && !role.isBanMove;
      };
    }
    let values = this.getRoles(selectCb);
    let indexInRoad = null;
    let tartget = null;
    for (let i = 0; i < values.length; i++) {
      let role = values[i];
      let index = role.roadIndex;
      if (!indexInRoad || index > indexInRoad) {
        indexInRoad = index;
        tartget = role;
      }
    }
    return tartget;
  }

  /**拿到对阵营路径上的角色距离 */
  protected getDistentInDir(dir: JXEDir, role: JXRBRole) {
    const posId = JSON.stringify({
      x: role.target.position.x,
      y: role.target.position.y,
    });
    let roads = JSON.stringify(ROLE_ROAD[dir]);
    return roads.indexOf(posId);
  }

  /**选择一个角色进行行动*/
  public randomRoleToAction(
    lastNum: number,
    dir: JXEDir,
    banTakeOff: boolean = false
  ): JXRBRole {
    let noBorn = this.getRoles((role) => {
      return role.dir === dir && !role.isBorn;
    });
    let values = this.getRoles((role) => {
      return role.dir === dir && role.isBorn;
    });
    if (lastNum === 6 && noBorn.length && !banTakeOff) {
      for (let i = 0; i < noBorn.length; i++) {
        let role = noBorn[i];
        if (!role.isBorn) {
          return role;
        }
      }
    } else {
      let indexInRoad = null;
      let tartget = null;
      for (let i = 0; i < values.length; i++) {
        let role = values[i];
        if (role.isBorn && !role.isBanMove) {
          let index = role.roadIndex;
          if (!indexInRoad || index > indexInRoad) {
            indexInRoad = index;
            tartget = role;
          }
        }
      }
      return tartget;
    }
    return null;
  }

  /**从节点池获取 */
  private getSpineFormPool() {
    let aniNode = this.spinePool.get();
    if (!aniNode) {
      let node = new cc.Node();
      if (!node) return;
      let spine = node.addComponent(sp.Skeleton);
      spine.premultipliedAlpha = false;
      aniNode = node;
      node.name = "sk_node";
    }
    return aniNode;
  }

  /**回收到节点池 */
  private putSpineToPool(sk: sp.Skeleton) {
    sk.node.name = "sk_node";
    sk.skeletonData = null;
    let node = sk.node;
    node.angle = 0;
    node.scale = 1;
    node.opacity = 255;
    node.zIndex = 0;
    sk.setCompleteListener(() => {});
    sk.setEventListener(
      (track: sp.spine.TrackEntry, event: sp.spine.Event) => {}
    );
    node.removeFromParent();
    this.spinePool.put(node);
  }

  public destroyAssetManager() {
    this.assetManager.destroy();
    this.assetManager = null;
  }

  public destroy() {
    this.destroyAssetManager();
    this.btlCameraMap = null;
    this.evtMgr.unRegister(this);
    GCtrl.ES.off(this);
  }
}
