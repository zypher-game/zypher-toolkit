
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/TimeUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '25013McdnlH6Zh8wXVyhQPq', 'TimeUtils');
// Script/Game/Common/TimeUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JXCommon_1 = require("../../conventions/JXCommon");
var GCtrl_1 = require("./../../Core/GCtrl");
var TimeUtil = /** @class */ (function () {
    function TimeUtil() {
    }
    /** 判断俩个日期是否为同一天 */
    TimeUtil.isSameDay = function (time1, time2) {
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        return (date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDay() == date2.getDay());
    };
    TimeUtil.getSubTaskTime = function (start, end) {
        var totalTime = end - start;
        var now = GCtrl_1.GCtrl.now;
        var passTime = now - start;
        return Math.max(totalTime - passTime, 0);
    };
    /** 获取当前小时内对应0分0秒的时间戳 */
    TimeUtil.getZeroHours = function (timestamp) {
        var now = timestamp || GCtrl_1.GCtrl.now;
        var hours = new Date(now).getHours(); // 周几
        return this.getDayZero(now) + hours * JXCommon_1.JXDef.Time.HOUR;
    };
    /** 判断是否达到当前小时指定时间 */
    TimeUtil.isPassHoursTime = function (clock) {
        var now = GCtrl_1.GCtrl.now;
        var zeroTime = this.getZeroHours(now);
        return zeroTime + clock < now;
    };
    /** 判断俩个时间戳是否处于同一个小时内 */
    TimeUtil.isSameHours = function (time1, time2) {
        var zero1Time = this.getZeroHours(time1);
        var zer2Time = this.getZeroHours(time2);
        return zero1Time == zer2Time;
    };
    /** 根据时间戳获取对应当天的0点的时间戳 */
    TimeUtil.getDayZero = function (timestamp, zone) {
        if (zone === void 0) { zone = 8; }
        var zoneMills = zone * JXCommon_1.JXDef.Time.HOUR;
        return (Math.floor((timestamp + zoneMills) / 86400000) * 86400000 - zoneMills);
    };
    TimeUtil.getDayEnd = function (timestamp, zone) {
        if (zone === void 0) { zone = 8; }
        var zoneMills = zone * JXCommon_1.JXDef.Time.HOUR;
        return (Math.floor((timestamp + zoneMills) / 86400000) * 86400000 -
            zoneMills +
            86400000 -
            1000);
    };
    TimeUtil.isPassDayTime = function (clock, now) {
        now = now || GCtrl_1.GCtrl.now;
        var zeroTime = this.getDayZero(now);
        var sub = now - zeroTime;
        return sub / JXCommon_1.JXDef.Time.HOUR >= clock;
    };
    TimeUtil.getDayDiff = function (timeBefore, timeFollow) {
        var zeroBefore = TimeUtil.getDayZero(timeBefore);
        var zeroFollow = TimeUtil.getDayZero(timeFollow);
        return (zeroFollow - zeroBefore) / 86400000;
    };
    /**
     * 判断某个时间所在周与当前时间所在周，是否间隔n个自然周
     *
     * @param smallTime 需要判断的时间,需小于等于nowTime
     * @param largeTime 参与判断的另一时间戳
     * @param n 间隔的周数
     */
    TimeUtil.chkPassNWeeks = function (smallTime, largeTime, n) {
        var result = 0;
        if (smallTime > largeTime) {
            return result;
        }
        var day1 = TimeUtil.getMondayStamp(smallTime);
        var day2 = TimeUtil.getMondayStamp(largeTime);
        var passWeek = (day2 - day1) / 86400000 / 7;
        if (passWeek >= n) {
            result = 1;
        }
        return result;
    };
    TimeUtil.isSameWheek = function (time, now) {
        now = now || GCtrl_1.GCtrl.now;
        var week1 = this.getMondayStamp(time);
        var week2 = this.getMondayStamp(now);
        return week1 == week2;
    };
    TimeUtil.isPassWeekTime = function (clock, now) {
        now = now || GCtrl_1.GCtrl.now;
        var week = this.getMondayStamp(now);
        var sub = now - week;
        return sub / JXCommon_1.JXDef.Time.HOUR >= clock;
    };
    /**
     * 获取某个时间戳对应周的周一 0点的时间戳
     * @param stamp 时间戳
     */
    TimeUtil.getMondayStamp = function (stamp) {
        var day = new Date(stamp).getDay(); // 周几
        var monStamp = stamp - ((day ? day : 7) - 1) * 86400000;
        var monDate = new Date(monStamp);
        var dayZero = new Date(monDate.getFullYear(), monDate.getMonth(), monDate.getDate()).valueOf();
        return dayZero;
    };
    /**
     * 取本周内星期几的0点
     * @param {number} now 当前时间
     * @param {number} day 星期几 （周一写1， 周天写7）（和系统的0~6不一样）
     */
    TimeUtil.getDayStamp = function (now, day) {
        return TimeUtil.getMondayStamp(now) + (day - 1) * 86400000;
    };
    /**
     * 获取周星期几的指定时间
     * @param now 当前时间
     * @param day 星期几   （周一写1， 周天写7）（和系统的0~6不一样）
     * @param hour 小时
     * @param minute 分钟
     */
    TimeUtil.getDayHourStamp = function (now, day, hour, minute) {
        if (minute === void 0) { minute = 0; }
        return (TimeUtil.getMondayStamp(now) +
            (day - 1) * 86400000 +
            hour * JXCommon_1.JXDef.Time.HOUR +
            minute * JXCommon_1.JXDef.Time.MINUTE);
    };
    /** 获取给定时间对应当天的某个时间 */
    TimeUtil.getDayTimeHM = function (time, hour, minute) {
        var dayTime = new Date(time);
        var temp = new Date(dayTime.getFullYear(), dayTime.getMonth(), dayTime.getDate(), hour, minute).valueOf();
        return temp;
    };
    /** 判断两个时间是否在同一月 */
    TimeUtil.timeInSameMonth = function (time, now, preDeviation) {
        if (preDeviation === void 0) { preDeviation = 0; }
        var nowYear = new Date(now + preDeviation).getFullYear();
        var lastLoginYear = new Date(time).getFullYear();
        var nowMonth = new Date(now + preDeviation).getMonth();
        var lastLoginMonth = new Date(time).getMonth();
        if (nowYear != lastLoginYear) {
            // 隔年
            return 0;
        }
        else {
            if (nowMonth != lastLoginMonth) {
                return 0;
            }
        }
        return 1;
    };
    TimeUtil.isSameMonth = function (time1, time2, preDeviation) {
        if (preDeviation === void 0) { preDeviation = 0; }
        return this.timeInSameMonth(time1, time2, preDeviation) == 1;
    };
    /** 格式化 字符串时间 */
    TimeUtil.timestamp = function (timeStr) {
        return new Date(timeStr.replace(/-/gi, "/")).valueOf();
    };
    // public static isPassMonth(clock: number, now?: number): boolean {
    //     now = now || GCtrl.now;
    //     let date = new Date(now);
    //     let stamp = new Date(date.getFullYear(), date.getMonth(), 1);
    //     return stamp +
    // }
    TimeUtil.getYearDay = function () {
        return (Math.ceil((new Date().getTime() -
            new Date(new Date().getFullYear().toString()).getTime()) /
            (24 * JXCommon_1.JXDef.Time.HOUR)) + 1);
    };
    TimeUtil.beforeTime = function (dateTimeStamp) {
        var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        // var halfamonth = day * 15;
        var month = day * 30;
        var year = day * 365;
        var now = new Date().getTime(); //获取当前时间毫秒
        // console.log(now);
        var diffValue = now - dateTimeStamp; //时间差
        if (diffValue < 0) {
            return;
        }
        var minC = diffValue / minute; //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        var yearC = diffValue / year;
        var result;
        if (yearC >= 1) {
            result = parseInt(yearC.toString()) + "年前";
        }
        else if (monthC >= 1 && monthC <= 12) {
            result = parseInt(monthC.toString()) + "月前";
        }
        else if (weekC >= 1 && weekC <= 4) {
            result = parseInt(weekC.toString()) + "周前";
        }
        else if (dayC >= 1 && dayC <= 7) {
            result = parseInt(dayC.toString()) + "天前";
        }
        else if (hourC >= 1 && hourC <= 24) {
            result = parseInt(hourC.toString()) + "小时前";
        }
        else if (minC >= 1 && minC <= 60) {
            result = parseInt(minC.toString()) + "分钟前";
        }
        else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚";
        }
        else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10
                ? "0" + (datetime.getMonth() + 1)
                : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            // var Nhour =
            //     datetime.getHours() < 10
            //         ? "0" + datetime.getHours()
            //         : datetime.getHours();
            // var Nminute =
            //     datetime.getMinutes() < 10
            //         ? "0" + datetime.getMinutes()
            //         : datetime.getMinutes();
            // var Nsecond =
            //     datetime.getSeconds() < 10
            //         ? "0" + datetime.getSeconds()
            //         : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate;
        }
        return result;
    };
    /** 获取下一个指定点数的时间戳 */
    TimeUtil.getNextTimeByHours = function (time, now) {
        now = now || GCtrl_1.GCtrl.now;
        var hours = new Date(now).getHours(); // 现在几点
        if (time > hours) {
            // 同一天
            return this.getDayZero(now) + time * JXCommon_1.JXDef.Time.HOUR;
        }
        else {
            // 隔天
            return this.getDayZero(now) + (24 + time) * JXCommon_1.JXDef.Time.HOUR;
        }
    };
    /**
     * 获取当前日期 前几天 或后几天 指定时间戳
     * @param time
     * @param offset
     */
    TimeUtil.getOffsetTime = function (time, offset) {
        var date = new Date(GCtrl_1.GCtrl.now);
        date.setDate(date.getDate() - offset);
        date.setHours(time, 0, 0, 0);
        return date.getTime();
    };
    /**通过 "2020-1-1" 的格式获取时间 */
    TimeUtil.getTimeByString = function (str) {
        var arr = str.split("-");
        if (arr.length != 3)
            return;
        var date = new Date();
        date.setFullYear(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]));
        return date.getTime();
    };
    TimeUtil.getDateStr = function (time) {
        var now = new Date(time), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
        return (y +
            "-" +
            (m < 10 ? "0" + m : m) +
            "-" +
            (d < 10 ? "0" + d : d) +
            " " +
            now.toTimeString().substr(0, 8));
    };
    TimeUtil.formatClock = function (time, fmt) {
        var h = Math.floor(time / (60 * 60));
        var hRemain = time % (60 * 60);
        var m = Math.floor(hRemain / 60);
        var mRemain = hRemain % 60;
        var s = mRemain;
        var obj = {
            "h+": ("00" + h).substr(-2),
            "m+": ("00" + m).substr(-2),
            "s+": ("00" + s).substr(-2),
        };
        for (var key in obj) {
            var pat = "(" + key + ")";
            if (new RegExp(pat).test(fmt)) {
                var str = obj[key] + "";
                // RegExp.$1 hh mm ss贪婪匹配
                fmt = fmt.replace(RegExp.$1, str);
            }
        }
        return fmt;
    };
    /** 传入字符串格式的时间 获取对应的日期的23:59:59 */
    TimeUtil.dayEndStamp = function (timeStr) {
        var stamp = this.timestamp(timeStr) + 24 * JXCommon_1.JXDef.Time.HOUR - 1;
        return stamp;
    };
    return TimeUtil;
}());
exports.default = TimeUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVGltZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQW1EO0FBQ25ELDRDQUEyQztBQUUzQztJQUFBO0lBOFdBLENBQUM7SUE3V0MsbUJBQW1CO0lBQ0wsa0JBQVMsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEtBQWE7UUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUNMLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRWEsdUJBQWMsR0FBNUIsVUFBNkIsS0FBYSxFQUFFLEdBQVc7UUFDckQsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLEdBQUcsR0FBRyxhQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHdCQUF3QjtJQUNWLHFCQUFZLEdBQTFCLFVBQTJCLFNBQWtCO1FBQzNDLElBQUksR0FBRyxHQUFHLFNBQVMsSUFBSSxhQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksS0FBSyxHQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSztRQUNu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LENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUM7UUFFRixLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFJLEdBQUcsTUFBRyxDQUFDO1lBQ3JCLElBQUksSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN4Qix5QkFBeUI7Z0JBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkM7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQTdKRCxrQ0FBa0M7SUFDcEIsb0JBQVcsR0FBRyxVQUFVLE9BQWU7UUFDbkQsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsZ0JBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN2RSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztJQTBKSixlQUFDO0NBOVdELEFBOFdDLElBQUE7QUFFRCxrQkFBZSxRQUFRLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKWERlZiB9IGZyb20gXCIuLi8uLi9jb252ZW50aW9ucy9KWENvbW1vblwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuXHJcbmNsYXNzIFRpbWVVdGlsIHtcclxuICAvKiog5Yik5pat5L+p5Liq5pel5pyf5piv5ZCm5Li65ZCM5LiA5aSpICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NhbWVEYXkodGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcikge1xyXG4gICAgbGV0IGRhdGUxID0gbmV3IERhdGUodGltZTEpO1xyXG4gICAgbGV0IGRhdGUyID0gbmV3IERhdGUodGltZTIpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZGF0ZTEuZ2V0RnVsbFllYXIoKSA9PSBkYXRlMi5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgIGRhdGUxLmdldE1vbnRoKCkgPT0gZGF0ZTIuZ2V0TW9udGgoKSAmJlxyXG4gICAgICBkYXRlMS5nZXREYXkoKSA9PSBkYXRlMi5nZXREYXkoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0U3ViVGFza1RpbWUoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IHRvdGFsVGltZSA9IGVuZCAtIHN0YXJ0O1xyXG4gICAgbGV0IG5vdyA9IEdDdHJsLm5vdztcclxuICAgIGxldCBwYXNzVGltZSA9IG5vdyAtIHN0YXJ0O1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KHRvdGFsVGltZSAtIHBhc3NUaW1lLCAwKTtcclxuICB9XHJcblxyXG4gIC8qKiDojrflj5blvZPliY3lsI/ml7blhoXlr7nlupQw5YiGMOenkueahOaXtumXtOaIsyAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0WmVyb0hvdXJzKHRpbWVzdGFtcD86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBsZXQgbm93ID0gdGltZXN0YW1wIHx8IEdDdHJsLm5vdztcclxuICAgIGxldCBob3VyczogbnVtYmVyID0gbmV3IERhdGUobm93KS5nZXRIb3VycygpOyAvLyDlkajlh6BcclxuICAgIHJldHVybiB0aGlzLmdldERheVplcm8obm93KSArIGhvdXJzICogSlhEZWYuVGltZS5IT1VSO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWIpOaWreaYr+WQpui+vuWIsOW9k+WJjeWwj+aXtuaMh+WumuaXtumXtCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNQYXNzSG91cnNUaW1lKGNsb2NrOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGxldCBub3cgPSBHQ3RybC5ub3c7XHJcbiAgICBsZXQgemVyb1RpbWUgPSB0aGlzLmdldFplcm9Ib3Vycyhub3cpO1xyXG4gICAgcmV0dXJuIHplcm9UaW1lICsgY2xvY2sgPCBub3c7XHJcbiAgfVxyXG5cclxuICAvKiog5Yik5pat5L+p5Liq5pe26Ze05oiz5piv5ZCm5aSE5LqO5ZCM5LiA5Liq5bCP5pe25YaFICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NhbWVIb3Vycyh0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgemVybzFUaW1lID0gdGhpcy5nZXRaZXJvSG91cnModGltZTEpO1xyXG4gICAgbGV0IHplcjJUaW1lID0gdGhpcy5nZXRaZXJvSG91cnModGltZTIpO1xyXG4gICAgcmV0dXJuIHplcm8xVGltZSA9PSB6ZXIyVGltZTtcclxuICB9XHJcblxyXG4gIC8qKiDmoLnmja7ml7bpl7TmiLPojrflj5blr7nlupTlvZPlpKnnmoQw54K555qE5pe26Ze05oizICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXREYXlaZXJvKHRpbWVzdGFtcDogbnVtYmVyLCB6b25lOiBudW1iZXIgPSA4KTogbnVtYmVyIHtcclxuICAgIGxldCB6b25lTWlsbHM6IG51bWJlciA9IHpvbmUgKiBKWERlZi5UaW1lLkhPVVI7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBNYXRoLmZsb29yKCh0aW1lc3RhbXAgKyB6b25lTWlsbHMpIC8gODY0MDAwMDApICogODY0MDAwMDAgLSB6b25lTWlsbHNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldERheUVuZCh0aW1lc3RhbXA6IG51bWJlciwgem9uZTogbnVtYmVyID0gOCk6IG51bWJlciB7XHJcbiAgICBsZXQgem9uZU1pbGxzOiBudW1iZXIgPSB6b25lICogSlhEZWYuVGltZS5IT1VSO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgTWF0aC5mbG9vcigodGltZXN0YW1wICsgem9uZU1pbGxzKSAvIDg2NDAwMDAwKSAqIDg2NDAwMDAwIC1cclxuICAgICAgem9uZU1pbGxzICtcclxuICAgICAgODY0MDAwMDAgLVxyXG4gICAgICAxMDAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpc1Bhc3NEYXlUaW1lKGNsb2NrOiBudW1iZXIsIG5vdz86IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgbm93ID0gbm93IHx8IEdDdHJsLm5vdztcclxuICAgIGxldCB6ZXJvVGltZSA9IHRoaXMuZ2V0RGF5WmVybyhub3cpO1xyXG4gICAgbGV0IHN1YiA9IG5vdyAtIHplcm9UaW1lO1xyXG4gICAgcmV0dXJuIHN1YiAvIEpYRGVmLlRpbWUuSE9VUiA+PSBjbG9jaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGF5RGlmZih0aW1lQmVmb3JlOiBudW1iZXIsIHRpbWVGb2xsb3c6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBsZXQgemVyb0JlZm9yZTogbnVtYmVyID0gVGltZVV0aWwuZ2V0RGF5WmVybyh0aW1lQmVmb3JlKTtcclxuICAgIGxldCB6ZXJvRm9sbG93OiBudW1iZXIgPSBUaW1lVXRpbC5nZXREYXlaZXJvKHRpbWVGb2xsb3cpO1xyXG5cclxuICAgIHJldHVybiAoemVyb0ZvbGxvdyAtIHplcm9CZWZvcmUpIC8gODY0MDAwMDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliKTmlq3mn5DkuKrml7bpl7TmiYDlnKjlkajkuI7lvZPliY3ml7bpl7TmiYDlnKjlkajvvIzmmK/lkKbpl7TpmpRu5Liq6Ieq54S25ZGoXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc21hbGxUaW1lIOmcgOimgeWIpOaWreeahOaXtumXtCzpnIDlsI/kuo7nrYnkuo5ub3dUaW1lXHJcbiAgICogQHBhcmFtIGxhcmdlVGltZSDlj4LkuI7liKTmlq3nmoTlj6bkuIDml7bpl7TmiLNcclxuICAgKiBAcGFyYW0gbiDpl7TpmpTnmoTlkajmlbBcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGNoa1Bhc3NOV2Vla3MoXHJcbiAgICBzbWFsbFRpbWU6IG51bWJlcixcclxuICAgIGxhcmdlVGltZTogbnVtYmVyLFxyXG4gICAgbjogbnVtYmVyXHJcbiAgKTogbnVtYmVyIHtcclxuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcbiAgICBpZiAoc21hbGxUaW1lID4gbGFyZ2VUaW1lKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBsZXQgZGF5MTogbnVtYmVyID0gVGltZVV0aWwuZ2V0TW9uZGF5U3RhbXAoc21hbGxUaW1lKTtcclxuICAgIGxldCBkYXkyOiBudW1iZXIgPSBUaW1lVXRpbC5nZXRNb25kYXlTdGFtcChsYXJnZVRpbWUpO1xyXG4gICAgbGV0IHBhc3NXZWVrOiBudW1iZXIgPSAoZGF5MiAtIGRheTEpIC8gODY0MDAwMDAgLyA3O1xyXG4gICAgaWYgKHBhc3NXZWVrID49IG4pIHtcclxuICAgICAgcmVzdWx0ID0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzU2FtZVdoZWVrKHRpbWU6IG51bWJlciwgbm93KTogYm9vbGVhbiB7XHJcbiAgICBub3cgPSBub3cgfHwgR0N0cmwubm93O1xyXG4gICAgbGV0IHdlZWsxID0gdGhpcy5nZXRNb25kYXlTdGFtcCh0aW1lKTtcclxuICAgIGxldCB3ZWVrMiA9IHRoaXMuZ2V0TW9uZGF5U3RhbXAobm93KTtcclxuICAgIHJldHVybiB3ZWVrMSA9PSB3ZWVrMjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNQYXNzV2Vla1RpbWUoY2xvY2s6IG51bWJlciwgbm93PzogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBub3cgPSBub3cgfHwgR0N0cmwubm93O1xyXG4gICAgbGV0IHdlZWsgPSB0aGlzLmdldE1vbmRheVN0YW1wKG5vdyk7XHJcbiAgICBsZXQgc3ViID0gbm93IC0gd2VlaztcclxuICAgIHJldHVybiBzdWIgLyBKWERlZi5UaW1lLkhPVVIgPj0gY2xvY2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmn5DkuKrml7bpl7TmiLPlr7nlupTlkajnmoTlkajkuIAgMOeCueeahOaXtumXtOaIs1xyXG4gICAqIEBwYXJhbSBzdGFtcCDml7bpl7TmiLNcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vbmRheVN0YW1wKHN0YW1wOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IGRheTogbnVtYmVyID0gbmV3IERhdGUoc3RhbXApLmdldERheSgpOyAvLyDlkajlh6BcclxuICAgIGxldCBtb25TdGFtcDogbnVtYmVyID0gc3RhbXAgLSAoKGRheSA/IGRheSA6IDcpIC0gMSkgKiA4NjQwMDAwMDtcclxuICAgIGxldCBtb25EYXRlOiBEYXRlID0gbmV3IERhdGUobW9uU3RhbXApO1xyXG4gICAgbGV0IGRheVplcm86IG51bWJlciA9IG5ldyBEYXRlKFxyXG4gICAgICBtb25EYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgIG1vbkRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgbW9uRGF0ZS5nZXREYXRlKClcclxuICAgICkudmFsdWVPZigpO1xyXG4gICAgcmV0dXJuIGRheVplcm87XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlj5bmnKzlkajlhoXmmJ/mnJ/lh6DnmoQw54K5XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdyDlvZPliY3ml7bpl7RcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZGF5IOaYn+acn+WHoCDvvIjlkajkuIDlhpkx77yMIOWRqOWkqeWGmTfvvInvvIjlkozns7vnu5/nmoQwfjbkuI3kuIDmoLfvvIlcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldERheVN0YW1wKG5vdzogbnVtYmVyLCBkYXk6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIFRpbWVVdGlsLmdldE1vbmRheVN0YW1wKG5vdykgKyAoZGF5IC0gMSkgKiA4NjQwMDAwMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWRqOaYn+acn+WHoOeahOaMh+WumuaXtumXtFxyXG4gICAqIEBwYXJhbSBub3cg5b2T5YmN5pe26Ze0XHJcbiAgICogQHBhcmFtIGRheSDmmJ/mnJ/lh6AgICDvvIjlkajkuIDlhpkx77yMIOWRqOWkqeWGmTfvvInvvIjlkozns7vnu5/nmoQwfjbkuI3kuIDmoLfvvIlcclxuICAgKiBAcGFyYW0gaG91ciDlsI/ml7ZcclxuICAgKiBAcGFyYW0gbWludXRlIOWIhumSn1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGF5SG91clN0YW1wKFxyXG4gICAgbm93OiBudW1iZXIsXHJcbiAgICBkYXk6IG51bWJlcixcclxuICAgIGhvdXI6IG51bWJlcixcclxuICAgIG1pbnV0ZTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgVGltZVV0aWwuZ2V0TW9uZGF5U3RhbXAobm93KSArXHJcbiAgICAgIChkYXkgLSAxKSAqIDg2NDAwMDAwICtcclxuICAgICAgaG91ciAqIEpYRGVmLlRpbWUuSE9VUiArXHJcbiAgICAgIG1pbnV0ZSAqIEpYRGVmLlRpbWUuTUlOVVRFXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIOiOt+WPlue7meWumuaXtumXtOWvueW6lOW9k+WkqeeahOafkOS4quaXtumXtCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGF5VGltZUhNKFxyXG4gICAgdGltZTogbnVtYmVyLFxyXG4gICAgaG91cjogbnVtYmVyLFxyXG4gICAgbWludXRlOiBudW1iZXJcclxuICApOiBudW1iZXIge1xyXG4gICAgbGV0IGRheVRpbWU6IERhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcclxuICAgIGxldCB0ZW1wOiBudW1iZXIgPSBuZXcgRGF0ZShcclxuICAgICAgZGF5VGltZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICBkYXlUaW1lLmdldE1vbnRoKCksXHJcbiAgICAgIGRheVRpbWUuZ2V0RGF0ZSgpLFxyXG4gICAgICBob3VyLFxyXG4gICAgICBtaW51dGVcclxuICAgICkudmFsdWVPZigpO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbiAgfVxyXG5cclxuICAvKiog5Yik5pat5Lik5Liq5pe26Ze05piv5ZCm5Zyo5ZCM5LiA5pyIICovXHJcbiAgcHVibGljIHN0YXRpYyB0aW1lSW5TYW1lTW9udGgoXHJcbiAgICB0aW1lOiBudW1iZXIsXHJcbiAgICBub3c6IG51bWJlcixcclxuICAgIHByZURldmlhdGlvbjogbnVtYmVyID0gMFxyXG4gICk6IG51bWJlciB7XHJcbiAgICBsZXQgbm93WWVhcjogbnVtYmVyID0gbmV3IERhdGUobm93ICsgcHJlRGV2aWF0aW9uKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IGxhc3RMb2dpblllYXI6IG51bWJlciA9IG5ldyBEYXRlKHRpbWUpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbm93TW9udGg6IG51bWJlciA9IG5ldyBEYXRlKG5vdyArIHByZURldmlhdGlvbikuZ2V0TW9udGgoKTtcclxuICAgIGxldCBsYXN0TG9naW5Nb250aDogbnVtYmVyID0gbmV3IERhdGUodGltZSkuZ2V0TW9udGgoKTtcclxuICAgIGlmIChub3dZZWFyICE9IGxhc3RMb2dpblllYXIpIHtcclxuICAgICAgLy8g6ZqU5bm0XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG5vd01vbnRoICE9IGxhc3RMb2dpbk1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpc1NhbWVNb250aChcclxuICAgIHRpbWUxOiBudW1iZXIsXHJcbiAgICB0aW1lMjogbnVtYmVyLFxyXG4gICAgcHJlRGV2aWF0aW9uOiBudW1iZXIgPSAwXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lSW5TYW1lTW9udGgodGltZTEsIHRpbWUyLCBwcmVEZXZpYXRpb24pID09IDE7XHJcbiAgfVxyXG5cclxuICAvKiog5qC85byP5YyWIOWtl+espuS4suaXtumXtCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGltZXN0YW1wKHRpbWVTdHIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHRpbWVTdHIucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XHJcbiAgfVxyXG5cclxuICAvKiog5Lyg5YWl5a2X56ym5Liy5qC85byP55qE5pe26Ze0IOiOt+WPluWvueW6lOeahOaXpeacn+eahDIzOjU5OjU5ICovXHJcbiAgcHVibGljIHN0YXRpYyBkYXlFbmRTdGFtcCA9IGZ1bmN0aW9uICh0aW1lU3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgbGV0IHN0YW1wOiBudW1iZXIgPSB0aGlzLnRpbWVzdGFtcCh0aW1lU3RyKSArIDI0ICogSlhEZWYuVGltZS5IT1VSIC0gMTtcclxuICAgIHJldHVybiBzdGFtcDtcclxuICB9O1xyXG5cclxuICAvLyBwdWJsaWMgc3RhdGljIGlzUGFzc01vbnRoKGNsb2NrOiBudW1iZXIsIG5vdz86IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gIC8vICAgICBub3cgPSBub3cgfHwgR0N0cmwubm93O1xyXG4gIC8vICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG5vdyk7XHJcbiAgLy8gICAgIGxldCBzdGFtcCA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcclxuICAvLyAgICAgcmV0dXJuIHN0YW1wICtcclxuICAvLyB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0WWVhckRheSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgTWF0aC5jZWlsKFxyXG4gICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtXHJcbiAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKSkuZ2V0VGltZSgpKSAvXHJcbiAgICAgICAgICAoMjQgKiBKWERlZi5UaW1lLkhPVVIpXHJcbiAgICAgICkgKyAxXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBiZWZvcmVUaW1lKGRhdGVUaW1lU3RhbXA6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICB2YXIgbWludXRlID0gMTAwMCAqIDYwOyAvL+aKiuWIhu+8jOaXtu+8jOWkqe+8jOWRqO+8jOWNiuS4quaciO+8jOS4gOS4quaciOeUqOavq+enkuihqOekulxyXG4gICAgdmFyIGhvdXIgPSBtaW51dGUgKiA2MDtcclxuICAgIHZhciBkYXkgPSBob3VyICogMjQ7XHJcbiAgICB2YXIgd2VlayA9IGRheSAqIDc7XHJcbiAgICAvLyB2YXIgaGFsZmFtb250aCA9IGRheSAqIDE1O1xyXG4gICAgdmFyIG1vbnRoID0gZGF5ICogMzA7XHJcbiAgICB2YXIgeWVhciA9IGRheSAqIDM2NTtcclxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy/ojrflj5blvZPliY3ml7bpl7Tmr6vnp5JcclxuICAgIC8vIGNvbnNvbGUubG9nKG5vdyk7XHJcbiAgICB2YXIgZGlmZlZhbHVlID0gbm93IC0gZGF0ZVRpbWVTdGFtcDsgLy/ml7bpl7Tlt65cclxuXHJcbiAgICBpZiAoZGlmZlZhbHVlIDwgMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgbWluQyA9IGRpZmZWYWx1ZSAvIG1pbnV0ZTsgLy/orqHnrpfml7bpl7Tlt67nmoTliIbvvIzml7bvvIzlpKnvvIzlkajvvIzmnIhcclxuICAgIHZhciBob3VyQyA9IGRpZmZWYWx1ZSAvIGhvdXI7XHJcbiAgICB2YXIgZGF5QyA9IGRpZmZWYWx1ZSAvIGRheTtcclxuICAgIHZhciB3ZWVrQyA9IGRpZmZWYWx1ZSAvIHdlZWs7XHJcbiAgICB2YXIgbW9udGhDID0gZGlmZlZhbHVlIC8gbW9udGg7XHJcbiAgICB2YXIgeWVhckMgPSBkaWZmVmFsdWUgLyB5ZWFyO1xyXG4gICAgdmFyIHJlc3VsdDtcclxuICAgIGlmICh5ZWFyQyA+PSAxKSB7XHJcbiAgICAgIHJlc3VsdCA9IHBhcnNlSW50KHllYXJDLnRvU3RyaW5nKCkpICsgXCLlubTliY1cIjtcclxuICAgIH0gZWxzZSBpZiAobW9udGhDID49IDEgJiYgbW9udGhDIDw9IDEyKSB7XHJcbiAgICAgIHJlc3VsdCA9IHBhcnNlSW50KG1vbnRoQy50b1N0cmluZygpKSArIFwi5pyI5YmNXCI7XHJcbiAgICB9IGVsc2UgaWYgKHdlZWtDID49IDEgJiYgd2Vla0MgPD0gNCkge1xyXG4gICAgICByZXN1bHQgPSBwYXJzZUludCh3ZWVrQy50b1N0cmluZygpKSArIFwi5ZGo5YmNXCI7XHJcbiAgICB9IGVsc2UgaWYgKGRheUMgPj0gMSAmJiBkYXlDIDw9IDcpIHtcclxuICAgICAgcmVzdWx0ID0gcGFyc2VJbnQoZGF5Qy50b1N0cmluZygpKSArIFwi5aSp5YmNXCI7XHJcbiAgICB9IGVsc2UgaWYgKGhvdXJDID49IDEgJiYgaG91ckMgPD0gMjQpIHtcclxuICAgICAgcmVzdWx0ID0gcGFyc2VJbnQoaG91ckMudG9TdHJpbmcoKSkgKyBcIuWwj+aXtuWJjVwiO1xyXG4gICAgfSBlbHNlIGlmIChtaW5DID49IDEgJiYgbWluQyA8PSA2MCkge1xyXG4gICAgICByZXN1bHQgPSBwYXJzZUludChtaW5DLnRvU3RyaW5nKCkpICsgXCLliIbpkp/liY1cIjtcclxuICAgIH0gZWxzZSBpZiAoZGlmZlZhbHVlID49IDAgJiYgZGlmZlZhbHVlIDw9IG1pbnV0ZSkge1xyXG4gICAgICByZXN1bHQgPSBcIuWImuWImlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGRhdGV0aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgZGF0ZXRpbWUuc2V0VGltZShkYXRlVGltZVN0YW1wKTtcclxuICAgICAgdmFyIE55ZWFyID0gZGF0ZXRpbWUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdmFyIE5tb250aCA9XHJcbiAgICAgICAgZGF0ZXRpbWUuZ2V0TW9udGgoKSArIDEgPCAxMFxyXG4gICAgICAgICAgPyBcIjBcIiArIChkYXRldGltZS5nZXRNb250aCgpICsgMSlcclxuICAgICAgICAgIDogZGF0ZXRpbWUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgIHZhciBOZGF0ZSA9XHJcbiAgICAgICAgZGF0ZXRpbWUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGV0aW1lLmdldERhdGUoKSA6IGRhdGV0aW1lLmdldERhdGUoKTtcclxuICAgICAgLy8gdmFyIE5ob3VyID1cclxuICAgICAgLy8gICAgIGRhdGV0aW1lLmdldEhvdXJzKCkgPCAxMFxyXG4gICAgICAvLyAgICAgICAgID8gXCIwXCIgKyBkYXRldGltZS5nZXRIb3VycygpXHJcbiAgICAgIC8vICAgICAgICAgOiBkYXRldGltZS5nZXRIb3VycygpO1xyXG4gICAgICAvLyB2YXIgTm1pbnV0ZSA9XHJcbiAgICAgIC8vICAgICBkYXRldGltZS5nZXRNaW51dGVzKCkgPCAxMFxyXG4gICAgICAvLyAgICAgICAgID8gXCIwXCIgKyBkYXRldGltZS5nZXRNaW51dGVzKClcclxuICAgICAgLy8gICAgICAgICA6IGRhdGV0aW1lLmdldE1pbnV0ZXMoKTtcclxuICAgICAgLy8gdmFyIE5zZWNvbmQgPVxyXG4gICAgICAvLyAgICAgZGF0ZXRpbWUuZ2V0U2Vjb25kcygpIDwgMTBcclxuICAgICAgLy8gICAgICAgICA/IFwiMFwiICsgZGF0ZXRpbWUuZ2V0U2Vjb25kcygpXHJcbiAgICAgIC8vICAgICAgICAgOiBkYXRldGltZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgIHJlc3VsdCA9IE55ZWFyICsgXCItXCIgKyBObW9udGggKyBcIi1cIiArIE5kYXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKiDojrflj5bkuIvkuIDkuKrmjIflrprngrnmlbDnmoTml7bpl7TmiLMgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE5leHRUaW1lQnlIb3Vycyh0aW1lOiBudW1iZXIsIG5vdz86IG51bWJlcikge1xyXG4gICAgbm93ID0gbm93IHx8IEdDdHJsLm5vdztcclxuICAgIGxldCBob3VyczogbnVtYmVyID0gbmV3IERhdGUobm93KS5nZXRIb3VycygpOyAvLyDnjrDlnKjlh6DngrlcclxuICAgIGlmICh0aW1lID4gaG91cnMpIHtcclxuICAgICAgLy8g5ZCM5LiA5aSpXHJcbiAgICAgIHJldHVybiB0aGlzLmdldERheVplcm8obm93KSArIHRpbWUgKiBKWERlZi5UaW1lLkhPVVI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDpmpTlpKlcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5WmVybyhub3cpICsgKDI0ICsgdGltZSkgKiBKWERlZi5UaW1lLkhPVVI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blvZPliY3ml6XmnJ8g5YmN5Yeg5aSpIOaIluWQjuWHoOWkqSDmjIflrprml7bpl7TmiLNcclxuICAgKiBAcGFyYW0gdGltZVxyXG4gICAqIEBwYXJhbSBvZmZzZXRcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE9mZnNldFRpbWUodGltZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShHQ3RybC5ub3cpO1xyXG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gb2Zmc2V0KTtcclxuICAgIGRhdGUuc2V0SG91cnModGltZSwgMCwgMCwgMCk7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICAvKirpgJrov4cgXCIyMDIwLTEtMVwiIOeahOagvOW8j+iOt+WPluaXtumXtCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VGltZUJ5U3RyaW5nKHN0cjogc3RyaW5nKSB7XHJcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KFwiLVwiKTtcclxuICAgIGlmIChhcnIubGVuZ3RoICE9IDMpIHJldHVybjtcclxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGRhdGUuc2V0RnVsbFllYXIoTnVtYmVyKGFyclswXSksIE51bWJlcihhcnJbMV0pIC0gMSwgTnVtYmVyKGFyclsyXSkpO1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREYXRlU3RyKHRpbWU6IG51bWJlcikge1xyXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKHRpbWUpLFxyXG4gICAgICB5ID0gbm93LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgIG0gPSBub3cuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgIGQgPSBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgeSArXHJcbiAgICAgIFwiLVwiICtcclxuICAgICAgKG0gPCAxMCA/IFwiMFwiICsgbSA6IG0pICtcclxuICAgICAgXCItXCIgK1xyXG4gICAgICAoZCA8IDEwID8gXCIwXCIgKyBkIDogZCkgK1xyXG4gICAgICBcIiBcIiArXHJcbiAgICAgIG5vdy50b1RpbWVTdHJpbmcoKS5zdWJzdHIoMCwgOClcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZm9ybWF0Q2xvY2sodGltZSwgZm10KSB7XHJcbiAgICBsZXQgaCA9IE1hdGguZmxvb3IodGltZSAvICg2MCAqIDYwKSk7XHJcbiAgICBsZXQgaFJlbWFpbiA9IHRpbWUgJSAoNjAgKiA2MCk7XHJcbiAgICBsZXQgbSA9IE1hdGguZmxvb3IoaFJlbWFpbiAvIDYwKTtcclxuICAgIGxldCBtUmVtYWluID0gaFJlbWFpbiAlIDYwO1xyXG4gICAgbGV0IHMgPSBtUmVtYWluO1xyXG5cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgIFwiaCtcIjogKFwiMDBcIiArIGgpLnN1YnN0cigtMiksXHJcbiAgICAgIFwibStcIjogKFwiMDBcIiArIG0pLnN1YnN0cigtMiksXHJcbiAgICAgIFwicytcIjogKFwiMDBcIiArIHMpLnN1YnN0cigtMiksXHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgICAgbGV0IHBhdCA9IGAoJHtrZXl9KWA7XHJcbiAgICAgIGlmIChuZXcgUmVnRXhwKHBhdCkudGVzdChmbXQpKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IG9ialtrZXldICsgXCJcIjtcclxuICAgICAgICAvLyBSZWdFeHAuJDEgaGggbW0gc3PotKrlqarljLnphY1cclxuICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIHN0cik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmbXQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaW1lVXRpbDtcclxuIl19