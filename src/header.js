const header = document.querySelector(".header");

const handleScroll = event => {
  const scrollHeight = window.scrollY;
  console.log(scrollHeight);
  if (scrollHeight > 100) {
    header.classList.add("darken");
  } else {
    header.classList.remove("darken");
  }
};

window.addEventListener("scroll", handleScroll);
