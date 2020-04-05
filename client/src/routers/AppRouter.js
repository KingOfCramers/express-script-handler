import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";

import Header from "../components/Header";
import history from "../history";

// Routes
//const NotFound = Loadable({
  //loader: () => import("../components/NotFound"),
  //loading: Loading
//});
//const ContactComponent = Loadable({
  //loader: () => import("../components/Contact"),
  //loading: Loading
//});
//const AboutComponent = Loadable({
  //loader: () => import("../components/About"),
  //loading: Loading
//});
//const HomeComponent = Loadable({
  //loader: () => import("../components/Home"),
  //loading: Loading
//});

import NotFound from "../components/NotFound";
import ContactComponent from "../components/Contact";
import AboutComponent from "../components/About";
import DashboardComponent from "../components/Dashboard";

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
        <Switch>
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/contact" component={ContactComponent} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/" component={DashboardComponent} exact={true} />
          <Route component={NotFound} />
        </Switch>
    </div>
  </Router>
);

export default AppRouter;
