"use strict";
cc._RF.push(module, '6134fz3OIpPHKNVJVdHt+K8', 'UICreate');
// Script/Game/Common/UICreate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreDefine_1 = require("../../Core/CoreDefine");
var MaskSprite_1 = require("../../Core/FrameEx/MaskSprite");
var PlistLabel_1 = require("../../Core/FrameEx/PlistLabel");
var GCtrl_1 = require("../../Core/GCtrl");
var GLoader_1 = require("../../Core/GLoader/GLoader");
var GuideComponent_1 = require("../Guide/GuideComponent");
var JXColor_1 = require("./JXColor");
var UIResources_1 = require("./UIResources");
var UICreate = /** @class */ (function () {
    function UICreate() {
    }
    /** 创建一个文本 */
    UICreate.label = function (str) {
        var node = new cc.Node();
        if (!node)
            return;
        node.anchorX = 0.5;
        node.anchorY = 0.5;
        var label = node.addComponent(cc.Label);
        if (!label)
            return;
        // label.font = i18n.ttf;
        label.fontSize = 22;
        label.lineHeight = 22;
        label.cacheMode = cc.Label.CacheMode.CHAR;
        str && (label.string = str);
        return label;
    };
    /** 创建一个富文本 */
    UICreate.richText = function (str, asset, fontsize, color) {
        var node = new cc.Node();
        if (!node)
            return;
        node.anchorX = 0;
        node.anchorY = 0.5;
        var richText = node.addComponent(cc.RichText);
        if (color) {
            node.color = color;
        }
        // richText.font = i18n.ttf;
        richText.fontSize = fontsize ? fontsize : 22;
        richText.lineHeight = fontsize ? fontsize : 22;
        // richText.cacheMode = cc.Label.CacheMode.CHAR;
        if (asset)
            asset.apl.spriteAtlas(asset.path, function (atlas) {
                if (!richText.isValid)
                    return;
                richText.imageAtlas = atlas;
                richText.string = str;
            });
        else
            str && (richText.string = str);
        return richText;
    };
    /** 创建一个普通精灵 */
    UICreate.sprite = function (asset, cb) {
        var node = new cc.Node();
        if (!node)
            return;
        var sp = node.addComponent(cc.Sprite);
        if (!sp)
            return;
        asset && asset.apl.spriteFrame(sp, asset.path, cb);
        return sp;
    };
    /** 创建一个裁切精灵 */
    UICreate.maskSprite = function (asset, cb) {
        var node = new cc.Node();
        if (!node)
            return;
        var sp = node.addComponent(MaskSprite_1.default);
        if (!sp)
            return;
        sp.maskType = CoreDefine_1.MaskSpriteType.Square;
        sp.center = cc.Vec2.ZERO;
        sp.radius = 42;
        asset && asset.apl.spriteFrame(sp, asset.path, cb);
        return sp;
    };
    /** 创建一个图集精灵 */
    UICreate.altsSprite = function (asset, cb) {
        var node = new cc.Node();
        if (!node)
            return;
        var sp = node.addComponent(cc.Sprite);
        if (!sp)
            return;
        asset && asset.apl.spriteAtlasFrame(sp, asset.path, asset.sub, cb);
        return sp;
    };
    /** 创建一个spine */
    UICreate.spine = function (asset, cb) {
        var node = new cc.Node();
        if (!node)
            return;
        var spine = node.addComponent(sp.Skeleton);
        if (!spine)
            return;
        asset &&
            asset.apl.spine(asset.path, function (sk) {
                if (!spine.isValid)
                    return;
                spine.skeletonData = sk;
                cb && cb(spine);
            });
        return spine;
    };
    UICreate.addLabelCom = function (node) {
        if (!node)
            return;
        var label = node.addComponent(cc.Label);
        if (!label)
            return;
        // label.font = i18n.ttf;
        // label.cacheMode = cc.Label.CacheMode.CHAR;
        label.fontSize = 22;
        label.lineHeight = 22;
        return label;
    };
    UICreate.plistLabel = function (path, apl, split, lineHeight) {
        var node = new cc.Node();
        var comp = node.addComponent(PlistLabel_1.default);
        apl.spriteAtlas(path, function (asset) {
            if (!node.isValid)
                return;
            comp.atlas = asset;
        });
        comp.spliteChar = split;
        comp.lineHeight = lineHeight;
        return comp;
    };
    UICreate.unTouchNode = function () {
        var node = new cc.Node();
        node.addComponent(cc.BlockInputEvents);
        node.setContentSize(cc.view.getVisibleSize());
        return node;
    };
    UICreate.createrPageMask = function (apl, info) {
        var maskRoot = new cc.Node("PAGE_MASK");
        var maskSprite = this.sprite({ path: UIResources_1.Res.single, apl: apl }, function (sprite) {
            sprite.node.setContentSize(cc.winSize);
            sprite.node.color = JXColor_1.JXColor.C000000;
            sprite.node.opacity = 168;
        });
        maskSprite.node.parent = maskRoot;
        var prefab = GLoader_1.GLoader.getPreLoadAsset(UIResources_1.Res.common.guide_item);
        var guideNode = cc.instantiate(prefab);
        guideNode.name = "GudieRoot";
        guideNode.setContentSize(cc.winSize);
        var com = guideNode.getComponent(GuideComponent_1.default);
        com.text.node.color = JXColor_1.JXColor.C000000;
        com.text.string = info;
        com.talkNode.active = true;
        com.talkNode.position = cc.v3(0, -280);
        com.talkNode.getChildByName("contiue").active = false;
        guideNode.parent = maskRoot;
        return maskRoot;
    };
    UICreate.createCanvaseMask = function (parent) {
        // 创建实际舞台区域之外的遮罩
        var actualSzie = GCtrl_1.GCtrl.actualSize;
        var winSize = cc.winSize;
        var leftNode = new cc.Node("_GLOBAL_LEFT_");
        var leftSprite = leftNode.addComponent(cc.Sprite);
        leftSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        leftNode.anchorX = 0;
        leftNode.x = -winSize.width / 2;
        GLoader_1.GLoader.spriteFrame(leftSprite, UIResources_1.Res.single);
        leftNode.color = cc.Color.BLACK;
        leftNode.parent = parent;
        leftNode.zIndex = CoreDefine_1.MAX_TAG;
        var rightNode = new cc.Node("_GLOBAL_RIGHT_");
        var rightSprite = rightNode.addComponent(cc.Sprite);
        rightSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        rightNode.anchorX = 0;
        rightNode.x = actualSzie.width / 2;
        GLoader_1.GLoader.spriteFrame(rightSprite, UIResources_1.Res.loadCtrl);
        rightNode.color = cc.Color.BLACK;
        rightNode.parent = parent;
        rightNode.zIndex = CoreDefine_1.MAX_TAG;
        // leftNode.opacity = rightNode.opacity = 128;
        var setMaskSize = function () {
            winSize = cc.winSize;
            leftNode.width = rightNode.width =
                winSize.width / 2 - actualSzie.width / 2;
            leftNode.height = rightNode.height = rightNode.height = winSize.height;
            leftNode.x = -winSize.width / 2;
            rightNode.x = actualSzie.width / 2;
        };
        setMaskSize();
        // let canvase
        var canvase = cc.director.getScene().getComponentInChildren(cc.Canvas);
        canvase.node.on(cc.Node.EventType.SIZE_CHANGED, setMaskSize, leftNode);
    };
    return UICreate;
}());
exports.default = UICreate;

cc._RF.pop();