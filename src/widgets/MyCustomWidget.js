import React, { useEffect, useState } from "react";
import "../styles/styles.css";

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Fetch weather data based on user's input location
    if (location) {
      fetchWeatherDataByLocation(location)
        .then((data) => setWeatherData(data))
        .catch((error) => console.log(error));
    }
  }, [location]);

  const fetchWeatherDataByLocation = async (location) => {
    try {
      // Make an API call to fetch weather data using the input location
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16b23037ae9da4e6bed1a7bc8e09cc66`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch weather data");
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div style={{ minWidth: 300 }}>
      <h2>Weather Widget</h2>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location"
      />
      {weatherData && weatherData.name ? (
        <div>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°K</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Enter a location to fetch weather data</p>
      )}
    </div>
  );
}
