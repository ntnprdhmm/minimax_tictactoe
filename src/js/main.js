let message_El = document.getElementById('game-message');

let human = {
    mark: 'X',
    mark_el: '<div class="x-1"></div><div class="x-2"></div>',
    score: 0,
    score_el: document.getElementById('human-score')
};

let computer = {
    mark: 'O',
    mark_el: '<div class="o"></div>',
    score: 0,
    score_el: document.getElementById('computer-score')
};

// Launch a new game
let board = new Board();
let computerAI = new AI(computer.mark);

// reload the game on click on "new game"
document.getElementById('reload').addEventListener('click', _ => {
    board = new Board();
    message_El.innerHTML = '&nbsp';
    cleanBoard();
});

// add events on each board square
Array.from(document.getElementsByClassName('game-row-square')).forEach((e) => {
    e.addEventListener('click', handleClicks);
});

/**
 * When the user click on a square, play his turn and the computer turn
 * @param e
 */
function handleClicks(e) {
    const x = e.target.id[1];
    const y = e.target.id[0];

    // if the square is empty, play
    if (board.isFree(y, x)) {
        board.playMove(human.mark, [y, x]);
        e.target.innerHTML = human.mark_el;

        // check if the game is over
        if (!isGameOver()) {
            // game is not over, so play the computer turn
            let move = computerAI.findBestMove(board);
            // play AI move
            document.getElementById(move.join('')).innerHTML = computer.mark_el;
            board.playMove(computer.mark, move);
            isGameOver();
        }
    }
}

/**
 * Check if the game is Over.
 * Display a message in this case.
 * @returns {boolean}
 */
function isGameOver() {
    let winner = board.checkForWin();
    if (winner) {
        if (winner === human.mark) {
            message_El.innerHTML = "YOU WIN";
            human.score++;
            human.score_el.innerHTML = human.score;
        } else {
            message_El.innerHTML = "YOU LOOSE";
            computer.score++;
            computer.score_el.innerHTML = computer.score;
        }
        return true;
    } else if (board.isOver()) {
        message_El.innerHTML = "NO WINNER";
        return true;
    }

    return false;
}

/**
 * Reset the board
 */
function cleanBoard() {
    Array.from(document.getElementsByClassName('game-row-square')).forEach((e) => {
        e.innerHTML = '';
    });
}