"use strict";
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