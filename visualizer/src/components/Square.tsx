import React from 'react';
import { Color } from '../types/color';
import "./Square.css";

interface IProps {
    size: number,
    color: Color
}

export default function Square(props: IProps) {
    const pixelSize = props.size * 10;
    return (
        <div className="square" style={{ width: pixelSize, height: pixelSize, color: props.color }}>
        </div>
    )
}