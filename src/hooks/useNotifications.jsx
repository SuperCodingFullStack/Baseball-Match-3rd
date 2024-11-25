import { useEffect, useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const sampleNotifications = [
      { message: "Sample Notification 1" },
      { message: "Sample Notification 2" },
      { message: "Sample Notification 3" },
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

  // const eventSource = new EventSource(
  //   "http://localshost:8080/api/notifications"
  // );

  // eventSource.onmessage = (event) => {
  //   const newNotification = JSON.parse(event.data);
  //   setNotifications((prev) => [...prev, newNotification]);
  // };

  return { notifications };
};

export default useNotifications;
