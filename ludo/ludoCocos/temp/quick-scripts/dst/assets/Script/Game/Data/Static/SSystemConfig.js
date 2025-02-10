
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SSystemConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TU3lzdGVtQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBeUQ7QUFFakQsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBbUMsaUNBQU87SUFBMUM7O0lBY0EsQ0FBQztJQWJRLDZCQUFLLEdBQVosVUFBYSxHQUFRO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLEdBQUcsR0FBRyxrQkFBTyxDQUFDLFFBQVEsQ0FBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSw2QkFBSyxHQUFaLFVBQWdCLEdBQVc7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBbUIsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxLQUFZLENBQUM7SUFDMUIsQ0FBQztJQWJVLGFBQWE7UUFEekIsT0FBTztPQUNLLGFBQWEsQ0FjekI7SUFBRCxvQkFBQztDQWRELEFBY0MsQ0Fka0Msa0JBQU8sR0FjekM7QUFkWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNTeXN0ZW1Db25maWdSYXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNTeXN0ZW1Db25maWcgZXh0ZW5kcyBHU3RhdGljIHtcclxuICBwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHJhdyA9IEdTdGF0aWMuYWRkb25SYXc8U1N5c3RlbUNvbmZpZ1Jhdz4ob2JqLmRhdGFbaV0pO1xyXG4gICAgICB0aGlzLl9kYXRhLnNldChyYXcua2V5LCByYXcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsdWU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgIGxldCByYXcgPSB0aGlzLmdldFJhdzxTU3lzdGVtQ29uZmlnUmF3PihrZXkpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHJhdy52YWx1ZSBhcyBhbnk7XHJcbiAgfVxyXG59XHJcbiJdfQ==