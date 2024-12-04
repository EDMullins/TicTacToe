let turn = 0;
const board = [
    0,0,0,
    0,0,0,
    0,0,0
];

function turnChar(turn) {
    //based on turn choose with char to display
    if (turn % 2 == 0) {
        return "x";
    }
    return "o";
}

function showTurn() {
    //based on turn show whos turn it is
    if (turn % 2 == 0) {
        document.getElementById("turnNum").innerHTML = "Player 1";
    }
    else {
        document.getElementById("turnNum").innerHTML = "Player 2";
    }
}

function addPick(butId) {
    if (turn % 2 == 0) {
        //player 1 picked it
        board[butId] = 1;
    }
    else {
        //player 2 picked it
        board[butId] = 2;
    }
}

function checkWinner() {
    //analyze rows for winner
    for (let i = 0; i < 9; i+=3) {
        if (board[i] == board[i+1] && board[i+1] == board[i+2] && board[i] != 0) {
            //returning the winner
            return board[i];
        }
    }
    //analyze cols for winner
    for (let i = 0; i < 3; ++i) {
        if (board[i] == board[i+3] && board[i+3] == board[i+6] && board[i] != 0) {
            return board[i];
        }
    }
    //analyze diagonals for winner
    if (board[0] == board[4] && board[4] == board[8] && board[0] != 0) {
        return board[0];
    }
    if (board[2] == board[4] && board[4] == board[6] && board[2] != 0) {
        return board[2];
    }
    //if no winner found
    return 0;
}

function restart() {
    location.reload();
}

function closeProgram() {
    window.close();
}

function boardClick(butId) {
    //once clicked disable button
    let button = document.getElementById(butId);
    button.disabled = true;
    //displaying x or o
    document.getElementById(butId).innerHTML = turnChar(turn);
    //adding the pick to board
    addPick(butId);
    //shows whos turn it is
    ++turn;
    showTurn();
    //checking for winner
    let winner = checkWinner();
    if (winner != 0) {
        console.log(winner);
        document.getElementById("winnerMessage").innerHTML = "Player " + winner + " wins!";

        document.getElementById("endScreen").style.visibility = "visible";
    }
}
