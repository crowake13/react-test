import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import { NoMatch } from './components/routes/NoMatch';
import { PrivateRoute } from './components/routes/PrivateRoute';
import * as ROUTES from './constants/routes';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.LANDING}>
          <LoginPage />
        </Route>

        <PrivateRoute path={ROUTES.LANDING}>
          <div id="body">
            <Switch>
              <Route path={ROUTES.APP}>
                <PostsPage />
              </Route>

              <Route path={ROUTES.POST}>
                <PostPage />
              </Route>

              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>

          <Header />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
