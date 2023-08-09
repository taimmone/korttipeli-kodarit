export default function Card({ card, index, selected, handleSelect }) {
  return (
    <div className={`Card${index !== 0 ? ' empty' : ''}`}>
      <img src={card.image} draggable="false" />
      <ul className="stat-list">
        {card.stats.map((stat, index) => (
          <li
            onClick={() => handleSelect(index)}
            className={`stat-list-item ${
              selected === index ? ' selected' : ''
            }`}
            key={index}
          >
            <span>{stat.name}</span>
            <span>{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
