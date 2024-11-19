import React from "react";
import Header from "../components/Mypage/Header/Header";
import UserProfileSection from "../components/Mypage/Header/UserProfileSection";
import Body from "../components/Mypage/Body/Body";
import styled from "styled-components";

const MypageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <MypageContainer>
      <Header />
      <UserProfileSection />
      <Body />
    </MypageContainer>
  );
};

export default App;
