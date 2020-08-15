import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid'

import {TetrisUtils} from './TetrisUtils'

class NextUp extends Component {

    render() {
        let next = this.props.bag.slice(0,3)
        return (
            next.map((piece) => (
                <Piece pieces={this.props.pieces} key={uuidv4()} piece={piece} unit={this.props.unit} />
            ))
        );
    }
}

class Piece extends Component {
    

    drawPiece = () => {
        let PIECES = this.props.pieces
        let context = this.refs.piece.getContext('2d')
        let canvas = this.refs.piece
        context.fillStyle = "#4B4B4B"
        context.fillRect(0,0,canvas.width,canvas.height)
        
        context.fillStyle="#ffffff"
        for(var row = 0; row < PIECES[this.props.piece].length; row++){
            for(var col = 0; col < PIECES[this.props.piece][row].length; col++) {
                if(PIECES[this.props.piece][row][col] === 1) {
                    context.fillRect(this.props.unit * col, this.props.unit * row, this.props.unit, this.props.unit)
                }
            }
        }
    }

    componentDidMount() {
        this.drawPiece()
    }

    render() {
        return (
            <canvas ref={'piece'} width={this.props.unit*4} height={this.props.unit*4}></canvas>
        )
    }
}

export default NextUp;