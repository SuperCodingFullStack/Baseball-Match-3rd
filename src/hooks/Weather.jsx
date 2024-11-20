// import { useState, useEffect } from "react";

// const Weather = () => {
//   const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         // q=위치
//         // appid=API KEY
//         // units=metric : 온도를 섭씨로 반환
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=Busan,kr&appid=${API_KEY}&units=metric`
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setWeather(data);
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("날씨 정보를 가져오는 데 실패했습니다.");
//       }
//     };

//     fetchWeather();
//   }, [API_KEY]);

//   if (error) return <p>{error}</p>;
//   if (!weather) return <p>Loading...</p>;

//   return (
//     <div>
//       <span>{weather.main.temp}°C</span>
//       <span>{weather.weather[0].description}</span>
//     </div>
//   );
// };

// export default Weather;
