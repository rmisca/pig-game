/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, previousDice = 0;
var diceDOM = document.getElementsByClassName("dice");
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        //1. random number
        var dice, arrDice = [], scoreDice = 0;
        //2. display the result
        for(var i = 0; i < diceDOM.length; i++) {
            dice = Math.floor(Math.random() * 6) + 1;
            diceDOM[i].style.display = "block";
            diceDOM[i].src = "dice-" + dice + ".png";
            arrDice.push(dice);
            scoreDice += dice;
        };
       
        //.3 update the round score IF the rolled number was Not a 1
        if(!arrDice.includes(1)) {
            if(arrDice.includes(6)) {
                previousDice++;
                if(previousDice === 2) {
                    scores[activePlayer] = 0;
                    document.querySelector("#score-" + activePlayer).textContent = "0";
                    nextPlayer();
                } 
            } else {
                roundScore += scoreDice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlaying) {
        var inputValue = document.getElementById("input-value").value;
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if(scores[activePlayer] >= inputValue) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            forEachDice();
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    forEachDice();
    };

document.querySelector('.btn-new').addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById("input-value").value = 100;
    forEachDice();

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
};

function forEachDice () {
    for(var i = 0; i < diceDOM.length; i++) {
        diceDOM[i].style.display = "none";
    };
};

