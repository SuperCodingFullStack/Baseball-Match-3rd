import React, { useState, useEffect } from "react";
import apiClient from "../Login/apiClient";
import Header from "../../components/MainPage/Header/Header";
import PostList from "../../components/boardComponents/PostList";
import styled from "styled-components";

const MyPosts = () => {
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await apiClient.get(`/api/post/myPosts`);
        setLists(response.data.data.partyPosts || []);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchMyPosts();
  }, []);

  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handleView = (id) => navigate(`/partyPost/${id}`);
  const handleEdit = (id) => navigate(`/modification/${id}`);
  const title = "내가 작성한 게시글";
  const info = "내가 작성한 게시글이 없습니다."

  return (
    <div>
      <Header />
      <Body>
      <Title>내가 작성한 게시글</Title>
      <Container>
      <PostList
        lists={lists}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onEdit={handleEdit}
        onView={handleView}
        onPageChange={handlePageChange}
        title={title}
        info={info}
      />
      </Container>
      </Body>
    </div>
  );
};

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
`;



export default MyPosts;