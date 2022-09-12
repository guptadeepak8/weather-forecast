import React, { useState, useEffect } from "react";
import "./index.css";
const appId='8ccb5b57e5959a1c0ec407951ceb3313'
function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState({
    name: "",
    country: "",
    updatedtemperature: "",
    updatedIcon: "",
    type:''
  });
 

  const fetchData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      const imageURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData({
        name: data.name,
        country: data.sys.country,
        updatedtemperature: data.main.temp,
        updatedIcon: imageURL,
        type:data.weather[0].main
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [cityName]);

  const capitalize =cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()
  return (
    <div className="app">
      <div className="wrapper">
      <h1 className="header">WEATHER APP</h1>
      <div className="input">
        <input placeholder='CITY NAME 'type="text" onChange={(e) => setCityName(e.target.value)} />
      </div>
      <div className="data">
        {(capitalize === weatherData.name ) ? (
          <>
            <h2>
               {weatherData.name.toUpperCase()},{weatherData.country} |   {weatherData.updatedtemperature}°C
            </h2>
            <div className="desc">
              <img src={weatherData.updatedIcon} alt="" />
              <h2>{weatherData.type}</h2>
            </div>

          </>
        ) : (
          <div className="error">
             <h3>No Data Found</h3>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
