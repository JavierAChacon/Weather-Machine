import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  useEffect(() => {
    
    function success(pos) {
      const crd = pos.coords;

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=2ee5a48d04f073af2c82d23c4af1665e`)
      .then((res) => console.log(res.data))
    }
    
    const error = () => 'Please allow the ubication to use the app'
    
    navigator.geolocation.getCurrentPosition(success, error)

  }, [])


  return (
    <div className="App">
     <h1>Pollito frito</h1>
    </div>
  )
}

export default App
