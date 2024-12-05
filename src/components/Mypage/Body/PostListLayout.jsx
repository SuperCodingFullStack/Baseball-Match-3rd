import React from "react";
import styled from "styled-components";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosList, IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

// styled-components
const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 210px;
  width: 100%;
  background-color: #f7f9fc;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5em;
  max-width: 120em;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 2em;
  padding: 0.7em;
  margin-left: -0.7em;
`;

const SearchInput = styled.input`
  background-color: aliceblue;
  width: 200px;
  height: 30px;
  font-size: large;
  padding: 10px;
  border-radius: 5px;
  margin-right: 50px;
`;

const StyledPostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 800px;
`;

const PostListBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  gap: 0.4rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostTitle = styled.p`
  font-weight: 800;
  font-size: 1.2rem;
`;

const EditBtn = styled.div``;

const PostCreatedAt = styled.p`
  color: gray;
`;

const PostGameImg = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  p {
    font-weight: 600;
    font-size: 0.8rem;
  }
`;

const Party = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
`;

const PartyList = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  color: gray;
  p {
    font-size: 0.9rem;
  }
`;

const ParticipantsMember = styled.p`
  font-weight: bold;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) =>
    props.percentage < 50 ? "#ff6b6b" : "#92C8F8FF"};
  transition: width 0.3s ease-in-out;
`;

const PostInfo = styled.div`
  padding-top: 0.7rem;
  display: flex;
  justify-content: space-between;
`;

const MatchDate = styled.p`
  padding: 0.4rem;
  background: #fef5ec;
  color: #f7a049;
  font-size: 0.9rem;
  border-radius: 8px;
`;

const LikeAndComments = styled.div`
  display: flex;
  gap: 1rem;
`;

const Icon = styled.p`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  font-size: 1rem;
`;

const StyledIcon = styled(HiOutlineChatBubbleBottomCenterText)`
  font-size: 1.1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const EmptyBox = styled.div`
  border: 1px dashed #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #f0f0f0;
  }
`;

const PaginationInfo = styled.span`
  padding: 0.5rem 1rem;
`;

const FavoriteList = styled.ul`
  background-color: white;
  width: 120em;
  height: 900px;
  display: flex;
  margin: 2em;
  margin-left: 6em;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  text-align: center;
`;

const NoDataImage = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 20px;
`;

const NoDataText = styled.p`
  font-size: 1.5rem;
  color: #878484;
`;

// RecruitmentProgress 컴포넌트 정의
const RecruitmentProgress = ({ current, max }) => {
  const percentage = Math.round((current / max) * 100);
  return (
    <div style={{ width: "300px" }}>
      <ProgressBarContainer>
        <ProgressBar percentage={percentage} />
      </ProgressBarContainer>
    </div>
  );
};

// 컴포넌트
const PostListLayout = ({
  title,
  posts,
  currentPage,
  totalPages,
  onPageChange,
  onMove,
  onEdit,
  TeamLogo,
  showSearch = true,
}) => {
  const postsPerPage = 9;
  const startIndex = currentPage * postsPerPage;
  const displayedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // 데이터가 없을 경우의 UI
  if (!posts || posts.length === 0) {
    return (
      <Container>
        <Between>
          <Title>{title}</Title>
          {showSearch && <SearchInput placeholder="검색" />}
        </Between>
        <NoDataContainer>
          <NoDataImage src="/public/assets/nodata.svg" alt="No data" />
          <NoDataText>신청한 파티가 없습니다.</NoDataText>
        </NoDataContainer>
      </Container>
    );
  }

  const emptySlots = Array(Math.max(0, postsPerPage - displayedPosts.length))
    .fill(null)
    .map((_, index) => ({ id: `empty-${index}`, isEmpty: true }));

  return (
    <Container>
      <Between>
        <Title>{title}</Title>
        {showSearch && <SearchInput placeholder="검색" />}
      </Between>
      <FavoriteList>
        <StyledPostContainer>
          {displayedPosts.map((data) => (
            <PostListBox onClick={() => onMove(data.id)} key={data.id}>
              <BoxHeader>
                <PostTitle>{data.title}</PostTitle>
                {onEdit && (
                  <EditBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(data.id);
                    }}
                  >
                    <BiSolidEditAlt />
                  </EditBtn>
                )}
              </BoxHeader>
              <PostCreatedAt>
                {new Date(data.createAt).toLocaleString()}
              </PostCreatedAt>
              <PostGameImg>
                <TeamLogo teamName={data.myTeamImg} />
                <p>VS</p>
                <TeamLogo teamName={data.opposingTeam} />
              </PostGameImg>
              <Party>
                <PartyList>
                  <IoIosList />
                  <p>모집</p>
                </PartyList>
                <ParticipantsMember>
                  {data.currentPeopleNum}/{data.maxPeopleNum}
                </ParticipantsMember>
              </Party>
              <RecruitmentProgress
                current={data.currentPeopleNum}
                max={data.maxPeopleNum}
              />
              <PostInfo>
                <MatchDate>{data.matchDate}</MatchDate>
                <LikeAndComments>
                  <Icon>
                    <IoMdHeartEmpty />
                    {data.likeCount}
                  </Icon>
                  <Icon>
                    <StyledIcon />
                  </Icon>
                </LikeAndComments>
              </PostInfo>
            </PostListBox>
          ))}
          {emptySlots.map((empty) => (
            <EmptyBox key={empty.id} />
          ))}
        </StyledPostContainer>

        <Pagination>
          <PaginationButton
            disabled={currentPage <= 0}
            onClick={() => onPageChange(currentPage - 1)}
          >
            이전 페이지
          </PaginationButton>
          <PaginationInfo>
            페이지 {currentPage + 1} / {Math.ceil(posts.length / postsPerPage)}
          </PaginationInfo>
          <PaginationButton
            disabled={currentPage >= Math.ceil(posts.length / postsPerPage) - 1}
            onClick={() => onPageChange(currentPage + 1)}
          >
            다음 페이지
          </PaginationButton>
        </Pagination>
      </FavoriteList>
    </Container>
  );
};

export default PostListLayout;
