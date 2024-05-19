import React, { useEffect, useRef, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function Module() {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modules, setModules] = useState([]);
  const [options, setOptions] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [formData, setFormData] = useState({
    codeModule: '',
    libelleModule: '',
    ordreModule: '',
    MHT: '',
    Coef: '',
    EFM_Regional: false,
    option_filieres_id: '',
    semestreModule: ''
  });
  const toast = useRef(null);

  const show = () => {
    setVisible(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.codeModule || !formData.libelleModule || !formData.ordreModule || !formData.MHT || !formData.Coef || !formData.option_filieres_id || !formData.semestreModule) {
      console.error('Tous les champs doivent être remplis');
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs doivent être remplis' });
      return;
    }

    const validSemestres = ["S1", "S2", "S3", "S4", "S5"];
    if (!validSemestres.includes(formData.semestreModule)) {
      console.error('Semestre module invalide');
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Semestre module invalide' });
      return;
    }

    try {
      const response = await axiosClient.post('/modules', formData);
      console.log(response);
      fetchModules();
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Le module est ajouté avec succès' });
      setFormData({
        codeModule: '',
        libelleModule: '',
        ordreModule: '',
        MHT: '',
        Coef: '',
        EFM_Regional: false,
        option_filieres_id: '',
        semestreModule: ''
      });
      setVisible(false);
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du module' });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosClient.put(`/modules/${selectedOption.id}`, selectedOption);
      console.log(response);
      fetchModules();
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Le module est mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du module' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`/modules/${id}`);
      console.log(response);
      fetchModules();
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Le module a été supprimé avec succès' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du module' });
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axiosClient.get('/modules');
      setModules(response.data);
    } catch (error) {
      console.error(error);
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
    fetchModules();
    fetchOptions();
    fetchFilieres();
  }, []);

  return (
    <>
      <div className="card flex justify-content-center">
        <Button label="Ajouter un module" icon="pi pi-plus" onClick={show} />
        <Dialog header="Ajout d'un module" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <form onSubmit={handleSubmit}>
            <div className="maindiv2">
              <label htmlFor="codeModule" className="label">Code Module</label>
              <InputText id="codeModule" name="codeModule" value={formData.codeModule} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="libelleModule" className="label">Libellé Module</label>
              <InputText id="libelleModule" name="libelleModule" value={formData.libelleModule} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="ordreModule" className="label">Ordre Module</label>
              <InputText id="ordreModule" name="ordreModule" value={formData.ordreModule} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="MHT" className="label">MHT</label>
              <InputText id="MHT" name="MHT" value={formData.MHT} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="Coef" className="label">Coef</label>
              <InputText id="Coef" name="Coef" value={formData.Coef} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="EFM_Regional" className="label">EFM Regional</label>
              <input type="checkbox" id="EFM_Regional" name="EFM_Regional" checked={formData.EFM_Regional} onChange={handleChange} className="formInput" />
            </div>
            <div className="maindiv2">
              <label htmlFor="option_filieres_id" className="label">Option Filieres ID</label>
              <select
                id="option_filieres_id"
                name="option_filieres_id"
                value={formData.option_filieres_id}
                onChange={handleChange}
                className="formInput"
              >
                <option value="">Sélectionner une option filière</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>{option.libelleOptionFiliere}</option>
                ))}
              </select>
            </div>
            <div className="maindiv2">
              <label htmlFor="semestreModule" className="label">Semestre Module</label>
              <select id="semestreModule" name="semestreModule" value={formData.semestreModule} onChange={handleChange} className="formInput">
                <option value="">Sélectionner un semestre</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
              </select>
            </div>
            <button type="submit" className="add-button">Ajouter</button>
          </form>
        </Dialog>
        <Toast ref={toast} />
      </div>

      <div className="flex justify-content-center">
        <div>
          <h2>Liste des modules :</h2>
          <DataTable value={modules} selectionMode="single" selection={selectedOption} onSelectionChange={(e) => setSelectedOption(e.value)}>
            <Column field="codeModule" header="Code Module"></Column>
            <Column field="libelleModule" header="Libellé Module"></Column>
            <Column field="ordreModule" header="Ordre Module"></Column>
            <Column field="MHT" header="MHT"></Column>
            <Column field="Coef" header="Coef"></Column>
            <Column field="EFM_Regional" header="EFM Regional"></Column>
            <Column field="option_filieres_id" header="Option Filieres ID"></Column>
            <Column field="semestreModule" header="Semestre Module"></Column>
            <Column body={(rowData) => <Button icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} />} style={{ width: '8em', textAlign: 'center' }} />
          </DataTable>
          {selectedOption && (
            <div className="card">
              <h2>Modifier le module :</h2>
              <div className="maindiv2">
                <label htmlFor="libelleModule" className="label">Libellé Module</label>
                <InputText id="libelleModule" name="libelleModule" value={selectedOption.libelleModule} onChange={(e) => setSelectedOption({ ...selectedOption, libelleModule: e.target.value })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="ordreModule" className="label">Ordre Module</label>
                <InputText id="ordreModule" name="ordreModule" value={selectedOption.ordreModule} onChange={(e) => setSelectedOption({ ...selectedOption, ordreModule: e.target.value })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="MHT" className="label">MHT</label>
                <InputText id="MHT" name="MHT" value={selectedOption.MHT} onChange={(e) => setSelectedOption({ ...selectedOption, MHT: e.target.value })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="Coef" className="label">Coef</label>
                <InputText id="Coef" name="Coef" value={selectedOption.Coef} onChange={(e) => setSelectedOption({ ...selectedOption, Coef: e.target.value })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="EFM_Regional" className="label">EFM Regional</label>
                <input type="checkbox" id="EFM_Regional" name="EFM_Regional" checked={selectedOption.EFM_Regional} onChange={(e) => setSelectedOption({ ...selectedOption, EFM_Regional: e.target.checked })} className="formInput" />
              </div>
              <div className="maindiv2">
                <label htmlFor="option_filieres_id" className="label">Option Filieres ID</label>
                <select
                  id="option_filieres_id"
                  name="option_filieres_id"
                  value={selectedOption ? selectedOption.option_filieres_id : ''}
                  onChange={(e) => setSelectedOption({ ...selectedOption, option_filieres_id: e.target.value })}
                  className="formInput"
                >
                  <option value="">Sélectionner une option filière</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.libelleOptionFiliere}</option>
                  ))}
                </select>
              </div>

              <div className="maindiv2">
                <label htmlFor="semestreModule" className="label">Semestre Module</label>
                <select id="semestreModule" name="semestreModule" value={selectedOption.semestreModule} onChange={(e) => setSelectedOption({ ...selectedOption, semestreModule: e.target.value })} className="formInput">
                  <option value="">Sélectionner un semestre</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="S4">S4</option>
                  <option value="S5">S5</option>
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
