import { ObjectWrap } from "./ES5Ex";

export class CCNodeImpl extends ObjectWrap {
    public target: cc.Node = null;
    constructor(target: cc.Node) {
        super();
        this.target = target;
    }

    public get groupIndex(): number { return this.target.groupIndex };
    public set groupIndex(v: number) { this.target.groupIndex = v };
    public get group(): string { return this.target.group };
    public set group(v: string) { this.target.group = v; }
    public get x(): number { return this.target.x; }
    public set x(val: number) { this.target.x = val; }
    public get y(): number { return this.target.y; }
    public set y(val: number) { this.target.y = val; }
    public set position(val: cc.Vec2) { this.target.position = val; }
    public get position(): cc.Vec2 { return this.target.position; }
    public set rotation(val: number) { this.target.rotation = val; }
    public get rotation(): number { return this.target.rotation; }
    public set angle(val: number) { this.target.angle = val; }
    public get angle(): number { return this.target.angle; }
    public set scale(val: number) { this.target.scale = val; }
    public get scale(): number { return this.target.scale; }
    public set scaleX(val: number) { this.target.scaleX = val; }
    public get scaleX(): number { return this.target.scaleX; }
    public set scaleY(val: number) { this.target.scaleY = val; }
    public get scaleY() { return this.target.scaleY; }
    public set anchorX(val: number) { this.target.anchorX = val; }
    public get anchorX(): number { return this.target.anchorX; }
    public set opacity(val: number) { this.target.opacity = val; }
    public get opacity(): number { return this.target.opacity; }
    public set anchorY(val: number) { this.target.anchorY = val; }
    public get anchorY(): number { return this.target.anchorY; }
    public set width(val: number) { this.target.width = val; }
    public get width(): number { return this.target.width; }
    public set zIndex(val: number) {
        this.target.zIndex = Math.min(val, cc.macro.MAX_ZINDEX - 1);
    }
    public get zIndex(): number { return this.target.zIndex; }
    public set height(val: number) { this.target.height = val; }
    public get height(): number { return this.target.height; }
    public get active(): boolean { return this.target.active; }
    public set active(val: boolean) { this.target.active = val }
    public get parent(): cc.Node { return this.target.parent; }
    public set parent(parent: cc.Node) { this.target.parent = parent };
    public get name(): string { return this.target.name };
    public convertToWorldSpaceAR(pos: cc.Vec2) {
        return this.target.convertToWorldSpaceAR(pos);
    }

    public convertToNodeSpaceAR(worldPos: cc.Vec2) {
        return this.target.convertToNodeSpaceAR(worldPos);
    }

    public getComponent<T extends cc.Component>(type: { prototype: T }): T {
        return this.target.getComponent(type);
    }
    public setPosition(x: number, y: number) { this.target.setPosition(x, y) }


}