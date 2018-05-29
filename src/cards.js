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
