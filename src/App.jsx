import { useState } from 'react';
import './App.css';
import Card from './components/Card';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createCard = index => ({
  id: crypto.randomUUID(),
  image: `http://placekitten.com/120/100?image=${index}`,
  stats: [
    { name: 'Cuteness', value: rand(3, 15) },
    { name: 'Playfulness', value: rand(6, 20) },
    { name: 'Friendliness', value: rand(1, 25) },
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

export default function App() {
  const [cards, setCards] = useState(dealCards);
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState('');

  function compareCards() {
    // Pick the first stat of both cards
    const playerStat = cards.player[0].stats[selected];
    const opponentStat = cards.opponent[0].stats[selected];

    setResult(() => {
      if (playerStat.value === opponentStat.value) return 'draw';
      else if (playerStat.value > opponentStat.value) return 'win';
      else return 'loss';
    });
  }

  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <div className="hand player">
          <h2>Player</h2>
          <ul className="card-list player">
            {cards.player.map((playerCard, index) => (
              <li className="card-list-item player" key={playerCard.id}>
                <Card card={index === 0 ? playerCard : null} />
              </li>
            ))}
          </ul>
        </div>
        <div className="center-area">
          <p>{result || 'press the button'}</p>
          <button onClick={compareCards} className="play-button" type="button">
            Play
          </button>
        </div>
        <div className="hand opponent">
          <h2>Opponent</h2>
          <div className="card-list opponent">
            {cards.opponent.map((opponentCard, index) => (
              <li className="card-list-item opponent" key={opponentCard.id}>
                <Card card={index === 0 ? opponentCard : null} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
