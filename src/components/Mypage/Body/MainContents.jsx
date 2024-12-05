import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MyFavorite from "./MyFavorite";
import MyPartyRequest from "./MyPartyRequest";
import MyWrite from "./MyWrite";
import ParticipatingParty from "./ParticipatingPartyList";

const SectionAll = styled.div``;

const MainContents = () => {
  const activeId = useSelector((state) => state.activeIds.activeId);

  const renderContent = () => {
    switch (activeId) {
      case "myFavorite":
        return <MyFavorite />;
      case "requestParty":
        return <MyPartyRequest />;
      case "participatingPartyList":
        return <ParticipatingParty />;
      case "myPostList":
        return <MyWrite />;
      default:
        return <MyWrite />;
    }
  };

  return <SectionAll>{renderContent()}</SectionAll>;
};

export default MainContents;
