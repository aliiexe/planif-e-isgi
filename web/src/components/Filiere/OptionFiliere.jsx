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
import { Dropdown } from 'primereact/dropdown';
import '../Formateur/Formateur.css'



import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method


export default function OptionFiliere() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [error, setError] = useState();
    const toast = useRef(null);
    const [editOptionFiliere, setEditOptionFiliere] = useState(null);
    const [optionFilieres, setOptionFilieres] = useState([]);
    const [filiereOptions, setFiliereOptions] = useState([]);
    const [selectedOptionFilieres, setSelectedOptionFilieres] = useState([]);
    const [optionFiliere, setOptionFiliere] = useState({
        codeOptionFiliere: '',
        libelleOptionFiliere: '',
        annee: '',
        codeFiliere: '',
    });
    const [formValues, setFormValues] = useState(optionFiliere);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axiosClient.get('/sanctum/csrf-cookie');
        loadOptionFilieres();
        loadFilieres();
    }, []);

    const loadOptionFilieres = () => {
        axiosClient.get('/option-filieres').then((response) => {
            setOptionFilieres(response.data);
            setLoading(false);
        });
    };

    const loadFilieres = () => {
        axiosClient.get('/filieres').then((response) => {
            setFiliereOptions(response.data);
        });
    };

    const handleChange = (e, isEdit = false) => {
        const { name, value } = e.target;
        if (isEdit) {
            setEditOptionFiliere({
                ...editOptionFiliere,
                [name]: value,
            });
        } else {
            setOptionFiliere({
                ...optionFiliere,
                [name]: value,
            });
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        await axiosClient.put(`/option-filieres/${editOptionFiliere.id}`, editOptionFiliere).then(() => {
            setEditVisible(false);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'L\'option filière est modifiée avec succès',
            });
            loadOptionFilieres();
            // Efface la sélection après la mise à jour réussie
            setSelectedOptionFilieres([]);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!optionFiliere.codeOptionFiliere || !optionFiliere.libelleOptionFiliere || !optionFiliere.annee || !optionFiliere.codeFiliere) {
            setError('Tous les champs sont requis');
            return;
        }

        const existingOptionFiliere = optionFilieres.find((a) => a.codeOptionFiliere === optionFiliere.codeOptionFiliere);
        if (existingOptionFiliere) {
            setError('Le code de l\'option filière existe déjà');
            return;
        }

        await axiosClient.post('/option-filieres', optionFiliere).then(() => {
            setVisible(false);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'L\'option filière est insérée avec succès',
            });
            loadOptionFilieres();
        });
    };

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer cette option filière ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                for (const selectedOptionFiliere of selectedOptionFilieres) {
                    await axiosClient.delete(`/option-filieres/${selectedOptionFiliere.id}`).then(() => {
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'L\'option filière est supprimée avec succès',
                        });
                        loadOptionFilieres();
                    });
                }
                // Après la suppression, mettez à jour l'état selectedOptionFilieres pour vider la sélection
                setSelectedOptionFilieres([]);
            },
        });
    };


    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
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
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {selectedOptionFilieres.length > 0 && (
                            <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
                        )}
                        {selectedOptionFilieres.length === 1 && (
                            <Button icon="pi pi-pencil" onClick={() => { setEditOptionFiliere(selectedOptionFilieres[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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

    const anneeOptions = [
        { label: '1A', value: '1A' },
        { label: '2A', value: '2A' },
        { label: '3A', value: '3A' }
    ];

    return (
        <>
            <div className="card flex justify-content-center">
                <Button label=" Ajouter une option filière" icon="pi pi-plus" onClick={() => setVisible(true)} />
                <Dialog header="Ajout d'une option filière" visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); setError(); }}>
                    <div className="maindiv2-container">
                        <div className="maindiv2">
                            <label htmlFor='codeOptionFiliere' className="label">Code Option Filière</label>
                            <input type="text" id='codeOptionFiliere' name='codeOptionFiliere' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='libelleOptionFiliere' className="label">Libellé Option Filière</label>
                            <input type="text" id='libelleOptionFiliere' name='libelleOptionFiliere' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='annee' className="label">Année</label>
                            <Dropdown id='annee' name='annee' value={formValues.annee} options={anneeOptions} onChange={handleChange} placeholder="Sélectionner une année" className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='codeFiliere' className="label">Code Filière</label>
                            <Dropdown id='codeFiliere' name='codeFiliere' value={formValues.codeFiliere} options={filiereOptions.map(f => ({ label: f.libelleFiliere, value: f.codeFiliere }))} onChange={handleChange} placeholder="Sélectionner une filière" className="formInput" />
                        </div>
                    </div>
                    <div style={{ color: "red" }}>{error}</div>
                    <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
                </Dialog>
                <Dialog header="Modifier une option filière" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                    <div className="maindiv2-container">
                        <div className="maindiv2">
                            <label htmlFor='codeOptionFiliere' className="label">Code Option Filière</label>
                            <input type="text" id='codeOptionFiliere' name='codeOptionFiliere' value={editOptionFiliere ? editOptionFiliere.codeOptionFiliere : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='libelleOptionFiliere' className="label">Libellé Option Filière</label>
                            <input type="text" id='libelleOptionFiliere' name='libelleOptionFiliere' value={editOptionFiliere ? editOptionFiliere.libelleOptionFiliere : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='annee' className="label">Année</label>
                            <Dropdown id='annee' name='annee' value={editOptionFiliere ? editOptionFiliere.annee : ''} options={anneeOptions} onChange={(e) => handleChange(e, true)} placeholder="Sélectionner une année" className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='codeFiliere' className="label">Code Filière</label>
                            <Dropdown id='codeFiliere' name='codeFiliere' value={editOptionFiliere ? editOptionFiliere.codeFiliere : ''} options={filiereOptions.map(f => ({ label: f.libelleFiliere, value: f.codeFiliere }))} onChange={(e) => handleChange(e, true)} placeholder="Sélectionner une filière" className="formInput" />
                        </div>
                    </div>
                    <div style={{ color: "red" }}>{error}</div>
                    <button type="submit" onClick={handleEdit} className="add-button">Modifier</button>
                </Dialog>
            </div>
            <div className="card">
                <DataTable 
                value={optionFilieres} 
                paginator 
                rows={10} 
                rowsPerPageOptions={[5, 10, 25]} 
                header={header} 
                globalFilter={globalFilterValue} 
                loading={loading} 
                emptyMessage="Aucune option filière trouvée." 
                selectionMode="checkbox"
                className='formateursTable'
                selection={selectedOptionFilieres}
                onSelectionChange={(e) => setSelectedOptionFilieres(e.value)}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="codeOptionFiliere" header="Code Option Filière"></Column>
                    <Column field="libelleOptionFiliere" header="Libellé Option Filière"></Column>
                    <Column field="annee" header="Année"></Column>
                    <Column field="codeFiliere" header="Code Filière"></Column>
                </DataTable>
            </div>
            <Toast ref={toast} />
            <ConfirmDialog />
        </>
    );
}
