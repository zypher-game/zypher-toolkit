import { INVALID_VALUE } from "../../Core/CoreDefine";
import { ObjectWrap } from "../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../Core/GCtrl";

/** 条件监听者 */
export class ConditionListter extends ObjectWrap {
    /** 条件依赖的发射器 */
    protected _emitters: ConditionEmitter[] = [];
    protected _curState: boolean = false;
    /** 是否初始化完成, 目前用来阻止发送局部条件信息 */
    protected _inited: boolean = false;

    protected _emitCbs: { (emitter: ConditionEmitter): void }[] = [];
    public addCallBack(callback: { (emitter: ConditionEmitter): void }) {
        this._emitCbs = this._emitCbs || [];
        this._emitCbs.push(callback);
    }

    public getInitedState() { return this._inited }
    public inited() {
        this._inited = true;
    }
    constructor() {
        super();
    }

    addEmitter(emitter: ConditionEmitter) {
        // 默认置为false
        this._curState = false;
        if (!this._emitters) this._emitters = [];
        this._emitters.push(emitter);
        emitter.start();
    }

    public removeEmitter(emitter: ConditionEmitter) {
        if (!this._emitters) return;
        let index = this._emitters.indexOf(emitter);
        if (index == INVALID_VALUE) return;
        this._emitters.splice(index, 1);
        this.onConditionChange(emitter, true);
    }

    /** 判断当前监听器是否满足条件 */
    public get cureState(): boolean {
        return this._curState;
    }

    /** 环境变更回调 */
    public onConditionChange(emitter: ConditionEmitter, isActive: boolean) {
        if (isActive && !this._curState) {
            let state = true;
            for (let i = 0; i < this._emitters.length; i++) {
                state = state && this._emitters[i].curState;
                if (!state) {
                    state = false;
                    break;
                }
            }
            if (!state) return;
            this._curState = true;
            // emit open event!
            if (!this._inited) return;
            this.emitConditionEnvChange(emitter);
        }
        else {
            if (!isActive && this._curState) {
                this._curState = false;
                if (!this._inited) return;
                this.emitConditionEnvChange(emitter);
            }
        }
    }

    /**
     * 结果变更事件
     * @param emitter 触发变更的条件
     */
    protected emitConditionEnvChange(emitter: ConditionEmitter) {
        for (let i = 0, c = this._emitCbs || []; i < c.length; i++) {
            this._emitCbs[i](emitter);
        }
    }

    /** 未达成状态提示 */
    public toast() {
        for (let i = 0; i < this._emitters.length; i++) {
            let emitter = this._emitters[i];
            if (emitter.curState) continue;
            emitter.toast();
            return;
        }
    }

    /** 指引达成条件 */
    public guide() {
        for (let i = 0; i < this._emitters.length; i++) {
            let emitter = this._emitters[i];
            if (emitter.curState) continue;
            emitter.guide();
            return;
        }
    }

    public destroy() {
        while (this._emitters.length > 0) {
            let emitter = this._emitters.pop();
            emitter.destroy();
            emitter = null;
        }
        this._emitters = null;
        this._inited = false;
    }

}

/** 条件变更发射器 */
export class ConditionEmitter extends ObjectWrap {
    /** 业主 */
    protected _listener: ConditionListter;
    /** 当前检测状态 */
    protected _curState: boolean = false;
    constructor(lister: ConditionListter) {
        super();
        this._listener = lister;
    }

    /** 初始化事件 */
    protected initEvent() {

    }

    /** 移除事件 */
    protected unEvent() {
        GCtrl.ES.off(this);
    }

    /** 初始化当前状态 */
    protected initState() {

    }

    /** 开始工作 */
    start() {
        this.initState();
        this.initEvent();
    }

    public get curState(): boolean {
        return this._curState;
    }

    public toast() {
        return false;
    }

    public guide() {
        return false;
    }

    destroy() {
        this.unEvent();
        this._listener = null;
    }
}

/** 解析条件配置数据当前可配置的内容为下

 */
enum ConditionType {
    NONE,

}

export function convertCondition(condition: any[], listener: ConditionListter): ConditionEmitter {
    let type = condition[0];
    switch (type) {

    }
    return null;
}
export function convertConditions(conditions: any[], listener: ConditionListter): ConditionEmitter[] {
    let ret = [];
    for (let i = 0; i < conditions.length; i++) {
        let condition = convertCondition(conditions[i], listener);
        if (condition)
            ret.push(condition);
    }
    return ret;
}

