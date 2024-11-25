import React from "react";
import styled from "styled-components";
import MainInput from "./MainInput";
import { linkSection } from "./LinkSection";
import PhoneInput from "./PhoneInput";
import useEmail from "../../hooks/useEmail";

const SectionAll = styled.div``;

const SectionForm = styled.form``;

const IdAndPassword = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const NameAndNicks = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const PhoneAuth = styled.section``;

const MainContent = () => {
  const { email, setEmail, setFocus, isTouched, validateEmail, error, msg } =
    useEmail();

  return (
    <SectionAll>
      <SectionForm>
        <IdAndPassword id={linkSection[0].id}>
          <MainInput
            title="아이디"
            isRequired
            types="text"
            placeholder="아이디를 입력해주세요."
            isNested
            conditionText="한글,영문,특수문자 사용가능"
            maxLength="50"
            onChangeHandler={setEmail}
            onFocusHandler={setFocus}
            isTouched={isTouched}
            valueData={email}
            errorMsg={msg}
            isError={error}
            validate={validateEmail}
          />
          <MainInput
            title="비밀번호"
            isRequired
            types="password"
            placeholder="비밀번호를 입력해주세요."
            maxLength="30"
          />
          <MainInput
            title="비밀번호 확인"
            isRequired
            types="password"
            placeholder="비밀번호를 한번더 입력해주세요."
            maxLength="30"
          />
        </IdAndPassword>
        <NameAndNicks id={linkSection[1].id}>
          <MainInput
            title="이름"
            isRequired
            types="text"
            placeholder="자신의 이름을 입력해주세요."
            maxLength="30"
          />
          <MainInput
            title="닉네임"
            types="text"
            placeholder="자신의 닉네임을 입력하세요.(필수는 아닙니다)"
            maxLength="30"
            isNested
            isReverse
            conditionText="입력하지 않을 경우 랜덤된 닉네임으로 설정됩니다. "
          />
        </NameAndNicks>
        <PhoneAuth id={linkSection[2].id}>
          <PhoneInput />
        </PhoneAuth>
      </SectionForm>
    </SectionAll>
  );
};
export default MainContent;
