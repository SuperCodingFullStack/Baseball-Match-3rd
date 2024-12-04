import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";
import axios from "axios";

// GameModal 컴포넌트
const GameModal = ({ games, onSelect, onClose }) => {
  return (
    <div className="game-modal">
      <h3>게임 목록</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id} onClick={() => onSelect(game.id)}>
            {game.homeTeamName} vs {game.awayTeamName} ({game.matchDate})
          </li>
        ))}
      </ul>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

// PostList 컴포넌트 최적화
const MemoizedPostList = React.memo(PostList);

const PartyPostLists = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [gameId, setGameId] = useState(null);
  const [sortBy, setSortBy] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [games, setGames] = useState([]);
  const [showGamesList, setShowGamesList] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [cursor, setCursor] = useState(null);

  const handleSearchGames = useCallback(async (matchDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`
      );
      if (response.data.status === "success") {
        setGames(response.data.data);
        setShowGamesList(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("에러 발생: ", e.message);
    }
  }, []);

  const fetchPartyPostLists = async (cursor = null) => {
    try {
      const params = new URLSearchParams();
      if (teamName) params.append("teamName", teamName);
      if (gameId) params.append("gameId", gameId);
      if (sortBy.length > 0) params.append("sortBy", sortBy.join(","));
      params.append("ascending", ascending);
      if (cursor) params.append("cursor", cursor);

      const url = `http://localhost:8080/api/post/s?${params.toString()}`;
      console.log("API 요청 상태:", {
        teamName,
        gameId,
        sortBy,
        ascending,
        cursor,
      });
      console.log("생성된 URL:", url);

      setIsLoading(true);
      const response = await axios.get(url);

      if (response.data.status === "success") {
        const newPosts = response.data.data.partyPosts || [];
        if (newPosts.length > 0) {
          setLists((prev) => [...prev, ...newPosts]);
        }
        setCursor(response.data.data.nextCursor || null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("에러 발생:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (cursor) {
      fetchPartyPostLists(cursor);
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      fetchPartyPostLists();
    }
  }, [teamName, gameId, sortBy, ascending, selectedDate]);

  useEffect(() => {
    if (gameId) {
      fetchPartyPostLists();
    }
  }, [gameId]);

  const navigate = useNavigate();
  const createPostBtnClick = () => {
    navigate("/postWrite");
  };
  const movePost = (id) => {
    navigate(`/partyPost/${id}`);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      handleSearchGames(date);
    }
  };

  const handleTeamChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const toggleAscending = () => {
    setAscending((prev) => !prev);
  };

  return (
    <div className="전체를 감싸는 영역">
      <div className="중간">
        <div className="상태와 필터 버튼">
          <div>총 {lists.length}건</div>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
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
            <button onClick={() => handleSortChange(["hitCount"])}>
              조회수 정렬
            </button>
            <button onClick={() => handleSortChange(["createdDate"])}>
              작성일 정렬
            </button>
            <button onClick={toggleAscending}>정렬 순서 변경</button>
          </div>
        </div>

        {showGamesList && (
          <GameModal
            games={games}
            onSelect={(selectedGameId) => {
              console.log("골라지는 게임?", selectedGameId);
              setGameId(selectedGameId);
              setShowGamesList(false);
            }}
            onClose={() => setShowGamesList(false)}
          />
        )}

        <div className="중앙 글 리스트">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : lists.length > 0 ? (
            lists.map((data) => (
              <MemoizedPostList
                key={data.id}
                id={data.id}
                title={data.title}
                move={movePost}
                myTeamImg={data.myTeamImg}
                opposingTeamImg={data.opposingTeam}
                matchTime={data.matchTime}
                matchDate={data.matchDate}
                max={data.maxPeopleNum}
                current={data.currentPeopleNum}
                like={data.likeCount}
                createAt={data.createAt}
                name={data.userNickname}
                stadium={data.stadium}
              />
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>

        <div className="하단">
          <button onClick={handleLoadMore} disabled={!cursor}>
            더 보기
          </button>
          <button className="글 작성하기" onClick={createPostBtnClick}>
            글 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartyPostLists;
