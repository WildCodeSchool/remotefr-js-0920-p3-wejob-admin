/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import recrutors from './recrutors.json';

export default function ListRecrutors() {
  const [search, setSearch] = useState('');
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
        {search === ''
          ? recrutors.map((r) => <Recrutor key={r.id} {...r} />)
          : recrutors
              .filter((r) => r.name.includes(search))
              .map((r) => <Recrutor key={r.id} {...r} />)}
      </div>
    </>
  );
}

const Recrutor = ({ email, name, number }) => {
  return (
    <div className="card m-3 p-3">
      <h4 className="fw-bold">{name}</h4>
      <h5>{email}</h5>
      <h5>{number}</h5>
    </div>
  );
};
