// 👉 set her name here
const allowedName = "Aradhya".toLowerCase();

// login logic
function checkName() {
    const input = document.getElementById("nameInput").value.toLowerCase();
    const error = document.getElementById("error");

    if (input === allowedName) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("quiz-screen").classList.remove("hidden");
    } else {
        error.textContent = "Access denied. Only the chosen human may enter. 👽";
    }
}

// quiz data
const questions = [
    {
        q: "What time do you usually sleep?",
        options: ["Before 10 PM", "Around midnight", "2–3 AM", "Sleep? Never."],
    },
    {
        q: "Pick your cosmic snack:",
        options: ["Meteor chips", "Galaxy donuts", "Nebula noodles", "Alien cotton candy"],
    },
    {
        q: "Your ideal movie in the spaceship:",
        options: ["Rom-com", "Sci-fi", "Comedy", "Drama", "Thriller"],
    },
    {
        q: "Pick a planet to visit:",
        options: ["Ice Planet", "Lava Planet", "Water Planet", "City Planet"],
    },
    {
        q: "Your vibe:",
        options: ["Soft", "Cool", "Cute", "Dramatic", "Gremlin", "Nerdy"],
    }
];

let current = 0;
let answers = [];

showQuestion();

function showQuestion() {
    const container = document.getElementById("quiz-container");
    const q = questions[current];

    container.innerHTML = `
        <h2>${q.q}</h2>
        ${q.options.map(opt =>
            `<div class="option" onclick="choose('${opt}')">${opt}</div>`
        ).join("")}
    `;
}

function choose(opt) {
    answers.push(opt);
    nextQuestion();
}

function nextQuestion() {
    if (current < questions.length - 1) {
        current++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    const summary = generateResult();

    document.getElementById("result-text").innerHTML = summary;
}

function generateResult() {
    let score = Math.floor(Math.random() * 41) + 60; // 60–100% alien

    let type;

    if (answers.includes("Galaxy donuts") || answers.includes("Rom-com")) {
        type = "Cute Romantic Alien 💕👽";
    } else if (answers.includes("Gremlin")) {
        type = "Chaotic Space Gremlin 👾";
    } else if (answers.includes("Sci-fi")) {
        type = "Intelligent Cosmic Explorer 🚀";
    } else {
        type = "Mysterious Space Wanderer 🌌";
    }

    return `
        <h2>${type}</h2>
        <p>You are ${score}% alien.</p>
        <p>The galaxy approves of your vibes. 🛸</p>
        <br>
        <p style="font-size: 1.2rem; margin-top: 20px; color: #ffb6ff;">
            ✨ I know you are an alien <br>
            <strong>(Not A Fraud Paripadi)</strong> 👽💜
        </p>
    `;
}
