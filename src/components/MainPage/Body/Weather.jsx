import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { stadiumCityMap } from "../../../constants";

const iconMap = {
  "01d": "public/assets/weather/sun.png",
  "01n": "public/assets/weather/sun.png",
  "02d": "public/assets/weather/partlyCloudy.png",
  "02n": "public/assets/weather/partlyCloudy.png",
  "03d": "public/assets/weather/clouds.png",
  "03n": "public/assets/weather/clouds.png",
  "04d": "public/assets/weather/clouds.png",
  "04n": "public/assets/weather/clouds.png",
  "09d": "public/assets/weather/heavyRain.png",
  "09n": "public/assets/weather/heavyRain.png",
  "10d": "public/assets/weather/wet.png",
  "10n": "public/assets/weather/wet.png",
  "11d": "public/assets/weather/rainCloud.png",
  "11n": "public/assets/weather/rainCloud.png",
  "13d": "public/assets/weather/snow.png",
  "13n": "public/assets/weather/snow.png",
  "50d": "public/assets/weather/wind.png",
  "50n": "public/assets/weather/wind.png",
};

const WeatherSVG = ({ icon, size = "1.7rem" }) => {
  const iconUrl = iconMap[icon];
  if (!iconUrl) return null;
  return typeof iconUrl === "string" ? (
    <img
      src={iconUrl}
      alt="weather-icon"
      style={{ width: size, height: size }}
    />
  ) : (
    <iconUrl style={{ fontSize: size }} />
  );
};

WeatherSVG.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
};

const Weather = ({ city }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // appid=API KEY
        // units=metric : 온도를 섭씨로 반환

        const { lat, lon } = city;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
        setError("날씨 정보를 가져오는 데 실패했습니다.");
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city, API_KEY]);

  if (!city) return <p>날씨 정보 없음</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>Loading...</p>;

  // 온도 정수로 반올림
  const roundedTemp = Math.round(weather.main.temp);
  // 아이콘 생성
  const weatherIcon = weather.weather[0].icon;

  return (
    <WeatherDescription>
      <WeatherSVG icon={weatherIcon} />
      <p>{roundedTemp}°C</p>
    </WeatherDescription>
  );
};

Weather.propTypes = {
  city: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
};

const WeatherDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  top: 20px;
  right: 20px;
  gap: 0.3rem;

  p {
    font-size: 1.1rem;
    line-height: 1.2;
  }
`;

export default Weather;
