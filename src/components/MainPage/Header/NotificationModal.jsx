import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

const NotificationModal = ({ isOpen, onClose, notifications, markAsRead }) => {
  console.log("Notifications in modal:", notifications);
  const [currentTab, setCurrentTab] = useState("unread");

  if (!isOpen) return null;

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const readNotifications = notifications.filter(
    (notification) => notification.isRead
  );

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleNotificationClick = (id) => {
    markAsRead(id); // 알림을 읽음으로 처리
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.isRead) {
        markAsRead(notification.id);
      }
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Notifications</h2>
          <Button>
            <button onClick={handleMarkAllAsRead}>모두 읽음 </button>
            <button onClick={onClose}>X</button>
          </Button>
        </ModalHeader>

        {/* 탭 메뉴 */}
        <TabMenu>
          <Tab
            isActive={currentTab === "unread"}
            onClick={() => handleTabChange("unread")}
          >
            안읽은 알림
          </Tab>
          <Tab
            isActive={currentTab === "read"}
            onClick={() => handleTabChange("read")}
          >
            읽은 알림
          </Tab>
        </TabMenu>

        {/* 탭 내용 */}
        {currentTab === "unread" && (
          <NotificationList>
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  {notification.message}
                </NotificationItem>
              ))
            ) : (
              <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
            )}
          </NotificationList>
        )}

        {currentTab === "read" && (
          <NotificationList>
            {readNotifications.length > 0 ? (
              readNotifications.map((notification) => (
                <NotificationItem key={notification.id}>
                  {notification.message}
                </NotificationItem>
              ))
            ) : (
              <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
            )}
          </NotificationList>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

NotificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      isRead: PropTypes.bool.isRequired,
    })
  ).isRequired,
  markAsRead: PropTypes.func.isRequired,
  //   removeReadNotification: PropTypes.func.isRequired,
};

NotificationModal.defaultProps = {
  notifications: [],
};

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  z-index: 5;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  animation: ${dropdownAnimation} 0.5s ease forwards;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: 600;
    font-size: 1.8rem;
    margin: 0;
  }

  button {
    background: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;
  }
`;

const Button = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

const Tab = styled.button`
  border-radius: 0;
  padding: 10px;
  border: none;
  background: rgba(0, 0, 0, 0);
  border-bottom: ${(props) => (props.isActive ? "5px solid #acfe49" : "none")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  cursor: pointer;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NotificationItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const NoNotificationsMessage = styled.p`
  font-weight: 600;
  text-align: center;
`;

export default NotificationModal;
