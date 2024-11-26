import React, { useState } from "react";
import styled from "styled-components";
import MainInput from "./MainInput";
import { linkSection } from "./LinkSection";
import useEmail from "../../hooks/useEmail";
import usePassword from "../../hooks/usePassword";
import usePasswordCheck from "../../hooks/usePasswordCheck";
import ProfileInput from "./ProfileInput";
import useName from "../../hooks/useName";
import useNickname from "../../hooks/useNickname";

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

const PhoneAuth = styled.section`
  margin-bottom: 20px;
`;

const Address = styled.section`
  margin-bottom: 20px;
`;

const Profile = styled.section`
  margin-bottom: 20px;
`;

const FormButton = styled.button`
  width: 130px;
  background-color: rgb(191, 219, 254);
  color: rgb(29, 78, 216);
  border: none;
  padding: 15px 0;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const MainContent = () => {
  const [isTouched, setIsTouched] = useState(false);

  const { email, setEmail, validateEmail, error, msg } = useEmail();

  const { password, validatePw, passwordChange, pwError, pwMsg } =
    usePassword(isTouched);

  const { passwordCheck, validatePwChk, pwChkHandler, pwChkError, pwChkMsg } =
    usePasswordCheck(isTouched, password);

  const { name, validateName, nameChangeHandler, nameError, nameErrorMsg } =
    useName(isTouched);

  const {
    nickname,
    validateNickname,
    nicknameChangeHandler,
    nicknameError,
    nicknameErrorMsg,
  } = useNickname(isTouched);

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Prevent Default");
    try {
      const response = await fetch("http://localhost:8080/api/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          nickname: "뿡뿡이",
          phone: "010-1234-1234",
          address: "경기도 용인시",
          profileImg: "test.jpg",
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SectionAll>
      <SectionForm onSubmit={FormSubmitHandler}>
        <IdAndPassword id={linkSection[0].id}>
          <MainInput
            title="아이디"
            isRequired
            types="text"
            placeholder="아이디를 입력해주세요."
            isNested
            conditionText="한글,영문,특수문자 사용가능"
            maxLength={50}
            onChangeHandler={setEmail}
            valueData={email}
            errorMsg={msg}
            isError={error}
            validate={validateEmail}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
            Nest="중복확인"
          />
          <MainInput
            title="비밀번호"
            isRequired
            types="password"
            placeholder="비밀번호를 입력해주세요."
            maxLength={30}
            onChangeHandler={passwordChange}
            valueData={password}
            errorMsg={pwMsg}
            isError={pwError}
            validate={validatePw}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
          <MainInput
            title="비밀번호 확인"
            isRequired
            types="password"
            placeholder="비밀번호를 한번더 입력해주세요."
            maxLength={30}
            onChangeHandler={pwChkHandler}
            valueData={passwordCheck}
            errorMsg={pwChkMsg}
            isError={pwChkError}
            validate={validatePwChk}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </IdAndPassword>
        <NameAndNicks id={linkSection[1].id}>
          <MainInput
            title="이름"
            isRequired
            types="text"
            placeholder="자신의 이름을 입력해주세요."
            maxLength={30}
            onChangeHandler={nameChangeHandler}
            valueData={name}
            errorMsg={nameErrorMsg}
            isError={nameError}
            validate={validateName}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
          <MainInput
            title="닉네임"
            types="text"
            placeholder="자신의 닉네임을 입력하세요.(필수는 아닙니다)"
            maxLength={30}
            isNested
            isReverse
            conditionText="입력하지 않을 경우 랜덤된 닉네임으로 설정됩니다. "
            Nest="중복확인"
            onChangeHandler={nicknameChangeHandler}
            valueData={nickname}
            errorMsg={nicknameErrorMsg}
            isError={nicknameError}
            validate={validateNickname}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </NameAndNicks>
        <PhoneAuth id={linkSection[2].id}>
          <MainInput
            title="핸드폰 번호"
            types="number"
            placeholder="핸드폰 번호를 입력하세요."
            maxLength={30}
            isNested
            isRequired
            isAdd
            Nest="번호입력"
            Nest2="인증확인"
            valueData={nickname}
            errorMsg={nicknameErrorMsg}
            isError={nicknameError}
            validate={validateNickname}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </PhoneAuth>
        <Address id={linkSection[3].id}>
          <MainInput
            title="주소"
            types="text"
            placeholder="주소를 입력하세요."
            placeholder2="상세 주소를 입력하세요."
            maxLength={30}
            isNested
            isRequired
            isAdd
            Nest="주소API"
            Nest2="상세입력"
            valueData={nickname}
            errorMsg={nicknameErrorMsg}
            isError={nicknameError}
            validate={validateNickname}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </Address>
        <Profile id={linkSection[4].id}>
          <ProfileInput />
        </Profile>
        <FormButton type="submit">회원가입 완료</FormButton>
      </SectionForm>
    </SectionAll>
  );
};
export default MainContent;
