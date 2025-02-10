"use strict";
cc._RF.push(module, 'cd4c9zkd0FI2J7s3s9SX7Ry', 'JXRBCmdMgr');
// Script/Game/Views/Fight/JXRBCmdMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATION_SPEED = void 0;
var CoreDefine_1 = require("../../../Core/CoreDefine");
var ActionEx_1 = require("../../../Core/FrameEx/ActionEx");
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../../Core/GCtrl");
var GEventSystem_1 = require("../../../Core/GEvent/GEventSystem");
var MathEx_1 = require("../../../Core/Math/MathEx");
var Define_1 = require("../../Common/Define");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var BtlFighltLayer_1 = require("./BtlFighltLayer");
var JXBattleUtility_1 = require("./JXBattleUtility");
var JXRBPlayer_1 = require("./JXRBPlayer");
var JXRBRole_1 = require("./JXRBRole");
var JXULDefine_1 = require("./JXULDefine");
exports.ANIMATION_SPEED = 1.6;
var ShaiZi_Pos = [cc.v2(956, 540), cc.v2(956, 540)];
var JXRBCmdMgr = /** @class */ (function (_super) {
    __extends(JXRBCmdMgr, _super);
    function JXRBCmdMgr(sceneId, assetManager, num) {
        var _this = _super.call(this) || this;
        /** 播放速度 */
        _this._speed = 1;
        /**  是否暂停中 */
        _this._pause = false;
        /** 暂停新的命令 */
        _this._pauseCmd = false;
        /**场景 */
        _this._sceneId = 0;
        _this.assetImpl = null;
        _this._count = 1;
        _this.curIndex = 1;
        _this.curRound = 1;
        _this.cardPool = [];
        _this.blindBox = [];
        _this.curVia = [];
        _this.spinePool = null;
        _this.spritePool = null;
        _this.teamNum = null;
        _this.teamNum = num;
        _this._sceneId = sceneId;
        _this.assetManager = assetManager;
        _this.spritePool = new cc.NodePool();
        _this.spinePool = new cc.NodePool();
        _this._roles = new ES5Ex_1.MapWrap();
        _this._deathRoles = new ES5Ex_1.MapWrap();
        _this.btlActionMgr = new ActionEx_1.JXActionMgr();
        _this.evtMgr = new GEventSystem_1.default();
        _this.insIdGentor = new JXBattleUtility_1.JXIdGenerater("Plane");
        _this._players = new ES5Ex_1.MapWrap();
        var curDan = GameMgr_1.default.lUserData.RankLv;
        var raw = GameMgr_1.default.rankData.getRaw(curDan);
        _this.blindBox = raw.blindBox;
        _this.btlCameraMap = null;
        _this.registerEvent();
        return _this;
    }
    Object.defineProperty(JXRBCmdMgr.prototype, "running", {
        set: function (v) {
            this._running = v;
        },
        enumerable: false,
        configurable: true
    });
    JXRBCmdMgr.prototype.initTeam = function (chessTeam) {
        this._team = chessTeam;
    };
    /**注册事件 */
    JXRBCmdMgr.prototype.registerEvent = function () {
        this.evtMgr.register(Define_1.CMsg.client.fight.onPlayerEndAction, this, this.onPlayerActionFinish.bind(this), CoreDefine_1.PRIORITY_DATA);
    };
    /**添加动作 */
    JXRBCmdMgr.prototype.addAction = function (impl, action, pause) {
        if (pause === void 0) { pause = false; }
        this.btlActionMgr.addAction(action, impl, pause);
        return action;
    };
    /**移除动作 */
    JXRBCmdMgr.prototype.removeAction = function (action) {
        this.btlActionMgr.removeAction(action);
    };
    /** 实例化游戏场景 */
    JXRBCmdMgr.prototype.initRDBtlLayer = function (target, headContent) {
        if (!target || !headContent)
            return;
        this.rootNode = target;
        this.headNode = headContent;
        this.fightLayer = this.rootNode.getComponent(BtlFighltLayer_1.default);
        this.assetImpl = this.fightLayer.assetImpl;
        return target;
    };
    /**加载场景所需的资源 */
    JXRBCmdMgr.prototype.loadAllResources = function (endCb) {
        this.assetManager.loadAllRoundAssets(this._team, this._sceneId, function () {
            endCb();
        });
    };
    /**添加角色 */
    JXRBCmdMgr.prototype.addRole = function (role, id) {
        if (this._roles.has(id))
            return;
        role.parent = this.rootNode;
        this._roles.set(id, role);
    };
    /**将角色移除 但是界面没有移除 */
    JXRBCmdMgr.prototype.removeRole = function (id) {
        if (this._roles.has(id)) {
            this._roles.delete(id);
        }
    };
    JXRBCmdMgr.prototype.startCmd = function () {
        // console.log({ _players: JSON.stringify(this._players.get("Player.1")) });
        this._running = true;
        this.curIndex = 0;
        this.curRound = 0;
        this.actionStart();
    };
    /**回合开始 */
    JXRBCmdMgr.prototype.actionStart = function () {
        this.curVia = [];
        var index = this.curIndex % this._team.length;
        var player = this._players.values()[index];
        if (index === 0) {
            if (this.curRound != 0) {
                console.groupEnd();
            }
            this.curRound++;
            console.group("\u7B2C" + this.curRound + "\u56DE\u5408\u5F00\u59CB");
        }
        player.startActionTimer(this.curRound);
    };
    /**下一回合 */
    JXRBCmdMgr.prototype.nextAction = function () {
        this.curIndex++;
        this.actionStart();
    };
    /**当一个玩家行动结束 */
    JXRBCmdMgr.prototype.onPlayerActionFinish = function (_, param) {
        this.nextAction();
    };
    /**创建队伍 */
    JXRBCmdMgr.prototype.createTeam = function () {
        var prefab = this.assetManager.assetImpl.getPreLoadAsset(UIResources_1.Res.fight.player);
        for (var i = 0; i < this._team.length; i++) {
            var info = this._team[i];
            console.log({ info: info });
            var tableId = info.tableId;
            var dir = info.dir;
            var headRoot = this.headNode.getChildByName("pos" + dir);
            var points = JXULDefine_1.ROLE_BORN_POS[dir];
            var pointArr = [];
            for (var index = 0; index < this.teamNum; index++) {
                pointArr.push(points[index]);
            }
            console.log({ points: points, pointArr: pointArr });
            var node = cc.instantiate(prefab);
            headRoot.addChild(node);
            node.name = info.id;
            var comp = node.getComponent(JXRBPlayer_1.default);
            comp.initData(info, this);
            this._players.set(info.id, comp);
            for (var i_1 = 0; i_1 < pointArr.length; i_1++) {
                var point = pointArr[i_1];
                // let pos = GameMgr.mapMgr.decodeXxyy(point);
                var planeId = this.insIdGentor.getNewId();
                var role = this.createRole(planeId, tableId, dir, i_1, cc.v2(point.x, point.y) // BirthPos
                );
                role.bindPlayer(comp);
                comp.setRole(role);
            }
        }
    };
    /**创建角色 */
    JXRBCmdMgr.prototype.createRole = function (planeId, tableId, dir, index, pos) {
        if (CoreDefine_1.IS_EMPTY_INVALID(planeId))
            return;
        var raw = GameMgr_1.default.planeData.getRaw(tableId);
        var role;
        var model = UIResources_1.Res.fight.plane + raw.model + "/" + raw.model;
        var road = JXULDefine_1.ROLE_ROAD[dir];
        var startPos = JXULDefine_1.ROLE_START_POS[dir];
        var anglePos = JXULDefine_1.BirthAngle[dir];
        role = this.createRoleModel(dir, model, JXRBRole_1.JXRBRole, dir * JXULDefine_1.ICampKeyCode + this._count, planeId, // id
        index);
        this.addRole(role, role.id);
        var scale = role.scale;
        var size = cc.size(role.skeleton.node.width * scale, role.skeleton.node.height * scale);
        role.skeleton.node["sWidth"] = size.width;
        role.skeleton.node["sHeight"] = size.height;
        role._name = raw.name;
        role.setAngle(anglePos);
        role.setBirthPos(pos);
        role.setStartPos(startPos);
        role.setRoadPos(road);
        this._count++;
        role.skeleton.timeScale = exports.ANIMATION_SPEED * this._speed;
        role.changeState(JXULDefine_1.JXEState.Idle);
        return role;
    };
    /**创建模型角色模型*/
    JXRBCmdMgr.prototype.createRoleModel = function (dir, model, type, iKey, id, index) {
        var prefab = this.assetManager.assetImpl.getPreLoadAsset(UIResources_1.Res.fight.role);
        if (!prefab)
            return;
        var roleNode = cc.instantiate(prefab);
        roleNode.name = JXULDefine_1.ROLE_NAME_PREFIX + ("_" + dir + "_" + index);
        var roleSk = roleNode.getChildByName("skeleton").getComponent(sp.Skeleton);
        if (!roleSk)
            return;
        roleSk.skeletonData =
            this.assetManager.assetImpl.getPreLoadAsset(model);
        roleSk.defaultSkin = "skin" + dir;
        roleSk.setAnimation(0, JXULDefine_1.JXEAniNames.idle, true);
        var role = new type(roleNode);
        role.cmd = this;
        role.id = id;
        role.iKey = iKey;
        role.initState();
        role.setModel(model);
        role.setDir(dir);
        return role;
    };
    JXRBCmdMgr.prototype.getRoles = function (selectCb) {
        if (!selectCb)
            return this._roles.values();
        var roles = [];
        this._roles.forEach(function (v) {
            if (selectCb(v))
                roles.push(v);
        });
        return roles;
    };
    /**停止 */
    JXRBCmdMgr.prototype.stopRun = function () {
        this._running = false;
    };
    /**恢复 */
    JXRBCmdMgr.prototype.run = function () {
        this._running = true;
    };
    JXRBCmdMgr.prototype.update = function () {
        if (!this._roles)
            return;
        if (this._pause)
            return;
        if (this._pauseCmd)
            return;
        if (!this._running)
            return;
        var dt = cc.director.getDeltaTime();
        dt *= this._speed * exports.ANIMATION_SPEED;
        this._roles.forEach(function (v) { return v.update(dt); });
        this.btlActionMgr.update(dt);
    };
    /*投掷骰子**/
    JXRBCmdMgr.prototype.throwDice = function (dir, cb, v) {
        var diceResult = v ? [v] : this.getDiceNumber(1);
        var num = 0;
        diceResult.forEach(function (v) {
            num += v;
        });
        //***模拟筛子投掷动画 */
        var skeleton = this.fightLayer.shaizi;
        var pos = ShaiZi_Pos[0];
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
        skeleton.setCompleteListener(function () {
            cc.tween(skeleton.node).delay(0.5).to(0.5, { scale: 0 }).start();
            cb(num);
        });
    };
    /**根据数量获取筛子 */
    JXRBCmdMgr.prototype.getDiceNumber = function (n) {
        var num = [];
        var arr = [1, 2, 3, 4, 5, 6];
        arr = MathEx_1.default.fisherYatesShuffle(arr);
        var drawList = [];
        for (var j = 0; j < arr.length; j++) {
            var list = new Array(100 * n).fill(arr[j]);
            drawList.push.apply(drawList, list);
        }
        for (var i = 0; i < n; i++) {
            var index = MathEx_1.default.random(0, drawList.length - 1);
            num.push(drawList[index]);
        }
        return num;
    };
    /**判断是否存在相同颜色的飞机*/
    JXRBCmdMgr.prototype.setDeathRoles = function (dir, id) {
        // _deathRoles
        var val = [];
        if (this._deathRoles.has(dir)) {
            val = this._deathRoles.get(dir);
        }
        this._deathRoles.set(dir, __spreadArrays(val, [id]));
        console.log({ _deathRoles: this._deathRoles.get(dir) });
        return this._deathRoles.get(dir).length === JXULDefine_1.RoleNumber ? true : false;
    };
    /**判断是否存在相同位置的飞机*/
    JXRBCmdMgr.prototype.checkHavePlaneInHere = function (position, roleId) {
        var roles = this._roles.values();
        var targets = [];
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            if (Math.round(position.x) === Math.round(role.position.x) &&
                Math.round(position.y) === Math.round(role.position.y)) {
                if (roleId && roleId != role.id) {
                    targets.push(role);
                }
                else if (!roleId) {
                    targets.push(role);
                }
            }
        }
        return targets;
    };
    JXRBCmdMgr.prototype.recoverTopool = function (item) {
        item.removeFromParent();
    };
    /**获取最远距离的角色*/
    JXRBCmdMgr.prototype.getLongDistentByDir = function (dir, selectCb) {
        if (!selectCb) {
            selectCb = function (role) {
                return role.dir === dir && role.isBorn && !role.isBanMove;
            };
        }
        var values = this.getRoles(selectCb);
        var indexInRoad = null;
        var tartget = null;
        for (var i = 0; i < values.length; i++) {
            var role = values[i];
            var index = role.roadIndex;
            if (!indexInRoad || index > indexInRoad) {
                indexInRoad = index;
                tartget = role;
            }
        }
        return tartget;
    };
    /**拿到对阵营路径上的角色距离 */
    JXRBCmdMgr.prototype.getDistentInDir = function (dir, role) {
        var posId = JSON.stringify({
            x: role.target.position.x,
            y: role.target.position.y,
        });
        var roads = JSON.stringify(JXULDefine_1.ROLE_ROAD[dir]);
        return roads.indexOf(posId);
    };
    /**选择一个角色进行行动*/
    JXRBCmdMgr.prototype.randomRoleToAction = function (lastNum, dir, banTakeOff) {
        if (banTakeOff === void 0) { banTakeOff = false; }
        var noBorn = this.getRoles(function (role) {
            return role.dir === dir && !role.isBorn;
        });
        var values = this.getRoles(function (role) {
            return role.dir === dir && role.isBorn;
        });
        if (lastNum === 6 && noBorn.length && !banTakeOff) {
            for (var i = 0; i < noBorn.length; i++) {
                var role = noBorn[i];
                if (!role.isBorn) {
                    return role;
                }
            }
        }
        else {
            var indexInRoad = null;
            var tartget = null;
            for (var i = 0; i < values.length; i++) {
                var role = values[i];
                if (role.isBorn && !role.isBanMove) {
                    var index = role.roadIndex;
                    if (!indexInRoad || index > indexInRoad) {
                        indexInRoad = index;
                        tartget = role;
                    }
                }
            }
            return tartget;
        }
        return null;
    };
    /**从节点池获取 */
    JXRBCmdMgr.prototype.getSpineFormPool = function () {
        var aniNode = this.spinePool.get();
        if (!aniNode) {
            var node = new cc.Node();
            if (!node)
                return;
            var spine = node.addComponent(sp.Skeleton);
            spine.premultipliedAlpha = false;
            aniNode = node;
            node.name = "sk_node";
        }
        return aniNode;
    };
    /**回收到节点池 */
    JXRBCmdMgr.prototype.putSpineToPool = function (sk) {
        sk.node.name = "sk_node";
        sk.skeletonData = null;
        var node = sk.node;
        node.angle = 0;
        node.scale = 1;
        node.opacity = 255;
        node.zIndex = 0;
        sk.setCompleteListener(function () { });
        sk.setEventListener(function (track, event) { });
        node.removeFromParent();
        this.spinePool.put(node);
    };
    JXRBCmdMgr.prototype.destroyAssetManager = function () {
        this.assetManager.destroy();
        this.assetManager = null;
    };
    JXRBCmdMgr.prototype.destroy = function () {
        this.destroyAssetManager();
        this.btlCameraMap = null;
        this.evtMgr.unRegister(this);
        GCtrl_1.GCtrl.ES.off(this);
    };
    return JXRBCmdMgr;
}(ES5Ex_1.ObjectWrap));
exports.default = JXRBCmdMgr;

cc._RF.pop();