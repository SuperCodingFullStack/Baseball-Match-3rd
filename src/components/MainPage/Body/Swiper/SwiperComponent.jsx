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
import dayjs from "dayjs";

export default function SwiperComponent() {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGameData = async (currentMonth) => {
    if (currentMonth < 1 || currentMonth > 12) {
      console.error("잘못된 월 값:", currentMonth);
      return false;
    }

    try {
      const url = `http://localhost:8080/api/gameInfo/${String(
        currentMonth
      ).padStart(2, "0")}`;
      console.log("Request URL:", url);

      const response = await axios.get(url);
      console.log("Full Response:", response);

      if (response.status === 200) {
        console.log("API 응답 데이터:", response.data);

        if (
          response.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const sortedGames = response.data.data.sort((a, b) =>
            dayjs(b.matchDate, "MM.DD").diff(dayjs(a.matchDate, "MM.DD"))
          );
          const limitedData = sortedGames.slice(0, 5);
          setGameData(limitedData);
          return true;
        } else {
          console.log(
            `데이터가 없습니다. 이전달 (${currentMonth - 1}월)로 이동합니다.`
          );
          const result = await fetchGameData(currentMonth - 1);
          return result;
        }
      } else {
        if (response.status === 400) {
          console.log(
            "Bad Request (400) - 데이터가 없습니다. 이전달로 이동합니다."
          );
          const result = await fetchGameData(currentMonth - 1);
          return result;
        }
        console.error(`API 요청 실패: 상태코드 ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error("Error fetching game data:", error);

      if (error.response) {
        console.error("Response Error Data:", error.response.data);
        console.error("Response Error Status:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }
      const result = await fetchGameData(currentMonth - 1);
      return result;
    }
  };

  useEffect(() => {
    const currentMonth = parseInt(dayjs().format("MM"), 10);
    console.log(currentMonth);
    let isMounted = true;

    const fetchData = async () => {
      const result = await fetchGameData(currentMonth);
      if (isMounted && result !== false) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Swiper
        slidesPerView={1}
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mainSwiper"
      >
        {gameData.map((game, index) => (
          <SwiperSlide key={index}>
            <SlideContent game={game} date={game.matchDate} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 90px;
`;
