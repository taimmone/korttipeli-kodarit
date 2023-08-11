export default function Card({ card, selected, handleSelect }) {
  if (!card) return <div className="Card back" />;
  return (
    <div className="Card">
      <img src={card.image} draggable="false" />
      <ul className="stat-list">
        {card.stats.map((stat, index) => (
          <li
            className={`stat-list-item${selected === index ? ' selected' : ''}`}
            onClick={() => handleSelect && handleSelect(index)}
            key={index}
          >
            <span>{stat.name}</span>
            <span>
              {stat.value}/<strong>{stat.max}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
