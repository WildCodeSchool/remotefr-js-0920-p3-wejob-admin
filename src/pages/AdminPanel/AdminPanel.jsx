/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import axios from 'axios';
import fakeCandidats from './candidat.json';
import ModifyJobber from './ModifyJobber';
import ListRecrutors from './ListRecrutors';
import AddJobber from './AddJobber';

export default function AdminPanel() {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <div className="container-fluid">
      <div className="row d-block d-sm-flex flex-row">
        <div className="col-md-3 d-flex flex-column mb-3">
          <Link
            className="text-secondary text-decoration-underline"
            to={`${url}`}
          >
            Liste des Jobbers
          </Link>
          <Link
            className="text-secondary text-decoration-underline"
            to={`${url}add-jobber`}
          >
            Ajouter un Jobbeur
          </Link>
          <Link
            className="text-secondary text-decoration-underline"
            to={`${url}list-of-recrutors`}
          >
            Listes des recruteurs
          </Link>
          <Link
            className="text-secondary text-decoration-underline"
            to={`${url}settings`}
          >
            Réglages
          </Link>
        </div>
        <div className="col-md-9 ">
          <Switch>
            <Route path={`${path}jobber/:id`}>
              <ModifyJobber />
            </Route>
            <Route path={`${path}add-jobber`} component={AddJobber} />
            <Route
              path={`${path}list-of-recrutors`}
              component={ListRecrutors}
            />
            <Route path={`${path}settings`} />
            <Route exact path={path}>
              <CandidatList />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

const CandidatList = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [candidats, setCandidats] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/candidats`)
      .then(({ data }) => setCandidats([...data, ...fakeCandidats]))
      .catch((err) => setError(err));
  }, []);
  return (
    <>
      {error && <div className="alert alert-danger">error.message</div>}
      <input
        type="text"
        className="form-control"
        placeholder="Nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-auto mt-2" style={{ height: '80vh' }}>
        {search === ''
          ? candidats.map((c) => <Candidat key={c.id} {...c} />)
          : candidats
              .filter(
                (c) =>
                  c.firstname.includes(search) || c.lastname.includes(search),
              )
              .map((c) => <Candidat key={c.id} {...c} />)}
      </div>
    </>
  );
};

const Candidat = ({
  id,
  lastname,
  firstname,
  email,
  picture,
  isCheck,
  sector_of_activity,
}) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  return (
    <div className="card d-flex flex-sm-row align-items-center my-2">
      <img
        className="m-2 rounded-circle w-100 h-100"
        style={{ maxWidth: '5em', maxHeight: '5em' }}
        src="https://randomuser.me/api/portraits/men/44.jpg"
        alt={lastname}
      />
      <div className="m-2 d-flex flex-lg-row justify-content-lg-around flex-column w-100 align-items-center">
        <p className="text-primary">
          {lastname} {firstname}
        </p>
        <p className={email ? 'text-success' : 'text-danger'}>
          {email || 'Email manquant'}
        </p>
        <div>
          {sector_of_activity.map((s) => (
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '10em',
              }}
              key={s.id}
            >
              {s.name_sector}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            history.push(`${url}/jobber/${id}`);
          }}
          style={{ width: '7em' }}
          className={isCheck ? 'btn btn-success' : 'btn btn-danger'}
        >
          {isCheck ? 'Visible' : 'En attente'}
        </button>
      </div>
    </div>
  );
};
