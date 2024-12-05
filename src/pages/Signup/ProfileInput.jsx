import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: 550px;
  position: relative;
  > p {
    font-size: 13px;
    grid-column: 1 / 3;
    color: #6b7280;
    font-weight: 300;
    line-height: 1.8;
  }
  > button {
    grid-row: 3 / 4;
    background-color: #dbeafe;
    color: #1d4ed8;
    font-size: 14px;
  }
  > input {
    display: none;
  }
`;

export const Title = styled.div`
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

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 50px;
`;

const ProfileInput = () => {
  const inputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState("");

  const fd = new FormData();

  const changeHandler = async (event) => {
    const selected = event.target.files[0];
    fd.append("image", selected);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/upload`,
        fd
      );
      setImageUrl(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const buttonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <ProfileWrapper>
      <Title>
        <h2>
          프로필 사진<b>*</b>
        </h2>
      </Title>
      <p>
        png,jpg,bmp 형식 등록 가능 <br />
        1:1 비율 이미지를 권장합니다.
      </p>
      <button onClick={buttonClick}>사진 등록</button>
      <input type="file" ref={inputRef} onChange={changeHandler} />
      <Image>
        {imageUrl && <img src={imageUrl} alt="profile" width={150} />}
      </Image>
    </ProfileWrapper>
  );
};

export default ProfileInput;
