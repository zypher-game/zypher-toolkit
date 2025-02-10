import { INVALID_VALUE } from "../../Core/CoreDefine";
import ColorLog from "../../Core/FrameEx/ColorLog";
import GComponent from "../../Core/FrameEx/GComponent";
import GDrag from "../../Core/FrameEx/GDrag";
import GLongTouch from "../../Core/FrameEx/GLongTouch";
import { GAssetImpl } from "../../Core/GLoader/GLoader";
import { GListView } from "../../Core/GView/GListView";
import IrregularTrigger from "../../Core/GView/IrregularTrigger";
import { AudioMgr } from "../../Core/Manager/AudioMgr";
import MathEx from "../../Core/Math/MathEx";
import { Res } from "../Common/UIResources";
import { GCtrl } from "./../../Core/GCtrl";
import { SGuideStepDataRaw } from "./Guide.type";
import { GuidType } from "./GuideLogic";

const WAIT_LOAD_TIMES = 10;
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/Guide/GuideCtrl")
export default class GuideComponent extends GComponent {
  @property(cc.Node) chipNode: cc.Node = null;
  @property(cc.Node) teachNode: cc.Node = null;
  @property(cc.Node) touchNode: cc.Node = null;
  @property(cc.RichText) text: cc.RichText = null;
  @property(cc.Node) talkNode: cc.Node = null;
  @property(cc.Node) maskShader: cc.Node = null;

  protected _handSk: dragonBones.ArmatureDisplay = null;
  protected _jiantouNode: cc.Node = null;
  protected _handlerMoveEnd: boolean = false;

  public nextCallBack: any = null;

  protected _configure: SGuideStepDataRaw = null;
  protected _target: cc.Node = null;
  protected _touchStart = false;
  protected _inMove = false;
  protected _waitLoadTimes = 0;

  protected _ext: any;

  onLoad() {
    // this.chipNode.width = cc.winSize.width * 2;
    // this.chipNode.height = cc.winSize.height * 2;

    this.touchNode.on<{ (event: cc.Event.EventTouch): void }>(
      cc.Node.EventType.TOUCH_START,
      this.onMaskTouchStart,
      this
    );
    this.touchNode.on<{ (event: cc.Event.EventTouch): void }>(
      cc.Node.EventType.TOUCH_MOVE,
      this.onMaskTouchMove,
      this
    );
    this.touchNode.on<{ (event: cc.Event.EventTouch): void }>(
      cc.Node.EventType.TOUCH_END,
      this.onMaskTouchEnd,
      this
    );
    this.touchNode.on<{ (event: cc.Event.EventTouch): void }>(
      cc.Node.EventType.TOUCH_CANCEL,
      this.onMaskTouchCancel,
      this
    );
  }

  onDestroy() {
    this.touchNode.targetOff(this.touchNode);
  }

  public setTarget(pNode: cc.Node) {
    // this.targetMaskNode.width = pNode.width;
    // this.targetMaskNode.height = pNode.height;

    if (!cc.isValid(pNode)) return;
    this._target = pNode;
    let aniNodePos: cc.Vec2, maskPos: cc.Vec2;
    if (this._configure.type == GuidType.Drag) {
      let comp = pNode.getComponent(GDrag);
      if (!comp) return;
      let dragNode = comp.dragNodes[this._configure.drags[0]];
      let targetNode = comp.targetNodes[this._configure.drags[1]];
      if (!dragNode || !targetNode) return;

      //
      let centerPos = cc.v2(
        dragNode.width * (0.5 - dragNode.anchorX),
        dragNode.height * (0.5 - dragNode.anchorY)
      );
      let worldPos = (maskPos = dragNode.convertToWorldSpaceAR(centerPos));
      aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
      if (this._configure.offset.length > 0) {
        aniNodePos.x += this._configure.offset[0];
        aniNodePos.y += this._configure.offset[1];
        maskPos.x += this._configure.offset[0];
        maskPos.y += this._configure.offset[1];
      }

      let targetCpos = cc.v2(
        targetNode.width * (0.5 - targetNode.anchorX),
        targetNode.height * (0.5 - targetNode.anchorY)
      );
      let targetWpos = targetNode.convertToWorldSpaceAR(targetCpos);
      // this.maskShader.reSetMask1([worldPos.x - dragNode.width / 2, worldPos.y - dragNode.height / 2, dragNode.width, dragNode.height]);
      // this.maskShader.reSetMask2([targetWpos.x - targetNode.width / 2, targetWpos.y - targetNode.height / 2, targetNode.width, targetNode.height]);
      this.displayMoveAnimation(
        aniNodePos,
        this.maskShader.convertToNodeSpaceAR(targetWpos)
      );
    } else if (this._configure.type == GuidType.ListItemClick) {
      let listView = pNode["_list"] as GListView;
      let item = null;
      let targetNode = null;
      if (!listView) {
        targetNode = pNode;
      } else {
        item = listView["_items"][this._configure.listIndex];
        if (!item || !item.node) {
          // scrollToindex;
          return;
        }
        targetNode = item.node;
      }

      let centerPos = cc.v2(
        targetNode.width * (0.5 - targetNode.anchorX),
        targetNode.height * (0.5 - targetNode.anchorY)
      );
      let worldPos = (maskPos = targetNode.convertToWorldSpaceAR(centerPos));
      aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
      if (this._configure.offset.length > 0) {
        aniNodePos.x += this._configure.offset[0];
        aniNodePos.y += this._configure.offset[1];
        maskPos.x += this._configure.offset[0];
        maskPos.y += this._configure.offset[1];
      }
      this._target = targetNode;
      // this.maskShader.reSetMask1([worldPos.x - targetNode.width / 2, worldPos.y - targetNode.height / 2, targetNode.width, targetNode.height]);
    } else if (this._configure.type == GuidType.NodeMove) {
      // 未完成
      let centerPos = cc.v2(
        pNode.width * (0.5 - pNode.anchorX),
        pNode.height * (0.5 - pNode.anchorY)
      );
      let worldPos = pNode.convertToWorldSpaceAR(centerPos);
      aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
      if (this._configure.offset.length > 0) {
        aniNodePos.x += this._configure.offset[0];
        aniNodePos.y += this._configure.offset[1];
        maskPos.x += this._configure.offset[0];
        maskPos.y += this._configure.offset[1];
      }
      let airPos = cc.v2(this._configure.drags[1], this._configure.drags[3]);
      airPos = pNode.parent.convertToWorldSpaceAR(airPos);
      airPos.addSelf(
        cc.v2(
          pNode.width * (0.5 - pNode.anchorX),
          pNode.height * (0.5 - pNode.anchorY)
        )
      );
      // this.maskShader.reSetMask1([worldPos.x - pNode.width / 2, worldPos.y - pNode.height / 2, pNode.width, pNode.height]);
      // this.maskShader.reSetMask2([airPos.x - pNode.width / 2, airPos.y - pNode.height / 2, pNode.width, pNode.height])
      airPos = this.maskShader.convertToNodeSpaceAR(airPos);
      this.displayMoveAnimation(aniNodePos, airPos);
    } else {
      let centerPos = cc.v2(
        pNode.width * (0.5 - pNode.anchorX),
        pNode.height * (0.5 - pNode.anchorY)
      );
      if (Res.positionOffset[this._configure.path]) {
        centerPos.addSelf(Res.positionOffset[this._configure.path]);
      }
      let worldPos = (maskPos = pNode.convertToWorldSpaceAR(centerPos));

      aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
      if (this._configure.offset.length > 0) {
        aniNodePos.x += this._configure.offset[0];
        aniNodePos.y += this._configure.offset[1];
        maskPos.x += this._configure.offset[0];
        maskPos.y += this._configure.offset[1];
      }
      // this.maskShader.reSetMask1([worldPos.x - pNode.width / 2, worldPos.y - pNode.height / 2, pNode.width, pNode.height]);
    }

    // animation
    if (
      this._configure.type != GuidType.Drag &&
      this._configure.type != GuidType.NodeMove
    ) {
      if (!this._handSk) {
        this.displayClickAnimation();
      }
      let aniPos: cc.Vec2 = cc.Vec2.ZERO;
      if (this._configure.aniOffset.length > 0) {
        aniPos = cc.v2(
          this._configure.aniOffset[0],
          this._configure.aniOffset[1]
        );
      }
      if (this._configure.aniRotate) {
        this._handSk.node.angle = -this._configure.aniRotate;
      }
      let position = aniNodePos.add(aniPos);
      let sp = this._target.getComponent(cc.Sprite);
      if (!sp) {
        let bg = this._target
          .getChildByName("Background")
          .getComponent(cc.Sprite);
        sp = bg;
      }
      let mesk = this.maskShader.getComponent(cc.Mask);
      if (
        mesk.node.width != this._target.width &&
        mesk.node.width != this.talkNode.height
      ) {
        if (sp) {
          mesk.type = cc.Mask.Type.IMAGE_STENCIL;
          mesk.spriteFrame = sp.spriteFrame;
          mesk.alphaThreshold = 0.5;
        } else {
          mesk.type = cc.Mask.Type.RECT;
        }
        mesk.node.width = this._target.width * this._target.scale;
        mesk.node.height = this._target.height * this._target.scale;
      }
      this.maskShader.position = cc.v3(position.x, position.y);
      this._handSk.node.position = cc.v3(
        position.x + this._handSk.node.width / 2,
        position.y - this._handSk.node.height / 2
      );
    }
  }

  public setConfigure(step) {
    this._configure = step;
    if (this._configure) {
      if (this._configure.type == GuidType.Dialog) {
        // this.maskShader.reSetMask1([-1, -1, -1, -1]);
      }
    }
    this.maskShader.setContentSize(GCtrl.winSize);
    this._waitLoadTimes = 0;
  }

  public showMessage(textKey?: string) {
    let key = textKey || this._configure.msgkey;
    if (!key) {
      this.talkNode.active = false;
    } else {
      this.showMask();
      this.talkNode.active = true;
      this.talkNode.position = cc.v3(
        this._configure.talkPos[0],
        this._configure.talkPos[1]
      );
      this.text.string = this._configure.msgkey;
    }
  }

  public hidMask() {
    this.chipNode.active = false;
  }

  public showMask() {
    this.chipNode.active = true;
  }

  protected onMaskTouchStart(event: cc.Event.EventTouch) {
    if (this._inMove) return;
    if (this._configure == null) return;
    let nodePos = this.chipNode.convertToNodeSpaceAR(event.getLocation());
    if (
      nodePos.x < -this.chipNode.width / 2 ||
      nodePos.x > this.chipNode.width / 2 ||
      nodePos.y < -this.chipNode.height / 2 ||
      nodePos.y > this.chipNode.height / 2
    )
      return;
    if (!this._target) return;
    this._touchStart = true;
    // 如果是Slider
    if (this._configure.type == GuidType.Slide) {
      let slider = this._target.getComponent(cc.Slider);
      if (slider) {
        slider["_onTouchBegan"](event);
      }
    } else if (this._configure.type == GuidType.Drag) {
      let pGrag = this._target.getComponent(GDrag);
      if (pGrag) {
        pGrag["_onTouchStart"](event);
      }
    } else if (this._configure.type == GuidType.ListItemClick) {
      let list = this._target.parent.parent.parent["_list"];
      if (list) {
        let item = list["_items"][this._configure.listIndex];
        if (!item) {
          this._touchStart = false;
          return;
        }
        if (list) {
          list["onTouchStart"](event);
        }
      }
    } else if (this._configure.type == GuidType.NodeMove) {
      this._target && this._target.emit(cc.Node.EventType.TOUCH_START, event);
    }
  }

  protected onMaskTouchMove(event: cc.Event.EventTouch) {
    if (!this._touchStart) return;
    if (!this._configure) return;
    // 如果是Slider
    if (this._configure.type == GuidType.Slide) {
      let slider = this._target.getComponent(cc.Slider);
      if (slider) {
        slider["_onTouchMoved"](event);
      }
    } else if (this._configure.type == GuidType.Drag) {
      let pGrag = this._target.getComponent(GDrag);
      if (pGrag) {
        pGrag["_onTouchMove"](event);
      }
    } else if (this._configure.type == GuidType.ListItemClick) {
      let list = this._target.parent.parent.parent["_list"];
      if (list) {
        list["onTouchMove"](event);
      }
    } else if (this._configure.type == GuidType.NodeMove) {
      this._target && this._target.emit(cc.Node.EventType.TOUCH_MOVE, event);
    }
  }

  protected onMaskTouchEnd(event: cc.Event.EventTouch) {
    // if(!this._target) return;
    if (this._configure == null) return;
    if (this._configure.type == GuidType.Dialog) {
      this.next();
      return;
    }

    if (!this._touchStart) return;
    this._touchStart = false;

    // 如果是Slider
    if (this._configure.type == GuidType.Slide) {
      // let slider = this._target.getComponent(cc.Slider);
      // if (slider) {
      //     slider['_onTouchEnded'](event);
      //     if (slider.progress < this._configure.progress)
      //         return;
      //     this.next();
      // }
      return this.next();
    } else if (this._configure.type == GuidType.Drag) {
      let pGrag = this._target.getComponent(GDrag);
      if (pGrag) {
        this.onGragTouchEnd(pGrag, event);
      }
      return;
    } else if (this._configure.type == GuidType.ListItemClick) {
      let list = this._target.parent.parent.parent["_list"];
      if (list) {
        this.onListViewTouchEnd(list, event);
      } else {
        let camp = this._target.getComponent(this._target.name);
        this.next();
        camp["_onTouchEnd"](event);
      }
      return;
    } else if (this._configure.type == GuidType.NodeMove) {
      this.onNodeMoveEnd(event);
      return;
    }
    let nodePos = this.chipNode.convertToNodeSpaceAR(event.getLocation());
    if (
      nodePos.x < -this.chipNode.width / 2 ||
      nodePos.x > this.chipNode.width / 2 ||
      nodePos.y < -this.chipNode.height / 2 ||
      nodePos.y > this.chipNode.height / 2
    ) {
      this._touchStart = false;
      return;
    }
    if (!this._target) return;

    let centerPos = cc.v2(
      this._target.width * (0.5 - this._target.anchorX),
      this._target.height * (0.5 - this._target.anchorY)
    );
    let worldPos = this._target.convertToWorldSpaceAR(centerPos);
    let rect = cc.rect(
      worldPos.x - this._target.width / 2,
      worldPos.y - this._target.height / 2,
      this._target.width,
      this._target.height
    );
    if (!rect.contains(event.getLocation())) {
      this._touchStart = false;
      return;
    }
    event.target = this._target;
    let toggle = this._target.getComponent(cc.Toggle);
    if (toggle) {
      this.next();
      AudioMgr.Ins().playEffect(toggle.clickAudio || cc.Button.comAudio);
      cc.Component.EventHandler.emitEvents(toggle.checkEvents, toggle);
      toggle.check();
      this._target && this._target.emit("toggle", toggle);
      this._target && this._target.emit("click", toggle);
      return;
    }

    let longTouch = this._target.getComponent(GLongTouch);
    if (longTouch) {
      this.next();
      AudioMgr.Ins().playEffect(cc.Button.comAudio);
      longTouch["emitLongTouchEvent"]();
      return;
    }

    let btn = this._target.getComponent(cc.Button);
    if (btn && btn.enabled && btn.interactable) {
      this.next();
      AudioMgr.Ins().playEffect(btn.clickAudio || cc.Button.comAudio);
      cc.Component.EventHandler.emitEvents(btn.clickEvents, event);
      this._target && this._target.emit("click", this);
      return;
    }
    let coustomBtn = this._target.getComponent(IrregularTrigger);
    if (coustomBtn) {
      this.next();
      AudioMgr.Ins().playEffect(cc.Button.comAudio);
      cc.Component.EventHandler.emitEvents(coustomBtn.events, event);
      return;
    }
    if (this._configure.type == GuidType.Click) {
      this._target && this._target.emit(cc.Node.EventType.TOUCH_END, event);
      this.next();
    }
  }

  protected onMaskTouchCancel(event: cc.Event.EventTouch) {
    this._touchStart = false;
    if (this._configure == null) return;

    if (this._configure.type == GuidType.Slide) {
      let slider = this._target.getComponent(cc.Slider);
      if (slider) {
        this.next();
      }
    } else if (this._configure.type == GuidType.Drag) {
      let pGrag = this._target.getComponent(GDrag);
      if (pGrag) {
        this.onGragTouchEnd(pGrag, event);
      }
      return;
    } else if (this._configure.type == GuidType.ListItemClick) {
      let list = this._target.parent.parent.parent["_list"];
      if (list) {
        this.onListViewTouchEnd(list, event);
      }
      return;
    } else if (this._configure.type == GuidType.NodeMove) {
      this.onNodeMoveEnd(event);
    }
  }

  protected onGragTouchEnd(pGDragNode: GDrag, event: cc.Event.EventTouch) {
    let isNext = false;
    if (pGDragNode["_touchMove"]) {
      let lastTarget = pGDragNode["_lastTargetNode"],
        selectDragNode = pGDragNode["_curSelectDragNode"];
      let indexOfTarget = pGDragNode.targetNodes.indexOf(lastTarget);
      let indexofDrag = pGDragNode.dragNodes.indexOf(selectDragNode);
      if (
        indexofDrag == this._configure.drags[0] &&
        indexOfTarget == this._configure.drags[1]
      ) {
        isNext = true;
      }
    }
    if (isNext) {
      this.next();
      pGDragNode["_onTouchEnd"](event);
    } else {
      pGDragNode["resetTouchEvent"]();
    }
  }

  protected onListViewTouchEnd(
    pListView: GListView,
    event: cc.Event.EventTouch
  ) {
    let isNext = false;
    if (this._configure.type == GuidType.ListItemClick) {
      if (
        pListView["_childLongTouchTimes"] > 0 ||
        !pListView["_isTouchPress"] ||
        !pListView["_touchChildNode"]
      ) {
        isNext = false;
      } else {
        let index = parseInt(
          pListView["_touchChildNode"].name.replace("item_", "")
        );
        if (index != this._configure.listIndex) {
          isNext = false;
        } else {
          isNext = true;
          AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
      }
    }

    if (isNext) {
      this.next();
      pListView["onToucEnd"](event);
    } else {
      pListView["cancelTouchEvent"]();
    }
  }

  protected onNodeMoveEnd(event: cc.Event.EventTouch) {
    this._target && this._target.emit(cc.Node.EventType.TOUCH_END, event);
    let pos = this._target.position;
    if (
      this.posCompare(
        this._configure.drags[0],
        this._configure.drags[1],
        pos.x
      ) &&
      this.posCompare(this._configure.drags[2], this._configure.drags[3], pos.y)
    ) {
      this.next();
    }
  }

  protected posCompare(flag: string, air: number, cur: number): boolean {
    if (!flag || flag == "null") return true;
    if (flag == ">") {
      return cur >= air;
    } else if (flag == "<") {
      return cur <= air;
    } else if (flag) {
      let range = Number(flag);
      return Math.abs(air - cur) < range;
    }
  }

  public next() {
    this._target = null;
    let time = this._configure.time;
    this.talkNode.active = false;
    this._configure = null;
    this._waitLoadTimes = INVALID_VALUE;
    if (this._handSk) {
      this._handSk.node.destroy();
      this._handSk = null;
    }
    if (this._jiantouNode) {
      this._jiantouNode.destroy();
      this._jiantouNode = null;
    }
    this._handlerMoveEnd = false;
    // this.maskShader.reSetMask2([-1, -1, -1, -1]);
    // this.maskShader.reSetMask1([-1, -1, -1, -1]);
    this.hidMask();

    if (this.nextCallBack) {
      this.nextCallBack(time ? time : 0);
    }
  }

  public update(dt: number) {
    if (!this._configure) return;
    if (this._waitLoadTimes > INVALID_VALUE) {
      if (GAssetImpl.isLoading()) {
        return;
      }
      this._waitLoadTimes++;
      if (this._waitLoadTimes != WAIT_LOAD_TIMES) {
        return;
      }
      this._waitLoadTimes = INVALID_VALUE;

      if (!this._configure.path || this._configure.path == "null") {
        this.showMessage();
      }
    }
    if (!this._configure.path || this._configure.path == "null") return;
    if (this._target) {
      this.setTarget(this._target);
      return;
    }
    let node = cc.find(this._configure.path);
    if (!node || !node.active) return; // 如果节点属于隐藏状态，认为找不到节点
    this.showMask();
    this.setTarget(node);
    this.showMessage();
  }

  protected cteateTextureNode() {
    let textureNode = new cc.Node("texuture_node");
    let spNode1 = new cc.Node("jiantou");
    spNode1.y = 41.9;
    spNode1.angle = -180;
    let spNode2 = new cc.Node("wenzi");
    spNode2.y = 83.2;
    let sp1 = spNode1.addComponent(cc.Sprite);
    this.assetImpl.spriteFrame(sp1, "Views/Guide/5");
    spNode2.addComponent(cc.Sprite);
    spNode1.parent = textureNode;
    spNode2.parent = textureNode;
    textureNode.parent = this.node;
  }

  public setTexture(path: string) {
    // this.textureNode.active = true;
    // let sp = this.textureNode.getChildComByName('wenzi', cc.Sprite)
    // GLoader.spriteFrame(sp, path, true);
  }

  protected displayClickAnimation() {
    if (!this._handSk) {
      let handNode = new cc.Node("hand");
      handNode.parent = this.node;
      this._handSk = handNode.addComponent(dragonBones.ArmatureDisplay);
    }
    this._handSk.premultipliedAlpha = true;
    this.assetImpl.dragonBones(
      Res.common.guide,
      (
        dragonAsset: dragonBones.DragonBonesAsset,
        dragonAtlas: dragonBones.DragonBonesAtlasAsset
      ) => {
        if (!cc.isValid(this._handSk)) return;
        this._handSk.dragonAsset = dragonAsset;
        this._handSk.dragonAtlasAsset = dragonAtlas;
        this._handSk.armatureName = "Armature";
        this._handlerMoveEnd = true;
        this._handSk.node.scale = 0.8;
        GCtrl.playDragonAni(this._handSk, "dianji", true);
      }
    );
  }

  protected displayMoveAnimation(startPos: cc.Vec2, endPos: cc.Vec2) {
    if (!this._handSk) {
      let handNode = new cc.Node("hand");
      handNode.parent = this.node;
      handNode.zIndex = 10;
      this._handSk = handNode.addComponent(dragonBones.ArmatureDisplay);
      this._handSk.premultipliedAlpha = true;
      this.assetImpl.dragonBones(
        Res.common.guide,
        (
          dragonAsset: dragonBones.DragonBonesAsset,
          dragonAtlas: dragonBones.DragonBonesAtlasAsset
        ) => {
          if (!cc.isValid(this._handSk)) return;
          this._handSk.dragonAsset = dragonAsset;
          this._handSk.dragonAtlasAsset = dragonAtlas;
          this._handSk.armatureName = "Armature";
          this._handlerMoveEnd = true;
          GCtrl.playDragonAni(this._handSk, "changan", true);
        }
      );
      // let sprite = UICreate.altsSprite({ path: Res.texture.common, apl: this.assetImpl, sub: "jiantou" });
      // sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      // // sprite.node.zIndex = 1;
      // this._jiantouNode = sprite.node;
      // this._jiantouNode.parent = this.node;
      // this._jiantouNode.height = 52;
      // this._jiantouNode.anchorX = 0;
    }

    if (!this._handSk.dragonAtlasAsset || !this._handSk.dragonAsset) return;
    if (!this._handlerMoveEnd) return;

    this._handlerMoveEnd = false;
    cc.director
      .getActionManager()
      .removeAllActionsFromTarget(this._handSk.node, true);
    cc.director
      .getActionManager()
      .removeAllActionsFromTarget(this._jiantouNode, true);
    this._handSk.node.position = cc.v3(startPos.x, startPos.y);
    let angle = MathEx.getAngleX(startPos, endPos);
    this._jiantouNode.angle = angle;
    this._jiantouNode.position = cc.v3(startPos.x, startPos.y);
    this._jiantouNode.width = 0;

    cc.tween(this._handSk.node)
      .to(1, { position: cc.v3(endPos.x, endPos.y) }, { easing: "sineOut" })
      .delay(0.25)
      .call(() => {
        this._handlerMoveEnd = true;
      })
      .start();
    cc.tween(this._jiantouNode)
      .to(1, { width: startPos.sub(endPos).mag() }, { easing: "sineOut" })
      .start();
  }
}
