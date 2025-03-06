import { ObjectWrap } from "../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../Core/GCtrl";
type IAccountInfo = {
  address: string;
  avatar: string;
  nickName: string;
  pointBalance: string;
};
export const AccountChangedEmit = "account-changed";
export default class AccountMgr extends ObjectWrap {
  private static _ins: AccountMgr = null;
  private _accountInfo: IAccountInfo = null;
  public static get ins(): AccountMgr {
    if (!this._ins) {
      this._ins = new AccountMgr();
    }
    return this._ins;
  }
  // 存储登录后的账户信息
  public static get initLoginStatic(): IAccountInfo {
    return AccountMgr.ins._accountInfo;
    // this.ins().user = {
    //   address: "0x72C408107E45984ffb931381770F501C55aA11A8",
    //   avatar: "",
    //   nickName: "xxxxx",
    // };
  }
  // 设置账户信息
  public setAccountInfo(info: IAccountInfo) {
    this._accountInfo = info;
    this.emitAccountChange();
  }
  private emitAccountChange() {
    // 使用事件系统通知其他组件
    GCtrl.ES.emit(AccountChangedEmit);
  }
}
