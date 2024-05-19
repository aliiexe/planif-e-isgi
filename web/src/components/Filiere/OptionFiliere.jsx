import React, { useEffect, useRef, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function OptionFiliere() {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [formData, setFormData] = useState({
    codeOptionFiliere: '',
    libelleOptionFiliere: '',
    annee: '',
    codeFiliere: ''
  });
  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'L\'option filière est insérée avec succès' });
    setVisible(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/option-filieres', formData);
      console.log(response);
      fetchOptions(); // Rafraîchir la liste des options après l'ajout
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'L\'option filière est ajoutée avec succès' });
      setVisible(false);
      setFormData({
        codeOptionFiliere: '',
        libelleOptionFiliere: '',
        annee: '',
        codeFiliere: ''
      });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout de l\'option filière' });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosClient.put(`/option-filieres/${selectedOption.id}`, selectedOption);
      console.log(response);
      fetchOptions(); // Rafraîchir la liste des options après la modification
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'L\'option filière est mise à jour avec succès' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de l\'option filière' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`/option-filieres/${id}`);
      console.log(response);
      fetchOptions(); // Rafraîchir la liste des options après la suppression
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'L\'option filière a été supprimée avec succès' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de l\'option filière' });
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axiosClient.get('/option-filieres');
      setOptions(response.data);
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
    fetchOptions();
    fetchFilieres();
  }, []);

  return (
    <>
      <div className="card flex justify-content-center">
        <Button label="Ajouter une option filière" icon="pi pi-plus" onClick={() => setVisible(true)} />
        <Dialog header="Ajout d'une option filière" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <form onSubmit={handleSubmit}>
            <div className="maindiv2">
              <label htmlFor="codeOptionFiliere" className="label">Code Option Filière</label>
              <InputText id="codeOptionFiliere" name="codeOptionFiliere" value={formData.codeOptionFiliere} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="libelleOptionFiliere" className="label">Libellé Option Filière</label>
              <InputText id="libelleOptionFiliere" name="libelleOptionFiliere" value={formData.libelleOptionFiliere} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="annee" className="label">Année</label>
              <select id="annee" name="annee" value={formData.annee} onChange={handleChange} className="formInput">
                <option value="">Sélectionner une année</option>
                <option value="1A">1A</option>
                <option value="2A">2A</option>
                <option value="3A">3A</option>
              </select>
            </div>
            <div className="maindiv2">
              <label htmlFor="codeFiliere" className="label">Libellé Filière</label>
              <select id="codeFiliere" name="codeFiliere" value={formData.codeFiliere} onChange={handleChange} className="formInput">
                <option value="">Sélectionner une filière</option>
                {filieres.map((filiere) => (
                  <option key={filiere.codeFiliere} value={filiere.codeFiliere}>{filiere.libelleFiliere}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-button">Ajouter</button>
          </form>
        </Dialog>
        <Toast ref={toast} />
      </div>

      <div className="flex justify-content-center">
        <div>
          <h2>Liste des options filières :</h2>
          <DataTable value={options} selectionMode="single" selection={selectedOption} onSelectionChange={(e) => setSelectedOption(e.value)}>
            <Column field="codeOptionFiliere" header="Code Option Filière"></Column>
            <Column field="libelleOptionFiliere" header="Libellé Option Filière"></Column>
            <Column field="annee" header="Année"></Column>
            <Column field="codeFiliere" header="Code Filière"></Column>

            <Column body={(rowData) => <Button icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} />} style={{ width: '8em', textAlign: 'center' }} />
          </DataTable>
          {selectedOption && (
            <div className="card">
              <h2>Modifier l'option filière :</h2>
              <div className="maindiv2">
                <label htmlFor="libelleOptionFiliere" className="label">Libellé Option Filière</label>
                <InputText id="libelleOptionFiliere" name="libelleOptionFiliere" value={selectedOption.libelleOptionFiliere} onChange={(e) => setSelectedOption({ ...selectedOption, libelleOptionFiliere: e.target.value })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="annee" className="label">Année</label>
                <select id="annee" name="annee" value={selectedOption.annee} onChange={(e) => setSelectedOption({ ...selectedOption, annee: e.target.value })} className="formInput">
                  <option value="">Sélectionner une année</option>
                  <option value="1A">1A</option>
                  <option value="2A">2A</option>
                  <option value="3A">3A</option>
                </select>
              </div>
              <div className="maindiv2">
                <label htmlFor="codeFiliere" className="label">Libellé Filière</label>
                <select id="codeFiliere" name="codeFiliere" value={selectedOption.codeFiliere} onChange={(e) => setSelectedOption({ ...selectedOption, codeFiliere: e.target.value })} className="formInput">
                  <option value="">Sélectionner une filière</option>
                  {filieres.map((filiere) => (
                    <option key={filiere.codeFiliere} value={filiere.codeFiliere}>{filiere.libelleFiliere}</option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={handleUpdate} className="add-button">Modifier</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
