import { ObjectWrap } from "../FrameEx/ES5Ex";

export abstract class GNodePool extends ObjectWrap {
    protected _actives: cc.Node[] = [];
    protected _recoves: cc.Node[] = [];
    protected _parent: cc.Node;
    protected static _tag: number = 0;

    constructor(parent?: cc.Node) {
        super()
        this.init(parent);
    }

    protected abstract syncCreate(): cc.Node;
    protected abstract asyncCreate(cb: NodeCallBack);

    public get actives(): cc.Node[] {
        return this._actives;
    }

    public get recovers(): cc.Node[] {
        return this._recoves;
    }

    public checkInit() {
        if (!this._parent) {
            return false;
        }
        return true;
    }

    public init(parent: cc.Node) {
        if (!parent) return;
        this._parent = parent;
    }

    public pop(): cc.Node {
        if (!this.checkInit()) return;
        if (this._recoves.length == 0) {
            let node = this.syncCreate();
            if (!node) return null;
            this._actives.push(node);
            node.name = ++GNodePool._tag + '';
            this._parent.addChild(node);
            return node;
        }
        let node = this._recoves.pop();
        this._actives.push(node);
        node.active = true;
        console.log(this._recoves.length)
        return node;
    }

    public asyncPop(cb: NodeCallBack) {
        if (!this.checkInit()) {
            return cb(null);
        }
        if (this._recoves.length == 0) {
            return this.asyncCreate((node: cc.Node) => {
                if (!node) return cb(null);
                this._actives.push(node);
                node.setUserData(++GNodePool._tag);
                this._parent.addChild(node);
                cb(node);
            });
        }
        let node = this._recoves.pop();
        this._actives.push(node);
        node.active = true;
        cb(node);
    }

    public push(node: cc.Node) {
        if (!this.checkInit()) return;
        node.active = false;
        for (let i = 0; i < this._actives.length; i++) {
            if (this._actives[i].getUserData() == node.getUserData()) {
                this._actives.splice(i, 1);
                break;
            }
        }
        node.stopAllActions();
        this._recoves.push(node);
    }

    public destory() {
        if (!this.checkInit()) return;
        for (let node of this._actives) {
            node.destroy();
        }
        for (let node of this._recoves) {
            node.destroy();
        }
        this._actives.splice(0, this._actives.length);
        this._recoves.splice(0, this._recoves.length);
        this.onDestroy();
    }

    protected onDestroy() {

    }
}