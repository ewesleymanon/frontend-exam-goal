import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import './assets/css/app.scss';

import Header from './components/Header';
import Slider from './components/Slider';
import News from './components/News';
import Footer from './components/Footer';
import Service from './components/Service';
import Login from './components/Login';
import Register from './components/Register';
import Breadcrumb from './components/Breadcrumb';
import CreatePost from './components/Post/create';
import Single from './components/Post/view';
import SingleEdit from './components/Post/edit';

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route path="/login">
            <Login/>  
            <div className="l-container">
              <News/>
            </div>
          </Route>
          <Route path="/register">
            <Register/>
            <div className="l-container">
              <News/>
            </div>
          </Route>
          <Route path="/news/single/edit/:id">
            <SingleEdit/>
          </Route>
          <Route path="/news/single/:id">
            <Single/>
          </Route>
          <Route path="/news/create">
            <Breadcrumb title="Create New Post"/>
            <CreatePost/>
          </Route>
          <Route path="/">
            <Slider/>
            <div className="l-container">
              <News/>
            </div>
          </Route>
        </Switch>
          
       
        <Service/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
