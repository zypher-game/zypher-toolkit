import GComponent from "../../../Core/FrameEx/GComponent";
import { JXViewPreLoad, JXWinInfo } from "../../Common/UI";
import { Res } from "../../Common/UIResources";
import GameMgr from "../../Logic/GameMgr";
import { LoadingType } from "./../../Common/Define";
import { VIEW_ID } from "./../../Common/UI";
import { Toast } from "./../../Logic/ToastMgr";
import AppCtrl from "./AppCtrl";

const APP_CTRL = "AppCtrl";
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("AppStart")
export default class AppStart extends GComponent {
  protected __onLoad() {
    // @ts-ignore
    i18n.init("zh_CN", () => {
      cc.Button.comAudio = Res.common.audio.button;
      // GameMgr.uiMgr.invalidAudio = Res.audio.invalidClick;
      GameMgr.uiMgr.initWinInfos(JXWinInfo, JXViewPreLoad, (node) => {
        return new Toast(node);
      });
      this.onGameStart();
    });
  }

  start() {
    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
  }

  public onGameStart() {
    let node = cc.director.getScene().getChildByName(APP_CTRL);
    if (!node) {
      //添加一个控制节点
      node = new cc.Node();
      if (node) {
        node.name = "AppCtrl";
        let appCtrl = node.addComponent(AppCtrl);
        appCtrl.initEvent();
        cc.game.addPersistRootNode(node);
      }
    }

    // GameMgr.uiMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
    GameMgr.uiMgr.showWin(VIEW_ID.load, LoadingType.AppStart);
  }
}
