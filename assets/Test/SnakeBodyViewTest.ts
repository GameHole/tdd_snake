import { Vec2, Vec3 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { PrefabHelper } from "../Snake/Scripts/ResLoader/PrefabHelper";
import { SnakeBody } from "../Snake/Scripts/SnakeBody";
import { Transformer } from "../Snake/Scripts/Transformer";
import { PosiableView } from "../Snake/Scripts/Views/PosiableView";
import { SnakeBodyView } from "../Snake/Scripts/Views/SnakeBodyView";

export class SnakeBodyViewTest extends TestCase
{    
    snakeBodyView: SnakeBodyView;
    SetUp(): void
    {
        this.snakeBodyView = PrefabHelper.Instantiate("SnakeBody").getComponent(SnakeBodyView);
    }
    TearDown(): void
    {
        this.snakeBodyView.node.destroy();
    }
    @Test
    testToView3D()
    {
        Assert.IsTrue(new Vec3(1, 1, 0).strictEquals(Transformer.ToView3D(new Vec2(1, 1))));  
    }
    @Test
    async testSyncSnakeBody()
    {
        let body = new SnakeBody();
        body.position = new Vec2(1, 0);
        this.snakeBodyView.setBody(body);
        Assert.AreEqualVec2(Transformer.ToView(body.position),this.snakeBodyView.position);
        body.position = new Vec2(2, 0);
        await new WaitEndOfFrame();
        Assert.AreEqualVec2(Transformer.ToView(body.position),this.snakeBodyView.position);
    }
}