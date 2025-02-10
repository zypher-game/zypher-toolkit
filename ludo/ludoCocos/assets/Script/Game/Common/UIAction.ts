
/**
 * 渐隐
 * @param node 对象
 * @param delta 事件
 * @param callBack 回调
 */
export function fadeOut(node: cc.Node, delta: number, callBack?: any): cc.Action {
    node.stopAllActions();
    let action = cc.fadeOut(delta);
    let cFunc = cc.callFunc(() => {
        node.active = false;
        callBack && callBack();
    });
    return node.runAction(cc.sequence(action, cFunc));
}

/**
 * 渐显
 * @param node 对象
 * @param delta 事件
 * @param callBack 回调
 */
export function fadeIn(node: cc.Node, delta: number, callBack?: any): cc.Action {
    node.active = true;
    node.opacity = 0;
    node.stopAllActions();
    let action = cc.fadeIn(delta);
    let cFunc = cc.callFunc(() => {
        callBack && callBack();
    });
    return node.runAction(cc.sequence(action, cFunc));
}

/**
 * 视口切换动画，渐隐——渐显
 * @param inNode 渐显对象
 * @param outNode 渐隐对象
 * @param delta 事件
 * @param callBack 回调
 */
export function fadeTrans(inNode: cc.Node, outNode: cc.Node, delta: number, callBack?: any) {
    fadeOut(outNode, delta / 2, () => {
        fadeIn(inNode, delta / 2, () => {
            callBack && callBack();
        })
    })
}

/**
 * 闪烁
 * @param node 闪烁对象
 * @param duation 时间
 */
export function blink(node: cc.Node, duation: number) {
    cc.tween(node).repeatForever(cc.tween(node).to(duation / 2, { opacity: 50 }).to(duation / 2, { opacity: 255 })).start();
}

export function blink2(node: cc.Node, min: number, max: number, duation: number) {
    cc.tween(node).repeatForever(cc.tween(node).to(duation / 2, { opacity: max * 255 }).to(duation / 2, { opacity: min * 255 })).start();
}

export function blink3(node: cc.Node, duation: number, repeat?: number) {
    let tween = cc.tween(node).to(duation / 2, { opacity: 50 }).to(duation / 2, { opacity: 255 })
    if (repeat) {
        tween = cc.tween(node).repeat(repeat, tween);
    }
    tween.start();
}
/**呼吸效果 */
export function breathe(node:cc.Node,scale:number=0.9,time:number=0.4){
         cc.tween(node).repeatForever(
                cc.tween(node).to(time, { scale: scale }).to(time, { scale: 1 })
            ).start()
}

/**
 * 定时动作
 * @param node 
 * @param duation 
 * @param callBack 
 */
export function timerAction(node: cc.Node, duation: number, callBack: any, rightNow: boolean = true) {
    node.stopAllActions();
    let callFunc = cc.callFunc(callBack);
    let delay = cc.delayTime(duation);
    let seq = cc.sequence(callFunc, delay);
    let repeat = cc.repeatForever(seq);
    let action = node.runAction(repeat);
    rightNow && callBack();
    return action;
}

export function scaleTo(node: cc.Node, duation: number, cb) {
    node.stopAllActions();
    let callFunc = cc.callFunc(cb);
    let scale = cc.scaleTo(duation, 0.8);
    node.runAction(cc.sequence(scale, callFunc))
}

export function delayAction(node: cc.Node, time: number, callBack: any) {
    let callFunc = cc.callFunc(callBack);
    let delay = cc.delayTime(time);
    let seq = cc.sequence(delay, callFunc);
    node.runAction(seq);
}

export function winTweenScale(node: cc.Node): cc.Tween {
    node.scale = 0.6;
    node.opacity = 0;
    return cc.tween(node).to(0.2, { scale: 1, opacity: 255 });
}