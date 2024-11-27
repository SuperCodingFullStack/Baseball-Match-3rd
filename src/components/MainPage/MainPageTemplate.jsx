import styled from "styled-components";
import Body from "./Body/Body";
import SwiperComponent from "./Body/Swiper/SwiperComponent";
import Header from "./Header/Header";

const MainPageTemplate = () => {
  return (
    <MainContainer>
      <Header />
      <SwiperComponent />
      <Body />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow-x: auto;
  @media (max-width: 1507px) {
    justify-content: flex-start; /* 화면 크기가 1507px 이하일 경우 변경 */
  }
`;

export default MainPageTemplate;
