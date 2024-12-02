import React from "react";
import styled from "styled-components";
import { getTeamLogo } from "../../utils/getTeamLogo";

const PostList = ({
  id,
  myTeamImg,
  opposingTeamImg,
  title,
  matchTime,
  matchDate,
  max,
  current,
  like,
  createAt,
  name,
  move,
}) => {
  console.log("PostList Props:", {
    id,
    myTeamImg,
    opposingTeamImg,
    title,
    matchTime,
    matchDate,
    max,
    current,
    like,
    createAt,
    name,
    move,
  });
  // 로고 이미지 가져오는거
  const TeamLogo = ({ teamName }) => {
    const logoSrc = getTeamLogo(teamName);
    return <LogoImage src={logoSrc} alt={`${teamName} logo`} />;
  };

  return (
    <>
      <Post onClick={() => move(id)}>
        <Post_list__team_images>
          <TeamLogo teamName={myTeamImg} />

          <img src="vs이미지주소" alt="vs" />
          <TeamLogo teamName={opposingTeamImg} />
        </Post_list__team_images>
        <Post_list__details>
          <div className="post-list__title">{title}</div>
          <div className="post-list__location">경기장소 사직야구장</div>
          <div className="post-list__match-date">
            {matchDate}
            {matchTime}
          </div>
          <div className="post-list__participants">
            {current}/{max}
          </div>
        </Post_list__details>
        <div className="post-list__author-likes">
          <div className="post-list__author">{name}</div>
          <Post_list__author_likes>
            <div className="post-list__like-button" id="likeNum">
              ♡
            </div>
            <label htmlFor="likeNum">{like}</label>

            <div className="post-list__time-passed">{createAt}</div>
          </Post_list__author_likes>
        </div>
      </Post>
    </>
  );
};

// css
const Post = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100vw;
  border: 1px solid black;
  align-items: center;
  cursor: pointer;
`;

const Post_list__team_images = styled.div`
  display: flex;
  max-width: 300px;
  width: 100vw;
`;

const Post_list__details = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100vw;
`;

const Post_list__author_likes = styled.div`
  max-width: 200px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default PostList;

const LogoImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
