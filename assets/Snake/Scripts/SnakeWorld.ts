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
    private snakeCount: number;
    constructor(width: number, height: number, snakeCount: number, input: IInput)
    {
        this.snakeCount = snakeCount;
        this.input = input;
        this.collider = new Collider(width, height);
        this.Restart();
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
    Restart()
	{
        this.snake = new Snake(this.snakeCount);
        this.collider.snake = this.snake;
        this.CreateFood();
        this.input.Reset();
	}
}