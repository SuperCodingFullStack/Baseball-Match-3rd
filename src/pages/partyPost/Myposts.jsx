import React, { useState, useEffect } from "react";
import apiClient from "../Login/apiClient";
import Header from "../../components/MainPage/Header/Header";
import PostList from "../../components/boardComponents/PostList";
import styled from "styled-components";

const MyPosts = () => {
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await apiClient.get(`/api/post/myPosts`);
        setLists(response.data.data.partyPosts || []);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchMyPosts();
  }, []);

<<<<<<< HEAD
  // 로고 이미지 가져오는거
  const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

  const paginatedLists = lists.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      // setIsLoading(true);
    }
  };

  // 모집 인원 percentageBar
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

  return (
    <div>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : paginatedLists.length > 0 ? (
        <>
          <Header />
          <Body>
            <Title>내가 작성한 게시글</Title>
            <Container>
              <PostContainer>
                {paginatedLists.map((data) => (
                  <PostListBox onClick={() => move(data.id)} key={data.id}>
                    <BoxHeader>
                      <PostTitle>{data.title}</PostTitle>
                      <EditBtn
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToEditPage(data.id);
                        }}
                      >
                        <BiSolidEditAlt />
                      </EditBtn>
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
              </PostContainer>
              {/* 페이지 네비게이션 */}
              <Pagination className="pagination">
                <button
                  disabled={currentPage <= 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  이전 페이지
                </button>
                <span>
                  페이지 {currentPage + 1} / {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  다음 페이지
                </button>
              </Pagination>
            </Container>
          </Body>
        </>
      ) : (
        <NoDataPage
          title="내가 작성한 게시글"
          info="내가 작성한 게시글이 없습니다."
        />
      )}
=======
  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handleView = (id) => navigate(`/partyPost/${id}`);
  const handleEdit = (id) => navigate(`/modification/${id}`);
  const title = "내가 작성한 게시글";
  const info = "내가 작성한 게시글이 없습니다."

  return (
    <div>
      <Header />
      <Body>
      <Title>내가 작성한 게시글</Title>
      <Container>
      <PostList
        lists={lists}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onEdit={handleEdit}
        onView={handleView}
        onPageChange={handlePageChange}
        title={title}
        info={info}
      />
      </Container>
      </Body>
>>>>>>> 7bdc14ca47fbd53ec3e8a8ded401417b8c958ca2
    </div>
  );
};

const Body = styled.div`
  background: #f1f5f9;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 90px;
`;

const Title = styled.h1`
  margin: 2rem;
  font-weight: 600;
  font-size: 1.7rem;
`;

const Container = styled.div`
<<<<<<< HEAD
  background: white;
  margin: 1.8rem;
`;

const PostContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const PostListBox = styled.div`
  width: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  justify-self: center;
  cursor: pointer;
  gap: 0.4rem;
  border-radius: 8px;
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
  // margin-right:0.5rem;
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

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
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
`;

export default MyPosts;
=======
padding-bottom:2rem;
  background:white;
  margin: 1.8rem;
`;



export default MyPosts;
>>>>>>> 7bdc14ca47fbd53ec3e8a8ded401417b8c958ca2
