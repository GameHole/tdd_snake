import { Vec2 } from "cc";

export abstract class IInput
{   
    abstract getAxis(): Vec2;
}