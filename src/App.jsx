import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import PlayButton from './components/PlayButton';
import { dealCards } from './cards';

const Result = Object.freeze({
  WIN: 'win',
  DRAW: 'draw',
  LOSS: 'loss',
});

const GameState = Object.freeze({
  READY: 'ready',
  RESULT: 'result',
});

export default function App() {
  const [cards, setCards] = useState(dealCards);
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState(GameState.READY);

  function compare() {
    // Pick the first stat of both cards
    const playerStat = cards.player[0].stats[0];
    const opponentStat = cards.opponent[0].stats[0];

    setResult(() => {
      if (playerStat.value === opponentStat.value) return Result.DRAW;
      if (playerStat.value > opponentStat.value) return Result.WIN;
      return Result.LOSS;
    });
    setGameState(GameState.RESULT);
  }

  function nextRound() {
    setCards(cards => {
      if (result === Result.DRAW) {
        // Remove the first card of both players
        return {
          player: cards.player.slice(1),
          opponent: cards.opponent.slice(1),
        };
      }
      if (result === Result.WIN) {
        // Give player the opponent's card
        return {
          player: [...cards.player, { ...cards.opponent[0] }],
          opponent: cards.opponent.slice(1),
        };
      }
      if (result === Result.LOSS) {
        // Give opponent the player's card
        return {
          player: cards.player.slice(1),
          opponent: [...cards.opponent, { ...cards.player[0] }],
        };
      }
      // If the result does not match previous cases
      return cards;
    });

    setResult(null);
    setGameState(GameState.READY);
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
          {gameState === GameState.READY ? (
            <PlayButton text={'Play'} handleClick={compare} />
          ) : (
            <PlayButton text={'Next'} handleClick={nextRound} />
          )}
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
