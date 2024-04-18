import React, { useState } from "react";
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import { WHEATER_API_KEY, WHEATHER_API_URL } from './api';
import Forecast from './components/Forecast/Forecast';

//1
function App() {
  //4,5
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  //3
  const handleOnSearchChange = (searchData) => {
    //console.log(searchData);

    //4
    const [lat, lon] = searchData.value.split(" ");

    //4 fetch bolo získane cez openweather --data
    const currentWeatherFetch = fetch(
      `${WHEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WHEATER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WHEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WHEATER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };



  //2,(6 - je currentWeather) teraz možem volať data currentweather čo predstavuje získane data z danej krajiny
  //ktoru zadam a v currentweather.js možem vypisovať dané veci
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

































