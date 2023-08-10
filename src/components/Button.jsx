export default function Button({ status, compare, next }) {
  if (status === 'play')
    return (
      <button onClick={compare} className="play-button" type="button">
        Play
      </button>
    );
  return (
    <button onClick={next} className="play-button" type="button">
      Next
    </button>
  );
}
