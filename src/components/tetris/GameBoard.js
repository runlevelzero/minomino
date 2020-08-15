import React, { Component } from 'react';

class GameBoard extends Component {
    
    drawBoard = () => {
        for(var row = 0; row < this.props.board.length; row++){
            for(var col = 0; col < this.props.board[row].length; col++) {
                if(this.props.board[row][col] === 1) {
                    this.state.context.fillStyle="#ffffff"
                    this.state.context.fillRect(this.props.unit * col, this.props.unit * row, this.props.unit, this.props.unit)
                }
                
            }
        }
    }

    async componentDidMount() {
        let canvas = this.refs.gameArea
        let context = canvas.getContext('2d')
        await this.setState({context})
        await this.setState({canvas})
        context.fillStyle = "#4B4B4B"
        context.fillRect(0,0,canvas.width,canvas.height)
        this.drawBoard()
    }

    render() {
        return (
            
            <canvas ref="gameArea" width={this.props.unit * 10} height={this.props.unit * 20} />
        );
    }
}

export default GameBoard;