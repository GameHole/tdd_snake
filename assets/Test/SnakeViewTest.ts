import { director, Node } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { Snake } from "../Snake/Scripts/Snake";
import { Transformer } from "../Snake/Scripts/Transformer";
import { SnakeBodyView } from "../Snake/Scripts/Views/SnakeBodyView";
import { SnakeView } from "../Snake/Scripts/Views/SnakeView";

export class SnakeViewTest extends TestCase
{    
    snake: Snake;
    view: SnakeView;
    SetUp(): void
    {
        this.snake = new Snake(3);
        let node = new Node();
        node.parent = director.getScene() as any;
        this.view = node.addComponent(SnakeView);
        this.view.Set(this.snake);
    }
    TearDown(): void
    {
        this.view.Destroy();
    }
    @Test
    async testSnakeViewDestroy()
    {
        let node = new Node();
        node.parent = director.getScene() as any;
        let view = node.addComponent(SnakeView);
        view.Set(new Snake(3));
        let orgion = new Array<SnakeBodyView>();
        for (const iterator of view.getBodys())
        {
            orgion.push(iterator);
        }
        view.Destroy();
        Assert.AreEqual(0, view.getBodys().length);
        await new WaitEndOfFrame();
        Assert.IsFalse(view.isValid);
        for (const iterator of orgion)
        {
            Assert.IsTrue(iterator.isDestroyed);
        }
    }
    @Test
    testSnakeView()
    {
        let views = this.view.getBodys();
        Assert.AreEqual(this.snake.count, views.length);
        let id = 0;
        for (const body of this.snake.head)
        {
            let bodyView = views[id++];
            Assert.AreEqualVec2(Transformer.ToView(body.position), bodyView.position);
        }
    }
    @Test
    async testSnakeViewGrow()
    {
        this.snake.Grow();
        await new WaitEndOfFrame();
        let views = this.view.getBodys();
        Assert.AreEqual(this.snake.count, views.length);
    }
}