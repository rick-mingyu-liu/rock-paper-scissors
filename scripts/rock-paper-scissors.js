let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScore();

let isAutoPlay = false;
let intervalId;

function autoplay() {
    if (!isAutoPlay) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlay = true;
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
    } 
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoplay();
    });

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        score.loses = 0;
        score.wins = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScore();
    });


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});



function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = ' ';

if (playerMove === 'scissors') {    
    if (computerMove === 'rock') {
        result = 'You Lose'
    } else if (computerMove === 'paper') {
        result = 'You Win'
    } else {
        result = 'Tie'
    }

} else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result = 'You Win'
    } else if (computerMove === 'paper') {
        result = 'Tie'
    } else {
        result = 'You Lose'
    }

} else {
    if (computerMove === 'rock') {
        result = 'Tie'
    } else if (computerMove === 'paper') {
        result = 'You Lose'
    } else {
        result = 'You Win'
    }
}

if (result === 'You Win') {
    score.wins++;
} else if (result === 'You lose') {
    score.loses++;
} else {
    score.ties++;
}  

localStorage.setItem('score', JSON.stringify(score));





updateScore();

document.querySelector('.result')
    .innerHTML = result;

document.querySelector('.js-moves')
    .innerHTML = `You          
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;

}
function updateScore () {
document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, 
        Losses: ${score.loses}, 
        Ties: ${score.ties}`;
}

function pickComputerMove() {
    let computerMove = ' ';

    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
        return computerMove;
}
