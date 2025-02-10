import GComponent from "../../../Core/FrameEx/GComponent";

const { ccclass, menu } = cc._decorator;
@ccclass
@menu("AppStart")
export default class AppStart extends GComponent {
  protected __onLoad(): void {
    // 主页面
    window.addEventListener("message", (event) => {
      if (event.origin === window.location.origin) {
        console.log("Message from iframe:", event.data);
      } else {
        console.log("event.origin:", event.origin);
      }
    });
  }
}
