import dayjs from "dayjs";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getTeamLogo } from "../../../utils/getTeamLogo";
import Weather from "./Weather";
import { stadiumCityMap } from "../../../constants";

const GameModal = ({ date, onClose, dayGames }) => {
  // date가 유효하지 않으면 현재 날짜를 기본값으로 설정
  const formattedDate = date ? dayjs(date) : dayjs();

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{formattedDate.format("MM월 DD일")}</ModalTitle>
        {dayGames.length > 0 ? (
          <GameList>
            {dayGames.map((game, index) => (
              <GameItem key={index}>
                <Weather city={stadiumCityMap[game.stadium]} />
                <GameInfo size="18px">
                  <TeamImg src={getTeamLogo(game.homeTeam)} />
                  {game.homeTeam}
                  <Vs>VS</Vs>
                  <TeamImg src={getTeamLogo(game.awayTeam)} />
                  {game.awayTeam}
                </GameInfo>
                <GameInfo>{game.stadium}</GameInfo>
                <GameInfo>{game.matchTime}</GameInfo>
              </GameItem>
            ))}
          </GameList>
        ) : (
          <GameInfo style={{ color: "red" }}>오늘은 경기가 없습니다.</GameInfo>
        )}
        <CloseButton onClick={onClose}>close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

GameModal.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(dayjs), PropTypes.string]),
  dayGames: PropTypes.arrayOf(
    PropTypes.shape({
      homeTeam: PropTypes.string.isRequired,
      awayTeam: PropTypes.string.isRequired,
      stadium: PropTypes.string.isRequired,
      matchTime: PropTypes.string.isRequired,
    })
  ),
  onClose: PropTypes.func.isRequired,
};

GameModal.defaultProps = {
  date: dayjs(),
  dayGames: [],
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  padding: 0.3rem;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #333;
`;

const GameList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GameItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TeamImg = styled.img`
  width: 30px;
  height: 30px;
  padding: 0.3rem;
`;

const GameInfo = styled.p`
  margin: 5px 0;
  font-size: ${({ size }) => (size ? size : "16px")};
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Vs = styled.span`
  font-weight: bold;
  padding: 0.3rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c4fccf;
  color: #555;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #b1e2ba;
  }
`;

export default GameModal;
