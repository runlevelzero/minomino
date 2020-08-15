import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid'

import GameBoard from './GameBoard'
import {LeftSidebar,RightSidebar} from './Sidebar'

class GameArea extends Component {
    PIECES = {
        'S':[
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
        'Z':[
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ],
        'L':[
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ],
        'J':[
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ],
        'O':[
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0]
            ],
        'T':[
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ],
        'I':[
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ]
    }
    
    state = {
        board: {
            board: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
            key:uuidv4()
        },
        unit: Math.floor((window.innerHeight*(8/9))/20),
        gravity: {
            rate: 100,
            step: 1
        },
        rightSidebarKey: uuidv4(),
        activePiece: {
            piece: '',
            x: 3,
            y: 0,
            rotationState: 0,
            wasNotRotated:true
        },
        hold: {
            piece: undefined,
            usedThisTurn:false,
            key:uuidv4()
        },
        bag: []
    }

    /** CONSTRUCTOR()
     * This is the constructor
     * The main point of including it in this part is to generate the first 7 blocks
     * before rendering the component as it is passed as props to some of the children
     * components
     */
    constructor() {
        super()
        this.state.bag = this.generateBag()
    }

    /** GENERATEBAG()
     * This method handles randomly stringing together the 7 tetris pieces into an order
     * This significantly improves tetris enjoyability over a pure random tetris piece generator
     * 
     * NOTE: This method returns a list of length 7 of the shuffled tetris pieces
     */
    generateBag = () => {
        // We start with a bag in an arbitrary order
        let bag = ['S','Z','L','J','T','O','I']

        // Then we loop through the length of the bag and re-arrange them
        for(var spot = 0; spot < bag.length; spot++) {
            // Math.random returns a number between 0 and 1(exclusive of 1) so this math is necessary to
            // have Math.random return an int in between the two values that we give it
            // The reason why I have spot set to the minimum is because anything in the locations whose
            // index is less than spot has already been randomized and would reduce how random it would be
            // if you include them
            var randNum = Math.floor(Math.random()* (bag.length - spot) + spot)

            // after we have figured out the math for the random, we just switch the two spots
            var temp = bag[spot]
            bag[spot] = bag[randNum]
            bag[randNum] = temp
        }

        // We then return the shuffled bag
        return bag

    }

    /** SETACTIVEPIECE()
     * This method takes the first item in the bag and sets it to the active piece
     * and then it draws the newly set active piece
     */
    setActivePiece = async () => {
        // Grab the first piece off of the bag
        let piece = this.state.bag.shift()
        
        // If the bag is running low, add a new bag of pieces to it and then update the next-up queue visualization
        if(this.state.bag.length < 4) this.setState({bag:[...this.state.bag,...this.generateBag()]})
        this.setState({rightSidebarKey:uuidv4()})
        
        // we then modify the current active piece object to be renewed for a brand-new active piece
        let activePiece = this.state.activePiece
        activePiece.piece = piece
        activePiece.wasNotRotated = true

        // state is then updated and the new piece is drawn 
        await this.setState({activePiece})
        this.drawNewActivePiece()
           
    }

    /** SETHOLDACTIVEPIECE()
     * This method takes the active piece and sets it to the active piece
     * this is done whenever there is a piece in hold and it allows for the 
     * other hold method to flip what piece is currently active
     */
    setHoldActivePiece = async () => {
        // Get the piece that was in the hold and the currently active piece
        let piece = this.state.hold.piece
        let activePiece = this.state.activePiece

        // This follows the same logic as the setActivePiece method where it refreshes the active piece object
        activePiece.piece = piece
        activePiece.wasNotRotated = true

        // Then the refreshed active piece is stored back in state and then the piece is drawn
        await this.setState({activePiece})
        this.drawNewActivePiece()
    }

    /** TRANSPOSELIST()
     * This method makes the rows of the list brought into it
     * the columns essentially rotating it 90 degrees
     * @param {[Number]} list 
     */
    transposeList = (list) => {
        var transposedList = []
        for (var col = 0; col < list[0].length; col++) {
            var newRow = []
            for(var row = list.length - 1; row >= 0; row--) {
                newRow.push(list[row][col])
            }
            transposedList.push(newRow)
        }
        return transposedList
    }

    /** ROTATECW()
     *  
     */
    rotateCW = async () => {
        await this.clearActivePiece()
        var activePiece = this.state.activePiece
        var rotateCounter = (activePiece.rotationState + 1) % 4
        activePiece.rotationState = rotateCounter
        activePiece.wasNotRotated = false
        this.setState({activePiece})
        var piece = this.PIECES[this.state.activePiece.piece]
        for(var i = 0; i < rotateCounter; i++) {
            piece = this.transposeList(piece)
        }
        this.drawActivePiece(piece)
    }

    rotateCCW = async () => {
        await this.clearActivePiece()
        var activePiece = this.state.activePiece
        var rotateCounter = (activePiece.rotationState - 1)
        if (rotateCounter < 0) rotateCounter = 4 + rotateCounter
        activePiece.rotationState = rotateCounter
        activePiece.wasNotRotated = false
        this.setState({activePiece})
        var piece = this.PIECES[this.state.activePiece.piece]
        for(var i = 0; i < rotateCounter; i++) {
            piece = this.transposeList(piece)
        }
        this.drawActivePiece(piece)
    }

    drawActivePiece = (piece) => {
        let board = this.state.board.board

        for(var row = 0; row < piece.length; row++) {
            for (var col = 0; col < piece.length; col++) {
                if(piece[row][col] === 1){
                    board[this.state.activePiece.y + row][this.state.activePiece.x + col] = piece[row][col]
                }
            }
        }
        

        this.setState({board:{board,key:uuidv4()}})
    }

    drawNewActivePiece = () => {
        let board = this.state.board.board
        let isOorI = (this.PIECES[this.state.activePiece.piece][0] == "0,0,0,0")
        var modifier = isOorI ? 1 : 0
        for(var row = modifier; row < this.PIECES[this.state.activePiece.piece].length; row++) {
            for (var col = 0; col < this.PIECES[this.state.activePiece.piece].length; col++) {
                if(this.PIECES[this.state.activePiece.piece][row][col] === 1){
                    board[this.state.activePiece.y + (row - modifier)][this.state.activePiece.x + col] = this.PIECES[this.state.activePiece.piece][row][col]
                }
            }
        }
        

        this.setState({board:{board,key:uuidv4()}})
    }

    clearPiece = async (piece) => {
        let board = this.state.board.board

        let isOorIAtStart = (this.PIECES[this.state.activePiece.piece][0] == "0,0,0,0" && this.state.activePiece.y === 0 && this.state.activePiece.wasNotRotated)
        var modifier = isOorIAtStart ? 1 : 0
        for(var row = modifier; row < piece.length; row++) {
            for (var col = 0; col < piece.length; col++) {
                if(piece[row][col] === 1){
                    board[this.state.activePiece.y + (row - modifier)][this.state.activePiece.x + col] = 0
                }
            }
        }
        

        await this.setState({board:{board,key:uuidv4()}})
    }

    clearActivePiece = async () => {
        var activePiece = this.state.activePiece
        var rotateCounter = activePiece.rotationState
        var piece = this.PIECES[activePiece.piece]
        for(var i = 0; i < rotateCounter; i++) {
            piece = this.transposeList(piece)
        }
        this.clearPiece(piece)
    }

    holdPiece = () => {
        if(!this.state.hold.usedThisTurn){
            var hold = {piece:this.state.activePiece.piece, usedThisTurn:true, key:uuidv4()}
            this.clearActivePiece()
            if(this.state.hold.piece) {
                this.setHoldActivePiece()
            }
            else if(!this.state.hold.piece) {
                this.setActivePiece()
            }
            this.setState({hold})
        }
        
    }

    resizeCanvas = () => {
        this.setState({unit: Math.floor((window.innerHeight*(8/9))/20)})
    }

    controllerHandler = (evt) => {
        switch(evt.code) {
            case 'KeyW': console.log('Hard Drop');break;
            case 'KeyA': console.log('Move Left');break;
            case 'KeyS': console.log('Move Down');break;
            case 'KeyD': console.log('Move Right');break;
            case 'Numpad1': this.rotateCCW();break;
            case 'Numpad3': this.rotateCW();break;
            case 'Space': this.holdPiece(); break;
            default: console.log(evt.code);
        }
    }

    componentDidMount() {
        window.addEventListener('keypress', this.controllerHandler)
        window.addEventListener('resize', this.resizeCanvas)
        window.setTimeout(this.setActivePiece, 1000)
    }
    
    render() {
        return (
            <div className="minoGameAreaSinglePlayer">
                <LeftSidebar key={this.state.hold.key} hold={this.state.hold.piece} pieces={this.PIECES} unit={this.state.unit}/>
                <GameBoard key={this.state.board.key} activePiece={this.state.activePiece} board={this.state.board.board} unit={this.state.unit} gravity={this.state.gravity}/>
                <RightSidebar pieces={this.PIECES} unit={this.state.unit} bag={this.state.bag}/>
            </div>
        );
    }
}


export default GameArea;