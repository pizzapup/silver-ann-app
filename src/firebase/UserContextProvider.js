import {useState, createContext} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {toast} from "react-toastify";
import {useEffect} from "react";

const auth = getAuth();
export const UserContext = createContext();

export default function UserContextProvider({children}) {
  const [userCurr, setCurrUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("signed in: ", user.displayName);
        setCurrUser(user);
        toast(`Welcome ${user.displayName}!`);
      } else {
        console.log("signed out");
        // toast(`Signed out successfully`);
        setCurrUser(null);
      }
    });
  }, [userCurr]);
  return (
    <UserContext.Provider value={userCurr}>{children}</UserContext.Provider>
  );
}
