import React from "react";
import styled from "styled-components";
import { linkSection } from "./linkSection";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { activeIdActions } from "../../Store/Slice/ActiveIdSlice";

const Headering = styled.header`
  background-color: #202734;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 210px;
  color: #fff;
  > h1 {
    padding-left: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const Links = styled.ul`
  li {
    a {
      color: #fff;
      text-decoration: none;
      padding-left: 30px;
      padding-top: 16px;
      padding-bottom: 16px;
      display: block;
      opacity: 0.4;
      &.active {
        opacity: 1;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 16px;
          border-radius: 5px;
          background-color: #fff;
        }
      }
    }
  }
`;

const SignHeader = () => {
  const activeId = useSelector((state) => state.activeIds.activeId);
  const dispatch = useDispatch();

  return (
    <Headering>
      <h1>회원가입하기</h1>
      <Links>
        {linkSection.map((ls) => (
          <li key={ls.id}>
            <a
              href={`#${ls.id}`}
              className={`${activeId === ls.id ? "active" : ""}`}
              onClick={() => {
                dispatch(activeIdActions.changeActive(ls.id));
              }}
            >
              {ls.section}
            </a>
          </li>
        ))}
      </Links>
    </Headering>
  );
};

export default SignHeader;
