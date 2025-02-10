"use strict";
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