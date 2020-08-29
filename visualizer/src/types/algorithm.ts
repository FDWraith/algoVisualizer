import { TileInfo } from "./tile";
import { Coord } from "./coord";

export interface Algorithm { 
    // "Restarts" the algorithm, keeping the walls and source and destiantion.
    reset(): void;

    // Returns ths state of the current grid, in the form of an array of any active tiles.
    getCurrentGrid(): TileInfo[];

    // "stesp" the algrithm (runs the algorithm once)
    step(): void;

    // changes the source
    // NOTE: changing the source will reset the algorithm.
    setSource(c: Coord): void;

    // changes the destination
    // NOTE: changing the destination will reset the algorithm.
    setDestination(c: Coord): void;

    // Adds a "Wall" at the given location, which the algorithm is not allowed to 
    // traverse during the process.
    addWall(c: Coord): void;

    // Removes a Tile
    removeTile(c: Coord): void;
}