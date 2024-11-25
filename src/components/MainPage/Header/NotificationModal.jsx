import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const NotificationModal = ({ isOpen, onClose, notifications }) => {
  console.log("Notifications in modal:", notifications);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Notifications</h2>
        <NotificationList>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem key={index}>
                {notification.message}
              </NotificationItem>
            ))
          ) : (
            <p>알림이 없습니다.</p>
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
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
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
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export default NotificationModal;
