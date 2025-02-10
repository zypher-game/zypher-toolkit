
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/ES5Ex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0VTNUV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUdFO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLDBCQUFLLEdBQVosVUFBYSxDQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFSZ0IscUJBQVUsR0FBVyxDQUFDLENBQUM7SUFTMUMsaUJBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSxnQ0FBVTtBQVl2QjtJQUEwRCwyQkFBVTtJQUlsRSxpQkFBWSxLQUFxQjtRQUFqQyxZQUNFLGlCQUFPLFNBUVI7UUFYUyxXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNGOztJQUNILENBQUM7SUFFRCxzQkFBVyx5QkFBSTthQVFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7YUFWRCxVQUFnQixJQUFJO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lB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LE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFkRCw0QkFjQztBQUVELFNBQWdCLGVBQWU7SUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUssQ0FBQztJQUMzQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxHQUFHLFVBQVUsSUFBSSxFQUFFLEtBQUs7UUFDaEQsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ3pCLDBCQUEwQjtRQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBWkQsMENBWUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpbmdPck51bWJlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFdyYXAge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgU0dlbldyYXBJZDogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgd3JhcElkOiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLndyYXBJZCA9IE9iamVjdFdyYXAuU0dlbldyYXBJZCsrO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVxdWFsKGI6IE9iamVjdFdyYXApIHtcclxuICAgIHJldHVybiB0aGlzLndyYXBJZCA9PSBiLndyYXBJZDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXBXcmFwPEsgZXh0ZW5kcyBTdHJpbmdPck51bWJlciwgVj4gZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICBwcm90ZWN0ZWQgX29iamVjdHM7XHJcbiAgcHJvdGVjdGVkIF9zaXplID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IoYXJyYXk/OiBBcnJheTxbSywgVl0+KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fb2JqZWN0cyA9IGNjLmpzLmNyZWF0ZU1hcCh0cnVlKTtcclxuICAgIHRoaXMuX3NpemUgPSAwO1xyXG4gICAgaWYgKGFycmF5KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLnNldChhcnJheVtpXVswXSwgYXJyYXlbaV1bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5fc2l6ZSA9IHNpemU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IG9iamVjdHMob2JqZWN0cykge1xyXG4gICAgdGhpcy5fb2JqZWN0cyA9IG9iamVjdHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fb2JqZWN0cyA9IGNjLmpzLmNyZWF0ZU1hcCh0cnVlKTtcclxuICAgIHRoaXMuX3NpemUgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhcyhrZXk6IEspOiBib29sZWFuIHtcclxuICAgIHJldHVybiAoa2V5IGFzIGFueSkgaW4gdGhpcy5fb2JqZWN0cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XHJcbiAgICAgIHRoaXMuX3NpemUrKztcclxuICAgIH1cclxuICAgIHRoaXMuX29iamVjdHNba2V5XSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldChrZXk6IEspOiBWIHtcclxuICAgIGlmICghdGhpcy5oYXMoa2V5KSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0c1trZXldO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZShrZXk6IEspOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9vYmplY3RzW2tleV07XHJcbiAgICAgIHRoaXMuX3NpemUtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBrZXlzKCk6IEtbXSB7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX29iamVjdHMpO1xyXG4gICAgcmV0dXJuIGtleXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbHVlczxWPigpOiBWW10ge1xyXG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcclxuICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMuZ2V0KGtleSkpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvQXJyYXkoaXNOdW1iZXJLZXk/OiBib29sZWFuKTogQXJyYXk8W0ssIFZdPiB7XHJcbiAgICBsZXQgcmV0cyA9IFtdO1xyXG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcclxuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIHJldHMucHVzaChbIWlzTnVtYmVyS2V5ID8ga2V5IDogcGFyc2VJbnQoa2V5IGFzIGFueSksIHRoaXMuZ2V0KGtleSldKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJldHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9yRWFjaDxUPihjYWxsQmFjazogeyAodmFsdWU6IFYsIGtleTogSyk6IFQgfSk6IFQge1xyXG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gY2FsbEJhY2sodGhpcy5fb2JqZWN0c1trZXlzW2ldXSwga2V5c1tpXSk7XHJcbiAgICAgIGlmICghIXJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZm9yRWFjaDxUPihjYWxsQmFjazogeyAodmFsdWU6IFYsIGtleTogSyk6IFQgfSk6IFQge1xyXG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcclxuICAgIGZvciAobGV0IGkgPSBrZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBjYWxsQmFjayh0aGlzLl9vYmplY3RzW2tleXNbaV1dLCBrZXlzW2ldKTtcclxuICAgICAgaWYgKCEhcmVzdWx0KSByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNldFdyYXA8SyBleHRlbmRzIFN0cmluZ09yTnVtYmVyPiBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIHByb3RlY3RlZCBzZXRzOiBBcnJheTxLPjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zZXRzID0gbmV3IEFycmF5PEs+KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnNldHMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhcyhrZXk6IEspOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNldHMuaW5kZXhPZihrZXkpID4gLTE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGtleTogSykge1xyXG4gICAgaWYgKHRoaXMuaGFzKGtleSkpIHJldHVybjtcclxuICAgIHRoaXMuc2V0cy5wdXNoKGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVsZXRlKGtleU9yVmFsdWU6IEspIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuc2V0cy5pbmRleE9mKGtleU9yVmFsdWUpO1xyXG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgIHRoaXMuc2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgdGhpcy5zZXRzLmxlbmd0aCA9IDA7XHJcbiAgfVxyXG5cclxuICB0b0FycmF5KCk6IEFycmF5PEs+IHtcclxuICAgIHJldHVybiB0aGlzLnNldHM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTmV3RmlsbEFycmF5PFQ+KGxlbjogbnVtYmVyLCBmaWxsPzogVCk6IEFycmF5PFQ+IHtcclxuICBsZXQgcmV0ID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgcmV0LnB1c2goZmlsbCA9PSBudWxsID8gMCA6IGZpbGwpO1xyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYzogYW55LCB3YWl0OiBudW1iZXIsIGltbWVkaWF0ZT86IGJvb2xlYW4pIHtcclxuICB2YXIgdGltZW91dDtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gT2JqZWN0V3JhcEFycmF5PFQgZXh0ZW5kcyBPYmplY3RXcmFwPigpOiBUW10ge1xyXG4gIGxldCBhcnJheSA9IG5ldyBBcnJheTxUPigpO1xyXG4gIGFycmF5W1wicHJvdG90eXBlXCJdLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbSwgZnJvbWkpIHtcclxuICAgIGZyb21pID0gZnJvbWkgfHwgMDsgLy/pu5jorqTlgLxcclxuICAgIC8vdGhpcy0+5bCG5p2l6LCD55SoaW5kZXhPZueahC7liY3nmoTlrZDlr7nosaFcclxuICAgIHZhciBhcnIgPSB0aGlzO1xyXG4gICAgZm9yICh2YXIgaSA9IGZyb21pOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChhcnJbaV0ud3JhcElkID09PSBlbGVtLndyYXBJZCkgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gYXJyYXk7XHJcbn1cclxuIl19