import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [weather, setWeather] = useState({})

  const [isCelsius, setIsCelsius] = useState(true)

  const [isFarenheit, setIsFarenheit] = useState(true)

  const changeUnits = () => {

    setIsFarenheit(!isCelsius)

    setIsCelsius(!isFarenheit)
  }



  useEffect(() => {

    function success(pos) {

      const crd = pos.coords;

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=2ee5a48d04f073af2c82d23c4af1665e&units=${isCelsius ? "metric" : "imperial"}`)
        .then((res) => setWeather(res.data))
    }

    const error = () => alert('Please allow the ubication to use the app')

    navigator.geolocation.getCurrentPosition(success, error)

  }, [isCelsius])

  const image = `http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`

  function firstLetterUpper(word) {

    return word.toLowerCase()
      .trim()
      .split(' ')
      .map(v => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  }

  const description = firstLetterUpper(`${weather.weather?.[0]?.description}`)

  return (
    <div className="App">
      
      <div className="card">
       
        {/* <h2>The Weather Machine</h2> */}
        
        <h3>{weather.sys?.country}, {weather.name}</h3>

        <div className='info'>

          <img src={image} className='icon'/>

          <ul>
            <h3 className='description'>{description}</h3>
            <li><i class="fi fi-rr-temperature-high"></i> {weather.main?.temp} {isCelsius ? "°C" : "Farenheit"}</li>
            <li><i class="fi fi-rr-wind"></i> {weather.wind?.speed} {isCelsius ? "m/s" : "mph"}</li>
            <li><i class="fi fi-rr-clouds"></i> {weather.clouds?.all}%</li>
          </ul>
        </div>

        <div className='button'>
          <button onClick={changeUnits}>Change units to {isCelsius ? "imperial" : "metric"}</button>
        </div>
        
      </div>
    </div>
  )
}

export default App
