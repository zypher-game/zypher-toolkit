
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/conventions/EnumUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1336b/Nn7NKaKGbfiRSaI58', 'EnumUtil');
// Script/conventions/EnumUtil.ts

/**
 * copyright (c) windwide.cn
 * author: donhwa
 * desc: enum util
 * date: 2020-11-19
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUtil = void 0;
var EnumUtil = /** @class */ (function () {
    function EnumUtil() {
    }
    /** 取枚举长度 */
    EnumUtil.size = function (e) {
        return Object.keys(e).length / 2;
    };
    /** 返回根据枚举长度填满初始值的数组 */
    EnumUtil.newArray = function (e, initItem) {
        var arr = [];
        for (var i = 0, size = EnumUtil.size(e); i < size; i++) {
            arr.push(initItem);
        }
        return arr;
    };
    return EnumUtil;
}());
exports.EnumUtil = EnumUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29udmVudGlvbnMvRW51bVV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0dBS0c7OztBQUVIO0lBQUE7SUFlQSxDQUFDO0lBZEcsWUFBWTtJQUNMLGFBQUksR0FBWCxVQUFZLENBQVM7UUFDakIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELHVCQUF1QjtJQUNoQixpQkFBUSxHQUFmLFVBQW1CLENBQVMsRUFBRSxRQUFXO1FBQ3JDLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBjb3B5cmlnaHQgKGMpIHdpbmR3aWRlLmNuXHJcbiAqIGF1dGhvcjogZG9uaHdhXHJcbiAqIGRlc2M6IGVudW0gdXRpbFxyXG4gKiBkYXRlOiAyMDIwLTExLTE5XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVudW1VdGlsIHtcclxuICAgIC8qKiDlj5bmnprkuL7plb/luqYgKi9cclxuICAgIHN0YXRpYyBzaXplKGU6IE9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlKS5sZW5ndGggLyAyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiog6L+U5Zue5qC55o2u5p6a5Li+6ZW/5bqm5aGr5ruh5Yid5aeL5YC855qE5pWw57uEICovXHJcbiAgICBzdGF0aWMgbmV3QXJyYXk8VD4oZTogT2JqZWN0LCBpbml0SXRlbTogVCkge1xyXG4gICAgICAgIGxldCBhcnI6IFRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBzaXplID0gRW51bVV0aWwuc2l6ZShlKTsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaChpbml0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn0iXX0=