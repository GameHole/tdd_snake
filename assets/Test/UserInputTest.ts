import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { UserInput } from "../Snake/Scripts/UserInput";

export class UserInputTest extends TestCase
{    
    @Test
    testGetAxis()
    {
        let input = new UserInput();
        Assert.IsTrue(new Vec2(1, 0).strictEquals(input.getAxis()));
        input.Up();
        Assert.IsTrue(new Vec2(0, 1).strictEquals(input.getAxis()));
        input.Down();
        Assert.IsTrue(new Vec2(0, -1).strictEquals(input.getAxis()));
        input.Left();
        Assert.IsTrue(new Vec2(-1, 0).strictEquals(input.getAxis()));
        input.Right();
        Assert.IsTrue(new Vec2(1, 0).strictEquals(input.getAxis()));
    }
}