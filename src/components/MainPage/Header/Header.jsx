import styled from "styled-components";
import Navbar from "./Navbar";
import { FaBaseballBatBall } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Icon from "./icon";

const Header = () => {
  return (
    <Container>
      <LeftSection>
        <Link to="/">
          <Logo>
            <FaBaseballBatBall />
            Ball Mate
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
  border-bottom: 1px solid #dbdbdb;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  text-align: center;
  font-size: 3rem;
  cursor: pointer;
  color: #799d40;
  align-items: center;
`;

export default Header;
