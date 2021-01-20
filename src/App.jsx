import React from 'react';
import { Route } from 'react-router-dom';
import ChangePassword from './pages/Authentication/ChangePassword';
import JobeurForm from './pages/JobeurForm';
import './asset/css/style.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/ChangePassword">
        <ChangePassword />
      </Route>
      <Route exact path="/">
        <JobeurForm />
      </Route>
    </div>
  );
}

export default App;
