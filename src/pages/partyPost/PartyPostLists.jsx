import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";
import apiClient from "../Login/apiClient";
import axios from "axios";

// 게임 선택 모달 컴포넌트
const GameModal = ({ games, onSelect, onClose }) => {
  return (
    <div className="game-modal">
      <h3>게임 목록</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id} onClick={() => onSelect(game.id)}>
            {game.name} ({game.matchDate})
          </li>
        ))}
      </ul>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const PartyPostLists = () => {
  const [lists, setLists] = useState([]); // 요청 결과 담는 곳
  const [isLoading, setIsLoading] = useState(true); // 로딩 구현
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [teamName, setTeamName] = useState(""); // 팀명
  const [gameId, setGameId] = useState(null); // 게임 ID
  const [sortBy, setSortBy] = useState([]); // 정렬할 항목
  const [ascending, setAscending] = useState(false); // 정렬 순서 (기본 내림차순)
  const [games, setGames] = useState([]); // 게임 목록
  const [showGamesList, setShowGamesList] = useState(false); // 게임 목록 표시 여부
  const [selectedDate, setSelectedDate] = useState(""); // 날짜 선택 값

  // 날짜 기반으로 게임 목록 가져오는 함수
  const handleSearchGames = useCallback(async (matchDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`
      );
      if (response.data.status === "success") {
        setGames(response.data.data);
        setShowGamesList(true); // 게임 목록 모달을 표시
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("에러 발생: ", e.message);
    }
  }, []);

  // API 요청 함수
  const fetchPartyPostLists = async (page = 0) => {
    try {
      let url = `http://localhost:8080/api/post/s?page=${page}`;
      if (teamName) {
        url += `&teamName=${encodeURIComponent(teamName)}`;
      }
      if (gameId) {
        url += `&gameId=${gameId}`;
      }
      if (sortBy.length > 0) {
        url += `&sortBy=${sortBy.join(",")}`;
      }
      url += `&ascending=${ascending}`;

      const response = await apiClient.get(url);
      if (response.data.status === "success") {
        setLists(response.data.data.partyPosts || []);
        setTotalPages(response.data.data.totalPages);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("데이터 가져오기 실패:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      // 기본 값 요청
      fetchPartyPostLists(currentPage);
    }
  }, [currentPage, teamName, gameId, sortBy, ascending, selectedDate]);

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setIsLoading(true);
    }
  };

  // 네비게이션을 위한 함수
  const navigate = useNavigate();
  const createPostBtnClick = () => {
    navigate("/postWrite");
  };
  const movePost = (id) => {
    navigate(`/partyPost/${id}`);
  };

  // 날짜 선택 시 호출
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      handleSearchGames(date);
    }
  };

  // 팀 선택 시 호출
  const handleTeamChange = (e) => {
    setTeamName(e.target.value);
  };

  // 정렬 변경
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(0);
  };

  const toggleAscending = () => {
    setAscending((prev) => !prev);
    setCurrentPage(0);
  };

  return (
    <div className="전체를 감싸는 영역">
      <div className="중간">
        <div className="상태와 필터 버튼">
          <div>총 {lists.length}건</div>
          <div>
            {/* 날짜 선택 */}
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            {/* 팀 선택 */}
            <select onChange={handleTeamChange} value={teamName}>
              <option value="">팀 선택</option>
              <option value="롯데">롯데</option>
              <option value="KIA">KIA</option>
              <option value="삼성">삼성</option>
              <option value="KT">KT</option>
              <option value="한화">한화</option>
              <option value="키움">키움</option>
              <option value="LG">LG</option>
              <option value="NC">NC</option>
              <option value="두산">두산</option>
              <option value="SSG">SSG</option>
            </select>
            {/* 정렬 버튼 */}
            <button onClick={() => handleSortChange(["hitCount"])}>
              조회수 정렬
            </button>
            <button onClick={() => handleSortChange(["createdAt"])}>
              작성일 정렬
            </button>
            <button onClick={toggleAscending}>정렬 순서 변경</button>
          </div>
        </div>

        {/* 게임 목록 모달 */}
        {showGamesList && (
          <GameModal
            games={games}
            onSelect={(selectedGameId) => {
              setGameId(selectedGameId);
              setShowGamesList(false); // 모달 닫기
            }}
            onClose={() => setShowGamesList(false)}
          />
        )}

        {/* 데이터 출력 */}
        <div className="중앙 글 리스트">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : lists.length > 0 ? (
            lists.map((data) => (
              <PostList
                key={data.id}
                id={data.id}
                myTeamImg={data.myTeamImg}
                opposingTeamImg={data.opposingTeam}
                title={data.title}
                matchDate={data.matchDate}
                matchTime={data.matchTime}
                max={data.maxPeopleNum}
                current={data.currentPeopleNum}
                like={data.likeCount}
                createAt={new Date(data.createAt).toLocaleString()}
                name={data.userNickname}
                move={movePost}
              />
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 페이지 네비게이션 및 작성 버튼 */}
      <div className="하단">
        <button
          disabled={currentPage <= 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전 페이지
        </button>
        <span>
          페이지 {currentPage + 1} / {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음 페이지
        </button>
        <button className="글 작성하기" onClick={createPostBtnClick}>
          글 등록하기
        </button>
      </div>
    </div>
  );
};

export default PartyPostLists;
