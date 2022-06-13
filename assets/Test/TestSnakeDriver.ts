import { director, Node, Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { WaitEndOfFrame } from "../ccUnit/Waitings/WaitEndOfFrame";
import { WaitForSeconds } from "../ccUnit/Waitings/WaitForSeconds";
import { SnakeDriver } from "../Snake/Scripts/SnakeDriver";

export class TestSnakeDriver extends TestCase
{    
    driver: SnakeDriver;
    SetUp(): void
    {
        let node = new Node();
        node.parent = director.getScene() as any;
        this.driver = node.addComponent(SnakeDriver);
    }
    TearDown(): void
    {
        this.driver.node.destroy();
    }
    @Test
    async testDriverStart()
    {
        Assert.AreEqual(15, this.driver.width);
        Assert.AreEqual(15, this.driver.height);
        Assert.AreEqual(3, this.driver.snakeCount);
        Assert.AreEqual(undefined, this.driver.world);
        Assert.AreEqual(undefined, this.driver.snakeView);
        Assert.AreEqual(undefined, this.driver.areaView);
        Assert.AreEqual(undefined, this.driver.foodView);
        await new WaitEndOfFrame();
        Assert.AreNotEqual(undefined, this.driver.world);
        Assert.AreNotEqual(undefined, this.driver.snakeView);
        Assert.AreNotEqual(undefined, this.driver.snakeView.snake);
        Assert.AreNotEqual(undefined, this.driver.areaView);
        Assert.AreNotEqual(undefined, this.driver.foodView);
        await new WaitEndOfFrame();
        Assert.AreEqualVec2(this.driver.world.food.position, this.driver.foodView.position);
    }
    @Test
    async testDriverTimer()
    {
        Assert.AreEqual(0, this.driver.dt);
        Assert.AreEqual(1, this.driver.updateDuration);
        await new WaitEndOfFrame();
        Assert.IsTrue(this.driver.dt > 0 && this.driver.dt < 1);
    }
    @Test
    async testFoodEated()
    {
        await new WaitEndOfFrame();
        this.driver.world.food.position = new Vec2(2, 0);
        await new WaitEndOfFrame();
        Assert.AreEqualVec2(this.driver.world.food.position, this.driver.foodView.position);
    }
    @Test
    async testDriverTimerReset()
    {
        await new WaitForSeconds(this.driver.updateDuration);
        Assert.AreEqual(0,this.driver.dt);
    }
    @Test
    async testDriverUpdateWorld()
    {
        await new WaitForSeconds(this.driver.updateDuration);
        Assert.AreEqualVec2(new Vec2(3, 0), this.driver.world.snake.head.position);
    }
}