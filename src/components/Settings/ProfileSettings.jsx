import React, { useState } from "react";
import styled from "styled-components";
import apiClient from "../../pages/Login/apiClient";
import { useSettings } from "./SettingsContext";

const ProfileSettings = () => {
  const { checkNicknameAvailability } = useSettings();
  const [formData, setFormData] = useState({
    nickname: "",
    phone: "",
    address: "",
    profileImg: null,
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const handleNicknameCheck = async () => {
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const isAvailable = await checkNicknameAvailability(formData.nickname);
      setIsNicknameChecked(isAvailable);
      alert(
        isAvailable
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다."
      );
    } catch (error) {
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNicknameChecked && formData.nickname) {
      alert("닉네임 중복 확인이 필요합니다.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      const response = await apiClient.put("/api/user", formDataToSend);

      if (response.data.status === "success") {
        alert("프로필이 성공적으로 업데이트되었습니다.");
      }
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>프로필 설정</Title>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <Label>닉네임</Label>
          <InputWrapper>
            <StyledInput
              type="text"
              value={formData.nickname}
              onChange={(e) => {
                setFormData({ ...formData, nickname: e.target.value });
                setIsNicknameChecked(false);
              }}
              placeholder="닉네임을 입력하세요"
            />
            <CheckButton type="button" onClick={handleNicknameCheck}>
              중복확인
            </CheckButton>
          </InputWrapper>
        </FormSection>

        <FormSection>
          <Label>전화번호</Label>
          <StyledInput
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="전화번호를 입력하세요"
          />
        </FormSection>

        <FormSection>
          <Label>주소</Label>
          <StyledInput
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="주소를 입력하세요"
          />
        </FormSection>

        <FormSection>
          <Label>프로필 이미지</Label>
          <FileInputWrapper>
            <FileInputLabel htmlFor="profile-image">
              이미지 선택하기
              <FileInput
                id="profile-image"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, profileImg: e.target.files[0] })
                }
                accept="image/*"
              />
            </FileInputLabel>
            {formData.profileImg && (
              <FileName>{formData.profileImg.name}</FileName>
            )}
          </FileInputWrapper>
        </FormSection>

        <SubmitButton type="submit">변경사항 저장</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CheckButton = styled.button`
  padding: 0 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #495057;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  font-size: 0.85rem;
  color: #666;
  padding-left: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default ProfileSettings;
