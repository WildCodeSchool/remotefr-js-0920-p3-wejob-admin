// Si on passe ?autofill=true dans l'URL, ça injecte des valeurs
// const defaultValues =
//   window.location.search === '?autofill=true' ? sampleCandidateData : {};

const sampleCandidateData = {
  civility: 'Monsieur',
  firstname: 'Benoît',
  lastname: 'Hubert',
  email: '',
  diploma: 'Ingénieur ENIB',
  years_of_experiment: { value: '3', label: "Plus de 10 ans d'expérience" },
  language: [
    { value: '2', label: 'Anglais' },
    { value: '3', label: 'Espagnol' },
  ],
  sector_of_activity: [{ value: '14', label: 'Informatique – télécoms' }],
  isOpen_to_formation: false,
  description: 'Développeur web full-stack et formateur',
  availability: { value: '1', label: 'immédiatement' },
  mobility: { value: 'france', label: 'France' },
  linkedin: 'https://www.linkedin.com/in/benoithubertfr/?originalSubdomain=fr',
  youtube: 'https://www.youtube.com/channel/UCi99G_linkedin0QPx5sYsK8zdvQzfw',
  job: ['Développeur', 'Formateur'],
  keywords: ['PHP', 'JavaScript', 'Node.js', 'React'],
};

// const sampleCandidateData = {
//   civility: 'Madame',
//   firstname: 'Marie',
//   lastname: 'Durand',
//   email: '',
//   diploma: 'Ecole de Commerce (HEC Paris)',
//   years_of_experiment: { value: '2', label: "De 5 à 10 ans d'expérience" },
//   language: [
//     { value: '3', label: 'Espagnol' },
//     { value: '4', label: 'Italien' },
//     { value: '1', label: 'Français' },
//   ],
//   sector_of_activity: [
//     { value: '2', label: 'Agroalimentaire – vins & spiritueux' },
//     { value: '8', label: 'Commerce – négoce – distribution' },
//   ],
//   isOpen_to_formation: false,
//   description: 'Passionnée et motivée.',
//   availability: { value: '1', label: 'immédiatement' },
//   mobility: { value: 'gironde', label: 'Gironde' },
//   cv1: null,
//   cv2: null,
//   picture: null,

//   // champs convertis en tableau
//   job_input: 'Grossiste en boissons',
// };

export default sampleCandidateData;
