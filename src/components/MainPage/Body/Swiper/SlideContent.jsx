import styled from "styled-components";
import PropTypes from "prop-types";
import { getTeamLogo } from "../../../../utils/getTeamLogo";

const SlideContent = ({ game, date }) => {
  return (
    <SlideContainer>
      <Title>경기 결과</Title>
      <Date>{date}</Date>
      <Result key={game.gameId}>
        <MatchDetails>
          <Team>
            <HomeTeamImg src={getTeamLogo(game.homeTeam)} alt={game.HomeTeam} />
            <HomeTeam>{game.homeTeam}</HomeTeam>
          </Team>
          <Score>
            <DynamicScore
              $isWinning={
                parseInt(game.homeTeamScore) > parseInt(game.awayTeamScore)
              }
            >
              {game.homeTeamScore}
            </DynamicScore>
            :
            <DynamicScore
              $isWinning={
                parseInt(game.awayTeamScore) > parseInt(game.homeTeamScore)
              }
            >
              {game.awayTeamScore}
            </DynamicScore>
          </Score>
          <Team>
            <AwayTeamImg src={getTeamLogo(game.awayTeam)} alt={game.awayTeam} />
            <AwayTeam>{game.awayTeam}</AwayTeam>
          </Team>
        </MatchDetails>
        <Stadium>{game.stadium}</Stadium>
      </Result>
    </SlideContainer>
  );
};

SlideContent.propTypes = {
  date: PropTypes.string.isRequired,
  game: PropTypes.shape({
    gameId: PropTypes.number.isRequired,
    matchDate: PropTypes.string.isRequired,
    matchTime: PropTypes.string.isRequired,
    homeTeam: PropTypes.string.isRequired,
    homeTeamScore: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    awayTeamScore: PropTypes.string.isRequired,
    stadium: PropTypes.string.isRequired,
  }).isRequired,
};

const SlideContainer = styled.div`
  max-width: 600px;
  margin: 4rem;
  text-align: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Date = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Result = styled.div``;

const MatchDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Team = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  gap: 1rem;
`;

const HomeTeamImg = styled.img`
  width: 90px;
  height: 90px;
  margin-bottom: 0.5rem;
`;

const HomeTeam = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const AwayTeamImg = styled(HomeTeamImg)``;
const AwayTeam = styled(HomeTeam)``;

const Score = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  gap: 1rem;
`;

const DynamicScore = styled.p`
  color: ${(props) => (props.$isWinning ? "red" : "black")};
`;

const Stadium = styled.p`
  margin-bottom: 2rem;
  font-weight: bold;
  font-size: 1.3rem;
`;

export default SlideContent;
