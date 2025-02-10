
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/MapMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fcfe9JRku9LLolB9e+6WSFl', 'MapMgr');
// Script/Game/Logic/MapMgr.ts

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
var CoreDefine_1 = require("./../../Core/CoreDefine");
var ES5Ex_1 = require("./../../Core/FrameEx/ES5Ex");
var AddState;
(function (AddState) {
    AddState[AddState["Add"] = 0] = "Add";
    AddState[AddState["Del"] = 1] = "Del";
    AddState[AddState["Noc"] = 2] = "Noc";
})(AddState || (AddState = {}));
var DirNum = {
    top: [2, 3, 4],
    bottom: [8, 7, 6],
    left: [2, 1, 8],
    right: [4, 5, 6],
};
var MapMgr = /** @class */ (function (_super) {
    __extends(MapMgr, _super);
    function MapMgr() {
        var _this = _super.call(this) || this;
        _this._fsMapPatser = null;
        _this._mapId = CoreDefine_1.INVALID_VALUE;
        return _this;
    }
    Object.defineProperty(MapMgr, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new MapMgr();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapMgr.prototype, "mapId", {
        get: function () {
            return this._mapId;
        },
        set: function (id) {
            this._mapId = id;
        },
        enumerable: false,
        configurable: true
    });
    MapMgr.prototype.getAround = function (pos) {
        var points = [];
        points.push(cc.v2(pos.x - 1, pos.y));
        points.push(cc.v2(pos.x + 1, pos.y));
        points.push(cc.v2(pos.x, pos.y + 1));
        points.push(cc.v2(pos.x - 1, pos.y - 1));
        points.push(pos);
        return points;
    };
    MapMgr.prototype.encodeXxyy = function (pos) {
        return pos.x * 100 + pos.y;
    };
    MapMgr.prototype.decodeXxyy = function (xxyy) {
        var x = (xxyy / 100) | 0;
        var y = xxyy % 100;
        return cc.v2(x, y);
    };
    return MapMgr;
}(ES5Ex_1.ObjectWrap));
exports.default = MapMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9NYXBNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXdEO0FBQ3hELG9EQUF3RDtBQUd4RCxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDWCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7QUFDTCxDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQUVELElBQU0sTUFBTSxHQUFHO0lBQ2IsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNmLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2pCLENBQUM7QUFDRjtJQUFvQywwQkFBVTtJQVM1QztRQUFBLFlBQ0UsaUJBQU8sU0FDUjtRQUVNLGtCQUFZLEdBQWlCLElBQUksQ0FBQztRQUNqQyxZQUFNLEdBQVcsMEJBQWEsQ0FBQzs7SUFIdkMsQ0FBQztJQVRELHNCQUFrQixhQUFHO2FBQXJCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBU0Qsc0JBQVcseUJBQUs7YUFJaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQU5ELFVBQWlCLEVBQVU7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFNTSwwQkFBUyxHQUFoQixVQUFpQixHQUFZO1FBQzNCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLDJCQUFVLEdBQWpCLFVBQWtCLEdBQVk7UUFDNUIsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSwyQkFBVSxHQUFqQixVQUFrQixJQUFZO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ25CLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNILGFBQUM7QUFBRCxDQTNDQSxBQTJDQyxDQTNDbUMsa0JBQVUsR0EyQzdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnRsTWFwUGFyc2VyIH0gZnJvbSBcIi4uL1ZpZXdzL0ZpZ2h0L0J0bE1hcFBhcnNlclwiO1xyXG5pbXBvcnQgeyBJTlZBTElEX1ZBTFVFIH0gZnJvbSBcIi4vLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IE9iamVjdFdyYXAgfSBmcm9tIFwiLi8uLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IE1hc2tVdGlsID0gcmVxdWlyZShcIi4uLy4uL0NvcmUvTWFuYWdlci9NYXNrVXRpbFwiKTtcclxuXHJcbmVudW0gQWRkU3RhdGUge1xyXG4gIEFkZCxcclxuICBEZWwsXHJcbiAgTm9jLFxyXG59XHJcblxyXG5jb25zdCBEaXJOdW0gPSB7XHJcbiAgdG9wOiBbMiwgMywgNF0sXHJcbiAgYm90dG9tOiBbOCwgNywgNl0sXHJcbiAgbGVmdDogWzIsIDEsIDhdLFxyXG4gIHJpZ2h0OiBbNCwgNSwgNl0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcE1nciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2luczogTWFwTWdyO1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpOiBNYXBNZ3Ige1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IE1hcE1ncigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lucztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBfZnNNYXBQYXRzZXI6IEJ0bE1hcFBhcnNlciA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfbWFwSWQ6IG51bWJlciA9IElOVkFMSURfVkFMVUU7XHJcblxyXG4gIHB1YmxpYyBzZXQgbWFwSWQoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbWFwSWQgPSBpZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWFwSWQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXBJZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRBcm91bmQocG9zOiBjYy5WZWMyKSB7XHJcbiAgICBsZXQgcG9pbnRzID0gW107XHJcbiAgICBwb2ludHMucHVzaChjYy52Mihwb3MueCAtIDEsIHBvcy55KSk7XHJcbiAgICBwb2ludHMucHVzaChjYy52Mihwb3MueCArIDEsIHBvcy55KSk7XHJcbiAgICBwb2ludHMucHVzaChjYy52Mihwb3MueCwgcG9zLnkgKyAxKSk7XHJcbiAgICBwb2ludHMucHVzaChjYy52Mihwb3MueCAtIDEsIHBvcy55IC0gMSkpO1xyXG4gICAgcG9pbnRzLnB1c2gocG9zKTtcclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW5jb2RlWHh5eShwb3M6IGNjLlZlYzIpIHtcclxuICAgIHJldHVybiBwb3MueCAqIDEwMCArIHBvcy55O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlY29kZVh4eXkoeHh5eTogbnVtYmVyKTogY2MuVmVjMiB7XHJcbiAgICBsZXQgeCA9ICh4eHl5IC8gMTAwKSB8IDA7XHJcbiAgICBsZXQgeSA9IHh4eXkgJSAxMDA7XHJcbiAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==