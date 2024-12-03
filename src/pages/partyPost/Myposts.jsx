import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import apiClient from "../Login/apiClient";
import NoDataPage from "../NoDataPage";

const MyPosts = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // API 요청 함수
  const fetchMyPosts = async (page = 0) => {
    try {
      const response = await apiClient.get(`/api/post/myPosts?page=${page}`);
      if (response.data.status === "success") {
        setLists(response.data.data.partyPosts || []);
        setTotalPages(response.data.data.totalPages);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("데이터 가져오기 실패:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 렌더링 시 데이터 가져오기
  useEffect(() => {
    fetchMyPosts(currentPage);
  }, [currentPage]);

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setIsLoading(true);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : lists.length > 0 ? (
        <>
          {lists.map((data) => (
            <PostList
              key={data.id}
              id={data.id}
              myTeamImg={data.myTeamImg}
              opposingTeamImg={data.opposingTeam}
              title={data.title}
              matchDate={data.matchDate}
              matchTime={data.matchTime}
              max={data.maxPeopleNum}
              current={data.currentPeopleNum}
              like={data.likeCount}
              createAt={new Date(data.createAt).toLocaleString()}
              name={data.userNickname}
            />
          ))}
          {/* 페이지 네비게이션 */}
          <div className="pagination">
            <button
              disabled={currentPage <= 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전 페이지
            </button>
            <span>
              페이지 {currentPage + 1} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음 페이지
            </button>
          </div>
        </>
      ) : (
        <NoDataPage
        title="내가 작성한 게시글"
        info="내가 작성한 게시글이 없습니다." />
      )}
    </div>
  );
};

export default MyPosts;
