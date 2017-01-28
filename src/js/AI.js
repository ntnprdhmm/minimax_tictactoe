class AI {

    constructor(symbol) {
        this._symbol = symbol;
        this._opponent = symbol == 'X' ? 'O' : 'X';
        this._max = 10;
        this._min = -10;
    }

    /**
     * Use the minimax function to find the best play on this board
     * @param board => the current board
     */
    findBestMove(board) {
        let bestScore = this._min;
        let bestMove = null;
        let moves = board.getAvailableMoves();

        for (let move in moves) {
            let clonedBoard = board.clone();
            clonedBoard.playMove(this._symbol, moves[move]);
            let currentScore = this.minimax(clonedBoard, this._opponent);
            if(currentScore > bestScore) {
                bestScore = currentScore;
                bestMove = moves[move];
            }
        }

        return bestMove;
    }

    /**
     * Do the minimax algorithm to find the best play for the computer
     * @param board
     * @param player
     * @returns {int}
     */
    minimax(board, player) {
        let moves = board.getAvailableMoves();
        let currentScore = 0;

        // At the end of the minimax, evaluate the board
        if (board.isOver() || board.checkForWin() || !moves) {
            return this.evaluateBoard(board);
        }

        // Maximize
        if (player === this._symbol) {
            let bestScore = this._min;
            for (let move in moves) {
                // play the move on a clone of the board, and continue the minimax
                let clonedBoard = board.clone();
                clonedBoard.playMove(this._symbol, moves[move]);
                currentScore = this.minimax(clonedBoard, this._opponent);
                // if the score of the minimax is better than current score, set bestScore
                if (currentScore > bestScore) {
                    bestScore = currentScore;
                }
            }
            return bestScore;
        }

        // Minimize
        if (player === this._opponent) {
            let bestScore = this._max;
            for (let move in moves) {
                // play the move on a clone of the board, and continue the minimax
                let clonedBoard = board.clone();
                clonedBoard.playMove(this._opponent, moves[move]);
                currentScore = this.minimax(clonedBoard, this._symbol);
                // if the score of the minimax is worse than current score, set bestScore
                if (currentScore < bestScore) {
                    bestScore = currentScore;
                }
            }
            return bestScore;
        }
    }

    /**
     * Evalute the score of the board
     * @param board
     * @return {int}
     */
    evaluateBoard(board) {
        let score = 0;

        score += this.evaluateLine(board, 0, 0, 0, 1, 0, 2); // row 0
        score += this.evaluateLine(board, 1, 0, 1, 1, 1, 2); // row 1
        score += this.evaluateLine(board, 2, 0, 2, 1, 2, 2); // row 2
        score += this.evaluateLine(board, 0, 0, 1, 0, 2, 0); // col 0
        score += this.evaluateLine(board, 0, 1, 1, 1, 2, 1); // col 1
        score += this.evaluateLine(board, 0, 2, 1, 2, 2, 2); // col 2
        score += this.evaluateLine(board, 0, 0, 1, 1, 2, 2); // diagonal 1
        score += this.evaluateLine(board, 0, 2, 1, 1, 2, 0); // diagonal 2

        return score;
    }

    /**
     * Score the line of the board
     * 1 point for 1 mark, 10 points for 2, 100 points for 3
     * ( + if computer mark, - if human mark)
     * @param board
     * @param r1
     * @param c1
     * @param r2
     * @param c2
     * @param r3
     * @param c3
     */
    evaluateLine(board, r1, c1, r2, c2, r3, c3) {
        let score = 0;

        // first square
        if (board.grid[r1][c1] === this._symbol) {
            score = 1;
        } else if (board.grid[r1][c1] === this._opponent) {
            score = -1;
        }

        // second square
        if (board.grid[r2][c2] === this._symbol) {
            if (score == 1) {
                // board.grid[r1][c1] is AI
                score = 10;
            } else if (score == -1) {
                // board.grid[r1][c1] is the opponent
                return 0;
            } else {
                // board.grid[r1][c1] was empty
                score = 1;
            }
        } else if (board.grid[r2][c2] === this._opponent) {
            if (score == 1) {
                // board.grid[r1][c1] is AI
                return 0;
            } else if (score == -1) {
                // board.grid[r1][c1] is the opponent
                score = -10;
            } else {
                // board.grid[r1][c1] was empty
                score = -1;
            }
        }

        // third square
        if (board.grid[r3][c3] === this._symbol) {
            if (score == 10) {
                // square 1 and 2 was AI markers
                score = 100;
            } else if (score < 0) {
                // square 1 and 2 was the opponent
                score = 0;
            } else {
                // 1 and 2 was empty
                score = 1;
            }
        } else if (board.grid[r3][c3] === this._opponent) {
            if (score == 10) {
                // square 1 and 2 was AI markers
                score = 0;
            } else if (score < 0) {
                // square 1 and 2 was the opponent
                score = -100;
            } else {
                // 1 and 2 was empty
                score = -1;
            }
        }

        return score;
    }
}