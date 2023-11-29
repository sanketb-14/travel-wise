import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Loader,Button} from './index'
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

  const formatDate =(date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));


export default function SingleCity() {
  const {isLoading, selectCity, getCity } = useCities();
  const {cityName , country , emoji , date, notes} = selectCity
  const { id } = useParams();
  useEffect(() => {
    getCity(id);
  }, [id]);
  const navigate =useNavigate()
  



  if(isLoading) return (<Loader/>)
  return (
    <div className="card bg-base-200 p-2 w-full   flex flex-col justify-center items-start border-b-4 shadow-xl border-secondary py-8">
      <p className="text-sm ">City Name</p>
      <p className=" m-2 font-semibold border-l-4 px-2 border-secondary w-full">
        <span className="bg-secondary rounded-m px-1 mr-4">{emoji}</span>
        {cityName} ({country})
      </p>
      <p className="">
        You went{" "}
        <span className="text-secondary font-semibold">{cityName}</span> on
        date: <br />{" "}
        <span className="text-secondary font-semibold border-l-4 px-2 border-secondary m-2 w-full">
          {formatDate(date || null)}
        </span>
      </p>
      {notes && (
        <div className="mt-2">
          <p>Your Notes</p>
          <p className="text-secondary font-semibold border-l-4 px-2 border-secondary m-2 w-ful">
            {notes}
          </p>
        </div>
      )}
      <p>
        want know more about this place:
        <br />
        visit:{" "}
        <span>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-secondary"
          >
            learn More
          </a>
        </span>
      </p>
      <Button
        type={"primary"}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}
