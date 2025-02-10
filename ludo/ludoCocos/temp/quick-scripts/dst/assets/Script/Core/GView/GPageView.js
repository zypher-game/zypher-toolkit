
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GPageView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df43eZyjpBONbdmTEcR+dQG', 'GPageView');
// Script/Core/GView/GPageView.ts

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
var CoreDefine_1 = require("../CoreDefine");
var GViewBase_1 = require("./GViewBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var GPageView = /** @class */ (function (_super) {
    __extends(GPageView, _super);
    function GPageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggles = [];
        _this.pageRoot = null;
        _this.pagePrefabs = [];
        _this.parallelTween = false;
        _this.forceToggleEvent = false;
        _this.unCachePages = [];
        _this.curPage = CoreDefine_1.INVALID_VALUE;
        _this._pages = [];
        _this._inTween = null;
        _this._outTween = null;
        return _this;
    }
    GPageView_1 = GPageView;
    GPageView.prototype.getPage = function (page) {
        return this._pages[page];
    };
    GPageView.prototype.onGLoad = function () {
        this.setStatus();
    };
    GPageView.prototype.setStatus = function () {
        for (var i = 0; i < this.toggles.length; i++) {
            var toggle = this.toggles[i];
            toggle.node.on("toggle", this.onToggleClick, this);
            this.setToggleCanSwitch(toggle, this.isCanSwitch(i, false), i);
            if (this.switchPageAudio) {
                toggle.clickAudio = this.switchPageAudio;
            }
            else if (GPageView_1.comSwitchPageAudio) {
                toggle.clickAudio = GPageView_1.comSwitchPageAudio;
            }
        }
    };
    GPageView.prototype.setToggleCanSwitch = function (toggle, isCanSwitch, nPage) {
        toggle.interactable = isCanSwitch;
    };
    GPageView.prototype.onGStart = function (page) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        page = page || CoreDefine_1.WinPage.Page0;
        if (page >= this.toggles.length) {
            cc.warn("the page index is max of toggles.length, set the page = 0");
            page = CoreDefine_1.WinPage.Page0;
        }
        var toggle = this.toggles[page];
        if (toggle.isChecked) {
            this.onToggleClick(toggle);
        }
        else {
            toggle.isChecked = true;
            this.onToggleClick(toggle);
        }
    };
    GPageView.prototype.checkReGStart = function () {
        return true;
    };
    GPageView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.stopTween();
        for (var i = 0; i < this._pages.length; i++) {
            var pPage = this._pages[i];
            if (!pPage)
                continue;
            if (pPage.node && !pPage.node.parent) {
                pPage.node.destroy();
            }
            else {
                pPage.isValid && pPage.destroy();
            }
        }
        this._pages.length = 0;
    };
    GPageView.prototype.onToggleClick = function (toggle) {
        var index = this.toggles.indexOf(toggle);
        if (index == CoreDefine_1.INVALID_VALUE) {
            cc.error("the toggle component is not exist.");
            return;
        }
        if (!this.isCanSwitch(index, true)) {
            if (this.curPage != CoreDefine_1.INVALID_VALUE) {
                this.toggles[this.curPage].noEventCheck(true);
                this.toggles[index].noEventCheck(false);
                return;
            }
        }
        var oldPage = this.curPage;
        this.curPage = index;
        if (oldPage == this.curPage)
            return;
        this.onSwitch(oldPage, index);
        if (oldPage != CoreDefine_1.INVALID_VALUE) {
            this.onUnSelected(oldPage);
        }
        this.onSelected(index);
    };
    /** 选中分页 */
    GPageView.prototype.onSelected = function (nPage) { };
    /** 分页被取消 */
    GPageView.prototype.onUnSelected = function (nPage) { };
    GPageView.prototype.isCanSwitch = function (nPage, isCanToast) {
        if (isCanToast === void 0) { isCanToast = true; }
        return true;
    };
    GPageView.prototype.onSwitch = function (nOldPage, nNewPage) {
        var _this = this;
        this.stopTween();
        var __newPageLoadCb = function (pPage) {
            if (!pPage.node.parent)
                _this.pageRoot.addChild(pPage.node);
            _this._inTween = _this.inAction(pPage.node, nOldPage, nNewPage);
            if (_this._inTween) {
                _this._inTween
                    .call(function () {
                    _this._inTween = null;
                })
                    .start();
                _this.onPageIned(pPage);
            }
            else {
                _this.onPageIned(pPage);
            }
        };
        var __switchCb = function () {
            var pNewPage = _this._pages[nNewPage];
            if (!pNewPage) {
                if (!_this.pagePrefabs[nNewPage]) {
                    cc.warn("the new Page res is not stteing.");
                    return;
                }
                var pageNode = cc.instantiate(_this.pagePrefabs[nNewPage]);
                var page = pageNode.getComponent("GChild");
                _this._pages[nNewPage] = page;
                _this.onPageLoad(page, nNewPage);
                __newPageLoadCb(page);
            }
            else {
                __newPageLoadCb(pNewPage);
            }
        };
        var __oldPageOut = function (oldPage) {
            _this._outTween = null;
            _this.onPageOuted(oldPage);
            if (_this.unCachePages.indexOf(nOldPage) != CoreDefine_1.INVALID_VALUE) {
                oldPage.node.destroy();
                _this._pages[nOldPage] = null;
            }
            else {
                oldPage.node.removeFromParent(false);
            }
            !_this.parallelTween && __switchCb();
        };
        // 带page组件的统一处理
        var oldPage = this._pages[nOldPage];
        if (oldPage) {
            this._outTween = this.outAction(oldPage.node, nOldPage, nNewPage);
            if (this._outTween) {
                this._outTween.call(function () { return __oldPageOut(oldPage); }).start();
            }
            else {
                __oldPageOut(oldPage);
            }
        }
        else {
            !this.parallelTween && __switchCb();
        }
        this.parallelTween && __switchCb();
    };
    GPageView.prototype.onCoustomSwitch = function (oldPage, newPage) { };
    GPageView.prototype.onPageLoad = function (page, newPage) { };
    GPageView.prototype.onPageIned = function (page) {
        page.onPageIn();
    };
    GPageView.prototype.onPageOuted = function (page) {
        page.onPageOut();
    };
    GPageView.prototype.outAction = function (pageNode, nOldPage, nNewPage) {
        return null;
    };
    GPageView.prototype.inAction = function (pageNode, nOldPage, nNewPage) {
        return null;
    };
    GPageView.prototype.stopTween = function () {
        this._inTween && this._inTween.stop();
        this._outTween && this._outTween.stop();
        this._inTween = null;
        this._outTween = null;
    };
    var GPageView_1;
    __decorate([
        property([cc.Toggle])
    ], GPageView.prototype, "toggles", void 0);
    __decorate([
        property(cc.Node)
    ], GPageView.prototype, "pageRoot", void 0);
    __decorate([
        property([cc.Prefab])
    ], GPageView.prototype, "pagePrefabs", void 0);
    __decorate([
        property(cc.Boolean)
    ], GPageView.prototype, "parallelTween", void 0);
    __decorate([
        property(cc.Boolean)
    ], GPageView.prototype, "forceToggleEvent", void 0);
    __decorate([
        property([cc.Integer])
    ], GPageView.prototype, "unCachePages", void 0);
    GPageView = GPageView_1 = __decorate([
        ccclass,
        menu("View/GBase/GPageView")
    ], GPageView);
    return GPageView;
}(GViewBase_1.default));
exports.default = GPageView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HUGFnZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVEO0FBRXZELHlDQUFvQztBQUU5QixJQUFBLEtBQThDLEVBQUUsQ0FBQyxVQUFVLEVBQXpELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEU7SUFBdUMsNkJBQVM7SUFBaEQ7UUFBQSxxRUFpTkM7UUE3TXdCLGFBQU8sR0FBZ0IsRUFBRSxDQUFDO1FBQzlCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDckIsaUJBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBQy9CLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHNCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUUxQyxhQUFPLEdBQVcsMEJBQWEsQ0FBQztRQUNoQyxZQUFNLEdBQVksRUFBRSxDQUFDO1FBSXJCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUIsZUFBUyxHQUFhLElBQUksQ0FBQzs7SUFnTXZDLENBQUM7a0JBak5vQixTQUFTO0lBYXJCLDJCQUFPLEdBQWQsVUFBZ0MsSUFBWTtRQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDaEMsQ0FBQztJQU9NLDJCQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLDZCQUFTLEdBQWhCO1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFD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SSxDQUFDLHNCQUFzQixDQUFDO09BQ1IsU0FBUyxDQWlON0I7SUFBRCxnQkFBQztDQWpORCxBQWlOQyxDQWpOc0MsbUJBQVMsR0FpTi9DO2tCQWpOb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElOVkFMSURfVkFMVUUsIFdpblBhZ2UgfSBmcm9tIFwiLi4vQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgR1BhZ2UgZnJvbSBcIi4vR1BhZ2VcIjtcclxuaW1wb3J0IEdWaWV3QmFzZSBmcm9tIFwiLi9HVmlld0Jhc2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGlvbk9yZGVyLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvR0Jhc2UvR1BhZ2VWaWV3XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdQYWdlVmlldyBleHRlbmRzIEdWaWV3QmFzZSB7XHJcbiAgLy8g6YCa55So55qE5YiH6aG16Z+z5pWIXHJcbiAgcHVibGljIHN0YXRpYyBjb21Td2l0Y2hQYWdlQXVkaW86IHN0cmluZztcclxuXHJcbiAgQHByb3BlcnR5KFtjYy5Ub2dnbGVdKSB0b2dnbGVzOiBjYy5Ub2dnbGVbXSA9IFtdO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSBwYWdlUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKSBwYWdlUHJlZmFiczogY2MuUHJlZmFiW10gPSBbXTtcclxuICBAcHJvcGVydHkoY2MuQm9vbGVhbikgcGFyYWxsZWxUd2VlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBwcm9wZXJ0eShjYy5Cb29sZWFuKSBmb3JjZVRvZ2dsZUV2ZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQHByb3BlcnR5KFtjYy5JbnRlZ2VyXSkgdW5DYWNoZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgY3VyUGFnZTogbnVtYmVyID0gSU5WQUxJRF9WQUxVRTtcclxuICBwcm90ZWN0ZWQgX3BhZ2VzOiBHUGFnZVtdID0gW107XHJcbiAgcHVibGljIGdldFBhZ2U8VCBleHRlbmRzIEdQYWdlPihwYWdlOiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiB0aGlzLl9wYWdlc1twYWdlXSBhcyBUO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgX2luVHdlZW46IGNjLlR3ZWVuID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX291dFR3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gIC8vIOaMh+WumuWIh+mhtemfs+aViFxyXG4gIHB1YmxpYyBzd2l0Y2hQYWdlQXVkaW86IHN0cmluZztcclxuXHJcbiAgcHVibGljIG9uR0xvYWQoKSB7XHJcbiAgICB0aGlzLnNldFN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFN0YXR1cygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2dnbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0b2dnbGUgPSB0aGlzLnRvZ2dsZXNbaV07XHJcbiAgICAgIHRvZ2dsZS5ub2RlLm9uKFwidG9nZ2xlXCIsIHRoaXMub25Ub2dnbGVDbGljaywgdGhpcyk7XHJcbiAgICAgIHRoaXMuc2V0VG9nZ2xlQ2FuU3dpdGNoKHRvZ2dsZSwgdGhpcy5pc0NhblN3aXRjaChpLCBmYWxzZSksIGkpO1xyXG4gICAgICBpZiAodGhpcy5zd2l0Y2hQYWdlQXVkaW8pIHtcclxuICAgICAgICB0b2dnbGUuY2xpY2tBdWRpbyA9IHRoaXMuc3dpdGNoUGFnZUF1ZGlvO1xyXG4gICAgICB9IGVsc2UgaWYgKEdQYWdlVmlldy5jb21Td2l0Y2hQYWdlQXVkaW8pIHtcclxuICAgICAgICB0b2dnbGUuY2xpY2tBdWRpbyA9IEdQYWdlVmlldy5jb21Td2l0Y2hQYWdlQXVkaW87XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRUb2dnbGVDYW5Td2l0Y2godG9nZ2xlLCBpc0NhblN3aXRjaDogYm9vbGVhbiwgblBhZ2U6IG51bWJlcikge1xyXG4gICAgdG9nZ2xlLmludGVyYWN0YWJsZSA9IGlzQ2FuU3dpdGNoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uR1N0YXJ0KHBhZ2U6IG51bWJlciwgLi4uYXJncykge1xyXG4gICAgcGFnZSA9IHBhZ2UgfHwgV2luUGFnZS5QYWdlMDtcclxuICAgIGlmIChwYWdlID49IHRoaXMudG9nZ2xlcy5sZW5ndGgpIHtcclxuICAgICAgY2Mud2FybihcInRoZSBwYWdlIGluZGV4IGlzIG1heCBvZiB0b2dnbGVzLmxlbmd0aCwgc2V0IHRoZSBwYWdlID0gMFwiKTtcclxuICAgICAgcGFnZSA9IFdpblBhZ2UuUGFnZTA7XHJcbiAgICB9XHJcbiAgICBsZXQgdG9nZ2xlID0gdGhpcy50b2dnbGVzW3BhZ2VdO1xyXG4gICAgaWYgKHRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrKHRvZ2dsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b2dnbGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrKHRvZ2dsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tSZUdTdGFydCgpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRGVzdHJveSgpIHtcclxuICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdG9wVHdlZW4oKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHBQYWdlID0gdGhpcy5fcGFnZXNbaV07XHJcbiAgICAgIGlmICghcFBhZ2UpIGNvbnRpbnVlO1xyXG4gICAgICBpZiAocFBhZ2Uubm9kZSAmJiAhcFBhZ2Uubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICBwUGFnZS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwUGFnZS5pc1ZhbGlkICYmIHBQYWdlLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fcGFnZXMubGVuZ3RoID0gMDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvblRvZ2dsZUNsaWNrKHRvZ2dsZTogY2MuVG9nZ2xlKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnRvZ2dsZXMuaW5kZXhPZih0b2dnbGUpO1xyXG4gICAgaWYgKGluZGV4ID09IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgY2MuZXJyb3IoXCJ0aGUgdG9nZ2xlIGNvbXBvbmVudCBpcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzQ2FuU3dpdGNoKGluZGV4LCB0cnVlKSkge1xyXG4gICAgICBpZiAodGhpcy5jdXJQYWdlICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZXNbdGhpcy5jdXJQYWdlXS5ub0V2ZW50Q2hlY2sodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVzW2luZGV4XS5ub0V2ZW50Q2hlY2soZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBvbGRQYWdlID0gdGhpcy5jdXJQYWdlO1xyXG4gICAgdGhpcy5jdXJQYWdlID0gaW5kZXg7XHJcbiAgICBpZiAob2xkUGFnZSA9PSB0aGlzLmN1clBhZ2UpIHJldHVybjtcclxuICAgIHRoaXMub25Td2l0Y2gob2xkUGFnZSwgaW5kZXgpO1xyXG5cclxuICAgIGlmIChvbGRQYWdlICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgdGhpcy5vblVuU2VsZWN0ZWQob2xkUGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vblNlbGVjdGVkKGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKiDpgInkuK3liIbpobUgKi9cclxuICBwcm90ZWN0ZWQgb25TZWxlY3RlZChuUGFnZTogbnVtYmVyKSB7fVxyXG5cclxuICAvKiog5YiG6aG16KKr5Y+W5raIICovXHJcbiAgcHJvdGVjdGVkIG9uVW5TZWxlY3RlZChuUGFnZTogbnVtYmVyKSB7fVxyXG5cclxuICBwcm90ZWN0ZWQgaXNDYW5Td2l0Y2goblBhZ2U6IG51bWJlciwgaXNDYW5Ub2FzdDogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uU3dpdGNoKG5PbGRQYWdlOiBudW1iZXIsIG5OZXdQYWdlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuc3RvcFR3ZWVuKCk7XHJcbiAgICBsZXQgX19uZXdQYWdlTG9hZENiID0gKHBQYWdlOiBHUGFnZSkgPT4ge1xyXG4gICAgICBpZiAoIXBQYWdlLm5vZGUucGFyZW50KSB0aGlzLnBhZ2VSb290LmFkZENoaWxkKHBQYWdlLm5vZGUpO1xyXG4gICAgICB0aGlzLl9pblR3ZWVuID0gdGhpcy5pbkFjdGlvbihwUGFnZS5ub2RlLCBuT2xkUGFnZSwgbk5ld1BhZ2UpO1xyXG4gICAgICBpZiAodGhpcy5faW5Ud2Vlbikge1xyXG4gICAgICAgIHRoaXMuX2luVHdlZW5cclxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5Ud2VlbiA9IG51bGw7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5vblBhZ2VJbmVkKHBQYWdlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9uUGFnZUluZWQocFBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBfX3N3aXRjaENiID0gKCkgPT4ge1xyXG4gICAgICBsZXQgcE5ld1BhZ2UgPSB0aGlzLl9wYWdlc1tuTmV3UGFnZV07XHJcbiAgICAgIGlmICghcE5ld1BhZ2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFnZVByZWZhYnNbbk5ld1BhZ2VdKSB7XHJcbiAgICAgICAgICBjYy53YXJuKFwidGhlIG5ldyBQYWdlIHJlcyBpcyBub3Qgc3R0ZWluZy5cIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYWdlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFnZVByZWZhYnNbbk5ld1BhZ2VdKTtcclxuICAgICAgICBsZXQgcGFnZSA9IHBhZ2VOb2RlLmdldENvbXBvbmVudChcIkdDaGlsZFwiKTtcclxuICAgICAgICB0aGlzLl9wYWdlc1tuTmV3UGFnZV0gPSBwYWdlO1xyXG4gICAgICAgIHRoaXMub25QYWdlTG9hZChwYWdlLCBuTmV3UGFnZSk7XHJcbiAgICAgICAgX19uZXdQYWdlTG9hZENiKHBhZ2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9fbmV3UGFnZUxvYWRDYihwTmV3UGFnZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IF9fb2xkUGFnZU91dCA9IChvbGRQYWdlOiBHUGFnZSkgPT4ge1xyXG4gICAgICB0aGlzLl9vdXRUd2VlbiA9IG51bGw7XHJcbiAgICAgIHRoaXMub25QYWdlT3V0ZWQob2xkUGFnZSk7XHJcbiAgICAgIGlmICh0aGlzLnVuQ2FjaGVQYWdlcy5pbmRleE9mKG5PbGRQYWdlKSAhPSBJTlZBTElEX1ZBTFVFKSB7XHJcbiAgICAgICAgb2xkUGFnZS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9wYWdlc1tuT2xkUGFnZV0gPSBudWxsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9sZFBhZ2Uubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICAhdGhpcy5wYXJhbGxlbFR3ZWVuICYmIF9fc3dpdGNoQ2IoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5bimcGFnZee7hOS7tueahOe7n+S4gOWkhOeQhlxyXG4gICAgbGV0IG9sZFBhZ2UgPSB0aGlzLl9wYWdlc1tuT2xkUGFnZV07XHJcbiAgICBpZiAob2xkUGFnZSkge1xyXG4gICAgICB0aGlzLl9vdXRUd2VlbiA9IHRoaXMub3V0QWN0aW9uKG9sZFBhZ2Uubm9kZSwgbk9sZFBhZ2UsIG5OZXdQYWdlKTtcclxuICAgICAgaWYgKHRoaXMuX291dFR3ZWVuKSB7XHJcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4uY2FsbCgoKSA9PiBfX29sZFBhZ2VPdXQob2xkUGFnZSkpLnN0YXJ0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX19vbGRQYWdlT3V0KG9sZFBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAhdGhpcy5wYXJhbGxlbFR3ZWVuICYmIF9fc3dpdGNoQ2IoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFyYWxsZWxUd2VlbiAmJiBfX3N3aXRjaENiKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25Db3VzdG9tU3dpdGNoKG9sZFBhZ2U6IG51bWJlciwgbmV3UGFnZSkge31cclxuXHJcbiAgcHJvdGVjdGVkIG9uUGFnZUxvYWQocGFnZTogR1BhZ2UsIG5ld1BhZ2U6IG51bWJlcikge31cclxuXHJcbiAgcHJvdGVjdGVkIG9uUGFnZUluZWQocGFnZTogR1BhZ2UpIHtcclxuICAgIHBhZ2Uub25QYWdlSW4oKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvblBhZ2VPdXRlZChwYWdlOiBHUGFnZSkge1xyXG4gICAgcGFnZS5vblBhZ2VPdXQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvdXRBY3Rpb24oXHJcbiAgICBwYWdlTm9kZTogY2MuTm9kZSxcclxuICAgIG5PbGRQYWdlOiBudW1iZXIsXHJcbiAgICBuTmV3UGFnZTogbnVtYmVyXHJcbiAgKTogY2MuVHdlZW4ge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5BY3Rpb24oXHJcbiAgICBwYWdlTm9kZTogY2MuTm9kZSxcclxuICAgIG5PbGRQYWdlOiBudW1iZXIsXHJcbiAgICBuTmV3UGFnZTogbnVtYmVyXHJcbiAgKTogY2MuVHdlZW4ge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc3RvcFR3ZWVuKCkge1xyXG4gICAgdGhpcy5faW5Ud2VlbiAmJiB0aGlzLl9pblR3ZWVuLnN0b3AoKTtcclxuICAgIHRoaXMuX291dFR3ZWVuICYmIHRoaXMuX291dFR3ZWVuLnN0b3AoKTtcclxuICAgIHRoaXMuX2luVHdlZW4gPSBudWxsO1xyXG4gICAgdGhpcy5fb3V0VHdlZW4gPSBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=