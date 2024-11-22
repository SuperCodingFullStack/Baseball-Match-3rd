import React from "react";

function SendFriendRequestButton({ friendId }) {
  const sendFriendRequest = async () => {
    try {
      const yourAuthToken = localStorage.getItem("jwtToken"); // 인증 토큰 예시
      const response = await fetch(`/api/friend/${friendId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`, // 필요 시 인증 토큰 추가
        },
      });

      if (response.ok) {
        alert("친구 요청이 성공적으로 보내졌습니다.");
      } else {
        alert("친구 요청에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return <button onClick={sendFriendRequest}>친구 요청 보내기</button>;
}

export default SendFriendRequestButton;
