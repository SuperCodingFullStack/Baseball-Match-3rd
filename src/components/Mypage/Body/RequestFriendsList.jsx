import React, { useState } from "react";

const RequestFriendsList = ({ userId }) => {
  const [toUserId, setToUserId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setstatus] = useState("");

  const handleInputChange = (e) => {
    setToUserId(e.target.value);
  };

  const sendFriendRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/friend/${user_id}?type=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ toUserId: parseInt(toUserId) }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>내 친구 목록</h2>
      <input
        type="number"
        value={toUserId}
        onChange={handleInputChange}
        placeholder="Enter toUserId"
      />
      <button onClick={sendFriendRequest}>Send Request</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestFriendsList;
