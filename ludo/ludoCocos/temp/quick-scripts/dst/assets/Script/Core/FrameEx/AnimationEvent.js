
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/AnimationEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7debaLy6r9LiapHZFVpIic+', 'AnimationEvent');
// Script/Core/FrameEx/AnimationEvent.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var AnimationEvent = /** @class */ (function (_super) {
    __extends(AnimationEvent, _super);
    function AnimationEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationEvent.prototype.frameEvent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.frameCallBack)
            this.frameCallBack.apply(this, args);
    };
    AnimationEvent = __decorate([
        ccclass,
        menu("FrameEx/AnimationEvent")
    ], AnimationEvent);
    return AnimationEvent;
}(cc.Component));
exports.default = AnimationEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0FuaW1hdGlvbkV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBb0IsRUFBRSxDQUFDLFVBQVUsRUFBL0IsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBR3hDO0lBQTRDLGtDQUFZO0lBQXhEOztJQUtBLENBQUM7SUFIQyxtQ0FBVSxHQUFWO1FBQVcsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYTtZQUFFLElBQUksQ0FBQyxhQUFhLE9BQWxCLElBQUksRUFBa0IsSUFBSSxFQUFFO0lBQ3RELENBQUM7SUFKa0IsY0FBYztRQUZsQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDO09BQ1YsY0FBYyxDQUtsQztJQUFELHFCQUFDO0NBTEQsQUFLQyxDQUwyQyxFQUFFLENBQUMsU0FBUyxHQUt2RDtrQkFMb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuQG1lbnUoXCJGcmFtZUV4L0FuaW1hdGlvbkV2ZW50XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdGlvbkV2ZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICBwdWJsaWMgZnJhbWVDYWxsQmFjazogYW55O1xyXG4gIGZyYW1lRXZlbnQoLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmICh0aGlzLmZyYW1lQ2FsbEJhY2spIHRoaXMuZnJhbWVDYWxsQmFjayguLi5hcmdzKTtcclxuICB9XHJcbn1cclxuIl19