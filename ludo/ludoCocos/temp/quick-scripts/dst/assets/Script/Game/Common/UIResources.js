
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vVUlSZXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWEsUUFBQSxHQUFHLEdBQUc7SUFDakIsSUFBSSxFQUFFLEVBQUU7SUFDUixjQUFjO0lBQ2QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE1BQU0sRUFBRTtRQUNOLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxFQUFFO1lBQ1IsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxjQUFjO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUVELElBQUksRUFBRSxFQUFFO0tBQ1Q7SUFFRCxTQUFTLEVBQUU7UUFDVCxLQUFLLEVBQUU7UUFDTCw0RkFBNEY7UUFDNUYsNkZBQTZGO1NBQzlGO0tBQ0Y7SUFDRCxLQUFLLEVBQUUsRUFBRTtJQUNULFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxvQkFBb0I7S0FDNUI7SUFDRCxRQUFRLEVBQUU7SUFDUixnQ0FBZ0M7S0FDakM7SUFDRCxLQUFLLEVBQUUsRUFBRTtJQUNULGlCQUFpQjtJQUNqQixjQUFjLEVBQUU7UUFDZCxZQUFZLEVBQUUsR0FBRztLQUNsQjtJQUVELE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsU0FBUyxFQUFFLHlCQUF5QjtJQUVwQyxXQUFXO0lBQ1gsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxXQUFXO0lBQ1gsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixXQUFXO0lBQ1gsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLG1CQUFtQjtLQUM5QjtJQUNELFVBQVU7SUFDVixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFNBQVMsRUFBRSx3QkFBd0I7UUFDbkMsU0FBUyxFQUFFLHdCQUF3QjtRQUNuQyxVQUFVLEVBQUUseUJBQXlCO1FBQ3JDLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxVQUFVLEVBQUUsd0JBQXdCO1FBQ3BDLEtBQUssRUFBRSwyQkFBMkI7UUFDbEMsS0FBSyxFQUFFO1lBQ0wsR0FBRyxFQUFFLHdCQUF3QjtZQUM3QixLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLFNBQVMsRUFBRSw4QkFBOEI7WUFDekMsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUsMEJBQTBCO1NBQ2xDO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE9BQU87S0FDZDtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUscUJBQXFCO0tBQ2pDO0lBQ0QsUUFBUTtJQUNSLEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixNQUFNLEVBQUUseUJBQXlCO1FBQ2pDLEtBQUssRUFBRSxRQUFRO1FBQ2YsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixLQUFLLEVBQUUsdUJBQXVCO0tBQy9CO0lBRUQsWUFBWSxFQUFFO1FBQ1osZ0JBQWdCLEVBQUUsc0NBQXNDO1FBQ3hELG1CQUFtQixFQUFFLDZCQUE2QjtLQUNuRDtDQUNGLENBQUM7QUFDRiw2Q0FBNkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUmVzID0ge1xyXG4gIGZvbnQ6IHt9LFxyXG4gIC8vIHNwcml0ZWZyYW1lXHJcbiAgdGV4dHVyZToge1xyXG4gICAgdmlld3M6IHt9LFxyXG4gIH0sXHJcbiAgcHJlZmFiOiB7XHJcbiAgICB2dzoge1xyXG4gICAgICBob21lOiB7fSxcclxuICAgICAgdGlwOiB7XHJcbiAgICAgICAgd2FpdDogXCJ0aXAvV2FpdEN0cmxcIixcclxuICAgICAgfSxcclxuICAgICAgZmlnaHQ6IHt9LFxyXG4gICAgfSxcclxuXHJcbiAgICBpdGVtOiB7fSxcclxuICB9LFxyXG5cclxuICBhbmltYXRpb246IHtcclxuICAgIGt1YW5nOiB7XHJcbiAgICAgIC8vIGt1YW5nMTogeyBwYXRoOiBcImZyYW1lcy92aWV3cy9rdWFuZ0FuaTFcIiwgYW5pTmFtZTogJ2t1YW5nJywgcHJlZml4OiAnS18nLCBudW1iZXJGaXg6IDQgfSxcclxuICAgICAgLy8ga3VhbmcyOiB7IHBhdGg6IFwiZnJhbWVzL3ZpZXdzL2t1YW5nQW5pMlwiLCBhbmlOYW1lOiAna3VhbmcnLCBwcmVmaXg6ICdLMl8nLCBudW1iZXJGaXg6IDQgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzcGluZToge30sXHJcbiAgZHJhZ29uQm9uZXM6IHtcclxuICAgIGd1aWRlOiBcImRyYWdvbi9zcF9zaG91emhpX1wiLFxyXG4gIH0sXHJcbiAgbWF0ZXJpYWw6IHtcclxuICAgIC8vIHVpZ3VpZGU6ICdtYXRlcmlhbHMvdWktZ3VpZGUnXHJcbiAgfSxcclxuICBhdWRpbzoge30sXHJcbiAgLy8g6Lev5b6E57Si5byV57uf5LiA5Lit5b+D5L2N572u5L+u5aSN6YWN572uXHJcbiAgcG9zaXRpb25PZmZzZXQ6IHtcclxuICAgIGludmFsaWRDbGljazogXCIxXCIsXHJcbiAgfSxcclxuXHJcbiAgbWFwQ3RybDogXCJjb21tb25QcmVmYWIvbWFwL01hcEN0cmxcIixcclxuICBtYXBQbGF5ZXI6IFwiY29tbW9uUHJlZmFiL21hcC9QbGF5ZXJcIixcclxuXHJcbiAgLyoq5Yqg6L296aG15qih5Z2XICovXHJcbiAgbG9hZEN0cmw6IFwiY29tbW9uL2xvYWRDdHJsL0xvYWRDdHJsXCIsXHJcbiAgLyoq5p+Q55m96Imy5Zu+54mHICovXHJcbiAgc2luZ2xlOiBcInJlc291cmNlcy9zaW5nbGVDb2xvclwiLFxyXG4gIC8qKuS4u+eVjOmdouaooeWdlyAqL1xyXG4gIGhvbWVDdHJsOiB7XHJcbiAgICBob21lQ3RybDogXCJob21lQ3RybC9Ib21lQ3RybFwiLFxyXG4gIH0sXHJcbiAgLyoq5YWs5YWx5qih5Z2XICovXHJcbiAgY29tbW9uOiB7XHJcbiAgICB0b2FzdDogXCJjb21tb24vdGlwL1RvYXN0Q3RybFwiLFxyXG4gICAgdG9wVWlJdGVtOiBcImNvbW1vblByZWZhYi9Ub3BVaUl0ZW1cIixcclxuICAgIGZyYW1lSXRlbTogXCJjb21tb25QcmVmYWIvRnJhbWVJdGVtXCIsXHJcbiAgICByZXdhcmRDdHJsOiBcImNvbW1vblByZWZhYi9SZXdhcmRDdHJsXCIsXHJcbiAgICBKWEl0ZW06IFwiY29tbW9uUHJlZmFiL0pYSXRlbVwiLFxyXG4gICAgbnBjSGVhZDogXCJjb21tb25QcmVmYWIvdmlld3MvbnBjSGVhZFwiLFxyXG4gICAgZ3VpZGVfaXRlbTogXCJjb21tb24vZ3VpZGUvR3VpZGVOb2RlXCIsXHJcbiAgICBndWlkZTogXCJjb21tb24vZHJhZ29uL3NwX3Nob3V6aGlfXCIsXHJcbiAgICBhdWRpbzoge1xyXG4gICAgICBiZ206IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2JnbVwiLCAvL1xyXG4gICAgICBiYW96YTogXCJjb21tb25QcmVmYWIvYXVkaW8vYmFvemFcIiwgLy9cclxuICAgICAgYnV0dG9uOiBcImNvbW1vblByZWZhYi9hdWRpby9idXR0b25cIiwgLy9cclxuICAgICAgZmFpbDogXCJjb21tb25QcmVmYWIvYXVkaW8vZmFpbFwiLCAvL1xyXG4gICAgICBmYXNoZTogXCJjb21tb25QcmVmYWIvYXVkaW8vZmFzaGVcIiwgLy9cclxuICAgICAgZmVpamk6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2ZlaWppXCIsIC8vXHJcbiAgICAgIGZlaXhpbmc6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL2ZlaXhpbmdcIiwgLy9cclxuICAgICAgaG91dHVpOiBcImNvbW1vblByZWZhYi9hdWRpby9ob3V0dWlcIiwgLy9cclxuICAgICAgYmFvemExOiBcImNvbW1vblByZWZhYi9hdWRpby9iYW96YTFcIixcclxuICAgICAgcGFvdGFpOiBcImNvbW1vblByZWZhYi9hdWRpby9wYW90YWlcIiwgLy9cclxuICAgICAgcmV3YXJkOiBcImNvbW1vblByZWZhYi9hdWRpby9yZXdhcmRcIiwgLy9cclxuICAgICAgc3RhcjogXCJjb21tb25QcmVmYWIvYXVkaW8vc3RhclwiLCAvL1xyXG4gICAgICBzdWNjZXNzOiBcImNvbW1vblByZWZhYi9hdWRpby9zdWNjZXNzXCIsIC8vXHJcbiAgICAgIHRvdXppOiBcImNvbW1vblByZWZhYi9hdWRpby90b3V6aVwiLCAvL1xyXG4gICAgICB6aHVhbmdmZWk6IFwiY29tbW9uUHJlZmFiL2F1ZGlvL3podWFuZ2ZlaVwiLCAvL1xyXG4gICAgICBzdWlrdWFpOiBcImNvbW1vblByZWZhYi9hdWRpby9zdWlrdWFpXCIsXHJcbiAgICAgIHNtaWxlOiBcImNvbW1vblByZWZhYi9hdWRpby9zbWlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8qKuaVsOaNruaooeWdlyAqL1xyXG4gIGRhdGE6IHtcclxuICAgIGRhdGE6IFwiZGF0YS9cIixcclxuICB9LFxyXG4gIC8qKuWMuemFjeeVjOmdoiAqL1xyXG4gIE1hdGNoQ3RybDoge1xyXG4gICAgTWF0Y2hDdHJsOiBcIk1hdGNoQ3RybC9NYXRjaEN0cmxcIixcclxuICB9LFxyXG4gIC8qKuaImOaWlyAqL1xyXG4gIGZpZ2h0OiB7XHJcbiAgICBmaWdodEN0cmw6IFwiZmlnaHQvcHJlZmFiL0JhdHRsZVZpZXdDdHJsXCIsXHJcbiAgICByb2xlOiBcImZpZ2h0L3ByZWZhYi9KWFJvbGVcIixcclxuICAgIHBsYXllcjogXCJmaWdodC9wcmVmYWIvSlhSQlBsYXllclwiLFxyXG4gICAgcGxhbmU6IFwiZmlnaHQvXCIsXHJcbiAgICBzaGFpemk6IFwiZmlnaHQvZWZmZWN0L3NoYWl6aVwiLFxyXG4gICAgZmlnaHQ6IFwiZmlnaHQvdmlld3MvZmlnaHRQYWdlXCIsXHJcbiAgfSxcclxuXHJcbiAgZ2FtZU92ZXJDdHJsOiB7XHJcbiAgICBiYXR0bGVSZXN1bHRDdHJsOiBcImdhbWVPdmVyQ3RybC9wcmVmYWIvQmF0dGxlUmVzdWx0Q3RybFwiLFxyXG4gICAgYmF0dGxlUmVzdWx0Q3RybEltZzogXCJnYW1lT3ZlckN0cmwvdmlld3MvZ2FtZU92ZXJcIixcclxuICB9LFxyXG59O1xyXG4vL0dBc3NldEltcGwubG9hZGVyLnRleHR1cmVSZXMgPSBSZXMudGV4dHVyZTtcclxuIl19