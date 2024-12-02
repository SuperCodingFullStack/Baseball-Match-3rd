import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { linkSection } from "./LinkSection";
import MyFavorite from "./MyFavorite";
import MyPartyRequest from "./MyPartyRequest";

const SectionAll = styled.div``;

const SectionForm = styled.form``;

const MainContents = () => {
  return (
    <SectionAll>
      <SectionForm>
        {/* <MyFavorite /> */}
        <MyPartyRequest />
      </SectionForm>
    </SectionAll>
  );
};

export default MainContents;
