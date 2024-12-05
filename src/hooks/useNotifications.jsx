import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { EventSourcePolyfill } from "event-source-polyfill";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // 알림 중복 방지
  const addNotification = (newNotification) => {
    setNotifications((prev) => {
      if (prev.some((notification) => notification.id === newNotification.id)) {
        return prev; // 중복 제거
      }
      return [...prev, newNotification];
    });
  };
  
  // SSE 연결 및 알림 수신
  useEffect(() => {
    const token = Cookies.get("Authorization");
    console.log(token);
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    const eventSource = new EventSourcePolyfill('http://localhost:8080/api/connect', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      withCredentials: true,
      retry: 5000, // 5초마다 재연결 시도
    });

    eventSource.addEventListener('ping',(event) => {
      console.log("Ping received", event);
    });

    // 알람 수신 처리
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      addNotification({
        id: newNotification.id,
        message: newNotification.content,
        isRead: newNotification.readStatus === "READ",
        type: newNotification.type || "알림",
        sender: newNotification.sender,
        timestamp: newNotification.createdAt,
      });
    };

    // SSE 연결 에러 핸들링
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      if (error?.target?.readyState === EventSource.CLOSED) {
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  },[]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/notification');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // JSON 파싱
        console.log(data); // 응답 내용 확인
        setNotifications(data);
      } catch (error) {
        console.error('알림 초기화 오류:', error);
        // 추가적인 오류 처리 (예: 404 오류 처리)
      }
  }
fetchNotifications();
},[]);

const markAsReadOnServer = async (notificationId) => {
  try {
    const token = Cookies.get("Authorization");
    const response = await fetch(`http://localhost:8080/api/notificationType/${notificationId}`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    });
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Notification ${notificationId} marked as read on Server.`);
  } catch (error) {
    console.error("Failed to mark notification as read on server:", error);
  }
};

  // 알림 읽음 처리
  const markAsRead = async(id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true, readAt: Date.now() }
          : notification
      )
    );
    await markAsReadOnServer(id);
  };

  // 알림을 읽은 상태와 안 읽은 상태로 나누기
  // const unreadNotifications = notifications.filter(
  //   (notification) => !notification.isRead
  // );
  // const readNotifications = notifications.filter(
  //   (notification) => notification.isRead
  // );

  // 알림 정렬 (읽지 않은 알림 먼저)
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead === b.isRead) return b.timestamp - a.timestamp;
    return a.isRead ? 1 : -1;
  });

  // 알림 목록 반환
  return {
    notifications: sortedNotifications,
    markAsRead,
  };
};

export default useNotifications;