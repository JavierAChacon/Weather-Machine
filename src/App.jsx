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
  


  return (
    <div className="App">
     <div className="card">
      <h2>The Weather Machine</h2>
      <h3>{weather.sys?.country}, {weather.name}</h3>
      <div className='info'>
        <img src={image} className='icon' />
        <ul>
          <li>{weather.weather?.[0]?.description}</li>
          <li>Temperature: {weather.main?.temp}</li>
          <li>Wind Speed: {weather.wind?.speed}</li>
          <li>Clouds:{weather.clouds?.all}%</li>
          <li>Pressure:{weather.main?.pressure} </li>
        </ul>
      </div>
      <button onClick={changeUnits}>Change units to {isCelsius ? "imperial" : "metric"}</button>
     </div>
    </div>
  )
}

export default App
