
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Locals/LRobotGrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7dcdeEx/A5JKZtzZgJgbcAH', 'LRobotGrade');
// Script/Game/Data/Locals/LRobotGrade.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRobotGradeData = void 0;
var CoreDefine_1 = require("../../../Core/CoreDefine");
var DataPool_1 = require("../../../Core/Manager/DataPool");
var MathEx_1 = require("../../../Core/Math/MathEx");
var Define_1 = require("../../Common/Define");
var GameMgr_1 = require("../../Logic/GameMgr");
var ccclass = cc._decorator.ccclass;
var LRobotGradeData = /** @class */ (function (_super) {
    __extends(LRobotGradeData, _super);
    function LRobotGradeData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$localKey = "LRobotGradeData";
        _this.$userGradeInfo = [];
        return _this;
    }
    LRobotGradeData.prototype.onInit = function () {
        this.load();
        if (this.$userGradeInfo.length <= 0) {
            this.initNewSeason();
        }
        this.set();
    };
    /**初始化新赛季 */
    LRobotGradeData.prototype.initNewSeason = function (pastDay) {
        var _this = this;
        if (pastDay === void 0) { pastDay = 0; }
        this.$userGradeInfo = [];
        var robotDatas = GameMgr_1.default.npcData.data.values();
        robotDatas.forEach(function (v, s) {
            var info = {
                isSelf: 0,
                name: v.name,
                icon: v.icon,
                levelLv: MathEx_1.default.random(1, 3),
                starNum: MathEx_1.default.random(1, 3),
            };
            _this.$userGradeInfo.push(info);
        });
    };
    /**刷新当前赛季段位信息 */
    LRobotGradeData.prototype.brushSeasonLevelInfo = function () {
        var _this = this;
        var arr = [];
        this.$userGradeInfo.forEach(function (v, s) {
            var info = _this.brushRobotGradeLevelInfo(v);
            arr.push(info);
        });
        this.$userGradeInfo = [];
        this.$userGradeInfo = arr;
        this.set();
    };
    /**当前赛季段位排序由高到低 */
    LRobotGradeData.prototype.curSeasonLevel = function () { };
    /**修改机器人段位信息 */
    LRobotGradeData.prototype.brushRobotGradeLevelInfo = function (v) {
        if (v.levelLv >= 1 && v.starNum >= 0) {
            var star = MathEx_1.default.random(-1, 2);
            v.starNum += star;
            if (v.starNum > 3) {
                v.levelLv++;
                if (v.levelLv >= Define_1.RANKLV.RANKLV7) {
                    v.levelLv = Define_1.RANKLV.RANKLV7;
                }
                else {
                    v.starNum -= 3;
                }
            }
            else if (v.starNum < 0) {
                v.levelLv--;
                v.starNum += 3;
                if (v.levelLv < 1) {
                    v.levelLv = 1;
                    if (v.starNum < 0) {
                        v.starNum = 0;
                    }
                }
            }
        }
        else {
            v.levelLv = 1;
            v.starNum = 0;
        }
        return v;
    };
    /**获取所有机器人信息 */
    LRobotGradeData.prototype.getAll = function () {
        return CoreDefine_1.OBJECT_COPY(this.$userGradeInfo);
    };
    /**随机机器人 */
    LRobotGradeData.prototype.randomRobotGrade = function () {
        var num = MathEx_1.default.random(0, this.$userGradeInfo.length - 1);
        return this.$userGradeInfo[num];
    };
    LRobotGradeData = __decorate([
        ccclass
    ], LRobotGradeData);
    return LRobotGradeData;
}(DataPool_1.GLocal));
exports.LRobotGradeData = LRobotGradeData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL0xvY2Fscy9MUm9ib3RHcmFkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQXVEO0FBQ3ZELDJEQUF3RDtBQUN4RCxvREFBK0M7QUFDL0MsOENBQTZDO0FBQzdDLCtDQUEwQztBQUNsQyxJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUVsQztJQUFxQyxtQ0FBTTtJQUEzQztRQUFBLHFFQWlGQztRQWhGUSxlQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsb0JBQWMsR0FBcUIsRUFBRSxDQUFDOztJQStFL0MsQ0FBQztJQTlFQyxnQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELFlBQVk7SUFDTCx1Q0FBYSxHQUFwQixVQUFxQixPQUFXO1FBQWhDLGlCQWFDO1FBYm9CLHdCQUFBLEVBQUEsV0FBVztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLFVBQVUsR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFlLENBQUM7UUFDNUQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFtQjtnQkFDekIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNaLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENB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c0NvbnRlbnQiOlsiaW1wb3J0IHsgSUdyYWRlUmFua0luZm8sIFNOcGNEYXRhUmF3IH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IE9CSkVDVF9DT1BZIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgeyBHTG9jYWwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYW5hZ2VyL0RhdGFQb29sXCI7XHJcbmltcG9ydCBNYXRoRXggZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWF0aC9NYXRoRXhcIjtcclxuaW1wb3J0IHsgUkFOS0xWIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTFJvYm90R3JhZGVEYXRhIGV4dGVuZHMgR0xvY2FsIHtcclxuICBwdWJsaWMgJGxvY2FsS2V5ID0gXCJMUm9ib3RHcmFkZURhdGFcIjtcclxuICBwdWJsaWMgJHVzZXJHcmFkZUluZm86IElHcmFkZVJhbmtJbmZvW10gPSBbXTtcclxuICBvbkluaXQoKSB7XHJcbiAgICB0aGlzLmxvYWQoKTtcclxuICAgIGlmICh0aGlzLiR1c2VyR3JhZGVJbmZvLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHRoaXMuaW5pdE5ld1NlYXNvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKuWIneWni+WMluaWsOi1m+WtoyAqL1xyXG4gIHB1YmxpYyBpbml0TmV3U2Vhc29uKHBhc3REYXkgPSAwKSB7XHJcbiAgICB0aGlzLiR1c2VyR3JhZGVJbmZvID0gW107XHJcbiAgICBsZXQgcm9ib3REYXRhcyA9IEdhbWVNZ3IubnBjRGF0YS5kYXRhLnZhbHVlczxTTnBjRGF0YVJhdz4oKTtcclxuICAgIHJvYm90RGF0YXMuZm9yRWFjaCgodiwgcykgPT4ge1xyXG4gICAgICBsZXQgaW5mbzogSUdyYWRlUmFua0luZm8gPSB7XHJcbiAgICAgICAgaXNTZWxmOiAwLFxyXG4gICAgICAgIG5hbWU6IHYubmFtZSxcclxuICAgICAgICBpY29uOiB2Lmljb24sXHJcbiAgICAgICAgbGV2ZWxMdjogTWF0aEV4LnJhbmRvbSgxLCAzKSxcclxuICAgICAgICBzdGFyTnVtOiBNYXRoRXgucmFuZG9tKDEsIDMpLFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLiR1c2VyR3JhZGVJbmZvLnB1c2goaW5mbyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKuWIt+aWsOW9k+WJjei1m+Wto+auteS9jeS/oeaBryAqL1xyXG4gIHB1YmxpYyBicnVzaFNlYXNvbkxldmVsSW5mbygpIHtcclxuICAgIGxldCBhcnI6IElHcmFkZVJhbmtJbmZvW10gPSBbXTtcclxuICAgIHRoaXMuJHVzZXJHcmFkZUluZm8uZm9yRWFjaCgodiwgcykgPT4ge1xyXG4gICAgICBsZXQgaW5mbyA9IHRoaXMuYnJ1c2hSb2JvdEdyYWRlTGV2ZWxJbmZvKHYpO1xyXG4gICAgICBhcnIucHVzaChpbmZvKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy4kdXNlckdyYWRlSW5mbyA9IFtdO1xyXG4gICAgdGhpcy4kdXNlckdyYWRlSW5mbyA9IGFycjtcclxuICAgIHRoaXMuc2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKirlvZPliY3otZvlraPmrrXkvY3mjpLluo/nlLHpq5jliLDkvY4gKi9cclxuICBwdWJsaWMgY3VyU2Vhc29uTGV2ZWwoKSB7fVxyXG5cclxuICAvKirkv67mlLnmnLrlmajkurrmrrXkvY3kv6Hmga8gKi9cclxuICBwcm90ZWN0ZWQgYnJ1c2hSb2JvdEdyYWRlTGV2ZWxJbmZvKHY6IElHcmFkZVJhbmtJbmZvKSB7XHJcbiAgICBpZiAodi5sZXZlbEx2ID49IDEgJiYgdi5zdGFyTnVtID49IDApIHtcclxuICAgICAgbGV0IHN0YXIgPSBNYXRoRXgucmFuZG9tKC0xLCAyKTtcclxuICAgICAgdi5zdGFyTnVtICs9IHN0YXI7XHJcbiAgICAgIGlmICh2LnN0YXJOdW0gPiAzKSB7XHJcbiAgICAgICAgdi5sZXZlbEx2Kys7XHJcbiAgICAgICAgaWYgKHYubGV2ZWxMdiA+PSBSQU5LTFYuUkFOS0xWNykge1xyXG4gICAgICAgICAgdi5sZXZlbEx2ID0gUkFOS0xWLlJBTktMVjc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHYuc3Rhck51bSAtPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh2LnN0YXJOdW0gPCAwKSB7XHJcbiAgICAgICAgdi5sZXZlbEx2LS07XHJcbiAgICAgICAgdi5zdGFyTnVtICs9IDM7XHJcbiAgICAgICAgaWYgKHYubGV2ZWxMdiA8IDEpIHtcclxuICAgICAgICAgIHYubGV2ZWxMdiA9IDE7XHJcbiAgICAgICAgICBpZiAodi5zdGFyTnVtIDwgMCkge1xyXG4gICAgICAgICAgICB2LnN0YXJOdW0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdi5sZXZlbEx2ID0gMTtcclxuICAgICAgdi5zdGFyTnVtID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiB2O1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W5omA5pyJ5py65Zmo5Lq65L+h5oGvICovXHJcbiAgcHVibGljIGdldEFsbCgpOiBBcnJheTxJR3JhZGVSYW5rSW5mbz4ge1xyXG4gICAgcmV0dXJuIE9CSkVDVF9DT1BZKHRoaXMuJHVzZXJHcmFkZUluZm8pO1xyXG4gIH1cclxuXHJcbiAgLyoq6ZqP5py65py65Zmo5Lq6ICovXHJcbiAgcHVibGljIHJhbmRvbVJvYm90R3JhZGUoKTogSUdyYWRlUmFua0luZm8ge1xyXG4gICAgbGV0IG51bSA9IE1hdGhFeC5yYW5kb20oMCwgdGhpcy4kdXNlckdyYWRlSW5mby5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiB0aGlzLiR1c2VyR3JhZGVJbmZvW251bV07XHJcbiAgfVxyXG59XHJcbiJdfQ==