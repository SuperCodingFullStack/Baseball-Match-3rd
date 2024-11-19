import { useState } from "react";
import styled, { keyframes } from "styled-components";
import DropdownTeam from "./DropdownTeam";
import DropdownPost from "./DropdownPost";
import DropdownFriends from "./DropdownFriends";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <NavbarContainer>
        <NavItem
          onMouseOver={() => handleMouseEnter("teamInfo")}
          onMouseOut={handleMouseLeave}
        >
          구단 정보
        </NavItem>

        <NavItem
          onMouseOver={() => handleMouseEnter("posts")}
          onMouseOut={handleMouseLeave}
        >
          게시글
        </NavItem>

        <NavItem
          onMouseOver={() => handleMouseEnter("friends")}
          onMouseOut={handleMouseLeave}
        >
          친구
        </NavItem>
      </NavbarContainer>

      {activeDropdown === "teamInfo" && (
        <DropdownMenu
          onMouseOver={() => handleMouseEnter("teamInfo")}
          onMouseOut={handleMouseLeave}
        >
          <DropdownItem>
            <DropdownTeam />
          </DropdownItem>
        </DropdownMenu>
      )}

      {activeDropdown === "posts" && (
        <DropdownMenu
          onMouseOver={() => handleMouseEnter("posts")}
          onMouseOut={handleMouseLeave}
        >
          <DropdownItem>
            <DropdownPost />
          </DropdownItem>
        </DropdownMenu>
      )}

      {activeDropdown === "friends" && (
        <DropdownMenu
          onMouseOver={() => handleMouseEnter("friends")}
          onMouseOut={handleMouseLeave}
        >
          <DropdownItem>
            <DropdownFriends />
          </DropdownItem>
        </DropdownMenu>
      )}
    </>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 9rem;
  height: 5.5rem;
  &:hover {
    border-bottom: 5px solid #acfe49;
    transition: border-bottom 0.3s ease;
  }
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
  z-index: 5;
  position: absolute;
  top: 100%;
  width: 100%;
  animation: ${dropdownAnimation} 0.8s ease forwards;
`;

const DropdownItem = styled.div`
  color: black;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

export default Navbar;
