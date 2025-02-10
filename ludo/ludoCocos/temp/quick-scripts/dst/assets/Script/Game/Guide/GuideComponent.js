
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Guide/GuideComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9HdWlkZS9HdWlkZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0Q7QUFFdEQsNERBQXVEO0FBQ3ZELGtEQUE2QztBQUM3Qyw0REFBdUQ7QUFDdkQsc0RBQXdEO0FBRXhELHNFQUFpRTtBQUNqRSx3REFBdUQ7QUFDdkQsaURBQTRDO0FBQzVDLHFEQUE0QztBQUM1Qyw0Q0FBMkM7QUFFM0MsMkNBQXdDO0FBRXhDLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUE0QyxrQ0FBVTtJQUF0RDtRQUFBLHFFQTZxQkM7UUE1cUJvQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUN0QixVQUFJLEdBQWdCLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRXBDLGFBQU8sR0FBZ0MsSUFBSSxDQUFDO1FBQzVDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBRXBDLGtCQUFZLEdBQVEsSUFBSSxDQUFDO1FBRXRCLGdCQUFVLEdBQXNCLElBQUksQ0FBQztRQUNyQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsb0JBQWMsR0FBRyxDQUFDLENBQUM7O0lBMnBCL0IsQ0FBQztJQXZwQkMsK0JBQU0sR0FBTjtRQUNFLDhDQUE4QztRQUM5QyxnREFBZ0Q7UUFFaEQsSUFBSSxDQUFDLFNB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LENBQUM7T0FDUixjQUFjLENBNnFCbEM7SUFBRCxxQkFBQztDQTdxQkQsQUE2cUJDLENBN3FCMkMsb0JBQVUsR0E2cUJyRDtrQkE3cUJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSB9IGZyb20gXCIuLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IENvbG9yTG9nIGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvQ29sb3JMb2dcIjtcclxuaW1wb3J0IEdDb21wb25lbnQgZnJvbSBcIi4uLy4uL0NvcmUvRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcbmltcG9ydCBHRHJhZyBmcm9tIFwiLi4vLi4vQ29yZS9GcmFtZUV4L0dEcmFnXCI7XHJcbmltcG9ydCBHTG9uZ1RvdWNoIGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvR0xvbmdUb3VjaFwiO1xyXG5pbXBvcnQgeyBHQXNzZXRJbXBsIH0gZnJvbSBcIi4uLy4uL0NvcmUvR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCB7IEdMaXN0VmlldyB9IGZyb20gXCIuLi8uLi9Db3JlL0dWaWV3L0dMaXN0Vmlld1wiO1xyXG5pbXBvcnQgSXJyZWd1bGFyVHJpZ2dlciBmcm9tIFwiLi4vLi4vQ29yZS9HVmlldy9JcnJlZ3VsYXJUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcIi4uLy4uL0NvcmUvTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQgTWF0aEV4IGZyb20gXCIuLi8uLi9Db3JlL01hdGgvTWF0aEV4XCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmltcG9ydCB7IFNHdWlkZVN0ZXBEYXRhUmF3IH0gZnJvbSBcIi4vR3VpZGUudHlwZVwiO1xyXG5pbXBvcnQgeyBHdWlkVHlwZSB9IGZyb20gXCIuL0d1aWRlTG9naWNcIjtcclxuXHJcbmNvbnN0IFdBSVRfTE9BRF9USU1FUyA9IDEwO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvR3VpZGUvR3VpZGVDdHJsXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlQ29tcG9uZW50IGV4dGVuZHMgR0NvbXBvbmVudCB7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIGNoaXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgdGVhY2hOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgdG91Y2hOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuUmljaFRleHQpIHRleHQ6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgdGFsa05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSBtYXNrU2hhZGVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIF9oYW5kU2s6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9qaWFudG91Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9oYW5kbGVyTW92ZUVuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgbmV4dENhbGxCYWNrOiBhbnkgPSBudWxsO1xyXG5cclxuICBwcm90ZWN0ZWQgX2NvbmZpZ3VyZTogU0d1aWRlU3RlcERhdGFSYXcgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfdGFyZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX3RvdWNoU3RhcnQgPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgX2luTW92ZSA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBfd2FpdExvYWRUaW1lcyA9IDA7XHJcblxyXG4gIHByb3RlY3RlZCBfZXh0OiBhbnk7XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8vIHRoaXMuY2hpcE5vZGUud2lkdGggPSBjYy53aW5TaXplLndpZHRoICogMjtcclxuICAgIC8vIHRoaXMuY2hpcE5vZGUuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQgKiAyO1xyXG5cclxuICAgIHRoaXMudG91Y2hOb2RlLm9uPHsgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB9PihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgIHRoaXMub25NYXNrVG91Y2hTdGFydCxcclxuICAgICAgdGhpc1xyXG4gICAgKTtcclxuICAgIHRoaXMudG91Y2hOb2RlLm9uPHsgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB9PihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSxcclxuICAgICAgdGhpcy5vbk1hc2tUb3VjaE1vdmUsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLnRvdWNoTm9kZS5vbjx7IChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQgfT4oXHJcbiAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgdGhpcy5vbk1hc2tUb3VjaEVuZCxcclxuICAgICAgdGhpc1xyXG4gICAgKTtcclxuICAgIHRoaXMudG91Y2hOb2RlLm9uPHsgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB9PihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLFxyXG4gICAgICB0aGlzLm9uTWFza1RvdWNoQ2FuY2VsLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50b3VjaE5vZGUudGFyZ2V0T2ZmKHRoaXMudG91Y2hOb2RlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRUYXJnZXQocE5vZGU6IGNjLk5vZGUpIHtcclxuICAgIC8vIHRoaXMudGFyZ2V0TWFza05vZGUud2lkdGggPSBwTm9kZS53aWR0aDtcclxuICAgIC8vIHRoaXMudGFyZ2V0TWFza05vZGUuaGVpZ2h0ID0gcE5vZGUuaGVpZ2h0O1xyXG5cclxuICAgIGlmICghY2MuaXNWYWxpZChwTm9kZSkpIHJldHVybjtcclxuICAgIHRoaXMuX3RhcmdldCA9IHBOb2RlO1xyXG4gICAgbGV0IGFuaU5vZGVQb3M6IGNjLlZlYzIsIG1hc2tQb3M6IGNjLlZlYzI7XHJcbiAgICBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuRHJhZykge1xyXG4gICAgICBsZXQgY29tcCA9IHBOb2RlLmdldENvbXBvbmVudChHRHJhZyk7XHJcbiAgICAgIGlmICghY29tcCkgcmV0dXJuO1xyXG4gICAgICBsZXQgZHJhZ05vZGUgPSBjb21wLmRyYWdOb2Rlc1t0aGlzLl9jb25maWd1cmUuZHJhZ3NbMF1dO1xyXG4gICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGNvbXAudGFyZ2V0Tm9kZXNbdGhpcy5fY29uZmlndXJlLmRyYWdzWzFdXTtcclxuICAgICAgaWYgKCFkcmFnTm9kZSB8fCAhdGFyZ2V0Tm9kZSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy9cclxuICAgICAgbGV0IGNlbnRlclBvcyA9IGNjLnYyKFxyXG4gICAgICAgIGRyYWdOb2RlLndpZHRoICogKDAuNSAtIGRyYWdOb2RlLmFuY2hvclgpLFxyXG4gICAgICAgIGRyYWdOb2RlLmhlaWdodCAqICgwLjUgLSBkcmFnTm9kZS5hbmNob3JZKVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgd29ybGRQb3MgPSAobWFza1BvcyA9IGRyYWdOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjZW50ZXJQb3MpKTtcclxuICAgICAgYW5pTm9kZVBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgIGlmICh0aGlzLl9jb25maWd1cmUub2Zmc2V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhbmlOb2RlUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBhbmlOb2RlUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgICBtYXNrUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBtYXNrUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHRhcmdldENwb3MgPSBjYy52MihcclxuICAgICAgICB0YXJnZXROb2RlLndpZHRoICogKDAuNSAtIHRhcmdldE5vZGUuYW5jaG9yWCksXHJcbiAgICAgICAgdGFyZ2V0Tm9kZS5oZWlnaHQgKiAoMC41IC0gdGFyZ2V0Tm9kZS5hbmNob3JZKVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgdGFyZ2V0V3BvcyA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHRhcmdldENwb3MpO1xyXG4gICAgICAvLyB0aGlzLm1hc2tTaGFkZXIucmVTZXRNYXNrMShbd29ybGRQb3MueCAtIGRyYWdOb2RlLndpZHRoIC8gMiwgd29ybGRQb3MueSAtIGRyYWdOb2RlLmhlaWdodCAvIDIsIGRyYWdOb2RlLndpZHRoLCBkcmFnTm9kZS5oZWlnaHRdKTtcclxuICAgICAgLy8gdGhpcy5tYXNrU2hhZGVyLnJlU2V0TWFzazIoW3RhcmdldFdwb3MueCAtIHRhcmdldE5vZGUud2lkdGggLyAyLCB0YXJnZXRXcG9zLnkgLSB0YXJnZXROb2RlLmhlaWdodCAvIDIsIHRhcmdldE5vZGUud2lkdGgsIHRhcmdldE5vZGUuaGVpZ2h0XSk7XHJcbiAgICAgIHRoaXMuZGlzcGxheU1vdmVBbmltYXRpb24oXHJcbiAgICAgICAgYW5pTm9kZVBvcyxcclxuICAgICAgICB0aGlzLm1hc2tTaGFkZXIuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0V3BvcylcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuTGlzdEl0ZW1DbGljaykge1xyXG4gICAgICBsZXQgbGlzdFZpZXcgPSBwTm9kZVtcIl9saXN0XCJdIGFzIEdMaXN0VmlldztcclxuICAgICAgbGV0IGl0ZW0gPSBudWxsO1xyXG4gICAgICBsZXQgdGFyZ2V0Tm9kZSA9IG51bGw7XHJcbiAgICAgIGlmICghbGlzdFZpZXcpIHtcclxuICAgICAgICB0YXJnZXROb2RlID0gcE5vZGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbSA9IGxpc3RWaWV3W1wiX2l0ZW1zXCJdW3RoaXMuX2NvbmZpZ3VyZS5saXN0SW5kZXhdO1xyXG4gICAgICAgIGlmICghaXRlbSB8fCAhaXRlbS5ub2RlKSB7XHJcbiAgICAgICAgICAvLyBzY3JvbGxUb2luZGV4O1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXROb2RlID0gaXRlbS5ub2RlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgY2VudGVyUG9zID0gY2MudjIoXHJcbiAgICAgICAgdGFyZ2V0Tm9kZS53aWR0aCAqICgwLjUgLSB0YXJnZXROb2RlLmFuY2hvclgpLFxyXG4gICAgICAgIHRhcmdldE5vZGUuaGVpZ2h0ICogKDAuNSAtIHRhcmdldE5vZGUuYW5jaG9yWSlcclxuICAgICAgKTtcclxuICAgICAgbGV0IHdvcmxkUG9zID0gKG1hc2tQb3MgPSB0YXJnZXROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjZW50ZXJQb3MpKTtcclxuICAgICAgYW5pTm9kZVBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgIGlmICh0aGlzLl9jb25maWd1cmUub2Zmc2V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhbmlOb2RlUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBhbmlOb2RlUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgICBtYXNrUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBtYXNrUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXROb2RlO1xyXG4gICAgICAvLyB0aGlzLm1hc2tTaGFkZXIucmVTZXRNYXNrMShbd29ybGRQb3MueCAtIHRhcmdldE5vZGUud2lkdGggLyAyLCB3b3JsZFBvcy55IC0gdGFyZ2V0Tm9kZS5oZWlnaHQgLyAyLCB0YXJnZXROb2RlLndpZHRoLCB0YXJnZXROb2RlLmhlaWdodF0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5Ob2RlTW92ZSkge1xyXG4gICAgICAvLyDmnKrlrozmiJBcclxuICAgICAgbGV0IGNlbnRlclBvcyA9IGNjLnYyKFxyXG4gICAgICAgIHBOb2RlLndpZHRoICogKDAuNSAtIHBOb2RlLmFuY2hvclgpLFxyXG4gICAgICAgIHBOb2RlLmhlaWdodCAqICgwLjUgLSBwTm9kZS5hbmNob3JZKVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgd29ybGRQb3MgPSBwTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2VudGVyUG9zKTtcclxuICAgICAgYW5pTm9kZVBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgIGlmICh0aGlzLl9jb25maWd1cmUub2Zmc2V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhbmlOb2RlUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBhbmlOb2RlUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgICBtYXNrUG9zLnggKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFswXTtcclxuICAgICAgICBtYXNrUG9zLnkgKz0gdGhpcy5fY29uZmlndXJlLm9mZnNldFsxXTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgYWlyUG9zID0gY2MudjIodGhpcy5fY29uZmlndXJlLmRyYWdzWzFdLCB0aGlzLl9jb25maWd1cmUuZHJhZ3NbM10pO1xyXG4gICAgICBhaXJQb3MgPSBwTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGFpclBvcyk7XHJcbiAgICAgIGFpclBvcy5hZGRTZWxmKFxyXG4gICAgICAgIGNjLnYyKFxyXG4gICAgICAgICAgcE5vZGUud2lkdGggKiAoMC41IC0gcE5vZGUuYW5jaG9yWCksXHJcbiAgICAgICAgICBwTm9kZS5oZWlnaHQgKiAoMC41IC0gcE5vZGUuYW5jaG9yWSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIHRoaXMubWFza1NoYWRlci5yZVNldE1hc2sxKFt3b3JsZFBvcy54IC0gcE5vZGUud2lkdGggLyAyLCB3b3JsZFBvcy55IC0gcE5vZGUuaGVpZ2h0IC8gMiwgcE5vZGUud2lkdGgsIHBOb2RlLmhlaWdodF0pO1xyXG4gICAgICAvLyB0aGlzLm1hc2tTaGFkZXIucmVTZXRNYXNrMihbYWlyUG9zLnggLSBwTm9kZS53aWR0aCAvIDIsIGFpclBvcy55IC0gcE5vZGUuaGVpZ2h0IC8gMiwgcE5vZGUud2lkdGgsIHBOb2RlLmhlaWdodF0pXHJcbiAgICAgIGFpclBvcyA9IHRoaXMubWFza1NoYWRlci5jb252ZXJ0VG9Ob2RlU3BhY2VBUihhaXJQb3MpO1xyXG4gICAgICB0aGlzLmRpc3BsYXlNb3ZlQW5pbWF0aW9uKGFuaU5vZGVQb3MsIGFpclBvcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgY2VudGVyUG9zID0gY2MudjIoXHJcbiAgICAgICAgcE5vZGUud2lkdGggKiAoMC41IC0gcE5vZGUuYW5jaG9yWCksXHJcbiAgICAgICAgcE5vZGUuaGVpZ2h0ICogKDAuNSAtIHBOb2RlLmFuY2hvclkpXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChSZXMucG9zaXRpb25PZmZzZXRbdGhpcy5fY29uZmlndXJlLnBhdGhdKSB7XHJcbiAgICAgICAgY2VudGVyUG9zLmFkZFNlbGYoUmVzLnBvc2l0aW9uT2Zmc2V0W3RoaXMuX2NvbmZpZ3VyZS5wYXRoXSk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHdvcmxkUG9zID0gKG1hc2tQb3MgPSBwTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2VudGVyUG9zKSk7XHJcblxyXG4gICAgICBhbmlOb2RlUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZ3VyZS5vZmZzZXQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFuaU5vZGVQb3MueCArPSB0aGlzLl9jb25maWd1cmUub2Zmc2V0WzBdO1xyXG4gICAgICAgIGFuaU5vZGVQb3MueSArPSB0aGlzLl9jb25maWd1cmUub2Zmc2V0WzFdO1xyXG4gICAgICAgIG1hc2tQb3MueCArPSB0aGlzLl9jb25maWd1cmUub2Zmc2V0WzBdO1xyXG4gICAgICAgIG1hc2tQb3MueSArPSB0aGlzLl9jb25maWd1cmUub2Zmc2V0WzFdO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRoaXMubWFza1NoYWRlci5yZVNldE1hc2sxKFt3b3JsZFBvcy54IC0gcE5vZGUud2lkdGggLyAyLCB3b3JsZFBvcy55IC0gcE5vZGUuaGVpZ2h0IC8gMiwgcE5vZGUud2lkdGgsIHBOb2RlLmhlaWdodF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFuaW1hdGlvblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLl9jb25maWd1cmUudHlwZSAhPSBHdWlkVHlwZS5EcmFnICYmXHJcbiAgICAgIHRoaXMuX2NvbmZpZ3VyZS50eXBlICE9IEd1aWRUeXBlLk5vZGVNb3ZlXHJcbiAgICApIHtcclxuICAgICAgaWYgKCF0aGlzLl9oYW5kU2spIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDbGlja0FuaW1hdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBhbmlQb3M6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgIGlmICh0aGlzLl9jb25maWd1cmUuYW5pT2Zmc2V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhbmlQb3MgPSBjYy52MihcclxuICAgICAgICAgIHRoaXMuX2NvbmZpZ3VyZS5hbmlPZmZzZXRbMF0sXHJcbiAgICAgICAgICB0aGlzLl9jb25maWd1cmUuYW5pT2Zmc2V0WzFdXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fY29uZmlndXJlLmFuaVJvdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRTay5ub2RlLmFuZ2xlID0gLXRoaXMuX2NvbmZpZ3VyZS5hbmlSb3RhdGU7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHBvc2l0aW9uID0gYW5pTm9kZVBvcy5hZGQoYW5pUG9zKTtcclxuICAgICAgbGV0IHNwID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICBpZiAoIXNwKSB7XHJcbiAgICAgICAgbGV0IGJnID0gdGhpcy5fdGFyZ2V0XHJcbiAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpXHJcbiAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3AgPSBiZztcclxuICAgICAgfVxyXG4gICAgICBsZXQgbWVzayA9IHRoaXMubWFza1NoYWRlci5nZXRDb21wb25lbnQoY2MuTWFzayk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBtZXNrLm5vZGUud2lkdGggIT0gdGhpcy5fdGFyZ2V0LndpZHRoICYmXHJcbiAgICAgICAgbWVzay5ub2RlLndpZHRoICE9IHRoaXMudGFsa05vZGUuaGVpZ2h0XHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChzcCkge1xyXG4gICAgICAgICAgbWVzay50eXBlID0gY2MuTWFzay5UeXBlLklNQUdFX1NURU5DSUw7XHJcbiAgICAgICAgICBtZXNrLnNwcml0ZUZyYW1lID0gc3Auc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICBtZXNrLmFscGhhVGhyZXNob2xkID0gMC41O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtZXNrLnR5cGUgPSBjYy5NYXNrLlR5cGUuUkVDVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzay5ub2RlLndpZHRoID0gdGhpcy5fdGFyZ2V0LndpZHRoICogdGhpcy5fdGFyZ2V0LnNjYWxlO1xyXG4gICAgICAgIG1lc2subm9kZS5oZWlnaHQgPSB0aGlzLl90YXJnZXQuaGVpZ2h0ICogdGhpcy5fdGFyZ2V0LnNjYWxlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWFza1NoYWRlci5wb3NpdGlvbiA9IGNjLnYzKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLl9oYW5kU2subm9kZS5wb3NpdGlvbiA9IGNjLnYzKFxyXG4gICAgICAgIHBvc2l0aW9uLnggKyB0aGlzLl9oYW5kU2subm9kZS53aWR0aCAvIDIsXHJcbiAgICAgICAgcG9zaXRpb24ueSAtIHRoaXMuX2hhbmRTay5ub2RlLmhlaWdodCAvIDJcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRDb25maWd1cmUoc3RlcCkge1xyXG4gICAgdGhpcy5fY29uZmlndXJlID0gc3RlcDtcclxuICAgIGlmICh0aGlzLl9jb25maWd1cmUpIHtcclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZ3VyZS50eXBlID09IEd1aWRUeXBlLkRpYWxvZykge1xyXG4gICAgICAgIC8vIHRoaXMubWFza1NoYWRlci5yZVNldE1hc2sxKFstMSwgLTEsIC0xLCAtMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hc2tTaGFkZXIuc2V0Q29udGVudFNpemUoR0N0cmwud2luU2l6ZSk7XHJcbiAgICB0aGlzLl93YWl0TG9hZFRpbWVzID0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93TWVzc2FnZSh0ZXh0S2V5Pzogc3RyaW5nKSB7XHJcbiAgICBsZXQga2V5ID0gdGV4dEtleSB8fCB0aGlzLl9jb25maWd1cmUubXNna2V5O1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd01hc2soKTtcclxuICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnRhbGtOb2RlLnBvc2l0aW9uID0gY2MudjMoXHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJlLnRhbGtQb3NbMF0sXHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJlLnRhbGtQb3NbMV1cclxuICAgICAgKTtcclxuICAgICAgdGhpcy50ZXh0LnN0cmluZyA9IHRoaXMuX2NvbmZpZ3VyZS5tc2drZXk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkTWFzaygpIHtcclxuICAgIHRoaXMuY2hpcE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd01hc2soKSB7XHJcbiAgICB0aGlzLmNoaXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25NYXNrVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgaWYgKHRoaXMuX2luTW92ZSkgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuX2NvbmZpZ3VyZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICBsZXQgbm9kZVBvcyA9IHRoaXMuY2hpcE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIG5vZGVQb3MueCA8IC10aGlzLmNoaXBOb2RlLndpZHRoIC8gMiB8fFxyXG4gICAgICBub2RlUG9zLnggPiB0aGlzLmNoaXBOb2RlLndpZHRoIC8gMiB8fFxyXG4gICAgICBub2RlUG9zLnkgPCAtdGhpcy5jaGlwTm9kZS5oZWlnaHQgLyAyIHx8XHJcbiAgICAgIG5vZGVQb3MueSA+IHRoaXMuY2hpcE5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuX3RhcmdldCkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdG91Y2hTdGFydCA9IHRydWU7XHJcbiAgICAvLyDlpoLmnpzmmK9TbGlkZXJcclxuICAgIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5TbGlkZSkge1xyXG4gICAgICBsZXQgc2xpZGVyID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICBpZiAoc2xpZGVyKSB7XHJcbiAgICAgICAgc2xpZGVyW1wiX29uVG91Y2hCZWdhblwiXShldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuRHJhZykge1xyXG4gICAgICBsZXQgcEdyYWcgPSB0aGlzLl90YXJnZXQuZ2V0Q29tcG9uZW50KEdEcmFnKTtcclxuICAgICAgaWYgKHBHcmFnKSB7XHJcbiAgICAgICAgcEdyYWdbXCJfb25Ub3VjaFN0YXJ0XCJdKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5MaXN0SXRlbUNsaWNrKSB7XHJcbiAgICAgIGxldCBsaXN0ID0gdGhpcy5fdGFyZ2V0LnBhcmVudC5wYXJlbnQucGFyZW50W1wiX2xpc3RcIl07XHJcbiAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W1wiX2l0ZW1zXCJdW3RoaXMuX2NvbmZpZ3VyZS5saXN0SW5kZXhdO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgdGhpcy5fdG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgbGlzdFtcIm9uVG91Y2hTdGFydFwiXShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbmZpZ3VyZS50eXBlID09IEd1aWRUeXBlLk5vZGVNb3ZlKSB7XHJcbiAgICAgIHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uTWFza1RvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgaWYgKCF0aGlzLl90b3VjaFN0YXJ0KSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuX2NvbmZpZ3VyZSkgcmV0dXJuO1xyXG4gICAgLy8g5aaC5p6c5pivU2xpZGVyXHJcbiAgICBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuU2xpZGUpIHtcclxuICAgICAgbGV0IHNsaWRlciA9IHRoaXMuX3RhcmdldC5nZXRDb21wb25lbnQoY2MuU2xpZGVyKTtcclxuICAgICAgaWYgKHNsaWRlcikge1xyXG4gICAgICAgIHNsaWRlcltcIl9vblRvdWNoTW92ZWRcIl0oZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbmZpZ3VyZS50eXBlID09IEd1aWRUeXBlLkRyYWcpIHtcclxuICAgICAgbGV0IHBHcmFnID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChHRHJhZyk7XHJcbiAgICAgIGlmIChwR3JhZykge1xyXG4gICAgICAgIHBHcmFnW1wiX29uVG91Y2hNb3ZlXCJdKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5MaXN0SXRlbUNsaWNrKSB7XHJcbiAgICAgIGxldCBsaXN0ID0gdGhpcy5fdGFyZ2V0LnBhcmVudC5wYXJlbnQucGFyZW50W1wiX2xpc3RcIl07XHJcbiAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgbGlzdFtcIm9uVG91Y2hNb3ZlXCJdKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5Ob2RlTW92ZSkge1xyXG4gICAgICB0aGlzLl90YXJnZXQgJiYgdGhpcy5fdGFyZ2V0LmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uTWFza1RvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyBpZighdGhpcy5fdGFyZ2V0KSByZXR1cm47XHJcbiAgICBpZiAodGhpcy5fY29uZmlndXJlID09IG51bGwpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5EaWFsb2cpIHtcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3RvdWNoU3RhcnQpIHJldHVybjtcclxuICAgIHRoaXMuX3RvdWNoU3RhcnQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyDlpoLmnpzmmK9TbGlkZXJcclxuICAgIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5TbGlkZSkge1xyXG4gICAgICAvLyBsZXQgc2xpZGVyID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAvLyBpZiAoc2xpZGVyKSB7XHJcbiAgICAgIC8vICAgICBzbGlkZXJbJ19vblRvdWNoRW5kZWQnXShldmVudCk7XHJcbiAgICAgIC8vICAgICBpZiAoc2xpZGVyLnByb2dyZXNzIDwgdGhpcy5fY29uZmlndXJlLnByb2dyZXNzKVxyXG4gICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgLy8gICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuRHJhZykge1xyXG4gICAgICBsZXQgcEdyYWcgPSB0aGlzLl90YXJnZXQuZ2V0Q29tcG9uZW50KEdEcmFnKTtcclxuICAgICAgaWYgKHBHcmFnKSB7XHJcbiAgICAgICAgdGhpcy5vbkdyYWdUb3VjaEVuZChwR3JhZywgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuTGlzdEl0ZW1DbGljaykge1xyXG4gICAgICBsZXQgbGlzdCA9IHRoaXMuX3RhcmdldC5wYXJlbnQucGFyZW50LnBhcmVudFtcIl9saXN0XCJdO1xyXG4gICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgIHRoaXMub25MaXN0Vmlld1RvdWNoRW5kKGxpc3QsIGV2ZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgY2FtcCA9IHRoaXMuX3RhcmdldC5nZXRDb21wb25lbnQodGhpcy5fdGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIGNhbXBbXCJfb25Ub3VjaEVuZFwiXShldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5Ob2RlTW92ZSkge1xyXG4gICAgICB0aGlzLm9uTm9kZU1vdmVFbmQoZXZlbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgbm9kZVBvcyA9IHRoaXMuY2hpcE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIG5vZGVQb3MueCA8IC10aGlzLmNoaXBOb2RlLndpZHRoIC8gMiB8fFxyXG4gICAgICBub2RlUG9zLnggPiB0aGlzLmNoaXBOb2RlLndpZHRoIC8gMiB8fFxyXG4gICAgICBub2RlUG9zLnkgPCAtdGhpcy5jaGlwTm9kZS5oZWlnaHQgLyAyIHx8XHJcbiAgICAgIG5vZGVQb3MueSA+IHRoaXMuY2hpcE5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX3RvdWNoU3RhcnQgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl90YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY2VudGVyUG9zID0gY2MudjIoXHJcbiAgICAgIHRoaXMuX3RhcmdldC53aWR0aCAqICgwLjUgLSB0aGlzLl90YXJnZXQuYW5jaG9yWCksXHJcbiAgICAgIHRoaXMuX3RhcmdldC5oZWlnaHQgKiAoMC41IC0gdGhpcy5fdGFyZ2V0LmFuY2hvclkpXHJcbiAgICApO1xyXG4gICAgbGV0IHdvcmxkUG9zID0gdGhpcy5fdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjZW50ZXJQb3MpO1xyXG4gICAgbGV0IHJlY3QgPSBjYy5yZWN0KFxyXG4gICAgICB3b3JsZFBvcy54IC0gdGhpcy5fdGFyZ2V0LndpZHRoIC8gMixcclxuICAgICAgd29ybGRQb3MueSAtIHRoaXMuX3RhcmdldC5oZWlnaHQgLyAyLFxyXG4gICAgICB0aGlzLl90YXJnZXQud2lkdGgsXHJcbiAgICAgIHRoaXMuX3RhcmdldC5oZWlnaHRcclxuICAgICk7XHJcbiAgICBpZiAoIXJlY3QuY29udGFpbnMoZXZlbnQuZ2V0TG9jYXRpb24oKSkpIHtcclxuICAgICAgdGhpcy5fdG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC50YXJnZXQgPSB0aGlzLl90YXJnZXQ7XHJcbiAgICBsZXQgdG9nZ2xlID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChjYy5Ub2dnbGUpO1xyXG4gICAgaWYgKHRvZ2dsZSkge1xyXG4gICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdCh0b2dnbGUuY2xpY2tBdWRpbyB8fCBjYy5CdXR0b24uY29tQXVkaW8pO1xyXG4gICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModG9nZ2xlLmNoZWNrRXZlbnRzLCB0b2dnbGUpO1xyXG4gICAgICB0b2dnbGUuY2hlY2soKTtcclxuICAgICAgdGhpcy5fdGFyZ2V0ICYmIHRoaXMuX3RhcmdldC5lbWl0KFwidG9nZ2xlXCIsIHRvZ2dsZSk7XHJcbiAgICAgIHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuZW1pdChcImNsaWNrXCIsIHRvZ2dsZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbG9uZ1RvdWNoID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChHTG9uZ1RvdWNoKTtcclxuICAgIGlmIChsb25nVG91Y2gpIHtcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgIEF1ZGlvTWdyLklucygpLnBsYXlFZmZlY3QoY2MuQnV0dG9uLmNvbUF1ZGlvKTtcclxuICAgICAgbG9uZ1RvdWNoW1wiZW1pdExvbmdUb3VjaEV2ZW50XCJdKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYnRuID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgaWYgKGJ0biAmJiBidG4uZW5hYmxlZCAmJiBidG4uaW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KGJ0bi5jbGlja0F1ZGlvIHx8IGNjLkJ1dHRvbi5jb21BdWRpbyk7XHJcbiAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhidG4uY2xpY2tFdmVudHMsIGV2ZW50KTtcclxuICAgICAgdGhpcy5fdGFyZ2V0ICYmIHRoaXMuX3RhcmdldC5lbWl0KFwiY2xpY2tcIiwgdGhpcyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBjb3VzdG9tQnRuID0gdGhpcy5fdGFyZ2V0LmdldENvbXBvbmVudChJcnJlZ3VsYXJUcmlnZ2VyKTtcclxuICAgIGlmIChjb3VzdG9tQnRuKSB7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KGNjLkJ1dHRvbi5jb21BdWRpbyk7XHJcbiAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhjb3VzdG9tQnRuLmV2ZW50cywgZXZlbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuQ2xpY2spIHtcclxuICAgICAgdGhpcy5fdGFyZ2V0ICYmIHRoaXMuX3RhcmdldC5lbWl0KGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZXZlbnQpO1xyXG4gICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbk1hc2tUb3VjaENhbmNlbChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgdGhpcy5fdG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuX2NvbmZpZ3VyZSA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZ3VyZS50eXBlID09IEd1aWRUeXBlLlNsaWRlKSB7XHJcbiAgICAgIGxldCBzbGlkZXIgPSB0aGlzLl90YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcik7XHJcbiAgICAgIGlmIChzbGlkZXIpIHtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5EcmFnKSB7XHJcbiAgICAgIGxldCBwR3JhZyA9IHRoaXMuX3RhcmdldC5nZXRDb21wb25lbnQoR0RyYWcpO1xyXG4gICAgICBpZiAocEdyYWcpIHtcclxuICAgICAgICB0aGlzLm9uR3JhZ1RvdWNoRW5kKHBHcmFnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5MaXN0SXRlbUNsaWNrKSB7XHJcbiAgICAgIGxldCBsaXN0ID0gdGhpcy5fdGFyZ2V0LnBhcmVudC5wYXJlbnQucGFyZW50W1wiX2xpc3RcIl07XHJcbiAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5vbkxpc3RWaWV3VG91Y2hFbmQobGlzdCwgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlndXJlLnR5cGUgPT0gR3VpZFR5cGUuTm9kZU1vdmUpIHtcclxuICAgICAgdGhpcy5vbk5vZGVNb3ZlRW5kKGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkdyYWdUb3VjaEVuZChwR0RyYWdOb2RlOiBHRHJhZywgZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIGxldCBpc05leHQgPSBmYWxzZTtcclxuICAgIGlmIChwR0RyYWdOb2RlW1wiX3RvdWNoTW92ZVwiXSkge1xyXG4gICAgICBsZXQgbGFzdFRhcmdldCA9IHBHRHJhZ05vZGVbXCJfbGFzdFRhcmdldE5vZGVcIl0sXHJcbiAgICAgICAgc2VsZWN0RHJhZ05vZGUgPSBwR0RyYWdOb2RlW1wiX2N1clNlbGVjdERyYWdOb2RlXCJdO1xyXG4gICAgICBsZXQgaW5kZXhPZlRhcmdldCA9IHBHRHJhZ05vZGUudGFyZ2V0Tm9kZXMuaW5kZXhPZihsYXN0VGFyZ2V0KTtcclxuICAgICAgbGV0IGluZGV4b2ZEcmFnID0gcEdEcmFnTm9kZS5kcmFnTm9kZXMuaW5kZXhPZihzZWxlY3REcmFnTm9kZSk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBpbmRleG9mRHJhZyA9PSB0aGlzLl9jb25maWd1cmUuZHJhZ3NbMF0gJiZcclxuICAgICAgICBpbmRleE9mVGFyZ2V0ID09IHRoaXMuX2NvbmZpZ3VyZS5kcmFnc1sxXVxyXG4gICAgICApIHtcclxuICAgICAgICBpc05leHQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNOZXh0KSB7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICBwR0RyYWdOb2RlW1wiX29uVG91Y2hFbmRcIl0oZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcEdEcmFnTm9kZVtcInJlc2V0VG91Y2hFdmVudFwiXSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uTGlzdFZpZXdUb3VjaEVuZChcclxuICAgIHBMaXN0VmlldzogR0xpc3RWaWV3LFxyXG4gICAgZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2hcclxuICApIHtcclxuICAgIGxldCBpc05leHQgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLl9jb25maWd1cmUudHlwZSA9PSBHdWlkVHlwZS5MaXN0SXRlbUNsaWNrKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwTGlzdFZpZXdbXCJfY2hpbGRMb25nVG91Y2hUaW1lc1wiXSA+IDAgfHxcclxuICAgICAgICAhcExpc3RWaWV3W1wiX2lzVG91Y2hQcmVzc1wiXSB8fFxyXG4gICAgICAgICFwTGlzdFZpZXdbXCJfdG91Y2hDaGlsZE5vZGVcIl1cclxuICAgICAgKSB7XHJcbiAgICAgICAgaXNOZXh0ID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoXHJcbiAgICAgICAgICBwTGlzdFZpZXdbXCJfdG91Y2hDaGlsZE5vZGVcIl0ubmFtZS5yZXBsYWNlKFwiaXRlbV9cIiwgXCJcIilcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSB0aGlzLl9jb25maWd1cmUubGlzdEluZGV4KSB7XHJcbiAgICAgICAgICBpc05leHQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXNOZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgIEF1ZGlvTWdyLklucygpLnBsYXlFZmZlY3QoY2MuQnV0dG9uLmNvbUF1ZGlvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNOZXh0KSB7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICBwTGlzdFZpZXdbXCJvblRvdWNFbmRcIl0oZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcExpc3RWaWV3W1wiY2FuY2VsVG91Y2hFdmVudFwiXSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uTm9kZU1vdmVFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGV2ZW50KTtcclxuICAgIGxldCBwb3MgPSB0aGlzLl90YXJnZXQucG9zaXRpb247XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucG9zQ29tcGFyZShcclxuICAgICAgICB0aGlzLl9jb25maWd1cmUuZHJhZ3NbMF0sXHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJlLmRyYWdzWzFdLFxyXG4gICAgICAgIHBvcy54XHJcbiAgICAgICkgJiZcclxuICAgICAgdGhpcy5wb3NDb21wYXJlKHRoaXMuX2NvbmZpZ3VyZS5kcmFnc1syXSwgdGhpcy5fY29uZmlndXJlLmRyYWdzWzNdLCBwb3MueSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwb3NDb21wYXJlKGZsYWc6IHN0cmluZywgYWlyOiBudW1iZXIsIGN1cjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWZsYWcgfHwgZmxhZyA9PSBcIm51bGxcIikgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoZmxhZyA9PSBcIj5cIikge1xyXG4gICAgICByZXR1cm4gY3VyID49IGFpcjtcclxuICAgIH0gZWxzZSBpZiAoZmxhZyA9PSBcIjxcIikge1xyXG4gICAgICByZXR1cm4gY3VyIDw9IGFpcjtcclxuICAgIH0gZWxzZSBpZiAoZmxhZykge1xyXG4gICAgICBsZXQgcmFuZ2UgPSBOdW1iZXIoZmxhZyk7XHJcbiAgICAgIHJldHVybiBNYXRoLmFicyhhaXIgLSBjdXIpIDwgcmFuZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmV4dCgpIHtcclxuICAgIHRoaXMuX3RhcmdldCA9IG51bGw7XHJcbiAgICBsZXQgdGltZSA9IHRoaXMuX2NvbmZpZ3VyZS50aW1lO1xyXG4gICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2NvbmZpZ3VyZSA9IG51bGw7XHJcbiAgICB0aGlzLl93YWl0TG9hZFRpbWVzID0gSU5WQUxJRF9WQUxVRTtcclxuICAgIGlmICh0aGlzLl9oYW5kU2spIHtcclxuICAgICAgdGhpcy5faGFuZFNrLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9oYW5kU2sgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2ppYW50b3VOb2RlKSB7XHJcbiAgICAgIHRoaXMuX2ppYW50b3VOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5famlhbnRvdU5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faGFuZGxlck1vdmVFbmQgPSBmYWxzZTtcclxuICAgIC8vIHRoaXMubWFza1NoYWRlci5yZVNldE1hc2syKFstMSwgLTEsIC0xLCAtMV0pO1xyXG4gICAgLy8gdGhpcy5tYXNrU2hhZGVyLnJlU2V0TWFzazEoWy0xLCAtMSwgLTEsIC0xXSk7XHJcbiAgICB0aGlzLmhpZE1hc2soKTtcclxuXHJcbiAgICBpZiAodGhpcy5uZXh0Q2FsbEJhY2spIHtcclxuICAgICAgdGhpcy5uZXh0Q2FsbEJhY2sodGltZSA/IHRpbWUgOiAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aGlzLl9jb25maWd1cmUpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl93YWl0TG9hZFRpbWVzID4gSU5WQUxJRF9WQUxVRSkge1xyXG4gICAgICBpZiAoR0Fzc2V0SW1wbC5pc0xvYWRpbmcoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl93YWl0TG9hZFRpbWVzKys7XHJcbiAgICAgIGlmICh0aGlzLl93YWl0TG9hZFRpbWVzICE9IFdBSVRfTE9BRF9USU1FUykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl93YWl0TG9hZFRpbWVzID0gSU5WQUxJRF9WQUxVRTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5fY29uZmlndXJlLnBhdGggfHwgdGhpcy5fY29uZmlndXJlLnBhdGggPT0gXCJudWxsXCIpIHtcclxuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fY29uZmlndXJlLnBhdGggfHwgdGhpcy5fY29uZmlndXJlLnBhdGggPT0gXCJudWxsXCIpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgdGhpcy5zZXRUYXJnZXQodGhpcy5fdGFyZ2V0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IG5vZGUgPSBjYy5maW5kKHRoaXMuX2NvbmZpZ3VyZS5wYXRoKTtcclxuICAgIGlmICghbm9kZSB8fCAhbm9kZS5hY3RpdmUpIHJldHVybjsgLy8g5aaC5p6c6IqC54K55bGe5LqO6ZqQ6JeP54q25oCB77yM6K6k5Li65om+5LiN5Yiw6IqC54K5XHJcbiAgICB0aGlzLnNob3dNYXNrKCk7XHJcbiAgICB0aGlzLnNldFRhcmdldChub2RlKTtcclxuICAgIHRoaXMuc2hvd01lc3NhZ2UoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjdGVhdGVUZXh0dXJlTm9kZSgpIHtcclxuICAgIGxldCB0ZXh0dXJlTm9kZSA9IG5ldyBjYy5Ob2RlKFwidGV4dXR1cmVfbm9kZVwiKTtcclxuICAgIGxldCBzcE5vZGUxID0gbmV3IGNjLk5vZGUoXCJqaWFudG91XCIpO1xyXG4gICAgc3BOb2RlMS55ID0gNDEuOTtcclxuICAgIHNwTm9kZTEuYW5nbGUgPSAtMTgwO1xyXG4gICAgbGV0IHNwTm9kZTIgPSBuZXcgY2MuTm9kZShcIndlbnppXCIpO1xyXG4gICAgc3BOb2RlMi55ID0gODMuMjtcclxuICAgIGxldCBzcDEgPSBzcE5vZGUxLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgdGhpcy5hc3NldEltcGwuc3ByaXRlRnJhbWUoc3AxLCBcIlZpZXdzL0d1aWRlLzVcIik7XHJcbiAgICBzcE5vZGUyLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgc3BOb2RlMS5wYXJlbnQgPSB0ZXh0dXJlTm9kZTtcclxuICAgIHNwTm9kZTIucGFyZW50ID0gdGV4dHVyZU5vZGU7XHJcbiAgICB0ZXh0dXJlTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VGV4dHVyZShwYXRoOiBzdHJpbmcpIHtcclxuICAgIC8vIHRoaXMudGV4dHVyZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIC8vIGxldCBzcCA9IHRoaXMudGV4dHVyZU5vZGUuZ2V0Q2hpbGRDb21CeU5hbWUoJ3dlbnppJywgY2MuU3ByaXRlKVxyXG4gICAgLy8gR0xvYWRlci5zcHJpdGVGcmFtZShzcCwgcGF0aCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGxheUNsaWNrQW5pbWF0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLl9oYW5kU2spIHtcclxuICAgICAgbGV0IGhhbmROb2RlID0gbmV3IGNjLk5vZGUoXCJoYW5kXCIpO1xyXG4gICAgICBoYW5kTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgIHRoaXMuX2hhbmRTayA9IGhhbmROb2RlLmFkZENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faGFuZFNrLnByZW11bHRpcGxpZWRBbHBoYSA9IHRydWU7XHJcbiAgICB0aGlzLmFzc2V0SW1wbC5kcmFnb25Cb25lcyhcclxuICAgICAgUmVzLmNvbW1vbi5ndWlkZSxcclxuICAgICAgKFxyXG4gICAgICAgIGRyYWdvbkFzc2V0OiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0LFxyXG4gICAgICAgIGRyYWdvbkF0bGFzOiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXRcclxuICAgICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMuX2hhbmRTaykpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9oYW5kU2suZHJhZ29uQXNzZXQgPSBkcmFnb25Bc3NldDtcclxuICAgICAgICB0aGlzLl9oYW5kU2suZHJhZ29uQXRsYXNBc3NldCA9IGRyYWdvbkF0bGFzO1xyXG4gICAgICAgIHRoaXMuX2hhbmRTay5hcm1hdHVyZU5hbWUgPSBcIkFybWF0dXJlXCI7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlck1vdmVFbmQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2hhbmRTay5ub2RlLnNjYWxlID0gMC44O1xyXG4gICAgICAgIEdDdHJsLnBsYXlEcmFnb25BbmkodGhpcy5faGFuZFNrLCBcImRpYW5qaVwiLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwbGF5TW92ZUFuaW1hdGlvbihzdGFydFBvczogY2MuVmVjMiwgZW5kUG9zOiBjYy5WZWMyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2hhbmRTaykge1xyXG4gICAgICBsZXQgaGFuZE5vZGUgPSBuZXcgY2MuTm9kZShcImhhbmRcIik7XHJcbiAgICAgIGhhbmROb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgaGFuZE5vZGUuekluZGV4ID0gMTA7XHJcbiAgICAgIHRoaXMuX2hhbmRTayA9IGhhbmROb2RlLmFkZENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xyXG4gICAgICB0aGlzLl9oYW5kU2sucHJlbXVsdGlwbGllZEFscGhhID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hc3NldEltcGwuZHJhZ29uQm9uZXMoXHJcbiAgICAgICAgUmVzLmNvbW1vbi5ndWlkZSxcclxuICAgICAgICAoXHJcbiAgICAgICAgICBkcmFnb25Bc3NldDogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldCxcclxuICAgICAgICAgIGRyYWdvbkF0bGFzOiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXRcclxuICAgICAgICApID0+IHtcclxuICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl9oYW5kU2spKSByZXR1cm47XHJcbiAgICAgICAgICB0aGlzLl9oYW5kU2suZHJhZ29uQXNzZXQgPSBkcmFnb25Bc3NldDtcclxuICAgICAgICAgIHRoaXMuX2hhbmRTay5kcmFnb25BdGxhc0Fzc2V0ID0gZHJhZ29uQXRsYXM7XHJcbiAgICAgICAgICB0aGlzLl9oYW5kU2suYXJtYXR1cmVOYW1lID0gXCJBcm1hdHVyZVwiO1xyXG4gICAgICAgICAgdGhpcy5faGFuZGxlck1vdmVFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgR0N0cmwucGxheURyYWdvbkFuaSh0aGlzLl9oYW5kU2ssIFwiY2hhbmdhblwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIC8vIGxldCBzcHJpdGUgPSBVSUNyZWF0ZS5hbHRzU3ByaXRlKHsgcGF0aDogUmVzLnRleHR1cmUuY29tbW9uLCBhcGw6IHRoaXMuYXNzZXRJbXBsLCBzdWI6IFwiamlhbnRvdVwiIH0pO1xyXG4gICAgICAvLyBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAvLyAvLyBzcHJpdGUubm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAvLyB0aGlzLl9qaWFudG91Tm9kZSA9IHNwcml0ZS5ub2RlO1xyXG4gICAgICAvLyB0aGlzLl9qaWFudG91Tm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgIC8vIHRoaXMuX2ppYW50b3VOb2RlLmhlaWdodCA9IDUyO1xyXG4gICAgICAvLyB0aGlzLl9qaWFudG91Tm9kZS5hbmNob3JYID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX2hhbmRTay5kcmFnb25BdGxhc0Fzc2V0IHx8ICF0aGlzLl9oYW5kU2suZHJhZ29uQXNzZXQpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5faGFuZGxlck1vdmVFbmQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9oYW5kbGVyTW92ZUVuZCA9IGZhbHNlO1xyXG4gICAgY2MuZGlyZWN0b3JcclxuICAgICAgLmdldEFjdGlvbk1hbmFnZXIoKVxyXG4gICAgICAucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcy5faGFuZFNrLm5vZGUsIHRydWUpO1xyXG4gICAgY2MuZGlyZWN0b3JcclxuICAgICAgLmdldEFjdGlvbk1hbmFnZXIoKVxyXG4gICAgICAucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcy5famlhbnRvdU5vZGUsIHRydWUpO1xyXG4gICAgdGhpcy5faGFuZFNrLm5vZGUucG9zaXRpb24gPSBjYy52MyhzdGFydFBvcy54LCBzdGFydFBvcy55KTtcclxuICAgIGxldCBhbmdsZSA9IE1hdGhFeC5nZXRBbmdsZVgoc3RhcnRQb3MsIGVuZFBvcyk7XHJcbiAgICB0aGlzLl9qaWFudG91Tm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgdGhpcy5famlhbnRvdU5vZGUucG9zaXRpb24gPSBjYy52MyhzdGFydFBvcy54LCBzdGFydFBvcy55KTtcclxuICAgIHRoaXMuX2ppYW50b3VOb2RlLndpZHRoID0gMDtcclxuXHJcbiAgICBjYy50d2Vlbih0aGlzLl9oYW5kU2subm9kZSlcclxuICAgICAgLnRvKDEsIHsgcG9zaXRpb246IGNjLnYzKGVuZFBvcy54LCBlbmRQb3MueSkgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXHJcbiAgICAgIC5kZWxheSgwLjI1KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlck1vdmVFbmQgPSB0cnVlO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICAgIGNjLnR3ZWVuKHRoaXMuX2ppYW50b3VOb2RlKVxyXG4gICAgICAudG8oMSwgeyB3aWR0aDogc3RhcnRQb3Muc3ViKGVuZFBvcykubWFnKCkgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxufVxyXG4iXX0=