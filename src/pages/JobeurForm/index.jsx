import React from 'react';
import MultiStep from 'react-multistep';
import HeaderPostTitle from '../../components/HeaderPostTitle';
import ProfileForm from '../../components/ProfileForm';
import TrainingForm from '../../components/TrainingForm';

const steps = [
  { name: 'Profil', component: <ProfileForm /> },
  { name: 'Formations', component: <TrainingForm /> },
  { name: 'Expériences', component: 'Expériences' },
  { name: 'Recruteurs', component: 'Informations recruteurs' },
  {
    name: 'Documents',
    component: 'Télechargement de documents',
  },
];

function JobeurForm() {
  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Formulaire candidat" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <MultiStep showNavigation steps={steps} />
        </div>
      </div>
    </div>
  );
}

export default JobeurForm;
