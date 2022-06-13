import { math, Vec2, Vec3 } from "cc";

export class Transformer
{
    static ToView3D(position: Vec2): Vec3
    {
        let view = this.ToView(position);
        return new Vec3(view.x, view.y, 0);
    }
    static ToView(position: Vec2):Vec2
    {
        return new Vec2(position.x, position.y); 
    }    
}