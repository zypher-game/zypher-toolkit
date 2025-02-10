
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/HomeCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ffb93eqQMtBV4yYuLGXoZyb', 'HomeCtrl');
// Script/Game/Views/Home/HomeCtrl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadCtrl = /** @class */ (function (_super) {
    __extends(LoadCtrl, _super);
    function LoadCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.walletConnectHandle = null;
        return _this;
    }
    LoadCtrl.prototype.start = function () {
        this.walletConnectHandle.on('click', function () {
            console.log(11111);
            window.parent.postMessage('walletConnect', 'http://192.168.0.22:9998/');
        });
    };
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "walletConnectHandle", void 0);
    LoadCtrl = __decorate([
        ccclass
    ], LoadCtrl);
    return LoadCtrl;
}(GViewBase_1.default));
exports.default = LoadCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL0hvbWVDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUVoRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBUztJQUEvQztRQUFBLHFFQVFDO1FBUG9CLHlCQUFtQixHQUFZLElBQUksQ0FBQzs7SUFPekQsQ0FBQztJQU5XLHdCQUFLLEdBQWY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU5rQjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFBcUM7SUFEcEMsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQVE1QjtJQUFELGVBQUM7Q0FSRCxBQVFDLENBUnFDLG1CQUFTLEdBUTlDO2tCQVJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdWaWV3QmFzZSBmcm9tICcuLi8uLi8uLi9Db3JlL0dWaWV3L0dWaWV3QmFzZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkQ3RybCBleHRlbmRzIEdWaWV3QmFzZSB7XG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSB3YWxsZXRDb25uZWN0SGFuZGxlOiBjYy5Ob2RlID0gbnVsbDtcbiAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMud2FsbGV0Q29ubmVjdEhhbmRsZS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygxMTExMSk7XG4gICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCd3YWxsZXRDb25uZWN0JywgJ2h0dHA6Ly8xOTIuMTY4LjAuMjI6OTk5OC8nKTtcbiAgICB9KTtcbiAgfVxufVxuIl19