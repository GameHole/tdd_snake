import { _decorator, Component, Node, Prefab } from 'cc';
import { PrefabHelper } from './PrefabHelper';
const { ccclass, property } = _decorator;
@ccclass('ResProvider')
export class ResProvider extends Component 
{
    get(name: string): import("cc").Prefab
	{
		this.tryInit();
		return this._map.get(name);
    }
    private tryInit()
	{
		if (this._map == undefined)
		{
			this._map = new Map<string, Prefab>();
			this.prefabs.forEach(v =>
			{
				this._map.set(v.data.name, v);
			});
		}
    }
	onLoad()
	{
		PrefabHelper.Provide(this);
	}
	private _map: Map<string, Prefab>;
	@property([Prefab])
	prefabs: Prefab[] = [];
}