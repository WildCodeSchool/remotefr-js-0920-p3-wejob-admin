/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';

export default function AddJobber() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    axios
      .post(`${process.env.REACT_APP_API_URL}/candidats`, { email })
      .then(() => {
        console.log('added');
        setEmail('');
      })
      .catch(console.error);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <button className="btn btn-primary my-2" type="submit">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
