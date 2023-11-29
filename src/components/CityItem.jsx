import { useCities } from '../contexts/CitiesContext';
import {Loader,Message,City} from './index'
export default function CityItem() {
  const {cities,isLoading} = useCities()
   
  
  if(isLoading) return <Loader/>
  if(!cities.length) return <Message message={"Please Add city in Your List"}/>
  return <ul>
    {cities.map((city) => <City city={city} key={city.id}/>)}

  </ul>;
}
