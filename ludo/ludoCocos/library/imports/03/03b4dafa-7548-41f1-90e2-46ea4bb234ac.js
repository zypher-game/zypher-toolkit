"use strict";
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