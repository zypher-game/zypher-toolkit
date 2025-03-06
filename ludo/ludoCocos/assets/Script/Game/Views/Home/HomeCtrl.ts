import { PRIORITY_DATA } from "../../../Core/CoreDefine";
import { GCtrl } from "../../../Core/GCtrl";
import GViewBase from "../../../Core/GView/GViewBase";
import { VIEW_ID } from "../../Common/UI";
import AccountMgr, { AccountChangedEmit } from "../../Logic/AccountMgr";
import GameMgr from "../../Logic/GameMgr";
import AccountCenter from "./handle/AccountCenterNode";
import WalletConnectNode from "./handle/WalletConnectNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadCtrl extends GViewBase {
  @property(cc.Node) TasksNode: cc.Node = null;
  @property(cc.Node) LeaderBoardNode: cc.Node = null;
  @property(cc.Node) SettingNode: cc.Node = null;
  @property(cc.Node) HelpNode: cc.Node = null;
  @property(cc.Node) AIAgentPlayNode: cc.Node = null;
  @property(AccountCenter) accountCenter: AccountCenter = null;
  @property(WalletConnectNode) walletConnectNode: WalletConnectNode = null;
  protected onGLoad(): void {
    this.checkAccountStatus();
    GCtrl.ES.on(
      AccountChangedEmit,
      this,
      this.onAccountChanged.bind(this),
      PRIORITY_DATA
    );
  }
  private onAccountChanged() {
    this.checkAccountStatus();
    if (this.accountCenter.node.active) {
      this.accountCenter.refreshAccountInfo();
    }
  }
  private checkAccountStatus() {
    const accountInfo = AccountMgr.initLoginStatic;
    this.walletConnectNode.node.active = !accountInfo;
    this.accountCenter.node.active = !!accountInfo;
  }
  protected onDestroy(): void {
    GCtrl.ES.off(this);
    this.TasksNode.off("click", this.TasksHandle);
    this.LeaderBoardNode.off("click", this.LeaderBoardHandle);
    this.SettingNode.off("click", this.SettingHandle);
    this.HelpNode.off("click", this.HelpHandle);
    this.AIAgentPlayNode.off("click", this.AIAgentPlayHandle);
  }
  protected start(): void {
    // this.walletConnectHandle.on("click", () => {
    //   console.log(11111);
    //   window.parent.postMessage("walletConnect", "http://192.168.0.22:9998/");
    // });
    this.TasksNode.on("click", this.TasksHandle);
    this.LeaderBoardNode.on("click", this.LeaderBoardHandle);
    this.SettingNode.on("click", this.SettingHandle);
    this.HelpNode.on("click", this.HelpHandle);
    this.AIAgentPlayNode.on("click", this.AIAgentPlayHandle);
  }
  protected TasksHandle(): void {
    GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.DailyTasks);
    console.log("TasksHandle");
  }

  protected LeaderBoardHandle(): void {
    console.log("LeaderBoardHandle");
  }

  protected SettingHandle(): void {
    console.log("SettingHandle");
  }

  protected HelpHandle(): void {
    console.log("HelpHandle");
  }

  protected AIAgentPlayHandle(): void {
    console.log("AIAgentPlayHandle");
  }
}
