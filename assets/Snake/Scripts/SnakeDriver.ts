import { _decorator, Component, Node } from 'cc';
import { KeyInput } from './KeyInput';
import { PrefabHelper } from './ResLoader/PrefabHelper';
import { SnakeWorld } from './SnakeWorld';
import { UserInput } from './UserInput';
import { AreaView } from './Views/AreaView';
import { PosiableView } from './Views/PosiableView';
import { SnakeBodyView } from './Views/SnakeBodyView';
import { SnakeView } from './Views/SnakeView';
const { ccclass, property } = _decorator;
@ccclass('SnakeDriver')
export class SnakeDriver extends Component 
{
	world: SnakeWorld;
	width: number = 15;
    height: number = 15;
    snakeCount: number = 3;
	dt: number = 0;
	updateDuration: number = 1;
    snakeView: SnakeView;
    areaView: AreaView;
    foodView: SnakeBodyView;
	
	start()
	{
		this.world = new SnakeWorld(this.width, this.height, this.snakeCount,this.addComponent(KeyInput));
		this.snakeView = this.node.addComponent(SnakeView);
		this.snakeView.Set(this.world.snake);
		this.areaView = new AreaView(this.width, this.height);
		this.foodView = PrefabHelper.InstantiateAndGet("Food", SnakeBodyView);
		this.foodView.setBody(this.world.food);
	}
	update (deltaTime: number)
	{
		this.dt += deltaTime;
		if (this.dt > this.updateDuration)
		{
			this.world.Update();
			this.dt = 0;
		}
	}
}