import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayRain,
  WiDayStormShowers,
  WiSnowflakeCold,
  WiWindy,
  WiNa,
} from "react-icons/wi";

const iconMap = {
  "01d": WiDaySunny,
  "01n": WiDaySunny,
  "02d": WiDayCloudy,
  "02n": WiDayCloudy,
  "03d": WiCloud,
  "03n": WiCloud,
  "04d": WiCloudy,
  "04n": WiCloudy,
  "09d": WiShowers,
  "09n": WiShowers,
  "10d": WiDayRain,
  "10n": WiDayRain,
  "11d": WiDayStormShowers,
  "11n": WiDayStormShowers,
  "13d": WiSnowflakeCold,
  "13n": WiSnowflakeCold,
  "50d": WiWindy,
  "50n": WiWindy,
};

const WeatherSVG = ({ icon, size = "1.7rem" }) => {
  const IconComponent = iconMap[icon] || WiNa;
  return <IconComponent style={{ fontSize: size }} />;
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
      <p>{roundedTemp}°C</p>
    </WeatherDescription>
  );
};

const WeatherDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.1rem;
    line-height: 1.2;
  }
`;

export default Weather;
