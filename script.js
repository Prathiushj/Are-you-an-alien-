// Allowed user
const allowedName = "aradhya";

// Switch screens
function switchScreen(hide, show) {
    document.getElementById(hide).classList.add("hidden");
    document.getElementById(show).classList.remove("hidden");
}

// Login check
function checkName() {
    const input = document.getElementById("nameInput").value.toLowerCase();
    const error = document.getElementById("error");

    if (input === allowedName) {
        switchScreen("login-screen", "quiz-screen");
    } else {
        error.textContent = "Access denied. Only the chosen human may enter. 👽";
    }
}

// Questions (10)
const questions = [
    { q: "What time do you usually sleep?", options: ["Before 10 PM", "Around midnight", "2–3 AM", "Sleep? Never."] },
    { q: "Pick your cosmic snack:", options: ["Meteor chips", "Galaxy donuts", "Nebula noodles", "Alien cotton candy"] },
    { q: "Your ideal movie:", options: ["Rom-com", "Sci-fi", "Comedy", "Drama", "Thriller"] },
    { q: "Pick a planet:", options: ["Ice Planet", "Lava Planet", "Water Planet", "City Planet"] },
    { q: "Your vibe:", options: ["Soft", "Cool", "Cute", "Dramatic", "Gremlin", "Nerdy"] },
    { q: "Your alien superpower:", options: ["Teleportation", "Mind reading", "Shapeshifting", "Laser eyes"] },
    { q: "Pick a spaceship pet:", options: ["Mini dragon", "Floating jelly orb", "Laser cat", "Quantum hamster"] },
    { q: "How do you greet aliens?", options: ["Wave awkwardly", "Send memes", "Telepathic handshake", "Dramatic bow"] },
    { q: "Choose a space drink:", options: ["Stardust shake", "Cosmic coffee", "Blackhole tea", "Milky Way smoothie"] },
    { q: "Weekend alien mode:", options: ["Sleepy alien", "Party alien", "Chaotic alien", "Ghost alien"] }
];

let current = 0;
let answers = [];

// Show question
function showQuestion() {
    const container = document.getElementById("quiz-container");
    const q = questions[current];

    container.innerHTML = `
        <h2 class="question">${q.q}</h2>
        ${q.options.map(opt => `
            <div class="option" onclick="choose('${opt}', this)">${opt}</div>
        `).join("")}
    `;
}
showQuestion();

// Choose answer
function choose(opt, el) {
    el.classList.add("selected");
    setTimeout(() => {
        answers.push(opt);
        nextQuestion();
    }, 200);
}

// Next question
function nextQuestion() {
    if (current < questions.length - 1) {
        current++;
        showQuestion();
    } else {
        showResult();
    }
}

// Generate result
function showResult() {
    switchScreen("quiz-screen", "result-screen");
    document.getElementById("result-text").innerHTML = generateResult();
}

function generateResult() {
    let cute = 0, chaos = 0, smart = 0, mystery = 0;

    answers.forEach(a => {
        if (["Galaxy donuts", "Rom-com", "Cute", "Milky Way smoothie"].includes(a)) cute++;
        if (["Gremlin", "Laser cat", "Chaotic alien"].includes(a)) chaos++;
        if (["Sci-fi", "Teleportation", "Mind reading", "Cosmic coffee"].includes(a)) smart++;
        if (["Sleep? Never.", "Blackhole tea", "Ghost alien"].includes(a)) mystery++;
    });

    let type = "🌌 Mysterious Space Wanderer";
    if (cute >= chaos && cute >= smart && cute >= mystery) type = "💕 Cute Romantic Alien";
    else if (chaos >= cute && chaos >= smart && chaos >= mystery) type = "👾 Chaotic Space Gremlin";
    else if (smart >= cute && smart >= chaos && smart >= mystery) type = "🚀 Intelligent Cosmic Explorer";

    return `
        <h2>${type}</h2>
        <p>You are ${Math.floor(Math.random() * 41) + 60}% alien.</p>
        <p class="endmsg">✨ The galaxy sees your true energy.</p>
    `;
}

