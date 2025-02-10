"use strict";
cc._RF.push(module, 'e0835f9ka9IH5Jo0pQ1MI93', 'CCEx');
// Script/Core/FrameEx/CCEx.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.UN_PRIERCE_SCROLLVIEW_TOUCHEVENT = exports.PIERCE_SCROLLVIEW_TOUCHEVENT = void 0;
var AudioMgr_1 = require("../Manager/AudioMgr");
/**
 * over write cc.Node addChild.
 */
cc.Component.prototype.forcibleRender = function (renderFunc) {
    var oldEnabled = this._enabled;
    var oldActiveInHierarchy = this.node._activeInHierarchy;
    if (!oldEnabled)
        this._enabled = true;
    if (!oldActiveInHierarchy)
        this.node._activeInHierarchy = true;
    renderFunc();
    this._enabled = oldEnabled;
    this.node._activeInHierarchy = oldActiveInHierarchy;
};
cc.Node.prototype.getChildComByName = function (name, type) {
    var pNode = this.getChildByName(name);
    if (!pNode)
        return null;
    return pNode.getComponent(type);
};
cc.Node.prototype.getChildByList = function (path) {
    return cc.find(path, this);
};
cc.Node.prototype.getChildComByList = function (path, type) {
    var child = this.getChildByList(path);
    if (!child)
        return;
    return child.getComponent(type);
};
cc.Node.prototype.getUserData = function () {
    return this.userData || 0;
};
cc.Node.prototype.setUserData = function (value) {
    this.userData = value;
};
cc.Node.prototype.logPath = function () {
    var path = this.name;
    var node = this;
    do {
        var parent = node.parent;
        if (!parent)
            break;
        path = parent.name + "/" + path;
        node = parent;
        if (node.name == "Canvas")
            break;
    } while (!!node.parent);
    return path;
};
cc.Node.prototype.getMinPostion = function () {
    return cc.v2(this.x - this.width * this.anchorX, this.y - this.height * this.anchorY);
};
cc.Node.prototype.getMaxPosition = function () {
    var pos = this.getMinPostion();
    return pos.add(cc.v2(this.width, this.height));
};
cc.Node.prototype.worldActive = function () {
    var scence = cc.director.getScene();
    var node = this;
    while (node) {
        if (!node || !node.active)
            return false;
        if (node.parent == scence) {
            return node.active;
        }
        node = node.parent;
    }
    return false;
};
/**
* 无缝切换节点的父节点
* @param node 节点
* @param newParent 新父节点
*/
cc.Node.prototype.switchParent = function (newParent) {
    var localPos = (this.parent || this).convertToWorldSpaceAR(this.getPosition());
    var worldPos = newParent.convertToNodeSpaceAR(localPos);
    var rotationAttr = (typeof this.rotation === 'undefined' ? 'angle' : 'rotation');
    var localScaleX = 1;
    var localScaleY = 1;
    var localAngleX = 0;
    var localAngleY = 0;
    for (var parent = this; parent; parent = parent.parent) {
        localScaleX *= parent.scaleX;
        localScaleY *= parent.scaleY;
        localAngleX += parent[rotationAttr + 'X'];
        localAngleY += parent[rotationAttr + 'Y'];
    }
    var worldScaleX = 1;
    var worldScaleY = 1;
    var worldAngleX = 0;
    var worldAngleY = 0;
    for (var parent = newParent; parent; parent = parent.parent) {
        worldScaleX /= parent.scaleX;
        worldScaleY /= parent.scaleY;
        worldAngleX -= parent[rotationAttr + 'X'];
        worldAngleY -= parent[rotationAttr + 'Y'];
    }
    this.setParent(newParent);
    this[rotationAttr + 'X'] = localAngleX + worldAngleX;
    this[rotationAttr + 'Y'] = localAngleY + worldAngleY;
    this.setScale(localScaleX * worldScaleX, localScaleY * worldScaleY);
    this.setPosition(worldPos);
};
cc.Node.prototype.snapshotCamera = function (clluingMask, coustomSize) {
    var camera = this.getComponent(cc.Camera);
    if (!camera) {
        camera = this.addComponent(cc.Camera);
    }
    camera.cullingMask = clluingMask || 0xffffffff;
    camera.clearFlags = cc.Camera.main.clearFlags;
    camera.backgroundColor = cc.color(0, 0, 0, 0);
    if (camera.targetTexture) {
        return camera;
    }
    var texture = new cc.RenderTexture();
    var gl = cc.game["_renderContext"];
    if (coustomSize) {
        texture.initWithSize(coustomSize.width, coustomSize.height, gl.STENCIL_INDEX8);
    }
    else {
        texture.initWithSize(this.width, this.height, gl.STENCIL_INDEX8);
    }
    camera.targetTexture = texture;
    camera.enabled = false;
    return camera;
};
cc.Node.prototype.snapshotNode = function (clluingMask, coustomSize) {
    var _this = this;
    var camera = this.snapshotCamera(clluingMask, coustomSize);
    var outNode = new cc.Node();
    var sprite = outNode.addComponent(cc.Sprite);
    sprite.spriteFrame = new cc.SpriteFrame(camera.targetTexture);
    outNode.scaleY = -1;
    cc.tween(outNode).repeatForever(cc.tween(outNode).delay(0.01).call(function () {
        if (camera.isValid) {
            // 如果存在原生渲染， 则原生渲染一波
            if (window["middleware"]) {
                window["middleware"].MiddlewareManager.getInstance().update(0);
            }
            camera.render(_this);
        }
    })).start();
    return outNode;
};
cc.Sprite.prototype.setBlend = function (src, dst) {
    this['srcBlendFactor'] = src;
    this['dstBlendFactor'] = dst;
};
cc.Button.comAudio = null;
cc.Button.prototype.clickAudio = null;
cc.Button.prototype._onTouchEnded = function (event) {
    if (!this.interactable || !this.enabledInHierarchy)
        return;
    if (this._pressed) {
        if (this.clickAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(this.clickAudio);
        }
        else if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        cc.Component.EventHandler.emitEvents(this.clickEvents, event);
        this.node.emit('click', this);
    }
    this._pressed = false;
    this._updateState();
    event.stopPropagation();
};
sp.Skeleton.prototype.getAnimationInfo = function (aniName) {
    if (!cc.sys.isNative) {
        var animations = this._skeleton.data.animations;
        for (var i = 0; i < animations.length; i++) {
            if (animations[i].name == aniName) {
                return animations[i];
            }
        }
        return null;
    }
    else {
        return this.findAnimation(aniName);
    }
};
dragonBones.ArmatureDisplay.prototype.getAnimationInfo = function (armature, aniName) {
    var armatures = this.dragonAsset._dragonBonesJsonData.armature;
    var frameRate = 0;
    var curArmature = null;
    for (var i = 0; i < armatures.length; i++) {
        var art = armatures[i];
        if (art.name === armature) {
            frameRate = art.frameRate;
            curArmature = art;
            break;
        }
    }
    for (var i = 0; i < curArmature.animation.length; i++) {
        var animation = curArmature.animation[i];
        if (aniName == animation.name) {
            animation.duration = 1 / frameRate * animation.duration;
            return animation;
        }
    }
    console.error("未找到对应的动作信息");
    return null;
};
cc.Action.prototype.endCallback = function (callBack) {
    this.__endCallBack = callBack;
    return this;
};
cc.Component.EventHandler.prototype.emitWithBoolResult = function (params) {
    var target = this.target;
    if (!cc.isValid(target))
        return;
    this._genCompIdIfNeeded();
    var compType = cc.js['_getClassById'](this._componentId);
    var comp = target.getComponent(compType);
    if (!cc.isValid(comp))
        return;
    var handler = comp[this.handler];
    if (typeof (handler) !== 'function')
        return;
    if (this.customEventData != null && this.customEventData !== '') {
        params = params.slice();
        params.push(this.customEventData);
    }
    return handler.apply(comp, params);
};
// let oldPacker = cc.dynamicAtlasManager.insertSpriteFrame;
// const unDynamicAtlasRootPaths = [];
// cc.dynamicAtlasManager.insertSpriteFrame = function (spriteFrame: cc.SpriteFrame) {
//     let isdynamic = true;
//     let path = spriteFrame.url;
//     for (let i = 0; i < unDynamicAtlasRootPaths.length; i++) {
//         if (path.indexOf(unDynamicAtlasRootPaths[i]) != -1) {
//             isdynamic = false;
//         }
//     }
//     if (!isdynamic) {
//         return null;
//     }
//     return oldPacker.call(this, spriteFrame);
// }
function PIERCE_SCROLLVIEW_TOUCHEVENT(scrollView) {
    scrollView['_onTouchBegan'] = function (event, captureListeners) {
        cc.ScrollView.prototype['_onTouchBegan'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
        // if (scrollView.node['_touchListener'].swallowTouches) scrollView.node['_touchListener'].swallowTouches = false;
    };
    scrollView['_onTouchMoved'] = function (event, captureListeners) {
        if (scrollView['unStopped']) {
            return;
        }
        if (scrollView.horizontal && scrollView.vertical) {
            cc.ScrollView.prototype['_onTouchMoved'].call(scrollView, event, captureListeners);
            return;
        }
        var beginPos = event.getStartLocation();
        var curPos = event.getLocation();
        var delta = curPos.sub(beginPos);
        if (Math.abs(delta.x) < 3 && Math.abs(delta.y) < 3) {
            cc.ScrollView.prototype['_onTouchMoved'].call(scrollView, event, captureListeners);
            return;
        }
        if (Math.abs(delta.x) > Math.abs(delta.y) && scrollView.vertical) {
            cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
            event['_propagationStopped'] = false;
            scrollView['unStopped'] = true;
        }
        else if (Math.abs(delta.x) < Math.abs(delta.y) && scrollView.horizontal) {
            cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
            event['_propagationStopped'] = false;
            scrollView['unStopped'] = true;
        }
        else {
            this._bTouchTypeCheck = 2;
            cc.ScrollView.prototype['_onTouchMoved'].call(scrollView, event, captureListeners);
            scrollView['unStopped'] = false;
        }
    };
    scrollView['_onTouchEnded'] = function (event, captureListeners) {
        cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
    };
    scrollView['_onTouchCancelled'] = function (event, captureListeners) {
        cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
    };
}
exports.PIERCE_SCROLLVIEW_TOUCHEVENT = PIERCE_SCROLLVIEW_TOUCHEVENT;
function UN_PRIERCE_SCROLLVIEW_TOUCHEVENT(scrollView) {
    scrollView['unStopped'] = false;
    scrollView['_onTouchBegan'] = cc.ScrollView.prototype['_onTouchBegan'];
    scrollView['_onTouchMoved'] = cc.ScrollView.prototype['_onTouchMoved'];
    scrollView['_onTouchEnded'] = cc.ScrollView.prototype['_onTouchEnded'];
    scrollView['_onTouchCancelled'] = cc.ScrollView.prototype['_onTouchCancelled'];
}
exports.UN_PRIERCE_SCROLLVIEW_TOUCHEVENT = UN_PRIERCE_SCROLLVIEW_TOUCHEVENT;

cc._RF.pop();