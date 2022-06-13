import { Vec2, Vec3 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { Snake } from "../Snake/Scripts/Snake";
import { SnakeBody } from "../Snake/Scripts/SnakeBody";
import { Collider } from "../Snake/Scripts/Table";
import { UserInput } from "../Snake/Scripts/UserInput";

export class SnakeTest extends TestCase
{    
    @Test
    testMoveSnake()
    {
        let input = new UserInput();
        input.Up();
        let snake = new Snake(3);
        snake.Move(input.getAxis());
        Assert.AreEqualVec2(new Vec2(2, 1),snake.head.position);
        Assert.AreEqualVec2(new Vec2(2, 0),snake.head.prePosition);
        Assert.AreEqualVec2(new Vec2(2, 0),snake.head.next.position);
        Assert.AreEqualVec2(new Vec2(1, 0),snake.head.next.prePosition);
        Assert.AreEqualVec2(new Vec2(1, 0),snake.tail.position);
        Assert.AreEqualVec2(new Vec2(0, 0),snake.tail.prePosition);
    }
    
    @Test
    testForeachSnake()
    { 
        let snake = new Snake(3);
        try
        {
            for (const body of snake.head)
            {
                throw new Error();
            }
            Assert.Faild();
        } catch (error) { }
        let i = 2;
        for (const body of snake.head)
        {
            Assert.AreEqualVec2(new Vec2(i--, 0),body.position);
            Assert.AreEqualVec2(snake.head.prePosition,snake.head.position);
        }
    }
    @Test
    testSnakeGrow()
    {
        let snake = new Snake(3);
        snake.Move(new Vec2(1, 0));
        snake.Move(new Vec2(1, 0));
        snake.Grow();
        Assert.AreEqual(4, snake.count);
        Assert.AreEqualVec2(new Vec2(1,0),snake.tail.position);
    }
}