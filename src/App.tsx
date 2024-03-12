import {FormEvent, useState} from "react"
import Arrow from "./assets/icon-arrow.svg"
import Bg_pattern_desktop from "./assets/pattern-bg-desktop.png"
import Bg_pattern_mobile from "./assets/pattern-bg-mobile.png"
import './styles/App.css'

export default function App() {

  const [input, setInput] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e)
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
          <div>
            <h2>IP ADDRESS</h2>
            <p>192.212.174.101</p>
          </div>
          <div>
            <h2>LOCATION</h2>
            <p>Brooklyn, NY 10001</p>
          </div>
          <div>
            <h2>TIMEZONE</h2>
            <p>UTC -05:00</p>
          </div>
          <div>
            <h2>ISP</h2>
            <p>SpaceX Starlink</p>
          </div>
        </div>
      </main>
      <div className="bg">
        <picture>
          <source media="(min-width: 500px)" srcSet={Bg_pattern_desktop}/>
          <img src={Bg_pattern_mobile} alt=""/>
        </picture>
        {/* map */}
      </div>
    </>
  )
}