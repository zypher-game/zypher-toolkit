
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXULAssets.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWFVMQXNzZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQXlEO0FBQ3pELHFEQUF5RDtBQUN6RCx5REFBMkQ7QUFDM0Qsd0RBQStDO0FBQy9DLCtDQUEwQztBQUUxQztJQUFrQyxnQ0FBVTtJQUcxQyxzQkFBWSxHQUFXO1FBQXZCLFlBQ0UsaUJBQU8sU0FFUjtRQUxNLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFJbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxvQkFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFDaEQsQ0FBQztJQUVELFdBQVc7SUFDSiwrQkFBUSxHQUFmLFVBQWdCLEtBQVU7O1FBQUUsbUJBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVosa0NBQVk7O1FBQ3RDLENBQUEsS0FBQSxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsUUFBUSwyQkFDckIsVUFDRSxPQUFlLEVBQ2YsVUFBa0IsRUFDbEIsSUFBWSxFQUNaLEdBQVUsRUFDVixLQUFzQjtnQkFFdEIsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFO29CQUN6QixLQUFLLEVBQUUsQ0FBQztpQkFDVDtZQUNILENBQUMsRUFDRCxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxpQkFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDekMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGlCQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxpQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FDOUMsU0FBUyxHQUNaO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kseUNBQWtCLEdBQXpCLFVBQTBCLE1BQW1CLEVBQUUsT0FBZSxFQUFFLEtBQVU7UUFDeEUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN6RDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDLENBQUM7UUFDM0IsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLE9BQWIsSUFBSSxrQkFDRixVQUFDLE9BQWUsRUFBRSxVQUFrQixFQUFFLEtBQWUsSUFBSyxPQUFBLEtBQUssRUFBRSxFQUFQLENBQU8sR0FDOUQsU0FBUyxHQUNaO0lBQ0osQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksc0NBQWUsR0FBdEIsVUFDRSxPQUFlLEVBQ2YsTUFBbUIsRUFDbkIsS0FBZTtRQUVmLElBQUksS0FBSyxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBZ0IsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEdBQUcsaUJBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQ0FBWSxHQUFuQixVQUFvQixLQUFlLEVBQUUsSUFBWTtRQUMvQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksMEJBQWEsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0NBQVcsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO1FBQzNFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FsR0EsQUFrR0MsQ0FsR2lDLGtCQUFVLEdBa0czQztBQWxHWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDaGVzc0J0bCwgU1BsYW5lRGF0YVJhdyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5pbXBvcnQgeyBJTlZBTElEX1ZBTFVFIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgeyBPYmplY3RXcmFwIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgeyBHQXNzZXRJbXBsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXR0bGVBc3NldHMgZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICBwdWJsaWMgYXNzZXRJbXBsOiBHQXNzZXRJbXBsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmFzc2V0SW1wbCA9IEdBc3NldEltcGwuZ2V0QXNzZXRJbXBsKGtleSk7XHJcbiAgfVxyXG5cclxuICAvKiog5Yqg6L296LWE5rqQICovXHJcbiAgcHVibGljIHByZUxvYWRzKGVuZENiOiBhbnksIC4uLmFsbEFzc2V0cykge1xyXG4gICAgdGhpcy5hc3NldEltcGwucHJlTG9hZHMoXHJcbiAgICAgIChcclxuICAgICAgICBjdXJJbmR4OiBudW1iZXIsXHJcbiAgICAgICAgdG90YWxDb3VudDogbnVtYmVyLFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICBlcnI6IEVycm9yLFxyXG4gICAgICAgIGFzc2V0OiB0eXBlb2YgY2MuQXNzZXRcclxuICAgICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKGN1ckluZHggPT0gdG90YWxDb3VudCkge1xyXG4gICAgICAgICAgZW5kQ2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdHlwZTogY2MuUHJlZmFiLCBwYXRoOiBSZXMuZmlnaHQucm9sZSB9LFxyXG4gICAgICB7IHR5cGU6IGNjLlByZWZhYiwgcGF0aDogUmVzLmZpZ2h0LnBsYXllciB9LFxyXG4gICAgICB7IHR5cGU6IGNjLlNwcml0ZUF0bGFzLCBwYXRoOiBSZXMuZmlnaHQuZmlnaHQgfSxcclxuICAgICAgeyB0eXBlOiBzcC5Ta2VsZXRvbkRhdGEsIHBhdGg6IFJlcy5maWdodC5zaGFpemkgfSxcclxuICAgICAgLi4uYWxsQXNzZXRzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yqg6L295omA5pyJ5Zue5ZCI5oiY5paX6LWE5rqQXHJcbiAgICogQHBhcmFtIGlUZWFtcyDkuqTmiJjlj4zmlrnpmJ/kvI3kv6Hmga9cclxuICAgKiBAcGFyYW0gc2NlbmVJZCDlnLrmma9JRFxyXG4gICAqIEBwYXJhbSBlbmRDYiDliqDovb3lrozmiJDlm57osINcclxuICAgKi9cclxuICBwdWJsaWMgbG9hZEFsbFJvdW5kQXNzZXRzKGlUZWFtczogSUNoZXNzQnRsW10sIHNjZW5lSWQ6IG51bWJlciwgZW5kQ2I6IGFueSkge1xyXG4gICAgbGV0IGFsbFBhdGhzID0gW107XHJcbiAgICBsZXQgYWxsQXNzZXRzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlUZWFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGVhbSA9IGlUZWFtc1tpXTtcclxuICAgICAgdGhpcy5sb2FkUGFsbmVBc3NldHModGVhbS50YWJsZUlkLCBhbGxBc3NldHMsIGFsbFBhdGhzKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHsgYWxsQXNzZXRzIH0pO1xyXG4gICAgYWxsQXNzZXRzLnB1c2goKTtcclxuICAgIHRoaXMucHJlTG9hZHMoXHJcbiAgICAgIChjdXJJbmR4OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgYXNzZXQ6IGNjLkFzc2V0KSA9PiBlbmRDYigpLFxyXG4gICAgICAuLi5hbGxBc3NldHNcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAq5Yqg6L296aOe5py65qih5Z6LXHJcbiAgICogQHBhcmFtIHRhYmxlSWQg6aOe5py66Z2Z5oCB6KGoSUTvvJtcclxuICAgKiBAcGFyYW0gYXNzZXRzXHJcbiAgICogQHBhcmFtIHBhdGhzXHJcbiAgICovXHJcbiAgcHVibGljIGxvYWRQYWxuZUFzc2V0cyhcclxuICAgIHRhYmxlSWQ6IG51bWJlcixcclxuICAgIGFzc2V0czogQXNzZXRJbmZvW10sXHJcbiAgICBwYXRoczogc3RyaW5nW11cclxuICApIHtcclxuICAgIGxldCBwbGFuZSA9IEdhbWVNZ3IucGxhbmVEYXRhLmdldFJhdzxTUGxhbmVEYXRhUmF3Pih0YWJsZUlkKTtcclxuICAgIGxldCBwYXRoID0gUmVzLmZpZ2h0LnBsYW5lICsgcGxhbmUubW9kZWwgKyBcIi9cIiArIHBsYW5lLm1vZGVsO1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkUGFsbmVBc3NldHM6XCIsIHsgcGF0aCB9KTtcclxuICAgIGlmICghdGhpcy5oYXNMb2FkQXNzZXQocGF0aHMsIHBhdGgpKSB7XHJcbiAgICAgIGFzc2V0cy5wdXNoKHsgdHlwZTogc3AuU2tlbGV0b25EYXRhLCBwYXRoIH0pO1xyXG4gICAgICBwYXRocy5wdXNoKHBhdGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5rWLcGF0aHPkuK3mmK/lkKbljIXlkKtwYXRoXHJcbiAgICogQHBhcmFtIHBhdGhzIC1cclxuICAgKiBAcGFyYW0gcGF0aCAtXHJcbiAgICovXHJcbiAgcHVibGljIGhhc0xvYWRBc3NldChwYXRoczogc3RyaW5nW10sIHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHBhdGhzLmluZGV4T2YocGF0aCkgIT0gSU5WQUxJRF9WQUxVRTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIm+W7uuS4gOS4qnNwaW5lXHJcbiAgICogQHBhcmFtIHBhdGhcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlU3BpbmUocGF0aDogc3RyaW5nKTogc3AuU2tlbGV0b24ge1xyXG4gICAgbGV0IHNwaW5lTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICBsZXQgc3BpbmUgPSBzcGluZU5vZGUuYWRkQ29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgIHNwaW5lLnByZW11bHRpcGxpZWRBbHBoYSA9IHRydWU7XHJcbiAgICBzcGluZS5za2VsZXRvbkRhdGEgPSB0aGlzLmFzc2V0SW1wbC5nZXRQcmVMb2FkQXNzZXQ8c3AuU2tlbGV0b25EYXRhPihwYXRoKTtcclxuICAgIHJldHVybiBzcGluZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaekOaehO+8jOmHiuaUvui1hOa6kFxyXG4gICAqL1xyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5hc3NldEltcGwucmVsZWFzZSgpO1xyXG4gICAgdGhpcy5hc3NldEltcGwgPSBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=