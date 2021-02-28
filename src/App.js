import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Slider from './components/Slider';
import News from './components/News';
import Footer from './components/Footer';

import './assets/css/app.scss';
import Service from './components/Service';
import Login from './components/Login';
import Register from './components/Register';
import Breadcrumb from './components/Breadcrumb';
import CreatePost from './components/Post/create';

const users = require('./json/users.json');
localStorage.setItem('users', JSON.stringify(users));

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route path="/login">
            <Login/>  
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/create-post">
            <Breadcrumb title="Create New Post"/>
            <CreatePost/>
          </Route>
          <Route path="/">
            <Slider/>
          </Route>
        </Switch>
        <div className="l-container">
          <News/>
        </div>
        <Service/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
