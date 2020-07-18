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



//

document.querySelector(".dice").style.display="none";

document.querySelector(".btn-roll").addEventListener("click",()=>{

    document.querySelector(".dice").style.display = "block";
    dice = Math.floor(Math.random() * 6) + 1;
    if(roundscore<100 && scores[activeplayer]<100 && roundscore+scores[activeplayer]<100 ){
        if (dice != 1) {
            roundscore += dice;

        } else {
            scores[activeplayer] += roundscore;
            nextPlayer();

        }
        //console.log(dice)

        document.querySelector(".dice").src = `dice-${dice}.png`;
        document.querySelector(`#current-${activeplayer}`).textContent = roundscore;
    } else{
        endgame();
    }
    
    

})

document.querySelector(".btn-hold").addEventListener("click",()=>{
    if (roundscore < 100 && scores[activeplayer] < 100 && roundscore + scores[activeplayer] < 100) {
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
    document.querySelector(".dice").style.display = "none";
    document.querySelector(`.player-${activeplayer}-panel`).classList.remove("active")
    document.querySelector(`#current-${activeplayer}`).textContent = roundscore;
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0
    document.querySelector(`.player-${activeplayer}-panel`).classList.add("active")
}

function endgame(){
    document.querySelector(`#name-${activeplayer}`).textContent="Winner!";
    document.querySelector(".dice").style.display="none";
    document.querySelector(`.player-${activeplayer}-panel`).classList.add("winner");
    document.querySelector(`.player-${activeplayer}-panel`).classList.remove("active")
}