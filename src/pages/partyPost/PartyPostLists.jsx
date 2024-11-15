import React, { useState } from "react";
// import PostList from "./pages/partyPost/PostList";
const PartyPostLists = () => {
  // const [partyPostList, setPartyPostList] = [{ title }];

  // const fetchPartyPostLists = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/posts`);

  //     if (!response.status === "success") {
  //       throw new Error(response.message);
  //     }

  //     const data = await response.data.json();
  //     console.log(data);

  //     //dispatch(setPartyPostList(data)); // Redux 상태에 글목록들 저장
  //     setPartyPostList = data;
  //   } catch (e) {
  //     console.error("데이터 가져오기 실패:", e);
  //   }
  // };
  return (
    <>
      <div className="상단 네비게이션">네비게이션</div>
      <div className="">상태와 필터 버튼</div>
      {/* <div className="중앙 글 리스트">
        {partyPostList.map((data) => {
          <PostList
            key={data.id}
            matchImg={data.mach_img}
            title={data.title}
            matchLoc={data.matchLoc}
            matchDate={data.matchDate}
            Max={data.MaxPeopleNum}
            Current={data.CurrentPeopleNum}
            Like={data.LikeCount}
            CreateAt={data.CreateAt}
          ></PostList>;
        })}
      </div> */}

      <div className="하단">
        <button className="글 작성하기" onClick="">
          글 등록하기
        </button>
        <div>
          {"<"}페이지네이션{">"}
        </div>
      </div>
      <></>
    </>
  );
};

export default PartyPostLists;
