import styled from "styled-components";
import { SlBell } from "react-icons/sl";
import { BsChat } from "react-icons/bs";

const Icon = () => {
  return (
    <Container>
      <StyledChat />
      <StyledBell />
      <LoginBtn>Signup/Login</LoginBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledChat = styled(BsChat)`
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.8rem;
  text-align: center;
  &:hover {
    color: #799d40;
  }
`;

const StyledBell = styled(SlBell)`
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.8rem;
  text-align: center;
  &:hover {
    color: #799d40;
  }
`;

const LoginBtn = styled.button`
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: #799d40;
  color: white;
  margin-right: 0.8rem;
  margin-left: 0.8rem;
  &:hover {
    color: black;
  }
`;

export default Icon;
