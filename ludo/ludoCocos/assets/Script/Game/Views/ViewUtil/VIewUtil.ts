import ColorLog from "../../../Core/FrameEx/ColorLog";
import { timerAction } from "../../Common/UIAction";
import { GCtrl } from "./../../../Core/GCtrl";
import { LTimer } from "./../../Common/Language";
import { PreventClicksValue, TimerTaskInfo, TimerTickInfo } from "./type";

export const ViewUtil = {
  taskTick(
    info: TimerTaskInfo,
    target: cc.Node,
    lb?: cc.Label,
    sp?: cc.Sprite,
    notMsg?: boolean,
    text: string = ""
  ) {
    ColorLog.error({ TimerTaskInfo: info });
    let tickTime = info.tickTime || 0.1;
    timerAction(target, tickTime, () => {
      let totalTime = info.end - info.start;
      let now = GCtrl.now;
      let passTime = now - info.start;
      let subTime = Math.max(totalTime - passTime, 0);
      if (lb) {
        lb.string = text + LTimer(Math.floor(subTime / 1000));
      }
      if (sp) {
        sp.fillRange = subTime / totalTime;
      }
      if (info.update) info.update(subTime, totalTime);
      if (subTime == 0) {
        target.stopAllActions();
        if (info.endcb) info.endcb();
      }
    });
  },
  taskTick1(
    info: TimerTickInfo,
    target: cc.Node,
    lb?: cc.Label,
    sp?: cc.Sprite,
    notMsg?: boolean,
    text: string = ""
  ) {
    let tickTime = info.tickTime || 0.1;
    let passTime = 0;
    return timerAction(target, tickTime, () => {
      let totalTime = info.time;
      let subTime = Math.max(totalTime - passTime, 0);
      passTime += tickTime;
      if (lb) {
        lb.string = subTime.toString();
      }
      if (sp) {
        sp.fillRange = subTime / totalTime;
      }
      if (subTime === 0) {
        target.stopAllActions();
        if (info.endcb) info.endcb();
      } else if (info.update && subTime > 0) {
        info.update(subTime, totalTime);
      }
    });
  },
  func: {
    seachChildrens: (node: cc.Node, cb: any) => {
      for (let i = 0, l = node.children.length; i < l; i++) {
        let child = node.children[i];
        if (child.children.length > 0) {
          ViewUtil.func.seachChildrens(child, cb);
        }
        cb(child);
      }
      cb(node);
    },
    /**
     * 防止按钮多次点击
     * @param {cc.Node} obtn 被点击的按钮
     * @param {number} time 不能二次点击的时间
     * @param {any} startCb 开始点击函数
     * @param {any} endCb	结束点击函数
     */

    preventClicks(info: PreventClicksValue) {
      var dis = false;
      info.target.on("click", () => {
        if (!dis) {
          dis = true;
          if (info.startCb) info.startCb();
          setTimeout(function () {
            dis = false;
            if (info.endCb) info.endCb();
          }, info.time * 1000);
        }
      });
    },
  },
  addButtonHander(
    btnComponent: cc.Node | cc.Button,
    target: cc.Node,
    com: string,
    hander: string,
    customEventData?: any
  ) {
    if (btnComponent instanceof cc.Button) {
    } else {
      if (btnComponent.getComponent(cc.Button)) {
        btnComponent = btnComponent.getComponent(cc.Button);
      } else {
        btnComponent = btnComponent.addComponent(cc.Button);
      }
    }
    btnComponent.transition = cc.Button.Transition.SCALE;
    let eventHander = new cc.Component.EventHandler();
    eventHander.target = target;
    eventHander.component = com;
    eventHander.handler = hander;
    eventHander.customEventData = customEventData;
    btnComponent.clickEvents.push(eventHander);
  },
  addToggleHander(
    toggleComponent: cc.Node | cc.Toggle,
    target: cc.Node,
    com: string,
    hander: string,
    customEventData?: any
  ) {
    if (toggleComponent instanceof cc.Toggle) {
    } else {
      toggleComponent = toggleComponent.getComponent(cc.Toggle);
      if (!toggleComponent) {
        toggleComponent = toggleComponent.addComponent(cc.Toggle);
      }
    }
    let eventHander = new cc.Component.EventHandler();
    eventHander.target = target;
    eventHander.component = com;
    eventHander.handler = hander;
    eventHander.customEventData = customEventData;
    toggleComponent.checkEvents.push(eventHander);
  },
};
