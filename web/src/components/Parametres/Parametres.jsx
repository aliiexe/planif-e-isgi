import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import './Parametres.css';
import { axiosClient } from "../../api/axiosClient";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function Parametres() {
    const [anneeformation, setAnneeformation] = useState({
        anneeFormation: '',
        dateDebutAnneeFormation: null,
        dateFinAnneeFormation: null,
        dateDebut2Semestre: null
    });

    const toast = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnneeformation({
            ...anneeformation,
            [name]: value
        });
    }

    const handleDateChange = (name, value) => {
        setAnneeformation({
            ...anneeformation,
            [name]: value
        });
    }

    const resetForm = () => {
        setAnneeformation({
            anneeFormation: '',
            dateDebutAnneeFormation: null,
            dateFinAnneeFormation: null,
            dateDebut2Semestre: null
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/anneeformation', anneeformation).then((a) => {
            console.log(a);
            toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Paramètres enregistrés', life: 3000 });
            resetForm();
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        axiosClient.get('/anneeformation').then((a) => {
            console.log(a);
            setAnneeformation(a.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <h1 className="text">Paramètres</h1><br />
            <form onSubmit={handleSubmit}>
                <h3 className="text">Paramètrage de l&apos;année</h3><br />
                <div className="input-rows">
                    <div>
                        <FloatLabel>
                            <InputText id="anneeformation" name="anneeFormation" value={anneeformation.anneeFormation} onChange={handleChange} />
                            <label>Année de formation</label>
                        </FloatLabel>
                        <br /><br />
                    </div>
                    <div className="flex-auto">
                        <FloatLabel>
                            <Calendar showIcon name="dateDebutAnneeFormation" value={anneeformation.dateDebutAnneeFormation} onChange={(e) => handleDateChange('dateDebutAnneeFormation', e.value)} />
                            <label>Date début de l&apos;année</label>
                        </FloatLabel>
                        <br /><br />
                    </div>
                    <div className="flex-auto">
                        <FloatLabel>
                            <Calendar showIcon name="dateDebut2Semestre" value={anneeformation.dateDebut2Semestre} onChange={(e) => handleDateChange('dateDebut2Semestre', e.value)} />
                            <label>Date début 2eme semestre</label>
                        </FloatLabel>
                        <br /><br />
                    </div>
                    <div className="flex-auto">
                        <FloatLabel>
                            <Calendar showIcon name="dateFinAnneeFormation" value={anneeformation.dateFinAnneeFormation} onChange={(e) => handleDateChange('dateFinAnneeFormation', e.value)} />
                            <label>Date fin de l&apos;année</label>
                        </FloatLabel>
                        <br /><br />
                    </div>
                    <Button label="Enregistrer" type="submit" className="subtbtn" />
                </div>
            </form>
            <Toast ref={toast} />
        </div>
    );
}
