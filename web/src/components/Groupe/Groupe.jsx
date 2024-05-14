import '../Formateur/Formateur.css'
import {  useEffect,useRef,useState } from 'react'
import { axiosClient } from '../../api/axiosClient';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
        
export default function Groupe(){
    const [visible, setVisible] = useState(false);
  const [error,seterror]=useState()
    const toast = useRef(null);
  const [groupes,setgroupes]=useState([])
  
    const [groupe, setgroupe] = useState({
      code: '',
      libelle: '',
    
    });
  
    const handleChange = (e) => {
      const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
      setgroupe({
        ...groupe,
        [e.target.name]: value,
      });
    }
  
    const handleSubmit = async (e) => {
        console.log(groupe.codeGroupePhysique)
        if(!groupe.codeGroupePhysique|| !groupe.libelleGroupe){
            seterror('tous les champs sont requis')
            return 
        }else{
      e.preventDefault();
      groupes.map((a)=>{
        if(a.codeGroupePhysique==groupe.codeGroupePhysique){
            seterror('le code de groupe existe deja')
            return
        }
      })
        const response = await axiosClient.post('/groupe', groupe).then((a)=>{
         setVisible(false)
            console.log(a)
            toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Le groupe est inséré avecs succès' });
        })
      
      }
    }
  
    useEffect(() => {
      axiosClient.get('/sanctum/csrf-cookie')
      axiosClient.get('/groupe').then((a)=>{
        setgroupes(a.data)
        console.log(a.data)
      })
    }, []);
    return(
        <>

        <div className="card flex justify-content-center">
            <Button label=" Ajouter un groupe" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Ajout d'un groupe" visible={visible} style={{ width: '50vw' }} onHide={() => {setVisible(false);seterror()}}>
           
         
                
                  <div className="maindiv2-container">
                    <div className="maindiv2">
                      <label htmlFor='nom' className="label">Code</label>
                      <input type="text" id='nom' name='codeGroupePhysique' onChange={handleChange} className="formInput"/>
                    </div>
                    <div className="maindiv2">
                      <label htmlFor='prenom' className="label">Prenom</label>
                      <input type="text" id='prenom' name='libelleGroupe' onChange={handleChange} className="formInput"/>
                    </div>
                  </div>
                    <div style={{"color":"red"}}>{error}</div>
                  <button type="submit" onClick={handleSubmit}  className="add-button">Ajouter</button>
             
            </Dialog>
            <Toast ref={toast} />
        </div>
        </>
    )
}