
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/ViewUtil/VIewUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9WaWV3VXRpbC9WSWV3VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFDdEQsa0RBQW9EO0FBQ3BELCtDQUE4QztBQUM5QyxvREFBaUQ7QUFHcEMsUUFBQSxRQUFRLEdBQUc7SUFDdEIsUUFBUSxFQUFSLFVBQ0UsSUFBbUIsRUFDbkIsTUFBZSxFQUNmLEVBQWEsRUFDYixFQUFjLEVBQ2QsTUFBZ0IsRUFDaEIsSUFBaUI7UUFBakIscUJBQUEsRUFBQSxTQUFpQjtRQUVqQixrQkFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO1FBQ3BDLHNCQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtZQUM1QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQUcsYUFBSyxDQUFDLEdBQUcsQ0FBQztZQUNwQixJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsSUFBSSxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxJQUFJ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ZSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0Q7U0FDRjtRQUNELElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixXQUFXLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUM1QixXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUM5QyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0YsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvckxvZyBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0NvbG9yTG9nXCI7XHJcbmltcG9ydCB7IHRpbWVyQWN0aW9uIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9VSUFjdGlvblwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLy4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgTFRpbWVyIH0gZnJvbSBcIi4vLi4vLi4vQ29tbW9uL0xhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByZXZlbnRDbGlja3NWYWx1ZSwgVGltZXJUYXNrSW5mbywgVGltZXJUaWNrSW5mbyB9IGZyb20gXCIuL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBWaWV3VXRpbCA9IHtcclxuICB0YXNrVGljayhcclxuICAgIGluZm86IFRpbWVyVGFza0luZm8sXHJcbiAgICB0YXJnZXQ6IGNjLk5vZGUsXHJcbiAgICBsYj86IGNjLkxhYmVsLFxyXG4gICAgc3A/OiBjYy5TcHJpdGUsXHJcbiAgICBub3RNc2c/OiBib29sZWFuLFxyXG4gICAgdGV4dDogc3RyaW5nID0gXCJcIlxyXG4gICkge1xyXG4gICAgQ29sb3JMb2cuZXJyb3IoeyBUaW1lclRhc2tJbmZvOiBpbmZvIH0pO1xyXG4gICAgbGV0IHRpY2tUaW1lID0gaW5mby50aWNrVGltZSB8fCAwLjE7XHJcbiAgICB0aW1lckFjdGlvbih0YXJnZXQsIHRpY2tUaW1lLCAoKSA9PiB7XHJcbiAgICAgIGxldCB0b3RhbFRpbWUgPSBpbmZvLmVuZCAtIGluZm8uc3RhcnQ7XHJcbiAgICAgIGxldCBub3cgPSBHQ3RybC5ub3c7XHJcbiAgICAgIGxldCBwYXNzVGltZSA9IG5vdyAtIGluZm8uc3RhcnQ7XHJcbiAgICAgIGxldCBzdWJUaW1lID0gTWF0aC5tYXgodG90YWxUaW1lIC0gcGFzc1RpbWUsIDApO1xyXG4gICAgICBpZiAobGIpIHtcclxuICAgICAgICBsYi5zdHJpbmcgPSB0ZXh0ICsgTFRpbWVyKE1hdGguZmxvb3Ioc3ViVGltZSAvIDEwMDApKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3ApIHtcclxuICAgICAgICBzcC5maWxsUmFuZ2UgPSBzdWJUaW1lIC8gdG90YWxUaW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbmZvLnVwZGF0ZSkgaW5mby51cGRhdGUoc3ViVGltZSwgdG90YWxUaW1lKTtcclxuICAgICAgaWYgKHN1YlRpbWUgPT0gMCkge1xyXG4gICAgICAgIHRhcmdldC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGlmIChpbmZvLmVuZGNiKSBpbmZvLmVuZGNiKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdGFza1RpY2sxKFxyXG4gICAgaW5mbzogVGltZXJUaWNrSW5mbyxcclxuICAgIHRhcmdldDogY2MuTm9kZSxcclxuICAgIGxiPzogY2MuTGFiZWwsXHJcbiAgICBzcD86IGNjLlNwcml0ZSxcclxuICAgIG5vdE1zZz86IGJvb2xlYW4sXHJcbiAgICB0ZXh0OiBzdHJpbmcgPSBcIlwiXHJcbiAgKSB7XHJcbiAgICBsZXQgdGlja1RpbWUgPSBpbmZvLnRpY2tUaW1lIHx8IDAuMTtcclxuICAgIGxldCBwYXNzVGltZSA9IDA7XHJcbiAgICByZXR1cm4gdGltZXJBY3Rpb24odGFyZ2V0LCB0aWNrVGltZSwgKCkgPT4ge1xyXG4gICAgICBsZXQgdG90YWxUaW1lID0gaW5mby50aW1lO1xyXG4gICAgICBsZXQgc3ViVGltZSA9IE1hdGgubWF4KHRvdGFsVGltZSAtIHBhc3NUaW1lLCAwKTtcclxuICAgICAgcGFzc1RpbWUgKz0gdGlja1RpbWU7XHJcbiAgICAgIGlmIChsYikge1xyXG4gICAgICAgIGxiLnN0cmluZyA9IHN1YlRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3ApIHtcclxuICAgICAgICBzcC5maWxsUmFuZ2UgPSBzdWJUaW1lIC8gdG90YWxUaW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdWJUaW1lID09PSAwKSB7XHJcbiAgICAgICAgdGFyZ2V0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKGluZm8uZW5kY2IpIGluZm8uZW5kY2IoKTtcclxuICAgICAgfSBlbHNlIGlmIChpbmZvLnVwZGF0ZSAmJiBzdWJUaW1lID4gMCkge1xyXG4gICAgICAgIGluZm8udXBkYXRlKHN1YlRpbWUsIHRvdGFsVGltZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZnVuYzoge1xyXG4gICAgc2VhY2hDaGlsZHJlbnM6IChub2RlOiBjYy5Ob2RlLCBjYjogYW55KSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBWaWV3VXRpbC5mdW5jLnNlYWNoQ2hpbGRyZW5zKGNoaWxkLCBjYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNiKGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgICBjYihub2RlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOmYsuatouaMiemSruWkmuasoeeCueWHu1xyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBvYnRuIOiiq+eCueWHu+eahOaMiemSrlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUg5LiN6IO95LqM5qyh54K55Ye755qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gc3RhcnRDYiDlvIDlp4vngrnlh7vlh73mlbBcclxuICAgICAqIEBwYXJhbSB7YW55fSBlbmRDYlx057uT5p2f54K55Ye75Ye95pWwXHJcbiAgICAgKi9cclxuXHJcbiAgICBwcmV2ZW50Q2xpY2tzKGluZm86IFByZXZlbnRDbGlja3NWYWx1ZSkge1xyXG4gICAgICB2YXIgZGlzID0gZmFsc2U7XHJcbiAgICAgIGluZm8udGFyZ2V0Lm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmICghZGlzKSB7XHJcbiAgICAgICAgICBkaXMgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKGluZm8uc3RhcnRDYikgaW5mby5zdGFydENiKCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGlzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLmVuZENiKSBpbmZvLmVuZENiKCk7XHJcbiAgICAgICAgICB9LCBpbmZvLnRpbWUgKiAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGFkZEJ1dHRvbkhhbmRlcihcclxuICAgIGJ0bkNvbXBvbmVudDogY2MuTm9kZSB8IGNjLkJ1dHRvbixcclxuICAgIHRhcmdldDogY2MuTm9kZSxcclxuICAgIGNvbTogc3RyaW5nLFxyXG4gICAgaGFuZGVyOiBzdHJpbmcsXHJcbiAgICBjdXN0b21FdmVudERhdGE/OiBhbnlcclxuICApIHtcclxuICAgIGlmIChidG5Db21wb25lbnQgaW5zdGFuY2VvZiBjYy5CdXR0b24pIHtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChidG5Db21wb25lbnQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHtcclxuICAgICAgICBidG5Db21wb25lbnQgPSBidG5Db21wb25lbnQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYnRuQ29tcG9uZW50ID0gYnRuQ29tcG9uZW50LmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBidG5Db21wb25lbnQudHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFO1xyXG4gICAgbGV0IGV2ZW50SGFuZGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIGV2ZW50SGFuZGVyLnRhcmdldCA9IHRhcmdldDtcclxuICAgIGV2ZW50SGFuZGVyLmNvbXBvbmVudCA9IGNvbTtcclxuICAgIGV2ZW50SGFuZGVyLmhhbmRsZXIgPSBoYW5kZXI7XHJcbiAgICBldmVudEhhbmRlci5jdXN0b21FdmVudERhdGEgPSBjdXN0b21FdmVudERhdGE7XHJcbiAgICBidG5Db21wb25lbnQuY2xpY2tFdmVudHMucHVzaChldmVudEhhbmRlcik7XHJcbiAgfSxcclxuICBhZGRUb2dnbGVIYW5kZXIoXHJcbiAgICB0b2dnbGVDb21wb25lbnQ6IGNjLk5vZGUgfCBjYy5Ub2dnbGUsXHJcbiAgICB0YXJnZXQ6IGNjLk5vZGUsXHJcbiAgICBjb206IHN0cmluZyxcclxuICAgIGhhbmRlcjogc3RyaW5nLFxyXG4gICAgY3VzdG9tRXZlbnREYXRhPzogYW55XHJcbiAgKSB7XHJcbiAgICBpZiAodG9nZ2xlQ29tcG9uZW50IGluc3RhbmNlb2YgY2MuVG9nZ2xlKSB7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b2dnbGVDb21wb25lbnQgPSB0b2dnbGVDb21wb25lbnQuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSk7XHJcbiAgICAgIGlmICghdG9nZ2xlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgdG9nZ2xlQ29tcG9uZW50ID0gdG9nZ2xlQ29tcG9uZW50LmFkZENvbXBvbmVudChjYy5Ub2dnbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZXZlbnRIYW5kZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgZXZlbnRIYW5kZXIudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgZXZlbnRIYW5kZXIuY29tcG9uZW50ID0gY29tO1xyXG4gICAgZXZlbnRIYW5kZXIuaGFuZGxlciA9IGhhbmRlcjtcclxuICAgIGV2ZW50SGFuZGVyLmN1c3RvbUV2ZW50RGF0YSA9IGN1c3RvbUV2ZW50RGF0YTtcclxuICAgIHRvZ2dsZUNvbXBvbmVudC5jaGVja0V2ZW50cy5wdXNoKGV2ZW50SGFuZGVyKTtcclxuICB9LFxyXG59O1xyXG4iXX0=