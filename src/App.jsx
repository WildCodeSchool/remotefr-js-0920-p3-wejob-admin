import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './parts/Header/Header';
import ChangePassword from './pages/Authentication/ChangePassword';
import LogIn from './pages/Authentication/LogIn';
import CreateAnAccount from './pages/Authentication/CreateAnAccount';
import ForgotYourPassword from './pages/Authentication/ForgotYourPassword';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import JobeurForm from './pages/JobeurForm';
import './asset/css/style.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/ForgotYourPassword">
          <ForgotYourPassword />
        </Route>
        <Route path="/CreateAnAccount">
          <CreateAnAccount />
        </Route>
        <Route path="/LogIn">
          <LogIn />
        </Route>
        <Route path="/ChangePassword">
          <ChangePassword />
        </Route>
        <Route path="/admin-panel">
          <AdminPanel />
        </Route>
        <Route exact path="/JobeurForm">
          <JobeurForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
