// One Piece Riddles Collection
const ONE_PIECE_RIDDLES = [
    {
        question: "Which Devil Fruit allows its user to stretch their body like rubber?",
        answer: "Gomu Gomu no Mi",
        hint: "Luffy's signature power!"
    },
    {
        question: "Who is the First Mate of the Straw Hat Pirates?",
        answer: "Roronoa Zoro",
        hint: "Known as the Pirate Hunter"
    },
    {
        question: "Which Devil Fruit gives the user the ability to control fire?",
        answer: "Mera Mera no Mi",
        hint: "Ace's powerful ability"
    },
    {
        question: "What is the name of Luffy's ship?",
        answer: "Going Merry",
        hint: "The first ship of the Straw Hat Pirates"
    },
    {
        question: "Who is the captain of the Straw Hat Pirates?",
        answer: "Monkey D. Luffy",
        hint: "Loves meat and becoming the Pirate King"
    },
    {
        question: "What is the name of Nami's weapon?",
        answer: "Clima-Tact",
        hint: "Weather-based fighting staff"
    },
    {
        question: "Who is the cook of the Straw Hat Pirates?",
        answer: "Sanji",
        hint: "Uses powerful kick-based fighting style"
    },
    {
        question: "What is the name of Usopp's hometown?",
        answer: "Syrup Village",
        hint: "Where Usopp's childhood began"
    },
    {
        question: "Who was the first member to join Luffy's crew?",
        answer: "Zoro",
        hint: "Three-sword style swordsman"
    },
    {
        question: "What is the primary goal of Luffy?",
        answer: "Become Pirate King",
        hint: "Ultimate dream of freedom and adventure"
    },
    {
        question: "Who is Luffy's grandfather?",
        answer: "Monkey D. Garp",
        hint: "Marine Hero known for his strength"
    },
    {
        question: "What is the name of the sea where most of the story takes place?",
        answer: "Grand Line",
        hint: "Most dangerous and mysterious sea route"
    },
    {
        question: "Who is the doctor of the Straw Hat Pirates?",
        answer: "Tony Tony Chopper",
        hint: "A reindeer who ate a Devil Fruit"
    },
    {
        question: "What is the name of Zoro's most famous sword?",
        answer: "Enma",
        hint: "Legendary sword that can cut through anything"
    },
    {
        question: "Who is the archaeologist of the Straw Hat Pirates?",
        answer: "Nico Robin",
        hint: "Can create body parts using her Devil Fruit"
    },
    {
        question: "What is the name of the pirate crew led by Shanks?",
        answer: "Red Hair Pirates",
        hint: "Crew that inspired Luffy to become a pirate"
    },
    {
        question: "What Devil Fruit does Luffy's brother Ace have?",
        answer: "Mera Mera no Mi",
        hint: "Flame-Flame Fruit"
    },
    {
        question: "Who is the shipwright of the Straw Hat Pirates?",
        answer: "Franky",
        hint: "Cyborg who builds and repairs ships"
    },
    {
        question: "What is the name of the ultimate treasure?",
        answer: "One Piece",
        hint: "The treasure that will make someone Pirate King"
    },
    {
        question: "Who is Luffy's father?",
        answer: "Monkey D. Dragon",
        hint: "Leader of the Revolutionary Army"
    }
];

// Game State Variables
let currentRiddle = null;
let timeRemaining = 120;
let score = 0;
let timerInterval = null;
let musicPlaying = true;
let difficulty = 1; 

// DOM Elements
const startButton = document.getElementById('start-button');
const gameContent = document.getElementById('game-content');
const gameInstructions = document.getElementById('game-instructions');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const riddleDisplay = document.getElementById('riddle');
const riddleAnswer = document.getElementById('riddle-answer');
const submitAnswer = document.getElementById('submit-answer');
const devilFruit = document.getElementById('devil-fruit');
const retryButton = document.getElementById('retry-button');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

// Start Game Function
function startGame() {
    // Reset game state
    score = 0;
    timeRemaining = 120;
    devilFruit.style.display = 'none';
    
    // Update displays
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
    
    // Show game content, hide start button
    startButton.style.display = 'none';
    gameContent.style.display = 'block';
    gameInstructions.textContent = 'Solve the riddles to get the Devil Fruit!';
    
    // Start first riddle
    loadNextRiddle();
    startTimer();
}

// Load Next Riddle
function loadNextRiddle() {
    // Remove used riddle to prevent repeats
    const remainingRiddles = ONE_PIECE_RIDDLES.filter(riddle => 
        !currentRiddle || riddle.question !== currentRiddle.question
    );
    
    // Select a random riddle
    currentRiddle = remainingRiddles[
        Math.floor(Math.random() * remainingRiddles.length)
    ];
    
    // Display riddle
    riddleDisplay.textContent = currentRiddle.question;
    riddleAnswer.value = '';
    
    // Increase difficulty
    if (score > 0 && score % 3 === 0) {
        difficulty++;
        // Reduce time for next rounds, but not below 60 seconds
        timeRemaining = Math.max(60, 120 - (difficulty * 15));
        timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
    }
}

// Start Timer
function startTimer() {
    // Clear any existing interval to prevent multiple timers
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        // Ensure timeRemaining is reduced
        timeRemaining--;
        
        // Update timer display
        timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
        
        // Check if time is up
        if (timeRemaining <= 0) {
            endGame();
            // Stop the interval
            clearInterval(timerInterval);
        }
    }, 1000); // Run every 1 second
}

// Submit Answer
function submitAnswerHandler() {
    const userAnswer = riddleAnswer.value.trim().toLowerCase();
    const correctAnswer = currentRiddle.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // Add correct answer sound effect
        const correctSound = new Audio('path/to/correct-sound.mp3');
        correctSound.play();
        
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Check for Devil Fruit
        if (score === 5) {
            // Play special Devil Fruit sound
            const devilFruitSound = new Audio('path/to/devil-fruit-sound.mp3');
            devilFruitSound.play();
            
            devilFruit.style.display = 'block';
            gameInstructions.textContent = 'Congratulations! You found the Devil Fruit!';
            clearInterval(timerInterval);
            setTimeout(endGame, 3000);
        } else {
            loadNextRiddle();
        }
    } else {
        // Add wrong answer sound effect
        const wrongSound = new Audio('path/to/wrong-sound.mp3');
        wrongSound.play();
        
        gameInstructions.textContent = `Incorrect. Hint: ${currentRiddle.hint}`;
    }
    
    riddleAnswer.value = '';
}

// End Game
function endGame() {
    clearInterval(timerInterval);
    gameContent.style.display = 'none';
    startButton.style.display = 'block';
    retryButton.style.display = 'block';
    gameInstructions.textContent = `Game Over! Your score: ${score}`;
}

devilFruit.addEventListener('click', () => {
    // Fade out current game screen
    document.body.style.opacity = 0;
    
    // After short transition
    setTimeout(() => {
        // Load TGCF level
        window.location.href = 'tgcf-level.html';
    }, 1000);
});

// Music Toggle
function toggleMusic() {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇';
    } else {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    }
    musicPlaying = !musicPlaying;
}

// Event Listeners
startButton.addEventListener('click', startGame);
submitAnswer.addEventListener('click', submitAnswerHandler);
retryButton.addEventListener('click', () => {
    retryButton.style.display = 'none';
    startGame();
});
musicToggle.addEventListener('click', toggleMusic);

// Start background music when page loads
backgroundMusic.play();

