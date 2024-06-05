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


import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method


export default function ModuleController() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [error, setError] = useState();
    const toast = useRef(null);
    const [editModule, setEditModule] = useState(null);
    const [modules, setModules] = useState([]);
    const [selectedModules, setSelectedModules] = useState([]);
    const [moduleData, setModuleData] = useState({
        codeModule: '',
        libelleModule: '',
        ordreModule: '',
        MHT: '',
        Coef: '',
        EFM_Regional: false,
        option_filieres_id: '',
        semestreModule: '',
    });
    const [formValues, setFormValues] = useState(moduleData);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filiereOptions, setFiliereOptions] = useState([]);

    useEffect(() => {
        axiosClient.get('/sanctum/csrf-cookie');
        loadModules();
        loadFiliereOptions();
    }, []);

    const loadModules = () => {
        axiosClient.get('/modules').then((response) => {
            setModules(response.data);
            setLoading(false);
        });
    };

    const loadFiliereOptions = () => {
        axiosClient.get('/option-filieres').then((response) => {
            setFiliereOptions(response.data);
        });
    };

    const handleChange = (e, isEdit = false) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? e.target.checked : value;

        // Convertir la valeur du champ EFM_Regional en booléen
        const finalValue = name === 'EFM_Regional' ? JSON.parse(newValue) : newValue;

        if (isEdit) {
            setEditModule({
                ...editModule,
                [name]: finalValue,
            });
        } else {
            setModuleData({
                ...moduleData,
                [name]: finalValue,
            });
            setFormValues({
                ...formValues,
                [name]: finalValue,
            });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        await axiosClient.put(`/modules/${editModule.id}`, editModule).then(() => {
            setEditVisible(false);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le module est modifié avec succès',
            });
            loadModules();
            setSelectedModules([]);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            codeModule,
            libelleModule,
            ordreModule,
            MHT,
            Coef,
            EFM_Regional,
            option_filieres_id,
            semestreModule,
        } = moduleData;

        const validatedData = {
            codeModule,
            libelleModule,
            ordreModule,
            MHT,
            Coef,
            // Assurez-vous que la valeur de EFM_Regional est un booléen
            EFM_Regional: JSON.parse(EFM_Regional),
            option_filieres_id,
            semestreModule,
        };

        try {
            const response = await axiosClient.post('/modules', validatedData);
            setVisible(false);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le module est inséré avec succès',
            });
            loadModules();
        } catch (error) {
            setError('Une erreur s\'est produite lors de l\'insertion du module.');
        }
    };

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûr de vouloir supprimer ce module ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                for (const selectedModule of selectedModules) {
                    await axiosClient.delete(`/modules/${selectedModule.id}`).then(() => {
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Le module est supprimé avec succès',
                        });
                        loadModules();
                    });
                }
                setSelectedModules([]);
            },
        });
    };

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const clearFilter = () => {
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className='header'>
                <Button type="button" icon="pi pi-filter-slash" label="Vider" outlined onClick={clearFilter} />
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {selectedModules.length > 0 && (
                            <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
                        )}
                        {selectedModules.length === 1 && (
                            <Button icon="pi pi-pencil" onClick={() => { setEditModule(selectedModules[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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

    const semestreOptions = ['S1', 'S2', 'S3', 'S4', 'S5'];

    return (
        <>
            <div className="card flex justify-content-center">
                <Button label=" Ajouter un module" icon="pi pi-plus" onClick={() => setVisible(true)} />
                <Dialog header="Ajout d'un module" visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); setError(); }}>
                    <div className="maindiv2-container">
                        <div className="maindiv2">
                            <label htmlFor='codeModule' className="label">Code Module</label>
                            <input type="text" id='codeModule'  name='codeModule' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='libelleModule' className="label">Libellé Module</label>
                            <input type="text" id='libelleModule' name='libelleModule' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='ordreModule' className="label">Ordre Module</label>
                            <input type="text" id='ordreModule' name='ordreModule' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='MHT' className="label">MHT</label>
                            <input type="text" id='MHT' name='MHT' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='Coef' className="label">Coef</label>
                            <input type="text" id='Coef' name='Coef' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='EFM_Regional' className="label">EFM Regional</label>
                            <input type="checkbox" id='EFM_Regional' name='EFM_Regional' onChange={handleChange} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='option_filieres_id' className="label">Option Filieres ID</label>
                            <Dropdown id='option_filieres_id' name='option_filieres_id' value={formValues.option_filieres_id} options={filiereOptions.map(option => ({ label: option.libelleOptionFiliere, value: option.id }))} onChange={handleChange} placeholder="Sélectionner une option filière" className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='semestreModule' className="label">Semestre Module</label>
                            <Dropdown id='semestreModule' name='semestreModule' value={formValues.semestreModule} options={semestreOptions.map(option => ({ label: option, value: option }))} onChange={handleChange} placeholder="Sélectionner un semestre" className="formInput" />
                        </div>
                    </div>
                    <div style={{ color: "red" }}>{error}</div>
                    <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
                </Dialog>
                <Dialog header="Modifier un module" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                    <div className="maindiv2-container">
                        <div className="maindiv2">
                            <label htmlFor='codeModule' className="label">Code Module</label>
                            <input type="text" id='codeModule' name='codeModule' value={editModule ? editModule.codeModule : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='libelleModule' className="label">Libellé Module</label>
                            <input type="text" id='libelleModule' name='libelleModule' value={editModule ? editModule.libelleModule : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='ordreModule' className="label">Ordre Module</label>
                            <input type="text" id='ordreModule' name='ordreModule' value={editModule ? editModule.ordreModule : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='MHT' className="label">MHT</label>
                            <input type="text" id='MHT' name='MHT' value={editModule ? editModule.MHT : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='Coef' className="label">Coef</label>
                            <input type="text" id='Coef' name='Coef' value={editModule ? editModule.Coef : ''} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='EFM_Regional' className="label">EFM Regional</label>
                            <input type="checkbox" id='EFM_Regional' name='EFM_Regional' checked={editModule ? editModule.EFM_Regional : false} onChange={(e) => handleChange(e, true)} className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='option_filieres_id' className="label">Option Filieres ID</label>
                            <Dropdown id='option_filieres_id' name='option_filieres_id' value={editModule ? editModule.option_filieres_id : ''} options={filiereOptions.map(option => ({ label: option.libelleOptionFiliere, value: option.id }))} onChange={(e) => handleChange(e, true)} placeholder="Sélectionner une option filière" className="formInput" />
                        </div>
                        <div className="maindiv2">
                            <label htmlFor='semestreModule' className="label">Semestre Module</label>
                            <Dropdown id='semestreModule' name='semestreModule' value={editModule ? editModule.semestreModule : ''} options={semestreOptions.map(option => ({ label: option, value: option }))} onChange={(e) => handleChange(e, true)} placeholder="Sélectionner un semestre" className="formInput" />
                        </div>
                    </div>
                    <div style={{ color: "red" }}>{error}</div>
                    <button type="submit" onClick={handleEdit} className="add-button">Modifier</button>
                </Dialog>
            </div>
            <div className="card">
                <DataTable value={modules} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} header={header} globalFilter={globalFilterValue} loading={loading} emptyMessage="Aucun module trouvé." selectionMode="checkbox" selection={selectedModules} onSelectionChange={(e) => setSelectedModules(e.value)}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="codeModule" header="Code Module"></Column>
                    <Column field="libelleModule" header="Libellé Module"></Column>
                    <Column field="ordreModule" header="Ordre Module"></Column>
                    <Column field="MHT" header="MHT"></Column>
                    <Column field="Coef" header="Coef"></Column>
                    <Column field="EFM_Regional" header="EFM Regional" body={(rowData) => rowData.EFM_Regional ? 'Oui' : 'Non'}></Column>
                    <Column field="option_filieres_id" header="Option Filieres ID"></Column>
                    <Column field="semestreModule" header="Semestre Module"></Column>
                </DataTable>
            </div>
            <Toast ref={toast} />
            <ConfirmDialog />
        </>
    );
}
