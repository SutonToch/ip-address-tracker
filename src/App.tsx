import {FormEvent, useState} from "react"
import Arrow from "./assets/icon-arrow.svg"
import Bg_pattern_desktop from "./assets/pattern-bg-desktop.png"
import Bg_pattern_mobile from "./assets/pattern-bg-mobile.png"
import Map from "./Map.tsx"
import './styles/App.css'

export default function App() {

  const [input, setInput] = useState("")
  const [ipAdressInfo, setIPAdressInfo] = useState({
    ipAdress: "198.35.26.96",
    location: "Financial District, US",
    timezone: "UTC -05:00",
    isp: "Wikimedia Foundation Inc.",
    latitude: 37.7912,
    longitude: -122.401,
  })
  const [responseSuccess, setResponseSuccess] = useState(true)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    getInfo()
  }

  async function getInfo() {    
    try {
      //Source: https://ihateregex.io/expr/ip/ and https://ihateregex.io/expr/ipv6/
      const regexIPv4 = "(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}"
      const regexIPv6 = "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"
      
      let response = undefined;
      if(input.match(regexIPv4) || input.match(regexIPv6)) {
        response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_yq8i8sCRQxB5Tunxa4tlyFx0zGZTf&ipAddress=${input}`)
      } else {
        response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_yq8i8sCRQxB5Tunxa4tlyFx0zGZTf&domain=${input}`)
      }

      const data = await response.json()
  
      setIPAdressInfo({
        ipAdress: data.ip,
        location: `${data.location.city}, ${data.location.country} ${data.location.postalCode}`,
        timezone: `UTC ${data.location.timezone}`,
        isp: data.isp,
        latitude: data.location.lat,
        longitude: data.location.lng,
      })
      setResponseSuccess(true)
    } catch(err) {
      //error handling
      setResponseSuccess(false)
    }
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
          {responseSuccess ?
            <>
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
            </> :
            <p>
              Something went wrong. The account might be out of credits, sry.
            </p>
          }
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