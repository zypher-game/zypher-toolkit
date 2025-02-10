"use strict";
cc._RF.push(module, '84ab61qaCZFAbL8CP3Eh38c', 'GScrollView');
// Script/Core/GView/GScrollView.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollDirection = exports.GScrollView = void 0;
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GViewDestory_1 = require("./GViewDestory");
var offsetY = 70; //显示范围往下延伸的距离
var GScrollView = /** @class */ (function () {
    function GScrollView(params) {
        this.dynamicSize = false;
        this.wdRender = null;
        this.scrollview = params.scrollview;
        this.mask = params.mask;
        this.content = params.content;
        this.wdRender = this.content.getComponent(cc.Component);
        this.node_pools = new ES5Ex_1.MapWrap();
        this.item_templates = params.item_templates;
        this.tpl_select = params.tpl_select;
        this.item_templates.forEach(function (tpl) {
            tpl.active = false;
        });
        this.dir = params.direction || ScrollDirection.Vertical;
        this.width = params.width || this.mask.width;
        this.height = params.height || this.mask.height;
        this.gap_x = params.gap_x || 0;
        this.gap_y = params.gap_y || 0;
        this.cb_host = params.cb_host;
        this.item_setter = params.item_setter;
        this.recycle_cb = params.recycle_cb;
        this.scroll_to_end_cb = params.scroll_to_end_cb;
        this.scroll_to_top = params.scroll_to_top;
        this.auto_scrolling = params.auto_scrolling || false;
        this.dynamicSize = params.dynamicSize || false;
        if (this.dir == ScrollDirection.Vertical) {
            this.content.width = this.width;
        }
        else {
            this.content.height = this.height;
        }
        this.scrollview.vertical = this.dir == ScrollDirection.Vertical;
        this.scrollview.horizontal = this.dir == ScrollDirection.Horizontal;
        this.scrollview.inertia = true;
        this.scrollview.node.on("scrolling", this.on_scrolling, this);
        this.scrollview.node.on("scroll-to-bottom", this.on_scroll_to_end, this);
        this.scrollview.node.on("scroll-to-right", this.on_scroll_to_end, this);
        this.scrollview.node.on("scroll-to-top", this.on_scroll_to_top, this);
        if (params.isWidget) {
            this.scrollview.node.on(cc.Node.EventType.SIZE_CHANGED, this.on_size_change, this);
        }
        var destroy = this.scrollview.node.getComponent(GViewDestory_1.default);
        if (!destroy) {
            destroy = this.scrollview.node.addComponent(GViewDestory_1.default);
        }
        destroy.otherDestroyCb = this.destroy.bind(this);
    }
    Object.defineProperty(GScrollView.prototype, "dataSize", {
        get: function () {
            if (!this.items)
                return 0;
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    GScrollView.prototype.getItems = function () {
        return this.items || [];
    };
    GScrollView.prototype.on_scroll_to_end = function () {
        if (this.scroll_to_end_cb) {
            this.scroll_to_end_cb.call(this.cb_host);
        }
    };
    GScrollView.prototype.on_scroll_to_top = function () {
        if (this.scroll_to_top) {
            this.scroll_to_top.call(this.cb_host);
        }
    };
    GScrollView.prototype.on_size_change = function () {
        this.width = this.scrollview.node.width;
        this.height = this.scrollview.node.height;
        this.mask.setContentSize(this.scrollview.node.getContentSize());
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.dir == ScrollDirection.Vertical) {
            this.content.y = this.mask.height * (1 - this.mask.anchorY);
        }
        else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    };
    GScrollView.prototype.on_scrolling = function () {
        if (!this.items || !this.items.length) {
            return;
        }
        if (this.dir == ScrollDirection.Vertical) {
            var posy = this.content.y;
            // cc.info("onscrolling, content posy=", posy);
            if (posy < (1 - this.mask.anchorY) * this.mask.height) {
                posy = (1 - this.mask.anchorY) * this.mask.height;
            }
            if (posy > this.content.height + (1 - this.mask.anchorY) * this.mask.height) {
                posy = this.content.height + (1 - this.mask.anchorY) * this.mask.height;
            }
            // console.log(posy);
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = (this.height * (1 - this.mask.anchorY)) - posy;
            var viewport_stop = viewport_start - this.height;
            while (this.items[start].y - this.items[start].anchorY * this.items[start].height > viewport_start) {
                start++;
                if (!this.items[start])
                    break;
            }
            while (this.items[stop].y + (1 - this.items[stop].anchorY) * this.items[stop].height < viewport_stop) {
                stop--;
                if (!this.items[stop])
                    break;
            }
            // cc.warn('show item:', start, stop);
            if (start != this.start_index || stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                // cc.warn("render_from:", start, stop);
                this.render_items();
            }
            else {
                // cc.warn("unchange: render_from:", start, stop);
            }
        }
        else {
            var posx = this.content.x;
            // cc.info("onscrolling, content posx=", posx);
            if (posx > 0) {
                posx = 0;
            }
            if (posx < this.width - this.content.width) {
                posx = this.width - this.content.width;
            }
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = -posx;
            var viewport_stop = viewport_start + this.width;
            while (this.items[start].x + this.items[start].width < viewport_start) {
                start++;
            }
            while (this.items[stop].x > viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                // cc.info("render_from:", start, stop);
                this.render_items();
            }
        }
    };
    GScrollView.prototype.spawn_node = function (index, data) {
        var node;
        var tplIndex = this.tpl_select.call(this.cb_host, data ? data : this.items[index].data, index);
        var pools = this.node_pools.get(tplIndex);
        if (pools && pools.length > 0) {
            node = pools.pop();
        }
        else {
            node = cc.instantiate(this.item_templates[tplIndex]);
            node.parent = this.content;
        }
        node.name = 'tpl_' + tplIndex + '_' + index;
        node.active = true;
        return node;
    };
    GScrollView.prototype.recycle_item = function (item) {
        if (item.node) {
            var pools = this.node_pools.get(item.data.key);
            if (!pools) {
                pools = [];
                this.node_pools.set(item.data.key, pools);
            }
            pools.push(item.node);
            if (this.recycle_cb) {
                this.recycle_cb.call(this.cb_host, item.node, item.data.key);
            }
            // item.node.removeFromParent();
            item.node.name = 'recycle';
            item.node.active = false;
            item.node = null;
        }
    };
    GScrollView.prototype.clear_items = function () {
        var _this = this;
        if (this.items) {
            this.items.forEach(function (item) {
                _this.recycle_item(item);
            });
        }
    };
    GScrollView.prototype.render_items = function () {
        var item;
        for (var i = 0; i < this.start_index; i++) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.items.length - 1; i > this.stop_index; i--) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.start_index; i <= this.stop_index; i++) {
            item = this.items[i];
            if (!item)
                continue;
            if (!item.node) {
                // cc.info("render_item", i);
                item.node = this.spawn_node(i);
                this.item_setter.call(this.cb_host, item.node, item.data, i);
            }
            item.node.setPosition(item.x, item.y);
        }
        // this.wdRender && this.wdRender.appendRenderFlag(cc.RenderFlow.FLAG_TRANSFORM);
    };
    GScrollView.prototype.pack_item = function (index, data) {
        if (this.dynamicSize) {
            var node = this.spawn_node(index, data);
            var _a = this.item_setter.call(this.cb_host, node, data, index), width = _a[0], height = _a[1];
            var item = { x: 0, y: 0, width: width, height: height, anchorX: node.anchorX, anchorY: node.anchorY, data: data, node: node };
            this.recycle_item(item);
            return item;
        }
        else {
            var tplIndex = this.tpl_select.call(this.cb_host, data, index);
            var node = this.item_templates[tplIndex];
            var item = { x: 0, y: 0, width: node.width * node.scaleX, height: node.height * node.scaleY, anchorX: node.anchorX, anchorY: node.anchorY, data: data, node: null };
            return item;
        }
    };
    GScrollView.prototype.layout_items = function (start) {
        // cc.info("layout_items, start=", start);
        if (this.items.length <= 0) {
            return;
        }
        var start_pos = 0;
        if (start > 0) {
            var prev_item = this.items[start - 1];
            if (this.dir == ScrollDirection.Vertical) {
                start_pos = prev_item.y - prev_item.height * (1 - prev_item.anchorY) - this.gap_y;
                start_pos -= prev_item.height + this.gap_y;
            }
            else {
                start_pos = prev_item.x + prev_item.width + this.gap_x;
                start_pos += prev_item.width + this.gap_x;
            }
        }
        for (var index = start, stop = this.items.length; index < stop; index++) {
            var item = this.items[index];
            if (this.dir == ScrollDirection.Vertical) {
                item.x = item.width * item.anchorX;
                item.y = start_pos - item.height * (1 - item.anchorY);
                start_pos -= item.height + this.gap_y;
            }
            else {
                item.y = item.height * (item.anchorY - 1);
                item.x = start_pos + item.width * item.anchorX;
                start_pos += item.width + this.gap_x;
            }
        }
    };
    GScrollView.prototype.resize_content = function () {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        var last_item = this.items[this.items.length - 1];
        if (this.dir == ScrollDirection.Vertical) {
            this.content.height = Math.max(this.height, -last_item.y + last_item.anchorY * last_item.height);
        }
        else {
            this.content.width = Math.max(this.width, last_item.x * (1 - last_item.anchorX) + last_item.width);
        }
        // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    };
    GScrollView.prototype.set_data = function (datas) {
        var _this = this;
        this.clear_items();
        this.items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            _this.items.push(item);
        });
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.dir == ScrollDirection.Vertical) {
            this.content.y = this.mask.height * (1 - this.mask.anchorY);
        }
        else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    };
    GScrollView.prototype.insert_data = function (index) {
        var _a;
        var _this = this;
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        if (datas.length == 0) {
            // cc.info("nothing to insert");
            return;
        }
        if (!this.items) {
            this.items = [];
        }
        if (index < 0 || index > this.items.length) {
            // if (index < 0) index = 0;
            // if (index > this.items.length) index = this.items.length - 1
            cc.warn("invalid index", index);
            return;
        }
        var is_append = index == this.items.length;
        var items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            items.push(item);
        });
        (_a = this.items).splice.apply(_a, __spreadArrays([index, 0], items));
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.auto_scrolling && is_append) {
            this.scroll_to_end();
        }
        this.on_scrolling();
    };
    GScrollView.prototype.append_data = function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i] = arguments[_i];
        }
        if (!this.items) {
            this.items = [];
        }
        this.insert_data.apply(this, __spreadArrays([this.items.length], datas));
    };
    GScrollView.prototype.remove_data = function (index) {
        if (!this.items)
            return;
        if (this.items.length <= index)
            return;
        this.items.splice(index, 1);
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.auto_scrolling) {
            this.scroll_to_end();
        }
        this.on_scrolling();
    };
    GScrollView.prototype.scroll_to_end = function () {
        if (this.dir == ScrollDirection.Vertical) {
            this.scrollview.scrollToBottom();
        }
        else {
            this.scrollview.scrollToRight();
        }
        this.on_scrolling();
    };
    GScrollView.prototype.render_active = function () {
        for (var i = this.start_index; i <= this.stop_index; i++) {
            var item = this.items[i];
            if (item.node) {
                this.item_setter.call(this.cb_host, item.node, item.data, i);
            }
        }
    };
    GScrollView.prototype.destroy = function () {
        this.clear_items();
        this.node_pools && this.node_pools.forEach(function (pools, key) {
            pools.forEach(function (node) {
                if (cc.isValid(node))
                    node.destroy();
            });
        });
        this.node_pools = null;
        this.items = null;
        if (this.item_templates) {
            this.item_templates = null;
            this.item_templates = null;
        }
        if (cc.isValid(this.scrollview.node)) {
            this.scrollview.node.off("scrolling", this.on_scrolling, this);
            this.scrollview.node.off("scroll-to-bottom", this.on_scroll_to_end, this);
            this.scrollview.node.off("scroll-to-right", this.on_scroll_to_end, this);
        }
    };
    return GScrollView;
}());
exports.GScrollView = GScrollView;
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Vertical"] = 1] = "Vertical";
    ScrollDirection[ScrollDirection["Horizontal"] = 2] = "Horizontal";
})(ScrollDirection = exports.ScrollDirection || (exports.ScrollDirection = {}));

cc._RF.pop();