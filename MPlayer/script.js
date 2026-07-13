const songs = [
  { name: "Believer", file: "songs/1.mp3", cover: "images/cover1.jpg" },
  { name: "Love Me Not", file: "songs/2.mp3", cover: "images/cover2.jpg" },
  { name: "ACIDO III", file: "songs/3.mp3", cover: "images/cover3.jpg" },
  { name: "Judas", file: "songs/4.mp3", cover: "images/cover4.jpg" },
  { name: "Fight Back", file: "songs/5.mp3", cover: "images/cover5.jpg" }
];
 
let index = 0;
const audio = new Audio(songs[index].file);
 
const cover = document.getElementById("cover");
const songName = document.getElementById("songName");
const playPause = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const listItems = document.querySelectorAll(".songlist li");
 
function loadSong(i) {
  index = i;
  audio.src = songs[index].file;
  cover.src = songs[index].cover;
  songName.textContent = songs[index].name;
  progressBar.value = 0;
  highlightActive();
}
 
function playSong() {
  audio.play();
  playPause.textContent = "⏸";
}
 
function pauseSong() {
  audio.pause();
  playPause.textContent = "▶";
}
 
function highlightActive() {
  listItems.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}
 
playPause.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});
 
prevBtn.addEventListener("click", () => {
  loadSong((index - 1 + songs.length) % songs.length);
  playSong();
});
 
nextBtn.addEventListener("click", () => {
  loadSong((index + 1) % songs.length);
  playSong();
});
 
listItems.forEach((li, i) => {
  li.addEventListener("click", () => {
    loadSong(i);
    playSong();
  });
});
 
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});
 
progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});
 
audio.addEventListener("ended", () => {
  loadSong((index + 1) % songs.length);
  playSong();
});
 
// set initial active song in list
highlightActive();
 