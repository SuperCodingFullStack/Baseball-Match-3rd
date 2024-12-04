import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../../../pages/Login/apiClient";
import { getTeamLogo } from "../../../utils/getTeamLogo";
import PostListLayout from "./PostListLayout";
import { useNavigate } from "react-router-dom";
import MyPageIfNoDate from "../../../pages/MyPageIfNoDate"; //

const MyPartyRequest = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 팀 로고 컴포넌트
  const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const [partyResponse] = await Promise.all([apiClient.get("/api/party")]);

      const combinedPosts = [...partyResponse.data.data];
      setPosts(combinedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const move = (postId) => {
    navigate(`/party/${postId}`);
  };

  const moveToEditPage = (postId) => {
    navigate(`/party/edit/${postId}`);
  };

  if (!posts.length) {
    return (
      <Container>
        <MyPageIfNoDate
          title="내가 신청한 파티"
          info="신청한 파티가 없습니다."
        />
      </Container>
    );
  }

  return (
    <PostListLayout
      title="내가 신청한 파티"
      posts={posts}
      currentPage={currentPage}
      totalPages={Math.ceil(posts.length / 9)}
      onPageChange={handlePageChange}
      onMove={move}
      onEdit={moveToEditPage}
      TeamLogo={TeamLogo}
    />
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

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;
