import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './parts/Header/Header';
import ChangePassword from './pages/Authentication/ChangePassword';
import LogIn from './pages/Authentication/LogIn';
import CreateAnAccount from './pages/Authentication/CreateAnAccount';
import ForgotYourPassword from './pages/Authentication/ForgotYourPassword';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import JobeurForm from './pages/JobeurForm';
import './asset/css/style.css';
import './App.css';

function AppLayout({ children }) {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  // quand l'app s'initialise, je vais faire une req. au back pour savoir si je suis authentifié
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/check`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        if (!err.response) setNetworkError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (networkError) {
    return (
      <AppLayout>
        <div className="container">
          <div className="alert alert-danger">
            Une erreur s&#39;est produite : <code>{networkError.message}</code>.
            Veuillez ré-essayer ultérieurement.
          </div>
        </div>
      </AppLayout>
    );
  }
  if (isLoading) {
    return <AppLayout>Chargement...</AppLayout>;
  }
  return (
    <AppLayout>
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
      {!user && <Redirect to="/LogIn" />}
    </AppLayout>
  );
}

export default App;
