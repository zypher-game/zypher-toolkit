"use strict";
cc._RF.push(module, '15622WbImFFspo9LHsyieP4', 'ShaderUtil');
// Script/Shaders/Manager/ShaderUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GLoader_1 = require("../../Core/GLoader/GLoader");
var VIewUtil_1 = require("./../../Game/Views/ViewUtil/VIewUtil");
var ShaderUtil = /** @class */ (function () {
    function ShaderUtil() {
    }
    ShaderUtil.gray = function (node, isChild) {
        if (isChild === void 0) { isChild = true; }
        if (!node)
            return;
        if (!isChild) {
            var renderComp = node.getComponent(cc.Sprite) ||
                node.getComponent("MaskSprite") ||
                node.getComponent("PlistLabel");
            if (renderComp) {
                renderComp.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", renderComp));
                renderComp["_activateMaterial"](true);
            }
            return;
        }
        VIewUtil_1.ViewUtil.func.seachChildrens(node, function (child) {
            var renderComp = child.getComponent(cc.Sprite) ||
                child.getComponent("MaskSprite") ||
                child.getComponent("PlistLabel");
            if (renderComp) {
                renderComp.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", renderComp));
                renderComp["_activateMaterial"](true);
            }
        });
    };
    ShaderUtil.normal = function (node, isChild) {
        if (isChild === void 0) { isChild = true; }
        if (!node)
            return;
        if (!isChild) {
            var renderComp = node.getComponent(cc.Sprite) ||
                node.getComponent("MaskSprite") ||
                node.getComponent("PlistLabel");
            if (renderComp) {
                renderComp.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-sprite", renderComp));
                renderComp["_activateMaterial"](true);
            }
            return;
        }
        VIewUtil_1.ViewUtil.func.seachChildrens(node, function (child) {
            var renderComp = child.getComponent(cc.Sprite) ||
                child.getComponent("MaskSprite") ||
                child.getComponent("PlistLabel");
            if (renderComp) {
                renderComp.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-sprite", renderComp));
                renderComp["_activateMaterial"](true);
            }
        });
    };
    ShaderUtil.circularMask1 = function (node) {
        var material = GLoader_1.GLoader.getPreLoadAsset("Materials/sp-circular");
        if (!node)
            return;
        var sp = node.getComponent(cc.Sprite);
        if (!sp)
            return;
        sp.setMaterial(0, material);
    };
    return ShaderUtil;
}());
exports.default = ShaderUtil;

cc._RF.pop();