import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState({
    team: false,
    post: false,
    friend: false,
  });

  const handleDropdownToggle = (menu) => {
    // 이전 상태를 기반으로 새로운 상태 설정
    setDropdownOpen((prev) => ({
      ...prev, // 이전 상태 유지
      [menu]: !prev[menu], // 속성의 값 반전
    }));
  };

  return (
    <NavbarContainer>
      <NavItem onClick={() => handleDropdownToggle("team")}>
        구단 관리 <FaChevronDown />
        {isDropdownOpen.team && (
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem>롯데 자이언츠</DropdownItem>
            <DropdownItem>두산 베어스</DropdownItem>
            <DropdownItem>LG Twins</DropdownItem>
            <DropdownItem>KT wiz</DropdownItem>
            <DropdownItem>한화 이글스</DropdownItem>
            <DropdownItem>NC Dinos</DropdownItem>
            <DropdownItem>기아 타이거즈</DropdownItem>
            <DropdownItem>키움 히어로즈</DropdownItem>
            <DropdownItem>삼성 라이온즈</DropdownItem>
            <DropdownItem>SSG Landers</DropdownItem>
          </DropdownMenu>
        )}
      </NavItem>
      <NavItem onClick={() => handleDropdownToggle("post")}>
        게시글 관리 <FaChevronDown />
        {isDropdownOpen.post && (
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem>게시판</DropdownItem>
            <DropdownItem>내가 작성한 게시글</DropdownItem>
          </DropdownMenu>
        )}
      </NavItem>
      <NavItem onClick={() => handleDropdownToggle("friend")}>
        친구 <FaChevronDown />
        {isDropdownOpen.friend && (
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem>나의 친구목록</DropdownItem>
          </DropdownMenu>
        )}
      </NavItem>
      <NavLink to="/mypage">마이 페이지</NavLink>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  padding: 1rem;
`;

const NavItem = styled.div`
  cursor: pointer;
  margin-right: 4rem;
  display: inline-block;
  padding: 10px;
  &:hover {
    color: #799d40;
  }
`;

const DropdownMenu = styled.div`
  background-color: white;
  position: absolute;
  margin-top: 1.7rem;
  justify-content: center;
`;

const DropdownItem = styled.div`
  color: black;
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  padding: 0.4rem 0.2rem;
  &:hover {
    background-color: #dbdbdb;
    color: #799d40;
  }
`;

const NavLink = styled(Link)`
  display: inline-block;
  text-align: center;
  font-weight: 400;
  color: black;
  padding: 10px;
  border-radius: 0.2rem;
  &:hover {
    color: #799d40;
  }
`;

export default Navbar;
