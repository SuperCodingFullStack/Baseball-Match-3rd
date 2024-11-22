import styled, { keyframes } from "styled-components";
import { SlBell } from "react-icons/sl";
import { useState, useEffect, useRef } from "react";
import { SlUser } from "react-icons/sl";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoSettingsOutline, IoChatbubbleOutline } from "react-icons/io5";
import { PiUserListBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Icon = () => {
  const navigate = useNavigate();
  const handleMypageBtnClick = () => {
    navigate("/mypage");
  };
  const handleSignupBtnClick = () => {
    navigate("/signup");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const handleProfileClick = (event) => {
    setIsDropdownOpen((prev) => !prev); // 드롭다운 토글(상태 반전)
    event.stopPropagation(); // 클릭 이벤트 전파 차단
  };

  // 드롭다운 외부 클릭시 닫히도록 하는 기능
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && // 드롭다운이 존재하는지
        !dropdownRef.current.contains(event.target) && // 클릭한 곳이 드롭다운 내부가 아니라면
        !profileRef.current.contains(event.target) // 클릭한 곳이 프로필 내부가 아니라면
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <StyledIcon as={IoChatbubbleOutline} />
      <StyledIcon as={SlBell} />
      <Profile
        ref={profileRef}
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        onClick={handleProfileClick}
      />
      {isDropdownOpen && (
        <DropdownMenu ref={dropdownRef}>
          <DropdownItem onClick={handleMypageBtnClick}>
            <SlUser /> 마이페이지
          </DropdownItem>
          <DropdownItem>
            <IoSettingsOutline /> 설정
          </DropdownItem>
          <DropdownItem>
            <LuLogIn /> 로그인
          </DropdownItem>
          <DropdownItem onClick={handleSignupBtnClick}>
            <PiUserListBold /> 회원가입
          </DropdownItem>
          <DropdownItem>
            <LuLogOut /> 로그아웃
          </DropdownItem>
        </DropdownMenu>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.8rem;
  text-align: center;
  &:hover {
    color: #acfe49;
  }
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.8rem;
`;

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  animation: ${dropdownAnimation} 0.5s ease forwards;
`;

const DropdownItem = styled.div`
  z-index: 10;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.2rem;
  gap: 0.625rem;
  padding-left: 0.5rem;
  padding-right: 4rem;
  &:hover {
    background-color: #f4f4f4;
    border-radius: 0.3rem;
  }
`;

export default Icon;
