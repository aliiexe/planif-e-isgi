import { DataTable } from 'primereact/datatable';

import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import '../Formateur/Formateur.css'

export default function Planification() {
//     const [randomDate, setRandomDate] = useState(null);
//     const [weekNumber, setWeekNumber] = useState(null);
//     const calculateWeekNumber = () => {
//         if (randomDate && anneeformation.dateDebutAnneeFormation && anneeformation.dateFinAnneeFormation) {
//             const startDate = new Date(anneeformation.dateDebutAnneeFormation);
//             const endDate = new Date(anneeformation.dateFinAnneeFormation);
//             const random = new Date(randomDate);

//             if (random >= startDate && random <= endDate) {
//                 const diffInDays = Math.floor((random - startDate) / (1000 * 60 * 60 * 24));
//                 const weekNumber = Math.floor(diffInDays / 7) + 1;
//                 setWeekNumber(weekNumber);
//             } else {
//                 setWeekNumber(null);
//                 toast.current.show({ severity: 'warn', summary: 'Attention', detail: 'La date donnée est hors de la période spécifiée', life: 3000 });
//             }
//         }
//     }
//   return (
//     <div>
//       <div>
//                 <h3 className="text">Calculer la semaine</h3><br />
//                 <div className="flex-auto">
//                     <FloatLabel>
//                         <Calendar showIcon value={randomDate} onChange={handleRandomDateChange} />
//                         <label>Date aléatoire</label>
//                     </FloatLabel>
//                 </div>
//                 {weekNumber !== null && (
//                     <div>
//                         <h4 className="text">La semaine de la date donnée est: {weekNumber}</h4>
//                     </div>
//                 )}
//             </div>
//     </div>
//   )
const [previsions, setPrevisions] = useState([]);
const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        axiosClient.get('/prevision').then((a) => {
            console.log(a);
            setPrevisions(a.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    const initFilters = () => {
        setGlobalFilterValue('');
    };
    const clearFilter = () => {
        initFilters();
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
        
            <div className='header'>
                <Button type="button" icon="pi pi-filter-slash" label="Vider" outlined onClick={clearFilter} />
                
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche" />
                </IconField>
                </div>
        );
    };
    const header = renderHeader();
    const regionalBodyTemplate = (rowData) => {
        return rowData.affectation.module.EFM_Regional ? <span style={{color: '#4AAD27'}}>Oui</span> : "-";
    };
    return (
        <>
        <h1>Planification</h1>
        <label>id group phy</label>
        <input type="text" onChange={(e)=>axiosClient.post('/prevision/',{idGroupePhysique: e.target.value.toString(),anneeFormation: 20222023}).then((a)=>console.log(a))} />
        <div className="card flex justify-content-center">
            <DataTable
                        value={previsions}
                        paginator
                        rows={10}
                        dataKey="id"
                        scrollable
                        scrollHeight="64vh"
                        sortMode="multiple"
                        tableStyle={{ minWidth: '50rem' }}
                        className='formateursTable'
                        emptyMessage="Pas de planification prévisionelle trouvé."
                        header={header}
                        globalFilter={globalFilterValue}
                        globalFilterFields={['id', 'AffectationCodeOptionFiliere', 'option_filieres_id']}
                    >
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.module.codeModule" header="Code module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.module.libelleModule" header="Libelle module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.module.ordreModule" header="Ordre module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.module.MHT" header="Masse horaire totale module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.formateur.nom" header="Nom formateur"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.formateur.prenom" header="Prenom formateur"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.groupe.libelleGroupe" header="Libelle groupe"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="datedebutmodule" header="Date debut module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="datecc1" header="Date CC1"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="datecc2" header="Date CC2"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="datecc3" header="Date CC3"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="datefinmodule" header="Date fin module"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="dateefm" header="Date EFM"></Column>
                        <Column sortable style={{ minWidth: '15rem' }} field="affectation.module.EFM_Regional" header="Régional" body={regionalBodyTemplate}></Column>                
                        </DataTable>
                    </div>
        </>
    )
}