
const episodes = [
  {
    title: "Academese – Episode 01",
    description: "Discover English through our podcast and improve your listening skills.",
    level: "Beginner – Intermediate",
    duration: "Coming soon",
    icon: "🎧",
    file: "audio/episode-01.mp3"
  }
];


const grid = document.getElementById("episodeGrid");
const audio = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");

let currentEpisode = -1;

function renderEpisodes() {
  grid.innerHTML = episodes.map((ep, index) => `
    <article class="episode-card">
      <div class="episode-cover">${ep.icon}</div>
      <h3>${ep.title}</h3>
      <p>${ep.description}</p>
      <div class="episode-meta">
        <span>${ep.level}</span>
        <span>${ep.duration}</span>
      </div>
      <button onclick="playEpisode(${index})">
        ▶ Play episode
      </button>
    </article>
  `).join("");
}

function playEpisode(index) {
  const ep = episodes[index];

  if (currentEpisode === index) {
    if (audio.paused) {
      audio.play().catch(() => {
        alert("Unable to play this audio file.");
      });
    } else {
      audio.pause();
    }
    return;
  }

  currentEpisode = index;
  audio.src = ep.file;

  document.getElementById("playerTitle").textContent = ep.title;
  document.getElementById("playerSubtitle").textContent =
    "Academese · " + ep.level;

  audio.play().then(() => {
    playButton.textContent = "Ⅱ";
  }).catch(() => {
    playButton.textContent = "▶";
    alert("Audio file not found. Please upload the episode to the audio folder.");
  });

  document.getElementById("playerTitle").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

playButton.addEventListener("click", () => {
  if (currentEpisode === -1) {
    playEpisode(0);
    return;
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
});

audio.addEventListener("ended", () => {
  playButton.textContent = "▶";
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;

  document.getElementById("currentTime").textContent =
    formatTime(audio.currentTime);

  document.getElementById("duration").textContent =
    formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return min + ":" + String(sec).padStart(2, "0");
}

renderEpisodes();
