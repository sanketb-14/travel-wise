import { Button, Loader, Message } from "./index";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import BackButton from "./BackButton";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const {createCity} = useCities()

  const navigate = useNavigate();

  useEffect(() => {
     if (!lat && !lng) return;
    async function fetchData() {

      try {
        setIsGeoLoading(true);
        setGeoCodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "seems like it isn't country , Click somewhere else..."
          )
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName );
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsGeoLoading(false);
      }
    }
    fetchData();
  }, [lat, lng]);

 async function handleSubmit(e){
    e.preventDefault();
    
    if(!cityName || !date) return

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position:{lat,lng}
    }
     await createCity(newCity)
     navigate("/app/cities")
    
  }
 
  
  if (isGeoLoading) return <Loader />;
  if (!lat && !lng) return <Message message="Try clicking some place on map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className="card bg-base-200 p-2 pl-4 m-2 flex justify-center items-start border-l-4 border-secondary w-full  "
      onSubmit={handleSubmit}
    >
      <div className="m-2 border-b-2 border-primary w-full text-primary">
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          className="input input-bordered input-sm w-5/6 my-2 "
        />
        <span>{emoji}</span>
      </div>

      <div className="m-2 border-b-2 border-primary w-full text-primary">
        <label htmlFor="date">When did you go to {cityName}?</label>
        
        <DatePicker
          id="date"
          className="text-neutral input input-bordered input-sm w-5/6 my-2 "
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="-2 border-b-2 border-primary w-full text-primary">
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          className="input input-bordered input-lg w-5/6 my-2 "
        />
      </div>

      <div className="m-2 flex justify-between items-center w-5/6">
        <Button type={"secondary"}>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
