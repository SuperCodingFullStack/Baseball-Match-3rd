import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../Login/apiClient";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState({}); // 페이지별 댓글 상태 관리
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 값
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedCommentId, setSelectedCommentId] = useState(null); // 삭제할 댓글 ID
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/comment/${postId}?page=${currentPage}&size=10`
        );
        if (response.data.status === "success") {
          const { comments, totalPages } = response.data.data;
          setComments((prevComments) => ({
            ...prevComments,
            [currentPage]: comments, // 현재 페이지의 댓글을 저장
          }));
          setTotalPages(totalPages);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("댓글을 가져오는 중 오류 발생:", error);
      }
    };

    fetchComments();
  }, [currentPage, postId]); // currentPage와 postId가 변경될 때마다 호출

  // 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await apiClient.post(`/api/comment/${postId}`, {
        content: newComment,
      });

      if (response.data.status === "success") {
        const addedComment = response.data.data;
        setComments((prevComments) => ({
          ...prevComments,
          [currentPage]: [...(prevComments[currentPage] || []), addedComment],
        }));
        setNewComment(""); // 입력 필드 초기화
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async () => {
    try {
      await apiClient.delete(`/api/comment/${selectedCommentId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [currentPage]: prevComments[currentPage].filter(
          (comment) => comment.commentId !== selectedCommentId
        ),
      }));
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  // 현재 페이지의 댓글 가져오기
  const displayedComments = comments[currentPage] || [];

  return (
    <div>
      {/* 댓글 입력 */}
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>작성하기</button>
      </div>

      {/* 댓글 목록 */}
      {displayedComments.length === 0 ? (
        <p>댓글이 없습니다! 댓글을 작성해주세요.</p>
      ) : (
        <CommentList
          comments={displayedComments}
          onDelete={(id) => {
            setSelectedCommentId(id);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* 페이지네이션 */}
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          disabled={currentPage + 1 >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <CommentModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteComment}
        />
      )}
    </div>
  );
};

const CommentList = ({ comments, onDelete }) => (
  <ul>
    {comments.map((comment) => (
      <CommentItem
        key={comment.commentId}
        comment={comment}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

const CommentItem = ({ comment, onDelete }) => {
  console.log("댓글 객체 구조 확인", comment); // 댓글 객체의 구조 확인
  return (
    <li>
      {comment.content}
      <button onClick={() => onDelete(comment.commentId)}>x</button>
    </li>
  );
};

const CommentModal = ({ onClose, onConfirm }) => (
  <div className="modal">
    <p>댓글을 삭제하시겠습니까?</p>
    <button onClick={onConfirm}>확인</button>
    <button onClick={onClose}>취소</button>
  </div>
);

export default Comment;
