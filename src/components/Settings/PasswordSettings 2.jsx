import React, { useState } from "react";
import axios from "axios";

const PasswordSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put("/api/user/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.status === "success") {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="password-settings">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            placeholder="현재 비밀번호"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            placeholder="새 비밀번호"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            placeholder="새 비밀번호 확인"
          />
        </div>

        <button type="submit">비밀번호 변경</button>
      </form>
    </section>
  );
};

export default PasswordSettings;
