import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (userName && roomId) {
      navigate("/call", { state: { userName, roomId } });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br /><br />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
