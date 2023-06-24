import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {Toolbar} from "@mui/material";
import Theme from "../styles/Theme";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import UserContextProvider from "../firebase/UserContextProvider";

export default function Layout({activeUser}) {
  return (
    <>
      <UserContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Theme>
            <Navbar activeUser={activeUser} />
            <Toolbar />
            <main>
              <Outlet />
            </main>
          </Theme>
        </LocalizationProvider>
      </UserContextProvider>
    </>
  );
}
