import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {Toolbar} from "@mui/material";
import Theme from "../styles/Theme";

export default function Layout({activeUser}) {
  return (
    <>
      <Theme>
        <Navbar activeUser={activeUser} />
        <Toolbar />
        <main>
          <Outlet />
        </main>
      </Theme>
    </>
  );
}
