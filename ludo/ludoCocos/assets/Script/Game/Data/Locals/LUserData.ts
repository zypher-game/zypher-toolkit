import {
  IGradeRankInfo,
  IRankLevel,
  ItemCostResult,
  LevelReward,
  SGuideChainDataRaw,
} from "../../../../../d.ts/game/JXCLBtl";
import { JXDef } from "../../../conventions/JXCommon";
import { INVALID_VALUE, OBJECT_COPY } from "../../../Core/CoreDefine";
import { GCtrl } from "../../../Core/GCtrl";
import { GLocal } from "../../../Core/Manager/DataPool";
import {
  CMsg,
  ITEMTYPE,
  levelBoxItem,
  RANKLV,
  rankLvBoxItem,
} from "../../Common/Define";
import { L } from "../../Common/Language";
import TimeUtil from "../../Common/TimeUtils";
import { JXLocales } from "../../Common/Zh";
import GameMgr from "../../Logic/GameMgr";

const { ccclass } = cc._decorator;
@ccclass
export class LUserData extends GLocal {
  public $localKey = "LUserData";
  //第一次登陆游戏时间
  private $fristTime: number = 0;
  /**广告累计观看次数 */
  private $adWatchTime: number;
  /**签到的时间 */
  private $signInDate: number = 0;
  /**连续签到时间 */
  private $signInCount: number = 0;
  /**金币 */
  private $_coin: number = null;
  /**体力 */
  private $_physical: number = 10;
  /**段位 */
  private $_rankLv: number = RANKLV.RANKLV1;
  /**星数 */
  private $_starCount: number = RANKLV.RANKLV0;
  /**各段位关卡通关数 */
  private $_rankPassArr: Array<number> = [];
  /**各段位关卡宝箱领取情况 */
  private $_rankLvBoxReceive: Array<Array<number>> = [];
  /**段位奖励领取数组 */
  private $_levelReward: Array<LevelReward> = null;
  /**段位奖励位置 */
  private $_levelRewardNum: number = 0;
  /**段位奖励累计场次数量 */
  private $_levelRewardWin: number = 0;
  /**虚拟用户名 */
  private $_useName: string = "帅的不明显";
  /**虚拟头像 */
  private $_head: number = 123;
  private $guide: number[] = null;
  private $hj: boolean = false;
  private $zs: boolean = false;
  onInit() {
    this.load();
    // this.initEvent();
    if (!this.$fristTime) {
      this.$fristTime = GCtrl.now;
    }
    if (!this.$guide) {
      this.$guide = [];
    }
    if (!this.$_coin) {
      let InitCoin: number = GameMgr.systemConfig.value(
        JXDef.SYS_CONFIG_KEY.InitCoin
      );
      console.log("InitCoin", InitCoin);
      this.$_coin = InitCoin;
    }

    if (!this.$_levelReward) {
      let levelReward: LevelReward = {
        adbox: levelBoxItem.adbox0,
        box: levelBoxItem.box0,
      };
      this.$_levelReward = [];
      GameMgr.levelRewardData.data.values().forEach((v, s) => {
        this.$_levelReward.push(levelReward);
      });
    }

    // if (!this.$_head) {
    //     this.$_head = MathEx.random(101, 150);
    // }
    this.set();
  }

  public get zs() {
    return this.$zs;
  }

  public set zs(v) {
    this.$zs = true;
    this.set();
  }

  public get hj() {
    return this.$hj;
  }

  public set hj(v) {
    this.$hj = true;
    this.set();
  }

  /**获取用户段位信息 */
  public get levelInfo() {
    let info: IGradeRankInfo = {
      isSelf: 1,
      name: this.$_useName,
      icon: this.$_head,
      levelLv: this.$_rankLv,
      starNum: this.$_starCount,
    };
    return info;
  }

  /**修改段位奖励领取数组 */
  public setLevelReward(value: number, index: levelBoxItem) {
    var reward: Array<LevelReward> = OBJECT_COPY(this.$_levelReward);
    if (index == levelBoxItem.doubleBox) {
      console.log("修改段位奖励领取数组", value, index);
      reward[value].adbox = levelBoxItem.adbox1;
      reward[value].box = levelBoxItem.box1;
    } else if (index == levelBoxItem.adbox1) {
      reward[value].adbox = levelBoxItem.adbox2;
    } else if (index == levelBoxItem.box1) {
      reward[value].box = levelBoxItem.box2;
    }
    this.$_levelReward = reward;
    this.set();
  }

  /**获取段位奖励领取数组某个宝箱状态 */
  public getLevelReward(v) {
    return this.$_levelReward[v];
  }

  /**获取当前任务胜利场次 */
  public get levelRewardWin() {
    return this.$_levelRewardWin;
  }

  /**设置当前任务胜利场次 */
  public set levelRewardWin(v) {
    this.$_levelRewardWin = v;
  }

  /**获取段位奖励领取条件索引 */
  public get levelRewardNum() {
    return this.$_levelRewardNum;
  }

  /**提升段位奖励领取条件索引 */
  public set levelRewardNum(v) {
    this.$_levelRewardNum++;
    this.set();
  }

  /**
   * 获取某个排位赛宝箱状态
   * @param rankLv 排位赛段位
   * @param id 那个宝箱
   */
  public getRankLvBoxReceive(rankLv: number, id: number): number {
    let type = rankLvBoxItem.NULL;
    this.$_rankLvBoxReceive.forEach((v, index) => {
      if (index === rankLv - 1) {
        v.forEach((s: number, count) => {
          if (count == id - 1) {
            type = s;
          }
        });
      }
    });
    return type;
  }

  /**初始设置宝箱状态 */
  public setRankBoxType(rankLv: number, id: number, type: number = 1) {
    // console.log("初始设置宝箱状态", id);

    if (!this.$_rankLvBoxReceive[rankLv - 1]) {
      this.$_rankLvBoxReceive[rankLv - 1] = [];
    }
    if (type == 1) {
      this.$_rankLvBoxReceive[rankLv - 1].push(rankLvBoxItem.box0);
    } else {
      this.$_rankLvBoxReceive[rankLv - 1][id - 1] = type;
    }
    this.set();
  }

  /**获取某个排位赛通关数量 */
  public getRankPassCount(v) {
    if (!this.$_rankPassArr[v]) {
      this.$_rankPassArr[v] = 0;
      this.set();
    }
    return this.$_rankPassArr[v];
    // return 9;
  }

  /**
   * 设置某个排位赛具体
   * @param index 具体段位赛
   * @param num 累加关卡数量
   */
  public setRankPassCount(index: number, num: number = 1, maxLv: number = 10) {
    if (!this.$_rankPassArr[index - 1]) {
      this.$_rankPassArr[index - 1] = 0;
    }
    this.$_rankPassArr[index - 1] += num;
    if (this.$_rankPassArr[index - 1] > maxLv) {
      this.$_rankPassArr[index - 1] = maxLv;
    }
    this.set();
  }

  /**获取当前段位 */
  public get RankLv() {
    return this.$_rankLv;
  }

  /**获取当前星星数量 */
  public get StarCount() {
    return this.$_starCount;
  }

  /**添加星星是否改变段位 */
  public setRankLv(v = 1) {
    this.$_starCount += v;
    if (this.$_starCount > 3 && this.$_rankLv != RANKLV.RANKLV7) {
      this.$_rankLv++;
      GCtrl.ES.emit(CMsg.client.view.onRankLock, this.$_rankLv);
      this.$_starCount = 0;
    } else if (this.$_rankLv >= RANKLV.RANKLV7) {
      if (this.$_starCount >= 999) {
        this.$_starCount = 999;
      }
    }

    if (this.$_starCount < 0) {
      this.$_rankLv--;
      if (this.$_rankLv < 1) {
        this.$_rankLv = 1;
        this.$_starCount = 0;
      } else {
        this.$_starCount = 2;
      }
    }
    this.set();
  }
  public isGuideOver(guideId: number) {
    let guide = this.$guide;
    return guide.indexOf(guideId) != INVALID_VALUE;
  }

  public setGuides(guideId: number) {
    if (this.$guide.indexOf(guideId) == INVALID_VALUE) {
      this.$guide.push(guideId);
      this.set();
    }
  }

  public get guide() {
    return this.$guide;
  }

  public isDoneGuide() {
    return this.$guide.length >= GameMgr.guideChainData.data.size;
  }

  public checkGuideIsOver() {
    let arr = GameMgr.guideChainData.data.values<SGuideChainDataRaw>();
    for (let index = 0; index < arr.length; index++) {
      let raw = arr[index];
      let isExit = this.isGuideOver(raw.guideId);
      if (!isExit) {
        return false;
      }
    }

    return true;
  }

  /**是否是新用户 (当天是否是用户注册当天)*/
  public checkIsNewUser() {
    return TimeUtil.isSameDay(GCtrl.now, this.$fristTime);
  }

  /**获取观看次数 */
  public get adWatchTime() {
    return this.$adWatchTime;
  }

  /**观看广告 */
  public addAdWatchTime(time: number = 1) {
    this.$adWatchTime += time;
    this.set();
  }

  /*签到开始 */
  public signIn() {
    this.$signInDate = GCtrl.now;
    // GCtrl.ES.emit(CMsg.client.home.onSign);
    this.$signInCount++;
    this.set();
    return this.$signInCount;
  }

  /**设置签到天数 */
  public setSignCount(v) {
    this.$signInCount = v;
  }

  /**获取签到天数 */
  public getSignCount() {
    return this.$signInCount;
  }

  /**是否同天签到 */
  public todayIsSignIn(): boolean {
    return TimeUtil.isSameDay(this.$signInDate, GCtrl.now) ? true : false;
  }

  /**获取金币 */
  public getCoin() {
    return this.$_coin;
  }

  /**改变金币数量 */
  public setCoin(v) {
    this.$_coin += v;
    this.set();
    GCtrl.ES.emit(CMsg.client.currency.onCurrencyChange, ITEMTYPE.COIN);
  }

  /**获取体力 */
  public get Physical() {
    return this.$_physical;
  }

  public setPhysical(v) {
    this.$_physical += v;
    this.set();
    GCtrl.ES.emit(CMsg.client.currency.onCurrencyChange, ITEMTYPE.PY);
  }

  protected getItem(v: ITEMTYPE) {
    let type = null;
    switch (v) {
      case ITEMTYPE.COIN: {
        type = this.getCoin();
        break;
      }
      case ITEMTYPE.PY: {
        type = this.Physical;
        break;
      }

      default:
        break;
    }
    return type;
  }

  /**
   * 测试消耗
   * @param type 测试类型
   * @param raw 消耗数量
   * @param times 次数
   * @param notEnoughOpen 不足的时候开启
   */

  public testCost(
    type: ITEMTYPE,
    raw: number,
    times: number = 1,
    notEnoughOpen = false
  ) {
    let result: ItemCostResult = {};
    result.cur = this.getItem(type);
    result.raw = raw;
    if (raw > 0) {
      let totalTimes = Math.floor(result.cur / raw);
      result.enough = totalTimes >= times;
      result.need = raw * times;
      result.ext = {
        enoughTimes: Math.max(0, totalTimes),
        enoughCost: Math.max(0, Math.min(totalTimes, times) * raw),
      };
      if (!result.enough) {
        if (notEnoughOpen) {
        }
        if (type == ITEMTYPE.PY) {
          result.tip = L(JXLocales.currency.py);
        } else {
          result.tip = L(JXLocales.currency.coin);
        }
      } else {
        if (type == ITEMTYPE.PY) {
          // this.setPhysical(-raw);
        } else {
          this.setCoin(-raw);
        }
      }
      return result;
    } else {
      result.enough = true;
      result.need = 0;
      result.ext = {
        enoughTimes: NaN,
        enoughCost: NaN,
      };
      return result;
    }
  }
  /**获取分页关卡数 */
  public getRank(num: number) {
    let obj: IRankLevel = {
      lv: 0,
      count: num,
    };
    let rise: number = 1;
    let star = num / 5;
    var starCount = null;
    if (star + obj.lv > rise) {
      obj.lv = parseInt(star.toString());
      if (star % 1 == 0) {
        obj.lv = star - 1;
      }
      let num1 = (star % 1).toFixed(1);
      if (num1 == "0.0") {
        obj.lv++;
        starCount = 0;
      } else {
        starCount = Number(num1) / 0.2;
      }
      obj.count = Math.ceil(starCount);
    }
    return obj;
  }
}
