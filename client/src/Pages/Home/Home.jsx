import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { BiArrowBack } from "react-icons/bi";
import useSessionContext from "../../Hooks/useSessionContext";

const Home = ({ socket }) => {
  const msgRef = useRef();
  console.log({ socket });
  const { setSession, session } = useSessionContext();
  const [msg, setMsg] = useState([]);

  const handleMsgSend = (e) => {
    e.preventDefault();
    const newText = msgRef.current.value;
    socket.emit("postMessage", {
      message: newText,
      room: session.room,
      isToast: false,
      user: session.username,
    });
    setMsg((prev) => [
      ...prev,
      {
        message: newText,
        room: session.room,
        isToast: false,
        user: session.username,
      },
    ]);
    e.target.reset();
  };

  useEffect(() => {
    socket.on("joined", (payload) => {
      //welcome to room doest reach
      console.log(payload);
      setMsg((prev) => [...prev, payload]);
    });
    socket.on("message", (payload) => {
      //welcome to room doest reach
      console.log(payload);
      setMsg((prev) => [...prev, payload]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const isSender = (each) => {
    if (each.user == session.username) {
      return { float: "right" };
    } else {
      return { float: "left" };
    }
  };

  return (
    <div className="home">
      <div className="home_contain">
        <div className="chat_contain">
          <div className="chat_header">
            <BiArrowBack
              onClick={() => {
                setSession(null);
              }}
            />
            <h2>Room title</h2>
          </div>
          <div className="chat_section">
            {msg &&
              msg.length > 0 &&
              msg.map((each) => {
                console.log(each);
                return (
                  <div className="chatbox">
                    <div className="bubble" style={isSender(each)}>
                      <p className="sender">{each.user}</p>
                      <p>{each.message}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <form className="chat_footer" onSubmit={handleMsgSend}>
            <input
              type="text"
              name="msg_tb"
              id="msg_tb"
              className="msg_tb"
              ref={msgRef}
            />
            <input type="submit" value="send" className="msg_submit" />
          </form>
        </div>

        <div className="room_info_contain">
          <h2 className="info_title">Online</h2>
          <div className="online_contain">
            <div className="online_card">
              <div className="bobble" />
              <p>lorem ipsum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
