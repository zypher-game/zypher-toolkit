"use strict";
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