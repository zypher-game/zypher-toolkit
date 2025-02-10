"use strict";
cc._RF.push(module, 'f293elb/m9ESKcgd1ClsZVr', 'setBgFit');
// Script/Core/utils/setBgFit.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBgFit = void 0;
var setBgFit = function (bgNode) {
    var heightScale = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
    var widthScale = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
    var scale = heightScale > widthScale ? heightScale : widthScale;
    bgNode.setScale(scale);
};
exports.setBgFit = setBgFit;

cc._RF.pop();