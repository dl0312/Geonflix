const video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  qnaBtn = document.querySelector(".js-qnaBtn"),
  fullscreenBtn = document.querySelector(".js-fullscreenBtn"),
  volumeRange = document.querySelector(".js-videoVolumeRange"),
  lengthRange = document.querySelector(".js-videoLengthRange"),
  videoTime = document.querySelector(".js-videoTime");
const loadVolume = () => {
  const mutePref = localStorage.getItem("isMuted");
  const volume = localStorage.getItem("volume");
  if (mutePref === "true") {
    video.volume = volume / 100;
    volumeRange.value = 0;
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg" style="color:#9d9d9d "></i>`;
  } else {
    video.volume = volume / 100;
    volumeRange.value = volume;
    video.muted = false;
    muteBtn.innerHTML = `<i class="fas fa-volume-up fa-lg" style="color:#9d9d9d "></i>`;
  }
};

const loadTime = () => {
  const time = localStorage.getItem("time");
  video.currentTime = time;
};

playBtn.innerHTML = `<i class="fas fa-pause fa-lg" style="color:#9d9d9d "></i>`;
muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg" style="color:#9d9d9d "></i>`;

const handleScrollVideo = () => {
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
    muteBtn.innerHTML = `<i class="fas fa-volume-up fa-lg" style="color:#9d9d9d "></i>`;
    volumeRange.value = localStorage.getItem("volume");
    localStorage.setItem("isMuted", false);
  } else {
    // Mute
    video.muted = true;
    volumeRange.value = 0;
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg" style="color:#9d9d9d "></i>`;
    localStorage.setItem("isMuted", true);
  }
};

const handlePlayBtnClick = () => {
  if (video.paused) {
    playBtn.innerHTML = `<i class="fas fa-pause fa-lg" style="color:#9d9d9d "></i>`;
    video.play();
  } else {
    playBtn.innerHTML = `<i class="fas fa-play fa-lg" style="color:#9d9d9d "></i>`;
    video.pause();
  }
};

const handleQnaBtnClick = () => {
  location.href = "https://github.com/dl0312/Geonflix";
};

const cancelFullScreen = el => {
  const requestMethod =
    el.cancelFullScreen ||
    el.webkitCancelFullScreen ||
    el.mozCancelFullScreen ||
    el.exitFullscreen;
  if (requestMethod) {
    // cancel full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
};

const requestFullScreen = el => {
  // Supports most browsers and their versions.
  const requestMethod =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
  return false;
};

const handleFullScreenClick = () => {
  const elem = document.body; // Make the body go full screen.
  const isInFullScreen =
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (document.mozFullScreen || document.webkitIsFullScreen);

  if (isInFullScreen) {
    cancelFullScreen(document);
  } else {
    requestFullScreen(elem);
  }
  return false;
};

const handleVolumeRangeChange = event => {
  const currentVolume = event.target.value;
  video.volume = currentVolume / 100;
  localStorage.setItem("volume", currentVolume);
};

const handleLengthRangeChange = event => {
  const currentLength = event.target.value;
  video.currentTime = currentLength * video.duration / 100;
  localStorage.setItem("time", currentLength);
};
setInterval(oneSecondFunction, 1000);

function oneSecondFunction() {
  lengthRange.value = video.currentTime / video.duration * 100;
  videoTime.innerHTML = `${Math.floor(video.currentTime / 60)}:${
    Math.floor(video.currentTime % 60) < 10
      ? "0" + Math.floor(video.currentTime % 60)
      : Math.floor(video.currentTime % 60)
  }`;
  localStorage.setItem("time", lengthRange.value);
}

window.addEventListener("scroll", handleScrollVideo);
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);
qnaBtn.addEventListener("click", handleQnaBtnClick);
fullscreenBtn.addEventListener("click", handleFullScreenClick);
volumeRange.addEventListener("change", handleVolumeRangeChange);
lengthRange.addEventListener("change", handleLengthRangeChange);
loadVolume();
loadTime();
