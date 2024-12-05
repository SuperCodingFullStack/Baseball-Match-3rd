import React from "react";
import styled from "styled-components";
import axios from "axios";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      try {
        const response = await axios.delete("/api/user");
        if (response.data.status === "success") {
          alert("계정이 성공적으로 삭제되었습니다.");
          window.location.href = "/";
        }
      } catch (error) {
        alert("계정 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Title>계정 삭제</Title>
      <WarningText>
        계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
      </WarningText>
      <DeleteButton onClick={handleDeleteAccount}>계정 삭제</DeleteButton>
    </Container>
  );
};

const Container = styled.section`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const WarningText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default DeleteAccount;
