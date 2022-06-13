import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
import { IPosiable } from '../IPosiable';
import { SnakeBody } from '../SnakeBody';
import { Transformer } from '../Transformer';
const { ccclass, property } = _decorator;
@ccclass('PosiableView')
export class PosiableView extends Component implements IPosiable
{
	get position(): Vec2
	{
		let p = this.node.position;
		return new Vec2(p.x, p.y);
	}
	set position(value: Vec2)
	{
		this.node.position = Transformer.ToView3D(value);
	}
}