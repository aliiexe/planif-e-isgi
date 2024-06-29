import '../Formateur/Formateur.css'
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
import { SelectButton } from 'primereact/selectbutton';


import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        


export default function Affectation() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [error, seterror] = useState()
    const toast = useRef(null);
    const [editAffectation, setEditAffectation] = useState({});
    const [Affectations, setAffectations] = useState([])
    const [selectedAffectations, setSelectedAffectations] = useState(null);
    const [Affectation, setAffectation] = useState({
  
    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };
    const [formValues, setFormValues] = useState(Affectation);
    const getAffectations=()=>{
        axiosClient.get('/affectation').then(a=>{setAffectations(a.data);console.log(a)})
     }
     useEffect(()=>{
        getAffectations();
     },[])
     const [groupesel,setgroupesel]=useState([])
    
    const handleChange = (e, isEdit = false) => {
        if(e.target.name=="matriculeprof" || e.target.name=="idModule"){

        
                console.log(Affectations)

                console.log(e.target.value)
                let toremove=[]
                if(e.target.name=="matriculeprof"){
                toremove=Affectations.filter((ele)=>{return ele.matriculeprof==e.target.value})}
              if(e.target.name=="idModule"){
                toremove=Affectations.filter((ele)=>{return ele.idModule==e.target.value})}
      
                console.log(toremove)
                let test = groupes.filter(group => 
                    !toremove.some(affectation => affectation.idGroupePhysique == group.id)
                  );
              
                setgroupesel(test)
     
        
      
        }
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditAffectation({
                ...editAffectation,
                [e.target.name]: value,
            });
        } else {
            setAffectation({
                ...Affectation,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const response = await axiosClient.post("/editAffectation",editAffectation).then((a) => {
            setEditVisible(false);
            console.log(a);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le Affectation est modifié avec succès'
            });
            load()
        });
  
    };

    const handleSubmit = async (e) => {
        console.log(Affectation.codeAffectationPhysique)
        if (1>1) {
            seterror('tous les champs sont requis')
            return
        } else {
            e.preventDefault();
   
            const response = await axiosClient.post('/affectation', Affectation).then((a) => {
                setVisible(false)
                load()
                console.log(a)
                toast.current.show({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Le Affectation est inséré avec succès'
                });
            })
            console.log(response)
          
        }
    }
    const[filieres,setfilieres]=useState([]);
const load=()=>{
axiosClient.get('/affectation').then((a)=>setAffectations(a.data))
}
    useEffect(() => {
        axiosClient.get('/sanctum/csrf-cookie')
      load()
      axiosClient.get('/filieres').then((ele)=>{
            setfilieres(ele.data)
            console.log(ele.data)
      })
    }, []);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const handleDelete = () => {
   
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer ce Affectation ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedAffectations.map(async (a) => {
                    const response = await axiosClient.post('/Affectationdel',{codeAffectationPR:a.codeAffectationPR}).then((ala) => {
                        console.log(ala.data)
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Le Affectation est supprimé avec succès'
                        });
                        load()
                        setSelectedAffectations(null)
                    })
                 
            })
            },
            reject: () => {
                return;
            }
        });
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
                  {selectedAffectations && selectedAffectations.length > 0 && (
                    <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
                  )}
                  {selectedAffectations && selectedAffectations.length === 1 && (
                    <Button icon="pi pi-pencil" onClick={() => { console.log(selectedAffectations);setEditAffectation(selectedAffectations[0])
                    ; setEditVisible(true) }} severity="warning" aria-label="Notification" />)}
                </div>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche" />
                </IconField>
                </div>
            </div>
        );
    };
    const header = renderHeader();

const[modules,setmodules]=useState([]);
const[groupes,setgroupes]=useState([]);
const[formateurs,setformateurs]=useState([]);
const [optionfillieres,setoptionfilliers]=useState([])
useEffect(()=>{
    axiosClient.get('/option-filieres').then(a=>setoptionfilliers(a.data))
    axiosClient.get('/formateur').then((a)=>{
        setformateurs(a.data)
    })
    axiosClient.get('/groupe').then((a)=>{
        setgroupes(a.data)
        setgroupesel(a.data)
    })
    axiosClient.get('/modules').then((a)=>{
        setmodules(a.data)
    })
},[])
    return (
        <>

            <div className="card flex justify-content-center">
                <Button label=" Ajouter un Affectation" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                
    
        <br></br>
                <Dialog header="Ajout d'un Affectation" visible={visible} style={{width: '50vw'}} onHide={() => {
                    setVisible(false);
                    seterror()
                }}>
                    <div className="maindiv2-container">
          
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Module</label>
                            <select id='civilite' name='idModule' onChange={handleChange} className="formInput">
                                <option disabled selected>Selectionnez un Module</option>
                               {modules.map((a)=>{return(<option value={a.id}>{a.libelleModule} ({a.codeModule})</option>
                               
                            )})}
                            </select>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Formateur</label>
                            <select id='civilite' name='matriculeprof' onChange={handleChange} className="formInput">
                                <option disabled selected>Selectionnez une formateur</option>
                               {formateurs.map((a)=>{return(<option value={a.matricule}>{a.nom}({a.matricule})</option>
                               
                            )})}
                            </select>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Groupe option filliere</label>
                            <select  onChange={(e)=>{if(e.target.value=="reset"){      axiosClient.get('/groupe').then((a)=>{
                                        setgroupes(a.data)
                                        setgroupesel(a.data)
                                        return
                                    })};setgroupesel([...groupesel.filter(a=>a.option_filieres_id==e.target.value)])}} className="formInput">
                                <option value={"reset"} selected>Selectionnez un Module (annuler filtre)</option>
                               {optionfillieres.map((a)=>{return(<option value={a.id}>{a.codeOptionFiliere}</option>
                               
                            )})}
                            </select>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Groupe</label>
                            <select id='civilite' name='idGroupePhysique' onChange={handleChange} className="formInput">
                                <option disabled selected>Selectionnez une groupe</option>
                               {groupesel.map((a)=>{return(<option value={a.id}>{a.libelleGroupe}({a.codeGroupePhysique })</option>
                               
                            )})}
                            </select>
                        </div>
                        </div>
                    <div style={{"color": "red"}}>{error}</div>
                    <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
                </Dialog>
                <Dialog header="Modifier un Affectation" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
    <div>
        <div className="maindiv2-container">
           
            <div className="maindiv2">
                <label htmlFor='prenom' className="label">CodeAffectation</label>
                <input type="text" id='prenom' disabled name={"codeAffectationDS" in editAffectation?"codeAffectationDS":"codeAffectationPR"} value={"codeAffectationDS" in editAffectation ? editAffectation.codeAffectationDS : editAffectation.codeAffectationPR}   onChange={(e)=>handleChange(e,true)} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='prenom' className="label">Libelle Affectation</label>
                <input type="text" id='prenom' name={"libelleAffectationDS" in editAffectation ?"libelleAffectationDS":"libelleAffectationPR"} value={"libelleAffectationDS" in editAffectation ? editAffectation.libelleAffectationDS : editAffectation.libelleAffectationPR} onChange={(e)=>handleChange(e,true)} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='prenom' className="label"> Code Option Filiere</label>
                <input type="text" id='prenom' name='AffectationCodeOptionFiliere' value={editAffectation?.AffectationCodeOptionFiliere || ''} onChange={(e)=>handleChange(e,true)} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='civilite' className="label">Filiere</label>
                <select id='civilite' name='option_filieres_id' value={editAffectation?.option_filieres_id || ''} onChange={(e)=>handleChange(e,true)} className="formInput">
                    <option disabled selected>Selectionnez une civilité</option>
                    {filieres.map((a) => (
                        <option value={a.codeFiliere} key={a.codeFiliere}>{a.libelleFiliere}</option>
                    ))}
                </select>
            </div>
        </div>

        <button type="submit" onClick={handleEdit} className="add-button">Modifier</button>
    </div>
</Dialog>
                <DataTable
                    value={Affectations}
                    paginator
                    rows={10}
                    dataKey="codeAffectationPR"
                    scrollable
                    scrollHeight="64vh"
                    sortMode="multiple"
                    tableStyle={{ minWidth: '50rem' }}
                    className='AffectationsTable'
                    emptyMessage="Pas de Affectations trouvés."
                    header={header}
             
                    globalFilter={globalFilterValue}
                    globalFilterFields={['codeAffectationPR', 'AffectationCodeOptionFiliere', 'option_filieres_id']}
                    selectionMode="multiple"
                    selection={selectedAffectations}
                    onSelectionChange={(e) => setSelectedAffectations(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                    <Column sortable style={{ minWidth: '15rem' }} field="formateur.nom" header="nom formateur"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="formateur.prenom" header="prenom formateur"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="groupe.libelleGroupe" header="libelle groupe"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="module.libelleModule" header="ID Option Filiere"></Column>
                </DataTable>
           
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>
    )
}
