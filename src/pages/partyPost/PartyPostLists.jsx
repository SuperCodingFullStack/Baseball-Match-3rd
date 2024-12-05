import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/MainPage/Header/Header";
// import PostList from "./PostList";
import PostListItem from "../../components/boardComponents/PostListItem";
import styled from "styled-components";
import axios from "axios";
import NoDataPage from "../NoDataPage";

// PostList 컴포넌트 최적화
// const MemoizedPostList = React.memo(PostList);

const PartyPostLists = () => {
  const title = "게시판";
  const info = "게시판에 글이 없습니다.";
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

  const GameModal = ({ games, onSelect, onClose }) => {
    return (
      <ModalContent className="game-modal">
        <ModalTitle>{selectedDate}</ModalTitle>
        <GameList>
          {games.map((game) => (
            <GameItem key={game.id} onClick={() => onSelect(game.id)}>
              {game.homeTeamName} vs {game.awayTeamName}
            </GameItem>
          ))}
        </GameList>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    );
  };

  const handleSearchGames = useCallback(async (matchDate) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`);
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
      <Header />
      <Body className="중간">
        <Title>게시판</Title>
        <Container>
          <PostHeader className="상태와 필터 버튼">
            <LeftSide>
              <SelectDate>
                <Input type="date" value={selectedDate} onChange={handleDateChange} />
                <SelectTeam onChange={handleTeamChange} value={teamName}>
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
                </SelectTeam>
                <Button>
                  <button onClick={() => handleSortChange(["hitCount"])}>조회수 정렬</button>
                  <button onClick={() => handleSortChange(["createdDate"])}>작성일 정렬</button>
                  <button onClick={toggleAscending}>정렬 순서 변경</button>
                </Button>
              </SelectDate>
            </LeftSide>
            <RightSide>
              <WriteButton className="글 작성하기" onClick={createPostBtnClick}>
                글 등록하기
              </WriteButton>
            </RightSide>
          </PostHeader>

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

          <PostContainer className="중앙 글 리스트">
            {isLoading ? (
              <div>로딩 중...</div>
            ) : lists.length > 0 ? (
              lists.map((data) => (
                // <MemoizedPostList
                //   key={data.id}
                //   id={data.id}
                //   title={data.title}
                //   move={movePost}
                //   myTeamImg={data.myTeamImg}
                //   opposingTeamImg={data.opposingTeam}
                //   matchTime={data.matchTime}
                //   matchDate={data.matchDate}
                //   max={data.maxPeopleNum}
                //   current={data.currentPeopleNum}
                //   like={data.likeCount}
                //   createAt={data.createAt}
                //   name={data.userNickname}
                //   stadium={data.stadium}
                // />
                <PostListItem key={data.id} data={data} onView={movePost} showEditBtn={false} />
              ))
            ) : (
              <NoDataPage title={title} info={info} />
            )}
          </PostContainer>

          <BottomContainer className="하단">
            <CountItems>총 {lists.length}건</CountItems>
            <MoreButton onClick={handleLoadMore} disabled={!cursor}>
              더 보기
            </MoreButton>
          </BottomContainer>
        </Container>
      </Body>
    </div>
  );
};

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border: 1px solid gray;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  justify-self: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #333;
`;

const GameList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GameItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c4fccf;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #b1e2ba;
  }
`;

const Body = styled.div`
  background: #f1f5f9;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 90px;
`;

const Title = styled.h1`
  margin: 2rem;
  font-weight: 600;
  font-size: 1.7rem;
`;

const Container = styled.div`
  padding-bottom: 2rem;
  background: white;
  margin: 1.8rem;
`;

const PostContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SelectDate = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Input = styled.input`
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const SelectTeam = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const Button = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const LeftSide = styled.div``;
const RightSide = styled.div``;

const WriteButton = styled.button`
  padding: 10px 20px;
  background-color: #c4fccf;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #b1e2ba;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  align-items: center;
`;
const CountItems = styled.p`
  font-weight: 600;
  font-size: 18px;
`;

const MoreButton = styled.button`
  padding: 10px 20px;
  background-color: #c4fccf;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #b1e2ba;
  }
`;

export default PartyPostLists;
