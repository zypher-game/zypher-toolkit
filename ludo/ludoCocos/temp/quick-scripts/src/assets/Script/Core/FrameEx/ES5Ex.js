"use strict";
cc._RF.push(module, '93168vsoJJBBqWKSjc5DeAx', 'ES5Ex');
// Script/Core/FrameEx/ES5Ex.ts

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
exports.ObjectWrapArray = exports.debounce = exports.NewFillArray = exports.SetWrap = exports.MapWrap = exports.ObjectWrap = void 0;
var ObjectWrap = /** @class */ (function () {
    function ObjectWrap() {
        this.wrapId = ObjectWrap.SGenWrapId++;
    }
    ObjectWrap.prototype.equal = function (b) {
        return this.wrapId == b.wrapId;
    };
    ObjectWrap.SGenWrapId = 0;
    return ObjectWrap;
}());
exports.ObjectWrap = ObjectWrap;
var MapWrap = /** @class */ (function (_super) {
    __extends(MapWrap, _super);
    function MapWrap(array) {
        var _this = _super.call(this) || this;
        _this._size = 0;
        _this._objects = cc.js.createMap(true);
        _this._size = 0;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                _this.set(array[i][0], array[i][1]);
            }
        }
        return _this;
    }
    Object.defineProperty(MapWrap.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapWrap.prototype, "objects", {
        set: function (objects) {
            this._objects = objects;
        },
        enumerable: false,
        configurable: true
    });
    MapWrap.prototype.clear = function () {
        this._objects = cc.js.createMap(true);
        this._size = 0;
    };
    MapWrap.prototype.has = function (key) {
        return key in this._objects;
    };
    MapWrap.prototype.set = function (key, value) {
        if (!this.has(key)) {
            this._size++;
        }
        this._objects[key] = value;
    };
    MapWrap.prototype.get = function (key) {
        if (!this.has(key))
            return null;
        return this._objects[key];
    };
    MapWrap.prototype.delete = function (key) {
        if (this.has(key)) {
            delete this._objects[key];
            this._size--;
        }
    };
    MapWrap.prototype.keys = function () {
        var keys = Object.keys(this._objects);
        return keys;
    };
    MapWrap.prototype.values = function () {
        var _this = this;
        var keys = this.keys();
        var values = [];
        keys.forEach(function (key) {
            values.push(_this.get(key));
        });
        return values;
    };
    MapWrap.prototype.toArray = function (isNumberKey) {
        var _this = this;
        var rets = [];
        var keys = this.keys();
        keys.forEach(function (key) {
            rets.push([!isNumberKey ? key : parseInt(key), _this.get(key)]);
        });
        return rets;
    };
    MapWrap.prototype.forEach = function (callBack) {
        var keys = this.keys();
        for (var i = 0; i < keys.length; i++) {
            var result = callBack(this._objects[keys[i]], keys[i]);
            if (!!result)
                return result;
        }
    };
    MapWrap.prototype.rforEach = function (callBack) {
        var keys = this.keys();
        for (var i = keys.length - 1; i >= 0; i--) {
            var result = callBack(this._objects[keys[i]], keys[i]);
            if (!!result)
                return result;
        }
    };
    return MapWrap;
}(ObjectWrap));
exports.MapWrap = MapWrap;
var SetWrap = /** @class */ (function (_super) {
    __extends(SetWrap, _super);
    function SetWrap() {
        var _this = _super.call(this) || this;
        _this.sets = new Array();
        return _this;
    }
    Object.defineProperty(SetWrap.prototype, "size", {
        get: function () {
            return this.sets.length;
        },
        enumerable: false,
        configurable: true
    });
    SetWrap.prototype.has = function (key) {
        return this.sets.indexOf(key) > -1;
    };
    SetWrap.prototype.add = function (key) {
        if (this.has(key))
            return;
        this.sets.push(key);
    };
    SetWrap.prototype.delete = function (keyOrValue) {
        var index = this.sets.indexOf(keyOrValue);
        if (index != -1) {
            this.sets.splice(index, 1);
        }
    };
    SetWrap.prototype.clear = function () {
        this.sets.length = 0;
    };
    SetWrap.prototype.toArray = function () {
        return this.sets;
    };
    return SetWrap;
}(ObjectWrap));
exports.SetWrap = SetWrap;
function NewFillArray(len, fill) {
    var ret = [];
    for (var i = 0; i < len; i++) {
        ret.push(fill == null ? 0 : fill);
    }
    return ret;
}
exports.NewFillArray = NewFillArray;
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
function ObjectWrapArray() {
    var array = new Array();
    array["prototype"].indexOf = function (elem, fromi) {
        fromi = fromi || 0; //默认值
        //this->将来调用indexOf的.前的子对象
        var arr = this;
        for (var i = fromi; i < arr.length; i++) {
            if (arr[i].wrapId === elem.wrapId)
                return i;
        }
        return -1;
    };
    return array;
}
exports.ObjectWrapArray = ObjectWrapArray;

cc._RF.pop();