import { useState } from "react";

export default function CreateFormateur({formateur, etablissement, handleChange, handleSubmit, situationsFamiliales,diplomes}) {
  const [isVacataire, setIsVacataire] = useState(false);

    const handleVacataireChange = (event) => {
        setIsVacataire(event.target.value === 'is_vacataire');
        handleChange(event);
    };
  return (
    <div>
        <div className="mainCheckbox">
            <label htmlFor='is_permanent' className="label">
                <input type='radio' id='is_permanent' name='is_permanent' value='is_permanent' onChange={handleChange} checked/>
                Permanent
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor='is_vacataire' className="label">
                <input type='radio' id='is_vacataire' name='is_permanent' value='is_vacataire' onChange={handleChange}/>
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
            {/* <div className="maindiv2">
                <label htmlFor='Categorie' className="label">Catégorie</label>
                <input type="text" id='Categorie' name='Categorie' onChange={handleChange} className="formInput"/>
            </div> */}
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
        <div className="grid grid-cols-2 gap-4">
          date recrutement
          <input type="date" name='DateRecrutement' onChange={handleChange} className="p-2 border-2 border-gray-200 rounded-md"/>
          date retraite
          <input type="date" name='Date_Depart_Retraite' onChange={handleChange} className="p-2 border-2 border-gray-200 rounded-md"/>
          echelon
          <input type="text" name='Echelon' onChange={handleChange} className="p-2 border-2 border-gray-200 rounded-md"/>
          echelle
          <input type="text" name='Echelle' onChange={handleChange} className="p-2 border-2 border-gray-200 rounded-md"/>
          grade
          <input type="text" name='Grade' onChange={handleChange} className="p-2 border-2 border-gray-200 rounded-md"/>
        </div>
          )}
            <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
    </div>
  )
}