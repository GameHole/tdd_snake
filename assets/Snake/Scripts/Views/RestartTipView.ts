import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('RestartTipView')
export class RestartTipView extends Component 
{
    Hide()
    {
		this.view.active = false;
    }
	get active(): boolean
	{
		return this.view.active;
	}
	@property(Node)
	view: Node;
	@property(Button)
	btn: Button;
    onClick: () => void;
    Open()
	{
		this.view.active = true;
	}
	start()
	{
		this.btn.node.on("click", () =>
		{
			this.Hide();
			this.onClick();
		}, this);
	}
}