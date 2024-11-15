import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AlamBtn = styled.button``;

function NotificationButton() {
  const [notificationCount, setNotificationCount] = useState(0);

  // 백엔드에서 알림 갯수를 가져오는 함수
  const fetchNotificationCount = async () => {
    try {
      const response = await fetch("/api/notifications/count"); // API 엔드포인트
      const data = await response.json();
      setNotificationCount(data.count); // 응답에서 알림 갯수를 설정
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  // 컴포넌트가 마운트될 때 알림 수 가져오기
  useEffect(() => {
    fetchNotificationCount();
  }, []);

  return (
    <div>
      <button>알림 ({notificationCount})</button>
    </div>
  );
}

export default NotificationButton;
