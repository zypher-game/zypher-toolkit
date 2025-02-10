
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/ViewUtil/ToggleSwitcher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '282b9WVZn9Cf4yHR9T6tdZL', 'ToggleSwitcher');
// Script/Game/Views/ViewUtil/ToggleSwitcher.ts

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
var _a = cc._decorator, property = _a.property, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode;
var ToggleSwitcher = /** @class */ (function (_super) {
    __extends(ToggleSwitcher, _super);
    function ToggleSwitcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.markNode = null;
        _this.unMarkNode = null;
        _this.clickNode = null;
        _this._isMark = false;
        _this.clickEventHander = null;
        return _this;
    }
    Object.defineProperty(ToggleSwitcher.prototype, "Mark", {
        get: function () {
            return this._isMark;
        },
        set: function (is) {
            this._isMark = is;
            this.init();
        },
        enumerable: false,
        configurable: true
    });
    ToggleSwitcher.prototype.onLoad = function () {
        var _this = this;
        this.init();
        if (!CC_EDITOR) {
            if (!this.clickNode.getComponent(cc.Button)) {
                this.clickNode.addComponent(cc.Button);
            }
            this.clickNode.on("click", function () {
                _this.Mark = !_this.Mark;
                _this.init();
                _this.clickEventHander.emit([
                    _this.Mark,
                    _this.clickEventHander.customEventData,
                ]);
            }, this);
        }
    };
    ToggleSwitcher.prototype.init = function () {
        if (this.unMarkNode && this.markNode) {
            if (this.Mark) {
                this.markNode.active = true;
                this.unMarkNode.active = false;
            }
            else {
                this.markNode.active = false;
                this.unMarkNode.active = true;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], ToggleSwitcher.prototype, "markNode", void 0);
    __decorate([
        property(cc.Node)
    ], ToggleSwitcher.prototype, "unMarkNode", void 0);
    __decorate([
        property(cc.Node)
    ], ToggleSwitcher.prototype, "clickNode", void 0);
    __decorate([
        property({
            type: cc.Boolean,
        })
    ], ToggleSwitcher.prototype, "Mark", null);
    __decorate([
        property()
    ], ToggleSwitcher.prototype, "_isMark", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
        })
    ], ToggleSwitcher.prototype, "clickEventHander", void 0);
    ToggleSwitcher = __decorate([
        ccclass,
        executeInEditMode
    ], ToggleSwitcher);
    return ToggleSwitcher;
}(cc.Component));
exports.default = ToggleSwitcher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9WaWV3VXRpbC9Ub2dnbGVTd2l0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQTJDLEVBQUUsQ0FBQyxVQUFVLEVBQXRELFFBQVEsY0FBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLGlCQUFpQix1QkFBa0IsQ0FBQztBQUkvRDtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQXVEQztRQXREb0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBYTdDLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFLekIsc0JBQWdCLEdBQThCLElBQUksQ0FBQzs7SUFrQ3JELENBQUM7SUFoREMsc0JBQUksZ0NBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDO2FBQ0QsVUFBUyxFQUFXO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUpBO0lBY00sK0JBQU0sR0FBYjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2YsT0FBTyxFQUNQO2dCQUNFLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztvQkFDekIsS0FBSSxDQUFDLElBQUk7b0JBQ1QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWU7aUJBQ3RDLENBQUMsQ0FBQztZQUNMLENBQUMsRUFDRCxJQUFJLENBQ0wsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7SUFyRGtCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUEwQjtJQUN6QjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFBNEI7SUFDM0I7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQTJCO0lBSTdDO1FBSEMsUUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPO1NBQ2pCLENBQUM7OENBR0Q7SUFPRDtRQURDLFFBQVEsRUFBRTttREFDYztJQUt6QjtRQUhDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVk7U0FDaEMsQ0FBQzs0REFDaUQ7SUFyQmhDLGNBQWM7UUFGbEMsT0FBTztRQUNQLGlCQUFpQjtPQUNHLGNBQWMsQ0F1RGxDO0lBQUQscUJBQUM7Q0F2REQsQUF1REMsQ0F2RDJDLEVBQUUsQ0FBQyxTQUFTLEdBdUR2RDtrQkF2RG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3VXRpbCB9IGZyb20gXCIuLi9WaWV3VXRpbC9WSWV3VXRpbFwiO1xyXG5cclxuY29uc3QgeyBwcm9wZXJ0eSwgY2NjbGFzcywgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlU3dpdGNoZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSBtYXJrTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIHVuTWFya05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSBjbGlja05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gIH0pXHJcbiAgZ2V0IE1hcmsoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNNYXJrO1xyXG4gIH1cclxuICBzZXQgTWFyayhpczogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNNYXJrID0gaXM7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eSgpXHJcbiAgX2lzTWFyazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAcHJvcGVydHkoe1xyXG4gICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcclxuICB9KVxyXG4gIGNsaWNrRXZlbnRIYW5kZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICBpZiAoIXRoaXMuY2xpY2tOb2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja05vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jbGlja05vZGUub24oXHJcbiAgICAgICAgXCJjbGlja1wiLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuTWFyayA9ICF0aGlzLk1hcms7XHJcbiAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgIHRoaXMuY2xpY2tFdmVudEhhbmRlci5lbWl0KFtcclxuICAgICAgICAgICAgdGhpcy5NYXJrLFxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnRIYW5kZXIuY3VzdG9tRXZlbnREYXRhLFxyXG4gICAgICAgICAgXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnVuTWFya05vZGUgJiYgdGhpcy5tYXJrTm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5NYXJrKSB7XHJcbiAgICAgICAgdGhpcy5tYXJrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudW5NYXJrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1hcmtOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5NYXJrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==