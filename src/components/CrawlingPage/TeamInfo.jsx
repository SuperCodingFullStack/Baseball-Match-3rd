import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../MainPage/Header/Header";
import axios from "axios";

const TeamInfo = () => {
  const { teamName } = useParams(); // URL 파라미터에서 teamName을 가져옵니다.
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teamNameMapping = {
    SAMSUNG: "삼성",
    KIA: "KIA",
    LG: "LG",
    DOOSAN: "두산",
    KT: "KT",
    SSG: "SSG",
    LOTTE: "롯데",
    HANHWA: "한화",
    NC: "NC",
    KIWOOM: "키움",
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teamInfo");
        const teamData = response.data.data;

        const koreanTeamName = teamNameMapping[teamName];
        const team = teamData.find((team) => team.teamName === koreanTeamName);

        if (team) {
          setTeam(team);
        } else {
          setError("해당 팀이 없습니다.");
        }
      } catch (err) {
        setError("에러");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamName]);

  if (loading) {
    return (
      <Container>
        <Header />
        <Content>로딩 중...</Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <Content>{error}</Content>
      </Container>
    );
  }

  // teamNameMapping을 활용하여 로고 이름 결정
  const koreanTeamName = teamNameMapping[teamName];
  const teamLogo = koreanTeamName
    ? koreanTeamName.toLowerCase()
    : teamName.toLowerCase();

  return (
    <Container>
      <Header />
      <Content>
        <h1>{team.teamName} 정보</h1>
        <TeamDetails>
          <TeamContent>
            <LogoContainer>
              <Logo
                src={`/assets/${teamLogo}.svg`} // 한글 이름이 영어로 변환되어 소문자 처리됨
                alt="team logo"
              />
            </LogoContainer>
            <Table>
              <tbody>
                <tr>
                  <th>순위</th>
                  <Ranking ranking={team.ranking}>{team.ranking}</Ranking>
                </tr>
                <tr>
                  <th>경기 수</th>
                  <td>{team.gamesPlayed}</td>
                </tr>
                <tr>
                  <th>승</th>
                  <td>{team.win}</td>
                </tr>
                <tr>
                  <th>패</th>
                  <td>{team.loss}</td>
                </tr>
                <tr>
                  <th>무</th>
                  <td>{team.draw}</td>
                </tr>
                <tr>
                  <th>승률</th>
                  <td>{team.winRate}</td>
                </tr>
                <tr>
                  <th>연승/연패</th>
                  <td>{team.consecutive}</td>
                </tr>
                <tr>
                  <th>최근 10경기</th>
                  <td>{team.last10Games}</td>
                </tr>
              </tbody>
            </Table>
          </TeamContent>
        </TeamDetails>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

const TeamDetails = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  transform: rotate(-10deg);
  padding-top: 20px;
`;

const Table = styled.table`
  font-size: 17px;
  width: 120%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;

  th {
    font-weight: bold;
    padding: 10px;
    background-color: #f4f4f4;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const Ranking = styled.td`
  color: ${(props) =>
    props.ranking === 1
      ? "gold"
      : props.ranking === 2
      ? "silver"
      : props.ranking === 3
      ? "#cd7f32"
      : "black"};
  font-weight: ${(props) =>
    props.ranking === 1 || props.ranking === 2 || props.ranking === 3
      ? "bold"
      : "normal"};
`;

export default TeamInfo;
