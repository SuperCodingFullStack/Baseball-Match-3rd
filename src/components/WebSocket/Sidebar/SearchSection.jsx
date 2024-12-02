import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";

const SearchSection = ({ roomName, handleSearchChange, searchChatRooms }) => {
  return (
    <SearchWrap>
      <SearchList>검색</SearchList>
      <SearchArea>
        <SearchInput
          type="text"
          placeholder="대화방 프로필명 검색"
          autoComplete="off"
          value={roomName}
          onChange={handleSearchChange}
        />
        <ButtonWrapper>
          {roomName.length > 0 && (
            <DeleteButton
              type="button"
              onClick={() => handleSearchChange({ target: { value: "" } })}
            >
              <TiDeleteOutline />
            </DeleteButton>
          )}
          <SearchButton type="button" onClick={searchChatRooms}>
            <IoSearchOutline />
          </SearchButton>
        </ButtonWrapper>
      </SearchArea>
    </SearchWrap>
  );
};

export default SearchSection;

// Styled Components for SearchSection

const SearchWrap = styled.section`
  margin-bottom: 20px;
  border: 1px solid #efeff0;
`;

const SearchList = styled.h3`
  display: none; /* 시각적 숨김 */
`;

const SearchArea = styled.div`
  position: relative;
  padding: 10px 12px;
  border-bottom: 1px solid #e6e6ea;
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  height: 36px;
  padding: 0 60px 0 11px;
  border: 1px solid #efeff0;
  background-color: #f5f6f8;
  color: #303038;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;
  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 25px;
`;

const SearchButton = styled.button`
  padding: 2px;
  border: none;
  background: none;
  cursor: pointer;
  color: #303038;
  font-size: 20px; /* 아이콘 크기 조절 */

  &:hover {
    color: #007bff;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 3px;
  margin-right: -15px;
  font-size: 23px; /* 아이콘 크기 조절 */
  color: #929294;

  &:hover {
    color: #ff4d4f;
  }
`;
