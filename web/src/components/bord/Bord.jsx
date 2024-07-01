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

export default function Bord() {

  const [selectedFiliere, setSelectedFiliere] = useState([]);
  const [filieres, setFilieres] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setGlobalFilterValue('');
  };
  const[count,setcount]=useState([]);
useEffect(()=>{
axiosClient.get('/formateurcount').then(a=>{
setcount(a.data)
console.log(a.data)
setLoading(false)
})
},[])
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
  
  }, []);

  const header = renderHeader();

  return (
    <>
      <div className="card flex justify-content-center">
      
        <div className="container">
          <DataTable
            value={count}
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
            globalFilterFields={['id',"matricule"]}
            selectionMode="multiple"
            selection={selectedFiliere}
            onSelectionChange={(e) => setSelectedFiliere(e.value)}>
            <Column sortable style={{ minWidth: '15rem' }} field="matricule" header="matricule formateur"></Column>
            <Column sortable style={{ minWidth: '15rem' }} field="nom" header="nom formateur"></Column>
            <Column sortable style={{ minWidth: '15rem' }} field="prenom" header="prenom formateur"></Column>
            <Column sortable style={{ minWidth: '15rem' }} field="affectations_sum_heure_semaine" header="total heure affecte"></Column>

          </DataTable>
        </div>
      </div>
    </>
  );
}
