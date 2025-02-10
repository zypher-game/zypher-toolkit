import GViewBase from '../../../Core/GView/GViewBase';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadCtrl extends GViewBase {
  @property(cc.Node) walletConnectHandle: cc.Node = null;
  protected start(): void {
    this.walletConnectHandle.on('click', () => {
      console.log(11111);
      window.parent.postMessage('walletConnect', 'http://192.168.0.22:9998/');
    });
  }
}
