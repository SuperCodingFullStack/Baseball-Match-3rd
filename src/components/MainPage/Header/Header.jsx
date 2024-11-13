import styled from "styled-components";
import Navbar from "./Navbar";
import { CiBaseball } from "react-icons/ci";
import { Link } from "react-router-dom";
import Icon from "./icon";

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <Logo>
          <CiBaseball />
        </Logo>
      </Link>
      <Navbar />
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

const Logo = styled.div`
  display: flex;
  text-align: center;
  font-size: 3rem;
  cursor: pointer;
  color: #799d40;
`;

export default Header;
