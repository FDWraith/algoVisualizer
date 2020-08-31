import _ from 'lodash';
import AlgorithmBase from "./AlgorithmBase";
import { Coord } from "../types/coord";

export default class DFSAlgorithm extends AlgorithmBase {
    edges: Array<Coord>;
    pathMap: Map<Coord, Coord>;

    constructor(availableTiles: Set<Coord>) {
        super(availableTiles);
        this.edges = new Array<Coord>();
        this.pathMap = new Map<Coord, Coord>();
    }

    start(): void {
        super.start();
        if (this.source) {
           this.edges.push(this.source);
        }
    }

    protected visit(c: Coord) {
        super.visit(c);
        
        const neighbors = [
            {
                x: c.x,
                y: c.y + 1,
            },
            {
                x: c.x,
                y: c.y - 1,
            },
            {
                x: c.x + 1,
                y: c.y,
            },
            {
                x: c.x - 1,
                y: c.y,
            }
        ];
        
        neighbors.forEach(neighbor => {
            if (this.availableTiles.has(neighbor)) {
                this.edges.push(neighbor);
            }

            this.pathMap.set(neighbor, c);
        });
    }

    protected getNext(): Coord {
        let next = this.edges.pop();
        if (!next) {
            throw new Error("No more paths left");
        }

        while (!this.availableTiles.has(next)) {
            next = this.edges.pop();
            if (!next) {
                throw new Error("No more paths left");
            }
        }
        return next;
    }

    protected getEdges() {
        return new Set<Coord>(this.edges);
    }

    protected generatePath() {
        if (!this.destination) {
            throw new Error("Cannot generate path without destination node");
        }
        let node = this.destination;
        const path = new Set<Coord>();
        while (_.isEqual(node, this.source)) {
            path.add(node);
            const n = this.pathMap.get(node);
            if (n) {
                node = n;
            } else {                
                throw new Error("Could not generate a path");
            }
        }
        this.path = path;
    }
}

