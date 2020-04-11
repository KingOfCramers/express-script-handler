import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Appbar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Fader } from "../Fader";
import { SideCar } from "../SideCar";

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
  drawer: {}
}));

export const Header = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <Fader>
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
      <SideCar open={open} toggleDrawer={toggleDrawer} />
    </Fader>
  );
};