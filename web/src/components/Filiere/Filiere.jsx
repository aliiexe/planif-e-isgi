import '../Formateur/Formateur.css';
import React, { useEffect, useRef, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function Filiere() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [filiere, setFiliere] = useState({ codeFiliere: '', libelleFiliere: '' });
  const [editFiliere, setEditFiliere] = useState({ id: '', codeFiliere: '', libelleFiliere: '' });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditFiliere(prev => ({ ...prev, [name]: value }));
    } else {
      setFiliere(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/filieres', filiere);
      setVisible(false);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'La filière est insérée avec succès' });
      fetchFilieres();
      setFiliere({ codeFiliere: '', libelleFiliere: '' }); // Réinitialiser les valeurs du formulaire
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      console.log("URL de la requête PUT:", `/filieres/${editFiliere.id}`);
      await axiosClient.put(`/filieres/${editFiliere.id}`, editFiliere);
      setEditVisible(false);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'La filière est mise à jour avec succès' });
      fetchFilieres();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    confirmDialog({
      message: 'Êtes-vous sûr de vouloir supprimer ces filières ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await Promise.all(
            selectedFiliere.map(filiere => axiosClient.delete(`/filieres/${filiere.id}`))
          );
          toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Les filières ont été supprimées avec succès' });
          fetchFilieres();
          setSelectedFiliere([]);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const fetchFilieres = async () => {
    try {
      const response = await axiosClient.get('/filieres');
      setFilieres(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
            {selectedFiliere.length > 0 && (
              <Button icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
            )}
            {selectedFiliere.length === 1 && (
              <Button icon="pi pi-pencil" onClick={() => { setEditFiliere(selectedFiliere[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');
    fetchFilieres();
  }, []);

  const header = renderHeader();

  return (
    <>
      <div className="card flex justify-content-center">
        <Button label="Ajouter une filière" icon="pi pi-plus" onClick={() => setVisible(true)} />
        <Dialog header="Ajout d'une filière" visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); setFiliere({ codeFiliere: '', libelleFiliere: '' }); }}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor='codeFiliere' className="label">Code Filière</label>
              <InputText id='codeFiliere' name='codeFiliere' value={filiere.codeFiliere} onChange={(e) => handleChange(e)} className="formInput" />
            </div>
            <div className="field">
              <label htmlFor='libelleFiliere' className="label">Libellé Filière</label>
              <InputText id='libelleFiliere' name='libelleFiliere' value={filiere.libelleFiliere} onChange={(e) => handleChange(e)} className="formInput" />
            </div>
            <Button type="submit" label="Ajouter" className="add-button" />
          </form>
        </Dialog>


        <Dialog header="Modifier une filière" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
          <form onSubmit={handleEdit}>
            <div className="field">
              <label htmlFor='editCodeFiliere' className="label">Code Filière</label>
              <InputText id='editCodeFiliere' name='codeFiliere' value={editFiliere.codeFiliere} onChange={(e) => handleChange(e, true)} className="formInput" />
            </div>
            <div className="field">
              <label htmlFor='editLibelleFiliere' className="label">Libellé Filière</label>
              <InputText id='editLibelleFiliere' name='libelleFiliere' value={editFiliere.libelleFiliere} onChange={(e) => handleChange(e, true)} className="formInput" />
            </div>
            <Button type="submit" label="Modifier" className="edit-button" />
          </form>
        </Dialog>

        <Toast ref={toast} />
        <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />

        <div className="container">
          <DataTable
            value={filieres}
            paginator
            rows={10}
            dataKey="id"
            scrollable
            scrollHeight="64vh"
            sortMode="multiple"
            tableStyle={{ minWidth: '50rem' }}
            className='formateursTable'
            emptyMessage="Pas de filières trouvées."
            header={header}
            loading={loading}
            globalFilter={globalFilterValue}
            globalFilterFields={['codeFiliere', 'libelleFiliere']}
            selectionMode="multiple"
            selection={selectedFiliere}
            onSelectionChange={(e) => setSelectedFiliere(e.value)}>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column sortable style={{ minWidth: '15rem' }} field="codeFiliere" header="Code Filière"></Column>
            <Column sortable style={{ minWidth: '15rem' }} field="libelleFiliere" header="Libellé Filière"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
