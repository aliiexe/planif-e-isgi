import { useState } from "react";

export default function CreateFormateur({formateur, etablissement, handleChange, handleSubmit, situationsFamiliales,diplomes}) {
  const [isVacataire, setIsVacataire] = useState(false);

  const handleVacataireChange = (event) => {
    const { value } = event.target;
    setIsVacataire(value === 'is_vacataire');
    handleChange(event);
  };

  const handleCombinedChange = (event) => {
    handleVacataireChange(event);
    handleChange(event);
  };

  return (
    <div>
        <div className="mainCheckbox">
            <label htmlFor='is_permanent' className="label">
                <input type='radio' id='is_permanent' name='typeformateur' value={'is_permanent'} onChange={handleCombinedChange} />
                Permanent
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor='is_vacataire' className="label">
                <input type='radio' id='is_vacataire' name='typeformateur' value={'is_vacataire'} onChange={handleCombinedChange} />
                Vacataire
            </label>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='matricule' className="label">Matricule</label>
                <input type="text" id='matricule' name='matricule' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='password' className="label">Password</label>
                <input type="password" id='password' name='password' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='nom' className="label">Nom</label>
                <input type="text" id='nom' name='nom' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='prenom' className="label">Prenom</label>
                <input type="text" id='prenom' name='prenom' onChange={handleChange} className="formInput"/>
            </div>
        </div>
            <div className="maindiv2">
                <label htmlFor='numTel' className="label">Numéro de téléphone</label>
                <input type="text" id='numTel' name='numTel' onChange={handleChange} className="formInput"/>
            </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='civilite' className="label">Civilité</label>
                <select id='civilite' name='civilite' onChange={handleChange} className="formInput">
                    <option disabled selected>Selectionnez une civilité</option>
                    <option value='M'>Monsieur</option>
                    <option value='Mme'>Madame</option>
                </select>
            </div>
            <div className="maindiv2">
                <label htmlFor='Adresse' className="label">Adresse</label>
                <input type="text" id='Adresse' name='Adresse' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Echelle' className="label">Echelle</label>
                <input type="text" id='Echelle' name='Echelle' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Echelon' className="label">Echelon</label>
                <input type="text" id='Echelon' name='Echelon' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Date_Recrutement' className="label">Date de recrutement</label>
                <input type="date" id='Date_Recrutement' name='Date_Recrutement' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='dateNaissance' className="label">Date de naissance</label>
                <input type="date" id='dateNaissance' name='dateNaissance' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Date_Depart_Retrait' className="label">Date de départ à la retraite</label>
                <input type="date" id='Date_Depart_Retrait' name='Date_Depart_Retrait' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Grade' className="label">Grade</label>
                <input type="text" id='Grade' name='Grade' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Diplome' className="label">Diplôme</label>
                <select id='Diplome' name='Diplome' onChange={handleChange} className="formInput">
                    <option disabled selected>Selectionnez un diplôme</option>
                    {diplomes.map((a) => {
                        return (<option key={a.name} value={a.name}>{a.name}</option>)
                    })}
                </select>
            </div>
            <div className="maindiv2">
                <label htmlFor='situationFamiliale' className="label">Situation familiale</label>
                <select id='situationFamiliale' name='situationFamiliale' onChange={handleChange} className="formInput">
                    <option disabled selected>Selectionnez une situation familiale</option>
                    {situationsFamiliales.map((a) => {
                        return (<option key={a.name} value={a.name}>{a.name}</option>)
                    })}
                </select>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='MasseHoaraireHeb' className="label">Masse horaire hebdomadaire</label>
                <input type="text" id='MasseHoaraireHeb' name='MasseHoaraireHeb' onChange={handleChange}  className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Filiere' className="label">Filière</label>
                <input type="text" id='Filiere' name='Filiere' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div>
            <div className="maindiv2">
                <label htmlFor='idEtablissement' className="label">Etablissement</label>
                <select id='idEtablissement' name='idEtablissement' onChange={handleChange} className="formInput" >
                    <option disabled selected>Selectionnez un etablissement</option>
                    {etablissement.map((a) => {
                        return (<option key={a.id} value={a.id}>{a.NomEtablissement}</option>)
                    })}
                </select>
            </div>
        </div>
        {isVacataire && (
    <div>
        {/* annee_experience, type, metier, etat, dossier_depose, n_ordre, date_decision, _validation_rrh, apparition_enote, n_ordre,bordereau, date_bordereau, decision, Massehoraireannuelle, massehorarireproposee, dossier_despose_dr */}
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='annee_experience' className="label">Année d&apos;expérience</label>
                <input type="text" id='annee_experience' name='annee_experience' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='type' className="label">Type</label>
                <input type="text" id='type' name='type' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='metier' className="label">Métier</label>
                <input type="text" id='metier' name='metier' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='etat' className="label">Etat</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='etat_oui' name='etat' value='oui' onChange={handleChange} className="formInput"/> Oui
                    </label>
                    <label>
                        <input type="radio" id='etat_non' name='etat' value='non' onChange={handleChange} className="formInput"/> Non
                    </label>
                </div>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='dossier_depose' className="label">Dossier déposé</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='dossier_depose_oui' name='dossier_depose' value='oui' onChange={handleChange} className="formInput"/> Oui
                    </label>
                    <label>
                        <input type="radio" id='dossier_depose_non' name='dossier_depose' value='non' onChange={handleChange} className="formInput"/> Non
                    </label>
                </div>
            </div>
            <div className="maindiv2">
                <label htmlFor='n_ordre' className="label">N° d&apos;ordre</label>
                <input type="text" id='n_ordre' name='n_ordre' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='date_decision' className="label">Date de décision</label>
                <input type="date" id='date_decision' name='date_decision' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='_validation_rrh' className="label">Validation RRH</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='_validation_rrh_oui' name='_validation_rrh' value='oui' onChange={handleChange} className="formInput"/> Oui
                    </label>
                    <label>
                        <input type="radio" id='_validation_rrh_non' name='_validation_rrh' value='non' onChange={handleChange} className="formInput"/> Non
                    </label>
                </div>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='apparition_enote' className="label">Apparition en note</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='apparition_enote_oui' name='apparition_enote' value='oui' onChange={handleChange} className="formInput"/> Oui
                    </label>
                    <label>
                        <input type="radio" id='apparition_enote_non' name='apparition_enote' value='non' onChange={handleChange} className="formInput"/> Non
                    </label>
                </div>
            </div>
            <div className="maindiv2">
                <label htmlFor='bordereau' className="label">Bordereau</label>
                <input type="text" id='bordereau' name='bordereau' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='date_bordereau' className="label">Date bordereau</label>
                <input type="date" id='date_bordereau' name='date_bordereau' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='decision' className="label">Décision</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='decision_oui' name='decision' value='oui' onChange={handleChange} className="formInput"/> Oui
                    </label>
                    <label>
                        <input type="radio" id='decision_non' name='decision' value='non' onChange={handleChange} className="formInput"/> Non
                    </label>
                </div>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Massehoraireannuelle' className="label">Masse horaire annuelle</label>
                <input type="text" id='Massehoraireannuelle' name='Massehoraireannuelle' onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='massehorarireproposee' className="label">Masse horaire proposée</label>
                <input type="text" id='massehorarireproposee' name='massehorarireproposee' onChange={handleChange} className="formInput"/>
            </div>
        </div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='dossier_despose_dr' className="label">Dossier déposé dr</label>
                <div className="radio-container">
                    <label>
                        <input type="radio" id='dossier_despose_dr_oui' name='dossier_despose_dr' value='oui' onChange={handleChange} className="formInput"/>Oui
                    </label>
                    <label>
                        <input type="radio" id='dossier_despose_dr_non' name='dossier_despose_dr' value='non' onChange={handleChange} className="formInput"/>Non
                    </label>
                </div>
            </div>
        </div>
    </div>
)}

        <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
    </div>
  )
}
