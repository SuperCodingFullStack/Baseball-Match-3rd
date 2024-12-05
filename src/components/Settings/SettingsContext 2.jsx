import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkNicknameAvailability = async (nickname) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/user/nickname?nickname=${nickname}`
      );
      return response.data.status === "success";
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "닉네임 확인 중 오류가 발생했습니다.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        loading,
        error,
        checkNicknameAvailability,
      }}
    >
      <SettingsContainer>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {children}
      </SettingsContainer>
    </SettingsContext.Provider>
  );
};

const SettingsContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1000;

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  color: #dc3545;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #ffcdd2;
  font-size: 0.9rem;
`;

export const useSettings = () => useContext(SettingsContext);
