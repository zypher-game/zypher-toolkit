import { RPointNode, RPointValue } from "../../../../d.ts/game/JXCLBtl";
import { CMsg, RedpointEffect, RPointMask } from "../../Game/Common/Define";
import { INVALID_VALUE, MAX_TAG, PRIORITY_DATA } from "../CoreDefine";
import { MapWrap, ObjectWrap } from "../FrameEx/ES5Ex";
import { GCtrl } from "../GCtrl";
import GParam from "../GEvent/GParam";
import { GLoader } from "../GLoader/GLoader";

const reg = /^[0-9]+.?[0-9]*$/;

export const RED_POINT_NAME = "red_point";
export const RED_POINT_LABEL_NAME = "label";

export class RedPointLogicMgr extends ObjectWrap {
  protected static _instance: RedPointLogicMgr = null;
  public static ins(): RedPointLogicMgr {
    if (this._instance == null) {
      this._instance = new RedPointLogicMgr();
    }
    return this._instance;
  }

  /** 红点数值 */
  protected _redPointMask: MapWrap<number, boolean>;
  /** 缓存更新 */
  protected _waitSends: number[];
  /** 缓存计算 */
  protected _waitChecks: number[];
  /** 定时器句柄 */
  protected _updateHandler: number = INVALID_VALUE;
  /** 待解锁mask */
  protected _unlockMasks: number[];

  /** 红点注册表 通过uuid进行注册 */
  protected _targets: MapWrap<string, RPointNode[]>;
  protected _targetWraps: MapWrap<string, cc.Node>;
  protected _masks: MapWrap<number, cc.Node[]>;

  /** 更新 */
  protected update() {
    this.updateCheck();
    this.updateVisit();
    this.checkState();
  }

  public initGame() {
    this.initEvent();
    this._redPointMask = new MapWrap<number, boolean>();
    this._waitSends = [];
    this._waitChecks = [];
    this._unlockMasks = [];
    this._targets = new MapWrap<string, RPointNode[]>();
    this._targetWraps = new MapWrap<string, cc.Node>();
    this._masks = new MapWrap<number, cc.Node[]>();
    this.stopUpdate();
    // 本地红点检测
    let keys = Object.keys(RPointMask);
    for (let key of keys) {
      if (!reg.test(key)) continue;
      this._waitChecks.push(parseInt(key));
    }
    this.checkState();
    // this.onCMSUserChange$tip();
  }

  protected initEvent() {
    GCtrl.ES.on(
      CMsg.rPoint.valueSetting,
      this,
      this.onCMSGRPValueSetting.bind(this),
      PRIORITY_DATA
    );
  }

  protected updateState() {
    let keys = Object.keys(RPointMask);
    for (let key of keys) {
      if (!reg.test(key)) continue;
      let checkIndex = this._waitChecks.indexOf(parseInt(key));
      if (checkIndex === INVALID_VALUE) {
        this._waitChecks.push(parseInt(key));
      }
    }
    this.checkState();
  }

  //在需要红点的地方用该方法进行注册
  public on(target: cc.Node, nodes: RPointNode[]) {
    let targetIt = this._targets.get(target.uuid);
    if (!targetIt) {
      targetIt = [];
      this._targets.set(target.uuid, targetIt);
      this._targetWraps.set(target.uuid, target);
    }
    targetIt.push(...nodes);

    for (let node of nodes) {
      let value = false;
      for (let cMask of node.mask) {
        let maskIt = this._masks.get(cMask);
        if (!maskIt) {
          maskIt = [];
          this._masks.set(cMask, maskIt);
        }
        if (maskIt.indexOf(target) == INVALID_VALUE) {
          maskIt.push(target);
        }
        value = value || this._redPointMask.get(cMask);
      }
      this.setRPointView(
        target,
        node.subPath,
        value,
        node.effectType,
        node.posType,
        node.cb
      );
    }
  }

  /**注销红点 */
  public off(target: cc.Node) {
    let targetIt = this._targets.get(target.uuid);
    if (!targetIt) return;
    for (let node of targetIt) {
      for (let cMask of node.mask) {
        let maskIt = this._masks.get(cMask);
        if (maskIt) {
          let index = maskIt.indexOf(target);
          if (index != INVALID_VALUE) maskIt.splice(index, 1);
          if (maskIt.length == 0) this._masks.delete(cMask);
        }
      }
    }
    this._targets.delete(target.uuid);
    this._targetWraps.delete(target.uuid);
  }

  public loginOut() {
    this.stopUpdate();
    GCtrl.ES.off(this);
    this._waitChecks = [];
    this._waitSends = [];
    this._targets.clear();
    this._targetWraps.clear();
    this._masks.clear();
  }

  public sendValueSettingMsg(
    mask: number,
    value: boolean,
    forceStop?: boolean
  ) {
    let target: RPointValue = {
      mask: mask,
      value: value,
      forceStop: forceStop,
    };
    GCtrl.ES.emit(CMsg.rPoint.valueSetting, GCtrl.param(target));
  }

  public sendValuesSettingMsgs(
    mask: number[],
    value: boolean,
    forceStop?: boolean
  ) {
    for (let i = 0; i < mask.length; i++) {
      this.sendValueSettingMsg(mask[i], value, forceStop);
    }
  }

  /**定时检测红点 */
  public timingCheck() {
    //需要定时检测的红点
    // GameMgr.redMgr.sendValueSettingMsg(RPointMask.RPM_DrawFree, false);
  }

  /**
   * 红点值变更
   * @param _
   * @param param
   */
  protected onCMSGRPValueSetting(_, param: GParam) {
    let rp = param.get<RPointValue>();
    // 如果传过来的红点为True，则表示必定红点；如果为false,则需要重新计算
    if (rp.value == true) {
      // 如果等待计算项中存在该红点，则删除
      let checkIndex = this._waitChecks.indexOf(rp.mask);
      if (checkIndex != INVALID_VALUE) {
        this._waitChecks.splice(checkIndex, 1);
      }
      // 如果当前的值为true，则不需要更新
      if (this._redPointMask.get(rp.mask)) return;
      this._redPointMask.set(rp.mask, rp.value);
      // 更新更新待推送的红点
      if (this._waitSends.indexOf(rp.mask) != INVALID_VALUE) return;
      this._waitSends.push(rp.mask);
    } else {
      if (rp.forceStop == true) {
        let checkIndex = this._waitChecks.indexOf(rp.mask);
        if (checkIndex != INVALID_VALUE) {
          this._waitChecks.splice(checkIndex, 1);
        }
        this._redPointMask.set(rp.mask, rp.value);
        // 更新更新待推送的红点
        if (this._waitSends.indexOf(rp.mask) != INVALID_VALUE) return;
        this._waitSends.push(rp.mask);
      }
      // 重新检测红点的值
      // 如果当前待检测列表中存在该枚举，等待检测，否则加入待检测列表
      else if (this._waitChecks.indexOf(rp.mask) == INVALID_VALUE) {
        this._waitChecks.push(rp.mask);
      }
    }
    this.checkState();
  }

  protected startUpdate() {
    if (this._updateHandler != INVALID_VALUE) {
      return;
    }
    this._updateHandler = setInterval(this.update.bind(this), 100) as any;
  }

  protected stopUpdate() {
    if (INVALID_VALUE == this._updateHandler) return;
    clearInterval(this._updateHandler);
    this._updateHandler = INVALID_VALUE;
  }

  protected checkState() {
    if (this._waitChecks.length > 0 || this._waitSends.length > 0) {
      if (this._updateHandler == INVALID_VALUE) this.startUpdate();
    } else if (this._waitChecks.length == 0 && this._waitSends.length == 0) {
      if (this._updateHandler != INVALID_VALUE) this.stopUpdate();
    }
  }

  /**更新状态 */
  protected updateCheck() {
    if (this._waitChecks.length == 0) return;
    let mask = this._waitChecks.shift();
    let value = true;
    if (value) {
      value = false;
      switch (mask) {
        default:
          value = false;
          break;
      }
    }
    if (this._redPointMask.get(mask) == value) return;
    this._redPointMask.set(mask, value);
    // 更新更新待推送的红点
    if (this._waitSends.indexOf(mask) != INVALID_VALUE) return;
    this._waitSends.push(mask);
  }

  /**表现更新 */
  protected updateVisit() {
    if (this._waitSends.length == 0) return;
    let mask = this._waitSends.shift();
    let mask_value = this._redPointMask.get(mask);

    // 取出所有需要变更的节点
    let maskIter = this._masks.get(mask);
    if (!maskIter || maskIter.length == 0) return;
    for (let obj of maskIter) {
      let targetIt = this._targets.get(obj.uuid);
      if (!targetIt) return;
      for (let node of targetIt) {
        if (!node) {
          continue;
        }
        if (node.mask.indexOf(mask) == INVALID_VALUE) continue;
        if (mask_value == true)
          this.setRPointView(
            obj,
            node.subPath,
            mask_value,
            node.effectType,
            node.posType,
            node.cb
          );
        else {
          // 如果为false则需要取组合值
          let value = false;
          for (let cMask of node.mask) {
            if (this._redPointMask.get(cMask)) {
              value = true;
              break;
            }
          }
          this.setRPointView(
            obj,
            node.subPath,
            value,
            node.effectType,
            node.posType,
            node.cb
          );
        }
      }
    }
  }

  public setRPointView(
    parent: cc.Node,
    subPath: string | cc.Node,
    value: boolean,
    effectType?: number,
    posType?: number,
    cb?: any
  ) {
    let node = parent;
    if (subPath) {
      if (typeof subPath == "string") {
        node = cc.find(subPath, parent);
      } else {
        node = subPath;
      }
    }
    if (!node) return;
    switch (effectType) {
      case RedpointEffect.BLING: {
        if (!value) {
          node.opacity = 255;
          node.stopAllActions();
        } else {
          node.stopAllActions();
          cc.tween(node)
            .repeatForever(
              cc
                .tween(node)
                .to(1, { opacity: 255 * 0.2 })
                .to(1, { opacity: 255 })
            )
            .start();
        }
        break;
      }
      case RedpointEffect.RUNNING: {
        let aniNode = node.getChildByName(RED_POINT_NAME);
        if (!value) {
          if (aniNode) aniNode.active = false;
          return;
        } else {
          if (aniNode) {
            aniNode.active = true;
            return;
          }
        }
        GLoader.loadJXAniClips(
          "anis/frames/btnAni",
          (clips: cc.AnimationClip[]) => {
            if (!cc.isValid(node)) {
              return;
            }
            let ani = new cc.Node();
            ani.y = 12.5;
            ani.name = RED_POINT_NAME;
            ani.setAnchorPoint(cc.v2(0.5, 0.5));
            ani.addComponent(cc.Sprite);
            let aniSp = ani.addComponent(cc.Animation);
            for (let i = 0; i < clips.length; i++) {
              aniSp.addClip(clips[i]);
            }
            node.addChild(ani);
            let animation = aniSp.play("effect");
            animation.wrapMode = cc.WrapMode.Loop;
          },
          {
            aniName: "effect",
            prefix: "anniu",
            maxIdx: 8,
            minIdx: 3,
            numberFix: 4,
          }
        );
        break;
      }
      case RedpointEffect.REDPOINT: {
        let pt = node.getChildByName(RED_POINT_NAME);
        if (!pt) {
          if (!value) return;
          // pt = UICreate.altsSprite({ path: Res.texture.views.common, sub: "redPoint", apl: GLoader }).node;
          pt.name = RED_POINT_NAME;
          pt.parent = node;
          pt.zIndex = MAX_TAG;
        }
        pt.position = cc.v3(
          node.width * (1 - node.anchorX) - 5,
          node.height * (1 - node.anchorY) - 5
        );
        pt.active = value;
        break;
      }
    }
    cb && cb(node);
  }

  /**获取该节点红点应处于的状态 */
  public getMaskRedpointState(masks: number[]) {
    for (let i = 0; i < masks.length; i++) {
      let value = this._redPointMask.get(masks[i]);
      if (value) return value;
    }
    return false;
  }
}
