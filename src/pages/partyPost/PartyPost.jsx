import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Map from "../../components/board/Map";
import Header from "../../components/MainPage/Header/Header";
import apiClient from "../Login/apiClient";

const partyPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  // 이 페이지에 뿌려줘야하는 것들을 받아오는 함수
  // const fetchPost = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/post/${id}`);
  //     const data = await response.json();
  //     console.log("서버에서 받아온 해당 글에 대한 정보", data);
  //     setPost(data);
  //   } catch (error) {
  //     console.error("서버에서 글받아오면서 문제발생", error);
  //   }
  // };
  const fetchPost = () => {
    setPost({
      id: { id },
      userNickname: "bin",
      userImg: "프로필 사진 주소",
      title: "롯데 경기 보러 가실분",
      content: "야구장 첨가봐요 혼자가기 무서운데 같이 가실분",
      myTeamImg: "../../../public/assets/logo.png",
      opposingTeam: "../../../public/assets/logo.png",
      latitude: 35.19,
      longitude: 129.06,
      matchDate: "2024-12-31 18:00",
      maxPeopleNum: 2,
      currentPeopleNum: 1,
      likeCount: 0,
      hitCount: 10,
      createAt: "2024-11-01 12:00",
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    apiClient
      .get(`/api/post/${id}`)
      .then((response) => {
        setPost(response.data.partyPost);
      })
      .catch((error) => {
        `API 호출 실패:`, error;
      });
  }, []);

  return (
    <>
      <Header />
      <Post>
        <PostContent>
          <Post__Images>
            <Post__teamImages>
              <img src={post.myTeamImg} alt="우리팀 이미지" />
            </Post__teamImages>
            <img src="vs이미지주소" alt="vs" />
            <Post__teamImages>
              <img src={post.opposingTeam} alt="상대팀 이미지" />
            </Post__teamImages>
          </Post__Images>
          <Post__title>{post.title}</Post__title>
          <Post__body>{post.content}</Post__body>

          <Post__Map>
            {/* <Map latitude={post.latitude} longitude={post.longitude} /> */}
            <div>지도 대용</div>
          </Post__Map>
          <Post__stats>
            <Post__like_container>
              <div className="post__like" id="likeNum">
                ♡
              </div>
              <label htmlFor="likeCount" className="post__like-count">
                {post.likeCount}
              </label>
            </Post__like_container>
            <Post__views_group>
              <div className="post__views" id="view">
                조회
              </div>
              <label htmlFor="view" className="post__view-count">
                {post.hitCount}
              </label>
            </Post__views_group>
          </Post__stats>
          <Post__profile>
            <Post__profile_img>
              <img src="프로필 이미지 주소" alt="프로필 이미지" />
            </Post__profile_img>
            <div className="post__user-info">
              <div className="post__user-nickname">{post.userNickname}</div>
              <div className="post__user-location">주소</div>
            </div>
            <div className="post__profile-detail-modal">상세프로필보기모달</div>
          </Post__profile>
        </PostContent>
        <PostComments>
          <Post__comment_count>댓글 총 0 개</Post__comment_count>

          <Post__comment_list>
            대충 이 영역 안에 댓글 컴포넌트들 뿌려짐
          </Post__comment_list>
        </PostComments>
      </Post>
      <div> 하단고정네비</div>
    </>
  );
};

export default partyPost;

// css

//전체
const Post = styled.div`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  width: 100%;
  border: 1px solid black;
  align-items: center;
  padding: 16px;
`;

// 내용들
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  border: 1px solid black;
  align-items: center;
  padding: 16px;
`;

// 제목
const Post__title = styled.div`
  border: 1px solid black;
  max-width: 1000px;
  width: 100%;
  max-height: 50px;
  height: auto;
`;

// 상세내용
const Post__body = styled.div`
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 200px;

  border: 1px solid black;
`;

//이미지들 정렬
const Post__Images = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: auto;
  max-height: 150px;
  justify-content: center;
  align-items: center;
`;

// 팀 로고 이미지
const Post__teamImages = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
  margin: 0 10px; /* 이미지 간 간격을 조정하려면 margin을 추가할 수 있습니다 */

  img {
    width: 170px;
    height: 170px;
    object-fit: contain; /* 이미지 비율 유지하면서 잘리지 않게 */
  }
`;

// 지도
const Post__Map = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
// 좋아요나 조회수 통계
const Post__stats = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 10px;
  // justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
// 좋아요 묶음
const Post__like_container = styled.div`
  display: flex;
  max-width: 100px;
  width: 100%;
  height: auto;
  min-height: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

// 조회수 묶음
const Post__views_group = styled.div`
  display: flex;
  max-width: 100px;
  width: 100%;
  height: auto;
  min-height: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

// 유저 프로필 구역
const Post__profile = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 10px;
  // sjustify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Post__profile_img = styled.div`
  max-width: 100px;
  width: 100%;
  height: auto;
  min-height: 30px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain; /* 이미지 비율 유지하면서 잘리지 않게 */
  }
`;

//댓글구역
const PostComments = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  border: 1px solid black;
  align-items: center;
  cursor: pointer;
  padding: 16px;
`;
// 댓글수
const Post__comment_count = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 10px;
  border: 1px solid black;
  align-items: center;
`;

// 댓글들
const Post__comment_list = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: auto;
  min-height: 200px;
  border: 1px solid black;
  align-items: center;
`;
