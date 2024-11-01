import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";

const API_KEY = "1ba39a4a999e66112c505dbdc104e9fb";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
        },
        (err) => {
          setError(
            "Unable to retrieve your location. Please search for a city."
          );
          console.error(err);
        }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Please search for a city."
      );
    }
  };

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherIcon: data.weather[0].icon,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    }
  };

  const handleSearch = async () => {
    if (city.trim() !== "") {
      fetchWeatherData(`q=${city.trim()}`);
    }
  };

  return (
    <div className=" w-full max-w-2xl p-10  bg-white bg-opacity-10 backdrop-blur-lg flex flex-col mb-9 items-center justify-center rounded-xl mt-20 shadow-xl border border-white mx-auto ">
      <h1 className="text-4xl font-bold flex justify-center items-end mb-2 font-serif text-white">
        Weather now.
      </h1>
      {weather && (
        <h2 className="text-2xl font-semibold text-white mb-6">
          {weather.city}
        </h2>
      )}
      <div className="w-full  mb-8 flex items-center bg-white h-10 rounded-lg px-3 shadow-md">
        <img src={searchIcon} alt="search icon" className="w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search city..."
          className="outline-none w-full h-full bg-transparent text-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="w-full flex flex-wrap justify-between items-center space-x-4 sm:space-x-0 sm:space-y-4">
          <div className="flex flex-col items-center text-center sm:items-start">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
              alt="weather icon"
              className="w-16 h-16 mb-2"
            />
            <p className="text-4xl font-bold text-gray-800">
              {weather.temperature}°C
            </p>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start">
            <img
              src={humidityIcon}
              alt="humidity icon"
              className="w-10 h-10 mb-2"
            />
            <p className="text-2xl font-semibold text-gray-800">
              {weather.humidity}%
            </p>
            <p className="text-md text-gray-600">Humidity</p>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start">
            <img src={windIcon} alt="wind icon" className="w-10 h-10 mb-2" />
            <p className="text-2xl font-semibold text-gray-800">
              {weather.windSpeed} km/h
            </p>
            <p className="text-md text-gray-600">Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
