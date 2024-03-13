import { Agent } from "./agent";
import { Vector } from "../base/vector";

export class Spawner {
    agentsCount: number = 20;
    spawnArea: Vector;

    constructor(spawnArea: Vector) {
        this.spawnArea = spawnArea;
    }

    spawn(): Agent[] {
        let spawnedAgents = [];
        for (let i = 0; i < this.agentsCount; i++) {
            const spawnLocation: Vector = this.getRandomLocation();
            const spawnVelocity: Vector = this.getRandomVelocity();

            // TODO: FIXME should not use spawn area
            spawnedAgents.push(new Agent(spawnLocation, spawnVelocity, this.spawnArea, "red"));
        }

        return spawnedAgents;
    }

    getRandomLocation(): Vector {
        const x = Math.random() * this.spawnArea.x;
        const y = Math.random() * this.spawnArea.y;

        return new Vector(x, y);
    }

    getRandomVelocity(): Vector {
        const x = Math.random() - 0.5;
        const y = Math.random() - 0.5;

        return new Vector(x, y).normalize().multiply(100);
    }
}