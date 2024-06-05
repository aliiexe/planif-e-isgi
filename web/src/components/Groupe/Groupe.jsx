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
        


export default function Groupe() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [error, seterror] = useState()
    const toast = useRef(null);
    const [editgroupe, setEditgroupe] = useState(null);
    const [groupes, setgroupes] = useState([])
    const [selectedgroupes, setSelectedgroupes] = useState(null);
    const [groupe, setgroupe] = useState({
        codeGroupe: '',
        libelleGroupe: '',
    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };
    const [formValues, setFormValues] = useState(groupe);
    const getgroupes=()=>{
        axiosClient.get('/groupe').then(a=>{setgroupes(a.data);console.log(a)})
     }
    const handleChange = (e, isEdit = false) => {
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditgroupe({
                ...editgroupe,
                [e.target.name]: value,
            });
        } else {
            setgroupe({
                ...groupe,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
        console.log(isEdit ? editgroupe : groupe);
        console.log(groupe)
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const response = await axiosClient.put(`/groupe/${editgroupe.id}`, editgroupe).then((a) => {
            setEditVisible(false);
            console.log(a);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le groupe est modifié avec succès'
            });
            getgroupes();
        });
  
    };

    const handleSubmit = async (e) => {
        console.log(groupe.codeGroupePhysique)
        if (1>1) {
            seterror('tous les champs sont requis')
            return
        } else {
            e.preventDefault();
            groupes.map((a) => {
                if (a.codeGroupePhysique == groupe.codeGroupePhysique) {
                    seterror('le code de groupe existe deja')
                    return
                }
            })
            const response = await axiosClient.post('/groupe', groupe).then((a) => {
                setVisible(false)
                console.log(a)
                toast.current.show({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Le groupe est inséré avec succès'
                });
            })
            console.log(response)
            load()
        }
    }
    const[filieres,setfilieres]=useState([]);
const load=()=>{
    axiosClient.get('/groupe').then((a) => {
        setgroupes(a.data)
       if(a.data.length>0){
console.log(a.data)
        setLoading(false)
       }
    })
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
            message: 'Êtes-vous sûre de vouloir supprimer ce groupe ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedgroupes.map(async (a) => {
                    const response = await axiosClient.delete('/groupe/'+a.id).then((a) => {
                        console.log(a.data)
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Le groupe est supprimé avec succès'
                        });
                        getgroupes()
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
                  {selectedgroupes && selectedgroupes.length > 0 && (
                    <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
                  )}
                  {selectedgroupes && selectedgroupes.length === 1 && (
                    <Button icon="pi pi-pencil" onClick={() => { console.log(selectedgroupes);setEditgroupe(selectedgroupes[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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
    const header = renderHeader();
    const [donnes,setdonnes]=useState("presentiel")
    useEffect(()=>{
        donnes=="presntiel"?axiosClient.post('/choose',{type:donnes}).then((a)=>{
            setgroupes(a.data)
            console.log(a.data)
        }):axiosClient.post('/choose',{type:donnes}).then((a)=>{
            setgroupes(a.data)
            console.log(a.data)
        })
    },[donnes])

    return (
        <>

            <div className="card flex justify-content-center">
                <Button label=" Ajouter un groupe" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                
                <div className="card flex justify-content-center">
                    <br></br>
            <SelectButton optionLabel="name" value={donnes} onChange={(e) => setdonnes(e.target.value)}  options={[
                  { name: 'presentiel', value:"presentiel"},
        { name: 'distanciel', value: "distanciel" },
      
  
    ]} />
        </div>
        <br></br>
                <Dialog header="Ajout d'un groupe" visible={visible} style={{width: '50vw'}} onHide={() => {
                    setVisible(false);
                    seterror()
                }}>
                    <div className="maindiv2-container">
                    <div className="mainCheckbox">
                        <label htmlFor='is_permanent' className="label">
                            <input type='radio' value={"presentiel"} name='typegroupe' onChange={handleChange}/>Presentiel
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label htmlFor='is_vacataire' className="label">
                            <input type='radio' value={"distanciel"} name='typegroupe'   onChange={handleChange}/>Distanciel
                        </label>    
                    </div>
                    <br></br>
                        <div className="maindiv2">
                            <label htmlFor='nom' className="label">Code</label>
                            <input type="text" id='nom' name={groupe?.typegroupe=="distanciel"?"codeGroupeDS":"codeGroupePR"} onChange={handleChange}
                                   className="formInput"/>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='prenom' className="label">Libelle</label>
                            <input type="text" id='prenom' name={groupe?.typegroupe=="distanciel"?"libelleGroupeDS":"libelleGroupePR"} onChange={handleChange}
                                   className="formInput"/>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='prenom' className="label"> Code Option Filiere</label>
                            <input type="text" id='prenom' name='groupeCodeOptionFiliere' onChange={handleChange}
                                   className="formInput"/>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Filiere</label>
                            <select id='civilite' name='option_filieres_id' onChange={handleChange} className="formInput">
                                <option disabled selected>Selectionnez une civilité</option>
                               {filieres.map((a)=>{return(<option value={a.codeFiliere}>{a.libelleFiliere}</option>
                               
                            )})}
                            </select>
                        </div>
                    </div>
                    <div style={{"color": "red"}}>{error}</div>
                    <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
                </Dialog>
                <Dialog header="Modifier un groupe" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
                <div>
        <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='libelleGroupe' className="label">Libelle groupe</label>
                <input  type="text" id='libelleGroupe' name='libelleGroupe' value={editgroupe?.libelleGroupe} onChange={(e)=>handleChange(e,true)} className="formInput"/>
            </div>
            <div className="maindiv2">
                <label htmlFor='codeGroupePhysique' className="label">Code groupe</label>
                <input type="codeGroupePhysique" id='codeGroupePhysique' name='codeGroupePhysique' value={editgroupe?.codeGroupePhysique} onChange={(e)=>handleChange(e,true)} className="formInput"/>
            </div>
        </div>

        <div className="maindiv2">
                            <label htmlFor='prenom' className="label"> Code Option Filiere</label>
                            <input type="text" id='prenom' name='libelleGroupe' onChange={handleChange}
                                   className="formInput"/>
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='civilite' className="label">Filiere</label>
                            <select id='civilite' name='option_filieres_id' onChange={handleChange} className="formInput">
                                <option disabled selected>Selectionnez une civilité</option>
                               {filieres.map((a)=>{return(<option value={a.codeFiliere}>{a.libelleFiliere}</option>
                               
                            )})}
                            </select>
                        </div>

        
        <button type="submit" onClick={handleEdit} className="add-button">Modifier</button>
    </div>
    </Dialog>
    {donnes === "presentiel" ? (
                <DataTable
                    value={groupes}
                    paginator
                    rows={10}
                    dataKey="codeGroupePR"
                    scrollable
                    scrollHeight="64vh"
                    sortMode="multiple"
                    tableStyle={{ minWidth: '50rem' }}
                    className='groupesTable'
                    emptyMessage="Pas de groupes trouvés."
                    header={header}
                    loading={loading}
                    globalFilter={globalFilterValue}
                    globalFilterFields={['libelleGroupePR', 'codeGroupePR', 'groupeCodeOptionFiliere', 'option_filieres_id']}
                    selectionMode="multiple"
                    selection={selectedgroupes}
                    onSelectionChange={(e) => setSelectedgroupes(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="libelleGroupePR" header="Libelle Groupe Présentiel"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="codeGroupePR" header="Code Groupe Présentiel"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="groupeCodeOptionFiliere" header="Code Option Filiere"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="option_filieres_id" header="ID Option Filiere"></Column>
                </DataTable>
            ) : (
                <DataTable
                    value={groupes}
                    paginator
                    rows={10}
                    dataKey="codeGroupeDS"
                    scrollable
                    scrollHeight="64vh"
                    sortMode="multiple"
                    tableStyle={{ minWidth: '50rem' }}
                    className='groupesTable'
                    emptyMessage="Pas de groupes trouvés."
                    header={header}
                    loading={loading}
                    globalFilter={globalFilterValue}
                    globalFilterFields={['libelleGroupeDS', 'codeGroupeDS', 'groupeCodeOptionFiliere', 'option_filieres_id']}
                    selectionMode="multiple"
                    selection={selectedgroupes}
                    onSelectionChange={(e) => setSelectedgroupes(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="libelleGroupeDS" header="Libelle Groupe Distanciel"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="codeGroupeDS" header="Code Groupe Distanciel"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="groupeCodeOptionFiliere" header="Code Option Filiere"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="option_filieres_id" header="ID Option Filiere"></Column>
                </DataTable>
            )}
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>
    )
}
