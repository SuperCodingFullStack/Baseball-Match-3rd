import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  const weekDays = Array(7)
    .fill(0)
    .map((_, index) => currentWeek.add(index, "day"));

  return (
    <CalendarContainer>
      <Header>
        <button onClick={handlePrevWeek}>{"<"}</button>
        <span>
          {currentWeek.format("MM월 DD일")} -{" "}
          {currentWeek.add(6, "day").format("MM월 DD일")}
        </span>
        <button onClick={handleNextWeek}>{">"}</button>
      </Header>
      <Days>
        {weekDays.map((day) => (
          <Day key={day.format("YYYY-MM-DD")}>
            <div>{day.format("ddd")}</div>
            <div>{day.format("D")}</div>
          </Day>
        ))}
      </Days>
      <Content>
        <h3>날짜별 내용</h3>
        <p></p>
      </Content>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  button {
    background: #ddd;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background: #bbb;
    }
  }
  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const Days = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  div:first-child {
    font-weight: bold;
  }
`;

const Content = styled.div`
  margin-top: 1rem;
  text-align: left;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
  }
`;

export default WeeklyCalendar;
