import { Vec2 } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { Food } from "../Snake/Scripts/Food";

export class FoodTest extends TestCase
{
    @Test
    testNewFood()
    {
        let food = new Food();
        Assert.AreEqualVec2(new Vec2(0, 0),food.position);
    }
}