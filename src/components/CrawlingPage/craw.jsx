import React, { useState } from "react";
import axios from "axios";

const TeamAndPlayerInfo = () => {
  const [teamData, setTeamData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);

  const crawlingData = async () => {
    setLoading(true);
    try {
      // Promise.all : 두 개의 API 호출
      const [teamResponse, playerResponse] = await Promise.all([
        axios.get(`/api/team/${teamId}`),
        axios.get(`/api/player/${teamId}`),
      ]);

      // 데이터 상태에 저장
      setTeamData(teamResponse.data.data[0]); // 구단 정보
      setPlayerData(playerResponse.data.data); // 선수 정보
    } catch (error) {
      console.error("API 호출 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={crawlingData}>구단 정보</button>

      {/* 구단 정보는 teamId에 따라 나온 하나의 값에 관한 정보를 가지고 와 배열의 [0]을 가져오지만
    선수 정보는 teamId에 따라 나온 여러 개의 값에 관한 정보를 순차적으로 돌면서 가져온다 */}
      {/* 구단 정보 표시 */}
      {/* {teamData && (
        <div>
          <h1>{teamData.team_name} 구단 정보</h1>
          <p>순위: {teamData.ranking}</p>
          <p>경기 수: {teamData.game_played}</p>
          <p>승: {teamData.win}</p>
          <p>패: {teamData.loss}</p>
          <p>무: {teamData.draw}</p>
          <p>승률: {teamData.win_rate}%</p>
          <p>연승: {teamData.consecutive}</p>
          <p>최근 10경기: {teamData.last10_games}</p>
        </div>
      )} */}

      {/* 선수 정보 표시 */}
      {/* {playerData && playerData.length > 0 && (
        <div>
          <h2>선수 목록</h2>
          {playerData.map(player => (
            <div key={player.player_no}>
              <h3>{player.player_name} ({player.position})</h3>
              <p>영문 이름: {player.player_eng_name}</p>
              <p>ERG: {player.erg}</p>
              <p>WHIP: {player.whip}</p>
              <p>승홀세: {player.c_category}</p>
              <p>이닝: {player.inning}</p>
              <p>삼진: {player.strikeout}</p>
              <p>타율: {player.batting}</p>
              <p>안타: {player.hit}</p>
              <p>홈런: {player.homerun}</p>
              <p>타점: {player.rbi}</p>
              <p>도루: {player.stear}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default TeamAndPlayerInfo;
