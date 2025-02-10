"use strict";
cc._RF.push(module, 'a6638cReqFLTrfeOYhmxd5M', 'UIAction');
// Script/Game/Common/UIAction.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.winTweenScale = exports.delayAction = exports.scaleTo = exports.timerAction = exports.breathe = exports.blink3 = exports.blink2 = exports.blink = exports.fadeTrans = exports.fadeIn = exports.fadeOut = void 0;
/**
 * 渐隐
 * @param node 对象
 * @param delta 事件
 * @param callBack 回调
 */
function fadeOut(node, delta, callBack) {
    node.stopAllActions();
    var action = cc.fadeOut(delta);
    var cFunc = cc.callFunc(function () {
        node.active = false;
        callBack && callBack();
    });
    return node.runAction(cc.sequence(action, cFunc));
}
exports.fadeOut = fadeOut;
/**
 * 渐显
 * @param node 对象
 * @param delta 事件
 * @param callBack 回调
 */
function fadeIn(node, delta, callBack) {
    node.active = true;
    node.opacity = 0;
    node.stopAllActions();
    var action = cc.fadeIn(delta);
    var cFunc = cc.callFunc(function () {
        callBack && callBack();
    });
    return node.runAction(cc.sequence(action, cFunc));
}
exports.fadeIn = fadeIn;
/**
 * 视口切换动画，渐隐——渐显
 * @param inNode 渐显对象
 * @param outNode 渐隐对象
 * @param delta 事件
 * @param callBack 回调
 */
function fadeTrans(inNode, outNode, delta, callBack) {
    fadeOut(outNode, delta / 2, function () {
        fadeIn(inNode, delta / 2, function () {
            callBack && callBack();
        });
    });
}
exports.fadeTrans = fadeTrans;
/**
 * 闪烁
 * @param node 闪烁对象
 * @param duation 时间
 */
function blink(node, duation) {
    cc.tween(node).repeatForever(cc.tween(node).to(duation / 2, { opacity: 50 }).to(duation / 2, { opacity: 255 })).start();
}
exports.blink = blink;
function blink2(node, min, max, duation) {
    cc.tween(node).repeatForever(cc.tween(node).to(duation / 2, { opacity: max * 255 }).to(duation / 2, { opacity: min * 255 })).start();
}
exports.blink2 = blink2;
function blink3(node, duation, repeat) {
    var tween = cc.tween(node).to(duation / 2, { opacity: 50 }).to(duation / 2, { opacity: 255 });
    if (repeat) {
        tween = cc.tween(node).repeat(repeat, tween);
    }
    tween.start();
}
exports.blink3 = blink3;
/**呼吸效果 */
function breathe(node, scale, time) {
    if (scale === void 0) { scale = 0.9; }
    if (time === void 0) { time = 0.4; }
    cc.tween(node).repeatForever(cc.tween(node).to(time, { scale: scale }).to(time, { scale: 1 })).start();
}
exports.breathe = breathe;
/**
 * 定时动作
 * @param node
 * @param duation
 * @param callBack
 */
function timerAction(node, duation, callBack, rightNow) {
    if (rightNow === void 0) { rightNow = true; }
    node.stopAllActions();
    var callFunc = cc.callFunc(callBack);
    var delay = cc.delayTime(duation);
    var seq = cc.sequence(callFunc, delay);
    var repeat = cc.repeatForever(seq);
    var action = node.runAction(repeat);
    rightNow && callBack();
    return action;
}
exports.timerAction = timerAction;
function scaleTo(node, duation, cb) {
    node.stopAllActions();
    var callFunc = cc.callFunc(cb);
    var scale = cc.scaleTo(duation, 0.8);
    node.runAction(cc.sequence(scale, callFunc));
}
exports.scaleTo = scaleTo;
function delayAction(node, time, callBack) {
    var callFunc = cc.callFunc(callBack);
    var delay = cc.delayTime(time);
    var seq = cc.sequence(delay, callFunc);
    node.runAction(seq);
}
exports.delayAction = delayAction;
function winTweenScale(node) {
    node.scale = 0.6;
    node.opacity = 0;
    return cc.tween(node).to(0.2, { scale: 1, opacity: 255 });
}
exports.winTweenScale = winTweenScale;

cc._RF.pop();