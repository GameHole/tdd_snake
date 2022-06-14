import { _decorator, Component, Node } from 'cc';
import { KeyInput } from './KeyInput';
import { PrefabHelper } from './ResLoader/PrefabHelper';
import { SceneHelper } from './SceneHelper';
import { Snake } from './Snake';
import { SnakeWorld } from './SnakeWorld';
import { UserInput } from './UserInput';
import { AreaView } from './Views/AreaView';
import { PosiableView } from './Views/PosiableView';
import { RestartTipView } from './Views/RestartTipView';
import { SnakeBodyView } from './Views/SnakeBodyView';
import { SnakeView } from './Views/SnakeView';
const { ccclass, property } = _decorator;
@ccclass('SnakeDriver')
export class SnakeDriver extends Component 
{
	world: SnakeWorld;
	runtimeDuration: number = 1;
	width: number = 15;
    height: number = 15;
    snakeCount: number = 3;
	dt: number = 0;
	updateDuration: number = 1;
    snakeView: SnakeView;
    areaView: AreaView;
    foodView: SnakeBodyView;
	tip: RestartTipView;
	start()
	{
		this.world = new SnakeWorld(this.width, this.height, this.snakeCount,this.addComponent(KeyInput));
		this.snakeView = this.node.addComponent(SnakeView);
		this.areaView = new AreaView(this.width, this.height);
		this.foodView = PrefabHelper.InstantiateAndGet("Food", SnakeBodyView);
		this.foodView.setBody(this.world.food);
		this.tip = SceneHelper.GetFirstCmp(RestartTipView);
		this.tip.onClick = () => this.Restart();

		this.reset();
	}
	update (deltaTime: number)
	{
		this.dt += deltaTime;
		if (this.dt >= this.runtimeDuration)
		{
			this.world.Update();
			this.dt = 0;
		}
		if (this.world.isFaild())
		{
			this.tip.Open();
		}
		this.runtimeDuration = this.updateDuration - (this.world.snake.count - this.snakeCount) * 0.01;
	}
	Restart()
    {
		this.world.Restart();
		this.reset();
    }

	private reset()
	{
		this.snakeView.Set(this.world.snake);
		this.runtimeDuration = this.updateDuration;
	}
}