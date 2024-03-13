import { IVisitee, IVisitor } from "./types";

export class MyCanvas implements IVisitee {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(owningDocument: Document, height: number, width: number)
    {
        this.canvas = owningDocument.createElement("canvas") as HTMLCanvasElement;
        this.canvas.height = height;
        this.canvas.width = width;

        owningDocument.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    getHeight(): number
    {
        return this.canvas.height;
    }

    getWidth(): number
    {
        return this.canvas.width;
    }

    accept(visitor: IVisitor): void {
        visitor.visitCanvas(this);
    }
}
