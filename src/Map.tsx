import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude:number,
  longitude:number
}

export default function Map(props:MapProps) {
  
    return (
        <MapContainer center={[props.latitude, props.longitude]} zoom={13}  zoomControl={false} style={{height: "67%", width: "100vw", marginTop: "-4px"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        </MapContainer>
    )
}