import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface props {
    lat:number,
    lng:number
}

export default function RecenterMap({lat, lng}:props) {
    const map = useMap();
    
    useEffect(() => {
       map.setView([lat, lng]);
    }, [lat, lng]);
    
    return null;
}