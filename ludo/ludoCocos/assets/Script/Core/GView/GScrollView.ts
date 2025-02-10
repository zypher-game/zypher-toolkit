import { MapWrap } from "../FrameEx/ES5Ex";
import GViewDestory from "./GViewDestory";
const offsetY = 70;//显示范围往下延伸的距离

export class GScrollView {
    public scrollview: cc.ScrollView;
    public mask: cc.Node;
    private content: cc.Node;
    private item_templates: cc.Node[];
    private node_pools: MapWrap<number, cc.Node[]>;

    private dir: number;
    private width: number;
    private height: number;
    private gap_x: number;
    private gap_y: number;
    private cb_host: any;
    private tpl_select: (data: any, index: number) => number;
    private item_setter: (item: cc.Node, data: any, index: number) => [number, number];
    private recycle_cb: (item: cc.Node, key: string) => void;
    private scroll_to_end_cb: () => void;
    private scroll_to_top: () => void;
    private auto_scrolling: boolean;
    private items: ScrollItem[];
    private start_index: number;
    private stop_index: number;

    private dynamicSize: boolean = false;

    private wdRender: cc.Component = null;

    public get dataSize(): number {
        if (!this.items) return 0;
        return this.items.length;
    }

    public getItems(): ScrollItem[] {
        return this.items || [];
    }

    constructor(params: ScrollViewParams) {
        this.scrollview = params.scrollview;
        this.mask = params.mask;
        this.content = params.content;
        this.wdRender = this.content.getComponent(cc.Component);
        this.node_pools = new MapWrap();
        this.item_templates = params.item_templates;
        this.tpl_select = params.tpl_select;
        this.item_templates.forEach((tpl) => {
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
        let destroy = this.scrollview.node.getComponent(GViewDestory);
        if (!destroy) {
            destroy = this.scrollview.node.addComponent(GViewDestory);
        }
        destroy.otherDestroyCb = this.destroy.bind(this);
    }

    private on_scroll_to_end() {
        if (this.scroll_to_end_cb) {
            this.scroll_to_end_cb.call(this.cb_host);
        }
    }

    private on_scroll_to_top() {
        if (this.scroll_to_top) {
            this.scroll_to_top.call(this.cb_host);
        }
    }

    protected on_size_change() {
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
    }

    private on_scrolling() {
        if (!this.items || !this.items.length) {
            return;
        }
        if (this.dir == ScrollDirection.Vertical) {
            let posy: number = this.content.y;
            // cc.info("onscrolling, content posy=", posy);
            if (posy < (1 - this.mask.anchorY) * this.mask.height) {
                posy = (1 - this.mask.anchorY) * this.mask.height;
            }
            if (posy > this.content.height + (1 - this.mask.anchorY) * this.mask.height) {
                posy = this.content.height + (1 - this.mask.anchorY) * this.mask.height;
            }
            // console.log(posy);
            let start: number = 0;
            let stop: number = this.items.length - 1;
            let viewport_start: number = (this.height * (1 - this.mask.anchorY)) - posy;
            let viewport_stop: number = viewport_start - this.height;
            while (this.items[start].y - this.items[start].anchorY * this.items[start].height > viewport_start) {
                start++;
                if (!this.items[start]) break;
            }
            while (this.items[stop].y + (1 - this.items[stop].anchorY) * this.items[stop].height < viewport_stop) {
                stop--;
                if (!this.items[stop]) break;
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
            let posx: number = this.content.x;
            // cc.info("onscrolling, content posx=", posx);
            if (posx > 0) {
                posx = 0;
            }
            if (posx < this.width - this.content.width) {
                posx = this.width - this.content.width;
            }
            let start: number = 0;
            let stop: number = this.items.length - 1;
            let viewport_start: number = -posx;
            let viewport_stop: number = viewport_start + this.width;
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
    }

    private spawn_node(index: number, data?: any): cc.Node {
        let node: cc.Node;
        let tplIndex = this.tpl_select.call(this.cb_host, data ? data : this.items[index].data, index);
        let pools: cc.Node[] = this.node_pools.get(tplIndex);
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
    }

    private recycle_item(item: ScrollItem) {
        if (item.node) {
            let pools: cc.Node[] = this.node_pools.get(item.data.key);
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
    }

    private clear_items() {
        if (this.items) {
            this.items.forEach((item) => {
                this.recycle_item(item);
            });
        }
    }

    private render_items() {
        let item: ScrollItem;
        for (let i: number = 0; i < this.start_index; i++) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (let i: number = this.items.length - 1; i > this.stop_index; i--) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (let i: number = this.start_index; i <= this.stop_index; i++) {
            item = this.items[i];
            if (!item) continue;
            if (!item.node) {
                // cc.info("render_item", i);
                item.node = this.spawn_node(i);
                this.item_setter.call(this.cb_host, item.node, item.data, i);
            }
            item.node.setPosition(item.x, item.y);
        }

        // this.wdRender && this.wdRender.appendRenderFlag(cc.RenderFlow.FLAG_TRANSFORM);
    }

    private pack_item(index: number, data: any): ScrollItem {
        if (this.dynamicSize) {
            let node: cc.Node = this.spawn_node(index, data);
            let [width, height]: [number, number] = this.item_setter.call(this.cb_host, node, data, index);
            let item: ScrollItem = { x: 0, y: 0, width: width, height: height, anchorX: node.anchorX, anchorY: node.anchorY, data: data, node: node };
            this.recycle_item(item);
            return item;
        }
        else {
            let tplIndex = this.tpl_select.call(this.cb_host, data, index);
            let node = this.item_templates[tplIndex];
            let item: ScrollItem = { x: 0, y: 0, width: node.width * node.scaleX, height: node.height * node.scaleY, anchorX: node.anchorX, anchorY: node.anchorY, data: data, node: null };
            return item;
        }
    }

    private layout_items(start: number) {
        // cc.info("layout_items, start=", start);
        if (this.items.length <= 0) {
            return;
        }
        let start_pos: number = 0;
        if (start > 0) {
            let prev_item: ScrollItem = this.items[start - 1];
            if (this.dir == ScrollDirection.Vertical) {
                start_pos = prev_item.y - prev_item.height * (1 - prev_item.anchorY) - this.gap_y;
                start_pos -= prev_item.height + this.gap_y;
            }
            else {
                start_pos = prev_item.x + prev_item.width + this.gap_x;
                start_pos += prev_item.width + this.gap_x;
            }
        }
        for (let index: number = start, stop: number = this.items.length; index < stop; index++) {
            let item: ScrollItem = this.items[index];
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
    }

    private resize_content() {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        let last_item: ScrollItem = this.items[this.items.length - 1];
        if (this.dir == ScrollDirection.Vertical) {
            this.content.height = Math.max(this.height, - last_item.y + last_item.anchorY * last_item.height);
        }
        else {
            this.content.width = Math.max(this.width, last_item.x * (1 - last_item.anchorX) + last_item.width);
        }
        // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    }

    set_data(datas: any[]) {
        this.clear_items();
        this.items = [];
        datas.forEach((data, index) => {
            let item: ScrollItem = this.pack_item(index, data);
            this.items.push(item);
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
    }

    insert_data(index: number, ...datas: any[]) {
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
        let is_append: boolean = index == this.items.length;
        let items: ScrollItem[] = [];
        datas.forEach((data, index) => {
            let item: ScrollItem = this.pack_item(index, data);
            items.push(item);
        });
        this.items.splice(index, 0, ...items);
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.auto_scrolling && is_append) {
            this.scroll_to_end();
        }
        this.on_scrolling();
    }

    append_data(...datas: any[]) {
        if (!this.items) {
            this.items = [];
        }
        this.insert_data(this.items.length, ...datas);
    }

    remove_data(index: number) {
        if (!this.items) return;
        if (this.items.length <= index) return;
        this.items.splice(index, 1);
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;

        if (this.auto_scrolling) {
            this.scroll_to_end();
        }
        this.on_scrolling();
    }



    scroll_to_end() {
        if (this.dir == ScrollDirection.Vertical) {
            this.scrollview.scrollToBottom();
        }
        else {
            this.scrollview.scrollToRight();
        }
        this.on_scrolling();
    }

    render_active() {
        for (let i: number = this.start_index; i <= this.stop_index; i++) {
            let item = this.items[i];
            if (item.node) {
                this.item_setter.call(this.cb_host, item.node, item.data, i);
            }
        }
    }

    destroy() {
        this.clear_items();
        this.node_pools && this.node_pools.forEach((pools, key) => {
            pools.forEach((node) => {
                if (cc.isValid(node)) node.destroy();
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
    }
}

export enum ScrollDirection {
    Vertical = 1,
    Horizontal = 2,
}

type ScrollViewParams = {
    scrollview: cc.ScrollView;
    mask: cc.Node;
    content: cc.Node;
    item_templates: cc.Node[];
    tpl_select: (data: any, index: number) => number;
    direction?: ScrollDirection;
    width?: number;
    height?: number;
    gap_x?: number;
    gap_y?: number;
    cb_host?: any;
    item_setter: (item: cc.Node, data: any, index: number) => [number, number];   //item更新setter
    recycle_cb?: (item: cc.Node, key: string) => void;                                                   //回收时的回调
    scroll_to_end_cb?: () => void;                                                         //滚动到尽头的回调
    scroll_to_top?: () => void;
    auto_scrolling?: boolean;
    isWidget?: boolean;                                                            //append时自动滚动到尽头
    dynamicSize?: boolean;
}

type ScrollItem = {
    x: number;
    y: number;
    anchorX?: number;
    anchorY?: number;
    width: number;
    height: number;
    data: any;
    node: cc.Node;
}