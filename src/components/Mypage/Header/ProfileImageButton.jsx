import React from "react";
import styled from "styled-components";

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileImageButton = ({ src }) => {
  return <ProfileImage src={src} alt="Profile" />;
};

export default ProfileImageButton;
