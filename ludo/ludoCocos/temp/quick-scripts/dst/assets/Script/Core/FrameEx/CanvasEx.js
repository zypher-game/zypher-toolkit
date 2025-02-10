
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/CanvasEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de04fZ/3HBNCaHO7VMPNMDz', 'CanvasEx');
// Script/Core/FrameEx/CanvasEx.ts

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
var GCtrl_1 = require("../GCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var CanvasEx = /** @class */ (function (_super) {
    __extends(CanvasEx, _super);
    function CanvasEx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Canvas 的适配策略
    // 通过比较设计分辨率（design size）与当前窗口可见区域（visible size）的宽高比，来确定是否应该让内容宽度或高度完全填充屏幕
    CanvasEx.prototype.onLoad = function () {
        var old = GCtrl_1.GCtrl.designSize.width / GCtrl_1.GCtrl.designSize.height;
        var win = cc.view.getVisibleSize().width / cc.view.getVisibleSize().height; //cc.winSize.width / GCtrl.winSize.height;
        if (old > win) {
            this.fitHeight = false;
            this.fitWidth = true;
        }
        else {
            this.fitHeight = true;
            this.fitWidth = false;
        }
    };
    CanvasEx.prototype.start = function () { };
    CanvasEx = __decorate([
        ccclass,
        menu("FrameEx/CanvasEx")
    ], CanvasEx);
    return CanvasEx;
}(cc.Canvas));
exports.default = CanvasEx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NhbnZhc0V4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFpQztBQUUzQixJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUFzQyw0QkFBUztJQUEvQzs7SUFpQkEsQ0FBQztJQWhCQyxlQUFlO0lBQ2YsMEVBQTBFO0lBQzFFLHlCQUFNLEdBQU47UUFDRSxJQUFJLEdBQUcsR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMzRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDBDQUEwQztRQUV0SCxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsd0JBQUssR0FBTCxjQUFTLENBQUM7SUFoQlMsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDO09BQ0osUUFBUSxDQWlCNUI7SUFBRCxlQUFDO0NBakJELEFBaUJDLENBakJxQyxFQUFFLENBQUMsTUFBTSxHQWlCOUM7a0JBakJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiRnJhbWVFeC9DYW52YXNFeFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNFeCBleHRlbmRzIGNjLkNhbnZhcyB7XHJcbiAgLy8gQ2FudmFzIOeahOmAgumFjeetlueVpVxyXG4gIC8vIOmAmui/h+avlOi+g+iuvuiuoeWIhui+qOeOh++8iGRlc2lnbiBzaXpl77yJ5LiO5b2T5YmN56qX5Y+j5Y+v6KeB5Yy65Z+f77yIdmlzaWJsZSBzaXpl77yJ55qE5a696auY5q+U77yM5p2l56Gu5a6a5piv5ZCm5bqU6K+l6K6p5YaF5a655a695bqm5oiW6auY5bqm5a6M5YWo5aGr5YWF5bGP5bmVXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgbGV0IG9sZCA9IEdDdHJsLmRlc2lnblNpemUud2lkdGggLyBHQ3RybC5kZXNpZ25TaXplLmhlaWdodDtcclxuICAgIGxldCB3aW4gPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0OyAvL2NjLndpblNpemUud2lkdGggLyBHQ3RybC53aW5TaXplLmhlaWdodDtcclxuXHJcbiAgICBpZiAob2xkID4gd2luKSB7XHJcbiAgICAgIHRoaXMuZml0SGVpZ2h0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZml0V2lkdGggPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maXRIZWlnaHQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpdFdpZHRoID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHt9XHJcbn1cclxuIl19