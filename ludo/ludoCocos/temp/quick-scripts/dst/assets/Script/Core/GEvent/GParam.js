
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GEvent/GParam.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4eb17WNxhtGFIV8iNkU9si5', 'GParam');
// Script/Core/GEvent/GParam.ts

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
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GParam = /** @class */ (function (_super) {
    __extends(GParam, _super);
    function GParam(msg) {
        var _this = _super.call(this) || this;
        _this.arguments = new ES5Ex_1.MapWrap();
        _this._onlyArgument = msg;
        return _this;
    }
    GParam.prototype.push = function (key, val) {
        if (!key)
            return;
        this.arguments.set(key, val);
    };
    /**
     * 获取参数
     * @param key 参数Key
     */
    GParam.prototype.get = function (key) {
        if (!key)
            return this._onlyArgument;
        return this.arguments.get(key);
    };
    /**
     * 清理
     */
    GParam.prototype.clear = function () {
        this.arguments.clear();
    };
    /**
     * 将参数转成Array
     */
    GParam.prototype.toList = function () {
        if (this.arguments.size == 0)
            return null;
        return this.arguments.values();
    };
    /**
     * ToString实现
     */
    GParam.prototype.toString = function () {
        var keys = this.arguments.keys();
        var str = "";
        for (var index = 0; index < keys.length; index++) {
            str += keys[index] + "=" + this.get(keys[index]) + "/t";
        }
        return str;
    };
    return GParam;
}(ES5Ex_1.ObjectWrap));
exports.default = GParam;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HRXZlbnQvR1BhcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF1RDtBQUN2RDtJQUFvQywwQkFBVTtJQUk1QyxnQkFBWSxHQUFTO1FBQXJCLFlBQ0UsaUJBQU8sU0FFUjtRQU5PLGVBQVMsR0FBNEIsSUFBSSxlQUFPLEVBQWtCLENBQUM7UUFLekUsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7O0lBQzNCLENBQUM7SUFFTSxxQkFBSSxHQUFYLFVBQVksR0FBVyxFQUFFLEdBQVc7UUFDbEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0JBQUcsR0FBVixVQUFjLEdBQVk7UUFDeEIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxhQUFrQixDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUJBQU0sR0FBYjtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBUSxHQUFmO1FBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoRCxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN6RDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILGFBQUM7QUFBRCxDQWpEQSxBQWlEQyxDQWpEbUMsa0JBQVUsR0FpRDdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0V3JhcCwgTWFwV3JhcCB9IGZyb20gXCIuLi9GcmFtZUV4L0VTNUV4XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdQYXJhbSBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIHByaXZhdGUgYXJndW1lbnRzOiBNYXBXcmFwPHN0cmluZywgT2JqZWN0PiA9IG5ldyBNYXBXcmFwPHN0cmluZywgT2JqZWN0PigpO1xyXG5cclxuICBwcml2YXRlIF9vbmx5QXJndW1lbnQ7XHJcbiAgY29uc3RydWN0b3IobXNnPzogYW55KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fb25seUFyZ3VtZW50ID0gbXNnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHB1c2goa2V5OiBzdHJpbmcsIHZhbDogT2JqZWN0KSB7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgdGhpcy5hcmd1bWVudHMuc2V0KGtleSwgdmFsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWPguaVsFxyXG4gICAqIEBwYXJhbSBrZXkg5Y+C5pWwS2V5XHJcbiAgICovXHJcbiAgcHVibGljIGdldDxUPihrZXk/OiBzdHJpbmcpOiBUIHtcclxuICAgIGlmICgha2V5KSByZXR1cm4gdGhpcy5fb25seUFyZ3VtZW50IGFzIFQ7XHJcbiAgICByZXR1cm4gdGhpcy5hcmd1bWVudHMuZ2V0KGtleSkgYXMgVDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa4heeQhlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgIHRoaXMuYXJndW1lbnRzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIblj4LmlbDovazmiJBBcnJheVxyXG4gICAqL1xyXG4gIHB1YmxpYyB0b0xpc3QoKTogT2JqZWN0W10ge1xyXG4gICAgaWYgKHRoaXMuYXJndW1lbnRzLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5hcmd1bWVudHMudmFsdWVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb1N0cmluZ+WunueOsFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgbGV0IGtleXMgPSB0aGlzLmFyZ3VtZW50cy5rZXlzKCk7XHJcbiAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXlzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBzdHIgKz0ga2V5c1tpbmRleF0gKyBcIj1cIiArIHRoaXMuZ2V0KGtleXNbaW5kZXhdKSArIFwiL3RcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfVxyXG59XHJcbiJdfQ==