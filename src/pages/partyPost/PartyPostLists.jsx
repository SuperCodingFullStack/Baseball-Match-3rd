import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPartyPostList,
  setLoadingStatus,
  setError,
} from "../../store/slice/partyPostSlice";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";
import Header from "../../components/MainPage/Header/Header";

const PartyPostLists = () => {
  const dispatch = useDispatch();
  // const { partyPostList, status, error} = useSelector(
  const { partyPostList } = useSelector((state) => state.partyPosts);

  //api를 통한 정보를 가져오는 함수(전체 게시글 목록)
  /*
  const fetchPartyPostLists = async () => {
    try {
      // dispatch(setLoadingStatus('loading')); // 로딩 상태 설정
      const response = await fetch(`http://localhost:8080/api/posts`);
      if (!response.status === "success") {
        throw new Error(response.message);
      }
      const data = await response.data.json();
      console.log("요청을 통해 받아온 파티모집글리스트 ", data);
      dispatch(setPartyPostList(data)); // Redux 상태에 글목록들 저장
      //  dispatch(setLoadingStatus('succeeded')); // 로딩 완료 상태로 변경
    } catch (e) {
      // dispatch(setError(e.message)); // 에러 발생 시 처리
      // dispatch(setLoadingStatus('failed')); // 실패 상태로 변경
      console.error("데이터 가져오기 실패:", e);
    }
  };
*/

  const fetchPartyPostLists = async () => {
    const data = [
      {
        id: 1,
        userNickname: "bin",
        userImg: "프로필 사진 주소",
        title: "롯데 경기 보러 가실분",
        myTeamImg: "롯데 구단 이미지 주소",
        opposingTeam: " NC 구단 이미지",
        matchDate: "2024-12-31",
        matchTime: "18:00",
        maxPeopleNum: 2,
        currentPeopleNum: 1,
        likeCount: 0,
        hitCount: 10,
        createAt: "2024-11-01 12:00",
      },
      {
        id: 2,
        userNickname: "bin",
        userImg: "프로필 사진 주소",
        title: "롯데 경기 보러 가실분",
        myTeamImg: "롯데 구단 이미지 주소",
        opposingTeam: " NC 구단 이미지",
        matchDate: "2024-12-11",
        matchTime: "20:00",
        maxPeopleNum: 2,
        currentPeopleNum: 1,
        likeCount: 0,
        hitCount: 10,
        createAt: "2024-11-02 12:00",
      },
    ];
    dispatch(setPartyPostList(data)); // Redux 상태에 글목록들 저장
  };

  // useEffect(() => {
  //   fetchPartyPostLists();
  // }, [dispatch]);
  useEffect(() => {
    fetchPartyPostLists();
  }, []);

  // 네비게이션 관련
  const navigate = useNavigate();
  const createPostBtnClick = () => {
    navigate("/postWrite");
  };
  const movePost = (id) => {
    console.log("받아오는 아이디", id);

    navigate(`/partyPost/${id}`);
  };

  return (
    <>
      <div className="전체를 감싸는 영역">
        <Header></Header>
        <div className="중간">
          <div className="상태와 필터 버튼">
            <div>총36건</div>
            <div>필터이미지</div>
          </div>
          {/* 데이터 받은 것을 여기서 뿜어낸다. */}
          {
            <div className="중앙 글 리스트">
              {partyPostList.map((data) => {
                return (
                  <PostList
                    key={data.id}
                    id={data.id}
                    myTeamImg={data.myTeamImg}
                    opposingTeamImg={data.opposingTeam}
                    title={data.title}
                    matchDate={data.matchDate}
                    matchTime={data.matchTime}
                    max={data.maxPeopleNum}
                    current={data.currentPeopleNum}
                    like={data.likeCount}
                    createAt={data.createAt}
                    name={data.userNickname}
                    move={movePost}
                  />
                );
              })}
            </div>
          }
        </div>
        <div className="하단">
          <div>
            {"<"}페이지네이션{">"}
          </div>
          <button className="글 작성하기" onClick={createPostBtnClick}>
            글 등록하기
          </button>
        </div>
      </div>
    </>
  );
};

// css 작성

export default PartyPostLists;
