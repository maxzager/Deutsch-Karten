let cards = [];
let currentCardIndex = 0;
let score = 0;
let timerInterval = null;
let startTime = null;
let isCardFlipped = false;
let correctCount = 0;

const categorySelect = document.getElementById('category');
const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const resultsArea = document.getElementById('resultsArea');
const flashcard = document.getElementById('flashcard');
const frontText = document.getElementById('frontText');
const backText = document.getElementById('backText');
const timerDisplay = document.getElementById('timer');
const progressDisplay = document.getElementById('progress');
const scoreDisplay = document.getElementById('score');
const knowBtn = document.getElementById('knowBtn');
const dontKnowBtn = document.getElementById('dontKnowBtn');
const nextBtn = document.getElementById('nextBtn');
const translateBtn = document.getElementById('translateBtn');
const endBtn = document.getElementById('endBtn');
const restartBtn = document.getElementById('restartBtn');
const englishText = document.getElementById('englishText');

async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function startGame() {
    const category = categorySelect.value;
    const cardCount = parseInt(document.querySelector('input[name="cardCount"]:checked').value);
    
    try {
        const response = await fetch(`/api/random-cards/${category}/${cardCount}`);
        cards = await response.json();
        
        if (cards.length === 0) {
            alert('No cards available for this category!');
            return;
        }
        
        currentCardIndex = 0;
        score = 0;
        correctCount = 0;
        isCardFlipped = false;
        
        document.querySelector('.controls').classList.add('hidden');
        gameArea.classList.remove('hidden');
        resultsArea.classList.add('hidden');
        
        startTimer();
        updateProgress();
        showCard();
    } catch (error) {
        console.error('Error starting game:', error);
        alert('Error loading cards. Please try again.');
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateProgress() {
    progressDisplay.textContent = `${currentCardIndex + 1}/${cards.length}`;
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function showCard() {
    if (currentCardIndex >= cards.length) {
        endGame();
        return;
    }
    
    const card = cards[currentCardIndex];
    frontText.textContent = card.front;
    backText.textContent = card.back;
    englishText.textContent = card.english || '';
    englishText.classList.add('hidden');
    
    flashcard.classList.remove('flipped');
    isCardFlipped = false;
    
    knowBtn.classList.remove('hidden');
    dontKnowBtn.classList.remove('hidden');
    translateBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    updateProgress();
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;
}

function handleAnswer(knew) {
    if (!isCardFlipped) {
        flipCard();
    }
    
    if (knew) {
        score += 10;
        correctCount++;
    }
    
    updateScore();
    
    knowBtn.classList.add('hidden');
    dontKnowBtn.classList.add('hidden');
    
    const card = cards[currentCardIndex];
    if (card.english) {
        translateBtn.classList.remove('hidden');
    }
    
    nextBtn.classList.remove('hidden');
}

function nextCard() {
    currentCardIndex++;
    showCard();
}

function endGame() {
    stopTimer();
    
    const totalTime = timerDisplay.textContent;
    const totalCards = cards.length;
    const accuracy = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;
    
    document.getElementById('totalTime').textContent = totalTime;
    document.getElementById('totalCards').textContent = totalCards;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('accuracy').textContent = accuracy;
    
    gameArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
}

function restart() {
    resultsArea.classList.add('hidden');
    document.querySelector('.controls').classList.remove('hidden');
}

flashcard.addEventListener('click', flipCard);
startBtn.addEventListener('click', startGame);
knowBtn.addEventListener('click', () => handleAnswer(true));
dontKnowBtn.addEventListener('click', () => handleAnswer(false));
nextBtn.addEventListener('click', nextCard);
endBtn.addEventListener('click', endGame);
restartBtn.addEventListener('click', restart);
translateBtn.addEventListener('click', () => {
    englishText.classList.toggle('hidden');
    translateBtn.textContent = englishText.classList.contains('hidden') ? 'Show Translation' : 'Hide Translation';
});

document.addEventListener('keydown', (e) => {
    if (gameArea.classList.contains('hidden')) return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            flipCard();
            break;
        case 'ArrowRight':
            if (!nextBtn.classList.contains('hidden')) {
                nextCard();
            }
            break;
        case 'ArrowUp':
            if (!knowBtn.classList.contains('hidden')) {
                handleAnswer(true);
            }
            break;
        case 'ArrowDown':
            if (!dontKnowBtn.classList.contains('hidden')) {
                handleAnswer(false);
            }
            break;
    }
});

loadCategories();