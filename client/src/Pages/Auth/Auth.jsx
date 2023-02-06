import { useRef } from "react";
import useSessionContext from "../../Hooks/useSessionContext";
import "./Auth.css";

const Auth = ({ socket }) => {
  const { setSession } = useSessionContext();
  const handleRoomEnter = (e) => {
    e.preventDefault();
    let username = nameRef.current.value.trim();
    let room = roomRef.current.value.trim();
    if (username && room) {
      console.log("username " + username + " room " + room);
      socket.emit("join", { username, room });
      setSession({ username, room });
    }
    e.target.reset();
  };
  const nameRef = useRef();
  const roomRef = useRef();
  return (
    <div className="auth">
      <div className="auth_content">
        <form className="auth_form" onSubmit={handleRoomEnter}>
          <h1 className="auth_heading">ChatApp</h1>
          <p className="label">User Name</p>
          <input
            type="text"
            name="username"
            id="username"
            className="inputtb"
            ref={nameRef}
          />
          <p className="label">Room</p>
          <input
            type="text"
            name="room"
            id="room"
            className="inputtb"
            ref={roomRef}
          />
          <input type="submit" value="Enter" className="submitauth" />
        </form>
      </div>
    </div>
  );
};

export default Auth;
