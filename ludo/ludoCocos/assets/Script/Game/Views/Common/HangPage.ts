import ColorLog from "../../../Core/FrameEx/ColorLog";
import { GCtrl } from "../../../Core/GCtrl";
import { Win } from "../../../Core/Manager/UIMgr";
import { CMsg } from "../../Common/Define";
import { VIEW_ID } from "../../Common/UI";
import GameMgr from "../../Logic/GameMgr";

export default class HangPage extends cc.Component {
  protected listenClosePage: Array<number> = [];
  protected listenOpenPage: Array<number> = [];
  public curWin: number;
  onLoad() {
    GCtrl.ES.on(GCtrl.GClientWinOpenEventMsg, this, this.onWinOpen.bind(this));
    GCtrl.ES.on(
      GCtrl.GClientWinDestroyEventMsg,
      this,
      this.onWinClose.bind(this)
    );
    console.error("onLoad");
    this.setOrder(false);
  }
  public addListenPage(openLayer: Array<number>, closeLayer: Array<number>) {
    for (let i = 0; i < openLayer.length; i++) {
      if (this.listenOpenPage.indexOf(openLayer[i]) == -1) {
        this.listenOpenPage.push(openLayer[i]);
      }
    }

    for (let i = 0; i < closeLayer.length; i++) {
      if (this.listenClosePage.indexOf(closeLayer[i]) == -1) {
        this.listenClosePage.push(closeLayer[i]);
      }
    }
  }

  public getCurWin() {
    return this.curWin;
  }

  /**监听窗口打开*/
  private onWinOpen(_, winId: number) {
    ColorLog.esOn("GCtrl.GClientWinOpenEventMsg");
    // if (winId == VIEW_ID.fightLayer) {
    //     this.node.parent = null;
    //     return;
    // }
    //需要在哪些界面显示在最上层
    // let viewList = [VIEW_ID.heroArray, VIEW_ID.heroUp];
    this.curWin = winId;
    let viewList = this.listenOpenPage;
    for (let i = 0; i < viewList.length; i++) {
      if (winId == viewList[i]) {
        this.setOrder(true);
        return;
      }
    }
  }
  /**监听窗口关闭*/
  private onWinClose(_, win: Win) {
    ColorLog.esOn("GCtrl.GClientWinDestroyEventMsg");
    // let viewList = [VIEW_ID.heroArray, VIEW_ID.fightLayer];
    let viewList = this.listenClosePage;
    for (let i = 0; i < viewList.length; i++) {
      if (win.winId == viewList[i]) {
        this.curWin = null;
        console.error("onWinClose");
        this.setOrder(false);
        return;
      }
    }
  }

  /**
   *
   * @param isNeedTop 是否在最顶层(否则在home之上)
   */
  public setOrder(isNeedTop: boolean) {
    this.node.active = true;
    if (isNeedTop) {
      let topWin = GameMgr.uiMgr.getActiveTopWin();
      this.node.zIndex = topWin.sortOrder + 1;
    } else {
      let homeWin = GameMgr.uiMgr.getActiveTopWin(VIEW_ID.home);
      if (homeWin) {
        console.error("setOrder homeWin");
        this.node.zIndex = homeWin.sortOrder + 1;
        this.node.parent = homeWin.viewBinder.node.parent;
      } else {
        this.node.parent = null;
      }
    }
    GCtrl.ES.emit(CMsg.client.view.onViewChange);
  }
  public onDestroy() {
    GCtrl.ES.off(this);
    GCtrl.ES.off(this.node);
  }
}
