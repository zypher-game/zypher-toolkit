import GComponent from "../../../Core/FrameEx/GComponent";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("MapStartCtrl")
export default class MapStartCtrl extends GComponent {
  @property() guideEditor: boolean = false;
  public initEvent() {}
  __onLoad() {
    if (CC_DEV && this.guideEditor) {
      let _OldEventTargetOn = cc.Node.prototype.on as any;
      cc.Node.prototype.on = function (type, callback, target, useCapture) {
        let self = this;
        _OldEventTargetOn.call(self, type, callback, target, useCapture);
        if (!this["___guideEvent"] && type == "touchstart") {
          _OldEventTargetOn.call(
            self,
            type,
            function (event) {
              let path = self.logPath();
              cc.log(
                "%c" +
                  `路径: ${path}, 节点世界坐标: ${self.convertToWorldSpaceAR(
                    cc.Vec2.ZERO
                  )}, 触摸点世界坐标${event.getLocation()}`,
                "color:green"
              );
            }.bind(self),
            self,
            useCapture
          );
          this["___guideEvent"] = true;
        }
      } as any;
    }
  }
}

// window["__errorHandler"] = (file, line, msg, error) => {
//     console.log(msg);

// };
// window.onerror = (event, source, line) => {
//     console.log(event);
// }
