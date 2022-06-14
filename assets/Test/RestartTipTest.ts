import { Assert } from "../ccUnit/Assert";
import { TestCase } from "../ccUnit/TestCase";
import { Test } from "../ccUnit/TestCollection/TestAttribbute";
import { SceneHelper } from "../Snake/Scripts/SceneHelper";
import { RestartTipView } from "../Snake/Scripts/Views/RestartTipView";

export class RestartTipTest extends TestCase
{    
    dia: RestartTipView;
    SetUp(): void
    {
        this.dia = SceneHelper.GetFirstCmp(RestartTipView);
        this.dia.onClick = undefined;
    }
    TearDown(): void
    {
        this.dia.Hide();
    }
    @Test
    async testShowHide()
    {
        Assert.IsFalse(this.dia.active);
        this.dia.Open();
        Assert.IsTrue(this.dia.active);
        this.dia.Hide();
        Assert.IsFalse(this.dia.active);
    }
    @Test
    testTryCatchStringError()
    {
        try
        {
            throw "this_is_a_string"
        } catch (error)
        {
            Assert.AreEqual("this_is_a_string", error);
        }
    }
    @Test
    async testClickRestart()
    {
        let dia = SceneHelper.GetFirstCmp(RestartTipView);
        dia.Open();
        dia.onClick = () =>
        {
            throw "onclick";
        }
        try {
            dia.btn.node.emit("click");
            Assert.Faild();
        } catch (error) {
            Assert.AreEqual("onclick",error);
        }
        Assert.IsFalse(this.dia.active);
    }
   
}