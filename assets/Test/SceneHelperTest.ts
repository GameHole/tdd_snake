import { director, Node } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { SceneHelper } from "../Snake/Scripts/SceneHelper";
import { TestComponent } from "./TestComponent";

export class SceneHelperTest extends TestCase
{    
    @Test
    testGet()
    {
        let cmp = SceneHelper.GetFirstCmp(TestComponent);
        Assert.AreEqual(null, cmp);
        let node = SceneHelper.NewNode();
        node.addComponent(TestComponent);
        cmp = SceneHelper.GetFirstCmp(TestComponent);
        Assert.AreNotEqual(null, cmp);
        Assert.IsTrue(cmp instanceof TestComponent);
        node.destroy();
    }
    @Test
    testNewNode()
    {
        let node = SceneHelper.NewNode();
        Assert.AreNotEqual(null, node);
        Assert.AreEqual(SceneHelper.getScene(), node.parent);
    }
}