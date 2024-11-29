import React from "react";
import MypageHeader from "../components/Mypage/Header/Header";
import Header from "../components/MainPage/Header/Header";
// import UserProfileSection from "../components/Mypage/Header/UserProfileSection";
import Body from "../components/Mypage/Body/Body";
import styled from "styled-components";
import Footer from "../components/Mypage/Footer/LogoutBtn";
import MenuBar from "../components/Mypage/LeftSection/MenuBar";
import MainContents from "../components/Mypage/Body/MainContents";
import SendFriendRequestButton from "../components/Mypage/Body/SendFriendRequestButton";

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
      <MenuBar />
      <MainContents />
      <Footer />
    </MypageContainer>
  );
};

export default App;
