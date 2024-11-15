import styled from "styled-components";
import SwiperComponent from "./Swiper/SwiperComponent";

const Body = () => {
  return (
    <BodyContainer>
      <SwiperComponent />
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Body;
