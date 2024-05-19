export default function EditFormateur({handleChange, handleEdit, formateur, diplomes, situationsFamiliales, etablissement}) {
    
  return (
    <div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='matricule' className="label">Matricule</label>
                <input disabled type="text" id='matricule' name='matricule' value={formateur?.matricule} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='password' className="label">Password</label>
                <input type="password" id='password' name='password' value={formateur?.password} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='nom' className="label">Nom</label>
                <input type="text" id='nom' name='nom' value={formateur?.nom} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='prenom' className="label">Prenom</label>
                <input type="text" id='prenom' name='prenom' value={formateur?.prenom} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='numTel' className="label">Numéro de téléphone</label>
                <input type="text" id='numTel' name='numTel' value={formateur?.numTel} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='email' className="label">Email</label>
                <input type="email" id='email' name='email' value={formateur?.email} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='civilite' className="label">Civilité</label>
                <input type="text" id='civilite' name='civilite' value={formateur?.civilite} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Adresse' className="label">Adresse</label>
                <input type="text" id='Adresse' name='Adresse' value={formateur?.Adresse} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Echelle' className="label">Echelle</label>
                <input type="text" id='Echelle' name='Echelle' value={formateur?.Echelle} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Echelon' className="label">Echelon</label>
                <input type="text" id='Echelon' name='Echelon' value={formateur?.Echelon} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Date_Recrutement' className="label">Date de recrutement</label>
                <input type="date" id='Date_Recrutement' name='Date_Recrutement' value={formateur?.Date_Recrutement} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='dateNaissance' className="label">Date de naissance</label>
                <input type="date" id='dateNaissance' name='dateNaissance' value={formateur?.dateNaissance} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Date_Depart_Retrait' className="label">Date de départ à la retraite</label>
                <input type="date" id='Date_Depart_Retrait' name='Date_Depart_Retrait' value={formateur?.Date_Depart_Retrait} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Grade' className="label">Grade</label>
                <input type="text" id='Grade' name='Grade' value={formateur?.Grade} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Diplome' className="label">Diplôme</label>
                <select id='Diplome' name='Diplome' value={formateur?.Diplome} onChange={handleChange} className="formInput">
                    <option disabled>Selectionnez un diplôme</option>
                    {diplomes.map((a) => {
                        return (<option key={a.name} value={a.name}>{a.name}</option>)
                    })}
                </select>
            </div>
            <div className="maindiv2">
                <label htmlFor='situationFamiliale' className="label">Situation familiale</label>
                <select id='situationFamiliale' name='situationFamiliale' value={formateur?.situationFamiliale} onChange={handleChange} className="formInput">
                    <option disabled>Selectionnez une situation familiale</option>
                    {situationsFamiliales.map((a) => {
                        return (<option key={a.name} value={a.name}>{a.name}</option>)
                    })}
                </select>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='MasseHoaraireHeb' className="label">Masse horaire hebdomadaire</label>
                <input type="text" id='MasseHoaraireHeb' name='MasseHoaraireHeb' value={formateur?.MasseHoaraireHeb} onChange={handleChange}  className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='Filiere' className="label">Filière</label>
                <input type="text" id='Filiere' name='Filiere' value={formateur?.Filiere} onChange={handleChange} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='Categorie' className="label">Catégorie</label>
                <input type="text" id='Categorie' name='Categorie' value={formateur?.Categorie} onChange={handleChange} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='idEtablissement' className="label">Etablissement</label>
                <select id='idEtablissement' name='idEtablissement' value={formateur?.idEtablissement} onChange={handleChange} className="formInput">
                    <option disabled>Selectionnez un etablissement</option>
                    <option ></option>
                    {etablissement.map((a) => {
                        return (<option key={a.id} value={a.id}>{a.NomEtablissement}</option>)
                    })}
                </select>
            </div>
        </div>
        {/* {formateur?.is_vacataire && (
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
        )} */}
        <button type="submit" onClick={handleEdit} className="add-button">Modifier</button>
    </div>
  )
}
