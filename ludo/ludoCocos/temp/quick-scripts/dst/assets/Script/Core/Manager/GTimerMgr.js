
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/GTimerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80435vD+CFEfKGdumauP98x', 'GTimerMgr');
// Script/Core/Manager/GTimerMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GCtrl_1 = require("../GCtrl");
var GTimerMgr = /** @class */ (function () {
    function GTimerMgr() {
        this._timerHandler = -1;
        this._lastTimeStamp = 0;
    }
    GTimerMgr.ins = function () {
        if (!this._ins) {
            this._ins = new GTimerMgr();
        }
        return this._ins;
    };
    GTimerMgr.prototype.start = function () {
        this._lastTimeStamp = Date.now();
        this._timerHandler = setInterval(this.onTimer.bind(this), 100);
    };
    GTimerMgr.prototype.stop = function () {
        if (this._timerHandler) {
            clearInterval(this._timerHandler);
        }
        this._lastTimeStamp = 0;
        GTimerMgr.secondDelta = 0;
    };
    GTimerMgr.prototype.onTimer = function () {
        var told = this._lastTimeStamp;
        var tnew = Date.now();
        var oldSecondDelta = GTimerMgr.secondDelta;
        GTimerMgr.secondDelta = (tnew - told) / 1000;
        GTimerMgr.mDelta = GTimerMgr.secondDelta - oldSecondDelta;
        GTimerMgr.mDelta =
            GTimerMgr.mDelta > 0 ? GTimerMgr.mDelta : GTimerMgr.secondDelta;
        // cc.log(`secondDelta: ${GTimerMgr.secondDelta}, milliDelta: ${GTimerMgr.mDelta}`);
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GTimerMilliEventMsg);
        if (GTimerMgr.secondDelta < 1)
            return;
        this._lastTimeStamp = tnew;
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GTimerSecondEventMsg);
    };
    GTimerMgr._ins = null;
    /** 时间事件，最少一秒的间隔 */
    GTimerMgr.secondDelta = 0;
    /** 时间事件，每次调度都会派发事件 */
    GTimerMgr.mDelta = 0;
    return GTimerMgr;
}());
exports.default = GTimerMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL0dUaW1lck1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFpQztBQUVqQztJQW1CRTtRQVRVLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkIsbUJBQWMsR0FBRyxDQUFDLENBQUM7SUFPZCxDQUFDO0lBaEJGLGFBQUcsR0FBakI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBYU0seUJBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTSx3QkFBSSxHQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVMsMkJBQU8sR0FBakI7UUFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7UUFDMUQsU0FBUyxDQUFDLE1BQU07WUFDZCxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUNsRSxvRkFBb0Y7UUFDcEYsYUFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsSUFBSSxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUM7WUFBRSxPQUFPO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLGFBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUE5Q2dCLGNBQUksR0FBYyxJQUFJLENBQUM7SUFheEMsbUJBQW1CO0lBQ0wscUJBQVcsR0FBRyxDQUFDLENBQUM7SUFDOUIsc0JBQXNCO0lBQ1IsZ0JBQU0sR0FBRyxDQUFDLENBQUM7SUErQjNCLGdCQUFDO0NBaERELEFBZ0RDLElBQUE7a0JBaERvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdUaW1lck1nciB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zOiBHVGltZXJNZ3IgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGlucygpOiBHVGltZXJNZ3Ige1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IEdUaW1lck1ncigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lucztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdGltZXJIYW5kbGVyID0gLTE7XHJcblxyXG4gIHByb3RlY3RlZCBfbGFzdFRpbWVTdGFtcCA9IDA7XHJcblxyXG4gIC8qKiDml7bpl7Tkuovku7bvvIzmnIDlsJHkuIDnp5LnmoTpl7TpmpQgKi9cclxuICBwdWJsaWMgc3RhdGljIHNlY29uZERlbHRhID0gMDtcclxuICAvKiog5pe26Ze05LqL5Lu277yM5q+P5qyh6LCD5bqm6YO95Lya5rS+5Y+R5LqL5Lu2ICovXHJcbiAgcHVibGljIHN0YXRpYyBtRGVsdGEgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBzdGFydCgpIHtcclxuICAgIHRoaXMuX2xhc3RUaW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5fdGltZXJIYW5kbGVyID0gc2V0SW50ZXJ2YWwodGhpcy5vblRpbWVyLmJpbmQodGhpcyksIDEwMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcCgpIHtcclxuICAgIGlmICh0aGlzLl90aW1lckhhbmRsZXIpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lckhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbGFzdFRpbWVTdGFtcCA9IDA7XHJcbiAgICBHVGltZXJNZ3Iuc2Vjb25kRGVsdGEgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uVGltZXIoKSB7XHJcbiAgICBsZXQgdG9sZCA9IHRoaXMuX2xhc3RUaW1lU3RhbXA7XHJcbiAgICBsZXQgdG5ldyA9IERhdGUubm93KCk7XHJcbiAgICBsZXQgb2xkU2Vjb25kRGVsdGEgPSBHVGltZXJNZ3Iuc2Vjb25kRGVsdGE7XHJcbiAgICBHVGltZXJNZ3Iuc2Vjb25kRGVsdGEgPSAodG5ldyAtIHRvbGQpIC8gMTAwMDtcclxuICAgIEdUaW1lck1nci5tRGVsdGEgPSBHVGltZXJNZ3Iuc2Vjb25kRGVsdGEgLSBvbGRTZWNvbmREZWx0YTtcclxuICAgIEdUaW1lck1nci5tRGVsdGEgPVxyXG4gICAgICBHVGltZXJNZ3IubURlbHRhID4gMCA/IEdUaW1lck1nci5tRGVsdGEgOiBHVGltZXJNZ3Iuc2Vjb25kRGVsdGE7XHJcbiAgICAvLyBjYy5sb2coYHNlY29uZERlbHRhOiAke0dUaW1lck1nci5zZWNvbmREZWx0YX0sIG1pbGxpRGVsdGE6ICR7R1RpbWVyTWdyLm1EZWx0YX1gKTtcclxuICAgIEdDdHJsLkVTLmVtaXQoR0N0cmwuR1RpbWVyTWlsbGlFdmVudE1zZyk7XHJcbiAgICBpZiAoR1RpbWVyTWdyLnNlY29uZERlbHRhIDwgMSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fbGFzdFRpbWVTdGFtcCA9IHRuZXc7XHJcbiAgICBHQ3RybC5FUy5lbWl0KEdDdHJsLkdUaW1lclNlY29uZEV2ZW50TXNnKTtcclxuICB9XHJcbn1cclxuIl19