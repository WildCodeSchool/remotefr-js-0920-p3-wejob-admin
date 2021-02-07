import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import axios from 'axios';
import AppLayout from './parts/AppLayout';
import RouteByRole from './parts/RouteByRole';
import Loader from './parts/Loader';
import ChangePassword from './pages/Authentication/ChangePassword';
import LogIn from './pages/Authentication/LogIn';
import CreateAnAccount from './pages/Authentication/CreateAnAccount';
import ForgotYourPassword from './pages/Authentication/ForgotYourPassword';
import './asset/css/style.css';
import './asset/css/icomoon.css';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  // quand l'app s'initialise, je vais faire une req. au back pour savoir si je suis authentifié
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/check`, {
        withCredentials: true,
      })
      .then((response) => setUser(response.data))
      .catch((err) => {
        if (!err.response) setNetworkError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const logout = () =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => setUser(null))
      .then(() => NotificationManager.success('Vous êtes déconnecté'))
      .catch(() =>
        NotificationManager.error(
          'Erreur',
          'Veuillez réessayer ultérieurement',
        ),
      );

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
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }
  return (
    <AppLayout auth={{ user, setUser, logout }}>
      <Switch>
        <Route path="/mot-de-passe-oublie">
          <ForgotYourPassword />
        </Route>
        <Route path="/creation-compte">
          <CreateAnAccount />
        </Route>
        <Route path="/se-connecter">
          <LogIn />
        </Route>
        <Route path="/ChangePassword">
          <ChangePassword />
        </Route>

        <RouteByRole path="/" user={user} />
      </Switch>
      <NotificationContainer />
    </AppLayout>
  );
}

export default App;
