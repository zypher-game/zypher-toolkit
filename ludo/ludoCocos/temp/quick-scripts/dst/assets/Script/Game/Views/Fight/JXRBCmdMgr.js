
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXRBCmdMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWFJCQ21kTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsdURBS2tDO0FBQ2xDLDJEQUl3QztBQUV4QyxxREFBa0U7QUFDbEUsNkNBQTRDO0FBQzVDLGtFQUE2RDtBQUk3RCxvREFBK0M7QUFDL0MsOENBQWdFO0FBQ2hFLHdEQUErQztBQUUvQywrQ0FBMEM7QUFFMUMsbURBQTZDO0FBQzdDLHFEQUFrRDtBQUNsRCwyQ0FBc0M7QUFDdEMsdUNBQXNDO0FBRXRDLDJDQWFzQjtBQUNULFFBQUEsZUFBZSxHQUFHLEdBQUcsQ0FBQztBQUNuQyxJQUFNLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEQ7SUFBd0MsOEJBQVU7SUE2Q2hELG9CQUFZLE9BQWUsRUFBRSxZQUEwQixFQUFFLEdBQVc7UUFBcEUsWUFDRSxpQkFBTyxTQWlCUjtRQXBERCxXQUFXO1FBQ0QsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUM3QixhQUFhO1FBQ0gsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUNsQyxhQUFhO1FBQ0gsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUdyQyxRQUFRO1FBQ0UsY0FBUSxHQUFXLENBQUMsQ0FBQztRQVl4QixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGNBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3JCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FB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QUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0F0Z0JBLEFBc2dCQyxDQXRnQnVDLGtCQUFVLEdBc2dCakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIElDaGVzc0J0bCxcclxuICBJQ29tTGlrZSxcclxuICBTUGxhbmVEYXRhUmF3LFxyXG4gIFNSYW5rRGF0YVJhdyxcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgSlhEZWYgfSBmcm9tIFwiLi4vLi4vLi4vY29udmVudGlvbnMvSlhDb21tb25cIjtcclxuaW1wb3J0IHtcclxuICBJTlZBTElEX1ZBTFVFLFxyXG4gIElTX0VNUFRZX0lOVkFMSUQsXHJcbiAgT0JKRUNUX0NPUFksXHJcbiAgUFJJT1JJVFlfREFUQSxcclxufSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7XHJcbiAgSlhBY3Rpb25NZ3IsXHJcbiAgSlhCZXppZXJUbyxcclxuICBKWE1vdmVUbyxcclxufSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0FjdGlvbkV4XCI7XHJcbmltcG9ydCB7IENDTm9kZUltcGwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0NDTm9kZUltcGxcIjtcclxuaW1wb3J0IHsgTWFwV3JhcCwgT2JqZWN0V3JhcCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HQ3RybFwiO1xyXG5pbXBvcnQgR0V2ZW50U3lzdGVtIGZyb20gXCIuLi8uLi8uLi9Db3JlL0dFdmVudC9HRXZlbnRTeXN0ZW1cIjtcclxuaW1wb3J0IEdQYXJhbSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HRXZlbnQvR1BhcmFtXCI7XHJcbmltcG9ydCB7IEdBc3NldEltcGwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HTG9hZGVyL0dMb2FkZXJcIjtcclxuaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYW5hZ2VyL0F1ZGlvTWdyXCI7XHJcbmltcG9ydCBNYXRoRXggZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWF0aC9NYXRoRXhcIjtcclxuaW1wb3J0IHsgQ01zZywgSU5GT19UWVBFLCBNYXBMYXllciB9IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IHsgSlhMb2NhbGVzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9aaFwiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgQnRsQ2FtZXJhTWFwIGZyb20gXCIuL0J0bENhbWVyYU1hcFwiO1xyXG5pbXBvcnQgQnRsRmlnaHRMYXllciBmcm9tIFwiLi9CdGxGaWdobHRMYXllclwiO1xyXG5pbXBvcnQgeyBKWElkR2VuZXJhdGVyIH0gZnJvbSBcIi4vSlhCYXR0bGVVdGlsaXR5XCI7XHJcbmltcG9ydCBKWFJCUGxheWVyIGZyb20gXCIuL0pYUkJQbGF5ZXJcIjtcclxuaW1wb3J0IHsgSlhSQlJvbGUgfSBmcm9tIFwiLi9KWFJCUm9sZVwiO1xyXG5pbXBvcnQgeyBCYXR0bGVBc3NldHMgfSBmcm9tIFwiLi9KWFVMQXNzZXRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQmlydGhBbmdsZSxcclxuICBJQ2FtcEtleUNvZGUsXHJcbiAgSlhCdGxCRU1ULFxyXG4gIEpYRUFuaU5hbWVzLFxyXG4gIEpYRURpcixcclxuICBKWEVTdGF0ZSxcclxuICBST0xFX0JPUk5fUE9TLFxyXG4gIFJPTEVfQ09NUF9OQU1FLFxyXG4gIFJPTEVfTkFNRV9QUkVGSVgsXHJcbiAgUk9MRV9ST0FELFxyXG4gIFJPTEVfU1RBUlRfUE9TLFxyXG4gIFJvbGVOdW1iZXIsXHJcbn0gZnJvbSBcIi4vSlhVTERlZmluZVwiO1xyXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX1NQRUVEID0gMS42O1xyXG5jb25zdCBTaGFpWmlfUG9zID0gW2NjLnYyKDk1NiwgNTQwKSwgY2MudjIoOTU2LCA1NDApXTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSlhSQkNtZE1nciBleHRlbmRzIE9iamVjdFdyYXAgaW1wbGVtZW50cyBJQ29tTGlrZSB7XHJcbiAgLyoqIOaJgOacieinkuiJsiAqL1xyXG4gIHByb3RlY3RlZCBfcm9sZXM6IE1hcFdyYXA8c3RyaW5nLCBKWFJCUm9sZT47XHJcbiAgcHJpdmF0ZSBfZGVhdGhSb2xlczogTWFwV3JhcDxudW1iZXIsIHN0cmluZ1tdPjtcclxuICAvKirmiYDmnInnjqnlrrbmlbDmja4gKi9cclxuICBwcm90ZWN0ZWQgX3BsYXllcnM6IE1hcFdyYXA8c3RyaW5nLCBKWFJCUGxheWVyPjtcclxuICAvKiog5omn6KGM54q25oCBICovXHJcbiAgcHJvdGVjdGVkIF9ydW5uaW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBzZXQgcnVubmluZyh2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdjtcclxuICB9XHJcbiAgLyoqIOaSreaUvumAn+W6piAqL1xyXG4gIHByb3RlY3RlZCBfc3BlZWQ6IG51bWJlciA9IDE7XHJcbiAgLyoqICDmmK/lkKbmmoLlgZzkuK0gKi9cclxuICBwcm90ZWN0ZWQgX3BhdXNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqIOaaguWBnOaWsOeahOWRveS7pCAqL1xyXG4gIHByb3RlY3RlZCBfcGF1c2VDbWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgcm9vdE5vZGU6IGNjLk5vZGU7XHJcbiAgcHVibGljIGhlYWROb2RlOiBjYy5Ob2RlO1xyXG4gIC8qKuWcuuaZryAqL1xyXG4gIHByb3RlY3RlZCBfc2NlbmVJZDogbnVtYmVyID0gMDtcclxuICAvKiog5oiY5paX5Yqo5L2c566h55CG5ZmoICovXHJcbiAgcHVibGljIGJ0bEFjdGlvbk1ncjogSlhBY3Rpb25NZ3I7XHJcbiAgLyoqIOaImOaWl+S6i+S7tueuoeeQhuWZqCAqL1xyXG4gIHB1YmxpYyBldnRNZ3I6IEdFdmVudFN5c3RlbTtcclxuICAvKiog5oiY5paX6LWE5rqQ566h55CG5ZmoICovXHJcbiAgcHVibGljIGFzc2V0TWFuYWdlcjogQmF0dGxlQXNzZXRzO1xyXG4gIHByaXZhdGUgX3RlYW06IElDaGVzc0J0bFtdO1xyXG4gIC8qKiBJROeUn+aIkOWZqCAqL1xyXG4gIHB1YmxpYyBpbnNJZEdlbnRvcjogSlhJZEdlbmVyYXRlcjtcclxuICAvKirmiJjmlpflnLDlm77lsYIgKi9cclxuICBwdWJsaWMgYnRsQ2FtZXJhTWFwOiBCdGxDYW1lcmFNYXA7XHJcbiAgcHVibGljIGFzc2V0SW1wbDogR0Fzc2V0SW1wbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBmaWdodExheWVyOiBCdGxGaWdodExheWVyO1xyXG4gIHByb3RlY3RlZCBfY291bnQ6IG51bWJlciA9IDE7XHJcbiAgcHJvdGVjdGVkIGN1ckluZGV4OiBudW1iZXIgPSAxO1xyXG4gIHByb3RlY3RlZCBjdXJSb3VuZDogbnVtYmVyID0gMTtcclxuICBwcml2YXRlIGNhcmRQb29sOiBudW1iZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgYmxpbmRCb3g6IG51bWJlcltdID0gW107XHJcbiAgcHVibGljIGN1clZpYTogbnVtYmVyW10gPSBbXTtcclxuICBwcml2YXRlIHNwaW5lUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsO1xyXG4gIHByaXZhdGUgc3ByaXRlUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsO1xyXG4gIHByaXZhdGUgdGVhbU51bTogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2NlbmVJZDogbnVtYmVyLCBhc3NldE1hbmFnZXI6IEJhdHRsZUFzc2V0cywgbnVtOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnRlYW1OdW0gPSBudW07XHJcbiAgICB0aGlzLl9zY2VuZUlkID0gc2NlbmVJZDtcclxuICAgIHRoaXMuYXNzZXRNYW5hZ2VyID0gYXNzZXRNYW5hZ2VyO1xyXG4gICAgdGhpcy5zcHJpdGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICB0aGlzLnNwaW5lUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgdGhpcy5fcm9sZXMgPSBuZXcgTWFwV3JhcDxzdHJpbmcsIEpYUkJSb2xlPigpO1xyXG4gICAgdGhpcy5fZGVhdGhSb2xlcyA9IG5ldyBNYXBXcmFwPG51bWJlciwgc3RyaW5nW10+KCk7XHJcbiAgICB0aGlzLmJ0bEFjdGlvbk1nciA9IG5ldyBKWEFjdGlvbk1ncigpO1xyXG4gICAgdGhpcy5ldnRNZ3IgPSBuZXcgR0V2ZW50U3lzdGVtKCk7XHJcbiAgICB0aGlzLmluc0lkR2VudG9yID0gbmV3IEpYSWRHZW5lcmF0ZXIoXCJQbGFuZVwiKTtcclxuICAgIHRoaXMuX3BsYXllcnMgPSBuZXcgTWFwV3JhcDxzdHJpbmcsIEpYUkJQbGF5ZXI+KCk7XHJcbiAgICBsZXQgY3VyRGFuID0gR2FtZU1nci5sVXNlckRhdGEuUmFua0x2O1xyXG4gICAgbGV0IHJhdyA9IEdhbWVNZ3IucmFua0RhdGEuZ2V0UmF3PFNSYW5rRGF0YVJhdz4oY3VyRGFuKTtcclxuICAgIHRoaXMuYmxpbmRCb3ggPSByYXcuYmxpbmRCb3g7XHJcbiAgICB0aGlzLmJ0bENhbWVyYU1hcCA9IG51bGw7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0VGVhbShjaGVzc1RlYW06IElDaGVzc0J0bFtdKSB7XHJcbiAgICB0aGlzLl90ZWFtID0gY2hlc3NUZWFtO1xyXG4gIH1cclxuXHJcbiAgLyoq5rOo5YaM5LqL5Lu2ICovXHJcbiAgcHJvdGVjdGVkIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICB0aGlzLmV2dE1nci5yZWdpc3RlcihcclxuICAgICAgQ01zZy5jbGllbnQuZmlnaHQub25QbGF5ZXJFbmRBY3Rpb24sXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25QbGF5ZXJBY3Rpb25GaW5pc2guYmluZCh0aGlzKSxcclxuICAgICAgUFJJT1JJVFlfREFUQVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKua3u+WKoOWKqOS9nCAqL1xyXG4gIHB1YmxpYyBhZGRBY3Rpb24oXHJcbiAgICBpbXBsOiBDQ05vZGVJbXBsLFxyXG4gICAgYWN0aW9uOiBjYy5BY3Rpb24sXHJcbiAgICBwYXVzZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKTogY2MuQWN0aW9uIHtcclxuICAgIHRoaXMuYnRsQWN0aW9uTWdyLmFkZEFjdGlvbihhY3Rpb24sIGltcGwsIHBhdXNlKTtcclxuICAgIHJldHVybiBhY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKirnp7vpmaTliqjkvZwgKi9cclxuICBwdWJsaWMgcmVtb3ZlQWN0aW9uKGFjdGlvbjogY2MuQWN0aW9uKSB7XHJcbiAgICB0aGlzLmJ0bEFjdGlvbk1nci5yZW1vdmVBY3Rpb24oYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKiDlrp7kvovljJbmuLjmiI/lnLrmma8gKi9cclxuICBwdWJsaWMgaW5pdFJEQnRsTGF5ZXIodGFyZ2V0OiBjYy5Ob2RlLCBoZWFkQ29udGVudDogY2MuTm9kZSkge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWhlYWRDb250ZW50KSByZXR1cm47XHJcbiAgICB0aGlzLnJvb3ROb2RlID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5oZWFkTm9kZSA9IGhlYWRDb250ZW50O1xyXG4gICAgdGhpcy5maWdodExheWVyID0gdGhpcy5yb290Tm9kZS5nZXRDb21wb25lbnQoQnRsRmlnaHRMYXllcik7XHJcbiAgICB0aGlzLmFzc2V0SW1wbCA9IHRoaXMuZmlnaHRMYXllci5hc3NldEltcGw7XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgLyoq5Yqg6L295Zy65pmv5omA6ZyA55qE6LWE5rqQICovXHJcbiAgcHVibGljIGxvYWRBbGxSZXNvdXJjZXMoZW5kQ2I6IGFueSkge1xyXG4gICAgdGhpcy5hc3NldE1hbmFnZXIubG9hZEFsbFJvdW5kQXNzZXRzKHRoaXMuX3RlYW0sIHRoaXMuX3NjZW5lSWQsICgpID0+IHtcclxuICAgICAgZW5kQ2IoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoq5re75Yqg6KeS6ImyICovXHJcbiAgcHVibGljIGFkZFJvbGUocm9sZTogSlhSQlJvbGUsIGlkOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLl9yb2xlcy5oYXMoaWQpKSByZXR1cm47XHJcbiAgICByb2xlLnBhcmVudCA9IHRoaXMucm9vdE5vZGU7XHJcbiAgICB0aGlzLl9yb2xlcy5zZXQoaWQsIHJvbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoq5bCG6KeS6Imy56e76ZmkIOS9huaYr+eVjOmdouayoeacieenu+mZpCAqL1xyXG4gIHB1YmxpYyByZW1vdmVSb2xlKGlkOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLl9yb2xlcy5oYXMoaWQpKSB7XHJcbiAgICAgIHRoaXMuX3JvbGVzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnRDbWQoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh7IF9wbGF5ZXJzOiBKU09OLnN0cmluZ2lmeSh0aGlzLl9wbGF5ZXJzLmdldChcIlBsYXllci4xXCIpKSB9KTtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5jdXJJbmRleCA9IDA7XHJcbiAgICB0aGlzLmN1clJvdW5kID0gMDtcclxuICAgIHRoaXMuYWN0aW9uU3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8qKuWbnuWQiOW8gOWniyAqL1xyXG4gIHB1YmxpYyBhY3Rpb25TdGFydCgpIHtcclxuICAgIHRoaXMuY3VyVmlhID0gW107XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLmN1ckluZGV4ICUgdGhpcy5fdGVhbS5sZW5ndGg7XHJcbiAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy52YWx1ZXM8SlhSQlBsYXllcj4oKVtpbmRleF07XHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgaWYgKHRoaXMuY3VyUm91bmQgIT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1clJvdW5kKys7XHJcbiAgICAgIGNvbnNvbGUuZ3JvdXAoYOesrCR7dGhpcy5jdXJSb3VuZH3lm57lkIjlvIDlp4tgKTtcclxuICAgIH1cclxuICAgIHBsYXllci5zdGFydEFjdGlvblRpbWVyKHRoaXMuY3VyUm91bmQpO1xyXG4gIH1cclxuXHJcbiAgLyoq5LiL5LiA5Zue5ZCIICovXHJcbiAgcHVibGljIG5leHRBY3Rpb24oKSB7XHJcbiAgICB0aGlzLmN1ckluZGV4Kys7XHJcbiAgICB0aGlzLmFjdGlvblN0YXJ0KCk7XHJcbiAgfVxyXG4gIC8qKuW9k+S4gOS4queOqeWutuihjOWKqOe7k+adnyAqL1xyXG4gIHB1YmxpYyBvblBsYXllckFjdGlvbkZpbmlzaChfLCBwYXJhbTogR1BhcmFtKSB7XHJcbiAgICB0aGlzLm5leHRBY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKuWIm+W7uumYn+S8jSAqL1xyXG4gIHB1YmxpYyBjcmVhdGVUZWFtKCkge1xyXG4gICAgbGV0IHByZWZhYiA9IHRoaXMuYXNzZXRNYW5hZ2VyLmFzc2V0SW1wbC5nZXRQcmVMb2FkQXNzZXQ8Y2MuUHJlZmFiPihcclxuICAgICAgUmVzLmZpZ2h0LnBsYXllclxyXG4gICAgKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdGVhbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgaW5mbyA9IHRoaXMuX3RlYW1baV07XHJcbiAgICAgIGNvbnNvbGUubG9nKHsgaW5mbyB9KTtcclxuICAgICAgbGV0IHRhYmxlSWQgPSBpbmZvLnRhYmxlSWQ7XHJcbiAgICAgIGxldCBkaXIgPSBpbmZvLmRpcjtcclxuICAgICAgbGV0IGhlYWRSb290ID0gdGhpcy5oZWFkTm9kZS5nZXRDaGlsZEJ5TmFtZShcInBvc1wiICsgZGlyKTtcclxuICAgICAgbGV0IHBvaW50cyA9IFJPTEVfQk9STl9QT1NbZGlyXTtcclxuICAgICAgbGV0IHBvaW50QXJyID0gW107XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRlYW1OdW07IGluZGV4KyspIHtcclxuICAgICAgICBwb2ludEFyci5wdXNoKHBvaW50c1tpbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHsgcG9pbnRzLCBwb2ludEFyciB9KTtcclxuICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICBoZWFkUm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgbm9kZS5uYW1lID0gaW5mby5pZDtcclxuICAgICAgbGV0IGNvbXAgPSBub2RlLmdldENvbXBvbmVudChKWFJCUGxheWVyKTtcclxuICAgICAgY29tcC5pbml0RGF0YShpbmZvLCB0aGlzKTtcclxuICAgICAgdGhpcy5fcGxheWVycy5zZXQoaW5mby5pZCwgY29tcCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9pbnQgPSBwb2ludEFycltpXTtcclxuICAgICAgICAvLyBsZXQgcG9zID0gR2FtZU1nci5tYXBNZ3IuZGVjb2RlWHh5eShwb2ludCk7XHJcbiAgICAgICAgbGV0IHBsYW5lSWQgPSB0aGlzLmluc0lkR2VudG9yLmdldE5ld0lkKCk7XHJcbiAgICAgICAgbGV0IHJvbGUgPSB0aGlzLmNyZWF0ZVJvbGUoXHJcbiAgICAgICAgICBwbGFuZUlkLFxyXG4gICAgICAgICAgdGFibGVJZCxcclxuICAgICAgICAgIGRpcixcclxuICAgICAgICAgIGksXHJcbiAgICAgICAgICBjYy52Mihwb2ludC54LCBwb2ludC55KSAvLyBCaXJ0aFBvc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgcm9sZS5iaW5kUGxheWVyKGNvbXApO1xyXG4gICAgICAgIGNvbXAuc2V0Um9sZShyb2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq5Yib5bu66KeS6ImyICovXHJcbiAgcHVibGljIGNyZWF0ZVJvbGUoXHJcbiAgICBwbGFuZUlkOiBzdHJpbmcsXHJcbiAgICB0YWJsZUlkOiBudW1iZXIsXHJcbiAgICBkaXI6IEpYRURpcixcclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICBwb3M/OiBjYy5WZWMyXHJcbiAgKSB7XHJcbiAgICBpZiAoSVNfRU1QVFlfSU5WQUxJRChwbGFuZUlkKSkgcmV0dXJuO1xyXG4gICAgbGV0IHJhdyA9IEdhbWVNZ3IucGxhbmVEYXRhLmdldFJhdzxTUGxhbmVEYXRhUmF3Pih0YWJsZUlkKTtcclxuICAgIGxldCByb2xlOiBKWFJCUm9sZTtcclxuICAgIGxldCBtb2RlbDogc3RyaW5nID0gUmVzLmZpZ2h0LnBsYW5lICsgcmF3Lm1vZGVsICsgXCIvXCIgKyByYXcubW9kZWw7XHJcbiAgICBsZXQgcm9hZCA9IFJPTEVfUk9BRFtkaXJdO1xyXG4gICAgY29uc3Qgc3RhcnRQb3MgPSBST0xFX1NUQVJUX1BPU1tkaXJdO1xyXG4gICAgY29uc3QgYW5nbGVQb3MgPSBCaXJ0aEFuZ2xlW2Rpcl07XHJcbiAgICByb2xlID0gdGhpcy5jcmVhdGVSb2xlTW9kZWwoXHJcbiAgICAgIGRpcixcclxuICAgICAgbW9kZWwsXHJcbiAgICAgIEpYUkJSb2xlLFxyXG4gICAgICBkaXIgKiBJQ2FtcEtleUNvZGUgKyB0aGlzLl9jb3VudCxcclxuICAgICAgcGxhbmVJZCwgLy8gaWRcclxuICAgICAgaW5kZXhcclxuICAgICk7XHJcbiAgICB0aGlzLmFkZFJvbGUocm9sZSwgcm9sZS5pZCk7XHJcbiAgICBsZXQgc2NhbGUgPSByb2xlLnNjYWxlO1xyXG4gICAgbGV0IHNpemUgPSBjYy5zaXplKFxyXG4gICAgICByb2xlLnNrZWxldG9uLm5vZGUud2lkdGggKiBzY2FsZSxcclxuICAgICAgcm9sZS5za2VsZXRvbi5ub2RlLmhlaWdodCAqIHNjYWxlXHJcbiAgICApO1xyXG4gICAgcm9sZS5za2VsZXRvbi5ub2RlW1wic1dpZHRoXCJdID0gc2l6ZS53aWR0aDtcclxuICAgIHJvbGUuc2tlbGV0b24ubm9kZVtcInNIZWlnaHRcIl0gPSBzaXplLmhlaWdodDtcclxuICAgIHJvbGUuX25hbWUgPSByYXcubmFtZTtcclxuICAgIHJvbGUuc2V0QW5nbGUoYW5nbGVQb3MpO1xyXG4gICAgcm9sZS5zZXRCaXJ0aFBvcyhwb3MpO1xyXG4gICAgcm9sZS5zZXRTdGFydFBvcyhzdGFydFBvcyk7XHJcbiAgICByb2xlLnNldFJvYWRQb3Mocm9hZCk7XHJcbiAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgcm9sZS5za2VsZXRvbi50aW1lU2NhbGUgPSBBTklNQVRJT05fU1BFRUQgKiB0aGlzLl9zcGVlZDtcclxuICAgIHJvbGUuY2hhbmdlU3RhdGUoSlhFU3RhdGUuSWRsZSk7XHJcbiAgICByZXR1cm4gcm9sZTtcclxuICB9XHJcblxyXG4gIC8qKuWIm+W7uuaooeWei+inkuiJsuaooeWeiyovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZVJvbGVNb2RlbDxUIGV4dGVuZHMgSlhSQlJvbGU+KFxyXG4gICAgZGlyOiBKWEVEaXIsXHJcbiAgICBtb2RlbDogc3RyaW5nLFxyXG4gICAgdHlwZTogeyBuZXcgKG9iamVjdDogY2MuTm9kZSk6IFQgfSxcclxuICAgIGlLZXk6IG51bWJlcixcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBpbmRleFxyXG4gICk6IFQge1xyXG4gICAgbGV0IHByZWZhYiA9IHRoaXMuYXNzZXRNYW5hZ2VyLmFzc2V0SW1wbC5nZXRQcmVMb2FkQXNzZXQ8Y2MuUHJlZmFiPihcclxuICAgICAgUmVzLmZpZ2h0LnJvbGVcclxuICAgICk7XHJcbiAgICBpZiAoIXByZWZhYikgcmV0dXJuO1xyXG4gICAgbGV0IHJvbGVOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuXHJcbiAgICByb2xlTm9kZS5uYW1lID0gUk9MRV9OQU1FX1BSRUZJWCArIGBfJHtkaXJ9XyR7aW5kZXh9YDtcclxuICAgIGxldCByb2xlU2sgPSByb2xlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNrZWxldG9uXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICBpZiAoIXJvbGVTaykgcmV0dXJuO1xyXG4gICAgcm9sZVNrLnNrZWxldG9uRGF0YSA9XHJcbiAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmFzc2V0SW1wbC5nZXRQcmVMb2FkQXNzZXQ8c3AuU2tlbGV0b25EYXRhPihtb2RlbCk7XHJcbiAgICByb2xlU2suZGVmYXVsdFNraW4gPSBcInNraW5cIiArIGRpcjtcclxuICAgIHJvbGVTay5zZXRBbmltYXRpb24oMCwgSlhFQW5pTmFtZXMuaWRsZSwgdHJ1ZSk7XHJcbiAgICBsZXQgcm9sZSA9IG5ldyB0eXBlKHJvbGVOb2RlKTtcclxuICAgIHJvbGUuY21kID0gdGhpcztcclxuICAgIHJvbGUuaWQgPSBpZDtcclxuICAgIHJvbGUuaUtleSA9IGlLZXk7XHJcbiAgICByb2xlLmluaXRTdGF0ZSgpO1xyXG4gICAgcm9sZS5zZXRNb2RlbChtb2RlbCk7XHJcbiAgICByb2xlLnNldERpcihkaXIpO1xyXG5cclxuICAgIHJldHVybiByb2xlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFJvbGVzKHNlbGVjdENiPzogeyAocm9sZTogSlhSQlJvbGUpOiBib29sZWFuIH0pOiBKWFJCUm9sZVtdIHtcclxuICAgIGlmICghc2VsZWN0Q2IpIHJldHVybiB0aGlzLl9yb2xlcy52YWx1ZXMoKTtcclxuICAgIGxldCByb2xlcyA9IFtdO1xyXG4gICAgdGhpcy5fcm9sZXMuZm9yRWFjaCgodikgPT4ge1xyXG4gICAgICBpZiAoc2VsZWN0Q2IodikpIHJvbGVzLnB1c2godik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByb2xlcztcclxuICB9XHJcblxyXG4gIC8qKuWBnOatoiAqL1xyXG4gIHB1YmxpYyBzdG9wUnVuKCkge1xyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoq5oGi5aSNICovXHJcbiAgcHVibGljIHJ1bigpIHtcclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgIGlmICghdGhpcy5fcm9sZXMpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl9wYXVzZSkgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuX3BhdXNlQ21kKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuX3J1bm5pbmcpIHJldHVybjtcclxuICAgIGxldCBkdCA9IGNjLmRpcmVjdG9yLmdldERlbHRhVGltZSgpO1xyXG4gICAgZHQgKj0gdGhpcy5fc3BlZWQgKiBBTklNQVRJT05fU1BFRUQ7XHJcbiAgICB0aGlzLl9yb2xlcy5mb3JFYWNoKCh2KSA9PiB2LnVwZGF0ZShkdCkpO1xyXG4gICAgdGhpcy5idGxBY3Rpb25NZ3IudXBkYXRlKGR0KTtcclxuICB9XHJcblxyXG4gIC8q5oqV5o636aqw5a2QKiovXHJcbiAgcHVibGljIHRocm93RGljZShkaXI6IG51bWJlciwgY2I6IEZ1bmN0aW9uLCB2PzogbnVtYmVyKSB7XHJcbiAgICBsZXQgZGljZVJlc3VsdCA9IHYgPyBbdl0gOiB0aGlzLmdldERpY2VOdW1iZXIoMSk7XHJcbiAgICBsZXQgbnVtID0gMDtcclxuICAgIGRpY2VSZXN1bHQuZm9yRWFjaCgodikgPT4ge1xyXG4gICAgICBudW0gKz0gdjtcclxuICAgIH0pO1xyXG4gICAgLy8qKirmqKHmi5/nrZvlrZDmipXmjrfliqjnlLsgKi9cclxuICAgIGxldCBza2VsZXRvbjogc3AuU2tlbGV0b24gPSB0aGlzLmZpZ2h0TGF5ZXIuc2hhaXppO1xyXG4gICAgbGV0IHBvcyA9IFNoYWlaaV9Qb3NbMF07XHJcbiAgICBza2VsZXRvbi5ub2RlLnBvc2l0aW9uID0gY2MudjMocG9zLngsIHBvcy55KTtcclxuICAgIHZhciBhbmkgPSBcInNoYW5nXCIgKyBudW07XHJcbiAgICAvLyAxOiBcIuiTneaWuVwiLFxyXG4gICAgLy8gMjogXCLnuqLmlrlcIixcclxuICAgIC8vIDM6IFwi6buE5pa5XCIsXHJcbiAgICAvLyA0OiBcIue7v+aWuVwiXHJcbiAgICBzd2l0Y2ggKGRpcikge1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYW5pID0gXCJ5b3VzaGFuZ1wiICsgbnVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBhbmkgPSBcInp1b3hpYVwiICsgbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGFuaSA9IFwienVvc2hhbmdcIiArIG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBhbmkgPSBcInlvdXhpYVwiICsgbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBza2VsZXRvbi5ub2RlLnNjYWxlID0gMC41O1xyXG4gICAgc2tlbGV0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIGFuaSwgZmFsc2UpO1xyXG4gICAgc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgIGNjLnR3ZWVuKHNrZWxldG9uLm5vZGUpLmRlbGF5KDAuNSkudG8oMC41LCB7IHNjYWxlOiAwIH0pLnN0YXJ0KCk7XHJcbiAgICAgIGNiKG51bSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKuagueaNruaVsOmHj+iOt+WPluetm+WtkCAqL1xyXG4gIHByb3RlY3RlZCBnZXREaWNlTnVtYmVyKG46IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgIGxldCBudW0gPSBbXTtcclxuICAgIGxldCBhcnIgPSBbMSwgMiwgMywgNCwgNSwgNl07XHJcbiAgICBhcnIgPSBNYXRoRXguZmlzaGVyWWF0ZXNTaHVmZmxlKGFycik7XHJcbiAgICBsZXQgZHJhd0xpc3QgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGxldCBsaXN0ID0gbmV3IEFycmF5KDEwMCAqIG4pLmZpbGwoYXJyW2pdKTtcclxuICAgICAgZHJhd0xpc3QucHVzaCguLi5saXN0KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgIGxldCBpbmRleCA9IE1hdGhFeC5yYW5kb20oMCwgZHJhd0xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgIG51bS5wdXNoKGRyYXdMaXN0W2luZGV4XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuICAvKirliKTmlq3mmK/lkKblrZjlnKjnm7jlkIzpopzoibLnmoTpo57mnLoqL1xyXG4gIHB1YmxpYyBzZXREZWF0aFJvbGVzKGRpcjogSlhFRGlyLCBpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAvLyBfZGVhdGhSb2xlc1xyXG4gICAgbGV0IHZhbDogc3RyaW5nW10gPSBbXTtcclxuICAgIGlmICh0aGlzLl9kZWF0aFJvbGVzLmhhcyhkaXIpKSB7XHJcbiAgICAgIHZhbCA9IHRoaXMuX2RlYXRoUm9sZXMuZ2V0KGRpcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kZWF0aFJvbGVzLnNldChkaXIsIFsuLi52YWwsIGlkXSk7XHJcbiAgICBjb25zb2xlLmxvZyh7IF9kZWF0aFJvbGVzOiB0aGlzLl9kZWF0aFJvbGVzLmdldChkaXIpIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlYXRoUm9sZXMuZ2V0KGRpcikubGVuZ3RoID09PSBSb2xlTnVtYmVyID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICAvKirliKTmlq3mmK/lkKblrZjlnKjnm7jlkIzkvY3nva7nmoTpo57mnLoqL1xyXG4gIHB1YmxpYyBjaGVja0hhdmVQbGFuZUluSGVyZShwb3NpdGlvbjogY2MuVmVjMiwgcm9sZUlkPzogc3RyaW5nKTogSlhSQlJvbGVbXSB7XHJcbiAgICBsZXQgcm9sZXMgPSB0aGlzLl9yb2xlcy52YWx1ZXM8SlhSQlJvbGU+KCk7XHJcbiAgICBsZXQgdGFyZ2V0cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgcm9sZSA9IHJvbGVzW2ldO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgTWF0aC5yb3VuZChwb3NpdGlvbi54KSA9PT0gTWF0aC5yb3VuZChyb2xlLnBvc2l0aW9uLngpICYmXHJcbiAgICAgICAgTWF0aC5yb3VuZChwb3NpdGlvbi55KSA9PT0gTWF0aC5yb3VuZChyb2xlLnBvc2l0aW9uLnkpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChyb2xlSWQgJiYgcm9sZUlkICE9IHJvbGUuaWQpIHtcclxuICAgICAgICAgIHRhcmdldHMucHVzaChyb2xlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFyb2xlSWQpIHtcclxuICAgICAgICAgIHRhcmdldHMucHVzaChyb2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlY292ZXJUb3Bvb2woaXRlbTogY2MuTm9kZSkge1xyXG4gICAgaXRlbS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5bmnIDov5zot53nprvnmoTop5LoibIqL1xyXG4gIHByb3RlY3RlZCBnZXRMb25nRGlzdGVudEJ5RGlyKFxyXG4gICAgZGlyOiBKWEVEaXIsXHJcbiAgICBzZWxlY3RDYj86IHsgKHJvbGU6IEpYUkJSb2xlKTogYm9vbGVhbiB9XHJcbiAgKTogSlhSQlJvbGUge1xyXG4gICAgaWYgKCFzZWxlY3RDYikge1xyXG4gICAgICBzZWxlY3RDYiA9IChyb2xlOiBKWFJCUm9sZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByb2xlLmRpciA9PT0gZGlyICYmIHJvbGUuaXNCb3JuICYmICFyb2xlLmlzQmFuTW92ZTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGxldCB2YWx1ZXMgPSB0aGlzLmdldFJvbGVzKHNlbGVjdENiKTtcclxuICAgIGxldCBpbmRleEluUm9hZCA9IG51bGw7XHJcbiAgICBsZXQgdGFydGdldCA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgcm9sZSA9IHZhbHVlc1tpXTtcclxuICAgICAgbGV0IGluZGV4ID0gcm9sZS5yb2FkSW5kZXg7XHJcbiAgICAgIGlmICghaW5kZXhJblJvYWQgfHwgaW5kZXggPiBpbmRleEluUm9hZCkge1xyXG4gICAgICAgIGluZGV4SW5Sb2FkID0gaW5kZXg7XHJcbiAgICAgICAgdGFydGdldCA9IHJvbGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJ0Z2V0O1xyXG4gIH1cclxuXHJcbiAgLyoq5ou/5Yiw5a+56Zi16JCl6Lev5b6E5LiK55qE6KeS6Imy6Led56a7ICovXHJcbiAgcHJvdGVjdGVkIGdldERpc3RlbnRJbkRpcihkaXI6IEpYRURpciwgcm9sZTogSlhSQlJvbGUpIHtcclxuICAgIGNvbnN0IHBvc0lkID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB4OiByb2xlLnRhcmdldC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiByb2xlLnRhcmdldC5wb3NpdGlvbi55LFxyXG4gICAgfSk7XHJcbiAgICBsZXQgcm9hZHMgPSBKU09OLnN0cmluZ2lmeShST0xFX1JPQURbZGlyXSk7XHJcbiAgICByZXR1cm4gcm9hZHMuaW5kZXhPZihwb3NJZCk7XHJcbiAgfVxyXG5cclxuICAvKirpgInmi6nkuIDkuKrop5LoibLov5vooYzooYzliqgqL1xyXG4gIHB1YmxpYyByYW5kb21Sb2xlVG9BY3Rpb24oXHJcbiAgICBsYXN0TnVtOiBudW1iZXIsXHJcbiAgICBkaXI6IEpYRURpcixcclxuICAgIGJhblRha2VPZmY6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICk6IEpYUkJSb2xlIHtcclxuICAgIGxldCBub0Jvcm4gPSB0aGlzLmdldFJvbGVzKChyb2xlKSA9PiB7XHJcbiAgICAgIHJldHVybiByb2xlLmRpciA9PT0gZGlyICYmICFyb2xlLmlzQm9ybjtcclxuICAgIH0pO1xyXG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuZ2V0Um9sZXMoKHJvbGUpID0+IHtcclxuICAgICAgcmV0dXJuIHJvbGUuZGlyID09PSBkaXIgJiYgcm9sZS5pc0Jvcm47XHJcbiAgICB9KTtcclxuICAgIGlmIChsYXN0TnVtID09PSA2ICYmIG5vQm9ybi5sZW5ndGggJiYgIWJhblRha2VPZmYpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub0Jvcm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcm9sZSA9IG5vQm9ybltpXTtcclxuICAgICAgICBpZiAoIXJvbGUuaXNCb3JuKSB7XHJcbiAgICAgICAgICByZXR1cm4gcm9sZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBpbmRleEluUm9hZCA9IG51bGw7XHJcbiAgICAgIGxldCB0YXJ0Z2V0ID0gbnVsbDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcm9sZSA9IHZhbHVlc1tpXTtcclxuICAgICAgICBpZiAocm9sZS5pc0Jvcm4gJiYgIXJvbGUuaXNCYW5Nb3ZlKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSByb2xlLnJvYWRJbmRleDtcclxuICAgICAgICAgIGlmICghaW5kZXhJblJvYWQgfHwgaW5kZXggPiBpbmRleEluUm9hZCkge1xyXG4gICAgICAgICAgICBpbmRleEluUm9hZCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0YXJ0Z2V0ID0gcm9sZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRhcnRnZXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKuS7juiKgueCueaxoOiOt+WPliAqL1xyXG4gIHByaXZhdGUgZ2V0U3BpbmVGb3JtUG9vbCgpIHtcclxuICAgIGxldCBhbmlOb2RlID0gdGhpcy5zcGluZVBvb2wuZ2V0KCk7XHJcbiAgICBpZiAoIWFuaU5vZGUpIHtcclxuICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuICAgICAgbGV0IHNwaW5lID0gbm9kZS5hZGRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICBzcGluZS5wcmVtdWx0aXBsaWVkQWxwaGEgPSBmYWxzZTtcclxuICAgICAgYW5pTm9kZSA9IG5vZGU7XHJcbiAgICAgIG5vZGUubmFtZSA9IFwic2tfbm9kZVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFuaU5vZGU7XHJcbiAgfVxyXG5cclxuICAvKirlm57mlLbliLDoioLngrnmsaAgKi9cclxuICBwcml2YXRlIHB1dFNwaW5lVG9Qb29sKHNrOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgc2subm9kZS5uYW1lID0gXCJza19ub2RlXCI7XHJcbiAgICBzay5za2VsZXRvbkRhdGEgPSBudWxsO1xyXG4gICAgbGV0IG5vZGUgPSBzay5ub2RlO1xyXG4gICAgbm9kZS5hbmdsZSA9IDA7XHJcbiAgICBub2RlLnNjYWxlID0gMTtcclxuICAgIG5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgIG5vZGUuekluZGV4ID0gMDtcclxuICAgIHNrLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge30pO1xyXG4gICAgc2suc2V0RXZlbnRMaXN0ZW5lcihcclxuICAgICAgKHRyYWNrOiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudDogc3Auc3BpbmUuRXZlbnQpID0+IHt9XHJcbiAgICApO1xyXG4gICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB0aGlzLnNwaW5lUG9vbC5wdXQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveUFzc2V0TWFuYWdlcigpIHtcclxuICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuYXNzZXRNYW5hZ2VyID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5kZXN0cm95QXNzZXRNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLmJ0bENhbWVyYU1hcCA9IG51bGw7XHJcbiAgICB0aGlzLmV2dE1nci51blJlZ2lzdGVyKHRoaXMpO1xyXG4gICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=