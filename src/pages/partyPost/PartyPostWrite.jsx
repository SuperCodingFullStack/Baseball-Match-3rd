import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import apiClient from "../Login/apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/MainPage/Header/Header";

const PartyPostWrite = () => {
  const navigate = useNavigate(); // 네비이용
  const [games, setGames] = useState([]); // 원하는 날짜에 있는 게임들
  const [selectedGame, setSelectedGame] = useState(null); // 내가 고른 게임
  const [showGamesList, setShowGamesList] = useState(false); // 모달
  // api 보낼 양식
  const [formData, setFormData] = useState({
    gameId: "",
    title: "",
    content: "",
    MaxPeopleNum: "",
  });

  // 내가 보고 싶은 날짜
  const [surchGameInfo, setSurchGameInfo] = useState({
    matchDate: "",
  });

  // 게임 목록을 가져오는 함수
  const handleSearchGames = useCallback(async (matchDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`
      );
      console.log("응답객체는 = ", response);
      console.log("response.status는? =", response.status);
      console.log("response.data.status는? =", response.data.status);

      if (response.data.status === "success") {
        setGames(response.data.data);
        setShowGamesList(true);
        console.log("저장되는 게임 데이터는 = ", response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("에러발생 : ", e.message);
    }
  }, []);

  // 폼 데이터 변경 함수
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // 게임 정보 검색 입력 처리 함수
  const handleSearchGameInfo = useCallback((e) => {
    const { name, value } = e.target;
    setSurchGameInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // 폼 제출 함수
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await apiClient.post(`/api/post`, formData);
        console.log("response는 = >", response);

        if (response.data.status === "success") {
          console.log(response.data.message);
          alert(response.data.message);
          setTimeout(() => {
            navigate(`/partyPost/${response.data.data.id}`);
          }, 1000); // 1초 지연 후 페이지 이동
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        console.error("에러발생 : ", e.message);
      }
    },
    [formData]
  );

  // 게임 선택 핸들러
  const handleSelectGame = useCallback(
    (e) => {
      const selectedGameId = e.target.value;
      const selected = games.find((game) => game.id === selectedGameId);
      setSelectedGame(selected);
      setFormData((prevData) => ({
        ...prevData,
        gameId: selectedGameId,
      }));
    },
    [games]
  );

  // 선택된 게임 정보는 useMemo로 메모이제이션
  const memoizedGameList = useMemo(() => {
    if (showGamesList) {
      return (
        <Select onChange={handleSelectGame}>
          <option value="">게임을 선택해주세요.</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.homeTeamName} vs {game.awayTeamName} ({game.matchDate}-
              {game.matchTime})
            </option>
          ))}
        </Select>
      );
    }
    return null;
  }, [games, showGamesList, handleSelectGame]);

  // 선택된 게임 정보는 useMemo로 메모이제이션
  const memoizedSelectedGame = useMemo(() => {
    if (selectedGame) {
      return (
        <SelectedGame>
          <p>
            선택한 경기: {selectedGame.homeTeamName} vs{" "}
            {selectedGame.awayTeamName} ({selectedGame.matchDate}:
            {selectedGame.matchTime})
          </p>
        </SelectedGame>
      );
    }
    return null;
  }, [selectedGame]);

  // 필수 입력 필드 확인 함수
  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() !==""
    );
  }, [surchGameInfo.matchDate, formData.MaxPeopleNum, formData.title]);

  return (
    <>
    <Header />
    <Body>
      <Title>글 작성하기</Title>
    <Container>
      <Form onSubmit={handleSubmit}>

        {/* 경기 정보 선택 */}
        <Game className="game-selection">
          <Label>경기 일자를 선택해주세요.</Label>
          <DateInputContainer>
            <Input
              type="date"
              name="matchDate"
              placeholder="경기 일자"
              onChange={handleSearchGameInfo}
              required
            />
            <SearchButton
              type="button"
              onClick={() => handleSearchGames(surchGameInfo.matchDate)}
            >
              경기 검색
            </SearchButton>
          </DateInputContainer>

          {/* 경기 목록 드롭다운 표시 */}
          {memoizedGameList}

          {/* 선택된 경기 표시 */}
          {memoizedSelectedGame}
        </Game>

        {/* 최대 인원 수 입력 */}
        <FormGroup>
          <Label htmlFor="maxPeopleNum">최대 인원 수</Label>
          <Input
            type="number"
            id="maxPeopleNum"
            name="maxPeopleNum"
            onChange={handleChange}
            min="2"
            required
          />
        </FormGroup>

        {/* 제목 입력 */}
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
            required
          />
        </FormGroup>

        {/* 내용 입력 */}
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            name="content"
            onChange={handleChange}
            placeholder="내용을 입력해주세요."
          />
        </FormGroup>

        {/* 제출 버튼 */}
        <SubmitButton type="submit" disabled={!isFormValid}>글작성하기</SubmitButton>
      </Form>
    </Container>
    </Body>
    </>
  );
};

export default PartyPostWrite;

// 스타일 컴포넌트 정의
const Body = styled.div`
background: #f1f5f9;
  width:100vw;
  height: 100vh;
  position:absolute;
  top:90px;
`;

const Title = styled.h1`
  margin:2rem;
  font-weight:600;
  font-size:1.7rem;
`;

const Container = styled.div`
  padding-bottom:2rem;
  background:white;
  margin: 1.8rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius:3px;
`;

const Form = styled.form`
  padding: 2rem;
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  gap:1.5rem;
`;

const Game = styled.div`
display:flex;
flex-direction:column;
gap:0.8rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size:1.2rem;
`;

const Input = styled.input`
  width: 20%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  &:focus {
  outline:none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const FormGroup = styled.div`
  display:flex;
  flex-direction:column;
  gap: 0.3rem;
`;

const Textarea = styled.textarea`
  width: 97%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 120px;
  font-size:1rem;
  &:focus {
  outline:none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchButton = styled.button`
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2563eb;
  }
`;

const Select = styled.select`
  width: 20%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
   &:focus {
  outline:none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const SelectedGame = styled.div`
  // margin-top: 1rem;
  // padding: 1rem;
  // background-color: #e9f5f0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  width: 10%;
  padding: 0.6rem 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
     &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;
