/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores=[0,0];
var roundscore=0;
activeplayer=0;
var prevScore1=0;
var prevScore2=0;
var winScore=0;


document.querySelector(".dice-1").style.display="none";
document.querySelector(".dice-2").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click",()=>{
    
    getWinScore();
    document.querySelector(".dice-1").style.display = "block";
    document.querySelector(".dice-2").style.display = "block";
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    //console.log(dice)
    if(roundscore<winScore && scores[activeplayer]<winScore && roundscore+scores[activeplayer]<winScore ){
        if (dice1 != 1 && dice2 !=1) {
            if (prevScore1 === 6 && dice1 === 6 && prevScore2 === 6 && dice2 === 6) {
                roundscore=scores[activeplayer]=0;
                nextPlayer();
            } else{
            roundscore += dice1+dice2;
            }

        } else {
            scores[activeplayer] += roundscore;
            nextPlayer();

        }
        //console.log(dice)

        document.querySelector(".dice-1").src = `dice-${dice1}.png`;
        document.querySelector(".dice-2").src = `dice-${dice2}.png`;
        document.querySelector(`#current-${activeplayer}`).textContent = roundscore;
    } else{
        endgame();
    }
    
    prevScore1=dice1;
    prevScore2=dice2;

})

document.querySelector(".btn-hold").addEventListener("click",()=>{
    getWinScore();
    
    if (roundscore < winScore && scores[activeplayer] < winScore && roundscore + scores[activeplayer] < winScore) {
        scores[activeplayer] += roundscore;
        nextPlayer();
    } else {
        endgame();
    }
    
})


document.querySelector(".btn-new").addEventListener("click",()=>{
    location.reload();
})

function nextPlayer(){
    
    document.querySelector(`#score-${activeplayer}`).textContent = scores[activeplayer];
    roundscore = 0;
    document.querySelector(".dice-1").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";
    document.querySelector(`.player-${activeplayer}-panel`).classList.remove("active")
    document.querySelector(`#current-${activeplayer}`).textContent = roundscore;
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0
    document.querySelector(`.player-${activeplayer}-panel`).classList.add("active")
}

function endgame(){
    document.querySelector(`#score-${activeplayer}`).textContent=roundscore+scores[activeplayer];
    document.querySelector(`#name-${activeplayer}`).textContent="Winner!";
    document.querySelector(".dice-1").style.display="none";
    document.querySelector(".dice-2").style.display = "none";
    document.querySelector(`.player-${activeplayer}-panel`).classList.add("winner");
    document.querySelector(`.player-${activeplayer}-panel`).classList.remove("active")
}

function getWinScore(){
    winScore = document.querySelector(".final-score").value;
    if (!winScore) {
        winScore = 100;
    }
    //console.log(winScore)
}