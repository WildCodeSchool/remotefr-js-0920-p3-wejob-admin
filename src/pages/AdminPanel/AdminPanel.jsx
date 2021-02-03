/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import ModifyJobber from './ModifyJobber';
import ListRecrutors from './ListRecrutors';
import AddJobber from './AddJobber';
import CandidatsContext from './CandidatsContext';
import './AdminPanel.css';

const fetchCandidats = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/candidats`, {
      withCredentials: true,
    })
    .then(({ data }) => data);

export default function AdminPanelContainer() {
  const [error, setError] = useState(null);
  const [candidats, setCandidats] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchCandidats()
      .then(setCandidats)
      .catch((err) => setError(err));
  }, [location]);
  return (
    <CandidatsContext.Provider
      value={{
        candidats,
        refresh: () => fetchCandidats().then(setCandidats),
        add: (candidat) =>
          setCandidats((prevCandidats) => [...prevCandidats, candidat]),
        update: (candidat) =>
          setCandidats((prevCandidats) =>
            prevCandidats.map((c) =>
              c.id === candidat.id ? { ...candidat } : c,
            ),
          ),
        delete: (candidat) =>
          setCandidats((prevCandidats) =>
            prevCandidats.filter((c) => c.id !== candidat.id),
          ),
      }}
    >
      {error && <div className="alert alert-danger">error.message</div>}
      <AdminPanel />
    </CandidatsContext.Provider>
  );
}

function AdminPanel() {
  const { path, url } = useRouteMatch();
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
  const { candidats } = useContext(CandidatsContext);
  return (
    <>
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

const getPictureUrl = (pic) => {
  if (!pic)
    return 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  return /^https?:\/\/.*/.test(pic)
    ? pic
    : `${process.env.REACT_APP_BACK_URL}/${pic}`;
};

const getStatusBtnSpecs = (ficheId, isCheck) => {
  if (!ficheId) return { text: 'Nouveau', color: 'danger' };
  return isCheck
    ? { text: 'Visible', color: 'success' }
    : { text: 'En attente', color: 'warning' };
};

const Candidat = ({
  id,
  user_fiche_id: ficheId,
  lastname,
  firstname,
  email,
  picture,
  isCheck,
  sector_of_activity,
}) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const { text: btnText, color: btnColor } = getStatusBtnSpecs(
    ficheId,
    isCheck,
  );

  return (
    <div className="card d-flex flex-sm-row align-items-center my-2">
      <img
        className="m-2 rounded-circle w-100 h-100"
        style={{ maxWidth: '5em', maxHeight: '5em' }}
        src={getPictureUrl(picture)}
        alt={lastname}
      />
      <div className="m-2 d-flex flex-lg-row justify-content-lg-around flex-column w-100 align-items-center">
        <p className="text-primary">
          {lastname || '?'} {firstname || '?'}
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
              key={s.id_sector}
            >
              {s.name_sector}
            </p>
          ))}
        </div>
        <Link
          to={`${url}jobber/${id}`}
          className={`btn btn-wide btn-${btnColor}`}
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};
