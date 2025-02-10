import { INVALID_VALUE, WinPage } from "../CoreDefine";
import GPage from "./GPage";
import GViewBase from "./GViewBase";

const { ccclass, property, executionOrder, menu } = cc._decorator;
@ccclass
@menu("View/GBase/GPageView")
export default class GPageView extends GViewBase {
  // 通用的切页音效
  public static comSwitchPageAudio: string;

  @property([cc.Toggle]) toggles: cc.Toggle[] = [];
  @property(cc.Node) pageRoot: cc.Node = null;
  @property([cc.Prefab]) pagePrefabs: cc.Prefab[] = [];
  @property(cc.Boolean) parallelTween: boolean = false;
  @property(cc.Boolean) forceToggleEvent: boolean = false;
  @property([cc.Integer]) unCachePages: number[] = [];

  protected curPage: number = INVALID_VALUE;
  protected _pages: GPage[] = [];
  public getPage<T extends GPage>(page: number): T {
    return this._pages[page] as T;
  }
  protected _inTween: cc.Tween = null;
  protected _outTween: cc.Tween = null;

  // 指定切页音效
  public switchPageAudio: string;

  public onGLoad() {
    this.setStatus();
  }

  public setStatus() {
    for (let i = 0; i < this.toggles.length; i++) {
      let toggle = this.toggles[i];
      toggle.node.on("toggle", this.onToggleClick, this);
      this.setToggleCanSwitch(toggle, this.isCanSwitch(i, false), i);
      if (this.switchPageAudio) {
        toggle.clickAudio = this.switchPageAudio;
      } else if (GPageView.comSwitchPageAudio) {
        toggle.clickAudio = GPageView.comSwitchPageAudio;
      }
    }
  }

  public setToggleCanSwitch(toggle, isCanSwitch: boolean, nPage: number) {
    toggle.interactable = isCanSwitch;
  }

  public onGStart(page: number, ...args) {
    page = page || WinPage.Page0;
    if (page >= this.toggles.length) {
      cc.warn("the page index is max of toggles.length, set the page = 0");
      page = WinPage.Page0;
    }
    let toggle = this.toggles[page];
    if (toggle.isChecked) {
      this.onToggleClick(toggle);
    } else {
      toggle.isChecked = true;
      this.onToggleClick(toggle);
    }
  }

  public checkReGStart() {
    return true;
  }

  public onDestroy() {
    super.onDestroy();
    this.stopTween();
    for (let i = 0; i < this._pages.length; i++) {
      let pPage = this._pages[i];
      if (!pPage) continue;
      if (pPage.node && !pPage.node.parent) {
        pPage.node.destroy();
      } else {
        pPage.isValid && pPage.destroy();
      }
    }
    this._pages.length = 0;
  }

  protected onToggleClick(toggle: cc.Toggle) {
    let index = this.toggles.indexOf(toggle);
    if (index == INVALID_VALUE) {
      cc.error("the toggle component is not exist.");
      return;
    }

    if (!this.isCanSwitch(index, true)) {
      if (this.curPage != INVALID_VALUE) {
        this.toggles[this.curPage].noEventCheck(true);
        this.toggles[index].noEventCheck(false);
        return;
      }
    }

    let oldPage = this.curPage;
    this.curPage = index;
    if (oldPage == this.curPage) return;
    this.onSwitch(oldPage, index);

    if (oldPage != INVALID_VALUE) {
      this.onUnSelected(oldPage);
    }

    this.onSelected(index);
  }

  /** 选中分页 */
  protected onSelected(nPage: number) {}

  /** 分页被取消 */
  protected onUnSelected(nPage: number) {}

  protected isCanSwitch(nPage: number, isCanToast: boolean = true): boolean {
    return true;
  }

  protected onSwitch(nOldPage: number, nNewPage: number) {
    this.stopTween();
    let __newPageLoadCb = (pPage: GPage) => {
      if (!pPage.node.parent) this.pageRoot.addChild(pPage.node);
      this._inTween = this.inAction(pPage.node, nOldPage, nNewPage);
      if (this._inTween) {
        this._inTween
          .call(() => {
            this._inTween = null;
          })
          .start();
        this.onPageIned(pPage);
      } else {
        this.onPageIned(pPage);
      }
    };

    let __switchCb = () => {
      let pNewPage = this._pages[nNewPage];
      if (!pNewPage) {
        if (!this.pagePrefabs[nNewPage]) {
          cc.warn("the new Page res is not stteing.");
          return;
        }
        let pageNode = cc.instantiate(this.pagePrefabs[nNewPage]);
        let page = pageNode.getComponent("GChild");
        this._pages[nNewPage] = page;
        this.onPageLoad(page, nNewPage);
        __newPageLoadCb(page);
      } else {
        __newPageLoadCb(pNewPage);
      }
    };

    let __oldPageOut = (oldPage: GPage) => {
      this._outTween = null;
      this.onPageOuted(oldPage);
      if (this.unCachePages.indexOf(nOldPage) != INVALID_VALUE) {
        oldPage.node.destroy();
        this._pages[nOldPage] = null;
      } else {
        oldPage.node.removeFromParent(false);
      }
      !this.parallelTween && __switchCb();
    };

    // 带page组件的统一处理
    let oldPage = this._pages[nOldPage];
    if (oldPage) {
      this._outTween = this.outAction(oldPage.node, nOldPage, nNewPage);
      if (this._outTween) {
        this._outTween.call(() => __oldPageOut(oldPage)).start();
      } else {
        __oldPageOut(oldPage);
      }
    } else {
      !this.parallelTween && __switchCb();
    }
    this.parallelTween && __switchCb();
  }

  protected onCoustomSwitch(oldPage: number, newPage) {}

  protected onPageLoad(page: GPage, newPage: number) {}

  protected onPageIned(page: GPage) {
    page.onPageIn();
  }

  protected onPageOuted(page: GPage) {
    page.onPageOut();
  }

  protected outAction(
    pageNode: cc.Node,
    nOldPage: number,
    nNewPage: number
  ): cc.Tween {
    return null;
  }

  protected inAction(
    pageNode: cc.Node,
    nOldPage: number,
    nNewPage: number
  ): cc.Tween {
    return null;
  }

  protected stopTween() {
    this._inTween && this._inTween.stop();
    this._outTween && this._outTween.stop();
    this._inTween = null;
    this._outTween = null;
  }
}
