
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Map/MapStartCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '69439bUPwhNYLazNp2omdMi', 'MapStartCtrl');
// Script/Game/Views/Map/MapStartCtrl.ts

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
var MapStartCtrl = /** @class */ (function (_super) {
    __extends(MapStartCtrl, _super);
    function MapStartCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guideEditor = false;
        return _this;
    }
    MapStartCtrl.prototype.initEvent = function () { };
    MapStartCtrl.prototype.__onLoad = function () {
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
    ], MapStartCtrl.prototype, "guideEditor", void 0);
    MapStartCtrl = __decorate([
        ccclass,
        menu("MapStartCtrl")
    ], MapStartCtrl);
    return MapStartCtrl;
}(GComponent_1.default));
exports.default = MapStartCtrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9NYXAvTWFwU3RhcnRDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUVwRCxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUEwQyxnQ0FBVTtJQUFwRDtRQUFBLHFFQStCQztRQTlCYSxpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUE4QjNDLENBQUM7SUE3QlEsZ0NBQVMsR0FBaEIsY0FBb0IsQ0FBQztJQUNyQiwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5QixJQUFJLG1CQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQVMsQ0FBQztZQUNwRCxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVO2dCQUNqRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLG1CQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxJQUFJLFlBQVksRUFBRTtvQkFDbEQsbUJBQWlCLENBQUMsSUFBSSxDQUNwQixJQUFJLEVBQ0osSUFBSSxFQUNKLFVBQVUsS0FBSzt3QkFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxHQUFHLENBQ0osSUFBSTs2QkFDRixtQkFBTyxJQUFJLGdEQUFhLElBQUksQ0FBQyxxQkFBcUIsQ0FDaEQsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2Isb0RBQVksS0FBSyxDQUFDLFdBQVcsRUFBSSxDQUFBLEVBQ3BDLGFBQWEsQ0FDZCxDQUFDO29CQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ1osSUFBSSxFQUNKLFVBQVUsQ0FDWCxDQUFDO29CQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzlCO1lBQ0gsQ0FBUSxDQUFDO1NBQ1Y7SUFDSCxDQUFDO0lBN0JXO1FBQVgsUUFBUSxFQUFFO3FEQUE4QjtJQUR0QixZQUFZO1FBRmhDLE9BQU87UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDO09BQ0EsWUFBWSxDQStCaEM7SUFBRCxtQkFBQztDQS9CRCxBQStCQyxDQS9CeUMsb0JBQVUsR0ErQm5EO2tCQS9Cb0IsWUFBWTtBQWlDakMsMkRBQTJEO0FBQzNELHdCQUF3QjtBQUV4QixLQUFLO0FBQ0wsOENBQThDO0FBQzlDLDBCQUEwQjtBQUMxQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdDb21wb25lbnQgZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIk1hcFN0YXJ0Q3RybFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBTdGFydEN0cmwgZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoKSBndWlkZUVkaXRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpbml0RXZlbnQoKSB7fVxyXG4gIF9fb25Mb2FkKCkge1xyXG4gICAgaWYgKENDX0RFViAmJiB0aGlzLmd1aWRlRWRpdG9yKSB7XHJcbiAgICAgIGxldCBfT2xkRXZlbnRUYXJnZXRPbiA9IGNjLk5vZGUucHJvdG90eXBlLm9uIGFzIGFueTtcclxuICAgICAgY2MuTm9kZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBfT2xkRXZlbnRUYXJnZXRPbi5jYWxsKHNlbGYsIHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIGlmICghdGhpc1tcIl9fX2d1aWRlRXZlbnRcIl0gJiYgdHlwZSA9PSBcInRvdWNoc3RhcnRcIikge1xyXG4gICAgICAgICAgX09sZEV2ZW50VGFyZ2V0T24uY2FsbChcclxuICAgICAgICAgICAgc2VsZixcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgbGV0IHBhdGggPSBzZWxmLmxvZ1BhdGgoKTtcclxuICAgICAgICAgICAgICBjYy5sb2coXHJcbiAgICAgICAgICAgICAgICBcIiVjXCIgK1xyXG4gICAgICAgICAgICAgICAgICBg6Lev5b6EOiAke3BhdGh9LCDoioLngrnkuJbnlYzlnZDmoIc6ICR7c2VsZi5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuVmVjMi5aRVJPXHJcbiAgICAgICAgICAgICAgICAgICl9LCDop6bmkbjngrnkuJbnlYzlnZDmoIcke2V2ZW50LmdldExvY2F0aW9uKCl9YCxcclxuICAgICAgICAgICAgICAgIFwiY29sb3I6Z3JlZW5cIlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0uYmluZChzZWxmKSxcclxuICAgICAgICAgICAgc2VsZixcclxuICAgICAgICAgICAgdXNlQ2FwdHVyZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXNbXCJfX19ndWlkZUV2ZW50XCJdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gYXMgYW55O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gd2luZG93W1wiX19lcnJvckhhbmRsZXJcIl0gPSAoZmlsZSwgbGluZSwgbXNnLCBlcnJvcikgPT4ge1xyXG4vLyAgICAgY29uc29sZS5sb2cobXNnKTtcclxuXHJcbi8vIH07XHJcbi8vIHdpbmRvdy5vbmVycm9yID0gKGV2ZW50LCBzb3VyY2UsIGxpbmUpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuLy8gfVxyXG4iXX0=