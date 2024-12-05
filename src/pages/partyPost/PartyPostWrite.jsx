import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import apiClient from "../Login/apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartyPostWrite = () => {
  const navigate = useNavigate(); // 네비이용
  const [games, setGames] = useState([]); // 원하는 날짜에 있는 게임들
  const [selectedGame, setSelectedGame] = useState(null); // 내가 고른 게임
  const [showGamesList, setShowGamesList] = useState(false); // 모달
  // api 보낼 양식
  const [formData, setFormData] = useState({
    gameId: "게임아이디",
    title: "글 제목",
    content: "글 내용",
    MaxPeopleNum: "최대인원",
  });

  // 내가 보고 싶은 날짜
  const [surchGameInfo, setSurchGameInfo] = useState({
    matchDate: "이벤트로 선택한 날짜",
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
  const handleSurchGameInfo = useCallback((e) => {
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
          <option value="">게임을 선택하세요</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.homeTeamName} vs {game.awayTeamName} ({game.matchDate}:
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
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
            required
          />
        </FormGroup>

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

        {/* 경기 정보 선택 */}
        <div className="game-selection">
          <Label>경기 정보</Label>
          <DateInputContainer>
            <Input
              type="date"
              name="matchDate"
              placeholder="경기 일자"
              onChange={handleSurchGameInfo}
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
        </div>

        {/* 제출 버튼 */}
        <SubmitButton type="submit">글작성하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default PartyPostWrite;

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
  resize: vertical;
`;

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const SearchButton = styled.button`
  font-size: 12px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const SelectedGame = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #e9f5f0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
`;
