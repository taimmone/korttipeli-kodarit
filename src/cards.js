const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createCard = index => ({
  id: crypto.randomUUID(),
  name: 'Lorem ipsum',
  image: `http://placekitten.com/140/120?image=${index}`,
  stats: [
    { name: 'Cuteness', value: rand(3, 15), max: 15 },
    { name: 'Playful', value: rand(6, 20), max: 20 },
    { name: 'Loving', value: rand(1, 25), max: 25 },
  ],
});

const deck = Array(16)
  .fill(null)
  .map((_, index) => createCard(index));

const half = Math.ceil(deck.length / 2);

function shuffle(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const dealCards = () => {
  shuffle(deck);
  return {
    player: deck.slice(0, half),
    opponent: deck.slice(half),
  };
};

export { dealCards };
