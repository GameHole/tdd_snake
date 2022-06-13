import { Vec2 } from "cc";

export class UserInput
{
    private _axis: Vec2;
    constructor()
    {
        this.Right();
    }
    getAxis(): Vec2
    {
        return this._axis.clone();
    }
    Right()
    {
        this._axis = new Vec2(1,0);
    }
    Left()
    {
        this._axis = new Vec2(-1, 0);
    }
    Down()
    {
        this._axis = new Vec2(0, -1);
    }
    Up()
    {
        this._axis = new Vec2(0, 1);
    }    
}