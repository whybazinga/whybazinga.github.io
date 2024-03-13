import { Agent } from "./agent/agent";
import { Vector } from "./base/vector";
import { MyCanvas } from "./canvas";
import { IVisitor } from "./types";

export class Renderer implements IVisitor {
    context: CanvasRenderingContext2D;

    constructor(canvas: MyCanvas)
    {
        this.context = canvas.context;
    }

    visitAgent(agent: Agent): void {
        this.context.fillStyle = agent.color;

        this.context.beginPath();
        this.context.arc(agent.getLocation().x, agent.getLocation().y, 10, 0, 2 * Math.PI);
        this.context.closePath();

        this.context.fill();

        this.context.strokeStyle = "green";
        const velocityLocation: Vector = agent.getLocation().copy().add(agent.velocity);
        this.context.lineTo(velocityLocation.x, velocityLocation.y);
        this.context.stroke();

        this.context.strokeStyle = "red";
        const arcStart = agent.getLocation().copy().add(Vector.right().multiply(agent.neighboursCheckRadius));
        this.context.moveTo(arcStart.x, arcStart.y);
        this.context.arc(agent.getLocation().x, agent.getLocation().y, agent.neighboursCheckRadius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    visitCanvas(canvas: MyCanvas): void {
        this.context.fillStyle = "lightgray";
        this.context.fillRect(0, 0, canvas.getWidth(), canvas.getHeight());
    }
}