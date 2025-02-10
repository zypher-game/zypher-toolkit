import GComponent from "../../../Core/FrameEx/GComponent";
import { GCtrl } from "../../../Core/GCtrl";
const { ccclass, property, menu } = cc._decorator;

enum ActionTag {
  Move = 1001,
  Fade = 1002,
  Discard = 1003,
}

export enum MoveDir {
  None,
  Left2R,
  Right2L,
  top2B,
  bottom2T,
  custom,
}

@ccclass("Move$Fade$Config")
class Move$Fade$Config {
  @property() delayTime: number = 0;
  @property() moveDuration: number = 0;
  @property() fadeDuration: number = 0;
  @property([cc.Node]) nodes: cc.Node[] = [];
  @property({ type: cc.Enum(MoveDir) }) moveDir = MoveDir.None;

  @property({
    visible: function () {
      return this.moveDir === MoveDir.custom;
    },
  })
  startPos: cc.Vec2 = cc.v2();

  public _nodeDefaultPositions: cc.Vec2[] = [];
  //是否强制显示
  public _forcedDisplay: boolean = false;

  public init() {
    for (let i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i]) continue;
      this._nodeDefaultPositions[i] = this.nodes[i].position;
    }
  }

  public onEnable() {
    let actualSize = GCtrl.actualSize;
    let winSize = cc.winSize;
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (!node) continue;
      if (!this._forcedDisplay) {
        if (!node.active) continue;
      }
      node.stopAllActions();
      if (this.moveDuration > 0) {
        let defaultWorldPos = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let worldPos: cc.Vec2 = defaultWorldPos;
        switch (this.moveDir) {
          case MoveDir.None:
            break;
          case MoveDir.Left2R: {
            worldPos = cc.v2(
              -(
                -(winSize.width - actualSize.width) / 2 +
                node.width * (1 - node.anchorX)
              ),
              defaultWorldPos.y
            );
            break;
          }
          case MoveDir.Right2L: {
            worldPos = cc.v2(
              actualSize.width +
                (winSize.width - actualSize.width) / 2 +
                node.width * node.anchorX,
              defaultWorldPos.y
            );
            break;
          }
          case MoveDir.top2B: {
            worldPos = cc.v2(
              defaultWorldPos.x,
              actualSize.height + node.height * node.anchorY
            );
            break;
          }
          case MoveDir.bottom2T: {
            worldPos = cc.v2(
              defaultWorldPos.x,
              -node.height * (1 - node.anchorY)
            );
            break;
          }
          case MoveDir.custom: {
            worldPos = cc.v2(
              defaultWorldPos.x + this.startPos.x,
              defaultWorldPos.y + this.startPos.y
            );
            break;
          }
          default:
            break;
        }

        node.position = node.parent.convertToNodeSpaceAR(worldPos);
        node.active = true;
        let action = node.runAction(
          cc.sequence(
            cc.delayTime(this.delayTime * i),
            cc.moveTo(this.moveDuration, this._nodeDefaultPositions[i])
          )
        );
        action.setTag(ActionTag.Move);
      }
      if (this.fadeDuration > 0) {
        node.opacity = 0;
        node.active = true;
        let action = node.runAction(
          cc.sequence(
            cc.delayTime(this.delayTime * i),
            cc.fadeIn(this.fadeDuration)
          )
        );
        action.setTag(ActionTag.Fade);
      }
    }
  }

  public onDisable() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (!node) continue;
      node.stopAllActions();
      node.position = this._nodeDefaultPositions[i];
    }
  }
}

@ccclass("Disslove$Config")
class Disslove$Config {
  @property([cc.Sprite]) sprites: cc.Sprite[] = [];

  private _utime = 1;
  private _into_isbegin: boolean = false;
  private _timeTag: boolean = false;

  init() {}

  public onEnable() {
    this._utime = 1;
    this._timeTag = true;
  }

  onDisable() {
    if (this._timeTag) {
      this._timeTag = false;
      this._utime = 1;
      for (let i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i];
        if (!sprite) continue;
        sprite.getMaterial(0).setProperty("u_time", 0);
      }
    }
  }

  update(dt) {
    if (!this._timeTag) return;
    if (this._utime > 0) {
      for (let i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i];
        if (!sprite) continue;
        sprite.getMaterial(0).setProperty("u_time", this._utime);
      }
      this._utime = this._utime - dt * 2;
    } else {
      this._timeTag = false;
      for (let i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i];
        if (!sprite) continue;
        sprite.getMaterial(0).setProperty("u_time", 0);
      }
      this._utime = 1;
    }
  }
}

@ccclass
@menu("ViewUtil/UIModeAction")
export class UIModeAction extends GComponent {
  @property(Move$Fade$Config) left2R: Move$Fade$Config = null;

  @property(Move$Fade$Config) right2L: Move$Fade$Config = null;

  @property(Move$Fade$Config) top2B: Move$Fade$Config = null;

  @property(Move$Fade$Config) bottom2T: Move$Fade$Config = null;

  @property(Move$Fade$Config) onlyFade: Move$Fade$Config = null;

  protected _inits: boolean = false;

  start() {
    GCtrl.afterFrames(() => {
      this.left2R && this.left2R.init();
      this.right2L && this.right2L.init();
      this.top2B && this.top2B.init();
      this.bottom2T && this.bottom2T.init();
      this.onlyFade && this.onlyFade.init();
      this._inits = true;
      this.onEnable();
    });
  }

  onEnable() {
    if (!this._inits) return;
    GCtrl.afterFrames(() => {
      this.left2R && this.left2R.onEnable();
      this.right2L && this.right2L.onEnable();
      this.top2B && this.top2B.onEnable();
      this.bottom2T && this.bottom2T.onEnable();
      this.onlyFade && this.onlyFade.onEnable();
      // this.disslove && this.disslove.onEnable();
    });
  }

  onDisable() {
    this.left2R && this.left2R.onDisable();
    this.right2L && this.right2L.onDisable();
    this.top2B && this.top2B.onDisable();
    this.bottom2T && this.bottom2T.onDisable();
    this.onlyFade && this.onlyFade.onDisable();
  }
}
