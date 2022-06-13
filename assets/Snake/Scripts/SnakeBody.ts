import { Vec2 } from "cc";
import { IPosiable } from "./IPosiable";
export class SnakeBody implements IPosiable
{
    next: SnakeBody;
    private _position: Vec2 = new Vec2(0, 0); 
    private _prePosition: Vec2; 
    get prePosition(): Vec2
    {
        return this._prePosition;
    } 
    private set prePosition(value:Vec2)
    {
        this._prePosition = value.clone();
    }
    get position(): Vec2
    {
        return this._position;
    }
    set position(value:Vec2)
    {
        this._position = value.clone();
    }
    Move(preBody: SnakeBody)
    {
        this.savePosition();
        this.position = preBody.prePosition;
    }
    MoveByDir(dir: Vec2)
    {
        this.savePosition();
        this.position = this.position.add(dir);
    } 
    savePosition()
    {
        this.prePosition = this.position;
    }
    [Symbol.iterator]()
    {
        let joint: SnakeBody = this;
        return {
            next: () =>
            {
                if (joint != undefined)
                {
                    let ret = { value: joint, done: false };
                    joint = joint.next;
                    return ret;
                } else
                {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}