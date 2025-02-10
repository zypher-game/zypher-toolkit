/**
 * @name
 * @author
 * @description
 * @class
 */

import { JXLocales } from "./Zh";

const { ccclass } = cc._decorator;

@ccclass
class Language {
  getStr(key: number | string, ...args): string {
    // @ts-ignore
    let msg = i18n.t(key, ...args);
    if (!msg) msg = key + "";
    return msg;
  }

  /**倒计时 时:分:秒 */
  formatTime(seconds: number): string {
    let h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    let r = "";

    r += (h > 9 ? h : "0" + h) + ":";
    r += (m > 9 ? m : "0" + m) + ":";
    r += s > 9 ? s : "0" + s;
    return r;
  }

  /**倒计时 分:秒 */
  formatTime2(seconds: number): string {
    // let h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    let r = "";

    // r += (h > 9 ? h : "0" + h) + ":";
    r += (m > 9 ? m : "0" + m) + ":";
    r += s > 9 ? s : "0" + s;
    return r;
  }

  /**倒计时 x天 时:分()sec:是否显示秒 */
  formatTime3(seconds: number, sec = false): string {
    let d = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    let h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let m = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let r = "";

    r += d == 0 ? "" : d + "日";
    r += (h > 9 ? h : "0" + h) + ":";
    r += m > 9 ? m : "0" + m;
    if (sec) {
      r += ":" + (seconds > 9 ? seconds : "0" + seconds);
    }
    return r;
  }

  /**倒计时 x天 时:分(字) */
  formatTime4(seconds: number): string {
    let d = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    let h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let m = Math.floor(seconds / 60);
    let r = "";
    if (m == 60) {
      h += 1;
      m = 0;
    }
    r += d + "天";
    r += (h > 9 ? h : "0" + h) + "时";
    r += (m > 9 ? m : "0" + m) + "fen";
    return r;
  }

  formatDayTime(seconds: number, isSec: boolean = true): string {
    let d = Math.floor(seconds / 3600 / 24);
    seconds = seconds % (3600 * 24);
    let h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    let r = "";

    if (d > 0) {
      r += d + "日";
    }
    if (h > 0 || d > 0) {
      r += (h > 9 ? h : "0" + h) + ":";
    }
    r += m > 9 ? m : "0" + m;
    isSec && (r += ":" + (s > 9 ? s : "0" + s));
    return r;
  }

  formatDate(seconds: number, isSec: boolean = true): string {
    let date = new Date(seconds * 1000);
    let y = date.getFullYear();
    let mo = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();
    if (isSec)
      return (
        y +
        "/" +
        (mo > 9 ? mo.toString() : "0" + mo) +
        "/" +
        (d > 9 ? d.toString() : "0" + d).toString() +
        (h > 9 ? h.toString() : "0" + h).toString() +
        ":" +
        (mi > 9 ? mi.toString() : "0" + mi).toString() +
        ":" +
        (s > 9 ? s.toString() : "0" + s)
      );
    else {
      return `${y}/${mo > 9 ? mo.toString() : "0" + mo}/${
        d > 9 ? d.toString() : "0" + d
      } ${h > 9 ? h.toString() : "0" + h}:${mi > 9 ? mi.toString() : "0" + mi}`;
    }
  }

  /** [年，月，日，时，分，秒] */
  formatHours(time: number) {
    let date = new Date(time);
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let r = "";

    r += (h > 9 ? h : "0" + h) + ":";
    r += (m > 9 ? m : "0" + m) + ":";
    r += s > 9 ? s : "0" + s;
    return r;
  }

  formatDay(time: number) {
    let date = new Date(time);
    let m = date.getMonth();
    let d = date.getDay();
    let r = "";

    r += (m > 9 ? m : "0" + m) + "月";
    r += (d > 9 ? d : "0" + d) + "日";
    return r;
  }

  /**
   * 以最小方式显示时间差单位
   * @param second 时间差,单位秒
   */
  formatTimeOut(second: number) {
    if (second < 60) {
      return second + "秒" + "前";
    } else if (second < 3600) {
      let min = Math.floor(second / 60);
      return min + "分" + "前";
    } else if (second < 3600 * 24) {
      let h = Math.floor(second / 3600);
      return h + "时" + "前";
    } else {
      let d = Math.floor(second / (3600 * 24));
      return d + "天" + "前";
    }
  }

  /** 计算出虚拟币中文单位 */
  coinToCN(num: number): string {
    num = Math.floor(num);
    if (num < 10000) return String(num);
    else if (num < 100000)
      return Math.floor(num / 10) / 1000 + this.getStr(JXLocales.tth);
    else if (num < 1000000)
      return Math.floor(num / 100) / 100 + this.getStr(JXLocales.tth);
    else if (num < 10000000)
      return Math.floor(num / 1000) / 10 + this.getStr(JXLocales.tth);
    else if (num < 100000000)
      return Math.floor(num / 10000) + this.getStr(JXLocales.tth);
    else if (num < 1000000000)
      return Math.floor(num / 100000) / 1000 + this.getStr("亿");
    else if (num < 10000000000)
      return Math.floor(num / 1000000) / 100 + this.getStr("亿");
    else if (num < 100000000000)
      return Math.floor(num / 10000000) / 10 + this.getStr("hmi");
    else if (num < 1000000000000)
      return Math.floor(num / 100000000) + this.getStr("hmi");
    else return "9999" + this.getStr("hmi") + "+";
  }

  formatNumber(num: number, point: number = 2) {
    if (num >= 1000000000) {
      return Math.floor(num / 100000000) + this.getStr("hmi");
    } else if (num >= 10000) {
      return (num / 10000).toFixed(point) + this.getStr(JXLocales.tth);
    }
    return num + "";
  }

  formatNumberInEn(num: number) {
    if (num >= 100000000) {
      return Math.floor(num / 1000000) + "M";
    } else if (num >= 10000) {
      return Math.floor(num / 1000) + "K";
    }
    return num + "";
  }

  toFixed(num: number, fixed: number) {
    const regexp = /(?:\.0*|(\.\d+?)0+)$/;
    return (num * 100).toFixed(fixed).replace(regexp, "$1");
  }

  numToCh(section) {
    var chnNumChar = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
    ];
    var chnUnitChar = ["", "十", "百", "千", "万"];
    var strIns = "",
      chnStr = "";
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    if (
      chnStr[0] == this.getStr("number_1") &&
      chnStr[1] == this.getStr("number_10")
    ) {
      chnStr = chnStr.substr(1);
    }
    return chnStr;
  }
}

var language = new Language();
export const L = language.getStr.bind(language) as { (...args): string };

export const LTimer = language.formatTime.bind(language) as {
  (seconds: number): string;
};
export const LTimer2 = language.formatTime2.bind(language) as {
  (seconds: number): string;
};
export const LTimer3 = language.formatTime3.bind(language) as {
  (seconds: number, sec?: boolean): string;
};
export const LTimer4 = language.formatTime4.bind(language) as {
  (seconds: number): string;
};
export const LDayTimer = language.formatDayTime.bind(language) as {
  (seconds: number): string;
};
export const LDate = language.formatDate.bind(language) as {
  (seconds: number, isSec?: boolean): string;
};
export const LFormatHours = language.formatHours.bind(language) as {
  (time: number): string;
};
export const LFormatDay = language.formatDay.bind(language) as {
  (time: number): string;
};
export const LFormatTimeOut = language.formatTimeOut.bind(language) as {
  (second: number): string;
};
export const LnumToCh = language.numToCh.bind(language) as {
  (time: number): string;
};

export const LCoin = language.coinToCN.bind(language) as {
  (num: number): string;
};
export const LNumber = language.formatNumber.bind(language) as {
  (num: number): string;
};
export const LNumberInEn = language.formatNumberInEn.bind(language) as {
  (num: number): string;
};
