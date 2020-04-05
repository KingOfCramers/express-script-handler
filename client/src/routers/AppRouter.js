import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";
import Loadable from "react-loadable";

import Loading from "../components/Loading";
import Header from "../components/Header";

// Routes
const NotFound = Loadable({
  loader: () => import("../components/NotFound"),
  loading: Loading
});
const ContactComponent = Loadable({
  loader: () => import("../components/Contact"),
  loading: Loading
});
const AboutComponent = Loadable({
  loader: () => import("../components/About"),
  loading: Loading
});
const HomeComponent = Loadable({
  loader: () => import("../components/Home"),
  loading: Loading
});

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
        <Switch>
          <Route path="/" component={HomeComponent} exact={true} />
          <Route path="/contact" component={ContactComponent} />
          <Route path="/about" component={AboutComponent} />
          <Route component={NotFound} />
        </Switch>
    </div>
  </Router>
);

export default AppRouter;
