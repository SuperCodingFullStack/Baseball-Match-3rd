import React from "react";
import styled from "styled-components";
import { GrMailOption } from "react-icons/gr";
import { GrSettingsOption } from "react-icons/gr";

const Div_LogoImg = styled.div`
  width: 100px;
  height: 70px;
`;
const Div_Containner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <Div_Containner>
      <Div_LogoImg>로고 이미지</Div_LogoImg>
      <Div_Containner>
        <GrSettingsOption size="70px" className="GrSettingsOption" />
        <GrMailOption size="70px" />
      </Div_Containner>
    </Div_Containner>
  );
};

export default Header;
