import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import SlideContent from "./SlideContent";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function SwiperComponent() {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/gameInfo/10"
        );
        console.log("API 응답 데이터:", response.data);

        const limitedData = response.data.data.slice(0, 5);
        setGameData(limitedData);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, []);

  // 날짜별로 데이터를 그룹화
  const groupedGames = Array.isArray(gameData)
    ? gameData.reduce((acc, game) => {
        if (!acc[game.matchDate]) {
          acc[game.matchDate] = [];
        }
        acc[game.matchDate].push(game);
        return acc;
      }, {})
    : {};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mainSwiper"
      >
        {Object.entries(groupedGames).map(([date, games]) => (
          <SwiperSlide key={date}>
            <SlideContent date={date} games={games} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 90px;
`;
