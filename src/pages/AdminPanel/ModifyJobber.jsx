/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ModifyJobber() {
  const [error, setError] = useState(null);
  const [jobber, setJobber] = useState(null);
  const [language, setLanguage] = useState([]);
  const [sector, setSector] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [tagJob, setTagJob] = useState([]);
  const [inputTagKw, setInputTagKw] = useState('');
  const [tagKw, setTagKw] = useState([]);
  const { id: idjob } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const sub = data;
    sub.sector_of_activity = sector;
    sub.language = language;
    sub.job = tagJob.map((t, itt) => ({ id_job: itt, name_job: t }));
    sub.keywords = tagKw.join(';');
  };

  const handleChangeSector = (e) => {
    if (!e.target.checked) {
      setSector(sector.filter((l) => l.id_sector !== Number(e.target.name)));
    } else {
      setSector((prev) => [
        ...prev,
        { id_sector: Number(e.target.name), name_sector: e.target.value },
      ]);
    }
  };

  const handleDeleteTagJob = (e, name) => {
    e.preventDefault();
    setTagJob(tagJob.filter((t) => t !== name));
  };

  const handleSubmitInputTag = (e) => {
    e.preventDefault();
    setTagJob((prev) => [...prev, inputTag]);
    setInputTag('');
  };

  const handleDeleteTagKw = (e, name) => {
    e.preventDefault();
    setTagKw(tagKw.filter((t) => t !== name));
  };

  const handleSubmitInputTagKw = (e) => {
    e.preventDefault();
    setTagKw((prev) => [...prev, inputTagKw]);
    setInputTagKw('');
  };

  const handleChangeLanguage = (e) => {
    if (!e.target.checked) {
      setLanguage(
        language.filter((l) => l.id_language !== Number(e.target.name)),
      );
    } else {
      setLanguage((prev) => [
        ...prev,
        { id_language: Number(e.target.name), language: e.target.value },
      ]);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/candidats/${idjob}`, {
        withCredentials: true,
      })
      .then(({ data }) => setJobber(data))
      .catch((err) => setError(err));
  }, []);
  if (!jobber)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  return (
    <>
      {error && <div className="alert alert-danger">error.message</div>}
      <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="fw-bold">Général</h3>
        <div className="row align-items-center">
          <div className="form-floating mb-3 col-md-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              defaultValue={jobber.email}
              ref={register}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3 col-md-3">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              defaultValue={jobber.lastname}
              ref={register}
            />
            <label htmlFor="floatingInput">Nom</label>
          </div>
          <div className="form-floating mb-3 col-md-3">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              defaultValue={jobber.firstname}
              ref={register}
            />
            <label htmlFor="firstname">Prénom</label>
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="civility"
                id="male"
                value="Monsieur"
                ref={register}
                defaultChecked={jobber.civility === 'Monsieur'}
              />
              <label className="form-check-label" htmlFor="male">
                Homme
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="civility"
                id="female"
                value="Madame"
                defaultChecked={jobber.civility === 'Madame'}
                ref={register}
              />
              <label className="form-check-label" htmlFor="female">
                Femme
              </label>
            </div>
          </div>
        </div>
        <h3 className="fw-bold">Formations</h3>
        <div className="row align-items-center">
          <div className="form-floating mb-3 col-md-4">
            <input
              type="text"
              className="form-control"
              id="diploma"
              name="diploma"
              defaultValue={jobber.diploma}
              ref={register}
            />
            <label htmlFor="floatingInput">Diplôme</label>
          </div>
          <div className="col-md-4">
            <select
              ref={register}
              className="form-select"
              id="years_of_experiment"
              name="years_of_experiment"
              aria-label="Default select example"
            >
              <option value="0">De 0 à 5 ans d'expérience</option>
              <option value="1">De 5 à 10 ans d'expérience</option>
              <option value="2">Plus de 10 ans d'expérience</option>
            </select>
          </div>
          <div className="col-md-4 d-flex flex-wrap">
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Anglais"
                name="1"
                id="lang_en"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 1) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_en">
                Anglais
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Espagnol"
                name="2"
                id="lang_sp"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 2) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_sp">
                Espagnol
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Italien"
                name="3"
                id="lang_it"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 3) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_it">
                Italien
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Arabe"
                name="4"
                id="lang_ar"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 4) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_ar">
                Arabe
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Chinois"
                name="5"
                id="lang_ch"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 5) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_ch">
                Chinois
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Allemand"
                name="6"
                id="lang_de"
                onChange={handleChangeLanguage}
                defaultChecked={
                  language.find((l) => l.id_language === 6) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="lang_de">
                Allemand
              </label>
            </div>
          </div>
        </div>
        <h3 className="fw-bold">Expériences professionnelles</h3>
        <div className="row">
          <div className="col d-flex flex-wrap">
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Aéronautique"
                name="1"
                onChange={handleChangeSector}
                id="sector_aeronautique"
                defaultChecked={
                  sector.find((l) => l.id_sector === 1) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="sector_aeronautique">
                Aéronautique
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Agroalimentaire - vins & spiritueux"
                name="2"
                onChange={handleChangeSector}
                id="sector_agro"
                defaultChecked={
                  sector.find((l) => l.id_sector === 2) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="sector_agro">
                Agroalimentaire - vins & spiritueux
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Automobile : machines et équipements"
                name="3"
                onChange={handleChangeSector}
                id="sector_auto"
                defaultChecked={
                  sector.find((l) => l.id_sector === 3) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="sector_auto">
                Automobile : machines et équipements
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Banque - Assurance"
                name="4"
                onChange={handleChangeSector}
                id="sector_banq"
                defaultChecked={
                  sector.find((l) => l.id_sector === 4) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="sector_banq">
                Banque - Assurance
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Bois – papier – carton – imprimerie, plastique, caoutchouc"
                name="5"
                defaultChecked={
                  sector.find((l) => l.id_sector === 5) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_bois"
              />
              <label className="form-check-label" htmlFor="sector_bois">
                Bois – papier – carton – imprimerie, plastique, caoutchouc
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="BTP – matériaux de construction"
                name="6"
                defaultChecked={
                  sector.find((l) => l.id_sector === 6) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_btp"
              />
              <label className="form-check-label" htmlFor="sector_btp">
                BTP – matériaux de construction
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Chimie - Parachimie"
                name="7"
                defaultChecked={
                  sector.find((l) => l.id_sector === 7) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_chimie"
              />
              <label className="form-check-label" htmlFor="sector_chimie">
                Chimie - Parachimie
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Commerce - negoce - distribution"
                name="8"
                defaultChecked={
                  sector.find((l) => l.id_sector === 8) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_comm"
              />
              <label className="form-check-label" htmlFor="sector_comm">
                Commerce - negoce - distribution
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Economie Sociale & Solidaire"
                name="9"
                defaultChecked={
                  sector.find((l) => l.id_sector === 9) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_eco"
              />
              <label className="form-check-label" htmlFor="sector_eco">
                Economie Sociale & Solidaire
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Edition - communication - multimédia"
                name="10"
                defaultChecked={
                  sector.find((l) => l.id_sector === 10) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_edit"
              />
              <label className="form-check-label" htmlFor="sector_edit">
                Edition - communication - multimédia
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Electronique - électricité"
                name="11"
                defaultChecked={
                  sector.find((l) => l.id_sector === 11) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_elec"
              />
              <label className="form-check-label" htmlFor="sector_elec">
                Electronique - électricité
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Etudes et Conseils"
                name="12"
                onChange={handleChangeSector}
                id="sector_etud"
                defaultChecked={
                  sector.find((l) => l.id_sector === 12) !== undefined
                }
              />
              <label className="form-check-label" htmlFor="sector_etud">
                Etudes et Conseils
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Industrie pharmaceutique - biotechnologies"
                name="13"
                defaultChecked={
                  sector.find((l) => l.id_sector === 13) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_ind"
              />
              <label className="form-check-label" htmlFor="sector_ind">
                Industrie pharmaceutique - biotechnologies
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Informatique - télécoms"
                name="14"
                defaultChecked={
                  sector.find((l) => l.id_sector === 14) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_info"
              />
              <label className="form-check-label" htmlFor="sector_info">
                Informatique - télécoms
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Métallurgie - travail du métal"
                name="15"
                defaultChecked={
                  sector.find((l) => l.id_sector === 15) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_met"
              />
              <label className="form-check-label" htmlFor="sector_met">
                Métallurgie - travail du métal
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Public : éducation, justice, armée…"
                name="16"
                defaultChecked={
                  sector.find((l) => l.id_sector === 16) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_pub"
              />
              <label className="form-check-label" htmlFor="sector_pub">
                Public : éducation, justice, armée…
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Santé - service à la personne"
                name="17"
                defaultChecked={
                  sector.find((l) => l.id_sector === 17) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_sant"
              />
              <label className="form-check-label" htmlFor="sector_sant">
                Santé - service à la personne
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Textile - habillement - chaussure"
                name="18"
                defaultChecked={
                  sector.find((l) => l.id_sector === 18) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_text"
              />
              <label className="form-check-label" htmlFor="sector_text">
                Textile - habillement - chaussure
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Transport - logistique"
                name="19"
                defaultChecked={
                  sector.find((l) => l.id_sector === 19) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_trans"
              />
              <label className="form-check-label" htmlFor="sector_trans">
                Transport - logistique
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Autres services aux entreprises"
                name="20"
                defaultChecked={
                  sector.find((l) => l.id_sector === 20) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_autre1"
              />
              <label className="form-check-label" htmlFor="sector_autre1">
                Autres services aux entreprises
              </label>
            </div>
            <div className="form-check me-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Autres"
                name="21"
                defaultChecked={
                  sector.find((l) => l.id_sector === 21) !== undefined
                }
                onChange={handleChangeSector}
                id="sector_autre2"
              />
              <label className="form-check-label" htmlFor="sector_autre2">
                Autres
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 ">
            <div className="form-floating mb-3 d-flex flex-row">
              <input
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitInputTag(e);
                  }
                }}
                type="text"
                className="form-control"
                id="job_tag"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
              />
              <label htmlFor="job_tag">Métiers</label>
              <button
                onClick={handleSubmitInputTag}
                type="button"
                className="btn btn-primary"
              >
                Ajouter
              </button>
            </div>
          </div>
          <div className="col-md-8">
            {tagJob.map((t) => (
              <button
                onClick={(e) => {
                  handleDeleteTagJob(e, t);
                }}
                key={t}
                type="button"
                className="btn btn-secondary mx-1 my-1"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 ">
            <div className="form-floating mb-3 d-flex flex-row">
              <input
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitInputTagKw(e);
                  }
                }}
                type="text"
                className="form-control"
                id="job_tag"
                value={inputTagKw}
                onChange={(e) => setInputTagKw(e.target.value)}
              />
              <label htmlFor="job_tag">Mots - Clés</label>
              <button
                onClick={handleSubmitInputTagKw}
                type="button"
                className="btn btn-primary"
              >
                Ajouter
              </button>
            </div>
          </div>
          <div className="col-md-8">
            {tagKw.map((t) => (
              <button
                onClick={(e) => {
                  handleDeleteTagKw(e, t);
                }}
                key={t}
                type="button"
                className="btn btn-secondary mx-1 my-1"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <h3 className="fw-bold">Informations</h3>
        <div className="row align-items-center">
          <div className="col">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="isOpen_to_formation"
                id="formatation"
                defaultChecked={jobber.isOpen_to_formation}
                ref={register}
              />
              <label className="form-check-label" htmlFor="formation">
                Formation
              </label>
            </div>
          </div>
          <div className="col">
            <label htmlFor="availability">Disponible</label>
            <select
              ref={register}
              className="form-select"
              id="availability"
              name="availability"
              aria-label="Default select example"
            >
              <option value="0">Immédiatement</option>
              <option value="1">Autres</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="mobility">Disponible</label>
            <select
              ref={register}
              className="form-select"
              id="mobility"
              name="mobility"
              aria-label="Default select example"
            >
              <option value="0">Bordeaux</option>
              <option value="1">Gironde</option>
              <option value="2">Nouvelle Aquitaine</option>
              <option value="3">France</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <div className="form-floating">
              <textarea
                name="description"
                className="form-control"
                placeholder="Leave a comment here"
                id="description"
                style={{ height: '10rem' }}
                ref={register}
              />
              <label htmlFor="description">Description</label>
            </div>
          </div>
        </div>
        <h3 className="fw-bold">Liens</h3>
        <div className="row">
          <div className="form-floating mb-3 col-md-4">
            <input
              type="text"
              className="form-control"
              id="linkedin"
              name="linkedin"
              defaultValue={jobber.linkedin}
              ref={register}
            />
            <label htmlFor="linkedin">Lien Linkedin</label>
          </div>
          <div className="form-floating mb-3 col-md-4">
            <input
              type="text"
              className="form-control"
              id="youtube"
              name="youtube"
              defaultValue={jobber.youtube}
              ref={register}
            />
            <label htmlFor="linkedin">Lien Youtube</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {!jobber.cv1 && <a href={jobber.cv1}>Lien Cv 1</a>}
            {!jobber.cv2 && <a href={jobber.cv1}>Lien Cv 2</a>}
            <div className="input-group my-3">
              <label className="input-group-text" htmlFor="cv1">
                Cv1
              </label>
              <input
                type="file"
                name="cv1"
                ref={register}
                className="form-control"
                id="cv1"
              />
            </div>
            <div className="input-group my-3">
              <label className="input-group-text" htmlFor="cv2">
                Cv2
              </label>
              <input
                type="file"
                name="cv2"
                ref={register}
                className="form-control"
                id="cv2"
              />
            </div>
          </div>
          <div className="col-md-4">
            {jobber.picture && <a href={jobber.picture}>Photo profil</a>}
            <div className="input-group my-3">
              <label className="input-group-text" htmlFor="picture">
                Photo
              </label>
              <input
                type="file"
                name="picture"
                ref={register}
                className="form-control"
                id="picture"
              />
            </div>
          </div>
        </div>
        <div className="col-12 mb-5 d-flex">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
          <div className="form-check form-switch mx-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheck"
              id="isCheck"
              defaultChecked={jobber.isCheck}
              onChange={() =>
                setJobber((prev) => ({ ...prev, isCheck: !prev.isCheck }))
              }
              ref={register}
            />
            <label className="form-check-label" htmlFor="isCheck">
              {jobber.isCheck
                ? 'Visible aux recruteurs'
                : 'En attente de validité'}
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
