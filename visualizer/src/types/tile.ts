import { Color } from "./color";

enum TileType { 
    SOURCE = Color.BLUE,
    DESTINATION = Color.GREEN,
    VISITED = Color.PURPLE,
    EDGE = Color.RED,
    PATH = Color.YELLOW,
    WALL = Color.GRAY,
}

interface TileInfo {
    x: number,
    y: number,
    type: TileType,
}

export { TileType };
export type { TileInfo };
