import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import apiClient from "../Login/apiClient";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostModification = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGamesList, setShowGamesList] = useState(false);

  const [formData, setFormData] = useState({
    gameId: "",
    title: "",
    content: "",
    maxPeopleNum: 2,
  });

  const [surchGameInfo, setSurchGameInfo] = useState({
    matchDate: "",
  });

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // 날짜 포맷이 "10.01 화" 형식인 경우 처리
    const [monthDay] = dateString.split(" "); // "10.01" 분리
    const [month, day] = monthDay.split("."); // "10"과 "01" 분리

    const currentYear = new Date().getFullYear();

    // 결과 조합
    return `${currentYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // 수정할 글 정보 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await apiClient.get(`/api/post/${postId}`);
        console.log("수정하고 싶은 세부 글에 대한 응답객체?", response);

        const data = response.data.data;

        setFormData({
          title: data.title,
          content: data.content,
          maxPeopleNum: data.maxPeopleNum,
          gameId: data.gameId || "",
        });

        setSurchGameInfo({ matchDate: formatDate(data.matchDate) });
        console.log("날짜 변환이 잘되었나?", formatDate(data.matchDate));
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  // 경기 검색
  const handleSearchGames = useCallback(async (matchDate) => {
    console.log("경기 검색버튼 누를 때 요청하는날짜", matchDate);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameMatchDate?matchDate=${matchDate}`
      );

      console.log("겜 요청해서 잘 가져왔어?", response);

      if (response.data.status === "success") {
        setGames(response.data.data);
        setShowGamesList(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("Error occurred while fetching games:", e.message);
    }
  }, []);

  // formData 변경
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // surchGameInfo 변경
  const handleSurchGameInfo = useCallback((e) => {
    const { name, value } = e.target;
    console.log("이벤트를 통해 들어오는 이름과 값이 무어냐", name, value);

    setSurchGameInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // 수정 요청
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        console.log("보내는 요청바디?", formData);

        const response = await apiClient.put(`/api/post/${postId}`, formData);
        if (response.data.status === "success") {
          alert(response.data.message);
          setTimeout(() => {
            navigate(`/partyPost/${response.data.data.id}`);
          }, 1000);
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        console.error("Error occurred while submitting form:", e.message);
      }
    },
    [formData, navigate, postId]
  );

  // 게임 선택
  const handleSelectGame = useCallback(
    (e) => {
      const selectedGameId = e.target.value;
      console.log(
        "selectedGameId는? 내가 고른 게임의 아이디는?",
        selectedGameId
      );

      console.log("games 배열:", games);
      const selected = games.find(
        (game) => String(game.id) === String(selectedGameId)
      );
      console.log("최종으로 내가 고른 게임객체는? ", selected);

      setSelectedGame(selected);
      setFormData((prevData) => ({
        ...prevData,
        gameId: selectedGameId,
      }));
    },
    [games]
  );

  // memoized 게임 리스트
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

  // memoized 선택된 게임
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
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="maxPeopleNum">최대 인원 수</Label>
          <Input
            type="number"
            id="maxPeopleNum"
            name="maxPeopleNum"
            value={formData.maxPeopleNum}
            onChange={handleChange}
            min="2"
            required
          />
        </FormGroup>

        <div className="game-selection">
          <Label>경기 정보</Label>
          <DateInputContainer>
            <Input
              type="date"
              name="matchDate"
              value={surchGameInfo.matchDate}
              onChange={handleSurchGameInfo}
            />
            <SearchButton
              type="button"
              onClick={() => handleSearchGames(surchGameInfo.matchDate)}
            >
              경기 검색
            </SearchButton>
          </DateInputContainer>
          {memoizedGameList}
          {memoizedSelectedGame}
        </div>

        <SubmitButton type="submit">글 수정하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default PostModification;

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
  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  &:hover {
    background-color: #218838;
  }
`;
