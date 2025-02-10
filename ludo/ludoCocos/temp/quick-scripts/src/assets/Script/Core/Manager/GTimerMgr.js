"use strict";
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