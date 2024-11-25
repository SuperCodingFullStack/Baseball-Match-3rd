import styled from "styled-components";
import WeeklyCalendar from "./WeeklyCalendar";

const Body = () => {
  return (
    <BodyContainer>
      <WeeklyCalendar />
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
`;

export default Body;
