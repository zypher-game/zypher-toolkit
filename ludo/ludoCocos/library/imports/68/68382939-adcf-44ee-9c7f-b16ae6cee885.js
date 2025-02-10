"use strict";
cc._RF.push(module, '68382k5rc9E7px/sWrmzuiF', 'JXULAssets');
// Script/Game/Views/Fight/JXULAssets.ts

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
exports.BattleAssets = void 0;
var CoreDefine_1 = require("../../../Core/CoreDefine");
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var GLoader_1 = require("../../../Core/GLoader/GLoader");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var BattleAssets = /** @class */ (function (_super) {
    __extends(BattleAssets, _super);
    function BattleAssets(key) {
        var _this = _super.call(this) || this;
        _this.assetImpl = null;
        _this.assetImpl = GLoader_1.GAssetImpl.getAssetImpl(key);
        return _this;
    }
    /** 加载资源 */
    BattleAssets.prototype.preLoads = function (endCb) {
        var _a;
        var allAssets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            allAssets[_i - 1] = arguments[_i];
        }
        (_a = this.assetImpl).preLoads.apply(_a, __spreadArrays([function (curIndx, totalCount, path, err, asset) {
                if (curIndx == totalCount) {
                    endCb();
                }
            }, { type: cc.Prefab, path: UIResources_1.Res.fight.role },
            { type: cc.Prefab, path: UIResources_1.Res.fight.player },
            { type: cc.SpriteAtlas, path: UIResources_1.Res.fight.fight },
            { type: sp.SkeletonData, path: UIResources_1.Res.fight.shaizi }], allAssets));
    };
    /**
     * 加载所有回合战斗资源
     * @param iTeams 交战双方队伍信息
     * @param sceneId 场景ID
     * @param endCb 加载完成回调
     */
    BattleAssets.prototype.loadAllRoundAssets = function (iTeams, sceneId, endCb) {
        var allPaths = [];
        var allAssets = [];
        for (var i = 0; i < iTeams.length; i++) {
            var team = iTeams[i];
            this.loadPalneAssets(team.tableId, allAssets, allPaths);
        }
        console.log({ allAssets: allAssets });
        allAssets.push();
        this.preLoads.apply(this, __spreadArrays([function (curIndx, totalCount, asset) { return endCb(); }], allAssets));
    };
    /**
     *加载飞机模型
     * @param tableId 飞机静态表ID；
     * @param assets
     * @param paths
     */
    BattleAssets.prototype.loadPalneAssets = function (tableId, assets, paths) {
        var plane = GameMgr_1.default.planeData.getRaw(tableId);
        var path = UIResources_1.Res.fight.plane + plane.model + "/" + plane.model;
        console.log("loadPalneAssets:", { path: path });
        if (!this.hasLoadAsset(paths, path)) {
            assets.push({ type: sp.SkeletonData, path: path });
            paths.push(path);
        }
    };
    /**
     * 检测paths中是否包含path
     * @param paths -
     * @param path -
     */
    BattleAssets.prototype.hasLoadAsset = function (paths, path) {
        return paths.indexOf(path) != CoreDefine_1.INVALID_VALUE;
    };
    /**
     * 创建一个spine
     * @param path
     */
    BattleAssets.prototype.createSpine = function (path) {
        var spineNode = new cc.Node();
        var spine = spineNode.addComponent(sp.Skeleton);
        spine.premultipliedAlpha = true;
        spine.skeletonData = this.assetImpl.getPreLoadAsset(path);
        return spine;
    };
    /**
     * 析构，释放资源
     */
    BattleAssets.prototype.destroy = function () {
        this.assetImpl.release();
        this.assetImpl = null;
    };
    return BattleAssets;
}(ES5Ex_1.ObjectWrap));
exports.BattleAssets = BattleAssets;

cc._RF.pop();