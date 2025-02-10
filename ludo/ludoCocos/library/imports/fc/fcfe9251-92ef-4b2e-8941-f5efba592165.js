"use strict";
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