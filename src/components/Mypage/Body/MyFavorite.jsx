import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 210px;
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 2em;
  padding: 0.7em;
`;
const FavoriteList = styled.ul`
  background-color: white;
  width: 100em;
  height: 930px;
  display: flex;
`;
const FavoriteItem = styled.li`
  background-color: white;
  width: 30em;
  height: 10em;
  border-radius: 0.2em;
  border: 1px solid #e1e1e1;
  margin: 50px;
  padding: 20px;
`;
const FavoriteInform = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FavoriteInformTitle = styled.h2`
  font-size: 1.25em;
  padding: 12px 12px 12px 0;
  align-items: center;
  font-weight: 900;
`;
const FavoriteInformButton = styled.button`
  background-color: #cdcbf9;
  color: #6660ed;
  font-size: 15px;
  padding: 2.5px 5px 2.5px 5px;
  height: 2em;
`;

const DivRegistrant = styled.div`
  padding: 20px 0 20px 0px;
  font-weight: 700;
`;

const PExplanation = styled.p``;

const MyFavorite = () => {
  return (
    <Container>
      <Title>내 즐겨찾기</Title>
      <FavoriteList>
        <FavoriteItem>
          <FavoriteInform>
            <FavoriteInformTitle>기아타이거즈</FavoriteInformTitle>
            <FavoriteInformButton>구단정보보기</FavoriteInformButton>
          </FavoriteInform>
          <DivRegistrant>등록자 : </DivRegistrant>
          <PExplanation>게시글 제목</PExplanation>
          <PExplanation>등록 시간</PExplanation>
        </FavoriteItem>
      </FavoriteList>
    </Container>
  );
};

export default MyFavorite;
