import { Agent } from "./agent/agent";
import { MyCanvas } from "./canvas";
import { Renderer } from "./renderer";
import { Spawner } from "./agent/spawner";
import { Vector } from "./base/vector";

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 1000;

let canvas = new MyCanvas(document, CANVAS_HEIGHT, CANVAS_WIDTH);
let renderer = new Renderer(canvas);
const spawner = new Spawner(new Vector(CANVAS_WIDTH, CANVAS_HEIGHT));

const agents: Agent[] = spawner.spawn();

let previousTimestamp: DOMHighResTimeStamp = performance.now();
function renderLoop(now: DOMHighResTimeStamp) {
    const deltaTime = now - previousTimestamp;
    previousTimestamp = now;

    canvas.accept(renderer);
    agents.forEach(agent => agent.tick(deltaTime / 1000));
    agents.forEach(agent => agent.accept(renderer));

    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
