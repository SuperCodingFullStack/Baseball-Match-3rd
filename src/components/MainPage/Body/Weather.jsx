import { useState, useEffect } from "react";
import styled from "styled-components";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiShowers } from "react-icons/wi";
import { WiDayRain } from "react-icons/wi";
import { WiDayStormShowers } from "react-icons/wi";
import { WiSnowflakeCold } from "react-icons/wi";
import { WiWindy } from "react-icons/wi";
import { WiNa } from "react-icons/wi";
import PropTypes from "prop-types";

const WeatherSVG = ({ icon, size = "2rem" }) => {
  switch (icon) {
    case "01d":
    case "01n":
      return <WiDaySunny style={{ fontSize: size }} />;
    case "02d":
    case "02n":
      return <WiDayCloudy style={{ fontSize: size }} />;
    case "03d":
    case "03n":
      return <WiCloud style={{ fontSize: size }} />;
    case "04d":
    case "04n":
      return <WiCloudy style={{ fontSize: size }} />;
    case "09d":
    case "09n":
      return <WiShowers style={{ fontSize: size }} />;
    case "10d":
    case "10n":
      return <WiDayRain style={{ fontSize: size }} />;
    case "11d":
    case "11n":
      return <WiDayStormShowers style={{ fontSize: size }} />;
    case "13d":
    case "13n":
      return <WiSnowflakeCold style={{ fontSize: size }} />;
    case "50d":
    case "50n":
      return <WiWindy style={{ fontSize: size }} />;
    default:
      return <WiNa style={{ fontSize: size }} />;
  }
};

WeatherSVG.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
};

const Weather = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // q=위치
        // appid=API KEY
        // units=metric : 온도를 섭씨로 반환
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Busan,kr&appid=${API_KEY}&units=metric`
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

    fetchWeather();
  }, [API_KEY]);

  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>Loading...</p>;

  // 온도 정수로 반올림
  const roundedTemp = Math.round(weather.main.temp);
  // 아이콘 생성
  const weatherIcon = weather.weather[0].icon;

  return (
    <WeatherDescription>
      <WeatherSVG icon={weatherIcon} />
      <span>{roundedTemp}°C</span>
    </WeatherDescription>
  );
};

const WeatherDescription = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

export default Weather;
