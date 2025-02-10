
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/BaseFSM/FiniteStateMachine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35a55Q0kU9GcIwwihlwYjtB', 'FiniteStateMachine');
// Script/Core/BaseFSM/FiniteStateMachine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiniteStateMachine = exports.FSMState = void 0;
var CoreDefine_1 = require("../CoreDefine");
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var FSMState = /** @class */ (function () {
    function FSMState() {
    }
    FSMState.prototype.registerState = function (entity) {
        this.entity = entity;
    };
    Object.defineProperty(FSMState.prototype, "stateID", {
        get: function () {
            throw new Error("State ID not spicified in child class");
        },
        enumerable: false,
        configurable: true
    });
    FSMState.prototype.enter = function () {
        this._curTime = 0;
    };
    FSMState.prototype.execute = function (dt) {
        this._curTime += dt;
    };
    FSMState.prototype.exit = function () {
        this._curTime = 0;
    };
    return FSMState;
}());
exports.FSMState = FSMState;
var FiniteStateMachine = /** @class */ (function () {
    function FiniteStateMachine(owner) {
        this._curState = null;
        this._previousState = null;
        this._globalState = null;
        this._owner = owner;
        this._stateDic = new ES5Ex_1.MapWrap();
    }
    FiniteStateMachine.prototype.FSMUpdate = function (dt) {
        if (this._globalState != null) {
            this._globalState.execute(dt);
        }
        if (this._curState != null) {
            this._curState.execute(dt);
        }
    };
    FiniteStateMachine.prototype.globalStateEnter = function () {
        console.log("globalStateEnter");
        this._globalState.enter();
    };
    FiniteStateMachine.prototype.setGlobalState = function (state) {
        this._globalState = state;
        console.log("setGlobalState");
        this._globalState.enter();
    };
    FiniteStateMachine.prototype.setCurState = function (state) {
        this._curState = state;
        console.log("setCurState");
        this._curState.enter();
    };
    FiniteStateMachine.prototype.getCurState = function () {
        if (!this._curState) {
            return CoreDefine_1.INVALID_VALUE;
        }
        return this._curState.stateID;
    };
    Object.defineProperty(FiniteStateMachine.prototype, "global", {
        get: function () {
            return this._globalState;
        },
        enumerable: false,
        configurable: true
    });
    FiniteStateMachine.prototype.getPerState = function () {
        if (!!this._previousState) {
            return this._previousState.stateID;
        }
        return this.getCurState();
    };
    FiniteStateMachine.prototype.changeState = function (state, force) {
        if (force === void 0) { force = false; }
        if (typeof state == "object") {
            if (force || this._curState != state) {
                this._previousState = this._curState;
                if (!!this._curState) {
                    this._curState.exit();
                }
                this._curState = state;
                if (!!this._curState) {
                    this._curState.enter();
                    return true;
                }
            }
            return false;
        }
        state = this.getState(state);
        return this.changeState(state, force);
    };
    FiniteStateMachine.prototype.revertToPreviousState = function () {
        if (!!this._previousState) {
            this.changeState(this._previousState);
        }
    };
    FiniteStateMachine.prototype.getState = function (stateID) {
        return this._stateDic.get(stateID);
    };
    FiniteStateMachine.prototype.registerState = function (state) {
        if (!state)
            return state;
        state.registerState(this._owner);
        this._stateDic.set(state.stateID, state);
        return state;
    };
    FiniteStateMachine.prototype.unRegisterState = function (state) {
        this._stateDic.delete(state.stateID);
    };
    return FiniteStateMachine;
}());
exports.FiniteStateMachine = FiniteStateMachine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9CYXNlRlNNL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBOEM7QUFDOUMsMENBQTJDO0FBRTNDO0lBQUE7SUF1QkEsQ0FBQztJQW5CUSxnQ0FBYSxHQUFwQixVQUFxQixNQUFrQjtRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQVcsNkJBQU87YUFBbEI7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7SUFFTSx3QkFBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxFQUFXO1FBQ3hCLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSx1QkFBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQXZCQSxBQXVCQyxJQUFBO0FBdkJZLDRCQUFRO0FBeUJyQjtJQVVFLDRCQUFZLEtBQWlCO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFPLEVBR3pCLENBQUM7SUFDTixDQUFDO0lBRU0sc0NBQVMsR0FBaEIsVUFBaUIsRUFBVTtRQUN6QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUs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SUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sNENBQWUsR0FBdEIsVUFBdUIsS0FBeUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDSCx5QkFBQztBQUFELENBN0dBLEFBNkdDLElBQUE7QUE3R1ksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RyaW5nT3JOdW1iZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSB9IGZyb20gXCIuLi9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IE1hcFdyYXAgfSBmcm9tIFwiLi4vRnJhbWVFeC9FUzVFeFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZCBleHRlbmRzIFN0cmluZ09yTnVtYmVyPiB7XHJcbiAgcHJvdGVjdGVkIGVudGl0eTogRW50aXR5VHlwZTtcclxuICBwcm90ZWN0ZWQgX2N1clRpbWU6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyU3RhdGUoZW50aXR5OiBFbnRpdHlUeXBlKSB7XHJcbiAgICB0aGlzLmVudGl0eSA9IGVudGl0eTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc3RhdGVJRCgpOiBUcmFuc2l0aW9uSWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhdGUgSUQgbm90IHNwaWNpZmllZCBpbiBjaGlsZCBjbGFzc1wiKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbnRlcigpIHtcclxuICAgIHRoaXMuX2N1clRpbWUgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV4ZWN1dGUoZHQ/OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2N1clRpbWUgKz0gZHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhpdCgpIHtcclxuICAgIHRoaXMuX2N1clRpbWUgPSAwO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbml0ZVN0YXRlTWFjaGluZTxcclxuICBFbnRpdHlUeXBlLFxyXG4gIFRyYW5zaXRpb25JZCBleHRlbmRzIFN0cmluZ09yTnVtYmVyXHJcbj4ge1xyXG4gIHByaXZhdGUgX293bmVyOiBFbnRpdHlUeXBlO1xyXG4gIHByaXZhdGUgX2N1clN0YXRlOiBGU01TdGF0ZTxFbnRpdHlUeXBlLCBUcmFuc2l0aW9uSWQ+O1xyXG4gIHByaXZhdGUgX3ByZXZpb3VzU3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD47XHJcbiAgcHJpdmF0ZSBfZ2xvYmFsU3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD47XHJcbiAgcHJpdmF0ZSBfc3RhdGVEaWM6IE1hcFdyYXA8VHJhbnNpdGlvbklkLCBGU01TdGF0ZTxFbnRpdHlUeXBlLCBUcmFuc2l0aW9uSWQ+PjtcclxuXHJcbiAgY29uc3RydWN0b3Iob3duZXI6IEVudGl0eVR5cGUpIHtcclxuICAgIHRoaXMuX2N1clN0YXRlID0gbnVsbDtcclxuICAgIHRoaXMuX3ByZXZpb3VzU3RhdGUgPSBudWxsO1xyXG4gICAgdGhpcy5fZ2xvYmFsU3RhdGUgPSBudWxsO1xyXG4gICAgdGhpcy5fb3duZXIgPSBvd25lcjtcclxuICAgIHRoaXMuX3N0YXRlRGljID0gbmV3IE1hcFdyYXA8XHJcbiAgICAgIFRyYW5zaXRpb25JZCxcclxuICAgICAgRlNNU3RhdGU8RW50aXR5VHlwZSwgVHJhbnNpdGlvbklkPlxyXG4gICAgPigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEZTTVVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZ2xvYmFsU3RhdGUgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9nbG9iYWxTdGF0ZS5leGVjdXRlKGR0KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9jdXJTdGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2N1clN0YXRlLmV4ZWN1dGUoZHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdsb2JhbFN0YXRlRW50ZXIoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdsb2JhbFN0YXRlRW50ZXJcIik7XHJcbiAgICB0aGlzLl9nbG9iYWxTdGF0ZS5lbnRlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEdsb2JhbFN0YXRlKHN0YXRlOiBGU01TdGF0ZTxFbnRpdHlUeXBlLCBUcmFuc2l0aW9uSWQ+KSB7XHJcbiAgICB0aGlzLl9nbG9iYWxTdGF0ZSA9IHN0YXRlO1xyXG4gICAgY29uc29sZS5sb2coXCJzZXRHbG9iYWxTdGF0ZVwiKTtcclxuICAgIHRoaXMuX2dsb2JhbFN0YXRlLmVudGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0Q3VyU3RhdGUoc3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD4pIHtcclxuICAgIHRoaXMuX2N1clN0YXRlID0gc3RhdGU7XHJcbiAgICBjb25zb2xlLmxvZyhcInNldEN1clN0YXRlXCIpO1xyXG4gICAgdGhpcy5fY3VyU3RhdGUuZW50ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJTdGF0ZSgpOiBUcmFuc2l0aW9uSWQge1xyXG4gICAgaWYgKCF0aGlzLl9jdXJTdGF0ZSkge1xyXG4gICAgICByZXR1cm4gSU5WQUxJRF9WQUxVRSBhcyBUcmFuc2l0aW9uSWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fY3VyU3RhdGUuc3RhdGVJRDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZ2xvYmFsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dsb2JhbFN0YXRlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBlclN0YXRlKCk6IFRyYW5zaXRpb25JZCB7XHJcbiAgICBpZiAoISF0aGlzLl9wcmV2aW91c1N0YXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wcmV2aW91c1N0YXRlLnN0YXRlSUQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVN0YXRlKFxyXG4gICAgc3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD4gfCBUcmFuc2l0aW9uSWQsXHJcbiAgICBmb3JjZSA9IGZhbHNlXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgaWYgKGZvcmNlIHx8IHRoaXMuX2N1clN0YXRlICE9IHN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fcHJldmlvdXNTdGF0ZSA9IHRoaXMuX2N1clN0YXRlO1xyXG4gICAgICAgIGlmICghIXRoaXMuX2N1clN0YXRlKSB7XHJcbiAgICAgICAgICB0aGlzLl9jdXJTdGF0ZS5leGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1clN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgaWYgKCEhdGhpcy5fY3VyU3RhdGUpIHtcclxuICAgICAgICAgIHRoaXMuX2N1clN0YXRlLmVudGVyKCk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3RhdGUgPSB0aGlzLmdldFN0YXRlKHN0YXRlKTtcclxuICAgIHJldHVybiB0aGlzLmNoYW5nZVN0YXRlKHN0YXRlLCBmb3JjZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV2ZXJ0VG9QcmV2aW91c1N0YXRlKCkge1xyXG4gICAgaWYgKCEhdGhpcy5fcHJldmlvdXNTdGF0ZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKHRoaXMuX3ByZXZpb3VzU3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0YXRlKHN0YXRlSUQ6IFRyYW5zaXRpb25JZCk6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlRGljLmdldChzdGF0ZUlEKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlclN0YXRlKFxyXG4gICAgc3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD5cclxuICApOiBGU01TdGF0ZTxFbnRpdHlUeXBlLCBUcmFuc2l0aW9uSWQ+IHtcclxuICAgIGlmICghc3RhdGUpIHJldHVybiBzdGF0ZTtcclxuICAgIHN0YXRlLnJlZ2lzdGVyU3RhdGUodGhpcy5fb3duZXIpO1xyXG4gICAgdGhpcy5fc3RhdGVEaWMuc2V0KHN0YXRlLnN0YXRlSUQsIHN0YXRlKTtcclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1blJlZ2lzdGVyU3RhdGUoc3RhdGU6IEZTTVN0YXRlPEVudGl0eVR5cGUsIFRyYW5zaXRpb25JZD4pIHtcclxuICAgIHRoaXMuX3N0YXRlRGljLmRlbGV0ZShzdGF0ZS5zdGF0ZUlEKTtcclxuICB9XHJcbn1cclxuIl19