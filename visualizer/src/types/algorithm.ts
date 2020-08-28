import { TileInfo } from "./tile";

export interface Algorithm { 
    
    reset(): void;

    // Returns a list of all the tiles that this algorithm is tracking
    stepOnce(): TileInfo[];

    setSource(x: number, y: number): void;

    setDestination(x: number, y: number): void;

    addWall(x: number, y: number): void;

}