document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const questions = document.querySelectorAll(".question");
    const submitBtn = document.getElementById("submit-btn");
    const timerContainer = document.getElementById("timer");
    const countdownEl = document.getElementById("countdown");
    const totalTime = 60;
    let timeLeft = totalTime;
    let currentQuestion = 0;
    let score = 0;
    let timerInterval;

    const correctAnswers = {
        "q1": "a",
        "q2": "b",
        "q3": "b",
        "q4": "b",
        "q5": "b"
    };

    function updateTimer() {
        countdownEl.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }

    function showModal(message) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");
        modalMessage.textContent = message;
        modal.classList.remove("hidden");
    }

    function submitAnswer() {
        const selectedOption = document.querySelector(`input[name="q${currentQuestion + 1}"]:checked`);

        if (selectedOption) {
            if (selectedOption.value === correctAnswers[`q${currentQuestion + 1}`]) {
                score++;
            } else {
                timeLeft -= 10;
            }

            if (currentQuestion < questions.length - 1) {
                questions[currentQuestion].classList.add("hidden");
                currentQuestion++;
                questions[currentQuestion].classList.remove("hidden");
            } else {
                clearInterval(timerInterval);
                submitQuiz();
            }

            selectedOption.checked = false;
        } else {
            alert("Please select an answer!");
        }
    }

    function submitQuiz() {
        showModal(`Quiz submitted! Your score is ${score}.`);

        const initials = prompt("Please enter your initials:");
        if (initials) {
            const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
            scoreBoard.push({
                initials,
                score
            });

            scoreBoard.sort((a, b) => b.score - a.score);
            localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
        }
    }

    startBtn.addEventListener("click", () => {
        startBtn.classList.add("hidden");
        questions[currentQuestion].classList.remove("hidden");
        submitBtn.classList.remove("hidden");
        timerContainer.classList.remove("hidden");

        timerInterval = setInterval(updateTimer, 1000);
    });

    submitBtn.addEventListener("click", () => {
        submitAnswer();
        if (currentQuestion === questions.length - 1) {
            clearInterval(timerInterval);
        }
    });

    document.getElementById("try-again-btn").addEventListener("click", () => {
        location.reload();
    });

    document.querySelector(".close-btn").addEventListener("click", () => {
        document.getElementById("modal").classList.add("hidden");
    });
});
