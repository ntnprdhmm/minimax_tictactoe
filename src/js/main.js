const cross = '<div class="x-1"></div><div class="x-2"></div>';
const circle = '<div class="o"></div>';
const human = 'X';
const computer = 'O';

// Launch a new game
let board = new Board();
Array.from(document.getElementsByClassName('game-row-square')).forEach((e) => {
    e.addEventListener('click', handleClicks);
});

function handleClicks(e) {
    const x = e.target.getAttribute('data-x');
    const y = e.target.getAttribute('data-y');

    // if the square is empty, play
    if (board.isFree(y, x)) {
        board.playMove(human, [y, x]);
        e.target.innerHTML = cross;

        // check if the game is over
        let winner = board.checkForWin();
        if (winner || board.isOver()) {
            console.log('Winner : ' + winner);
        } else {
            // game is not over, so play the computer turn

        }
    }
}