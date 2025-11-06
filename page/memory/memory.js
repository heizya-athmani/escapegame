const symbols = ['⚰️', '🗝️', '🕯️', '⚱️', '🔪', '⛓️', '🪦', '🦴'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timeLeft = 60;
let timerInterval;
let canFlip = false;
let gameStarted = false;
const maxMoves = 15;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.querySelector('#gameBoard');
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
    const movesEl = document.querySelector('#moves');
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
            document.querySelector('#matches').textContent = `${matchedPairs}/8`;
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
        const timerEl = document.querySelector('#timer');
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

    const messageContent = document.querySelector('#messageContent');
    const messageTitle = document.querySelector('#messageTitle');
    const messageText = document.querySelector('#messageText');

    if (victory) {
        messageContent.classList.add('victory');
        messageTitle.textContent = 'Bravo';
        messageText.textContent = `Vous avez trouver toutes les paires avec ${moves} tentatives et ${Math.floor((60 - timeLeft) / 60)}:${((60 - timeLeft) % 60).toString().padStart(2, '0')} secondes.`;
    } else {
        messageContent.classList.remove('victory');
        messageTitle.textContent = 'Vous êtes fini';
        messageText.textContent = `${reason}. Vous avez ${matchedPairs} sur 8 paires.`;
        createScreamer();
    }

    document.querySelector('#messageOverlay').classList.add('show');
}

function startGame() {
    document.querySelector('#startOverlay').classList.add('hidden');
    document.querySelector('#gameBoard').classList.add('active');
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

    document.querySelector('#moves').textContent = '0/15';
    document.querySelector('#moves').classList.remove('warning');
    document.querySelector('#matches').textContent = '0/8';
    document.querySelector('#timer').textContent = '1:00';
    document.querySelector('#timer').classList.remove('warning');
    document.querySelector('#messageOverlay').classList.remove('show');
    document.querySelector('#gameBoard').classList.remove('active');
    document.querySelector('#startOverlay').classList.remove('hidden');

    createBoard();
}

document.querySelector('#startBtn').addEventListener('click', startGame);

createBoard();

// Images de screamers (à remplacer par vos propres images)
const screamerImages = [
    "/assets/images/screamer1.gif",
    "/assets/images/screamer2.gif",
    "/assets/images/screamer3.webp"
];

// Son du screamer (un seul son)
const screamerSound = '/assets/sound/jumpscaresound.mp3';

function createScreamer() {
    // Créer l'overlay du screamer
    const screamer = document.createElement('div');
    screamer.className = 'screamer';

    // Image aléatoire
    const randomImage = screamerImages[Math.floor(Math.random() * screamerImages.length)];

    screamer.innerHTML = `
        <div class="screamer-content">
            <img src="${randomImage}" alt="Screamer" />
        </div>
    `

    try {
        const audio = new Audio(screamerSound);
        audio.volume = 0.7;
        audio.play().catch(e => console.log('Audio:', e));
    } catch (e) {
        console.log('Audio non disponible');
    }

    document.body.appendChild(screamer);

    // Retirer le screamer après 2 secondes
    setTimeout(() => {
        screamer.classList.add('fade-out');
        setTimeout(() => screamer.remove(), 500);
    }, 500);
}
