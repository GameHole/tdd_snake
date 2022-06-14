import { _decorator, Component, Node } from 'cc';
import { PrefabHelper } from '../ResLoader/PrefabHelper';
import { Snake } from '../Snake';
import { SnakeBody } from '../SnakeBody';
import { SnakeBodyView } from './SnakeBodyView';
const { ccclass, property } = _decorator;
@ccclass('SnakeView')
export class SnakeView extends Component 
{
	get snake(): Snake
	{
		return this._snake;
	}
	Destroy()
	{
		this.clear();
		this.node.destroy();
	}
	clear()
	{
		for (const view of this._snakeBodys)
		{
			view.node.destroy();
		}
		this._snakeBodys.splice(0, this._snakeBodys.length);
		this._snake = undefined;
	}

	getBodys(): Array<SnakeBodyView>
	{
		return this._snakeBodys;
	}
	Set(snake: Snake)
	{
		this.clear();
		this._snake = snake;
		for (const body of this._snake.head)
		{
			this.createBody(body);
		}
	}
	private _snake: Snake;
	private _snakeBodys: Array<SnakeBodyView>= new Array<SnakeBodyView>();
	private createBody(body: SnakeBody)
	{
		let clone = PrefabHelper.InstantiateAndGet("SnakeBody", SnakeBodyView);
		clone.setBody(body);
		this._snakeBodys.push(clone);
	}

	update(deltaTime: number)
	{
		if (this._snake)
		{
			if (this._snakeBodys.length != this._snake.count)
			{
				this.createBody(this._snake.tail);
			}
		}
	}
}