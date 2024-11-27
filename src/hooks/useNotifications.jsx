import { useEffect, useState } from "react";

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

  useEffect(() => {
    const sampleNotifications = [
      { id: 1, message: "Sample Notification 1", isRead: false },
      { id: 2, message: "Sample Notification 2", isRead: false },
      { id: 3, message: "Sample Notification 3", isRead: false },
    ];

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < sampleNotifications.length) {
        const newNotification = sampleNotifications[index];
        console.log("Simulating notification:", newNotification);

        addNotification(newNotification); // 중복 체크 후 알림 추가
        index++;
      } else {
        clearInterval(intervalId); // 모든 알림이 표시되면 타이머 정지
      }
    }, 1000); // 1초 간격으로 알림 추가

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 정리
    };
  }, []);

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

  // 새로운 알림이 추가될 때마다 상태 업데이트
  return {
    notifications: [...unreadNotifications, ...readNotifications],
    markAsRead,
  };
};

export default useNotifications;
