"use strict";
cc._RF.push(module, '1e4b3mFCHlPFp5Ep/zRa+H5', 'GuideComponent');
// Script/Game/Guide/GuideComponent.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreDefine_1 = require("../../Core/CoreDefine");
var GComponent_1 = require("../../Core/FrameEx/GComponent");
var GDrag_1 = require("../../Core/FrameEx/GDrag");
var GLongTouch_1 = require("../../Core/FrameEx/GLongTouch");
var GLoader_1 = require("../../Core/GLoader/GLoader");
var IrregularTrigger_1 = require("../../Core/GView/IrregularTrigger");
var AudioMgr_1 = require("../../Core/Manager/AudioMgr");
var MathEx_1 = require("../../Core/Math/MathEx");
var UIResources_1 = require("../Common/UIResources");
var GCtrl_1 = require("./../../Core/GCtrl");
var GuideLogic_1 = require("./GuideLogic");
var WAIT_LOAD_TIMES = 10;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GuideComponent = /** @class */ (function (_super) {
    __extends(GuideComponent, _super);
    function GuideComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chipNode = null;
        _this.teachNode = null;
        _this.touchNode = null;
        _this.text = null;
        _this.talkNode = null;
        _this.maskShader = null;
        _this._handSk = null;
        _this._jiantouNode = null;
        _this._handlerMoveEnd = false;
        _this.nextCallBack = null;
        _this._configure = null;
        _this._target = null;
        _this._touchStart = false;
        _this._inMove = false;
        _this._waitLoadTimes = 0;
        return _this;
    }
    GuideComponent.prototype.onLoad = function () {
        // this.chipNode.width = cc.winSize.width * 2;
        // this.chipNode.height = cc.winSize.height * 2;
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onMaskTouchStart, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onMaskTouchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onMaskTouchEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onMaskTouchCancel, this);
    };
    GuideComponent.prototype.onDestroy = function () {
        this.touchNode.targetOff(this.touchNode);
    };
    GuideComponent.prototype.setTarget = function (pNode) {
        // this.targetMaskNode.width = pNode.width;
        // this.targetMaskNode.height = pNode.height;
        if (!cc.isValid(pNode))
            return;
        this._target = pNode;
        var aniNodePos, maskPos;
        if (this._configure.type == GuideLogic_1.GuidType.Drag) {
            var comp = pNode.getComponent(GDrag_1.default);
            if (!comp)
                return;
            var dragNode = comp.dragNodes[this._configure.drags[0]];
            var targetNode = comp.targetNodes[this._configure.drags[1]];
            if (!dragNode || !targetNode)
                return;
            //
            var centerPos = cc.v2(dragNode.width * (0.5 - dragNode.anchorX), dragNode.height * (0.5 - dragNode.anchorY));
            var worldPos = (maskPos = dragNode.convertToWorldSpaceAR(centerPos));
            aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
            if (this._configure.offset.length > 0) {
                aniNodePos.x += this._configure.offset[0];
                aniNodePos.y += this._configure.offset[1];
                maskPos.x += this._configure.offset[0];
                maskPos.y += this._configure.offset[1];
            }
            var targetCpos = cc.v2(targetNode.width * (0.5 - targetNode.anchorX), targetNode.height * (0.5 - targetNode.anchorY));
            var targetWpos = targetNode.convertToWorldSpaceAR(targetCpos);
            // this.maskShader.reSetMask1([worldPos.x - dragNode.width / 2, worldPos.y - dragNode.height / 2, dragNode.width, dragNode.height]);
            // this.maskShader.reSetMask2([targetWpos.x - targetNode.width / 2, targetWpos.y - targetNode.height / 2, targetNode.width, targetNode.height]);
            this.displayMoveAnimation(aniNodePos, this.maskShader.convertToNodeSpaceAR(targetWpos));
        }
        else if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            var listView = pNode["_list"];
            var item = null;
            var targetNode = null;
            if (!listView) {
                targetNode = pNode;
            }
            else {
                item = listView["_items"][this._configure.listIndex];
                if (!item || !item.node) {
                    // scrollToindex;
                    return;
                }
                targetNode = item.node;
            }
            var centerPos = cc.v2(targetNode.width * (0.5 - targetNode.anchorX), targetNode.height * (0.5 - targetNode.anchorY));
            var worldPos = (maskPos = targetNode.convertToWorldSpaceAR(centerPos));
            aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
            if (this._configure.offset.length > 0) {
                aniNodePos.x += this._configure.offset[0];
                aniNodePos.y += this._configure.offset[1];
                maskPos.x += this._configure.offset[0];
                maskPos.y += this._configure.offset[1];
            }
            this._target = targetNode;
            // this.maskShader.reSetMask1([worldPos.x - targetNode.width / 2, worldPos.y - targetNode.height / 2, targetNode.width, targetNode.height]);
        }
        else if (this._configure.type == GuideLogic_1.GuidType.NodeMove) {
            // 未完成
            var centerPos = cc.v2(pNode.width * (0.5 - pNode.anchorX), pNode.height * (0.5 - pNode.anchorY));
            var worldPos = pNode.convertToWorldSpaceAR(centerPos);
            aniNodePos = this.node.convertToNodeSpaceAR(worldPos);
            if (this._configure.offset.length > 0) {
                aniNodePos.x += this._configure.offset[0];
                aniNodePos.y += this._configure.offset[1];
                maskPos.x += this._configure.offset[0];
                maskPos.y += this._configure.offset[1];
            }
            var airPos = cc.v2(this._configure.drags[1], this._configure.drags[3]);
            airPos = pNode.parent.convertToWorldSpaceAR(airPos);
            airPos.addSelf(cc.v2(pNode.width * (0.5 - pNode.anchorX), pNode.height * (0.5 - pNode.anchorY)));
            // this.maskShader.reSetMask1([worldPos.x - pNode.width / 2, worldPos.y - pNode.height / 2, pNode.width, pNode.height]);
            // this.maskShader.reSetMask2([airPos.x - pNode.width / 2, airPos.y - pNode.height / 2, pNode.width, pNode.height])
            airPos = this.maskShader.convertToNodeSpaceAR(airPos);
            this.displayMoveAnimation(aniNodePos, airPos);
        }
        else {
            var centerPos = cc.v2(pNode.width * (0.5 - pNode.anchorX), pNode.height * (0.5 - pNode.anchorY));
            if (UIResources_1.Res.positionOffset[this._configure.path]) {
                centerPos.addSelf(UIResources_1.Res.positionOffset[this._configure.path]);
            }
            var worldPos = (maskPos = pNode.convertToWorldSpaceAR(centerPos));
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
        if (this._configure.type != GuideLogic_1.GuidType.Drag &&
            this._configure.type != GuideLogic_1.GuidType.NodeMove) {
            if (!this._handSk) {
                this.displayClickAnimation();
            }
            var aniPos = cc.Vec2.ZERO;
            if (this._configure.aniOffset.length > 0) {
                aniPos = cc.v2(this._configure.aniOffset[0], this._configure.aniOffset[1]);
            }
            if (this._configure.aniRotate) {
                this._handSk.node.angle = -this._configure.aniRotate;
            }
            var position = aniNodePos.add(aniPos);
            var sp = this._target.getComponent(cc.Sprite);
            if (!sp) {
                var bg = this._target
                    .getChildByName("Background")
                    .getComponent(cc.Sprite);
                sp = bg;
            }
            var mesk = this.maskShader.getComponent(cc.Mask);
            if (mesk.node.width != this._target.width &&
                mesk.node.width != this.talkNode.height) {
                if (sp) {
                    mesk.type = cc.Mask.Type.IMAGE_STENCIL;
                    mesk.spriteFrame = sp.spriteFrame;
                    mesk.alphaThreshold = 0.5;
                }
                else {
                    mesk.type = cc.Mask.Type.RECT;
                }
                mesk.node.width = this._target.width * this._target.scale;
                mesk.node.height = this._target.height * this._target.scale;
            }
            this.maskShader.position = cc.v3(position.x, position.y);
            this._handSk.node.position = cc.v3(position.x + this._handSk.node.width / 2, position.y - this._handSk.node.height / 2);
        }
    };
    GuideComponent.prototype.setConfigure = function (step) {
        this._configure = step;
        if (this._configure) {
            if (this._configure.type == GuideLogic_1.GuidType.Dialog) {
                // this.maskShader.reSetMask1([-1, -1, -1, -1]);
            }
        }
        this.maskShader.setContentSize(GCtrl_1.GCtrl.winSize);
        this._waitLoadTimes = 0;
    };
    GuideComponent.prototype.showMessage = function (textKey) {
        var key = textKey || this._configure.msgkey;
        if (!key) {
            this.talkNode.active = false;
        }
        else {
            this.showMask();
            this.talkNode.active = true;
            this.talkNode.position = cc.v3(this._configure.talkPos[0], this._configure.talkPos[1]);
            this.text.string = this._configure.msgkey;
        }
    };
    GuideComponent.prototype.hidMask = function () {
        this.chipNode.active = false;
    };
    GuideComponent.prototype.showMask = function () {
        this.chipNode.active = true;
    };
    GuideComponent.prototype.onMaskTouchStart = function (event) {
        if (this._inMove)
            return;
        if (this._configure == null)
            return;
        var nodePos = this.chipNode.convertToNodeSpaceAR(event.getLocation());
        if (nodePos.x < -this.chipNode.width / 2 ||
            nodePos.x > this.chipNode.width / 2 ||
            nodePos.y < -this.chipNode.height / 2 ||
            nodePos.y > this.chipNode.height / 2)
            return;
        if (!this._target)
            return;
        this._touchStart = true;
        // 如果是Slider
        if (this._configure.type == GuideLogic_1.GuidType.Slide) {
            var slider = this._target.getComponent(cc.Slider);
            if (slider) {
                slider["_onTouchBegan"](event);
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.Drag) {
            var pGrag = this._target.getComponent(GDrag_1.default);
            if (pGrag) {
                pGrag["_onTouchStart"](event);
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            var list = this._target.parent.parent.parent["_list"];
            if (list) {
                var item = list["_items"][this._configure.listIndex];
                if (!item) {
                    this._touchStart = false;
                    return;
                }
                if (list) {
                    list["onTouchStart"](event);
                }
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.NodeMove) {
            this._target && this._target.emit(cc.Node.EventType.TOUCH_START, event);
        }
    };
    GuideComponent.prototype.onMaskTouchMove = function (event) {
        if (!this._touchStart)
            return;
        if (!this._configure)
            return;
        // 如果是Slider
        if (this._configure.type == GuideLogic_1.GuidType.Slide) {
            var slider = this._target.getComponent(cc.Slider);
            if (slider) {
                slider["_onTouchMoved"](event);
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.Drag) {
            var pGrag = this._target.getComponent(GDrag_1.default);
            if (pGrag) {
                pGrag["_onTouchMove"](event);
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            var list = this._target.parent.parent.parent["_list"];
            if (list) {
                list["onTouchMove"](event);
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.NodeMove) {
            this._target && this._target.emit(cc.Node.EventType.TOUCH_MOVE, event);
        }
    };
    GuideComponent.prototype.onMaskTouchEnd = function (event) {
        // if(!this._target) return;
        if (this._configure == null)
            return;
        if (this._configure.type == GuideLogic_1.GuidType.Dialog) {
            this.next();
            return;
        }
        if (!this._touchStart)
            return;
        this._touchStart = false;
        // 如果是Slider
        if (this._configure.type == GuideLogic_1.GuidType.Slide) {
            // let slider = this._target.getComponent(cc.Slider);
            // if (slider) {
            //     slider['_onTouchEnded'](event);
            //     if (slider.progress < this._configure.progress)
            //         return;
            //     this.next();
            // }
            return this.next();
        }
        else if (this._configure.type == GuideLogic_1.GuidType.Drag) {
            var pGrag = this._target.getComponent(GDrag_1.default);
            if (pGrag) {
                this.onGragTouchEnd(pGrag, event);
            }
            return;
        }
        else if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            var list = this._target.parent.parent.parent["_list"];
            if (list) {
                this.onListViewTouchEnd(list, event);
            }
            else {
                var camp = this._target.getComponent(this._target.name);
                this.next();
                camp["_onTouchEnd"](event);
            }
            return;
        }
        else if (this._configure.type == GuideLogic_1.GuidType.NodeMove) {
            this.onNodeMoveEnd(event);
            return;
        }
        var nodePos = this.chipNode.convertToNodeSpaceAR(event.getLocation());
        if (nodePos.x < -this.chipNode.width / 2 ||
            nodePos.x > this.chipNode.width / 2 ||
            nodePos.y < -this.chipNode.height / 2 ||
            nodePos.y > this.chipNode.height / 2) {
            this._touchStart = false;
            return;
        }
        if (!this._target)
            return;
        var centerPos = cc.v2(this._target.width * (0.5 - this._target.anchorX), this._target.height * (0.5 - this._target.anchorY));
        var worldPos = this._target.convertToWorldSpaceAR(centerPos);
        var rect = cc.rect(worldPos.x - this._target.width / 2, worldPos.y - this._target.height / 2, this._target.width, this._target.height);
        if (!rect.contains(event.getLocation())) {
            this._touchStart = false;
            return;
        }
        event.target = this._target;
        var toggle = this._target.getComponent(cc.Toggle);
        if (toggle) {
            this.next();
            AudioMgr_1.AudioMgr.Ins().playEffect(toggle.clickAudio || cc.Button.comAudio);
            cc.Component.EventHandler.emitEvents(toggle.checkEvents, toggle);
            toggle.check();
            this._target && this._target.emit("toggle", toggle);
            this._target && this._target.emit("click", toggle);
            return;
        }
        var longTouch = this._target.getComponent(GLongTouch_1.default);
        if (longTouch) {
            this.next();
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
            longTouch["emitLongTouchEvent"]();
            return;
        }
        var btn = this._target.getComponent(cc.Button);
        if (btn && btn.enabled && btn.interactable) {
            this.next();
            AudioMgr_1.AudioMgr.Ins().playEffect(btn.clickAudio || cc.Button.comAudio);
            cc.Component.EventHandler.emitEvents(btn.clickEvents, event);
            this._target && this._target.emit("click", this);
            return;
        }
        var coustomBtn = this._target.getComponent(IrregularTrigger_1.default);
        if (coustomBtn) {
            this.next();
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
            cc.Component.EventHandler.emitEvents(coustomBtn.events, event);
            return;
        }
        if (this._configure.type == GuideLogic_1.GuidType.Click) {
            this._target && this._target.emit(cc.Node.EventType.TOUCH_END, event);
            this.next();
        }
    };
    GuideComponent.prototype.onMaskTouchCancel = function (event) {
        this._touchStart = false;
        if (this._configure == null)
            return;
        if (this._configure.type == GuideLogic_1.GuidType.Slide) {
            var slider = this._target.getComponent(cc.Slider);
            if (slider) {
                this.next();
            }
        }
        else if (this._configure.type == GuideLogic_1.GuidType.Drag) {
            var pGrag = this._target.getComponent(GDrag_1.default);
            if (pGrag) {
                this.onGragTouchEnd(pGrag, event);
            }
            return;
        }
        else if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            var list = this._target.parent.parent.parent["_list"];
            if (list) {
                this.onListViewTouchEnd(list, event);
            }
            return;
        }
        else if (this._configure.type == GuideLogic_1.GuidType.NodeMove) {
            this.onNodeMoveEnd(event);
        }
    };
    GuideComponent.prototype.onGragTouchEnd = function (pGDragNode, event) {
        var isNext = false;
        if (pGDragNode["_touchMove"]) {
            var lastTarget = pGDragNode["_lastTargetNode"], selectDragNode = pGDragNode["_curSelectDragNode"];
            var indexOfTarget = pGDragNode.targetNodes.indexOf(lastTarget);
            var indexofDrag = pGDragNode.dragNodes.indexOf(selectDragNode);
            if (indexofDrag == this._configure.drags[0] &&
                indexOfTarget == this._configure.drags[1]) {
                isNext = true;
            }
        }
        if (isNext) {
            this.next();
            pGDragNode["_onTouchEnd"](event);
        }
        else {
            pGDragNode["resetTouchEvent"]();
        }
    };
    GuideComponent.prototype.onListViewTouchEnd = function (pListView, event) {
        var isNext = false;
        if (this._configure.type == GuideLogic_1.GuidType.ListItemClick) {
            if (pListView["_childLongTouchTimes"] > 0 ||
                !pListView["_isTouchPress"] ||
                !pListView["_touchChildNode"]) {
                isNext = false;
            }
            else {
                var index = parseInt(pListView["_touchChildNode"].name.replace("item_", ""));
                if (index != this._configure.listIndex) {
                    isNext = false;
                }
                else {
                    isNext = true;
                    AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
                }
            }
        }
        if (isNext) {
            this.next();
            pListView["onToucEnd"](event);
        }
        else {
            pListView["cancelTouchEvent"]();
        }
    };
    GuideComponent.prototype.onNodeMoveEnd = function (event) {
        this._target && this._target.emit(cc.Node.EventType.TOUCH_END, event);
        var pos = this._target.position;
        if (this.posCompare(this._configure.drags[0], this._configure.drags[1], pos.x) &&
            this.posCompare(this._configure.drags[2], this._configure.drags[3], pos.y)) {
            this.next();
        }
    };
    GuideComponent.prototype.posCompare = function (flag, air, cur) {
        if (!flag || flag == "null")
            return true;
        if (flag == ">") {
            return cur >= air;
        }
        else if (flag == "<") {
            return cur <= air;
        }
        else if (flag) {
            var range = Number(flag);
            return Math.abs(air - cur) < range;
        }
    };
    GuideComponent.prototype.next = function () {
        this._target = null;
        var time = this._configure.time;
        this.talkNode.active = false;
        this._configure = null;
        this._waitLoadTimes = CoreDefine_1.INVALID_VALUE;
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
    };
    GuideComponent.prototype.update = function (dt) {
        if (!this._configure)
            return;
        if (this._waitLoadTimes > CoreDefine_1.INVALID_VALUE) {
            if (GLoader_1.GAssetImpl.isLoading()) {
                return;
            }
            this._waitLoadTimes++;
            if (this._waitLoadTimes != WAIT_LOAD_TIMES) {
                return;
            }
            this._waitLoadTimes = CoreDefine_1.INVALID_VALUE;
            if (!this._configure.path || this._configure.path == "null") {
                this.showMessage();
            }
        }
        if (!this._configure.path || this._configure.path == "null")
            return;
        if (this._target) {
            this.setTarget(this._target);
            return;
        }
        var node = cc.find(this._configure.path);
        if (!node || !node.active)
            return; // 如果节点属于隐藏状态，认为找不到节点
        this.showMask();
        this.setTarget(node);
        this.showMessage();
    };
    GuideComponent.prototype.cteateTextureNode = function () {
        var textureNode = new cc.Node("texuture_node");
        var spNode1 = new cc.Node("jiantou");
        spNode1.y = 41.9;
        spNode1.angle = -180;
        var spNode2 = new cc.Node("wenzi");
        spNode2.y = 83.2;
        var sp1 = spNode1.addComponent(cc.Sprite);
        this.assetImpl.spriteFrame(sp1, "Views/Guide/5");
        spNode2.addComponent(cc.Sprite);
        spNode1.parent = textureNode;
        spNode2.parent = textureNode;
        textureNode.parent = this.node;
    };
    GuideComponent.prototype.setTexture = function (path) {
        // this.textureNode.active = true;
        // let sp = this.textureNode.getChildComByName('wenzi', cc.Sprite)
        // GLoader.spriteFrame(sp, path, true);
    };
    GuideComponent.prototype.displayClickAnimation = function () {
        var _this = this;
        if (!this._handSk) {
            var handNode = new cc.Node("hand");
            handNode.parent = this.node;
            this._handSk = handNode.addComponent(dragonBones.ArmatureDisplay);
        }
        this._handSk.premultipliedAlpha = true;
        this.assetImpl.dragonBones(UIResources_1.Res.common.guide, function (dragonAsset, dragonAtlas) {
            if (!cc.isValid(_this._handSk))
                return;
            _this._handSk.dragonAsset = dragonAsset;
            _this._handSk.dragonAtlasAsset = dragonAtlas;
            _this._handSk.armatureName = "Armature";
            _this._handlerMoveEnd = true;
            _this._handSk.node.scale = 0.8;
            GCtrl_1.GCtrl.playDragonAni(_this._handSk, "dianji", true);
        });
    };
    GuideComponent.prototype.displayMoveAnimation = function (startPos, endPos) {
        var _this = this;
        if (!this._handSk) {
            var handNode = new cc.Node("hand");
            handNode.parent = this.node;
            handNode.zIndex = 10;
            this._handSk = handNode.addComponent(dragonBones.ArmatureDisplay);
            this._handSk.premultipliedAlpha = true;
            this.assetImpl.dragonBones(UIResources_1.Res.common.guide, function (dragonAsset, dragonAtlas) {
                if (!cc.isValid(_this._handSk))
                    return;
                _this._handSk.dragonAsset = dragonAsset;
                _this._handSk.dragonAtlasAsset = dragonAtlas;
                _this._handSk.armatureName = "Armature";
                _this._handlerMoveEnd = true;
                GCtrl_1.GCtrl.playDragonAni(_this._handSk, "changan", true);
            });
            // let sprite = UICreate.altsSprite({ path: Res.texture.common, apl: this.assetImpl, sub: "jiantou" });
            // sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            // // sprite.node.zIndex = 1;
            // this._jiantouNode = sprite.node;
            // this._jiantouNode.parent = this.node;
            // this._jiantouNode.height = 52;
            // this._jiantouNode.anchorX = 0;
        }
        if (!this._handSk.dragonAtlasAsset || !this._handSk.dragonAsset)
            return;
        if (!this._handlerMoveEnd)
            return;
        this._handlerMoveEnd = false;
        cc.director
            .getActionManager()
            .removeAllActionsFromTarget(this._handSk.node, true);
        cc.director
            .getActionManager()
            .removeAllActionsFromTarget(this._jiantouNode, true);
        this._handSk.node.position = cc.v3(startPos.x, startPos.y);
        var angle = MathEx_1.default.getAngleX(startPos, endPos);
        this._jiantouNode.angle = angle;
        this._jiantouNode.position = cc.v3(startPos.x, startPos.y);
        this._jiantouNode.width = 0;
        cc.tween(this._handSk.node)
            .to(1, { position: cc.v3(endPos.x, endPos.y) }, { easing: "sineOut" })
            .delay(0.25)
            .call(function () {
            _this._handlerMoveEnd = true;
        })
            .start();
        cc.tween(this._jiantouNode)
            .to(1, { width: startPos.sub(endPos).mag() }, { easing: "sineOut" })
            .start();
    };
    __decorate([
        property(cc.Node)
    ], GuideComponent.prototype, "chipNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuideComponent.prototype, "teachNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuideComponent.prototype, "touchNode", void 0);
    __decorate([
        property(cc.RichText)
    ], GuideComponent.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], GuideComponent.prototype, "talkNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuideComponent.prototype, "maskShader", void 0);
    GuideComponent = __decorate([
        ccclass,
        menu("View/Guide/GuideCtrl")
    ], GuideComponent);
    return GuideComponent;
}(GComponent_1.default));
exports.default = GuideComponent;

cc._RF.pop();