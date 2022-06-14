import { Prefab,Node, director } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { PrefabHelper } from "../Snake/Scripts/ResLoader/PrefabHelper";
import { SceneHelper } from "../Snake/Scripts/SceneHelper";
import { SnakeBodyView } from "../Snake/Scripts/Views/SnakeBodyView";

export class PrefabHelperTest extends TestCase
{   
    @Test
    async testLoad()
    {
        let prefab = PrefabHelper.GetPrefab("SnakeBody");
        Assert.AreNotEqual(undefined, prefab);
        Assert.IsTrue(prefab instanceof Prefab);
    }
    @Test
    async testInstantiate()
    {
        let instance = PrefabHelper.Instantiate("SnakeBody");
        Assert.AreNotEqual(null, instance);
        Assert.IsTrue(instance instanceof Node);
        Assert.AreEqual(SceneHelper.getScene(), instance.parent);
        instance.destroy();
    }
    @Test
    async testInstantiateAndGetComponent()
    {
        let instance = PrefabHelper.InstantiateAndGet("SnakeBody",SnakeBodyView);
        Assert.AreNotEqual(null, instance);
        Assert.IsTrue(instance instanceof SnakeBodyView);
        instance.node.destroy();
    }
}