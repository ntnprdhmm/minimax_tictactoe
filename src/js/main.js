const cross = '<div class="x-1"></div><div class="x-2"></div>';
const circle = '<div class="o"></div>';
const humanMark = 'X';
const computerMark = 'O';

// Launch a new game
let board = new Board();
let computer = new AI(computerMark);

Array.from(document.getElementsByClassName('game-row-square')).forEach((e) => {
    e.addEventListener('click', handleClicks);
});

function handleClicks(e) {
    const x = e.target.id[1];
    const y = e.target.id[0];

    // if the square is empty, play
    if (board.isFree(y, x)) {
        board.playMove(humanMark, [y, x]);
        e.target.innerHTML = cross;
        // check if the game is over
        let winner = board.checkForWin();
        if (winner || board.isOver()) {
            console.log('Winner : ' + winner);
        } else {
            // game is not over, so play the computer turn
            let move = computer.findBestMove(board);
            console.log(move);
            // play the move
            document.getElementById(move.join('')).innerHTML = circle;
            board.playMove(computerMark, move);
        }
    }
}