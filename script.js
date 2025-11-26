// allowed user
const allowedName = "Aradhya".toLowerCase();

function checkName() {
    const input = document.getElementById("nameInput").value.toLowerCase();
    const error = document.getElementById("error");

    if (input === allowedName) {
        switchScreen("login-screen", "quiz-screen");
    } else {
        error.textContent = "Access denied. Only the chosen human may enter. 👽";
    }
}

function switchScreen(hide, show) {
    document.getElementById(hide).classList.add("hidden");
    document.getElementById(show).classList.remove("hidden");
}

// QUESTIONS (10 total)
const questions = [
    { q: "What time do you usually sleep?", options: ["Before 10 PM", "Around midnight", "2–3 AM", "Sleep? Never."] },
    { q: "Pick your cosmic snack:", options: ["Meteor chips", "Galaxy donuts", "Nebula noodles", "Alien cotton candy"] },
    { q: "Your ideal movie in the spaceship:", options: ["Rom-com", "Sci-fi", "Comedy", "Drama", "Thriller"] },
    { q: "Pick a planet to visit:", options: ["Ice Planet", "Lava Planet", "Water Planet", "City Planet"] },
    { q: "Your vibe:", options: ["Soft", "Cool", "Cute", "Dramatic", "Gremlin", "Nerdy"] },
    { q: "Your alien superpower:", options: ["Teleportation", "Mind reading", "Shapeshifting", "Laser eyes"] },
    { q: "Pick a spaceship pet:", options: ["Mini dragon", "Floating jelly orb", "Laser cat", "Quantum hamster"] },
    { q: "How do you greet aliens?", options: ["Wave awkwardly", "Send memes", "Telepathic handshake", "Do a dramatic bow"] },
    { q: "Choose a space drink:", options: ["Stardust shake", "Cosmic coffee", "Blackhole tea", "Milky Way smoothie"] },
    { q: "What kind of alien are you on weekends?", options: ["Sleepy alien", "Party alien", "Chaotic gremlin alien", "Mysterious ghost alien"] }
];

let current = 0;
let answers = [];

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

function choose(opt, el) {
    el.classList.add("selected");
    setTimeout(() => {
        answers.push(opt);
        nextQuestion();
    }, 250);
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
    switchScreen("quiz-screen", "result-screen");
    document.getElementById("result-text").innerHTML = generateResult();
}

function generateResult() {

    let score = Math.floor(Math.random() * 41) + 60;

    let cute = 0, chaos = 0, smart = 0, mystery = 0;

    answers.forEach(a => {
        if (["Galaxy donuts", "Rom-com", "Cute", "Milky Way smoothie"].includes(a)) cute++;
        if (["Gremlin", "Laser cat", "Chaotic gremlin alien", "Do a dramatic bow"].includes(a)) chaos++;
        if (["Sci-fi", "Teleportation", "Mind reading", "Cosmic coffee"].includes(a)) smart++;
        if (["Sleep? Never.", "Blackhole tea", "Mysterious ghost alien"].includes(a)) mystery++;
    });

    let max = Math.max(cute, chaos, smart, mystery);

    let type = "🌌 Mysterious Space Wanderer";
    let desc = "You drift through galaxies quietly but powerfully.";

    if (cute === max) {
        type = "💕 Cute Romantic Alien";
        desc = "You spread cosmic love and starry vibes.";
    }
    else if (chaos === max) {
        type = "👾 Chaotic Space Gremlin";
        desc = "You bring chaos, memes, and pure alien energy.";
    }
    else if (smart === max) {
        type = "🚀 Intelligent Cosmic Explorer";
        desc = "You are curious, logical and galaxy-smart.";
    }

    return `
        <h2>${type}</h2>
        <p><strong>${desc}</strong></p>
        <p>You are <strong>${score}% alien.</strong></p>
        <br>
        <p class="endmsg">
            ✨ I know you are an alien<br>
            <strong>(Not A Fraud Paripadi)</strong> 👽💜
        </p>
    `;
}

function downloadImage() {
    const card = document.getElementById("result-card");

    html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "Alien_Result.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}


