import React from "react";
import styled from "styled-components";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosList, IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import getTeamLogo from "../../utils/getTeamLogo";

const PostListItem = ({ data, onEdit, onView }) => {
     // 로고 이미지 가져오는거
   const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

   // 모집 인원 percentageBar
   const RecruitmentProgress = ({ current, max }) => {
    const percentage = Math.round((current / max ) * 100);

    return (
      <div style={{width: '300px'}}>
      <ProgressBarContainer>
            <ProgressBar percentage={percentage} />
          </ProgressBarContainer>
          </div>
    );
  };

  return (
    <PostListBox onClick={() => onView(data.id)} key={data.id}>
      <BoxHeader>
        <PostTitle>{data.title}</PostTitle>
        <EditBtn
          onClick={(e) => {
            e.stopPropagation(); // 클릭 이벤트 버블링 방지
            onEdit(data.id);
          }}
        >
          <BiSolidEditAlt />
        </EditBtn>
      </BoxHeader>
      <PostCreatedAt>{new Date(data.createAt).toLocaleString()}</PostCreatedAt>
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
      <RecruitmentProgress current={data.currentPeopleNum} max={data.maxPeopleNum} />
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
  );
};

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

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export default PostListItem;
