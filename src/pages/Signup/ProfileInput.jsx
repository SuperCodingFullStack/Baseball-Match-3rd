import React from "react";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: 550px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  > h2 {
    font-size: 18px;
    font-weight: 600;
    b {
      color: rgb(239, 68, 68);
      margin-left: 5px;
    }
  }
`;

const ProfileInput = () => {
  return (
    <ProfileWrapper>
      <Title>
        <h2>
          프로필 사진<b>*</b>
        </h2>
      </Title>
    </ProfileWrapper>
  );
};

export default ProfileInput;
