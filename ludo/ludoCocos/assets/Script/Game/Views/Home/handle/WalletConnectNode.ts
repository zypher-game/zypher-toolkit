import AccountMgr from "../../../Logic/AccountMgr";
const { ccclass } = cc._decorator;
@ccclass
export default class WalletConnectNode extends cc.Component {
  protected onLoad(): void {
    const button = this.getComponent(cc.Button);
    if (button) {
      button.node.on("click", this.onConnectWallet, this);
    }
  }
  private async onConnectWallet() {
    try {
      AccountMgr.ins.setAccountInfo({
        address: "0x72C408107E45984ffb931381770F501C55aA11A8",
        avatar: "",
        nickName: "xxxxx",
        pointBalance: "xxx",
      });
      this.node.active = false;
    } catch (error) {
      console.error("Wallet connect failed:", error);
    }
  }
  protected onDestroy(): void {
    const button = this.getComponent(cc.Button);
    if (button) {
      button.node.off("click", this.onConnectWallet, this);
    }
  }
}
