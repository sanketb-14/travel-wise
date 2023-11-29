import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City({ city }) {
  const { selectCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className="rounded-l flex justify-between shadow-lg my-4 p-2 w-96 border-l-4 border-0 border-secondary outline-0"
      >
        <span>{emoji}</span>
        <div>
          <h3 className="font-bold">{cityName}</h3>
          <p className="text-xs">{formatDate(date)}</p>
        </div>
        <button onClick={handleClick} className="btn btn-sm">
          &times;
        </button>
      </Link>
    </li>
  );
}
