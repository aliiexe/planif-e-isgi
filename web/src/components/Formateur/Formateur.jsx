import './Formateur.css'
import {  useEffect,useRef,useState } from 'react'
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
        

export default function Formateur() {
  const [visible, setVisible] = useState(false);
  
  const toast = useRef(null);

  const show = () => {
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Le formateur est inséré avecs succès' });
      setVisible(false)
  };

  const [formateur, setFormateur] = useState({
    matricule: '',
    password: '',
    nom: '',
    prenom: '',
    numTel: '',
    email: '',
    civilite: '',
    Adresse: '',
    Echelle: '',
    Echelon: '',
    Date_Recrutement: '',
    dateNaissance: '',
    Date_Depart_Retrait: '',
    Grade: '',
    Diplome: '',
    Filiere: '',
    Categorie: '',
    situationFamiliale: '',
    MasseHoaraireHeb: '',
    idEtablissement: '',
  });

  const handleChange = (e) => {
    const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
    setFormateur({
      ...formateur,
      [e.target.name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/formateurs', formateur);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie')
  }, []);

    return (
      <>
        <div className="card flex justify-content-center">
            <Button label=" Ajouter un formateur" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Ajout d'un formateur" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={handleSubmit}>
                  <div className="mainCheckbox">
                    <label htmlFor='is_permanent' className="label"><input type='radio' id='is_permanent' name='typeFormateur' onChange={handleChange}/>Permanent</label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <label htmlFor='is_vacataire' className="label"><input type='radio' id='is_vacataire' name='typeFormateur' onChange={handleChange}/>Vacataire</label>
                    {/* <label htmlFor='is_permanent' className="label">Permanent</label>
                    <input type="checkbox" id='is_permanent' name='is_permanent' onChange={handleChange}/> */}
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

                  <div className="maindiv2-container">
                    <div className="maindiv2">
                      <label htmlFor='numTel' className="label">Numéro de téléphone</label>
                      <input type="text" id='numTel' name='numTel' onChange={handleChange} className="formInput"/>
                    </div>
                    <div className="maindiv2">
                      <label htmlFor='email' className="label">Email</label>
                      <input type="email" id='email' name='email' onChange={handleChange} className="formInput"/>
                    </div>
                  </div>

                  <div className="maindiv2-container">
                    <div className="maindiv2">
                      <label htmlFor='civilite' className="label">Civilité</label>
                      <input type="text" id='civilite' name='civilite' onChange={handleChange} className="formInput"/>
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
                      <input type="text" id='Diplome' name='Diplome' onChange={handleChange} className="formInput"/>
                    </div>
                    <div className="maindiv2">
                      <label htmlFor='situationFamiliale' className="label">Situation familiale</label>
                      <input type="text" id='situationFamiliale' name='situationFamiliale' onChange={handleChange} className="formInput"/>
                    </div>
                  </div>

                  <div className="maindiv2-container">
                    <div className="maindiv2">
                      <label htmlFor='MasseHoaraireHeb' className="label">Masse horaire hebdomadaire</label>
                      <input type="text" id='MasseHoaraireHeb' name='MasseHoaraireHeb' onChange={handleChange} className="formInput"/>
                    </div>
                    <div className="maindiv2">
                      <label htmlFor='Filiere' className="label">Filière</label>
                      <input type="text" id='Filiere' name='Filiere' onChange={handleChange} className="formInput"/>
                    </div>
                  </div>

                  <div className="maindiv2-container">
                    <div className="maindiv2">
                      <label htmlFor='Categorie' className="label">Catégorie</label>
                      <input type="text" id='Categorie' name='Categorie' onChange={handleChange} className="formInput"/>
                    </div>
                    <div className="maindiv2">
                      <label htmlFor='idEtablissement' className="label">Etablissement</label>
                      <input type="text" id='idEtablissement' name='idEtablissement' onChange={handleChange} className="formInput"/>
                    </div>
                  </div>
                  {/* {formateur.is_permanent && (
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
                  <button type="submit" onClick={show} className="add-button">Ajouter</button>
                </form>
            </Dialog>
            <Toast ref={toast} />
        </div>
      </>
      
    )
}
