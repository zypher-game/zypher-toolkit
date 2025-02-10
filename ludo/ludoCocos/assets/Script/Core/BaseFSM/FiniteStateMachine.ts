import { StringOrNumber } from "../../../../d.ts/game/JXCLBtl";
import { INVALID_VALUE } from "../CoreDefine";
import { MapWrap } from "../FrameEx/ES5Ex";

export class FSMState<EntityType, TransitionId extends StringOrNumber> {
  protected entity: EntityType;
  protected _curTime: number;

  public registerState(entity: EntityType) {
    this.entity = entity;
  }

  public get stateID(): TransitionId {
    throw new Error("State ID not spicified in child class");
  }

  public enter() {
    this._curTime = 0;
  }

  public execute(dt?: number) {
    this._curTime += dt;
  }

  public exit() {
    this._curTime = 0;
  }
}

export class FiniteStateMachine<
  EntityType,
  TransitionId extends StringOrNumber
> {
  private _owner: EntityType;
  private _curState: FSMState<EntityType, TransitionId>;
  private _previousState: FSMState<EntityType, TransitionId>;
  private _globalState: FSMState<EntityType, TransitionId>;
  private _stateDic: MapWrap<TransitionId, FSMState<EntityType, TransitionId>>;

  constructor(owner: EntityType) {
    this._curState = null;
    this._previousState = null;
    this._globalState = null;
    this._owner = owner;
    this._stateDic = new MapWrap<
      TransitionId,
      FSMState<EntityType, TransitionId>
    >();
  }

  public FSMUpdate(dt: number): void {
    if (this._globalState != null) {
      this._globalState.execute(dt);
    }
    if (this._curState != null) {
      this._curState.execute(dt);
    }
  }

  public globalStateEnter() {
    console.log("globalStateEnter");
    this._globalState.enter();
  }

  public setGlobalState(state: FSMState<EntityType, TransitionId>) {
    this._globalState = state;
    console.log("setGlobalState");
    this._globalState.enter();
  }

  public setCurState(state: FSMState<EntityType, TransitionId>) {
    this._curState = state;
    console.log("setCurState");
    this._curState.enter();
  }

  public getCurState(): TransitionId {
    if (!this._curState) {
      return INVALID_VALUE as TransitionId;
    }
    return this._curState.stateID;
  }

  public get global() {
    return this._globalState;
  }

  public getPerState(): TransitionId {
    if (!!this._previousState) {
      return this._previousState.stateID;
    }
    return this.getCurState();
  }

  public changeState(
    state: FSMState<EntityType, TransitionId> | TransitionId,
    force = false
  ): boolean {
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
  }

  public revertToPreviousState() {
    if (!!this._previousState) {
      this.changeState(this._previousState);
    }
  }

  public getState(stateID: TransitionId): FSMState<EntityType, TransitionId> {
    return this._stateDic.get(stateID);
  }

  public registerState(
    state: FSMState<EntityType, TransitionId>
  ): FSMState<EntityType, TransitionId> {
    if (!state) return state;
    state.registerState(this._owner);
    this._stateDic.set(state.stateID, state);
    return state;
  }

  public unRegisterState(state: FSMState<EntityType, TransitionId>) {
    this._stateDic.delete(state.stateID);
  }
}
