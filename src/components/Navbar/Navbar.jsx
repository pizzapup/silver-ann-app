import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {pages} from "../../App";
import {NavLink} from "react-router-dom";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from "@mui/material";
import {cloneElement, useState} from "react";

export const Navbar = (props) => {
  function ElevationScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
    return cloneElement(children, {
      elevation: trigger ? 2 : 0,
      id: trigger ? "scrolling" : "top",
      // scrolling styles continued in scss
    });
  }
  const {window} = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawerWidth = 240;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <Typography variant="h5" sx={{my: 2}}>
        M & E
      </Typography>
      <Divider />
      <List>
        {/* NAVMENU */}
        {pages.map((item, i) => (
          <ListItem key={`${item}-${i}`} disablePadding>
            <ListItemButton
              sx={{textAlign: "center"}}
              component={NavLink}
              to={`/${item.path}`}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{display: "flex"}}>
        <ElevationScroll {...props}>
          <AppBar component="nav" className={`navbar`}>
            {/* .navbar styles in scss */}
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{mr: 2, display: {sm: "none"}, color: "black"}}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{
                  flexGrow: 1,
                  color: "black",
                  display: {xs: "none", sm: "block"},
                }}
              >
                M & E
              </Typography>
              {/* NAVBAR */}
              <Box sx={{display: {xs: "none", sm: "block"}}}>
                {pages.map((item, i) => (
                  <Button
                    key={`${item}-${i}`}
                    component={NavLink}
                    to={`/${item.path}`}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: "block", sm: "none"},

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};
export default Navbar;
