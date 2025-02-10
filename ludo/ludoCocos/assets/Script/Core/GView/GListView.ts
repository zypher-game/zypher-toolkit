import { GListItem, GListViewParams } from "../../../../d.ts/game/JXCLBtl";
import { INVALID_VALUE } from "../CoreDefine";
import { AudioMgr } from "../Manager/AudioMgr";
import GChild from "./GChild";
import GViewDestory from "./GViewDestory";

export class GListView {
  private _scrollview: cc.ScrollView;
  public get scrollview() {
    return this._scrollview;
  }
  private _mask: cc.Node;
  public get mask() {
    return this._mask;
  }
  private _content: cc.Node;
  public get content() {
    return this._content;
  }
  private _itemTpl: cc.Node;
  private _nodePool: cc.Node[];

  private _dir: number;
  private _width: number;
  public get width() {
    return this._width;
  }
  private _height: number;
  private _gapX: number;
  private _gapY: number;
  private _padingX: number;
  private _padingY: number;
  private _row: number;
  private _col: number;
  private _itemWidth: number;
  private _itemHeight: number;
  private _itemAnchorX: number;
  private _itemAnchorY: number;
  private _cbHost: any;
  private _itemSetter: (item: any, data: any, index: number) => void;
  private _scrollingCb: () => void;
  private _recycleCb: (item: any) => void;
  private _selectSetter: (
    item: any,
    data: any,
    is_select: boolean,
    index: number
  ) => void;
  private _scrollToEndCb: () => void;
  private _childClickCb: (item: any, data: any, index: number) => void;
  private _childLongTouch: (
    item: any,
    data: any,
    index: number,
    times: number
  ) => void;
  private _autoScrolling: boolean;
  private _items: GListItem[];
  private _startIndex: number;
  private _stopIndex: number;
  private _datas: any[];
  private _selectedIndex: number = -1;
  protected _isCbClass: boolean;
  protected _isWidget: boolean;

  protected _isTouchPress: boolean = false;
  protected _touchChildNode: cc.Node = null;
  // 长按相关处理
  protected _childLongTouchFristTime: number;
  protected _childLongTouchUpdateTime: number;
  protected _childLongTouchDeltaTime: number = 0;
  protected _childLongTouchTimer: number = -1;
  protected _childLongTouchTimes: number = 0;

  constructor(params: GListViewParams) {
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
      let real_width: number =
        (this._itemWidth + this._gapX) * this._col - this._gapX;
      if (real_width > this._width) {
        console.info(
          "real width > width, resize scrollview to realwidth,",
          this._width,
          "->",
          real_width
        );
        this._width = real_width;
      }
      this._content.width = this._width;
    } else {
      let real_height: number =
        (this._itemHeight + this._gapY) * this._row - this._gapY;
      if (real_height > this._height) {
        console.info(
          "real height > height, resize scrollview to realheight,",
          this._height,
          "->",
          real_height
        );
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
    this._scrollview.node.on(
      cc.Node.EventType.TOUCH_START,
      this.onTouchStart,
      this
    );
    this._scrollview.node.on(
      cc.Node.EventType.TOUCH_MOVE,
      this.onTouchMove,
      this
    );
    this._scrollview.node.on(
      cc.Node.EventType.TOUCH_CANCEL,
      this.onTouchCancel,
      this
    );
    if (this._isWidget) {
      this._scrollview.node.on(
        cc.Node.EventType.SIZE_CHANGED,
        this.onSizeChange,
        this
      );
    }

    let destroy = this._scrollview.node.getComponent(GViewDestory);
    if (!destroy) {
      destroy = this._scrollview.node.addComponent(GViewDestory);
    }
    destroy.otherDestroyCb = this.destroy.bind(this);

    // this._scrollview.node.on("")
    // cc.info("constructor", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
  }

  protected onSizeChange() {
    this._width = this.scrollview.node.width;
    this._height = this.scrollview.node.height;
    this.mask.setContentSize(this.scrollview.node.getContentSize());
    if (this._datas) {
      this.setData(this._datas);
    }
  }

  private onScrollToEnd() {
    if (this._scrollToEndCb) {
      this._scrollToEndCb.call(this._cbHost);
    }
  }

  private closeTimer() {
    if (this._childLongTouchTimer != -1) {
      clearInterval(this._childLongTouchTimer);
    }
    this._childLongTouchTimer = -1;
    this._childLongTouchDeltaTime = 0;
    this._childLongTouchTimes = 0;
  }

  private startTimer() {
    this._childLongTouchDeltaTime = 0;
    this._childLongTouchTimes = 0;
    let index = parseInt(this._touchChildNode.name.replace("item_", ""));
    this._childLongTouchTimer = setInterval(() => {
      this._childLongTouchDeltaTime += 0.1;
      if (
        this._childLongTouchTimes == 0 &&
        this._childLongTouchDeltaTime > this._childLongTouchFristTime &&
        this._isTouchPress &&
        this._touchChildNode
      ) {
        if (cc.Button.comAudio) {
          AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        this._childLongTouch.call(
          this._cbHost,
          this._isCbClass
            ? this._touchChildNode.getComponent(GChild)
            : this._touchChildNode,
          this._items[index].data,
          index,
          ++this._childLongTouchTimes
        );
        this._childLongTouchDeltaTime = 0;
        if (!this._childLongTouchUpdateTime) {
          this.closeTimer();
          this._isTouchPress = false;
          return;
        }
      } else if (
        this._childLongTouchUpdateTime &&
        this._childLongTouchTimes > 0 &&
        this._childLongTouchDeltaTime > this._childLongTouchUpdateTime &&
        this._touchChildNode
      ) {
        if (cc.Button.comAudio) {
          AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        this._childLongTouch.call(
          this._cbHost,
          this._isCbClass
            ? this._touchChildNode.getComponent(GChild)
            : this._touchChildNode,
          this._items[index].data,
          index,
          ++this._childLongTouchTimes
        );
        this._childLongTouchDeltaTime = 0;
        this._isTouchPress = false;
      }
    }, 100);
  }

  private onTouchStart(event: cc.Event.EventTouch) {
    this._isTouchPress = true;
    this._touchChildNode = null;
    let local = event.getLocation();
    let childs = this._content.children;
    for (let i = 0; i < childs.length; i++) {
      let node = childs[i];
      if (node.active && node.getBoundingBoxToWorld().contains(local)) {
        this._touchChildNode = node;
        break;
      }
    }
    if (!this._childLongTouch) return;
    if (!this._touchChildNode) return;
    this.startTimer();
  }

  private onTouchMove(event: cc.Event.EventTouch) {
    if (event.getStartLocation().sub(event.getLocation()).mag() < 4) return;
    this._isTouchPress = false;
    this.closeTimer();
    this._touchChildNode = null;
  }

  private onToucEnd(event: cc.Event.EventTouch) {
    this.closeTimer();
    if (this._childLongTouchTimes > 0) {
      this._touchChildNode = null;
      return;
    }
    if (!this._isTouchPress) return;
    if (!this._touchChildNode) return;
    this.onItemTouchEnd(this._touchChildNode);
  }

  private onTouchCancel(event: cc.Event.EventTouch) {
    this.onToucEnd(event);
  }

  /**
   * 强制中断触摸
   */
  private cancelTouchEvent() {
    this.closeTimer();
    this._touchChildNode = null;
    this._isTouchPress = false;
    this._childLongTouchTimes = 0;
  }

  private onScrolling() {
    if (!this._items || !this._items.length) {
      return;
    }
    if (this._dir == GListViewDir.Vertical) {
      let posy: number = this._content.y;
      // cc.info("onscrolling, content posy=", posy);
      if (posy < (1 - this.mask.anchorY) * this.mask.height) {
        posy = (1 - this.mask.anchorY) * this.mask.height;
      }
      if (
        posy >
        this.content.height + (1 - this.mask.anchorY) * this.mask.height
      ) {
        posy = this.content.height + (1 - this.mask.anchorY) * this.mask.height;
      }
      let [start, stop] = this.verticalRange(posy);
      start = Math.max(start, 0);
      stop = Math.min(stop, this._items.length - 1);
      // cc.log(start + ',' + stop);
      if (start != this._startIndex || stop != this._stopIndex) {
        this._startIndex = start;
        this._stopIndex = stop;
        // cc.info("render_from:", start, stop);
        this.renderItems();
      }
    } else {
      let posx: number = this._content.x;
      if (posx > -this._width / 2) {
        posx = -this._width / 2;
      }
      if (posx < -this._content.width + this._height / 2) {
        posx = -this._content.width + this._height / 2;
      }

      let [start, stop] = this.horizontalRange(
        posx,
        this._width,
        this._itemWidth,
        this._row,
        this._gapX
      );
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
  }

  onItemTouchEnd(node: cc.Node) {
    if (cc.Button.comAudio) {
      AudioMgr.Ins().playEffect(cc.Button.comAudio);
    }
    let index = parseInt(node.name.replace("item_", ""));
    if (this._childClickCb) {
      this._childClickCb.call(
        this._cbHost,
        this._isCbClass ? node.getComponent(GChild) : node,
        this._items[index].data,
        index
      );
    }

    if (index == this._selectedIndex) {
      return;
    }
    if (this._selectedIndex != -1) {
      this.innerSelectItem(this._selectedIndex, false);
    }
    this.innerSelectItem(index, true);
  }

  private innerSelectItem(index: number, is_select: boolean) {
    let item: GListItem = this._items[index];
    if (!item) {
      cc.warn(
        "inner_select_item index is out of range{",
        0,
        this._items.length - 1,
        "}",
        index
      );
      return;
    }
    item.isSelect = is_select;
    if (item.node && this._selectSetter) {
      this._selectSetter.call(
        this._cbHost,
        this._isCbClass ? item.node.getComponent(GChild) : item.node,
        item.data,
        is_select,
        index
      );
    }
  }

  private spawnNode(index: number): cc.Node {
    let node: cc.Node = this._nodePool.pop();
    if (!node) {
      node = cc.instantiate(this._itemTpl);
      node.parent = this._content;
    }
    node.active = true;
    node.name = "item_" + index;
    return node;
  }

  private recycleItem(item: GListItem) {
    if (item.node && cc.isValid(item.node)) {
      if (this._recycleCb) {
        this._recycleCb.call(
          this._cbHost,
          this._isCbClass ? item.node.getComponent(GChild) : item.node
        );
      }
      (item.node.name = "item_null"), (item.node.active = false);
      this._nodePool.push(item.node);
      item.node = null;
    }
  }

  private clearItems() {
    this._items = [];
    if (!cc.isValid(this._content)) return;
    this._content.children.forEach((item) => {
      if (item.active) {
        (item.name = "item_null"), (item.active = false);
        this._nodePool.push(item);
      }
    });
  }

  private renderItems(isForce?: boolean) {
    let item: GListItem;

    this._content.children.forEach((item) => {
      if (!item.active) return;
      let index = parseInt(item.name.replace("item_", ""));
      if (index < this._startIndex || index > this._stopIndex) {
        this.recycleItem(this._items[index]);
        // cc.info("recycle_item:", index);
      }
    });
    if (this._startIndex === INVALID_VALUE) return;
    for (let i: number = this._startIndex; i <= this._stopIndex; i++) {
      item = this._items[i];
      if (!item.node) {
        // cc.info("render_item", i);
        item.node = this.spawnNode(i);
        this._itemSetter.call(
          this._cbHost,
          this._isCbClass ? item.node.getComponent(GChild) : item.node,
          item.data,
          i
        );
        // if (this._selectSetter) {
        //     this._selectSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild) : item.node, item.data, item.isSelect, i);
        // }
      } else {
        if (isForce) {
          this._itemSetter.call(
            this._cbHost,
            this._isCbClass ? item.node.getComponent(GChild) : item.node,
            item.data,
            i
          );
          // if (this._selectSetter) {
          //     this._selectSetter.call(this._cbHost, this._isCbClass ? item.node.getComponent(GChild) : item.node, item.data, item.isSelect, i);
          // }
        }
      }
      item.node.setPosition(item.x, item.y);
      // console.log(item.x, item.node.position)
    }

    // cc.log("======================>" + this._content.children.length)
  }

  private packItem(data: any): GListItem {
    return { x: 0, y: 0, data: data, node: null, isSelect: false };
  }

  private layoutItems(start: number) {
    // cc.info("layout_items, start=", start);
    for (
      let index: number = start, stop: number = this._items.length;
      index < stop;
      index++
    ) {
      let item: GListItem = this._items[index];
      if (this._dir == GListViewDir.Vertical) {
        [item.x, item.y] = this.verticalLayout(index);
      } else {
        [item.x, item.y] = this.horizontalLayout(index);
      }
    }
  }

  private resizeContent() {
    if (this._items.length <= 0) {
      this._content.width = 0;
      this._content.height = 0;
      return;
    }
    let last_item: GListItem = this._items[this._items.length - 1];
    if (this._dir == GListViewDir.Vertical) {
      this._content.height = Math.max(
        0,
        this._itemHeight * (1 - this._itemAnchorY) - last_item.y
      );
    } else {
      this._content.width = Math.max(0, last_item.x + this._itemWidth / 2);
    }
    // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
  }

  protected destroy() {
    this.clearItems();
    this._nodePool.forEach((node) => {
      if (cc.isValid(node)) node.destroy();
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
  }

  private verticalLayout(index: number): [number, number] {
    let x: number =
      this._padingX +
      (index % this._col) * (this._itemWidth + this._gapX) +
      this._itemWidth * this._itemAnchorX;
    let y: number =
      -Math.floor(index / this._col) * (this._itemHeight + this._gapY) -
      this._itemHeight * (1 - this._itemAnchorY) -
      this._padingY;
    return [x, y];
  }

  private verticalRange(y: number): [number, number] {
    let t_offset =
      y -
      (1 - this.mask.anchorY) * this.mask.height +
      (1 - this._itemAnchorY) * this._itemHeight +
      this._padingY;
    let t_last = Math.floor(t_offset / (this._itemHeight + this._gapY));
    let b_frist = Math.ceil(
      (t_offset + this.mask.height + this._gapY) /
        (this._itemHeight + this._gapY)
    );
    return [(t_last - 1) * this._col, b_frist * this._col];
  }

  private horizontalLayout(index: number): [number, number] {
    let x: number =
      Math.floor(index / this._row) * (this._itemWidth + this._gapX) +
      this._itemWidth * this._itemAnchorX;
    let y: number =
      -(index % this._row) * (this._itemHeight + this._gapY) -
      this._itemHeight / 2;
    return [x, y];
  }

  private horizontalRange(
    x: number,
    width: number,
    item_width: number,
    row: number = 1,
    gap_x: number = 0
  ): [number, number] {
    let t_offset = -(x + width / 2);
    let t_last = Math.ceil(t_offset / (item_width + gap_x));
    let b_frist = Math.ceil((t_offset + width) / (item_width + gap_x));
    let stop = (b_frist + 1) * row - 1;
    stop = stop === this._stopIndex ? this._stopIndex + 1 : stop;
    return [(t_last - 1) * row, stop];
  }

  public get datas(): any[] {
    return this._datas || [];
  }

  public get selectedIndex(): number {
    return this._selectedIndex;
  }

  public get selectdData(): any {
    let item: GListItem = this._items[this._selectedIndex];
    if (item) {
      return item.data;
    }
    return null;
  }

  public setData(datas: any[]) {
    this.clearItems();
    this._datas = datas;
    datas.forEach((data) => {
      this._items.push(this.packItem(data));
    });
    this.layoutItems(0);
    this.resizeContent();
    this._startIndex = -1;
    this._stopIndex = -1;
    if (this._dir == GListViewDir.Vertical) {
      this._content.y = this._height * (1 - this._mask.anchorY);
    } else {
      this._content.x = this._width * (this._mask.anchorX - 1);
    }
    if (this._items.length > 0) {
      this.onScrolling();
    }
    // 重置ScrollBar
    this._scrollview["_calculateBoundary"]();
  }

  public tryGetItemByIndex(index: number) {
    if (index < this._startIndex || index > this._stopIndex) {
      return null;
    }
    let item = this._items[index];
    if (!item) return null;
    return (
      this._isCbClass ? item.node.getComponent(GChild) : item.node
    ) as any;
  }

  public refreshData(datas?: any[]) {
    if (datas) {
      this.clearItems();
      this._datas = datas;
      datas.forEach((data) => {
        this._items.push(this.packItem(data));
      });
      this.layoutItems(0);
      this.resizeContent();
      this.renderItems(true);
    } else {
      if (this._datas) {
        this.renderItems(true);
      }
    }
  }

  public insertData(index: number, ...datas: any[]) {
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
    let is_append: boolean = index == this._items.length;
    let items: GListItem[] = [];
    datas.forEach((data) => {
      items.push(this.packItem(data));
    });
    this._datas.splice(index, 0, ...datas);
    this._items.splice(index, 0, ...items);
    this.layoutItems(index);
    this.resizeContent();
    this._startIndex = -1;
    this._stopIndex = -1;

    if (this._autoScrolling && is_append) {
      this.scrollToEnd();
    }
    this.onScrolling();
  }

  public removeData(index: number, count: number = 1) {
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
    let old_length: number = this._items.length;
    let del_items: GListItem[] = this._items.splice(index, count);
    this._datas.splice(index, count);
    //回收node
    del_items.forEach((item) => {
      this.recycleItem(item);
    });
    // 处理节点中旧的名称
    for (let i = index + 1; i < old_length; i++) {
      let child = this._content.getChildByName("item_" + i);
      if (child) child.name = "item_" + (i - count);
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
  }

  public appendData(...datas: any[]) {
    if (!this._items) {
      this._items = [];
    }
    this.insertData(this._items.length, ...datas);
  }

  public scrollTo(index: number, scrollTime = 0) {
    this._scrollview.stopAutoScroll();
    if (this._dir == GListViewDir.Vertical) {
      let maxOffset = this._scrollview.getMaxScrollOffset();
      if (maxOffset.y <= 0) {
        cc.log("no need to scroll");
        return;
      }
      let [_, y] = this.verticalLayout(index);
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
      if (!scrollTime) this.onScrolling();
    } else {
      let maxOffset = this._scrollview.getMaxScrollOffset();
      if (maxOffset.x <= 0) {
        cc.log("no need to scroll");
        return;
      }
      let [x, _] = this.horizontalLayout(index);
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
      if (!scrollTime) this.onScrolling();
    }
  }

  public scrollToEnd() {
    if (this._dir == GListViewDir.Vertical) {
      this._scrollview.scrollToBottom();
    } else {
      this._scrollview.scrollToRight();
    }
  }

  public refreshItem(index: number, data: any) {
    if (!this._items) {
      cc.log("call set_data before call this method");
      return;
    }
    if (index < 0 || index >= this._items.length) {
      cc.warn("invalid index", index);
      return;
    }
    let item: GListItem = this._items[index];
    item.data = data;
    this._datas[index] = data;
    if (item.node) {
      if (this._recycleCb) {
        this._recycleCb.call(this._cbHost, item.node.getComponent(GChild));
      }
      this._itemSetter.call(
        this._cbHost,
        item.node.getComponent(GChild),
        item.data,
        index
      );
    }
  }

  public reLayOut(params: {
    width?: number;
    height?: number;
    gapX?: number;
    gapY?: number;
    padingX?: number;
    padingY?: number;
    row?: number;
    column?: number;
  }) {
    this._width = params.width != null ? params.width : this._width;
    this._height = params.height != null ? params.height : this._height;
    this._gapX = params.gapX != null ? params.gapX : this._gapX;
    this._gapY = params.gapY != null ? params.gapY : this._gapY;
    this._padingX = params.padingX != null ? params.padingX : this._padingX;
    this._padingY = params.padingY != null ? params.padingY : this._padingY;
    this._row = params.row != null ? params.row : this._row;
    this._col = params.column != null ? params.column : this._col;

    if (this._dir == GListViewDir.Horizontal) {
      let real_width: number =
        (this._itemWidth + this._gapX) * this._col - this._gapX;
      if (real_width > this._width) {
        console.info(
          "real width > width, resize scrollview to realwidth,",
          this._width,
          "->",
          real_width
        );
        this._width = real_width;
      }
      this._content.width = this._width;
    } else {
      let real_height: number =
        (this._itemHeight + this._gapY) * this._row - this._gapY;
      if (real_height > this._height) {
        console.info(
          "real height > height, resize scrollview to realheight,",
          this._height,
          "->",
          real_height
        );
        this._height = real_height;
      }
      this._content.height = this._height;
    }
    this._mask.setContentSize(this._width, this._height);
    this._scrollview.node.setContentSize(this._width, this._height);
  }

  /**
   * 重新载入listView参数
   * @param params ListView参数
   */
  public resetParams(params: GListViewParams) {
    this.clearItems();
    this._nodePool.forEach((e) => e.destroy());
    this._nodePool.length = 0;
    if (this._itemTpl) this._itemTpl.destroy();
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
  }
}

export enum GListViewDir {
  Vertical = 1, // 垂直
  Horizontal = 2, // 水平
}
