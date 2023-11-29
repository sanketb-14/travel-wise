import { useCities } from "../contexts/CitiesContext";
import { Loader, Message, Country } from "./index";
export default function CountryItem() {
  const {cities,isLoading} = useCities()
  const uniCountry = [...new Set(cities.map(country => country.country))]
  console.log(uniCountry);

  if (isLoading) return <Loader />;
  if (!cities.length)
    return <Message message={"Please Add city in Your List"} />;
  return (
    <ul>
      {uniCountry.map((city,index) => (
        <Country country={city} key={index} />
      ))}
    </ul>
  );
}
