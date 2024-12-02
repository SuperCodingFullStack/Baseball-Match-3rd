import React, { useEffect, useState } from "react";

// MyFavorite 컴포넌트 정의
const MyFavorite = () => {
  const [posts, setPosts] = useState([]); // 상태 변수로 API 데이터를 저장
  const [error, setError] = useState(null); // 에러 메시지를 저장하기 위한 상태 변수

  // 인증 토큰 (실제 사용 시, 로그인 후 받아온 토큰을 저장한 곳에서 가져옵니다.)
  const token = "your-authentication-token"; // 여기에는 실제 인증 토큰이 필요

  // 데이터를 가져오는 함수 정의
  const fetchPosts = async () => {
    try {
      // API 호출
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET", // HTTP 요청 메서드 (GET 방식)
        headers: {
          "Content-Type": "application/json", // 요청 본문의 데이터 형식
          Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가 (Bearer 형식)
        },
      });

      // 응답 상태 코드 확인
      if (!response.ok) {
        // 상태 코드가 200번대가 아닌 경우 에러 처리
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답 데이터를 JSON 형식으로 변환
      const result = await response.json();

      // API 호출 성공 시, 상태 변수에 데이터를 저장
      setPosts(result.data.partyPosts);
    } catch (err) {
      // 에러 발생 시 상태 변수에 에러 메시지 저장
      setError(err.message);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기 실행
  useEffect(() => {
    fetchPosts(); // fetchPosts 함수 호출
  }, []); // 빈 배열을 두 번째 인수로 전달하여 한 번만 실행

  return (
    <div>
      <h1>내 즐겨찾기</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}{" "}
      {/* 에러 메시지 표시 */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.teamName}</h2> {/* 팀 이름 표시 */}
            <p>{post.title}</p> {/* 게시글 제목 표시 */}
            <p>{new Date(post.createdDate).toLocaleString()}</p>{" "}
            {/* 등록 시간 표시 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFavorite;
