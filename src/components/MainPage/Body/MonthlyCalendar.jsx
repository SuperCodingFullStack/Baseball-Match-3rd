import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import GameModal from "./GameModal";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa6";

const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = currentMonth.startOf("month").day();

  useEffect(() => {
    console.log("Current month:", currentMonth.format("MMMM YYYY"));
    // fetch(`http://localhost:8080/api/gameInfo/${currentMonth.format("MM")}`)
    fetch("http://localhost:8080/api/gameInfo/10")
      .then((res) => res.json())
      .then((response) => {
        if (
          response &&
          response.status === "success" &&
          Array.isArray(response.data)
        ) {
          const formattedGames = response.data.map((game) => {
            const currentYear = dayjs().year();
            const matchDateWithoutDay = game.matchDate.split(" ")[0];
            const [month, day] = matchDateWithoutDay.split(".");
            const formattedDate = dayjs(
              `${currentYear}-${month}-${day}`,
              "YYYY-MM-DD"
            );

            return {
              date: formattedDate,
              team: `${game.homeTeam} vs ${game.awayTeam}`,
              homeTeam: game.homeTeam,
              homeTeamScore: game.homeTeamScore,
              awayTeam: game.awayTeam,
              awayTeamScore: game.awayTeamScore,
              matchTime: game.matchTime,
              stadium: game.stadium,
            };
          });
          setGames(formattedGames);
          console.log(formattedGames);
        } else {
          console.error("Games data is not an array", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching game data: ", error);
      });
  }, [currentMonth]);

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const openModal = (date) => setSelectedDate(dayjs(date));
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
          const dayGames = games.filter((game) =>
            dayjs(game.date).isSame(date, "day")
          );
          const isToday = date.isSame(dayjs(), "day");

          return (
            <Cell
              key={date}
              style={{ borderColor: isToday ? "#af02f9" : "#ddd" }}
            >
              <DayInfo>
                <DateLabel>{i + 1}</DateLabel>
                {isToday && <Today>Today</Today>}
                <PlusButton onClick={() => openModal(date)}>
                  <FaPlus />
                </PlusButton>
              </DayInfo>
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
  max-width: 1200px;
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
  weight: 90px;
  height: 90px;
`;

const DateLabel = styled.div`
  text-align: start;
  font-weight: bold;
`;

const DayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Today = styled.p`
  font-size: 15px;
  color: #63028c;
`;

const GamesSummary = styled.div`
  margin-top: 5px;
`;

const GameIcon = styled.div`
font-size:14px;
background:#f0f0f0;
padding 2px 5px;
margin: 2px 0
`;

const PlusButton = styled.button`
  padding: 0;
  font-size: 15px;
  background: rgba(0, 0, 0, 0);
  color: #67fc99;
`;

export default MonthlyCalendar;
