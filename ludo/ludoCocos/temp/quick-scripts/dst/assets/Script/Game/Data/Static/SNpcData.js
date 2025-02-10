
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SNpcData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da4540wnjFAOa59ZHTy6qHF', 'SNpcData');
// Script/Game/Data/Static/SNpcData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SNpcData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SNpcData = /** @class */ (function (_super) {
    __extends(SNpcData, _super);
    function SNpcData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SNpcData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SNpcData = __decorate([
        ccclass
    ], SNpcData);
    return SNpcData;
}(DataPool_1.GStatic));
exports.SNpcData = SNpcData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TTnBjRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF5RDtBQUVqRCxJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUVsQztJQUE4Qiw0QkFBTztJQUFyQzs7SUFRQSxDQUFDO0lBUFUsd0JBQUssR0FBWixVQUFhLEdBQVE7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksR0FBRyxHQUFHLGtCQUFPLENBQUMsUUFBUSxDQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVBRLFFBQVE7UUFEcEIsT0FBTztPQUNLLFFBQVEsQ0FRcEI7SUFBRCxlQUFDO0NBUkQsQUFRQyxDQVI2QixrQkFBTyxHQVFwQztBQVJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNOcGNEYXRhIGV4dGVuZHMgR1N0YXRpYyB7XHJcbiAgICBwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByYXcgPSBHU3RhdGljLmFkZG9uUmF3PFNOcGNEYXRhUmF3PihvYmouZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuc2V0KHJhdy5pZCwgcmF3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0iXX0=