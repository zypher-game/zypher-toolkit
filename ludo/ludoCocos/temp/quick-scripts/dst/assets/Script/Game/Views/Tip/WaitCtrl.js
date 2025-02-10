
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Tip/WaitCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4de56PZN7xLab+arFi3GZ2X', 'WaitCtrl');
// Script/Game/Views/Tip/WaitCtrl.ts

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
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var WaitCtrl = /** @class */ (function (_super) {
    __extends(WaitCtrl, _super);
    function WaitCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Node) load: cc.Node[] = []
        _this.loadRing = null;
        _this.netTip = null;
        _this._curNetText = "";
        return _this;
    }
    WaitCtrl.prototype.onGLoad = function () { };
    WaitCtrl.prototype.onGStart = function () {
        this.commonWait();
    };
    WaitCtrl.prototype.commonWait = function (unAutoClose) {
        var _this = this;
        this.loadRing.stopAllActions();
        this.bgImage.node.opacity = 0;
        var endFunc = function () {
            if (unAutoClose) {
                _this.commonWait(true);
                return;
            }
            _this.onClose();
        };
        cc.tween(this.loadRing)
            .delay(0.2)
            .call(function () {
            _this.bgImage.node.opacity = 255;
        })
            .repeat(100, cc.tween(this.loadRing).by(0.2, { angle: -90 }))
            .call(endFunc)
            .start();
    };
    WaitCtrl.prototype.disConnectWait = function () {
        this.commonWait(true);
        this._curNetText = "";
    };
    __decorate([
        property(cc.Node)
    ], WaitCtrl.prototype, "loadRing", void 0);
    __decorate([
        property(cc.Label)
    ], WaitCtrl.prototype, "netTip", void 0);
    WaitCtrl = __decorate([
        ccclass,
        menu("View/Tip/WaitCtrl")
    ], WaitCtrl);
    return WaitCtrl;
}(GViewBase_1.default));
exports.default = WaitCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9UaXAvV2FpdEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBRWhELElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSWxEO0lBQXNDLDRCQUFTO0lBQS9DO1FBQUEscUVBbUNDO1FBbENDLDBDQUEwQztRQUN2QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3hCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFDbEMsaUJBQVcsR0FBVyxFQUFFLENBQUM7O0lBK0JyQyxDQUFDO0lBOUJDLDBCQUFPLEdBQVAsY0FBVyxDQUFDO0lBRVosMkJBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sNkJBQVUsR0FBakIsVUFBa0IsV0FBcUI7UUFBdkMsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLE9BQU8sR0FBRztZQUNaLElBQUksV0FBVyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7UUFDRixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLElBQUksQ0FBQztZQUNKLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2IsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRU0saUNBQWMsR0FBckI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFoQ2tCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUEwQjtJQUN4QjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FBeUI7SUFIekIsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDO09BQ0wsUUFBUSxDQW1DNUI7SUFBRCxlQUFDO0NBbkNELEFBbUNDLENBbkNxQyxtQkFBUyxHQW1DOUM7a0JBbkNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HVmlldy9HVmlld0Jhc2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvVGlwL1dhaXRDdHJsXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhaXRDdHJsIGV4dGVuZHMgR1ZpZXdCYXNlIHtcclxuICAvLyBAcHJvcGVydHkoY2MuTm9kZSkgbG9hZDogY2MuTm9kZVtdID0gW11cclxuICBAcHJvcGVydHkoY2MuTm9kZSkgbG9hZFJpbmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgbmV0VGlwOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9jdXJOZXRUZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gIG9uR0xvYWQoKSB7fVxyXG5cclxuICBvbkdTdGFydCgpIHtcclxuICAgIHRoaXMuY29tbW9uV2FpdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbW1vbldhaXQodW5BdXRvQ2xvc2U/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxvYWRSaW5nLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB0aGlzLmJnSW1hZ2Uubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgIGxldCBlbmRGdW5jID0gKCkgPT4ge1xyXG4gICAgICBpZiAodW5BdXRvQ2xvc2UpIHtcclxuICAgICAgICB0aGlzLmNvbW1vbldhaXQodHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfTtcclxuICAgIGNjLnR3ZWVuKHRoaXMubG9hZFJpbmcpXHJcbiAgICAgIC5kZWxheSgwLjIpXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB0aGlzLmJnSW1hZ2Uubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICB9KVxyXG4gICAgICAucmVwZWF0KDEwMCwgY2MudHdlZW4odGhpcy5sb2FkUmluZykuYnkoMC4yLCB7IGFuZ2xlOiAtOTAgfSkpXHJcbiAgICAgIC5jYWxsKGVuZEZ1bmMpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc0Nvbm5lY3RXYWl0KCkge1xyXG4gICAgdGhpcy5jb21tb25XYWl0KHRydWUpO1xyXG4gICAgdGhpcy5fY3VyTmV0VGV4dCA9IFwiXCI7XHJcbiAgfVxyXG59XHJcbiJdfQ==