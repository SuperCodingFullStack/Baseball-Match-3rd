import React from "react";
import styled from "styled-components";
import RequestFriendsList from "./RequestFriendsList";

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  gap: 2rem; /* Add space between items */
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  width: auto; /* Full width of the container */
  max-width: 1920px; /* Ensure consistent width */
  margin: 0 auto; /* Center on the page */
`;

// const BodyWrapper = styled.div`
//   min-height: auto; /* Full height of the viewport */
//   width: 100%; /* Full width of the viewport */
//   z-index: 10;
//   max-width: 1920px; /* Limit to 1920px for large screens */
//   margin: 0 auto; /* Center the content */
//   padding: 2rem;
//   background-color: #f4f4f4;
//   /* display: grid; */
//   gap: 2rem;
//   grid-template-columns: repeat(
//     auto-fit,
//     minmax(300px, 1fr)
//   ); /* Auto adjust columns */
//   justify-items: center;
// `;
const sendFriendRequest = async () => {
  try {
    const yourAuthToken = localStorage.getItem("jwtToken"); // 인증 토큰 예시
    const response = await fetch(`/api/post/${post_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourAuthToken}`, // 필요 시 인증 토큰 추가
      },
    });

    if (response.ok) {
      alert("친구 요청이 성공적으로 보내졌습니다.");
    } else {
      alert("친구 요청에 실패했습니다. 다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
    alert("오류가 발생했습니다. 다시 시도해 주세요.");
  }
};

const data = response.data;
const title = data.title;

const SectionContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: auto; /* Set a fixed width for each section */
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const LinkButton = styled.button`
  background-color: #40cf66;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33a956;
  }
`;

const BulletinBoard = ({ title, items }) => (
  <SectionContainer>
    <LinkButton>더보기</LinkButton>
    <SectionTitle>{title}</SectionTitle>
    {items.map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </SectionContainer>
);

const Body = () => {
  return (
    <BodyWrapper>
      <BulletinBoard title="나의 작성글" items={[title, title, title]} />
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
