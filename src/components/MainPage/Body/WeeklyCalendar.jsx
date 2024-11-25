import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";
import { LOTTE, NC } from "../../../constants";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import Weather from "./Weather";

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevWeek = () => {
    const newWeek = currentWeek.subtract(1, "week");
    setCurrentWeek(newWeek);
    setCurrentMonth(newWeek.startOf("month"));
  };

  const handleNextWeek = () => {
    const newWeek = currentWeek.add(1, "week");
    setCurrentWeek(newWeek);
    setCurrentMonth(newWeek.startOf("month"));
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth.subtract(1, "month");
    setCurrentMonth(newMonth);
    // 현재 주의 요일이 새로운 월에 속하지 않으면, 마지막 주로 이동
    if (!currentWeek.isSame(newMonth, "month")) {
      setCurrentWeek(currentWeek.subtract(1, "month")); // 현재 주 유지
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth.add(1, "month");
    setCurrentMonth(newMonth);
    // 현재 주의 요일이 새로운 월에 속하지 않으면, 첫 주로 이동
    if (!currentWeek.isSame(newMonth, "month")) {
      setCurrentWeek(currentWeek.add(1, "month")); // 현재 주 유지
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleMonthSelect = (month) => {
    const newWeek = dayjs()
      .month(month - 1)
      .startOf("month")
      .startOf("week");
    setCurrentWeek(newWeek);
    setIsModalOpen(false);
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
      <MoveBtn>
        <TodayButton onClick={handleToday}>Today</TodayButton>
        <MonthButton onClick={toggleModal}>Month</MonthButton>
        {isModalOpen && (
          <ModalOverlay onClick={toggleModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <MonthList>
                {Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <MonthItem
                      key={index}
                      onClick={() => handleMonthSelect(index + 1)}
                    >
                      {index + 1}월
                    </MonthItem>
                  ))}
              </MonthList>
            </Modal>
          </ModalOverlay>
        )}
      </MoveBtn>
      <Header>
        <button onClick={handlePrevMonth}>
          <FaAnglesLeft />
        </button>
        <button onClick={handlePrevWeek}>
          <FaAngleLeft />
        </button>
        <span>
          {currentWeek.format("MM월 DD일")} -{" "}
          {currentWeek.add(6, "day").format("MM월 DD일")}
        </span>
        <button onClick={handleNextWeek}>
          <FaAngleRight />
        </button>
        <button onClick={handleNextMonth}>
          <FaAnglesRight />
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

const MoveBtn = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  flex-direction: column;
  margin-top: 3rem;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const MonthList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const MonthItem = styled.button`
  padding: 0.5rem;
  border: none;
  background: #f4f4f4;
  cursor: pointer;
  &:hover {
    background: #eaeaea;
  }
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
    background: rgba(0, 0, 0, 0);
    &:hover {
      border: none;
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

const MonthButton = styled(TodayButton)``;

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
