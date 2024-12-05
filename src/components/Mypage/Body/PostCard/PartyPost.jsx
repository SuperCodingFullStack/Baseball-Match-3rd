import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../../../../api/apiClient";
import Map from "../../../../components/board/Map";
import Header from "../../../../components/MainPage/Header/Header";
import { getTeamLogo } from "../../../../utils/getTeamLogo";
import Comment from "./Comment";
import { useNavigate, useParams } from "react-router-dom";

const partyPost = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [isLiked, setIsLiked] = useState(false); // 좋아요 눌렸는지 아닌지 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태
  const navigate = useNavigate(); // 네비이용

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/api/post/${postId}`);
        console.log("전체 객체 >>", response);

        if (response.data.status === "success") {
          console.log(response.data.message);
          console.log("저장되는 값: >>>>", response.data.data);

          setPost(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        console.error("에러발생 : ", e.message);
      }
    };

    const hitUp = async () => {
      try {
        const response = await apiClient.post(`/api/hit/${postId}`);
        console.log("전체 객체 >>", response);

        if (response.data.status === "success") {
          console.log(response.data.message);
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        console.error("에러발생 : ", e.message);
      }
    };

    const fetchData = async () => {
      await hitUp(); // 조회수 증가 요청
      await fetchIsLiked();
      await fetchPost(); // 포스트 정보 가져오기
    };

    fetchData();
  }, []);

  // 로고 이미지 가져오는거
  const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

  // 서버에서 현재 좋아요 상태 가져오기
  const fetchIsLiked = async () => {
    try {
      const response = await apiClient.get(`/api/like/isLike/${postId}`);
      setIsLiked(response.data.data); // 서버에서 받은 true/false 저장
    } catch (error) {
      console.error("좋아요 상태 가져오기 실패:", error);
    }
  };

  // 좋아요 토글 함수
  const toggleLike = async () => {
    try {
      const response = await apiClient.patch(`/api/like/${postId}`);
      if (response.data.status === "success") {
        // 성공 시 로컬 상태를 업데이트
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setPost((prevPost) => ({
          ...prevPost,
          likeCount: isLiked ? prevPost.likeCount - 1 : prevPost.likeCount + 1,
        }));
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("좋아요 토글 중 에러 발생:", e.message);
    }
  };
  // 글 삭제하는 함수
  const deletePost = async () => {
    try {
      console.log("postId는?", postId);

      const response = await apiClient.delete(`/api/post/${postId}`);
      if (response.data.status === "success") {
        alert("글이 삭제되었습니다.");
        setTimeout(() => {
          navigate(`/partyPosts`);
        }, 1000); // 1초 지연 후 페이지 이동
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error("글 삭제 중 에러 발생:", e.message);
      alert("글 삭제에 실패했습니다.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <Container>
      {/* <Header /> */}
      {post ? (
        <PostWrapper>
          <ImageSection>
            <TeamLogo teamName={post.myTeamImg} />
            <VsImage src="vs이미지주소" alt="vs" />
            <TeamLogo teamName={post.opposingTeam} />
          </ImageSection>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          <MapSection>
            {/* <Map
              latitude={parseFloat(post.latitude)}
              longitude={parseFloat(post.longitude)}
            /> */}
            <div>임시 지도</div>
          </MapSection>
          <StatsContainer>
            <LikeContainer>
              <LikeIcon
                onClick={toggleLike}
                style={{ color: isLiked ? "#e83e8c" : "black" }}
              >
                ♡
              </LikeIcon>
              <LikeCount>{post.likeCount}</LikeCount>
            </LikeContainer>
            <ViewsContainer>
              <ViewsLabel>조회수</ViewsLabel>
              <ViewCount>{post.hitCount}</ViewCount>
            </ViewsContainer>
            <div>
              <div
                onClick={() => navigate(`/modification/${postId}`)}
                style={{ cursor: "pointer" }}
              >
                수정하기
              </div>
              <div
                onClick={() => setShowDeleteModal(true)}
                style={{ cursor: "pointer" }}
              >
                삭제하기
              </div>
            </div>
            <div> 이곳은 파티참여버튼 입니다 만들어주세요</div>
          </StatsContainer>
          <ProfileSection>
            <ProfileImage>
              <img src="프로필 이미지 주소" alt="프로필 이미지" />
            </ProfileImage>
            <UserInfo>
              <Nickname>{post.userNickname}</Nickname>
              <Location>주소</Location>
            </UserInfo>
            <ProfileDetailModal>상세프로필보기모달</ProfileDetailModal>
          </ProfileSection>
          <CommentsSection>
            <CommentCount>댓글 총 0 개</CommentCount>
            <CommentList>
              <Comment postId={postId} />
            </CommentList>
          </CommentsSection>
        </PostWrapper>
      ) : (
        <LoadingText>로딩 중...</LoadingText>
      )}
      <FooterNav>하단고정네비</FooterNav>
      {showDeleteModal && (
        <DeleteModal>
          <p>삭제하시겠습니까?</p>
          <div onClick={deletePost} style={{ cursor: "pointer" }}>
            삭제
          </div>
          <div
            onClick={() => setShowDeleteModal(false)}
            style={{ cursor: "pointer" }}
          >
            취소
          </div>
        </DeleteModal>
      )}
    </Container>
  );
};

export default partyPost;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

const VsImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 15px;
  color: #343a40;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #495057;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const MapSection = styled.div`
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LikeIcon = styled.span`
  font-size: 1.5rem;
  color: #e83e8c;
`;

const LikeCount = styled.span`
  font-size: 1rem;
  color: #6c757d;
`;

const ViewsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ViewsLabel = styled.span`
  font-size: 1rem;
  color: #6c757d;
`;

const ViewCount = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #6c757d;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
`;

const ProfileImage = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #343a40;
`;

const Location = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
`;

const ProfileDetailModal = styled.div`
  font-size: 0.875rem;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
`;

const CommentCount = styled.div`
  font-size: 1rem;
  color: #343a40;
  margin-bottom: 10px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoadingText = styled.div`
  font-size: 1.25rem;
  color: #6c757d;
`;

const FooterNav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;
const DeleteModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
