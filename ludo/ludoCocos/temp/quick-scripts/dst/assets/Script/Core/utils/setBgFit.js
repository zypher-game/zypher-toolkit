
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/utils/setBgFit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS91dGlscy9zZXRCZ0ZpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNLFFBQVEsR0FBRyxVQUFDLE1BQWU7SUFDdEMsSUFBSSxXQUFXLEdBQ2IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM3RSxJQUFJLFVBQVUsR0FDWixFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzNFLElBQUksS0FBSyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBUFcsUUFBQSxRQUFRLFlBT25CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNldEJnRml0ID0gKGJnTm9kZTogY2MuTm9kZSkgPT4ge1xuICBsZXQgaGVpZ2h0U2NhbGUgPVxuICAgIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkuaGVpZ2h0O1xuICBsZXQgd2lkdGhTY2FsZSA9XG4gICAgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoIC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoO1xuICBsZXQgc2NhbGUgPSBoZWlnaHRTY2FsZSA+IHdpZHRoU2NhbGUgPyBoZWlnaHRTY2FsZSA6IHdpZHRoU2NhbGU7XG4gIGJnTm9kZS5zZXRTY2FsZShzY2FsZSk7XG59O1xuIl19