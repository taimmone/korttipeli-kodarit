import { useState } from 'react';
import './App.css';
import Card from './components/Card';

const deckSize = 16;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const card = () => ({
  image: `http://placekitten.com/120/100?image=${getRandomInt(0, 16)}`,
  stats: [
    { name: 'Cuteness', value: getRandomInt(3, 15) },
    { name: 'Playfulness', value: getRandomInt(6, 20) },
    { name: 'Friendliness', value: getRandomInt(1, 25) },
  ],
});

const withId = obj => ({
  ...obj,
  id: crypto.randomUUID(),
});
const emptyArray = size => Array(size).fill(null);

const deck = emptyArray(deckSize).map(card).map(withId);
const half = Math.ceil(deck.length / 2);

const dealCards = () => ({
  player: deck.slice(0, half),
  opponent: deck.slice(half),
});

export default function App() {
  const [cards, setCards] = useState(dealCards);
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState('');

  function compareCards() {
    // Pick the first stat of both cards
    const playerStat = cards.player[0].stats[selected];
    const opponentStat = cards.opponent[0].stats[selected];
    // Create a variable to hold the result
    let result = '';
    // Compare the values of both stats and set the result
    if (playerStat.value === opponentStat.value) result = 'draw';
    else if (playerStat.value > opponentStat.value) result = 'win';
    else result = 'loss';
    // Finally, log the result
    console.log(result);
  }

  return (
    <>
      <h1>Korttipeli</h1>
      {selected}
      <div className="game">
        <div className="hand player">
          <h2>Player</h2>
          <ul className="card-list player">
            {cards.player.map((card, index) => (
              <li className="card-list-item player" key={card.id}>
                <Card
                  card={card}
                  index={index}
                  selected={selected}
                  handleSelect={setSelected}
                />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={compareCards} className="play-button" type="button">
          Play
        </button>
        <div className="hand opponent">
          <div className="card-list opponent">
            {cards.opponent.map((card, index) => (
              <li className="card-list-item opponent" key={card.id}>
                <Card card={card} index={index} />
              </li>
            ))}
          </div>
          <h2>Opponent</h2>
        </div>
      </div>
    </>
  );
}
