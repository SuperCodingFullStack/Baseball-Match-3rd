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
`;

export default MainPageTemplate;
