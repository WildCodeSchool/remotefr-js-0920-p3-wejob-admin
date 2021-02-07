/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const fetchRecruteurs = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/recruteurs`, {
      withCredentials: true,
    })
    .then(({ data }) => data);

const sanitize = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function ListRecrutors() {
  const [search, setSearch] = useState('');
  const [recruteurs, setRecruteurs] = useState([]);
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
      <div
        className="overflow-auto d-flex flex-wrap mt-2"
        style={{ maxHeight: '80vh' }}
      >
        {filteredRecruiters.map((r) => (
          <Recrutor key={r.id} {...r} />
        ))}
      </div>
    </>
  );
}

const Recrutor = ({ email, name, telephone: number, visits }) => {
  return (
    <div className="card m-3 p-3">
      <h4 className="fw-bold">{name}</h4>
      <h5>{email}</h5>
      <h5>{number}</h5>
      <p>visits: {visits?.length || 0}</p>
    </div>
  );
};
