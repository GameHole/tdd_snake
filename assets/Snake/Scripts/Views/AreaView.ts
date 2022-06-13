import { Vec2 } from "cc";
import { IPosiable } from "../IPosiable";
import { PrefabHelper } from "../ResLoader/PrefabHelper";
import { Transformer } from "../Transformer";
import { PosiableView } from "./PosiableView";

export class AreaView
{
    Destroy()
    {
		for (const item of this.drawable.values())
		{
			item.node.destroy();
		}
    }
    getPos(x: number, y: number): IPosiable
    {
		return this.drawable.get(this.toIndex(x,y));
    }
	constructor(w: number, h: number)
	{
		this.w = w + 2;
		this.h = h + 2;
		this.drawable = new Map<number, PosiableView>();
		for (let i = 0; i < this.w; i++)
		{
			this.CreateItem(i, 0);
			this.CreateItem(i, this.h - 1);
		}
		for (let i = 1; i < this.h - 1; i++)
		{
			this.CreateItem(0, i);
			this.CreateItem(this.w - 1, i);
		}
	}

	private CreateItem(i: number, j: number)
	{
		let clone = PrefabHelper.InstantiateAndGet("AreaItem", PosiableView);
		clone.position = new Vec2(i-1, j-1);
		this.drawable.set(this.toIndex(i, j), clone);
	}

	private toIndex(x: number, y: number):number
	{
		return x * this.w + y;
	}
	private drawable: Map<number, PosiableView>;
	w: number;
	h: number;
}