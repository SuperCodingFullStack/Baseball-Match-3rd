import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTeamLogo } from "../../../utils/getTeamLogo";
import apiClient from "../../../pages/Login/apiClient";
import MyPageIfNoDate from "../../../pages/MyPageIfNoDate";
import PostListLayout from "./PostListLayout";

const MyWrite = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지네이션 관련 state 추가
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil((posts?.length || 0) / itemsPerPage);

  // 페이지네이션된 데이터 계산
  const paginatedPosts = posts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/api/post/myList/written");
      setPosts(response.data.data || []);
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 팀 로고 컴포넌트
  const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

  // 게시글 상세 페이지로 이동
  const move = (id) => {
    navigate(`/partyPost/${id}`);
    console.log("Move to post:", id);
  };

  // 수정 페이지로 이동
  const moveToEditPage = (id) => {
    // navigate(`/modification/${id}`);
    console.log("Move to edit:", id);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!posts.length)
    return (
      <Container>
        <MyPageIfNoDate title="내가 쓴글" info="내가쓴글이 없습니다." />
      </Container>
    );

  return (
    <PostListLayout
      title="게시글 목록"
      posts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onMove={move}
      onEdit={moveToEditPage}
      TeamLogo={TeamLogo}
    />
  );
};

export default MyWrite;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;
