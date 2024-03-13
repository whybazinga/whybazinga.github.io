import { Vector } from "../base/vector";
import { IVisitee, IVisitor } from "../types"

export class Agent implements IVisitee
{
    location: Vector;
    velocity: Vector;
    maxSpeed: number = 100;
    neighboursCheckRadius: number = 80;
    color: string;

    navigableArea: Vector;

    static agents: Agent[] = [];

    constructor(location: Vector, velocity: Vector, navigableArea: Vector, color: string) {
        this.location = location;
        this.velocity = velocity.copy().normalize().multiply(this.maxSpeed);

        this.navigableArea = navigableArea;

        this.color = color;
        Agent.agents.push(this);
        console.log("spawn!")
    }

    getLocation(): Vector {
        return this.location;
    }

    accept(visitor: IVisitor): void {
        visitor.visitAgent(this);
    }

    tick(deltaTime: number): void {
        for (const agent of Agent.agents) {
            if (agent === this) continue;

            if (agent.getLocation().distanceTo(this.getLocation()) > this.neighboursCheckRadius) continue;

            this.velocity.add(agent.velocity);
        }
        this.velocity.divide(Agent.agents.length).normalize().multiply(this.maxSpeed);

        this.location.add(this.velocity.copy().multiply(deltaTime));

        this.fixLocation();
    }

    private fixLocation(): void {
        if (this.location.x < 0) {
            this.location.x += this.navigableArea.x;
        }

        if (this.location.x > this.navigableArea.x) {
            this.location.x %= this.navigableArea.x;
        }

        if (this.location.y < 0) {
            this.location.y += this.navigableArea.y;
        }

        if (this.location.y > this.navigableArea.y) {
            this.location.y %= this.navigableArea.y;
        }
    }
}