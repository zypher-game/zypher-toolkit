import GViewBase from "../../../../Core/GView/GViewBase";
import AccountMgr from "../../../Logic/AccountMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AccountCenter extends cc.Component {
  @property(cc.Label) private addressLabel: cc.Label = null;
  @property(cc.Label) private nickNameLabel: cc.Label = null;
  @property(cc.Label) private balanceLabel: cc.Label = null;
  protected onLoad() {
    this.updateAccountInfo();
  }
  private updateAccountInfo() {
    const accountData = AccountMgr.initLoginStatic;
    if (accountData) {
      const address = accountData.address;
      const shortAddress = `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
      this.addressLabel.string = shortAddress;
      this.nickNameLabel.string = `${accountData.nickName.substring(0, 6)}...`;
      this.balanceLabel.string = accountData.pointBalance;
    }
  }
  public refreshAccountInfo() {
    this.updateAccountInfo();
  }
}
