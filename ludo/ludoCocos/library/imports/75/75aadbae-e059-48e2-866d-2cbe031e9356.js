"use strict";
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