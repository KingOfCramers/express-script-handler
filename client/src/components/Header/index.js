import React, { useState, useEffect, Fragment } from "react";

import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Fade from "@material-ui/core/Fade";
import Drawer from "@material-ui/core/Drawer";

import { makeStyles } from "@material-ui/core/styles";

import Links from "../Links";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  toolbarMargin: theme.mixins.toolbar,
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawer: {
  }
}));

const Header = () => {
  const classes = useStyles();

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <Fragment>
      <Fade in={!scrolling}>
        <Fragment>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                variant="title"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h3" color="inherit" className={classes.flex}>
                Title
              </Typography>
              <Button>Login</Button>
            </Toolbar>
          </AppBar>
          <Drawer className={classes.drawer} anchor="left" open={open}>
            <IconButton onClick={handleDrawerClose}>
              <Links />
            </IconButton>
          </Drawer>
        </Fragment>
      </Fade>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

export default Header;
