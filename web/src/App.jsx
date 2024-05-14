import './App.css'
import Formateur from './components/Formateur/Formateur';
import Sidebar from './components/SideBar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Groupe from './components/Groupe/Groupe';


function App() {

  return (
    <Router>
      <div className="app">
        <Sidebar/>
        <div className="content">
          <Routes>
            <Route path="/formateurs" element={<Formateur />} />
            <Route path='/groupes' element={<Groupe/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
