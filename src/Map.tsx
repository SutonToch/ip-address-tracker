import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RecenterMap from "./RecenterMap.tsx";
import L from "leaflet";
import IconSVG from './assets/icon-location.svg'

interface MapProps {
  latitude:number,
  longitude:number
}

export default function Map(props:MapProps) {

    const myIcon = L.icon({
      iconUrl: IconSVG,
      iconSize: [48,56],
      iconAnchor: [32, 64],
    })
  
    return (
        <MapContainer center={[props.latitude, props.longitude]} zoom={13}  zoomControl={false} style={{height: "67%", width: "100vw", marginTop: "-4px"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.latitude, props.longitude]} icon={myIcon}></Marker>
          <RecenterMap 
            lat={props.latitude}
            lng={props.longitude}
          />
        </MapContainer>
    )
}