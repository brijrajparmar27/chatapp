import { useContext } from "react";
import { SessionContext } from "../Context/SessionContext";

const useSessionContext = () => {
  const { session, setSession } = useContext(SessionContext);
  return { session, setSession };
};

export default useSessionContext;
