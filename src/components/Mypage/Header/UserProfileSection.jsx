import React from "react";
import styled from "styled-components";
import FriendsListButton from "./FriendsListButton";
import ProfileImageButton from "./ProfileImageButton";
import UserNickname from "./UserNickname";
import FriendCountButton from "./FriendCountButton";

const ProfileSectionContainer = styled.div`
  background-color: #f0f0f0; /* Gray color similar to body background */
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
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

const UserProfileSection = () => {
  return (
    <ProfileSectionContainer>
      <LeftSection>
        <ProfileImageButton src="https://via.placeholder.com/40" />
        <UserNickname name="John Doe" />
      </LeftSection>
      <RightSection>
        <FriendsListButton />
        <FriendCountButton count={42} />
      </RightSection>
    </ProfileSectionContainer>
  );
};

export default UserProfileSection;
