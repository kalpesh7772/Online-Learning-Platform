// Sample Data
const courses = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming language",
        category: "Programming",
        duration: "8 hours",
        lessons: 12,
        rating: 4.7,
        image: "assets/images/js-course.jpg",
        instructor: "Jane Smith",
        video: "assets/videos/js-intro.mp4",
        lessonsList: [
            { id: 1, title: "Introduction to JavaScript", duration: "15 min", completed: true },
            { id: 2, title: "Variables and Data Types", duration: "20 min", completed: true },
            { id: 3, title: "Operators and Expressions", duration: "25 min", completed: false },
            { id: 4, title: "Control Structures", duration: "30 min", completed: false }
        ],
        quiz: {
            title: "JavaScript Basics Quiz",
            questions: [
                {
                    id: 1,
                    question: "What is the correct way to declare a variable in JavaScript?",
                    options: [
                        "variable x;",
                        "var x;",
                        "x = var;",
                        "declare x;"
                    ],
                    correct: 1
                },
                {
                    id: 2,
                    question: "Which of these is not a JavaScript data type?",
                    options: [
                        "String",
                        "Boolean",
                        "Integer",
                        "Object"
                    ],
                    correct: 2
                },
                {
                    id: 3,
                    question: "What does 'DOM' stand for?",
                    options: [
                        "Document Object Model",
                        "Data Object Management",
                        "Digital Output Module",
                        "Display Object Method"
                    ],
                    correct: 0
                }
            ]
        }
    },
    {
        id: 2,
        title: "HTML & CSS for Beginners",
        description: "Build your first website with HTML and CSS",
        category: "Web Development",
        duration: "6 hours",
        lessons: 10,
        rating: 4.5,
        image: "assets/images/html-css.jpg",
        instructor: "John Doe",
        video: "assets/videos/html-intro.mp4",
        lessonsList: [
            { id: 1, title: "HTML Basics", duration: "20 min", completed: true },
            { id: 2, title: "CSS Fundamentals", duration: "25 min", completed: false },
            { id: 3, title: "Layout Techniques", duration: "30 min", completed: false }
        ],
        quiz: {
            title: "HTML & CSS Basics Quiz",
            questions: [
                {
                    id: 1,
                    question: "Which HTML tag is used for the largest heading?",
                    options: [
                        "<h6>",
                        "<heading>",
                        "<h1>",
                        "<head>"
                    ],
                    correct: 2
                },
                {
                    id: 2,
                    question: "What does CSS stand for?",
                    options: [
                        "Computer Style Sheets",
                        "Creative Style Sheets",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets"
                    ],
                    correct: 2
                }
            ]
        }
    },
    {
        id: 3,
        title: "Python Programming",
        description: "Learn Python from scratch",
        category: "Programming",
        duration: "10 hours",
        lessons: 15,
        rating: 4.8,
        image: "assets/images/python-course.jpg",
        instructor: "Alex Johnson",
        video: "assets/videos/python-intro.mp4",
        lessonsList: [
            { id: 1, title: "Python Installation", duration: "10 min", completed: false },
            { id: 2, title: "Python Syntax", duration: "20 min", completed: false }
        ],
        quiz: {
            title: "Python Basics Quiz",
            questions: [
                {
                    id: 1,
                    question: "Which of these is used to define a block of code in Python?",
                    options: [
                        "Curly braces {}",
                        "Indentation",
                        "Square brackets []",
                        "Parentheses ()"
                    ],
                    correct: 1
                }
            ]
        }
    }
];

// DOM Elements
const courseGrid = document.querySelector('.course-grid');
const videoSection = document.querySelector('.video-section');
const quizSection = document.querySelector('.quiz-section');
const lessonVideo = document.getElementById('lesson-video');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const lessonList = document.querySelector('.lesson-list');
const quizTitle = document.getElementById('quiz-title');
const questionText = document.getElementById('question-text');
const quizOptions = document.querySelector('.quiz-options');
const currentQuestion = document.getElementById('current-question');
const totalQuestions = document.getElementById('total-questions');
const progressBar = document.querySelector('.progress-bar .progress');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const modal = document.querySelector('.modal');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const closeModal = document.querySelector('.close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');
const circleProgress = document.querySelector('.circle-progress');
const progressText = document.querySelector('.progress-text');
const progressRingCircle = document.querySelector('.progress-ring-circle');

// Current State
let currentCourse = null;
let currentLesson = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let selectedOption = null;
let quizScore = 0;

// Initialize the app
function init() {
    renderCourses();
    setupEventListeners();
    updateProgressCircle(65); // Sample progress
}

// Render courses to the grid
function renderCourses(filter = 'All') {
    courseGrid.innerHTML = '';
    
    const filteredCourses = filter === 'All' 
        ? courses 
        : courses.filter(course => course.category === filter);
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span class="rating"><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
            </div>
        `;
        
        courseCard.addEventListener('click', () => openCourse(course));
        courseGrid.appendChild(courseCard);
    });
}

// Open a course (show video section)
function openCourse(course) {
    currentCourse = course;
    currentLesson = course.lessonsList[0];
    
    // Update video section
    lessonVideo.src = course.video;
    videoTitle.textContent = course.title;
    videoDescription.textContent = course.description;
    
    // Update lessons list
    lessonList.innerHTML = '';
    course.lessonsList.forEach(lesson => {
        const lessonItem = document.createElement('li');
        lessonItem.className = `lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.id === currentLesson.id ? 'current' : ''}`;
        lessonItem.innerHTML = `
            <i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
            <span>${lesson.title}</span>
            <span>${lesson.duration}</span>
        `;
        
        lessonItem.addEventListener('click', () => {
            currentLesson = lesson;
            updateLessonList();
            // In a real app, we would load the specific lesson video
            lessonVideo.src = course.video; // Using the same video for demo
        });
        
        lessonList.appendChild(lessonItem);
    });
    
    // Show video section and hide others
    document.querySelector('.courses-section').classList.add('hidden');
    videoSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
}

// Update lesson list highlighting
function updateLessonList() {
    const items = lessonList.querySelectorAll('.lesson-item');
    items.forEach(item => {
        const lessonId = parseInt(item.getAttribute('data-id'));
        item.classList.remove('current');
        if (lessonId === currentLesson.id) {
            item.classList.add('current');
        }
    });
}

// Start quiz for current course
function startQuiz() {
    currentQuiz = currentCourse.quiz;
    currentQuestionIndex = 0;
    quizScore = 0;
    
    quizTitle.textContent = currentQuiz.title;
    totalQuestions.textContent = currentQuiz.questions.length;
    
    showQuestion();
    
    // Show quiz section and hide video section
    videoSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
}

// Show current question
function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    currentQuestion.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    // Update progress bar
    const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Update options
    quizOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        quizOptions.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Submit' : 'Next';
}

// Select an option in quiz
function selectOption(index) {
    const options = quizOptions.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedOption = index;
}

// Go to next question
function nextQuestion() {
    if (selectedOption === null) return;
    
    // Check if answer is correct
    const currentQ = currentQuiz.questions[currentQuestionIndex];
    if (selectedOption === currentQ.correct) {
        quizScore++;
    }
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        selectedOption = null;
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Go to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        selectedOption = null;
        showQuestion();
    }
}

// Finish quiz and show results
function finishQuiz() {
    const scorePercent = Math.round((quizScore / currentQuiz.questions.length) * 100);
    alert(`Quiz completed! Your score: ${scorePercent}%`);
    
    // Return to video section
    quizSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
}

// Update progress circle animation
function updateProgressCircle(percent) {
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (percent / 100) * circumference;
    
    progressRingCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percent}%`;
}

// Setup event listeners
function setupEventListeners() {
    // Quiz navigation
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    
    // Modal handling
    loginBtn.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });
    
    signupBtn.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCourses(btn.textContent);
        });
    });
    
    // Sample "Start Quiz" button (would be in video section in real implementation)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'q' && currentCourse && !quizSection.classList.contains('hidden')) {
            startQuiz();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);