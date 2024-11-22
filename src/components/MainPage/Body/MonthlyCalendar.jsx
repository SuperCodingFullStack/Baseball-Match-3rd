import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import GameModal from "./GameModal";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = currentMonth.startOf("month").day();

  useEffect(() => {
    // fetch(`/api/games?month=${currentMonth.format("YYYY-MM")}`)
    //   .then((res) => res.json())
    //   .then((data) => setGames(data));
    const sampleGames = [
      { date: currentMonth.date(2).format("YYYY-MM-DD"), team: "롯데 vs 기아" },
      { date: currentMonth.date(2).format("YYYY-MM-DD"), team: "Team B" },
      { date: currentMonth.date(2).format("YYYY-MM-DD"), team: "Team C" },
      { date: currentMonth.date(2).format("YYYY-MM-DD"), team: "Team D" },
      { date: currentMonth.date(2).format("YYYY-MM-DD"), team: "Team E" },
      { date: currentMonth.date(5).format("YYYY-MM-DD"), team: "Team C" },
      { date: currentMonth.date(15).format("YYYY-MM-DD"), team: "Team D" },
      { date: currentMonth.date(15).format("YYYY-MM-DD"), team: "Team E" },
      { date: currentMonth.date(20).format("YYYY-MM-DD"), team: "Team F" },
    ];
    setGames(sampleGames);
  }, [currentMonth]);

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const openModal = (date) => setSelectedDate(date);
  const closeModal = () => setSelectedDate(null);

  return (
    <Container>
      <Header>
        <button onClick={handlePrevMonth}>
          <FaAngleLeft />
        </button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={handleNextMonth}>
          <FaAngleRight />
        </button>
      </Header>
      <Grid>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <DayHeader key={index} index={index}>
            {day}
          </DayHeader>
        ))}

        {[...Array(firstDayOfWeek)].map((_, i) => (
          <EmptyCell key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const date = currentMonth.date(i + 1);
          const dayGames = games.filter(
            (game) => game.date === date.format("YYYY-MM-DD")
          );
          return (
            <Cell key={date}>
              <DateLabel>{i + 1}</DateLabel>
              <PlusButton onClick={() => openModal(date)}>+</PlusButton>
              <GamesSummary>
                {dayGames.slice(0, 5).map((game, index) => (
                  <GameIcon key={index}>{game.team}</GameIcon>
                ))}
              </GamesSummary>
            </Cell>
          );
        })}
      </Grid>
      {selectedDate && (
        <GameModal date={selectedDate} games={games} onClose={closeModal} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 3rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-weight:600;

  button {
    padding: 0.3rem;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayHeader = styled.div`
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  padding: 0.6rem;
  background: ${({ index }) =>
    index === 0 ? "#ffc4d6" : index === 6 ? "#c4e3ff" : "#f0f0f0"};
  border-bottom: 1px solid #ddd;
`;

const EmptyCell = styled.div`
  border: 1px solid transparent;
`;

const Cell = styled.div`
  border: 1px solid #ddd;
  padding: 0.7rem;
  text-align: center;
  position: relative;
`;

const DateLabel = styled.div`
  text-align: start;
  font-weight: bold;
`;

const GamesSummary = styled.div`
  margin-top: 5px;
`;

const GameIcon = styled.div`
font-size:13px;
background:#f0f0f0;
padding 2px 5px;
margin: 2px 0
`;

const PlusButton = styled.button`
  padding: 0;
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0);
  color: #67fc99;
`;

export default MonthlyCalendar;
