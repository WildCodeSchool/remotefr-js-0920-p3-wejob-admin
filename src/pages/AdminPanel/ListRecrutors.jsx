/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const fetchRecruteurs = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/recruteurs`, {
      withCredentials: true,
    })
    .then(({ data }) =>
      data.sort((recA, recB) => {
        if (!recA.visits && !recB.visits) return 0;
        if (recA.visits && !recB.visits) return -1;
        if (!recA.visits && recB.visits) return 1;
        if (recA.visits[0] > recB.visits[0]) return -1;
        if (recA.visits[0] < recB.visits[0]) return 1;
        return 0;
      }),
    );

const sanitize = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const formatTimestamp = (ts) => {
  const d = new Date(ts);
  const m = d.toISOString().match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return 'Err';
  const [, year, month, day, hour, min] = m;
  return `${day}/${month}/${year} ${hour}:${min}`;
};

export default function ListRecrutors() {
  const [search, setSearch] = useState('');
  const [recruteurs, setRecruteurs] = useState([]);
  const [selectedRecruteur, setSelectedRecruteur] = useState(null);
  const filteredRecruiters = useMemo(() => {
    const sanSearch = sanitize(search);
    return search === ''
      ? recruteurs
      : recruteurs.filter((r) => sanitize(r.name).includes(sanSearch));
  }, [recruteurs, search]);

  useEffect(() => {
    fetchRecruteurs().then(setRecruteurs);
  }, []);
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-auto row mt-2" style={{ maxHeight: '80vh' }}>
        <div className="col-md-8">
          {filteredRecruiters.map((r) => (
            <Recrutor
              key={r.id}
              {...r}
              setSelected={() => setSelectedRecruteur(r)}
            />
          ))}
        </div>
        <div className="col-md-4">
          <ul className="list-group">
            {selectedRecruteur?.visits?.map((v) => (
              <li className="list-group-item">{formatTimestamp(v)}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const Recrutor = ({ email, name, telephone: number, visits, setSelected }) => {
  const visitsCount = visits?.length || 0;
  return (
    <div className="card mb-3 p-3">
      <h4 className="fw-bold">{name}</h4>
      <p>
        {email} &mdash; {number}
      </p>
      <p>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={setSelected}
          disabled={visitsCount === 0}
        >
          Détail visites ({visitsCount})
        </button>
      </p>
    </div>
  );
};
