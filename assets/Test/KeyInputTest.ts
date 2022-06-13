import { KeyCode, Node, Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { KeyInput } from "../Snake/Scripts/KeyInput";

export class KeyInputTest extends TestCase
{    
    @Test
    testDefault()
    {
        let key = new Node().addComponent(KeyInput);
        Assert.AreEqualVec2(new Vec2(1,0), key.getAxis());
    }
    @Test
    testonDown()
    {
        let key = new Node().addComponent(KeyInput);
        key.onDown(KeyCode.KEY_W);
        Assert.AreEqualVec2(new Vec2(0, 1), key.getAxis());
        key.onDown(KeyCode.KEY_S);
        Assert.AreEqualVec2(new Vec2(0, -1), key.getAxis());
        key.onDown(KeyCode.KEY_A);
        Assert.AreEqualVec2(new Vec2(-1, 0), key.getAxis());
        key.onDown(KeyCode.KEY_D);
        Assert.AreEqualVec2(new Vec2(1,0), key.getAxis());
    }
}