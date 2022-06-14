import { Component, director, Node } from "cc";

export class SceneHelper
{
    static NewNode():Node
    {
        let node = new Node();
        node.parent = this.getScene();
        return node;
    }
    static getScene(): Node
    {
        return director.getScene() as any;
    }

    static GetFirstCmp<T extends Component>(type: {prototype:T,new():T}):T
    {
        let scene = this.getScene();
        return scene.getComponentInChildren(type);
    }  
}