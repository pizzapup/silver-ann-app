import {auth} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import ChatBox from "./Chatbox";

export default function MsgApp() {
  const [user] = useAuthState(auth);

  return (
    <>
      hello
      <div className="App">
        <NavBar />
        {!user ? (
          <Welcome />
        ) : (
          <>
            <ChatBox />
          </>
        )}
      </div>
    </>
  );
}
