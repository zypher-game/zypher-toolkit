"use strict";
cc._RF.push(module, '90d392bk6JOJ43eV5666fRI', 'SSystemConfig');
// Script/Game/Data/Static/SSystemConfig.ts

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
exports.SSystemConfig = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SSystemConfig = /** @class */ (function (_super) {
    __extends(SSystemConfig, _super);
    function SSystemConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SSystemConfig.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.key, raw);
        }
        return true;
    };
    SSystemConfig.prototype.value = function (key) {
        var raw = this.getRaw(key);
        if (!raw)
            return null;
        return raw.value;
    };
    SSystemConfig = __decorate([
        ccclass
    ], SSystemConfig);
    return SSystemConfig;
}(DataPool_1.GStatic));
exports.SSystemConfig = SSystemConfig;

cc._RF.pop();