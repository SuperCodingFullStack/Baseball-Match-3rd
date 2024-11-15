import styled from "styled-components";
import { GoPencil } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";
import { IoClipboardOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";

const DropdownPost = () => {
  return (
    <PostContainer>
      <WritePost>
        <StyledIcon as={GoPencil} />글 작성하기
      </WritePost>
      <Board>
        <StyledIcon as={IoClipboardOutline} /> 게시판
      </Board>
      <MyPost>
        <StyledIcon as={LuClipboardEdit} /> 내가 쓴 게시물
      </MyPost>
      <LikePost>
        <StyledIcon as={IoHeartOutline} /> 좋아요 한 게시물
      </LikePost>
    </PostContainer>
  );
};

const PostContainer = styled.div`
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

const StyledIcon = styled.div`
  font-size: 4rem;
  color: black;
  padding-bottom: 1rem;
  ${({ as }) => as === LuClipboardEdit && "stroke-width: 0.09rem;"}
`;

const WritePost = styled(IconInfo)``;
const Board = styled(IconInfo)``;
const LikePost = styled(IconInfo)``;
const MyPost = styled(IconInfo)``;

export default DropdownPost;
