/* ---------------- App logic (robust screen switching) ---------------- */

/* allowed user (lowercase) */
const allowedName = "aradhya";

/* questions (10) */
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

/* Utility: remove active class from all screens, add to one */
function switchScreen(hideId, showId) {
  // remove active from all
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
    s.setAttribute("aria-hidden", "true");
  });

  // add to target
  const showEl = document.getElementById(showId);
  if (showEl) {
    showEl.classList.add("active");
    showEl.setAttribute("aria-hidden", "false");

    // ensure inner scroll starts at top
    const inner = showEl.querySelector(".screen-inner.scrollable");
    if (inner) inner.scrollTop = 0;
  }
}

/* Login check */
function checkName() {
  const input = document.getElementById("nameInput").value.toLowerCase().trim();
  const error = document.getElementById("error");

  if (input === allowedName) {
    error.textContent = "";
    current = 0;
    answers = [];
    // show quiz (defensive)
    showQuestion();
    switchScreen("login-screen", "quiz-screen");
  } else {
    error.textContent = "Access denied. Only the chosen human may enter. 👽";
  }
}

/* Render question */
function showQuestion() {
  const container = document.getElementById("quiz-container");
  const q = questions[current];

  container.innerHTML = `
    <h2 class="question">${escapeHtml(q.q)}</h2>
    ${q.options.map(opt => `<div class="option" role="button" tabindex="0" onclick="choose('${escapeJs(opt)}', this)" onkeydown="optionKey(event,this)">${escapeHtml(opt)}</div>`).join("")}
  `;

  // update Next button visibility/text
  const nextBtn = document.getElementById("nextBtn");
  if (current === questions.length - 1) {
    if (nextBtn) nextBtn.textContent = "Finish ✅";
  } else {
    if (nextBtn) nextBtn.textContent = "Next ▶";
  }

  // scroll the quiz container into view (internal)
  setTimeout(() => {
    const inner = document.querySelector("#quiz-screen .screen-inner.scrollable");
    if (inner) inner.scrollTop = 0;
  }, 40);
}

/* keyboard accessibility for options */
function optionKey(e, el) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    el.click();
  }
}

/* choose answer */
function choose(opt, el) {
  // visual select
  document.querySelectorAll("#quiz-container .option").forEach(a => a.classList.remove("selected"));
  el.classList.add("selected");

  // add answer and proceed
  setTimeout(() => {
    answers.push(opt);
    nextQuestion();
  }, 160);
}

/* next question */
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    // finished
    showResult();
  }
}

/* show result */
function showResult() {
  const resultText = document.getElementById("result-text");
  if (resultText) resultText.innerHTML = generateResult();
  switchScreen("quiz-screen", "result-screen");
}

/* result generation */
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

  const percent = Math.floor(Math.random() * 41) + 60;

  return `
    <h2>${type}</h2>
    <p>You are <strong>${percent}%</strong> alien.</p>
    <p class="endmsg">✨ The galaxy sees your true energy.</p>
    <p class="endmsge"> Not a fruad Paripadi.</p>
  `;
}

/* small helpers to escape content */
function escapeHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function escapeJs(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'\\"'); }

/* initialize first question into quiz container (keeps HTML ready) */
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});

