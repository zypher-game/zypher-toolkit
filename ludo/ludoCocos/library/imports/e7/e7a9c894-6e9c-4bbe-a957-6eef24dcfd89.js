"use strict";
cc._RF.push(module, 'e7a9ciUbpxLvqlXbu8k3P2J', 'VIewUtil');
// Script/Game/Views/ViewUtil/VIewUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewUtil = void 0;
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var UIAction_1 = require("../../Common/UIAction");
var GCtrl_1 = require("./../../../Core/GCtrl");
var Language_1 = require("./../../Common/Language");
exports.ViewUtil = {
    taskTick: function (info, target, lb, sp, notMsg, text) {
        if (text === void 0) { text = ""; }
        ColorLog_1.default.error({ TimerTaskInfo: info });
        var tickTime = info.tickTime || 0.1;
        UIAction_1.timerAction(target, tickTime, function () {
            var totalTime = info.end - info.start;
            var now = GCtrl_1.GCtrl.now;
            var passTime = now - info.start;
            var subTime = Math.max(totalTime - passTime, 0);
            if (lb) {
                lb.string = text + Language_1.LTimer(Math.floor(subTime / 1000));
            }
            if (sp) {
                sp.fillRange = subTime / totalTime;
            }
            if (info.update)
                info.update(subTime, totalTime);
            if (subTime == 0) {
                target.stopAllActions();
                if (info.endcb)
                    info.endcb();
            }
        });
    },
    taskTick1: function (info, target, lb, sp, notMsg, text) {
        if (text === void 0) { text = ""; }
        var tickTime = info.tickTime || 0.1;
        var passTime = 0;
        return UIAction_1.timerAction(target, tickTime, function () {
            var totalTime = info.time;
            var subTime = Math.max(totalTime - passTime, 0);
            passTime += tickTime;
            if (lb) {
                lb.string = subTime.toString();
            }
            if (sp) {
                sp.fillRange = subTime / totalTime;
            }
            if (subTime === 0) {
                target.stopAllActions();
                if (info.endcb)
                    info.endcb();
            }
            else if (info.update && subTime > 0) {
                info.update(subTime, totalTime);
            }
        });
    },
    func: {
        seachChildrens: function (node, cb) {
            for (var i = 0, l = node.children.length; i < l; i++) {
                var child = node.children[i];
                if (child.children.length > 0) {
                    exports.ViewUtil.func.seachChildrens(child, cb);
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
        preventClicks: function (info) {
            var dis = false;
            info.target.on("click", function () {
                if (!dis) {
                    dis = true;
                    if (info.startCb)
                        info.startCb();
                    setTimeout(function () {
                        dis = false;
                        if (info.endCb)
                            info.endCb();
                    }, info.time * 1000);
                }
            });
        },
    },
    addButtonHander: function (btnComponent, target, com, hander, customEventData) {
        if (btnComponent instanceof cc.Button) {
        }
        else {
            if (btnComponent.getComponent(cc.Button)) {
                btnComponent = btnComponent.getComponent(cc.Button);
            }
            else {
                btnComponent = btnComponent.addComponent(cc.Button);
            }
        }
        btnComponent.transition = cc.Button.Transition.SCALE;
        var eventHander = new cc.Component.EventHandler();
        eventHander.target = target;
        eventHander.component = com;
        eventHander.handler = hander;
        eventHander.customEventData = customEventData;
        btnComponent.clickEvents.push(eventHander);
    },
    addToggleHander: function (toggleComponent, target, com, hander, customEventData) {
        if (toggleComponent instanceof cc.Toggle) {
        }
        else {
            toggleComponent = toggleComponent.getComponent(cc.Toggle);
            if (!toggleComponent) {
                toggleComponent = toggleComponent.addComponent(cc.Toggle);
            }
        }
        var eventHander = new cc.Component.EventHandler();
        eventHander.target = target;
        eventHander.component = com;
        eventHander.handler = hander;
        eventHander.customEventData = customEventData;
        toggleComponent.checkEvents.push(eventHander);
    },
};

cc._RF.pop();