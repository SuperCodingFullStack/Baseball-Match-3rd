import React from "react";
import styled from "styled-components";
import AlarmButton from "./AlarmButton";
import Option from "./Option"; // Renamed from SettingsButton
import FriendAddButton from "./FriendAddButton";

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  background-color: #40cf66;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <AlarmButton />
        <Option />
      </LeftSection>
      <RightSection>
        <FriendAddButton />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
