export default function Button({ handleClick, text }) {
  return (
    <button onClick={handleClick} className="play-button" type="button">
      {text}
    </button>
  );
}
