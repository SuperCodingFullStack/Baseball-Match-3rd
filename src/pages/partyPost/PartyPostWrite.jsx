import React, { useState, useEffect } from "react";
import apiClient from "../Login/apiClient";
import axios from "axios";

const partyPostWrite = () => {
  const [teamName, setTeamName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGamesList, setShowGamesList] = useState(false);

  // 경기일자로 경기를 받아오는 함수
  const handleSearchGames = async (matchDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`
      );
      console.log("응답객체는 = ", response);
      console.log("response.status는? =", response.status);
      console.log("response.data.status는? =", response.data.status);

      if (response.data.status == "success") {
        setGames(response.data.data);
        setShowGamesList(true);
        console.log("저장되는 게임 데이터는 = ", response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      //에러처리
      console.error("에러발생 : ", e.message);
    }
  };

  const [formData, setFormData] = useState({
    gameId: "게임아이디",
    title: "글 제목",
    content: "글 내용",
    MaxPeopleNum: "최대인원",
  });

  //  input에 작성을 해서 이벤트가 발생하면 내가 만든 state에 해당하는 값이 덧씌워지도록하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 상태 변경 후 로그 출력
  useEffect(() => {
    console.log("Updated data:", formData);
  }, [formData]); //formData가 변경될 때마다 실행

  const [surchGameInfo, setSurchGameInfo] = useState({
    matchDate: "이벤트로 선택한 날짜",
  });

  // game 정보를 불러오기 위한 날짜를 저장하기 위한 함수
  const handleSurchGameInfo = (e) => {
    const { name, value } = e.target;
    setSurchGameInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 상태 변경 후 로그 출력
  useEffect(() => {
    console.log("Updated matchDate:", surchGameInfo.matchDate);
  }, [surchGameInfo]); // surchGameInfo가 변경될 때마다 실행

  // 전체 전송 어 그러니까 글을 작성하는 post 요청을 보내는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/api/post`, formData);
      console.log("response는 = >", response);

      if (response.data.status == "success") {
        console.log(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      //에러처리
      console.error("에러발생 : ", e.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            onChange={handleChange}
            required
          />
        </div>

        {/* 최대 인원 수 입력 */}
        <div>
          <label htmlFor="maxPeopleNum">최대 인원 수</label>
          <input
            type="number"
            id="maxPeopleNum"
            name="maxPeopleNum"
            onChange={handleChange}
            min="2"
            required
          />
        </div>

        {/* 경기 정보 선택 */}
        <div>
          <label>경기 정보</label>
          <div>
            <input
              type="date"
              name="matchDate" // name 속성 추가
              placeholder="경기 일자"
              onChange={handleSurchGameInfo}
            />

            <div>여기에 경기들을 표시해야해요</div>
            <button
              type="button"
              onClick={() => handleSearchGames(surchGameInfo.matchDate)}
            >
              경기 검색
            </button>
          </div>

          {/* 경기 목록 어차피 하나라면 삭제 할 공간 */}
          {showGamesList && (
            <div>
              <ul>
                {games.map((game) => (
                  <li
                    key={game.id}
                    onClick={() => {
                      setSelectedGame(game);
                      setFormData((prevData) => ({
                        ...prevData,
                        gameId: game.id,
                      }));
                    }}
                  >
                    {game.homeTeamName} vs {game.awayTeamName} ({game.matchDate}
                    :{game.matchTime})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 선택된 경기 표시 */}
          {selectedGame && (
            <div>
              <p>
                선택한 경기: {selectedGame.homeTeamName} vs{" "}
                {selectedGame.awayTeamName} ({selectedGame.matchDate}:
                {selectedGame.matchTime})
              </p>
            </div>
          )}
        </div>

        {/* 제출 버튼 */}
        <button type="submit">글작성하기</button>
      </form>
    </>
  );
};

export default partyPostWrite;
