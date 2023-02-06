import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import { io } from "socket.io-client";
import useSessionContext from "./Hooks/useSessionContext";

const socket = io("http://localhost:4000/");

function App() {
  const { session } = useSessionContext();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={session ? <Home socket={socket} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!session ? <Auth socket={socket} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
