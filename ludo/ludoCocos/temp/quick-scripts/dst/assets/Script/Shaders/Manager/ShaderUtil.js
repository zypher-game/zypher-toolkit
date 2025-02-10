
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Shaders/Manager/ShaderUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvU2hhZGVycy9NYW5hZ2VyL1NoYWRlclV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsaUVBQWdFO0FBRWhFO0lBQUE7SUF3RUEsQ0FBQztJQXZFZSxlQUFJLEdBQWxCLFVBQW1CLElBQWEsRUFBRSxPQUFjO1FBQWQsd0JBQUEsRUFBQSxjQUFjO1FBQzlDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBSSxVQUFVLEdBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsQyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxVQUFVLENBQUMsV0FBVyxDQUNwQixDQUFDLEVBQ0QsRUFBRSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FDbkUsQ0FBQztnQkFDRixVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztZQUNELE9BQU87U0FDUjtRQUNELG1CQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxLQUFLO1lBQ3ZDLElBQUksVUFBVSxHQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxDQUFDLFdBQVcsQ0FDcEIsQ0FBQyxFQUNELEVBQUUsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQ25FLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFYSxpQkFBTSxHQUFwQixVQUFxQixJQUFhLEVBQUUsT0FBYztRQUFkLHdCQUFBLEVBQUEsY0FBYztRQUNoRCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDbEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksVUFBVSxHQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxDQUFDLFdBQVcsQ0FDcEIsQ0FBQyxFQUNELEVBQUUsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUM5RCxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTztTQUNSO1FBQ0QsbUJBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFDLEtBQUs7WUFDdkMsSUFBSSxVQUFVLEdBQ1osS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUM3QixLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDaEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxVQUFVLENBQUMsV0FBVyxDQUNwQixDQUFDLEVBQ0QsRUFBRSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQzlELENBQUM7Z0JBQ0YsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFYSx3QkFBYSxHQUEzQixVQUE0QixJQUFhO1FBQ3ZDLElBQUksUUFBUSxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUNwQyx1QkFBdUIsQ0FDeEIsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUNsQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0F4RUEsQUF3RUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdMb2FkZXIgfSBmcm9tIFwiLi4vLi4vQ29yZS9HTG9hZGVyL0dMb2FkZXJcIjtcclxuaW1wb3J0IHsgVmlld1V0aWwgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL1ZpZXdzL1ZpZXdVdGlsL1ZJZXdVdGlsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXJVdGlsIHtcclxuICBwdWJsaWMgc3RhdGljIGdyYXkobm9kZTogY2MuTm9kZSwgaXNDaGlsZCA9IHRydWUpIHtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKCFpc0NoaWxkKSB7XHJcbiAgICAgIGxldCByZW5kZXJDb21wID1cclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpIHx8XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJNYXNrU3ByaXRlXCIpIHx8XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGlzdExhYmVsXCIpO1xyXG4gICAgICBpZiAocmVuZGVyQ29tcCkge1xyXG4gICAgICAgIHJlbmRlckNvbXAuc2V0TWF0ZXJpYWwoXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKFwiMmQtZ3JheS1zcHJpdGVcIiwgcmVuZGVyQ29tcClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlbmRlckNvbXBbXCJfYWN0aXZhdGVNYXRlcmlhbFwiXSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBWaWV3VXRpbC5mdW5jLnNlYWNoQ2hpbGRyZW5zKG5vZGUsIChjaGlsZCkgPT4ge1xyXG4gICAgICBsZXQgcmVuZGVyQ29tcCA9XHJcbiAgICAgICAgY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkgfHxcclxuICAgICAgICBjaGlsZC5nZXRDb21wb25lbnQoXCJNYXNrU3ByaXRlXCIpIHx8XHJcbiAgICAgICAgY2hpbGQuZ2V0Q29tcG9uZW50KFwiUGxpc3RMYWJlbFwiKTtcclxuICAgICAgaWYgKHJlbmRlckNvbXApIHtcclxuICAgICAgICByZW5kZXJDb21wLnNldE1hdGVyaWFsKFxyXG4gICAgICAgICAgMCxcclxuICAgICAgICAgIGNjLk1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbihcIjJkLWdyYXktc3ByaXRlXCIsIHJlbmRlckNvbXApXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJDb21wW1wiX2FjdGl2YXRlTWF0ZXJpYWxcIl0odHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBub3JtYWwobm9kZTogY2MuTm9kZSwgaXNDaGlsZCA9IHRydWUpIHtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKCFpc0NoaWxkKSB7XHJcbiAgICAgIGxldCByZW5kZXJDb21wID1cclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpIHx8XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJNYXNrU3ByaXRlXCIpIHx8XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGlzdExhYmVsXCIpO1xyXG4gICAgICBpZiAocmVuZGVyQ29tcCkge1xyXG4gICAgICAgIHJlbmRlckNvbXAuc2V0TWF0ZXJpYWwoXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKFwiMmQtc3ByaXRlXCIsIHJlbmRlckNvbXApXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJDb21wW1wiX2FjdGl2YXRlTWF0ZXJpYWxcIl0odHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgVmlld1V0aWwuZnVuYy5zZWFjaENoaWxkcmVucyhub2RlLCAoY2hpbGQpID0+IHtcclxuICAgICAgbGV0IHJlbmRlckNvbXAgPVxyXG4gICAgICAgIGNoaWxkLmdldENvbXBvbmVudChjYy5TcHJpdGUpIHx8XHJcbiAgICAgICAgY2hpbGQuZ2V0Q29tcG9uZW50KFwiTWFza1Nwcml0ZVwiKSB8fFxyXG4gICAgICAgIGNoaWxkLmdldENvbXBvbmVudChcIlBsaXN0TGFiZWxcIik7XHJcbiAgICAgIGlmIChyZW5kZXJDb21wKSB7XHJcbiAgICAgICAgcmVuZGVyQ29tcC5zZXRNYXRlcmlhbChcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlV2l0aEJ1aWx0aW4oXCIyZC1zcHJpdGVcIiwgcmVuZGVyQ29tcClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlbmRlckNvbXBbXCJfYWN0aXZhdGVNYXRlcmlhbFwiXSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNpcmN1bGFyTWFzazEobm9kZTogY2MuTm9kZSkge1xyXG4gICAgbGV0IG1hdGVyaWFsID0gR0xvYWRlci5nZXRQcmVMb2FkQXNzZXQ8Y2MuTWF0ZXJpYWw+KFxyXG4gICAgICBcIk1hdGVyaWFscy9zcC1jaXJjdWxhclwiXHJcbiAgICApO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICBsZXQgc3AgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgaWYgKCFzcCkgcmV0dXJuO1xyXG4gICAgc3Auc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWwpO1xyXG4gIH1cclxufVxyXG4iXX0=