import styled from "styled-components";
import { GoPencil } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";
import { IoClipboardOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DropdownPost = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!Cookies.get("Authorization");

  const handleBoardBtnClick = () => {
    if(!isLoggedIn){
      alert("로그인 후 이용 가능한 페이지입니다.");
      navigate("/login");}
      else {
    navigate("/partyPosts");}
  };
  
  const handlePostWriteBtnClick = () => {
    if(!isLoggedIn){
      alert("로그인 후 이용 가능한 페이지입니다.");
      navigate("/login");}
      else {
    navigate("/postWrite");}
  };

  const handleMyPostBtnClick = () => {
    if(!isLoggedIn){
      alert("로그인 후 이용 가능한 페이지입니다.");
      navigate("/login");}
      else {
    navigate("/myPosts");}
  };

  const handleLikePostBtnClick = () => {
    if(!isLoggedIn){
      alert("로그인 후 이용 가능한 페이지입니다.");
      navigate("/login");}
      else {
    navigate("/myLikePosts");}
  };

  return (
    <PostContainer>
      <WritePost>
        <StyledIcon as={GoPencil} onClick={handlePostWriteBtnClick} />글
        작성하기
      </WritePost>
      <Board>
        <StyledIcon as={IoClipboardOutline} onClick={handleBoardBtnClick} />{" "}
        게시판
      </Board>
      <MyPost>
        <StyledIcon as={LuClipboardEdit} onClick={handleMyPostBtnClick}/> 내가 작성한 게시글
      </MyPost>
      <LikePost>
        <StyledIcon as={IoHeartOutline} onClick={handleLikePostBtnClick}/> 좋아요 한 게시물
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
  color: gray;
  &:hover {
    color: black;
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
