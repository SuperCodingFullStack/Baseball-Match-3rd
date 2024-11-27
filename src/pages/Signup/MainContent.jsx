import React, { useState } from "react";
import styled from "styled-components";
import MainInput from "./MainInput";
import { linkSection } from "./LinkSection";
import useEmail from "../../hooks/useEmail";
import usePassword from "../../hooks/usePassword";
import usePasswordCheck from "../../hooks/usePasswordCheck";
import ProfileInput from "./ProfileInput";
import useNickname from "../../hooks/useNickname";
import { useSelector } from "react-redux";
import usePhone from "../../hooks/usePhone";
import PhoneAndAddressInput from "./PhoneAndAddressInput";
import { useAddress } from "../../hooks/useAddress";
import axios from "axios";

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

  const emailNest = useSelector((state) => state.isNest.emailNest);
  const nicknameNest = useSelector((state) => state.isNest.nicknameNest);
  const isPhoneAuth = useSelector((state) => state.phoneAuth.isPhoneAuth);
  const isAddressAuth = useSelector((state) => state.phoneAuth.isAddressAuth);

  const { email, setEmail, validateEmail, error, msg } = useEmail();

  const { password, validatePw, passwordChange, pwError, pwMsg } =
    usePassword(isTouched);

  const { passwordCheck, validatePwChk, pwChkHandler, pwChkError, pwChkMsg } =
    usePasswordCheck(isTouched, password);

  const {
    nickname,
    validateNickname,
    nicknameChangeHandler,
    nicknameError,
    nicknameErrorMsg,
  } = useNickname(isTouched);

  const {
    phone,
    phoneCode,
    phoneCodeChangeHandler,
    phoneChangeHandler,
    phoneError,
    phoneErrorMsg,
  } = usePhone(isTouched);

  const { address, addressChangeHandler, addressError, addressErrorMsg } =
    useAddress(isTouched);

  const fd = new FormData();

  const FormSubmitHandler = async (e) => {
    e.preventDefault();

    if (emailNest && !error) {
      fd.append("username", email);
    }
    if (!pwError && !pwChkError) {
      fd.append("password", password);
    }
    if (nicknameNest && !nicknameError) {
      fd.append("nickname", nickname);
    }
    if (isPhoneAuth && !phoneError) {
      fd.append("phone", phone);
    }
    if (isAddressAuth && !addressError) {
      fd.append("address", address);
    }

    try {
      const response = axios.post("http://localhost:8080/api/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          username: fd.get("username"),
          password: fd.get("password"),
          nickname: fd.get("nickname"),
          phone: fd.get("phone"),
          address: fd.get("address"),
          profileImg: "test.jpg",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("데이터 받아오기 실패");
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
            title="닉네임"
            types="text"
            placeholder="자신의 닉네임을 입력하세요.(필수는 아닙니다)"
            maxLength={30}
            isNested
            isReverse
            conditionText="입력하지 않을 경우 랜덤된 닉네임으로 설정됩니다. "
            Nest="중복확인"
            onChangeHandler={nicknameChangeHandler}
            onChangeHandler2={phoneCodeChangeHandler}
            valueData={nickname}
            valueData2={phoneCode}
            errorMsg={nicknameErrorMsg}
            isError={nicknameError}
            validate={validateNickname}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </NameAndNicks>
        <PhoneAuth id={linkSection[2].id}>
          <PhoneAndAddressInput
            title="핸드폰 인증"
            firstNest="인증받기"
            secondNest="인증완료"
            valueData={phone}
            onChangeHandler={phoneChangeHandler}
            errorMsg={phoneErrorMsg}
            isError={phoneError}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        </PhoneAuth>
        <Address id={linkSection[3].id}>
          <PhoneAndAddressInput
            title="주소 인증"
            firstNest="인증받기"
            secondNest="인증완료"
            valueData={address}
            onChangeHandler={addressChangeHandler}
            errorMsg={addressErrorMsg}
            isError={addressError}
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
