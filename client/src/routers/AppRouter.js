import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";

import { Header } from "../components/Header";
import history from "../history";

const NotFound = lazy(() => import("../components/NotFound/NotFound"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const About = lazy(() => import("../components/About/About"));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/" component={Dashboard} exact={true} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  </Router>
);

export default AppRouter;
