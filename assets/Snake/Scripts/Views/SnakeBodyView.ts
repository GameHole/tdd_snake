import { _decorator, Component, Node } from 'cc';
import { IPosiable } from '../IPosiable';
import { PosiableView } from './PosiableView';
const { ccclass, property } = _decorator;
@ccclass('SnakeBodyView')
export class SnakeBodyView extends PosiableView 
{
	private _isDestroyed: boolean = false;
	get isDestroyed(): boolean
	{
		return this._isDestroyed;
	}
	setBody(body: IPosiable)
    {
		this._body = body;
		this.syncPosition();
	}
	private _body: IPosiable;
	update (deltaTime: number)
	{
		this.syncPosition();
	}

	private syncPosition()
	{
		if (this._body)
			this.position = this._body.position;
	}
	onDestroy()
	{
		this._isDestroyed = true;
	}
}