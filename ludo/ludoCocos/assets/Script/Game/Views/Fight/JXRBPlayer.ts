import { IChessBtl } from "../../../../../d.ts/game/JXCLBtl";
import { JXDef } from "../../../conventions/JXCommon";
import { INVALID_VALUE, INVALID_VALUE_ZERO } from "../../../Core/CoreDefine";
import ColorLog from "../../../Core/FrameEx/ColorLog";
import { MapWrap } from "../../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../../Core/GCtrl";
import GParam from "../../../Core/GEvent/GParam";
import GChild from "../../../Core/GView/GChild";
import { AudioMgr } from "../../../Core/Manager/AudioMgr";
import MathEx from "../../../Core/Math/MathEx";
import { CMsg, GRID_TYPE } from "../../Common/Define";
import { Res } from "../../Common/UIResources";
import { JXLocales } from "../../Common/Zh";
import GuideComponent from "../../Guide/GuideComponent";
import GameMgr from "../../Logic/GameMgr";
import { ViewUtil } from "../ViewUtil/VIewUtil";
import { JXRoundTimer } from "./JXBattleUtility";
import JXRBCmdMgr from "./JXRBCmdMgr";
import { JXRBRole } from "./JXRBRole";
import { JXBtlBEMT, JXEDir, ROLE_COMP_NAME } from "./JXULDefine";
import { FAST_TRACK_ROUTE } from "./PlayerNumber";

const { ccclass, property, menu } = cc._decorator;

export const MaxSixTime = 2;
@ccclass
@menu("fight/JXRBPlayer")
export default class JXRBPlayer extends GChild {
  @property({
    type: cc.Label,
    tooltip: "倒计时",
  })
  lab: cc.Label = null;
  @property(cc.Label) pname: cc.Label = null;
  @property(cc.Sprite) icon: cc.Sprite = null;
  @property(cc.Sprite) headBg: cc.Sprite = null;
  @property(cc.Node) blackBg: cc.Node = null;
  @property(cc.Node) you: cc.Node = null;
  private _heroInfo: IChessBtl = null;

  /**角色 */
  private _roles: MapWrap<string, JXRBRole> = null;
  /**战斗命令管理 */
  private _cmd: JXRBCmdMgr = null;
  /**行动时间 */
  private _cdTimes: number[] = null;
  /**当前回合 */
  private _curRound: number = null;
  /**回合时间 */
  private countTime: number = null;
  private _lastNum: number = INVALID_VALUE;
  private _sixTime: number = INVALID_VALUE_ZERO;
  public set lastNum(v: number) {
    this._lastNum = v;
  }
  public set sixTime(v: number) {
    this._sixTime = v;
  }
  /** 生效回合定时器 */
  private lifeTimer: MapWrap<number, JXRoundTimer> = null;
  private timerRound: number = null;
  /** 角色身上的BUFF */
  public buffs: number[];
  private _playerId: string = null;
  private _isCastRound: boolean = false;
  public get playerId() {
    return this._playerId;
  }

  private timerAction: cc.Action = null;

  public onGLoad(): void {
    this.buffs = [];
    this.lifeTimer = new MapWrap<number, JXRoundTimer>();
    GCtrl.ES.on(
      CMsg.client.fight.onPlayerDice,
      this,
      this.onPlayerDice.bind(this)
    );
  }

  public initData(info: IChessBtl, cmd: JXRBCmdMgr) {
    this._heroInfo = info;
    this.lab.string = "Ready";
    this._cmd = cmd;
    this._cmd.evtMgr.register(
      CMsg.client.fight.endFight,
      this,
      this.onEndFight.bind(this)
    );
    this._cdTimes = GameMgr.systemConfig.value<number[]>(
      JXDef.SYS_CONFIG_KEY.robotDiceTime
    );
    this._roles = new MapWrap<string, JXRBRole>();
    this.pname.string = info.name;
    this.assetImpl.spriteAtlasFrame(
      this.icon,
      Res.common.npcHead,
      info.icon.toString()
    );
    this._playerId = info.id;

    if (
      this._playerId == "Player." + GRID_TYPE.BULE.toString() ||
      this._playerId == "Player." + GRID_TYPE.GREEN.toString()
    ) {
      this.blackBg.scaleX = -1;
    }
  }

  protected onEndFight(): void {
    this.lab.node.stopAllActions();
    this.lifeTimer = null;
  }

  /**设置队伍 */
  public setRole(role: JXRBRole) {
    this._roles.set(role.id, role);
  }

  /**将角色移除 但是界面没有移除 */
  public removeRole(id: string) {
    if (this._roles.has(id)) {
      this._roles.delete(id);
    }
  }

  /**计时器计数 */
  protected checkTimer(curRound: number) {
    if (curRound === this.timerRound || this._isCastRound) {
      return;
    }
    this.timerRound = curRound;
    this.lifeTimer.forEach((timer) => {
      timer.life();
    });
  }
  /**确认是否有对应buff */
  public checkHaveBuffByBEMT(nType: JXBtlBEMT): boolean {
    let timer = this.lifeTimer.get(nType);
    if (timer) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 玩家开始行动倒计时
   * @param curRound 当前回合
   * @param isSix 是否是6
   */
  public startActionTimer(curRound: number, isSix: boolean = false) {
    if (this._heroInfo.isPlayer) {
      GCtrl.ES.emit(CMsg.client.fight.onChangeDiceBtn, new GParam(true));
    }
    this._curRound = curRound;
    if (!isSix) {
      let local = `第${this._curRound}回合【${
        ROLE_COMP_NAME[this._heroInfo.dir]
      }】开始行动`;
      console.group(local);
    } else {
      let local = `【${
        ROLE_COMP_NAME[this._heroInfo.dir]
      }】因投掷到六获得一次行动机会`;
      console.log(local);
    }
    let index = MathEx.random(0, this._cdTimes.length - 1);
    let cdTime = this._cdTimes[index];
    let time = GameMgr.systemConfig.value<number>(
      JXDef.SYS_CONFIG_KEY.roundTime
    ); //回合时间
    this.countTime = time;
    this.lab.string = this.countTime.toString();
    this.lab.node.parent.active = true; //回合时间倒计时
    this.you.active = true;
    this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "curhead");
    let isPlayer = this._heroInfo.isPlayer;
    this.timerAction = ViewUtil.taskTick1(
      {
        time: time,
        tickTime: 1,
        update: function (sub: number) {
          if (!isPlayer) {
            if (cdTime === 0) {
              this.throwDice();
            }
            cdTime--;
          }
        }.bind(this),
        endcb: this.startActionTimeEnd.bind(this),
      },
      this.lab.node,
      this.lab
    );
  }

  /**开始行动倒计时结束 */
  protected startActionTimeEnd() {
    if (this._heroInfo.isPlayer) {
      this.endCurStep(2, 0);
      this.endCurStep(2, 2);
      this.throwDice();
      GCtrl.ES.emit(CMsg.client.fight.onChangeDiceBtn, new GParam(false));
    } else {
      this.throwDice();
    }
  }

  /**玩家投掷骰子 */
  protected onPlayerDice() {
    ColorLog.esOn("CMsg.client.fight.onPlayerDice");
    if (this._heroInfo.isPlayer) {
      this.throwDice();
      GCtrl.ES.emit(CMsg.client.fight.onChangeDiceBtn, new GParam(false));
    }
  }

  /**投掷骰子获取实际数值 */
  protected throwDice() {
    AudioMgr.Ins().playEffect(Res.common.audio.touzi);
    this.lab.node.stopAction(this.timerAction);
    this.timerAction = null;
    this.lab.node.parent.active = false;
    this.you.active = false;
    this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "head_bg");
    let roles = this._cmd.getRoles((role) => {
      return role.isBorn;
    });
    let isFirst = roles.length === 0;
    this._cmd.throwDice(
      Number(this._heroInfo.dir),
      // (num: number) => {
      (_num: number) => {
        let num = FAST_TRACK_ROUTE[this._heroInfo.dir][this._curRound]
          ? FAST_TRACK_ROUTE[this._heroInfo.dir][this._curRound]
          : _num;
        if (num === 6) {
          console.log({ _sixTime: this._sixTime });
          if (this._sixTime < MaxSixTime) {
            this._sixTime++;
          }
        }
        let local = `【${
          ROLE_COMP_NAME[this._heroInfo.dir]
        }】投掷骰子：${num}   ---- _heroInfo: ${JSON.stringify(
          this._heroInfo
        )}  _curRound: ${this._curRound}`;
        console.log(local);

        this._lastNum = num;
        let isBan = this.checkHaveBuffByBEMT(JXBtlBEMT.BanTakeOff);
        let canBorn = this._lastNum === 6;
        let roles = null;
        console.log({ isBan, canBorn });
        if (isBan) {
          roles = this._cmd.getRoles((role) => {
            return (
              role.dir === this._heroInfo.dir &&
              role.isBorn != (canBorn && !isBan)
            );
          });
        } else {
          roles = this._cmd.getRoles((role) => {
            return role.dir === this._heroInfo.dir;
          });
        }
        if (this._heroInfo.isPlayer) {
          let isBanTakeOff = this.checkHaveBuffByBEMT(JXBtlBEMT.BanTakeOff);
          if (this._lastNum) {
            roles.forEach((role: JXRBRole) => {
              role.showCanMoveAni(this._lastNum, isBanTakeOff);
            });
          }
        }
        if (roles.length) {
          this.doMoveActionTimer();
        } else {
        }
      },
      isFirst ? 6 : null
    );
  }

  /**移动倒计时 */
  protected doMoveActionTimer() {
    let time = GameMgr.systemConfig.value<number>(
      JXDef.SYS_CONFIG_KEY.moveCountDown
    );
    this.countTime = time;
    this.lab.string = this.countTime.toString();
    this.lab.node.parent.active = true;
    this.you.active = true;
    this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "curhead");
    let isPlayer = this._heroInfo.isPlayer;
    let index = MathEx.random(0, this._cdTimes.length - 1);
    let cdTime = this._cdTimes[index];
    let isBanTakeOff = this.checkHaveBuffByBEMT(JXBtlBEMT.BanTakeOff);
    let role = this._cmd.randomRoleToAction(
      this._lastNum,
      this._heroInfo.dir,
      isBanTakeOff
    );
    if (!role) {
      this.moveAction(role);
      return;
    }
    this.timerAction = ViewUtil.taskTick1(
      {
        time: time,
        tickTime: 1,
        update: function (sub: number) {
          if (!isPlayer) {
            if (cdTime === 0) {
              this.moveAction(role);
            }
            cdTime--;
          }
        }.bind(this),
        endcb: this.moveActionTimeEnd.bind(this),
      },
      this.lab.node,
      this.lab
    );
  }

  /**进行移动 */
  public moveAction(role: JXRBRole, endFunc?, num?: number) {
    if (!endFunc) {
      endFunc = () => {
        this.doSkillActionTimer();
      };
    }
    if (this._heroInfo.isPlayer) {
      this._roles.forEach((role) => {
        role.hideCanMoveAni();
      });
    }
    this.lab.node.stopAction(this.timerAction);
    this.timerAction = null;
    this.lab.node.parent.active = false;
    this.you.active = false;
    this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "head_bg");
    if (!role) {
      let local = `【${ROLE_COMP_NAME[this._heroInfo.dir]}】不存在可行动目标`;
      console.log(local);
      endFunc();
      return;
    }

    if (this._lastNum === 6 || (num && num === 6)) {
      // *确认是否起飞
      if (!role.isBorn) {
        role.planeTakeOff(() => {
          let local = `【${ROLE_COMP_NAME[this._heroInfo.dir]}】${role.id}起飞`;
          console.log(local);
          endFunc();
        });
      } else {
        role.planeMove(this._lastNum, () => {
          let local = `【${ROLE_COMP_NAME[this._heroInfo.dir]}】${
            role.id
          }开始飞行 步数为：${this._lastNum}`;
          console.log(local);
          endFunc();
        });
      }
    } else {
      role.planeMove(this._lastNum, () => {
        let local = `【${ROLE_COMP_NAME[this._heroInfo.dir]}】${
          role.id
        }开始飞行 步数为：${this._lastNum}`;
        console.log(local);
        endFunc();
      });
    }
  }

  /**技能倒计时 */
  public doSkillActionTimer() {
    this.scheduleOnce(() => {
      this.countTime = 0;
      this.you.active = true;
      this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "curhead");
      let isPlayer = this._heroInfo.isPlayer;
      let index = MathEx.random(0, this._cdTimes.length - 1);
      let cdTime = this._cdTimes[index];
      this.timerAction = ViewUtil.taskTick1(
        {
          time: 0,
          tickTime: 1,
          update: function (sub: number) {
            if (!isPlayer) {
              if (cdTime === 0) {
                this.skillTimeEnd();
              }
              cdTime--;
            }
          }.bind(this),
          endcb: this.skillTimeEnd.bind(this),
        },
        this.lab.node,
        this.lab
      );
    }, 1);
  }

  /**技能倒计时结束 */
  protected skillTimeEnd() {
    this.lab.node.stopAction(this.timerAction);
    this.timerAction = null;
    this.lab.node.parent.active = false;
    this.you.active = false;
    this._assetImpl.spriteAtlasFrame(this.headBg, Res.fight.fight, "head_bg");
    this.onPlyerCastSkillOver();
  }
  /**技能使用结束 */
  protected onPlyerCastSkillOver() {
    this.endCurStep(2, 0);
    this.endCurStep(2, 2);
    if (this._lastNum === 6) {
      if (this._sixTime < MaxSixTime) {
        this.startActionTimer(this._curRound, true);
      } else {
        this._sixTime = INVALID_VALUE_ZERO;
        this.playerEndAction();
      }
    } else {
      this.playerEndAction();
    }
  }
  /**倒计时结束 */
  protected moveActionTimeEnd() {
    if (this._heroInfo.isPlayer) {
      this.endCurStep(2, 1);
    }
    let role = this._cmd.randomRoleToAction(this._lastNum, this._heroInfo.dir);
    this.moveAction(role);
  }

  protected endCurStep(chain: number, step: number) {
    if (
      !GameMgr.lUserData.isGuideOver(chain) &&
      GameMgr.guideMgr.guidId == chain &&
      GameMgr.guideMgr.step == step
    ) {
      let node = GameMgr.guideMgr.getGuideNode();
      node.getComponent(GuideComponent).next();
    }
  }
  /**行动结束 */
  protected playerEndAction() {
    let local = `第${this._curRound}回合结束【${
      ROLE_COMP_NAME[this._heroInfo.dir]
    }】结束行动`;
    this.checkTimer(this._curRound);
    console.log(local);
    console.groupEnd();
    this._isCastRound = false;
    this._cmd.evtMgr.post(CMsg.client.fight.onPlayerEndAction);
  }

  onGDestroy(): void {
    GCtrl.ES.off(this);
  }
}
