
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/GNodePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6b099vxK35EPZXbRGEiwX+x', 'GNodePool');
// Script/Core/Manager/GNodePool.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.GNodePool = void 0;
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GNodePool = /** @class */ (function (_super) {
    __extends(GNodePool, _super);
    function GNodePool(parent) {
        var _this = _super.call(this) || this;
        _this._actives = [];
        _this._recoves = [];
        _this.init(parent);
        return _this;
    }
    Object.defineProperty(GNodePool.prototype, "actives", {
        get: function () {
            return this._actives;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GNodePool.prototype, "recovers", {
        get: function () {
            return this._recoves;
        },
        enumerable: false,
        configurable: true
    });
    GNodePool.prototype.checkInit = function () {
        if (!this._parent) {
            return false;
        }
        return true;
    };
    GNodePool.prototype.init = function (parent) {
        if (!parent)
            return;
        this._parent = parent;
    };
    GNodePool.prototype.pop = function () {
        if (!this.checkInit())
            return;
        if (this._recoves.length == 0) {
            var node_1 = this.syncCreate();
            if (!node_1)
                return null;
            this._actives.push(node_1);
            node_1.name = ++GNodePool._tag + '';
            this._parent.addChild(node_1);
            return node_1;
        }
        var node = this._recoves.pop();
        this._actives.push(node);
        node.active = true;
        console.log(this._recoves.length);
        return node;
    };
    GNodePool.prototype.asyncPop = function (cb) {
        var _this = this;
        if (!this.checkInit()) {
            return cb(null);
        }
        if (this._recoves.length == 0) {
            return this.asyncCreate(function (node) {
                if (!node)
                    return cb(null);
                _this._actives.push(node);
                node.setUserData(++GNodePool._tag);
                _this._parent.addChild(node);
                cb(node);
            });
        }
        var node = this._recoves.pop();
        this._actives.push(node);
        node.active = true;
        cb(node);
    };
    GNodePool.prototype.push = function (node) {
        if (!this.checkInit())
            return;
        node.active = false;
        for (var i = 0; i < this._actives.length; i++) {
            if (this._actives[i].getUserData() == node.getUserData()) {
                this._actives.splice(i, 1);
                break;
            }
        }
        node.stopAllActions();
        this._recoves.push(node);
    };
    GNodePool.prototype.destory = function () {
        if (!this.checkInit())
            return;
        for (var _i = 0, _a = this._actives; _i < _a.length; _i++) {
            var node = _a[_i];
            node.destroy();
        }
        for (var _b = 0, _c = this._recoves; _b < _c.length; _b++) {
            var node = _c[_b];
            node.destroy();
        }
        this._actives.splice(0, this._actives.length);
        this._recoves.splice(0, this._recoves.length);
        this.onDestroy();
    };
    GNodePool.prototype.onDestroy = function () {
    };
    GNodePool._tag = 0;
    return GNodePool;
}(ES5Ex_1.ObjectWrap));
exports.GNodePool = GNodePool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL0dOb2RlUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE4QztBQUU5QztJQUF3Qyw2QkFBVTtJQU05QyxtQkFBWSxNQUFnQjtRQUE1QixZQUNJLGlCQUFPLFNBRVY7UUFSUyxjQUFRLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLGNBQVEsR0FBYyxFQUFFLENBQUM7UUFNL0IsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFDdEIsQ0FBQztJQUtELHNCQUFXLDhCQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFTSw2QkFBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sd0JBQUksR0FBWCxVQUFZLE1BQWU7UUFDdkIsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFTSx1QkFBRyxHQUFWO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxPQUFPO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksTUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFJLENBQUMsQ0FBQztZQUN6QixNQUFJLENB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bEI7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVTLDZCQUFTLEdBQW5CO0lBRUEsQ0FBQztJQTlGZ0IsY0FBSSxHQUFXLENBQUMsQ0FBQztJQStGdEMsZ0JBQUM7Q0FuR0QsQUFtR0MsQ0FuR3VDLGtCQUFVLEdBbUdqRDtBQW5HcUIsOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RXcmFwIH0gZnJvbSBcIi4uL0ZyYW1lRXgvRVM1RXhcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHTm9kZVBvb2wgZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICAgIHByb3RlY3RlZCBfYWN0aXZlczogY2MuTm9kZVtdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX3JlY292ZXM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIF9wYXJlbnQ6IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF90YWc6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50PzogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLmluaXQocGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc3luY0NyZWF0ZSgpOiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jQ3JlYXRlKGNiOiBOb2RlQ2FsbEJhY2spO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZlcygpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVjb3ZlcnMoKTogY2MuTm9kZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVjb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQocGFyZW50OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvcCgpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0KCkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb3Zlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc3luY0NyZWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUubmFtZSA9ICsrR05vZGVQb29sLl90YWcgKyAnJztcclxuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9yZWNvdmVzLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZXMucHVzaChub2RlKTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fcmVjb3Zlcy5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jUG9wKGNiOiBOb2RlQ2FsbEJhY2spIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmVjb3Zlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3luY0NyZWF0ZSgobm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSByZXR1cm4gY2IobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFVzZXJEYXRhKCsrR05vZGVQb29sLl90YWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY2Iobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3JlY292ZXMucG9wKCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYihub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVzaChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrSW5pdCgpKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FjdGl2ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZXNbaV0uZ2V0VXNlckRhdGEoKSA9PSBub2RlLmdldFVzZXJEYXRhKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3JlY292ZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0KCkpIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMuX2FjdGl2ZXMpIHtcclxuICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5fcmVjb3Zlcykge1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlcy5zcGxpY2UoMCwgdGhpcy5fYWN0aXZlcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuX3JlY292ZXMuc3BsaWNlKDAsIHRoaXMuX3JlY292ZXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLm9uRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgfVxyXG59Il19