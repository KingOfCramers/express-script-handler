import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import history from "../../history";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export const Links = props => {
  const classes = useStyles();
  const handleNavigation = (event, item) => {
    props.toggleDrawer();
    history.push(item.link);
  };
  return (
    <div className={classes.root}>
      <List>
        {[
          { name: "Dashboard", link: "dashboard" },
          { name: "About", link: "about" },
          { name: "Contact", link: "contact" }
        ].map((item, index) => (
          <ListItem
            button
            key={item.name}
            disableRipple={true}
            centerRipple={false}
            onClick={event => handleNavigation(event, item)}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
