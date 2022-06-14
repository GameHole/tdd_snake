import { Vec2 } from "cc";

export abstract class IInput
{
    abstract Reset();
    abstract getAxis(): Vec2;
}