import React from "react";

function AcceptFriendRequestButton({ requestId }) {
  const acceptFriendRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/friends/${requestId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourAuthToken}`, // 필요 시 인증 토큰 추가
          },
        }
      );

      if (response.ok) {
        alert("친구 요청이 수락되었습니다.");
      } else {
        alert("친구 요청 수락에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return <button onClick={acceptFriendRequest}>친구 요청 수락</button>;
}

export default AcceptFriendRequestButton;
