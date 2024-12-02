import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { linkSection } from "./LinkSection";
import MyFavorite from "./MyFavorite";

const SectionAll = styled.div``;

const SectionForm = styled.form``;

const MainContents = () => {
  return (
    <SectionAll>
      <SectionForm>
        <MyFavorite />
      </SectionForm>
    </SectionAll>
  );
};

export default MainContents;
