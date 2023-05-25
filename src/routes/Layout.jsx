import {NavLink, Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {Toolbar} from "@mui/material";
import {ParallaxProvider} from "react-scroll-parallax";

export default function Layout() {
  return (
    <>
      <ParallaxProvider>
        <Navbar />
        <Toolbar />
        <main>
          <Outlet />
        </main>
      </ParallaxProvider>
    </>
  );
}
