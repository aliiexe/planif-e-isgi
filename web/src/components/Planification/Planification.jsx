import axios from "axios";
import { axiosClient } from "../../api/axiosClient";

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
    return (
        <>
        <h1>Planification</h1>
        <label>id group phy</label>
        <input type="text" onChange={(e)=>axiosClient.post('/prevision/',{idGroupePhysique: e.target.value.toString(),anneeFormation: 20222023}).then((a)=>console.log(a))} />
        </>
    )
}