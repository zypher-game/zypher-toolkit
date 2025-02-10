import { MaskSpriteType, MAX_TAG } from "../../Core/CoreDefine";
import MaskSprite from "../../Core/FrameEx/MaskSprite";
import PlistLabel from "../../Core/FrameEx/PlistLabel";
import { GCtrl } from "../../Core/GCtrl";
import { GAssetImpl, GLoader } from "../../Core/GLoader/GLoader";
import GuideComponent from "../Guide/GuideComponent";
import { JXColor } from "./JXColor";
import { Res } from "./UIResources";

export default class UICreate {
  /** 创建一个文本 */
  public static label(str?: string): cc.Label {
    let node = new cc.Node();
    if (!node) return;
    node.anchorX = 0.5;
    node.anchorY = 0.5;
    let label = node.addComponent(cc.Label);
    if (!label) return;
    // label.font = i18n.ttf;
    label.fontSize = 22;
    label.lineHeight = 22;
    label.cacheMode = cc.Label.CacheMode.CHAR;
    str && (label.string = str);
    return label;
  }

  /** 创建一个富文本 */
  public static richText(
    str?: string,
    asset?: { path: string; apl: GAssetImpl },
    fontsize?: number,
    color?: cc.Color
  ) {
    let node = new cc.Node();
    if (!node) return;
    node.anchorX = 0;
    node.anchorY = 0.5;
    let richText = node.addComponent(cc.RichText);
    if (color) {
      node.color = color;
    }
    // richText.font = i18n.ttf;
    richText.fontSize = fontsize ? fontsize : 22;
    richText.lineHeight = fontsize ? fontsize : 22;
    // richText.cacheMode = cc.Label.CacheMode.CHAR;
    if (asset)
      asset.apl.spriteAtlas(asset.path, (atlas: cc.SpriteAtlas) => {
        if (!richText.isValid) return;
        richText.imageAtlas = atlas;
        richText.string = str;
      });
    else str && (richText.string = str);
    return richText;
  }

  /** 创建一个普通精灵 */
  public static sprite(
    asset?: { path: string; apl: GAssetImpl },
    cb?
  ): cc.Sprite {
    let node = new cc.Node();
    if (!node) return;
    let sp = node.addComponent(cc.Sprite);
    if (!sp) return;
    asset && asset.apl.spriteFrame(sp, asset.path, cb);
    return sp;
  }

  /** 创建一个裁切精灵 */
  public static maskSprite(
    asset?: { path: string; apl: GAssetImpl },
    cb?
  ): MaskSprite {
    let node = new cc.Node();
    if (!node) return;
    let sp = node.addComponent(MaskSprite);
    if (!sp) return;
    sp.maskType = MaskSpriteType.Square;
    sp.center = cc.Vec2.ZERO;
    sp.radius = 42;
    asset && asset.apl.spriteFrame(sp, asset.path, cb);
    return sp;
  }

  /** 创建一个图集精灵 */
  public static altsSprite(
    asset: { path: string; apl: GAssetImpl; sub: string },
    cb?
  ) {
    let node = new cc.Node();
    if (!node) return;
    let sp = node.addComponent(cc.Sprite);
    if (!sp) return;
    asset && asset.apl.spriteAtlasFrame(sp, asset.path, asset.sub, cb);
    return sp;
  }

  /** 创建一个spine */
  public static spine(
    asset: { path: string; apl: GAssetImpl },
    cb?: { (spine: sp.Skeleton): void }
  ): sp.Skeleton {
    let node = new cc.Node();
    if (!node) return;
    let spine = node.addComponent(sp.Skeleton);
    if (!spine) return;
    asset &&
      asset.apl.spine(asset.path, (sk: sp.SkeletonData) => {
        if (!spine.isValid) return;
        spine.skeletonData = sk;
        cb && cb(spine);
      });
    return spine;
  }

  public static addLabelCom(node): cc.Label {
    if (!node) return;
    let label = node.addComponent(cc.Label);
    if (!label) return;
    // label.font = i18n.ttf;
    // label.cacheMode = cc.Label.CacheMode.CHAR;
    label.fontSize = 22;
    label.lineHeight = 22;
    return label;
  }

  public static plistLabel(
    path: string,
    apl: GAssetImpl,
    split: string,
    lineHeight: number
  ) {
    let node = new cc.Node();
    let comp = node.addComponent(PlistLabel);
    apl.spriteAtlas(path, (asset: cc.SpriteAtlas) => {
      if (!node.isValid) return;
      comp.atlas = asset;
    });
    comp.spliteChar = split;
    comp.lineHeight = lineHeight;
    return comp;
  }

  public static unTouchNode(): cc.Node {
    let node = new cc.Node();
    node.addComponent(cc.BlockInputEvents);
    node.setContentSize(cc.view.getVisibleSize());
    return node;
  }

  public static createrPageMask(apl: GAssetImpl, info: string) {
    let maskRoot = new cc.Node("PAGE_MASK");
    let maskSprite = this.sprite(
      { path: Res.single, apl },
      (sprite: cc.Sprite) => {
        sprite.node.setContentSize(cc.winSize);
        sprite.node.color = JXColor.C000000;
        sprite.node.opacity = 168;
      }
    );
    maskSprite.node.parent = maskRoot;
    let prefab = GLoader.getPreLoadAsset<cc.Prefab>(Res.common.guide_item);
    let guideNode = cc.instantiate(prefab);
    guideNode.name = "GudieRoot";
    guideNode.setContentSize(cc.winSize);
    let com = guideNode.getComponent(GuideComponent);
    com.text.node.color = JXColor.C000000;
    com.text.string = info;
    com.talkNode.active = true;
    com.talkNode.position = cc.v3(0, -280);
    com.talkNode.getChildByName("contiue").active = false;
    guideNode.parent = maskRoot;
    return maskRoot;
  }

  public static createCanvaseMask(parent) {
    // 创建实际舞台区域之外的遮罩
    let actualSzie = GCtrl.actualSize;
    let winSize = cc.winSize;
    let leftNode = new cc.Node("_GLOBAL_LEFT_");
    let leftSprite = leftNode.addComponent(cc.Sprite);
    leftSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    leftNode.anchorX = 0;
    leftNode.x = -winSize.width / 2;
    GLoader.spriteFrame(leftSprite, Res.single);
    leftNode.color = cc.Color.BLACK;
    leftNode.parent = parent;
    leftNode.zIndex = MAX_TAG;
    let rightNode = new cc.Node("_GLOBAL_RIGHT_");
    let rightSprite = rightNode.addComponent(cc.Sprite);
    rightSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    rightNode.anchorX = 0;
    rightNode.x = actualSzie.width / 2;
    GLoader.spriteFrame(rightSprite, Res.loadCtrl);
    rightNode.color = cc.Color.BLACK;
    rightNode.parent = parent;
    rightNode.zIndex = MAX_TAG;
    // leftNode.opacity = rightNode.opacity = 128;
    let setMaskSize = () => {
      winSize = cc.winSize;
      leftNode.width = rightNode.width =
        winSize.width / 2 - actualSzie.width / 2;
      leftNode.height = rightNode.height = rightNode.height = winSize.height;
      leftNode.x = -winSize.width / 2;
      rightNode.x = actualSzie.width / 2;
    };
    setMaskSize();
    // let canvase
    let canvase = cc.director.getScene().getComponentInChildren(cc.Canvas);
    canvase.node.on(cc.Node.EventType.SIZE_CHANGED, setMaskSize, leftNode);
  }
}
