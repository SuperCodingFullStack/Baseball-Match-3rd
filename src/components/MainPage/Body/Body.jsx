import styled from "styled-components";
// import WeeklyCalendar from "./WeeklyCalendar";
import MonthlyCalendar from "./MonthlyCalendar";

const Body = () => {
  return (
    <BodyContainer>
      {/* <WeeklyCalendar /> */}
      <MonthlyCalendar />
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
`;

export default Body;
