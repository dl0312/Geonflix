const videoApp = document.getElementById("bgVideo");

videoApp.innerHTML = `
<video autoplay loop controls class="video js-video" src="http://www.html5videoplayer.net/videos/toystory.mp4"></video>
	<button class="js-playBtn"></button>
	<button class="js-muteBtn"></button>
	<input type="range" min="0" max="1" step="0.1" class="js-range"/>
	<script src="src/index.js"></script>
`;

const video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range");

const loadVolume = () => {
  const mutePref = localStorage.getItem("isMuted");
  const volume = localStorage.getItem("volume");
  if (mutePref === "true") {
    video.volume = volume;
    range.value = 0;
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  } else {
    video.volume = volume;
    range.value = volume;
    video.muted = false;
    muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  }
};

playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;

const handleScroll = () => {
  const scrollHeight = window.scrollY;
  if (scrollHeight > 200) {
    video.pause();
  } else {
    video.play();
  }
};

const handleMuteBtnClick = () => {
  if (video.muted) {
    // Unmute
    video.muted = false;
    muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    range.value = localStorage.getItem("volume");
    localStorage.setItem("isMuted", false);
  } else {
    // Mute
    video.muted = true;
    range.value = 0;
    muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    localStorage.setItem("isMuted", true);
  }
};

const handlePlayBtnClick = () => {
  if (video.paused) {
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    video.play();
  } else {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    video.pause();
  }
};

const handleRangeChange = event => {
  const currentVolume = event.target.value;
  video.volume = currentVolume;
  localStorage.setItem("volume", currentVolume);
};

window.addEventListener("scroll", handleScroll);
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);
range.addEventListener("change", handleRangeChange);
loadVolume();
