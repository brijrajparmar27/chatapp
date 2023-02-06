import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { BiArrowBack } from "react-icons/bi";
import useSessionContext from "../../Hooks/useSessionContext";

const Home = ({ socket }) => {
  const msgRef = useRef();

  const { setSession } = useSessionContext();
  const [msg, setMsg] = useState();

  const handleMsgSend = (e) => {
    e.preventDefault();
    const newText = msgRef.current.value;
    // newText && console.log(newText);
    e.target.reset();
  };

  useEffect(() => {
    socket.on("message", ({ message, isToast }) => {
      setMsg((prev) => [...prev, { message, isToast }]);
    });
  }, []);

  useEffect(() => {
    msg && console.log(msg);
  }, [msg]);

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
              msg.map((each) => {
                console.log(each);
                return <p>{each.message}</p>;
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
