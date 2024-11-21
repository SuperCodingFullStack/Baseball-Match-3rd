import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";
import { LOTTE, NC } from "../../../constants";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import Weather from "./Weather";

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  const handleToday = () => {
    setCurrentWeek(dayjs().startOf("week"));
  };

  const weekDays = Array(7)
    .fill(0)
    .map((_, index) => currentWeek.add(index, "day"));

  const today = dayjs().startOf("day");

  return (
    <CalendarContainer>
      <TodayButton onClick={handleToday}>Today</TodayButton>
      <Header>
        <button onClick={handlePrevWeek}>
          <BsArrowLeftCircle />
        </button>
        <span>
          {currentWeek.format("MM월 DD일")} -{" "}
          {currentWeek.add(6, "day").format("MM월 DD일")}
        </span>
        <button onClick={handleNextWeek}>
          <BsArrowRightCircle />
        </button>
      </Header>
      <Days>
        {weekDays.map((day) => (
          <Day
            key={day.format("YYYY-MM-DD")}
            className={day.isSame(today, "day") ? "today" : ""}
            isSaturday={day.day() === 6}
            isSunday={day.day() === 0}
          >
            <div>{day.format("ddd")}</div>
            <div>{day.format("D")}</div>
          </Day>
        ))}
      </Days>
      <Content>
        <Game>
          <img src={LOTTE} />
          <p>롯데</p>
          <div>
            <span>VS</span>
          </div>
          <img src={NC} />
          <p>NC</p>
        </Game>
        <GameInfo>
          <p className="stadium">사직 야구장</p>
          <Weather />
        </GameInfo>
      </Content>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 3rem;
  text-align: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  button {
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    &:hover {
      border: none;
      // background: #bbb;
    }
  }
  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const TodayButton = styled.button`
  display: flex;
  justify-self: end;
  background: #f4f4f4;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background: #eaeaea;
    border: none;
  }
`;

const Days = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Day = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  width: 60px;
  height: 80px;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    background-color: #f5f5f5;
  }

  div {
    font-weight: bold;
    color: ${(props) =>
      props.isSaturday ? "blue" : props.isSunday ? "red" : "inherit"};
  }

  &.today {
    background: #acfe49;
    color: black;
    border-radius: 8px;
    padding: 0.1rem;
  }
`;

const Content = styled.ul`
  margin-top: 3rem;
  text-align: center;
`;

const Game = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  img {
    weight: 40px;
    height: 40px;
  }

  span {
    font-weight: 800;
    font-size: 1.5em;
  }

  p {
    font-weight: 600;
    text-align: center;
  }
`;

const GameInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  p {
    text-align: center;
    line-height: 1.1;
    font-size: 1.1rem;
  }
`;

export default WeeklyCalendar;
