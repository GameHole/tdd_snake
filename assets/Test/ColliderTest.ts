import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { Snake } from "../Snake/Scripts/Snake";
import { Collider } from "../Snake/Scripts/Table";

export class ColliderTest extends TestCase
{
    snake: Snake;
    collider: Collider;
    SetUp(): void
    {
        this.setUpInternal(5, 5, 3);
    }
    setUpInternal(w:number,h:number,s:number): void
    {
        this.snake = new Snake(s);
        this.collider = new Collider(w, h);
        this.collider.snake = this.snake;
    }
    @Test
    testSnakeColliderBody()
    { 
        this.setUpInternal(15,15,5)
        Assert.IsFalse(this.collider.containCollection());
        this.snake.Move(new Vec2(0, 1));
        this.snake.Move(new Vec2(-1, 0));
        this.snake.Move(new Vec2(0, -1));
        Assert.IsTrue(this.collider.containCollection());
    }
    @Test
    testTable()
    { 
        let tailpos = this.snake.tail.position;
        this.collider.printSnakeWithoutHead();
        Assert.AreEqual(1,this.collider.getValue(tailpos));
        this.snake.Move(new Vec2(0, 1));
        this.collider.printSnakeWithoutHead();
        Assert.AreNotEqual(1,this.collider.getValue(tailpos));
    }
    @Test
    testSnakeOutRangeMaxX()
    { 
        Assert.IsFalse(this.collider.containCollection());
        for (let i = 0; i < 3; i++)
        {
            this.snake.Move(new Vec2(1, 0));
        }
        Assert.IsTrue(this.collider.containCollection());
    }
    @Test
    testSnakeOutRangeMinX()
    { 
        Assert.IsFalse(this.collider.containCollection());
        this.snake.Move(new Vec2(0, 1));
        for (let i = 0; i < 3; i++)
        {
            this.snake.Move(new Vec2(-1, 0));
        }
        Assert.IsTrue(this.collider.containCollection());
    }
    @Test
    testSnakeOutRangeMinY()
    { 
        Assert.IsFalse(this.collider.containCollection());
        this.snake.Move(new Vec2(0, -1));
        Assert.IsTrue(this.collider.containCollection());
    }
    @Test
    testSnakeOutRangeMaxY()
    { 
        Assert.IsFalse(this.collider.containCollection());
        for (let i = 0; i < 5; i++)
        {
            this.snake.Move(new Vec2(0, 1));
        }
        Assert.IsTrue(this.collider.containCollection());
    } 
    @Test
    testEmptyPos()
    {
        let pos = this.collider.getEmptyPoses();
        for (const body of this.snake.head)
        {
            Assert.AreEqual(-1, pos.findIndex((v) => body.position.strictEquals(v)));
        }
    }
}