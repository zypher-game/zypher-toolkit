
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/RobotGradeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9Sb2JvdEdyYWRlTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQStDO0FBTS9DLFFBQVE7QUFDUjtJQUFBO0lBcUNBLENBQUM7SUFwQ0csZ0JBQWdCO0lBQ0YseUJBQVMsR0FBdkIsVUFBd0IsQ0FBaUIsRUFBRSxDQUFpQjtRQUN4RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTztZQUFFLE9BQU8sb0JBQVcsQ0FBQyxRQUFRLENBQUM7YUFDbEUsSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPO1lBQUUsT0FBTyxvQkFBVyxDQUFDLEtBQUssQ0FBQzs7WUFDcEUsT0FBTyxvQkFBVyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ0Ysd0JBQVEsR0FBdEIsVUFBdUIsQ0FBaUIsRUFBRSxDQUFpQjtRQUN2RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTztZQUFFLE9BQU8sb0JBQVcsQ0FBQyxRQUFRLENBQUM7YUFDbEUsSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPO1lBQUUsT0FBTyxvQkFBVyxDQUFDLEtBQUssQ0FBQzs7WUFDcEUsT0FBTyxvQkFBVyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRUQsYUFBYTtJQUNDLHdCQUFRLEdBQXRCLFVBQXVCLENBQWlCLEVBQUUsQ0FBaUI7UUFDdkQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07WUFBRSxPQUFPLG9CQUFXLENBQUMsUUFBUSxDQUFDO2FBQ2hFLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTTtZQUFFLE9BQU8sb0JBQVcsQ0FBQyxLQUFLLENBQUM7O1lBQ2xFLE9BQU8sb0JBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7SUFDRyxxQkFBSyxHQUFuQixVQUFvQixTQUEyQixFQUFFLENBQWlCLEVBQUUsQ0FBaUI7UUFDakYsS0FBaUIsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTLEVBQUU7WUFBdkIsSUFBSSxJQUFJLGtCQUFBO1lBQ1QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLEdBQUcsSUFBSSxvQkFBVyxDQUFDLE1BQU07Z0JBQUUsU0FBUztZQUN4QyxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBTyxvQkFBVyxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQXJDQSxBQXFDQyxJQUFBO0FBckNZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyZUVudW0gfSBmcm9tIFwiLi4vQ29tbW9uL0RlZmluZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb2JvdEdyYWRlRnVuYyB7XHJcbiAgICAoYTogSUdyYWRlUmFua0luZm8sIGI6IElHcmFkZVJhbmtJbmZvLCBleHQ/OiBhbnkpOiBDb21wYXJlRW51bTtcclxufVxyXG5cclxuLyoq5o6S5YiXICovXHJcbmV4cG9ydCBjbGFzcyBJUm9ib3RHcmFkZVNvcnQge1xyXG4gICAgLyoqIOavlOi+g+acuuWZqOS6uuauteS9jeetiee6pyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzb3J0TGV2ZWwoYTogSUdyYWRlUmFua0luZm8sIGI6IElHcmFkZVJhbmtJbmZvKTogQ29tcGFyZUVudW0ge1xyXG4gICAgICAgIGxldCB0ZW1wYWx0ZUEgPSBhO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUIgPSBiO1xyXG4gICAgICAgIGlmICh0ZW1wYWx0ZUEubGV2ZWxMdiA+IHRlbXBsYXRlQi5sZXZlbEx2KSByZXR1cm4gQ29tcGFyZUVudW0uQ0dyZWF0ZXI7XHJcbiAgICAgICAgZWxzZSBpZiAodGVtcGFsdGVBLmxldmVsTHYgPCB0ZW1wbGF0ZUIubGV2ZWxMdikgcmV0dXJuIENvbXBhcmVFbnVtLkNMZXNzO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIENvbXBhcmVFbnVtLkNFUXVhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5q+U6L6D5py65Zmo5Lq65pif5pif5pWw6YePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNvcnRTdGFyKGE6IElHcmFkZVJhbmtJbmZvLCBiOiBJR3JhZGVSYW5rSW5mbyk6IENvbXBhcmVFbnVtIHtcclxuICAgICAgICBsZXQgdGVtcGFsdGVBID0gYTtcclxuICAgICAgICBsZXQgdGVtcGxhdGVCID0gYjtcclxuICAgICAgICBpZiAodGVtcGFsdGVBLnN0YXJOdW0gPiB0ZW1wbGF0ZUIuc3Rhck51bSkgcmV0dXJuIENvbXBhcmVFbnVtLkNHcmVhdGVyO1xyXG4gICAgICAgIGVsc2UgaWYgKHRlbXBhbHRlQS5zdGFyTnVtIDwgdGVtcGxhdGVCLnN0YXJOdW0pIHJldHVybiBDb21wYXJlRW51bS5DTGVzcztcclxuICAgICAgICBlbHNlIHJldHVybiBDb21wYXJlRW51bS5DRVF1YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5q+U6L6D5piv5ZCm5piv546p5a62ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNvcnRVc2VyKGE6IElHcmFkZVJhbmtJbmZvLCBiOiBJR3JhZGVSYW5rSW5mbyk6IENvbXBhcmVFbnVtIHtcclxuICAgICAgICBsZXQgdGVtcGFsdGVBID0gYTtcclxuICAgICAgICBsZXQgdGVtcGxhdGVCID0gYjtcclxuICAgICAgICBpZiAodGVtcGFsdGVBLmlzU2VsZiA+IHRlbXBsYXRlQi5pc1NlbGYpIHJldHVybiBDb21wYXJlRW51bS5DR3JlYXRlcjtcclxuICAgICAgICBlbHNlIGlmICh0ZW1wYWx0ZUEuaXNTZWxmIDwgdGVtcGxhdGVCLmlzU2VsZikgcmV0dXJuIENvbXBhcmVFbnVtLkNMZXNzO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIENvbXBhcmVFbnVtLkNFUXVhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog57uE5ZCI5o6S5bqPICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNvcnRzKHNvcnRGdW5jczogUm9ib3RHcmFkZUZ1bmNbXSwgYTogSUdyYWRlUmFua0luZm8sIGI6IElHcmFkZVJhbmtJbmZvKTogQ29tcGFyZUVudW0ge1xyXG4gICAgICAgIGZvciAobGV0IGZ1bmMgb2Ygc29ydEZ1bmNzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSBmdW5jKGEsIGIpO1xyXG4gICAgICAgICAgICBpZiAocmV0ID09IENvbXBhcmVFbnVtLkNFUXVhbCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDb21wYXJlRW51bS5DRVF1YWw7XHJcbiAgICB9XHJcbn0iXX0=