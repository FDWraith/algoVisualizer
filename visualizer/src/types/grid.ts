import { Color } from './color';
import { Coord } from './coord'

export interface Grid {

    isAtMaxSize(): boolean;

    // increases the size of the grid (show more squares)
    increaseSize(): void;

    isAtMinSize(): boolean;

    // decreases the size of the grid (show fewer squares)
    decreaseSize(): void;

    // color the square at the given tile (if it can be shown, on the grid.)
    colorSquareAt(loc: Coord, c: Color): void;

    render(): any;
}