import { useState } from 'react';
import './App.css';
import { dealCards } from './cards';
import Button from './components/Button';
import Card from './components/Card';

const Result = Object.freeze({
  WIN: 'win',
  DRAW: 'draw',
  LOSS: 'loss',
});
export default function App() {
  const [cards, setCards] = useState(dealCards);
  const [result, setResult] = useState(null);
  const [selectedStat, setSelected] = useState(0);

  const end = !cards.opponent.length || !cards.player.length;

  function compare() {
    const playerStat = cards.player[0].stats[selectedStat];
    const opponentStat = cards.opponent[0].stats[selectedStat];

    setResult(() => {
      if (playerStat.value === opponentStat.value) return Result.DRAW;
      if (playerStat.value > opponentStat.value) return Result.WIN;
      return Result.LOSS;
    });
  }

  function nextRound() {
    setCards(cards => {
      const playedCards = [{ ...cards.player[0] }, { ...cards.opponent[0] }];
      const player = cards.player.slice(1);
      const opponent = cards.opponent.slice(1);
      if (result === Result.DRAW) {
        return {
          player,
          opponent,
        };
      }
      if (result === Result.WIN) {
        return {
          player: [...player, ...playedCards],
          opponent,
        };
      }
      if (result === Result.LOSS) {
        return {
          player,
          opponent: [...opponent, ...playedCards],
        };
      }
      // If the result does not match previous cases
      return cards;
    });

    setResult(null);
  }

  function restartGame() {
    setCards(dealCards);
    setResult(null);
  }

  function endResult() {
    if (!cards.opponent.length && !cards.player.length) return 'Draw!';
    if (!cards.opponent.length) return 'Player win!';
    return 'Player loss!';
  }

  return (
    <>
      <h1>Card game</h1>
      <div className="game">
        {end && (
          <div className="overlay">
            <h2>Game over!</h2>
            <h3>{endResult()}</h3>
            <Button text="Restart" handleClick={restartGame} />
          </div>
        )}
        <div className="hand player">
          <h2>Player</h2>
          <ul className="card-list player">
            {cards.player.map((card, index) => (
              <li className="card-list-item player" key={card.id}>
                <Card
                  card={index === 0 ? card : null}
                  handleSelect={statIndex => !result && setSelected(statIndex)}
                  selected={selectedStat}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="center-area">
          <p>{result || 'press the button'}</p>
          {result ? (
            <Button text={'Next'} handleClick={nextRound} />
          ) : (
            <Button text={'Play'} handleClick={compare} />
          )}
        </div>
        <div className="hand opponent">
          <h2>Opponent</h2>
          <ul className="card-list opponent">
            {cards.opponent.map((card, index) => (
              <li className="card-list-item opponent" key={card.id}>
                <Card
                  card={result && index === 0 ? card : null}
                  selected={selectedStat}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
