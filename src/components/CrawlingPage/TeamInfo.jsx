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

  return (
    <Container>
      <Header />
      <Content>
        <TeamDetails teamName={teamName.toUpperCase()}>
          <TeamContent>
            <LogoContainer>
              <Logo
                src={`/assets/${teamName.toLowerCase()}.svg`} // 한글 이름이 영어로 변환되어 소문자 처리됨
                alt="team logo"
              />
              <TeamName>{teamNameMapping[teamName]}</TeamName>
            </LogoContainer>
            <Table teamName={teamName.toUpperCase()}>
              <tbody>
                <tr>
                  <th>순위</th>
                  <Ranking ranking={team.ranking}>{team.ranking}</Ranking>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                  <MapContainer>
                    {/* 여기에 지도를 넣으세요 */}
                    <img
                      src="/path/to/map.png"
                      alt="Map"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </MapContainer>
                </tr>
                <tr>
                  <th>경기 수</th>
                  <td>{team.gamesPlayed}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>승</th>
                  <td>{team.win}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>패</th>
                  <td>{team.loss}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>무</th>
                  <td>{team.draw}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>승률</th>
                  <td>{team.winRate}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>연승/연패</th>
                  <td>{team.consecutive}</td>
                  <td colSpan="7" style={{ backgroundColor: "white" }}></td>
                </tr>
                <tr>
                  <th>최근 10경기</th>
                  <td>{team.last10Games}</td>
                  <th>홈구장</th>
                  <td>{team.stadium}</td>
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
  width: 100%;
  background-color: #f1f5f9;
`;

const Content = styled.div`
  text-align: center;
`;

const TeamDetails = styled.div`
  background-color: ${(props) => {
    switch (props.teamName) {
      case "SAMSUNG":
        return "#1c76d2";
      case "KIA":
        return "#e4002b";
      case "LG":
        return "#af1e2d";
      case "DOOSAN":
        return "#131230";
      case "KT":
        return "#000000";
      case "SSG":
        return "#b01e22";
      case "LOTTE":
        return "#041e42";
      case "HANHWA":
        return "#ff8c00";
      case "NC":
        return "#0e4595";
      case "KIWOOM":
        return "#8b234d";
      default:
        return "#ffffff";
    }
  }};
  padding: 3px;
`;

const TeamContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 0;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px; // 로고와 구단 이름 간격
`;

const TeamName = styled.h2`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: left;
  margin: 0;
`;

const Table = styled.table`
  font-size: 17px;
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
  color: white;

  th {
    background-color: ${(props) => {
      switch (props.teamName) {
        case "SAMSUNG":
          return "#c0c0c0";
        case "KIA":
          return "#05141f";
        case "LG":
          return "#000000";
        case "DOOSAN":
          return "#ed1c24";
        case "KT":
          return "#eb1c24";
        case "SSG":
          return "#ffb81c";
        case "LOTTE":
          return "#d00f31";
        case "HANHWA":
          return "#020f17";
        case "NC":
          return "#af917b";
        case "KIWOOM":
          return "#b07f4a";
        default:
          return "#ffffff";
      }
    }};
    padding: 10px 50px;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    background-color: white;
    color: black;
    width: 250px;
    height: 24px;
  }

  tr:hover {
    background-color: #000000;
  }
`;

const Ranking = styled.td`
  color: ${(props) =>
    props.ranking === 1
      ? "#E1B643"
      : props.ranking === 2
      ? "#DDAC17"
      : props.ranking === 3
      ? "#cd7f32"
      : "black"};
  font-weight: ${(props) =>
    props.ranking === 1 || props.ranking === 2 || props.ranking === 3
      ? "bold"
      : "normal"};
`;

const MapContainer = styled.div`
  position: absolute;
  top: 30;
  left: 460px;
  width: 47%;
  height: 61%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 2; /* 테이블 셀보다 위에 표시 */
  pointer-events: none; /* 마우스 이벤트를 차단하여 아래 테이블과의 상호작용 유지 */
`;

export default TeamInfo;
