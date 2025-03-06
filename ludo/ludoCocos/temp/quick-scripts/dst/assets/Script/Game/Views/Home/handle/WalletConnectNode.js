
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/handle/WalletConnectNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df7aaNkkwRNuojvpuAHRYVx', 'WalletConnectNode');
// Script/Game/Views/Home/handle/WalletConnectNode.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccountMgr_1 = require("../../../Logic/AccountMgr");
var ccclass = cc._decorator.ccclass;
var WalletConnectNode = /** @class */ (function (_super) {
    __extends(WalletConnectNode, _super);
    function WalletConnectNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WalletConnectNode.prototype.onLoad = function () {
        var button = this.getComponent(cc.Button);
        if (button) {
            button.node.on("click", this.onConnectWallet, this);
        }
    };
    WalletConnectNode.prototype.onConnectWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    AccountMgr_1.default.ins.setAccountInfo({
                        address: "0x72C408107E45984ffb931381770F501C55aA11A8",
                        avatar: "",
                        nickName: "xxxxx",
                        pointBalance: "xxx",
                    });
                    this.node.active = false;
                }
                catch (error) {
                    console.error("Wallet connect failed:", error);
                }
                return [2 /*return*/];
            });
        });
    };
    WalletConnectNode.prototype.onDestroy = function () {
        var button = this.getComponent(cc.Button);
        if (button) {
            button.node.off("click", this.onConnectWallet, this);
        }
    };
    WalletConnectNode = __decorate([
        ccclass
    ], WalletConnectNode);
    return WalletConnectNode;
}(cc.Component));
exports.default = WalletConnectNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL2hhbmRsZS9XYWxsZXRDb25uZWN0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFDM0MsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBK0MscUNBQVk7SUFBM0Q7O0lBMEJBLENBQUM7SUF6Qlcsa0NBQU0sR0FBaEI7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUNhLDJDQUFlLEdBQTdCOzs7Z0JBQ0UsSUFBSTtvQkFDRixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7d0JBQzVCLE9BQU8sRUFBRSw0Q0FBNEM7d0JBQ3JELE1BQU0sRUFBRSxFQUFFO3dCQUNWLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixZQUFZLEVBQUUsS0FBSztxQkFDcEIsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDMUI7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDaEQ7Ozs7S0FDRjtJQUNTLHFDQUFTLEdBQW5CO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUF6QmtCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBMEJyQztJQUFELHdCQUFDO0NBMUJELEFBMEJDLENBMUI4QyxFQUFFLENBQUMsU0FBUyxHQTBCMUQ7a0JBMUJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWNjb3VudE1nciBmcm9tIFwiLi4vLi4vLi4vTG9naWMvQWNjb3VudE1nclwiO1xuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldENvbm5lY3ROb2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNvbm5lY3RXYWxsZXQsIHRoaXMpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGFzeW5jIG9uQ29ubmVjdFdhbGxldCgpIHtcbiAgICB0cnkge1xuICAgICAgQWNjb3VudE1nci5pbnMuc2V0QWNjb3VudEluZm8oe1xuICAgICAgICBhZGRyZXNzOiBcIjB4NzJDNDA4MTA3RTQ1OTg0ZmZiOTMxMzgxNzcwRjUwMUM1NWFBMTFBOFwiLFxuICAgICAgICBhdmF0YXI6IFwiXCIsXG4gICAgICAgIG5pY2tOYW1lOiBcInh4eHh4XCIsXG4gICAgICAgIHBvaW50QmFsYW5jZTogXCJ4eHhcIixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2FsbGV0IGNvbm5lY3QgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24ubm9kZS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uQ29ubmVjdFdhbGxldCwgdGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=