
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GScrollView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HU2Nyb2xsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEyQztBQUMzQywrQ0FBMEM7QUFDMUMsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUEsYUFBYTtBQUVoQztJQW9DSSxxQkFBWSxNQUF3QjtRQWI1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixhQUFRLEdBQWlCLElBQUksQ0FBQztRQVlsQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDNUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElB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QUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVFO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FoYkEsQUFnYkMsSUFBQTtBQWhiWSxrQ0FBVztBQWtieEIsSUFBWSxlQUdYO0FBSEQsV0FBWSxlQUFlO0lBQ3ZCLDZEQUFZLENBQUE7SUFDWixpRUFBYyxDQUFBO0FBQ2xCLENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcFdyYXAgfSBmcm9tIFwiLi4vRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgR1ZpZXdEZXN0b3J5IGZyb20gXCIuL0dWaWV3RGVzdG9yeVwiO1xyXG5jb25zdCBvZmZzZXRZID0gNzA7Ly/mmL7npLrojIPlm7TlvoDkuIvlu7bkvLjnmoTot53nprtcclxuXHJcbmV4cG9ydCBjbGFzcyBHU2Nyb2xsVmlldyB7XHJcbiAgICBwdWJsaWMgc2Nyb2xsdmlldzogY2MuU2Nyb2xsVmlldztcclxuICAgIHB1YmxpYyBtYXNrOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpdGVtX3RlbXBsYXRlczogY2MuTm9kZVtdO1xyXG4gICAgcHJpdmF0ZSBub2RlX3Bvb2xzOiBNYXBXcmFwPG51bWJlciwgY2MuTm9kZVtdPjtcclxuXHJcbiAgICBwcml2YXRlIGRpcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZ2FwX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZ2FwX3k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2JfaG9zdDogYW55O1xyXG4gICAgcHJpdmF0ZSB0cGxfc2VsZWN0OiAoZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGl0ZW1fc2V0dGVyOiAoaXRlbTogY2MuTm9kZSwgZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSA9PiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgcHJpdmF0ZSByZWN5Y2xlX2NiOiAoaXRlbTogY2MuTm9kZSwga2V5OiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIHNjcm9sbF90b19lbmRfY2I6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIHNjcm9sbF90b190b3A6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIGF1dG9fc2Nyb2xsaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpdGVtczogU2Nyb2xsSXRlbVtdO1xyXG4gICAgcHJpdmF0ZSBzdGFydF9pbmRleDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdG9wX2luZGV4OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBkeW5hbWljU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgd2RSZW5kZXI6IGNjLkNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pdGVtcykgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtcygpOiBTY3JvbGxJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogU2Nyb2xsVmlld1BhcmFtcykge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsdmlldyA9IHBhcmFtcy5zY3JvbGx2aWV3O1xyXG4gICAgICAgIHRoaXMubWFzayA9IHBhcmFtcy5tYXNrO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHBhcmFtcy5jb250ZW50O1xyXG4gICAgICAgIHRoaXMud2RSZW5kZXIgPSB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkNvbXBvbmVudCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Bvb2xzID0gbmV3IE1hcFdyYXAoKTtcclxuICAgICAgICB0aGlzLml0ZW1fdGVtcGxhdGVzID0gcGFyYW1zLml0ZW1fdGVtcGxhdGVzO1xyXG4gICAgICAgIHRoaXMudHBsX3NlbGVjdCA9IHBhcmFtcy50cGxfc2VsZWN0O1xyXG4gICAgICAgIHRoaXMuaXRlbV90ZW1wbGF0ZXMuZm9yRWFjaCgodHBsKSA9PiB7XHJcbiAgICAgICAgICAgIHRwbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXIgPSBwYXJhbXMuZGlyZWN0aW9uIHx8IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB0aGlzLndpZHRoID0gcGFyYW1zLndpZHRoIHx8IHRoaXMubWFzay53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHBhcmFtcy5oZWlnaHQgfHwgdGhpcy5tYXNrLmhlaWdodDtcclxuICAgICAgICB0aGlzLmdhcF94ID0gcGFyYW1zLmdhcF94IHx8IDA7XHJcbiAgICAgICAgdGhpcy5nYXBfeSA9IHBhcmFtcy5nYXBfeSB8fCAwO1xyXG4gICAgICAgIHRoaXMuY2JfaG9zdCA9IHBhcmFtcy5jYl9ob3N0O1xyXG4gICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIgPSBwYXJhbXMuaXRlbV9zZXR0ZXI7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlX2NiID0gcGFyYW1zLnJlY3ljbGVfY2I7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxfdG9fZW5kX2NiID0gcGFyYW1zLnNjcm9sbF90b19lbmRfY2I7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxfdG9fdG9wID0gcGFyYW1zLnNjcm9sbF90b190b3A7XHJcbiAgICAgICAgdGhpcy5hdXRvX3Njcm9sbGluZyA9IHBhcmFtcy5hdXRvX3Njcm9sbGluZyB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNTaXplID0gcGFyYW1zLmR5bmFtaWNTaXplIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXIgPT0gU2Nyb2xsRGlyZWN0aW9uLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2Nyb2xsdmlldy52ZXJ0aWNhbCA9IHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcuaG9yaXpvbnRhbCA9IHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5Ib3Jpem9udGFsO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsdmlldy5pbmVydGlhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbGluZ1wiLCB0aGlzLm9uX3Njcm9sbGluZywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25fc2Nyb2xsX3RvX2VuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vbl9zY3JvbGxfdG9fZW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbC10by10b3BcIiwgdGhpcy5vbl9zY3JvbGxfdG9fdG9wLCB0aGlzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmlzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsdmlldy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5vbl9zaXplX2NoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZXN0cm95ID0gdGhpcy5zY3JvbGx2aWV3Lm5vZGUuZ2V0Q29tcG9uZW50KEdWaWV3RGVzdG9yeSk7XHJcbiAgICAgICAgaWYgKCFkZXN0cm95KSB7XHJcbiAgICAgICAgICAgIGRlc3Ryb3kgPSB0aGlzLnNjcm9sbHZpZXcubm9kZS5hZGRDb21wb25lbnQoR1ZpZXdEZXN0b3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzdHJveS5vdGhlckRlc3Ryb3lDYiA9IHRoaXMuZGVzdHJveS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fc2Nyb2xsX3RvX2VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxfdG9fZW5kX2NiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsX3RvX2VuZF9jYi5jYWxsKHRoaXMuY2JfaG9zdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fc2Nyb2xsX3RvX3RvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxfdG9fdG9wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsX3RvX3RvcC5jYWxsKHRoaXMuY2JfaG9zdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbl9zaXplX2NoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zY3JvbGx2aWV3Lm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNjcm9sbHZpZXcubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5tYXNrLnNldENvbnRlbnRTaXplKHRoaXMuc2Nyb2xsdmlldy5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X2l0ZW1zKDApO1xyXG4gICAgICAgIHRoaXMucmVzaXplX2NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHRoaXMubWFzay5oZWlnaHQgKiAoMSAtIHRoaXMubWFzay5hbmNob3JZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uX3Njcm9sbGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3Njcm9sbGluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXRlbXMgfHwgIXRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zeTogbnVtYmVyID0gdGhpcy5jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIC8vIGNjLmluZm8oXCJvbnNjcm9sbGluZywgY29udGVudCBwb3N5PVwiLCBwb3N5KTtcclxuICAgICAgICAgICAgaWYgKHBvc3kgPCAoMSAtIHRoaXMubWFzay5hbmNob3JZKSAqIHRoaXMubWFzay5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHBvc3kgPSAoMSAtIHRoaXMubWFzay5hbmNob3JZKSAqIHRoaXMubWFzay5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvc3kgPiB0aGlzLmNvbnRlbnQuaGVpZ2h0ICsgKDEgLSB0aGlzLm1hc2suYW5jaG9yWSkgKiB0aGlzLm1hc2suaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3N5ID0gdGhpcy5jb250ZW50LmhlaWdodCArICgxIC0gdGhpcy5tYXNrLmFuY2hvclkpICogdGhpcy5tYXNrLmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwb3N5KTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgc3RvcDogbnVtYmVyID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBsZXQgdmlld3BvcnRfc3RhcnQ6IG51bWJlciA9ICh0aGlzLmhlaWdodCAqICgxIC0gdGhpcy5tYXNrLmFuY2hvclkpKSAtIHBvc3k7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydF9zdG9wOiBudW1iZXIgPSB2aWV3cG9ydF9zdGFydCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5pdGVtc1tzdGFydF0ueSAtIHRoaXMuaXRlbXNbc3RhcnRdLmFuY2hvclkgKiB0aGlzLml0ZW1zW3N0YXJ0XS5oZWlnaHQgPiB2aWV3cG9ydF9zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQrKztcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pdGVtc1tzdGFydF0pIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLml0ZW1zW3N0b3BdLnkgKyAoMSAtIHRoaXMuaXRlbXNbc3RvcF0uYW5jaG9yWSkgKiB0aGlzLml0ZW1zW3N0b3BdLmhlaWdodCA8IHZpZXdwb3J0X3N0b3ApIHtcclxuICAgICAgICAgICAgICAgIHN0b3AtLTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pdGVtc1tzdG9wXSkgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2Mud2Fybignc2hvdyBpdGVtOicsIHN0YXJ0LCBzdG9wKTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IHRoaXMuc3RhcnRfaW5kZXggfHwgc3RvcCAhPSB0aGlzLnN0b3BfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfaW5kZXggPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF9pbmRleCA9IHN0b3A7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy53YXJuKFwicmVuZGVyX2Zyb206XCIsIHN0YXJ0LCBzdG9wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyX2l0ZW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy53YXJuKFwidW5jaGFuZ2U6IHJlbmRlcl9mcm9tOlwiLCBzdGFydCwgc3RvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwb3N4OiBudW1iZXIgPSB0aGlzLmNvbnRlbnQueDtcclxuICAgICAgICAgICAgLy8gY2MuaW5mbyhcIm9uc2Nyb2xsaW5nLCBjb250ZW50IHBvc3g9XCIsIHBvc3gpO1xyXG4gICAgICAgICAgICBpZiAocG9zeCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvc3ggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb3N4IDwgdGhpcy53aWR0aCAtIHRoaXMuY29udGVudC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcG9zeCA9IHRoaXMud2lkdGggLSB0aGlzLmNvbnRlbnQud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgc3RvcDogbnVtYmVyID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBsZXQgdmlld3BvcnRfc3RhcnQ6IG51bWJlciA9IC1wb3N4O1xyXG4gICAgICAgICAgICBsZXQgdmlld3BvcnRfc3RvcDogbnVtYmVyID0gdmlld3BvcnRfc3RhcnQgKyB0aGlzLndpZHRoO1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5pdGVtc1tzdGFydF0ueCArIHRoaXMuaXRlbXNbc3RhcnRdLndpZHRoIDwgdmlld3BvcnRfc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuaXRlbXNbc3RvcF0ueCA+IHZpZXdwb3J0X3N0b3ApIHtcclxuICAgICAgICAgICAgICAgIHN0b3AtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhcnQgIT0gdGhpcy5zdGFydF9pbmRleCAmJiBzdG9wICE9IHRoaXMuc3RvcF9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF9pbmRleCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gc3RvcDtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmluZm8oXCJyZW5kZXJfZnJvbTpcIiwgc3RhcnQsIHN0b3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJfaXRlbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNwYXduX25vZGUoaW5kZXg6IG51bWJlciwgZGF0YT86IGFueSk6IGNjLk5vZGUge1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlO1xyXG4gICAgICAgIGxldCB0cGxJbmRleCA9IHRoaXMudHBsX3NlbGVjdC5jYWxsKHRoaXMuY2JfaG9zdCwgZGF0YSA/IGRhdGEgOiB0aGlzLml0ZW1zW2luZGV4XS5kYXRhLCBpbmRleCk7XHJcbiAgICAgICAgbGV0IHBvb2xzOiBjYy5Ob2RlW10gPSB0aGlzLm5vZGVfcG9vbHMuZ2V0KHRwbEluZGV4KTtcclxuICAgICAgICBpZiAocG9vbHMgJiYgcG9vbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gcG9vbHMucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtX3RlbXBsYXRlc1t0cGxJbmRleF0pO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5uYW1lID0gJ3RwbF8nICsgdHBsSW5kZXggKyAnXycgKyBpbmRleDtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWN5Y2xlX2l0ZW0oaXRlbTogU2Nyb2xsSXRlbSkge1xyXG4gICAgICAgIGlmIChpdGVtLm5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IHBvb2xzOiBjYy5Ob2RlW10gPSB0aGlzLm5vZGVfcG9vbHMuZ2V0KGl0ZW0uZGF0YS5rZXkpO1xyXG4gICAgICAgICAgICBpZiAoIXBvb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBwb29scyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlX3Bvb2xzLnNldChpdGVtLmRhdGEua2V5LCBwb29scyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9vbHMucHVzaChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWN5Y2xlX2NiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVfY2IuY2FsbCh0aGlzLmNiX2hvc3QsIGl0ZW0ubm9kZSwgaXRlbS5kYXRhLmtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaXRlbS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLm5hbWUgPSAncmVjeWNsZSc7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhcl9pdGVtcygpIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtcykge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZV9pdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJfaXRlbXMoKSB7XHJcbiAgICAgICAgbGV0IGl0ZW06IFNjcm9sbEl0ZW07XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuc3RhcnRfaW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubm9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuaW5mbyhcInJlY3ljbGVfaXRlbVwiLCBpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZV9pdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTsgaSA+IHRoaXMuc3RvcF9pbmRleDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5pbmZvKFwicmVjeWNsZV9pdGVtXCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2l0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gdGhpcy5zdGFydF9pbmRleDsgaSA8PSB0aGlzLnN0b3BfaW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmluZm8oXCJyZW5kZXJfaXRlbVwiLCBpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZSA9IHRoaXMuc3Bhd25fbm9kZShpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIuY2FsbCh0aGlzLmNiX2hvc3QsIGl0ZW0ubm9kZSwgaXRlbS5kYXRhLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24oaXRlbS54LCBpdGVtLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcy53ZFJlbmRlciAmJiB0aGlzLndkUmVuZGVyLmFwcGVuZFJlbmRlckZsYWcoY2MuUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWNrX2l0ZW0oaW5kZXg6IG51bWJlciwgZGF0YTogYW55KTogU2Nyb2xsSXRlbSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHluYW1pY1NpemUpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLnNwYXduX25vZGUoaW5kZXgsIGRhdGEpO1xyXG4gICAgICAgICAgICBsZXQgW3dpZHRoLCBoZWlnaHRdOiBbbnVtYmVyLCBudW1iZXJdID0gdGhpcy5pdGVtX3NldHRlci5jYWxsKHRoaXMuY2JfaG9zdCwgbm9kZSwgZGF0YSwgaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogU2Nyb2xsSXRlbSA9IHsgeDogMCwgeTogMCwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgYW5jaG9yWDogbm9kZS5hbmNob3JYLCBhbmNob3JZOiBub2RlLmFuY2hvclksIGRhdGE6IGRhdGEsIG5vZGU6IG5vZGUgfTtcclxuICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2l0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRwbEluZGV4ID0gdGhpcy50cGxfc2VsZWN0LmNhbGwodGhpcy5jYl9ob3N0LCBkYXRhLCBpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5pdGVtX3RlbXBsYXRlc1t0cGxJbmRleF07XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBTY3JvbGxJdGVtID0geyB4OiAwLCB5OiAwLCB3aWR0aDogbm9kZS53aWR0aCAqIG5vZGUuc2NhbGVYLCBoZWlnaHQ6IG5vZGUuaGVpZ2h0ICogbm9kZS5zY2FsZVksIGFuY2hvclg6IG5vZGUuYW5jaG9yWCwgYW5jaG9yWTogbm9kZS5hbmNob3JZLCBkYXRhOiBkYXRhLCBub2RlOiBudWxsIH07XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxheW91dF9pdGVtcyhzdGFydDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gY2MuaW5mbyhcImxheW91dF9pdGVtcywgc3RhcnQ9XCIsIHN0YXJ0KTtcclxuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGFydF9wb3M6IG51bWJlciA9IDA7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcHJldl9pdGVtOiBTY3JvbGxJdGVtID0gdGhpcy5pdGVtc1tzdGFydCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXIgPT0gU2Nyb2xsRGlyZWN0aW9uLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgPSBwcmV2X2l0ZW0ueSAtIHByZXZfaXRlbS5oZWlnaHQgKiAoMSAtIHByZXZfaXRlbS5hbmNob3JZKSAtIHRoaXMuZ2FwX3k7XHJcbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgLT0gcHJldl9pdGVtLmhlaWdodCArIHRoaXMuZ2FwX3k7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgPSBwcmV2X2l0ZW0ueCArIHByZXZfaXRlbS53aWR0aCArIHRoaXMuZ2FwX3g7XHJcbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgKz0gcHJldl9pdGVtLndpZHRoICsgdGhpcy5nYXBfeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gc3RhcnQsIHN0b3A6IG51bWJlciA9IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCA8IHN0b3A7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IFNjcm9sbEl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS54ID0gaXRlbS53aWR0aCAqIGl0ZW0uYW5jaG9yWDtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHN0YXJ0X3BvcyAtIGl0ZW0uaGVpZ2h0ICogKDEgLSBpdGVtLmFuY2hvclkpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRfcG9zIC09IGl0ZW0uaGVpZ2h0ICsgdGhpcy5nYXBfeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IGl0ZW0uaGVpZ2h0ICogKGl0ZW0uYW5jaG9yWSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS54ID0gc3RhcnRfcG9zICsgaXRlbS53aWR0aCAqIGl0ZW0uYW5jaG9yWDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X3BvcyArPSBpdGVtLndpZHRoICsgdGhpcy5nYXBfeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2l6ZV9jb250ZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0X2l0ZW06IFNjcm9sbEl0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5oZWlnaHQsIC0gbGFzdF9pdGVtLnkgKyBsYXN0X2l0ZW0uYW5jaG9yWSAqIGxhc3RfaXRlbS5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LndpZHRoID0gTWF0aC5tYXgodGhpcy53aWR0aCwgbGFzdF9pdGVtLnggKiAoMSAtIGxhc3RfaXRlbS5hbmNob3JYKSArIGxhc3RfaXRlbS53aWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmluZm8oXCJyZXNpemVfY29udGVudFwiLCB0aGlzLm1hc2sud2lkdGgsIHRoaXMubWFzay5oZWlnaHQsIHRoaXMuc2Nyb2xsdmlldy5ub2RlLndpZHRoLCB0aGlzLnNjcm9sbHZpZXcubm9kZS5oZWlnaHQsIHRoaXMuY29udGVudC53aWR0aCwgdGhpcy5jb250ZW50LmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2RhdGEoZGF0YXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcl9pdGVtcygpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICBkYXRhcy5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogU2Nyb2xsSXRlbSA9IHRoaXMucGFja19pdGVtKGluZGV4LCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X2l0ZW1zKDApO1xyXG4gICAgICAgIHRoaXMucmVzaXplX2NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlyID09IFNjcm9sbERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHRoaXMubWFzay5oZWlnaHQgKiAoMSAtIHRoaXMubWFzay5hbmNob3JZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uX3Njcm9sbGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnRfZGF0YShpbmRleDogbnVtYmVyLCAuLi5kYXRhczogYW55W10pIHtcclxuICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgLy8gY2MuaW5mbyhcIm5vdGhpbmcgdG8gaW5zZXJ0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pdGVtcykge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBpZiAoaW5kZXggPCAwKSBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIC8vIGlmIChpbmRleCA+IHRoaXMuaXRlbXMubGVuZ3RoKSBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICBjYy53YXJuKFwiaW52YWxpZCBpbmRleFwiLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzX2FwcGVuZDogYm9vbGVhbiA9IGluZGV4ID09IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBpdGVtczogU2Nyb2xsSXRlbVtdID0gW107XHJcbiAgICAgICAgZGF0YXMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IFNjcm9sbEl0ZW0gPSB0aGlzLnBhY2tfaXRlbShpbmRleCwgZGF0YSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIC4uLml0ZW1zKTtcclxuICAgICAgICB0aGlzLmxheW91dF9pdGVtcyhpbmRleCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVfY29udGVudCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLnN0b3BfaW5kZXggPSAtMTtcclxuICAgICAgICBpZiAodGhpcy5hdXRvX3Njcm9sbGluZyAmJiBpc19hcHBlbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxfdG9fZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25fc2Nyb2xsaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kX2RhdGEoLi4uZGF0YXM6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnNlcnRfZGF0YSh0aGlzLml0ZW1zLmxlbmd0aCwgLi4uZGF0YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZV9kYXRhKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXRlbXMpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPD0gaW5kZXgpIHJldHVybjtcclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRfaXRlbXMoaW5kZXgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplX2NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9fc2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsX3RvX2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uX3Njcm9sbGluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2Nyb2xsX3RvX2VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXIgPT0gU2Nyb2xsRGlyZWN0aW9uLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsdmlldy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3LnNjcm9sbFRvUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbl9zY3JvbGxpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJfYWN0aXZlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuc3RhcnRfaW5kZXg7IGkgPD0gdGhpcy5zdG9wX2luZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1fc2V0dGVyLmNhbGwodGhpcy5jYl9ob3N0LCBpdGVtLm5vZGUsIGl0ZW0uZGF0YSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyX2l0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Bvb2xzICYmIHRoaXMubm9kZV9wb29scy5mb3JFYWNoKChwb29scywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHBvb2xzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKG5vZGUpKSBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Bvb2xzID0gbnVsbDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5pdGVtX3RlbXBsYXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1fdGVtcGxhdGVzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pdGVtX3RlbXBsYXRlcyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLnNjcm9sbHZpZXcubm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub2ZmKFwic2Nyb2xsaW5nXCIsIHRoaXMub25fc2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub2ZmKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uX3Njcm9sbF90b19lbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vZmYoXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vbl9zY3JvbGxfdG9fZW5kLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNjcm9sbERpcmVjdGlvbiB7XHJcbiAgICBWZXJ0aWNhbCA9IDEsXHJcbiAgICBIb3Jpem9udGFsID0gMixcclxufVxyXG5cclxudHlwZSBTY3JvbGxWaWV3UGFyYW1zID0ge1xyXG4gICAgc2Nyb2xsdmlldzogY2MuU2Nyb2xsVmlldztcclxuICAgIG1hc2s6IGNjLk5vZGU7XHJcbiAgICBjb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgaXRlbV90ZW1wbGF0ZXM6IGNjLk5vZGVbXTtcclxuICAgIHRwbF9zZWxlY3Q6IChkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IG51bWJlcjtcclxuICAgIGRpcmVjdGlvbj86IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgZ2FwX3g/OiBudW1iZXI7XHJcbiAgICBnYXBfeT86IG51bWJlcjtcclxuICAgIGNiX2hvc3Q/OiBhbnk7XHJcbiAgICBpdGVtX3NldHRlcjogKGl0ZW06IGNjLk5vZGUsIGRhdGE6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gW251bWJlciwgbnVtYmVyXTsgICAvL2l0ZW3mm7TmlrBzZXR0ZXJcclxuICAgIHJlY3ljbGVfY2I/OiAoaXRlbTogY2MuTm9kZSwga2V5OiBzdHJpbmcpID0+IHZvaWQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lm57mlLbml7bnmoTlm57osINcclxuICAgIHNjcm9sbF90b19lbmRfY2I/OiAoKSA9PiB2b2lkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5rua5Yqo5Yiw5bC95aS055qE5Zue6LCDXHJcbiAgICBzY3JvbGxfdG9fdG9wPzogKCkgPT4gdm9pZDtcclxuICAgIGF1dG9fc2Nyb2xsaW5nPzogYm9vbGVhbjtcclxuICAgIGlzV2lkZ2V0PzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FwcGVuZOaXtuiHquWKqOa7muWKqOWIsOWwveWktFxyXG4gICAgZHluYW1pY1NpemU/OiBib29sZWFuO1xyXG59XHJcblxyXG50eXBlIFNjcm9sbEl0ZW0gPSB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBhbmNob3JYPzogbnVtYmVyO1xyXG4gICAgYW5jaG9yWT86IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIG5vZGU6IGNjLk5vZGU7XHJcbn0iXX0=