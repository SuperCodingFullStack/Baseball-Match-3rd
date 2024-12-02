import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import RequestFriendsList from "./RequestFriendsList";

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  max-width: 1920px;
  margin: 0 auto;
`;

const Body = () => {
  const [data, setData] = useState({ title: "", items: [] }); // title과 items 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `"http://localhost:8080/api/post/${post_id}`
        ); // API 호출
        if (!response.ok) {
          throw new Error("API 호출 실패");
        }
        const result = await response.json(); // JSON 형식으로 데이터 파싱
        const { title, items } = result; // API 응답에서 title과 items 추출
        setData({ title, items }); // 상태에 저장
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    fetchData(); // 컴포넌트가 마운트되면 API 호출
  }, []);

  return (
    <BodyWrapper>
      <BulletinBoard title={data.title} items={data.items} />
      {/* 내가쓴글 */}
      <BulletinBoard
        title="나의 즐겨찾기"
        items={["Favorite 1", "Favorite 2", "Favorite 3"]}
      />
      <BulletinBoard
        title="파티 요청"
        items={["Request 1", "Request 2", "Request 3"]}
      />
      <BulletinBoard
        title="참여파티 목록"
        items={["Party 1", "Party 2", "Party 3"]}
      />

      <RequestFriendsList />
    </BodyWrapper>
  );
};

export default Body;
