import { Vec2,Node } from "cc";
import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { PrefabHelper } from "../Snake/Scripts/ResLoader/PrefabHelper";
import { Snake } from "../Snake/Scripts/Snake";
import { Collider } from "../Snake/Scripts/Table";
import { Transformer } from "../Snake/Scripts/Transformer";
import { AreaView } from "../Snake/Scripts/Views/AreaView";

export class AreaViewTest extends TestCase
{    
    @Test
    testAreaView()
    {
        let w = 5;
        let h = 5;
        let area = new AreaView(w, h);
        Assert.AreEqual(w + 2, area.w);
        Assert.AreEqual(h + 2, area.h);
        for (let i = 0; i < area.w; i++)
        {
            for (let j = 0; j < area.h; j++)
            {
                if (i == 0 || j == 0 || j == area.h - 1 || i == area.w - 1)
                {
                    let posView = area.getPos(i, j);
                    Assert.AreNotEqual(undefined, posView, i + "," + j);
                    Assert.AreEqualVec2(Transformer.ToView(new Vec2(i-1, j-1)), posView.position, i + "," + j);
                }
            }
        }
        area.Destroy();
    }
}