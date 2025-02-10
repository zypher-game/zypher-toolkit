
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/GLongTouch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fab2fjeTVVEF4gggiW0Uzb/', 'GLongTouch');
// Script/Core/FrameEx/GLongTouch.ts

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
var AudioMgr_1 = require("../Manager/AudioMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, inspector = _a.inspector;
var GLongTouch = /** @class */ (function (_super) {
    __extends(GLongTouch, _super);
    //@inspector('packages://inspector/inspectors/comps/button.js')
    function GLongTouch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.longTouchEvents = [];
        _this.longTouchInterval = 0.5;
        _this._intervalAct = 0; //加速度
        _this._intervalActMax = 0; //速度最大值
        _this._delta = 0;
        _this._hoverTime = 0; //按住时间
        _this._beginTimes = 1; //长按x秒后进行事件
        _this.originalInterval = 0.5;
        _this._canLongTouchCb = function (isBegin) {
            return 0;
        };
        _this._endTouchCb = function () {
            return 0;
        };
        return _this;
    }
    GLongTouch_1 = GLongTouch;
    Object.defineProperty(GLongTouch.prototype, "canLongTouchCb", {
        get: function () {
            return this._canLongTouchCb;
        },
        set: function (cb) {
            this._canLongTouchCb = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "intervalAct", {
        set: function (act) {
            this._intervalAct = act;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "endTouchCb", {
        set: function (cb) {
            this._endTouchCb = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "intervalActMax", {
        set: function (act) {
            this._intervalActMax = act;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "hoverTime", {
        set: function (time) {
            this._hoverTime = time;
        },
        enumerable: false,
        configurable: true
    });
    GLongTouch.prototype.onLoad = function () {
        // if (this.clickEvents.length != 0) {
        //     this.longTouchEvents = this.clickEvents;
        //     this.clickEvents = [];
        // }
        this.originalInterval = this.longTouchInterval;
    };
    GLongTouch.prototype._onTouchBegan = function (event) {
        if (!this.interactable || !this.enabledInHierarchy)
            return;
        this["_pressed"] = true;
        this["_updateState"]();
        if (this._canLongTouchCb) {
            var state = this._canLongTouchCb(true);
            if (state > GLongTouch_1.ContinuteState.Normal) {
                if (state == GLongTouch_1.ContinuteState.Cancel) {
                    this["_pressed"] = false;
                    this["_updateState"]();
                    this.hoverTime = 0;
                    this.longTouchInterval = this.originalInterval;
                }
                event.stopPropagation();
                return;
            }
        }
        this.emitLongTouchEvent();
        event.stopPropagation();
    };
    GLongTouch.prototype._onTouchEnded = function (event) {
        if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        _super.prototype._onTouchEnded.call(this, event);
        this.hoverTime = 0;
        this.longTouchInterval = this.originalInterval;
        if (this._endTouchCb)
            this._endTouchCb();
    };
    GLongTouch.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        // long touch event deal:
        if (!this["_pressed"])
            return;
        if (this._intervalAct) {
            if (this.longTouchInterval == this._intervalActMax) {
                this.longTouchInterval = this._intervalActMax;
            }
            else {
                this.longTouchInterval -= this._intervalAct;
            }
        }
        if (this._beginTimes) {
            this._hoverTime += dt;
            if (this._hoverTime < this._beginTimes) {
                return;
            }
        }
        if (this._delta < this.longTouchInterval) {
            this._delta += dt;
            return;
        }
        if (this._canLongTouchCb) {
            var state = this._canLongTouchCb(false);
            if (state > GLongTouch_1.ContinuteState.Normal) {
                if (state == GLongTouch_1.ContinuteState.Cancel) {
                    this["_pressed"] = false;
                    this["_updateState"]();
                    this.hoverTime = 0;
                    this.longTouchInterval = this.originalInterval;
                    if (this._endTouchCb)
                        this._endTouchCb();
                }
                return;
            }
        }
        this._delta = 0;
        this.emitLongTouchEvent();
    };
    GLongTouch.prototype.emitLongTouchEvent = function () {
        var custom = new cc.Event.EventCustom("touching", true);
        custom.setUserData(this.node);
        if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        cc.Component.EventHandler.emitEvents(this.longTouchEvents, custom);
    };
    var GLongTouch_1;
    GLongTouch.ContinuteState = {
        /** 无状态 */
        Null: 0,
        /** 正常状态 */
        Normal: 1,
        /** 等待状态 */
        Wait: 2,
        /** 取消状态 */
        Cancel: 3,
    };
    __decorate([
        property([cc.Component.EventHandler])
    ], GLongTouch.prototype, "longTouchEvents", void 0);
    __decorate([
        property
    ], GLongTouch.prototype, "longTouchInterval", void 0);
    GLongTouch = GLongTouch_1 = __decorate([
        ccclass,
        menu("FrameEx/GLongTouch")
        //@inspector('packages://inspector/inspectors/comps/button.js')
    ], GLongTouch);
    return GLongTouch;
}(cc.Button));
exports.default = GLongTouch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0dMb25nVG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBRXpDLElBQUEsS0FBeUMsRUFBRSxDQUFDLFVBQVUsRUFBcEQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsU0FBUyxlQUFrQixDQUFDO0FBSTdEO0lBQXdDLDhCQUFTO0lBRGpELCtEQUErRDtJQUMvRDtRQUFBLHFFQWdKQztRQW5JQyxxQkFBZSxHQUFnQyxFQUFFLENBQUM7UUFDeEMsdUJBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRWhDLGtCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSztRQUN2QixxQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDNUIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDOUIsaUJBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO1FBQzVCLHNCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV2QixxQkFBZSxHQUFHLFVBQUMsT0FBZ0I7WUFDM0MsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7UUFFUSxpQkFBVyxHQUFHO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDOztJQW1ISixDQUFDO21CQWhKb0IsVUFBVTtJQStCN0Isc0JBQVcsc0NBQWM7YUFJekI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQU5ELFVBQTBCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyxtQ0FBVzthQUF0QixVQUF1QixHQUFXO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsa0NBQVU7YUFBckIsVUFBc0IsRUFBRTtZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFjO2FBQXpCLFVBQTBCLEdBQVc7WUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpQ0FBUzthQUFwQixVQUFxQixJQUFZO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsMkJBQU0sR0FBTjtRQUNFLHNDQUFzQztRQUN0QywrQ0FBK0M7UUFDL0MsNkJBQTZCO1FBQzdCLElBQUk7UUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2pELENBQUM7SUFFUyxrQ0FBYSxHQUF2QixVQUF3QixLQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtZQUFFLE9BQU87UUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLEtBQUssR0FBRyxZQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDNUMsSUFBSSxLQUFLLElBQUksWUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDaEQ7Z0JBQ0QsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixPQUFPO2FBQ1I7U0FDRjtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsa0NBQWEsR0FBYixVQUFjLEtBQUs7UUFDakIsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN0QixtQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsaUJBQU0sYUFBYSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsV0FBVztZQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEVBQUU7UUFDUCxpQkFBTSxNQUFNLFlBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQUUsT0FBTztRQUU5QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDN0M7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDdEMsT0FBTzthQUNSO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLElBQUksS0FBSyxHQUFHLFlBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssSUFBSSxZQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtvQkFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO29CQUMvQyxJQUFJLElBQUksQ0FBQyxXQUFXO3dCQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDMUM7Z0JBQ0QsT0FBTzthQUNSO1NBQ0Y7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRVMsdUNBQWtCLEdBQTVCO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN0QixtQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7SUE5SWEseUJBQWMsR0FBRztRQUM3QixVQUFVO1FBQ1YsSUFBSSxFQUFFLENBQUM7UUFDUCxXQUFXO1FBQ1gsTUFBTSxFQUFFLENBQUM7UUFDVCxXQUFXO1FBQ1gsSUFBSSxFQUFFLENBQUM7UUFDUCxXQUFXO1FBQ1gsTUFBTSxFQUFFLENBQUM7S0FDVixDQUFDO0lBR0Y7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO3VEQUNZO0lBQ3hDO1FBQVQsUUFBUTt5REFBaUM7SUFkdkIsVUFBVTtRQUg5QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQzNCLCtEQUErRDtPQUMxQyxVQUFVLENBZ0o5QjtJQUFELGlCQUFDO0NBaEpELEFBZ0pDLENBaEp1QyxFQUFFLENBQUMsTUFBTSxHQWdKaEQ7a0JBaEpvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiLi4vTWFuYWdlci9BdWRpb01nclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgaW5zcGVjdG9yIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvR0xvbmdUb3VjaFwiKVxyXG4vL0BpbnNwZWN0b3IoJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvYnV0dG9uLmpzJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0xvbmdUb3VjaCBleHRlbmRzIGNjLkJ1dHRvbiB7XHJcbiAgcHVibGljIHN0YXRpYyBDb250aW51dGVTdGF0ZSA9IHtcclxuICAgIC8qKiDml6DnirbmgIEgKi9cclxuICAgIE51bGw6IDAsXHJcbiAgICAvKiog5q2j5bi454q25oCBICovXHJcbiAgICBOb3JtYWw6IDEsXHJcbiAgICAvKiog562J5b6F54q25oCBICovXHJcbiAgICBXYWl0OiAyLFxyXG4gICAgLyoqIOWPlua2iOeKtuaAgSAqL1xyXG4gICAgQ2FuY2VsOiAzLFxyXG4gIH07XHJcblxyXG4gIEBwcm9wZXJ0eShbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0pXHJcbiAgbG9uZ1RvdWNoRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcclxuICBAcHJvcGVydHkgbG9uZ1RvdWNoSW50ZXJ2YWw6IG51bWJlciA9IDAuNTtcclxuICBwcm90ZWN0ZWQgXztcclxuICBwcm90ZWN0ZWQgX2ludGVydmFsQWN0ID0gMDsgLy/liqDpgJ/luqZcclxuICBwcm90ZWN0ZWQgX2ludGVydmFsQWN0TWF4ID0gMDsgLy/pgJ/luqbmnIDlpKflgLxcclxuICBwcm90ZWN0ZWQgX2RlbHRhOiBudW1iZXIgPSAwO1xyXG4gIHByb3RlY3RlZCBfaG92ZXJUaW1lOiBudW1iZXIgPSAwOyAvL+aMieS9j+aXtumXtFxyXG4gIHByb3RlY3RlZCBfYmVnaW5UaW1lcyA9IDE7IC8v6ZW/5oyJeOenkuWQjui/m+ihjOS6i+S7tlxyXG4gIHByb3RlY3RlZCBvcmlnaW5hbEludGVydmFsID0gMC41O1xyXG5cclxuICBwcm90ZWN0ZWQgX2NhbkxvbmdUb3VjaENiID0gKGlzQmVnaW46IGJvb2xlYW4pID0+IHtcclxuICAgIHJldHVybiAwO1xyXG4gIH07XHJcblxyXG4gIHByb3RlY3RlZCBfZW5kVG91Y2hDYiA9ICgpID0+IHtcclxuICAgIHJldHVybiAwO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzZXQgY2FuTG9uZ1RvdWNoQ2IoY2IpIHtcclxuICAgIHRoaXMuX2NhbkxvbmdUb3VjaENiID0gY2I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNhbkxvbmdUb3VjaENiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbkxvbmdUb3VjaENiO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBpbnRlcnZhbEFjdChhY3Q6IG51bWJlcikge1xyXG4gICAgdGhpcy5faW50ZXJ2YWxBY3QgPSBhY3Q7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGVuZFRvdWNoQ2IoY2IpIHtcclxuICAgIHRoaXMuX2VuZFRvdWNoQ2IgPSBjYjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaW50ZXJ2YWxBY3RNYXgoYWN0OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2ludGVydmFsQWN0TWF4ID0gYWN0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBob3ZlclRpbWUodGltZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9ob3ZlclRpbWUgPSB0aW1lO1xyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gaWYgKHRoaXMuY2xpY2tFdmVudHMubGVuZ3RoICE9IDApIHtcclxuICAgIC8vICAgICB0aGlzLmxvbmdUb3VjaEV2ZW50cyA9IHRoaXMuY2xpY2tFdmVudHM7XHJcbiAgICAvLyAgICAgdGhpcy5jbGlja0V2ZW50cyA9IFtdO1xyXG4gICAgLy8gfVxyXG4gICAgdGhpcy5vcmlnaW5hbEludGVydmFsID0gdGhpcy5sb25nVG91Y2hJbnRlcnZhbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfb25Ub3VjaEJlZ2FuKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaW50ZXJhY3RhYmxlIHx8ICF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG4gICAgdGhpc1tcIl9wcmVzc2VkXCJdID0gdHJ1ZTtcclxuICAgIHRoaXNbXCJfdXBkYXRlU3RhdGVcIl0oKTtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FuTG9uZ1RvdWNoQ2IpIHtcclxuICAgICAgbGV0IHN0YXRlID0gdGhpcy5fY2FuTG9uZ1RvdWNoQ2IodHJ1ZSk7XHJcbiAgICAgIGlmIChzdGF0ZSA+IEdMb25nVG91Y2guQ29udGludXRlU3RhdGUuTm9ybWFsKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09IEdMb25nVG91Y2guQ29udGludXRlU3RhdGUuQ2FuY2VsKSB7XHJcbiAgICAgICAgICB0aGlzW1wiX3ByZXNzZWRcIl0gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXNbXCJfdXBkYXRlU3RhdGVcIl0oKTtcclxuICAgICAgICAgIHRoaXMuaG92ZXJUaW1lID0gMDtcclxuICAgICAgICAgIHRoaXMubG9uZ1RvdWNoSW50ZXJ2YWwgPSB0aGlzLm9yaWdpbmFsSW50ZXJ2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0TG9uZ1RvdWNoRXZlbnQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgX29uVG91Y2hFbmRlZChldmVudCkge1xyXG4gICAgaWYgKGNjLkJ1dHRvbi5jb21BdWRpbykge1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KGNjLkJ1dHRvbi5jb21BdWRpbyk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5fb25Ub3VjaEVuZGVkKGV2ZW50KTtcclxuICAgIHRoaXMuaG92ZXJUaW1lID0gMDtcclxuICAgIHRoaXMubG9uZ1RvdWNoSW50ZXJ2YWwgPSB0aGlzLm9yaWdpbmFsSW50ZXJ2YWw7XHJcbiAgICBpZiAodGhpcy5fZW5kVG91Y2hDYikgdGhpcy5fZW5kVG91Y2hDYigpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgLy8gbG9uZyB0b3VjaCBldmVudCBkZWFsOlxyXG4gICAgaWYgKCF0aGlzW1wiX3ByZXNzZWRcIl0pIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5faW50ZXJ2YWxBY3QpIHtcclxuICAgICAgaWYgKHRoaXMubG9uZ1RvdWNoSW50ZXJ2YWwgPT0gdGhpcy5faW50ZXJ2YWxBY3RNYXgpIHtcclxuICAgICAgICB0aGlzLmxvbmdUb3VjaEludGVydmFsID0gdGhpcy5faW50ZXJ2YWxBY3RNYXg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb25nVG91Y2hJbnRlcnZhbCAtPSB0aGlzLl9pbnRlcnZhbEFjdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2JlZ2luVGltZXMpIHtcclxuICAgICAgdGhpcy5faG92ZXJUaW1lICs9IGR0O1xyXG4gICAgICBpZiAodGhpcy5faG92ZXJUaW1lIDwgdGhpcy5fYmVnaW5UaW1lcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2RlbHRhIDwgdGhpcy5sb25nVG91Y2hJbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLl9kZWx0YSArPSBkdDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jYW5Mb25nVG91Y2hDYikge1xyXG4gICAgICBsZXQgc3RhdGUgPSB0aGlzLl9jYW5Mb25nVG91Y2hDYihmYWxzZSk7XHJcbiAgICAgIGlmIChzdGF0ZSA+IEdMb25nVG91Y2guQ29udGludXRlU3RhdGUuTm9ybWFsKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09IEdMb25nVG91Y2guQ29udGludXRlU3RhdGUuQ2FuY2VsKSB7XHJcbiAgICAgICAgICB0aGlzW1wiX3ByZXNzZWRcIl0gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXNbXCJfdXBkYXRlU3RhdGVcIl0oKTtcclxuICAgICAgICAgIHRoaXMuaG92ZXJUaW1lID0gMDtcclxuICAgICAgICAgIHRoaXMubG9uZ1RvdWNoSW50ZXJ2YWwgPSB0aGlzLm9yaWdpbmFsSW50ZXJ2YWw7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZW5kVG91Y2hDYikgdGhpcy5fZW5kVG91Y2hDYigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcbiAgICB0aGlzLmVtaXRMb25nVG91Y2hFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGVtaXRMb25nVG91Y2hFdmVudCgpIHtcclxuICAgIGxldCBjdXN0b20gPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJ0b3VjaGluZ1wiLCB0cnVlKTtcclxuICAgIGN1c3RvbS5zZXRVc2VyRGF0YSh0aGlzLm5vZGUpO1xyXG4gICAgaWYgKGNjLkJ1dHRvbi5jb21BdWRpbykge1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KGNjLkJ1dHRvbi5jb21BdWRpbyk7XHJcbiAgICB9XHJcbiAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5sb25nVG91Y2hFdmVudHMsIGN1c3RvbSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==