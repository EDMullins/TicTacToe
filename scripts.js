let turn = 0;
//uses localStorage to store the number of wins on reload
if (localStorage.getItem('oneWins') === null) {
    localStorage.setItem('oneWins', 0);
}
if (localStorage.getItem('twoWins') === null) {
    localStorage.setItem('twoWins', 0);
}

let oneWins = localStorage.getItem('oneWins');
let twoWins = localStorage.getItem('twoWins');

const board = [
    0,0,0,
    0,0,0,
    0,0,0
];

function changeTheme() {
    let lightPrimary = 'rgb(246, 236, 223)';
    let lightMenu = 'rgb(250, 235, 215)';
    let lightSecondary = 'rgb(8, 110, 8)';
    let lightTheme = 'rgb(30, 30, 30)';
    let lightBoard = 'rgb(30, 30, 30)'
    let lightHover = 'rgb(5, 67, 5)';

    let darkPrimary = 'rgb(30, 30, 30)';
    let darkMenu = 'rgb(69, 69, 69)';
    let darkSecondary = '#d3d3ff'
    let darkTheme = 'rgb(246, 236, 223)';
    let darkBoard = '#d3d3ff';
    let darkHover = 'rgb(117, 78, 215)';

    const root = document.documentElement;
    //light to dark
    if (getComputedStyle(root).getPropertyValue('--primary-color') == 'rgb(246, 236, 223)') {
        root.style.setProperty('--primary-color', darkPrimary);
        root.style.setProperty('--menu-color', darkMenu);
        root.style.setProperty('--secondary-color', darkSecondary);
        root.style.setProperty('--theme-color', darkTheme);
        root.style.setProperty('--board-color', darkBoard);
        root.style.setProperty('--menu-hover-color', darkHover);
        document.getElementById('themeText').innerHTML = "Light";
    }
    //dark to light
    else {
        root.style.setProperty('--primary-color', lightPrimary);
        root.style.setProperty('--menu-color', lightMenu);
        root.style.setProperty('--secondary-color', lightSecondary);
        root.style.setProperty('--theme-color', lightTheme);
        root.style.setProperty('--board-color', lightBoard);
        document.getElementById('themeText').innerHTML = "Dark";
    }
}

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
    let count = 0;
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
    for (let i = 0; i < 9; ++i) {
        if (board[i] != 0) {
            count++;
        }
    }
    if (count == 9) {
        //3 for tie
        return 3;
    }
    return 0;
}

function restart() {
    location.reload();
}

function closeProgram() {
    localStorage.clear();
    window.close();
}

function showStats() {
    document.getElementById("oneWins").innerHTML = localStorage.getItem('oneWins');
    document.getElementById("twoWins").innerHTML = localStorage.getItem('twoWins');
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
    if (winner != 0 && winner < 3) {
        document.getElementById("winnerMessage").innerHTML = "Player " + winner + " Wins";
        document.getElementById("endScreen").style.visibility = "visible";
        if (winner == 1) {
            ++oneWins;
            localStorage.setItem('oneWins', oneWins);
            showStats();
        }
        else {
            ++twoWins;
            localStorage.setItem('twoWins', twoWins);
            showStats();
        }
    }
    else if (winner == 3) {
        document.getElementById("winnerMessage").innerHTML = "Tie";
        document.getElementById("endScreen").style.visibility = "visible";

        showStats();
    }
}
