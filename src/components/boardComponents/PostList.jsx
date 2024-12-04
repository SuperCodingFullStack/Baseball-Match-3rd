import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const PostList = ({ lists, currentPage, itemsPerPage, onEdit, onView, onPageChange }) => {
  const totalPages = Math.ceil(lists.length / itemsPerPage);
  const paginatedLists = lists.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <>
      <PostContainer>
        {paginatedLists.map((data) => (
          <PostListItem key={data.id} data={data} onEdit={onEdit} onView={onView} />
        ))}
      </PostContainer>
      <Pagination>
        <button
          disabled={currentPage <= 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          이전 페이지
        </button>
        <span>
          페이지 {currentPage + 1} / {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
        >
          다음 페이지
        </button>
      </Pagination>
    </>
  );
};

const PostContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default PostList;
