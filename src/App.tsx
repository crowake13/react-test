import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import { PrivateRoute } from './components/routes/PrivateRoute';
import * as ROUTES from './constants/routes';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Route exact path={ROUTES.LANDING}>
            <LoginPage />
          </Route>

          <PrivateRoute path={ROUTES.APP}>
            <PostsPage />
          </PrivateRoute>

          <PrivateRoute path={ROUTES.POST}>
            <PostPage />
          </PrivateRoute>
        </div>
      </div>
    </Router>
  );
};

export default App;
