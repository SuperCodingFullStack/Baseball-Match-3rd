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

    const eventSource = new EventSourcePolyfill('http://localhost:8080/api/connect', {
      headers: {
        "Authorization": `Bearer ${token}`
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
      console.error("SSE connection error:",error);
      eventSource.close(); // 에러 발생 시 연결 종료
    };

    return () => {
      eventSource.close();
    };
  },[]);

  // 알림 읽음 처리
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true, readAt: Date.now() }
          : notification
      )
    );
  };

  // 알림을 읽은 상태와 안 읽은 상태로 나누기
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const readNotifications = notifications.filter(
    (notification) => notification.isRead
  );

  // 알림 목록 반환
  return {
    notifications: [...unreadNotifications, ...readNotifications],
    markAsRead,
  };
};

export default useNotifications;
