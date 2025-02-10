
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/StartGame/messageListener.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b43f0QN9oJK7bNvywFt686p', 'messageListener');
// Script/Game/Views/StartGame/messageListener.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var AppStart = /** @class */ (function (_super) {
    __extends(AppStart, _super);
    function AppStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppStart.prototype.__onLoad = function () {
        // 主页面
        window.addEventListener("message", function (event) {
            if (event.origin === window.location.origin) {
                console.log("Message from iframe:", event.data);
            }
            else {
                console.log("event.origin:", event.origin);
            }
        });
    };
    AppStart = __decorate([
        ccclass,
        menu("AppStart")
    ], AppStart);
    return AppStart;
}(GComponent_1.default));
exports.default = AppStart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9TdGFydEdhbWUvbWVzc2FnZUxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUVwRCxJQUFBLEtBQW9CLEVBQUUsQ0FBQyxVQUFVLEVBQS9CLE9BQU8sYUFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUd4QztJQUFzQyw0QkFBVTtJQUFoRDs7SUFXQSxDQUFDO0lBVlcsMkJBQVEsR0FBbEI7UUFDRSxNQUFNO1FBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7WUFDdkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFWa0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQztPQUNJLFFBQVEsQ0FXNUI7SUFBRCxlQUFDO0NBWEQsQUFXQyxDQVhxQyxvQkFBVSxHQVcvQztrQkFYb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvR0NvbXBvbmVudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuQG1lbnUoXCJBcHBTdGFydFwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU3RhcnQgZXh0ZW5kcyBHQ29tcG9uZW50IHtcbiAgcHJvdGVjdGVkIF9fb25Mb2FkKCk6IHZvaWQge1xuICAgIC8vIOS4u+mhtemdolxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIGZyb20gaWZyYW1lOlwiLCBldmVudC5kYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXZlbnQub3JpZ2luOlwiLCBldmVudC5vcmlnaW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=