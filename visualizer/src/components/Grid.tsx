import React from 'react';
import { Grid } from '../types/grid';
import { Color } from '../types/color';
import Square from "./Square";

import _ from "lodash";
import { Coord } from '../types/coord';

interface IProps {
    width: number,
    height: number,
}

interface GridObject {
    [key: number]: {
        [key: number]: Color
    }
}

interface IState {
    grid: GridObject,
    tileSize: number,
}

class ReactGrid extends React.Component<IProps, IState> implements Grid {
    constructor(props: IProps) {
        super(props);
        this.state = {
            grid: {},
            tileSize: 5
        }
    }

    isAtMaxSize(): boolean {
        return this.state.tileSize == 1;
    }

    increaseSize(): void {
        this.setState({
            tileSize: this.state.tileSize + 1
        });
    }

    isAtMinSize(): boolean {
        return this.state.tileSize == 10;
    }

    decreaseSize(): void {
        this.setState({
            tileSize: this.state.tileSize - 1
        })
    }

    colorSquareAt(loc: Coord, c: Color): void {
        const x: number = loc.x;
        const y: number = loc.y;
        const newGrid = _.clone(this.state.grid);
        if (!newGrid[x]) {
            newGrid[x] = {};
        }
        newGrid[x][y] = c;
        this.setState({
            grid: newGrid
        });
    }

    render(): any {
        const width = this.props.width;
        const height = this.props.height;
        const size = this.state.tileSize;

        const numCols = Math.floor(width / this.state.tileSize);
        const numRows = Math.floor(height / this.state.tileSize);

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {_.times(numRows, (row => (
                    <div style={{ display: "flex", flexDirection: "row" }} key={`row_${row}`}>
                        {_.times(numCols, (col => {
                            const color = (this.state.grid[row] && this.state.grid[row][col]) || Color.WHITE;
                            return <Square size={size} color={color} ></Square>
                        }))}
                    </div>
                )))}
            </div>
        )
    }    
}

export default ReactGrid;