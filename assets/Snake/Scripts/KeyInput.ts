import { _decorator, Component, Vec2, input, Input, KeyCode } from 'cc';
import { IInput } from './IInput';
import { UserInput } from './UserInput';
const { ccclass, property } = _decorator;
@ccclass('KeyInput')
export class KeyInput extends Component implements IInput
{
	Reset()
	{
		this._input.Reset();
	}
	private _input: UserInput = new UserInput();
	getAxis(): Vec2
	{
		return this._input.getAxis();
	}
	onLoad()
	{
		input.on(Input.EventType.KEY_DOWN, (e) =>
		{
			this.onDown(e.keyCode);
		}, this);
	}

	onDown(keyCode:KeyCode)
	{
		switch (keyCode)
		{
			case KeyCode.KEY_W:
				this._input.Up();
				break;
			case KeyCode.KEY_S:
				this._input.Down();
				break;
			case KeyCode.KEY_A:
				this._input.Left();
				break;
			case KeyCode.KEY_D:
				this._input.Right();
				break;
		}
	}
}