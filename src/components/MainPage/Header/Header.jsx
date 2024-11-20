import styled from "styled-components";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Icon from "./icon";

const Header = () => {
  return (
    <Container>
      <LeftSection>
        <Link to="/">
          <Logo>
            <LogoImg src="../../../../public/assets/logo.png" />
          </Logo>
        </Link>
        <Navbar />
      </LeftSection>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 90px;
  height: 90px;
  cursor: pointer;
`;

export default Header;
