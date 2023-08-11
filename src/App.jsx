import { useState } from 'react';
import './App.css';
import { dealCards } from './cards';
import Button from './components/Button';
import CardList from './components/CardList';

const Result = Object.freeze({
  WIN: 'win',
  DRAW: 'draw',
  LOSS: 'loss',
});

// const GameState = Object.freeze({
//   NEW_GAME: 'new game',
//   READY: 'ready',
//   RESULT: 'result',
//   GAME_OVER: 'game over',
// });

export default function App() {
  const [cards, setCards] = useState(dealCards);
  const [result, setResult] = useState(null);
  // const [gameState, setGameState] = useState(GameState.NEW_GAME);

  const end = !cards.opponent.length || !cards.player.length;

  function compare() {
    // Pick the first stat of both cards
    const playerStat = cards.player[0].stats[0];
    const opponentStat = cards.opponent[0].stats[0];

    setResult(() => {
      if (playerStat.value === opponentStat.value) return Result.DRAW;
      if (playerStat.value > opponentStat.value) return Result.WIN;
      return Result.LOSS;
    });
    // setGameState(GameState.RESULT);
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
    // setGameState(GameState.READY);
  }

  function restartGame() {
    setCards(dealCards);
    setResult(null);
    // setGameState(GameState.READY);
  }

  function endResult() {
    if (!cards.opponent.length && !cards.player.length) return 'Draw!';
    if (!cards.opponent.length) return 'Player win!';
    return 'Player loss!';
  }

  // if (gameState === GameState.NEW_GAME)
  //   return (
  //     <div className="overlay">
  //       <h2>Start game</h2>
  //       <Button
  //         text="Start"
  //         handleClick={() => setGameState(GameState.READY)}
  //       />
  //     </div>
  //   );
  // if (end)
  //   return (
  //     <div className="overlay">
  //       <h2>Game over!</h2>
  //       <h3>{endResult()}</h3>
  //       <Button text="Restart" handleClick={restartGame} />
  //     </div>
  //   );

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
          <CardList cards={cards.player} player />
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
          <CardList cards={cards.opponent} />
        </div>
      </div>
    </>
  );
}
