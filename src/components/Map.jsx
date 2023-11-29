import {  useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLocation } from "../hooks/useLocation";
export default function Map() {
  const { cities } = useCities();
  const {mapLat,mapLng} = useLocation()
  
  const {isLoading:loadingPosition,position:geoPosition , getPosition} = useGeolocation()
  const [mapPosition, setMapPosition] = useState([40,0]);


  

  useEffect(()=>{
   if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])

  useEffect(()=>{
    if(geoPosition){
      setMapPosition([geoPosition.lat,geoPosition.lng])

    }
  },[geoPosition])

  return (
    <div className="hero w-2/3 flex flex-col ">
      {!geoPosition && (
        <button
          className="btn btn-primary btn-sm m-1 absolute top-20 z-10 "
          onClick={() => getPosition()}
        >
          {`${loadingPosition ? "loading..." : "use you location"}`}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className="hero w-full h-screen z-0 "
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
            className="w-full bg-base-200"
          >
            <Popup className="w-40 m-4 bg-base-200 rounded-l border-b-2 border-secondary font-semibold text-secondary">
              {city.emoji} <br /> {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null
}

const DetectClick=()=>{
    const navigate = useNavigate();
    useMapEvent({
      click:(e)=>{
      
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      }
    })

}

