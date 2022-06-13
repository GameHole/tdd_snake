import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { Snake } from "../Snake/Scripts/Snake";
import { Collider } from "../Snake/Scripts/Table";

export class ColliderTest extends TestCase
{
    @Test
    testSnakeColliderBody()
    { 
        let snake = new Snake(5);
        let collider = new Collider(15,15,snake);
        Assert.IsFalse(collider.containCollection());
        snake.Move(new Vec2(0, 1));
        snake.Move(new Vec2(-1, 0));
        snake.Move(new Vec2(0, -1));
        Assert.IsTrue(collider.containCollection());
    }
    @Test
    testTable()
    { 
        let snake = new Snake(3);
        let collider = new Collider(5, 5, snake);
        let tailpos = snake.tail.position;
        collider.printSnakeWithoutHead();
        Assert.AreEqual(1,collider.getValue(tailpos));
        snake.Move(new Vec2(0, 1));
        collider.printSnakeWithoutHead();
        Assert.AreNotEqual(1,collider.getValue(tailpos));
    }
    @Test
    testSnakeOutRangeMaxX()
    { 
        let snake = new Snake(3);
        let collider = new Collider(5,5,snake);
        Assert.IsFalse(collider.containCollection());
        for (let i = 0; i < 3; i++)
        {
            snake.Move(new Vec2(1, 0));
        }
        Assert.IsTrue(collider.containCollection());
    }
    @Test
    testSnakeOutRangeMinX()
    { 
        let snake = new Snake(3);
        let collider = new Collider(5,5,snake);
        Assert.IsFalse(collider.containCollection());
        snake.Move(new Vec2(0, 1));
        for (let i = 0; i < 3; i++)
        {
            snake.Move(new Vec2(-1, 0));
        }
        Assert.IsTrue(collider.containCollection());
    }
    @Test
    testSnakeOutRangeMinY()
    { 
        let snake = new Snake(3);
        let collider = new Collider(5,5,snake);
        Assert.IsFalse(collider.containCollection());
        snake.Move(new Vec2(0, -1));
        Assert.IsTrue(collider.containCollection());
    }
    @Test
    testSnakeOutRangeMaxY()
    { 
        let snake = new Snake(3);
        let collider = new Collider(5, 1, snake);
        Assert.IsFalse(collider.containCollection());
        snake.Move(new Vec2(0, 1));
        Assert.IsTrue(collider.containCollection());
    } 
    @Test
    testEmptyPos()
    {
        let snake = new Snake(3);
        let table = new Collider(5, 5, snake);
        let pos = table.getEmptyPoses();
        for (const body of snake.head)
        {
            Assert.AreEqual(-1, pos.findIndex((v) => body.position.strictEquals(v)));
        }
    }
}