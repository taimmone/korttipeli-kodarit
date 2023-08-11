import Card from './Card';

export default function CardList({ cards, player = false }) {
  return (
    <ul className={`card-list${player ? ' player' : ' opponent'}`}>
      {cards.map((card, index) => (
        <li
          className={`card-list-item${player ? ' player' : ' opponent'}`}
          key={card.id}
        >
          <Card card={index === 0 ? card : null} />
        </li>
      ))}
    </ul>
  );
}
