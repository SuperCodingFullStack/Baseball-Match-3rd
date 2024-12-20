import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa"; //쓰레기통
import apiClient from "../../../pages/Login/apiClient";
// 인터셉터가 설정된 apiClient가져오기  자기 파일기준 상대경로 작성 위치는  페이지의 로그인에 있습니다

// MyFavorite 컴포넌트 정의
const MyWrite = ({}) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get(`/api/post/myList/written`);
      setPosts(response.data.data);
      console.log("받은 데이터:", response.data.data);
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // type 값이 변경될 때마다 호출

  return (
    <Container>
      <Between>
        <Title>게시글 목록</Title>
        <SerchInput placeholder="검색" />
      </Between>
      <FavoriteList>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <FavoriteItem key={post.id}>
              <FavoriteInform>
                <FavoriteInformTitle>{post.teamName}</FavoriteInformTitle>
                <FavoriteInformButton>구단정보보기</FavoriteInformButton>
                <FaRegTrashAlt />
              </FavoriteInform>
              <PExplanation>게시글 제목 : {post.title}</PExplanation>
              <PExplanation>
                게시글 등록일 : {new Date(post.createdDate).toLocaleString()}
              </PExplanation>
            </FavoriteItem>
          ))
        ) : (
          <p>게시글 목록이 비어있습니다.</p>
        )}
      </FavoriteList>
    </Container>
  );
};

export default MyWrite;

const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 210px;
  width: 100%;
  background-color: #f7f9fc;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5em;
  max-width: 120em;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 2em;
  padding: 0.7em;
  margin-left: -0.7em;
`;

const SerchInput = styled.input`
  left: 50em;
  background-color: aliceblue;
  width: 200px;
  height: 30px;
  font-size: large;
  padding: 10px;
  border-radius: 5px;
  margin-right: 50px;
`;

const FavoriteList = styled.ul`
  background-color: white;
  width: 120em;
  height: 900px;
  display: flex;
  margin: 5em;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
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
