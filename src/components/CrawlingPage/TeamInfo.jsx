import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../MainPage/Header/Header";

const TeamInfo = () => {
  const { teamName } = useParams(); // URL 파라미터에서 teamName을 가져옵니다.

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

  const teamData = [
    {
      teamId: 1,
      ranking: 1,
      teamName: "KIA",
      gamesPlayed: 144,
      win: 87,
      loss: 55,
      draw: 2,
      winRate: 0.613,
      consecutive: "2승",
      last10Games: "5승-5패-0무",
    },
    {
      teamId: 2,
      ranking: 2,
      teamName: "삼성",
      gamesPlayed: 144,
      win: 78,
      loss: 64,
      draw: 2,
      winRate: 0.549,
      consecutive: "1패",
      last10Games: "3승-7패-0무",
    },
    {
      teamId: 3,
      ranking: 3,
      teamName: "LG",
      gamesPlayed: 144,
      win: 76,
      loss: 66,
      draw: 2,
      winRate: 0.535,
      consecutive: "2승",
      last10Games: "7승-3패-0무",
    },
    {
      teamId: 4,
      ranking: 4,
      teamName: "두산",
      gamesPlayed: 144,
      win: 74,
      loss: 68,
      draw: 2,
      winRate: 0.521,
      consecutive: "4승",
      last10Games: "8승-2패-0무",
    },
    {
      teamId: 5,
      ranking: 5,
      teamName: "KT",
      gamesPlayed: 144,
      win: 72,
      loss: 70,
      draw: 2,
      winRate: 0.507,
      consecutive: "3승",
      last10Games: "5승-5패-0무",
    },
    {
      teamId: 6,
      ranking: 6,
      teamName: "SSG",
      gamesPlayed: 144,
      win: 72,
      loss: 70,
      draw: 2,
      winRate: 0.507,
      consecutive: "4승",
      last10Games: "8승-2패-0무",
    },
    {
      teamId: 7,
      ranking: 7,
      teamName: "롯데",
      gamesPlayed: 144,
      win: 66,
      loss: 74,
      draw: 4,
      winRate: 0.471,
      consecutive: "1승",
      last10Games: "4승-6패-0무",
    },
    {
      teamId: 8,
      ranking: 8,
      teamName: "한화",
      gamesPlayed: 144,
      win: 66,
      loss: 76,
      draw: 2,
      winRate: 0.465,
      consecutive: "2패",
      last10Games: "5승-5패-0무",
    },
    {
      teamId: 9,
      ranking: 9,
      teamName: "NC",
      gamesPlayed: 144,
      win: 61,
      loss: 81,
      draw: 2,
      winRate: 0.43,
      consecutive: "2패",
      last10Games: "2승-8패-0무",
    },
    {
      teamId: 10,
      ranking: 10,
      teamName: "키움",
      gamesPlayed: 144,
      win: 58,
      loss: 86,
      draw: 0,
      winRate: 0.403,
      consecutive: "5패",
      last10Games: "1승-9패-0무",
    },
  ];

  // 영어 팀 이름을 한글로 변환
  const koreanTeamName = teamNameMapping[teamName];

  // 변환된 한글 팀 이름을 사용하여 teamData에서 해당 팀 찾기
  const team = teamData.find((team) => team.teamName === koreanTeamName);

  if (!team) {
    return (
      <Container>
        <Header />
        <Content>
          <p>해당 팀이 없습니다.</p>
        </Content>
      </Container>
    );
  }
  return (
    <Container>
      <Header />
      <Content>
        <h1>{team.teamName} 정보</h1>
        <p>순위 : {team.ranking}</p>
        <p>경기 수 : {team.gamesPlayed}</p>
        <p>승 : {team.win}</p>
        <p>패 : {team.loss}</p>
        <p>무 : {team.draw}</p>
        <p>승률 : {team.winRate}</p>
        <p>연승/연패 : {team.consecutive}</p>
        <p>최근 10경기 : {team.last10Games}</p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  text-align: center;
`;

export default TeamInfo;
