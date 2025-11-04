const symbols = ['⚰️', '🗝️', '🕯️', '⚱️', '🔪', '⛓️', '🪦', '🦴'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timeLeft = 60;
let timerInterval;
let canFlip = false;
let gameStarted = false;
const maxMoves = 20;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = `
                    <div class="card-face card-front"></div>
                    <div class="card-face card-back">${symbol}</div>
                `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (!canFlip || !gameStarted || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        updateMoves();
        checkMatch();
    }
}

function updateMoves() {
    const movesEl = document.getElementById('moves');
    movesEl.textContent = `${moves}/${maxMoves}`;

    if (moves >= maxMoves - 3) {
        movesEl.classList.add('warning');
    }

    if (moves >= maxMoves) {
        endGame(false, 'Tentatives épuisées');
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('matches').textContent = `${matchedPairs}/8`;
            flippedCards = [];
            canFlip = true;

            if (matchedPairs === 8) {
                endGame(true, 'Victory');
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerEl = document.getElementById('timer');
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 15) {
            timerEl.classList.add('warning');
        }

        if (timeLeft <= 0) {
            endGame(false, 'Trop tard');
        }
    }, 1000);
}

function endGame(victory, reason) {
    clearInterval(timerInterval);
    gameStarted = false;
    canFlip = false;

    const messageContent = document.getElementById('messageContent');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');

    if (victory) {
        messageContent.classList.add('victory');
        messageTitle.textContent = 'Bravo';
        messageText.textContent = `Vous avez trouver toutes les paires avec ${moves} tentatives et ${Math.floor((60 - timeLeft) / 60)}:${((60 - timeLeft) % 60).toString().padStart(2, '0')} secondes.`;
    } else {
        messageContent.classList.remove('victory');
        messageTitle.textContent = 'Vous êtes fini';
        messageText.textContent = `${reason}. Vous avez ${matchedPairs} sur 8 paires.`;
    }

    document.getElementById('messageOverlay').classList.add('show');
}

function startGame() {
    document.getElementById('startOverlay').classList.add('hidden');
    document.getElementById('gameBoard').classList.add('active');
    gameStarted = true;
    canFlip = true;
    startTimer();
}

function restartGame() {
    clearInterval(timerInterval);
    cards = [...symbols, ...symbols];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timeLeft = 60;
    canFlip = false;
    gameStarted = false;

    document.getElementById('moves').textContent = '0/20';
    document.getElementById('moves').classList.remove('warning');
    document.getElementById('matches').textContent = '0/8';
    document.getElementById('timer').textContent = '1:00';
    document.getElementById('timer').classList.remove('warning');
    document.getElementById('messageOverlay').classList.remove('show');
    document.getElementById('gameBoard').classList.remove('active');
    document.getElementById('startOverlay').classList.remove('hidden');

    createBoard();
}

document.getElementById('startBtn').addEventListener('click', startGame);

createBoard();
