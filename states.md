# State Document
---
## GameArea.js

`board`
-
### This contains the state of the board
> Here are its parameters
```
    board <[Number]>  the current board state
    key <UUID> this helps in refreshing the drawn board when the state has been changed
```

`unit`
-
### This represents the size of one 'mino' and is used to gauge how big to render all of the canvases

`gravity`
-
### *Currently Unused* This controls the rate at which blocks fall
> Here are its parameters
```
    rate <Number> how often to move the blocks, the idea is to iterate a counter every time an interval is reached
    step <Number> how many blocKs to fall each time the rate is meant, this should allow for more exact control over the game
```

`rightSidebarKey`
-
### This allows us to request updates to the next-up queue visual

`activePiece`
-
### This contains information about the state of the currently user-controllable piece
> Here are its parameters
```
    piece <String> contains a single character holding the currently active piece [Possible values: 'S','Z','L','J','T','O','I']
    x <Number> the coordinate location of the active piece (specifically the x coordinate)
    y <Number> the coordinate location of the active piece (specifically the y coordinate)
    rotationState <Number> holds the current orientation of the active piece [Possible values: 0,1,2,3]
    wasNotRotated <Boolean> The I and O pieces are buffered by a row of empty 0's on the top of their piece representation and require a little extra logic sometimes and this allows us to check the state of the 
                            O or I piece (This might eventually change to was not manipulated as gravity will also affect the logic that I want to use here)
```

`hold`
-
### This contains information about the state of the piece currently in the hold position
> Here are its parameters
```
    piece <String> Operates in the same way as the piece parameter in "activePiece"
    usedThisTurn <Boolean> makes sure that once you use hold, you cannot use it until the active piece changes
    key <UUID> allows us to request updates just like we can for the next-up section and the board
```

`bag`
-
### This bag contains the next pieces to be queued up and ranges in length from 4 to 10 pieces

---
