
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbee3fN/8BIRpSU/TGKOQQF', 'GPage');
// Script/Core/GView/GPage.ts

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
var GChild_1 = require("./GChild");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GPage = /** @class */ (function (_super) {
    __extends(GPage, _super);
    function GPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isPageShow = false;
        return _this;
    }
    GPage.prototype.onPageActive = function () {
        this.node.active = true;
    };
    GPage.prototype.onPageDisable = function () {
        this.node.active = false;
    };
    GPage.prototype.onPageOut = function () {
        this._isPageShow = false;
    };
    GPage.prototype.onPageIn = function () {
        this._isPageShow = true;
    };
    GPage = __decorate([
        ccclass,
        menu("View/Base/GPage")
    ], GPage);
    return GPage;
}(GChild_1.default));
exports.default = GPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEI7QUFFeEIsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBbUMseUJBQU07SUFBekM7UUFBQSxxRUFrQkM7UUFqQlcsaUJBQVcsR0FBWSxLQUFLLENBQUM7O0lBaUJ6QyxDQUFDO0lBZlEsNEJBQVksR0FBbkI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLDZCQUFhLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTSx5QkFBUyxHQUFoQjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTSx3QkFBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQWpCa0IsS0FBSztRQUZ6QixPQUFPO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDO09BQ0gsS0FBSyxDQWtCekI7SUFBRCxZQUFDO0NBbEJELEFBa0JDLENBbEJrQyxnQkFBTSxHQWtCeEM7a0JBbEJvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdDaGlsZCBmcm9tIFwiLi9HQ2hpbGRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiVmlldy9CYXNlL0dQYWdlXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdQYWdlIGV4dGVuZHMgR0NoaWxkIHtcclxuICBwcm90ZWN0ZWQgX2lzUGFnZVNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIG9uUGFnZUFjdGl2ZSgpIHtcclxuICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUGFnZURpc2FibGUoKSB7XHJcbiAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25QYWdlT3V0KCkge1xyXG4gICAgdGhpcy5faXNQYWdlU2hvdyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUGFnZUluKCkge1xyXG4gICAgdGhpcy5faXNQYWdlU2hvdyA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==