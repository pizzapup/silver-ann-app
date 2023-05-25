import {NavLink, Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {Toolbar} from "@mui/material";
import Theme from "../styles/Theme";

export default function Layout() {
  return (
    <>
      <Theme>
        <Navbar />
        <Toolbar />
        <main>
          <Outlet />
        </main>
      </Theme>
    </>
  );
}
