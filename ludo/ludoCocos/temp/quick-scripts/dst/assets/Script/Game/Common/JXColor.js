
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/JXColor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46ee0xa899Aoa9UDZ7XMLV8', 'JXColor');
// Script/Game/Common/JXColor.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.JXColor = void 0;
exports.JXColor = {
    /**黑色*/
    C000000: cc.color(0, 0, 0, 255),
    /**规范白色*/
    Cffffff: cc.color(255, 255, 255, 255),
    /**规范灰色*/
    C949494: cc.color(148, 148, 148, 255),
    /**按钮字灰色*/
    C636363: cc.color(99, 99, 99, 255),
    /**回合战斗名字颜色1-敌方阵容*/
    CFFF075: cc.color(255, 240, 117, 255),
    /**回合战斗名字颜色2-自己*/
    C8BF5FF: cc.color(139, 245, 255, 255),
    /**回合战斗名字颜色1描边-敌方阵容*/
    C925600: cc.color(146, 86, 0, 255),
    /**回合战斗名字颜色2描边-自己*/
    C133D5B: cc.color(19, 61, 91, 255),
    /**回合战斗名字颜色3-己方仙灵*/
    CA4FF9F: cc.color(164, 255, 159, 255),
    /**回合战斗名字颜色3描边-己方仙灵*/
    C004A00: cc.color(0, 74, 0, 255),
    /**被动技能*/
    C2AFFFC: cc.color(42, 255, 252, 255),
    /**主动技能显示颜色*/
    CFFD74E: cc.color(255, 215, 78, 255),
    /**部分属性颜色*/
    CFFFD42: cc.color(255, 253, 66, 255),
    /**人物颜色*/
    C382F0D: cc.color(56, 47, 13, 255),
    /**纯红色*/
    Cff0000: cc.color(255, 0, 0, 255),
    /**公告左边选中文字 */
    C472811: cc.color(71, 40, 17, 255),
    /**道具不足數量顔色*/
    CFF003D: cc.color(255, 0, 61, 255),
    /**道具足夠道具數量*/
    C00FF3D: cc.color(0, 255, 61, 255),
    /**道具足夠道具數量*/
    C66FF00: cc.color(102, 255, 0, 255),
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vSlhDb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFhLFFBQUEsT0FBTyxHQUFHO0lBRXZCLE9BQU87SUFDUCxPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxHQUFHLENBQUM7SUFDOUIsU0FBUztJQUNULE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNwQyxTQUFTO0lBQ1QsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ3BDLFVBQVU7SUFDVixPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxHQUFHLENBQUM7SUFDakMsbUJBQW1CO0lBQ25CLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNwQyxpQkFBaUI7SUFDakIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ3BDLHFCQUFxQjtJQUNyQixPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxHQUFHLENBQUM7SUFDakMsbUJBQW1CO0lBQ25CLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLEdBQUcsQ0FBQztJQUNqQyxtQkFBbUI7SUFDbkIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ3BDLHFCQUFxQjtJQUNyQixPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxHQUFHLENBQUM7SUFDL0IsU0FBUztJQUNULE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNuQyxhQUFhO0lBQ2IsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsR0FBRyxDQUFDO0lBQ25DLFdBQVc7SUFDWCxPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBQyxHQUFHLENBQUM7SUFDbkMsU0FBUztJQUNULE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLEdBQUcsQ0FBQztJQUNqQyxRQUFRO0lBQ1IsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsR0FBRyxDQUFDO0lBQ2hDLGNBQWM7SUFDZCxPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxHQUFHLENBQUM7SUFDakMsYUFBYTtJQUNiLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQztJQUMvQixhQUFhO0lBQ2IsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxDQUFDO0lBQy9CLGFBQWE7SUFDYixPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7Q0FDL0IsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBKWENvbG9yID0ge1xyXG5cclxuLyoq6buR6ImyKi9cclxuQzAwMDAwMDogY2MuY29sb3IoMCwgMCwgMCwyNTUpLFxyXG4vKirop4TojIPnmb3oibIqL1xyXG5DZmZmZmZmOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LDI1NSksXHJcbi8qKuinhOiMg+eBsOiJsiovXHJcbkM5NDk0OTQ6IGNjLmNvbG9yKDE0OCwgMTQ4LCAxNDgsMjU1KSxcclxuLyoq5oyJ6ZKu5a2X54Gw6ImyKi9cclxuQzYzNjM2MzogY2MuY29sb3IoOTksIDk5LCA5OSwyNTUpLFxyXG4vKirlm57lkIjmiJjmlpflkI3lrZfpopzoibIxLeaVjOaWuemYteWuuSovXHJcbkNGRkYwNzU6IGNjLmNvbG9yKDI1NSwgMjQwLCAxMTcsMjU1KSxcclxuLyoq5Zue5ZCI5oiY5paX5ZCN5a2X6aKc6ImyMi3oh6rlt7EqL1xyXG5DOEJGNUZGOiBjYy5jb2xvcigxMzksIDI0NSwgMjU1LDI1NSksXHJcbi8qKuWbnuWQiOaImOaWl+WQjeWtl+minOiJsjHmj4/ovrkt5pWM5pa56Zi15a65Ki9cclxuQzkyNTYwMDogY2MuY29sb3IoMTQ2LCA4NiwgMCwyNTUpLFxyXG4vKirlm57lkIjmiJjmlpflkI3lrZfpopzoibIy5o+P6L65LeiHquW3sSovXHJcbkMxMzNENUI6IGNjLmNvbG9yKDE5LCA2MSwgOTEsMjU1KSxcclxuLyoq5Zue5ZCI5oiY5paX5ZCN5a2X6aKc6ImyMy3lt7Hmlrnku5nngbUqL1xyXG5DQTRGRjlGOiBjYy5jb2xvcigxNjQsIDI1NSwgMTU5LDI1NSksXHJcbi8qKuWbnuWQiOaImOaWl+WQjeWtl+minOiJsjPmj4/ovrkt5bex5pa55LuZ54G1Ki9cclxuQzAwNEEwMDogY2MuY29sb3IoMCwgNzQsIDAsMjU1KSxcclxuLyoq6KKr5Yqo5oqA6IO9Ki9cclxuQzJBRkZGQzogY2MuY29sb3IoNDIsIDI1NSwgMjUyLDI1NSksXHJcbi8qKuS4u+WKqOaKgOiDveaYvuekuuminOiJsiovXHJcbkNGRkQ3NEU6IGNjLmNvbG9yKDI1NSwgMjE1LCA3OCwyNTUpLFxyXG4vKirpg6jliIblsZ7mgKfpopzoibIqL1xyXG5DRkZGRDQyOiBjYy5jb2xvcigyNTUsIDI1MywgNjYsMjU1KSxcclxuLyoq5Lq654mp6aKc6ImyKi9cclxuQzM4MkYwRDogY2MuY29sb3IoNTYsIDQ3LCAxMywyNTUpLFxyXG4vKirnuq/nuqLoibIqL1xyXG5DZmYwMDAwOiBjYy5jb2xvcigyNTUsIDAsIDAsMjU1KSxcclxuLyoq5YWs5ZGK5bem6L656YCJ5Lit5paH5a2XICovXHJcbkM0NzI4MTE6IGNjLmNvbG9yKDcxLCA0MCwgMTcsMjU1KSxcclxuLyoq6YGT5YW35LiN6Laz5pW46YeP6aGU6ImyKi9cclxuQ0ZGMDAzRDogY2MuY29sb3IoMjU1LDAsNjEsMjU1KSxcclxuLyoq6YGT5YW36Laz5aSg6YGT5YW35pW46YePKi9cclxuQzAwRkYzRDogY2MuY29sb3IoMCwyNTUsNjEsMjU1KSxcclxuLyoq6YGT5YW36Laz5aSg6YGT5YW35pW46YePKi9cclxuQzY2RkYwMDogY2MuY29sb3IoMTAyLDI1NSwwLDI1NSksXHJcbn0iXX0=