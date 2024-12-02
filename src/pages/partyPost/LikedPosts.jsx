import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import apiClient from "../Login/apiClient";

const LikedPosts = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태

  useEffect(() => {
    const fetchLikedPosts = async (page = 0) => {
      try {
        const response = await apiClient.get(
          `/api/post/likedPosts?page=${page}`
        );
        if (response.data.status === "success") {
          setLists(response.data.data.partyPosts || []);
          setTotalPages(response.data.data.totalPages || 1); // API 응답에서 전체 페이지 수 설정
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        console.error("데이터 가져오기 실패:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedPosts(currentPage);
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  // 페이지 변경 처리 함수
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

          {/* 페이지네이션 컨트롤 */}
          <div className="pagination-controls">
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
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default LikedPosts;
