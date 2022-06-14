import { director, Node, Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { WaitForSeconds } from "../ccUnit/Waitings/WaitForSeconds";
import { SceneHelper } from "../Snake/Scripts/SceneHelper";
import { SnakeDriver } from "../Snake/Scripts/SnakeDriver";
import { RestartTipView } from "../Snake/Scripts/Views/RestartTipView";

export class TestSnakeDriver extends TestCase
{    
    driver: SnakeDriver;
    SetUp(): void
    {
        let node = new Node();
        this.driver = node.addComponent(SnakeDriver);
    }
    TearDown(): void
    {
        this.driver.node.destroy();
    }
    @Test
    testDriverStart()
    {
        Assert.AreEqual(15, this.driver.width);
        Assert.AreEqual(15, this.driver.height);
        Assert.AreEqual(3, this.driver.snakeCount);
        Assert.AreEqual(undefined, this.driver.world);
        Assert.AreEqual(undefined, this.driver.snakeView);
        Assert.AreEqual(undefined, this.driver.areaView);
        Assert.AreEqual(undefined, this.driver.foodView);
        this.driver.start();
        Assert.AreNotEqual(undefined, this.driver.world);
        Assert.AreNotEqual(undefined, this.driver.snakeView);
        Assert.AreNotEqual(undefined, this.driver.snakeView.snake);
        Assert.AreNotEqual(undefined, this.driver.areaView);
        Assert.AreNotEqual(undefined, this.driver.foodView);
        Assert.AreNotEqual(undefined, this.driver.tip);
        Assert.AreEqual("() => this.Restart()", String(this.driver.tip.onClick));
        this.driver.update(0.01);
        Assert.AreEqualVec2(this.driver.world.food.position, this.driver.foodView.position);
    }
    @Test
    testDriverSpeed()
    {
        this.driver.start();
        Assert.AreEqual(this.driver.updateDuration, this.driver.runtimeDuration);
        this.driver.world.snake.Grow();
        this.driver.update(0.01);
        Assert.AreEqual(0.99, this.driver.runtimeDuration);
        this.driver.world.snake.Grow();
        this.driver.update(0.01);
        Assert.AreEqual(0.98, this.driver.runtimeDuration);
    }
    @Test
    testDriverTimer()
    {
        this.driver.start();
        Assert.AreEqual(0, this.driver.dt);
        Assert.AreEqual(1, this.driver.updateDuration);
        this.driver.update(0.01);
        Assert.AreEqual(0.01, this.driver.dt);
    }
    @Test
    async testFoodEated()
    {
        this.driver.start();
        this.driver.world.food.position = new Vec2(2, 0);
        await new WaitEndOfFrame();
        this.driver.update(0.01);
        Assert.AreEqualVec2(this.driver.world.food.position, this.driver.foodView.position);
    }
    @Test
    testDriverTimerReset()
    {
        this.driver.start();
        this.driver.runtimeDuration = 0.5;
        this.driver.update(this.driver.runtimeDuration);
        Assert.AreEqual(0,this.driver.dt);
    }
    @Test
    testDriverUpdateWorld()
    {
        this.driver.start();
        this.driver.runtimeDuration = 0.5;
        this.driver.update(this.driver.runtimeDuration);
        Assert.AreEqualVec2(new Vec2(3, 0), this.driver.world.snake.head.position);
    }
    @Test
    testRestart()
    {
        this.driver.start();
        this.driver.runtimeDuration = 0.5;
        this.driver.Restart();
        Assert.AreEqual(this.driver.world.snake, this.driver.snakeView.snake);
        Assert.AreEqual(this.driver.updateDuration, this.driver.runtimeDuration);
    }
    @Test
    testShowRestartTip()
    {
        let dia = SceneHelper.GetFirstCmp(RestartTipView);
        Assert.IsFalse(dia.active);
        this.driver.width = this.driver.height = this.driver.snakeCount - 1;
        this.driver.start();
        this.driver.update(0.1);
        Assert.IsTrue(this.driver.world.isFaild());
        Assert.IsTrue(dia.active);
    }
}