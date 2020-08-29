import { Algorithm } from "../types/algorithm";
import { Coord } from "../types/coord";
import { TileInfo, TileType } from "../types/tile";
import _ from "lodash";

export default class AlgorithmBase implements Algorithm {

    source: Coord | null;
    destination: Coord | null;
    walls: Set<Coord>;
    visited: Set<Coord>;
    finished: boolean;
    path: Set<Coord> | null;
    availableTiles: Set<Coord>;

    readonly origAvailAbleTiles: Set<Coord>;

    constructor(availableTiles: Set<Coord>) {
        this.source = null;
        this.destination = null;
        this.walls = new Set<Coord>();
        this.visited = new Set<Coord>();
        this.finished = false;
        this.path = null;
        this.availableTiles = availableTiles;
        this.origAvailAbleTiles = _.clone(availableTiles);
    }

    reset(): void {
        this.finished = false;
        this.path = null;
        this.visited = new Set<Coord>();
        this.availableTiles = _.clone(this.origAvailAbleTiles);
    }

    protected getEdges(): Set<Coord> {
        return new Set<Coord>();
    }

    getCurrentGrid(): TileInfo[] {
        const tiles: { [key: string]: TileInfo } = {}

        function addTile(coord: Coord, type: TileType) {
            const asString = `${coord.x}.${coord.y}`;
            tiles[asString] = { coord, type };
        }

        function addTilesInSet(set: Set<Coord>, type: TileType) {
            set.forEach((coord) => addTile(coord, type));
        }

        addTilesInSet(this.availableTiles, TileType.EMPTY);
        addTilesInSet(this.walls, TileType.WALL);
        addTilesInSet(this.visited, TileType.VISITED);
        addTilesInSet(this.getEdges(), TileType.EDGE);

        if (this.finished && this.path) {
            addTilesInSet(this.path, TileType.PATH);
        }
        
        if (this.source) {
            addTile(this.source, TileType.SOURCE);
        }

        if (this.destination) {
            addTile(this.destination, TileType.DESTINATION);
        }

        return _.values(tiles);
    }
    
    // gets the "step" => the next tile to visit
    protected getNext(): Coord {
        throw new Error("Not implemented, please implement by extending this class")
    }

    protected generatePath() {
        this.path = null;
        console.log("Should be overridden in children methods");
    }

    private checkIsFinished() {
        if (this.availableTiles.size === 0) {
            this.finished = true;
            this.generatePath();
        }
        return true;
    }

    step(): void {
        if (!this.source || !this.destination) {
            throw new Error("Cannot run without source or destination tile");
        }

        if (this.finished || this.checkIsFinished()) {
            return;
        }

        const next: Coord = this.getNext();
        this.availableTiles.delete(next);
        this.visited.add(next);

        if (_.isEqual(next, this.destination)) {
            this.finished = true;
            this.generatePath();
        }
    }

    private clearSourceOrDestinationIfNeeded(c: Coord) {
        if (this.source && _.isEqual(this.source, c)) {
            this.source = null;
        }

        if (this.destination && _.isEqual(this.destination, c)) {
            this.destination = null;
        }
    }

    setSource(c: Coord): void {
        this.clearSourceOrDestinationIfNeeded(c);
        this.source = c;
    }

    setDestination(c: Coord): void {
        this.clearSourceOrDestinationIfNeeded(c);
        this.destination = c;
    }

    addWall(c: Coord): void {
        this.clearSourceOrDestinationIfNeeded(c);
        this.walls.add(c);
    }

    removeTile(c: Coord): void {
        this.clearSourceOrDestinationIfNeeded(c);        
        if (this.walls.has(c)) {
            this.walls.delete(c);
        }
        this.availableTiles.add(c);
    }
}