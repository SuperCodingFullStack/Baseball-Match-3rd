import { useEffect, useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

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

        setNotifications((prev) => [...prev, newNotification]);
        index++;
      } else {
        clearInterval(intervalId); // 모든 알림이 표시되면 타이머 정지
      }
    }, 1000); // 1초 간격으로 알림 추가

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 정리
    };
  }, []);

  //   // 알림 중복 방지
  //   const addNotification = (newNotification) => {
  //     setNotifications((prev) => {
  //       if (prev.some((notification) => notification.id === newNotification.id)) {
  //         return prev; // 중복 제거
  //       }
  //       return [...prev, newNotification];
  //     });
  //   };

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

  // 읽은 알림 삭제 (8초 후 자동 삭제)
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.isRead && !notification.readAtTimer) {
        const timerId = setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notification.id)
          );
        }, 8000);

        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, readAtTimer: timerId } : n
          )
        );
      }
    });

    return () => {
      notifications.forEach((notification) => {
        if (notification.readAtTimer) {
          clearTimeout(notification.readAtTimer);
        }
      });
    };
  }, [notifications]);

  // const eventSource = new EventSource(
  //   "http://localshost:8080/api/notifications"
  // );

  // eventSource.onmessage = (event) => {
  //   const newNotification = JSON.parse(event.data);
  //   setNotifications((prev) => [...prev, newNotification]);
  // };

  return { notifications, markAsRead };
};

export default useNotifications;
