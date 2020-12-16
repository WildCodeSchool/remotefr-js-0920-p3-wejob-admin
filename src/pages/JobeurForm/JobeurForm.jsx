import React from 'react';
import MultiStep from 'react-multistep';
import HeaderPostTitle from '../../components/HeaderPostTitle';

const steps = [
  { component: 'Profil' },
  { component: 'Formations' },
  { component: 'Expériences' },
  { component: 'Informations recruteurs' },
  { component: 'Télechargement de documents' },
];

function JobeurForm() {
  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Formulaire candidat" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <MultiStep steps={steps} />
        </div>
      </div>
    </div>
  );
}

export default JobeurForm;
