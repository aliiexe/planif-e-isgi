import React, { useEffect, useRef, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function Filiere() {
  const [visible, setVisible] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [filiere, setFiliere] = useState({
    codeFiliere: '',
    libelleFiliere: ''
  });
  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'La filière est insérée avec succès' });
    setVisible(false);
  };

  const handleChange = (e) => {
    setFiliere({
      ...filiere,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/filieres', filiere);
      console.log(response);
      fetchFilieres(); // Rafraîchir la liste des filières après l'ajout
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosClient.put(`/filieres/${selectedFiliere.codeFiliere}`, selectedFiliere);
      console.log(response);
      fetchFilieres(); // Rafraîchir la liste des filières après la modification
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'La filière est mise à jour avec succès' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (codeFiliere) => {
    try {
      const response = await axiosClient.delete(`/filieres/${codeFiliere}`);
      console.log(response);
      fetchFilieres(); // Rafraîchir la liste des filières après la suppression
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'La filière a été supprimée avec succès' });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axiosClient.get('/filieres');
      setFilieres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');
    fetchFilieres();
  }, []);

  return (
    <>
      <div className="card flex justify-content-center">
        <Button label=" Ajouter une filière" icon="pi pi-plus" onClick={() => setVisible(true)} />
        <Dialog header="Ajout d'une filière" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <form onSubmit={handleSubmit}>
            <div className="maindiv2">
              <label htmlFor='codeFiliere' className="label">Code Filière</label>
              <input type="text" id='codeFiliere' name='codeFiliere' value={filiere.codeFiliere} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor='libelleFiliere' className="label">Libellé Filière</label>
              <input type="text" id='libelleFiliere' name='libelleFiliere' value={filiere.libelleFiliere} onChange={handleChange} className="formInput" />
            </div>
            <button type="submit" onClick={show} className="add-button">Ajouter</button>
          </form>
        </Dialog>
        <Toast ref={toast} />
      </div>

      <div className="flex justify-content-center">
        <div>
          <h2>Liste des filières :</h2>
          <DataTable value={filieres} selectionMode="single" selection={selectedFiliere} onSelectionChange={(e) => setSelectedFiliere(e.value)}>
            <Column field="codeFiliere" header="Code Filière" style={{width: '10%'}}></Column>
            <Column field="libelleFiliere" header="Libellé Filière"></Column>
            <Column body={(rowData) => <Button icon="pi pi-trash" onClick={() => handleDelete(rowData.codeFiliere)} />} style={{ width: '8em', textAlign: 'center' }} />
          </DataTable>
          {selectedFiliere && (
            <div className="card">
              <h2>Modifier la filière :</h2>
              <div className="maindiv2">
                <label htmlFor='libelleFiliere' className="label">Libellé Filière</label>
                <InputText id='libelleFiliere' name='libelleFiliere' value={selectedFiliere.libelleFiliere} onChange={(e) => setSelectedFiliere({ ...selectedFiliere, libelleFiliere: e.target.value })} className="formInput" />
              </div>
              <button type="button" onClick={handleUpdate} className="add-button">Modifier</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
