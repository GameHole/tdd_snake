import { randomRangeInt, Vec2 } from "cc";
import { Food } from "./Food";
import { IInput } from "./IInput";
import { Snake } from "./Snake";
import { Collider } from "./Table";
import { UserInput } from "./UserInput";

export class SnakeWorld
{
    input: IInput;
    collider: Collider;
    snake: Snake;
    food: Food = new Food();
    constructor(width: number, height: number, snakeCount: number, input: IInput)
    {
        this.snake = new Snake(snakeCount);
        this.collider = new Collider(width, height, this.snake);
        this.input = input;
        this.food = this.CreateFood();
    }
    isEat(): boolean
    {
        return this.snake.head.position.strictEquals(this.food.position);
    }
    CreateFood(): Food
    {
        let emptyPoss = this.collider.getEmptyPoses();
        this.food.position = emptyPoss[randomRangeInt(0, emptyPoss.length)];
        return this.food;
    }
    isFaild(): boolean
    {
        return this.collider.containCollection();
    }
    Update()
    {
        if (this.isFaild())
            return;
        this.snake.Move(this.input.getAxis());
        if (this.isEat())
        {
            this.snake.Grow();
            this.food = this.CreateFood();
        }
    }
}