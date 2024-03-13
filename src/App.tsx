import {FormEvent, useState} from "react"
import Arrow from "./assets/icon-arrow.svg"
import Bg_pattern_desktop from "./assets/pattern-bg-desktop.png"
import Bg_pattern_mobile from "./assets/pattern-bg-mobile.png"
import Map from "./Map.tsx"
import './styles/App.css'

export default function App() {

  const [input, setInput] = useState("")
  const [ipAdressInfo, setIPAdressInfo] = useState({
    ipAdress: "192.212.174.101",
    location: "Brooklyn, NY 10001",
    timezone: "UTC -05:00",
    isp: "SpaceX Starlink",
    latitude: 51.505,
    longitude: -0.09,
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    getIPInfo()
  }

  async function getIPInfo() {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_yq8i8sCRQxB5Tunxa4tlyFx0zGZTf&ipAddress=${input}`)
    const data = await response.json()

    setIPAdressInfo({
      ipAdress: data.ip,
      location: `${data.location.city}, ${data.location.country} ${data.location.postalCode}`,
      timezone: data.location.timezone,
      isp: data.isp,
      latitude: data.location.lat,
      longitude: data.location.lng,
    })
  }

  return (
    <>
      <main>
        <h1>IP Address Tracker</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text" 
            placeholder="Search for any IP address or domain" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <input 
            type="image" 
            src={Arrow} 
            alt="submit" 
          />
        </form>
        <div className="response-container">
          <div className="response-item-wrapper">
            <h2>IP ADDRESS</h2>
            <p>{ipAdressInfo.ipAdress}</p>
          </div>
          <div className="divider" />
          <div className="response-item-wrapper">
            <h2>LOCATION</h2>
            <p>{ipAdressInfo.location}</p>
          </div>
          <div className="divider" />
          <div className="response-item-wrapper">
            <h2>TIMEZONE</h2>
            <p>{ipAdressInfo.timezone}</p>
          </div>
          <div className="divider" />
          <div className="response-item-wrapper">
            <h2>ISP</h2>
            <p>{ipAdressInfo.isp}</p>
          </div>
        </div>
      </main>
      <div className="bg">
        <picture>
          <source media="(min-width: 500px)" srcSet={Bg_pattern_desktop}/>
          <img src={Bg_pattern_mobile} alt=""/>
        </picture>
        <Map 
          latitude={ipAdressInfo.latitude}
          longitude={ipAdressInfo.longitude}
        />
      </div>
    </>
  )
}