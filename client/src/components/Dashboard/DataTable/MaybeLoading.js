import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

export const useProgressStyles = makeStyles(theme => ({
    progress: { margin: theme.spacing(2) }
}));
  
export const MaybeLoading = ({ loading }) => {
    const classes = useProgressStyles();
    return loading ? <CircularProgress className={classes.progress} /> : null;
};

MaybeLoading.propTypes = {
    loading: PropTypes.bool
}