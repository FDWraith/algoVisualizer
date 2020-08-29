import { Color } from "./color";
import { Coord } from "./coord";

enum TileType { 
    SOURCE = Color.BLUE,
    DESTINATION = Color.GREEN,
    VISITED = Color.PURPLE,
    EDGE = Color.RED,
    PATH = Color.YELLOW,
    WALL = Color.GRAY,
    EMPTY = Color.WHITE,
}

interface TileInfo {
    coord: Coord,
    type: TileType,
}

export { TileType };
export type { TileInfo };
