const questions = [
    {
        question: "Dans quel film un clown terrfiant vit-il dans les égouts ?",
        options: ["Ça", "Poltergeist", "Saw", "Insidious"],
        correct: 0
    },
    {
        question: "Quel est le vrai nom de Freddy Krueger ?",
        options: ["Frederick Charles Krueger", "Fred Arthur Krueger", "Frank Krueger", "Fredrick Krueger"],
        correct: 0
    },
    {
        question: "Dans 'The Ring', combien de jours avez-vous après avoir regardé la cassette ?",
        options: ["3 jours", "5 jours", "7 jours", "10 jours"],
        correct: 2
    },
    {
        question: "Quel est le nom de la poupée possédée dans 'Annabelle' ?",
        options: ["Betty", "Annabelle", "Chucky", "Mary"],
        correct: 1
    },
    {
        question: "Dans 'L'Exorciste', quel est le nom du démon qui possède Regan ?",
        options: ["Belzébuth", "Pazuzu", "Lucifer", "Asmodée"],
        correct: 1
    },
    {
        question: "Qui est le tueur masqué dans 'Halloween' ?",
        options: ["Jason Voorhees", "Freddy Krueger", "Michael Myers", "Ghostface"],
        correct: 2
    },
    {
        question: "Dans 'Shining', que tape Jack Torrance sans cesse à la machine ?",
        options: ["Help me", "All work and no play makes Jack a dull boy", "I'm going crazy", "The end is near"],
        correct: 1
    },
    {
        question: "Quel film d'horreur se passe dans un hôtel Overlook ?",
        options: ["Psychose", "Shining", "American Horror Story", "The Haunting"],
        correct: 1
    },
    {
        question: "Dans 'Vendredi 13', où se trouve le Camp Crystal Lake ?",
        options: ["Californie", "New York", "New Jersey", "Maine"],
        correct: 2
    },
    {
        question: "Quel est le numéro de la maison hantée dans 'Paranormal Activity' ?",
        options: ["13 Elm Street", "1428 Elm Street", "Il n'y a pas de numéro spécifique", "666 Devil's Road"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;


const screamerImages = [
    "/assets/images/screamer1.gif",
    "/assets/images/screamer2.gif",
    "/assets/images/screamer3.webp"
];


const screamerSound = '/assets/sound/jumpscaresound.mp3';

function createScreamer() {
    const screamer = document.createElement('div');
    screamer.className = 'screamer';
    
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
    };
;
    
    document.body.appendChild(screamer);

    setTimeout(() => {
        screamer.classList.add('fade-out');
        setTimeout(() => screamer.remove(), 500);
    }, 500);
}

function startQuiz() {
    document.querySelector('#start-screen').classList.remove('active');
    document.querySelector('#quiz-screen').classList.add('active');
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    document.querySelector('#question-number').textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
    document.querySelector('#question').textContent = q.question;

    const optionsContainer = document.querySelector('#options');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    document.querySelector('#next-btn').classList.remove('show');
    updateProgress();
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option');

    options.forEach((option, index) => {
        if (index === q.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
        option.style.cursor = 'default';
    });

    if (selectedIndex === q.correct) {
        score++;
    } else {
        createScreamer();
    }

    document.querySelector('#next-btn').classList.add('show');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.querySelector('#progress-bar').style.width = progress + '%';
}

function showResults() {
    document.querySelector('#quiz-screen').classList.remove('active');
    document.querySelector('#result-screen').classList.add('active');

    const percentage = (score / questions.length) * 100;
    document.querySelector('#final-score').textContent = `${score} / ${questions.length}`;

    let message = '';
    if (percentage === 100) {
        message = "🏆 PARFAIT ! Vous êtes un véritable expert de l'horreur !";
    } else if (percentage >= 70) {
        message = "😈 Excellent ! Vous connaissez bien vos classiques !";
    } else if (percentage >= 50) {
        message = "👻 Pas mal ! Mais il y a encore des choses à découvrir...";
    } else {
        message = "💀 Oh non... Vous êtes vraiment mauvais !";
    }

    document.querySelector('#result-message').textContent = message;
}

function restartQuiz() {
    document.querySelector('#result-screen').classList.remove('active');
    document.querySelector('#start-screen').classList.add('active');
}