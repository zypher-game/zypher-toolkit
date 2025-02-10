import GameMgr from "../Logic/GameMgr";

if (CC_DEV || CC_EDITOR) {
    window['WD_DEBUG'] = true;
}

if (CC_DEBUG || CC_DEV || CC_JSB) {
    if (window['WD_DEBUG']) {
        window['jx'] = GameMgr;
    }
    else {
        cc.log = function () { }

    }
    if (window['WD_DEBUG']) {
        window['jc'] = cc;
    }
    else {
        cc.log = function () { }
    }

    window['helps'] = () => {
        console.log("GM指令如下：")
        console.log("addItem([物品ID, 物品类型, 物品数量],...)");
        console.log("addHero(英雄ID) 添加英雄");
        console.log("exportLevelInfo() 导出关卡的位子信息")
    }


    window["clean"] = () => {
        GameMgr.ins().restart()
    }
}