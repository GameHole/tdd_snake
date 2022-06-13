import { Vec2 } from "cc";
import { IPosiable } from "./IPosiable";

export class Food implements IPosiable
{
    position: Vec2 = new Vec2(0, 0);    
}