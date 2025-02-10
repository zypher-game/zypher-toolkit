
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SRankData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a688fP1v5JPublfbeP+v+9j', 'SRankData');
// Script/Game/Data/Static/SRankData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SRankData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SRankData = /** @class */ (function (_super) {
    __extends(SRankData, _super);
    function SRankData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SRankData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SRankData = __decorate([
        ccclass
    ], SRankData);
    return SRankData;
}(DataPool_1.GStatic));
exports.SRankData = SRankData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TUmFua0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFFakQsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBK0IsNkJBQU87SUFBdEM7O0lBU0EsQ0FBQztJQVJVLHlCQUFLLEdBQVosVUFBYSxHQUFRO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLEdBQUcsR0FBRyxrQkFBTyxDQUFDLFFBQVEsQ0FBZSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFQUSxTQUFTO1FBRHJCLE9BQU87T0FDSyxTQUFTLENBU3JCO0lBQUQsZ0JBQUM7Q0FURCxBQVNDLENBVDhCLGtCQUFPLEdBU3JDO0FBVFksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHU3RhdGljIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9EYXRhUG9vbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU1JhbmtEYXRhIGV4dGVuZHMgR1N0YXRpYyB7XHJcbiAgICBwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByYXcgPSBHU3RhdGljLmFkZG9uUmF3PFNSYW5rRGF0YVJhdz4ob2JqLmRhdGFbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnNldChyYXcuaWQsIHJhdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==