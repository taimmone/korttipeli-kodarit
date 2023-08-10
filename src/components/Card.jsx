export default function Card({ card }) {
  if (!card) return <div className="Card back" />;
  return (
    <div className="Card">
      <img src={card.image} draggable="false" />
      <ul className="stat-list">
        {card.stats.map((stat, index) => (
          <li className="stat-list-item" key={index}>
            <span>{stat.name}</span>
            <span>{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
