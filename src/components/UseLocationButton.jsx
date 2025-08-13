export default function UseLocationButton({ onLocate }) {
  return (
    <button
      type="button"
      onClick={onLocate}
      className="btn-secondary"
      title="Use my location"
    >
      Use my location
    </button>
  );
}
