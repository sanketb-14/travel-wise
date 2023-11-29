export default function Button({ children, type, onClick }) {
  return (
    <button className={`btn btn-sm btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
