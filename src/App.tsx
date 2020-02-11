import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import * as ROUTES from './constants/routes';
import { LoginPage } from './pages/LoginPage';
import { PostPage } from './pages/PostPage';
import { PostsPage } from './pages/PostsPage';

const App = () => {
  return (
    <Router>
      <div>
        <header></header>
        <div>
          <Route exact path={ROUTES.LANDING} component={LoginPage} />
          <Route path={ROUTES.APP} component={PostsPage} />
          <Route path={ROUTES.POST} component={PostPage} />
        </div>
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;
