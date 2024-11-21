import React from "react";
import Header from "../components/Mypage/Header/Header";
// import UserProfileSection from "../components/Mypage/Header/UserProfileSection";
import Body from "../components/Mypage/Body/Body";
import styled from "styled-components";
import Footer from "../components/Mypage/Footer/LogoutBtn";

const MypageContainer = styled.div`
  width: auto;
  max-width: 1920px;
  min-height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  z-index: 10;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  margin: 0 auto;
`;

const App = () => {
  return (
    <MypageContainer>
      <Header />
      {/* <UserProfileSection /> */}
      <Body />
      <Footer />
    </MypageContainer>
  );
};

export default App;
