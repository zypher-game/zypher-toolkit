
(function () {
var scripts = [{"deps":{"./assets/Script/Core/BaseFSM/FiniteStateMachine":22,"./assets/Script/Core/BaseFSM/HtmlTextParser":91,"./assets/Script/Core/FrameEx/CCEx":95,"./assets/Script/Core/FrameEx/AnimationEvent":101,"./assets/Script/Core/FrameEx/CCMaskProgressBar":107,"./assets/Script/Core/FrameEx/CCMaskProgressMoreBar":96,"./assets/Script/Core/FrameEx/CCNodeImpl":92,"./assets/Script/Core/FrameEx/CCSliderEx":99,"./assets/Script/Core/FrameEx/CanvasEx":93,"./assets/Script/Core/FrameEx/GComponent":98,"./assets/Script/Core/FrameEx/ES5Ex":94,"./assets/Script/Core/FrameEx/GDrag":97,"./assets/Script/Core/FrameEx/ColorLog":102,"./assets/Script/Core/FrameEx/GLongTouch":105,"./assets/Script/Core/FrameEx/PlistLabel":104,"./assets/Script/Core/FrameEx/ColorAssembler2D":88,"./assets/Script/Core/FrameEx/MaskSprite":100,"./assets/Script/Core/FrameEx/ActionEx":103,"./assets/Script/Core/GEvent/GParam":108,"./assets/Script/Core/GEvent/GEventSystem":89,"./assets/Script/Core/GLoader/GLoader":1,"./assets/Script/Core/GView/GCustomData":28,"./assets/Script/Core/GView/GPage":106,"./assets/Script/Core/GView/GListView":21,"./assets/Script/Core/GView/GScrollView":6,"./assets/Script/Core/GView/GPageView":37,"./assets/Script/Core/GView/GTimerComponent":24,"./assets/Script/Core/GView/GViewBase":40,"./assets/Script/Core/GView/GViewDestory":25,"./assets/Script/Core/GView/IrregularTrigger":23,"./assets/Script/Core/GView/GChild":27,"./assets/Script/Core/GNet/GHttpClient":90,"./assets/Script/Core/Manager/GNodePool":35,"./assets/Script/Core/Manager/DataPool":34,"./assets/Script/Core/Manager/GTimerMgr":7,"./assets/Script/Core/Manager/MaskUtil":29,"./assets/Script/Core/Manager/RedPointLogicMgr":31,"./assets/Script/Core/Manager/UIMgr":36,"./assets/Script/Core/Manager/type":30,"./assets/Script/Core/Manager/AudioMgr":32,"./assets/Script/Core/Math/MathEx":8,"./assets/Script/Core/utils/setBgFit":11,"./assets/Script/Shaders/SLGuideShader":38,"./assets/Script/Shaders/SLTransitions":33,"./assets/Script/Shaders/Manager/ShaderUtil":3,"./assets/Script/Shaders/SLTextShowShader":44,"./assets/Script/conventions/JXCommon":43,"./assets/Script/conventions/EnumUtil":10,"./assets/Script/Core/GCtrl":5,"./assets/Script/Game/Common/Language":12,"./assets/Script/Game/Common/TimeUtils":45,"./assets/Script/Game/Common/UI":46,"./assets/Script/Game/Common/UIAction":47,"./assets/Script/Game/Common/UICreate":58,"./assets/Script/Game/Common/UIResources":56,"./assets/Script/Game/Common/Zh":66,"./assets/Script/Game/Common/Define":41,"./assets/Script/Game/GM/GMCtrl":18,"./assets/Script/Game/Guide/GuideComponent":14,"./assets/Script/Game/Guide/GuideLogic":49,"./assets/Script/Game/Guide/Guide.type":48,"./assets/Script/Game/Logic/GameMgr":13,"./assets/Script/Game/Logic/ConditionListener":52,"./assets/Script/Game/Logic/ToastMgr":55,"./assets/Script/Game/Logic/MapMgr":57,"./assets/Script/Game/Logic/RobotGradeMgr":51,"./assets/Script/Game/Data/Locals/LRobotGrade":78,"./assets/Script/Game/Data/Static/SGuideStepData":2,"./assets/Script/Game/Data/Static/SLevelData":60,"./assets/Script/Game/Data/Static/SLevelRewardData":59,"./assets/Script/Game/Data/Static/SNpcData":74,"./assets/Script/Game/Data/Static/SPlaneData":53,"./assets/Script/Game/Data/Static/SRankData":54,"./assets/Script/Game/Data/Static/SRankRewardData":84,"./assets/Script/Game/Data/Static/SSystemConfig":61,"./assets/Script/Game/Data/Static/SGuideChainData":72,"./assets/Script/Game/Data/Locals/LUserData":15,"./assets/Script/Game/Common/JXColor":50,"./assets/Script/Game/Views/Fight/BtlFighltLayer":69,"./assets/Script/Game/Views/Fight/BtlMapElement":65,"./assets/Script/Game/Views/Fight/BtlMapParser":73,"./assets/Script/Game/Views/Fight/JXBattleUtility":4,"./assets/Script/Game/Views/Fight/JXRBCmdMgr":62,"./assets/Script/Game/Views/Fight/JXRBPlayer":64,"./assets/Script/Game/Views/Fight/JXRBRole":68,"./assets/Script/Game/Views/Fight/JXULDefine":75,"./assets/Script/Game/Views/Fight/PlayerNumber":71,"./assets/Script/Game/Views/Fight/JXULAssets":67,"./assets/Script/Game/Views/Fight/BtlCameraMap":63,"./assets/Script/Game/Views/Home/HomeCtrl":110,"./assets/Script/Game/Views/Home/LoadCtrl":16,"./assets/Script/Game/Views/Home/TaskCtrl":85,"./assets/Script/Game/Views/Home/MatchCtrl":77,"./assets/Script/Game/Views/Home/BattleResultCtrl":70,"./assets/Script/Game/Views/StartGame/AppStart":76,"./assets/Script/Game/Views/StartGame/messageListener":109,"./assets/Script/Game/Views/StartGame/AppCtrl":19,"./assets/Script/Game/Views/Map/MapStartCtrl":79,"./assets/Script/Game/Views/Map/MapStart":17,"./assets/Script/Game/Views/Tip/WaitCtrl":20,"./assets/Script/Game/Views/Tip/ToastCtrl":86,"./assets/Script/Game/Views/ViewUtil/ToggleSwitcher":81,"./assets/Script/Game/Views/ViewUtil/UIModeAction":26,"./assets/Script/Game/Views/ViewUtil/preventClicks":87,"./assets/Script/Game/Views/ViewUtil/VIewUtil":80,"./assets/Script/Game/Views/ViewUtil/type":83,"./assets/Script/Game/Views/ViewUtil/JumpUtil":82,"./assets/Script/Game/Views/Common/HangPage":39,"./assets/Script/tyq/view/CrazyBox":9,"./assets/Script/Core/CoreDefine":42},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../Game/Common/UIResources":56,"../Manager/UIMgr":36,"../CoreDefine":42,"../Math/MathEx":8,"../FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Core/GLoader/GLoader.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SGuideStepData.js"},{"deps":{"../../Core/GLoader/GLoader":1,"./../../Game/Views/ViewUtil/VIewUtil":80},"path":"preview-scripts/assets/Script/Shaders/Manager/ShaderUtil.js"},{"deps":{"./JXULDefine":75},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXBattleUtility.js"},{"deps":{"./GEvent/GEventSystem":89,"./GLoader/GLoader":1,"./GEvent/GParam":108,"./Manager/GTimerMgr":7},"path":"preview-scripts/assets/Script/Core/GCtrl.js"},{"deps":{"../FrameEx/ES5Ex":94,"./GViewDestory":25},"path":"preview-scripts/assets/Script/Core/GView/GScrollView.js"},{"deps":{"../GCtrl":5},"path":"preview-scripts/assets/Script/Core/Manager/GTimerMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Math/MathEx.js"},{"deps":{},"path":"preview-scripts/assets/Script/tyq/view/CrazyBox.js"},{"deps":{},"path":"preview-scripts/assets/Script/conventions/EnumUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/utils/setBgFit.js"},{"deps":{"./Zh":66},"path":"preview-scripts/assets/Script/Game/Common/Language.js"},{"deps":{"../../Core/FrameEx/ES5Ex":94,"../../Core/CoreDefine":42,"../../Core/Manager/RedPointLogicMgr":31,"../../Core/Manager/GTimerMgr":7,"../../Core/Manager/UIMgr":36,"../Common/UI":46,"../../conventions/JXCommon":43,"../Data/Static/SGuideStepData":2,"../Data/Locals/LUserData":15,"../Data/Static/SLevelRewardData":59,"../Data/Static/SLevelData":60,"../Data/Static/SNpcData":74,"../Data/Locals/LRobotGrade":78,"../Common/Define":41,"../Data/Static/SGuideChainData":72,"../Data/Static/SRankData":54,"../Data/Static/SPlaneData":53,"../Data/Static/SSystemConfig":61,"../Data/Static/SRankRewardData":84,"../Guide/GuideLogic":49,"../Views/ViewUtil/JumpUtil":82,"./../../Core/Manager/DataPool":34,"./../../Core/GCtrl":5,"./MapMgr":57},"path":"preview-scripts/assets/Script/Game/Logic/GameMgr.js"},{"deps":{"../../Core/CoreDefine":42,"../../Core/FrameEx/GComponent":98,"../../Core/GView/IrregularTrigger":23,"../../Core/FrameEx/GDrag":97,"../../Core/FrameEx/GLongTouch":105,"../../Core/Math/MathEx":8,"./GuideLogic":49,"../Common/UIResources":56,"./../../Core/GCtrl":5,"../../Core/GLoader/GLoader":1,"../../Core/Manager/AudioMgr":32},"path":"preview-scripts/assets/Script/Game/Guide/GuideComponent.js"},{"deps":{"../../../Core/GCtrl":5,"../../Common/Define":41,"../../../Core/CoreDefine":42,"../../Common/Language":12,"../../../Core/Manager/DataPool":34,"../../Common/TimeUtils":45,"../../../conventions/JXCommon":43,"../../Common/Zh":66,"../../Logic/GameMgr":13},"path":"preview-scripts/assets/Script/Game/Data/Locals/LUserData.js"},{"deps":{"../../../Core/CoreDefine":42,"../../../Core/GView/GViewBase":40,"../../Common/Language":12,"../../../Core/Manager/AudioMgr":32,"../../../Core/Manager/UIMgr":36,"../../Common/UI":46,"../../Logic/GameMgr":13,"./../../../conventions/JXCommon":43,"../Fight/JXULAssets":67,"../Fight/JXULDefine":75,"./../../../Core/GCtrl":5,"./../../Common/Zh":66,"./../../Common/Define":41,"./../../Common/UIResources":56},"path":"preview-scripts/assets/Script/Game/Views/Home/LoadCtrl.js"},{"deps":{"../../Common/UI":46,"../../Logic/GameMgr":13,"./../../Common/Define":41,"../../Common/UIResources":56,"./../../Common/UI":46,"./../../Logic/ToastMgr":55,"./MapStartCtrl":79,"../../../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Game/Views/Map/MapStart.js"},{"deps":{"../Logic/GameMgr":13},"path":"preview-scripts/assets/Script/Game/GM/GMCtrl.js"},{"deps":{"../../../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Game/Views/StartGame/AppCtrl.js"},{"deps":{"../../../Core/GView/GViewBase":40},"path":"preview-scripts/assets/Script/Game/Views/Tip/WaitCtrl.js"},{"deps":{"./GViewDestory":25,"../CoreDefine":42,"./GChild":27,"../Manager/AudioMgr":32},"path":"preview-scripts/assets/Script/Core/GView/GListView.js"},{"deps":{"../FrameEx/ES5Ex":94,"../CoreDefine":42},"path":"preview-scripts/assets/Script/Core/BaseFSM/FiniteStateMachine.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GView/IrregularTrigger.js"},{"deps":{"../GCtrl":5,"../../Game/Common/UICreate":58},"path":"preview-scripts/assets/Script/Core/GView/GTimerComponent.js"},{"deps":{"../GCtrl":5},"path":"preview-scripts/assets/Script/Core/GView/GViewDestory.js"},{"deps":{"../../../Core/FrameEx/GComponent":98,"../../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/UIModeAction.js"},{"deps":{"../GCtrl":5,"../GLoader/GLoader":1,"./GCustomData":28,"../FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Core/GView/GChild.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GView/GCustomData.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Manager/MaskUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/Manager/type.js"},{"deps":{"../CoreDefine":42,"../FrameEx/ES5Ex":94,"../../Game/Common/Define":41,"../GLoader/GLoader":1,"../GCtrl":5},"path":"preview-scripts/assets/Script/Core/Manager/RedPointLogicMgr.js"},{"deps":{"../GLoader/GLoader":1},"path":"preview-scripts/assets/Script/Core/Manager/AudioMgr.js"},{"deps":{"../Core/FrameEx/GComponent":98,"../Game/Common/JXColor":50,"../Core/GLoader/GLoader":1,"../Game/Common/UIAction":47},"path":"preview-scripts/assets/Script/Shaders/SLTransitions.js"},{"deps":{"../FrameEx/ES5Ex":94,"../CoreDefine":42,"../GCtrl":5,"../../Game/Common/UIResources":56,"../GLoader/GLoader":1},"path":"preview-scripts/assets/Script/Core/Manager/DataPool.js"},{"deps":{"../FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Core/Manager/GNodePool.js"},{"deps":{"../../Game/Common/UIResources":56,"../FrameEx/GComponent":98,"../CoreDefine":42,"../FrameEx/ES5Ex":94,"../GView/GViewBase":40,"../GLoader/GLoader":1,"./../GCtrl":5,"./AudioMgr":32,"../GView/GViewDestory":25},"path":"preview-scripts/assets/Script/Core/Manager/UIMgr.js"},{"deps":{"./GViewBase":40,"../CoreDefine":42},"path":"preview-scripts/assets/Script/Core/GView/GPageView.js"},{"deps":{"../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Shaders/SLGuideShader.js"},{"deps":{"../../../Core/GCtrl":5,"../../Common/Define":41,"../../Common/UI":46,"../../Logic/GameMgr":13,"../../../Core/FrameEx/ColorLog":102},"path":"preview-scripts/assets/Script/Game/Views/Common/HangPage.js"},{"deps":{"../utils/setBgFit":11,"../FrameEx/GComponent":98,"../GCtrl":5},"path":"preview-scripts/assets/Script/Core/GView/GViewBase.js"},{"deps":{"./../../Core/CoreDefine":42},"path":"preview-scripts/assets/Script/Game/Common/Define.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/CoreDefine.js"},{"deps":{},"path":"preview-scripts/assets/Script/conventions/JXCommon.js"},{"deps":{"../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Shaders/SLTextShowShader.js"},{"deps":{"../../conventions/JXCommon":43,"./../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Common/TimeUtils.js"},{"deps":{"../../conventions/JXCommon":43,"../../Core/CoreDefine":42,"../../Core/Manager/UIMgr":36,"./UIResources":56,"../../Core/FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Game/Common/UI.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UIAction.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Guide/Guide.type.js"},{"deps":{"../../Core/CoreDefine":42,"../../Core/GLoader/GLoader":1,"../../Core/FrameEx/ES5Ex":94,"../Common/UIAction":47,"./../../Core/GCtrl":5,"../../Core/FrameEx/ColorLog":102,"../Common/UIResources":56,"./../Common/Define":41,"../Logic/GameMgr":13,"./../Logic/ConditionListener":52,"./GuideComponent":14},"path":"preview-scripts/assets/Script/Game/Guide/GuideLogic.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/JXColor.js"},{"deps":{"../Common/Define":41},"path":"preview-scripts/assets/Script/Game/Logic/RobotGradeMgr.js"},{"deps":{"../../Core/CoreDefine":42,"../../Core/FrameEx/ES5Ex":94,"../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Logic/ConditionListener.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SPlaneData.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SRankData.js"},{"deps":{"../../Core/FrameEx/ColorLog":102,"../../Core/FrameEx/ES5Ex":94,"../../Core/GLoader/GLoader":1,"../Common/Define":41,"../../Core/CoreDefine":42,"../Common/UI":46,"../Common/UIResources":56,"../../Core/GCtrl":5,"../Common/Language":12,"./GameMgr":13,"../Views/Tip/ToastCtrl":86},"path":"preview-scripts/assets/Script/Game/Logic/ToastMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UIResources.js"},{"deps":{"./../../Core/CoreDefine":42,"./../../Core/FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Game/Logic/MapMgr.js"},{"deps":{"../../Core/FrameEx/MaskSprite":100,"../../Core/CoreDefine":42,"../../Core/FrameEx/PlistLabel":104,"../../Core/GCtrl":5,"./JXColor":50,"../../Core/GLoader/GLoader":1,"../Guide/GuideComponent":14,"./UIResources":56},"path":"preview-scripts/assets/Script/Game/Common/UICreate.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SLevelRewardData.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SLevelData.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SSystemConfig.js"},{"deps":{"../../../Core/CoreDefine":42,"../../../Core/FrameEx/ES5Ex":94,"../../../Core/FrameEx/ActionEx":103,"../../Logic/GameMgr":13,"../../Common/Define":41,"../../../Core/GEvent/GEventSystem":89,"../../../Core/Math/MathEx":8,"../../../Core/GCtrl":5,"./BtlFighltLayer":69,"./JXBattleUtility":4,"../../Common/UIResources":56,"./JXRBPlayer":64,"./JXULDefine":75,"./JXRBRole":68},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBCmdMgr.js"},{"deps":{"../../../Core/FrameEx/ColorLog":102,"../../../Core/FrameEx/ES5Ex":94,"../../../Core/GView/GViewBase":40,"../../../Core/Manager/GNodePool":35,"../../../Core/GCtrl":5,"../../Common/Define":41,"../../Logic/GameMgr":13,"./BtlFighltLayer":69,"../../Common/UI":46},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlCameraMap.js"},{"deps":{"../../../Core/CoreDefine":42,"../../../conventions/JXCommon":43,"../../../Core/FrameEx/ColorLog":102,"../../../Core/FrameEx/ES5Ex":94,"../../../Core/GCtrl":5,"../../../Core/GEvent/GParam":108,"../../../Core/GView/GChild":27,"../../../Core/Manager/AudioMgr":32,"../../Common/Define":41,"../../Guide/GuideComponent":14,"../../../Core/Math/MathEx":8,"../../Logic/GameMgr":13,"../ViewUtil/VIewUtil":80,"./JXULDefine":75,"./PlayerNumber":71,"../../Common/UIResources":56},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBPlayer.js"},{"deps":{"../../../Core/FrameEx/ES5Ex":94,"../../Common/Define":41,"../../Common/UIResources":56},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlMapElement.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/Zh.js"},{"deps":{"../../../Core/CoreDefine":42,"../../../Core/FrameEx/ES5Ex":94,"../../Logic/GameMgr":13,"../../Common/UIResources":56,"../../../Core/GLoader/GLoader":1},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXULAssets.js"},{"deps":{"../../../Core/BaseFSM/FiniteStateMachine":22,"../../../Core/FrameEx/CCNodeImpl":92,"../../../Core/FrameEx/ActionEx":103,"../../../Core/CoreDefine":42,"../../../Core/GEvent/GParam":108,"../../../Core/Manager/AudioMgr":32,"../../../Core/Math/MathEx":8,"../../Common/Define":41,"./JXRBPlayer":64,"../../Common/UIResources":56,"./JXULDefine":75},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXRBRole.js"},{"deps":{"../../Common/Define":41,"../../../Core/GView/GChild":27,"../../Common/UI":46,"./JXRBCmdMgr":62,"../../Logic/GameMgr":13,"./JXULDefine":75},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlFighltLayer.js"},{"deps":{"../../../Core/GView/GViewBase":40,"../../Common/Define":41,"../../Common/Language":12,"../../Common/Zh":66,"../../Common/UIResources":56,"../../Common/UI":46,"../../Logic/GameMgr":13,"../../../Core/Manager/AudioMgr":32,"../../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Views/Home/BattleResultCtrl.js"},{"deps":{"./JXULDefine":75},"path":"preview-scripts/assets/Script/Game/Views/Fight/PlayerNumber.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SGuideChainData.js"},{"deps":{"./../../Common/Define":41,"../../../Core/FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Game/Views/Fight/BtlMapParser.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SNpcData.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/Fight/JXULDefine.js"},{"deps":{"../../Common/UIResources":56,"../../Logic/GameMgr":13,"../../Common/UI":46,"./../../Logic/ToastMgr":55,"./../../Common/Define":41,"../../../Core/FrameEx/GComponent":98,"./../../Common/UI":46,"./AppCtrl":19},"path":"preview-scripts/assets/Script/Game/Views/StartGame/AppStart.js"},{"deps":{"../../Common/UI":46,"../../../Core/GView/GViewBase":40,"../../Common/UIResources":56,"../../Logic/GameMgr":13,"../Fight/JXULAssets":67},"path":"preview-scripts/assets/Script/Game/Views/Home/MatchCtrl.js"},{"deps":{"../../../Core/Manager/DataPool":34,"../../../Core/CoreDefine":42,"../../../Core/Math/MathEx":8,"../../Common/Define":41,"../../Logic/GameMgr":13},"path":"preview-scripts/assets/Script/Game/Data/Locals/LRobotGrade.js"},{"deps":{"../../../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Game/Views/Map/MapStartCtrl.js"},{"deps":{"../../Common/UIAction":47,"../../../Core/FrameEx/ColorLog":102,"./../../Common/Language":12,"./../../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/VIewUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/ToggleSwitcher.js"},{"deps":{"../../../Shaders/Manager/ShaderUtil":3,"../../Common/UI":46,"../../Logic/ConditionListener":52,"../../Logic/GameMgr":13,"../../../Core/FrameEx/ES5Ex":94,"../../../Core/GCtrl":5},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/JumpUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/type.js"},{"deps":{"../../../Core/Manager/DataPool":34},"path":"preview-scripts/assets/Script/Game/Data/Static/SRankRewardData.js"},{"deps":{"../../../Core/GCtrl":5,"../../../Core/CoreDefine":42,"../../../Core/GView/GChild":27,"../../../Core/FrameEx/ColorLog":102,"../../Logic/GameMgr":13,"../../Common/Define":41},"path":"preview-scripts/assets/Script/Game/Views/Home/TaskCtrl.js"},{"deps":{"../../../Core/FrameEx/MaskSprite":100,"../../../Core/GView/GChild":27},"path":"preview-scripts/assets/Script/Game/Views/Tip/ToastCtrl.js"},{"deps":{"../../Logic/GameMgr":13},"path":"preview-scripts/assets/Script/Game/Views/ViewUtil/preventClicks.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ColorAssembler2D.js"},{"deps":{"../FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Core/GEvent/GEventSystem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/GNet/GHttpClient.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/BaseFSM/HtmlTextParser.js"},{"deps":{"./ES5Ex":94},"path":"preview-scripts/assets/Script/Core/FrameEx/CCNodeImpl.js"},{"deps":{"../GCtrl":5},"path":"preview-scripts/assets/Script/Core/FrameEx/CanvasEx.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ES5Ex.js"},{"deps":{"../Manager/AudioMgr":32},"path":"preview-scripts/assets/Script/Core/FrameEx/CCEx.js"},{"deps":{"../GLoader/GLoader":1},"path":"preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressMoreBar.js"},{"deps":{"../Manager/AudioMgr":32,"../CoreDefine":42,"../Manager/UIMgr":36,"./GComponent":98},"path":"preview-scripts/assets/Script/Core/FrameEx/GDrag.js"},{"deps":{"../GLoader/GLoader":1},"path":"preview-scripts/assets/Script/Core/FrameEx/GComponent.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/CCSliderEx.js"},{"deps":{"../CoreDefine":42},"path":"preview-scripts/assets/Script/Core/FrameEx/MaskSprite.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/AnimationEvent.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/ColorLog.js"},{"deps":{"../Math/MathEx":8},"path":"preview-scripts/assets/Script/Core/FrameEx/ActionEx.js"},{"deps":{"../BaseFSM/HtmlTextParser":91},"path":"preview-scripts/assets/Script/Core/FrameEx/PlistLabel.js"},{"deps":{"../Manager/AudioMgr":32},"path":"preview-scripts/assets/Script/Core/FrameEx/GLongTouch.js"},{"deps":{"./GChild":27},"path":"preview-scripts/assets/Script/Core/GView/GPage.js"},{"deps":{},"path":"preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressBar.js"},{"deps":{"../FrameEx/ES5Ex":94},"path":"preview-scripts/assets/Script/Core/GEvent/GParam.js"},{"deps":{"../../../Core/FrameEx/GComponent":98},"path":"preview-scripts/assets/Script/Game/Views/StartGame/messageListener.js"},{"deps":{"../../../Core/GView/GViewBase":40},"path":"preview-scripts/assets/Script/Game/Views/Home/HomeCtrl.js"}];
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
    