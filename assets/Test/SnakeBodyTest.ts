import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { SnakeBody } from "../Snake/Scripts/SnakeBody";
import { UserInput } from "../Snake/Scripts/UserInput";

export class SnakeBodyTest extends TestCase
{ 
    @Test
    testVec2Equal()
    {
        Assert.IsTrue(new Vec2(1, 1).strictEquals(new Vec2(1, 1)));
    }
    @Test
    testCreateSnakeBody()
    {
        let body = new SnakeBody();
        Assert.AreEqualVec2(new Vec2(0, 0),body.position);
    }
    @Test
    testMoveSnakeHead()
    {
        let input = new UserInput();
        input.Up();
        let head = new SnakeBody();
        head.MoveByDir(input.getAxis());
        Assert.AreEqualVec2(new Vec2(0, 1),head.position);
        input.Left();
        head.MoveByDir(input.getAxis());
        Assert.AreEqualVec2(new Vec2(-1, 1),head.position);
    }
    @Test
    testSyncProPosition()
    {
        let body = new SnakeBody();
        body.position = new Vec2(1, 0);
        body.savePosition();
        Assert.AreEqualVec2(body.prePosition,body.position);
    }
    @Test
    testMoveSnakeBody()
    {
        let preBody = new SnakeBody();
        preBody.position = new Vec2(1, 0);
        preBody.savePosition();
        let body = new SnakeBody();
        body.Move(preBody);
        Assert.AreEqualVec2(new Vec2(1, 0),body.position);
        Assert.AreEqualVec2(new Vec2(0, 0),body.prePosition);
    }
    @Test
    testMoveSnakeBodyFollowHead()
    {
        let head = new SnakeBody();
        head.MoveByDir(new Vec2(1, 0));
        let body = new SnakeBody();
        body.Move(head);
        Assert.IsTrue(new Vec2(0, 0).strictEquals(body.position));
    }
}