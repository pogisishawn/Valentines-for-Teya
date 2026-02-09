const quizContent = document.getElementById('quiz-content');
const feedbackDiv = document.getElementById('feedback');
const optionsContainer = document.getElementById('options');
const galleryDiv = document.getElementById('gallery');
const container = document.getElementById('container');
const heartsContainer = document.getElementById('hearts');
const heartEmojis = ['💖', '💕', '💗', '💓', '💞'];

let currentStep = 0;
let showingFeedback = false;

// Array of fixed feedback messages in order (one for each step)
const feedbackMessages = [
    "okay goodluck mahal ko", // After start
    "Easy lang no?", // After Q1
    "Awwww, thank you 💕", // After Q2
    "OH diba lahat tama?", // After Q3
    "Lahat ba sinagot mo 🙄", // After Q4
    "we are the super duper cuter couple", // After Q5
    "AWWWWW I LOVE YOU", // After Q6
    "Tingin nga", // After Q7
    "Syempre yung hakot award", // After Q8
    "HAWHAHAHHAHA PAREHAS TALAGA", // After Q9
    "UNCOUNTABLE DAPAT!!", // After Q10
    "LAHAT SIGE KA ARGHH!", // After Q11
    "for me Home", // After Q12
    "STAY PLS T-T", // After Q13
    "DAPAT LANG!!! I LOVE YOU" // After Q14
];

// Quiz steps: Array of objects with question text and options
const quizSteps = [
    { text: "Hey there, my love! 💕 Let's play a little multiple-choice quiz to see if we're meant to be!", options: ["Start the Quiz! 💕"] },
    { text: "1. When was the time we met?", options: ["A. August 24, 2022", "B. September 15, 2022", "C. July 4, 2022"] }, // Correct: A
    { text: "2. What was your first impression of me?", options: ["A. Pogi, chinito, matangkad", "B. Funny and kind", "C. Mysterious"] }, // Correct: A
    { text: "3. Who fell in love first?", options: ["A. You", "B. Me", "C. Both", "D. All of the above"] }, // As specified
    { text: "4. What’s your favorite thing about me?", options: ["A. My personality", "B. My smile", "C. The way I treat you", "D. Everything"] }, // Correct: D
    { text: "5. What are we?", options: ["A. A cute couple", "B. A power couple", "C. Soulmates", "D. The Main character"] }, // All of the above
    { text: "6. How do you feel when you're with me?", options: ["A. Safe", "B. Happy", "C. Calm", "D. All of the above"] }, // Correct: D
    { text: "7. What makes your heart race the most?", options: ["A. My voice", "B. My messages", "C. Eye contact", "D. When I say your name"] },
    { text: "8. If we were a movie, what genre would we be?", options: ["A. Romantic comedy", "B. Slow-burn love story", "C. K-drama with 16 emotional episodes", "D. The kind that wins awards"] },
    { text: "9. Who gets jealous faster?", options: ["A. Us", "B. Tayo", "C. Parehas", "D. Pwde tayong dalawa"] },
    { text: "10. What would you rate our chemistry?", options: ["A. 8/10", "B. 9/10", "C. 10/10", "D. Illegal levels"] },
    { text: "11. What’s your favorite memory of us?", options: ["A. Our first conversation", "B. The first time we laughed together", "C. A random simple moment", "D. Every moment"] },
    { text: "12. If you had to describe us in one word, it would be:", options: ["A. Genuine", "B. Unexpected", "C. Special", "D. Forever"] },
    { text: "13. If one day things get hard, would you…", options: ["A. Stay and fight", "B. Communicate", "C. Grow together", "D. Choose us again"] },
    { text: "14. Last question: Will you be my Valentine?", options: ["A. Yes", "B. Please A", "C. Me will tampo:(", "D. I love you please a"], isFinal: true }
];

// Array of gallery items: Each object has image src and comment
const galleryItems = [
    { src: "images/pic1.jpg", comment: "The most and first memorable sleepover that we had. I love it! 💕" },
    { src: "images/pic2.jpg", comment: "Best Trip I Ever Had With You! 🌟" },
    { src: "images/pic3.jpg", comment: "Inadd ko sya kasi ang cute nating dalawa. 😍" },
    { src: "images/pic4.jpg", comment: "Ito rin after natin mag-away sobrang cutie mo pa rin. ❤️" },
    { src: "images/pic5.jpg", comment: "Oops, Napindot. 🥰" },
    { src: "images/pic6.jpg", comment: "TOOTHBRUSHING SA BAGUIO WITH MY LOVE!!! 💖" }
];

// Function to load the gallery
function loadGallery() {
    galleryDiv.innerHTML = '';
    for (let i = 0; i < galleryItems.length; i += 2) {
        const row = document.createElement('div');
        row.classList.add('gallery-row');
        const item1 = document.createElement('div');
        item1.classList.add('gallery-item');
        item1.innerHTML = `<img src="${galleryItems[i].src}" alt="Memory ${i+1}"><p>${galleryItems[i].comment}</p>`;
        row.appendChild(item1);
        if (i + 1 < galleryItems.length) {
            const item2 = document.createElement('div');
            item2.classList.add('gallery-item');
            item2.innerHTML = `<img src="${galleryItems[i+1].src}" alt="Memory ${i+2}"><p>${galleryItems[i+1].comment}</p>`;
            row.appendChild(item2);
        }
        galleryDiv.appendChild(row);
    }
}

// Function to update the quiz content and options
function updateQuiz() {
    showingFeedback = false;
    feedbackDiv.style.display = 'none';
    feedbackDiv.innerHTML = '';
    quizContent.innerHTML = `<div>${quizSteps[currentStep].text}</div>`;
    optionsContainer.innerHTML = ''; // Clear previous options
    if (quizSteps[currentStep].options.length > 0) {
        optionsContainer.style.display = 'flex';
        quizSteps[currentStep].options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = option;
            btn.addEventListener('click', () => handleChoice(option));
            optionsContainer.appendChild(btn);
        });
    } else {
        optionsContainer.style.display = 'none';
    }
}

// Function to handle choice selection
function handleChoice(choice) {
    if (showingFeedback) return; // Prevent multiple clicks
    if (quizSteps[currentStep].isFinal) {
        if (choice.startsWith('A. Yes')) {
            // Proceed to final message, then gallery
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = `<div>${feedbackMessages[currentStep]}</div><button class="next-btn">Next</button>`;
            const nextBtn = feedbackDiv.querySelector('.next-btn');
            nextBtn.addEventListener('click', () => {
                quizContent.innerHTML = '<div>Yay! Will you be my Valentine... again? Let\'s make this one even sweeter! ❤️</div>';
                feedbackDiv.style.display = 'none';
                optionsContainer.style.display = 'none';
                // Load gallery after a short delay
                setTimeout(() => {
                    quizContent.style.display = 'none';
                    galleryDiv.style.display = 'block';
                    loadGallery();
                }, 2000); // 2 seconds to show Yay!
            });
        } else {
            // Remove B, C, D options completely and show try again message
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            buttons.forEach(btn => {
                if (!btn.textContent.startsWith('A. Yes')) {
                    btn.remove(); // Completely remove the button
                }
            });
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = '<div>Nope, try again! 💕</div>';
            showingFeedback = false; // Allow clicking A again
        }
    } else {
        optionsContainer.style.display = 'none';
        feedbackDiv.style.display = 'block';
        // Use the feedback for the current step
        const feedback = feedbackMessages[currentStep];
        feedbackDiv.innerHTML = `<div>${feedback}</div><button class="next-btn">Next Question</button>`;
        const nextBtn = feedbackDiv.querySelector('.next-btn');
        nextBtn.addEventListener('click', () => nextStep());
    }
}

// Function to advance to the next step
function nextStep() {
    if (currentStep < quizSteps.length - 1) {
        currentStep++;
        updateQuiz();
    }
}

// Initialize quiz
updateQuiz();

// Falling hearts animation (same as before)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);