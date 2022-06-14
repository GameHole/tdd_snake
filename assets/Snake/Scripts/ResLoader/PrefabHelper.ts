import { director, instantiate, Prefab,Node, Component } from "cc";
import { SceneHelper } from "../SceneHelper";
import { SnakeBodyView } from "../Views/SnakeBodyView";
import { ResProvider } from "./ResProvider";

export class PrefabHelper
{
    static InstantiateAndGet<T extends Component>(name: string, type?: { prototype: T, new(): T }): T
    {
        let clone = this.Instantiate(name);
        if (!clone)
            return null;
        return clone.getComponent(type);
    }
    static Instantiate(name: string):Node
    {
        let prefab = this.GetPrefab(name);
        if (!prefab)
            return null;
        let clone = instantiate(prefab);
        clone.parent = SceneHelper.getScene();
        return clone;
    }
    private static _provider: ResProvider;
    static Provide(provider: ResProvider)
    {
        this._provider = provider;
    }
    static GetPrefab(name: string):Prefab
    {
        return this._provider.get(name);
    }    
}