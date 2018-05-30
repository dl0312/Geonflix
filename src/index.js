import video_1 from "./img/hana.mp4";

const header = document.querySelector(".header");

const handleScrollHeader = event => {
  const scrollHeight = window.scrollY;
  console.log(scrollHeight);
  if (scrollHeight > 100) {
    header.classList.add("darken");
  } else {
    header.classList.remove("darken");
  }
};

window.addEventListener("scroll", handleScrollHeader);

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

window.addEventListener("scroll", handleScrollVideo);
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);
range.addEventListener("change", handleRangeChange);
loadVolume();

const cards = document.querySelectorAll(".card");
const cardArray = Array.from(cards);

const getPrevious = card => {
  const previousCards = [];
  const findCard = card => {
    if (card !== null) {
      previousCards.push(card);
      const previousCard = card.previousElementSibling;
      if (previousCard !== null) {
        findCard(previousCard);
      }
    }
  };
  findCard(card);
  return previousCards;
};

const getNext = card => {
  const nextCards = [];
  const findCard = card => {
    if (card !== null) {
      nextCards.push(card);
      const nextCard = card.nextElementSibling;
      if (nextCard !== null) {
        findCard(nextCard);
      }
    }
  };
  findCard(card);
  return nextCards;
};

const handleCardMouseOver = event => {
  const box = event.target;
  const previousCards = getPrevious(box.previousElementSibling);
  const nextCards = getNext(box.nextElementSibling);
  Array.from(previousCards).forEach(card => card.classList.add("left"));
  Array.from(nextCards).forEach(card => card.classList.add("right"));
};

const handleCardMouseLeave = event => {
  const box = event.target;
  const previousCards = getPrevious(box.previousElementSibling);
  const nextCards = getNext(box.nextElementSibling);
  Array.from(previousCards).forEach(card => card.classList.remove("left"));
  Array.from(nextCards).forEach(card => card.classList.remove("right"));
};

const handleCardClick = event => {
  location.href = "./video.html";
};

cardArray.forEach(card => {
  card.addEventListener("click", handleCardClick);
  card.addEventListener("mouseover", handleCardMouseOver);
  card.addEventListener("mouseleave", handleCardMouseLeave);
});

import "./styles.css";
import "./video";
import "./video.css";
