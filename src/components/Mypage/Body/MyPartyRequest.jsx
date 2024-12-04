import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa"; //쓰레기통
import apiClient from "../../../pages/Login/apiClient";
import MyPageIfNoDate from "../../../pages/MyPageIfNoDate";
// 인터셉터가 설정된 apiClient가져오기  자기 파일기준 상대경로 작성 위치는  페이지의 로그인에 있습니다

// 목데이터 수정

// MyFavorite 컴포넌트 정의
const MyPartyRequest = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.post("/api/party");
      setPosts(response.data.data);
      console.log("받은 데이터:", response.data.data);
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("Error fetching posts:", error);
    }
  };

  const ApiPartyPostId = async (partyPostId) => {
    try {
      const response = await apiClient.post(`/api/party/${partyPostId}`);
      if (response.data.status === "success") {
        setPosts(response.data.data);
        console.log("받은 데이터:", response.data.data);
      }
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <Container>
      <Between>
        <Title>나의 파티 요청 리스트</Title>
        <SearchInput placeholder="검색" />
      </Between>
      <FavoriteList>
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <FavoriteItem key={item.partyId}>
              <FavoriteInform>
                <FavoriteInformTitle>{item.partyTitle}</FavoriteInformTitle>
                <DivTrashIcon>
                  <FaRegTrashAlt className="trash-icon" />
                </DivTrashIcon>
              </FavoriteInform>
              <DivRegistrant>등록자: {item.partyId}</DivRegistrant>
              <PExplanation>파티 등록일: {item.gameDate}</PExplanation>
            </FavoriteItem>
          ))
        ) : (
          <MyPageIfNoDate
            title="나의 파티 요청 리스트"
            info="파티 요청이 없습니다."
          />
        )}
      </FavoriteList>
    </Container>
  );
};

export default MyPartyRequest;

const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 210px;
  width: 100%;
  background-color: #f7f9fc;
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 2em;
  padding: 0.7em;
  margin-left: -0.7em;
`;
const SearchInput = styled.input`
  background-color: aliceblue;
  width: 200px;
  height: 30px;
  font-size: large;
  padding: 10px;
  border-radius: 5px;
  margin-right: 50px;
`;
const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5em;
  max-width: 120em;
`;
const FavoriteList = styled.ul`
  background-color: white;
  width: 120em;
  height: 900px;
  display: flex;
  margin: 2em;
  margin-left: 6em;
  flex-wrap: wrap;
`;
const FavoriteItem = styled.li`
  background-color: white;
  width: 30em;
  height: 10em;
  border-radius: 0.2em;
  border: 1px solid #e1e1e1;
  margin: 50px;
  padding: 20px;
`;
const FavoriteInform = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FavoriteInformTitle = styled.h2`
  font-size: 1.25em;
  padding: 12px 12px 12px 0;
  align-items: center;
  font-weight: 900;
`;
const FavoriteInformButton = styled.button`
  background-color: #cdcbf9;
  color: #6660ed;
  font-size: 15px;
  padding: 2.5px 5px;
  height: 2em;
`;
const DivRegistrant = styled.div`
  padding: 20px 0 20px 0px;
  font-weight: 700;
`;
const PExplanation = styled.p``;

const DivTrashIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .trash-icon {
    cursor: pointer;
    padding: 5px;
    width: 1.2em;
    height: 1.2em;
    &:hover {
      color: #ff6b6b;
    }
  }
`;
