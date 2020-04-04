import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from "history";
import loadable from 'react-loadable';

// Routes
import NotFoundPage from '../components/NotFoundPage';
const LoadingComponent = () => <h3>Please wait...</h3>;
const AsyncContactComponent = loadable({
  loader: () => import("../components/contact.component"),
  loading: LoadingComponent
});
const AsyncAboutComponent = loadable({
  loader: () => import("../components/about.component"),
  loading: LoadingComponent
});
const AsyncHomeComponent = loadable({
  loader: () => import("../components/home.component"),
  loading: LoadingComponent
});


export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={AsyncHomeComponent} exact={true} />
        <Route path="/contact" component={AsyncContactComponent} />
        <Route path="/about" component={AsyncAboutComponent} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
