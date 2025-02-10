
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Shaders/SLTransitions.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvU2hhZGVycy9TTFRyYW5zaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCxtREFBcUQ7QUFDckQsa0RBQWlEO0FBQ2pELG9EQUFzRDtBQUVoRCxJQUFBLEtBQ0osRUFBRSxDQUFDLFVBQVUsRUFEUCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQUEsRUFBRSxJQUFJLFVBQ3JELENBQUM7QUFHaEI7SUFBMkMsaUNBQVU7SUFBckQ7UUFBQSxxRUFxSkM7UUFwSndCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQy9CLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDcEMsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFFckMsV0FBVztRQUNELGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUMzQyxjQUFjO1FBQ0osYUFBTyxHQUFZLEtBQUssQ0FBQztRQUNuQyxZQUFZO1FBQ0YsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFDN0MsWUFBWTtRQUNGLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQzdDLFdBQVc7UUFDRCxhQUFPLEdBQWMsSUFBSSxDQUFDO1FBQ3BDLGtCQUFrQjtRQUNSLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDNUIsZ0JBQWdCO1FBQ04sZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDdEMsZUFBZTtRQUNMLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLHVCQUFpQixHQUFRLElBQUksQ0FBQzs7SUE4SDFDLENBQUM7SUE3SFEsK0NBQXVCLEdBQTlCLFVBQStCLEVBQU87UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FB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LENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDekU7SUFDSCxDQUFDO0lBbkpzQjtRQUF0QixRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzttREFBOEI7SUFDL0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQTBCO0lBQzNCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUE0QjtJQUNwQztRQUFULFFBQVE7eURBQTRCO0lBSmxCLGFBQWE7UUFGakMsT0FBTztRQUNQLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztPQUNULGFBQWEsQ0FxSmpDO0lBQUQsb0JBQUM7Q0FySkQsQUFxSkMsQ0FySjBDLG9CQUFVLEdBcUpwRDtrQkFySm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR0NvbXBvbmVudCBmcm9tIFwiLi4vQ29yZS9GcmFtZUV4L0dDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR0Fzc2V0SW1wbCB9IGZyb20gXCIuLi9Db3JlL0dMb2FkZXIvR0xvYWRlclwiO1xyXG5pbXBvcnQgeyBKWENvbG9yIH0gZnJvbSBcIi4uL0dhbWUvQ29tbW9uL0pYQ29sb3JcIjtcclxuaW1wb3J0IHsgZGVsYXlBY3Rpb24gfSBmcm9tIFwiLi4vR2FtZS9Db21tb24vVUlBY3Rpb25cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQsIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPVxyXG4gIGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiU2hhZGVycy9TTFRyYW5zaXRpb25zXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNMVHJhbnNpdGlvbnMgZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoY2MuTWF0ZXJpYWwpIG1hdGVyaWFsOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSkgc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSB0YXJnZXROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkgdHJhbnNpdGlvblRpbWU6IG51bWJlciA9IDE7XHJcblxyXG4gIC8qKiDmnZDotKjlrp7kvosgKi9cclxuICBwcm90ZWN0ZWQgX2luc01hdGVyaWFsOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcbiAgLyoqIOWIneWni+WMlueKtuaAgeagh+ivhiAqL1xyXG4gIHByb3RlY3RlZCBfaW5pdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqIOWIh+aNouWJjee6ueeQhiAqL1xyXG4gIHByb3RlY3RlZCBfdGV4dHVyZTE6IGNjLlJlbmRlclRleHR1cmUgPSBudWxsO1xyXG4gIC8qKiDliIfmjaLlkI7nurnnkIYgKi9cclxuICBwcm90ZWN0ZWQgX3RleHR1cmUyOiBjYy5SZW5kZXJUZXh0dXJlID0gbnVsbDtcclxuICAvKiog57q555CG55u45py6ICovXHJcbiAgcHJvdGVjdGVkIF9jYW1lcmE6IGNjLkNhbWVyYSA9IG51bGw7XHJcbiAgLyoqIHNoYWRlciDml7bpl7Tov5vluqYgKi9cclxuICBwcm90ZWN0ZWQgX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgLyoqIOaYr+WQpuWKqOaAgeaViOaenOWxleekuuS4rSAqL1xyXG4gIHByb3RlY3RlZCBfaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqIOetieW+hei1hOa6kOWKoOi9veWujOaIkCAqL1xyXG4gIHByb3RlY3RlZCBfaXNTdGFydEZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJvdGVjdGVkIF9maW5pc2hlZENhbGxCYWNrOiBhbnkgPSBudWxsO1xyXG4gIHB1YmxpYyBzZXRPbmNlRmluaXNoZWRDYWxsYmFjayhjYjogYW55KSB7XHJcbiAgICB0aGlzLl9maW5pc2hlZENhbGxCYWNrID0gY2I7XHJcbiAgfVxyXG5cclxuICBfX29uTG9hZCgpIHtcclxuICAgIHRoaXMuX2luaXQoKTtcclxuICB9XHJcblxyXG4gIF9fb25EZXN0cm95KCkge1xyXG4gICAgaWYgKGNjLmlzVmFsaWQodGhpcy5fY2FtZXJhKSkgdGhpcy5fY2FtZXJhLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgaWYgKGNjLmlzVmFsaWQodGhpcy5zcHJpdGUpKSB0aGlzLnNwcml0ZS5ub2RlLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKiDliJ3lp4vljJYgKi9cclxuICBwcm90ZWN0ZWQgX2luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5faW5pdGVkKSByZXR1cm47XHJcbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlMSkgdGhpcy5fdGV4dHVyZTEgPSB0aGlzLl9jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUyKSB0aGlzLl90ZXh0dXJlMiA9IHRoaXMuX2NyZWF0ZVRleHR1cmUoKTtcclxuICAgIGlmICghdGhpcy5fY2FtZXJhKSB7XHJcbiAgICAgIGxldCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoXCJUUkFOU0lUSU9OX0NBTUVSQVwiKTtcclxuICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhTm9kZS5hZGRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgdGhpcy5fY2FtZXJhLmJhY2tncm91bmRDb2xvciA9IEpYQ29sb3IuQzAwMDAwMDtcclxuICAgICAgY2FtZXJhTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jYW1lcmEuY3VsbGluZ01hc2sgPSBjYy5DYW1lcmEubWFpbi5jdWxsaW5nTWFzaztcclxuXHJcbiAgICBpZiAodGhpcy5zcHJpdGUpIHtcclxuICAgICAgdGhpcy51cGRhdGVTcHJpdGVNYXRlcmlhbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVNwcml0ZU1hdGVyaWFsKCkge1xyXG4gICAgaWYgKCF0aGlzLnNwcml0ZSkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLm1hdGVyaWFsKSByZXR1cm47XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLl9pbnNNYXRlcmlhbCB8fFxyXG4gICAgICB0aGlzLm1hdGVyaWFsW1wiX2VmZmVjdFwiXVtcIl9uYW1lXCJdICE9IHRoaXMuX2luc01hdGVyaWFsW1wiX2VmZmVjdFwiXVtcIl9uYW1lXCJdXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5faW5zTWF0ZXJpYWwgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKHRoaXMubWF0ZXJpYWwsIHRoaXMuc3ByaXRlKTtcclxuICAgICAgdGhpcy5zcHJpdGUuc2V0TWF0ZXJpYWwoMCwgdGhpcy5faW5zTWF0ZXJpYWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faW5zTWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJ0ZXh0dXJlMlwiLCB0aGlzLl90ZXh0dXJlMik7XHJcbiAgICB0aGlzLl9pbnNNYXRlcmlhbC5zZXRQcm9wZXJ0eShcclxuICAgICAgXCJyYXRpb1wiLFxyXG4gICAgICB0aGlzLl90ZXh0dXJlMi53aWR0aCAvIHRoaXMuX3RleHR1cmUyLmhlaWdodFxyXG4gICAgKTtcclxuICAgIHRoaXMuX2luc01hdGVyaWFsLnNldFByb3BlcnR5KFxyXG4gICAgICBcInNjcmVlblNpemVcIixcclxuICAgICAgY2MudjIodGhpcy5fdGV4dHVyZTIud2lkdGgsIHRoaXMuX3RleHR1cmUyLmhlaWdodClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2NyZWF0ZVRleHR1cmUoKSB7XHJcbiAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZShcclxuICAgICAgY2MudmlzaWJsZVJlY3Qud2lkdGgsXHJcbiAgICAgIGNjLnZpc2libGVSZWN0LmhlaWdodCxcclxuICAgICAgY2NbXCJnZnhcIl0uUkJfRk1UX0QyNFM4XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJlcGFyZVRyYW5zaXRpb25zKCkge1xyXG4gICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5zcHJpdGUpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5faW5zTWF0ZXJpYWwpIHtcclxuICAgICAgdGhpcy51cGRhdGVTcHJpdGVNYXRlcmlhbCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnRhcmdldE5vZGUpIHJldHVybjtcclxuICAgIHRoaXMuX2NhbWVyYS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuX2NhbWVyYS50YXJnZXRUZXh0dXJlID0gdGhpcy5fdGV4dHVyZTE7XHJcbiAgICB0aGlzLl9jYW1lcmEucmVuZGVyKHRoaXMudGFyZ2V0Tm9kZSk7XHJcbiAgICBsZXQgc3BGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0aGlzLl90ZXh0dXJlMSk7XHJcbiAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwRnJhbWU7XHJcbiAgICB0aGlzLl9jYW1lcmEudGFyZ2V0VGV4dHVyZSA9IG51bGw7XHJcbiAgICB0aGlzLl9pbnNNYXRlcmlhbC5zZXRQcm9wZXJ0eShcInRpbWVcIiwgMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnRUcmFuc2l0aW9ucygpIHtcclxuICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMudGFyZ2V0Tm9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKEdBc3NldEltcGwuaXNMb2FkaW5nKCkpIHtcclxuICAgICAgdGhpcy5faXNTdGFydEZsYWcgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlclRleHVyZTIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW5kZXJUZXh1cmUyKCkge1xyXG4gICAgZGVsYXlBY3Rpb24odGhpcy5fY2FtZXJhLm5vZGUsIDAuMDEsICgpID0+IHtcclxuICAgICAgdGhpcy5fY2FtZXJhLnRhcmdldFRleHR1cmUgPSB0aGlzLl90ZXh0dXJlMjtcclxuICAgICAgdGhpcy5fY2FtZXJhLnJlbmRlcih0aGlzLnRhcmdldE5vZGUpO1xyXG4gICAgICB0aGlzLl9jYW1lcmEudGFyZ2V0VGV4dHVyZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2lzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3RpbWUgPSAwO1xyXG4gICAgICB0aGlzLl9pbnNNYXRlcmlhbC5zZXRQcm9wZXJ0eShcInRpbWVcIiwgMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUoZHQpIHtcclxuICAgIGlmICh0aGlzLl9pc1N0YXJ0RmxhZykge1xyXG4gICAgICBpZiAoR0Fzc2V0SW1wbC5pc0xvYWRpbmcoKSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLl9pc1N0YXJ0RmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJlbmRlclRleHVyZTIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2lzTG9hZGluZykge1xyXG4gICAgICB0aGlzLl90aW1lICs9IGR0O1xyXG4gICAgICBpZiAodGhpcy5fdGltZSA+PSB0aGlzLnRyYW5zaXRpb25UaW1lKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMudHJhbnNpdGlvblRpbWU7XHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYS50YXJnZXRUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jYW1lcmEuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9maW5pc2hlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICB0aGlzLl9maW5pc2hlZENhbGxCYWNrKCk7XHJcbiAgICAgICAgICB0aGlzLl9maW5pc2hlZENhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5faW5zTWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJ0aW1lXCIsIHRoaXMuX3RpbWUgLyB0aGlzLnRyYW5zaXRpb25UaW1lKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19