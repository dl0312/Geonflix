const app = document.getElementById("app");
app.innerHTML =
    `
    <header class="header">
        <div class="nav">
            <div class="contentColumn">
                <img class="logo" src="<%= require("./img/netflix.png") %>" />
                    <div class="subtitle ">홈</div>
                <div class="subtitle ">TV 프로그램</div>
                <div class="subtitle ">영화</div>
                <div class="subtitle ">넷플릭스 오리지널</div>
                <div class="subtitle ">최신 등록 콘텐츠</div>
                <div class="subtitle ">내가 찜한 콘텐츠</div>
            </div>
            <div class="userColumn">
                <div class="subtitle search">
                    <i class="fas fa-search fa-lg"></i>
                </div>
                <div class="subtitle">키즈</div>
                <div class="subtitle alarm">
                    <i class="fas fa-bell fa-lg ">
                        <div class="layer ">1</div>
                    </i>
                </div>
                <div class="subtitle user ">
                    <img class="profile " src="<%= require("./img/profile.png") %>" />
                        <i class=" fas fa-sort-down " style="color:#e5e5e5 "></i>
                </div>
            </div>
        </div>
    </header >
    <div id="bgVideo">
        <video autoplay loop controls class="video js-video " src="http://www.html5videoplayer.net/videos/toystory.mp4 "></video>
        <button class="js-playBtn "></button>
        <button class="js-muteBtn "></button>
        <input type="range " min="0 " max="1 " step="0.1 " class="js-range " />
        <script src="src/index.js "></script>
    </div>
    <div class="videoCategory">
        <div class="category">
            <div class="title">Netflix 오리지널</div>
            <div class="column">
                <div class="card">1</div>
                <div class="card">2</div>
                <div class="card ">3</div>
                <div class="card ">4</div>
                <div class="card ">5</div>
            </div>
        </div>
    </div>
`;

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

cardArray.forEach(card => {
    card.addEventListener("mouseover", handleCardMouseOver);
    card.addEventListener("mouseleave", handleCardMouseLeave);
});

import "./styles.css";


