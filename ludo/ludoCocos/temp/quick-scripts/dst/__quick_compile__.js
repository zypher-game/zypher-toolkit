
(function () {
var scripts = [{"deps":{"./assets/Script/tyq/view/CrazyBox":5,"./assets/Script/Core/GView/GCustomData":6,"./assets/Script/Core/Math/MathEx":9,"./assets/Script/Core/CoreDefine":12,"./assets/Script/Core/GNet/GHttpClient":14,"./assets/Script/Core/utils/setBgFit":18,"./assets/Script/conventions/JXCommon":19,"./assets/Script/Core/BaseFSM/HtmlTextParser":21,"./assets/Script/Core/GView/IrregularTrigger":27,"./assets/Script/Core/Manager/type":35,"./assets/Script/conventions/EnumUtil":41,"./assets/Script/Core/Manager/MaskUtil":44,"./assets/Script/Game/Common/UIAction":47,"./assets/Script/Game/Common/Zh":52,"./assets/Script/Game/Guide/Guide.type":53,"./assets/Script/Game/Common/JXColor":57,"./assets/Script/Game/Views/ViewUtil/ToggleSwitcher":58,"./assets/Script/Game/Common/UIResources":64,"./assets/Script/Game/Views/Fight/JXULDefine":78,"./assets/Script/Game/Views/ViewUtil/type":90,"./assets/Script/Core/FrameEx/AnimationEvent":96,"./assets/Script/Core/FrameEx/CCMaskProgressBar":98,"./assets/Script/Core/FrameEx/ColorAssembler2D":100,"./assets/Script/Core/FrameEx/CCSliderEx":101,"./assets/Script/Core/FrameEx/ES5Ex":105,"./assets/Script/Core/FrameEx/ColorLog":111,"./assets/Script/Shaders/Manager/ShaderUtil":2,"./assets/Script/Core/GEvent/GEventSystem":3,"./assets/Script/Game/Data/Static/SGuideStepData":1,"./assets/Script/Core/GLoader/GLoader":7,"./assets/Script/Core/Manager/DataPool":8,"./assets/Script/Shaders/SLTextShowShader":39,"./assets/Script/Core/GCtrl":42,"./assets/Script/Shaders/SLGuideShader":43,"./assets/Script/Shaders/SLTransitions":50,"./assets/Script/Game/Guide/GuideComponent":10,"./assets/Script/Game/Logic/ConditionListener":11,"./assets/Script/Core/GView/GPage":22,"./assets/Script/Core/GView/GViewBase":23,"./assets/Script/Core/GView/GTimerComponent":24,"./assets/Script/Core/GView/GViewDestory":25,"./assets/Script/Core/GView/GChild":26,"./assets/Script/Game/GM/GMCtrl":28,"./assets/Script/Core/GView/GListView":29,"./assets/Script/Core/GView/GPageView":30,"./assets/Script/Core/Manager/GTimerMgr":31,"./assets/Script/Core/Manager/GNodePool":32,"./assets/Script/Core/Manager/RedPointLogicMgr":33,"./assets/Script/Core/Manager/UIMgr":34,"./assets/Script/Core/Manager/AudioMgr":36,"./assets/Script/Core/GView/GScrollView":37,"./assets/Script/Game/Common/Language":40,"./assets/Script/Game/Common/TimeUtils":45,"./assets/Script/Game/Common/UICreate":46,"./assets/Script/Game/Common/UI":48,"./assets/Script/Game/Guide/GuideLogic":49,"./assets/Script/Game/Common/Define":51,"./assets/Script/Game/Logic/MapMgr":54,"./assets/Script/Game/Logic/ToastMgr":55,"./assets/Script/Game/Logic/RobotGradeMgr":56,"./assets/Script/Game/Data/Locals/LRobotGrade":13,"./assets/Script/Game/Logic/GameMgr":59,"./assets/Script/Game/Logic/AccountMgr":60,"./assets/Script/Game/Views/Home/handle/WalletConnectNode":4,"./assets/Script/Game/Views/Fight/BtlFighltLayer":15,"./assets/Script/Game/Views/StartGame/AppStart":16,"./assets/Script/Game/Views/Tip/WaitCtrl":17,"./assets/Script/Game/Views/Map/MapStartCtrl":20,"./assets/Script/Game/Views/Common/HangPage":38,"./assets/Script/Game/Data/Static/SLevelRewardData":61,"./assets/Script/Game/Data/Static/SSystemConfig":62,"./assets/Script/Game/Data/Static/SRankRewardData":63,"./assets/Script/Game/Data/Locals/LUserData":65,"./assets/Script/Game/Data/Static/SGuideChainData":66,"./assets/Script/Game/Views/Fight/BtlMapElement":67,"./assets/Script/Game/Views/Fight/JXBattleUtility":68,"./assets/Script/Game/Views/Fight/BtlMapParser":69,"./assets/Script/Game/Views/Fight/JXRBCmdMgr":70,"./assets/Script/Game/Data/Static/SPlaneData":72,"./assets/Script/Game/Data/Static/SNpcData":71,"./assets/Script/Game/Views/Fight/JXRBPlayer":73,"./assets/Script/Game/Views/Fight/JXRBRole":74,"./assets/Script/Game/Data/Static/SRankData":75,"./assets/Script/Game/Views/Fight/JXULAssets":76,"./assets/Script/Game/Views/Fight/PlayerNumber":77,"./assets/Script/Game/Views/Home/BattleResultCtrl":79,"./assets/Script/Game/Views/Fight/BtlCameraMap":80,"./assets/Script/Game/Views/Home/LoadCtrl":81,"./assets/Script/Game/Views/Home/TaskCtrl":82,"./assets/Script/Game/Views/Home/HomeCtrl":83,"./assets/Script/Game/Data/Static/SLevelData":84,"./assets/Script/Game/Views/ViewUtil/UIModeAction":85,"./assets/Script/Game/Views/ViewUtil/VIewUtil":86,"./assets/Script/Game/Views/Home/MatchCtrl":87,"./assets/Script/Game/Views/StartGame/AppCtrl":88,"./assets/Script/Game/Views/ViewUtil/JumpUtil":89,"./assets/Script/Game/Views/Tip/ToastCtrl":91,"./assets/Script/Game/Views/StartGame/messageListener":93,"./assets/Script/Game/Views/Map/MapStart":94,"./assets/Script/Game/Views/ViewUtil/preventClicks":95,"./assets/Script/Game/Views/Home/handle/AccountCenterNode":92,"./assets/Script/Core/FrameEx/CCNodeImpl":99,"./assets/Script/Core/FrameEx/CanvasEx":102,"./assets/Script/Core/FrameEx/CCMaskProgressMoreBar":103,"./assets/Script/Core/BaseFSM/FiniteStateMachine":97,"./assets/Script/Core/FrameEx/CCEx":104,"./assets/Script/Core/FrameEx/MaskSprite":106,"./assets/Script/Core/FrameEx/GLongTouch":107,"./assets/Script/Core/FrameEx/GDrag":108,"./assets/Script/Core/FrameEx/GComponent":109,"./assets/Script/Core/GEvent/GParam":110,"./assets/Script/Core/FrameEx/PlistLabel":112,"./assets/Script/Core/FrameEx/ActionEx":113},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SGuideStepData.js"},{"deps":{"../../Core/GLoader/GLoader":7,"./../../Game/Views/ViewUtil/VIewUtil":86},"path":"preview-scripts/assets/Script/Shaders/Manager/ShaderUtil.js"},{"deps":{"../FrameEx/ES5Ex":105},"path":"preview-scripts/assets/Script/Core/GEvent/GEventSystem.js"},{"deps":{"../../../Logic/AccountMgr":60},"path":"preview-scripts/assets/Script/Game/Views/Home/handle/WalletConnectNode.js"},{"deps":{},"path":"preview-scripts/assets/Script/tyq/view/CrazyBox.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GView/GCustomData.js"},{"deps":{"../../Game/Common/UIResources":64,"../CoreDefine":12,"../FrameEx/ES5Ex":105,"../Manager/UIMgr":34,"../Math/MathEx":9},"path":"preview-scripts/assets/Script/Core/GLoader/GLoader.js"},{"deps":{"../../Game/Common/UIResources":64,"../CoreDefine":12,"../GCtrl":42,"../FrameEx/ES5Ex":105,"../GLoader/GLoader":7},"path":"preview-scripts/assets/Script/Core/Manager/DataPool.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Math/MathEx.js"},{"deps":{"../../Core/CoreDefine":12,"../../Core/FrameEx/GDrag":108,"../../Core/FrameEx/GComponent":109,"../../Core/FrameEx/GLongTouch":107,"../../Core/GLoader/GLoader":7,"../../Core/GView/IrregularTrigger":27,"../../Core/Manager/AudioMgr":36,"../../Core/Math/MathEx":9,"../Common/UIResources":64,"./../../Core/GCtrl":42,"./GuideLogic":49},"path":"preview-scripts/assets/Script/Game/Guide/GuideComponent.js"},{"deps":{"../../Core/CoreDefine":12,"../../Core/FrameEx/ES5Ex":105,"../../Core/GCtrl":42},"path":"preview-scripts/assets/Script/Game/Logic/ConditionListener.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/CoreDefine.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/Manager/DataPool":8,"../../../Core/Math/MathEx":9,"../../Common/Define":51,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Data/Locals/LRobotGrade.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GNet/GHttpClient.js"},{"deps":{"../../../Core/GView/GChild":26,"../../Common/Define":51,"../../Logic/GameMgr":59,"./JXRBCmdMgr":70,"./JXULDefine":78,"../../Common/UI":48},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlFighltLayer.js"},{"deps":{"../../Common/UI":48,"../../../Core/FrameEx/GComponent":109,"../../Logic/GameMgr":59,"../../Common/UIResources":64,"./../../Common/Define":51,"./../../Common/UI":48,"./../../Logic/ToastMgr":55,"./AppCtrl":88},"path":"preview-scripts/assets/Script/Game/Views/StartGame/AppStart.js"},{"deps":{"../../../Core/GView/GViewBase":23},"path":"preview-scripts/assets/Script/Game/Views/Tip/WaitCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/utils/setBgFit.js"},{"deps":{},"path":"preview-scripts/assets/Script/conventions/JXCommon.js"},{"deps":{"../../../Core/FrameEx/GComponent":109},"path":"preview-scripts/assets/Script/Game/Views/Map/MapStartCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/BaseFSM/HtmlTextParser.js"},{"deps":{"./GChild":26},"path":"preview-scripts/assets/Script/Core/GView/GPage.js"},{"deps":{"../FrameEx/GComponent":109,"../utils/setBgFit":18,"../GCtrl":42},"path":"preview-scripts/assets/Script/Core/GView/GViewBase.js"},{"deps":{"../../Game/Common/UICreate":46,"../GCtrl":42},"path":"preview-scripts/assets/Script/Core/GView/GTimerComponent.js"},{"deps":{"../GCtrl":42},"path":"preview-scripts/assets/Script/Core/GView/GViewDestory.js"},{"deps":{"../FrameEx/GComponent":109,"../GCtrl":42,"../GLoader/GLoader":7,"./GCustomData":6},"path":"preview-scripts/assets/Script/Core/GView/GChild.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GView/IrregularTrigger.js"},{"deps":{"../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/GM/GMCtrl.js"},{"deps":{"../Manager/AudioMgr":36,"../CoreDefine":12,"./GChild":26,"./GViewDestory":25},"path":"preview-scripts/assets/Script/Core/GView/GListView.js"},{"deps":{"../CoreDefine":12,"./GViewBase":23},"path":"preview-scripts/assets/Script/Core/GView/GPageView.js"},{"deps":{"../GCtrl":42},"path":"preview-scripts/assets/Script/Core/Manager/GTimerMgr.js"},{"deps":{"../FrameEx/ES5Ex":105},"path":"preview-scripts/assets/Script/Core/Manager/GNodePool.js"},{"deps":{"../../Game/Common/Define":51,"../CoreDefine":12,"../FrameEx/ES5Ex":105,"../GCtrl":42,"../GLoader/GLoader":7},"path":"preview-scripts/assets/Script/Core/Manager/RedPointLogicMgr.js"},{"deps":{"../../Game/Common/UIResources":64,"../CoreDefine":12,"../FrameEx/ES5Ex":105,"../FrameEx/GComponent":109,"../GView/GViewBase":23,"../GLoader/GLoader":7,"../GView/GViewDestory":25,"./../GCtrl":42,"./AudioMgr":36},"path":"preview-scripts/assets/Script/Core/Manager/UIMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Manager/type.js"},{"deps":{"../GLoader/GLoader":7},"path":"preview-scripts/assets/Script/Core/Manager/AudioMgr.js"},{"deps":{"../FrameEx/ES5Ex":105,"./GViewDestory":25},"path":"preview-scripts/assets/Script/Core/GView/GScrollView.js"},{"deps":{"../../../Core/FrameEx/ColorLog":111,"../../Common/UI":48,"../../../Core/GCtrl":42,"../../Common/Define":51,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/Common/HangPage.js"},{"deps":{"../Core/FrameEx/GComponent":109},"path":"preview-scripts/assets/Script/Shaders/SLTextShowShader.js"},{"deps":{"./Zh":52},"path":"preview-scripts/assets/Script/Game/Common/Language.js"},{"deps":{},"path":"preview-scripts/assets/Script/conventions/EnumUtil.js"},{"deps":{"./GEvent/GEventSystem":3,"./GEvent/GParam":110,"./GLoader/GLoader":7,"./Manager/GTimerMgr":31},"path":"preview-scripts/assets/Script/Core/GCtrl.js"},{"deps":{"../Core/FrameEx/GComponent":109},"path":"preview-scripts/assets/Script/Shaders/SLGuideShader.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Manager/MaskUtil.js"},{"deps":{"../../conventions/JXCommon":19,"./../../Core/GCtrl":42},"path":"preview-scripts/assets/Script/Game/Common/TimeUtils.js"},{"deps":{"../../Core/CoreDefine":12,"../../Core/FrameEx/MaskSprite":106,"../../Core/FrameEx/PlistLabel":112,"../../Core/GCtrl":42,"../../Core/GLoader/GLoader":7,"../Guide/GuideComponent":10,"./JXColor":57,"./UIResources":64},"path":"preview-scripts/assets/Script/Game/Common/UICreate.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UIAction.js"},{"deps":{"../../conventions/JXCommon":19,"../../Core/CoreDefine":12,"../../Core/Manager/UIMgr":34,"../../Core/FrameEx/ES5Ex":105,"./UIResources":64},"path":"preview-scripts/assets/Script/Game/Common/UI.js"},{"deps":{"../../Core/CoreDefine":12,"../../Core/FrameEx/ColorLog":111,"../../Core/FrameEx/ES5Ex":105,"../../Core/GLoader/GLoader":7,"../Common/UIAction":47,"../Common/UIResources":64,"../Logic/GameMgr":59,"./../../Core/GCtrl":42,"./../Common/Define":51,"./../Logic/ConditionListener":11,"./GuideComponent":10},"path":"preview-scripts/assets/Script/Game/Guide/GuideLogic.js"},{"deps":{"../Core/GLoader/GLoader":7,"../Core/FrameEx/GComponent":109,"../Game/Common/JXColor":57,"../Game/Common/UIAction":47},"path":"preview-scripts/assets/Script/Shaders/SLTransitions.js"},{"deps":{"./../../Core/CoreDefine":12},"path":"preview-scripts/assets/Script/Game/Common/Define.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/Zh.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Guide/Guide.type.js"},{"deps":{"./../../Core/CoreDefine":12,"./../../Core/FrameEx/ES5Ex":105},"path":"preview-scripts/assets/Script/Game/Logic/MapMgr.js"},{"deps":{"../../Core/CoreDefine":12,"../../Core/FrameEx/ColorLog":111,"../../Core/FrameEx/ES5Ex":105,"../../Core/GCtrl":42,"../../Core/GLoader/GLoader":7,"../Common/Define":51,"../Common/Language":40,"../Common/UI":48,"../Common/UIResources":64,"../Views/Tip/ToastCtrl":91,"./GameMgr":59},"path":"preview-scripts/assets/Script/Game/Logic/ToastMgr.js"},{"deps":{"../Common/Define":51},"path":"preview-scripts/assets/Script/Game/Logic/RobotGradeMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/JXColor.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/ToggleSwitcher.js"},{"deps":{"../../conventions/JXCommon":19,"../../Core/CoreDefine":12,"../../Core/FrameEx/ES5Ex":105,"../../Core/Manager/GTimerMgr":31,"../../Core/Manager/RedPointLogicMgr":33,"../../Core/Manager/UIMgr":34,"../Common/Define":51,"../Common/UI":48,"../Data/Locals/LRobotGrade":13,"../Data/Locals/LUserData":65,"../Data/Static/SGuideStepData":1,"../Data/Static/SGuideChainData":66,"../Data/Static/SLevelData":84,"../Data/Static/SLevelRewardData":61,"../Data/Static/SNpcData":71,"../Data/Static/SPlaneData":72,"../Data/Static/SRankData":75,"../Data/Static/SRankRewardData":63,"../Data/Static/SSystemConfig":62,"../Guide/GuideLogic":49,"../Views/ViewUtil/JumpUtil":89,"./../../Core/GCtrl":42,"./../../Core/Manager/DataPool":8,"./MapMgr":54},"path":"preview-scripts/assets/Script/Game/Logic/GameMgr.js"},{"deps":{"../../Core/FrameEx/ES5Ex":105,"../../Core/GCtrl":42},"path":"preview-scripts/assets/Script/Game/Logic/AccountMgr.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SLevelRewardData.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SSystemConfig.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SRankRewardData.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UIResources.js"},{"deps":{"../../../conventions/JXCommon":19,"../../../Core/GCtrl":42,"../../../Core/CoreDefine":12,"../../Common/Define":51,"../../../Core/Manager/DataPool":8,"../../Common/Language":40,"../../Common/TimeUtils":45,"../../Common/Zh":52,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Data/Locals/LUserData.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SGuideChainData.js"},{"deps":{"../../../Core/FrameEx/ES5Ex":105,"../../Common/Define":51,"../../Common/UIResources":64},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlMapElement.js"},{"deps":{"./JXULDefine":78},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXBattleUtility.js"},{"deps":{"../../../Core/FrameEx/ES5Ex":105,"./../../Common/Define":51},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlMapParser.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/FrameEx/ActionEx":113,"../../../Core/FrameEx/ES5Ex":105,"../../../Core/GCtrl":42,"../../../Core/GEvent/GEventSystem":3,"../../../Core/Math/MathEx":9,"../../Common/Define":51,"../../Common/UIResources":64,"../../Logic/GameMgr":59,"./BtlFighltLayer":15,"./JXBattleUtility":68,"./JXRBPlayer":73,"./JXULDefine":78,"./JXRBRole":74},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBCmdMgr.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SNpcData.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SPlaneData.js"},{"deps":{"../../../conventions/JXCommon":19,"../../../Core/CoreDefine":12,"../../../Core/FrameEx/ColorLog":111,"../../../Core/FrameEx/ES5Ex":105,"../../../Core/GEvent/GParam":110,"../../../Core/GView/GChild":26,"../../../Core/GCtrl":42,"../../../Core/Manager/AudioMgr":36,"../../../Core/Math/MathEx":9,"../../Common/Define":51,"../../Common/UIResources":64,"../../Guide/GuideComponent":10,"../../Logic/GameMgr":59,"./JXULDefine":78,"./PlayerNumber":77,"../ViewUtil/VIewUtil":86},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBPlayer.js"},{"deps":{"../../../Core/BaseFSM/FiniteStateMachine":97,"../../../Core/CoreDefine":12,"../../../Core/FrameEx/ActionEx":113,"../../../Core/FrameEx/CCNodeImpl":99,"../../../Core/GEvent/GParam":110,"../../../Core/Manager/AudioMgr":36,"../../../Core/Math/MathEx":9,"../../Common/Define":51,"../../Common/UIResources":64,"./JXRBPlayer":73,"./JXULDefine":78},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBRole.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SRankData.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/FrameEx/ES5Ex":105,"../../../Core/GLoader/GLoader":7,"../../Common/UIResources":64,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXULAssets.js"},{"deps":{"./JXULDefine":78},"path":"preview-scripts/assets/Script/Game/Views/Fight/PlayerNumber.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXULDefine.js"},{"deps":{"../../../Core/GCtrl":42,"../../../Core/GView/GViewBase":23,"../../../Core/Manager/AudioMgr":36,"../../Common/Define":51,"../../Common/Language":40,"../../Common/UI":48,"../../Common/UIResources":64,"../../Common/Zh":52,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/Home/BattleResultCtrl.js"},{"deps":{"../../../Core/FrameEx/ES5Ex":105,"../../../Core/GCtrl":42,"../../../Core/FrameEx/ColorLog":111,"../../../Core/GView/GViewBase":23,"../../../Core/Manager/GNodePool":32,"../../Common/Define":51,"../../Common/UI":48,"../../Logic/GameMgr":59,"./BtlFighltLayer":15},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlCameraMap.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/GView/GViewBase":23,"../../../Core/Manager/AudioMgr":36,"../../../Core/Manager/UIMgr":34,"../../Common/Language":40,"../../Common/UI":48,"../../Logic/GameMgr":59,"../Fight/JXULAssets":76,"../Fight/JXULDefine":78,"./../../../conventions/JXCommon":19,"./../../../Core/GCtrl":42,"./../../Common/Define":51,"./../../Common/UIResources":64,"./../../Common/Zh":52},"path":"preview-scripts/assets/Script/Game/Views/Home/LoadCtrl.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/FrameEx/ColorLog":111,"../../../Core/GCtrl":42,"../../../Core/GView/GChild":26,"../../Common/Define":51,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/Home/TaskCtrl.js"},{"deps":{"../../../Core/CoreDefine":12,"../../../Core/GCtrl":42,"../../../Core/GView/GViewBase":23,"../../Common/UI":48,"../../Logic/AccountMgr":60,"../../Logic/GameMgr":59,"./handle/AccountCenterNode":92,"./handle/WalletConnectNode":4},"path":"preview-scripts/assets/Script/Game/Views/Home/HomeCtrl.js"},{"deps":{"../../../Core/Manager/DataPool":8},"path":"preview-scripts/assets/Script/Game/Data/Static/SLevelData.js"},{"deps":{"../../../Core/FrameEx/GComponent":109,"../../../Core/GCtrl":42},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/UIModeAction.js"},{"deps":{"../../../Core/FrameEx/ColorLog":111,"../../Common/UIAction":47,"./../../../Core/GCtrl":42,"./../../Common/Language":40},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/VIewUtil.js"},{"deps":{"../../../Core/GView/GViewBase":23,"../../Common/UI":48,"../../Common/UIResources":64,"../../Logic/GameMgr":59,"../Fight/JXULAssets":76},"path":"preview-scripts/assets/Script/Game/Views/Home/MatchCtrl.js"},{"deps":{"../../../Core/FrameEx/GComponent":109},"path":"preview-scripts/assets/Script/Game/Views/StartGame/AppCtrl.js"},{"deps":{"../../../Core/GCtrl":42,"../../../Core/FrameEx/ES5Ex":105,"../../../Shaders/Manager/ShaderUtil":2,"../../Common/UI":48,"../../Logic/ConditionListener":11,"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/JumpUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/type.js"},{"deps":{"../../../Core/FrameEx/MaskSprite":106,"../../../Core/GView/GChild":26},"path":"preview-scripts/assets/Script/Game/Views/Tip/ToastCtrl.js"},{"deps":{"../../../Logic/AccountMgr":60},"path":"preview-scripts/assets/Script/Game/Views/Home/handle/AccountCenterNode.js"},{"deps":{"../../../Core/FrameEx/GComponent":109},"path":"preview-scripts/assets/Script/Game/Views/StartGame/messageListener.js"},{"deps":{"../../../Core/FrameEx/GComponent":109,"../../Common/UI":48,"../../Common/UIResources":64,"./../../Common/Define":51,"./../../Common/UI":48,"../../Logic/GameMgr":59,"./../../Logic/ToastMgr":55,"./MapStartCtrl":20},"path":"preview-scripts/assets/Script/Game/Views/Map/MapStart.js"},{"deps":{"../../Logic/GameMgr":59},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/preventClicks.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/AnimationEvent.js"},{"deps":{"../CoreDefine":12,"../FrameEx/ES5Ex":105},"path":"preview-scripts/assets/Script/Core/BaseFSM/FiniteStateMachine.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressBar.js"},{"deps":{"./ES5Ex":105},"path":"preview-scripts/assets/Script/Core/FrameEx/CCNodeImpl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ColorAssembler2D.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/CCSliderEx.js"},{"deps":{"../GCtrl":42},"path":"preview-scripts/assets/Script/Core/FrameEx/CanvasEx.js"},{"deps":{"../GLoader/GLoader":7},"path":"preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressMoreBar.js"},{"deps":{"../Manager/AudioMgr":36},"path":"preview-scripts/assets/Script/Core/FrameEx/CCEx.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ES5Ex.js"},{"deps":{"../CoreDefine":12},"path":"preview-scripts/assets/Script/Core/FrameEx/MaskSprite.js"},{"deps":{"../Manager/AudioMgr":36},"path":"preview-scripts/assets/Script/Core/FrameEx/GLongTouch.js"},{"deps":{"../CoreDefine":12,"../Manager/AudioMgr":36,"../Manager/UIMgr":34,"./GComponent":109},"path":"preview-scripts/assets/Script/Core/FrameEx/GDrag.js"},{"deps":{"../GLoader/GLoader":7},"path":"preview-scripts/assets/Script/Core/FrameEx/GComponent.js"},{"deps":{"../FrameEx/ES5Ex":105},"path":"preview-scripts/assets/Script/Core/GEvent/GParam.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ColorLog.js"},{"deps":{"../BaseFSM/HtmlTextParser":21},"path":"preview-scripts/assets/Script/Core/FrameEx/PlistLabel.js"},{"deps":{"../Math/MathEx":9},"path":"preview-scripts/assets/Script/Core/FrameEx/ActionEx.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    