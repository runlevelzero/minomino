import React, { Component } from 'react';
import NextUp from './NextUp';

export class LeftSidebar extends Component {
    drawPiece = () => {
        let PIECES = this.props.pieces
        let context = this.refs.holdArea.getContext('2d')
        let canvas = this.refs.holdArea
        context.fillStyle = "#4B4B4B"
        context.fillRect(0,0,canvas.width,canvas.height)
        if(this.props.hold) {
            context.fillStyle="#ffffff"
            for(var row = 0; row < PIECES[this.props.hold].length; row++){
                for(var col = 0; col < PIECES[this.props.hold][row].length; col++) {
                    if(PIECES[this.props.hold][row][col] === 1) {
                        context.fillRect(this.props.unit * col, this.props.unit * row, this.props.unit, this.props.unit)
                    }
                }
            }
        }
    }

    componentDidMount() {
        this.drawPiece()
    }
    
    render() {
        return (
            <div className="minoSidebar">
                <p className="minoUIText">hold</p>
                <canvas ref={'holdArea'} width={this.props.unit*4} height={this.props.unit*4}></canvas>
            </div>
        );
    }
}

export class RightSidebar extends Component {
    
    render() {
        return (
            <div className="minoSidebar">
                <p className="minoUIText">next</p>
                <NextUp pieces={this.props.pieces} bag={this.props.bag} unit={this.props.unit} />
                {/*Score information will go right here, preferably in a canvas*/}
            </div>
        );
    }
}