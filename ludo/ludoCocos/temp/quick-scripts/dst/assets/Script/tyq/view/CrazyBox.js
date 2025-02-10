
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tyq/view/CrazyBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03b4dr6dUhB8ZDiRupLsjSs', 'CrazyBox');
// Script/tyq/view/CrazyBox.ts

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
exports.crazyType = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var crazyType;
(function (crazyType) {
    crazyType[crazyType["banner"] = 0] = "banner";
    crazyType[crazyType["reward"] = 1] = "reward";
    crazyType[crazyType["grid"] = 2] = "grid";
})(crazyType = exports.crazyType || (exports.crazyType = {}));
var CrazyBox = /** @class */ (function (_super) {
    __extends(CrazyBox, _super);
    function CrazyBox() {
        // @property({
        //     type: cc.Node,
        //     tooltip: "宝箱icon，用来做动画"
        // })
        // box: cc.Node = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progress = null;
        _this.btn = null;
        _this.twn = new cc.Tween();
        _this.addNum = 0;
        _this.cutNum = 0;
        _this.percent = 0;
        _this.canTouch = true;
        _this.callBack = null;
        _this.times = 0;
        _this.gameTime = 0;
        _this._type = crazyType.banner;
        _this._clickTime = 0;
        _this._isShowAd = false;
        return _this;
    }
    CrazyBox.prototype.onLoad = function () {
        // Your initialization goes here.
        this.addNum = 0.1;
        this.cutNum = 0.005;
        var percent = "[0.4,0.7]";
        this.percent = JSON.parse(percent)[0] || 0.4;
    };
    /**
     *
     * @param callBack 结束回调
     * @param type 狂点类型
     */
    CrazyBox.prototype.init = function (callBack, type) {
        if (type === void 0) { type = crazyType.banner; }
        this.unscheduleAllCallbacks();
        this.node.active = true;
        this.callBack = callBack;
        this.canTouch = true;
        this.progress.progress = 0;
        // this.times = Number(TyqSdk.getSwitchValue("mistakeTouchTime"));
        this._clickTime = 0;
        this._type = type || crazyType.banner;
        if (type == crazyType.banner || type == crazyType.grid) {
            cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
        }
        if (type == crazyType.banner) {
            this.btn.setPosition(0, -200);
        }
        else {
            this.btn.setPosition(250, -200);
        }
        this._isShowAd = false;
        this.canTouch = true;
    };
    CrazyBox.prototype.openBtnFun = function () {
        if (!this.canTouch)
            return;
        this.twn.stop();
        // this.twn = cc.tween(this.box)
        //     .to(0.05, { angle: 10 })
        //     .to(0.1, { angle: -10 })
        //     .to(0.05, { angle: 0 })
        //     .union()
        //     .start()
        this.progress.progress += this.addNum;
        // //如果后台用时间控制
        // if (this.times > 0 && this.gameTime >= this.times && this.canTouch) {
        //     this.nextFun();
        //     return;
        // }
        //0.25表示进度百分比
        // if (this.progress.progress > 0.25 && this.canTouch) {
        //     this.nextFun();
        // }
        this._clickTime++;
        if (this.progress.progress >= 1) {
            this.nextFun(true);
        }
    };
    CrazyBox.prototype.nextFun = function (isSuccess) {
        if (isSuccess === void 0) { isSuccess = false; }
        this.canTouch = false;
        if (this.callBack) {
            this.callBack(isSuccess);
            this.callBack = null;
        }
        if (this._type == crazyType.banner) {
        }
        else if (this._type == crazyType.grid) {
        }
        this.unscheduleAllCallbacks();
        this.node.destroy();
        // TyqSdk.showVideoAD("点击误触视频", () => {
        //     this.callBack();
        //     this.node.active = false;
        // }, () => {
        //     this.callBack();
        //     this.node.active = false;
        // })
    };
    CrazyBox.prototype.update = function (deltaTime) {
        if (this.progress.progress > 0) {
            this.gameTime += deltaTime;
            this.progress.progress -= this.cutNum;
        }
        else {
            this.gameTime = 0;
        }
    };
    CrazyBox.prototype.onShow = function () {
        console.log("onshow");
        this.nextFun(true);
        if (this._type == crazyType.banner || this._type == crazyType.grid) {
            cc.game.off(cc.game.EVENT_SHOW, this.onShow, this);
        }
    };
    __decorate([
        property({
            type: cc.ProgressBar,
            tooltip: "进度条",
        })
    ], CrazyBox.prototype, "progress", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "进度条",
        })
    ], CrazyBox.prototype, "btn", void 0);
    CrazyBox = __decorate([
        ccclass
    ], CrazyBox);
    return CrazyBox;
}(cc.Component));
exports.default = CrazyBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvdHlxL3ZpZXcvQ3JhenlCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw2Q0FBTSxDQUFBO0lBQ04sNkNBQU0sQ0FBQTtJQUNOLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRDtJQUFzQyw0QkFBWTtJQUFsRDtRQUNFLGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsOEJBQThCO1FBQzlCLEtBQUs7UUFDTCx1QkFBdUI7UUFMekIscUVBNkhDO1FBbEhDLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBTWhDLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFDWixTQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFlBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osY0FBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCLFdBQUssR0FBRyxDQUFDLENBQUM7UUFDVixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsV0FBSyxHQUFjLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDcEMsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsZUFBUyxHQUFZLEtBQUssQ0FBQzs7SUFpR3JDLENBQUM7SUFoR0MseUJBQU0sR0FBTjtRQUNFLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJ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UyxHQTZIakQ7a0JBN0hvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIGNyYXp5VHlwZSB7XHJcbiAgYmFubmVyLFxyXG4gIHJld2FyZCxcclxuICBncmlkLFxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXp5Qm94IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAvLyBAcHJvcGVydHkoe1xyXG4gIC8vICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gIC8vICAgICB0b29sdGlwOiBcIuWuneeusWljb27vvIznlKjmnaXlgZrliqjnlLtcIlxyXG4gIC8vIH0pXHJcbiAgLy8gYm94OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KHtcclxuICAgIHR5cGU6IGNjLlByb2dyZXNzQmFyLFxyXG4gICAgdG9vbHRpcDogXCLov5vluqbmnaFcIixcclxuICB9KVxyXG4gIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgdG9vbHRpcDogXCLov5vluqbmnaFcIixcclxuICB9KVxyXG4gIGJ0bjogY2MuTm9kZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSB0d24gPSBuZXcgY2MuVHdlZW4oKTtcclxuICBwcml2YXRlIGFkZE51bSA9IDA7XHJcbiAgcHJpdmF0ZSBjdXROdW0gPSAwO1xyXG4gIHByaXZhdGUgcGVyY2VudCA9IDA7XHJcbiAgcHJpdmF0ZSBjYW5Ub3VjaCA9IHRydWU7XHJcbiAgcHJpdmF0ZSBjYWxsQmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gIHByaXZhdGUgdGltZXMgPSAwO1xyXG4gIHByaXZhdGUgZ2FtZVRpbWUgPSAwO1xyXG4gIHByaXZhdGUgX3R5cGU6IGNyYXp5VHlwZSA9IGNyYXp5VHlwZS5iYW5uZXI7XHJcbiAgcHJpdmF0ZSBfY2xpY2tUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX2lzU2hvd0FkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gWW91ciBpbml0aWFsaXphdGlvbiBnb2VzIGhlcmUuXHJcbiAgICB0aGlzLmFkZE51bSA9IDAuMTtcclxuICAgIHRoaXMuY3V0TnVtID0gMC4wMDU7XHJcbiAgICBsZXQgcGVyY2VudCA9IFwiWzAuNCwwLjddXCI7XHJcblxyXG4gICAgdGhpcy5wZXJjZW50ID0gSlNPTi5wYXJzZShwZXJjZW50KVswXSB8fCAwLjQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjYWxsQmFjayDnu5PmnZ/lm57osINcclxuICAgKiBAcGFyYW0gdHlwZSDni4LngrnnsbvlnotcclxuICAgKi9cclxuICBpbml0KGNhbGxCYWNrOiBGdW5jdGlvbiwgdHlwZTogY3JhenlUeXBlID0gY3JhenlUeXBlLmJhbm5lcikge1xyXG4gICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgIHRoaXMuY2FuVG91Y2ggPSB0cnVlO1xyXG4gICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDA7XHJcbiAgICAvLyB0aGlzLnRpbWVzID0gTnVtYmVyKFR5cVNkay5nZXRTd2l0Y2hWYWx1ZShcIm1pc3Rha2VUb3VjaFRpbWVcIikpO1xyXG4gICAgdGhpcy5fY2xpY2tUaW1lID0gMDtcclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlIHx8IGNyYXp5VHlwZS5iYW5uZXI7XHJcbiAgICBpZiAodHlwZSA9PSBjcmF6eVR5cGUuYmFubmVyIHx8IHR5cGUgPT0gY3JhenlUeXBlLmdyaWQpIHtcclxuICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25TaG93LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PSBjcmF6eVR5cGUuYmFubmVyKSB7XHJcbiAgICAgIHRoaXMuYnRuLnNldFBvc2l0aW9uKDAsIC0yMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5idG4uc2V0UG9zaXRpb24oMjUwLCAtMjAwKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2lzU2hvd0FkID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhblRvdWNoID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9wZW5CdG5GdW4oKSB7XHJcbiAgICBpZiAoIXRoaXMuY2FuVG91Y2gpIHJldHVybjtcclxuICAgIHRoaXMudHduLnN0b3AoKTtcclxuICAgIC8vIHRoaXMudHduID0gY2MudHdlZW4odGhpcy5ib3gpXHJcbiAgICAvLyAgICAgLnRvKDAuMDUsIHsgYW5nbGU6IDEwIH0pXHJcbiAgICAvLyAgICAgLnRvKDAuMSwgeyBhbmdsZTogLTEwIH0pXHJcbiAgICAvLyAgICAgLnRvKDAuMDUsIHsgYW5nbGU6IDAgfSlcclxuICAgIC8vICAgICAudW5pb24oKVxyXG4gICAgLy8gICAgIC5zdGFydCgpXHJcbiAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzICs9IHRoaXMuYWRkTnVtO1xyXG4gICAgLy8gLy/lpoLmnpzlkI7lj7DnlKjml7bpl7TmjqfliLZcclxuICAgIC8vIGlmICh0aGlzLnRpbWVzID4gMCAmJiB0aGlzLmdhbWVUaW1lID49IHRoaXMudGltZXMgJiYgdGhpcy5jYW5Ub3VjaCkge1xyXG4gICAgLy8gICAgIHRoaXMubmV4dEZ1bigpO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vIH1cclxuICAgIC8vMC4yNeihqOekuui/m+W6pueZvuWIhuavlFxyXG4gICAgLy8gaWYgKHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPiAwLjI1ICYmIHRoaXMuY2FuVG91Y2gpIHtcclxuICAgIC8vICAgICB0aGlzLm5leHRGdW4oKTtcclxuICAgIC8vIH1cclxuICAgIHRoaXMuX2NsaWNrVGltZSsrO1xyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMSkge1xyXG4gICAgICB0aGlzLm5leHRGdW4odHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0RnVuKGlzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLmNhblRvdWNoID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5jYWxsQmFjaykge1xyXG4gICAgICB0aGlzLmNhbGxCYWNrKGlzU3VjY2Vzcyk7XHJcbiAgICAgIHRoaXMuY2FsbEJhY2sgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3R5cGUgPT0gY3JhenlUeXBlLmJhbm5lcikge1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl90eXBlID09IGNyYXp5VHlwZS5ncmlkKSB7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAvLyBUeXFTZGsuc2hvd1ZpZGVvQUQoXCLngrnlh7vor6/op6bop4bpopFcIiwgKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuY2FsbEJhY2soKTtcclxuICAgIC8vICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyB9LCAoKSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5jYWxsQmFjaygpO1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIH0pXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzLnByb2dyZXNzID4gMCkge1xyXG4gICAgICB0aGlzLmdhbWVUaW1lICs9IGRlbHRhVGltZTtcclxuICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyAtPSB0aGlzLmN1dE51bTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2FtZVRpbWUgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgb25TaG93KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJvbnNob3dcIik7XHJcbiAgICB0aGlzLm5leHRGdW4odHJ1ZSk7XHJcbiAgICBpZiAodGhpcy5fdHlwZSA9PSBjcmF6eVR5cGUuYmFubmVyIHx8IHRoaXMuX3R5cGUgPT0gY3JhenlUeXBlLmdyaWQpIHtcclxuICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uU2hvdywgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==