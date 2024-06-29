import './Formateur.css'
import {useEffect, useRef, useState} from 'react'
import {axiosClient} from '../../api/axiosClient';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import CreateFormateur from './CreateFormateur';
import EditFormateur from './EditFormateur';

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        


export default function Formateur() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);


    const toast = useRef(null);

    const [etablissement,setEtablissement] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [selectedFormateurs, setSelectedFormateurs] = useState(null);
    const [editFormateur, setEditFormateur] = useState(null);
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
        situationFamiliale: '',
        MasseHoaraireHeb: '',
        idEtablissement: '',
    });
    const [formValues, setFormValues] = useState(formateur);
    
    const handleChange = (e, isEdit = false) => {
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditFormateur({
                ...editFormateur,
                [e.target.name]: value,
            });
        } else {
            setFormateur({
                ...formateur,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
        console.log(isEdit ? editFormateur : formateur);
    };

    const situationsFamiliales = [
        {name: 'Célibataire'},
        {name: 'Marié(e)'},
        {name: 'Divorcé(e)'},
        {name: 'Veuf/Veuve'},
    ];

    const diplomes = [
      { name: "Baccalauréat Général" },
      { name: "Baccalauréat Technique" },
      { name: "Baccalauréat Professionnel" },
      { name: "Diplôme de Technicien (DT)" },
      { name: "Diplôme de Technicien Spécialisé (DTS)" },
      { name: "Diplôme Universitaire de Technologie (DUT)" },
      { name: "Brevet de Technicien Supérieur (BTS)" },
      { name: "Diplôme d'Études Universitaires Générales (DEUG)" },
      { name: "Diplôme de Licence (Licence Fondamentale)" },
      { name: "Licence Professionnelle" },
      { name: "Master" },
      { name: "Master Spécialisé" },
      { name: "Diplôme d'Ingénieur d'État" },
  ];
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosClient.post('/formateur', formateur).then((a) => {
            setVisible(false)
            console.log(a)
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le formateur est inséré avecs succès'
            });
            getFormateurs()
        })
        console.log(response)
    }

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer ce formateur ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedFormateurs.map(async (a) => {
                    const response = await axiosClient.delete(`/formateur/${a.matricule}`).then((a) => {
                        getFormateurs()
                        console.log(a)
                    })
                    toast.current.show({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Le formateur est supprimé avec succès'
                    });
                    console.log(response)
                })
            },
            reject: () => {
                return;
            }
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const response = await axiosClient.put(`/formateur/${editFormateur.matricule}`, editFormateur).then((a) => {
            setEditVisible(false);
            console.log(a);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le formateur est modifié avec succès'
            });
            getFormateurs();
        });
        console.log(response);
    };

    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
    return (
        <div className='header'>
            <Button type="button" icon="pi pi-filter-slash" label="Vider" outlined onClick={clearFilter} />
            <div style={{ display:'flex',gap:'12px'}}>
            <div style={{ display:'flex',gap:'10px'}}>
              {selectedFormateurs && selectedFormateurs.length > 0 && (
                <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
              )}
              {selectedFormateurs && selectedFormateurs.length === 1 && (
                <Button icon="pi pi-pencil" onClick={() => { setEditFormateur(selectedFormateurs[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
              )}
            </div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche" />
            </IconField>
            </div>
        </div>
    );
};

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      setGlobalFilterValue(value);
  };

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const getFormateurs = () => {
        axiosClient.get('/formateur').then((a) => {
            setFormateurs(a.data)
            console.log(a.data)
            setLoading(false)
        })
    }

    const getEtablissements = () => {
      axiosClient.get('/etablissement').then((a) => {
          setEtablissement(a.data)
          console.log(a.data)
      })
    }

    useEffect(() => {
        axiosClient.get('/sanctum/csrf-cookie')
        getEtablissements()
        getFormateurs()
    }, []);

    const header = renderHeader();

    return (
        <>
            <div className="card flex justify-content-center">
                <Button label=" Ajouter un formateur" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                <Dialog header="Ajout d'un formateur" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <CreateFormateur formateur={formateur} handleChange={handleChange} handleSubmit={handleSubmit} etablissement={etablissement} situationsFamiliales={situationsFamiliales} diplomes={diplomes}/>
                </Dialog>
                <Dialog header="Modifier un formateur" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
                    <EditFormateur setFormateur={setEditFormateur} formateur={editFormateur} handleChange={(e) => handleChange(e, true)} handleEdit={handleEdit} etablissement={etablissement} situationsFamiliales={situationsFamiliales} diplomes={diplomes} />
                </Dialog>
                <div className="container">
                  <DataTable 
                  value={formateurs}  
                  paginator rows={10} 
                  dataKey="matricule" 
                  scrollable scrollHeight="64vh" 
                  sortMode="multiple" 
                  tableStyle={{ minWidth: '50rem' }} 
                  className='formateursTable'
                  emptyMessage="Pas de formateurs trouvées."
                  header={header}
                  loading={loading}
                  globalFilter={globalFilterValue}
                  globalFilterFields={['nom', 'prenom', 'matricule', 'numTel', 'Adresse', 'Echelle', 'Echelon', 'Date_Recrutement', 'dateNaissance', 'Date_Depart_Retrait', 'Grade', 'Diplome', 'Filiere', 'situationFamiliale', 'MasseHoaraireHeb', 'idEtablissement']}
                  selectionMode="multiple"
                  selection={selectedFormateurs} 
                  onSelectionChange={(e) => setSelectedFormateurs(e.value)}
                  >
                      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="matricule" header="Matricule"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="nom" header="Nom"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="prenom" header="Prenom"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="numTel" header="Numéro de téléphone"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Adresse" header="Adresse"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Echelle" header="Echelle"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Echelon" header="Echelon"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Date_Recrutement" header="Date de recrutement"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="dateNaissance" header="Date de naissance"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Date_Depart_Retrait" header="Date de départ ou retrait"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Grade" header="Grade"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Diplome" header="Diplome"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="Filiere" header="Filiere"></Column>
                      {/* <Column sortable style={{ minWidth: '15rem' }} field="Categorie" header="Categorie"></Column> */}
                      <Column sortable style={{ minWidth: '15rem' }} field="situationFamiliale" header="Situation Familiale"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="MasseHoaraireHeb" header="Masse Hoaraire Hebdomadaire"></Column>
                      <Column sortable style={{ minWidth: '15rem' }} field="etablissement.NomEtablissement" header="Etablissement"></Column>
                  </DataTable>
                </div>
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>

    )
}
