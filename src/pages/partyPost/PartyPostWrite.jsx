import React, { useState, useEffect } from "react";
import DropdownTeam from "../../components/board/DropdownTeam";

const partyPostWrite = () => {
  // 게임 정보를 검색해서 받아오는 과정
  // 기억하기로 어떤날에 어떤 구단의 경기는 1개 밖에 없기에 이렇게 하면 특정지어서
  // 받을 수 있다고 기억한다.
  /*
  받아야 하는 명확한 형식
  1. 구단의 이름을 저기 뭐야? 뭐시기로 할 거 아니면명확하게 받을 이름 정할 것 롯데로 받을지 롯데 자이언트로 받을지 이런거
  2. 날짜 형식을 어떻게 보내줘야 명확하게 받아지는지 말해줄 것
  */
  /* const fetchGames = async (date, teamName) => {
    const response = await fetch(
      `http://localhost:8080/api/game/matchDate=${date}&teamName=${teamName}`
    );
    const data = await response.json();
    return data;
  };
*/
  // 임시로 받아오는 게임 엔티티 데이터
  const gameData = {
    // 어떤 게임엔티티인지 구분하는 id 필요
    id: 3,
    team: "롯데",
    awayTeam: "NC",
    matchDate: "2024-11-21",
    // "10.21 월" 받아오는 양식
    matchTime: "18:00",
  };

  const [teamName, setTeamName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  // const [showGamesList, setShowGamesList] = useState(false);

  // 경기 목록을 받아오는 함수
  const handleSearchGames = async () => {
    const gameData = await fetchGames(matchDate, teamName);
    setGames(gameData);
    setShowGamesList(true);
  };

  const [formData, setFormData] = useState({
    userId: "JWT 토큰에서 가져오는 user id",
    gameId: "game 확인한 후 해당 경기의 id",
    title: "글 제목",
    content: "글 내용",
    MaxPeopleNum: "최대모집인원",
  });

  const [surchGameInfo, setSurchGameInfo] = useState({
    matchDate: "이벤트로 선택한 날짜",
    team: "받아온 팀명",
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
  // game 정보를 불러오기 위한 날짜와 팀명을 저장하기 위한 함수
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
    console.log("Updated team:", surchGameInfo.team);
  }, [surchGameInfo]); // surchGameInfo가 변경될 때마다 실행

  // 전체 전송 어 그러니까 글을 작성하는 post 요청을 보내는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // 응답을 JSON 형식으로 변환
      .then((data) => {
        if (data.status === "success") {
          console.log("Success:", data.message); // 성공 메시지 출력
          // 성공 시 추가 작업 (예: 포스트 ID 출력)
          console.log("Post ID:", data.data.post_id);
        } else {
          throw new Error(data.message); // 실패 시 에러 발생
        }
      })
      .catch((error) => {
        console.error("Error:", error.message); // 에러 메시지 출력
      });
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

            <div>드롭다운 해야지 스스로 만들어</div>
            <button type="button" onClick={handleSearchGames}>
              경기 검색
            </button>
          </div>

          {/* 경기 목록 어차피 하나라면 삭제 할 공간
          {showGamesList && (
            <div>
              <ul>
                {games.map((game) => (
                  <li key={game.id} onClick={() => setSelectedGame(game)}>
                    {game.awayTeam} vs {game.homeTeam} ({game.matchDate})
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* 선택된 경기 표시 */}
          {selectedGame && (
            <div>
              <p>
                선택한 경기: {gameData.team} vs {gameData.awayTeam}
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
