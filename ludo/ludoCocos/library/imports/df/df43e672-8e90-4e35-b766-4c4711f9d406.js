"use strict";
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