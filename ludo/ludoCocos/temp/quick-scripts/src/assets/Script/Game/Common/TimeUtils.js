"use strict";
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