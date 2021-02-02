import axios from 'axios';
import reformatHookFormData from './reformatHookFormData';

export default function sendFicheCandidat(userId, dataForm, kwTag, jobTag, files) {
  const {
    availability,
    keywords,
    language,
    mobility,
    sector_of_activity: sectorOfActivity,
    years_of_experiment: yearsOfExperiment,
    ...nonReformattedFields
  } = dataForm;
  // Reformater une partie des champs avant envoi
  // Tout le code de Jonathan pour reformater ces champs a été déplacé
  // de onSubmit à reformatHookFormData, qu'on appelle ici.
  const formattedFields = reformatHookFormData(
    {
      availability,
      keywords,
      language,
      mobility,
      sector_of_activity: sectorOfActivity,
      years_of_experiment: yearsOfExperiment,
    },
    kwTag,
    jobTag,
  );
  const jsonPayload = { ...formattedFields, ...nonReformattedFields };

  // TODO: utiliser id récupéré depuis le contexte où est stocké
  // l'utilisateur authentifié
  return axios
    .put(
      `${process.env.REACT_APP_API_URL}/candidats/${userId}`,
      jsonPayload,
      { withCredentials: true },
    )
    .then(() => {
      // La 1ère requête a fonctionné
      // FormData pour envoi des pdf & images en multipart/form-data
      // Sera traité par multer côté back
      const formdata = new FormData();
      ['cv1', 'cv2', 'picture'].forEach((key) => {
        const value = files[key];
        if (value) formdata.append(key, value);
      });
      // TODO: Il faudra authentifier la requête
      return axios.post(
        `${process.env.REACT_APP_API_URL}/candidats/${userId}/files`,
        formdata,
        { withCredentials: true },
      );
    })
    // TODO: gérer l'erreur via un hook de state
    // (afficher une alerte Bootstrap, ou une notif. par exemple avec Noty)

    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
}