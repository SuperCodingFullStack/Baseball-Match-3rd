import styled from "styled-components";
import { LOTTE, NC } from "../../../../constants";

const SlideContent = () => {
  return (
    <SlideContainer>
      <Title>경기 결과</Title>
      <Date>10.01 화</Date>
      <Result>
        <Team>
          <HomeTeamImg src={LOTTE} />
          <HomeTeam>롯데</HomeTeam>
        </Team>
        <Score>
          <HomeScore>5</HomeScore>:<AwayScore>1</AwayScore>
        </Score>
        <Team>
          <AwayTeamImg src={NC} />
          <AwayTeam>NC</AwayTeam>
        </Team>
      </Result>
      <Stadium>사직 야구장</Stadium>
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  max-width: 600px;
  margin: 1rem;
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

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const HomeScore = styled.p`
  color: red;
`;

const AwayScore = styled.p``;

const Stadium = styled.p`
  margin-bottom: 2rem;
  font-weight: bold;
`;

export default SlideContent;
