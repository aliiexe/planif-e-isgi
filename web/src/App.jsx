
import './App.css'
import Formateur from './components/Formateur/Formateur';
import Sidebar from './components/SideBar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Groupe from './components/Groupe/Groupe';
import Filiere from './components/Filiere/Filiere';
import OptionFiliere from './components/Filiere/OptionFiliere';
import Module from './components/Module/Module';
import Affectation from './components/Affectation/Affectation';
import Importation from './components/Importation/Importation';
import Parametres from './components/Parametres/Parametres';
import Planification from './components/Planification/Planification';

// import Side from './components/SideBar/Side';


function App() {

  return (
    <Router>
      <div className="app">
        <Sidebar/>
        {/* <Side/> */}
        <div className="content">
          <Routes>
          <Route path="/importation" element={<Importation />} />
            <Route path="/formateurs" element={<Formateur />} />
            <Route path='/groupes' element={<Groupe/>}></Route>
            <Route path='/filieres' element={<Filiere/>}></Route>
            <Route path='/optionfilieres' element={<OptionFiliere/>}></Route>
            <Route path='/modules' element={<Module/>}></Route>
            <Route path='/affectation' element={<Affectation></Affectation>}></Route>
            <Route path='/prevision' element={<Planification></Planification>}></Route>
            <Route path='/parametres' element={<Parametres></Parametres>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
