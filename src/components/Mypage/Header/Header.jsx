import React from "react";
import styled from "styled-components";
import AlarmButton from "./Alam";
import SettingsButton from "./Option";
import FriendsListButton from "./FriendsListButton";
import ProfileImageButton from "./ProfileImageButton";
import UserNickname from "./UserNickname";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100rem;
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
        <SettingsButton />
        <FriendsListButton />
      </LeftSection>
      <RightSection>
        <ProfileImageButton src="https://via.placeholder.com/40" />
        <UserNickname name="John Doe" />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
