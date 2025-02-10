
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac068zWOFVOqabHv8hmCHNU', 'GListView');
// Script/Core/GView/GListView.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GListViewDir = exports.GListView = void 0;
var CoreDefine_1 = require("../CoreDefine");
var AudioMgr_1 = require("../Manager/AudioMgr");
var GChild_1 = require("./GChild");
var GViewDestory_1 = require("./GViewDestory");
var GListView = /** @class */ (function () {
    function GListView(params) {
        this._selectedIndex = -1;
        this._isTouchPress = false;
        this._touchChildNode = null;
        this._childLongTouchDeltaTime = 0;
        this._childLongTouchTimer = -1;
        this._childLongTouchTimes = 0;
        this._scrollview = params.scrollview;
        this._scrollview.node["_list"] = this;
        this._mask = params.mask;
        this._content = params.content;
        this._itemTpl = params.itemTpl;
        this._itemTpl.active = false;
        this._itemWidth = this._itemTpl.width;
        this._itemHeight = this._itemTpl.height;
        this._itemAnchorX = this._itemTpl.anchorX;
        this._itemAnchorY = this._itemTpl.anchorY;
        this._dir = params.direction || GListViewDir.Vertical;
        this._width = params.width || this._mask.width;
        this._height = params.height || this._mask.height;
        this._gapX = params.gapX || 0;
        this._gapY = params.gapY || 0;
        this._padingX = params.padingX || 0;
        this._padingY = params.padingY || 0;
        this._row = params.row || 1;
        this._col = params.column || 1;
        this._cbHost = params.cbHost;
        this._itemSetter = params.itemSetter;
        this._scrollingCb = params.scrollingCb;
        this._recycleCb = params.recycleCb;
        this._selectSetter = params.selectSetter;
        this._scrollToEndCb = params.scrollToEndCb;
        this._childClickCb = params.childClick;
        this._autoScrolling = params.autoScrolling || false;
        this._nodePool = [];
        this._isCbClass = !!params.isCbClass;
        this._isWidget = params.isWidget || false;
        this._childLongTouch = params.childLongTouch;
        this._childLongTouchFristTime = params.childLongTouchFristTime;
        this._childLongTouchUpdateTime = params.childLongTouchUpdateTime;
        this._childLongTouchTimer = -1;
        this._childLongTouchTimes = 0;
        if (this._dir == GListViewDir.Horizontal) {
            var real_width = (this._itemWidth + this._gapX) * this._col - this._gapX;
            if (real_width > this._width) {
                console.info("real width > width, resize scrollview to realwidth,", this._width, "->", real_width);
                this._width = real_width;
            }
            this._content.width = this._width;
        }
        else {
            var real_height = (this._itemHeight + this._gapY) * this._row - this._gapY;
            if (real_height > this._height) {
                console.info("real height > height, resize scrollview to realheight,", this._height, "->", real_height);
                this._height = real_height;
            }
            this._content.height = this._height;
        }
        this._mask.setContentSize(this._width, this._height);
        // this._mask.addComponent(cc.Mask);
        this._scrollview.node.setContentSize(this._width, this._height);
        this._scrollview.vertical = this._dir == GListViewDir.Vertical;
        this._scrollview.horizontal = this._dir == GListViewDir.Horizontal;
        this._scrollview.inertia = true;
        this._scrollview.node.on("scrolling", this.onScrolling, this);
        this._scrollview.node.on("scroll-to-bottom", this.onScrollToEnd, this);
        this._scrollview.node.on("scroll-to-right", this.onScrollToEnd, this);
        this._scrollview.node.on(cc.Node.EventType.TOUCH_END, this.onToucEnd, this);
        this._scrollview.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this._scrollview.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this._scrollview.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        if (this._isWidget) {
            this._scrollview.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
        }
        var destroy = this._scrollview.node.getComponent(GViewDestory_1.default);
        if (!destroy) {
            destroy = this._scrollview.node.addComponent(GViewDestory_1.default);
        }
        destroy.otherDestroyCb = this.destroy.bind(this);
        // this._scrollview.node.on("")
        // cc.info("constructor", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    }
    Object.defineProperty(GListView.prototype, "scrollview", {
        get: function () {
            return this._scrollview;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GListView.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GListView.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GListView.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    GListView.prototype.onSizeChange = function () {
        this._width = this.scrollview.node.width;
        this._height = this.scrollview.node.height;
        this.mask.setContentSize(this.scrollview.node.getContentSize());
        if (this._datas) {
            this.setData(this._datas);
        }
    };
    GListView.prototype.onScrollToEnd = function () {
        if (this._scrollToEndCb) {
            this._scrollToEndCb.call(this._cbHost);
        }
    };
    GListView.prototype.closeTimer = function () {
        if (this._childLongTouchTimer != -1) {
            clearInterval(this._childLongTouchTimer);
        }
        this._childLongTouchTimer = -1;
        this._childLongTouchDeltaTime = 0;
        this._childLongTouchTimes = 0;
    };
    GListView.prototype.startTimer = function () {
        var _this = this;
        this._childLongTouchDeltaTime = 0;
        this._childLongTouchTimes = 0;
        var index = parseInt(this._touchChildNode.name.replace("item_", ""));
        this._childLongTouchTimer = setInterval(function () {
            _this._childLongTouchDeltaTime += 0.1;
            if (_this._childLongTouchTimes == 0 &&
                _this._childLongTouchDeltaTime > _this._childLongTouchFristTime &&
                _this._isTouchPress &&
                _this._touchChildNode) {
                if (cc.Button.comAudio) {
                    AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
                }
                _this._childLongTouch.call(_this._cbHost, _this._isCbClass
                    ? _this._touchChildNode.getComponent(GChild_1.default)
                    : _this._touchChildNode, _this._items[index].data, index, ++_this._childLongTouchTimes);
                _this._childLongTouchDeltaTime = 0;
                if (!_this._childLongTouchUpdateTime) {
                    _this.closeTimer();
                    _this._isTouchPress = false;
                    return;
                }
            }
            else if (_this._childLongTouchUpdateTime &&
                _this._childLongTouchTimes > 0 &&
                _this._childLongTouchDeltaTime > _this._childLongTouchUpdateTime &&
                _this._touchChildNode) {
                if (cc.Button.comAudio) {
                    AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
                }
                _this._childLongTouch.call(_this._cbHost, _this._isCbClass
                    ? _this._touchChildNode.getComponent(GChild_1.default)
                    : _this._touchChildNode, _this._items[index].data, index, ++_this._childLongTouchTimes);
                _this._childLongTouchDeltaTime = 0;
                _this._isTouchPress = false;
            }
        }, 100);
    };
    GListView.prototype.onTouchStart = function (event) {
        this._isTouchPress = true;
        this._touchChildNode = null;
        var local = event.getLocation();
        var childs = this._content.children;
        for (var i = 0; i < childs.length; i++) {
            var node = childs[i];
            if (node.active && node.getBoundingBoxToWorld().contains(local)) {
                this._touchChildNode = node;
                break;
            }
        }
        if (!this._childLongTouch)
            return;
        if (!this._touchChildNode)
            return;
        this.startTimer();
    };
    GListView.prototype.onTouchMove = function (event) {
        if (event.getStartLocation().sub(event.getLocation()).mag() < 4)
            return;
        this._isTouchPress = false;
        this.closeTimer();
        this._touchChildNode = null;
    };
    GListView.prototype.onToucEnd = function (event) {
        this.closeTimer();
        if (this._childLongTouchTimes > 0) {
            this._touchChildNode = null;
            return;
        }
        if (!this._isTouchPress)
            return;
        if (!this._touchChildNode)
            return;
        this.onItemTouchEnd(this._touchChildNode);
    };
    GListView.prototype.onTouchCancel = function (event) {
        this.onToucEnd(event);
    };
    /**
     * 强制中断触摸
     */
    GListView.prototype.cancelTouchEvent = function () {
        this.closeTimer();
        this._touchChildNode = null;
        this._isTouchPress = false;
        this._childLongTouchTimes = 0;
    };
    GListView.prototype.onScrolling = function () {
        if (!this._items || !this._items.length) {
            return;
        }
        if (this._dir == GListViewDir.Vertical) {
            var posy = this._content.y;
            // cc.info("onscrolling, content posy=", posy);
            if (posy < (1 - this.mask.anchorY) * this.mask.height) {
                posy = (1 - this.mask.anchorY) * this.mask.height;
            }
            if (posy >
                this.content.height + (1 - this.mask.anchorY) * this.mask.height) {
                posy = this.content.height + (1 - this.mask.anchorY) * this.mask.height;
            }
            var _a = this.verticalRange(posy), start = _a[0], stop = _a[1];
            start = Math.max(start, 0);
            stop = Math.min(stop, this._items.length - 1);
            // cc.log(start + ',' + stop);
            if (start != this._startIndex || stop != this._stopIndex) {
                this._startIndex = start;
                this._stopIndex = stop;
                // cc.info("render_from:", start, stop);
                this.renderItems();
            }
        }
        else {
            var posx = this._content.x;
            if (posx > -this._width / 2) {
                posx = -this._width / 2;
            }
            if (posx < -this._content.width + this._height / 2) {
                posx = -this._content.width + this._height / 2;
            }
            var _b = this.horizontalRange(posx, this._width, this._itemWidth, this._row, this._gapX), start = _b[0], stop = _b[1];
            start = Math.max(start, 0);
            stop = Math.min(stop, this._items.length - 1);
            // cc.log(start + ',' + stop);
            if (start != this._startIndex && stop != this._stopIndex) {
                this._startIndex = start;
                this._stopIndex = stop;
                // cc.info("render_from:", start, stop);
                this.renderItems();
            }
        }
        if (this._scrollingCb) {
            this._scrollingCb.call(this._cbHost);
        }
    };
    GListView.prototype.onItemTouchEnd = function (node) {
        if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        var index = parseInt(node.name.replace("item_", ""));
        if (this._childClickCb) {
            this._childClickCb.call(this._cbHost, this._isCbClass ? node.getComponent(GChild_1.default) : node, this._items[index].data, index);
        }
        if (index == this._selectedIndex) {
            return;
        }
        if (this._selectedIndex != -1) {
            this.innerSelectItem(this._selectedIndex, false);
        }
        this.innerSelectItem(index, true);
    };
    GListView.prototype.innerSelectItem = function (index, is_select) {
        var item = this._items[index];
        if (!item) {
            cc.warn("inner_select_item index is out of range{", 0, this._items.length - 1, "}", index);
            return;
        }
        item.isSelect = is_select;
        if (item.node && this._selectSetter) {
            this._selectSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild_1.default) : item.node, item.data, is_select, index);
        }
    };
    GListView.prototype.spawnNode = function (index) {
        var node = this._nodePool.pop();
        if (!node) {
            node = cc.instantiate(this._itemTpl);
            node.parent = this._content;
        }
        node.active = true;
        node.name = "item_" + index;
        return node;
    };
    GListView.prototype.recycleItem = function (item) {
        if (item.node && cc.isValid(item.node)) {
            if (this._recycleCb) {
                this._recycleCb.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild_1.default) : item.node);
            }
            (item.node.name = "item_null"), (item.node.active = false);
            this._nodePool.push(item.node);
            item.node = null;
        }
    };
    GListView.prototype.clearItems = function () {
        var _this = this;
        this._items = [];
        if (!cc.isValid(this._content))
            return;
        this._content.children.forEach(function (item) {
            if (item.active) {
                (item.name = "item_null"), (item.active = false);
                _this._nodePool.push(item);
            }
        });
    };
    GListView.prototype.renderItems = function (isForce) {
        var _this = this;
        var item;
        this._content.children.forEach(function (item) {
            if (!item.active)
                return;
            var index = parseInt(item.name.replace("item_", ""));
            if (index < _this._startIndex || index > _this._stopIndex) {
                _this.recycleItem(_this._items[index]);
                // cc.info("recycle_item:", index);
            }
        });
        if (this._startIndex === CoreDefine_1.INVALID_VALUE)
            return;
        for (var i = this._startIndex; i <= this._stopIndex; i++) {
            item = this._items[i];
            if (!item.node) {
                // cc.info("render_item", i);
                item.node = this.spawnNode(i);
                this._itemSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild_1.default) : item.node, item.data, i);
                // if (this._selectSetter) {
                //     this._selectSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild) : item.node, item.data, item.isSelect, i);
                // }
            }
            else {
                if (isForce) {
                    this._itemSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild_1.default) : item.node, item.data, i);
                    // if (this._selectSetter) {
                    //     this._selectSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild) : item.node, item.data, item.isSelect, i);
                    // }
                }
            }
            item.node.setPosition(item.x, item.y);
            // console.log(item.x, item.node.position)
        }
        // cc.log("======================>" + this._content.children.length)
    };
    GListView.prototype.packItem = function (data) {
        return { x: 0, y: 0, data: data, node: null, isSelect: false };
    };
    GListView.prototype.layoutItems = function (start) {
        var _a, _b;
        // cc.info("layout_items, start=", start);
        for (var index = start, stop = this._items.length; index < stop; index++) {
            var item = this._items[index];
            if (this._dir == GListViewDir.Vertical) {
                _a = this.verticalLayout(index), item.x = _a[0], item.y = _a[1];
            }
            else {
                _b = this.horizontalLayout(index), item.x = _b[0], item.y = _b[1];
            }
        }
    };
    GListView.prototype.resizeContent = function () {
        if (this._items.length <= 0) {
            this._content.width = 0;
            this._content.height = 0;
            return;
        }
        var last_item = this._items[this._items.length - 1];
        if (this._dir == GListViewDir.Vertical) {
            this._content.height = Math.max(0, this._itemHeight * (1 - this._itemAnchorY) - last_item.y);
        }
        else {
            this._content.width = Math.max(0, last_item.x + this._itemWidth / 2);
        }
        // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    };
    GListView.prototype.destroy = function () {
        this.clearItems();
        this._nodePool.forEach(function (node) {
            if (cc.isValid(node))
                node.destroy();
        });
        this._nodePool = null;
        this._items = null;
        this._datas = null;
        if (cc.isValid(this._scrollview.node)) {
            this._scrollview.node.off("scrolling", this.onScrolling, this);
            this._scrollview.node.off("scroll-to-bottom", this.onScrollToEnd, this);
            this._scrollview.node.off("scroll-to-right", this.onScrollToEnd, this);
            this._scrollview.node["_list"] = null;
        }
    };
    GListView.prototype.verticalLayout = function (index) {
        var x = this._padingX +
            (index % this._col) * (this._itemWidth + this._gapX) +
            this._itemWidth * this._itemAnchorX;
        var y = -Math.floor(index / this._col) * (this._itemHeight + this._gapY) -
            this._itemHeight * (1 - this._itemAnchorY) -
            this._padingY;
        return [x, y];
    };
    GListView.prototype.verticalRange = function (y) {
        var t_offset = y -
            (1 - this.mask.anchorY) * this.mask.height +
            (1 - this._itemAnchorY) * this._itemHeight +
            this._padingY;
        var t_last = Math.floor(t_offset / (this._itemHeight + this._gapY));
        var b_frist = Math.ceil((t_offset + this.mask.height + this._gapY) /
            (this._itemHeight + this._gapY));
        return [(t_last - 1) * this._col, b_frist * this._col];
    };
    GListView.prototype.horizontalLayout = function (index) {
        var x = Math.floor(index / this._row) * (this._itemWidth + this._gapX) +
            this._itemWidth * this._itemAnchorX;
        var y = -(index % this._row) * (this._itemHeight + this._gapY) -
            this._itemHeight / 2;
        return [x, y];
    };
    GListView.prototype.horizontalRange = function (x, width, item_width, row, gap_x) {
        if (row === void 0) { row = 1; }
        if (gap_x === void 0) { gap_x = 0; }
        var t_offset = -(x + width / 2);
        var t_last = Math.ceil(t_offset / (item_width + gap_x));
        var b_frist = Math.ceil((t_offset + width) / (item_width + gap_x));
        var stop = (b_frist + 1) * row - 1;
        stop = stop === this._stopIndex ? this._stopIndex + 1 : stop;
        return [(t_last - 1) * row, stop];
    };
    Object.defineProperty(GListView.prototype, "datas", {
        get: function () {
            return this._datas || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GListView.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GListView.prototype, "selectdData", {
        get: function () {
            var item = this._items[this._selectedIndex];
            if (item) {
                return item.data;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    GListView.prototype.setData = function (datas) {
        var _this = this;
        this.clearItems();
        this._datas = datas;
        datas.forEach(function (data) {
            _this._items.push(_this.packItem(data));
        });
        this.layoutItems(0);
        this.resizeContent();
        this._startIndex = -1;
        this._stopIndex = -1;
        if (this._dir == GListViewDir.Vertical) {
            this._content.y = this._height * (1 - this._mask.anchorY);
        }
        else {
            this._content.x = this._width * (this._mask.anchorX - 1);
        }
        if (this._items.length > 0) {
            this.onScrolling();
        }
        // 重置ScrollBar
        this._scrollview["_calculateBoundary"]();
    };
    GListView.prototype.tryGetItemByIndex = function (index) {
        if (index < this._startIndex || index > this._stopIndex) {
            return null;
        }
        var item = this._items[index];
        if (!item)
            return null;
        return (this._isCbClass ? item.node.getComponent(GChild_1.default) : item.node);
    };
    GListView.prototype.refreshData = function (datas) {
        var _this = this;
        if (datas) {
            this.clearItems();
            this._datas = datas;
            datas.forEach(function (data) {
                _this._items.push(_this.packItem(data));
            });
            this.layoutItems(0);
            this.resizeContent();
            this.renderItems(true);
        }
        else {
            if (this._datas) {
                this.renderItems(true);
            }
        }
    };
    GListView.prototype.insertData = function (index) {
        var _a, _b;
        var _this = this;
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        if (datas.length == 0) {
            console.info("nothing to insert");
            return;
        }
        if (!this._items) {
            this._items = [];
        }
        if (!this._datas) {
            this._datas = [];
        }
        if (index < 0 || index > this._items.length) {
            cc.warn("invalid index", index);
            return;
        }
        var is_append = index == this._items.length;
        var items = [];
        datas.forEach(function (data) {
            items.push(_this.packItem(data));
        });
        (_a = this._datas).splice.apply(_a, __spreadArrays([index, 0], datas));
        (_b = this._items).splice.apply(_b, __spreadArrays([index, 0], items));
        this.layoutItems(index);
        this.resizeContent();
        this._startIndex = -1;
        this._stopIndex = -1;
        if (this._autoScrolling && is_append) {
            this.scrollToEnd();
        }
        this.onScrolling();
    };
    GListView.prototype.removeData = function (index, count) {
        var _this = this;
        if (count === void 0) { count = 1; }
        if (!this._items) {
            console.info("call set_data before call this method");
            return;
        }
        if (index < 0 || index >= this._items.length) {
            cc.warn("invalid index", index);
            return;
        }
        if (count < 1) {
            console.info("nothing to remove");
            return;
        }
        var old_length = this._items.length;
        var del_items = this._items.splice(index, count);
        this._datas.splice(index, count);
        //回收node
        del_items.forEach(function (item) {
            _this.recycleItem(item);
        });
        // 处理节点中旧的名称
        for (var i = index + 1; i < old_length; i++) {
            var child = this._content.getChildByName("item_" + i);
            if (child)
                child.name = "item_" + (i - count);
        }
        //重新排序index后面的
        if (index + count < old_length) {
            this.layoutItems(index);
        }
        this.resizeContent();
        if (this._items.length > 0) {
            this._startIndex = -1;
            this._stopIndex = -1;
            this.onScrolling();
        }
    };
    GListView.prototype.appendData = function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i] = arguments[_i];
        }
        if (!this._items) {
            this._items = [];
        }
        this.insertData.apply(this, __spreadArrays([this._items.length], datas));
    };
    GListView.prototype.scrollTo = function (index, scrollTime) {
        if (scrollTime === void 0) { scrollTime = 0; }
        this._scrollview.stopAutoScroll();
        if (this._dir == GListViewDir.Vertical) {
            var maxOffset = this._scrollview.getMaxScrollOffset();
            if (maxOffset.y <= 0) {
                cc.log("no need to scroll");
                return;
            }
            var _a = this.verticalLayout(index), _ = _a[0], y = _a[1];
            y = -(y + this._itemHeight * (1 - this._itemAnchorY) + this._padingY);
            if (y > maxOffset.y) {
                y = maxOffset.y;
                cc.log("content reach bottom");
            }
            if (y < 0) {
                y = 0;
                cc.log("content reach top");
            }
            this._scrollview.scrollToOffset(cc.v2(0, y), scrollTime);
            if (!scrollTime)
                this.onScrolling();
        }
        else {
            var maxOffset = this._scrollview.getMaxScrollOffset();
            if (maxOffset.x <= 0) {
                cc.log("no need to scroll");
                return;
            }
            var _b = this.horizontalLayout(index), x = _b[0], _ = _b[1];
            x += this._padingX;
            if (x > maxOffset.x) {
                x = maxOffset.x;
                cc.log("content reach right");
            }
            if (x < 0) {
                x = 0;
                cc.log("content reach left");
            }
            this._scrollview.scrollToOffset(cc.v2(x, this._content.y), scrollTime);
            if (!scrollTime)
                this.onScrolling();
        }
    };
    GListView.prototype.scrollToEnd = function () {
        if (this._dir == GListViewDir.Vertical) {
            this._scrollview.scrollToBottom();
        }
        else {
            this._scrollview.scrollToRight();
        }
    };
    GListView.prototype.refreshItem = function (index, data) {
        if (!this._items) {
            cc.log("call set_data before call this method");
            return;
        }
        if (index < 0 || index >= this._items.length) {
            cc.warn("invalid index", index);
            return;
        }
        var item = this._items[index];
        item.data = data;
        this._datas[index] = data;
        if (item.node) {
            if (this._recycleCb) {
                this._recycleCb.call(this._cbHost, item.node.getComponent(GChild_1.default));
            }
            this._itemSetter.call(this._cbHost, item.node.getComponent(GChild_1.default), item.data, index);
        }
    };
    GListView.prototype.reLayOut = function (params) {
        this._width = params.width != null ? params.width : this._width;
        this._height = params.height != null ? params.height : this._height;
        this._gapX = params.gapX != null ? params.gapX : this._gapX;
        this._gapY = params.gapY != null ? params.gapY : this._gapY;
        this._padingX = params.padingX != null ? params.padingX : this._padingX;
        this._padingY = params.padingY != null ? params.padingY : this._padingY;
        this._row = params.row != null ? params.row : this._row;
        this._col = params.column != null ? params.column : this._col;
        if (this._dir == GListViewDir.Horizontal) {
            var real_width = (this._itemWidth + this._gapX) * this._col - this._gapX;
            if (real_width > this._width) {
                console.info("real width > width, resize scrollview to realwidth,", this._width, "->", real_width);
                this._width = real_width;
            }
            this._content.width = this._width;
        }
        else {
            var real_height = (this._itemHeight + this._gapY) * this._row - this._gapY;
            if (real_height > this._height) {
                console.info("real height > height, resize scrollview to realheight,", this._height, "->", real_height);
                this._height = real_height;
            }
            this._content.height = this._height;
        }
        this._mask.setContentSize(this._width, this._height);
        this._scrollview.node.setContentSize(this._width, this._height);
    };
    /**
     * 重新载入listView参数
     * @param params ListView参数
     */
    GListView.prototype.resetParams = function (params) {
        this.clearItems();
        this._nodePool.forEach(function (e) { return e.destroy(); });
        this._nodePool.length = 0;
        if (this._itemTpl)
            this._itemTpl.destroy();
        this._datas = [];
        this._itemTpl = params.itemTpl;
        this._itemTpl.active = false;
        this._itemWidth = this._itemTpl.width;
        this._itemHeight = this._itemTpl.height;
        this._itemAnchorX = this._itemTpl.anchorX;
        this._itemAnchorY = this._itemTpl.anchorY;
        this.reLayOut(params);
        this._cbHost = params.cbHost || this._cbHost;
        this._itemSetter = params.itemSetter || this._itemSetter;
        this._recycleCb = params.recycleCb || this._recycleCb;
        this._selectSetter = params.selectSetter || this._selectSetter;
        this._scrollToEndCb = params.scrollToEndCb || this._scrollToEndCb;
        this._childClickCb = params.childClick || this._childClickCb;
        this._autoScrolling = params.autoScrolling || this._autoScrolling;
        this._isCbClass = params.isCbClass || !!this._isCbClass;
        this._isWidget = params.isWidget || this._isWidget;
        this._childLongTouch = params.childLongTouch || this._childLongTouch;
        this._childLongTouchFristTime =
            params.childLongTouchFristTime || this._childLongTouchFristTime;
        this._childLongTouchUpdateTime =
            params.childLongTouchUpdateTime || this._childLongTouchUpdateTime;
        this._childLongTouchTimer = -1;
        this._childLongTouchTimes = 0;
    };
    return GListView;
}());
exports.GListView = GListView;
var GListViewDir;
(function (GListViewDir) {
    GListViewDir[GListViewDir["Vertical"] = 1] = "Vertical";
    GListViewDir[GListViewDir["Horizontal"] = 2] = "Horizontal";
})(GListViewDir = exports.GListViewDir || (exports.GListViewDir = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HTGlzdFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUE4QztBQUM5QyxnREFBK0M7QUFDL0MsbUNBQThCO0FBQzlCLCtDQUEwQztBQUUxQztJQW9FRSxtQkFBWSxNQUF1QjtRQWIzQixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBSTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBSWhDLDZCQUF3QixHQUFXLENBQUMsQ0FBQztRQUNyQyx5QkFBb0IsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsQyx5QkFBb0IsR0FBVyxDQUFDLENBQUM7UUFHekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxH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LENBQUMsVUFBVSxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3JFLElBQUksQ0FBQyx3QkFBd0I7WUFDM0IsTUFBTSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUNsRSxJQUFJLENBQUMseUJBQXlCO1lBQzVCLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDcEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FuNEJBLEFBbTRCQyxJQUFBO0FBbjRCWSw4QkFBUztBQXE0QnRCLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUN0Qix1REFBWSxDQUFBO0lBQ1osMkRBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHTGlzdEl0ZW0sIEdMaXN0Vmlld1BhcmFtcyB9IGZyb20gXCIuLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5pbXBvcnQgeyBJTlZBTElEX1ZBTFVFIH0gZnJvbSBcIi4uL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiLi4vTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQgR0NoaWxkIGZyb20gXCIuL0dDaGlsZFwiO1xyXG5pbXBvcnQgR1ZpZXdEZXN0b3J5IGZyb20gXCIuL0dWaWV3RGVzdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdMaXN0VmlldyB7XHJcbiAgcHJpdmF0ZSBfc2Nyb2xsdmlldzogY2MuU2Nyb2xsVmlldztcclxuICBwdWJsaWMgZ2V0IHNjcm9sbHZpZXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsdmlldztcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFzazogY2MuTm9kZTtcclxuICBwdWJsaWMgZ2V0IG1hc2soKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFzaztcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGVudDogY2MuTm9kZTtcclxuICBwdWJsaWMgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaXRlbVRwbDogY2MuTm9kZTtcclxuICBwcml2YXRlIF9ub2RlUG9vbDogY2MuTm9kZVtdO1xyXG5cclxuICBwcml2YXRlIF9kaXI6IG51bWJlcjtcclxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG4gIHB1YmxpYyBnZXQgd2lkdGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2dhcFg6IG51bWJlcjtcclxuICBwcml2YXRlIF9nYXBZOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfcGFkaW5nWDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX3BhZGluZ1k6IG51bWJlcjtcclxuICBwcml2YXRlIF9yb3c6IG51bWJlcjtcclxuICBwcml2YXRlIF9jb2w6IG51bWJlcjtcclxuICBwcml2YXRlIF9pdGVtV2lkdGg6IG51bWJlcjtcclxuICBwcml2YXRlIF9pdGVtSGVpZ2h0OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfaXRlbUFuY2hvclg6IG51bWJlcjtcclxuICBwcml2YXRlIF9pdGVtQW5jaG9yWTogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2NiSG9zdDogYW55O1xyXG4gIHByaXZhdGUgX2l0ZW1TZXR0ZXI6IChpdGVtOiBhbnksIGRhdGE6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcclxuICBwcml2YXRlIF9zY3JvbGxpbmdDYjogKCkgPT4gdm9pZDtcclxuICBwcml2YXRlIF9yZWN5Y2xlQ2I6IChpdGVtOiBhbnkpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSBfc2VsZWN0U2V0dGVyOiAoXHJcbiAgICBpdGVtOiBhbnksXHJcbiAgICBkYXRhOiBhbnksXHJcbiAgICBpc19zZWxlY3Q6IGJvb2xlYW4sXHJcbiAgICBpbmRleDogbnVtYmVyXHJcbiAgKSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgX3Njcm9sbFRvRW5kQ2I6ICgpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSBfY2hpbGRDbGlja0NiOiAoaXRlbTogYW55LCBkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSBfY2hpbGRMb25nVG91Y2g6IChcclxuICAgIGl0ZW06IGFueSxcclxuICAgIGRhdGE6IGFueSxcclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICB0aW1lczogbnVtYmVyXHJcbiAgKSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgX2F1dG9TY3JvbGxpbmc6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfaXRlbXM6IEdMaXN0SXRlbVtdO1xyXG4gIHByaXZhdGUgX3N0YXJ0SW5kZXg6IG51bWJlcjtcclxuICBwcml2YXRlIF9zdG9wSW5kZXg6IG51bWJlcjtcclxuICBwcml2YXRlIF9kYXRhczogYW55W107XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgcHJvdGVjdGVkIF9pc0NiQ2xhc3M6IGJvb2xlYW47XHJcbiAgcHJvdGVjdGVkIF9pc1dpZGdldDogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIF9pc1RvdWNoUHJlc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgX3RvdWNoQ2hpbGROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAvLyDplb/mjInnm7jlhbPlpITnkIZcclxuICBwcm90ZWN0ZWQgX2NoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lOiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF9jaGlsZExvbmdUb3VjaFVwZGF0ZVRpbWU6IG51bWJlcjtcclxuICBwcm90ZWN0ZWQgX2NoaWxkTG9uZ1RvdWNoRGVsdGFUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHByb3RlY3RlZCBfY2hpbGRMb25nVG91Y2hUaW1lcjogbnVtYmVyID0gLTE7XHJcbiAgcHJvdGVjdGVkIF9jaGlsZExvbmdUb3VjaFRpbWVzOiBudW1iZXIgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IEdMaXN0Vmlld1BhcmFtcykge1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldyA9IHBhcmFtcy5zY3JvbGx2aWV3O1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlW1wiX2xpc3RcIl0gPSB0aGlzO1xyXG4gICAgdGhpcy5fbWFzayA9IHBhcmFtcy5tYXNrO1xyXG4gICAgdGhpcy5fY29udGVudCA9IHBhcmFtcy5jb250ZW50O1xyXG4gICAgdGhpcy5faXRlbVRwbCA9IHBhcmFtcy5pdGVtVHBsO1xyXG4gICAgdGhpcy5faXRlbVRwbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2l0ZW1XaWR0aCA9IHRoaXMuX2l0ZW1UcGwud2lkdGg7XHJcbiAgICB0aGlzLl9pdGVtSGVpZ2h0ID0gdGhpcy5faXRlbVRwbC5oZWlnaHQ7XHJcbiAgICB0aGlzLl9pdGVtQW5jaG9yWCA9IHRoaXMuX2l0ZW1UcGwuYW5jaG9yWDtcclxuICAgIHRoaXMuX2l0ZW1BbmNob3JZID0gdGhpcy5faXRlbVRwbC5hbmNob3JZO1xyXG4gICAgdGhpcy5fZGlyID0gcGFyYW1zLmRpcmVjdGlvbiB8fCBHTGlzdFZpZXdEaXIuVmVydGljYWw7XHJcbiAgICB0aGlzLl93aWR0aCA9IHBhcmFtcy53aWR0aCB8fCB0aGlzLl9tYXNrLndpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gcGFyYW1zLmhlaWdodCB8fCB0aGlzLl9tYXNrLmhlaWdodDtcclxuICAgIHRoaXMuX2dhcFggPSBwYXJhbXMuZ2FwWCB8fCAwO1xyXG4gICAgdGhpcy5fZ2FwWSA9IHBhcmFtcy5nYXBZIHx8IDA7XHJcbiAgICB0aGlzLl9wYWRpbmdYID0gcGFyYW1zLnBhZGluZ1ggfHwgMDtcclxuICAgIHRoaXMuX3BhZGluZ1kgPSBwYXJhbXMucGFkaW5nWSB8fCAwO1xyXG4gICAgdGhpcy5fcm93ID0gcGFyYW1zLnJvdyB8fCAxO1xyXG4gICAgdGhpcy5fY29sID0gcGFyYW1zLmNvbHVtbiB8fCAxO1xyXG4gICAgdGhpcy5fY2JIb3N0ID0gcGFyYW1zLmNiSG9zdDtcclxuICAgIHRoaXMuX2l0ZW1TZXR0ZXIgPSBwYXJhbXMuaXRlbVNldHRlcjtcclxuICAgIHRoaXMuX3Njcm9sbGluZ0NiID0gcGFyYW1zLnNjcm9sbGluZ0NiO1xyXG4gICAgdGhpcy5fcmVjeWNsZUNiID0gcGFyYW1zLnJlY3ljbGVDYjtcclxuICAgIHRoaXMuX3NlbGVjdFNldHRlciA9IHBhcmFtcy5zZWxlY3RTZXR0ZXI7XHJcbiAgICB0aGlzLl9zY3JvbGxUb0VuZENiID0gcGFyYW1zLnNjcm9sbFRvRW5kQ2I7XHJcbiAgICB0aGlzLl9jaGlsZENsaWNrQ2IgPSBwYXJhbXMuY2hpbGRDbGljaztcclxuICAgIHRoaXMuX2F1dG9TY3JvbGxpbmcgPSBwYXJhbXMuYXV0b1Njcm9sbGluZyB8fCBmYWxzZTtcclxuICAgIHRoaXMuX25vZGVQb29sID0gW107XHJcbiAgICB0aGlzLl9pc0NiQ2xhc3MgPSAhIXBhcmFtcy5pc0NiQ2xhc3M7XHJcbiAgICB0aGlzLl9pc1dpZGdldCA9IHBhcmFtcy5pc1dpZGdldCB8fCBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaCA9IHBhcmFtcy5jaGlsZExvbmdUb3VjaDtcclxuICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lID0gcGFyYW1zLmNoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lO1xyXG4gICAgdGhpcy5fY2hpbGRMb25nVG91Y2hVcGRhdGVUaW1lID0gcGFyYW1zLmNoaWxkTG9uZ1RvdWNoVXBkYXRlVGltZTtcclxuXHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVyID0gLTE7XHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVzID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5fZGlyID09IEdMaXN0Vmlld0Rpci5Ib3Jpem9udGFsKSB7XHJcbiAgICAgIGxldCByZWFsX3dpZHRoOiBudW1iZXIgPVxyXG4gICAgICAgICh0aGlzLl9pdGVtV2lkdGggKyB0aGlzLl9nYXBYKSAqIHRoaXMuX2NvbCAtIHRoaXMuX2dhcFg7XHJcbiAgICAgIGlmIChyZWFsX3dpZHRoID4gdGhpcy5fd2lkdGgpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXHJcbiAgICAgICAgICBcInJlYWwgd2lkdGggPiB3aWR0aCwgcmVzaXplIHNjcm9sbHZpZXcgdG8gcmVhbHdpZHRoLFwiLFxyXG4gICAgICAgICAgdGhpcy5fd2lkdGgsXHJcbiAgICAgICAgICBcIi0+XCIsXHJcbiAgICAgICAgICByZWFsX3dpZHRoXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHJlYWxfd2lkdGg7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fY29udGVudC53aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHJlYWxfaGVpZ2h0OiBudW1iZXIgPVxyXG4gICAgICAgICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5fZ2FwWSkgKiB0aGlzLl9yb3cgLSB0aGlzLl9nYXBZO1xyXG4gICAgICBpZiAocmVhbF9oZWlnaHQgPiB0aGlzLl9oZWlnaHQpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXHJcbiAgICAgICAgICBcInJlYWwgaGVpZ2h0ID4gaGVpZ2h0LCByZXNpemUgc2Nyb2xsdmlldyB0byByZWFsaGVpZ2h0LFwiLFxyXG4gICAgICAgICAgdGhpcy5faGVpZ2h0LFxyXG4gICAgICAgICAgXCItPlwiLFxyXG4gICAgICAgICAgcmVhbF9oZWlnaHRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHJlYWxfaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX21hc2suc2V0Q29udGVudFNpemUodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XHJcbiAgICAvLyB0aGlzLl9tYXNrLmFkZENvbXBvbmVudChjYy5NYXNrKTtcclxuICAgIHRoaXMuX3Njcm9sbHZpZXcubm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcclxuICAgIHRoaXMuX3Njcm9sbHZpZXcudmVydGljYWwgPSB0aGlzLl9kaXIgPT0gR0xpc3RWaWV3RGlyLlZlcnRpY2FsO1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldy5ob3Jpem9udGFsID0gdGhpcy5fZGlyID09IEdMaXN0Vmlld0Rpci5Ib3Jpem9udGFsO1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldy5pbmVydGlhID0gdHJ1ZTtcclxuICAgIHRoaXMuX3Njcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgIHRoaXMuX3Njcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vblNjcm9sbFRvRW5kLCB0aGlzKTtcclxuICAgIHRoaXMuX3Njcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9FbmQsIHRoaXMpO1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNFbmQsIHRoaXMpO1xyXG4gICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9uKFxyXG4gICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgdGhpcy5vblRvdWNoU3RhcnQsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLl9zY3JvbGx2aWV3Lm5vZGUub24oXHJcbiAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsXHJcbiAgICAgIHRoaXMub25Ub3VjaE1vdmUsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLl9zY3JvbGx2aWV3Lm5vZGUub24oXHJcbiAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCxcclxuICAgICAgdGhpcy5vblRvdWNoQ2FuY2VsLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuX2lzV2lkZ2V0KSB7XHJcbiAgICAgIHRoaXMuX3Njcm9sbHZpZXcubm9kZS5vbihcclxuICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsXHJcbiAgICAgICAgdGhpcy5vblNpemVDaGFuZ2UsXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZXN0cm95ID0gdGhpcy5fc2Nyb2xsdmlldy5ub2RlLmdldENvbXBvbmVudChHVmlld0Rlc3RvcnkpO1xyXG4gICAgaWYgKCFkZXN0cm95KSB7XHJcbiAgICAgIGRlc3Ryb3kgPSB0aGlzLl9zY3JvbGx2aWV3Lm5vZGUuYWRkQ29tcG9uZW50KEdWaWV3RGVzdG9yeSk7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95Lm90aGVyRGVzdHJveUNiID0gdGhpcy5kZXN0cm95LmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy8gdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9uKFwiXCIpXHJcbiAgICAvLyBjYy5pbmZvKFwiY29uc3RydWN0b3JcIiwgdGhpcy5tYXNrLndpZHRoLCB0aGlzLm1hc2suaGVpZ2h0LCB0aGlzLnNjcm9sbHZpZXcubm9kZS53aWR0aCwgdGhpcy5zY3JvbGx2aWV3Lm5vZGUuaGVpZ2h0LCB0aGlzLmNvbnRlbnQud2lkdGgsIHRoaXMuY29udGVudC5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uU2l6ZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5zY3JvbGx2aWV3Lm5vZGUud2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLnNjcm9sbHZpZXcubm9kZS5oZWlnaHQ7XHJcbiAgICB0aGlzLm1hc2suc2V0Q29udGVudFNpemUodGhpcy5zY3JvbGx2aWV3Lm5vZGUuZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICBpZiAodGhpcy5fZGF0YXMpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2RhdGFzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TY3JvbGxUb0VuZCgpIHtcclxuICAgIGlmICh0aGlzLl9zY3JvbGxUb0VuZENiKSB7XHJcbiAgICAgIHRoaXMuX3Njcm9sbFRvRW5kQ2IuY2FsbCh0aGlzLl9jYkhvc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZVRpbWVyKCkge1xyXG4gICAgaWYgKHRoaXMuX2NoaWxkTG9uZ1RvdWNoVGltZXIgIT0gLTEpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoVGltZXIgPSAtMTtcclxuICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoRGVsdGFUaW1lID0gMDtcclxuICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoVGltZXMgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydFRpbWVyKCkge1xyXG4gICAgdGhpcy5fY2hpbGRMb25nVG91Y2hEZWx0YVRpbWUgPSAwO1xyXG4gICAgdGhpcy5fY2hpbGRMb25nVG91Y2hUaW1lcyA9IDA7XHJcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCh0aGlzLl90b3VjaENoaWxkTm9kZS5uYW1lLnJlcGxhY2UoXCJpdGVtX1wiLCBcIlwiKSk7XHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaERlbHRhVGltZSArPSAwLjE7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVzID09IDAgJiZcclxuICAgICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaERlbHRhVGltZSA+IHRoaXMuX2NoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lICYmXHJcbiAgICAgICAgdGhpcy5faXNUb3VjaFByZXNzICYmXHJcbiAgICAgICAgdGhpcy5fdG91Y2hDaGlsZE5vZGVcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKGNjLkJ1dHRvbi5jb21BdWRpbykge1xyXG4gICAgICAgICAgQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdChjYy5CdXR0b24uY29tQXVkaW8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaC5jYWxsKFxyXG4gICAgICAgICAgdGhpcy5fY2JIb3N0LFxyXG4gICAgICAgICAgdGhpcy5faXNDYkNsYXNzXHJcbiAgICAgICAgICAgID8gdGhpcy5fdG91Y2hDaGlsZE5vZGUuZ2V0Q29tcG9uZW50KEdDaGlsZClcclxuICAgICAgICAgICAgOiB0aGlzLl90b3VjaENoaWxkTm9kZSxcclxuICAgICAgICAgIHRoaXMuX2l0ZW1zW2luZGV4XS5kYXRhLFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICArK3RoaXMuX2NoaWxkTG9uZ1RvdWNoVGltZXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoRGVsdGFUaW1lID0gMDtcclxuICAgICAgICBpZiAoIXRoaXMuX2NoaWxkTG9uZ1RvdWNoVXBkYXRlVGltZSkge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZVRpbWVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9pc1RvdWNoUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgdGhpcy5fY2hpbGRMb25nVG91Y2hVcGRhdGVUaW1lICYmXHJcbiAgICAgICAgdGhpcy5fY2hpbGRMb25nVG91Y2hUaW1lcyA+IDAgJiZcclxuICAgICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaERlbHRhVGltZSA+IHRoaXMuX2NoaWxkTG9uZ1RvdWNoVXBkYXRlVGltZSAmJlxyXG4gICAgICAgIHRoaXMuX3RvdWNoQ2hpbGROb2RlXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChjYy5CdXR0b24uY29tQXVkaW8pIHtcclxuICAgICAgICAgIEF1ZGlvTWdyLklucygpLnBsYXlFZmZlY3QoY2MuQnV0dG9uLmNvbUF1ZGlvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hpbGRMb25nVG91Y2guY2FsbChcclxuICAgICAgICAgIHRoaXMuX2NiSG9zdCxcclxuICAgICAgICAgIHRoaXMuX2lzQ2JDbGFzc1xyXG4gICAgICAgICAgICA/IHRoaXMuX3RvdWNoQ2hpbGROb2RlLmdldENvbXBvbmVudChHQ2hpbGQpXHJcbiAgICAgICAgICAgIDogdGhpcy5fdG91Y2hDaGlsZE5vZGUsXHJcbiAgICAgICAgICB0aGlzLl9pdGVtc1tpbmRleF0uZGF0YSxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgKyt0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9jaGlsZExvbmdUb3VjaERlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5faXNUb3VjaFByZXNzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgdGhpcy5faXNUb3VjaFByZXNzID0gdHJ1ZTtcclxuICAgIHRoaXMuX3RvdWNoQ2hpbGROb2RlID0gbnVsbDtcclxuICAgIGxldCBsb2NhbCA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICBsZXQgY2hpbGRzID0gdGhpcy5fY29udGVudC5jaGlsZHJlbjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBub2RlID0gY2hpbGRzW2ldO1xyXG4gICAgICBpZiAobm9kZS5hY3RpdmUgJiYgbm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKS5jb250YWlucyhsb2NhbCkpIHtcclxuICAgICAgICB0aGlzLl90b3VjaENoaWxkTm9kZSA9IG5vZGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fY2hpbGRMb25nVG91Y2gpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5fdG91Y2hDaGlsZE5vZGUpIHJldHVybjtcclxuICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgaWYgKGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS5zdWIoZXZlbnQuZ2V0TG9jYXRpb24oKSkubWFnKCkgPCA0KSByZXR1cm47XHJcbiAgICB0aGlzLl9pc1RvdWNoUHJlc3MgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xvc2VUaW1lcigpO1xyXG4gICAgdGhpcy5fdG91Y2hDaGlsZE5vZGUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIHRoaXMuY2xvc2VUaW1lcigpO1xyXG4gICAgaWYgKHRoaXMuX2NoaWxkTG9uZ1RvdWNoVGltZXMgPiAwKSB7XHJcbiAgICAgIHRoaXMuX3RvdWNoQ2hpbGROb2RlID0gbnVsbDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9pc1RvdWNoUHJlc3MpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5fdG91Y2hDaGlsZE5vZGUpIHJldHVybjtcclxuICAgIHRoaXMub25JdGVtVG91Y2hFbmQodGhpcy5fdG91Y2hDaGlsZE5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoQ2FuY2VsKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICB0aGlzLm9uVG91Y0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvLrliLbkuK3mlq3op6bmkbhcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbFRvdWNoRXZlbnQoKSB7XHJcbiAgICB0aGlzLmNsb3NlVGltZXIoKTtcclxuICAgIHRoaXMuX3RvdWNoQ2hpbGROb2RlID0gbnVsbDtcclxuICAgIHRoaXMuX2lzVG91Y2hQcmVzcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5fY2hpbGRMb25nVG91Y2hUaW1lcyA9IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2Nyb2xsaW5nKCkge1xyXG4gICAgaWYgKCF0aGlzLl9pdGVtcyB8fCAhdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9kaXIgPT0gR0xpc3RWaWV3RGlyLlZlcnRpY2FsKSB7XHJcbiAgICAgIGxldCBwb3N5OiBudW1iZXIgPSB0aGlzLl9jb250ZW50Lnk7XHJcbiAgICAgIC8vIGNjLmluZm8oXCJvbnNjcm9sbGluZywgY29udGVudCBwb3N5PVwiLCBwb3N5KTtcclxuICAgICAgaWYgKHBvc3kgPCAoMSAtIHRoaXMubWFzay5hbmNob3JZKSAqIHRoaXMubWFzay5oZWlnaHQpIHtcclxuICAgICAgICBwb3N5ID0gKDEgLSB0aGlzLm1hc2suYW5jaG9yWSkgKiB0aGlzLm1hc2suaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwb3N5ID5cclxuICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ICsgKDEgLSB0aGlzLm1hc2suYW5jaG9yWSkgKiB0aGlzLm1hc2suaGVpZ2h0XHJcbiAgICAgICkge1xyXG4gICAgICAgIHBvc3kgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0ICsgKDEgLSB0aGlzLm1hc2suYW5jaG9yWSkgKiB0aGlzLm1hc2suaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBbc3RhcnQsIHN0b3BdID0gdGhpcy52ZXJ0aWNhbFJhbmdlKHBvc3kpO1xyXG4gICAgICBzdGFydCA9IE1hdGgubWF4KHN0YXJ0LCAwKTtcclxuICAgICAgc3RvcCA9IE1hdGgubWluKHN0b3AsIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpO1xyXG4gICAgICAvLyBjYy5sb2coc3RhcnQgKyAnLCcgKyBzdG9wKTtcclxuICAgICAgaWYgKHN0YXJ0ICE9IHRoaXMuX3N0YXJ0SW5kZXggfHwgc3RvcCAhPSB0aGlzLl9zdG9wSW5kZXgpIHtcclxuICAgICAgICB0aGlzLl9zdGFydEluZGV4ID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5fc3RvcEluZGV4ID0gc3RvcDtcclxuICAgICAgICAvLyBjYy5pbmZvKFwicmVuZGVyX2Zyb206XCIsIHN0YXJ0LCBzdG9wKTtcclxuICAgICAgICB0aGlzLnJlbmRlckl0ZW1zKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBwb3N4OiBudW1iZXIgPSB0aGlzLl9jb250ZW50Lng7XHJcbiAgICAgIGlmIChwb3N4ID4gLXRoaXMuX3dpZHRoIC8gMikge1xyXG4gICAgICAgIHBvc3ggPSAtdGhpcy5fd2lkdGggLyAyO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwb3N4IDwgLXRoaXMuX2NvbnRlbnQud2lkdGggKyB0aGlzLl9oZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgcG9zeCA9IC10aGlzLl9jb250ZW50LndpZHRoICsgdGhpcy5faGVpZ2h0IC8gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IFtzdGFydCwgc3RvcF0gPSB0aGlzLmhvcml6b250YWxSYW5nZShcclxuICAgICAgICBwb3N4LFxyXG4gICAgICAgIHRoaXMuX3dpZHRoLFxyXG4gICAgICAgIHRoaXMuX2l0ZW1XaWR0aCxcclxuICAgICAgICB0aGlzLl9yb3csXHJcbiAgICAgICAgdGhpcy5fZ2FwWFxyXG4gICAgICApO1xyXG4gICAgICBzdGFydCA9IE1hdGgubWF4KHN0YXJ0LCAwKTtcclxuICAgICAgc3RvcCA9IE1hdGgubWluKHN0b3AsIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpO1xyXG4gICAgICAvLyBjYy5sb2coc3RhcnQgKyAnLCcgKyBzdG9wKTtcclxuICAgICAgaWYgKHN0YXJ0ICE9IHRoaXMuX3N0YXJ0SW5kZXggJiYgc3RvcCAhPSB0aGlzLl9zdG9wSW5kZXgpIHtcclxuICAgICAgICB0aGlzLl9zdGFydEluZGV4ID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5fc3RvcEluZGV4ID0gc3RvcDtcclxuICAgICAgICAvLyBjYy5pbmZvKFwicmVuZGVyX2Zyb206XCIsIHN0YXJ0LCBzdG9wKTtcclxuICAgICAgICB0aGlzLnJlbmRlckl0ZW1zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9zY3JvbGxpbmdDYikge1xyXG4gICAgICB0aGlzLl9zY3JvbGxpbmdDYi5jYWxsKHRoaXMuX2NiSG9zdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1Ub3VjaEVuZChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICBpZiAoY2MuQnV0dG9uLmNvbUF1ZGlvKSB7XHJcbiAgICAgIEF1ZGlvTWdyLklucygpLnBsYXlFZmZlY3QoY2MuQnV0dG9uLmNvbUF1ZGlvKTtcclxuICAgIH1cclxuICAgIGxldCBpbmRleCA9IHBhcnNlSW50KG5vZGUubmFtZS5yZXBsYWNlKFwiaXRlbV9cIiwgXCJcIikpO1xyXG4gICAgaWYgKHRoaXMuX2NoaWxkQ2xpY2tDYikge1xyXG4gICAgICB0aGlzLl9jaGlsZENsaWNrQ2IuY2FsbChcclxuICAgICAgICB0aGlzLl9jYkhvc3QsXHJcbiAgICAgICAgdGhpcy5faXNDYkNsYXNzID8gbm9kZS5nZXRDb21wb25lbnQoR0NoaWxkKSA6IG5vZGUsXHJcbiAgICAgICAgdGhpcy5faXRlbXNbaW5kZXhdLmRhdGEsXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5kZXggPT0gdGhpcy5fc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmlubmVyU2VsZWN0SXRlbSh0aGlzLl9zZWxlY3RlZEluZGV4LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlubmVyU2VsZWN0SXRlbShpbmRleCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlubmVyU2VsZWN0SXRlbShpbmRleDogbnVtYmVyLCBpc19zZWxlY3Q6IGJvb2xlYW4pIHtcclxuICAgIGxldCBpdGVtOiBHTGlzdEl0ZW0gPSB0aGlzLl9pdGVtc1tpbmRleF07XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgY2Mud2FybihcclxuICAgICAgICBcImlubmVyX3NlbGVjdF9pdGVtIGluZGV4IGlzIG91dCBvZiByYW5nZXtcIixcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgXCJ9XCIsXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaXRlbS5pc1NlbGVjdCA9IGlzX3NlbGVjdDtcclxuICAgIGlmIChpdGVtLm5vZGUgJiYgdGhpcy5fc2VsZWN0U2V0dGVyKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdFNldHRlci5jYWxsKFxyXG4gICAgICAgIHRoaXMuX2NiSG9zdCxcclxuICAgICAgICB0aGlzLl9pc0NiQ2xhc3MgPyBpdGVtLm5vZGUuZ2V0Q29tcG9uZW50KEdDaGlsZCkgOiBpdGVtLm5vZGUsXHJcbiAgICAgICAgaXRlbS5kYXRhLFxyXG4gICAgICAgIGlzX3NlbGVjdCxcclxuICAgICAgICBpbmRleFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzcGF3bk5vZGUoaW5kZXg6IG51bWJlcik6IGNjLk5vZGUge1xyXG4gICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLl9ub2RlUG9vbC5wb3AoKTtcclxuICAgIGlmICghbm9kZSkge1xyXG4gICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5faXRlbVRwbCk7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5fY29udGVudDtcclxuICAgIH1cclxuICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIG5vZGUubmFtZSA9IFwiaXRlbV9cIiArIGluZGV4O1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlY3ljbGVJdGVtKGl0ZW06IEdMaXN0SXRlbSkge1xyXG4gICAgaWYgKGl0ZW0ubm9kZSAmJiBjYy5pc1ZhbGlkKGl0ZW0ubm9kZSkpIHtcclxuICAgICAgaWYgKHRoaXMuX3JlY3ljbGVDYikge1xyXG4gICAgICAgIHRoaXMuX3JlY3ljbGVDYi5jYWxsKFxyXG4gICAgICAgICAgdGhpcy5fY2JIb3N0LFxyXG4gICAgICAgICAgdGhpcy5faXNDYkNsYXNzID8gaXRlbS5ub2RlLmdldENvbXBvbmVudChHQ2hpbGQpIDogaXRlbS5ub2RlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAoaXRlbS5ub2RlLm5hbWUgPSBcIml0ZW1fbnVsbFwiKSwgKGl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX25vZGVQb29sLnB1c2goaXRlbS5ub2RlKTtcclxuICAgICAgaXRlbS5ub2RlID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJJdGVtcygpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gW107XHJcbiAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5fY29udGVudCkpIHJldHVybjtcclxuICAgIHRoaXMuX2NvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5hY3RpdmUpIHtcclxuICAgICAgICAoaXRlbS5uYW1lID0gXCJpdGVtX251bGxcIiksIChpdGVtLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9ub2RlUG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVySXRlbXMoaXNGb3JjZT86IGJvb2xlYW4pIHtcclxuICAgIGxldCBpdGVtOiBHTGlzdEl0ZW07XHJcblxyXG4gICAgdGhpcy5fY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICghaXRlbS5hY3RpdmUpIHJldHVybjtcclxuICAgICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoaXRlbS5uYW1lLnJlcGxhY2UoXCJpdGVtX1wiLCBcIlwiKSk7XHJcbiAgICAgIGlmIChpbmRleCA8IHRoaXMuX3N0YXJ0SW5kZXggfHwgaW5kZXggPiB0aGlzLl9zdG9wSW5kZXgpIHtcclxuICAgICAgICB0aGlzLnJlY3ljbGVJdGVtKHRoaXMuX2l0ZW1zW2luZGV4XSk7XHJcbiAgICAgICAgLy8gY2MuaW5mbyhcInJlY3ljbGVfaXRlbTpcIiwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLl9zdGFydEluZGV4ID09PSBJTlZBTElEX1ZBTFVFKSByZXR1cm47XHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSB0aGlzLl9zdGFydEluZGV4OyBpIDw9IHRoaXMuX3N0b3BJbmRleDsgaSsrKSB7XHJcbiAgICAgIGl0ZW0gPSB0aGlzLl9pdGVtc1tpXTtcclxuICAgICAgaWYgKCFpdGVtLm5vZGUpIHtcclxuICAgICAgICAvLyBjYy5pbmZvKFwicmVuZGVyX2l0ZW1cIiwgaSk7XHJcbiAgICAgICAgaXRlbS5ub2RlID0gdGhpcy5zcGF3bk5vZGUoaSk7XHJcbiAgICAgICAgdGhpcy5faXRlbVNldHRlci5jYWxsKFxyXG4gICAgICAgICAgdGhpcy5fY2JIb3N0LFxyXG4gICAgICAgICAgdGhpcy5faXNDYkNsYXNzID8gaXRlbS5ub2RlLmdldENvbXBvbmVudChHQ2hpbGQpIDogaXRlbS5ub2RlLFxyXG4gICAgICAgICAgaXRlbS5kYXRhLFxyXG4gICAgICAgICAgaVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlbGVjdFNldHRlcikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9zZWxlY3RTZXR0ZXIuY2FsbCh0aGlzLl9jYkhvc3QsIHRoaXMuX2lzQ2JDbGFzcyA/IGl0ZW0ubm9kZS5nZXRDb21wb25lbnQoR0NoaWxkKSA6IGl0ZW0ubm9kZSwgaXRlbS5kYXRhLCBpdGVtLmlzU2VsZWN0LCBpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzRm9yY2UpIHtcclxuICAgICAgICAgIHRoaXMuX2l0ZW1TZXR0ZXIuY2FsbChcclxuICAgICAgICAgICAgdGhpcy5fY2JIb3N0LFxyXG4gICAgICAgICAgICB0aGlzLl9pc0NiQ2xhc3MgPyBpdGVtLm5vZGUuZ2V0Q29tcG9uZW50KEdDaGlsZCkgOiBpdGVtLm5vZGUsXHJcbiAgICAgICAgICAgIGl0ZW0uZGF0YSxcclxuICAgICAgICAgICAgaVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8vIGlmICh0aGlzLl9zZWxlY3RTZXR0ZXIpIHtcclxuICAgICAgICAgIC8vICAgICB0aGlzLl9zZWxlY3RTZXR0ZXIuY2FsbCh0aGlzLl9jYkhvc3QsIHRoaXMuX2lzQ2JDbGFzcyA/IGl0ZW0ubm9kZS5nZXRDb21wb25lbnQoR0NoaWxkKSA6IGl0ZW0ubm9kZSwgaXRlbS5kYXRhLCBpdGVtLmlzU2VsZWN0LCBpKTtcclxuICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaXRlbS5ub2RlLnNldFBvc2l0aW9uKGl0ZW0ueCwgaXRlbS55KTtcclxuICAgICAgLy8gY29uc29sZS5sb2coaXRlbS54LCBpdGVtLm5vZGUucG9zaXRpb24pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2MubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT5cIiArIHRoaXMuX2NvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYWNrSXRlbShkYXRhOiBhbnkpOiBHTGlzdEl0ZW0ge1xyXG4gICAgcmV0dXJuIHsgeDogMCwgeTogMCwgZGF0YTogZGF0YSwgbm9kZTogbnVsbCwgaXNTZWxlY3Q6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxheW91dEl0ZW1zKHN0YXJ0OiBudW1iZXIpIHtcclxuICAgIC8vIGNjLmluZm8oXCJsYXlvdXRfaXRlbXMsIHN0YXJ0PVwiLCBzdGFydCk7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHN0YXJ0LCBzdG9wOiBudW1iZXIgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4IDwgc3RvcDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBpdGVtOiBHTGlzdEl0ZW0gPSB0aGlzLl9pdGVtc1tpbmRleF07XHJcbiAgICAgIGlmICh0aGlzLl9kaXIgPT0gR0xpc3RWaWV3RGlyLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgW2l0ZW0ueCwgaXRlbS55XSA9IHRoaXMudmVydGljYWxMYXlvdXQoaW5kZXgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFtpdGVtLngsIGl0ZW0ueV0gPSB0aGlzLmhvcml6b250YWxMYXlvdXQoaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2l6ZUNvbnRlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhpcy5fY29udGVudC53aWR0aCA9IDA7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQuaGVpZ2h0ID0gMDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGxhc3RfaXRlbTogR0xpc3RJdGVtID0gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICBpZiAodGhpcy5fZGlyID09IEdMaXN0Vmlld0Rpci5WZXJ0aWNhbCkge1xyXG4gICAgICB0aGlzLl9jb250ZW50LmhlaWdodCA9IE1hdGgubWF4KFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5faXRlbUhlaWdodCAqICgxIC0gdGhpcy5faXRlbUFuY2hvclkpIC0gbGFzdF9pdGVtLnlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSBNYXRoLm1heCgwLCBsYXN0X2l0ZW0ueCArIHRoaXMuX2l0ZW1XaWR0aCAvIDIpO1xyXG4gICAgfVxyXG4gICAgLy8gY2MuaW5mbyhcInJlc2l6ZV9jb250ZW50XCIsIHRoaXMubWFzay53aWR0aCwgdGhpcy5tYXNrLmhlaWdodCwgdGhpcy5zY3JvbGx2aWV3Lm5vZGUud2lkdGgsIHRoaXMuc2Nyb2xsdmlldy5ub2RlLmhlaWdodCwgdGhpcy5jb250ZW50LndpZHRoLCB0aGlzLmNvbnRlbnQuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jbGVhckl0ZW1zKCk7XHJcbiAgICB0aGlzLl9ub2RlUG9vbC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIGlmIChjYy5pc1ZhbGlkKG5vZGUpKSBub2RlLmRlc3Ryb3koKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fbm9kZVBvb2wgPSBudWxsO1xyXG4gICAgdGhpcy5faXRlbXMgPSBudWxsO1xyXG4gICAgdGhpcy5fZGF0YXMgPSBudWxsO1xyXG5cclxuICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX3Njcm9sbHZpZXcubm9kZSkpIHtcclxuICAgICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9mZihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vblNjcm9sbFRvRW5kLCB0aGlzKTtcclxuICAgICAgdGhpcy5fc2Nyb2xsdmlldy5ub2RlLm9mZihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9FbmQsIHRoaXMpO1xyXG4gICAgICB0aGlzLl9zY3JvbGx2aWV3Lm5vZGVbXCJfbGlzdFwiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZlcnRpY2FsTGF5b3V0KGluZGV4OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCB4OiBudW1iZXIgPVxyXG4gICAgICB0aGlzLl9wYWRpbmdYICtcclxuICAgICAgKGluZGV4ICUgdGhpcy5fY29sKSAqICh0aGlzLl9pdGVtV2lkdGggKyB0aGlzLl9nYXBYKSArXHJcbiAgICAgIHRoaXMuX2l0ZW1XaWR0aCAqIHRoaXMuX2l0ZW1BbmNob3JYO1xyXG4gICAgbGV0IHk6IG51bWJlciA9XHJcbiAgICAgIC1NYXRoLmZsb29yKGluZGV4IC8gdGhpcy5fY29sKSAqICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5fZ2FwWSkgLVxyXG4gICAgICB0aGlzLl9pdGVtSGVpZ2h0ICogKDEgLSB0aGlzLl9pdGVtQW5jaG9yWSkgLVxyXG4gICAgICB0aGlzLl9wYWRpbmdZO1xyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmVydGljYWxSYW5nZSh5OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCB0X29mZnNldCA9XHJcbiAgICAgIHkgLVxyXG4gICAgICAoMSAtIHRoaXMubWFzay5hbmNob3JZKSAqIHRoaXMubWFzay5oZWlnaHQgK1xyXG4gICAgICAoMSAtIHRoaXMuX2l0ZW1BbmNob3JZKSAqIHRoaXMuX2l0ZW1IZWlnaHQgK1xyXG4gICAgICB0aGlzLl9wYWRpbmdZO1xyXG4gICAgbGV0IHRfbGFzdCA9IE1hdGguZmxvb3IodF9vZmZzZXQgLyAodGhpcy5faXRlbUhlaWdodCArIHRoaXMuX2dhcFkpKTtcclxuICAgIGxldCBiX2ZyaXN0ID0gTWF0aC5jZWlsKFxyXG4gICAgICAodF9vZmZzZXQgKyB0aGlzLm1hc2suaGVpZ2h0ICsgdGhpcy5fZ2FwWSkgL1xyXG4gICAgICAgICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5fZ2FwWSlcclxuICAgICk7XHJcbiAgICByZXR1cm4gWyh0X2xhc3QgLSAxKSAqIHRoaXMuX2NvbCwgYl9mcmlzdCAqIHRoaXMuX2NvbF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhvcml6b250YWxMYXlvdXQoaW5kZXg6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IHg6IG51bWJlciA9XHJcbiAgICAgIE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLl9yb3cpICogKHRoaXMuX2l0ZW1XaWR0aCArIHRoaXMuX2dhcFgpICtcclxuICAgICAgdGhpcy5faXRlbVdpZHRoICogdGhpcy5faXRlbUFuY2hvclg7XHJcbiAgICBsZXQgeTogbnVtYmVyID1cclxuICAgICAgLShpbmRleCAlIHRoaXMuX3JvdykgKiAodGhpcy5faXRlbUhlaWdodCArIHRoaXMuX2dhcFkpIC1cclxuICAgICAgdGhpcy5faXRlbUhlaWdodCAvIDI7XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBob3Jpem9udGFsUmFuZ2UoXHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaXRlbV93aWR0aDogbnVtYmVyLFxyXG4gICAgcm93OiBudW1iZXIgPSAxLFxyXG4gICAgZ2FwX3g6IG51bWJlciA9IDBcclxuICApOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCB0X29mZnNldCA9IC0oeCArIHdpZHRoIC8gMik7XHJcbiAgICBsZXQgdF9sYXN0ID0gTWF0aC5jZWlsKHRfb2Zmc2V0IC8gKGl0ZW1fd2lkdGggKyBnYXBfeCkpO1xyXG4gICAgbGV0IGJfZnJpc3QgPSBNYXRoLmNlaWwoKHRfb2Zmc2V0ICsgd2lkdGgpIC8gKGl0ZW1fd2lkdGggKyBnYXBfeCkpO1xyXG4gICAgbGV0IHN0b3AgPSAoYl9mcmlzdCArIDEpICogcm93IC0gMTtcclxuICAgIHN0b3AgPSBzdG9wID09PSB0aGlzLl9zdG9wSW5kZXggPyB0aGlzLl9zdG9wSW5kZXggKyAxIDogc3RvcDtcclxuICAgIHJldHVybiBbKHRfbGFzdCAtIDEpICogcm93LCBzdG9wXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YXMoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFzIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZERhdGEoKTogYW55IHtcclxuICAgIGxldCBpdGVtOiBHTGlzdEl0ZW0gPSB0aGlzLl9pdGVtc1t0aGlzLl9zZWxlY3RlZEluZGV4XTtcclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLmRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREYXRhKGRhdGFzOiBhbnlbXSkge1xyXG4gICAgdGhpcy5jbGVhckl0ZW1zKCk7XHJcbiAgICB0aGlzLl9kYXRhcyA9IGRhdGFzO1xyXG4gICAgZGF0YXMuZm9yRWFjaCgoZGF0YSkgPT4ge1xyXG4gICAgICB0aGlzLl9pdGVtcy5wdXNoKHRoaXMucGFja0l0ZW0oZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmxheW91dEl0ZW1zKDApO1xyXG4gICAgdGhpcy5yZXNpemVDb250ZW50KCk7XHJcbiAgICB0aGlzLl9zdGFydEluZGV4ID0gLTE7XHJcbiAgICB0aGlzLl9zdG9wSW5kZXggPSAtMTtcclxuICAgIGlmICh0aGlzLl9kaXIgPT0gR0xpc3RWaWV3RGlyLlZlcnRpY2FsKSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQueSA9IHRoaXMuX2hlaWdodCAqICgxIC0gdGhpcy5fbWFzay5hbmNob3JZKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQueCA9IHRoaXMuX3dpZHRoICogKHRoaXMuX21hc2suYW5jaG9yWCAtIDEpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5vblNjcm9sbGluZygpO1xyXG4gICAgfVxyXG4gICAgLy8g6YeN572uU2Nyb2xsQmFyXHJcbiAgICB0aGlzLl9zY3JvbGx2aWV3W1wiX2NhbGN1bGF0ZUJvdW5kYXJ5XCJdKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJ5R2V0SXRlbUJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5fc3RhcnRJbmRleCB8fCBpbmRleCA+IHRoaXMuX3N0b3BJbmRleCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaW5kZXhdO1xyXG4gICAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX2lzQ2JDbGFzcyA/IGl0ZW0ubm9kZS5nZXRDb21wb25lbnQoR0NoaWxkKSA6IGl0ZW0ubm9kZVxyXG4gICAgKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVmcmVzaERhdGEoZGF0YXM/OiBhbnlbXSkge1xyXG4gICAgaWYgKGRhdGFzKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJJdGVtcygpO1xyXG4gICAgICB0aGlzLl9kYXRhcyA9IGRhdGFzO1xyXG4gICAgICBkYXRhcy5mb3JFYWNoKChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh0aGlzLnBhY2tJdGVtKGRhdGEpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubGF5b3V0SXRlbXMoMCk7XHJcbiAgICAgIHRoaXMucmVzaXplQ29udGVudCgpO1xyXG4gICAgICB0aGlzLnJlbmRlckl0ZW1zKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuX2RhdGFzKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJJdGVtcyh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluc2VydERhdGEoaW5kZXg6IG51bWJlciwgLi4uZGF0YXM6IGFueVtdKSB7XHJcbiAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwibm90aGluZyB0byBpbnNlcnRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5faXRlbXMpIHtcclxuICAgICAgdGhpcy5faXRlbXMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fZGF0YXMpIHtcclxuICAgICAgdGhpcy5fZGF0YXMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgY2Mud2FybihcImludmFsaWQgaW5kZXhcIiwgaW5kZXgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgaXNfYXBwZW5kOiBib29sZWFuID0gaW5kZXggPT0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG4gICAgbGV0IGl0ZW1zOiBHTGlzdEl0ZW1bXSA9IFtdO1xyXG4gICAgZGF0YXMuZm9yRWFjaCgoZGF0YSkgPT4ge1xyXG4gICAgICBpdGVtcy5wdXNoKHRoaXMucGFja0l0ZW0oZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9kYXRhcy5zcGxpY2UoaW5kZXgsIDAsIC4uLmRhdGFzKTtcclxuICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgLi4uaXRlbXMpO1xyXG4gICAgdGhpcy5sYXlvdXRJdGVtcyhpbmRleCk7XHJcbiAgICB0aGlzLnJlc2l6ZUNvbnRlbnQoKTtcclxuICAgIHRoaXMuX3N0YXJ0SW5kZXggPSAtMTtcclxuICAgIHRoaXMuX3N0b3BJbmRleCA9IC0xO1xyXG5cclxuICAgIGlmICh0aGlzLl9hdXRvU2Nyb2xsaW5nICYmIGlzX2FwcGVuZCkge1xyXG4gICAgICB0aGlzLnNjcm9sbFRvRW5kKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uU2Nyb2xsaW5nKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRGF0YShpbmRleDogbnVtYmVyLCBjb3VudDogbnVtYmVyID0gMSkge1xyXG4gICAgaWYgKCF0aGlzLl9pdGVtcykge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCJjYWxsIHNldF9kYXRhIGJlZm9yZSBjYWxsIHRoaXMgbWV0aG9kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBjYy53YXJuKFwiaW52YWxpZCBpbmRleFwiLCBpbmRleCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChjb3VudCA8IDEpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwibm90aGluZyB0byByZW1vdmVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBvbGRfbGVuZ3RoOiBudW1iZXIgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcbiAgICBsZXQgZGVsX2l0ZW1zOiBHTGlzdEl0ZW1bXSA9IHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgY291bnQpO1xyXG4gICAgdGhpcy5fZGF0YXMuc3BsaWNlKGluZGV4LCBjb3VudCk7XHJcbiAgICAvL+WbnuaUtm5vZGVcclxuICAgIGRlbF9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMucmVjeWNsZUl0ZW0oaXRlbSk7XHJcbiAgICB9KTtcclxuICAgIC8vIOWkhOeQhuiKgueCueS4reaXp+eahOWQjeensFxyXG4gICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IG9sZF9sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgY2hpbGQgPSB0aGlzLl9jb250ZW50LmdldENoaWxkQnlOYW1lKFwiaXRlbV9cIiArIGkpO1xyXG4gICAgICBpZiAoY2hpbGQpIGNoaWxkLm5hbWUgPSBcIml0ZW1fXCIgKyAoaSAtIGNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mHjeaWsOaOkuW6j2luZGV45ZCO6Z2i55qEXHJcbiAgICBpZiAoaW5kZXggKyBjb3VudCA8IG9sZF9sZW5ndGgpIHtcclxuICAgICAgdGhpcy5sYXlvdXRJdGVtcyhpbmRleCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc2l6ZUNvbnRlbnQoKTtcclxuICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0SW5kZXggPSAtMTtcclxuICAgICAgdGhpcy5fc3RvcEluZGV4ID0gLTE7XHJcbiAgICAgIHRoaXMub25TY3JvbGxpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBlbmREYXRhKC4uLmRhdGFzOiBhbnlbXSkge1xyXG4gICAgaWYgKCF0aGlzLl9pdGVtcykge1xyXG4gICAgICB0aGlzLl9pdGVtcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnNlcnREYXRhKHRoaXMuX2l0ZW1zLmxlbmd0aCwgLi4uZGF0YXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvKGluZGV4OiBudW1iZXIsIHNjcm9sbFRpbWUgPSAwKSB7XHJcbiAgICB0aGlzLl9zY3JvbGx2aWV3LnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICBpZiAodGhpcy5fZGlyID09IEdMaXN0Vmlld0Rpci5WZXJ0aWNhbCkge1xyXG4gICAgICBsZXQgbWF4T2Zmc2V0ID0gdGhpcy5fc2Nyb2xsdmlldy5nZXRNYXhTY3JvbGxPZmZzZXQoKTtcclxuICAgICAgaWYgKG1heE9mZnNldC55IDw9IDApIHtcclxuICAgICAgICBjYy5sb2coXCJubyBuZWVkIHRvIHNjcm9sbFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbGV0IFtfLCB5XSA9IHRoaXMudmVydGljYWxMYXlvdXQoaW5kZXgpO1xyXG4gICAgICB5ID0gLSh5ICsgdGhpcy5faXRlbUhlaWdodCAqICgxIC0gdGhpcy5faXRlbUFuY2hvclkpICsgdGhpcy5fcGFkaW5nWSk7XHJcbiAgICAgIGlmICh5ID4gbWF4T2Zmc2V0LnkpIHtcclxuICAgICAgICB5ID0gbWF4T2Zmc2V0Lnk7XHJcbiAgICAgICAgY2MubG9nKFwiY29udGVudCByZWFjaCBib3R0b21cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHkgPCAwKSB7XHJcbiAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgY2MubG9nKFwiY29udGVudCByZWFjaCB0b3BcIik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc2Nyb2xsdmlldy5zY3JvbGxUb09mZnNldChjYy52MigwLCB5KSwgc2Nyb2xsVGltZSk7XHJcbiAgICAgIGlmICghc2Nyb2xsVGltZSkgdGhpcy5vblNjcm9sbGluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IG1heE9mZnNldCA9IHRoaXMuX3Njcm9sbHZpZXcuZ2V0TWF4U2Nyb2xsT2Zmc2V0KCk7XHJcbiAgICAgIGlmIChtYXhPZmZzZXQueCA8PSAwKSB7XHJcbiAgICAgICAgY2MubG9nKFwibm8gbmVlZCB0byBzY3JvbGxcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBbeCwgX10gPSB0aGlzLmhvcml6b250YWxMYXlvdXQoaW5kZXgpO1xyXG4gICAgICB4ICs9IHRoaXMuX3BhZGluZ1g7XHJcbiAgICAgIGlmICh4ID4gbWF4T2Zmc2V0LngpIHtcclxuICAgICAgICB4ID0gbWF4T2Zmc2V0Lng7XHJcbiAgICAgICAgY2MubG9nKFwiY29udGVudCByZWFjaCByaWdodFwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICB4ID0gMDtcclxuICAgICAgICBjYy5sb2coXCJjb250ZW50IHJlYWNoIGxlZnRcIik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc2Nyb2xsdmlldy5zY3JvbGxUb09mZnNldChjYy52Mih4LCB0aGlzLl9jb250ZW50LnkpLCBzY3JvbGxUaW1lKTtcclxuICAgICAgaWYgKCFzY3JvbGxUaW1lKSB0aGlzLm9uU2Nyb2xsaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2Nyb2xsVG9FbmQoKSB7XHJcbiAgICBpZiAodGhpcy5fZGlyID09IEdMaXN0Vmlld0Rpci5WZXJ0aWNhbCkge1xyXG4gICAgICB0aGlzLl9zY3JvbGx2aWV3LnNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zY3JvbGx2aWV3LnNjcm9sbFRvUmlnaHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWZyZXNoSXRlbShpbmRleDogbnVtYmVyLCBkYXRhOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5faXRlbXMpIHtcclxuICAgICAgY2MubG9nKFwiY2FsbCBzZXRfZGF0YSBiZWZvcmUgY2FsbCB0aGlzIG1ldGhvZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgY2Mud2FybihcImludmFsaWQgaW5kZXhcIiwgaW5kZXgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgaXRlbTogR0xpc3RJdGVtID0gdGhpcy5faXRlbXNbaW5kZXhdO1xyXG4gICAgaXRlbS5kYXRhID0gZGF0YTtcclxuICAgIHRoaXMuX2RhdGFzW2luZGV4XSA9IGRhdGE7XHJcbiAgICBpZiAoaXRlbS5ub2RlKSB7XHJcbiAgICAgIGlmICh0aGlzLl9yZWN5Y2xlQ2IpIHtcclxuICAgICAgICB0aGlzLl9yZWN5Y2xlQ2IuY2FsbCh0aGlzLl9jYkhvc3QsIGl0ZW0ubm9kZS5nZXRDb21wb25lbnQoR0NoaWxkKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5faXRlbVNldHRlci5jYWxsKFxyXG4gICAgICAgIHRoaXMuX2NiSG9zdCxcclxuICAgICAgICBpdGVtLm5vZGUuZ2V0Q29tcG9uZW50KEdDaGlsZCksXHJcbiAgICAgICAgaXRlbS5kYXRhLFxyXG4gICAgICAgIGluZGV4XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVMYXlPdXQocGFyYW1zOiB7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxuICAgIGdhcFg/OiBudW1iZXI7XHJcbiAgICBnYXBZPzogbnVtYmVyO1xyXG4gICAgcGFkaW5nWD86IG51bWJlcjtcclxuICAgIHBhZGluZ1k/OiBudW1iZXI7XHJcbiAgICByb3c/OiBudW1iZXI7XHJcbiAgICBjb2x1bW4/OiBudW1iZXI7XHJcbiAgfSkge1xyXG4gICAgdGhpcy5fd2lkdGggPSBwYXJhbXMud2lkdGggIT0gbnVsbCA/IHBhcmFtcy53aWR0aCA6IHRoaXMuX3dpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gcGFyYW1zLmhlaWdodCAhPSBudWxsID8gcGFyYW1zLmhlaWdodCA6IHRoaXMuX2hlaWdodDtcclxuICAgIHRoaXMuX2dhcFggPSBwYXJhbXMuZ2FwWCAhPSBudWxsID8gcGFyYW1zLmdhcFggOiB0aGlzLl9nYXBYO1xyXG4gICAgdGhpcy5fZ2FwWSA9IHBhcmFtcy5nYXBZICE9IG51bGwgPyBwYXJhbXMuZ2FwWSA6IHRoaXMuX2dhcFk7XHJcbiAgICB0aGlzLl9wYWRpbmdYID0gcGFyYW1zLnBhZGluZ1ggIT0gbnVsbCA/IHBhcmFtcy5wYWRpbmdYIDogdGhpcy5fcGFkaW5nWDtcclxuICAgIHRoaXMuX3BhZGluZ1kgPSBwYXJhbXMucGFkaW5nWSAhPSBudWxsID8gcGFyYW1zLnBhZGluZ1kgOiB0aGlzLl9wYWRpbmdZO1xyXG4gICAgdGhpcy5fcm93ID0gcGFyYW1zLnJvdyAhPSBudWxsID8gcGFyYW1zLnJvdyA6IHRoaXMuX3JvdztcclxuICAgIHRoaXMuX2NvbCA9IHBhcmFtcy5jb2x1bW4gIT0gbnVsbCA/IHBhcmFtcy5jb2x1bW4gOiB0aGlzLl9jb2w7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RpciA9PSBHTGlzdFZpZXdEaXIuSG9yaXpvbnRhbCkge1xyXG4gICAgICBsZXQgcmVhbF93aWR0aDogbnVtYmVyID1cclxuICAgICAgICAodGhpcy5faXRlbVdpZHRoICsgdGhpcy5fZ2FwWCkgKiB0aGlzLl9jb2wgLSB0aGlzLl9nYXBYO1xyXG4gICAgICBpZiAocmVhbF93aWR0aCA+IHRoaXMuX3dpZHRoKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFxyXG4gICAgICAgICAgXCJyZWFsIHdpZHRoID4gd2lkdGgsIHJlc2l6ZSBzY3JvbGx2aWV3IHRvIHJlYWx3aWR0aCxcIixcclxuICAgICAgICAgIHRoaXMuX3dpZHRoLFxyXG4gICAgICAgICAgXCItPlwiLFxyXG4gICAgICAgICAgcmVhbF93aWR0aFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSByZWFsX3dpZHRoO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSB0aGlzLl93aWR0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCByZWFsX2hlaWdodDogbnVtYmVyID1cclxuICAgICAgICAodGhpcy5faXRlbUhlaWdodCArIHRoaXMuX2dhcFkpICogdGhpcy5fcm93IC0gdGhpcy5fZ2FwWTtcclxuICAgICAgaWYgKHJlYWxfaGVpZ2h0ID4gdGhpcy5faGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFxyXG4gICAgICAgICAgXCJyZWFsIGhlaWdodCA+IGhlaWdodCwgcmVzaXplIHNjcm9sbHZpZXcgdG8gcmVhbGhlaWdodCxcIixcclxuICAgICAgICAgIHRoaXMuX2hlaWdodCxcclxuICAgICAgICAgIFwiLT5cIixcclxuICAgICAgICAgIHJlYWxfaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSByZWFsX2hlaWdodDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9jb250ZW50LmhlaWdodCA9IHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxuICAgIHRoaXMuX21hc2suc2V0Q29udGVudFNpemUodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XHJcbiAgICB0aGlzLl9zY3JvbGx2aWV3Lm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph43mlrDovb3lhaVsaXN0Vmlld+WPguaVsFxyXG4gICAqIEBwYXJhbSBwYXJhbXMgTGlzdFZpZXflj4LmlbBcclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXRQYXJhbXMocGFyYW1zOiBHTGlzdFZpZXdQYXJhbXMpIHtcclxuICAgIHRoaXMuY2xlYXJJdGVtcygpO1xyXG4gICAgdGhpcy5fbm9kZVBvb2wuZm9yRWFjaCgoZSkgPT4gZS5kZXN0cm95KCkpO1xyXG4gICAgdGhpcy5fbm9kZVBvb2wubGVuZ3RoID0gMDtcclxuICAgIGlmICh0aGlzLl9pdGVtVHBsKSB0aGlzLl9pdGVtVHBsLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuX2RhdGFzID0gW107XHJcbiAgICB0aGlzLl9pdGVtVHBsID0gcGFyYW1zLml0ZW1UcGw7XHJcbiAgICB0aGlzLl9pdGVtVHBsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5faXRlbVdpZHRoID0gdGhpcy5faXRlbVRwbC53aWR0aDtcclxuICAgIHRoaXMuX2l0ZW1IZWlnaHQgPSB0aGlzLl9pdGVtVHBsLmhlaWdodDtcclxuICAgIHRoaXMuX2l0ZW1BbmNob3JYID0gdGhpcy5faXRlbVRwbC5hbmNob3JYO1xyXG4gICAgdGhpcy5faXRlbUFuY2hvclkgPSB0aGlzLl9pdGVtVHBsLmFuY2hvclk7XHJcbiAgICB0aGlzLnJlTGF5T3V0KHBhcmFtcyk7XHJcbiAgICB0aGlzLl9jYkhvc3QgPSBwYXJhbXMuY2JIb3N0IHx8IHRoaXMuX2NiSG9zdDtcclxuICAgIHRoaXMuX2l0ZW1TZXR0ZXIgPSBwYXJhbXMuaXRlbVNldHRlciB8fCB0aGlzLl9pdGVtU2V0dGVyO1xyXG4gICAgdGhpcy5fcmVjeWNsZUNiID0gcGFyYW1zLnJlY3ljbGVDYiB8fCB0aGlzLl9yZWN5Y2xlQ2I7XHJcbiAgICB0aGlzLl9zZWxlY3RTZXR0ZXIgPSBwYXJhbXMuc2VsZWN0U2V0dGVyIHx8IHRoaXMuX3NlbGVjdFNldHRlcjtcclxuICAgIHRoaXMuX3Njcm9sbFRvRW5kQ2IgPSBwYXJhbXMuc2Nyb2xsVG9FbmRDYiB8fCB0aGlzLl9zY3JvbGxUb0VuZENiO1xyXG4gICAgdGhpcy5fY2hpbGRDbGlja0NiID0gcGFyYW1zLmNoaWxkQ2xpY2sgfHwgdGhpcy5fY2hpbGRDbGlja0NiO1xyXG4gICAgdGhpcy5fYXV0b1Njcm9sbGluZyA9IHBhcmFtcy5hdXRvU2Nyb2xsaW5nIHx8IHRoaXMuX2F1dG9TY3JvbGxpbmc7XHJcbiAgICB0aGlzLl9pc0NiQ2xhc3MgPSBwYXJhbXMuaXNDYkNsYXNzIHx8ICEhdGhpcy5faXNDYkNsYXNzO1xyXG4gICAgdGhpcy5faXNXaWRnZXQgPSBwYXJhbXMuaXNXaWRnZXQgfHwgdGhpcy5faXNXaWRnZXQ7XHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaCA9IHBhcmFtcy5jaGlsZExvbmdUb3VjaCB8fCB0aGlzLl9jaGlsZExvbmdUb3VjaDtcclxuICAgIHRoaXMuX2NoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lID1cclxuICAgICAgcGFyYW1zLmNoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lIHx8IHRoaXMuX2NoaWxkTG9uZ1RvdWNoRnJpc3RUaW1lO1xyXG4gICAgdGhpcy5fY2hpbGRMb25nVG91Y2hVcGRhdGVUaW1lID1cclxuICAgICAgcGFyYW1zLmNoaWxkTG9uZ1RvdWNoVXBkYXRlVGltZSB8fCB0aGlzLl9jaGlsZExvbmdUb3VjaFVwZGF0ZVRpbWU7XHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVyID0gLTE7XHJcbiAgICB0aGlzLl9jaGlsZExvbmdUb3VjaFRpbWVzID0gMDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdMaXN0Vmlld0RpciB7XHJcbiAgVmVydGljYWwgPSAxLCAvLyDlnoLnm7RcclxuICBIb3Jpem9udGFsID0gMiwgLy8g5rC05bmzXHJcbn1cclxuIl19