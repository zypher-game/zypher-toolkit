"use strict";
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