
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/StartGame/AppCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90bd9SsAgVEJryZyMputKgb', 'AppCtrl');
// Script/Game/Views/StartGame/AppCtrl.ts

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
var GComponent_1 = require("../../../Core/FrameEx/GComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var AppCtrl = /** @class */ (function (_super) {
    __extends(AppCtrl, _super);
    function AppCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guideEditor = false;
        return _this;
    }
    AppCtrl.prototype.initEvent = function () { };
    AppCtrl.prototype.__onLoad = function () {
        if (CC_DEV && this.guideEditor) {
            var _OldEventTargetOn_1 = cc.Node.prototype.on;
            cc.Node.prototype.on = function (type, callback, target, useCapture) {
                var self = this;
                _OldEventTargetOn_1.call(self, type, callback, target, useCapture);
                if (!this["___guideEvent"] && type == "touchstart") {
                    _OldEventTargetOn_1.call(self, type, function (event) {
                        var path = self.logPath();
                        cc.log("%c" +
                            ("\u8DEF\u5F84: " + path + ", \u8282\u70B9\u4E16\u754C\u5750\u6807: " + self.convertToWorldSpaceAR(cc.Vec2.ZERO) + ", \u89E6\u6478\u70B9\u4E16\u754C\u5750\u6807" + event.getLocation()), "color:green");
                    }.bind(self), self, useCapture);
                    this["___guideEvent"] = true;
                }
            };
        }
    };
    __decorate([
        property()
    ], AppCtrl.prototype, "guideEditor", void 0);
    AppCtrl = __decorate([
        ccclass,
        menu("AppCtrl")
    ], AppCtrl);
    return AppCtrl;
}(GComponent_1.default));
exports.default = AppCtrl;
// window["__errorHandler"] = (file, line, msg, error) => {
//     console.log(msg);
// };
// window.onerror = (event, source, line) => {
//     console.log(event);
// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9TdGFydEdhbWUvQXBwQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMEQ7QUFFcEQsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBcUMsMkJBQVU7SUFBL0M7UUFBQSxxRUErQkM7UUE5QmEsaUJBQVcsR0FBWSxLQUFLLENBQUM7O0lBOEIzQyxDQUFDO0lBN0JRLDJCQUFTLEdBQWhCLGNBQW9CLENBQUM7SUFDckIsMEJBQVEsR0FBUjtRQUNFLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUIsSUFBSSxtQkFBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFTLENBQUM7WUFDcEQsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVTtnQkFDakUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixtQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksSUFBSSxZQUFZLEVBQUU7b0JBQ2xELG1CQUFpQixDQUFDLElBQUksQ0FDcEIsSUFBSSxFQUNKLElBQUksRUFDSixVQUFVLEtBQUs7d0JBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQixFQUFFLENBQUMsR0FBRyxDQUNKLElBQUk7NkJBQ0YsbUJBQU8sSUFBSSxnREFBYSxJQUFJLENBQUMscUJBQXFCLENBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNiLG9EQUFZLEtBQUssQ0FBQyxXQUFXLEVBQUksQ0FBQSxFQUNwQyxhQUFhLENBQ2QsQ0FBQztvQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUNaLElBQUksRUFDSixVQUFVLENBQ1gsQ0FBQztvQkFDRixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUM5QjtZQUNILENBQVEsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQTdCVztRQUFYLFFBQVEsRUFBRTtnREFBOEI7SUFEdEIsT0FBTztRQUYzQixPQUFPO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQztPQUNLLE9BQU8sQ0ErQjNCO0lBQUQsY0FBQztDQS9CRCxBQStCQyxDQS9Cb0Msb0JBQVUsR0ErQjlDO2tCQS9Cb0IsT0FBTztBQWlDNUIsMkRBQTJEO0FBQzNELHdCQUF3QjtBQUV4QixLQUFLO0FBQ0wsOENBQThDO0FBQzlDLDBCQUEwQjtBQUMxQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdDb21wb25lbnQgZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIkFwcEN0cmxcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ3RybCBleHRlbmRzIEdDb21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eSgpIGd1aWRlRWRpdG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGluaXRFdmVudCgpIHt9XHJcbiAgX19vbkxvYWQoKSB7XHJcbiAgICBpZiAoQ0NfREVWICYmIHRoaXMuZ3VpZGVFZGl0b3IpIHtcclxuICAgICAgbGV0IF9PbGRFdmVudFRhcmdldE9uID0gY2MuTm9kZS5wcm90b3R5cGUub24gYXMgYW55O1xyXG4gICAgICBjYy5Ob2RlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIF9PbGRFdmVudFRhcmdldE9uLmNhbGwoc2VsZiwgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzW1wiX19fZ3VpZGVFdmVudFwiXSAmJiB0eXBlID09IFwidG91Y2hzdGFydFwiKSB7XHJcbiAgICAgICAgICBfT2xkRXZlbnRUYXJnZXRPbi5jYWxsKFxyXG4gICAgICAgICAgICBzZWxmLFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICBsZXQgcGF0aCA9IHNlbGYubG9nUGF0aCgpO1xyXG4gICAgICAgICAgICAgIGNjLmxvZyhcclxuICAgICAgICAgICAgICAgIFwiJWNcIiArXHJcbiAgICAgICAgICAgICAgICAgIGDot6/lvoQ6ICR7cGF0aH0sIOiKgueCueS4lueVjOWdkOaghzogJHtzZWxmLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgICAgICAgICBjYy5WZWMyLlpFUk9cclxuICAgICAgICAgICAgICAgICAgKX0sIOinpuaRuOeCueS4lueVjOWdkOaghyR7ZXZlbnQuZ2V0TG9jYXRpb24oKX1gLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xvcjpncmVlblwiXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfS5iaW5kKHNlbGYpLFxyXG4gICAgICAgICAgICBzZWxmLFxyXG4gICAgICAgICAgICB1c2VDYXB0dXJlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpc1tcIl9fX2d1aWRlRXZlbnRcIl0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBhcyBhbnk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyB3aW5kb3dbXCJfX2Vycm9ySGFuZGxlclwiXSA9IChmaWxlLCBsaW5lLCBtc2csIGVycm9yKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG5cclxuLy8gfTtcclxuLy8gd2luZG93Lm9uZXJyb3IgPSAoZXZlbnQsIHNvdXJjZSwgbGluZSkgPT4ge1xyXG4vLyAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4vLyB9XHJcbiJdfQ==