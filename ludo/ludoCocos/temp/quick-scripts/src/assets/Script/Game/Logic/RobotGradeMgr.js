"use strict";
cc._RF.push(module, 'c1e2b7o9ChGGIg6GcsMMUNe', 'RobotGradeMgr');
// Script/Game/Logic/RobotGradeMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.IRobotGradeSort = void 0;
var Define_1 = require("../Common/Define");
/**排列 */
var IRobotGradeSort = /** @class */ (function () {
    function IRobotGradeSort() {
    }
    /** 比较机器人段位等级 */
    IRobotGradeSort.sortLevel = function (a, b) {
        var tempalteA = a;
        var templateB = b;
        if (tempalteA.levelLv > templateB.levelLv)
            return Define_1.CompareEnum.CGreater;
        else if (tempalteA.levelLv < templateB.levelLv)
            return Define_1.CompareEnum.CLess;
        else
            return Define_1.CompareEnum.CEQual;
    };
    /** 比较机器人星星数量 */
    IRobotGradeSort.sortStar = function (a, b) {
        var tempalteA = a;
        var templateB = b;
        if (tempalteA.starNum > templateB.starNum)
            return Define_1.CompareEnum.CGreater;
        else if (tempalteA.starNum < templateB.starNum)
            return Define_1.CompareEnum.CLess;
        else
            return Define_1.CompareEnum.CEQual;
    };
    /**比较是否是玩家 */
    IRobotGradeSort.sortUser = function (a, b) {
        var tempalteA = a;
        var templateB = b;
        if (tempalteA.isSelf > templateB.isSelf)
            return Define_1.CompareEnum.CGreater;
        else if (tempalteA.isSelf < templateB.isSelf)
            return Define_1.CompareEnum.CLess;
        else
            return Define_1.CompareEnum.CEQual;
    };
    /** 组合排序 */
    IRobotGradeSort.sorts = function (sortFuncs, a, b) {
        for (var _i = 0, sortFuncs_1 = sortFuncs; _i < sortFuncs_1.length; _i++) {
            var func = sortFuncs_1[_i];
            var ret = func(a, b);
            if (ret == Define_1.CompareEnum.CEQual)
                continue;
            return ret;
        }
        return Define_1.CompareEnum.CEQual;
    };
    return IRobotGradeSort;
}());
exports.IRobotGradeSort = IRobotGradeSort;

cc._RF.pop();