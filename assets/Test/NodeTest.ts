import { director, Node } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { SceneHelper } from "../Snake/Scripts/SceneHelper";

export class NodeTest extends TestCase
{  
    @Test
    async testNodeDestroy()
    {
        let node = new Node();
        Assert.IsTrue(node.destroy());
        Assert.IsTrue(node.isValid);
        await new WaitEndOfFrame();
        Assert.IsFalse(node.isValid);
    }
    @Test
    async testNodeJoinToSceneDestroy()
    {
        let node = SceneHelper.NewNode();
        Assert.IsTrue(node.destroy());
        Assert.IsTrue(node.isValid);
        await new WaitEndOfFrame();
        Assert.IsFalse(node.isValid);
    }
}