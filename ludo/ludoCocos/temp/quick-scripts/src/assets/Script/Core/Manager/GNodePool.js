"use strict";
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