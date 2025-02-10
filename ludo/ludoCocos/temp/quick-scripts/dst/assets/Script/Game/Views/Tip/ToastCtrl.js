
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Tip/ToastCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f70f90tIpAhLQbkU0sAvfX', 'ToastCtrl');
// Script/Game/Views/Tip/ToastCtrl.ts

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
var MaskSprite_1 = require("../../../Core/FrameEx/MaskSprite");
var GChild_1 = require("../../../Core/GView/GChild");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var ToastCtrl = /** @class */ (function (_super) {
    __extends(ToastCtrl, _super);
    function ToastCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tip = null;
        _this.icon = null;
        _this.bgImage = null;
        _this._duration = 2;
        _this._rCb = null;
        return _this;
    }
    ToastCtrl.prototype.setRcb = function (rCb) {
        this._rCb = rCb;
    };
    ToastCtrl.prototype.setText = function (msg, duration) {
        var _this = this;
        this.node.y = 0;
        this.node.x = 0;
        this.node.opacity = 255;
        var msgs = msg.split("$");
        var icon, maskType;
        if (msgs.length > 1) {
            icon = msgs[0];
            maskType = parseInt(msgs[1]);
            msg = msgs[2];
        }
        if (this.icon && icon) {
            this.icon.node.active = true;
            this.icon._maskType = maskType;
            this.assetImpl.spriteFrame(this.icon, icon);
        }
        else {
            if (this.icon) {
                this.icon.node.active = true;
            }
        }
        if (!this.tip)
            return;
        if (duration)
            this._duration = duration;
        this.tip.string = msg;
        this.node.y = -100;
        var spaw = cc.spawn(cc.moveTo(this._duration, cc.v2(0, 100)), cc.sequence(cc.delayTime((1 * this._duration) / 2), cc.fadeOut((1 * this._duration) / 2)));
        var action = cc.sequence(spaw, cc.callFunc(function () {
            // GCtrl.destroy(this.node);
            _this._rCb && _this._rCb(_this.node);
        }));
        this.node.runAction(action);
        if (this.tip.node.width > 350) {
            this.bgImage.node.width = this.tip.node.width + 50;
        }
        else {
            this.bgImage.node.width = 350;
        }
    };
    ToastCtrl.prototype.setDuration = function (duration) {
        this._duration = duration;
    };
    __decorate([
        property(cc.RichText)
    ], ToastCtrl.prototype, "tip", void 0);
    __decorate([
        property(MaskSprite_1.default)
    ], ToastCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], ToastCtrl.prototype, "bgImage", void 0);
    ToastCtrl = __decorate([
        ccclass,
        menu("View/Tip/ToastCtrl")
    ], ToastCtrl);
    return ToastCtrl;
}(GChild_1.default));
exports.default = ToastCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9UaXAvVG9hc3RDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBdUMsNkJBQU07SUFBN0M7UUFBQSxxRUErREM7UUE5RHdCLFNBQUcsR0FBZ0IsSUFBSSxDQUFDO1FBRXpCLFVBQUksR0FBZSxJQUFJLENBQUM7UUFDekIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUVyQyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLFVBQUksR0FBUSxJQUFJLENBQUM7O0lBdUQ3QixDQUFDO0lBckRRLDBCQUFNLEdBQWIsVUFBYyxHQUFHO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVNLDJCQUFPLEdBQWQsVUFBZSxHQUFXLEVBQUUsUUFBaUI7UUFBN0MsaUJBNENDO1FBM0NDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEVBQUUsUUFBUSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM5QjtTQUNGO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUN0QixJQUFJLFFBQVE7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FDakIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQ3hDLEVBQUUsQ0FBQyxRQUFRLENBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3RDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyQyxDQUNGLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUN0QixJQUFJLEVBQ0osRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNWLDRCQUE0QjtZQUM1QixLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDcEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRU0sK0JBQVcsR0FBbEIsVUFBbUIsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQTdEc0I7UUFBdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MENBQXlCO0lBRXpCO1FBQXJCLFFBQVEsQ0FBQyxvQkFBVSxDQUFDOzJDQUF5QjtJQUN6QjtRQUFwQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FBMkI7SUFKNUIsU0FBUztRQUY3QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO09BQ04sU0FBUyxDQStEN0I7SUFBRCxnQkFBQztDQS9ERCxBQStEQyxDQS9Ec0MsZ0JBQU0sR0ErRDVDO2tCQS9Eb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXNrU3ByaXRlIGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvTWFza1Nwcml0ZVwiO1xyXG5pbXBvcnQgR0NoaWxkIGZyb20gXCIuLi8uLi8uLi9Db3JlL0dWaWV3L0dDaGlsZFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuQG1lbnUoXCJWaWV3L1RpcC9Ub2FzdEN0cmxcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9hc3RDdHJsIGV4dGVuZHMgR0NoaWxkIHtcclxuICBAcHJvcGVydHkoY2MuUmljaFRleHQpIHRpcDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoTWFza1Nwcml0ZSkgaWNvbjogTWFza1Nwcml0ZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSkgYmdJbWFnZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIF9kdXJhdGlvbjogbnVtYmVyID0gMjtcclxuXHJcbiAgcHJvdGVjdGVkIF9yQ2I6IGFueSA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBzZXRSY2IockNiKSB7XHJcbiAgICB0aGlzLl9yQ2IgPSByQ2I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VGV4dChtc2c6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIpIHtcclxuICAgIHRoaXMubm9kZS55ID0gMDtcclxuICAgIHRoaXMubm9kZS54ID0gMDtcclxuICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgbGV0IG1zZ3MgPSBtc2cuc3BsaXQoXCIkXCIpO1xyXG4gICAgbGV0IGljb24sIG1hc2tUeXBlO1xyXG4gICAgaWYgKG1zZ3MubGVuZ3RoID4gMSkge1xyXG4gICAgICBpY29uID0gbXNnc1swXTtcclxuICAgICAgbWFza1R5cGUgPSBwYXJzZUludChtc2dzWzFdKTtcclxuICAgICAgbXNnID0gbXNnc1syXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmljb24gJiYgaWNvbikge1xyXG4gICAgICB0aGlzLmljb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmljb24uX21hc2tUeXBlID0gbWFza1R5cGU7XHJcbiAgICAgIHRoaXMuYXNzZXRJbXBsLnNwcml0ZUZyYW1lKHRoaXMuaWNvbiwgaWNvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5pY29uKSB7XHJcbiAgICAgICAgdGhpcy5pY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnRpcCkgcmV0dXJuO1xyXG4gICAgaWYgKGR1cmF0aW9uKSB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgdGhpcy50aXAuc3RyaW5nID0gbXNnO1xyXG4gICAgdGhpcy5ub2RlLnkgPSAtMTAwO1xyXG4gICAgbGV0IHNwYXcgPSBjYy5zcGF3bihcclxuICAgICAgY2MubW92ZVRvKHRoaXMuX2R1cmF0aW9uLCBjYy52MigwLCAxMDApKSxcclxuICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgY2MuZGVsYXlUaW1lKCgxICogdGhpcy5fZHVyYXRpb24pIC8gMiksXHJcbiAgICAgICAgY2MuZmFkZU91dCgoMSAqIHRoaXMuX2R1cmF0aW9uKSAvIDIpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgIHNwYXcsXHJcbiAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAvLyBHQ3RybC5kZXN0cm95KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fckNiICYmIHRoaXMuX3JDYih0aGlzLm5vZGUpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIGlmICh0aGlzLnRpcC5ub2RlLndpZHRoID4gMzUwKSB7XHJcbiAgICAgIHRoaXMuYmdJbWFnZS5ub2RlLndpZHRoID0gdGhpcy50aXAubm9kZS53aWR0aCArIDUwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5iZ0ltYWdlLm5vZGUud2lkdGggPSAzNTA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RHVyYXRpb24oZHVyYXRpb246IG51bWJlcikge1xyXG4gICAgdGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl19