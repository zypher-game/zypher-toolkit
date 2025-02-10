import { AudioMgr } from "../Manager/AudioMgr";

/**
 * over write cc.Node addChild.
 */



cc.Component.prototype.forcibleRender = function (renderFunc) {
    let oldEnabled = this._enabled;
    let oldActiveInHierarchy = this.node._activeInHierarchy;
    if (!oldEnabled) this._enabled = true;
    if (!oldActiveInHierarchy) this.node._activeInHierarchy = true;
    renderFunc();
    this._enabled = oldEnabled;
    this.node._activeInHierarchy = oldActiveInHierarchy;
}

cc.Node.prototype.getChildComByName = function <T extends cc.Component>(name: string, type: { prototype: T }): T {
    let pNode = this.getChildByName(name);
    if (!pNode) return null;
    return pNode.getComponent(type);
}

cc.Node.prototype.getChildByList = function (path: string): cc.Node {
    return cc.find(path, this);
}

cc.Node.prototype.getChildComByList = function <T extends cc.Component>(path: string, type: { prototype: T }): T {
    let child = this.getChildByList(path);
    if (!child) return;
    return child.getComponent(type);
}

cc.Node.prototype.getUserData = function <T>(): T {
    return this.userData || 0;
}

cc.Node.prototype.setUserData = function <T>(value: T) {
    this.userData = value;
}

cc.Node.prototype.logPath = function () {
    let path = this.name;
    let node = this;
    do {
        let parent = node.parent;
        if (!parent) break;
        path = parent.name + "/" + path;
        node = parent;
        if (node.name == "Canvas") break;
    } while (!!node.parent);
    return path;
}

cc.Node.prototype.getMinPostion = function (): cc.Vec2 {
    return cc.v2(this.x - this.width * this.anchorX, this.y - this.height * this.anchorY);
}

cc.Node.prototype.getMaxPosition = function (): cc.Vec2 {
    let pos = this.getMinPostion();
    return pos.add(cc.v2(this.width, this.height));
}

cc.Node.prototype.worldActive = function (): boolean {
    let scence = cc.director.getScene();
    let node = this;
    while (node) {
        if (!node || !node.active) return false;
        if (node.parent == scence) {
            return node.active;
        }
        node = node.parent;
    }
    return false;

}

/**
* 无缝切换节点的父节点
* @param node 节点
* @param newParent 新父节点
*/
cc.Node.prototype.switchParent = function (newParent: cc.Node): void {
    let localPos = (this.parent || this).convertToWorldSpaceAR(this.getPosition());
    let worldPos = newParent.convertToNodeSpaceAR(localPos);

    let rotationAttr = (typeof this.rotation === 'undefined' ? 'angle' : 'rotation');
    let localScaleX = 1;
    let localScaleY = 1;
    let localAngleX = 0;
    let localAngleY = 0;
    for (let parent = this; parent; parent = parent.parent) {
        localScaleX *= parent.scaleX;
        localScaleY *= parent.scaleY;
        localAngleX += parent[rotationAttr + 'X'];
        localAngleY += parent[rotationAttr + 'Y'];
    }

    let worldScaleX = 1;
    let worldScaleY = 1;
    let worldAngleX = 0;
    let worldAngleY = 0;
    for (let parent = newParent; parent; parent = parent.parent) {
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
}

cc.Node.prototype.snapshotCamera = function (clluingMask?: number, coustomSize?: cc.Size): cc.Camera {
    let camera: cc.Camera = this.getComponent(cc.Camera);
    if (!camera) {
        camera = this.addComponent(cc.Camera);
    }
    camera.cullingMask = clluingMask || 0xffffffff;
    camera.clearFlags = cc.Camera.main.clearFlags;
    camera.backgroundColor = cc.color(0, 0, 0, 0);
    if (camera.targetTexture) {
        return camera;
    }
    let texture = new cc.RenderTexture();
    let gl = cc.game["_renderContext"];
    if (coustomSize) {
        texture.initWithSize(coustomSize.width, coustomSize.height, gl.STENCIL_INDEX8);
    }
    else {
        texture.initWithSize(this.width, this.height, gl.STENCIL_INDEX8);
    }
    camera.targetTexture = texture;
    camera.enabled = false;
    return camera;
}

cc.Node.prototype.snapshotNode = function (clluingMask?: number, coustomSize?: cc.Size): cc.Node {
    let camera: cc.Camera = this.snapshotCamera(clluingMask, coustomSize);
    let outNode = new cc.Node();
    let sprite = outNode.addComponent(cc.Sprite);
    sprite.spriteFrame = new cc.SpriteFrame(camera.targetTexture);
    outNode.scaleY = -1;
    cc.tween(outNode).repeatForever(cc.tween(outNode).delay(0.01).call(() => {
        if (camera.isValid) {
            // 如果存在原生渲染， 则原生渲染一波
            if (window["middleware"]) {
                window["middleware"].MiddlewareManager.getInstance().update(0);
            }
            camera.render(this);
        }
    })).start();
    return outNode;
}

cc.Sprite.prototype.setBlend = function (src: number, dst: number) {
    this['srcBlendFactor'] = src;
    this['dstBlendFactor'] = dst;
}

cc.Button.comAudio = null;
cc.Button.prototype.clickAudio = null;
cc.Button.prototype._onTouchEnded = function (event) {
    if (!this.interactable || !this.enabledInHierarchy) return;
    if (this._pressed) {
        if (this.clickAudio) {
            AudioMgr.Ins().playEffect(this.clickAudio);
        }
        else if (cc.Button.comAudio) {
            AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        cc.Component.EventHandler.emitEvents(this.clickEvents, event);
        this.node.emit('click', this);
    }
    this._pressed = false;
    this._updateState();
    event.stopPropagation();
}

sp.Skeleton.prototype.getAnimationInfo = function (aniName: string): sp.spine.Animation {
    if (!cc.sys.isNative) {
        let animations = this._skeleton.data.animations;
        for (let i = 0; i < animations.length; i++) {
            if (animations[i].name == aniName) {
                return animations[i];
            }
        }
        return null;
    }
    else {
        return this.findAnimation(aniName);
    }
}

dragonBones.ArmatureDisplay.prototype.getAnimationInfo = function (armature: string, aniName: string): dragonBones.AnimationInfo {
    let armatures: any[] = this.dragonAsset._dragonBonesJsonData.armature;
    let frameRate: number = 0;
    let curArmature: any = null;
    for (let i = 0; i < armatures.length; i++) {
        let art = armatures[i];
        if (art.name === armature) {
            frameRate = art.frameRate;
            curArmature = art;
            break;
        }
    }

    for (let i = 0; i < curArmature.animation.length; i++) {
        let animation: dragonBones.AnimationInfo = curArmature.animation[i];
        if (aniName == animation.name) {
            animation.duration = 1 / frameRate * animation.duration;
            return animation;
        }
    }
    console.error("未找到对应的动作信息")
    return null
}

cc.Action.prototype.endCallback = function (callBack): cc.Action & cc.FiniteTimeAction {
    this.__endCallBack = callBack;
    return this;
}

cc.Component.EventHandler.prototype.emitWithBoolResult = function (params): boolean {
    var target = this.target;
    if (!cc.isValid(target)) return;

    this._genCompIdIfNeeded();
    var compType = cc.js['_getClassById'](this._componentId);

    var comp = target.getComponent(compType);
    if (!cc.isValid(comp)) return;

    var handler = comp[this.handler];
    if (typeof (handler) !== 'function') return;

    if (this.customEventData != null && this.customEventData !== '') {
        params = params.slice();
        params.push(this.customEventData);
    }

    return handler.apply(comp, params);
}


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


export function PIERCE_SCROLLVIEW_TOUCHEVENT(scrollView: cc.ScrollView) {
    scrollView['_onTouchBegan'] = function (event: cc.Event.EventTouch, captureListeners) {
        cc.ScrollView.prototype['_onTouchBegan'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
        // if (scrollView.node['_touchListener'].swallowTouches) scrollView.node['_touchListener'].swallowTouches = false;
    }

    scrollView['_onTouchMoved'] = function (event: cc.Event.EventTouch, captureListeners) {
        if (scrollView['unStopped']) {
            return;
        }
        if (scrollView.horizontal && scrollView.vertical) {
            cc.ScrollView.prototype['_onTouchMoved'].call(scrollView, event, captureListeners);
            return;
        }
        let beginPos = event.getStartLocation();
        let curPos = event.getLocation();
        let delta = curPos.sub(beginPos);
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
    }

    scrollView['_onTouchEnded'] = function (event, captureListeners) {
        cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
    }

    scrollView['_onTouchCancelled'] = function (event, captureListeners) {
        cc.ScrollView.prototype['_onTouchCancelled'].call(scrollView, event, captureListeners);
        event['_propagationStopped'] = false;
        scrollView['unStopped'] = false;
    }
}

export function UN_PRIERCE_SCROLLVIEW_TOUCHEVENT(scrollView: cc.ScrollView) {
    scrollView['unStopped'] = false;
    scrollView['_onTouchBegan'] = cc.ScrollView.prototype['_onTouchBegan'];
    scrollView['_onTouchMoved'] = cc.ScrollView.prototype['_onTouchMoved'];
    scrollView['_onTouchEnded'] = cc.ScrollView.prototype['_onTouchEnded'];
    scrollView['_onTouchCancelled'] = cc.ScrollView.prototype['_onTouchCancelled'];
}