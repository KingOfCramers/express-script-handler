import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Links } from "./Links";

export const SideCar = props => {
  return (
    <Drawer open={props.open} anchor={"left"}>
      <IconButton color="inherit" variant="title" onClick={props.toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
      <Links {...props} />
    </Drawer>
  );
};
