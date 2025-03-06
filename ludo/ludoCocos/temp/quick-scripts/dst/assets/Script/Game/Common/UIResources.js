
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/UIResources.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61557VWuFFNUZmZrs2fPTTZ', 'UIResources');
// Script/Game/Common/UIResources.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
exports.Res = {
    font: {},
    // spriteframe
    texture: {
        views: {},
    },
    prefab: {
        vw: {
            home: {},
            tip: {
                wait: "tip/WaitCtrl",
            },
            fight: {},
        },
        item: {},
    },
    animation: {
        kuang: {
        // kuang1: { path: "frames/views/kuangAni1", aniName: 'kuang', prefix: 'K_', numberFix: 4 },
        // kuang2: { path: "frames/views/kuangAni2", aniName: 'kuang', prefix: 'K2_', numberFix: 4 },
        },
    },
    spine: {},
    dragonBones: {
        guide: "dragon/sp_shouzhi_",
    },
    material: {
    // uiguide: 'materials/ui-guide'
    },
    audio: {},
    // 路径索引统一中心位置修复配置
    positionOffset: {
        invalidClick: "1",
    },
    mapCtrl: "commonPrefab/map/MapCtrl",
    mapPlayer: "commonPrefab/map/Player",
    /**加载页模块 */
    loadCtrl: "common/loadCtrl/LoadCtrl",
    /**某白色图片 */
    single: "resources/singleColor",
    /**主界面模块 */
    homeCtrl: {
        homeCtrl: "homeCtrl/HomeCtrl",
        AIPlayerSetting: "homeCtrl/dialog/AIPlayerSetting",
        DailyTasks: "homeCtrl/dialog/DailyTasks",
        Help: "homeCtrl/dialog/Help",
        LeaderBoard: "homeCtrl/dialog/LeaderBoard",
        Settings: "homeCtrl/dialog/Settings",
    },
    /**公共模块 */
    common: {
        toast: "common/tip/ToastCtrl",
        topUiItem: "commonPrefab/TopUiItem",
        frameItem: "commonPrefab/FrameItem",
        rewardCtrl: "commonPrefab/RewardCtrl",
        JXItem: "commonPrefab/JXItem",
        npcHead: "commonPrefab/views/npcHead",
        guide_item: "common/guide/GuideNode",
        guide: "common/dragon/sp_shouzhi_",
        audio: {
            bgm: "commonPrefab/audio/bgm",
            baoza: "commonPrefab/audio/baoza",
            button: "commonPrefab/audio/button",
            fail: "commonPrefab/audio/fail",
            fashe: "commonPrefab/audio/fashe",
            feiji: "commonPrefab/audio/feiji",
            feixing: "commonPrefab/audio/feixing",
            houtui: "commonPrefab/audio/houtui",
            baoza1: "commonPrefab/audio/baoza1",
            paotai: "commonPrefab/audio/paotai",
            reward: "commonPrefab/audio/reward",
            star: "commonPrefab/audio/star",
            success: "commonPrefab/audio/success",
            touzi: "commonPrefab/audio/touzi",
            zhuangfei: "commonPrefab/audio/zhuangfei",
            suikuai: "commonPrefab/audio/suikuai",
            smile: "commonPrefab/audio/smile",
        },
    },
    /**数据模块 */
    data: {
        data: "data/",
    },
    /**匹配界面 */
    MatchCtrl: {
        MatchCtrl: "MatchCtrl/MatchCtrl",
    },
    /**战斗 */
    fight: {
        fightCtrl: "fight/prefab/BattleViewCtrl",
        role: "fight/prefab/JXRole",
        player: "fight/prefab/JXRBPlayer",
        plane: "fight/",
        shaizi: "fight/effect/shaizi",
        fight: "fight/views/fightPage",
    },
    gameOverCtrl: {
        battleResultCtrl: "gameOverCtrl/prefab/BattleResultCtrl",
        battleResultCtrlImg: "gameOverCtrl/views/gameOver",
    },
};
//GAssetImpl.loader.textureRes = Res.texture;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVUlSZXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWEsUUFBQSxHQUFHLEdBQUc7SUFDakIsSUFBSSxFQUFFLEVBQUU7SUFDUixjQUFjO0lBQ2QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE1BQU0sRUFBRTtRQUNOLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxFQUFFO1lBQ1IsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxjQUFjO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUVELElBQUksRUFBRSxFQUFFO0tBQ1Q7SUFFRCxTQUFTLEVBQUU7UUFDVCxLQUFLLEVBQUU7UUFDTCw0RkFBNEY7UUFDNUYsNkZBQTZGO1NBQzlGO0tBQ0Y7SUFDRCxLQUFLLEVBQUUsRUFBRTtJQUNULFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxvQkFBb0I7S0FDNUI7SUFDRCxRQUFRLEVBQUU7SUFDUixnQ0FBZ0M7S0FDakM7SUFDRCxLQUFLLEVBQUUsRUFBRTtJQUNULGlCQUFpQjtJQUNqQixjQUFjLEVBQUU7UUFDZCxZQUFZLEVBQUUsR0FBRztLQUNsQjtJQUVELE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsU0FBUyxFQUFFLHlCQUF5QjtJQUVwQyxXQUFXO0lBQ1gsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxXQUFXO0lBQ1gsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixXQUFXO0lBQ1gsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixlQUFlLEVBQUUsaUNBQWlDO1FBQ2xELFVBQVUsRUFBRSw0QkFBNEI7UUFDeEMsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFFBQVEsRUFBRSwwQkFBMEI7S0FDckM7SUFDRCxVQUFVO0lBQ1YsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLHNCQUFzQjtRQUM3QixTQUFTLEVBQUUsd0JBQXdCO1FBQ25DLFNBQVMsRUFBRSx3QkFBd0I7UUFDbkMsVUFBVSxFQUFFLHlCQUF5QjtRQUNyQyxNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxLQUFLLEVBQUUsMkJBQTJCO1FBQ2xDLEtBQUssRUFBRTtZQUNMLEdBQUcsRUFBRSx3QkFBd0I7WUFDN0IsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxJQUFJLEVBQUUseUJBQXlCO1lBQy9CLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxTQUFTLEVBQUUsOEJBQThCO1lBQ3pDLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsS0FBSyxFQUFFLDBCQUEwQjtTQUNsQztLQUNGO0lBQ0QsVUFBVTtJQUNWLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFDRCxVQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1QsU0FBUyxFQUFFLHFCQUFxQjtLQUNqQztJQUNELFFBQVE7SUFDUixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsNkJBQTZCO1FBQ3hDLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxLQUFLLEVBQUUsUUFBUTtRQUNmLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsS0FBSyxFQUFFLHVCQUF1QjtLQUMvQjtJQUVELFlBQVksRUFBRTtRQUNaLGdCQUFnQixFQUFFLHNDQUFzQztRQUN4RCxtQkFBbUIsRUFBRSw2QkFBNkI7S0FDbkQ7Q0FDRixDQUFDO0FBQ0YsNkNBQTZDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFJlcyA9IHtcclxuICBmb250OiB7fSxcclxuICAvLyBzcHJpdGVmcmFtZVxyXG4gIHRleHR1cmU6IHtcclxuICAgIHZpZXdzOiB7fSxcclxuICB9LFxyXG4gIHByZWZhYjoge1xyXG4gICAgdnc6IHtcclxuICAgICAgaG9tZToge30sXHJcbiAgICAgIHRpcDoge1xyXG4gICAgICAgIHdhaXQ6IFwidGlwL1dhaXRDdHJsXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGZpZ2h0OiB7fSxcclxuICAgIH0sXHJcblxyXG4gICAgaXRlbToge30sXHJcbiAgfSxcclxuXHJcbiAgYW5pbWF0aW9uOiB7XHJcbiAgICBrdWFuZzoge1xyXG4gICAgICAvLyBrdWFuZzE6IHsgcGF0aDogXCJmcmFtZXMvdmlld3Mva3VhbmdBbmkxXCIsIGFuaU5hbWU6ICdrdWFuZycsIHByZWZpeDogJ0tfJywgbnVtYmVyRml4OiA0IH0sXHJcbiAgICAgIC8vIGt1YW5nMjogeyBwYXRoOiBcImZyYW1lcy92aWV3cy9rdWFuZ0FuaTJcIiwgYW5pTmFtZTogJ2t1YW5nJywgcHJlZml4OiAnSzJfJywgbnVtYmVyRml4OiA0IH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc3BpbmU6IHt9LFxyXG4gIGRyYWdvbkJvbmVzOiB7XHJcbiAgICBndWlkZTogXCJkcmFnb24vc3Bfc2hvdXpoaV9cIixcclxuICB9LFxyXG4gIG1hdGVyaWFsOiB7XHJcbiAgICAvLyB1aWd1aWRlOiAnbWF0ZXJpYWxzL3VpLWd1aWRlJ1xyXG4gIH0sXHJcbiAgYXVkaW86IHt9LFxyXG4gIC8vIOi3r+W+hOe0ouW8lee7n+S4gOS4reW/g+S9jee9ruS/ruWkjemFjee9rlxyXG4gIHBvc2l0aW9uT2Zmc2V0OiB7XHJcbiAgICBpbnZhbGlkQ2xpY2s6IFwiMVwiLFxyXG4gIH0sXHJcblxyXG4gIG1hcEN0cmw6IFwiY29tbW9uUHJlZmFiL21hcC9NYXBDdHJsXCIsXHJcbiAgbWFwUGxheWVyOiBcImNvbW1vblByZWZhYi9tYXAvUGxheWVyXCIsXHJcblxyXG4gIC8qKuWKoOi9vemhteaooeWdlyAqL1xyXG4gIGxvYWRDdHJsOiBcImNvbW1vbi9sb2FkQ3RybC9Mb2FkQ3RybFwiLFxyXG4gIC8qKuafkOeZveiJsuWbvueJhyAqL1xyXG4gIHNpbmdsZTogXCJyZXNvdXJjZXMvc2luZ2xlQ29sb3JcIixcclxuICAvKirkuLvnlYzpnaLmqKHlnZcgKi9cclxuICBob21lQ3RybDoge1xyXG4gICAgaG9tZUN0cmw6IFwiaG9tZUN0cmwvSG9tZUN0cmxcIixcclxuICAgIEFJUGxheWVyU2V0dGluZzogXCJob21lQ3RybC9kaWFsb2cvQUlQbGF5ZXJTZXR0aW5nXCIsXHJcbiAgICBEYWlseVRhc2tzOiBcImhvbWVDdHJsL2RpYWxvZy9EYWlseVRhc2tzXCIsXHJcbiAgICBIZWxwOiBcImhvbWVDdHJsL2RpYWxvZy9IZWxwXCIsXHJcbiAgICBMZWFkZXJCb2FyZDogXCJob21lQ3RybC9kaWFsb2cvTGVhZGVyQm9hcmRcIixcclxuICAgIFNldHRpbmdzOiBcImhvbWVDdHJsL2RpYWxvZy9TZXR0aW5nc1wiLFxyXG4gIH0sXHJcbiAgLyoq5YWs5YWx5qih5Z2XICovXHJcbiAgY29tbW9uOiB7XHJcbiAgICB0b2FzdDogXCJjb21tb24vdGlwL1RvYXN0Q3RybFwiLFxyXG4gICAgdG9wVWlJdGVtOiBcImNvbW1vblByZWZhYi9Ub3BVaUl0ZW1cIixcclxuICAgIGZyYW1lSXRlbTogXCJjb21tb25QcmVmYWIvRnJhbWVJdGVtXCIsXHJcbiAgICByZXdhcmRDdHJsOiBcImNvbW1vblByZWZhYi9SZXdhcmRDdHJsXCIsXHJcbiAgICBKWEl0ZW06IFwiY29tbW9uUHJlZmFiL0pYSXRlbVwiLFxyXG4gICAgbnBjSGVhZDogXCJjb21tb25QcmVmYWIvdmlld3MvbnBjSGVhZFwiLFxyXG4gICAgZ3VpZGVfaXRlbTogXCJjb21tb24vZ3VpZGUvR3VpZGVOb2RlXCIsXHJcbiAgICBndWlkZTogXCJjb21tb24vZHJhZ29uL3NwX3Nob3V6aGlfXCIsXHJcbiAgICBhdWRpbzoge1xyXG4gICAgICBiZ206IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2JnbVwiLCAvL1xyXG4gICAgICBiYW96YTogXCJjb21tb25QcmVmYWIvYXVkaW8vYmFvemFcIiwgLy9cclxuICAgICAgYnV0dG9uOiBcImNvbW1vblByZWZhYi9hdWRpby9idXR0b25cIiwgLy9cclxuICAgICAgZmFpbDogXCJjb21tb25QcmVmYWIvYXVkaW8vZmFpbFwiLCAvL1xyXG4gICAgICBmYXNoZTogXCJjb21tb25QcmVmYWIvYXVkaW8vZmFzaGVcIiwgLy9cclxuICAgICAgZmVpamk6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2ZlaWppXCIsIC8vXHJcbiAgICAgIGZlaXhpbmc6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2ZlaXhpbmdcIiwgLy9cclxuICAgICAgaG91dHVpOiBcImNvbW1vblByZWZhYi9hdWRpby9ob3V0dWlcIiwgLy9cclxuICAgICAgYmFvemExOiBcImNvbW1vblByZWZhYi9hdWRpby9iYW96YTFcIixcclxuICAgICAgcGFvdGFpOiBcImNvbW1vblByZWZhYi9hdWRpby9wYW90YWlcIiwgLy9cclxuICAgICAgcmV3YXJkOiBcImNvbW1vblByZWZhYi9hdWRpby9yZXdhcmRcIiwgLy9cclxuICAgICAgc3RhcjogXCJjb21tb25QcmVmYWIvYXVkaW8vc3RhclwiLCAvL1xyXG4gICAgICBzdWNjZXNzOiBcImNvbW1vblByZWZhYi9hdWRpby9zdWNjZXNzXCIsIC8vXHJcbiAgICAgIHRvdXppOiBcImNvbW1vblByZWZhYi9hdWRpby90b3V6aVwiLCAvL1xyXG4gICAgICB6aHVhbmdmZWk6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL3podWFuZ2ZlaVwiLCAvL1xyXG4gICAgICBzdWlrdWFpOiBcImNvbW1vblByZWZhYi9hdWRpby9zdWlrdWFpXCIsXHJcbiAgICAgIHNtaWxlOiBcImNvbW1vblByZWZhYi9hdWRpby9zbWlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8qKuaVsOaNruaooeWdlyAqL1xyXG4gIGRhdGE6IHtcclxuICAgIGRhdGE6IFwiZGF0YS9cIixcclxuICB9LFxyXG4gIC8qKuWMuemFjeeVjOmdoiAqL1xyXG4gIE1hdGNoQ3RybDoge1xyXG4gICAgTWF0Y2hDdHJsOiBcIk1hdGNoQ3RybC9NYXRjaEN0cmxcIixcclxuICB9LFxyXG4gIC8qKuaImOaWlyAqL1xyXG4gIGZpZ2h0OiB7XHJcbiAgICBmaWdodEN0cmw6IFwiZmlnaHQvcHJlZmFiL0JhdHRsZVZpZXdDdHJsXCIsXHJcbiAgICByb2xlOiBcImZpZ2h0L3ByZWZhYi9KWFJvbGVcIixcclxuICAgIHBsYXllcjogXCJmaWdodC9wcmVmYWIvSlhSQlBsYXllclwiLFxyXG4gICAgcGxhbmU6IFwiZmlnaHQvXCIsXHJcbiAgICBzaGFpemk6IFwiZmlnaHQvZWZmZWN0L3NoYWl6aVwiLFxyXG4gICAgZmlnaHQ6IFwiZmlnaHQvdmlld3MvZmlnaHRQYWdlXCIsXHJcbiAgfSxcclxuXHJcbiAgZ2FtZU92ZXJDdHJsOiB7XHJcbiAgICBiYXR0bGVSZXN1bHRDdHJsOiBcImdhbWVPdmVyQ3RybC9wcmVmYWIvQmF0dGxlUmVzdWx0Q3RybFwiLFxyXG4gICAgYmF0dGxlUmVzdWx0Q3RybEltZzogXCJnYW1lT3ZlckN0cmwvdmlld3MvZ2FtZU92ZXJcIixcclxuICB9LFxyXG59O1xyXG4vL0dBc3NldEltcGwubG9hZGVyLnRleHR1cmVSZXMgPSBSZXMudGV4dHVyZTtcclxuIl19