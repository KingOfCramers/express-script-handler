import React, { Fragment, useState, useEffect } from "react";
import Fade from "@material-ui/core/Fade";

export const Fader = props => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

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
        <div>{props.children}</div>
      </Fade>
    </Fragment>
  );
};
