"use strict";
cc._RF.push(module, 'f86a2HyyIZPGbQvU5CvCVmO', 'SLTransitions');
// Script/Shaders/SLTransitions.ts

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
var GComponent_1 = require("../Core/FrameEx/GComponent");
var GLoader_1 = require("../Core/GLoader/GLoader");
var JXColor_1 = require("../Game/Common/JXColor");
var UIAction_1 = require("../Game/Common/UIAction");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var SLTransitions = /** @class */ (function (_super) {
    __extends(SLTransitions, _super);
    function SLTransitions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.material = null;
        _this.sprite = null;
        _this.targetNode = null;
        _this.transitionTime = 1;
        /** 材质实例 */
        _this._insMaterial = null;
        /** 初始化状态标识 */
        _this._inited = false;
        /** 切换前纹理 */
        _this._texture1 = null;
        /** 切换后纹理 */
        _this._texture2 = null;
        /** 纹理相机 */
        _this._camera = null;
        /** shader 时间进度 */
        _this._time = 0;
        /** 是否动态效果展示中 */
        _this._isLoading = false;
        /** 等待资源加载完成 */
        _this._isStartFlag = false;
        _this._finishedCallBack = null;
        return _this;
    }
    SLTransitions.prototype.setOnceFinishedCallback = function (cb) {
        this._finishedCallBack = cb;
    };
    SLTransitions.prototype.__onLoad = function () {
        this._init();
    };
    SLTransitions.prototype.__onDestroy = function () {
        if (cc.isValid(this._camera))
            this._camera.node.destroy();
        if (cc.isValid(this.sprite))
            this.sprite.node.destroy();
    };
    /** 初始化 */
    SLTransitions.prototype._init = function () {
        if (this._inited)
            return;
        this._inited = true;
        if (!this._texture1)
            this._texture1 = this._createTexture();
        if (!this._texture2)
            this._texture2 = this._createTexture();
        if (!this._camera) {
            var cameraNode = new cc.Node("TRANSITION_CAMERA");
            this._camera = cameraNode.addComponent(cc.Camera);
            this._camera.backgroundColor = JXColor_1.JXColor.C000000;
            cameraNode.parent = this.node;
        }
        this._camera.cullingMask = cc.Camera.main.cullingMask;
        if (this.sprite) {
            this.updateSpriteMaterial();
        }
    };
    SLTransitions.prototype.updateSpriteMaterial = function () {
        if (!this.sprite)
            return;
        if (!this.material)
            return;
        if (!this._insMaterial ||
            this.material["_effect"]["_name"] != this._insMaterial["_effect"]["_name"]) {
            this._insMaterial = cc.MaterialVariant.create(this.material, this.sprite);
            this.sprite.setMaterial(0, this._insMaterial);
        }
        this._insMaterial.setProperty("texture2", this._texture2);
        this._insMaterial.setProperty("ratio", this._texture2.width / this._texture2.height);
        this._insMaterial.setProperty("screenSize", cc.v2(this._texture2.width, this._texture2.height));
    };
    SLTransitions.prototype._createTexture = function () {
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc["gfx"].RB_FMT_D24S8);
        return texture;
    };
    SLTransitions.prototype.prepareTransitions = function () {
        if (!this._inited)
            return;
        if (!this.sprite)
            return;
        if (!this._insMaterial) {
            this.updateSpriteMaterial();
        }
        if (!this.targetNode)
            return;
        this._camera.enabled = true;
        this._camera.targetTexture = this._texture1;
        this._camera.render(this.targetNode);
        var spFrame = new cc.SpriteFrame(this._texture1);
        this.sprite.spriteFrame = spFrame;
        this._camera.targetTexture = null;
        this._insMaterial.setProperty("time", 0);
    };
    SLTransitions.prototype.startTransitions = function () {
        if (!this._inited)
            return;
        if (!this.sprite)
            return;
        if (!this.targetNode)
            return;
        if (GLoader_1.GAssetImpl.isLoading()) {
            this._isStartFlag = true;
            return;
        }
        else {
            this.renderTexure2();
        }
    };
    SLTransitions.prototype.renderTexure2 = function () {
        var _this = this;
        UIAction_1.delayAction(this._camera.node, 0.01, function () {
            _this._camera.targetTexture = _this._texture2;
            _this._camera.render(_this.targetNode);
            _this._camera.targetTexture = null;
            _this._isLoading = true;
            _this._time = 0;
            _this._insMaterial.setProperty("time", 0);
        });
    };
    SLTransitions.prototype.update = function (dt) {
        if (this._isStartFlag) {
            if (GLoader_1.GAssetImpl.isLoading())
                return;
            this._isStartFlag = false;
            this.renderTexure2();
            return;
        }
        if (this._isLoading) {
            this._time += dt;
            if (this._time >= this.transitionTime) {
                this._time = this.transitionTime;
                this._isLoading = false;
                this.sprite.spriteFrame = null;
                this._camera.targetTexture = null;
                this._camera.enabled = false;
                if (this._finishedCallBack) {
                    this._finishedCallBack();
                    this._finishedCallBack = null;
                }
            }
            this._insMaterial.setProperty("time", this._time / this.transitionTime);
        }
    };
    __decorate([
        property(cc.Material)
    ], SLTransitions.prototype, "material", void 0);
    __decorate([
        property(cc.Sprite)
    ], SLTransitions.prototype, "sprite", void 0);
    __decorate([
        property(cc.Node)
    ], SLTransitions.prototype, "targetNode", void 0);
    __decorate([
        property
    ], SLTransitions.prototype, "transitionTime", void 0);
    SLTransitions = __decorate([
        ccclass,
        menu("Shaders/SLTransitions")
    ], SLTransitions);
    return SLTransitions;
}(GComponent_1.default));
exports.default = SLTransitions;

cc._RF.pop();