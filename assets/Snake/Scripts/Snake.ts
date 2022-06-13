import { Vec2 } from "cc";
import { SnakeBody } from "./SnakeBody";
export class Snake
{
    head: SnakeBody;
    tail: SnakeBody;
    private _count: number;
    get count(): number
    {
        return this._count;
    }
    constructor(count: number)
    {
        let head = new SnakeBody();
        let tail: SnakeBody;
        for (let i = 0; i < count - 1; i++)
        {
            let body = new SnakeBody();
            if (i == 0)
                head.next = body;
            else
                tail.next = body;
            tail = body;
        }
        this.head = head;
        this.tail = tail;
        this._count = count;
        this.Init(count);
    }
    private Init(count:number)
    {
        let i = count - 1;
        for (const body of this.head) 
        {
            body.position = new Vec2(i--, 0);
            body.savePosition();
        }
    }
    Move(dir: Vec2)
    {
        this.head.MoveByDir(dir);
        let preBody: SnakeBody = this.head;
        let body: SnakeBody = this.head.next;
        while (body != undefined)
        {
            body.Move(preBody);
            body = body.next;
            preBody = preBody.next;
        }
    }
    Grow()
    {
        let body = new SnakeBody();
        body.Move(this.tail);
        this.tail.next = body;
        this.tail = body;
        this._count++;
    }
}