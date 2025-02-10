
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/UIAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVUlBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFhLEVBQUUsS0FBYSxFQUFFLFFBQWM7SUFDaEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBUkQsMEJBUUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxJQUFhLEVBQUUsS0FBYSxFQUFFLFFBQWM7SUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNwQixRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBVEQsd0JBU0M7QUFF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Q0FLQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFhO0lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBSkQsc0NBSUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIOa4kOmakFxyXG4gKiBAcGFyYW0gbm9kZSDlr7nosaFcclxuICogQHBhcmFtIGRlbHRhIOS6i+S7tlxyXG4gKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCDXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmFkZU91dChub2RlOiBjYy5Ob2RlLCBkZWx0YTogbnVtYmVyLCBjYWxsQmFjaz86IGFueSk6IGNjLkFjdGlvbiB7XHJcbiAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICBsZXQgYWN0aW9uID0gY2MuZmFkZU91dChkZWx0YSk7XHJcbiAgICBsZXQgY0Z1bmMgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0aW9uLCBjRnVuYykpO1xyXG59XHJcblxyXG4vKipcclxuICog5riQ5pi+XHJcbiAqIEBwYXJhbSBub2RlIOWvueixoVxyXG4gKiBAcGFyYW0gZGVsdGEg5LqL5Lu2XHJcbiAqIEBwYXJhbSBjYWxsQmFjayDlm57osINcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWRlSW4obm9kZTogY2MuTm9kZSwgZGVsdGE6IG51bWJlciwgY2FsbEJhY2s/OiBhbnkpOiBjYy5BY3Rpb24ge1xyXG4gICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgbm9kZS5vcGFjaXR5ID0gMDtcclxuICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIGxldCBhY3Rpb24gPSBjYy5mYWRlSW4oZGVsdGEpO1xyXG4gICAgbGV0IGNGdW5jID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgIGNhbGxCYWNrICYmIGNhbGxCYWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3Rpb24sIGNGdW5jKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDop4blj6PliIfmjaLliqjnlLvvvIzmuJDpmpDigJTigJTmuJDmmL5cclxuICogQHBhcmFtIGluTm9kZSDmuJDmmL7lr7nosaFcclxuICogQHBhcmFtIG91dE5vZGUg5riQ6ZqQ5a+56LGhXHJcbiAqIEBwYXJhbSBkZWx0YSDkuovku7ZcclxuICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZhZGVUcmFucyhpbk5vZGU6IGNjLk5vZGUsIG91dE5vZGU6IGNjLk5vZGUsIGRlbHRhOiBudW1iZXIsIGNhbGxCYWNrPzogYW55KSB7XHJcbiAgICBmYWRlT3V0KG91dE5vZGUsIGRlbHRhIC8gMiwgKCkgPT4ge1xyXG4gICAgICAgIGZhZGVJbihpbk5vZGUsIGRlbHRhIC8gMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6Zeq54OBXHJcbiAqIEBwYXJhbSBub2RlIOmXqueDgeWvueixoVxyXG4gKiBAcGFyYW0gZHVhdGlvbiDml7bpl7RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBibGluayhub2RlOiBjYy5Ob2RlLCBkdWF0aW9uOiBudW1iZXIpIHtcclxuICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4obm9kZSkudG8oZHVhdGlvbiAvIDIsIHsgb3BhY2l0eTogNTAgfSkudG8oZHVhdGlvbiAvIDIsIHsgb3BhY2l0eTogMjU1IH0pKS5zdGFydCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmxpbmsyKG5vZGU6IGNjLk5vZGUsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgZHVhdGlvbjogbnVtYmVyKSB7XHJcbiAgICBjYy50d2Vlbihub2RlKS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKG5vZGUpLnRvKGR1YXRpb24gLyAyLCB7IG9wYWNpdHk6IG1heCAqIDI1NSB9KS50byhkdWF0aW9uIC8gMiwgeyBvcGFjaXR5OiBtaW4gKiAyNTUgfSkpLnN0YXJ0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBibGluazMobm9kZTogY2MuTm9kZSwgZHVhdGlvbjogbnVtYmVyLCByZXBlYXQ/OiBudW1iZXIpIHtcclxuICAgIGxldCB0d2VlbiA9IGNjLnR3ZWVuKG5vZGUpLnRvKGR1YXRpb24gLyAyLCB7IG9wYWNpdHk6IDUwIH0pLnRvKGR1YXRpb24gLyAyLCB7IG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgaWYgKHJlcGVhdCkge1xyXG4gICAgICAgIHR3ZWVuID0gY2MudHdlZW4obm9kZSkucmVwZWF0KHJlcGVhdCwgdHdlZW4pO1xyXG4gICAgfVxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxufVxyXG4vKirlkbzlkLjmlYjmnpwgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJyZWF0aGUobm9kZTpjYy5Ob2RlLHNjYWxlOm51bWJlcj0wLjksdGltZTpudW1iZXI9MC40KXtcclxuICAgICAgICAgY2MudHdlZW4obm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKHRpbWUsIHsgc2NhbGU6IHNjYWxlIH0pLnRvKHRpbWUsIHsgc2NhbGU6IDEgfSlcclxuICAgICAgICAgICAgKS5zdGFydCgpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlrprml7bliqjkvZxcclxuICogQHBhcmFtIG5vZGUgXHJcbiAqIEBwYXJhbSBkdWF0aW9uIFxyXG4gKiBAcGFyYW0gY2FsbEJhY2sgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGltZXJBY3Rpb24obm9kZTogY2MuTm9kZSwgZHVhdGlvbjogbnVtYmVyLCBjYWxsQmFjazogYW55LCByaWdodE5vdzogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIGxldCBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGNhbGxCYWNrKTtcclxuICAgIGxldCBkZWxheSA9IGNjLmRlbGF5VGltZShkdWF0aW9uKTtcclxuICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShjYWxsRnVuYywgZGVsYXkpO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxKTtcclxuICAgIGxldCBhY3Rpb24gPSBub2RlLnJ1bkFjdGlvbihyZXBlYXQpO1xyXG4gICAgcmlnaHROb3cgJiYgY2FsbEJhY2soKTtcclxuICAgIHJldHVybiBhY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2FsZVRvKG5vZGU6IGNjLk5vZGUsIGR1YXRpb246IG51bWJlciwgY2IpIHtcclxuICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIGxldCBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGNiKTtcclxuICAgIGxldCBzY2FsZSA9IGNjLnNjYWxlVG8oZHVhdGlvbiwgMC44KTtcclxuICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlLCBjYWxsRnVuYykpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxheUFjdGlvbihub2RlOiBjYy5Ob2RlLCB0aW1lOiBudW1iZXIsIGNhbGxCYWNrOiBhbnkpIHtcclxuICAgIGxldCBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGNhbGxCYWNrKTtcclxuICAgIGxldCBkZWxheSA9IGNjLmRlbGF5VGltZSh0aW1lKTtcclxuICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShkZWxheSwgY2FsbEZ1bmMpO1xyXG4gICAgbm9kZS5ydW5BY3Rpb24oc2VxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdpblR3ZWVuU2NhbGUobm9kZTogY2MuTm9kZSk6IGNjLlR3ZWVuIHtcclxuICAgIG5vZGUuc2NhbGUgPSAwLjY7XHJcbiAgICBub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgcmV0dXJuIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMiwgeyBzY2FsZTogMSwgb3BhY2l0eTogMjU1IH0pO1xyXG59Il19