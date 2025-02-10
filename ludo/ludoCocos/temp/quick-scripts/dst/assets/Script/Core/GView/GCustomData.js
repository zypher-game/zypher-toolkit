
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GCustomData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f8ab0DbAi1HM6Q3F4ABXoIG', 'GCustomData');
// Script/Core/GView/GCustomData.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var GCustomData = /** @class */ (function (_super) {
    __extends(GCustomData, _super);
    function GCustomData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._customData = null;
        return _this;
    }
    GCustomData.prototype.onLoad = function () { };
    GCustomData.prototype.setData = function (data) {
        this._customData = data;
    };
    GCustomData.prototype.getData = function () {
        return this._customData;
    };
    return GCustomData;
}(cc.Component));
exports.default = GCustomData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HQ3VzdG9tRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQVdDO1FBVlcsaUJBQVcsR0FBUSxJQUFJLENBQUM7O0lBVXBDLENBQUM7SUFUQyw0QkFBTSxHQUFOLGNBQVUsQ0FBQztJQUVKLDZCQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFTSw2QkFBTyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBZ0IsQ0FBQztJQUMvQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYd0MsRUFBRSxDQUFDLFNBQVMsR0FXcEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBHQ3VzdG9tRGF0YSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgcHJvdGVjdGVkIF9jdXN0b21EYXRhOiBhbnkgPSBudWxsO1xyXG4gIG9uTG9hZCgpIHt9XHJcblxyXG4gIHB1YmxpYyBzZXREYXRhKGRhdGEpIHtcclxuICAgIHRoaXMuX2N1c3RvbURhdGEgPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERhdGE8VD4oKTogVCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tRGF0YSBhcyBUO1xyXG4gIH1cclxufVxyXG4iXX0=