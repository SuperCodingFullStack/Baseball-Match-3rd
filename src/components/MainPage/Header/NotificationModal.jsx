import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const NotificationModal = ({ isOpen, onClose, notifications, setNotifications, markAsRead }) => {
  if (!isOpen) return null;

  const handleNotificationClick = (id) => {
    markAsRead(id);
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true, readAt: Date.now() } : notification
      )
    );
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

        <NotificationList>
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              console.log("Notification: ", notification);
              return (
                <NotificationItem
                  key={notification.id}
                  isRead={notification.isRead}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <NotificationHeader hasAlarm={!notification.isRead}>
                    <NotificationAlarm isRead={notification.isRead} />
                    <Type>[{notification.type}]</Type>
                  </NotificationHeader>
                  <Message>{notification.message}</Message>
                  <Time>
                    {new Date(notification.timestamp).toLocaleString()}
                  </Time>
                </NotificationItem>
              );
            })
          ) : (
            <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
          )}
        </NotificationList>
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
  padding: 0.8rem 0.8rem;
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

const NotificationList = styled.ul`
  list-style: none;
  // padding: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NotificationItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.isRead ? "#f5f5f5" : "white")};
  cursor: pointer;

  &:hover {
    border: ${(props) => (props.isRead ? "" : "1px solid #e1e1e1")};
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  gap: ${({ hasAlarm }) => (hasAlarm ? "0.5rem" : "0.2rem")};
`;

const NotificationAlarm = styled.div`
  width: ${({ isRead }) => (isRead ? "0px" : "7px")};
  height: ${({ isRead }) => (isRead ? "0px" : "7px")};
  border-radius: 50%;
  background-color: ${({ isRead }) => (isRead ? "transparent" : "red")};
  transition: width 0.3s, height 0.3s;
`;

const Type = styled.div``;
const Message = styled.div`
  font-weight: 600;
`;
const Time = styled.div`
  font-size: 12px;
  color: gray;
`;

const NoNotificationsMessage = styled.p`
  font-weight: 600;
  text-align: center;
  margin:1rem;
  color:red;
`;

export default NotificationModal;
