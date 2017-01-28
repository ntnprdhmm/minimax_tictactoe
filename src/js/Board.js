export default class Board {

    constructor() {
        this._turn = 0;
        this._grid = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    get turn() {
        return this._turn;
    }

    set turn(newTurn) {
        this._turn = newTurn;
    }

    get grid() {
        return this._grid;
    }

    set grid(newGrid) {
        this._grid = newGrid;
    }

    /**
     * Return a list of coordinates which are the available moves
     * @returns {Array}
     */
    getAvailableMoves() {
        let moves = [];

        for (let row in this._grid) {
            for (let col in this._grid[row]) {
                if (this._grid[row][col] === '') {
                    moves.push([row, col]);
                }
            }
        }

        return moves;
    }

    /**
     * Create a copy of the current Board
     * @returns {Board}
     */
    clone() {
        let newBoard = new Board();
        let newGrid = [['', '', ''], ['', '', ''], ['', '', '']];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newGrid[i][j] = this._grid[i][j];
            }
        }

        newBoard.turn = this._turn;
        newBoard.grid = newGrid;

        return newBoard;
    }

    /**
     * Play a turn by setting a grid square with the player symbol
     * @param marker    => the player symbol
     * @param coord     => the grid square coordinates
     */
    playMove(marker, coord) {
        this._grid[parseInt(coord[0])][parseInt(coord[1])] = marker;
        this._turn++;
    }

    /**
     * The game is over if after 9 turns
     * @returns {boolean}
     */
    isOver() {
        return this._turn === 9;
    }

    /**
     * Check if there is a winner
     * @return The winner, or null
     */
    checkForWin() {
        // check the diagonals
        if (this._grid[1][1] !== ''
            && (this._grid[0][0] === this._grid[1][1] && this._grid[1][1] === this._grid[2][2])
            || (this._grid[0][2] === this._grid[1][1] && this._grid[1][1] === this._grid[2][0])) {
            return this._grid[1][1];
        }

        // check the horizontal
        for (let row in this._grid) {
            if (this._grid[row][0] !== ''
                && this._grid[row][0] === this._grid[row][1] && this._grid[row][1] === this._grid[row][2]) {
                return this._grid[row][0];
            }
        }

        // check the horizontal
        for (let col in this._grid) {
            if (this._grid[0][col] !== ''
                && this._grid[0][col] === this._grid[1][col] && this._grid[1][col] === this._grid[2][col]) {
                return this._grid[0][col];
            }
        }

        return null;
    }
}