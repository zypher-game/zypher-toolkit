
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/GM/GMCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75aaduu4FlI4oZtLL4DHpNW', 'GMCtrl');
// Script/Game/GM/GMCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameMgr_1 = require("../Logic/GameMgr");
if (CC_DEV || CC_EDITOR) {
    window['WD_DEBUG'] = true;
}
if (CC_DEBUG || CC_DEV || CC_JSB) {
    if (window['WD_DEBUG']) {
        window['jx'] = GameMgr_1.default;
    }
    else {
        cc.log = function () { };
    }
    if (window['WD_DEBUG']) {
        window['jc'] = cc;
    }
    else {
        cc.log = function () { };
    }
    window['helps'] = function () {
        console.log("GM指令如下：");
        console.log("addItem([物品ID, 物品类型, 物品数量],...)");
        console.log("addHero(英雄ID) 添加英雄");
        console.log("exportLevelInfo() 导出关卡的位子信息");
    };
    window["clean"] = function () {
        GameMgr_1.default.ins().restart();
    };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9HTS9HTUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUV2QyxJQUFJLE1BQU0sSUFBSSxTQUFTLEVBQUU7SUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUM3QjtBQUVELElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7SUFDOUIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFPLENBQUM7S0FDMUI7U0FDSTtRQUNELEVBQUUsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUE7S0FFM0I7SUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3JCO1NBQ0k7UUFDRCxFQUFFLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFBO0tBQzNCO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtJQUM5QyxDQUFDLENBQUE7SUFHRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFDZCxpQkFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzNCLENBQUMsQ0FBQTtDQUNKIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuXHJcbmlmIChDQ19ERVYgfHwgQ0NfRURJVE9SKSB7XHJcbiAgICB3aW5kb3dbJ1dEX0RFQlVHJ10gPSB0cnVlO1xyXG59XHJcblxyXG5pZiAoQ0NfREVCVUcgfHwgQ0NfREVWIHx8IENDX0pTQikge1xyXG4gICAgaWYgKHdpbmRvd1snV0RfREVCVUcnXSkge1xyXG4gICAgICAgIHdpbmRvd1snangnXSA9IEdhbWVNZ3I7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjYy5sb2cgPSBmdW5jdGlvbiAoKSB7IH1cclxuXHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93WydXRF9ERUJVRyddKSB7XHJcbiAgICAgICAgd2luZG93WydqYyddID0gY2M7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjYy5sb2cgPSBmdW5jdGlvbiAoKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dbJ2hlbHBzJ10gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHTeaMh+S7pOWmguS4i++8mlwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkSXRlbShb54mp5ZOBSUQsIOeJqeWTgeexu+Weiywg54mp5ZOB5pWw6YePXSwuLi4pXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkSGVybyjoi7Hpm4RJRCkg5re75Yqg6Iux6ZuEXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwb3J0TGV2ZWxJbmZvKCkg5a+85Ye65YWz5Y2h55qE5L2N5a2Q5L+h5oGvXCIpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHdpbmRvd1tcImNsZWFuXCJdID0gKCkgPT4ge1xyXG4gICAgICAgIEdhbWVNZ3IuaW5zKCkucmVzdGFydCgpXHJcbiAgICB9XHJcbn0iXX0=