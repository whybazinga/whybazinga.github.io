import { Agent } from "./agent/agent";
import { MyCanvas } from "./canvas";

export interface IVisitor {
    visitAgent(agent: Agent): void;
    visitCanvas(canvas: MyCanvas): void;
}

export interface IVisitee {
    accept(visitor: IVisitor): void;
}