// Allowed user (lowercase)
const allowedName = "aradhya";

// Keep login lock while on login screen (prevents body scroll)
document.body.classList.add("login-active");

// Switch screens and scroll new screen into view
function switchScreen(hideId, showId) {
  const hideEl = document.getElementById(hideId);
  const showEl = document.getElementById(showId);

  if (hideEl) hideEl.classList.add("hidden");
  if (showEl) showEl.classList.remove("hidden");

  // enable page scrolling when leaving login screen
  document.body.classList.remove("login-active");

  // small delay to let layout settle, then scroll to top of shown screen
  setTimeout(() => {
    if (showEl && showEl.scrollIntoView) {
      showEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 60);
}

// Login check
function checkName() {
  const input = document.getElementById("nameInput").value.toLowerCase().trim();
  const error = document.getElementById("error");

  if (input === allowedName) {
    error.textContent = "";
    // allow scrolling and switch
    switchScreen("login-screen", "quiz-screen");
    // show first question (in case not shown)
    current = 0;
    answers = [];
    showQuestion();
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

// Render a question into the quiz container
function showQuestion() {
  const container = document.getElementById("quiz-container");
  const q = questions[current];

  container.innerHTML = `
    <h2 class="question">${q.q}</h2>
    ${q.options.map(opt => `<div class="option" onclick="choose('${escapeHtml(opt)}', this)">${escapeHtml(opt)}</div>`).join("")}
  `;

  // After injecting question, ensure the quiz container is visible on small screens
  setTimeout(() => {
    // Scroll quiz container into view so the user doesn't need to manually scroll
    if (container && container.scrollIntoView) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 40);

  // Update Next button text if final question
  const nextBtn = document.getElementById("nextBtn");
  if (current === questions.length - 1) {
    if (nextBtn) nextBtn.textContent = "Finish ✅";
  } else {
    if (nextBtn) nextBtn.textContent = "Next ▶";
  }
}

// Simple HTML escape to prevent accidental markup injection
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Choose answer (adds visual feedback + moves to next)
function choose(opt, el) {
  // mark selected visually
  const all = document.querySelectorAll("#quiz-container .option");
  all.forEach(a => a.classList.remove("selected"));
  el.classList.add("selected");

  // small delay to show selection, then proceed
  setTimeout(() => {
    answers.push(opt);
    nextQuestion();
  }, 160);
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

// Show final result
function showResult() {
  // generate result HTML
  document.getElementById("result-text").innerHTML = generateResult();

  // switch screen and scroll into view
  switchScreen("quiz-screen", "result-screen");
}

// Build result content
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
  `;
}
