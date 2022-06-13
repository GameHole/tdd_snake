import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { SnakeWorld } from "../Snake/Scripts/SnakeWorld";
import { UserInput } from "../Snake/Scripts/UserInput";

export class SnakeWorldTest extends TestCase
{    
    world: SnakeWorld;
    input: UserInput;
    SetUp(): void
    {
        this.input = new UserInput();
        this.world = new SnakeWorld(5, 5, 3, this.input);
    }
    @Test
    testSnakeMoveUpdate()
    {
        this.world.Update();
        Assert.AreEqualVec2(new Vec2(3, 0),this.world.snake.head.position);
        this.input.Up();
        this.world.Update();
        Assert.AreEqualVec2(new Vec2(3, 1),this.world.snake.head.position);
    }
    @Test
    testCreateFood()
    {
        for (let i = 0; i < 1000; i++)
        {
            let food = this.world.CreateFood();
            Assert.IsTrue(this.world.collider.isInRange(food.position));
            Assert.IsFalse(this.world.collider.isSnakeCollection(food.position));   
        }
    }
    @Test
    testCreateFoodNotChangeInstance()
    {
        let foodorg = this.world.CreateFood();
        Assert.AreEqual(foodorg, this.world.CreateFood());
        Assert.AreEqual(foodorg, this.world.food);
    }
    @Test
    testisEat()
    {
        this.world.food.position = new Vec2(2, 0);
        Assert.IsTrue(this.world.isEat());
        this.world.food.position = new Vec2(3, 0);
        Assert.IsFalse(this.world.isEat());
    }
    @Test
    testEatFood()
    {
        let food = this.world.food;
        food.position = new Vec2(3, 0);
        this.world.Update();
        Assert.AreEqual(4, this.world.snake.count);
        Assert.AreEqual(food, this.world.food);
    }
    @Test
    testFaild()
    {
        for (let i = 0; i < 2; i++)
        {
            this.world.Update();
        }
        let prePos = this.world.snake.head.position;
        this.world.Update();
        Assert.IsTrue(this.world.isFaild());
        this.world.Update();
        Assert.AreEqualVec2(prePos,this.world.snake.head.position);
    }
}