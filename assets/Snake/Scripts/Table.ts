import { Vec2 } from "cc";
import { Snake } from "./Snake";
import { SnakeBody } from "./SnakeBody";

export class Collider
{
    private width: number;
    private height: number;
    private snake: Snake;
    private _table: Array<Array<number>>;
    getEmptyPoses()
    {
        let emptyPoss = new Array<Vec2>();
        for (let i = 0; i < this.width; i++)
        {
            for (let j = 0; j < this.height; j++)
            {
                emptyPoss.push(new Vec2(i, j));
            }
        }
        for (const body of this.snake.head)
        {
            let idx = emptyPoss.findIndex((v) => body.position.strictEquals(v));
            if (idx >= 0)
                emptyPoss.splice(idx, 1);
        }
        return emptyPoss;
    }

    get table(): Array<Array<number>>
    {
        return this._table;
    }
    getValue(position: Vec2):number
    {
        return this.table[position.x][position.y];
    }
    setValue(position: Vec2, value: number): void
    {
        this.table[position.x][position.y] = value;
    }
    constructor(width: number, height: number, snake: Snake)
    {
        this.width = width;
        this.height = height;
        this.snake = snake;
        this.initTable();
    }
    private initTable()
    {
        this._table = new Array<Array<number>>();
        for (let i = 0; i < this.width; i++)
        {
            this._table.push(new Array<number>(this.height));
        }
    }
    private clearTable()
    {
        for (let i = 0; i < this.width; i++)
        {
            for (let j = 0; j < this.height; j++)
            {
                this._table[i][j] = 0;
            }
        }
    }
    printSnakeWithoutHead()
    {
        this.printSnake(this.snake.head.next);
    }
    private printSnake(startBody:SnakeBody)
    {
        this.clearTable();
        for (const body of startBody)
        {
            this.setValue(body.position, 1);
        }
    }

    containCollection(): boolean
    {
        let p = this.snake.head.position;
        return !this.isInRange(p) || this.isSnakeCollection(p);
    }
    isInRange(p: Vec2): boolean
    {
        if (p.x < 0 || p.x >= this.width || p.y < 0 || p.y >= this.height)
            return false;
        return true;
    }
    isSnakeCollection(pos:Vec2)
    {
        this.printSnakeWithoutHead();
        return this.getValue(pos) == 1;
    }
}