import styled from "styled-components";
import { LiaUserFriendsSolid } from "react-icons/lia";

const DropdownFriends = () => {
  return (
    <FriendsContainer>
      <MyFriends>
        <StyledIcon as={LiaUserFriendsSolid} /> 친구 목록
      </MyFriends>
    </FriendsContainer>
  );
};

const FriendsContainer = styled.div`
  z-index: 5;
  width: 100vw;
  position: absolute;
  top: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const IconInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  margin: 0 1rem;
  &:hover {
    color: #799d40;
    text-decoration: underline;
    text-decoration-style: solid;
  }
`;

const MyFriends = styled(IconInfo)``;

const StyledIcon = styled.div`
  font-size: 4rem;
  color: black;
  padding-bottom: 1rem;
  ${({ as }) => as === LiaUserFriendsSolid && "stroke-width: 0.02rem;"}
`;

export default DropdownFriends;
